# HEAR-aligned native image-with-text prompt set

These seven replacements were generated with the built-in image-generation tool. For every paper, `hear-integrated-text-v6.png` was supplied as the **only visual-style reference** and the corresponding `*-integrated-text-v1.png` was supplied as **content reference only**. The old visual treatment was explicitly discarded rather than edited or traced.

## Shared production contract

```text
Use case: scientific-educational
Asset type: 16:9 academic-paper graphical abstract.

Match the HEAR reference's opaque pure-white background, clean flat vector line art, uniform dark-navy outlines, disciplined grid, aligned rounded modules, precise modern condensed sans-serif typography, restrained solid accent colors, and unambiguous functional arrows.

The result must look manually designed by a robotics or computer-vision PhD in Illustrator/TikZ. Generate illustrations, symbols, formulas, arrows, and English labels together as one native raster image.

Fill roughly 90% of the canvas with compact, orderly scientific content. Use consistent line weights, panel radii, arrowheads, and spacing. Keep labels horizontal, aligned, high-contrast, and readable at website-card scale.

Opaque pure #FFFFFF background. No paper texture, canvas texture, sepia tint, halftone, gouache, watercolor, brush marks, sketch lines, torn edges, tape, sticky notes, wood, metal, gauges, retro instruments, shadows, bevels, gradients, glossy 3D, photorealism, sci-fi HUD, advertising, PPT-cover styling, decorative AI brain, pseudo-text, watermark, overlaps, misspellings, fake equations, or fake metrics.
```

## TGL

```text
Reconstruct the scientific story as a verified skill-block execution loop.

Top-left: three small robot tabletop scenes showing the same bowl-placement skill from different viewpoints under DEMONSTRATIONS. Center: a five-module SKILL BLOCK, Goal → Grounding → Executor → Verifier → Recovery. Lower center: ACT → OBSERVE → VERIFY with a robot, camera observation, and checklist. Right: clean card-stack modules for SKILL LIBRARY and EXPERIENCE MEMORY. Green PASS stores and reuses; red FAIL returns to recovery. Bottom-left NEW TASK points into SKILL BLOCK.

Render only:
"TGL"
"TEACH AND GROW LEARNING"
"DEMONSTRATIONS"
"Shared semantic stages"
"SKILL BLOCK"
"Goal"
"Grounding"
"Executor"
"Verifier"
"Recovery"
"ACT → OBSERVE → VERIFY"
"PASS · STORE AND REUSE"
"FAIL · REPAIR OR TEACH"
"SKILL LIBRARY"
"Verified skills"
"EXPERIENCE MEMORY"
"Outcomes · failures · repairs"
"NEW TASK"

Palette: navy, emerald, muted cobalt, restrained coral, cool gray.
```

Independent-audit correction:

```text
Remove the dangling left connector and the arrow that points from execution into NEW TASK. Draw one green arrow from NEW TASK into SKILL BLOCK. Ensure no arrow points into NEW TASK. Preserve everything else.
```

## MRASfM

```text
Reconstruct the scientific story as a rigid-camera reconstruction and multi-session assembly pipeline.

Left: RIGID CAMERA SET with a top-view vehicle and six calibrated cameras; ROAD FILTER rejecting unstable road points above a fitted plane; CAMERA-SET BA refining vehicle poses while the cameras remain one rigid unit. Center: separate SESSION A and SESSION B tracks; both enter Associate → Coarse align → Jointly refine. Right: one clean, sparse COHERENT 3D MAP with building outlines and accepted points.

Render only:
"MRASfM"
"MULTI-CAMERA RECONSTRUCTION AND AGGREGATION"
"RIGID CAMERA SET"
"Fixed inter-camera geometry"
"ROAD FILTER"
"Reject unstable road points"
"CAMERA-SET BA"
"Optimize vehicle poses"
"SESSION A"
"SESSION B"
"Associate → Coarse align → Jointly refine"
"COHERENT 3D MAP"

Palette: navy, survey blue, restrained rust-orange, teal, cool gray.
```

Independent-audit corrections:

```text
Split the lower-left area into ROAD FILTER and CAMERA-SET BA panels. Add a blue arrow from SESSION A and an orange arrow from SESSION B into Associate. Add a right-pointing arrow from Jointly refine into COHERENT 3D MAP. Remove the unreadable micro-legend from CAMERA-SET BA.
```

