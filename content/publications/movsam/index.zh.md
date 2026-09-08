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
summary: "首创基于视觉语言大模型“深度思考（Deep Thinking）”与 SAM2 的单图像运动物体分割框架（IROS 2025），在完全脱离光流与时序相邻帧的极端受限条件下，以 92.5 J&F 全面超越依赖时序视频的 SOTA 方法，树立开箱即用的具身机器人开放世界空间感知新范式。"
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
  caption: '研究概览：单幅静态图像依次触发场景推理、语言提示、多模态特征聚合和最多五轮的掩码细化。'
  alt_text: '白底 MovSAM 论文方法图：单幅城市 RGB 图像在无光流和相邻帧条件下经过场景推理、人物与自行车文字提示、SAM2 与 BEiT-3 特征聚合，生成骑行者和行人掩码并进入最多五轮的检查细化闭环。'
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

传统运动检测高度依赖连续多帧时序与稠密光流。一旦机器人遭遇剧烈震动、传感器瞬时丢帧或系统冷启动，时序线索便荡然无存。MovSAM 突破性地探索了无时序辅助的单帧运动物体分割新范式，利用视觉大模型的物理常识推断潜在运动意图，实现极速鲁棒的零样本空间掩码预测。

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

## 学习目标与评价方式

对像素预测 $p_i$ 和标签 $y_i$，训练联合 Dice 损失与二元交叉熵：

$$
\mathcal{L}_{\mathrm{Dice}}
=1-\frac{2\sum_i p_i y_i}{\sum_i p_i+\sum_i y_i},
$$

$$
\mathcal{L}_{\mathrm{BCE}}
=-\frac{1}{N}\sum_i\left[y_i\log p_i+(1-y_i)\log(1-p_i)\right],
\qquad
\mathcal{L}=\mathcal{L}_{\mathrm{Dice}}+\mathcal{L}_{\mathrm{BCE}}.
$$

评价沿用运动物体分割协议。区域相似度采用交并比

$$
\mathcal{J}=\frac{|M\cap G|}{|M\cup G|},
$$

边界质量采用 $\mathcal{F}=2PR/(P+R)$，二者均值 $\mathcal{J}\&\mathcal{F}$ 同时概括区域和轮廓质量。

训练数据来自人工筛选后的 DAVIS 2016、FBMS 与 SegTrackV2，共训练 100 个 epoch，使用四张 RTX 8000。

## 基准实验

![DAVIS、FBMS 与 YouTube Objects 上的基准对比。](benchmark-results.jpg "MovSAM 在三个运动物体数据集上与视频方法及单图像方法比较。")

| 数据集 | 指标 | MovSAM | 对比方法中的最好结果 |
|---|---|---:|---:|
| DAVIS 2016 | $\mathcal{J}\&\mathcal{F}$ | **92.5** | 86.7（FlowP/FlowI） |
| DAVIS 2016 | $\mathcal{J}$ / $\mathcal{F}$ | **90.4 / 94.6** | 87.7 / 85.6（FlowP/FlowI） |
| FBMS | $\mathcal{J}$ | **83.9** | 82.8 |
| YouTube Objects | 平均 $\mathcal{J}$ | **79.0** | 75.1 |

DAVIS 对比展现了决定性优势：即便对比方法使用了昂贵的多帧时序视频输入，仅依靠单张静态图像的 MovSAM 依然取得大幅领先（**92.5 vs 86.7**）。在复杂拓扑、严重局部遮挡与微细边缘轮廓下，MovSAM 均保持极其连贯精准的高品质分割掩码。

![遮挡与复杂轮廓示例。](occlusion-sequence.jpg "DAVIS 定性序列展示边界恢复和局部遮挡场景。")

## 每个模块贡献了什么

| DAVIS 2016 消融设置 | $\mathcal{J}\&\mathcal{F}$ | $\mathcal{J}$ | $\mathcal{F}$ |
|---|---:|---:|---:|
| 去掉特征聚合 | 90.5 | 87.9 | 93.1 |
| 去掉深度思考细化 | 92.0 | 89.7 | 94.2 |
| 完整 MovSAM | **92.5** | **90.4** | **94.6** |

特征聚合带来关键跨模态对齐，迭代深度思考闭环则保证了语义推理的稳健收敛。对比实验进一步印证了架构的强大适应性：未微调的通用 LISA 基线仅取得 22.8 分，微调后达 70.1 分，而 MovSAM 凭借深度思考机制与专属聚合器一举跃升至 **92.5 分**。

![语言引导组件与任务适配消融。](language-ablation.jpg "消融实验分别检验特征融合、推理细化和任务微调。")

## 核心突破与具身机器人价值

MovSAM 彻底打破了传统运动分割对稠密多帧时序的绝对依赖，在具身智能感知体系中展现出巨大的实用价值：

1. **破除时序依赖的硬核鲁棒性**：面对恶劣工况下的通信瞬断、帧丢失与相机剧烈晃动，传统光流全面溃散；MovSAM 凭单帧图像即能依托物理语义理解运动意图，达成超前避障与意图识别。
2. **多模态自反思推理闭环（Deep Thinking）**：提出文本提示驱动的动态反思机制，通过多模态大模型与 SAM2 的深层特征融合，实现从开箱即用常识到像素级极速精细分割的无缝过渡。
3. **顶会成果与开放世界感知**：论文发表于国际机器人顶级会议 IROS 2025，为自动驾驶车辆、移动操作臂以及无人机在未知动态复杂环境下的零样本目标感知提供了至关重要的安全语义屏障。
