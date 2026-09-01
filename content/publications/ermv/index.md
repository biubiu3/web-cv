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
tags:
  - Embodied Intelligence
  - Data Augmentation
  - Video Editing
  - Vision-Language-Action
featured: false
hugoblox:
  ids:
    arxiv: 2507.17462v1
links:
  - type: code
    url: https://github.com/IRMVLab/ERMV
---

ERMV addresses a practical bottleneck in robot learning: collecting diverse, temporally consistent, multi-view manipulation data. It edits full trajectories while protecting geometry, long-horizon consistency, and the semantic integrity of task-critical objects such as the robot arm.
