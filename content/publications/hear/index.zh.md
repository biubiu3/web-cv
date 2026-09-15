---
title: "迈向视觉-声音-语言-动作范式：面向声音中心操作的 HEAR 框架"
authors:
  - Chang Nie
  - Tianchen Deng
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2026-03-17T03:22:30Z"
publication_types: ["article-journal"]
publication:
  name: "The International Journal of Robotics Research"
  short_name: "IJRR"
venue_display: "The International Journal of Robotics Research（国际机器人研究期刊，IJRR）"
publication_status: "已发表"
publication_status_key: "published"
display_area: "多感官机器人操作"
publication_order: 10
spotlight: true
peer_reviewed: true
open_access: true
abstract: "HEAR 在连续时间中联合建模视觉、声音、语言与动作，使瞬时声学事件在延迟、分块的决策循环中仍可被利用。框架结合因果音频记忆、多模态推理、近未来声音预测与流匹配动作生成；OpenX-Sound 和 HEAR-Bench 分别提供预训练数据与声音因果评测任务。"
summary: "为机器人策略加入因果音频记忆、多模态推理、未来声音预测与平滑动作生成的声音中心具身框架。"
story_order: 70
homepage_order: 20
topic_keywords:
  - 物理 AI
  - 多感官机器人
  - 视觉-声音-语言-动作（VSLA）
  - 具身智能
  - 多模态基础模型
  - 机器人操作
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
  caption: "在动作中持续聆听。"
  alt_text: "HEAR — 在动作中持续聆听。"
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

## 一页速览

| 问题 | 短促声音可能在机器人执行开环动作块时开始并结束 |
|---|---|
| 范式 | 连续物理时间中的视觉、声音、语言与动作（VSLA） |
| 架构 | Historizer → Envisioner → Advancer → Realizer |
| 数据 | 用于预训练的声音增强机器人示范 |
| 评测 | HEAR-Bench：七个仿真声音因果任务与四个实机任务 |

微波炉的一声提示、口头打断，或水开始沸腾的第一阵气泡声，都可能比一个机器人动作块更短。视觉语言动作策略如果只观察一次、预测一长段动作，并在全部执行后才重新感知，就可能完整错过事件。简单拼接音频波形仍会留下时间错位，因此声音消失后需要保留可供下一次决策使用的因果状态。

HEAR 在连续时间中建模声音与动作，并将音频事件保存到后续决策。

## 为什么分块控制会制造证据缺口

记机器人决策时刻为 $t_k$，声音以更高频率连续到达。考虑系统延迟 $\tau_{\mathrm{sys}}$，因果音频窗口可写成

$$
\mathcal{A}_k=
\left[a\!\left(\bar t_k-W,\bar t_k\right)\right],
\qquad
\bar t_k=t_k-\tau_{\mathrm{sys}},
$$

多模态观测为

$$
o_k=\left(I_k^{1:V},\mathcal{A}_k,\ell,q_k\right),
$$

其中包含多视角 RGB、语言指令 $\ell$ 与机器人状态 $q_k$。若策略预测长度为 $H$ 的轨迹，开环执行 $H_{\mathrm{exec}}$ 个动作后再观察，则决策间隔 $\Delta=H_{\mathrm{exec}}$，有效证据缺口约为

$$
G=\Delta+\tau_{\mathrm{sys}}.
$$

如果一段声音在缺口内开始并结束，且下一因果窗口已经覆盖不到它，那么 $t_{k+1}$ 的原始观测里将不再留下事件痕迹。持久因果记忆状态 $h_k$ 将瞬时事件带入下一次决策。

HEAR 还区分普通几何成功和**时序成功**。设 $t_{\mathrm{snd}}$ 为声音事件时刻，$t_{\mathrm{goal}}$ 为任务完成时刻，则

$$
S_{\mathrm{timed}}=\mathbf{1}\!\left[t_{\mathrm{snd}}\le t_{\mathrm{goal}}\le T\right].
$$

物理目标完成得太早也可能失败，例如报警声尚未出现就提前移走物体。

