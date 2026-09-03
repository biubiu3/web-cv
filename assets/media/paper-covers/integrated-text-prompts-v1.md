# Native image-with-text production prompts

These prompts were sent to the built-in image-generation tool. Each paper was generated independently so that composition, illustration medium, elements, and palette could vary while retaining a white academic graphical-abstract baseline. Targeted correction prompts are preserved after their corresponding initial prompt.

## TGL

```text
Use case: scientific-educational
Asset type: 16:9 academic website graphical abstract for a robotics research paper.
Primary request: Create a single complete native image-with-text explaining Teach-and-Grow Learning (TGL). Generate illustrations, arrows, labels, punctuation, and typography together. This is not a template adaptation: use a distinct modular field-notebook visual language.

Scientific story:
A few successful robot demonstrations reveal shared semantic stages rather than trajectories to replay. These stages become a closed-loop Skill Block that binds goal, grounding, authorized executor, verification, and recovery. In a new physical scene the agent composes a route, acts through robot-native tools, observes the result, then either stores verified capability, repairs the route, or requests targeted teaching. A Skill Library stores executable capabilities; Experience Memory stores outcomes, failures, and repairs. Verified experience supports the next task without changing foundation-model weights.

Composition:
Use an asymmetric clockwise growth cycle, not a horizontal pipeline. Place three small concrete tabletop robot demonstrations in the upper-left arc, a large modular Skill Block in the center, a new-scene robot action and physical verification in the lower arc, and two visibly different storage shelves on the right. A small final new-task scene reconnects to the demonstrations. Fill about 88% of the white canvas. Use chunky cut-paper modules, clipped-corner cards, sturdy arrows, small robot illustrations, and organized visual density.

Required text, render verbatim:
"TGL"
"TEACH AND GROW LEARNING"
"TEACH LOCALLY. VERIFY PHYSICALLY. REUSE GLOBALLY."
"DEMONSTRATIONS"
"Shared stages, not copied trajectories"
"SKILL BLOCK"
"Goal · grounding · executor · verifier · recovery"
"ACT → OBSERVE → VERIFY"
"PASS: STORE AND REUSE"
"FAIL: REPAIR OR TEACH"
"SKILL LIBRARY"
"Executable capabilities"
"EXPERIENCE MEMORY"
"Outcomes · failures · repairs"
"NEW TASK"
"Verified experience grows with the robot"

Typography and palette:
Sober editorial sans-serif. TGL largest. Forest green, terracotta orange, cobalt blue, and warm sand accents with dark charcoal text. Integrate every label into a dedicated shape or quiet area; never place type on top of a robot, arrow, shelf, or object.

Style:
Crisp flat editorial illustration with subtle cut-paper geometry and screen-printed color texture; authored robotics field guide, clean white background, technical but warm. Distinct from thin blue line art.

Constraints:
All text is intrinsic generated pixels in this one image. No later text overlay. Keep motor authority with robot-native executors; do not depict free-form language directly commanding joints. No gradients, glow, 3D, photorealism, futuristic HUD, advertising look, PPT-cover layout, giant empty title panel, fake equations, decorative AI brain, watermark, misspellings, illegible microtext, or overlapping text.
```

Targeted demonstration correction:

```text
Use case: precise-object-edit.
Input image: edit target.
Change only the three numbered DEMONSTRATIONS panels in the upper-left. They must show three successful demonstrations of the same semantic skill, not three unrelated tasks. In every panel show the same goal: the robot places the same small blue bowl onto the same round wooden coaster beside a potted plant. Vary only the initial bowl position, robot approach angle, and camera viewpoint so shared stages can be inferred across demonstrations. Remove the coffee press, red mug, building blocks, and toy arch from those three panels.
Preserve exactly everything else: the clockwise layout, all arrows, TGL title, all existing wording and spelling, central SKILL BLOCK, new task, ACT → OBSERVE → VERIFY panel, PASS/FAIL branches, both storage shelves, palette, cut-paper texture, white background, and overall proportions.
All text remains native image content. Do not alter, add, delete, misspell, or overlap any text. No new objects outside the three demonstration panels.
```

## MRASfM

