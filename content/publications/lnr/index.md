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
---

## Two points, and almost always the wrong two

Multi-model fitting asks what happens when a scene contains several geometric structures at once and the observations are noisy. It sits underneath robot navigation, 3D reconstruction, autonomous driving and mixed reality, because real scenes are full of repeated and overlapping structure rather than one clean model.

The naive way to extend single-model fitting is to do it repeatedly. Sequential RANSAC finds one model, removes its inliers, and starts again. It works, and the trouble is that it is greedy in a way that quietly distorts the answer. Removing inliers resembles clustering, which means each point is assigned to exactly one model. When two structures are close together or share observations, that assignment is simply wrong, and the result is that overlapping models get under-counted. A model can effectively disappear because its points were claimed by a neighbour.

There is also a waste problem, and it is easy to make concrete. In multi-line fitting a minimal set is two points. With a few dozen structures and a large fraction of uniform outliers, the overwhelming majority of random pairs define a line through nothing at all. Every one of those pairs still gets solved and scored. Substantial computational resources are wasted on bad minimum sets, and the waste is structural rather than incidental.

Three further constraints shaped what we built. The method has to work without being told how many models are present, which rules out a family of approaches that take that count as input. It has to run at a usable speed. And it has to transfer across tasks, because a multi-model fitter that has to be re-engineered per problem is not a general tool.

![A coarse stage screens minimal sets before the solver sees them, and a fine stage refines and scores what survives.](pipeline.png "Learning sits at the two decision points in an otherwise classical pipeline.")

## The four things that actually go wrong

We organize the problem around four failure modes, and each component of the method answers one of them.

The first is insufficient utilization of geometric features. Existing methods either rely on hand-designed criteria that only look at part of the geometry, or they are neural networks that never see it explicitly.

The second is inefficient optimization caused by noise. Solver calls are spent on hypotheses that were hopeless from the start.

The third is model overlap, which is the fundamental difference between fitting one model and fitting several, and which most formulations cannot even represent.

The fourth is the non-differentiable pipeline. Discrete minimal-set sampling and the task-specific minimal solver both sit in the middle of the process, and neither has a gradient. Challenges arise in incorporating learning-based methods precisely because of this, and the two available escape routes are both unattractive: replace the exact solver with a differentiable relaxation and lose it, or use policy-gradient estimation and accept the variance.

## What competing methods leave unresolved

Greedy single-model extensions carry the hard-assignment problem described above. MultiRANSAC fits K models per iteration instead of one, which requires K as prior knowledge and becomes computationally inefficient as K grows, because finding several good models in a single iteration is genuinely difficult.

Iterative hypothesis generators are the more sophisticated family, and their shared defect is temporal coupling. Because each new model is built on the results of previous iterations, errors accumulate through model overlap as the process proceeds. Our own ablation is honest about the tradeoff here: substituting a stronger learned sampler into LNR raises accuracy and makes the whole process considerably slower. We chose the cheaper option deliberately and we report what it costs.

Clustering-style methods, including preference-set clustering and networks that classify minimal sets as valid or invalid, work well on the problems they target and ignore the reuse of data. Information gathered while evaluating one hypothesis is not carried into the evaluation of another.

Another family replaces sampling heuristics with a global energy function over geometric errors and cluster regularity, or a convex relaxation of the assignment energy, or hypergraph mode-seeking. These formulations handle overlap by construction, and they rely on cost functions complex enough that they may not fully exploit the geometric information actually present in the data. That limits how well they carry across diverse and complex scenes.

Efficient sampling methods that exploit parallel computation are strong, and they need the number of instances as prior information, which limits where they can be applied.

Finally, end-to-end deep methods achieve good accuracy and operate as black boxes. That is a real obstacle to reliable deployment, and it is the specific thing we did not want to build.

## Learn at the decisions, condition on the points

Our approach is to keep the classical pipeline exactly as it is and put learning only where a decision is being made: before solving, to decide which minimal sets deserve a solver call, and after solving, to decide how each hypothesis should move and how good it is.

The critical design choice is what the network is conditioned on. The learned quantities are functions of the geometric features of data points, not of the hypothesis parameters. That is what allows the sampler and the solver to stay in the pipeline as non-differentiable black boxes in the forward pass. No gradient has to pass through either of them.

A precise statement is worth making, because it is easy to overstate. The solver is used during training: the labels for both classifiers come from comparing a solved hypothesis against the ground-truth instance, and the coarse labels come from solving the sampled sets. What does not happen is differentiation through the solver or the sampler. They are used forward-only.

Each point is lifted by a Fourier feature mapping to improve spatial frequency encoding, passed through shared multilayer perceptrons implemented as point-wise convolutions, and max-pooled into a global descriptor. Point-wise and global features are concatenated into a 256-dimensional vector, so every point carries both its own local geometry and a summary of the scene. The coarse module needs that holistic view. The fine module, as it turns out, does not.

![Some observations belong to two models at once, and the representation has to allow that.](multi-line-results.png "Overlap is representable because a point can contribute to several hypotheses.")

## Screening before solving

The coarse module draws a large number of minimal sets at random, deliberately more than needed to ensure broad coverage, and predicts a confidence for each. Only the top-scoring sets reach the solver.

Two things about this are worth dwelling on. The first is why the sampling stays random rather than becoming iterative. Random sampling avoids the error accumulation that iterative generators suffer from, and it preserves coverage across the whole observation set. It is a pragmatic choice rather than an optimal one, and we say so.

