---
title: "ERMV: Editing 4D Robotic Multi-view Images to Enhance Embodied Agents"
authors:
  - me
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2025-07-23T12:41:11Z"
publication_types: ["article"]
peer_reviewed: false
open_access: true
abstract: "ERMV is a data-augmentation framework for editing complete multi-view robot trajectories from sparse frame edits and robot-state conditions. Epipolar motion-aware attention supports geometric and appearance consistency, sparse spatio-temporal modeling expands the editing window efficiently, and multimodal feedback checks sequence inconsistencies before requesting targeted intervention."
summary: "Consistent and efficient editing of multi-view robot trajectories for augmenting embodied policy training data."
story_order: 60
tags:
  - Multimodal Data & Models
  - Embodied Intelligence
  - Data Augmentation
  - Video Editing
  - Vision-Language-Action
  - Multimodal Learning
featured: false
image:
  caption: 'The 4D editing challenge from [the ERMV paper](https://arxiv.org/abs/2507.17462).'
  alt_text: 'ERMV edits long multi-view robot sequences while maintaining geometric and temporal consistency.'
hugoblox:
  ids:
    arxiv: 2507.17462v1
links:
  - type: code
    url: https://github.com/IRMVLab/ERMV
---

## The problem

Robot policies need diverse trajectories, but editing a single frame is not enough: changes must remain consistent across cameras, time, camera motion, and robot state.

## The idea

ERMV expands one guided edit into a complete 4D multi-view trajectory. Epipolar motion-aware attention protects geometry, sparse spatio-temporal modeling keeps long sequences tractable, and multimodal feedback identifies inconsistent regions for targeted correction.

## Why it matters in this research story

ERMV turns generative modeling into an embodied-data tool. It links multimodal model design to the practical question of how a robot system can obtain richer, physically coherent experience.
