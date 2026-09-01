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
tags:
  - Robust Estimation
  - Reinforcement Learning
  - Computer Vision
featured: false
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

RLSAC links learned sampling to measurable geometric outcomes. Instead of repeatedly sampling without memory, the agent uses graph-encoded data and its prior decisions to improve the next hypothesis proposal.
