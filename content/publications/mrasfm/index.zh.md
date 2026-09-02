---
title: "MRASfM：驾驶场景中的多相机运动恢复结构与聚合"
authors:
  - me
  - Lingfeng Xuan
  - Yiqing Xu
  - Zhe Liu
  - Yanzi Miao
  - Hesheng Wang
author_notes:
  - "共同一作"
  - "共同一作"
date: "2026-06-01T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE 机器人与自动化国际会议"
  short_name: "ICRA"
peer_reviewed: true
open_access: true
abstract: "MRASfM 利用固定的相机间几何关系，将运动恢复结构方法适配到多相机驾驶系统。方法通过平面模型去除不可靠路面点，将整个相机集合视为一个单元进行束调整，并借助粗到细的关联和装配聚合多个场景。"
summary: "面向驾驶环境可靠、高效重建与场景聚合的多相机 SfM 框架。"
story_order: 30
tags:
  - ICRA 2026
  - 感知与几何
  - 运动恢复结构
  - 多相机重建
  - 自动驾驶
  - 计算机视觉
  - Computer Vision
featured: false
image:
  caption: 'MRASfM 概念图来自 [论文](https://arxiv.org/abs/2510.15467)。'
  alt_text: 'MRASfM 利用相机组先验与语义信息完成驾驶场景重建和聚合。'
links:
  - type: preprint
    provider: arxiv
    id: 2510.15467v1
---

## 问题

驾驶场景的 SfM 面临路面弱纹理、多相机参数高度耦合，以及多次行驶结果需要一致装配等困难。

## 方法

MRASfM 将标定后的多相机集合视为一个结构化整体。相机组几何提升配准和束调整，语义路面过滤去除不可靠结构，粗到细关联进一步完成多场景聚合。

## 在研究主线中的位置

可靠的具身行为首先需要可靠的空间结构。MRASfM 展示了如何结合系统先验与语义信息，使大规模空间感知更稳定、更高效。