## MID

```text
Reconstruct the scientific story as a discrete iterative denoising method, with no tree-ring or specimen metaphor.

Main row: OBSERVED NOISY SAMPLE s_t → CONTROLLED EXTRA CORRUPTION → STAGE ESTIMATOR Ψ → RESIDUAL PREDICTOR Φ → UPDATED SAMPLE s_(t−1). Below: the update equation and a return arrow labeled REPEAT UNTIL t ≈ 0. Bottom: five equal application panels for IMAGE, GEOMETRY, BIOSIGNAL, MRI, and PROTEIN, connected to one shared dynamic with modality-specific encoders.

Render only:
"MID"
"SELF-SUPERVISED MULTIMODAL ITERATIVE DENOISING"
"NO CLEAN TARGET REQUIRED"
"OBSERVED NOISY SAMPLE"
"CONTROLLED EXTRA CORRUPTION"
"STAGE ESTIMATOR Ψ"
"Estimate corruption stage t"
"RESIDUAL PREDICTOR Φ"
"Predict one local corruption step"
"sₜ₋₁ = sₜ − Φ(sₜ, t̂)"
"REPEAT UNTIL t ≈ 0"
"ONE DYNAMICS · MODALITY-SPECIFIC ENCODERS"
"IMAGE"
"GEOMETRY"
"BIOSIGNAL"
"MRI"
"PROTEIN"

Palette: navy, muted violet, teal, restrained orange, cool gray.
Do not imply paired clean targets or one identical encoder architecture for all modalities.
```

Independent-audit correction:

```text
In the IMAGE panel, replace the unrelated random-noise input with the same mountain-and-lake scene as the output but visibly corrupted by additive noise and reduced clarity. Preserve the clean same-scene output and every other element.
```

## DiffSAC

```text
Use one illustrative task in the main flow: robust line fitting. Do not compare candidates from different geometry tasks in one score pool.

Left: OBSERVATIONS χ with blue line inliers and gray outliers. Center: three parallel NOISY CONFIDENCE c_T lanes with strict left-to-right states t=2 → t=1 → t=0, each producing a different jointly compatible two-point minimum set. Each lane uses the same unchanged CLASSICAL LINE SOLVER and yields h₁, h₂, or h₃. Right: aligned consensus bars where h₂ alone is longest and receives BEST HYPOTHESIS. Bottom: a visually separate task-specific solver strip for LINE, PLANE, F / E MATRIX, and HOMOGRAPHY.

Render only:
"DiffSAC"
"DIFFUSION-GUIDED CONSENSUS SAMPLING"
"OBSERVATIONS χ"
"NOISY CONFIDENCE c_T"
"REVERSE DIFFUSION"
"t = 2"
"t = 1"
"t = 0"
"JOINTLY COMPATIBLE MINIMUM SETS"
"CLASSICAL LINE SOLVER"
"h₁"
"h₂"
"h₃"
"CONSENSUS SCORE"
"BEST HYPOTHESIS"
"TASK-SPECIFIC MINIMUM SETS + CLASSICAL SOLVERS"
"LINE"
"PLANE"
"F / E MATRIX"
"HOMOGRAPHY"
"DIFFSAC CHANGES PROPOSALS, NOT SOLVERS OR SCORING"

Palette: navy, muted violet, turquoise, coral, green only for winning h₂, cool gray.
```

## ERMV

```text
Reconstruct the scientific story as a strict time-by-camera editing and verification grid.

Left: one GUIDE FRAME with a blue object-appearance edit. Center: a 3-column t₀/t₁/t₂ by 4-row HEAD/FRONT/LEFT/WRIST grid; the same edit remains coherent. Above: SPARSE SPATIO-TEMPORAL TOKENS with preserved time-camera coordinates, connected into the grid. Below: EPIPOLAR MOTION-AWARE ATTENTION with calibrated camera rays and robot state, connected into the grid. A ROBOT ACTIONS STAY FIXED ribbon runs below. The grid points to SEQUENCE VERIFIER, which branches in parallel to green consistent data or a red targeted expert mask.

Render only:
"ERMV"
"4D ROBOTIC MULTI-VIEW EDITING"
"GUIDE FRAME"
"Global appearance edit"
"SPARSE SPATIO-TEMPORAL TOKENS"
"Preserve time and camera indices"
"TIME × CAMERA VIEWS"
"t₀"
"t₁"
"t₂"
"HEAD"
"FRONT"
"LEFT"
"WRIST"
"EPIPOLAR MOTION-AWARE ATTENTION"
"Geometry + robot state"
"ROBOT ACTIONS STAY FIXED"
"SEQUENCE VERIFIER"
"CONSISTENT → AUGMENT POLICY DATA"
"MISMATCH → TARGETED EXPERT MASK"

Palette: navy, muted cobalt, teal, restrained coral, cool gray.
```

