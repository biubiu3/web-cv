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
abstract: "HEAR 将视觉-声音-语言-动作形式化为连续机器人控制范式，使瞬时声学事件在延迟、分块的决策循环中仍可被利用。框架结合因果音频记忆、多模态推理、近未来声音预测与流匹配动作生成；OpenX-Sound 和 HEAR-Bench 分别提供预训练数据与声音因果评测任务。"
summary: "为机器人策略加入因果音频记忆、多模态推理、未来声音预测与平滑动作生成的声音中心具身框架。"
story_order: 70
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
  caption: 'HEAR 跨越延迟决策保留短促声音，使它能够改变机器人的下一段平滑动作。'
  alt_text: '紧凑白底 HEAR 图形摘要：机器人交互产生短促声音，四个因果记忆包跨越盲执行区间，视觉、语音与状态进入具体任务解释，多段机械臂姿态组成改变后的动作块；下方展示四类声音事件以及仅训练期使用的未来声音预测。'
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
| 范式 | 连续物理时间中的视觉—声音—语言—动作（VSLA） |
| 架构 | Historizer → Envisioner → Advancer → Realizer |
| 数据 | OpenX-Sound：约 120,000 条声音增强预训练 episode、100 种技能 |
| 评测 | HEAR-Bench：七个仿真声音因果任务与四个实机任务 |

微波炉的一声提示、口头打断，或水开始沸腾的第一阵气泡声，都可能比一个机器人动作块更短。视觉—语言—动作策略如果只观察一次、预测一长段动作，并在全部执行后才重新感知，就可能完整错过事件。简单拼接音频波形仍会留下时间错位，因此声音消失后需要保留可供下一次决策使用的因果状态。

HEAR 从这个系统问题出发，把视觉—声音—语言—动作范式写进连续物理时间。

## 为什么分块控制会制造证据缺口

记机器人决策时刻为 $t_k$；音频采样率为 16 kHz，电机控制约为 30 Hz。考虑系统延迟 $\tau_{\mathrm{sys}}$，因果音频窗口可写成

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

## OpenX-Sound：声音增强预训练

OpenX-Sound 约含 120,000 个 episode、100 种技能，机器人重量覆盖 7–120 kg。原始 Open X-Embodiment 视频缺少同步任务声音，因此 HEAR 从视觉序列合成声音用于预训练；基准评测使用独立的真实与仿真任务。

人工同步审计抽取 500 个 episode，每条由两名标注者检查；98.7% 被判断在 100 ms 内同步。该质量控制指标衡量数据资源的时间对齐，真实麦克风带来的声学域差异仍需单独处理。

![声音中心预训练覆盖的机器人平台与技能。](robot-platforms.jpg "OpenX-Sound 将声学预训练扩展到不同尺度机器人与操作技能。")

## HEAR-Bench：声音会改变正确动作的任务

仿真基准含七个任务、四种因果类别：

- **报警：** Alarm Clock 和 Microwave 要求在声音事件后行动；
- **语音：** Check Yes 和 Interrupt 要求理解回答或停止指令；
- **过程：** Pour Water 和 Boil Water 要求跟踪持续变化的声学过程；
- **材质：** Check Materials 用声音区分物体属性。

事件时刻被随机化，策略不能靠记忆固定等待时间取巧。训练包括 200,000 步预训练、每个仿真任务 50,000 步、每个实机任务 30,000 步；batch size 256，使用两张 RTX 5090。

![Alarm Clock 要求机器人等到瞬时声音出现后再行动。](alarm-clock.jpg "若机器人在报警前完成目标，这个声音因果任务判定失败。")

![Pour Water 需要在操作过程中持续跟踪声学进度。](pour-water.jpg "过程声音为操作阶段何时切换提供证据。")

## 仿真结果

每个仿真任务均进行 100 次试验。顺序为 Alarm Clock、Check Yes、Check Materials、Pour Water、Boil Water、Microwave、Interrupt：

| 方法 | Alarm | Yes | Material | Pour | Boil | Microwave | Interrupt | 平均 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 论文中最强 VLA 基线（π0.5-Waveform） | — | — | — | — | — | — | — | 0.61 |
| HEAR | **0.91** | **0.89** | **0.83** | **0.51** | **0.81** | **0.85** | **0.88** | **0.81** |

Pour Water 的成功率为 0.51，明显低于 0.81 的平均值和其他仿真任务。

## 实机结果

四个物理任务各进行 100 次试验：

| 方法 | Moka Coffee | Answer Phone | Shake Bottle | Real Alarm | 平均 |
|---|---:|---:|---:|---:|---:|
| 论文中最强 VLA 基线（π0.5-Waveform） | — | — | — | — | 0.39 |
| HEAR | 0.18 | 0.15 | **0.88** | **0.96** | **0.54** |

![长时咖啡任务同时包含演化声音与操作状态。](moka-coffee.jpg "Moka Coffee 暴露了真实长时声音—动作序列尚未解决的难点。")

![摇瓶产生关于内部材质状态的声学证据。](shake-bottle.jpg "Shake Bottle 是一个实机材质推理任务。")

HEAR 在较短因果任务上表现较强；Moka Coffee 和 Answer Phone 的成功率分别为 0.18 与 0.15，说明长时实机操作仍未解决。这些逐任务结果为 0.54 的平均成功率提供了必要背景。

## 消融与时间尺度实验

| 变体 | 仿真平均成功率 |
|---|---:|
| 完整 HEAR | **0.81** |
| 无预训练 | 0.69 |
| 无 Historizer | 0.57 |
| Historizer 换成 GRU | 0.67 |
| 换成 EMA/Pooling | 0.62 |
| 无 Advancer | 0.73 |
| 无阶段表征 | 0.77 |
| 无低层 Envisioner | 0.75 |
| 回归动作头 | 0.70 |

移除 Historizer 带来的下降最大，直接支持“证据缺口”论证。Advancer 也改变动作行为：完整模型的低运动动作块比例为 0.15；去掉 Advancer 后为 0.33，改用回归头为 0.38。预测未来声音有助于表达进度，并减少策略停滞。

只在第一个动作块重规划时平均成功率为 0.71，中途重规划为 0.80，默认设置为 0.81。窗口与动作块扫描体现预期权衡：记忆必须覆盖相关事件，而过长开环执行会扩大证据缺口。

![因果音频窗口变化时的成功率。](window-sweep.png "音频记忆既要覆盖事件时间尺度，也不能淹没当前证据。")

![实际执行动作块长度变化时的成功率。](chunk-sweep.png "开环动作块越长，证据出现并消失的间隔越大。")

HEAR 报告的误触发率与漏检率分别为 0.02 和 0.04。

## 局限与研究意义

合成声音可支持预训练，但仍存在真实—合成声学域差异。麦克风位置、回声、电机噪声、语言变化与端到端延迟都是部署问题。长时操作还需要稳健恢复和更广泛的物理经验。

HEAR 的核心贡献是一套声音感知操作的因果系统形式，显式建模采样率、持续时间、记忆跨度、预测目标以及音频事件与动作块的关系。实验显示了声音因果行为的提升，也呈现了长时实机任务中的剩余失败。
