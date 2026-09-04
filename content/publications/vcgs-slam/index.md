---
title: "Voxelized 3D Gaussian Representation for Dense Visual SLAM on Embedded Vision System"
authors:
  - Tianchen Deng
  - me
  - Shuhong Liu
  - Wenhua Wu
  - Jianfei Yang
  - Shenghai Yuan
  - Jiuming Liu
  - Zhe Liu
  - Danwei Wang
  - Hesheng Wang
date: "2026-05-13T00:00:00Z"
publication_types: ["article-journal"]
publication:
  name: "International Journal of Computer Vision"
  short_name: "IJCV"
venue_display: "International Journal of Computer Vision (IJCV)"
publication_status: "Accepted"
publication_status_key: "accepted"
display_area: "Dense Visual SLAM"
publication_order: 35
peer_reviewed: true
open_access: true
abstract: "This work develops a compact 3D Gaussian dense visual SLAM system for embedded deployment. Voxel-anchored Gaussians control map growth, a learnable sliding-window mask removes redundant primitives during online mapping, residual codebook quantization compresses anchor attributes, and local-to-global bundle adjustment with an ICP loss improves camera tracking. Experiments cover Replica, ScanNet, TUM RGB-D, embedded hardware, and a multisensor mobile-robot dataset."
summary: "Compact dense visual SLAM with voxel-anchored Gaussians, online pruning, residual quantization, and embedded deployment."
story_order: 25
homepage_order: 40
topic_keywords:
  - 3D Gaussian Splatting
  - Dense Visual SLAM
  - Embedded Vision
  - Neural Rendering
  - Model Compression
  - Robot Mapping
tags:
  - IJCV 2026
  - Perception & Geometry
  - 3D Gaussian Splatting
  - Dense Visual SLAM
  - Embedded Vision
  - Model Compression
  - Computer Vision
featured: false
image:
  caption: 'Research overview: voxel anchors, online masking, residual codebooks, and global geometric refinement turn an RGB-D stream into a compact dense map for embedded deployment.'
  alt_text: 'White VCGS-SLAM graphical abstract with an RGB-D sequence, voxel-anchored Gaussian map, non-crossing branches for sliding-window masking and residual codebook quantization, a local-to-global bundle-adjustment tracking lane, and compact embedded deployment.'
hugoblox:
  ids:
    arxiv: 2403.11247v3
links:
  - type: code
    url: https://github.com/dtc111111/VCGS-SLAM
---

## At a glance

| Question | VCGS-SLAM's answer |
|---|---|
| Why are Gaussian SLAM maps expensive? | Online sequential optimization produces many geometrically similar or redundant Gaussian primitives |
| How is map growth controlled? | Voxel anchors organize new Gaussians, while a learnable sliding-window mask prunes low-value primitives online |
| How are attributes compressed? | Residual vector quantization stores compact codebook indices for repeated anchor geometry |
| How is tracking stabilized? | A global keyframe database supports local-to-global bundle adjustment with RGB, depth, silhouette, and ICP terms |
| Where is the system evaluated? | Replica, ScanNet, TUM RGB-D, embedded compute, and a multisensor mobile-robot dataset |

This work, accepted by the **International Journal of Computer Vision (IJCV) in 2026**, studies a practical bottleneck in dense neural SLAM: a high-fidelity map can become too large and slow for an embedded robot. The system keeps the explicit rendering speed of 3D Gaussian Splatting while controlling map growth, compressing repeated geometric attributes, and retaining a global geometric correction path for camera tracking.

## Redundancy created by online SLAM

3D Gaussian Splatting represents a scene with ellipsoidal primitives whose covariance encodes orientation and scale. Dense Gaussian SLAM adds and optimizes these primitives as RGB-D frames arrive. This sequential regime and its selective keyframe updates differ from the global optimization used by the original offline 3DGS formulation. The paper measures covariance similarity with a normalized KL-divergence analysis and finds a much tighter concentration for several Gaussian SLAM systems.

The practical effect is visible in the reconstructed map. Many primitives can be removed while preserving the rendered scene, reducing both rasterization work and checkpoint size.

![The compact representation uses substantially fewer Gaussian points while retaining comparable visual reconstruction.](compact-representation.jpg "Paper result: fewer 3D Gaussian points preserve the reconstructed RGB appearance while improving rendering speed and storage use.")

## Two coupled threads: mapping and tracking

The input is a sequence of RGB-D frames $\{I_i,D_i\}_{i=1}^{M}$ with camera intrinsics $K$. The mapping thread incrementally constructs a voxel-anchored Gaussian map, applies an online mask, and quantizes repeated attributes. The tracking thread estimates camera poses and periodically revisits a larger keyframe set for global consistency.

![The full system couples compact Gaussian mapping with local-to-global camera tracking.](system-pipeline.png "Paper pipeline: RGB-D input feeds voxelized Gaussian mapping, sliding-window masking, residual quantization, and global bundle adjustment with ICP.")

This separation matters on a robot. Mapping must absorb newly observed surfaces without allowing the representation to grow indefinitely; tracking must still use enough historical evidence to limit accumulated pose error.

