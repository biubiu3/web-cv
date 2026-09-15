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

## The clean version often does not exist

Good data is the precondition for everything downstream, and acquisition noise is nearly universal: sensor limitations, transmission errors, environmental interference, and the stochastic nature of physical measurement itself. The usual response is to denoise first.

Two practical facts make that harder than it sounds, and both shaped this paper.

The first is that the noise that actually matters is rarely Gaussian. Poisson noise in low-light imaging, compression artifacts, and what we would call structured noise, such as a set of line segments that do not correspond to any real structure in the scene, all violate the assumptions that classical filters are built on. The second is more fundamental: for many of the domains we care about, the clean target simply does not exist. In clinical imaging and remote sensing there is frequently no noise-free reference to compare against, and no way to acquire one. The MRI experiments in the paper are scored with proxy measures precisely because clean ground truth is unavailable for those datasets.

So the training signal has to come from somewhere other than a paired clean sample. That constraint is the whole problem.

## Why the existing answers are conditional

Classical model-based denoising, from filtering to transform-domain thresholding to non-local means, is tailored to specific noise models and data types. Its effectiveness falls away as soon as the noise statistics deviate from the assumption it was built on.

Supervised deep denoising sidesteps the modelling assumption but needs large paired datasets of clean and noisy samples, which are costly or infeasible to collect in exactly the domains where denoising matters most.

Self-supervised blind-spot methods were the natural answer, and the criticism we make of them is specific rather than general. They avoid pairing, and they carry hidden modality assumptions. The tricks that make a blind-spot network work, such as masking pixels and predicting them from neighbours, rely on spatial correlation in images. Point clouds are unordered, and amino acid sequences are discrete and unstructured. A method that assumes nothing about the data can travel to those settings. One that quietly assumes spatial smoothness cannot, and the observable symptoms are oversmoothing and loss of fine detail.

Domain-specific specialists have their own conditionalities. Noise2Noise can oversmooth fine anatomical structures. Patch2Self exploits redundancy across volumes but requires training a separate model per volume, which risks spatial inconsistency between them. DDM2 is sensitive to the initial noise level and to modality-specific tuning. In surface electromyography, high-pass filtering removes the ECG interference and removes important low-frequency components of the signal along with it, because the two overlap in frequency; template subtraction assumes a rigid distributional form; and neural approaches can be unstable to train. For protein sequence curation, the standard greedy selection on average Hamming distance rests on a single criterion that does not capture sequence quality more broadly.

We summarize the positioning as a capability matrix rather than a benchmark table. The question is which methods are self-supervised and work on images, signals and point sets at once. Most of the field manages two of the three.

## What makes it hard

The inverse of a nonlinear corruption has no usable closed form. Reversing Poisson noise, compression, or a set-structured nuisance directly is difficult, and our own ablation shows what happens if you try: a single-pass network leaves the data essentially unchanged. Networks struggle to learn a large jump from noisy to clean in one step. That result is not an implementation failure. It is the reason the method is shaped the way it is.

You also do not know how corrupted the input is. Nothing about a noisy sample announces its position on a corruption trajectory, so there is no way to decide how much to remove or how many steps to take.

Self-supervision has to be manufactured rather than found. Without pairs, the only available labels are ones you create yourself, and they have to serve two purposes: how far along the corruption the input sits, and what the next increment looks like.

And sometimes the noise is not a value at all. An incorrect correspondence, an invalid line segment, or a redundant sequence is not a magnitude added to anything. It is a decision about an element. Before any of that can be subtracted, the nuisance has to be recast as a per-element property, which is why those tasks use a binary classification objective rather than a regression on residuals.

Unordered and discrete data break the usual priors outright. A point cloud has no ordering and a multiple sequence alignment is a set of discrete strings, so weight sharing over a spatial grid and convolution are simply unavailable.

There is also a tradeoff baked into the formulation. The first-order approximation underneath our method only holds if the increments are small. Small increments buy linearity, and then cost you a long inference loop.

## Restore by adding noise

The idea we started from is counterintuitive enough to state plainly. To learn how to remove noise, you first add more of it.

A noisy observation is not a degraded version of a clean sample sitting off to one side. It is one state on a corruption trajectory, and you can continue that trajectory yourself. Take the noisy input as the starting point, apply the corruption process again and again, and you now have a labelled ladder: at every rung you know exactly how much noise separates it from the rung below, because you put it there.

The move that makes this usable is a local linearization. Writing the corruption as a general operator and expanding to first order,

$$
s_t \approx s_{t-1} + \Delta s_{t-1}.
$$

The step from one rung to the next is treated as additive, which means its inverse is a subtraction. The residual the noise network is asked to predict is nothing more than the difference between two consecutive states that we generated. This is an approximation, and we say so: it implicitly assumes the Jacobian is close to identity, or that its effect is absorbed into the learned mapping.

Everything else follows from that. The reverse step becomes tractable, and the training signal is free.

## Two networks, two different questions

The framework asks two separate questions, and keeping them separate is what makes one recipe portable across domains.

