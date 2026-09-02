---
title: "Towards the Vision-Sound-Language-Action Paradigm: The HEAR Framework for Sound-Centric Manipulation"
authors:
  - me
  - Tianchen Deng
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2026-03-17T03:22:30Z"
publication_types: ["article-journal"]
publication:
  name: "The International Journal of Robotics Research"
  short_name: "IJRR"
venue_display: "The International Journal of Robotics Research (IJRR)"
display_area: "Multisensory Robot Manipulation"
publication_order: 10
spotlight: true
peer_reviewed: true
open_access: true
abstract: "HEAR formalizes Vision-Sound-Language-Action as a continuous robot-control paradigm in which transient acoustic events remain available across delayed, chunked decision loops. The framework combines causal audio memory, multimodal reasoning, near-future audio prediction, and flow-matching action generation. OpenX-Sound and HEAR-Bench provide pretraining data and sound-causal evaluation tasks for this setting."
summary: "A sound-centric embodied framework that gives robot policies causal audio memory, multimodal reasoning, future-audio prediction, and smooth action generation."
story_order: 70
tags:
  - IJRR 2026
  - General Robot Systems
  - Embodied Intelligence
  - Vision-Sound-Language-Action
  - Multimodal Foundation Models
  - Robot Manipulation
featured: true
image:
  caption: 'The HEAR method architecture: Historizer, Envisioner, Advancer, and Realizer (Figure 2).'
  alt_text: 'HEAR method architecture connecting streaming audio memory, multimodal reasoning, audio prediction, and flow-matching robot action generation.'
hugoblox:
  ids:
    arxiv: 2603.16086v1
links:
  - type: custom
    label: Project
    url: https://hear.irmv.top/
  - type: code
    url: https://github.com/IRMVLab/HEAR
---

## Research focus

Modern vision-language-action policies can miss short, task-critical sounds while executing open-loop action chunks. HEAR addresses this mismatch by treating sound as a continuous causal signal rather than a static prompt.

## What it contributes

HEAR brings together a streaming **Historizer**, a multisensory **Envisioner**, an audio-dynamics **Advancer**, and a flow-matching **Realizer**. The accompanying OpenX-Sound resource and HEAR-Bench extend the work from model design to training and evaluation for sound-centric robot manipulation.

## Why it matters in this research story

HEAR turns a multimodal model into a complete physical system: it connects continuous sensory memory, reasoning, prediction, action generation, data, benchmarks, and real-robot evaluation. It is one of my two current representative works.