## Voxel-anchored Gaussian representation

Each incoming depth map produces a point cloud that is voxelized into centers $\mathbf{x}^{a}$. An anchor stores a learned feature $\mathbf{f}^{a}$, a scale vector $\mathbf{l}$, and offsets $\mathcal{O}$. The associated Gaussian centers are generated by

$$
\{\boldsymbol{\mu}_i\}_{i=0}^{k-1}
=\mathbf{x}^{a}+\{\mathcal{O}_i\}_{i=0}^{k-1}\cdot\mathbf{l}.
$$

Opacity, rotation, scale, and color are decoded from the anchor feature together with viewing distance and direction. New anchors are added in newly observed or poorly reconstructed regions. A multi-resolution growing rule uses accumulated Gaussian gradients to allocate capacity where it improves the scene instead of spreading primitives uniformly.

## Online masking follows the camera window

Offline pruning can inspect a complete training set. An operating SLAM system sees only the past and present, so its pruning mechanism must move with the camera. VCGS-SLAM assigns a learnable mask to Gaussians inside a local window composed of the current frame and overlapping keyframes. Frustum selection restricts optimization to visible primitives, while window resets prevent mask gradients from accumulating until useful geometry disappears.

The binary mask modulates both Gaussian scale and opacity. Pruning decisions therefore reflect primitive volume, visibility, and contribution to recent views. In the reported sequence, the mask yields a **1.97× reduction in Gaussian count** while maintaining reconstruction quality.

![The local mask prunes redundant Gaussians inside the active camera window and resets as the window moves.](sliding-window-mask.jpg "Paper result: sliding-window masking controls online Gaussian growth and reduces the primitive count by 1.97 times in the illustrated sequence.")

## Residual codebooks compress repeated geometry

The covariance analysis indicates that many Gaussian shapes share similar scale and offset values. Residual vector quantization exploits that structure. The first codebook approximates an attribute vector; each later stage encodes the remaining residual:

$$
\hat{\mathbf{l}}_n^{(L)}
=\sum_{k=1}^{L}\mathcal{C}^{k}\!\left[i_n^{k}\right].
$$

The map then stores small indices plus shared codebooks instead of a full independent vector for every anchor. The reported configuration uses a codebook size of 64 and six residual stages, balancing compactness against reconstruction fidelity.

![Residual quantization progressively represents scale and offset attributes with shared codebooks.](residual-codebook.jpg "Paper method: each codebook stage approximates the residual left by the previous stage.")

## Local-to-global bundle adjustment with ICP

Camera tracking minimizes color and depth reconstruction losses over visible pixels. An ICP term links Gaussian centers to nearby geometry, strengthening spatial alignment when photometric evidence alone is fragile. A sparse global keyframe database then supplies historical rays for joint refinement of the map and camera poses. This local-to-global schedule targets drift on longer trajectories without optimizing every past frame at every step.

## Reconstruction, speed, and memory

The study evaluates camera tracking, rendering quality, surface reconstruction, runtime, and storage across Replica, ScanNet, and TUM RGB-D. It also integrates the compact representation with existing Gaussian SLAM baselines.

| Replica configuration | Render FPS $\uparrow$ | Checkpoint memory $\downarrow$ |
|---|---:|---:|
| SplaTAM | 175.64 | 273.09 MB |
| SplaTAM + compact modules | **398.45** | **117.36 MB** |
| MonoGS | 317.45 | 84.41 MB |
| MonoGS + compact modules | **447.29** | **73.31 MB** |
| Gaussian-SLAM | 321.39 | 101.48 MB |
| Gaussian-SLAM + compact modules | **458.53** | **96.03 MB** |

These results show that the compact representation can act as a reusable systems component. The paper reports up to a 226% rendering-speed increase and more than 2.21× memory compression while preserving competitive reconstruction quality.

![Replica comparisons show the rendered quality and speed of neural implicit and Gaussian SLAM systems.](replica-rendering.jpg "Paper comparison on Replica: the compact Gaussian system retains sharp reconstruction while increasing rendering throughput.")

## Embedded validation and collected robot data

The system is tested on Jetson and laptop-class embedded platforms. The authors also collect indoor and outdoor sequences with mobile robots carrying RGB-D cameras, IMUs, and Livox LiDAR sensors. This evaluation connects compact representation design to the compute and sensing constraints encountered by deployed robots.

![Mobile platforms used to collect multisensor neural-SLAM sequences.](mobile-platforms.jpg "Paper hardware: mobile robots equipped with RGB-D cameras, IMUs, and LiDAR sensors.")

![Real-time Gaussian mapping running on an embedded platform.](embedded-demo.jpg "Paper deployment: a live dense Gaussian reconstruction is rendered from an RGB-D stream on embedded compute.")

## Scope and current limitations

The system assumes RGB-D input and known camera intrinsics. Fast camera motion can blur both color and depth observations, weakening the tracking losses. Highly dynamic scenes can also introduce artifacts and drift because the map is optimized as a mostly static representation. These cases motivate motion-aware observations and explicit dynamic-scene modeling in future versions.
