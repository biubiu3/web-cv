---
title: "MovSAM：基于深度思考的单图像运动物体分割"
authors:
  - Chang Nie
  - Yiqing Xu
  - Guangming Wang
  - Zhe Liu
  - Yanzi Miao
  - Hesheng Wang
date: "2025-10-19T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE/RSJ International Conference on Intelligent Robots and Systems"
  short_name: "IROS"
venue_display: "IEEE/RSJ International Conference on Intelligent Robots and Systems（IEEE/RSJ 智能机器人与系统国际会议，IROS 2025）"
publication_status: "已发表"
publication_status_key: "published"
display_area: "机器人感知"
publication_order: 70
peer_reviewed: true
open_access: true
abstract: "MovSAM 面向缺少时间运动线索的单图像运动物体分割。多模态大模型对场景进行推理并生成文本物体提示；这些提示与 SAM 和视觉语言模型的视觉表征融合，再通过迭代推理逐步修正结果。"
summary: "通过场景推理、语言提示和掩码反馈，将单张图像中的语义线索用于运动物体分割。"
story_order: 20
homepage_order: 80
topic_keywords:
  - 多模态大语言模型
  - Segment Anything
  - 运动物体分割
  - 视觉语言推理
  - 开放世界感知
  - 自动驾驶
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
  caption: "场景语义引导物体分割。"
  alt_text: "MOVSAM — 场景语义引导物体分割。"
hugoblox:
  ids:
    doi: 10.1109/IROS60139.2025.11246064
    arxiv: 2504.06863v1
links:
  - type: code
    url: https://github.com/IRMVLab/MovSAM
---

## 一页速览

| 设定 | 设计选择 |
|---|---|
| 输入 | 单张 RGB 图像，不使用光流或相邻帧 |
| 推理 | 多模态大模型判断可能运动的物体，并生成文本提示 |
| 分割 | 融合 SAM2、BEiT-3 视觉语言特征与可学习聚合器 |
| 细化 | 最多五轮分割结果检查与提示更新 |

运动分割通常利用相邻帧测量场景变化。只有一张图像时，这类时间证据无法直接获得。MovSAM 利用物体外观与场景语义推断可能运动的实体，再将这种解释转化为像素掩码。

## 先推理，再分割

给定图像 $I$，多模态大模型 $\Phi$ 先产生语义描述或物体提示 $T$：

$$
T=\Phi(I).
$$

具体实现使用 Llama-3.2-11B-Vision：它观察完整场景，逐步分析哪些实体更可能运动，再把结论写成文本。生成的提示作为语义先验传给视觉分割模块，使场景推理与像素预测各自承担清晰职责。

SAM2 提供图像与掩码表征，BEiT-3 提供对齐的视觉语言特征。特征聚合模块由五层卷积和一层全连接组成，将全局上下文压缩为 512 维向量，再与提示条件表征融合。训练时冻结 SAM 图像编码器，优化视觉语言模型、聚合器与 SAM 的其余模块。论文报告的初始化模型为 SAM ViT-Huge 和 BEiT-3 Large。

## 最多五轮的推理与分割

初次推理可能选错或遗漏物体。MovSAM 将当前分割结果送回多模态模型，重新检查提示并更新掩码。循环在结果稳定或达到五轮后停止。

![在缺少时间证据的真实场景中进行单图像分割。](real-world.jpg "MovSAM 利用场景语义和外观，从单帧推断可能运动的物体。")

## 学习连接语言与掩码

分割目标结合区域重叠损失与逐像素分类。语言提示确定要分割的对象，视觉特征保留对象边界和局部外观，可学习聚合器负责连接这两类信息。

反馈循环同样跨越这两个层次：掩码可能暴露提示选错实体，或遗漏了相关物体。将当前结果返回推理模型，就为下一轮提示提供了可以检查的视觉结果。

## 单张图像能够提供什么信息？

静态图像中的姿态、物体类别与场景关系可以提示运动可能性，但不能直接测量时间上的位移。MovSAM 利用这些语义线索推断可能运动的对象，因此需要区分运动观测与运动解释。

当机器人只能获得孤立图像时，这种形式可以在缺少相邻帧的情况下提供对象级解释。该解释是否足以支撑后续决策，仍取决于具体任务和可用观测。

![包含遮挡与细边界的分割示例。](occlusion-sequence.jpg "论文定性示例展示了分割对象及其轮廓。")

## 评测与设计启发

实验在 DAVIS、FBMS 与 YouTube Objects 上比较分割表现，并通过消融考察特征聚合、迭代推理和任务适配。

架构的启发在于建立语言与像素之间可检查的联系：推理提出对象解释，分割将其转化为空间预测，所得掩码又成为下一次推理的证据。
