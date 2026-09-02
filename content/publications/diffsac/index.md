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
  caption: 'Concept cover: reverse-diffusion trajectories turn noisy confidence fields into diverse, jointly compatible minimum sets for classical consensus estimation.'
  alt_text: 'Multiple noisy confidence fields are refined by diffusion into diverse geometric minimum sets before consensus selects the best hypothesis.'
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
| Why diffusion? | Iterative conditional refinement can model several jointly valid sets instead of one fixed ranking |
| What remains classical? | The minimal solver, consensus scoring, and optional local optimization |
| Evaluation scope | Line and plane fitting, fundamental/essential matrices, and homography estimation |
| Status | Preprint; under review at IJCV |

Sample consensus succeeds only when a proposed minimum set is jointly compatible with the target geometry. A point can look individually reliable yet combine badly with other high-ranked points: two nearly coincident line samples are unstable, repeated correspondences may be degenerate for an eight-point solver, and a single deterministic ranking offers little diversity when the top combination fails.

DiffSAC treats sampling as conditional generation. Rather than predicting one score per point once, it learns a distribution of confidence fields and refines them through a reverse diffusion process. Multiple noise seeds can then produce a compact, diverse collection of candidate sets.

## Consensus estimation stays modular

Given observations $\chi$ and a minimum set $\mathcal{M}_j$, a task-specific solver constructs $h_j=S(\mathcal{M}_j)$ and a consensus function evaluates $f(h_j,\chi)$. The final estimate remains

$$
h_{\mathrm{best}}
=\arg\max_{j=1,\ldots,J} f\!\left(S(\mathcal{M}_j),\chi\right).
$$

DiffSAC changes how the $\mathcal{M}_j$ are proposed, not what a line, plane, fundamental matrix, essential matrix, or homography means. This preserves compatibility with established solvers and lets local optimization such as LO-RANSAC be added after sampling.

## Confidence is a property of a set

Let $c_0$ be a target confidence field conditioned on observations $\chi$. During training, a forward diffusion process corrupts it into $c_t$; a Transformer learns the reverse condition

$$
p_\theta(c_{t-1}\mid c_t,\chi).
$$

The denoiser is trained with a mean-squared objective toward $c_0$. It has no positional encoding, making it permutation invariant and able to accept different numbers of observations. Attention allows every candidate to change its confidence in response to the rest of the set.

![A noisy confidence field is refined into a geometry-conditioned sampling proposal.](confidence-diffusion.jpg "Forward corruption supplies training targets; reverse diffusion generates candidate minimum sets.")

![The Transformer denoiser jointly reasons over observations and current confidence.](denoiser-network.jpg "No positional encoding is used, preserving permutation invariance.")

This confidence should not be read as an independent inlier probability. It expresses membership in a *good joint minimum set* under the current generated proposal. Different reverse trajectories can therefore emphasize different mutually compatible subsets.

## Training and inference

Training runs for 100 epochs with Adam at learning rate $10^{-4}$ and cosine scheduling on an RTX 4090. DPM-Solver++ accelerates the reverse process.

At inference, the observations are replicated $\kappa=20$ times. Each copy receives an independent Gaussian $c_T$ and undergoes $T=100$ reverse refinements. The top $\gamma$ observations in each final confidence field form one candidate minimum set, where $\gamma$ is the solver's minimum sample size. The classical solver evaluates all 20 hypotheses and retains the best consensus.

The number 20 is intentionally small relative to thousands of uniform RANSAC draws. The learned generator spends more computation on each proposal in exchange for making each proposal more useful.

## Synthetic line and plane fitting

Line fitting uses $N=100$ points and minimum-set size $\gamma=2$, with outlier ratios from 10% to 80%. At the hardest reported setting:

| 80% outliers | mAA $\uparrow$ | Median error $\downarrow$ |
|---|---:|---:|
| RANSAC | 0.30 | $0.31^\circ$ |
| DiffSAC | **0.43** | **$0.20^\circ$** |

At 50% outliers, RANSAC obtains 0.78 mAA and $0.07^\circ$ median error, while DiffSAC obtains 0.86 and $0.05^\circ$. Reported throughput is about 50 Hz on GPU and 30 Hz on CPU for line fitting.

![Reverse steps concentrate the proposal on a valid line subset.](line-refinement.jpg "Line confidence evolves from random noise toward a jointly compatible pair.")

