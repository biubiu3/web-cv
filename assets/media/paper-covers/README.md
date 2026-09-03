# Publication-cover source note

The current cover redesign is being reviewed one paper at a time. `scripts/build-publication-covers.mjs` currently renders only the HEAR graphical-abstract sample. Its exact English labels are browser-rendered rather than generated pixels.

## HEAR concept reconstruction sample

`hear-concept-reconstruction-base-v4.png` was created with the built-in image-generation tool after reading the scientific meaning expressed by the paper's Figure 1 caption, Figure 2 caption, motivation, and architectural-overview prose in `/DataBig/hear_ijrr/HEAR_IJRR.tex`. The paper figures themselves were deliberately not supplied as visual references: this version reconstructs the causal story instead of copying their panel or block-diagram organization. The generated layer contains no typography; `scripts/build-publication-covers.mjs` overlays all exact English terminology and explanation deterministically.

Initial generation prompt:

> Use case: scientific-educational
> Asset type: original 16:9 graphical abstract base for an academic robotics website
> Primary request: Create a completely new visual explanation of a sound-aware robot policy. Do not imitate, trace, compress, or rearrange any existing paper figure or neural-network architecture diagram. Communicate one causal story: a brief sound happens while a robot is already executing an action; the waveform ends before the next policy query; a persistent memory carries the evidence across that listening gap; vision, language instruction, robot state, and remembered sound are interpreted together; the next smooth action changes because of that past event. Include a small secondary training-only idea: predicting what will be heard next teaches temporal progress, but this branch is absent during deployment.
> Scene/backdrop: pure white background with generous empty space.
> Visual concept: one continuous sweeping time path, not a row of boxes. On the left, a restrained flat line-art tabletop robot scene in mid-action and a single coral acoustic pulse from a small physical event. Across the middle, let the pulse end and transform into a thin blue memory thread that visibly spans an open gap in time. Bring that thread into an original central convergence motif, such as a clean circular lens or woven junction, where small icons for camera vision, a speech instruction, and joint state join it. From this junction, unfurl a coral smooth motion ribbon toward a second robot pose on the right, making it clear that retained sound changes the next action. Below the convergence motif, add one compact amber dotted learning loop leading to a predicted future waveform, visually separated from the main deployment path.
> Scientific relationships: the original sound must end before the later decision; memory persists after the raw sound disappears; all four modalities meet at reasoning; the smooth action is downstream of reasoning; the amber future-audio loop is training-only and must not appear to control deployment.
> Style/medium: clean flat 2D editorial line illustration, precise thin strokes, simple geometric symbols, mature journal graphical-abstract quality, subtle technological character through disciplined geometry and signal motifs.
> Composition/framing: wide landscape, asymmetrical but balanced; a single narrative field with curved causal motion and one central focal point; no repeated module panels and no rectilinear architecture pipeline. Reserve calm white areas near the memory thread, convergence motif, motion ribbon, and amber learning loop for deterministic English labels added later.
> Color palette: white, dark navy-gray linework, restrained blue for remembered evidence, teal for contextual fusion, coral for the sound event and resulting action, amber for the training-only learning loop.
> Text constraints: absolutely no words, letters, numbers, equations, pseudo-text, glyph-like labels, logos, or watermarks.
> Avoid: copying the visual organization of a paper figure; four side-by-side method boxes; neural-network block diagrams; stacked architecture cards; slide or PPT cover layout; giant acronym; title banner; 3D rendering; gradients; glow; neon; holograms; glass UI; sci-fi dashboard; advertising polish; photorealism; hand-painted texture; decorative particles; dense micro-detail; generic AI brain imagery.

Targeted refinement prompt:

> Use case: scientific-educational
> Asset type: targeted refinement of the supplied 16:9 graphical-abstract base
> Input image: edit target; preserve its original causal narrative and overall placement.
> Primary request: Change only the central multimodal-fusion area and polish the line quality. Replace the logo-like circular pinwheel hub with a restrained scientific convergence motif: four thin, clearly distinguishable signal strands weave together into one compact teal junction, with no emblem, badge, ring, flower, aperture, or brand-mark appearance. Remove the three large circular or speech-bubble enclosures above it. Keep the camera/scene, spoken-instruction, and robot-state meanings as small unframed flat line icons that feed the convergence motif through clean curved connector lines. Make the overall strokes uniformly crisp and eliminate fuzzy halos or glow around the coral action ribbon and other edges.
> Invariants: keep the left physical robot scene, the single coral sound event, the fact that the coral waveform ends, the blue persistent memory thread spanning time, the right coral smooth-action trajectory and later robot pose, the amber dotted training-only future-waveform loop, the pure white background, the wide asymmetrical composition, and all existing causal directions. Do not add any modules or claims.
> Text constraints: no words, letters, numbers, equations, pseudo-text, logos, or watermarks.
> Avoid: architecture boxes, stacked cards, circular input bubbles, speech bubbles, logo-like central symbols, neural-network dashboards, 3D, gradients, glow, neon, photorealism, advertising polish, decorative particles.

## Earlier paper-texture source

Only `notebook-paper-generated.png`, used as the restrained MID background, was generated with the built-in image-generation tool. Final prompt:

> Use case: scientific-educational. Asset type: subtle background texture for one academic publication cover. Primary request: a flat, high-resolution scan of warm off-white scientific notebook paper, quietly tactile and materially believable. Scene/backdrop: edge-to-edge paper surface only. Style/medium: archival paper scan, natural fibers, extremely faint graphite handling marks and a barely visible pale blue measurement grid; understated, imperfect, editorial, not polished. Composition/framing: uniform landscape texture with no focal object and no lighting gradient. Color palette: warm ivory, pale mineral blue, soft graphite gray. Materials/textures: fine paper fibers, restrained printing registration variation, tiny natural speckles. Constraints: no text, no symbols, no diagrams, no objects, no borders, no logos, no watermark; flat even lighting; usable behind dark typography. Avoid: futuristic aesthetics, neon, glossy 3D, holograms, advertising polish, gradients, dramatic shadows, obvious AI patterns.