The second is that the confidence is trained as a binary classification problem, which means the module learns to select promising minimal sets without any explicit degeneracy test. Classical pipelines hand-code checks to reject degenerate configurations. Here that rejection is learned from solved hypotheses compared against ground truth. We replaced a hand-written rule with a learned one, and the benefit is that it adapts to the data rather than to the person who wrote it.

Removing the coarse module hurts significantly, because the fine network cannot cope with the resulting candidate volume. Pretraining the coarse module separately instead of training the two jointly also does worse, and the reason is the most interesting thing in the training design.

## Judging a hypothesis by its neighbourhood

For each surviving hypothesis we define a neighbour region: the data points within some range under a task-specific distance. Euclidean distance for lines, a directional distance for vanishing points, reprojection error for planes, the normalized epipolar constraint for motion. The points in that region are encoded, each point's residual to the hypothesis is concatenated to its features, short regions are zero-padded so they can be batched, and two heads read the result.

One head predicts an increment rather than a model. For a line it predicts a small change to each endpoint. For a vanishing point, a homography or a fundamental matrix it predicts a corresponding adjustment, and that adjustment is added to the coarse hypothesis. The network never invents a model from scratch. Verifying and correcting a guess is easier than generating one, so the classical solver generates and the network corrects.

The other head predicts a score. This is where the paper takes a position that surprises people: consensus maximization does not favour the best model. Counting inliers is the standard proxy for hypothesis quality, and when models overlap it is the wrong proxy. Learning the score from the data around the hypothesis is what replaces it.

The region representation is also what makes overlap representable at all. Two crossing lines have a shared neighbourhood near their intersection, and the points there sit inside both regions and count as evidence for both hypotheses. No hard assignment is made anywhere.

And the fine module deliberately discards the global context that the coarse module relies on. Local details are more relevant for refining an individual hypothesis, and global information can introduce many irrelevant details that hinder the process. The same feature that helps screening hurts refinement. That asymmetry is a reusable coarse-to-fine principle, and it is the reason the two modules are not simply the same network applied twice.

![Vanishing points are scored on the sphere, where geometric closeness means similarity.](vanishing-points.png "The fine module scores hypotheses from the observations around them rather than from their parameters alone.")

## Deciding how many models there are

The scored hypotheses are redundant. Several of them will describe the same structure, and the answer should mention it once. We adapted non-maximum suppression from object detection to this setting, replacing intersection-over-union with a geometric notion of similarity: endpoint distance and angle for lines, proximity on the Gaussian sphere for vanishing points, and similarity between the per-point distance vectors for homographies and fundamental matrices.

This is also the mechanism that decides how many models the scene contains. The count is an output of suppression rather than an input to the method, which is what we wanted from the start.

## How the two modules train each other

Three losses. The coarse confidence and the fine score are both binary cross-entropy against labels derived from similarity to the ground-truth instance. The refinement head is trained with a smooth L1 objective on the parameter increments.

The coupling is the part worth explaining. The fine-level loss back-propagates into the coarse-level module, so the selector learns to prioritize hypotheses that the fine module is able to work with, rather than simply matching a predefined label. The two modules share the encoded region features, which is what makes the gradient path exist. Training jointly beats pretraining the coarse module, and the reason is that the fine signal reshapes what good means at the coarse stage.

One further observation from the ablations that we did not expect. Training only on harder scenes, with more lines present, matched or beat training on easier ones, and we attribute this to the greater data variability acting as a regularizer. The same effect appeared more weakly for the baseline sampler we compared against.

## What we take from this

Decouple learning from non-differentiable components by changing what you condition on rather than by making them differentiable. That refusal is the strongest methodological statement in this work, and it is what preserves the exact solver.

Optimize a selector for downstream compatibility rather than for its own proxy label. Pre-training loses information that joint training keeps.

Consensus is not quality. When models overlap, inlier counting is the wrong measure, and assuming it is right is what causes models to be under-counted.

The value of a feature depends on the stage. Global context helps screening and hurts refinement.

And model the multiplicity structurally. If the interface forces each point into one model, no amount of training will represent two.

## What it assumes

The classifiers need supervision in the form of ground-truth instances. Behaviour in a domain with no ground-truth models is not something we characterize.

The region radius and the sampling budget are task-dependent quantities that we do not specify how to set beyond that they vary, and the suppression thresholds are not stated either.

Transfer across tasks means re-deriving four task-specific pieces: the region distance metric, the solver, the refinement parameterization, and the suppression similarity. That is real per-task engineering, and we do not claim zero-shot adaptation.

Zero-padding is our only mechanism for variable-size neighbourhoods, and whether it dilutes the encoding for regions with few points is not something we examined.

And random sampling is a tradeoff rather than an optimum. Our own ablation shows a better sampler would improve accuracy, and we did not resolve whether a cheap learned sampler could get both.

## Why keep the two-step pipeline

We kept the established two-step strategy for a specific reason: interpretability. Numerical methods have inherent interpretability and clearly defined application scopes, and they struggle to fully exploit the geometric features of the data. End-to-end deep methods perform well and cannot tell you how they got there.

Because LNR keeps the pipeline, its outputs are explicit geometric models. The network accepts generic unordered data points, covering image correspondences, 3D point clouds and pixel coordinates, and the loss operates on geometric features rather than on hypotheses. That is what maintains compatibility with a broad spectrum of solvers and sampling processes, differentiable or not.

The stated ambition is modest by design. We hope this introduces a new idea for approaching multi-model fitting in a learned way, and we would rather have a method whose behaviour can be interrogated than one whose accuracy we cannot explain.
