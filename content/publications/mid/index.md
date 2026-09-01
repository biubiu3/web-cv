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
peer_reviewed: true
open_access: true
abstract: "MID treats a noisy observation as an intermediate state in a nonlinear corruption process and learns to reverse that process using noisy data alone. One network estimates the current corruption stage and another removes the corresponding residual increment; a local first-order approximation supports iterative restoration under nonlinear noise. The formulation is instantiated across vision, biomedical signals, point sets, and biological sequences."
summary: "A self-supervised iterative framework that learns nonlinear denoising directly from noisy observations across multiple data modalities."
tags:
  - Self-Supervised Learning
  - Multimodal Learning
  - Denoising
featured: false
hugoblox:
  ids:
    doi: 10.1109/TNNLS.2026.3683544
links:
  - type: preprint
    provider: arxiv
    id: 2511.00997v1
---

MID develops a modality-agnostic view of denoising: learn the local direction of a corruption process from noisy inputs, then iteratively move observations toward a cleaner state without paired clean targets.
