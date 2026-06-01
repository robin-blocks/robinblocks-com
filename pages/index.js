import Head from 'next/head';
import { useEffect } from 'react';

const CSS = `
  :root {
    --bg: #fafaf7;
    --paper: #ffffff;
    --ink: #1a1a1a;
    --ink-2: #555;
    --ink-3: #8a8a86;
    --rule: #ececea;
    --rule-2: #f3f3f1;
    --accent: oklch(0.62 0.17 262);
    --accent-soft: oklch(0.95 0.04 262);
    --red: oklch(0.62 0.20 28);
    --amber: oklch(0.72 0.15 75);
    --green: oklch(0.60 0.15 155);
    --blue: oklch(0.62 0.15 245);
    --pink: oklch(0.68 0.17 350);
    --radius: 14px;
    --shadow: 0 1px 0 rgba(0,0,0,.03), 0 10px 30px -18px rgba(0,0,0,.18);
  }
  [data-theme="dark"] {
    --bg: #0e0e0d;
    --paper: #17171a;
    --ink: #f2f2ee;
    --ink-2: #b7b7b1;
    --ink-3: #8a8a86;
    --rule: #26262a;
    --rule-2: #1e1e22;
    --accent-soft: oklch(0.30 0.06 262);
    --shadow: 0 1px 0 rgba(0,0,0,.4), 0 20px 50px -20px rgba(0,0,0,.6);
  }
  [data-theme="paper"] {
    --bg: #f1ead8;
    --paper: #fbf6e7;
    --ink: #2a2418;
    --ink-2: #6a5f44;
    --ink-3: #a2957a;
    --rule: #e3d9b8;
    --rule-2: #ece3c5;
    --accent: oklch(0.50 0.14 40);
    --accent-soft: oklch(0.90 0.06 40);
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    background: var(--bg);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    font-feature-settings: "ss01", "cv11";
    min-height: 100vh;
    line-height: 1.45;
  }

  .app {
    max-width: 680px;
    margin: 0 auto;
    background: var(--paper);
    min-height: 100vh;
    border-left: 1px solid var(--rule);
    border-right: 1px solid var(--rule);
    position: relative;
  }
  @media (max-width: 700px) {
    .app { border-left: none; border-right: none; }
  }

  .statusbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 22px 4px;
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  .statusbar .icons { display: flex; gap: 6px; align-items: center; color: var(--ink); }
  .statusbar svg { display: block; }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 16px 0;
  }
  .iconbtn {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: inline-flex; align-items: center; justify-content: center;
    color: var(--ink-2);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background .15s;
  }
  .iconbtn:hover { background: var(--rule-2); color: var(--ink); }

  .header {
    padding: 10px 22px 8px;
  }
  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 6px;
  }
  h1.title {
    font-size: 44px;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0 0 6px;
    line-height: 1.02;
  }
  .subtitle {
    color: var(--ink-2);
    font-size: 15px;
    margin: 0 0 14px;
  }
  .meta-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    background: var(--rule-2);
    color: var(--ink-2);
    font-size: 12.5px;
    font-weight: 500;
  }
  .chip .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

  .section {
    border-top: 1px solid var(--rule);
  }
  .section-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 22px 10px;
    cursor: pointer;
    user-select: none;
  }
  .section-head .left {
    display: flex; align-items: baseline; gap: 8px;
  }
  .section-head h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .section-head .count {
    color: var(--ink-3);
    font-size: 14px;
    font-weight: 500;
  }
  .section-head .chev {
    color: var(--ink-3);
    transition: transform .2s;
  }
  .section.collapsed .chev { transform: rotate(-90deg); }
  .section.collapsed .items { display: none; }

  .items { padding: 0 0 8px; }
  .item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 14px;
    padding: 12px 22px;
    border-top: 1px solid var(--rule-2);
    align-items: start;
    position: relative;
    transition: background .12s;
  }
  .item:hover { background: color-mix(in oklab, var(--paper), var(--ink) 2%); }
  .item:first-child { border-top: none; }

  .check {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1.5px solid var(--ink-3);
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    margin-top: 2px;
    position: relative;
    transition: all .15s;
    padding: 0;
  }
  .check:hover { border-color: var(--accent); }
  .check::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0;
    transform: scale(.2);
    transition: all .2s;
  }
  .check svg {
    position: absolute; inset: 0; margin: auto;
    opacity: 0; color: white;
    transform: scale(.6);
    transition: all .2s;
  }
  .item.done .check { border-color: var(--accent); }
  .item.done .check::after { opacity: 1; transform: scale(1); }
  .item.done .check svg { opacity: 1; transform: scale(1); }

  .check.p1 { border-color: var(--red); }
  .check.p2 { border-color: var(--amber); }
  .check.p3 { border-color: var(--blue); }

  .body { min-width: 0; }
  .line1 {
    display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
  }
  .priority {
    color: var(--red);
    font-weight: 800;
    font-size: 14px;
    letter-spacing: -0.5px;
  }
  .priority.p2 { color: var(--amber); }
  .priority.p3 { color: var(--blue); }
  .label {
    font-size: 15.5px;
    color: var(--ink);
    font-weight: 500;
    line-height: 1.35;
  }
  .item.done .label {
    color: var(--ink-3);
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
  }
  .sublabel {
    font-size: 13.5px;
    color: var(--ink-2);
    margin-top: 3px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    word-break: break-all;
  }
  .line1 { align-items: center !important; }
  .logo {
    width: 26px; height: 26px;
    border-radius: 7px;
    flex-shrink: 0;
    display: inline-flex; align-items: center; justify-content: center;
    color: #fff;
  }
  .logo svg { width: 15px; height: 15px; display: block; }
  .logo.linkedin { background: #0A66C2; }
  .logo.bluesky  { background: #1185FE; }
  .logo.tiktok   { background: #111; }
  .logo.telegram { background: #27A7E7; }
  .logo.instagram { background: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); }
  .logo.facebook { background: #1877F2; }
  .logo.breakout { background: linear-gradient(135deg, oklch(0.72 0.17 75), oklch(0.65 0.18 30)); }
  .logo.happybard { background: linear-gradient(135deg, oklch(0.75 0.14 230), oklch(0.72 0.18 30)); }
  .logo.pianotrain { background: linear-gradient(135deg, oklch(0.70 0.16 240), oklch(0.78 0.18 90)); }
  .logo.robinscore { background: linear-gradient(135deg, oklch(0.68 0.17 230), oklch(0.66 0.19 350)); }
  .logo.bachamole { background: linear-gradient(135deg, oklch(0.74 0.16 140), oklch(0.62 0.13 60)); }
  .logo.museverse { background: linear-gradient(135deg, oklch(0.55 0.18 280), oklch(0.65 0.17 320)); }
  .logo.polydance { background: linear-gradient(135deg, oklch(0.70 0.18 150), oklch(0.65 0.18 200)); }
  .logo.email    { background: #444; }
  .logo.me       { background: #dbe4e3; overflow: hidden; padding: 0; }
  .logo.me img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .meta {
    display: flex; align-items: center; gap: 10px;
    margin-top: 6px;
    flex-wrap: wrap;
  }
  .meta span {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 12.5px;
    color: var(--ink-2);
  }
  .tag {
    color: var(--ink-2);
    font-size: 12.5px;
    font-weight: 500;
    white-space: nowrap;
  }
  .tag .hash { color: var(--pink); font-weight: 700; margin-left: 2px; }
  .tag.t-social .hash { color: var(--blue); }
  .tag.t-project .hash { color: var(--amber); }
  .tag.t-contact .hash { color: var(--green); }
  .tag.t-about .hash { color: var(--pink); }

  .trail {
    display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
    color: var(--ink-3);
    font-size: 13px;
  }
  .trail .arrow {
    opacity: 0;
    transition: opacity .15s, transform .15s;
    color: var(--ink-3);
  }
  .item:hover .trail .arrow { opacity: 1; transform: translateX(2px); }

  .detail {
    grid-column: 1 / -1;
    margin-top: 10px;
    padding: 14px 16px;
    background: var(--rule-2);
    border-radius: 12px;
    font-size: 14px;
    color: var(--ink-2);
    display: none;
  }
  .item.open .detail { display: block; }
  .detail p { margin: 0 0 8px; line-height: 1.55; }
  .detail p:last-child { margin-bottom: 0; }
  .detail a { color: var(--accent); }
  .detail .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: var(--ink);
    color: var(--paper);
    text-decoration: none;
    border-radius: 8px;
    font-size: 13.5px;
    font-weight: 600;
    margin-top: 4px;
    border: none;
    cursor: pointer;
  }
  .detail .btn.ghost {
    background: transparent;
    color: var(--ink);
    border: 1px solid var(--rule);
  }
  .detail .btn + .btn { margin-left: 8px; }

  .email-form {
    display: flex; gap: 8px; margin-top: 10px;
  }
  .email-form input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--rule);
    background: var(--paper);
    color: var(--ink);
    font: inherit;
    font-size: 14px;
  }
  .email-form input:focus { outline: 2px solid var(--accent); outline-offset: -1px; border-color: transparent; }
  .success-msg { color: var(--green); font-weight: 500; font-size: 13.5px; margin-top: 6px; }

  .add-task {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 22px;
    color: var(--ink-3);
    font-size: 14.5px;
    border-top: 1px solid var(--rule);
    cursor: pointer;
    transition: background .12s;
  }
  .add-task:hover { background: var(--rule-2); color: var(--ink-2); }
  .add-task.open { cursor: default; background: transparent; }
  .add-task .plus {
    width: 22px; height: 22px; border-radius: 50%;
    background: var(--accent);
    color: white;
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 700;
    font-size: 15px;
    flex-shrink: 0;
    transition: transform .2s;
  }
  .add-task.open .plus { transform: rotate(45deg); }
  .add-task.open #addLabel { display: none; }
  #addForm { display: none; flex: 1; gap: 8px; align-items: center; }
  .add-task.open #addForm { display: flex; }
  #addInput {
    flex: 1; min-width: 0;
    border: none; outline: none; background: transparent;
    font: inherit; font-size: 14.5px; color: var(--ink);
    padding: 2px 0;
  }
  .mini-btn {
    padding: 6px 12px;
    background: var(--accent); color: white;
    border: none; border-radius: 6px;
    font: inherit; font-size: 12.5px; font-weight: 600;
    cursor: pointer;
  }
  .mini-btn.ghost { background: transparent; color: var(--ink-2); border: 1px solid var(--rule); }

  .filters {
    display: flex; gap: 4px;
    padding: 10px 22px 6px;
    border-top: 1px solid var(--rule);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .filters::-webkit-scrollbar { display: none; }
  .filter {
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-2);
    cursor: pointer;
    white-space: nowrap;
    border: 1px solid transparent;
  }
  .filter.active {
    background: var(--ink);
    color: var(--paper);
  }
  .filter:hover:not(.active) { background: var(--rule-2); }

  .footer {
    padding: 22px;
    border-top: 1px solid var(--rule);
    color: var(--ink-3);
    font-size: 12.5px;
    text-align: center;
  }
  .footer a { color: var(--ink-2); text-decoration: none; }
  .footer a:hover { color: var(--ink); }

  .tweaks {
    position: fixed;
    right: 16px; bottom: 16px;
    width: 280px;
    background: var(--paper);
    border: 1px solid var(--rule);
    border-radius: 14px;
    box-shadow: var(--shadow);
    padding: 14px 16px;
    z-index: 50;
    display: none;
    font-size: 13px;
  }
  .tweaks.show { display: block; }
  .tweaks h3 {
    margin: 0 0 12px;
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.01em;
    display: flex; justify-content: space-between; align-items: center;
  }
  .tweaks h3 .close { cursor: pointer; color: var(--ink-3); }
  .tweak-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; }
  .tweak-row label { color: var(--ink-2); }
  .seg {
    display: inline-flex; background: var(--rule-2); border-radius: 8px; padding: 2px;
  }
  .seg button {
    padding: 4px 8px; font-size: 12px;
    border: none; background: transparent; color: var(--ink-2);
    cursor: pointer; border-radius: 6px; font-weight: 500;
  }
  .seg button.active { background: var(--paper); color: var(--ink); box-shadow: 0 1px 2px rgba(0,0,0,.08); }
  .swatch { width: 20px; height: 20px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; }
  .swatch.active { border-color: var(--ink); }

  .menu-wrap { position: relative; }
  .menu {
    position: absolute;
    right: 0; top: calc(100% + 4px);
    background: var(--paper);
    border: 1px solid var(--rule);
    border-radius: 12px;
    box-shadow: var(--shadow);
    min-width: 200px;
    padding: 6px;
    z-index: 40;
    display: none;
  }
  .menu.show { display: block; }
  .menu-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13.5px;
    color: var(--ink);
    user-select: none;
  }
  .menu-item:hover { background: var(--rule-2); }
  .menu-item svg { color: var(--ink-2); flex-shrink: 0; }
  .menu-item .spacer { flex: 1; }
  .menu-sep { height: 1px; background: var(--rule); margin: 4px 2px; }
  .toggle {
    width: 34px; height: 20px;
    background: var(--rule);
    border-radius: 999px;
    position: relative;
    transition: background .2s;
    flex-shrink: 0;
  }
  .toggle::after {
    content: ""; position: absolute;
    width: 16px; height: 16px; border-radius: 50%;
    background: white; top: 2px; left: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    transition: transform .2s;
  }
  .menu-item.on .toggle { background: var(--accent); }
  .menu-item.on .toggle::after { transform: translateX(14px); }

  .confetti {
    position: fixed; pointer-events: none; z-index: 100;
    width: 8px; height: 8px; border-radius: 2px;
  }

  @keyframes sheen {
    0% { background: var(--accent-soft); }
    100% { background: transparent; }
  }
  .item.just-done { animation: sheen .6s ease-out; }
`;

