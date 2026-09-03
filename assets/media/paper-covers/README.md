# Publication-cover source note

The cover redesign uses one native image-with-text source for each of the eight main papers. `scripts/build-publication-covers.mjs` copies those generated PNGs directly into their publication directories; it does not add browser, SVG, canvas, or post-rendered typography.

The first non-HEAR experiment is archived in [`integrated-text-prompts-v1.md`](integrated-text-prompts-v1.md). It was rejected because varying the illustration medium introduced cut-paper, cartographic, specimen, storyboard, collage, and retro-instrument treatments that did not read as rigorous paper figures.

The deployed replacements are recorded in [`integrated-text-prompts-v2.md`](integrated-text-prompts-v2.md). HEAR is the common visual-system reference: pure white background, consistent vector line work, disciplined sans-serif typography, aligned modules, and functional arrows. Each paper varies only its scientific topology, subject illustrations, and restrained accent colors.

| Paper | Source PNG | Visual language |
|---|---|---|
| TGL | `tgl-integrated-text-v2.png` | verified skill-block execution loop |
| MRASfM | `mrasfm-integrated-text-v2.png` | rigid-camera reconstruction and session assembly |
| MID | `mid-integrated-text-v2.png` | iterative self-supervised denoising pipeline |
| DiffSAC | `diffsac-integrated-text-v2.png` | parallel minimum-set proposal and consensus |
| ERMV | `ermv-integrated-text-v2.png` | time-by-camera editing and verification grid |
| MovSAM | `movsam-integrated-text-v2.png` | single-image reasoning and bounded mask refinement |
| RLSAC | `rlsac-integrated-text-v2.png` | sample-solve-score-state feedback loop |

## HEAR native image-with-text sample

`hear-integrated-text-v6.png` was created in one pass with the built-in image-generation tool. The illustrations, arrows, module labels, captions, punctuation, and typography are native parts of the same raster composition. No browser, SVG, or canvas text is overlaid afterward. The image was redrawn from the semantic story established in the earlier HEAR sample rather than copied from the paper figures.

Final generation prompt:

> Use case: scientific-educational
> Asset type: 16:9 academic website graphical abstract for a robotics research paper.
> Input image 1: edit target and semantic reference only. Completely redraw the full figure as one coherent native composition. Do not retain the old text placement or simulate a second text layer.
>
> Primary request:
> Create a clean, compact, white-background 2D scientific graphical abstract explaining HEAR. Generate the illustrations, arrows, module labels, captions, punctuation, and typography together in a single image. Every label must be naturally built into the layout with reserved space; no text may overlap, cover, touch, or sit on top of a robot, waveform, box, arrow, path, or icon.
>
> Scientific story, left to right:
> 1. A robot is already manipulating a container when a short acoustic event occurs mid-action.
> 2. Four chronological sound-memory cards show the raw sound fading while causal evidence persists across a blind execution interval.
> 3. A compact task-state interpretation combines a camera/view, spoken instruction, sound memory, and robot state.
> 4. Three intermediate robot poses follow one smooth curved trajectory toward a visibly changed final action.
> 5. A lower compact strip shows four concrete sound-centric event examples and a training-only future-audio prediction branch.
>
> Required text, render verbatim with correct spelling and no extra words:
> "HEAR"
> "VISION · SOUND · LANGUAGE · ACTION"
> "BRIEF SOUND. PERSISTENT EVIDENCE. TIMELY ACTION."
> "EVENT DURING EXECUTION"
> "A cue arrives mid-action"
> "HISTORIZER"
> "Preserve causal sound evidence"
> "BLIND EXECUTION INTERVAL"
> "ENVISIONER"
> "Fuse sound, vision, instruction, and state"
> "REALIZER"
> "Generate a smooth action chunk"
> "CHANGED ACTION"
> "SOUND-CENTRIC EVENTS"
> "Speech · trigger · process · contact"
> "ADVANCER — TRAINING ONLY"
> "Predict future audio to learn temporal progress"
>
> Typography:
> Use a sober editorial sans-serif, like a high-quality journal infographic. HEAR is the largest label. Module names are medium uppercase. Explanations are smaller but clearly readable. Use dark navy text, with coral for EVENT DURING EXECUTION and REALIZER, teal for ENVISIONER, blue for HISTORIZER, and amber for ADVANCER. Keep all text horizontal. Each label sits in a quiet dedicated area immediately adjacent to the element it explains. Maintain generous internal padding around text, but do not leave large unused canvas regions.
>
> Style:
> Crisp refined hand-drawn technical line art, consistent 2D perspective, slightly human editorial character, restrained navy/blue/teal/coral/amber palette, off-white or pure white background. Dense but calm, visually specific, publication-quality, not a slide cover.
>
> Composition:
> Landscape 16:9. Fill about 88% of the canvas. Strong continuous left-to-right reading order. Align the bottom examples and training branch into one compact baseline. Use arrows only when they clarify causality. Keep all content safely inside the frame.
>
> Constraints:
> All text must be generated as an intrinsic part of this one raster image. No later overlay is intended. Preserve scientific meaning but redesign the layout. Do not copy paper figures. No gradients, no glow, no 3D render, no photorealism, no futuristic HUD, no advertising style, no PPT-cover feel, no watermark, no logos other than the word HEAR, no decorative filler, no overlapping text, no illegible microtext, no misspellings.

