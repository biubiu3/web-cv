---
title: "3D Object Detection and Tracking Based on Lidar-Camera Fusion and IMM-UKF Algorithm Towards Highway Driving"
authors:
  - Chang Nie
  - Zhiyang Ju
  - Zhifeng Sun
  - Hui Zhang
date: "2023-04-04T00:00:00Z"
publication_types: ["article-journal"]
publication:
  name: "IEEE Transactions on Emerging Topics in Computational Intelligence"
  short_name: "TETCI"
venue_display: "IEEE Transactions on Emerging Topics in Computational Intelligence (TETCI), 7(4): 1242–1252, 2023"
publication_status: "Published"
publication_status_key: "published"
publication_order: 90
homepage_order: 100
story_order: 5
peer_reviewed: true
open_access: false
featured: false
topic_keywords:
  - LiDAR-Camera Fusion
  - 3D Object Detection
  - Multi-Object Tracking
  - IMM-UKF
  - Autonomous Driving
tags:
  - TETCI 2023
  - Perception & Geometry
  - Computer Vision
  - Multimodal Learning
  - Autonomous Driving
hugoblox:
  ids:
    doi: 10.1109/TETCI.2023.3259441
links:
  - type: custom
    name: Publisher
    url: https://doi.org/10.1109/TETCI.2023.3259441

display_area: "自动驾驶环境感知"
abstract: "DTFI 将局部激光雷达与图像特征融合、柱状车辆检测和多模型跟踪连接起来。图像邻域补充点云几何，运动假设与目标关联则维持跨帧车辆轨迹。"
summary: "面向高速公路感知，以局部图像–点云融合增强三维检测，并通过 CV/CTRV 多模型滤波持续跟踪车辆。"
image:
  caption: "融合观测支持连续车辆跟踪。"
  alt_text: "DTFI — 融合观测支持连续车辆跟踪。"
---

## 研究概览

| 问题 | DTFI 的处理方式 |
|---|---|
| 如何用图像补充稀疏点云？ | 将全分辨率图像特征附加到每个激光雷达点上 |
| 如何缓解局部投影偏差？ | 在投影位置附近使用 5 × 5 卷积窗口聚合特征 |
| 如何兼顾三维检测与运行效率？ | 将增强点云编码为柱状特征，再通过伪图像和二维卷积完成检测 |
| 如何同时适应直行与转弯？ | 通过 IMM-UKF 融合 CV/CTRV 模型，用匈牙利算法关联检测与轨迹 |
| 评测重点 | 车辆检测、轨迹连续性，以及融合与滤波的作用 |

