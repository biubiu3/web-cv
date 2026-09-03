---
title: "MovSAM: A Single-image Moving Object Segmentation Framework Based on Deep Thinking"
authors:
  - me
  - Yiqing Xu
  - Guangming Wang
  - Zhe Liu
  - Yanzi Miao
  - Hesheng Wang
date: "2025-10-19T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE/RSJ International Conference on Intelligent Robots and Systems"
  short_name: "IROS"
venue_display: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS 2025)"
display_area: "Robot Perception"
publication_order: 70
peer_reviewed: true
open_access: true
abstract: "MovSAM performs moving-object segmentation from a single image, where temporal motion cues are unavailable. A multimodal large language model reasons about the scene and produces textual object prompts; these are fused with visual representations from SAM and a vision-language model, then refined through an iterative reasoning loop."
summary: "Single-image moving-object segmentation through multimodal reasoning, language-guided prompting, and iterative refinement."
story_order: 20
tags:
  - IROS 2025
  - Perception & Geometry
  - Moving Object Segmentation
  - Multimodal Large Language Models
  - Segment Anything
  - Computer Vision
featured: false
image:
  caption: 'Research overview: single-image reasoning identifies what could move and refines the segmentation mask without temporal cues.'
  alt_text: 'MovSAM editorial cover with a language-guided person mask and a four-frame occlusion sequence, emphasizing that inference starts from one still image.'
hugoblox:
  ids:
    doi: 10.1109/IROS60139.2025.11246064
    arxiv: 2504.06863v1
links:
  - type: code
    url: https://github.com/IRMVLab/MovSAM
---

## At a glance

| Setting | Design choice |
|---|---|
| Input | One RGB image—no optical flow or adjacent frames |
| Reasoning | A multimodal LLM identifies likely moving objects and writes a text prompt |
| Segmentation | SAM2 features, BEiT-3 vision-language features, and a learned feature aggregator |
| Refinement | A bounded deep-thinking loop revisits the image and current result, up to five rounds |

“Moving” is normally observed across time. If only one frame remains after packet loss, occlusion, or a camera fault, appearance alone cannot prove physical motion. Yet people can still make a useful inference: a cyclist in the road, a running pedestrian, or a car aligned with traffic has semantic and contextual cues that a static foreground detector may miss. MovSAM treats single-image moving-object segmentation as this kind of *reasoning under missing temporal evidence*.

## Reason first, segment second

For image $I$, a multimodal large language model $\Phi$ produces a semantic description or object prompt $T$:

$$
T=\Phi(I).
$$

The implementation uses Llama-3.2-11B-Vision to inspect the full scene, reason step by step about which entities are plausibly moving, and convert that conclusion into text. This prompt is not the final mask. It is an explicit semantic prior passed to the visual segmentation stack, keeping the roles of reasoning and pixel prediction separate.

SAM2 supplies image and mask representations, while BEiT-3 provides aligned vision-language features. A feature aggregation module—five convolutional layers followed by a fully connected layer—compresses global context into a 512-dimensional vector and fuses it with the prompt-conditioned representation. The SAM image encoder is frozen; the vision-language model, aggregator, and the remaining SAM components are optimized for the task. The reported system initializes from SAM ViT-Huge and BEiT-3 Large.

## Deep thinking as a bounded correction loop

A one-pass language answer may mention the wrong object or omit an ambiguous one. MovSAM therefore places the current segmentation back into the multimodal context and asks the model to reconsider. Each round can revise the prompt and update the mask; the loop ends when the answer stabilizes or reaches five rounds. This is “deep thinking” in a concrete system sense: a bounded observe–reason–segment–inspect cycle, not an unconstrained claim that language alone recovers motion physics.

![Single-image segmentation in real scenes with missing temporal evidence.](real-world.jpg "MovSAM uses scene semantics and appearance to infer likely moving objects from one image.")

## Learning objective and evaluation

For pixel prediction $p_i$ and label $y_i$, training combines Dice and binary cross-entropy losses:

