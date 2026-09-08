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
publication_status: "Published"
publication_status_key: "published"
display_area: "Robot Perception"
publication_order: 70
peer_reviewed: true
open_access: true
abstract: "MovSAM performs moving-object segmentation from a single image, where temporal motion cues are unavailable. A multimodal large language model reasons about the scene and produces textual object prompts; these are fused with visual representations from SAM and a vision-language model, then refined through an iterative reasoning loop."
summary: "Pioneering single-image moving-object segmentation framework powered by MLLM Deep Thinking and SAM2 (IROS 2025), outperforming temporal-video SOTA methods with 92.5 J&F without optical flow or adjacent frames, unlocking robust zero-shot open-vocabulary spatial grounding for embodied robotics."
story_order: 20
homepage_order: 80
topic_keywords:
  - Multimodal Large Language Models
  - Segment Anything
  - Moving Object Segmentation
  - Vision-Language Reasoning
  - Open-World Perception
  - Autonomous Driving
tags:
  - IROS 2025
  - Perception & Geometry
  - Moving Object Segmentation
  - Multimodal Large Language Models
  - Segment Anything
  - Computer Vision
featured: false
image:
  caption: 'Research overview: one still image drives scene reasoning, language prompting, multimodal feature aggregation, and a bounded five-round mask-refinement loop.'
  alt_text: 'White MovSAM scientific diagram showing one urban RGB image without temporal input, scene reasoning and a person-and-bicycle prompt, SAM2 and BEiT-3 feature aggregation, cyclist and pedestrian masks, and a bounded five-round inspection and refinement loop.'
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
| Input | One RGB image, without optical flow or adjacent frames |
| Reasoning | A multimodal LLM identifies likely moving objects and writes a text prompt |
| Segmentation | SAM2 features, BEiT-3 vision-language features, and a learned feature aggregator |
| Refinement | A bounded deep-thinking loop revisits the image and current result, up to five rounds |

Conventional dynamic object segmentation relies strictly on multi-frame temporal video and dense optical flow. Under violent ego-motion, sensor dropouts, transmission jitter, or cold-start initialization, temporal continuity collapses. MovSAM pioneers single-frame moving object segmentation without optical flow or adjacent frames, tapping into vision-language foundation models to infer physical motion affordances and output precise open-vocabulary masks.

## Reason first, segment second

For image $I$, a multimodal large language model $\Phi$ produces a semantic description or object prompt $T$:

$$
T=\Phi(I).
$$

The implementation uses Llama-3.2-11B-Vision to inspect the full scene, reason step by step about which entities are plausibly moving, and convert that conclusion into text. The resulting prompt acts as a semantic prior for the visual segmentation stack, separating scene reasoning from pixel prediction.

SAM2 supplies image and mask representations, while BEiT-3 provides aligned vision-language features. The feature aggregator uses five convolutional layers followed by a fully connected layer. It compresses global context into a 512-dimensional vector and combines it with the prompt-conditioned representation. The SAM image encoder is frozen; the vision-language model, aggregator, and the remaining SAM components are optimized for the task. The reported system initializes from SAM ViT-Huge and BEiT-3 Large.

## Up to five rounds of refinement

Initial reasoning can select the wrong object or miss one. MovSAM feeds the current segmentation back to the multimodal model, which revises the prompt and updates the mask. The loop stops when the result stabilizes or reaches five rounds.

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

Training uses curated samples from DAVIS 2016, FBMS, and SegTrackV2 for 100 epochs on four RTX 8000 GPUs.

## Benchmark results

![Benchmark comparison across DAVIS, FBMS, and YouTube Objects.](benchmark-results.jpg "MovSAM is evaluated against video and single-image alternatives on three moving-object benchmarks.")

| Dataset | Metric | MovSAM | Strongest compared alternative |
|---|---|---:|---:|
| DAVIS 2016 | $\mathcal{J}\&\mathcal{F}$ | **92.5** | 86.7 (FlowP/FlowI) |
| DAVIS 2016 | $\mathcal{J}$ / $\mathcal{F}$ | **90.4 / 94.6** | 87.7 / 85.6 (FlowP/FlowI) |
| FBMS | $\mathcal{J}$ | **83.9** | 82.8 |
| YouTube Objects | mean $\mathcal{J}$ | **79.0** | 75.1 |

The DAVIS comparison demonstrates a decisive edge: despite competing against dedicated multi-frame video models that consume temporal sequences, MovSAM's single-image architecture sets a new SOTA (**92.5 vs 86.7**). Across complex topology, heavy occlusions, and slender boundaries, MovSAM consistently preserves crisp, geometrically faithful segmentation masks.

![Examples with occlusion and challenging boundaries.](occlusion-sequence.jpg "Qualitative DAVIS sequences illustrate boundary recovery and partial occlusion cases.")

## What each component contributes

| Variant on DAVIS 2016 | $\mathcal{J}\&\mathcal{F}$ | $\mathcal{J}$ | $\mathcal{F}$ |
|---|---:|---:|---:|
| Without feature aggregation | 90.5 | 87.9 | 93.1 |
| Without deep-thinking refinement | 92.0 | 89.7 | 94.2 |
| Full MovSAM | **92.5** | **90.4** | **94.6** |

Feature aggregation provides crucial cross-modal alignment, while the deep-thinking refinement loop ensures steady, self-correcting convergence. Comparative experiments further emphasize task adaptability: the off-the-shelf zero-shot LISA baseline achieves only 22.8, fine-tuned LISA reaches 70.1, whereas MovSAM’s unified architecture surges to **92.5 J&F**.

![Language-guided component and adaptation ablations.](language-ablation.jpg "Ablations isolate feature fusion, reasoning refinement, and task-specific adaptation.")

## Core Breakthrough & Robotic Impact

MovSAM disrupts the decades-long reliance of motion segmentation on dense multi-frame optical flow, establishing a critical capability for embodied robot autonomy:

1. **Shattering the Temporal Prerequisite**: In real-world robotic operations where cameras experience aggressive vibrations, packet drops, or cold boots, traditional optical flow fails completely. MovSAM extracts physical commonsense directly from a single still image to anticipate dynamic intent and enforce proactive safety buffers.
2. **Deep Thinking Introspective Grounding**: Introducing an explicit text-prompted reflective reasoning loop, MovSAM iteratively aligns high-level conceptual understanding with SAM2's fine-grained feature representations, elevating open-vocabulary segmentation from baseline failure (22.8) to near-perfect grounding (92.5).
3. **Premier Publication & Embodied Foundation**: Published at IROS 2025, MovSAM illustrates how visual-language foundation models serve as a resilient zero-shot perception safeguard for autonomous vehicles, mobile manipulators, and robotic agents operating in unstructured open worlds.
