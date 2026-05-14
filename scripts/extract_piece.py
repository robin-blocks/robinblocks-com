#!/usr/bin/env python3
"""Extract a Piano Train piece from a MusicXML (.mxl/.xml) file.

Reads the score, splits RH/LH by staff, reduces RH chord onsets to the highest
(melody) note, applies pitch-band fingering, and writes
public/pieces/<id>.json. Update public/pieces/manifest.json by hand to add the
new piece to PIECE_ORDER.

Usage:
    scripts/extract_piece.py path/to/score.mxl --id chopin_op9_no2 \\
        --title "Chopin Nocturne Op. 9 No. 2 (opening)" \\
        --short "Chopin Op. 9 No. 2" \\
        --composer "F. Chopin" \\
        --max-bars 8

Most metadata is optional — defaults are derived from the title. Tempo and
time signature come from the MusicXML; override with --tempo / --beats /
--beat-type if the file is wrong or missing them.

Quick-iteration tip: open `/piano-train.html?piece=<id>&preview=1` after
running the script to hear the extraction without setting up fingering.
"""
from __future__ import annotations

import argparse
import json
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PIECES_DIR = REPO_ROOT / "public" / "pieces"

STEP_TO_PC = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}


def load_musicxml(path: Path) -> ET.ElementTree:
    """Accept .mxl (zip), .xml, or .musicxml. Returns parsed ElementTree."""
    suffix = path.suffix.lower()
    if suffix == ".mxl":
        with zipfile.ZipFile(path) as zf:
            # MXL containers list the root score in META-INF/container.xml.
            try:
                container = ET.fromstring(zf.read("META-INF/container.xml"))
                # Namespaces vary; just look for the rootfile element.
                for elem in container.iter():
                    if elem.tag.endswith("rootfile"):
                        full_path = elem.get("full-path")
                        if full_path:
                            return ET.ElementTree(ET.fromstring(zf.read(full_path)))
            except KeyError:
                pass
            # Fallback: pick the largest .xml file in the archive (the score
            # is usually much bigger than container.xml).
            xml_names = [n for n in zf.namelist() if n.lower().endswith(".xml") and "container" not in n.lower()]
            if not xml_names:
                raise SystemExit(f"No .xml files inside {path}")
            xml_names.sort(key=lambda n: zf.getinfo(n).file_size, reverse=True)
            return ET.ElementTree(ET.fromstring(zf.read(xml_names[0])))
    elif suffix in (".xml", ".musicxml"):
        return ET.parse(path)
    else:
        raise SystemExit(f"Unsupported input format: {suffix} (need .mxl, .xml, or .musicxml)")


