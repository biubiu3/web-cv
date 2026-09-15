---
title: "Robust Multi-Model Fitting through Learning Neighbor Regions"
authors:
  - me
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2026-09-14T10:33:19Z"
publication_types: ["article-journal"]
publication:
  name: "Under review at IEEE Transactions on Pattern Analysis and Machine Intelligence"
  short_name: "TPAMI (under review)"
venue_display: "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)"
publication_status: "Under review"
publication_status_key: "under_review"
display_area: "Robust Geometric Estimation"
publication_order: 10
peer_reviewed: false
open_access: true
featured: true
abstract: "Learning Neighbor Regions (LNR) is a coarse-to-fine framework for robust multi-model fitting. It learns from point-derived geometric features to screen randomly sampled minimum sets before solving them, then encodes the neighboring region of each retained hypothesis for independent refinement and scoring. Hypothesis-based non-maximum suppression produces the final compound model without differentiating through sampling or geometric solvers."
summary: "A learned coarse-to-fine framework that filters bad minimum sets early and reasons over neighboring regions to robustly fit overlapping geometric models."
story_order: 15
homepage_order: 20
topic_keywords:
  - Robust Estimation
  - Multi-Model Fitting
  - Geometric Vision
  - RANSAC
  - Neural Networks
  - 3D Reconstruction
tags:
  - TPAMI · Under Review
  - Perception & Geometry
  - Robust Estimation
  - Multi-Model Fitting
  - Computer Vision
image:
  caption: "Shared observations, overlapping geometric regions."
  alt_text: "LNR — Shared observations, overlapping geometric regions."
hugoblox:
  ids:
    arxiv: 2609.15348v1
links:
  - type: preprint
    provider: arxiv
    id: 2609.15348v1
---

## At a glance

| Question | LNR's answer |
|---|---|
| What is the target? | Several geometric instances in one noisy observation set |
| What is learned? | Point-derived geometric features, minimum-set confidence, and hypothesis refinement and score |
| What remains classical? | Random sampling, the task-specific minimal solver, and final geometric models |
| How is overlap handled? | Each hypothesis receives its own neighboring region; a point can inform more than one region |
| Where is it evaluated? | Multi-line fitting, vanishing points, two-view plane segmentation, and two-view motion |

Many vision problems require more than one model at once: several lines in a point cloud, multiple vanishing directions in an image, or several planar and motion instances across two views. The difficulty is not only outliers. A point can lie near, or contribute evidence to, more than one model, so greedy “fit one, remove its inliers, repeat” pipelines can lose structure as they proceed.

Learning Neighbor Regions (LNR) learns which sampled minimum sets deserve computation and which local regions support a proposed hypothesis. The task-specific geometric solver converts the selected sets into candidate models.

![LNR turns many noisy candidate sets into a compact set of independently refined hypotheses.](pipeline.png "The paper's LNR pipeline: geometric features, coarse minimum-set screening, region-aware refinement, and hypothesis NMS.")

## Coarse screening before expensive solving

Given noisy observations $\chi=\{x_i\}_{i=1}^N$, LNR first builds a feature for every point that combines local point-wise evidence with global context. The paper uses Fourier feature mapping, shared MLPs, and max pooling to form the geometric representation.

Random sampling then creates many minimum sets. Rather than solve every one, the coarse-level module scores each set from the features of its constituent points and retains only the most promising sets. The task-specific solver $S$ is applied only after this screen:

$$
H_{\mathrm{coarse}}=\{S(M_j)\mid M_j\in\mathbb{M}_{\mathrm{good}}\}.
$$

This division matters in a multi-model setting: random sampling still offers broad coverage, while learned selection prevents clearly unproductive sets from consuming the later refinement budget.

## Neighbor regions make overlap explicit

A hypothesis should be judged by more than its parameter vector. For each coarse hypothesis, LNR gathers features from its neighboring data points and concatenates their residuals to that hypothesis. A refinement head predicts a parameter update; a score head estimates hypothesis quality. The two heads operate independently for every candidate hypothesis.

The region representation allows one observation to contribute to multiple hypotheses when models overlap. It also avoids back-propagating through the discrete sampler or a task-specific solver: training is driven by data-point features and the outputs of the learned heads. At inference, hypothesis-based non-maximum suppression selects the final compound model and determines how many models remain.

## From features to supervised refinement

Each point combines 128 local and 128 global features. The coarse network also receives the original coordinates. A neighborhood uses a task-specific distance: Euclidean distance for lines, directional distance for vanishing points, reprojection error for planes, or a normalized epipolar constraint for motion. Short regions are zero-padded for batching.

Training supervises minimum-set confidence and hypothesis scores with ground-truth model similarity. A Smooth L1 loss trains parameter refinement. At test time, suppression removes geometrically redundant hypotheses.

## Fitting different kinds of structure

The same stages apply to several geometric problems, with the residual and solver adapted to each one.

| Setting | What is fitted | Reported evaluation |
|---|---|---|
| Multi-line fitting | Multiple noisy 2D lines | AUC at $0.5^\circ$ over 1–10-line scenes |
| Vanishing points | Multiple image-space line directions | AUC at $5^\circ$ and $10^\circ$ on NYU-VP, YUD+, and YUD |
| Two-view planes | Several planar correspondence groups | Mean misclassification error on AdelaideRMF |
| Two-view motion | Multiple motion instances in correspondences | Mean misclassification error on AdelaideRMF |

The paper reports state-of-the-art results across these four tasks. Its vanishing-point experiment also trains on NYU-VP and evaluates directly on YUD+ and YUD, separating cross-dataset transfer from within-dataset fitting.

![Qualitative multi-line fits under outliers, noise, and increasing model count.](multi-line-results.png "Red points are estimated inliers, black points are outliers, green lines are ground truth, and blue lines are LNR fits in the paper's qualitative study.")

![Vanishing-point examples and hypothesis scores from the paper.](vanishing-points.png "LNR assigns high scores to hypotheses near the ground-truth vanishing directions and suppresses poor candidates.")

## What the ablations test

The ablations examine the design as a sequence rather than treating the network as one opaque component. They compare coarse-to-fine processing with direct hypothesis prediction, learned scores with simple inlier counting, random sampling with an alternative learned sampler, Fourier feature mapping, and neural refinement with least-squares refinement. The reported analysis attributes the full model's behavior to the combination of early screening and region-aware fine-level scoring, while noting that a stronger sampler can improve accuracy at additional runtime cost.

LNR complements the earlier RLSAC line of work on this site. RLSAC learns a sequential sampling policy from trial feedback for single-model consensus estimation; LNR addresses the simultaneous, overlapping-instance case by scoring a broad hypothesis pool and refining each candidate through its neighboring region.
