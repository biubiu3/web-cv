---
title: "ERMV：编辑机器人 4D 多视角图像以增强具身智能体"
authors:
  - Chang Nie
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2025-07-23T12:41:11Z"
publication_types: ["article"]
publication:
  name: "投稿 IEEE Transactions on Circuits and Systems for Video Technology 审稿中"
  short_name: "TCSVT（审稿中）"
venue_display: "IEEE Transactions on Circuits and Systems for Video Technology（IEEE 电路与系统视频技术汇刊，TCSVT）"
publication_status: "审稿中"
publication_status_key: "under_review"
display_area: "具身数据生成"
publication_order: 60
peer_reviewed: false
open_access: true
abstract: "ERMV 是一个机器人数据增强框架，可从稀疏帧编辑和机器人状态条件出发，编辑完整的多视角机器人轨迹。极线运动感知注意力维持几何与外观一致性，稀疏时空建模高效扩展编辑窗口，多模态反馈则在序列不一致时请求定向干预。"
summary: "一致、高效地编辑多视角机器人轨迹，为具身策略训练扩充数据。"
story_order: 60
topic_keywords:
  - 具身智能数据
  - 机器人数据增强
  - 生成式视频编辑
  - 多视角一致性
  - 4D 场景编辑
  - VLA 训练数据
tags:
  - TCSVT · 审稿中
  - 多模态数据与模型
  - 具身智能
  - 数据增强
  - 视频编辑
  - 视觉-语言-动作
  - 多模态学习
  - Multimodal Learning
featured: false
image:
  caption: '研究概览：单个引导帧编辑跨视角和时间传播，稀疏令牌、运动感知极线注意力与序列验证共同保持一致性。'
  alt_text: '白底 ERMV 论文方法图：一次引导帧编辑传播至三个时刻的头部、前方、左侧和腕部相机网格，并结合稀疏时空令牌、运动感知极线注意力、固定机器人动作和序列验证，最后并列输出一致数据或定点专家掩码。'
hugoblox:
  ids:
    arxiv: 2507.17462v1
links:
  - type: code
    url: https://github.com/IRMVLab/ERMV
---

## 一页速览

| 目标 | 从一张具有全局信息的编辑帧，扩展出完整多视角机器人轨迹 |
|---|---|
| 条件 | 视觉引导、机器人状态、相机位姿与时间历史 |
| 核心机制 | 稀疏时空建模、极线运动感知注意力与反馈干预 |
| 评测 | RoboTwin 仿真与双 Panda 实机策略训练 |
| 状态 | 预印本；投稿 TCSVT 审稿中 |

具身学习需要覆盖不同物体、纹理、杂乱背景与相机配置。有效的编辑示范需要让每个视角和时间步描述同一次干预，并与相机运动、机器人状态保持一致。跨相机的物体外观冲突会直接为下游策略制造矛盾监督。

ERMV 解决的正是这个数据问题：把一次引导编辑传播到“时间 × 多相机视角”的完整四维序列。

## 编辑问题如何定义

机器人轨迹记为 $\mathcal{T}=(X_t,a_t)$，其中 $X_t$ 是多视角观测，$a_t$ 是动作或状态。ERMV 构造

$$
\mathcal{T}'=(X'_t,a_t),
$$

并建模条件分布