## 四个模块，对应四种时间职责

### 1. Historizer：保存瞬时证据

Historizer 以 640 个音频采样为一个因果包，在 16 kHz 下对应 40 ms。四层、宽度 256、四注意力头、16 个记忆 token 的有状态流式 Transformer 持续更新紧凑递归状态，记忆跨度覆盖那些会让短事件消失的决策缺口。

![流式因果包持续更新音频记忆。](historizer.jpg "Historizer 跨越连续声音与分块机器人决策之间的速率错位。")

这避免了一类典型时间混叠：两个当前视觉观测可能近似相同，$o_{t_k}\approx o_{t_{k'}}$，但一个发生在提示音之后，另一个发生在之前，正确动作完全不同。历史状态必须消除这种歧义。

### 2. Envisioner：把记忆转成任务阶段

Envisioner 在视觉、音频记忆、语言与机器人状态上进行多模态推理。高层 Qwen3-Omni 提取语义上下文 $z$，低层 Qwen3-0.6B 结合 KV cache 维持结构化阶段，并输出受约束 JSON 状态。层级设计把昂贵的语义解释，与控制所需的频繁阶段更新分开。

![高低层推理把多感官证据转换成结构化阶段。](envisioner.jpg "Envisioner 判断刚才发生了什么，以及任务现在需要什么。")

### 3. Advancer：预测接下来应该听到什么

Advancer 是四层、宽度 512、八注意力头的 Transformer，以交叉熵预测近未来 Mimi 音频 code。这一训练目标推动共享表征编码时间进度：倒水、沸腾、报警和对话即使静态画面相似，也具有不同的声学未来。

![未来声音预测提供时间监督。](advancer.jpg "Advancer 用任务的近未来声学动力学约束表征学习。")

### 4. Realizer：生成平滑动作

Realizer 通过条件流匹配把融合表征转换成动作轨迹，推理时用八步 Euler 积分求解向量场。训练目标为

$$
\mathcal{L}=
\mathcal{L}_{\mathrm{flow}}
+0.1\mathcal{L}_{\mathrm{adv}}
+0.05\mathcal{L}_{\mathrm{text}}.
$$

四个模块依次回答：哪些声音必须记住、它现在意味着什么、它预示怎样的时间过程，以及接下来应该产生什么连续动作。

## 从机器人活动中学习声音上下文

OpenX-Sound 为机器人视频补充合成任务音频，用于预训练，使模型接触操作阶段与声音之间的联系。时间对齐十分关键：即使声音本身合理，如果早于或晚于对应动作，也可能教会错误的关联。

合成音频与真实麦克风记录仍有差异。预训练提供声音上下文，独立任务中的评测则检查这些上下文是否帮助策略理解执行过程中发生的事件。

![预训练资源覆盖的机器人平台。](robot-platforms.jpg "预训练将不同操作活动与声音上下文联系起来。")

## 声音怎样改变下一步动作？

HEAR-Bench 包含不同类型的听觉证据：警报提示动作开始，语音可以确认或中断操作，过程声音描述倒水或沸腾的进展，接触声音则提供材料属性线索。

事件发生时间会随回合变化，因此策略需要依据实际听到的内容行动，并将短暂事件保存到后续决策时刻。在相关声音出现前完成几何目标，也可能是错误行为。

![警报决定机器人何时行动。](alarm-clock.jpg "声音事件改变正确的任务阶段转换。")

![倒水声音随物理过程持续变化。](pour-water.jpg "连续过程声音为阶段切换提供依据。")

## 评测检验了什么

研究在仿真与真实机器人任务中比较策略，并调整记忆和时序组件以分析其作用。核心问题包括：短暂事件能否跨越动作间隔而保留，声音上下文是否改变阶段选择，以及动作是否符合任务要求的时间关系。

## 设计启发

声音具有单次视觉观测无法完整表达的时间结构。HEAR 为记忆、解释、预测和行动分配明确职责，使一个短暂事件如何影响后续物理决策成为架构中可以检查的过程。