## Previous HEAR compact concept reconstruction sample

`hear-concrete-compact-base-v5.png` was created with the built-in image-generation tool after reading the scientific meaning expressed by the paper's Figure 1 caption, Figure 2 caption, motivation, and architectural-overview prose in `/DataBig/hear_ijrr/HEAR_IJRR.tex`. The paper figures themselves were deliberately not supplied as visual references: this version reconstructs the causal story instead of copying their panel or block-diagram organization. This archived base contains no typography; the previously deployed v5 cover used a browser-rendered text layer that has now been retired.

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

Compact and concrete refinement prompt:

> Use case: scientific-educational
> Asset type: targeted refinement of the supplied 16:9 HEAR graphical-abstract base
> Input image: edit target. Preserve its original causal story, white background, flat line-art language, and blue/teal/coral/amber semantics.
> Primary request: Make the composition substantially denser and more concrete without turning it into a block diagram. Enlarge the meaningful visual content so it occupies roughly 85 percent of the canvas height and most of the width. Bring the two robot task scenes closer to the central reasoning area, reduce the long empty stretches of signal line, and move the amber training branch upward into the lower-middle region. Leave only a compact header-safe band at the top and small label-safe gaps around the causal stages; do not leave a large empty top half or empty lower-left quadrant.
> Concrete scientific detail:
> 1. At the left, make the short acoustic event visibly originate from a recognizable tabletop interaction while the robot is already moving. Keep the same robot, container, object, and sound pulse; add only a small physical event cue such as lid contact or a compact timer/speaker device, not a fantasy energy effect.
> 2. Replace the mostly empty blue wavy span with a compact sequence of four small causal audio-memory packets. The first packet contains the captured coral event waveform; later packets retain a small blue event trace after the raw coral waveform has ended. They should read as persistent evidence carried across delayed decisions, not as four neural-network boxes.
> 3. At the center, keep four modalities converging, but make their meaning more tangible: a camera view of the current tabletop scene, a spoken instruction icon, a robot joint-state/pose icon, and the remembered event packet converge into one compact task-state interpretation. Show a small, recognizable robot-plus-object task-state motif at the convergence point rather than an abstract logo.
> 4. At the right, keep a smooth coral action trajectory but add two or three restrained intermediate gripper or robot-arm pose outlines along it, so it clearly represents a continuous action chunk leading to the changed final action.
> 5. Make the amber training-only branch concrete and compact: the interpreted task state leads to a short sequence of predicted future audio packets or waveform frames, with a return-loop learning arrow. Keep this branch visually separate from deployment.
> 6. Use the remaining lower-left space for four very small, evenly spaced sound-source examples from sound-centric manipulation: spoken instruction, a short trigger beep, a continuous bubbling/process sound, and contact/tap feedback. Connect them subtly to the main sound-event idea. These are scientific examples, not decorative icons.
> Style/medium: crisp mature 2D scientific editorial line illustration with uniform thin strokes, restrained fills, consistent icon scale, and journal-graphical-abstract density. More detailed and authored, but still clean and scan-friendly.
> Composition/framing: compact asymmetric left-to-right causal narrative; visually balanced; no large voids; no separate title panel; no row of architecture boxes; no copying or rearranging an existing paper figure.
> Invariants: the original sound ends before the later decision; memory persists after the raw sound disappears; remembered sound, vision, instruction, and state meet at reasoning; smooth action is downstream; future-audio prediction is training-only. Preserve the pure white background and exact color roles.
> Text constraints: no words, letters, numbers, equations, pseudo-text, logos, or watermarks. Leave clean local space for deterministic English labels added later.
> Avoid: generic AI brain or neural-network symbol, large empty whitespace, stretched decorative curves, circular bubbles, glossy cards, presentation-slide layout, dense architecture diagram, 3D, gradients, glow, neon, sci-fi dashboard, advertising polish, photorealism, fuzzy edges, decorative particles.

## Earlier paper-texture source

Only `notebook-paper-generated.png`, used as the restrained MID background, was generated with the built-in image-generation tool. Final prompt:

> Use case: scientific-educational. Asset type: subtle background texture for one academic publication cover. Primary request: a flat, high-resolution scan of warm off-white scientific notebook paper, quietly tactile and materially believable. Scene/backdrop: edge-to-edge paper surface only. Style/medium: archival paper scan, natural fibers, extremely faint graphite handling marks and a barely visible pale blue measurement grid; understated, imperfect, editorial, not polished. Composition/framing: uniform landscape texture with no focal object and no lighting gradient. Color palette: warm ivory, pale mineral blue, soft graphite gray. Materials/textures: fine paper fibers, restrained printing registration variation, tiny natural speckles. Constraints: no text, no symbols, no diagrams, no objects, no borders, no logos, no watermark; flat even lighting; usable behind dark typography. Avoid: futuristic aesthetics, neon, glossy 3D, holograms, advertising polish, gradients, dramatic shadows, obvious AI patterns.
