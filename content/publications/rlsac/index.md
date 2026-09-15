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

## At a glance

| Question | RLSAC's answer |
|---|---|
| What should be learned? | The sampling policy; the geometric solver remains fixed |
| What supervision is required? | No labels for the correct minimum set; hypothesis quality supplies the reward |
| What enters the policy state? | Observation features, the current sampling action, residuals, and the history of tested points |
| Where is it evaluated? | Synthetic line fitting and real two-view fundamental-matrix estimation |

Robust estimation requires an all-inlier minimum set from observations containing many outliers. As the outlier fraction grows, uniform random sampling is less likely to select such a set within a fixed budget. RLSAC formulates this sequential choice as a Markov decision process (MDP). Its policy uses residuals from the current hypothesis and point-selection history to choose the next minimum set.

![The policy state is updated after every hypothesis evaluation.](state-transition.jpg "From one sample to the next: observation features, the selected set, residuals, and sampling history form a state transition.")

## From repeated trials to a Markov decision process

Let $\chi$ be the observations and $\mathcal{M}_j$ a sampled minimum set. A conventional consensus loop constructs hypotheses

$$
\mathcal{H}=\{S(\mathcal{M}_j)\}_{j=1}^{J},
\qquad
h_{\mathrm{best}}=\arg\max_{h\in\mathcal{H}} f(h,\chi),
$$

where $S$ is a task-specific solver and $f$ evaluates a hypothesis by its consensus. RLSAC leaves both interfaces intact. It replaces only the proposal rule: the next action is drawn from a learned policy,

$$
a_{t+1}\sim\pi_\phi(a_{t+1}\mid s_t),
$$

and the reward is the inlier ratio obtained after solving and scoring the proposed set. This reward evaluates the *joint geometric consequence* of the selected observations, allowing training directly from downstream consensus without pointwise inlier annotations.

The state contains four complementary signals:

1. **Data features** describe each observation. Line fitting uses point coordinates. Correspondence estimation uses coordinates, matching scores, and descriptors.
2. **Action features** mark whether a point belongs to the currently sampled set using $+1/-1$ indicators.
3. **Residual features** record how well every observation agrees with the hypothesis produced by that action.
4. **Historical features** count how often each point has already been selected, preventing the policy from behaving as if every trial were the first.

Fitting, scoring, and updating the state form one transition. A good hypothesis provides positive feedback about selected points and nearby structure. A poor hypothesis records an unproductive combination.

## Policy and training

The policy uses an EdgeConv/DGCNN-style graph network, so pointwise evidence can interact with local neighborhoods. The network outputs a distribution over observations, from which a non-duplicate minimum set is drawn. The environment then invokes the unchanged geometric solver and updates residual and history features. A discrete Soft Actor-Critic objective trains the policy off-policy, balancing reward and exploration.

During training, an episode ends when the consensus stops changing or reaches the transition budget. Testing uses a fixed maximum budget. These stopping rules separate learning from short feedback sequences and evaluating proposals under a controlled search budget.

## How feedback changes the next sample

Consider a line-fitting problem. A sampled pair determines a candidate line, and the solver measures every point's residual to that line. Those residuals return to the policy together with the selected-point indicators and accumulated selection counts. The next proposal can therefore respond to what the previous geometric fit revealed.

This feedback is useful because a high score for an individual observation does not ensure that a combination will produce a stable model. The reward evaluates the hypothesis obtained from the entire minimum set. The graph network lets observations exchange local information before the policy chooses another combination.

![Successive sampling states in line fitting.](line-refinement.jpg "Illustrative sequence from the paper: hypotheses and residual evidence change across policy transitions.")

## Moving from points to image correspondences

For two-view geometry, an observation represents a match between image locations. Coordinates, matching information and local descriptors enter the policy; an eight-point solver converts a selected set into a fundamental matrix. Consensus evaluation then measures how well all correspondences agree with the resulting epipolar geometry.

The interface stays consistent across tasks: encode observations, select a minimum set, solve the geometry, score the hypothesis, and update the policy state. Adapting the system requires task-appropriate features, a solver and a residual definition.

![Correspondences and geometric hypotheses across sampling transitions.](fundamental-refinement.jpg "The learned sampler receives feedback from a classical geometric solver.")

## What the experiments examine

The paper studies synthetic line fitting and real image correspondences under different outlier levels and sampling budgets. Ablations examine the contribution of appearance descriptors and the sampling design. These comparisons support the use of geometric feedback in learned sampling.

## Design insight

RLSAC treats each hypothesis evaluation as information for the next decision. Its reusable idea is the stateful interface between learning and geometry: a policy proposes observations, a geometric module evaluates their joint consequence, and the resulting evidence shapes the next proposal.
