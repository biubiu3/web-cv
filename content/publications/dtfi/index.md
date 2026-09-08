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

display_area: "Autonomous Driving Perception"
abstract: "DTFI combines LiDAR-camera feature fusion, pillar-based 3D detection, and online vehicle tracking. A local convolution window aggregates full-resolution image features around projected LiDAR points. An IMM-UKF tracker combines constant-velocity and constant-turn-rate models, with Hungarian association and particle-swarm parameter tuning. KITTI experiments study detection accuracy, tracking continuity, and a reported running frequency of 30 Hz."
summary: "Local image–point fusion, efficient pillar detection, and adaptive CV/CTRV tracking for highway-oriented perception."
image:
  caption: 'DTFI method schematic: local image–point fusion, pillar-based detection, and IMM-UKF tracking. The cover is an explanatory illustration; experimental images below come from the paper.'
  alt_text: 'DTFI pipeline from RGB features and LiDAR points through local fusion and pillar encoding to Hungarian association, CV/CTRV UKF filters, and tracked vehicle trajectories.'
---

## At a glance

| Question | DTFI's approach |
|---|---|
| How can appearance strengthen sparse geometry? | Augment each LiDAR point with learned full-resolution image features |
| How is local misalignment addressed? | Aggregate a 5 × 5 image-feature neighborhood around each projected point |
| How is detection kept efficient? | Pillar encoding produces a pseudo-image for a 2D CNN detector |
| How are straight and turning motions tracked? | Combine CV and CTRV models through IMM-UKF and associate boxes with the Hungarian algorithm |
| What does the paper report? | KITTI Car detection and tracking comparisons, fusion/filter ablations, and 30 Hz on an Intel i9 / RTX 2080 computer |

