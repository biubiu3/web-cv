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
abstract: "DTFI connects local LiDAR-camera feature fusion with pillar-based vehicle detection and multiple-model tracking. Image neighborhoods enrich point geometry; motion hypotheses and association maintain vehicle trajectories across frames."
summary: "Local image–point fusion, efficient pillar detection, and adaptive CV/CTRV tracking for highway-oriented perception."
image:
  caption: "Fused observations support continuous vehicle tracking."
  alt_text: "DTFI — Fused observations support continuous vehicle tracking."
---

## At a glance

| Question | DTFI's approach |
|---|---|
| How can appearance strengthen sparse geometry? | Augment each LiDAR point with learned full-resolution image features |
| How is local misalignment addressed? | Aggregate a 5 × 5 image-feature neighborhood around each projected point |
| How is detection kept efficient? | Pillar encoding produces a pseudo-image for a 2D CNN detector |
| How are straight and turning motions tracked? | Combine CV and CTRV models through IMM-UKF and associate boxes with the Hungarian algorithm |
| Evaluation focus | Vehicle detection, track continuity, and the roles of fusion and filtering |

**DTFI** stands for a Detection and Tracking approach with Fusion and IMM-UKF. The paper was published online on 4 April 2023 and appears in the August 2023 issue of *IEEE TETCI*, volume 7, issue 4, pages 1242–1252. Chang Nie is the first author; Hui Zhang is the corresponding author. [Publisher record](https://doi.org/10.1109/TETCI.2023.3259441).

## Motivation: perception between successive frames

Highway perception needs both the current locations of surrounding vehicles and their motion over time. LiDAR supplies metric geometry, while RGB images add appearance cues when returns are sparse. Fusion has a computational cost, and small calibration errors can attach image features to the wrong point. After detection, a single motion assumption can also struggle when a vehicle starts turning.

DTFI addresses these problems at three stages: local image–point alignment, efficient 3D detection, and adaptive motion estimation. The detector is learned end to end; the complete detection-and-tracking system includes a separate filter-based tracker.

The detector must balance the detail gained from image fusion against the cost of processing each frame. DTFI uses local feature aggregation and pillar encoding to keep this spatial stage compact, then lets a separate tracker carry motion information between observations.

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

## How detection and tracking exchange information

A detection describes where a vehicle appears in the current frame. A trajectory carries an estimate forward between observations. The tracker first predicts existing states, then associates those predictions with the new boxes. Matched tracks receive measurement updates; unmatched tracks and detections enter the trajectory-management logic.

This ordering matters during a turn or a brief missed detection. Motion prediction provides a provisional state, while the next associated observation corrects it. The multiple-model filter updates its preference between straight and turning motion as evidence arrives.

![Vehicle detection examples from the paper.](detection-results.png "Camera projections and point-cloud boxes illustrate the fused detector.")

## Why use local fusion and multiple motion models?

Local image aggregation addresses uncertainty in assigning image evidence to a LiDAR point. Pillar encoding then organizes the augmented points into a representation that a convolutional detector can process efficiently. The tracking stage addresses a different uncertainty: how the detected vehicle will move between frames.

The system consequently combines learned appearance features with explicit geometric projection and state estimation. Each component has an identifiable input and role, which helps isolate whether an error arose in detection, association or motion prediction.

![Examples of new, temporarily missing and turning vehicles.](tracking-results.png "The tracking examples show how detection updates interact with maintained trajectories.")

## Evaluation and design insight

The KITTI experiments examine detection, tracking continuity and computational cost. Fusion and filtering ablations study the effect of adding image features, multiple motion models and parameter tuning.

DTFI illustrates a modular perception pipeline in which complementary sensors improve current observations and temporal models preserve information across frames. Its design connects spatial fusion with explicit trajectory management.
