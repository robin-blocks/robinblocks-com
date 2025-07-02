import Head from 'next/head';
import Link from 'next/link';

export default function Veo3Guide() {
  return (
    <>
      <Head>
        <title>A Practical Guide to Prompting with Veo 3: Achieving Cinematic Consistency - Robin Blocks</title>
        <meta name="description" content="A comprehensive guide to generating high-quality, narratively consistent video clips using Veo 3 with practical workflows and techniques." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="A Practical Guide to Prompting with Veo 3: Achieving Cinematic Consistency" />
        <meta property="og:description" content="A comprehensive guide to generating high-quality, narratively consistent video clips using Veo 3 with practical workflows and techniques." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="A Practical Guide to Prompting with Veo 3: Achieving Cinematic Consistency" />
        <meta property="twitter:description" content="A comprehensive guide to generating high-quality, narratively consistent video clips using Veo 3 with practical workflows and techniques." />
      </Head>

      <main className="min-h-screen gradient-bg py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              A Practical Guide to Prompting with{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Veo 3
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Achieving Cinematic Consistency
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-8 font-medium">
                This guide outlines a robust workflow for generating high-quality, narratively consistent video clips using Veo 3. 
                The core principle is treating each 8-second prompt not as an isolated instruction, but as a{' '}
                <strong className="text-blue-600">self-contained universe</strong> that carries all the necessary information 
                to maintain continuity with the clips before and after it.
              </p>

              {/* Part 1 */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-200 pb-3">
                  Part 1: The Foundation – The Master Sheet Workflow
                </h2>
                
                <p className="text-gray-700 mb-6">
                  Before writing a single video prompt, you must establish your project&apos;s &ldquo;source of truth.&rdquo; 
                  This involves creating detailed, text-based reference sheets for every consistent element in your story.
                </p>

                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-3">1</span>
                    Create Character Master Sheets
                  </h3>
                  <p className="text-gray-700 mb-4">
                    For every recurring character, create a detailed paragraph that you will copy and paste. 
                    The model has no memory, so this description must appear in <em>every single prompt</em> the character is in.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">• Visuals:</h4>
                      <p className="text-gray-700 mb-3">
                        Be hyper-specific. Go beyond &ldquo;a man in a jacket&rdquo; to include age, specific facial features, 
                        hair style and color, skin details, posture, and exact clothing, including textures and accessories.
                      </p>
                      <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-blue-400">
                        <p className="text-sm text-gray-700 italic">
                          <strong>Example:</strong> Dr. Kaelen Reyes, a woman in her late 30s with dark, curious eyes and black hair 
                          tied back practically in a simple ponytail. She has a thoughtful, academic face. 
                          She wears a lightweight, dark grey Earth Federation field jumpsuit with a visible mission patch on the shoulder.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">• Vocal Profile:</h4>
                      <p className="text-gray-700 mb-3">
                        Describe the character&apos;s voice clearly to guide the audio generation for any dialogue.
                      </p>
                      <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-blue-400">
                        <p className="text-sm text-gray-700 italic">
                          <strong>Example:</strong> Her vocal profile is a calm, thoughtful, mid-range voice with a standard American accent; 
                          she speaks with clarity and deliberation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-3">2</span>
                    Create Location Master Sheets
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Similarly, create a detailed paragraph for each recurring location. 
                    This description establishes the atmosphere, lighting, and key features that must remain consistent.
                  </p>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">• Be Evocative:</h4>
                    <p className="text-gray-700 mb-3">
                      Don&apos;t just name the place. Describe the mood, the materials, the lighting, 
                      and even the smell or feeling of the air.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-blue-400">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Example (Interior):</p>
                        <p className="text-sm text-gray-700 italic">
                          The interior of the Earth Federation Lander Cockpit is a sterile and silent bridge, 
                          where the air smells of filtered oxygen and clean metal. The design is minimalist and functional, 
                          with two pilot seats made of dark memory-gel polymer... all light originating from the glowing 
                          blue holographic displays...
                        </p>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-blue-400">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Example (Exterior):</p>
                        <p className="text-sm text-gray-700 italic">
                          The alien forest of Planet Aethel at dawn. This is a world of breathtaking, wild beauty... 
                          The air is thick with mist. Towering, gnarled, ancient trees are draped in thick, 
                          phosphorescent moss that glows faintly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Part 2 */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-200 pb-3">
                  Part 2: The Core Technique – The &ldquo;Self-Contained Universe&rdquo; Prompt
                </h2>
                
                <p className="text-gray-700 mb-6">
                  Every prompt you write must follow a strict cinematic blueprint and contain all the information needed 
                  for that specific shot, assuming the model knows nothing else.
                </p>

                <div className="bg-yellow-50 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">The Blueprint Structure:</h3>
                  
                  <div className="space-y-8">
                    {/* Subject */}
                    <div className="border-l-4 border-yellow-400 pl-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3">Subject:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Clearly state the main focus of the shot.</li>
                        <li>• If a character is the subject, <strong>paste their entire Character Master Sheet here.</strong> If two characters are present, paste both full descriptions.</li>
                      </ul>
                      <div className="bg-white rounded-lg p-4 mt-3 border border-yellow-200">
                        <p className="text-sm text-gray-700 italic">
                          <strong>Example:</strong> Dr. Kaelen Reyes, a woman in her late 30s... [full description]. 
                          AND Commander Eva Rostova, a woman in her 40s... [full description].
                        </p>
                      </div>
                    </div>

                    {/* Context */}
                    <div className="border-l-4 border-yellow-400 pl-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3">Context:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• This is the most critical field for visual consistency. Fully describe the environment.</li>
                        <li>• <strong>Paste the entire Location Master Sheet</strong> for the primary location.</li>
                        <li>• <strong>The &ldquo;Interior + Exterior&rdquo; Rule:</strong> If the shot is an interior with a window or viewport, you must describe <strong>both</strong> the interior and the visible exterior. Paste the full master sheets for both.</li>
                      </ul>
                      <div className="bg-white rounded-lg p-4 mt-3 border border-yellow-200">
                        <p className="text-sm text-gray-700 italic">
                          <strong>Example:</strong> The scene is set within the interior of the Earth Federation Lander Cockpit... [full cockpit description]. 
                          Through the large, reinforced forward viewport, the alien forest of Planet Aethel is visible at dawn... [full forest description].
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="border-l-4 border-yellow-400 pl-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3">Action:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Describe precisely what the subject is <em>doing</em> within the 8-second clip. Be specific and evocative.</li>
                        <li>• Separate description from action. The <code className="bg-gray-200 px-2 py-1 rounded">Subject</code> field describes <em>who they are</em>; the <code className="bg-gray-200 px-2 py-1 rounded">Action</code> field describes <em>what they do</em>.</li>
                      </ul>
                      <div className="bg-white rounded-lg p-4 mt-3 border border-yellow-200">
                        <p className="text-sm text-gray-700 italic">
                          <strong>Example:</strong> Instead of &ldquo;A skilled weaver works,&rdquo; use &ldquo;Her nimble hands move with practiced grace, 
                                                      passing a shuttle back and forth, weaving a cloth threaded with glowing fibers.&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Style/Composition */}
                    <div className="border-l-4 border-yellow-400 pl-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3">Style/Composition:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Define the visual language of your project. Be consistent.</li>
                        <li>• Specify shot type (<code className="bg-gray-200 px-2 py-1 rounded">Cinematic close-up</code>, <code className="bg-gray-200 px-2 py-1 rounded">Wide establishing shot</code>), lighting (<code className="bg-gray-200 px-2 py-1 rounded">high-contrast</code>, <code className="bg-gray-200 px-2 py-1 rounded">soft natural light</code>), lens effects (<code className="bg-gray-200 px-2 py-1 rounded">anamorphic</code>, <code className="bg-gray-200 px-2 py-1 rounded">shallow depth of field</code>), and overall mood (<code className="bg-gray-200 px-2 py-1 rounded">gritty realism</code>, <code className="bg-gray-200 px-2 py-1 rounded">atmospheric</code>).</li>
                      </ul>
                      <div className="bg-white rounded-lg p-4 mt-3 border border-yellow-200">
                        <p className="text-sm text-gray-700 italic">
                          <strong>Example:</strong> Cinematic extreme close-up shot, framed so tightly that only her eyes are visible. 
                          The focus is razor-sharp on her irises. The lighting is a mix of the cool blue light from the ship&apos;s consoles 
                          and the soft, grey light of dawn.
                        </p>
                      </div>
                    </div>

                    {/* Camera Motion */}
                    <div className="border-l-4 border-yellow-400 pl-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3">Camera Motion:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Explicitly state the camera movement, even if it&apos;s static. This removes ambiguity.</li>
                      </ul>
                      <div className="bg-white rounded-lg p-4 mt-3 border border-yellow-200">
                        <p className="text-sm text-gray-700 italic">
                          <strong>Examples:</strong> <code className="bg-gray-200 px-2 py-1 rounded">Static shot.</code>, 
                          <code className="bg-gray-200 px-2 py-1 rounded">Slow push-in on her face.</code>, 
                          <code className="bg-gray-200 px-2 py-1 rounded">Smooth pan right, following her gaze.</code>
                        </p>
                      </div>
                    </div>

                    {/* Ambiance/Audio */}
                    <div className="border-l-4 border-yellow-400 pl-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3">Ambiance/Audio:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>Diegetic Sound Only:</strong> This is crucial. Describe only the sounds that exist within the world of the scene. Do not mention music or narration, as those are post-production layers for different models.</li>
                        <li>• Be specific. Instead of &ldquo;noise,&rdquo; use &ldquo;the rhythmic clang of a hammer,&rdquo; &ldquo;the low hum of life support,&rdquo; or &ldquo;the sharp click of a plastic cover being lifted.&rdquo;</li>
                      </ul>
                    </div>

                    {/* Dialogue */}
                    <div className="border-l-4 border-yellow-400 pl-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3">Dialogue:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Keep it short and natural to fit within the 8-second clip.</li>
                        <li>• Assign lines using physical descriptions, not names, for maximum clarity.</li>
                      </ul>
                      <div className="bg-white rounded-lg p-4 mt-3 border border-yellow-200">
                        <p className="text-sm text-gray-700 italic">
                          <strong>Example:</strong> The woman with the blonde bun, her voice a crisp, commanding alto with a clipped, 
                          Pan-Slavic accent, says: &ldquo;Miracles aren&apos;t in my mission parameters.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Master Veo 3 Prompting?</h3>
                <p className="text-lg mb-6 text-white/90">
                  Start implementing these techniques in your next video project and achieve the cinematic consistency you&apos;ve been looking for.
                </p>
                <Link 
                  href="/"
                  className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Back to Robin Blocks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 