```text
Use case: scientific-educational
Asset type: 16:9 academic website graphical abstract for a computer-vision and robotics paper.
Primary request: Create one complete native image-with-text explaining MRASfM. Generate all map graphics, vehicles, cameras, 3D points, arrows, labels, punctuation, and typography together. Use an original cartographic technical-illustration style, not the HEAR or TGL composition.

Scientific story:
A calibrated surround-view camera rig should be registered as one rigid camera set. Strong views determine the vehicle pose and fixed inter-camera transforms carry weak views. Semantic road labels plus a robust plane model reject unstable low-texture road points. Camera-set bundle adjustment optimizes time-varying vehicle poses while preserving fixed rig geometry. Separate driving sessions are associated, coarsely aligned, relocalized, and jointly refined into one coherent 3D street map.

Composition:
Top-down oblique cartographic sheet. A central vehicle with six visibly mounted cameras projects fan-shaped view cones. Repeated vehicle poses travel along one curved street route while a side cutaway shows the fixed camera rig. A rust-colored road-surface rejection zone removes spurious points. Two differently oriented route fragments enter from opposite lower corners and interlock into a larger reconstructed street map in the upper-right. Use map contours, sparse point clouds, architectural footprints, registration pins, and a small before/after assembly inset. Fill 88% of a white canvas with balanced information; no large empty title panel.

Required text, render verbatim:
"MRASfM"
"MULTI-CAMERA RECONSTRUCTION AND AGGREGATION"
"ONE RIG. MANY DRIVES. ONE COHERENT MAP."
"RIGID CAMERA SET"
"Fixed inter-camera geometry"
"ROAD FILTER"
"Reject unstable road structure"
"CAMERA-SET BA"
"Optimize vehicle poses"
"MULTI-SESSION ASSEMBLY"
"Associate → align → jointly refine"
"SURROUND VIEWS"
"COHERENT 3D MAP"

Typography and palette:
Editorial grotesk typography with small cartographic labels. MRASfM largest but integrated into the map margin. Use sage green, oxidized rust, surveyor blue, muted ochre, and charcoal. Place labels inside neat legend bands or next to their map element, never over view cones, point clouds, roads, or vehicles.

Style:
Architectural cartography meets scientific field survey: crisp pen lines, translucent flat map washes, stippled point clouds, registration marks, restrained paper texture on a predominantly white background. Precise and authored, visually different from robotics line-art pipelines.

Constraints:
All text must be intrinsic generated pixels in the single image; no later overlay. Preserve the rigid-camera-set and coarse-to-fine assembly meaning. No copied paper panels, no generic dashboard, no dark background, no gradients, no 3D glossy render, no sci-fi, no advertising, no PPT cover, no watermark, no fake metrics, no overlapping text, no misspellings, no illegible microtext.
```

## MID

```text
Use case: scientific-educational
Asset type: 16:9 academic website graphical abstract for a machine-learning paper.
Primary request: Create one complete native image-with-text explaining MID, a self-supervised multimodal iterative denoising framework. Generate every illustration, equation, symbol, arrow, label, and caption together. Use an original scientific-specimen and concentric-restoration visual language, unlike the other covers.

Scientific story:
The available sample is already noisy and its clean target is unknown. Controlled additional corruption creates known neighboring states for self-supervision. A stage estimator predicts the current position on the corruption path. A residual predictor estimates one local corruption increment. Subtract that increment, inspect the updated sample, and repeat until the estimated stage approaches zero. The same learning dynamics is instantiated with modality-appropriate encoders for images, geometric point sets and correspondences, biosignals, MRI, and protein representations.

Composition:
A large counterclockwise restoration spiral occupies the center. Four nested translucent specimen slices progress from heavily corrupted to clearer data; a small stage dial and residual fragment sit between adjacent slices. At the left, show the original observed noisy specimen being deliberately corrupted one step further for self-supervision. Around the spiral, place five distinct concrete scientific sample windows: noisy photograph becoming crisp, outlier-contaminated point correspondences becoming coherent, jagged ECG/sEMG waveform becoming clean, grainy MRI slice becoming clearer, and noisy protein contact map becoming structured. Connect them to the shared spiral without turning them into a row of identical boxes. Fill 88% of a white canvas.

Required text, render verbatim:
"MID"
"SELF-SUPERVISED MULTIMODAL ITERATIVE DENOISING"
"LEARN FROM NOISY DATA. REVERSE ONE LOCAL STEP AT A TIME."
"OBSERVED NOISY SAMPLE"
"CONTROLLED EXTRA CORRUPTION"
"STAGE ESTIMATOR Ψ"
"Where am I on the noise path?"
"RESIDUAL PREDICTOR Φ"
"What local corruption should be removed?"
"sₜ₋₁ = sₜ − Φ(sₜ, t̂)"
"REPEAT UNTIL t ≈ 0"
"ONE DYNAMICS · MANY MODALITIES"
"IMAGE · GEOMETRY · BIOSIGNAL · MRI · PROTEIN"

Typography and palette:
Mature editorial serif for the acronym MID, precise sans-serif for modules, equation in a legible mathematical style. Use aubergine, mineral violet, seafoam green, muted copper, and charcoal on white. Put every word and formula in reserved areas; never overlap a specimen, spiral, waveform, or connector.

Style:
A refined scientific specimen plate: translucent flat layers, fine engraved contour lines, subtle risograph registration, tactile but clean. Not a notebook, not a slide, not the HEAR line-art style, and not a generic neural-network diagram.

Constraints:
All text and formula are intrinsic generated pixels in this single image. No later overlay. Do not imply paired clean targets during training. Do not claim one identical architecture handles every modality. No dark background, gradient glow, glossy 3D, sci-fi HUD, advertising, PPT cover, generic AI brain, fake plots or metrics, watermark, overlapping text, misspellings, or illegible microtext.
```