def parse_score(tree: ET.ElementTree, max_bars: int | None) -> tuple[list[dict], list[dict], dict]:
    """Walk the part, return (rh_notes, lh_notes, detected_metadata).

    rh_notes are reduced to the highest melody note at each onset. lh_notes
    keep all stacked chord notes (they're auto-played).
    """
    root = tree.getroot()
    part = root.find("part")
    if part is None:
        raise SystemExit("No <part> element in score (multi-part files not supported here)")

    divisions = 1  # quarter-note divisions per measure
    cur_beat = 0.0  # in quarter notes from start of piece
    rh_raw: list[dict] = []
    lh_raw: list[dict] = []
    detected = {}

    for m_idx, m in enumerate(part.findall("measure")):
        if max_bars is not None and m_idx > max_bars:
            break

        attrs = m.find("attributes")
        if attrs is not None:
            d = attrs.find("divisions")
            if d is not None:
                divisions = int(d.text)
            time = attrs.find("time")
            if time is not None and "time_signature" not in detected:
                beats = time.find("beats")
                btype = time.find("beat-type")
                if beats is not None and btype is not None:
                    detected["time_signature"] = [int(beats.text), int(btype.text)]
            key = attrs.find("key")
            if key is not None and "fifths" not in detected:
                fifths = key.find("fifths")
                if fifths is not None:
                    detected["fifths"] = int(fifths.text)

        # Tempo lives in <direction><sound tempo=…>
        for direction in m.findall("direction"):
            sound = direction.find("sound")
            if sound is not None and sound.get("tempo") and "tempo_bpm" not in detected:
                try:
                    detected["tempo_bpm"] = float(sound.get("tempo"))
                except ValueError:
                    pass

        local = 0.0
        max_local = 0.0
        for child in m:
            tag = child.tag
            if tag == "note":
                dur_el = child.find("duration")
                dur_q = (int(dur_el.text) / divisions) if dur_el is not None else 0.0
                staff_el = child.find("staff")
                staff = int(staff_el.text) if staff_el is not None else 1
                is_chord = child.find("chord") is not None
                is_rest = child.find("rest") is not None
                is_grace = child.find("grace") is not None

                if is_chord:
                    local -= dur_q  # chord notes share onset with previous

                if not is_rest and not is_grace:
                    pitch = child.find("pitch")
                    if pitch is not None and dur_q > 0:
                        step = pitch.find("step").text
                        octv = int(pitch.find("octave").text)
                        alter_el = pitch.find("alter")
                        alter = int(alter_el.text) if alter_el is not None else 0
                        midi = (octv + 1) * 12 + STEP_TO_PC[step] + alter
                        entry = {
                            "beat": round(cur_beat + local, 4),
                            "midi": midi,
                            "dur": round(dur_q, 4),
                            "measure": m_idx,
                        }
                        (rh_raw if staff == 1 else lh_raw).append(entry)

                local += dur_q
                if local > max_local:
                    max_local = local
            elif tag == "backup":
                d = child.find("duration")
                if d is not None:
                    local -= int(d.text) / divisions
            elif tag == "forward":
                d = child.find("duration")
                if d is not None:
                    local += int(d.text) / divisions
                if local > max_local:
                    max_local = local

        cur_beat += max_local

    return rh_raw, lh_raw, detected


def reduce_rh_to_melody(rh_raw: list[dict]) -> list[dict]:
    """At each onset, keep only the highest pitched RH note (the melody)."""
    by_beat: dict[float, list[dict]] = {}
    for n in rh_raw:
        by_beat.setdefault(n["beat"], []).append(n)
    out = []
    for beat in sorted(by_beat.keys()):
        notes = by_beat[beat]
        out.append(max(notes, key=lambda x: x["midi"]))
    return out


def assign_fingering(rh: list[dict]) -> list[dict]:
    """Pitch-band fingering. Bands are picked from the RH range so the melody
    traces visually upward as it goes higher (low pitches → thumb, high →
    pinky). Five even bands across [min, max+1].
    """
    if not rh:
        return rh
    pitches = [n["midi"] for n in rh]
    lo, hi = min(pitches), max(pitches)
    span = max(hi - lo, 1)
    for n in rh:
        # Map pitch to 1..5; clamp to ensure boundaries land cleanly.
        rel = (n["midi"] - lo) / span
        finger = max(1, min(5, int(rel * 5) + 1))
        n["finger"] = finger
    return rh