Independent-audit corrections:

```text
Connect sparse tokens and epipolar attention into the time-camera grid. Replace the sequential green-to-red verifier outputs with two parallel branches directly from SEQUENCE VERIFIER. Add the missing right-pointing arrow from TIME × CAMERA VIEWS into SEQUENCE VERIFIER.
```

## MovSAM

```text
Reconstruct the scientific story as single-image reasoning followed by a bounded mask-refinement loop.

Left: exactly one RGB street image with a cyclist, pedestrian, parked car, and lamppost; crossed-out frame and flow icons state that there is no temporal input. Center: SCENE REASONING outputs PERSON · BICYCLE; SAM2 and BEiT-3 feed FEATURE AGGREGATION. Right: the same image receives cyan masks only on cyclist and pedestrian. The mask enters five ordered inspection/revision steps and returns to the mask. Bottom: clarify semantic inference rather than measured physical motion.

Render only:
"MovSAM"
"SINGLE-IMAGE MOVING OBJECT SEGMENTATION"
"RGB IMAGE ONLY"
"NO OPTICAL FLOW · NO ADJACENT FRAMES"
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
"1 · INSPECT MASK"
"2 · REVISE PROMPT"
"3 · REFINE MASK"
"4 · CHECK AGAIN"
"5 · FINALIZE"
"SEMANTIC INFERENCE, NOT MEASURED MOTION"

Palette: navy, muted cobalt, cyan, restrained amber, cool gray.
```

Independent-audit corrections:

```text
Keep aggregation → mask, remove aggregation → loop, add mask → step 1, preserve steps 1 through 5, and return step 5 → mask. Remove the decorative brain/circuit icon and all incidental pseudo-writing from the street scenes; preserve the scientific labels.
```

## RLSAC

```text
Reconstruct the scientific story as a four-stage sample-consensus feedback loop, not a mechanical dial.

Main flow: 1 SAMPLE uses policy πφ to select a non-duplicate minimum set; 2 SOLVE S(M_t) keeps the classical geometric solver; 3 SCORE f(h_t, χ) uses residuals and inlier ratio as reward; 4 UPDATE STATE contains data features, action, residuals, and per-point history and returns to SAMPLE. Right: separate GENERALIZATION examples, with LINE FITTING shown as a 2D scatter-and-line plot and FUNDAMENTAL MATRIX shown as two-view correspondences.

Render only:
"RLSAC"
"RL-GUIDED SAMPLE CONSENSUS"
"EVERY HYPOTHESIS TEACHES THE NEXT SAMPLE"
"STATE sₜ"
"Data · action · residuals · history"
"1 · SAMPLE"
"POLICY πφ"
"Select a non-duplicate minimum set"
"2 · SOLVE S(Mₜ)"
"CLASSICAL GEOMETRIC SOLVER"
"3 · SCORE f(hₜ, χ)"
"REWARD = INLIER RATIO"
"4 · UPDATE STATE"
"NEXT SAMPLE"
"NO MINIMUM-SET LABELS REQUIRED"
"GENERALIZATION"
"LINE FITTING"
"FUNDAMENTAL MATRIX"

Palette: navy, muted cobalt, teal, restrained coral, cool gray.
```

Independent-audit corrections:

```text
Replace the incorrect camera graphic under LINE FITTING with a point-scatter line-fitting diagram while retaining the two-camera FUNDAMENTAL MATRIX example. Add SOLVE → SCORE. Remove the floating state box, integrate STATE sₜ into UPDATE STATE, and preserve UPDATE STATE → SAMPLE so the main loop is closed.
```

## Review gate

The first independent review rejected the seven v1 images as non-HEAR-like. A second independent review checked the v2 candidates for scientific arrows and labels. After targeted corrections, the final independent review passed all seven images; the last ERMV arrow was then checked separately and passed.
