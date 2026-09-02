---
title: "MID: A Self-Supervised Multimodal Iterative Denoising Framework"
authors:
  - me
  - Tianchen Deng
  - Zhe Liu
  - Hesheng Wang
date: "2026-04-30T00:00:00Z"
publication_types: ["article-journal"]
publication:
  name: "IEEE Transactions on Neural Networks and Learning Systems"
  short_name: "TNNLS"
venue_display: "IEEE Transactions on Neural Networks and Learning Systems (TNNLS)"
display_area: "Multimodal Self-Supervised Learning"
publication_order: 40
peer_reviewed: true
open_access: true
abstract: "MID treats a noisy observation as an intermediate state in a nonlinear corruption process and learns to reverse that process using noisy data alone. One network estimates the current corruption stage and another removes the corresponding residual increment; a local first-order approximation supports iterative restoration under nonlinear noise. The formulation is instantiated across vision, biomedical signals, point sets, and biological sequences."
summary: "A self-supervised iterative framework that learns nonlinear denoising directly from noisy observations across multiple data modalities."
story_order: 50
tags:
  - TNNLS 2026
  - Multimodal Data & Models
  - Self-Supervised Learning
  - Multimodal Learning
  - Denoising
featured: false
image:
  caption: 'The MID training and iterative denoising pipeline (Figure 2).'
  alt_text: 'MID method pipeline for learning corruption-stage prediction and iterative residual denoising from noisy multimodal observations.'
hugoblox:
  ids:
    doi: 10.1109/TNNLS.2026.3683544
links:
  - type: preprint
    provider: arxiv
    id: 2511.00997v1
---

## The problem

Paired clean targets are expensive or impossible to collect for many modalities, and real corruption is often nonlinear rather than a single fixed noise level.

## The idea

MID views a noisy sample as an intermediate point on a corruption trajectory. One network estimates the current stage, another predicts the local residual to remove, and repeated updates move the observation toward a cleaner state using noisy data alone.

## Why it matters in this research story

The same iterative principle applies across images, geometric observations, biomedical signals, and biological sequences. MID therefore broadens the focus from a specific vision task to **modality-agnostic learning dynamics**.
