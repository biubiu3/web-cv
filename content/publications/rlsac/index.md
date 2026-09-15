---
title: "RLSAC: Reinforcement Learning Enhanced Sample Consensus for End-to-End Robust Estimation"
authors:
  - me
  - Guangming Wang
  - Zhe Liu
  - Luca Cavalli
  - Marc Pollefeys
  - Hesheng Wang
author_notes:
  - "Equal contribution"
  - "Equal contribution"
date: "2023-10-01T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE/CVF International Conference on Computer Vision"
  short_name: "ICCV"
venue_display: "IEEE/CVF International Conference on Computer Vision (ICCV 2023)"
publication_status: "Published"
publication_status_key: "published"
display_area: "Robust Visual Estimation"
publication_order: 80
peer_reviewed: true
open_access: true
abstract: "RLSAC casts sample-consensus robust estimation as a reinforcement-learning process. A graph neural network combines observations with sampling history to propose the next minimum set, while downstream hypothesis quality supplies an unsupervised reward. The learned state transition makes the sampling policy reusable across robust-estimation problems."
summary: "A reinforcement-learning sampler that uses hypothesis residuals and sampling history to choose minimum sets for line fitting and two-view geometry."
story_order: 10
homepage_order: 60
topic_keywords:
  - Reinforcement Learning
  - Robust Estimation
  - RANSAC
  - Graph Neural Networks
  - Geometric Vision
  - End-to-End Consensus
tags:
  - ICCV 2023
  - Perception & Geometry
  - Robust Estimation
  - Reinforcement Learning
  - Computer Vision
featured: false
image:
  caption: "Learning to sample from geometric feedback."
  alt_text: "RLSAC — Learning to sample from geometric feedback."
hugoblox:
  ids:
    arxiv: 2308.05318v1
links:
  - type: custom
    label: ICCV
    url: https://openaccess.thecvf.com/content/ICCV2023/html/Nie_RLSAC_Reinforcement_Learning_Enhanced_Sample_Consensus_for_End-to-End_Robust_Estimation_ICCV_2023_paper.html
  - type: code
    url: https://github.com/IRMVLab/RLSAC
---

## The sampler is the part nobody trains

Robust estimation carries most of geometric vision on its back. Camera pose, motion segmentation, wide-baseline matching, plane fitting, line fitting: strip away the application and they all come down to the same question. Given observations where a large fraction are simply wrong, recover the model that the correct ones agree on. RANSAC has been the default answer to that question for four decades. It draws a minimum set, solves for a model from that set, counts how many observations agree with the result, and tries again. Two points define a line. Eight correspondences define a fundamental matrix.

The drawing step is deliberately blind. Every observation is treated as equally worth trying, and nothing about the data ever enters the decision. That bet pays off when outliers are rare. It stops paying off quickly. Raise the outlier fraction and the probability of drawing a set entirely from the inliers falls away, and the number of iterations needed to find a good model climbs with it. The evidence that would have made the search easy is sitting in the observations themselves, and the sampler never looks at it.

The second problem is quieter, and it is the reason we wrote this paper. A uniform random draw is not differentiable. You cannot attach it to a network, and you cannot train it against an objective that lives downstream of it. So the robust estimator ends up parked at the edge of a learned system: an off-the-shelf component wrapped in interfaces, never optimized together with the parts around it.

Earlier work has attacked this from several directions, and each one leaves something on the table. LO-RANSAC keeps sampling inside the inliers of the best hypothesis so far, which improves a model it has already found rather than the search that found it. NAPSAC restricts sampling to a local neighborhood and buys better-conditioned sets at the cost of global coverage; Progressive NAPSAC's expanding neighborhood patches that assumption rather than replacing it. GC-RANSAC and MAGSAC++ change how hypotheses are scored, not how they are proposed. PROSAC and USAC reorder or schedule the sampling, but the ordering rule is designed by hand and frozen before the first hypothesis has been scored. Methods such as NG-RANSAC learn a useful preference over points, and the filtering approaches around it discard bad candidate sets early, yet neither treats the sequence of sampling decisions as something worth planning. DSAC takes the most direct route and makes selection probabilistic so gradients flow through the pipeline. That works, but it requires the sampler, the solver and the scoring step to all be differentiable, and the classical pieces we trust most are exactly the ones that are not.

