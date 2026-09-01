---
title: "DiffSAC：扩散引导的采样一致性鲁棒估计"
authors:
  - me
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2026-08-31T11:15:11Z"
publication_types: ["article"]
peer_reviewed: false
open_access: true
abstract: "DiffSAC 使用几何条件扩散模型学习有效最小集的分布。不同于一次性排序单个点，该方法迭代细化逐点置信度，并生成少量高质量候选集合。框架覆盖直线和平面拟合、基础矩阵与本质矩阵估计，以及单应性估计。"
summary: "通过几何条件扩散生成少量高质量最小集，以提高鲁棒估计效率。"
story_order: 40
tags:
  - 感知与几何
  - 鲁棒估计
  - 扩散模型
  - 计算机视觉
  - Computer Vision
featured: false
image:
  caption: '扩散引导采样来自 [DiffSAC 论文](https://arxiv.org/abs/2608.30603)。'
  alt_text: 'DiffSAC 迭代细化点置信度，生成高质量最小集。'
hugoblox:
  ids:
    arxiv: 2608.30603v1
links:
  - type: code
    url: https://github.com/IRMVLab/DiffSAC
---

## 问题

一次性置信度排序独立评估每个候选点，容易把大量假设预算浪费在“单点看似合理、组合起来却很差”的最小集上。

## 方法

DiffSAC 将最小集提出视为条件生成问题。扩散过程在几何条件约束下反复细化点置信度，为采样一致性估计生成紧凑的高质量候选集合。

## 在研究主线中的位置

DiffSAC 用现代生成模型重新回答 RLSAC 中的问题：重点不只是哪个点更好，而是**哪些点应该共同组成一个集合**。它也完成了这条研究路线中“可靠感知与几何”阶段的闭环。