## DiffSAC

```text
Use case: scientific-educational
Asset type: 16:9 academic website graphical abstract for a robust-estimation paper.
Primary request: Create one complete native image-with-text explaining DiffSAC. Generate all point fields, confidence maps, diffusion paths, geometric hypotheses, arrows, symbols, equations, labels, and typography together. Use a distinctive probabilistic geometry print style.

Scientific story:
Given observations chi with many outliers, DiffSAC does not rank each point once. Several independent noisy confidence fields c_T are refined by geometry-conditioned reverse diffusion. Each trajectory produces a different jointly compatible minimum set. Existing minimal solvers turn those sets into line, plane, fundamental or essential matrix, and homography hypotheses. Classical consensus scoring keeps the best geometry. DiffSAC changes proposal generation while leaving solvers and consensus modular.

Composition:
Use a fan-shaped parallel layout. At the far left, one large contaminated observation field contains many graphite outliers and several latent geometric structures. From it, three separate colored noise seeds expand into three horizontal reverse-diffusion strips; stippled confidence progressively concentrates on different compatible subsets. The strips converge only at a classical solver bench with small physical geometry instruments: straightedge line, triangular plane, paired-camera epipolar rays, and projective quadrilateral. Candidate hypotheses then enter a vertical consensus scale and one best hypothesis? no — use exact label BEST HYPOTHESIS beside the winning clean geometry. Fill about 88% of the white canvas; keep the parallel diversity visually obvious.

Required text, render verbatim:
"DiffSAC"
"DIFFUSION-GUIDED CONSENSUS SAMPLING"
"GENERATE DIVERSE SETS. KEEP THE BEST GEOMETRY."
"OBSERVATIONS χ"
"NOISY CONFIDENCE c_T"
"REVERSE DIFFUSION"
"pθ(cₜ₋₁ | cₜ, χ)"
"JOINTLY COMPATIBLE MINIMUM SETS"
"Multiple seeds → diverse candidates"
"CLASSICAL SOLVER S(Mⱼ)"
"CONSENSUS SCORE f(hⱼ, χ)"
"BEST HYPOTHESIS"
"LINE · PLANE · F/E MATRIX · HOMOGRAPHY"

Typography and palette:
Bold modern sans-serif acronym, compact monospaced scientific labels, legible math. Use deep violet, sulfur yellow, turquoise, raspberry, and graphite on a clean white ground. Each diffusion trajectory gets one accent color. Text belongs in dedicated strips or margin keys and must not cover points, geometry, arrows, or instruments.

Style:
High-quality probabilistic geometry print: crisp vector-like plots, halftone confidence density, precise dots, thin mathematical construction lines, restrained screen-print texture. Visually unlike a robotics illustration, map, or slide.

Constraints:
All text and equations are intrinsic generated pixels in this single image. No later overlay. Confidence means membership in a useful joint minimum set, not independent inlier probability. Preserve classical solvers and consensus scoring. No dark background, glow, gradients, glossy 3D, neural-network brain, advertising, PPT cover, copied paper panels, fake performance numbers, watermark, overlapping text, misspellings, or illegible microtext.
```