def derive_initial_hand_position(rh: list[dict]) -> dict:
    """Take the first appearance of each finger 1..5 in the RH; if a finger
    never appears (small range), seed it with the median pitch."""
    pos = {}
    for n in rh:
        f = n["finger"]
        if f not in pos:
            pos[f] = n["midi"]
        if len(pos) == 5:
            break
    if not pos:
        return {1: 60, 2: 62, 3: 64, 4: 65, 5: 67}
    median = sorted(rh, key=lambda x: x["midi"])[len(rh) // 2]["midi"]
    for f in (1, 2, 3, 4, 5):
        pos.setdefault(f, median)
    return {str(k): pos[k] for k in (1, 2, 3, 4, 5)}


def build_piece(args, rh_raw, lh_raw, detected) -> dict:
    rh = reduce_rh_to_melody(rh_raw)
    rh = assign_fingering(rh)
    lh = [n for n in lh_raw if n["dur"] > 0]
    # Drop the per-note "measure" key from output — it's just for debugging.
    rh_out = [{"beat": n["beat"], "midi": n["midi"], "dur": n["dur"], "finger": n["finger"]} for n in rh]
    lh_out = [{"beat": n["beat"], "midi": n["midi"], "dur": n["dur"]} for n in lh]

    title = args.title or args.id.replace("_", " ").title()
    short = args.short or title.split("(")[0].strip()
    composer = args.composer or "Unknown"
    sub = args.sub or f"Play the right-hand melody of {short}."
    success = args.success or f"You played {short}. Well done."
    tempo = args.tempo or detected.get("tempo_bpm") or 60
    ts = detected.get("time_signature") or [int(args.beats or 4), int(args.beat_type or 4)]

    piece = {
        "metadata": {
            "title": title,
            "short_title": short,
            "composer": composer,
            "sub": sub,
            "success_message": success,
            "tempo_bpm": float(tempo),
            "time_signature": ts,
        },
        "initial_hand_position": derive_initial_hand_position(rh),
        "rh_notes": rh_out,
        "lh_notes": lh_out,
    }
    return piece


def main():
    ap = argparse.ArgumentParser(description="Extract a Piano Train piece from MusicXML.")
    ap.add_argument("input", help="Path to .mxl, .xml, or .musicxml file")
    ap.add_argument("--id", required=True, help="Piece id (used as filename and URL slug)")
    ap.add_argument("--title", help="Full title (default: derived from id)")
    ap.add_argument("--short", help="Short title for chips/topbar (default: title without parens)")
    ap.add_argument("--composer", help="Composer (default: Unknown)")
    ap.add_argument("--sub", help="Start-overlay description (default: generic)")
    ap.add_argument("--success", help="End-of-game success message (default: generic)")
    ap.add_argument("--max-bars", type=int, help="Stop after this many measures (counted from m0/pickup)")
    ap.add_argument("--tempo", type=float, help="BPM override (default: from MusicXML, else 60)")
    ap.add_argument("--beats", help="Time-sig beats override (default: from MusicXML, else 4)")
    ap.add_argument("--beat-type", help="Time-sig beat-type override (default: from MusicXML, else 4)")
    ap.add_argument("--out", help="Output path (default: public/pieces/<id>.json)")
    ap.add_argument("--dry-run", action="store_true", help="Print summary, don't write file")
    args = ap.parse_args()

    in_path = Path(args.input).expanduser()
    if not in_path.exists():
        raise SystemExit(f"Input not found: {in_path}")

    tree = load_musicxml(in_path)
    rh_raw, lh_raw, detected = parse_score(tree, args.max_bars)
    if not rh_raw:
        raise SystemExit("No right-hand notes found (staff=1).")

    piece = build_piece(args, rh_raw, lh_raw, detected)

    last_rh = piece["rh_notes"][-1]
    end_beat = last_rh["beat"] + last_rh["dur"]
    print(f"  source       : {in_path}")
    print(f"  detected     : tempo={detected.get('tempo_bpm', '?')}, "
          f"ts={detected.get('time_signature', '?')}, fifths={detected.get('fifths', '?')}")
    print(f"  rh_notes     : {len(piece['rh_notes'])}, last beat {end_beat:.2f}")
    print(f"  lh_notes     : {len(piece['lh_notes'])}")
    print(f"  hand position: {piece['initial_hand_position']}")

    out_path = Path(args.out) if args.out else PIECES_DIR / f"{args.id}.json"
    if args.dry_run:
        print("  [dry-run] not writing")
        return
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(piece, indent=2) + "\n")
    print(f"  wrote        : {out_path}")
    print(f"  next         : add \"{args.id}\" to public/pieces/manifest.json's order array")
    print(f"                 then open /piano-train.html?piece={args.id}&preview=1 to sanity-check")


if __name__ == "__main__":
    main()
