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
peer_reviewed: true
open_access: true
abstract: "MovSAM performs moving-object segmentation from a single image, where temporal motion cues are unavailable. A multimodal large language model reasons about the scene and produces textual object prompts; these are fused with visual representations from SAM and a vision-language model, then refined through an iterative reasoning loop."
summary: "Single-image moving-object segmentation through multimodal reasoning, language-guided prompting, and iterative refinement."
story_order: 20
tags:
  - Perception & Geometry
  - Moving Object Segmentation
  - Multimodal Large Language Models
  - Segment Anything
  - Computer Vision
featured: false
image:
  caption: 'MovSAM overview from [the paper](https://arxiv.org/abs/2504.06863).'
  alt_text: 'MovSAM reasons about the likely moving object and iteratively refines its segmentation.'
hugoblox:
  ids:
    doi: 10.1109/IROS60139.2025.11246064
    arxiv: 2504.06863v1
links:
  - type: code
    url: https://github.com/IRMVLab/MovSAM
---

## The problem

Moving-object segmentation usually relies on temporal cues, yet a vehicle may receive only a single usable frame because of frame drops, occlusion, or sensor failure.

## The idea

MovSAM asks a multimodal large language model to reason about which object is likely moving and to express that decision as a text prompt. Visual-language features and SAM then produce a mask, while a deliberate refinement loop revisits uncertain results.

## Why it matters in this research story

MovSAM moves robust perception beyond purely geometric cues: semantic reasoning becomes a useful prior when direct motion evidence is missing. This is an important bridge from classical visual estimation toward multimodal decision systems.