Targeted direction and solver correction:

```text
Use case: precise-object-edit.
Input image: edit target.
Make only two scientific corrections.
1. In all three colored reverse-diffusion rows, every process arrow must point consistently from left to right: NOISY CONFIDENCE c_T at the left, then t = 3, t = 2, t = 1, t = 0 at the right, then the CLASSICAL SOLVER. Remove every left-pointing process arrow in those rows and replace it with a clear right-pointing arrow. Keep the time labels in that exact left-to-right order.
2. On the third classical-solver bench, replace the ambiguous small plate "F/E MATRIX (5-POINT)" with the exact two-line text "F/E MATRIX" and "TASK-SPECIFIC MINIMUM SET". Do not attach one fixed sample count to both F and E.
Preserve everything else exactly: all required headings, formulas, point fields, three colored trajectories, all other solver benches, score scale, best hypothesis, legend, palette, white background, screen-print geometry style, dimensions, and layout.
All text and corrections remain intrinsic generated pixels. Do not change or misspell any other text, do not add fake metrics, and do not create overlaps.
```

## ERMV

```text
Use case: scientific-educational
Asset type: 16:9 academic website graphical abstract for embodied data generation.
Primary request: Create one complete native image-with-text explaining ERMV, Editing 4D Robotic Multi-view Images. Generate all storyboard frames, robots, camera symbols, sparse tokens, epipolar guides, arrows, labels, and typography together. Use a distinctive folded-storyboard visual language.

Scientific story:
A user edits one globally informative guide frame. ERMV propagates that intervention across an entire robot trajectory containing multiple camera views and time steps while robot actions remain fixed. Sparse spatio-temporal modeling samples tokens across a long time-by-camera lattice but preserves each original index. Epipolar motion-aware attention combines calibrated geometry with robot state to handle moving arms and objects. A multimodal verifier checks the edited sequence; consistent results augment policy training data, while a local inconsistency triggers a targeted expert mask instead of discarding everything.

Composition:
Use a large zig-zag accordion storyboard crossing the canvas, with three time columns and four clearly different camera views per time step: head, front, left, and wrist camera. The first coral-framed guide image shows a tabletop robot scene with one object appearance edited. The same edit remains consistent through the later views and times. Behind the storyboard, sparse colored token pins connect nonadjacent frames, retaining small time and camera coordinates. A small epipolar construction appears as pencil guide lines shifted by a robot-state arrow. At the lower-right, a verifier lens inspects one frame and branches to a green check or a localized mask patch. Show an unchanged action/state ribbon running beneath the sequence. Fill 88% of a clean white canvas.

Required text, render verbatim:
"ERMV"
"4D ROBOTIC MULTI-VIEW EDITING"
"EDIT ONE FRAME. PROPAGATE A COHERENT TRAJECTORY."
"GUIDE FRAME"
"Global appearance edit"
"TIME × CAMERA VIEWS"
"HEAD · FRONT · LEFT · WRIST"
"SPARSE SPATIO-TEMPORAL TOKENS"
"Keep original time and camera indices"
"EPIPOLAR MOTION-AWARE ATTENTION"
"Geometry + robot state"
"ROBOT ACTIONS STAY FIXED"
"EDITED MULTI-VIEW TRAJECTORY"
"SEQUENCE VERIFIER"
"CONSISTENT → AUGMENT POLICY DATA"
"MISMATCH → TARGETED EXPERT MASK"

Typography and palette:
Condensed editorial sans-serif inspired by storyboard annotations. ERMV largest but integrated into the upper-left margin. Use coral, petrol blue, mint green, muted violet, warm gray, and charcoal. Labels sit on clean storyboard tabs or annotation margins; never on top of a robot, camera frame, guide line, token, or mask.

Style:
Clean animation-production storyboard meets scientific contact sheet: flat gouache robot scenes, crisp ink contours, camera-frame crop marks, restrained pencil construction, small paper tabs. White background, compact and authored, visually distinct from line diagrams and cartographic covers.

Constraints:
All text is intrinsic generated pixels in this single image. No later overlay. Preserve cross-view and temporal consistency; actions remain fixed. Do not imply automatic acceptance of inconsistent sequences. No copied paper grid, no dark filmstrip background, no gradients, glow, glossy 3D, photorealism, sci-fi, advertising, PPT cover, watermark, fake metrics, overlapping text, misspellings, or illegible microtext.
```

