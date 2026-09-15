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
summary: "Scene reasoning, language prompts and iterative mask feedback connect a single image to moving-object segmentation."
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
  caption: "Scene semantics guide object segmentation."
  alt_text: "MOVSAM — Scene semantics guide object segmentation."
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

Motion segmentation often uses adjacent frames to measure changes in the scene. When only one image is available, that temporal evidence is missing. MovSAM uses object appearance and scene semantics to infer likely moving entities, then converts the interpretation into pixel masks.

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

## Learning to connect language and masks

The segmentation objective combines a region-overlap loss with pixelwise classification. The language prompt identifies the intended object, while the visual features preserve its boundary and local appearance. The learned aggregator connects these two forms of information.

The feedback loop also operates across these levels. A mask can reveal that a prompt selected the wrong entity or omitted a relevant object. Returning that result to the reasoning model gives the next prompt a concrete visual consequence to inspect.

## What a single image can tell the system

A still image can show posture, object identity and scene context that suggest movement. It does not directly measure temporal displacement. MovSAM uses those semantic cues to infer likely moving objects, which makes the distinction between motion evidence and motion interpretation central to the task.

For a robot receiving an isolated image, this formulation provides an object-level interpretation even when adjacent frames are unavailable. Whether that interpretation is sufficient for a downstream decision depends on the task and the available observations.

![Segmentation examples with occlusion and fine boundaries.](occlusion-sequence.jpg "Qualitative examples from the paper illustrate the objects and boundaries being segmented.")

## Evaluation and design insight

The experiments compare segmentation on DAVIS, FBMS and YouTube Objects. Ablations examine feature aggregation, iterative reasoning and task adaptation.

The architectural idea is an inspectable connection between language and pixels. Reasoning proposes an object interpretation, segmentation turns it into a spatial prediction, and the resulting mask becomes evidence for another reasoning step.