const BODY_HTML = `
  <div class="app">
    <div class="statusbar">
      <span id="clock">9:41</span>
      <span class="icons" aria-hidden="true">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="0.5"/><rect x="4" y="5" width="3" height="7" rx="0.5"/><rect x="8" y="2" width="3" height="10" rx="0.5"/><rect x="12" y="0" width="3" height="12" rx="0.5" opacity=".3"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 11.5a1 1 0 100-2 1 1 0 000 2zM8 8.5a3 3 0 00-2.12.88l.7.7a2 2 0 012.84 0l.7-.7A3 3 0 008 8.5zM8 5.5a6 6 0 00-4.24 1.76l.7.7A5 5 0 018 6.5a5 5 0 013.54 1.46l.7-.7A6 6 0 008 5.5zM8 2.5a9 9 0 00-6.36 2.64l.7.7A8 8 0 018 3.5a8 8 0 016.66 2.34l.7-.7A9 9 0 008 2.5z"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none" stroke="currentColor" stroke-width="1"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5"/><rect x="2" y="2" width="15" height="7" rx="1" fill="currentColor"/><rect x="20" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg>
      </span>
    </div>

    <div class="topbar">
      <button class="iconbtn" title="Search" onclick="openTweaks()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      </button>
      <div class="menu-wrap">
        <button class="iconbtn" title="More" onclick="toggleMenu(event)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
        </button>
        <div class="menu" id="menu">
          <div class="menu-item" id="menu-dark" onclick="toggleDark()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <span>Dark mode</span>
            <span class="spacer"></span>
            <span class="toggle"></span>
          </div>
          <div class="menu-sep"></div>
          <div class="menu-item" onclick="document.getElementById('menu').classList.remove('show'); openTweaks();">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>Tweaks…</span>
          </div>
          <div class="menu-item" onclick="document.getElementById('menu').classList.remove('show'); window.location.href='/breakout-piano.html'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M7 10v10M11 10v10M15 10v10"/></svg>
            <span>Breakout Piano</span>
          </div>
          <div class="menu-item" onclick="document.getElementById('menu').classList.remove('show'); window.location.href='/happy-bard.html'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            <span>Happy Bard</span>
          </div>
          <div class="menu-item" onclick="document.getElementById('menu').classList.remove('show'); window.location.href='/piano-train.html'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="14" height="8" rx="1"/><circle cx="5" cy="19" r="1.5"/><circle cx="13" cy="19" r="1.5"/><path d="M16 13h4l2 4"/><path d="M19 9v4"/></svg>
            <span>Piano Train</span>
          </div>
          <div class="menu-item" onclick="document.getElementById('menu').classList.remove('show'); window.location.href='/robin-score.html'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>
            <span>Robin Score</span>
          </div>
          <div class="menu-item" onclick="document.getElementById('menu').classList.remove('show'); window.location.href='/bach-a-mole.html'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="15" rx="5" ry="4"/><circle cx="10.5" cy="14" r="1"/><circle cx="13.5" cy="14" r="1"/><path d="M7 13a5 5 0 0 1 10 0"/></svg>
            <span>Bach-a-Mole</span>
          </div>
        </div>
      </div>
    </div>

    <div class="header">
      <div class="eyebrow">robinblocks.com · <span id="todayLabel">Today</span></div>
      <h1 class="title">Robin Blocks</h1>
      <p class="subtitle" id="inboxCount">Founder · AI, Web3 &amp; Music Enthusiast</p>
      <div class="meta-row">
        <span class="chip"><span class="dot"></span> <span id="openCount">11</span> open</span>
        <span class="chip">🌎 Brighton / London</span>
        <span class="chip">🗓 Always shipping</span>
      </div>
    </div>

    <div class="filters" id="filters">
      <div class="filter active" data-filter="all">All</div>
      <div class="filter" data-filter="about">About</div>
      <div class="filter" data-filter="social">Social</div>
      <div class="filter" data-filter="project">Projects</div>
      <div class="filter" data-filter="contact">Contact</div>
      <div class="filter" data-filter="done">Completed</div>
    </div>

    <div id="sections"></div>

    <div id="customSection"></div>

    <div class="add-task" id="addTask" onclick="openAdd(event)">
      <span class="plus">+</span>
      <span id="addLabel">Add task…</span>
      <form id="addForm" onsubmit="submitAdd(event)" onclick="event.stopPropagation()">
        <input id="addInput" type="text" placeholder="What do you want to do?" autocomplete="off" />
        <button type="submit" class="mini-btn">Add</button>
        <button type="button" class="mini-btn ghost" onclick="closeAdd()">Cancel</button>
      </form>
    </div>

    <div class="footer">
      © 2026 Robin Blocks
    </div>
  </div>

  <div class="tweaks" id="tweaks">
    <h3>Tweaks <span class="close" onclick="closeTweaks()">✕</span></h3>
    <div class="tweak-row">
      <label>Theme</label>
      <div class="seg" id="themeSeg">
        <button data-theme="light" class="active">Light</button>
        <button data-theme="paper">Paper</button>
        <button data-theme="dark">Dark</button>
      </div>
    </div>
    <div class="tweak-row">
      <label>Accent</label>
      <div style="display:flex; gap:8px;">
        <div class="swatch active" data-accent="262" style="background: oklch(0.62 0.17 262)"></div>
        <div class="swatch" data-accent="155" style="background: oklch(0.60 0.15 155)"></div>
        <div class="swatch" data-accent="28" style="background: oklch(0.62 0.20 28)"></div>
        <div class="swatch" data-accent="350" style="background: oklch(0.68 0.17 350)"></div>
        <div class="swatch" data-accent="75" style="background: oklch(0.72 0.15 75)"></div>
      </div>
    </div>
    <div class="tweak-row">
      <label>Check action</label>
      <div class="seg" id="actionSeg">
        <button data-action="expand" class="active">Expand</button>
        <button data-action="open">Open link</button>
      </div>
    </div>
    <div class="tweak-row">
      <label>Show completed</label>
      <div class="seg" id="doneSeg">
        <button data-sd="show" class="active">Show</button>
        <button data-sd="hide">Hide</button>
      </div>
    </div>
    <div class="tweak-row">
      <label>Confetti</label>
      <div class="seg" id="confSeg">
        <button data-conf="on" class="active">On</button>
        <button data-conf="off">Off</button>
      </div>
    </div>
  </div>
`;