Targeted white-background and legibility correction:

```text
Use case: style-transfer and precise layout edit.
Input image: edit target.
Preserve the exact scientific content and accordion-storyboard composition, but make the entire canvas an opaque pure white background. There must be no transparency, black voids, black halos, stray colored fringes, or edge noise.
Calm the rendering substantially: replace heavy comic-marker outlines and saturated splashes with crisp fine editorial ink contours, restrained flat gouache fills, consistent thin arrows, soft paper tabs, and a mature scientific storyboard appearance. Keep the coral, petrol blue, mint, and muted violet roles but reduce saturation.
Make the two verifier outcomes fully readable in clean dedicated horizontal tabs beneath the SEQUENCE VERIFIER:
"CONSISTENT → AUGMENT POLICY DATA"
"MISMATCH → TARGETED EXPERT MASK"
Use sufficiently large dark text; do not place either phrase on top of an image, arrow, or mask. Remove tiny duplicate or pseudo-text around the verifier.
Preserve all other exact text, spelling, views, time columns, guide frame, sparse token lattice, epipolar motion-aware attention, edited trajectory, and unchanged robot-action ribbon. Keep the image 16:9 and densely balanced.
All text remains intrinsic image content. No later overlay. No new claims, no gradients, no 3D gloss, no advertising or PPT style, no overlapping text.
```

## MovSAM

```text
Use case: scientific-educational
Asset type: 16:9 academic website graphical abstract for robot perception.
Primary request: Create one complete native image-with-text explaining MovSAM, single-image moving-object segmentation through reasoning and bounded refinement. Generate the scene, masks, text prompt, feature symbols, arrows, labels, and typography together. Use a distinctive mixed-media editorial collage, not a standard method pipeline.

Scientific story:
Only one RGB image is available; there is no optical flow and no adjacent frame. A multimodal language model reasons about scene context and names objects likely to be moving. That text prompt conditions a visual stack combining SAM2 detail, BEiT-3 vision-language context, and learned feature aggregation. A segmentation mask is produced. The current mask returns to the multimodal context for a bounded inspect-reason-revise loop of at most five rounds. This is semantic inference under missing temporal evidence, not direct measurement of physical motion.

Composition:
Place one large hand-inked urban street still in the center: a cyclist, a pedestrian, a parked car, and static street furniture. Split it subtly into raw observation and refined mask without duplicating the entire frame. The cyclist and walking pedestrian receive clean translucent cut-paper masks; the parked car and lamppost remain unmasked. Around the image, use a small language-note slip naming likely moving objects, two textured feature swatches labeled SAM2 and BEiT-3, a compact aggregation knot, and five numbered inspection tabs that curve back toward the mask edge. The entire story should orbit the one still image, not run left-to-right. Fill about 88% of a white canvas.

Required text, render verbatim:
"MovSAM"
"SINGLE-IMAGE MOVING OBJECT SEGMENTATION"
"ONE STILL IMAGE. REASON FIRST. SEGMENT SECOND."
"RGB IMAGE ONLY"
"No optical flow · no adjacent frames"
"SCENE REASONING"
"Which objects could be moving?"
"TEXT PROMPT"
"PERSON · BICYCLE"
"SAM2"
"Visual detail"
"BEiT-3"
"Vision-language context"
"FEATURE AGGREGATION"
"SEGMENTATION MASK"
"DEEP-THINKING LOOP · MAX 5 ROUNDS"
"Inspect → revise prompt → refine mask"
"SEMANTIC INFERENCE, NOT MEASURED MOTION"

Typography and palette:
Confident humanist sans-serif with a few restrained handwritten annotation marks. Use cobalt blue, saffron yellow, raspberry, cyan mask tint, and charcoal on white. Put type on paper slips, edge labels, or quiet margin arcs; no text may cover a face, object, mask boundary, arrow, or feature swatch.

Style:
Sophisticated editorial paper collage with torn geometric edges, ink drawing, flat transparent mask overlays, halftone accents, and precise cut-paper shadows. Clean and scientific but visibly authored; entirely different from HEAR line art, MRASfM maps, and ERMV storyboards.

Constraints:
All text is intrinsic generated pixels in this one image. No later overlay. Show exactly one source image and make the lack of temporal input explicit. Do not depict a video sequence as input. Do not claim language proves true motion. No dark background, gradient glow, glossy 3D, photorealism, AI brain, futuristic HUD, advertising, PPT cover, watermark, fake scores, overlapping text, misspellings, or illegible microtext.
```

