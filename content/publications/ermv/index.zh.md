---
title: "ERMV：编辑机器人 4D 多视角图像以增强具身智能体"
authors:
  - me
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2025-07-23T12:41:11Z"
publication_types: ["article"]
publication:
  name: "arXiv 预印本"
  short_name: "arXiv"
peer_reviewed: false
open_access: true
abstract: "ERMV 是一个机器人数据增强框架，可从稀疏帧编辑和机器人状态条件出发，编辑完整的多视角机器人轨迹。极线运动感知注意力维持几何与外观一致性，稀疏时空建模高效扩展编辑窗口，多模态反馈则在序列不一致时请求定向干预。"
summary: "一致、高效地编辑多视角机器人轨迹，为具身策略训练扩充数据。"
story_order: 60
tags:
  - arXiv 2025
  - 多模态数据与模型
  - 具身智能
  - 数据增强
  - 视频编辑
  - 视觉-语言-动作
  - 多模态学习
  - Multimodal Learning
featured: false
image:
  caption: '4D 编辑挑战来自 [ERMV 论文](https://arxiv.org/abs/2507.17462)。'
  alt_text: 'ERMV 在保持几何与时间一致性的同时编辑长时多视角机器人序列。'
hugoblox:
  ids:
    arxiv: 2507.17462v1
links:
  - type: code
    url: https://github.com/IRMVLab/ERMV
---

## 问题

机器人策略需要多样化轨迹，但只编辑单帧远远不够：变化还必须在不同相机、时间、相机运动和机器人状态之间保持一致。

## 方法

ERMV 将一次引导编辑扩展为完整的 4D 多视角轨迹。极线运动感知注意力保护几何结构，稀疏时空建模使长序列可处理，多模态反馈进一步定位不一致区域并进行针对性修正。

## 在研究主线中的位置

ERMV 将生成模型转化为具身数据工具，把多模态模型设计与一个现实问题连接起来：机器人系统如何获得更丰富、又保持物理一致性的训练经验。