## The sample is an action

Our starting observation is that the two problems have the same shape. In reinforcement learning, an agent reads a state, picks an action, and the environment reports what happened. Sampling a minimum set has that structure already. The observations are the state. The set chosen from them is the action. And the environment exists and is running: it is the solver and the consensus function.

The reward is the interesting part, because the pipeline produces one for free. Once the solver turns a proposed set into a model, the consensus function measures what fraction of all observations agree with it. That number scores the model, and since the model came out of that particular set, it also scores the choice that produced it. No labels for which points are inliers are needed anywhere in the loop. Any task that already ships a solver and a residual definition comes with its own reward.

That last point matters more than it sounds. Training from the joint outcome means the policy is never taught which individual observations are good. It is taught whether the model that came out of a combination was good. Pointwise inlier classification is a different and much stronger assumption than set-level scoring, and it is the assumption we did not want to make.

| Question | RLSAC's answer |
|---|---|
| What is learned? | The sampling policy; the solver and the scoring function stay as they are |
| What supervision is needed? | Nothing beyond the consensus score the pipeline already computes |
| What enters the state? | Observation features, the chosen set, residuals against the last hypothesis, and usage counts |
| Where is it used? | Synthetic line fitting and real two-view fundamental-matrix estimation |

## What the policy gets to see

A state that contains only the observations is not enough. The same data at step one and step ten would look identical, and the policy would have no way to know what it had already tried. So the state is built to carry the consequences of the previous decision.

Four signals are stacked per observation. The first is the observation's own features: point coordinates for line fitting, or coordinates, matching scores and local descriptors for correspondences. The second is an action indicator, `+1` for the observations that formed the last minimum set and `-1` for everything else. The third is the residual from the previous hypothesis, which is dense evidence about how the last model related to every observation, not only the ones that built it. The fourth is a counter of how often each observation has been selected so far.

We think of these last three as a navigation aid. The residuals say which direction looks promising. The usage counter is a breadcrumb trail, recording where the search has already been. The action indicator marks the current position. None of them changes the underlying geometry; they change what the policy can conclude from it.

![The policy state is updated after every hypothesis evaluation.](state-transition.jpg "From one sample to the next: observation features, the selected set, residuals, and sampling history form a state transition.")

## One episode, one random start

RLSAC runs several episodes over the same input, and each episode opens with a randomly sampled minimum set. This costs almost nothing and buys two things. It guarantees a performance floor, because every episode starts from an unbiased draw and the policy can only improve on it. And it gives the policy a meaningful state to react to, since a residual field computed against a terrible hypothesis is far more informative than one computed against nothing.

The policy itself is an EdgeConv-style graph network. The choice is not cosmetic. Observations have no canonical order, and a policy that read them as an ordered vector would behave differently depending on how the input happened to be shuffled. The graph aggregates each observation's neighbors into its own representation, which keeps the policy permutation-invariant and lets points exchange local context before any of them is proposed.

The network outputs a probability per observation, and the top-scoring set becomes the proposal. One detail worth stating plainly: that probability is not a claim about how good an individual observation is. It is a claim about the long-run return from including it. The two are not the same, and treating them as the same is a common way to misread what the policy has learned.

Duplicate sets are rejected. Every previously used minimum set is recorded, and if the top-scoring set has already been tried, the next one is drawn according to the probabilities and checked again until an unused set is found. Without this, a policy that has learned a good region will keep re-proposing the same set and burn the entire budget on a hypothesis it already has.

Training uses discrete Soft Actor-Critic with a replay buffer, sampling probabilistically so the policy keeps exploring. At test time the sampling switches to greedy selection. The split is the standard exploration-exploitation tradeoff, and we compared the other three combinations against it before settling on this one.

