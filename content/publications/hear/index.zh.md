---
title: "迈向视觉-声音-语言-动作范式：面向声音中心操作的 HEAR 框架"
authors:
  - me
  - Tianchen Deng
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2026-03-17T03:22:30Z"
publication_types: ["article-journal"]
publication:
  name: "国际机器人研究期刊"
  short_name: "IJRR"
peer_reviewed: true
open_access: true
abstract: "HEAR 将视觉-声音-语言-动作形式化为连续机器人控制范式，使瞬时声学事件在延迟、分块的决策循环中仍可被利用。框架结合因果音频记忆、多模态推理、近未来声音预测与流匹配动作生成；OpenX-Sound 和 HEAR-Bench 分别提供预训练数据与声音因果评测任务。"
summary: "为机器人策略加入因果音频记忆、多模态推理、未来声音预测与平滑动作生成的声音中心具身框架。"
story_order: 70
tags:
  - IJRR 2026
  - 通用机器人系统
  - 具身智能
  - 视觉-声音-语言-动作
  - 多模态基础模型
  - 机器人操作
  - Robot Manipulation
featured: true
image:
  caption: 'HEAR 系统概览来自[官方项目页](https://hear.irmv.top/)。'
  alt_text: 'HEAR 通过连续声音、因果记忆、推理、预测和动作生成升级视觉语言动作策略。'
hugoblox:
  ids:
    arxiv: 2603.16086v1
links:
  - type: custom
    label: 项目页
    url: https://hear.irmv.top/
  - type: code
    url: https://github.com/IRMVLab/HEAR
---

## 研究问题

现代视觉-语言-动作策略通常以开环动作块执行任务，因此可能错过发生在动作执行期间、却决定任务成败的短促声音。HEAR 不把声音视为静态提示，而是将其作为持续的因果信号。

## 核心贡献

HEAR 由流式声音记忆 **Historizer**、多感官推理 **Envisioner**、声音动力学预测 **Advancer** 与流匹配动作生成 **Realizer** 组成。OpenX-Sound 与 HEAR-Bench 进一步把工作从模型设计扩展到声音中心机器人操作的训练与评估。

## 在研究主线中的位置

HEAR 将多模态模型变成完整物理系统：它连接持续感知记忆、推理、预测、动作生成、数据、基准和实机评测，是我目前两项最具代表性的工作之一。
