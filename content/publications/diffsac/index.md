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
publication_status_key: "under_review"
display_area: "Robust Geometric Estimation"
publication_order: 50
peer_reviewed: false
open_access: true
abstract: "DiffSAC uses a geometry-conditioned diffusion model to learn the distribution of effective minimum sets for consensus-based robust estimation. Iterative refinement transforms per-point confidence into a small collection of high-quality candidate sets. The framework is evaluated across line and plane fitting, fundamental and essential matrix estimation, and homography estimation."
summary: "Geometry-conditioned diffusion sampling that proposes a small number of high-quality minimum sets for efficient robust estimation."
story_order: 40
homepage_order: 90
topic_keywords:
  - Diffusion Models
  - Robust Estimation
  - Sample Consensus
  - Geometric Deep Learning
  - Outlier Rejection
  - Differentiable RANSAC
tags:
  - IJCV · Under Review
  - Perception & Geometry
  - Robust Estimation
  - Diffusion Models
  - Computer Vision
featured: false
image:
  caption: "Diffusion refines confidence over candidate observations."
  alt_text: "DIFFSAC — Diffusion refines confidence over candidate observations."
hugoblox:
  ids:
    arxiv: 2608.30603v1
links:
  - type: code
    url: https://github.com/IRMVLab/DiffSAC
---

## At a glance

| Question | DiffSAC's answer |
|---|---|
| What is generated? | Confidence fields whose top entries form effective geometric minimum sets |
| Why diffusion? | Iterative conditional refinement can model several jointly valid sets |
| What remains classical? | The minimal solver, consensus scoring, and optional local optimization |
| Evaluation scope | Line and plane fitting, fundamental/essential matrices, and homography estimation |
| Status | Preprint; under review at IJCV |

Sample consensus succeeds only when a proposed minimum set is jointly compatible with the target geometry. A point can look individually reliable yet combine badly with other high-ranked points: two nearly coincident line samples are unstable, repeated correspondences may be degenerate for an eight-point solver, and a single deterministic ranking offers little diversity when the top combination fails.

DiffSAC treats sampling as conditional generation. It learns a distribution of confidence fields and refines them through a reverse diffusion process. Multiple noise seeds can then produce a compact, diverse collection of candidate sets.

## Consensus estimation stays modular

Given observations $\chi$ and a minimum set $\mathcal{M}_j$, a task-specific solver constructs $h_j=S(\mathcal{M}_j)$ and a consensus function evaluates $f(h_j,\chi)$. The final estimate remains

$$
h_{\mathrm{best}}
=\arg\max_{j=1,\ldots,J} f\!\left(S(\mathcal{M}_j),\chi\right).
$$

DiffSAC changes the proposal mechanism for $\mathcal{M}_j$ while keeping the underlying line, plane, fundamental-matrix, essential-matrix, and homography solvers unchanged. Local optimization such as LO-RANSAC can therefore be added after sampling.

## Confidence is a property of a set

Let $c_0$ be a target confidence field conditioned on observations $\chi$. During training, a forward diffusion process corrupts it into $c_t$; a Transformer learns the reverse condition

$$
p_\theta(c_{t-1}\mid c_t,\chi).
$$

The denoiser is trained with a mean-squared objective toward $c_0$. It has no positional encoding, making it permutation invariant and able to accept different numbers of observations. Attention allows every candidate to change its confidence in response to the rest of the set.

![A noisy confidence field is refined into a geometry-conditioned sampling proposal.](confidence-diffusion.jpg "Forward corruption supplies training targets; reverse diffusion generates candidate minimum sets.")

![The Transformer denoiser jointly reasons over observations and current confidence.](denoiser-network.jpg "No positional encoding is used, preserving permutation invariance.")

The confidence expresses membership in a *good joint minimum set* under the current generated proposal. Different reverse trajectories can therefore emphasize different mutually compatible subsets.

### What the denoiser learns

Training uses the ground-truth geometric model to identify a target minimum set. Its selected observations receive confidence 1 and the remaining observations receive 0. Gaussian noise corrupts this confidence vector while the observation coordinates remain fixed. The network therefore learns to recover a sampling proposal conditioned on geometry.

Separate fully connected layers embed observation features and noisy confidence into the same feature dimension. An MLP embeds the diffusion timestep. These embeddings are added, processed by normalized Transformer attention, and mapped back to one confidence per observation. A change in input order produces the corresponding change in output order, so the selected geometric set is independent of how observations are listed.

## Training and inference

The training objective teaches the model to recover target confidence from controlled corruption. DPM-Solver++ accelerates the reverse process.

At inference, copies of the same observations receive independent Gaussian confidence vectors. Each follows a reverse-refinement trajectory. The highest-confidence observations form a minimum set of the size required by the solver; the resulting hypotheses are scored against the complete observation set.

Computation is allocated to refining a compact batch of proposals. Different noise seeds provide alternative combinations when one otherwise plausible set is poorly conditioned.

## From confidence to geometry

A final confidence field provides a ranking over the original observations. Selecting the solver's required number of observations forms one minimum set. The solver constructs a geometric hypothesis, and consensus scoring tests that hypothesis against the full observation set. The same procedure can use a pair for a line, a triple for a plane, or correspondences for image geometry.

Independent noise seeds allow several confidence trajectories to be generated in parallel. These trajectories can favor different compatible subsets even though they condition on the same observations. This diversity matters when one plausible set is degenerate or poorly conditioned.

![Confidence refinement for a line-fitting proposal.](line-refinement.jpg "The generated confidence changes which observations enter the minimum set.")

## Why keep the geometric backend?

The network's output has a clear responsibility: propose observations worth solving. Geometry remains explicit in the task-specific solver and residual function. After selecting the best hypothesis, a local optimizer can refine it using its supporting observations.

This separation also makes failures easier to interpret. A poor result may originate in an unsuitable proposal, a degenerate minimum set, or insufficient support for the fitted model. Each stage exposes a different part of that process.

![Image correspondences selected through diffusion refinement.](fundamental-refinement.jpg "Conditioned confidence proposals feed the classical two-view geometry pipeline.")

## Evaluation and design lessons

The study covers line and plane fitting, fundamental and essential matrices, and homography estimation. Synthetic correspondences derived from ModelNet40 test sensitivity to outliers. Other experiments vary observation count, refinement budget and local optimization.

The ablations compare direct confidence prediction with iterative refinement. They also examine the balance between proposal quality and inference cost.

DiffSAC's central idea is to model a distribution over useful observation combinations. It offers a way to allocate computation to a compact set of refined proposals while retaining the geometric checks that make sample consensus interpretable.
