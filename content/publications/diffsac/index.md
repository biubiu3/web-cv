---
title: "DiffSAC: Diffusion-guided Sampling for Consensus-based Robust Estimation"
authors:
  - me
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2026-08-31T11:15:11Z"
publication_types: ["article"]
publication:
  name: "Under review at the International Journal of Computer Vision"
  short_name: "IJCV (under review)"
venue_display: "International Journal of Computer Vision (IJCV)"
publication_status: "Under review"
display_area: "Robust Geometric Estimation"
publication_order: 50
peer_reviewed: false
open_access: true
abstract: "DiffSAC uses a geometry-conditioned diffusion model to learn the distribution of effective minimum sets for consensus-based robust estimation. Rather than ranking individual points once, it iteratively refines per-point confidence toward a small collection of high-quality candidate sets. The framework is evaluated across line and plane fitting, fundamental and essential matrix estimation, and homography estimation."
summary: "Geometry-conditioned diffusion sampling that proposes a small number of high-quality minimum sets for efficient robust estimation."
story_order: 40
tags:
  - IJCV · Under Review
  - Perception & Geometry
  - Robust Estimation
  - Diffusion Models
  - Computer Vision
featured: false
image:
  caption: 'The complete training and inference pipeline from Figure 2 of [the DiffSAC paper](https://arxiv.org/abs/2608.30603).'
  alt_text: 'DiffSAC learns a geometry-conditioned diffusion prior, generates minimum sets, and selects the best consensus hypothesis.'
hugoblox:
  ids:
    arxiv: 2608.30603v1
links:
  - type: code
    url: https://github.com/IRMVLab/DiffSAC
---

## The problem

One-shot confidence ranking treats candidate points independently and can spend much of its hypothesis budget on combinations that are individually plausible but jointly poor.

## The idea

DiffSAC treats minimum-set proposal as conditional generation. A diffusion process repeatedly refines point confidence under geometric conditions, producing a compact set of high-quality candidates for consensus-based estimation.

## Why it matters in this research story

DiffSAC revisits the RLSAC question with a modern generative model: not merely which point looks good, but **which set should be generated together**. It closes the perception-and-geometry chapter of this research trajectory.
