---
title: "MRASfM: Multi-Camera Reconstruction and Aggregation through Structure-from-Motion in Driving Scenes"
authors:
  - Lingfeng Xuan
  - me
  - Yiqing Xu
  - Zhe Liu
  - Yanzi Miao
  - Hesheng Wang
date: "2026-01-01T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE International Conference on Robotics and Automation"
  short_name: "ICRA"
peer_reviewed: true
open_access: true
abstract: "MRASfM adapts structure-from-motion to multi-camera driving systems by exploiting fixed inter-camera geometry during registration. It removes unreliable road-surface points with a plane model, treats the camera set as a unit during bundle adjustment, and aggregates multiple scenes through coarse-to-fine association and assembly."
summary: "A multi-camera structure-from-motion framework for reliable and efficient reconstruction and scene aggregation in driving environments."
story_order: 30
tags:
  - Perception & Geometry
  - Structure from Motion
  - Multi-Camera Reconstruction
  - Autonomous Driving
  - Computer Vision
featured: false
image:
  caption: 'MRASfM concept figure from [the paper](https://arxiv.org/abs/2510.15467).'
  alt_text: 'MRASfM uses camera-rig priors and semantic information for driving-scene reconstruction and aggregation.'
links:
  - type: preprint
    provider: arxiv
    id: 2510.15467v1
---

## The problem

Driving-scene structure-from-motion is difficult because road surfaces are weakly textured, camera rigs create many coupled parameters, and separate journeys must be assembled consistently.

## The idea

MRASfM treats the calibrated multi-camera set as one structured unit. Rig geometry improves registration and bundle adjustment, semantic road-plane filtering removes unreliable structure, and coarse-to-fine association aggregates multiple scenes.

## Why it matters in this research story

Reliable embodied behavior begins with reliable spatial structure. MRASfM shows how system priors and semantic information can be combined to make large-scale perception more stable and efficient.
