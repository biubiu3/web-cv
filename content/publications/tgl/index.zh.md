---
title: "Teach and Grow：面向通用机器人学习的智能体中心架构"
authors:
  - me
  - Zhe Liu
  - Hesheng Wang
date: "2026-08-17T23:45:21Z"
publication_types: ["article"]
peer_reviewed: false
open_access: true
abstract: "Teach-and-Grow Learning（TGL）是一种智能体中心架构，旨在从少量成功示范中获得可复用的机器人能力。多模态智能体构建闭环 Skill Block，在新场景中进行定位和组合，在学习式工具与几何工具之间选择，观察物理结果，并在执行偏离意图时修改路线。Skill Library 与结构化 Experience Memory 持久保存成功行为、失败与修复经验。"
summary: "将少量教学转化为可复用 Skill Block 与持久经验，使后续任务能够受益的智能体中心机器人学习架构。"
story_order: 80
tags:
  - 通用机器人系统
  - 智能体机器人学习
  - 具身智能
  - 持续学习
  - 多模态智能体
  - 机器人操作
  - Robot Manipulation
featured: true
image:
  caption: '[Teach and Grow](https://arxiv.org/abs/2608.17209) 中端到端重训与智能体中心成长的对比。'
  alt_text: 'Teach and Grow 对比全局重训与少样本教学、技能复用、反馈适应和部署后成长。'
links:
  - type: preprint
    provider: arxiv
    id: 2608.17209v1
---

## 研究问题

通用机器人系统应当能够“局部地学习一条局部经验”，而不是每遇到一种陌生情况，都重新采集数据并重训完整的任务策略。

## 核心贡献

TGL 以智能体为中心，诱导、存储、定位、组合并修复可复用的 **Skill Block**。持久经验使物理世界中的成功与失败能够改变后续任务的处理方式；定向教学则无需任务专用策略重训即可扩展能力。

## 在研究主线中的位置

TGL 将系统级目标明确化：一次物理教学应当让下一个任务更容易。它把感知、工具、闭环反馈、可复用行为和结构化记忆组织成面向部署后持续学习的架构。与 HEAR 一起，它代表了当前研究方向的集中成果。