$$
\mathcal{L}_{\mathrm{Dice}}
=1-\frac{2\sum_i p_i y_i}{\sum_i p_i+\sum_i y_i},
$$

$$
\mathcal{L}_{\mathrm{BCE}}
=-\frac{1}{N}\sum_i\left[y_i\log p_i+(1-y_i)\log(1-p_i)\right],
\qquad
\mathcal{L}=\mathcal{L}_{\mathrm{Dice}}+\mathcal{L}_{\mathrm{BCE}}.
$$

The evaluation follows moving-object segmentation conventions. Region similarity is intersection-over-union,

$$
\mathcal{J}=\frac{|M\cap G|}{|M\cup G|},
$$

and boundary quality is the F-measure $\mathcal{F}=2PR/(P+R)$. Their mean, $\mathcal{J}\&\mathcal{F}$, summarizes mask accuracy and boundary fidelity.

Training uses manually filtered samples from DAVIS 2016, FBMS, and SegTrackV2 for 100 epochs on four RTX 8000 GPUs. The filtering step matters: a single frame has no direct motion measurement, so training labels must not reward semantically plausible but actually static objects.

## Benchmark results

![Benchmark comparison across DAVIS, FBMS, and YouTube Objects.](benchmark-results.jpg "MovSAM is evaluated against video and single-image alternatives on three moving-object benchmarks.")

| Dataset | Metric | MovSAM | Strongest compared alternative |
|---|---|---:|---:|
| DAVIS 2016 | $\mathcal{J}\&\mathcal{F}$ | **92.5** | 86.7 (FlowP/FlowI) |
| DAVIS 2016 | $\mathcal{J}$ / $\mathcal{F}$ | **90.4 / 94.6** | 87.7 / 85.6 (FlowP/FlowI) |
| FBMS | $\mathcal{J}$ | **83.9** | 82.8 |
| YouTube Objects | mean $\mathcal{J}$ | **79.0** | 75.1 |

The DAVIS comparison is particularly instructive: although several alternatives use temporal input, the single-image system obtains stronger reported segmentation scores. Qualitative sequences also show masks remaining coherent around partial occlusion and fine object boundaries.

![Examples with occlusion and challenging boundaries.](occlusion-sequence.jpg "Qualitative DAVIS sequences illustrate boundary recovery and partial occlusion cases.")

The reported inference time is approximately 0.3 seconds per image. This makes the system far slower than a lightweight feed-forward segmenter, but the latency is compatible with recovery or fallback perception rather than high-rate tracking.

## What each component contributes

| Variant on DAVIS 2016 | $\mathcal{J}\&\mathcal{F}$ | $\mathcal{J}$ | $\mathcal{F}$ |
|---|---:|---:|---:|
| Without feature aggregation | 90.5 | 87.9 | 93.1 |
| Without deep-thinking refinement | 92.0 | 89.7 | 94.2 |
| Full MovSAM | **92.5** | **90.4** | **94.6** |

Feature aggregation contributes the larger gain, while iterative reasoning supplies a smaller but consistent improvement. A separate comparison illustrates the value of task adaptation: LISA without fine-tuning obtains 22.8 in the reported overall score, fine-tuned LISA reaches 70.1, and MovSAM reaches 92.5.

![Language-guided component and adaptation ablations.](language-ablation.jpg "Ablations isolate feature fusion, reasoning refinement, and task-specific adaptation.")

## What the result does—and does not—mean

MovSAM is designed for cases in which temporal measurements are absent: dropped frames, an isolated observation, or a semantic safety check. It infers likely motion from object identity, pose, interaction, and scene context. That inference is useful, but it is not the same as measuring velocity. An idling vehicle or a person frozen mid-action remains fundamentally ambiguous in one image.

The main limitations follow from that ambiguity. Performance depends on the multimodal model's reasoning quality; the iterative loop adds latency and can inherit language-model biases; unusual objects or contexts may induce confident semantic mistakes. In a full robot system, MovSAM is best understood as a robust semantic fallback that complements temporal geometry—not as evidence that time is unnecessary for motion perception.