$$
p\!\left(X'\mid X,C_{\mathrm{guide}},C_{\mathrm{state}},C_{\mathrm{history}}\right).
$$

动作序列保持不变，视觉世界围绕它被一致地编辑。用户先编辑一张能够表达全局外观变化的帧，CLIP 视觉嵌入将它编码成 $C_{\mathrm{guide}}$。状态条件包含相机位姿、关节状态 $q$、相机位姿变化和关节变化 $\Delta q$，使生成器既知道“要改成什么样”，也知道传感器与机器人正在如何运动。

骨干是由 Stable Diffusion 2.1 初始化的潜空间扩散模型。对潜变量 $z_t$、扩散时刻 $t$ 和条件 $C$，去噪目标为

$$
\mathcal{L}_{\mathrm{LDM}}
=\mathbb{E}_{z_t,t,\epsilon,C}
\left[\left\|\epsilon-G_\theta(z_t,t,C)\right\|_2^2\right].
$$

损失本身是标准形式，真正使它面向机器人的，是条件组织方式与注意力结构。

## 稀疏时空建模

稠密视频体注意力的开销会随帧数和相机数快速增长。ERMV 在 $L$ 个时间步、$N$ 个相机组成的 $L\times N$ 滑动窗口中，只选取 $K\ll L\times N$ 个位置。每个采样 token 都保留原始时间与相机索引，使模型能够正确连接过去的腕部视角与未来的外部视角。

过去与未来在同一个窗口内联合生成。论文设置使用过去八帧、四个历史视角作为条件，预测未来八帧、六个视角。

![稀疏 token 保留原始时间与相机坐标。](sparse-spatiotemporal.jpg "稀疏时空采样在保留位置身份的同时扩大编辑窗口。")

在相同窗口下，论文对比显示该设计节省约 50% 显存；同时，下游任务平均成功率从稠密建模的 0.32 提升至稀疏建模的 0.37。

## 极线运动感知注意力

刚性多视图几何会约束一个场景点在另一个相机中的位置，机械臂、夹爪和被操作物体则引入关节运动。ERMV 先依据位置编码与机器人状态，为特征位置 $p_i$ 预测偏移：

$$
\Delta p_i=f_{\mathrm{blur}}\!\left(\phi(p_i),C_{\mathrm{state}}\right),
$$

再按这一运动估计移动极线搜索区域并计算跨视角注意力，由此形成兼顾几何约束与关节运动的注意力邻域。

![机器人状态使跨视角注意力沿运动感知极线邻域移动。](epipolar-attention.jpg "极线运动感知注意力结合标定几何和可学习动态偏移。")

## 反馈只请求必要的修正

长序列即使整体正确，也可能有一个物体在局部帧中不一致。ERMV 使用 Qwen2.5-VL 比较原始序列与生成序列，定位受影响区域并请求有针对性的专家掩码，使人的干预集中在检测到的不一致位置。

![验证器先定位不一致区域，再请求专家干预。](feedback-intervention.jpg "多模态反馈把序列级不一致转化成局部修正请求。")

## 仿真实验：像素质量与下游价值

训练采用 batch size 4、AdamW、学习率 $10^{-5}$，硬件为一张 RTX 4090。RoboTwin 实验覆盖 12 个操作任务。与 Step1X 相比，论文报告的图像质量如下：

| 方法 | SSIM $\uparrow$ | PSNR $\uparrow$ | LPIPS $\downarrow$ |
|---|---:|---:|---:|
| Step1X | 0.1916 | 6.31 | 0.6461 |
| ERMV | **0.8334** | **24.17** | **0.1043** |

![RoboTwin 编辑轨迹在不同视角和时间上保持一致。](simulation-editing.jpg "仿真示例对比原始轨迹、引导编辑与传播后的多视角序列。")

像素保真度只是中间指标，因此论文还用增强数据训练机器人策略：

| 场景 | 策略 | 原始数据 | + ERMV | + Step1X |
|---|---|---:|---:|---:|
| 标准 RoboTwin | RDT | 0.40 | **0.48** | 0.00 |
| 标准 RoboTwin | Diffusion Policy | 0.37 | **0.41** | 0.00 |
| 未见杂乱背景 | RDT | 0.19 | **0.37** | — |
| 未见杂乱背景 | Diffusion Policy | 0.15 | **0.32** | — |

杂乱背景评测中，每个任务、每个策略均进行 100 次试验。Step1X 在该设置下成功率为零，说明跨视角与时间不一致会直接影响编辑数据训练有效行为的能力。

## 实机实验

物理平台采用 ACT 与双 Panda 机器人，包含两个任务。每个任务 100 次试验：加入 ERMV 数据后，原环境平均成功率从 0.52 提升到 0.91；未见杂乱环境从 0.02 提升到 0.89。

![实机编辑样例与策略评测。](real-robot-results.jpg "ERMV 扩充双 Panda 示范，并评估由此训练的 ACT 策略。")

这些结果支持论文的中心经验结论：一致的轨迹编辑能够改善下游策略鲁棒性，而这种价值无法只靠单帧视觉质量体现。

## 适用范围与局限

ERMV 围绕已有动作/状态轨迹编辑外观，需要新动作序列的任务变化超出当前形式。现有表达没有显式建模深度或完整 3D Gaussian 场景，复杂几何和遮挡仍可能破坏一致性。反馈闭环有时需要人工掩码，其可靠性也取决于多模态验证器；整体计算量高于简单图像增强。

该框架也为世界模型与 sim-to-real 数据生成提供了后续方向。在论文报告的仿真和实机设置中，状态条件多视角编辑数据的一致性同时通过像素指标与机器人成功率进行检验。