Episodes terminate on any of three conditions during training: the inlier count stops changing for two steps, the inlier ratio fails to beat the episode's best for three steps, or the episode hits its step cap. Testing keeps only the cap. The distinction we wanted was between giving up on a search that has stopped making progress and stopping one that is still improving but has run out of budget.

## Watching it work on a line

Set a few hundred points in a square, draw a line through some of them, let the rest be outliers. Any pair of points defines a candidate line. Every other point has a distance to it, and that distance is the feedback. The hypothesis visibly walks toward the ground truth across successive steps, which is satisfying to watch but not the interesting part.

The interesting part is what the policy does after it gets there. Once it finds a hypothesis with a high inlier ratio, it keeps working locally, refining the set rather than jumping to a different region of the data. A sampler without memory cannot do this, because it has no way to know it is already close. This is the clearest argument for putting the residual and history features in the state, and it shows up in the qualitative traces much more plainly than in any aggregate number.

Our synthetic data also places outliers inside the inlier band, which is what happens in real scenes. That rules out memorizing coordinates. What is learnable is the distribution of point groups that make a well-conditioned model, and that is what we wanted the policy to pick up.

![Successive sampling states in line fitting.](line-refinement.jpg "Illustrative sequence from the paper: hypotheses and residual evidence change across policy transitions.")

## From points to image correspondences

Two-view geometry changes the observation but not the interface. An observation is now a match between two image locations, described by its coordinates, its matching score and a local descriptor. A minimum set of eight goes to the eight-point solver, which returns a fundamental matrix, and consensus scoring measures how well every correspondence agrees with the resulting epipolar geometry.

In this setting the policy settles on rigid, well-localized feature points on buildings and similar structures. Nobody told it to prefer those. They are simply the matches that survive the geometric score, episode after episode, and the policy found them.

![Correspondences and geometric hypotheses across sampling transitions.](fundamental-refinement.jpg "The learned sampler receives feedback from a classical geometric solver.")

What carries across the two tasks is not a trained network. It is the contract: encode observations, propose a minimum set, solve, score, feed the evidence back. Moving to a new problem means supplying task-appropriate features, a solver and a residual definition. The paper's claim about transferability rests on that interface, together with the random restart and the duplicate rejection, not on the state transition by itself.

## What we take from this

The lesson we keep coming back to is that reward can substitute for differentiation. If a downstream metric can score an output, it can train the module that produced it. There is no need to make an argmax, a solver or a threshold differentiable, which means the interpretable classical pieces get to stay. That is what allows a traditional estimator and a learned one to be optimized toward the same objective instead of sitting on opposite sides of an interface.

Memory also turns out to be worth more than prediction here. Feeding the last attempt's residuals back into the state is cheap and dense. Training a better one-shot predictor is expensive and, in our setting, not obviously better.

And a learned sampler should never be allowed to underperform the random baseline it replaced. Seeding every episode with a random draw is what buys that.

## Where it stays limited

An honest list. The inlier threshold is still a hand-set hyperparameter and it directly determines the reward, which is the same sensitivity MAGSAC++ was designed to remove; we reintroduced it and did not study it. The state only tracks the top-N correspondences by matching score, so a good match outside that set can never be selected. Our comparisons for two-view geometry are against classical methods only, even though we discuss learning-based samplers throughout; readers should not read those as head-to-head results. Transfer to other tasks is argued from the interface, not demonstrated. And we never analyzed cost: multiple episodes times up to fifteen steps, each with a graph forward pass, a solver call and a full residual computation, is a real bill, and we did not compare accuracy at matched iteration budgets.

## The larger point

The discussion section of the paper makes the argument we actually believe. One-shot deep estimators are not reliable outside the distribution they were trained on, and their poor interpretability makes them hard to deploy in engineering settings. Classical estimators have clear behavior and well-defined scope, but cannot be folded into a learned framework because they are not differentiable. Combining the two gets both properties. If a component can be scored, it can be learned, and it can keep being the component you trust.

We are curious whether the same treatment extends to other non-differentiable pieces of the geometric stack. Noise covariance estimation in SLAM is the one we keep thinking about.
