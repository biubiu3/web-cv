---
title: "MovSAM：基于深度思考的单图像运动物体分割"
authors:
  - me
  - Yiqing Xu
  - Guangming Wang
  - Zhe Liu
  - Yanzi Miao
  - Hesheng Wang
date: "2025-10-19T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE/RSJ 智能机器人与系统国际会议"
  short_name: "IROS"
peer_reviewed: true
open_access: true
abstract: "MovSAM 面向缺少时间运动线索的单图像运动物体分割。多模态大模型对场景进行推理并生成文本物体提示；这些提示与 SAM 和视觉语言模型的视觉表征融合，再通过迭代推理闭环逐步修正结果。"
summary: "通过多模态推理、语言引导提示与迭代细化，从单张图像中分割运动物体。"
story_order: 20
tags:
  - IROS 2025
  - 感知与几何
  - 运动物体分割
  - 多模态大模型
  - Segment Anything
  - 计算机视觉
  - Computer Vision
featured: false
image:
  caption: 'MovSAM 概览来自 [论文](https://arxiv.org/abs/2504.06863)。'
  alt_text: 'MovSAM 推理可能运动的物体，并迭代细化分割结果。'
hugoblox:
  ids:
    doi: 10.1109/IROS60139.2025.11246064
    arxiv: 2504.06863v1
links:
  - type: code
    url: https://github.com/IRMVLab/MovSAM
---

## 问题

运动物体分割通常依赖时间线索，但在掉帧、遮挡或传感器异常时，自动驾驶系统可能只剩一张可用图像。

## 方法

MovSAM 让多模态大模型先推理哪个物体最可能在运动，并将判断转化为文本提示；视觉语言特征与 SAM 随后生成掩码，深度思考闭环再重新检查并细化不确定结果。

## 在研究主线中的位置

MovSAM 让鲁棒感知不再只依赖几何线索：当直接运动证据缺失时，语义推理可以成为有效先验。这也构成了从传统视觉估计走向多模态决策系统的桥梁。