**DTFI** 是融合检测与跟踪框架的简称。论文于 **2023 年 4 月 4 日在线发表**，收录于 *IEEE Transactions on Emerging Topics in Computational Intelligence* 2023 年 8 月第 7 卷第 4 期，页码 1242–1252。作者依次为 **Chang Nie、Zhiyang Ju、Zhifeng Sun、Hui Zhang**；Chang Nie 为第一作者，Hui Zhang 为通信作者。[出版信息](https://doi.org/10.1109/TETCI.2023.3259441)。

## 背景：相邻两帧之间，车辆已经移动了多远？

高速行驶时，感知系统既需要知道周围车辆的位置，也需要持续估计它们的运动。激光雷达提供尺度明确的几何信息，图像提供外观线索；但融合会增加计算量，标定误差也可能使点云对应到错误的图像特征。检测之后，单一运动模型还可能难以适应直行与转弯之间的变化。

DTFI 分别从**局部对齐、快速检测和自适应状态估计**处理这些问题。检测网络可以端到端学习，完整系统则由检测器与独立的滤波跟踪器组成。

图像融合带来更多细节，也增加逐帧处理开销。DTFI 通过局部特征聚合与柱状编码保持空间处理阶段的紧凑，再由独立跟踪器将运动信息延续到相邻观测之间。

![原论文 DTFI 整体流程：图像与点云融合、三维检测、状态估计和轨迹维护。](pipeline.png "来源：原论文图 2。检测器和跟踪器依次连接。")

## 1. 从全分辨率图像特征到局部点云融合

图像分支采用修改后的 VGG-16 编码器和 FPN 风格解码器，通过上采样、同尺度特征拼接以及 1 × 1 卷积，在控制通道数的同时恢复原图分辨率。实验采用 $K=16$ 个图像特征通道。

![原论文图像特征提取器，以编码、上采样和特征拼接恢复空间细节。](image-features.png "来源：原论文图 4。全分辨率特征用于逐点融合。")

点云中的每个点包含 $(x,y,z,r)$，其中 $r$ 为反射强度。利用传感器标定将点投影到特征图后，方法舍弃相机视野外的点，在每个有效投影位置附近使用 **5 × 5 窗口卷积**，而不是仅采样一个位置的特征，以学习局部对应关系、缓解配准偏差。

用便于理解的紧凑记号，可将这一操作写成

$$
\mathbf q_i=[x_i,y_i,z_i,r_i,\mathbf g_i],
\qquad
\mathbf g_i=\operatorname{Conv}_{5\times5}(\mathbf F,\pi(\mathbf p_i)),
$$

其中 $\pi$ 为标定投影，$\mathbf F$ 为全分辨率图像特征图。增强后的点具有 $M=4+K=20$ 个通道。局部窗口能够学习邻域特征关联，但不能替代传感器标定。

## 2. 柱状编码与三维检测

融合点云被划分为竖直柱状单元，高度方向只保留一个单元。每个点再附加相对于柱内点均值的三维偏移，以及相对于柱中心的二维偏移，共五个几何特征，因此输入维度为 $E=M+5=25$。

轻量 PointNet 风格编码器扩展点特征，最大池化得到柱级表示，再按空间位置恢复为鸟瞰伪图像。随后利用二维卷积骨干和检测头预测三维有向框

$$
\mathbf b=(x,y,z,l,w,h,\theta).
$$

![原论文检测网络：多模态融合、柱状特征、二维骨干与三维检测头。](detector.png "来源：原论文图 3。柱状编码将三维检测转化为高效的二维卷积处理。")

训练目标包含位置回归、焦点分类损失和方向损失：

$$
\mathcal L=\frac{1}{N_{\mathrm{pos}}}
\left(2\mathcal L_{\mathrm{loc}}+\mathcal L_{\mathrm{cls}}+0.2\mathcal L_{\mathrm{dir}}\right).
$$

位置回归对编码后的框残差使用 Smooth L1。偏航角残差采用 $\sin(\theta^{gt}-\theta^a)$，另设方向项处理车头与车尾的歧义；焦点损失的两个参数分别为 0.25 和 2。

## 3. IMM-UKF：在直行与转弯假设之间自适应估计

每一帧首先预测已有轨迹，再与当前检测框进行匹配，最后更新匹配到的目标。短时未匹配轨迹继续预测若干帧，以跨越漏检或遮挡；新目标需要连续多帧被检测到，才确认为新轨迹。

| 运动模型 | 状态 | 适用运动 |
|---|---|---|
| 匀速模型 CV | $(x,y,z,v_x,v_y,v_z)$ | 三维空间中的线性运动 |
| 恒转率与恒速模型 CTRV | $(x,y,\theta,v,\omega)$ | 具有速度与偏航角速度的平面转弯 |

例如，在偏航角速度非零时，CTRV 的位置与航向更新为

$$
\begin{aligned}
x_{t+1}&=x_t+\frac{v_t}{\omega_t}[\sin(\theta_t+\omega_t\Delta t)-\sin\theta_t],\\
y_{t+1}&=y_t+\frac{v_t}{\omega_t}[\cos\theta_t-\cos(\theta_t+\omega_t\Delta t)],\\
\theta_{t+1}&=\theta_t+\omega_t\Delta t.
\end{aligned}
$$

无迹卡尔曼滤波处理非线性状态传播，交互式多模型方法则混合模型信息，并根据当前观测的似然更新模型权重。若 $\mu_i$ 为上一时刻的模型概率，$\pi_{ij}$ 为转移概率，$\Lambda_j$ 为观测似然，则后验概率可写为

$$
\mu_j^+=\frac{\Lambda_j\sum_i\pi_{ij}\mu_i}
{\sum_k\Lambda_k\sum_i\pi_{ik}\mu_i}.
$$

数据关联使用预测框与检测框之间的 **3D IoU** 构建匹配关系，再由匈牙利算法求解。粒子群优化（PSO）用于选择状态转移矩阵，以及各模型的状态、过程噪声和测量噪声协方差。论文给出的优化后转移矩阵为

$$
\Pi=\begin{bmatrix}0.653&0.347\\0.347&0.653\end{bmatrix}.
$$

对角元素更大，表示模型倾向于保持当前运动模式。这个对称矩阵本身不能证明 CV 比 CTRV 更常见，实际后验权重还取决于观测及上一时刻的模型概率。

## 检测与跟踪怎样交换信息？

检测描述车辆在当前帧出现的位置，轨迹则将状态估计延续到相邻观测之间。跟踪器先预测已有状态，再将预测与新检测框关联；匹配轨迹接受观测更新，未匹配轨迹和检测进入轨迹管理流程。

这一顺序在车辆转弯或短暂漏检时尤为重要。运动预测提供暂时的状态，后续关联到的观测再对其修正。多模型滤波器则随着新证据调整对直行与转弯假设的权重。

![论文中的车辆检测示例。](detection-results.png "相机投影与点云检测框展示融合检测器的输出。")

## 为什么结合局部融合与多种运动模型？

局部图像聚合处理图像证据与激光点对应中的不确定性。柱状编码随后将增强点组织为卷积检测器能够高效处理的表示。跟踪阶段处理另一类不确定性：车辆在两帧之间如何运动。

系统因此将学习到的外观特征与显式几何投影、状态估计连接起来。各组件都有明确的输入与职责，便于区分误差来自检测、关联还是运动预测。

![新出现、短暂消失和转弯车辆的跟踪示例。](tracking-results.png "跟踪示例展示检测更新与持续轨迹之间的关系。")

## 评测与设计启发

KITTI 实验考察检测、轨迹连续性与计算开销。融合和滤波消融分别分析图像特征、多种运动模型及参数调优的作用。

DTFI 展示了一种模块化感知流程：互补传感器改善当前观测，时间模型将信息延续到相邻帧，其设计将空间融合与显式轨迹管理连接起来。
