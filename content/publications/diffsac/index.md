---
title: "DiffSAC: Diffusion-guided Sampling for Consensus-based Robust Estimation"
authors:
  - me
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2026-08-31T11:15:11Z"
publication_types: ["article"]
peer_reviewed: false
open_access: true
abstract: "DiffSAC uses a geometry-conditioned diffusion model to learn the distribution of effective minimum sets for consensus-based robust estimation. Rather than ranking individual points once, it iteratively refines per-point confidence toward a small collection of high-quality candidate sets. The framework is evaluated across line and plane fitting, fundamental and essential matrix estimation, and homography estimation."
summary: "Geometry-conditioned diffusion sampling that proposes a small number of high-quality minimum sets for efficient robust estimation."
tags:
  - Robust Estimation
  - Diffusion Models
  - Computer Vision
featured: false
hugoblox:
  ids:
    arxiv: 2608.30603v1
links:
  - type: code
    url: https://github.com/IRMVLab/DiffSAC
---

DiffSAC revisits sample consensus as a generative sampling problem. Its diffusion process uses geometric conditions to refine which points should form an effective minimum set, reducing the number of poor hypotheses that must be evaluated.
