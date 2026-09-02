---
title: "MRASfM: Multi-Camera Reconstruction and Aggregation through Structure-from-Motion in Driving Scenes"
authors:
  - me
  - Lingfeng Xuan
  - Yiqing Xu
  - Zhe Liu
  - Yanzi Miao
  - Hesheng Wang
author_notes:
  - "Equal contribution"
  - "Equal contribution"
date: "2026-06-01T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE International Conference on Robotics and Automation"
  short_name: "ICRA"
venue_display: "IEEE International Conference on Robotics and Automation (ICRA 2026)"
display_area: "Robot Perception & Reconstruction"
publication_order: 30
peer_reviewed: true
open_access: true
abstract: "MRASfM adapts structure-from-motion to multi-camera driving systems by exploiting fixed inter-camera geometry during registration. It removes unreliable road-surface points with a plane model, treats the camera set as a unit during bundle adjustment, and aggregates multiple scenes through coarse-to-fine association and assembly."
summary: "A multi-camera structure-from-motion framework for reliable and efficient reconstruction and scene aggregation in driving environments."
story_order: 30
tags:
  - ICRA 2026
  - Perception & Geometry
  - Structure from Motion
  - Multi-Camera Reconstruction
  - Autonomous Driving
  - Computer Vision
featured: false
image:
  caption: 'The complete MRASfM pipeline for multi-camera reconstruction and multi-scene aggregation (Figure 2).'
  alt_text: 'MRASfM method pipeline using multi-camera priors, semantic triangulation, camera-set bundle adjustment, and coarse-to-fine scene aggregation.'
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