Plane fitting uses $N=100$ and $\gamma=3$. A model trained at that size is also evaluated on $N=200$ without retraining, exercising the variable-cardinality Transformer design.

![Plane fitting across outlier levels and observation counts.](plane-results.jpg "The set encoder accepts a larger point set without a positional-grid assumption.")

## Fundamental-matrix estimation

The correspondence study follows the RANSAC tutorial protocol. Twelve scenes provide more than one million training image pairs in total; two held-out scenes provide 4,950 pairs each. Each correspondence is represented by 260 dimensions combining coordinates and SIFT descriptors. The geometric backend uses the eight-point solver with a threshold of 4 pixels.

![Diffusion refinement identifies mutually compatible correspondences.](fundamental-refinement.jpg "Confidence trajectories and epipolar estimates for fundamental-matrix examples.")

| Method | Rot. mAA $\uparrow$ | Trans. mAA $\uparrow$ | Rot. median $\downarrow$ | Trans. median $\downarrow$ | Speed |
|---|---:|---:|---:|---:|---:|
| MAGSAC++ | 0.723 | 0.585 | $1.476^\circ$ | $2.632^\circ$ | 53 Hz |
| DiffSAC | **0.783** | **0.641** | **$0.886^\circ$** | **$1.819^\circ$** | 30 Hz GPU |

DiffSAC trades throughput for accuracy relative to MAGSAC++ in this configuration. It is not “free acceleration”; the advantage is that a small set of learned hypotheses can be more accurate at usable interactive rates.

## Essential matrix, registration, and homography

Essential-matrix estimation uses a five-point solver and 1-pixel threshold:

| Method | Rot. mAA | Trans. mAA | Rot. median | Trans. median | Speed |
|---|---:|---:|---:|---:|---:|
| MAGSAC++ | 0.778 | 0.553 | $1.195^\circ$ | $2.284^\circ$ | — |
| DiffSAC | **0.798** | **0.651** | **$0.863^\circ$** | **$1.779^\circ$** | 48 Hz GPU / 22 Hz CPU |

For ModelNet40 registration at 60% outliers, rotation/translation mAA are 0.547/0.453 for DiffSAC and 0.524/0.438 for MAGSAC++. Homography estimation is evaluated on KITTI with a DLT solver and threshold 0.1; the paper reports the complete curve rather than one isolated operating point.

Together the five problem classes test minimum-set sizes, feature types, and solvers that differ substantially. They support the modular-sampling claim, while each task still uses its own trained model and representation.

## Ablations: what actually provides the gain?

On fundamental-matrix estimation, direct one-shot confidence prediction reaches rotation/translation mAA of 0.687/0.393, versus 0.783/0.641 for diffusion refinement. Adding LO-RANSAC after DiffSAC raises the result further to 0.794/0.657, showing that learned sampling and classical local optimization are complementary.

Removing descriptors lowers mAA to 0.725/0.603; using SuperPoint features obtains 0.787/0.646. Comparisons with MLP and DGCNN alternatives favor the permutation-invariant Transformer, and maximum-confidence set selection is stronger than the alternative sampling rules tested. Budget studies show DiffSAC with 2,000 consensus iterations outperforming the reported RANSAC configurations even when those use substantially more samples.

![Accuracy, iteration budget, and runtime decomposition.](efficiency-results.jpg "Efficiency studies expose both the benefit and cost of iterative confidence generation.")

The reported 2,000-iteration pipeline takes about 33 ms and roughly 2 GB of GPU memory. Runtime is divided into approximately 12% preprocessing, 75% diffusion, and 13% consensus evaluation. Diffusion is therefore clearly the dominant cost—and the obvious target for future acceleration.

## Limits and relation to RLSAC

Each task requires suitable training data and a task-specific model; a line sampler is not automatically a fundamental-matrix sampler. Iterative generation adds GPU and latency costs, and classical estimators remain attractive when training distribution, hardware, or memory is unavailable. Performance can also depend on how training targets define an effective set.

RLSAC learned sequential proposals from the reward of previous geometric hypotheses. DiffSAC revisits the same core question from a generative direction: which observations should be selected *together*? The transition from reinforcement learning to conditional diffusion reflects a broader research progression, while the invariant principle remains the same—sampling should exploit structure and feedback instead of spending every hypothesis uniformly.
