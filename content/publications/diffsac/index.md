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

## The expensive part is not the sampling

Sample consensus is the standard answer to robust estimation, and it has one structural property worth stating before anything else: a candidate set is not just proposed, it is spent. Every minimum set has to be solved into a model and then scored against all the observations before you know whether it was any good. With a few thousand points and a budget of a few thousand iterations, almost all of that work goes into combinations that were never going to produce the right model.

A minimum set is the smallest group of observations that determines a model. Two points fix a line. Three fix a plane. Eight correspondences fix a fundamental matrix. RANSAC builds each one by drawing from the data uniformly at random, which means the quality of the proposal is left entirely to chance. The paper's complaint about this is not that randomness is slow. It is that randomness is uninformative. Two points that are individually trustworthy may sit almost on top of each other, and the line they define is numerically unstable. Repeated or near-degenerate correspondences can make an eight-point solve meaningless. Uniform sampling has no way to notice any of this, because it never looks at a combination as a combination.

## What the alternatives leave unfinished

Prior work has tried to make the proposal smarter, and the attempts split into a few recognizable families.

The ordering family reorders the data before sampling. PROSAC sorts points by a quality score and works down the list, which helps, but the ordering is fixed in advance and says nothing about whether a particular group of points belongs together. NAPSAC constrains sampling to local neighborhoods, which produces better-conditioned sets and risks losing global structure; Progressive NAPSAC's expanding neighborhood works around that limitation without removing the assumption underneath it. The learned-preference family trains a network to predict something per point, either a sampling probability or an inlier score. These approaches refine the randomness rather than removing it: a good per-point score still does not tell you that a specific combination is valid, and the paper's position is that a bad minimum set can survive a very good ranking.

The repair family takes the opposite tack. LO-RANSAC, GC-RANSAC and MAGSAC++ all improve a hypothesis after it has been found, whether by refitting on inliers, enforcing spatial coherence, or marginalizing over the threshold. That is genuinely useful and we build on it, but it does nothing about the cost of finding the hypothesis in the first place.

Then there is the end-to-end approach. DSAC and its relatives make the selection probabilistic so gradients can flow through the entire pipeline, which is elegant and effective. The reservation we keep coming back to is different: one-shot learned estimators behave like black boxes. You get a model out and no account of how it was reached, which makes them hard to reason about in an engineering setting. Meanwhile the paper notes that applying diffusion models as a core component inside robust estimation frameworks remains largely unexplored, and that gap is where we started.

## Generate candidate sets instead of guessing them

Our idea is to stop treating sampling as a draw and start treating it as conditional generation. If we could learn the distribution of minimum sets that produce good models, we could sample from that distribution directly, and do it a handful of times rather than a few thousand.

There is a clean analogy in text-to-image generation. A single prompt produces several plausible images, and you look at them and pick the best. We wanted the same behavior for minimum sets: a small number of candidates that are each worth solving, generated from the same observations and differing because they started from different noise. This also explains why diffusion is affordable here. The usual objection to diffusion is the cost of generating high-dimensional objects such as images. What we are generating is one scalar per observation, so the overhead is negligible relative to the cost of the solves it is meant to save.

The decisive design choice is what that scalar means. We redefine confidence as whether an observation belongs to a good minimum set, rather than as a ranking of the observation on its own. That is a set-level property expressed through a per-point field, and reconciling the two is most of the engineering in the paper.

## Confidence, and what it is conditioned on

Let $c_0$ be a target confidence field over the observations $\chi$. Training corrupts it with noise into $c_t$, and a Transformer learns the reverse conditional distribution

$$
p_\theta(c_{t-1}\mid c_t,\chi).
$$

The condition is not decorative. The process is conditioned on the geometry itself, which separates it from ordinary noise generation, where the reverse process depends on the noisy variable alone. We tested how much the condition has to carry. With coordinates only, the model struggles to converge at all. With the descriptors included, it works, and corrupting the descriptors degrades it again. Whatever this model is doing, it is reading genuine geometric and appearance evidence, not memorizing a shape prior.

The supervision comes from the ground-truth model. Given that model, we identify a minimum set consistent with it, assign those observations confidence 1 and the rest 0, and supervise the denoising network to recover that vector with a mean-squared objective toward $c_0$. This is $x_0$-prediction rather than $\epsilon$-prediction, and it means the network is being asked for the confidence field itself, not for the noise that was added to it.

