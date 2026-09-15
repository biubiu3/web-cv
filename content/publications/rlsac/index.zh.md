---
title: "RLSAC：强化学习增强的端到端鲁棒估计采样一致性"
authors:
  - Chang Nie
  - Guangming Wang
  - Zhe Liu
  - Luca Cavalli
  - Marc Pollefeys
  - Hesheng Wang
author_notes:
  - "共同一作"
  - "共同一作"
date: "2023-10-01T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE/CVF International Conference on Computer Vision"
  short_name: "ICCV"
venue_display: "IEEE/CVF International Conference on Computer Vision（IEEE/CVF 国际计算机视觉大会，ICCV 2023）"
publication_status: "已发表"
publication_status_key: "published"
display_area: "鲁棒视觉估计"
publication_order: 80
peer_reviewed: true
open_access: true
abstract: "RLSAC 将采样一致性鲁棒估计建模为强化学习过程。图神经网络联合编码观测数据与采样历史，提出下一组最小集，并以其下游假设质量作为无监督奖励。学习到的状态转移可以复用于多类鲁棒估计问题。"
summary: "利用假设残差与采样历史学习最小集选择策略，在直线拟合和双视图几何估计中改进采样一致性。"
story_order: 10
homepage_order: 60
topic_keywords:
  - 强化学习
  - 鲁棒估计
  - RANSAC
  - 图神经网络
  - 几何视觉
  - 端到端采样一致性
tags:
  - ICCV 2023
  - 感知与几何
  - 鲁棒估计
  - 强化学习
  - 计算机视觉
  - Computer Vision
featured: false
image:
  caption: "利用几何反馈学习采样。"
  alt_text: "RLSAC — 利用几何反馈学习采样。"
hugoblox:
  ids:
    arxiv: 2308.05318v1
links:
  - type: custom
    label: ICCV
    url: https://openaccess.thecvf.com/content/ICCV2023/html/Nie_RLSAC_Reinforcement_Learning_Enhanced_Sample_Consensus_for_End-to-End_Robust_Estimation_ICCV_2023_paper.html
  - type: code
    url: https://github.com/IRMVLab/RLSAC
---

## 一页速览

| 核心问题 | RLSAC 的回答 |
|---|---|
| 学习什么？ | 学习采样策略，几何求解器保持固定 |
| 需要什么监督？ | 不需要正确最小集标签，以假设质量直接提供奖励 |
| 策略状态包含什么？ | 观测特征、当前采样动作、残差与已测试点的历史 |
| 在哪里验证？ | 合成直线拟合与真实双视图基础矩阵估计 |

鲁棒估计需要从含有大量外点的观测中选出一个全内点最小集。外点比例越高，均匀随机采样在固定预算内选中这类集合的机会就越小。RLSAC 将连续的采样选择建模为马尔可夫决策过程（MDP），利用当前假设的残差与逐点选择历史决定下一组最小集。

![每次假设评估后，策略状态都会随之更新。](state-transition.jpg "从一次采样到下一次采样：观测、所选集合、残差与采样历史共同构成状态转移。")

## 把反复试验写成马尔可夫决策过程

记观测集合为 $\chi$，第 $j$ 次选出的最小集为 $\mathcal{M}_j$。经典共识估计构造

$$
\mathcal{H}=\{S(\mathcal{M}_j)\}_{j=1}^{J},
\qquad
h_{\mathrm{best}}=\arg\max_{h\in\mathcal{H}} f(h,\chi),
$$

其中 $S$ 是任务专用几何求解器，$f$ 按共识质量评价假设。RLSAC 保留这两个接口，只替换候选集合的提出方式：

$$
a_{t+1}\sim\pi_\phi(a_{t+1}\mid s_t).
$$

求解并评分后得到的内点率就是奖励。这个奖励评价的是所选观测产生的**联合几何结果**，因此训练既不需要逐点内外点标签，也不需要人为指定某个唯一的正确最小集。

策略状态由四类互补信息组成：

1. **数据特征**描述每个观测。直线拟合可使用点坐标；对应点估计则结合坐标、匹配信息与局部描述子。
2. **动作特征**以 $+1/-1$ 标记一个点是否进入当前最小集。
3. **残差特征**记录全部观测与当前假设的一致程度。
4. **历史特征**累计每个点被选择的次数，避免策略把每轮尝试都当成毫无历史的第一次。

拟合、评分与状态更新组成一次状态转移。高质量假设为所选点及邻域提供正反馈，低质量假设则记录已测试的无效组合。

## 策略网络与训练方式

策略采用 EdgeConv/DGCNN 风格的图网络，使逐点信息能够与局部邻域交互。网络输出观测上的概率分布，再无重复地抽取一个最小集；环境调用原有求解器，并据此更新残差和历史。离散 Soft Actor-Critic 以离策略方式学习，在高奖励与探索之间取得平衡。

训练时，共识不再变化或达到状态转移预算就结束当前回合；测试使用固定最大预算。这将短反馈序列中的学习与受控搜索预算下的提议评价区分开来。

## 一次反馈如何影响下一次采样

以直线拟合为例，一对采样点确定一条候选直线，求解器随后计算所有点到该直线的残差。这些残差与当前选点标记、累计选择次数一起返回策略网络，使下一次提议能够利用上一轮几何拟合揭示的信息。

单个观测的得分高，并不意味着多个观测组合后就能得到稳定模型。因此，奖励评价整个最小集产生的假设。图网络先让观测交换局部信息，策略再选择新的组合。

![直线拟合中的连续采样状态。](line-refinement.jpg "论文示例：候选假设与残差信息随策略状态转移发生变化。")

## 从二维点扩展到图像对应关系

在双视图几何中，一个观测表示两幅图像之间的一组匹配。坐标、匹配信息和局部描述子共同进入策略，八点法将选出的集合转换为基础矩阵，共识评价再衡量全部对应关系与所得极线几何的一致程度。

不同任务共享同一接口：编码观测、选择最小集、求解几何、评价假设、更新策略状态。适配新任务时，需要相应的特征、求解器和残差定义。

![采样状态转移中的对应关系与几何假设。](fundamental-refinement.jpg "学习式采样器接收经典几何求解器的反馈。")

## 实验检验了什么

论文在合成直线拟合和真实图像对应关系上，考察不同外点比例与采样预算下的表现，并通过消融分析外观描述子和采样设计的作用。这些比较支持在学习式采样中使用几何反馈。

## 设计启发

RLSAC 将每次假设评价转化为下一次决策的信息。其可借鉴之处是学习与几何之间有状态的交互接口：策略提出观测组合，几何模块评价组合的结果，再用所得证据引导下一轮提议。
