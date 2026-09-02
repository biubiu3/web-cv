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
peer_reviewed: true
open_access: true
abstract: "RLSAC casts sample-consensus robust estimation as a reinforcement-learning process. A graph neural network combines observations with sampling history to propose the next minimum set, while downstream hypothesis quality supplies an unsupervised reward. The learned state transition makes the sampling policy reusable across robust-estimation problems."
summary: "Reinforcement-learning-guided sample consensus that uses data features, sampling history, and downstream feedback for robust estimation."
story_order: 10
tags:
  - ICCV 2023
  - Perception & Geometry
  - Robust Estimation
  - Reinforcement Learning
  - Computer Vision
featured: false
image:
  caption: 'Core idea from [the RLSAC paper](https://arxiv.org/abs/2308.05318).'
  alt_text: 'RLSAC remodels sample consensus as a reinforcement-learning process.'
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

## The problem

Classical sample-consensus methods repeatedly propose minimum sets, but the sampler does not naturally learn from the hypotheses it has already tested.

## The idea

RLSAC remodels consensus sampling as a reinforcement-learning process. A graph neural network encodes both the observations and sampling history; hypothesis quality becomes downstream feedback for proposing the next set.

## Why it matters in this research story

This work established an early theme that continues through my later research: **an intelligent system should use the outcome of an action to improve its next decision**. Here that loop operates over geometric hypotheses; later it expands to multimodal robot behavior.