Targeted 16:9 canvas correction:

```text
Use case: precise-object-edit and canvas extension.
Input image: edit target.
Recompose this exact MovSAM graphical abstract onto a true wide 16:9 landscape canvas. Preserve every existing scientific element, all exact wording, spelling, colors, collage textures, the single central street image, raw/refined split, masks, five-step bounded loop, feature cards, and bottom conclusion. Do not crop any content and do not delete or add scientific claims.
Use the extra horizontal space to loosen only the outer left and right annotation columns while keeping the central one-image composition dominant. Scale the full content so every title and bottom label remains safely inside the frame with at least 3% white margin on all sides. The result must visually read as a native 16:9 design, not a 3:2 image inside a border.
Keep an opaque white background and the existing authored mixed-media collage style. All text remains intrinsic generated pixels. No later overlay. No new text, no misspellings, no overlaps, no black bars, no transparency, no cropping, no stretch distortion.
```

## RLSAC

```text
Use case: scientific-educational
Asset type: 16:9 academic website graphical abstract for robust geometric estimation.
Primary request: Create one complete native image-with-text explaining RLSAC, reinforcement-learning-enhanced sample consensus. Generate every point, hypothesis, residual, state marker, feedback arrow, equation, label, and typographic element together. Use a distinctive mechanical experiment-dial visual language, different from DiffSAC's parallel generative trajectories.

Scientific story:
RLSAC leaves the task-specific geometric solver and consensus scorer intact, but turns repeated sampling into an adaptive Markov decision process. At each trial, the policy observes data features, the current sampling action, residuals from the evaluated hypothesis, and per-point sampling history. It selects a non-duplicate minimum set. The classical solver fits a hypothesis, consensus scoring returns the inlier ratio as an unsupervised reward, and residual plus history evidence updates the state for the next sample. No label identifying a correct minimum set is required.

Composition:
Build one large circular four-station laboratory dial around a contaminated line-fitting plot. The stations are SAMPLE, SOLVE, SCORE, and UPDATE STATE. A brass pointer advances clockwise. At SAMPLE, a graph-policy instrument selects two highlighted points. At SOLVE, a physical straightedge fits a candidate line. At SCORE, residual rulers and an inlier-ratio gauge evaluate it. At UPDATE STATE, tested points receive small history ticks and residual traces before the pointer returns to NEXT SAMPLE. On the right, include one compact two-view camera/correspondence inset demonstrating reuse with a fundamental-matrix solver. Keep the loop dominant and concrete. Fill 88% of a white canvas.

Required text, render verbatim:
"RLSAC"
"RL-GUIDED SAMPLE CONSENSUS"
"EVERY HYPOTHESIS TEACHES THE NEXT SAMPLE."
"STATE sₜ"
"Data · current action · residuals · history"
"POLICY πφ"
"Select a non-duplicate minimum set"
"SAMPLE"
"SOLVE S(Mₜ)"
"SCORE f(hₜ, χ)"
"REWARD = INLIER RATIO"
"UPDATE STATE"
"aₜ₊₁ ∼ πφ(aₜ₊₁ | sₜ)"
"NEXT SAMPLE"
"CLASSICAL GEOMETRIC SOLVER"
"NO MINIMUM-SET LABELS REQUIRED"
"LINE FITTING · FUNDAMENTAL MATRIX"

Typography and palette:
Industrial sans-serif and restrained monospaced instrument labels; equations in clear mathematical type. Use vermilion, deep navy, emerald, brass yellow, and graphite on white. Place words in engraved dial plates and clean annotation bands; never cover points, residuals, instruments, arrows, or camera rays.

Style:
High-quality mid-century scientific instrument manual: crisp plotted paper, silkscreen arrows, mechanical gauge details, ruled measurement marks, restrained flat ink texture. Technical and authored, not a generic flowchart and not the same visual language as other covers.

Constraints:
All text and formulas are intrinsic generated pixels in one image. No later overlay. The reward is downstream hypothesis quality, specifically inlier ratio. History influences future sampling. Classical solver remains unchanged. No dark background, no gradients, glow, glossy 3D, photorealism, AI brain, futuristic HUD, advertising, PPT cover, copied paper panels, fake performance numbers, watermark, overlapping text, misspellings, or illegible microtext.
```