The first is: where am I? A step prediction network regresses the input's position on the trajectory, with the step normalized and a mean-squared objective. This is necessary before any amount of subtraction can be chosen, and it is where the method differs most from diffusion. Diffusion trains against a noise prediction derived from a fixed forward schedule. Here the step is estimated from the data itself, without assuming a fixed forward process.

The second question is: what should be removed? The noise prediction network takes the current state and the estimated step and predicts the increment. The two networks are trained jointly, and the decoupling is deliberate: one decides how far to walk back, the other decides what to take off at each step.

At inference the loop is a few lines. Estimate the current step, then subtract predicted increments until the step count reaches zero. A lightly corrupted input takes fewer steps than a heavily corrupted one, so the iteration count adapts to the data without a schedule.

The reason for iterating at all, rather than removing everything at once, is that many small corrections preserve detail better than one large one. Oversmoothing is what happens when a single pass has to guess the whole distance.

![Two networks answer how corrupted the input is and what to subtract next.](network-architectures.jpg "A step predictor and a noise predictor are trained jointly and used in sequence at inference.")

## Denoising is a way of framing a problem

The most interesting part of this work, for us, is not the image results. It is what happens when the same formulation is pointed at problems that nobody would call denoising.

Image correspondences become a four-dimensional point cloud, where a match is a point with two image coordinates in each view. Wrong matches are points that do not belong to the structure, and the network learns the broader features of incorrect correspondences rather than relying on a match score alone. Line segments used for vanishing point estimation become an unordered point cloud, and the model is trained by iteratively adding random segments as noise. Multiple sequence alignments are handled by treating redundant sequences with low average Hamming distance as noise. In that last case, the noise consists of real amino acid sequences, which is a fair demonstration that the framework is evaluating data quality rather than a synthetic artifact.

What this shows is that denoising is a task framing rather than a data type. Once the nuisance is expressed as something removable, outlier rejection in geometric estimation, correspondence pruning, line filtering and sequence subsampling turn out to be the same problem wearing different clothes.

Two design details follow from the same insight. Multiplicative noise can be made additive in the log domain, which the paper notes and uses. And for point-set tasks the noise objective is a per-element binary cross-entropy, not an additional penalty term on top of a regression. The network is not asked how much to subtract from a wrong correspondence. It is asked whether that element should be there at all.

![Wrong correspondences become outliers in a four-dimensional point set.](correspondence-denoising.jpg "The same formulation that removes image noise also identifies incorrect matches.")

## How it is built

For images and medical volumes, a CNN backbone handles the step predictor with fully connected layers on top, and a CNN encoder-decoder predicts the increments. For point sets and one-dimensional signals, including correspondences, line segments, amino acid sequences and surface EMG, both networks use fully connected layers with a Transformer encoder-decoder. The reason is the one given above: convolutions assume a spatial ordering that unordered sets do not have, so the architecture changes with the data rather than the other way around.

None of the domains get a bespoke formulation. That was the point of building it this way. One method, applied to image speckle, MRI noise, muscle-signal contamination, geometric outliers, wrong correspondences, invalid line segments, and redundant protein sequences, with only the backbone changing.

![Redundant sequences are treated as noise in an alignment.](protein-results.jpg "The nuisance here consists of real sequences rather than synthetic artifacts.")

## What we take from this

Supervision can be manufactured by continuing a corruption you can simulate, rather than by obtaining the clean endpoint. That single substitution is what makes the framework applicable where paired data does not exist.

Local linearization plus iteration converts an intractable global inverse into a sequence of tractable local ones, and the ablation is the evidence. When the single-pass model fails, the right response is not a larger model. It is decomposition.

Separating where am I from what should be removed is what makes one framework portable. That decoupling, more than any architectural choice, is the reusable part.

Self-supervision strategies carry hidden modality assumptions, and it is worth auditing them. A formulation that asserts nothing about the structure of the data will travel further than one that quietly requires smoothness.

And iteration is a detail-preservation mechanism, not just an optimization convenience.

## Where it stops

Extreme noise is the stated failure mode. When the signal structure is almost entirely obscured, iterative subtraction has too little partial structure to work from, and generative priors are the direction we point to for future work.

The second cost is time. Iterating is inherently slower than a single-pass denoiser, which is a bottleneck for real-time use. Knowledge distillation and more efficient sampling are the remedies we suggest.

Two things are visible in the method that we did not fully characterize. The number of corruption steps and the magnitude of each increment are design choices rather than derived quantities, and we did not study the sensitivity to them. Errors in the estimated step also compound across the subtractions that follow, and that propagation deserves more attention than we gave it.

## What kind of model this is

It is worth being explicit about one boundary, because it comes up in every conversation about this work. MID is not a generative model. Diffusion models minimize a noise prediction loss derived from a fixed forward schedule and can sample new data from the learned distribution. MID is an iterative, self-supervised noise subtractor that learns the structure of the noise present in its target domain and removes it. The output is a cleaner version of the input, not a new sample.

That distinction is what keeps the framework honest about what it can promise. It removes what it was trained to recognize. Anything else is a different problem.

![Iterative subtraction recovers structure that a single pass leaves untouched.](image-denoising.jpg "The reverse loop walks a corrupted input back down the trajectory one increment at a time.")