The denoiser is a Transformer with no positional encoding. Point sets have no canonical order, and a network that saw an ordering would learn structure that is not there. Dropping positional information makes the model permutation-invariant and lets it accept a variable number of observations, which matters because N changes across datasets and tasks. Attention is what makes the set-level semantics work at all: every observation can adjust its confidence in response to every other one, which is precisely the operation a joint-compatibility question requires. We compared MLPs and a DGCNN-style backbone against the Transformer, and both did worse.

![A noisy confidence field is refined into a geometry-conditioned sampling proposal.](confidence-diffusion.jpg "Forward corruption supplies training targets; reverse diffusion generates candidate minimum sets.")

![The Transformer denoiser jointly reasons over observations and current confidence.](denoiser-network.jpg "No positional encoding is used, preserving permutation invariance.")

## Inference: twenty copies, twenty answers

At test time the observations are duplicated into a batch, and every copy is initialised with an independent Gaussian confidence vector. All of them are refined in parallel. Each refined field yields one minimum set by taking the top entries for the solver's required size, each set is solved, and the hypotheses are scored by consensus. The best one wins, and we refit the final model on its inliers.

The duplication is the whole point. One trajectory gives you one answer, and if that answer is degenerate you have gained nothing over RANSAC. Independent initializations let the same observations produce several different combinations, which is the diversity that protects against a single badly-conditioned proposal. It is also where the stochasticity lives. We compared taking the maximum of the confidence field against sampling from it and found the maximum slightly better, because the generated field is already sharp and deterministic. Stochasticity at initialization, determinism at selection, is the split that worked.

DPM-Solver++ brings the whole reverse process down to a cost that makes the pipeline practical rather than illustrative. Without a fast sampler, none of this is worth discussing, and that constraint shaped how many steps we could afford.

## The ablation that mattered most

The result we would point a skeptical reader to is not diffusion versus some baseline. It is what happens when you train a network to predict the same confidence vector directly, without the iterative refinement, from clean input. It performs far worse and struggles to identify high-quality minimum sets at all.

That comparison is the one that isolates the actual ingredient. The finding is not that neural networks help, since a directly trained network is also a neural network. It is that decomposing a hard prediction into a sequence of easier refinements is what makes the problem tractable. The reverse process behaves like an optimizer that prunes away paths leading to poor sets and settles into a locally good one, and that behavior is doing the work.

A second observation from the ablations: because we keep the classical solver and the consensus function, DiffSAC composes with the repair family rather than competing with it. We tested this by feeding our proposals into LO-RANSAC's local refinement and the result improved further. The two are solving different halves of the problem.

![Confidence refinement for a line-fitting proposal.](line-refinement.jpg "The generated confidence changes which observations enter the minimum set.")

![Image correspondences selected through diffusion refinement.](fundamental-refinement.jpg "Conditioned confidence proposals feed the classical two-view geometry pipeline.")

## Scope

The framework is evaluated on line and plane fitting, fundamental and essential matrix estimation, and homography estimation, on both real benchmark data and synthetic correspondences with controlled outlier levels. We also vary the number of observations, the refinement budget, and whether local optimization is applied afterward. The plug-and-play interface is the reason one method can cover all of these: it occupies the minimum-set sampling slot and nothing else, so the solver, the scoring rule and any post-processing stay task-specific.

## What this does not solve

Two limitations we state in the paper. The first is generality: a separate diffusion model is trained for each distinct geometric estimation task, which is a real restriction and the reason a single model covering all of them is the obvious next step. The second is hardware. The iterative process is computationally demanding, and relying on a GPU limits where the method can run. Lighter samplers are the remedy we propose, and in our own timing the diffusion sampling dominates inference while consensus evaluation is a small fraction. The machinery that saves the solves is also the thing that costs the time.

One thing we did not address, and it is plainly visible in the architecture: the top-k selection is a hard argmax and the consensus score never propagates a gradient. DiffSAC is not end-to-end differentiable, and we did not try to make it so.

## The claim we care about

The conclusion we would defend is that learning belongs on the half of the problem that is hard, and classical verification belongs on the half that is cheap. Generating valid geometric combinations is hard. Checking whether a model fits is easy, well understood, and exactly what we should not be replacing with a network.

That split is also what keeps the method legible. When a result is wrong, there is a proposal to inspect, a solver output to check, and a consensus score to argue about. The discussion in the paper frames this as restoring interpretability to learning-based robust estimation, and that framing is closer to our motivation than any efficiency argument.
