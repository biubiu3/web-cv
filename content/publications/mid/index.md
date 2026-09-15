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
publication_status: "Published"
publication_status_key: "published"
display_area: "Multimodal Self-Supervised Learning"
publication_order: 40
peer_reviewed: true
open_access: true
abstract: "MID treats a noisy observation as an intermediate state in a nonlinear corruption process and learns to reverse that process using noisy data alone. One network estimates the current corruption stage and another removes the corresponding residual increment; a local first-order approximation supports iterative restoration under nonlinear noise. The formulation is instantiated across vision, biomedical signals, point sets, and biological sequences."
summary: "A self-supervised iterative framework that learns nonlinear denoising directly from noisy observations across multiple data modalities."
story_order: 50
homepage_order: 70
topic_keywords:
  - Self-Supervised Learning
  - Multimodal Learning
  - Iterative Denoising
  - Corruption Modeling
  - Scientific Machine Learning
  - Data-Centric AI
tags:
  - TNNLS 2026
  - Multimodal Data & Models
  - Self-Supervised Learning
  - Multimodal Learning
  - Denoising
featured: false
image:
  caption: "Iterative recovery across data modalities."
  alt_text: "MID — Iterative recovery across data modalities."
hugoblox:
  ids:
    doi: 10.1109/TNNLS.2026.3683544
links:
  - type: preprint
    provider: arxiv
    id: 2511.00997v1
---

## At a glance

| Question | MID's answer |
|---|---|
| Can denoising be learned without paired clean targets? | Treat each noisy observation as a state on a synthetically extended corruption path |
| How is nonlinear corruption reversed? | Estimate the current noise stage, then remove one learned local residual repeatedly |
| Is the architecture modality specific? | CNNs or Transformers implement the same formulation according to the data structure |
| What is tested? | Natural images, robust geometry, sEMG/ECG, MRI, and protein sequence representations |

Denoising often requires clean training targets, which can be difficult to collect. Repeated MRI scans may be misaligned, and clean biosignals may be unavailable. Geometric point sets also need targets suited to their structure. Nonlinear, heterogeneous noise makes single-step recovery more difficult.

MID restores data through local steps along a corruption trajectory. Training adds controlled noise to observed samples and learns to reverse each increment without clean targets.

## A noisy observation is an intermediate state

Let $s=s_0$ be the observed sample. A controllable noising operator creates a sequence

$$
s_t=\psi_{\mathrm{Noising}}(s,\epsilon_t,t),
$$

where larger $t$ corresponds to additional corruption. Even if the global trajectory is nonlinear, two neighboring states admit a local first-order approximation,

$$
s_t\approx s_{t-1}+\Delta s_{t-1}.
$$

The model estimates the current corruption stage and learns to remove one local increment. Controlled additional noise supplies supervision.

Two networks divide those responsibilities:

- $\Psi$ predicts the current corruption stage $\hat t=\Psi(s_t)$.
- $\Phi$ predicts the local residual/noise conditioned on the sample and stage.

Inference then iterates

$$
\hat t=\Psi(s_t),
\qquad
s_{t-1}=s_t-\Phi(s_t,\hat t),
$$

until the estimated stage approaches zero. This makes the number of restoration steps data dependent: a mildly corrupted sample need not follow the same path as an extreme one.

![CNN and Transformer realizations of the same iterative principle.](network-architectures.jpg "MID changes the encoder to match each modality while preserving stage estimation and residual reversal.")

## Self-supervised objectives and architectures

The model receives supervision because the additional corruption process is known: it can regress the synthetic stage and residual even though the original clean sample is unknown. Training combines mean-squared losses for stage and noise prediction; point-classification tasks add a binary cross-entropy term. The total objective is the sum of the active components.

Images and MRI use convolutional networks. Point sets, line segments, one-dimensional signals and amino-acid representations use Transformer variants that preserve interactions in their respective data structures.

The shared component across modalities is the *learning dynamics*: estimate location on a corruption path, take a local reverse step, inspect the new state, and repeat. Each modality uses a suitable network architecture.

## Adapting the process to different data

The same update rule can act on different representations. For an image, spatial neighborhoods carry edges and texture. For a point set, relations between observations describe geometric consistency. For a waveform, temporal structure carries the signal of interest. The encoder must preserve the structure relevant to each case.

This is why MID uses modality-appropriate networks while keeping stage estimation and residual reversal shared at the conceptual level. A sample is encoded, its corruption stage is estimated, one correction is applied, and the updated sample returns to the process.

![Image restoration through iterative correction.](image-denoising.jpg "An image example illustrates recovery of spatial detail.")

## Geometry and temporal signals

For geometric observations, the desired structure may be mutually consistent correspondences or points supporting a model. Recovery therefore concerns relationships within the set as well as the appearance of individual observations.

![Geometric observations after iterative denoising.](correspondence-denoising.jpg "The geometric study examines structured observations contaminated by noise and outliers.")

For physiological signals, the model must retain useful waveform structure while removing corruption. Evaluation separates recording conditions to examine whether recovery transfers beyond the examples used during training.

![Physiological-signal restoration examples.](emg-results.jpg "Signal recovery uses a representation suited to temporal data.")

## Learning when clean references are difficult to obtain

The MRI study examines recovery where a perfectly aligned clean acquisition is unavailable. The protein study applies the formulation to sequence representations and evaluates the usefulness of the resulting features for contact prediction.

![MRI restoration examples.](mri-results.jpg "The MRI study examines signal recovery without paired clean acquisitions.")

![Protein representation denoising.](protein-results.jpg "Sequence representations provide another setting for the iterative formulation.")

These cases share a practical motivation: create supervision from a controlled perturbation of available observations. The learning target comes from the additional corruption process, while the network learns an update that can be applied repeatedly.

## Why local steps matter

A single large correction must account for the entire nonlinear corruption path at once. MID instead estimates the current stage and removes a local increment before reassessing the sample. Its ablations examine this division of work and the contribution of iteration.

![Direct correction and iterative local updates.](iterative-ablation.jpg "The ablation studies the role of stage-aware repetition.")

The design offers a common way to organize recovery without requiring a single network architecture for every modality.
