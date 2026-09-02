---
title: "RLSAC：强化学习增强的端到端鲁棒估计采样一致性"
authors:
  - me
  - Guangming Wang
  - Zhe Liu
  - Luca Cavalli
  - Marc Pollefeys
  - Hesheng Wang
author_notes:
  - "共同一作"
  - "共同一作"
date: "2023-10-01T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE/CVF 国际计算机视觉大会"
  short_name: "ICCV"
peer_reviewed: true
open_access: true
abstract: "RLSAC 将采样一致性鲁棒估计建模为强化学习过程。图神经网络联合编码观测数据与采样历史，提出下一组最小集，并以其下游假设质量作为无监督奖励。学习到的状态转移可以复用于多类鲁棒估计问题。"
summary: "利用数据特征、采样历史和下游反馈来指导采样一致性的强化学习方法。"
story_order: 10
tags:
  - ICCV 2023
  - 感知与几何
  - 鲁棒估计
  - 强化学习
  - 计算机视觉
  - Computer Vision
featured: false
image:
  caption: '核心思想来自 [RLSAC 论文](https://arxiv.org/abs/2308.05318)。'
  alt_text: 'RLSAC 将采样一致性重构为强化学习过程。'
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

## 问题

经典采样一致性方法不断提出最小集，但采样器通常不会利用已经测试过的假设来改进下一次选择。

## 方法

RLSAC 将一致性采样重构为强化学习过程。图神经网络编码观测与采样历史，以假设质量作为下游反馈，并据此提出下一组最小集。

## 在研究主线中的位置

这项工作确立了贯穿后续研究的早期主题：**智能系统应当利用一次行动的结果来改进下一次决策**。在 RLSAC 中，这个闭环作用于几何假设；在后续工作中，它逐步扩展到多模态机器人行为。