function initApp() {
  if (typeof window === 'undefined') return;
  if (window.__rbInitialized) return;
  window.__rbInitialized = true;

  const TWEAK_DEFAULTS = {
    theme: 'light',
    accent: '262',
    action: 'expand',
    showDone: 'show',
    confetti: 'on',
  };

  let tweaks = { ...TWEAK_DEFAULTS };
  try {
    const saved = JSON.parse(localStorage.getItem('rb_tweaks') || 'null');
    if (saved) tweaks = { ...tweaks, ...saved };
  } catch (e) {}

  function applyTweaks() {
    document.documentElement.setAttribute('data-theme', tweaks.theme === 'light' ? '' : tweaks.theme);
    const accentMap = {
      '262': ['oklch(0.62 0.17 262)', 'oklch(0.95 0.04 262)'],
      '155': ['oklch(0.60 0.15 155)', 'oklch(0.93 0.05 155)'],
      '28':  ['oklch(0.62 0.20 28)', 'oklch(0.94 0.05 28)'],
      '350': ['oklch(0.62 0.20 350)', 'oklch(0.94 0.05 350)'],
      '75':  ['oklch(0.65 0.17 75)', 'oklch(0.94 0.06 75)'],
    };
    const [a, s] = accentMap[tweaks.accent] || accentMap['262'];
    document.documentElement.style.setProperty('--accent', a);
    document.documentElement.style.setProperty('--accent-soft', s);
    document.body.classList.toggle('hide-done', tweaks.showDone === 'hide');
    document.querySelectorAll('#themeSeg button').forEach(b => b.classList.toggle('active', b.dataset.theme === tweaks.theme));
    document.querySelectorAll('#actionSeg button').forEach(b => b.classList.toggle('active', b.dataset.action === tweaks.action));
    document.querySelectorAll('#doneSeg button').forEach(b => b.classList.toggle('active', b.dataset.sd === tweaks.showDone));
    document.querySelectorAll('#confSeg button').forEach(b => b.classList.toggle('active', b.dataset.conf === tweaks.confetti));
    document.querySelectorAll('.swatch').forEach(sw => sw.classList.toggle('active', sw.dataset.accent === tweaks.accent));
    renderDoneVisibility();
  }

  function setTweak(k, v) {
    tweaks[k] = v;
    applyTweaks();
    try { localStorage.setItem('rb_tweaks', JSON.stringify(tweaks)); } catch (e) {}
  }

  window.openTweaks = () => document.getElementById('tweaks').classList.add('show');
  window.closeTweaks = () => document.getElementById('tweaks').classList.remove('show');

  window.toggleMenu = function (e) {
    e.stopPropagation();
    const m = document.getElementById('menu');
    m.classList.toggle('show');
    syncDarkMenu();
  };
  function syncDarkMenu() {
    document.getElementById('menu-dark').classList.toggle('on', tweaks.theme === 'dark');
  }
  window.toggleDark = function () {
    setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark');
    syncDarkMenu();
  };
  document.addEventListener('click', e => {
    const m = document.getElementById('menu');
    if (!m) return;
    if (!m.contains(e.target) && !e.target.closest('.menu-wrap')) m.classList.remove('show');
  });

  document.querySelectorAll('#themeSeg button').forEach(b => b.onclick = () => setTweak('theme', b.dataset.theme));
  document.querySelectorAll('#actionSeg button').forEach(b => b.onclick = () => setTweak('action', b.dataset.action));
  document.querySelectorAll('#doneSeg button').forEach(b => b.onclick = () => setTweak('showDone', b.dataset.sd));
  document.querySelectorAll('#confSeg button').forEach(b => b.onclick = () => setTweak('confetti', b.dataset.conf));
  document.querySelectorAll('.swatch').forEach(sw => sw.onclick = () => setTweak('accent', sw.dataset.accent));

  const DATA = [
    {
      id: 'about',
      title: 'About Me',
      count: null,
      items: [
        {
          id: 'me',
          logo: 'me',
          label: "Say hi — I'm Robin",
          priority: 1,
          tag: 'about',
          detail: `<p><strong>Founder · AI, Web3 &amp; Music Enthusiast.</strong></p>
            <p>I build at the intersection of emerging tech and creative tools. Currently working on <a href="https://museverse.xyz" target="_blank" rel="noopener">Museverse</a> and <a href="https://polydance.net" target="_blank" rel="noopener">Polydance</a>, plus the occasional weird side project like Breakout Piano.</p>
            <p>Reach out on any of the platforms below — I reply fastest on Telegram.</p>`,
          action: 'expand',
          due: 'Ongoing',
        },
      ],
    },
    {
      id: 'social',
      title: 'Find me online',
      items: [
        { id: 'linkedin', label: 'LinkedIn', logo: 'linkedin', sublabel: 'linkedin.com/in/robin-spottiswoode', href: 'https://www.linkedin.com/in/robin-spottiswoode', tag: 'social', priority: 3, due: 'Work' },
        { id: 'instagram', label: 'Instagram', logo: 'instagram', sublabel: '@robin_blocks', href: 'https://www.instagram.com/robin_blocks/', tag: 'social', due: 'Follow' },
        { id: 'bluesky', label: 'Bluesky', logo: 'bluesky', sublabel: '@robinblocks.bsky.social', href: 'https://bsky.app/profile/robinblocks.bsky.social', tag: 'social', due: 'Posts' },
        { id: 'tiktok', label: 'TikTok', logo: 'tiktok', sublabel: 'tiktok.com/@robin_blocks', href: 'https://www.tiktok.com/@robin_blocks', tag: 'social', due: 'Videos' },
        { id: 'telegram', label: 'Telegram', logo: 'telegram', sublabel: '@robin_blocks', href: 'https://t.me/robin_blocks', tag: 'contact', priority: 2, due: 'DM me' },
      ],
    },
    {
      id: 'projects',
      title: 'Projects',
      items: [
        { id: 'breakout', logo: 'breakout', label: 'Breakout Piano', sublabel: 'A mini-game where you play Breakout and hit piano keys', href: '/breakout-piano.html', tag: 'project', priority: 1, due: 'Play →', isLocal: true },
        { id: 'happybard', logo: 'happybard', label: 'Happy Bard', sublabel: 'Flappy Bird, but you sing to keep the bird aloft', href: '/happy-bard.html', tag: 'project', priority: 1, due: 'Play →', isLocal: true },
        { id: 'pianotrain', logo: 'pianotrain', label: 'Piano Train', sublabel: 'Crossy Road meets piano — Mozart K545, Chopin Op. 9 No. 2', href: '/piano-train.html', tag: 'project', priority: 1, due: 'Play →', isLocal: true },
        { id: 'robinscore', logo: 'robinscore', label: 'Robin Score', sublabel: 'osu!-style hit circles — play Mozart K545 by rhythm and fingering', href: '/robin-score.html', tag: 'project', priority: 1, due: 'Play →', isLocal: true },
        { id: 'bachamole', logo: 'bachamole', label: 'Bach-a-Mole', sublabel: 'Whack-a-mole call-and-response — repeat Bach\'s WTC Prelude No.1 on the numpad', href: '/bach-a-mole.html', tag: 'project', priority: 1, due: 'Play →', isLocal: true },
        { id: 'museverse', logo: 'museverse', label: 'Museverse', sublabel: 'museverse.xyz', href: 'https://museverse.xyz', tag: 'project', priority: 2, due: 'Visit' },
        { id: 'polydance', logo: 'polydance', label: 'Polydance', sublabel: 'polydance.net', href: 'https://polydance.net', tag: 'project', priority: 2, due: 'Visit' },
      ],
    },
    {
      id: 'inbox',
      title: 'Inbox',
      items: [
        { id: 'email', logo: 'email', label: 'Get occasional updates from me', sublabel: 'I send a short email every few weeks. No spam, promise.', tag: 'contact', priority: 2, action: 'email', due: 'Subscribe' },
        { id: 'xr', logo: 'facebook', label: 'XR Creators Club', sublabel: 'facebook.com/groups/mixedreality.creators', href: 'https://www.facebook.com/groups/mixedreality.creators', tag: 'contact', due: 'Join group' },
      ],
    },
  ];

  const DONE = new Set(JSON.parse(localStorage.getItem('rb_done') || '[]'));
  function saveDone() { localStorage.setItem('rb_done', JSON.stringify([...DONE])); }

  const LOGOS = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.06 1.28.26 2.15.56 2.91.31.8.73 1.48 1.38 2.13.65.65 1.33 1.07 2.13 1.38.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07 3.26 0 3.67-.01 4.95-.07 1.28-.06 2.15-.26 2.91-.56.8-.31 1.48-.73 2.13-1.38.65-.65 1.07-1.33 1.38-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.06-1.28-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.23.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>',
    bluesky: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.33 4.52c2.57 1.93 5.33 5.84 6.34 7.94 1.01-2.1 3.77-6.01 6.34-7.94 1.85-1.39 4.86-2.47 4.86.97 0 .69-.4 5.78-.63 6.6-.8 2.88-3.73 3.61-6.34 3.17 4.56.78 5.72 3.35 3.22 5.92-4.76 4.88-6.84-1.23-7.37-2.79-.1-.29-.14-.42-.14-.3 0-.12-.05.01-.14.3-.54 1.56-2.62 7.67-7.37 2.79-2.5-2.57-1.34-5.14 3.22-5.92-2.62.44-5.55-.29-6.34-3.17-.23-.82-.63-5.91-.63-6.6 0-3.44 3.01-2.37 4.86-.97z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m9.78 18.65 .28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.94c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    breakout: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="4" height="3" rx="0.5"/><rect x="9" y="4" width="4" height="3" rx="0.5"/><rect x="15" y="4" width="6" height="3" rx="0.5"/><circle cx="12" cy="14" r="1.5"/><rect x="7" y="19" width="10" height="2" rx="1"/></svg>',
    happybard: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    pianotrain: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="9" width="14" height="8" rx="1"/><circle cx="6" cy="19" r="1.5"/><circle cx="13" cy="19" r="1.5"/><path d="M16 13h4l2 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 9v4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    robinscore: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/></svg>',
    bachamole: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="15" rx="5" ry="4" fill="currentColor" stroke="none"/><circle cx="10.5" cy="14" r="1" fill="#fff"/><circle cx="13.5" cy="14" r="1" fill="#fff"/><path d="M7 12a5 5 0 0 1 10 0"/></svg>',
    museverse: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.3 6.5 3.6L12 11.5 5.5 7.9 12 4.3zM5 9.6l6 3.4v7L5 16.6V9.6zm14 0v7L13 20v-7l6-3.4z"/></svg>',
    polydance: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="8" cy="8" r="3" opacity=".9"/><circle cx="16" cy="10" r="3" opacity=".7"/><circle cx="10" cy="16" r="3" opacity=".8"/><circle cx="17" cy="17" r="2" opacity=".6"/></svg>',
  };
  function logoHtml(it) {
    if (!it.logo) return '';
    if (it.logo === 'me') return '<span class="logo me"><img src="/assets/avatar.webp" alt="Robin"/></span>';
    return `<span class="logo ${it.logo}">${LOGOS[it.logo] || ''}</span>`;
  }

  function priorityMark(p) {
    if (!p) return '';
    const cls = p === 1 ? 'p1' : p === 2 ? 'p2' : 'p3';
    const marks = p === 1 ? '!!!' : p === 2 ? '!!' : '!';
    return `<span class="priority ${cls}">${marks}</span>`;
  }
  function checkClass(p) {
    if (p === 1) return 'p1';
    if (p === 2) return 'p2';
    if (p === 3) return 'p3';
    return '';
  }
  function tagPill(tag) {
    const map = {
      social: ['social', 't-social'],
      project: ['project', 't-project'],
      contact: ['contact', 't-contact'],
      about: ['about', 't-about'],
    };
    const [name, cls] = map[tag] || [tag, ''];
    return `<span class="tag ${cls}">${name}<span class="hash">#</span></span>`;
  }

  function render() {
    const root = document.getElementById('sections');
    if (!root) return;
    root.innerHTML = '';
    DATA.forEach(sec => {
      const secEl = document.createElement('div');
      secEl.className = 'section';
      secEl.dataset.section = sec.id;
      const count = sec.items.filter(i => !DONE.has(i.id)).length;
      secEl.innerHTML = `
        <div class="section-head">
          <div class="left">
            <h2>${sec.title}</h2>
            <span class="count">${count}</span>
          </div>
          <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
        </div>
        <div class="items"></div>
      `;
      secEl.querySelector('.section-head').addEventListener('click', () => secEl.classList.toggle('collapsed'));
      const itemsEl = secEl.querySelector('.items');
      sec.items.forEach(it => itemsEl.appendChild(renderItem(it, sec.id)));
      root.appendChild(secEl);
    });
    updateOpenCount();
    renderDoneVisibility();
  }

  function renderItem(it, secId) {
    const el = document.createElement('div');
    const done = DONE.has(it.id);
    el.className = 'item' + (done ? ' done' : '');
    el.dataset.id = it.id;
    el.dataset.tag = it.tag || '';
    el.dataset.section = secId;
    const emailForm = it.action === 'email' ? `
      <form class="email-form" data-email-id="${it.id}">
        <input type="email" required placeholder="you@domain.com" />
        <button class="btn" type="submit">Subscribe</button>
      </form>
      <div class="success-msg" id="ok-${it.id}" style="display:none"></div>
    ` : '';
    const actions = it.href ? `
      <a class="btn" href="${it.href}" ${it.isLocal ? '' : 'target="_blank" rel="noopener"'}>
        Open ${it.isLocal ? '' : '↗'}
      </a>
      <button class="btn ghost" data-copy="${it.sublabel || it.href}">Copy</button>
    ` : '';
    el.innerHTML = `
      <button class="check ${checkClass(it.priority)}" aria-label="Complete">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
      <div class="body">
        <div class="line1">
          ${priorityMark(it.priority)}
          ${logoHtml(it)}
          <span class="label">${it.label}</span>
        </div>
        ${it.sublabel ? `<div class="sublabel">${it.sublabel}</div>` : ''}
        <div class="meta">
          ${it.due ? `<span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${it.due}
          </span>` : ''}
          ${it.tag ? tagPill(it.tag) : ''}
        </div>
        ${ (it.detail || emailForm || actions) ? `
          <div class="detail">
            ${it.detail || ''}
            ${emailForm}
            ${actions ? `<div style="margin-top:${it.detail ? '4px' : '0'}">${actions}</div>` : ''}
          </div>
        ` : ''}
      </div>
      <div class="trail">
        <span class="arrow">→</span>
      </div>
    `;

    el.querySelector('.check').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCheck(it.id);
    });

    el.querySelector('.body').addEventListener('click', (e) => {
      if (e.target.closest('form') || e.target.closest('.btn') || e.target.closest('a')) return;
      el.classList.toggle('open');
    });

    const form = el.querySelector('.email-form');
    if (form) form.addEventListener('submit', (e) => submitEmail(e, it.id));

    const copyBtn = el.querySelector('[data-copy]');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        copyText(copyBtn.dataset.copy);
        copyBtn.textContent = 'Copied ✓';
      });
    }

    return el;
  }

  function toggleCheck(id) {
    const el = document.querySelector(`.item[data-id="${id}"]`);
    if (!el) return;
    const item = DATA.flatMap(s => s.items).find(i => i.id === id);
    if (DONE.has(id)) {
      DONE.delete(id);
      el.classList.remove('done');
    } else {
      DONE.add(id);
      el.classList.add('done', 'just-done');
      setTimeout(() => el.classList.remove('just-done'), 700);
      if (tweaks.confetti === 'on') fireConfetti(el);
      if (item.href && tweaks.action === 'open') {
        setTimeout(() => {
          if (item.isLocal) window.location.href = item.href;
          else window.open(item.href, '_blank', 'noopener');
        }, 350);
      } else if (item.action === 'expand' || item.detail || item.action === 'email') {
        el.classList.add('open');
      } else if (item.href && tweaks.action === 'expand') {
        el.classList.add('open');
      }
    }
    saveDone();
    updateOpenCount();
    renderDoneVisibility();
    const sec = el.closest('.section');
    const remaining = [...sec.querySelectorAll('.item:not(.done)')].length;
    sec.querySelector('.count').textContent = remaining;
  }

  async function submitEmail(e, id) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input');
    const btn = form.querySelector('button[type="submit"]');
    const ok = document.getElementById('ok-' + id);
    const email = (input.value || '').trim();
    if (!email) return;

    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = 'Subscribing…';
    if (ok) { ok.style.color = ''; ok.style.display = 'none'; ok.textContent = ''; }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        if (ok) {
          ok.textContent = "✓ Thanks! You're on the list.";
          ok.style.display = 'block';
        }
        input.value = '';
        const el = document.querySelector(`.item[data-id="${id}"]`);
        if (el && !el.classList.contains('done')) toggleCheck(id);
      } else {
        if (ok) {
          ok.style.color = 'var(--red)';
          ok.textContent = '✗ ' + (data.error || 'Something went wrong. Try again.');
          ok.style.display = 'block';
        }
      }
    } catch (err) {
      if (ok) {
        ok.style.color = 'var(--red)';
        ok.textContent = '✗ Network error. Please try again.';
        ok.style.display = 'block';
      }
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  }

  function copyText(t) {
    try { navigator.clipboard.writeText(t); } catch (e) {}
  }

  function updateOpenCount() {
    const total = DATA.flatMap(s => s.items).length;
    const open = total - DONE.size;
    const el = document.getElementById('openCount');
    if (el) el.textContent = open;
  }

  function renderDoneVisibility() {
    const active = document.querySelector('.filter.active')?.dataset.filter || 'all';
    document.querySelectorAll('.item').forEach(el => {
      const isDone = el.classList.contains('done');
      let visible = true;
      if (active === 'done') visible = isDone;
      else if (active !== 'all') visible = el.dataset.tag === active;
      if (active !== 'done' && tweaks.showDone === 'hide' && isDone) visible = false;
      el.style.display = visible ? '' : 'none';
    });
    document.querySelectorAll('.section').forEach(sec => {
      const any = [...sec.querySelectorAll('.item')].some(i => i.style.display !== 'none');
      sec.style.display = any ? '' : 'none';
    });
  }

  document.getElementById('filters').addEventListener('click', e => {
    const f = e.target.closest('.filter');
    if (!f) return;
    document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    renderDoneVisibility();
  });

  function fireConfetti(el) {
    const rect = el.getBoundingClientRect();
    const x = rect.left + 20;
    const y = rect.top + 20;
    const colors = ['oklch(0.70 0.18 28)', 'oklch(0.72 0.17 155)', 'oklch(0.65 0.18 262)', 'oklch(0.72 0.17 75)', 'oklch(0.70 0.18 350)'];
    for (let i = 0; i < 14; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = x + 'px';
      c.style.top = y + 'px';
      c.style.background = colors[i % colors.length];
      document.body.appendChild(c);
      const dx = (Math.random() - 0.5) * 240;
      const dy = -Math.random() * 140 - 30;
      const rot = (Math.random() - 0.5) * 720;
      c.animate([
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity: 1, offset: 0.6 },
        { transform: `translate(${dx * 1.3}px, ${dy + 260}px) rotate(${rot * 1.2}deg)`, opacity: 0 },
      ], { duration: 1100 + Math.random() * 400, easing: 'cubic-bezier(.2,.6,.3,1)' }).onfinish = () => c.remove();
    }
  }

  function tickClock() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = `${h}:${m}`;
    const todayEl = document.getElementById('todayLabel');
    if (todayEl) todayEl.textContent = d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  }
  tickClock();
  setInterval(tickClock, 30000);

  const CUSTOM = JSON.parse(localStorage.getItem('rb_custom') || '[]');
  function saveCustom() { localStorage.setItem('rb_custom', JSON.stringify(CUSTOM)); }
  function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  function renderCustom() {
    const host = document.getElementById('customSection');
    if (!host) return;
    host.innerHTML = '';
    if (!CUSTOM.length) return;
    const sec = document.createElement('div');
    sec.className = 'section';
    sec.dataset.section = 'custom';
    sec.innerHTML = `
      <div class="section-head">
        <div class="left"><h2>Your tasks</h2><span class="count">${CUSTOM.filter(c => !c.done).length}</span></div>
        <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
      </div>
      <div class="items" id="customItems"></div>
    `;
    sec.querySelector('.section-head').addEventListener('click', () => sec.classList.toggle('collapsed'));
    host.appendChild(sec);
    const items = sec.querySelector('#customItems');
    CUSTOM.forEach((c, i) => {
      const el = document.createElement('div');
      el.className = 'item' + (c.done ? ' done' : '');
      el.dataset.tag = 'personal';
      el.innerHTML = `
        <button class="check" aria-label="Complete">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
        <div class="body">
          <div class="line1"><span class="label">${escapeHtml(c.text)}</span></div>
          <div class="meta"><span class="tag">personal<span class="hash">#</span></span></div>
        </div>
        <div class="trail"><button class="iconbtn" style="width:28px;height:28px" title="Delete">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
        </button></div>
      `;
      el.querySelector('.check').addEventListener('click', (e) => { e.stopPropagation(); toggleCustom(i); });
      el.querySelector('.iconbtn').addEventListener('click', (e) => { e.stopPropagation(); removeCustom(i); });
      items.appendChild(el);
    });
  }
  function toggleCustom(i) {
    CUSTOM[i].done = !CUSTOM[i].done;
    saveCustom();
    const wasDone = CUSTOM[i].done;
    renderCustom();
    if (wasDone && tweaks.confetti === 'on') {
      const el = document.querySelectorAll('#customItems .item')[i];
      if (el) fireConfetti(el);
    }
  }
  function removeCustom(i) { CUSTOM.splice(i, 1); saveCustom(); renderCustom(); }

  window.openAdd = function () {
    const el = document.getElementById('addTask');
    if (el.classList.contains('open')) return;
    el.classList.add('open');
    setTimeout(() => document.getElementById('addInput').focus(), 10);
  };
  window.closeAdd = function () {
    document.getElementById('addTask').classList.remove('open');
    document.getElementById('addInput').value = '';
  };
  window.submitAdd = function (e) {
    e.preventDefault();
    const v = document.getElementById('addInput').value.trim();
    if (!v) return;
    CUSTOM.push({ text: v, done: false });
    saveCustom();
    renderCustom();
    document.getElementById('addInput').value = '';
    document.getElementById('addInput').focus();
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeAdd();
  });

  applyTweaks();
  render();
  renderCustom();
}

export default function Home() {
  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <Head>
        <title>Robin Blocks — Today</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
