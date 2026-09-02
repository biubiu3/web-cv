---
title: "MID：自监督多模态迭代去噪框架"
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
venue_display: "IEEE Transactions on Neural Networks and Learning Systems（IEEE 神经网络与学习系统汇刊，TNNLS）"
display_area: "多模态自监督学习"
publication_order: 40
peer_reviewed: true
open_access: true
abstract: "MID 将含噪观测视为非线性退化过程的中间状态，并仅使用含噪数据学习逆转该过程。一个网络估计当前退化阶段，另一个网络移除相应的残差增量；局部一阶近似支持非线性噪声下的迭代恢复。该框架覆盖视觉、生物医学信号、点集与生物序列。"
summary: "仅从含噪观测中学习非线性迭代去噪，并统一适配多种数据模态。"
story_order: 50
tags:
  - TNNLS 2026
  - 多模态数据与模型
  - 自监督学习
  - 多模态学习
  - 去噪
  - Multimodal Learning
featured: false
image:
  caption: 'MID 训练与迭代去噪方法流程（Figure 2）。'
  alt_text: 'MID 方法流程从含噪多模态观测中学习退化阶段预测与迭代残差去噪。'
hugoblox:
  ids:
    doi: 10.1109/TNNLS.2026.3683544
links:
  - type: preprint
    provider: arxiv
    id: 2511.00997v1
---

## 问题

许多模态很难获得成对的干净目标，真实退化过程也往往是非线性的，而不是单一固定噪声等级。

## 方法

MID 将含噪样本视为退化轨迹上的中间状态。一个网络估计当前阶段，另一个网络预测需要移除的局部残差，多次更新后仅依赖含噪数据即可逐步逼近干净状态。

## 在研究主线中的位置

同一套迭代原理可以作用于图像、几何观测、生物医学信号和生物序列。MID 因而把研究重心从单一视觉任务扩展到**模态无关的学习动力学**。