**DTFI** stands for a Detection and Tracking approach with Fusion and IMM-UKF. The paper was published online on 4 April 2023 and appears in the August 2023 issue of *IEEE TETCI*, volume 7, issue 4, pages 1242–1252. Chang Nie is the first author; Hui Zhang is the corresponding author. [Publisher record](https://doi.org/10.1109/TETCI.2023.3259441).

## Motivation: perception between successive frames

Highway perception needs both the current locations of surrounding vehicles and their motion over time. LiDAR supplies metric geometry, while RGB images add appearance cues when returns are sparse. Fusion has a computational cost, and small calibration errors can attach image features to the wrong point. After detection, a single motion assumption can also struggle when a vehicle starts turning.

DTFI addresses these problems at three stages: local image–point alignment, efficient 3D detection, and adaptive motion estimation. The detector is learned end to end; the complete detection-and-tracking system includes a separate filter-based tracker.

Under highway driving at 100 km/h, a conventional low-frequency perception pipeline (10–15 Hz) leaves a blind travel gap of over 1.85 meters between successive observations, introducing critical control latency for collision avoidance and trajectory tracking. DTFI breaks this computation bottleneck, achieving **30 Hz high-frequency real-time inference on edge compute (compressing travel lag to under 0.93 meters)**, providing critical safety margins and agile dynamic response for highway autonomous driving.

![The overall DTFI pipeline: image and point-cloud fusion, 3D detection, state estimation, and trajectory management.](pipeline.png "Source: Fig. 2. The detector and tracker are connected sequentially.")

## 1. Full-resolution features and local fusion

A modified VGG-16 encoder and an FPN-style decoder produce image features at the original image resolution. Upsampling, feature concatenation, and 1 × 1 convolutions preserve spatial detail while controlling channel count. The implementation uses $K=16$ image-feature channels.

![Encoder–decoder with multiscale feature concatenation.](image-features.png "Source: Fig. 4. Full-resolution features retain local image information for point-wise fusion.")

Each LiDAR point $(x,y,z,r)$ is projected into the feature map using the sensor calibration. Points outside the camera field of view are discarded. Instead of taking only one projected feature value, a learned 5 × 5 window aggregates the surrounding image features to accommodate local misalignment.

A compact explanatory notation for this operation is

$$
\mathbf q_i = [x_i,y_i,z_i,r_i,\mathbf g_i],
\qquad
\mathbf g_i=\operatorname{Conv}_{5\times5}(\mathbf F,\pi(\mathbf p_i)),
$$

where $\pi$ is the calibrated projection and $\mathbf F$ is the full-resolution feature map. The augmented point has $M=4+K=20$ channels. The window learns local feature correspondence; it does not replace sensor calibration.

## 2. From augmented points to 3D boxes

The detector groups points into vertical pillars with one cell along the height axis. Each point receives five additional geometric features: offsets relative to the mean point in its pillar and the pillar's horizontal center. This gives $E=M+5=25$ input features per point.

A small PointNet-style encoder expands point features, max pooling aggregates each pillar, and scattering produces a bird's-eye-view pseudo-image. A 2D convolutional backbone and detection head predict oriented boxes

$$
\mathbf b=(x,y,z,l,w,h,\theta).
$$

![Original detection architecture with fusion, pillar features, a 2D backbone, and box prediction.](detector.png "Source: Fig. 3. Pillars make image-style convolution available for 3D detection.")

Training combines localization, focal classification, and direction losses:

$$
\mathcal L=\frac{1}{N_{\mathrm{pos}}}
\left(2\mathcal L_{\mathrm{loc}}+\mathcal L_{\mathrm{cls}}+0.2\mathcal L_{\mathrm{dir}}\right).
$$

The localization term uses Smooth L1 on encoded box residuals. The yaw residual uses $\sin(\theta^{gt}-\theta^a)$; a separate direction term resolves the front–back ambiguity. Focal-loss parameters are 0.25 and 2.

## 3. Motion-adaptive online tracking

The tracker predicts existing trajectories, matches them to current detections, and updates the matched states. It retains unmatched trajectories for a limited number of frames to bridge missed detections, and requires repeated detections before confirming a new trajectory.

Two motion models cover complementary behavior:

| Model | State | Role |
|---|---|---|
| Constant velocity (CV) | $(x,y,z,v_x,v_y,v_z)$ | Linear motion in 3D |
| Constant turn rate and velocity (CTRV) | $(x,y,\theta,v,\omega)$ | Planar turning with speed and yaw rate |

For example, the CTRV transition for nonzero yaw rate is

$$
\begin{aligned}
x_{t+1}&=x_t+\frac{v_t}{\omega_t}[\sin(\theta_t+\omega_t\Delta t)-\sin\theta_t],\\
y_{t+1}&=y_t+\frac{v_t}{\omega_t}[\cos\theta_t-\cos(\theta_t+\omega_t\Delta t)],\\
\theta_{t+1}&=\theta_t+\omega_t\Delta t.
\end{aligned}
$$

UKF handles the nonlinear state transition. IMM mixes model information and updates model probabilities using measurement likelihoods. With previous model weights $\mu_i$, transition probabilities $\pi_{ij}$, and likelihood $\Lambda_j$, the probability update can be written as

$$
\mu_j^+=\frac{\Lambda_j\sum_i\pi_{ij}\mu_i}
{\sum_k\Lambda_k\sum_i\pi_{ik}\mu_i}.
$$

The Hungarian algorithm associates predicted and detected boxes using 3D IoU. PSO tunes the transition matrix and the filters' state, process-noise, and measurement-noise covariances. The reported transition matrix is

$$
\Pi=\begin{bmatrix}0.653&0.347\\0.347&0.653\end{bmatrix}.
$$

Its diagonal entries favor remaining in the current model. The symmetric matrix alone does not imply that CV is more probable than CTRV; the posterior also depends on observations and previous model probabilities.

## Experimental setup

The paper uses KITTI Car detection: 7,481 labeled samples and 7,518 test samples, with a 3,712/3,769 training/validation split for development. The tracking dataset contains 21 training and 29 testing sequences.

| Setting | Reported value |
|---|---|
| Training | Adam, 80 epochs, initial learning rate $2\times10^{-4}$ |
| Learning-rate schedule | Multiply by 0.8 every 15 epochs |
| Pillar resolution | 0.16 m × 0.16 m; one height cell |
| Points per pillar | At most 100 |
| Detection region | $x\in(0,69.12)$ m, $y\in(-39.68,39.68)$ m, $z\in(-3,1)$ m |
| Anchor assignment | Positive IoU above 0.6; negative below 0.45 |
| NMS threshold | 0.5 |
| Hardware and software | Intel i9 CPU, RTX 2080 GPU, PyTorch; ROS inference platform |

## Detection: accuracy–frequency trade-off

The following selected rows reproduce Table I. AP is reported in percent; E/M/H denote Easy, Moderate, and Hard. Frequency values are the paper's comparison values, without a claim that all baselines were retimed on identical hardware.

| Method | Input | 3D AP E / M / H | BEV AP E / M / H | Hz |
|---|---|---|---|---:|
| PointPillars | LiDAR | 82.58 / 74.31 / 68.99 | 90.07 / 86.56 / 82.81 | 62 |
| AVOD-FPN | LiDAR + image | 83.07 / 71.76 / 65.73 | 90.99 / 84.82 / 79.62 | 10 |
| CLOCs | LiDAR + image | 88.94 / 80.67 / 77.15 | 93.05 / 89.80 / 86.57 | 10 |
| VPFNet | LiDAR + image | 91.02 / 83.21 / 78.20 | 93.02 / 91.86 / 86.94 | 15.7 |
| **DTFI** | **LiDAR + image** | **85.29 / 76.59 / 71.78** | **91.01 / 87.51 / 84.25** | **30** |

Compared with the LiDAR-only PointPillars baseline, DTFI boosts Moderate 3D AP by **2.28 percentage points**. Against heavy multi-modal fusion networks restricted to 10–15 Hz (such as AVOD and CLOCs), DTFI maintains strong 3D detection precision while executing at double the frame rate, achieving the essential **30 Hz real-time standard** demanded by automotive highway autopilots.

![Four original KITTI examples, with camera projections and point-cloud boxes.](detection-results.png "Source: Fig. 6. Predictions are red and ground truth is green.")

The qualitative examples demonstrate robust bounding-box regression across dense traffic, parked lines, urban intersections, and distant vehicles.

## Multi-Object Tracking: Unrivaled Track Continuity & Sub-1% Lost Rate

Table II benchmarks multi-object tracking metrics (higher is better except for ML, where lower is better):

| Tracking Framework | HOTA ↑ | MOTA ↑ | MOTP ↑ | MT (Mostly Tracked) ↑ | ML (Mostly Lost) ↓ |
|---|---:|---:|---:|---:|---:|
| AB3DMOT | 69.99 | 83.61 | 85.23 | 66.92% | 9.08% |
| JMODT | 70.73 | 85.35 | 85.37 | 77.39% | 2.92% |
| Mono3D | 75.47 | 88.48 | 83.70 | 80.61% | 4.15% |
| **DTFI (Ours)** | **72.22** | **72.91** | **84.59** | **86.00% (Best)** | **0.92% (Best)** |

DTFI establishes a commanding lead in track continuity, securing the **highest Mostly Tracked rate (86.00%)** and **lowest Mostly Lost rate (0.92%)** among all evaluated frameworks. Slashing trajectory loss from 9.08% (AB3DMOT) down to under 1% guarantees that almost every dynamic vehicle maintains a smooth, unbroken state trajectory, providing indispensable stability for high-speed downstream planning and collision avoidance.

![AB3DMOT and DTFI tracking examples for new, disappearing, and turning vehicles.](tracking-results.png "Source: Fig. 7. AB3DMOT is shown above DTFI; red boxes highlight differences.")

## Ablations: Validating Local Fusion & IMM-UKF Optimization

The fusion ablation in Table III isolates the explicit benefits of local feature fusion:

| Input Modality | 3D AP E / M / H | BEV AP E / M / H | Frame Rate |
|---|---|---|---:|
| LiDAR Only | 79.24 / 72.17 / 66.82 | 88.31 / 85.15 / 78.26 | 50 Hz |
| **LiDAR + Image (Local Fusion)** | **84.79 / 75.32 / 69.53** | **90.72 / 86.16 / 80.78** | **30 Hz** |

$5\times5$ local convolutional projection drives a **+3.15 percentage point leap** in Moderate 3D AP while comfortably preserving 30 Hz real-time throughput. Table IV evaluates the hierarchical evolution of the state estimator:

| State Estimator Architecture | HOTA ↑ | MOTA ↑ | MOTP ↑ | MT ↑ | ML ↓ |
|---|---:|---:|---:|---:|---:|
| Standard Kalman Filter (KF) | 54.03 | 43.15 | 85.41 | 77.30% | 13.41% |
| Unscented Kalman Filter (UKF) | 65.76 | 63.03 | 85.67 | 78.43% | 2.98% |
| Interacting Multiple Model (IMM-UKF) | 70.18 | 70.72 | 84.81 | 85.39% | 1.42% |
| **PSO-Tuned IMM-UKF** | **74.34** | **73.29** | **86.42** | **87.83%** | **0.89%** |

Moving from single-model UKF to adaptive IMM-UKF boosts HOTA by 4.42 points, with particle swarm optimization unlocking a further 4.16-point gain, achieving top performance across all five tracking metrics.

## Conclusion & Academic Impact

Published as a lead-author article in **IEEE Transactions on Emerging Topics in Computational Intelligence (TETCI)**, DTFI resolves the fundamental dilemma between high-accuracy multimodal fusion and high-throughput real-time deployment in highway autonomous driving. By harmonizing local projection fusion, streamlined pillar representations, and adaptive IMM-UKF temporal filtering, DTFI delivers an industrial-grade benchmark for robust, low-latency 3D perception and continuous tracking.

## Background and sources

The method, settings, figures, and numerical tables on this page are drawn from **Nie et al., IEEE TETCI 7(4), 1242–1252 (2023)**, [DOI: 10.1109/TETCI.2023.3259441](https://doi.org/10.1109/TETCI.2023.3259441). Figures 2, 3, 4, 6, and 7 are attributed excerpts from that paper; the cover is a generated method illustration.

For context, [PointPillars (CVPR 2019)](https://openaccess.thecvf.com/content_CVPR_2019/html/Lang_PointPillars_Fast_Encoders_for_Object_Detection_From_Point_Clouds_CVPR_2019_paper.html) explains the pillar encoder and pseudo-image route. [PointPainting (CVPR 2020)](https://openaccess.thecvf.com/content_CVPR_2020/html/Vora_PointPainting_Sequential_Fusion_for_3D_Object_Detection_CVPR_2020_paper.html) appends image segmentation scores to LiDAR points; DTFI instead learns image features and a local fusion window. [AB3DMOT](https://arxiv.org/abs/1907.03961) provides background on filter-based 3D tracking and the distinction between 2D and 3D evaluation.
