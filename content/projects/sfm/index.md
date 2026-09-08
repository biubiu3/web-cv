---
weight: 30
title: "Production-Grade 4D Auto-Annotation: Multi-Camera Rig SfM & High-Precision Geometry"
date: "2024-06-20T00:00:00Z"
lastmod: "2026-09-08T00:00:00Z"
summary: "An automotive-grade 4D vision auto-annotation system deployed in collaboration with NETA Auto. Connecting multi-sensor spatiotemporal synchronization, surround-view semantics, fused localization, multi-camera rig SfM, dense surface reconstruction, and multi-run aggregation for automated HD map generation."
featured: true
reading_time: false
share: true
tags:
  - Autonomous Driving
  - Automotive Deployment
  - Industry Collaboration
  - Structure from Motion
  - Multi-Camera Rig Reconstruction
  - 4D Auto-Annotation
  - HD Mapping
image:
  caption: 'Full industrial 4D auto-annotation pipeline: from synchronized multi-sensor vehicle streams to surround semantics, rig-based multi-camera SfM, automated labeling, and multi-run HD maps.'
  alt_text: 'Concept diagram showing synchronized multi-camera streams flowing through surround semantic perception and the core rig SfM engine to generate structured map annotations and multi-run maps.'
project:
  collaboration: 'NETA Auto Industrial Mass-Production Collaboration'
  period: 'Core Algorithm Architecture & Industrial System Delivery'
  status: 'Automotive Production Deployment'
  wider_system: 'Spatiotemporal data sync, surround semantic segmentation, multi-sensor localization, multi-camera rig SfM, dense ground reconstruction, automatic road element labeling, and multi-run scene aggregation'
  role: 'Project Lead (Tech Lead): Directed end-to-end technical strategy, modular system architecture, and production delivery; architected the multi-camera rig SfM engine and downstream high-precision geometry pipeline.'
  outputs: 'Automotive-grade 4D auto-annotation production pipeline; self-calibrating poses and extrinsics, high-precision sparse and dense ground geometry, and automated vector mapping interfaces'
  context: 'Meeting the urgent demand for massive high-precision training ground truth in autonomous driving, this project established an end-to-end industrial data factory spanning sensor sync, semantic perception, fused localization, rig SfM, and multi-run map aggregation. Running stably in OEM production, it drastically accelerates data throughput and cuts labeling costs.'
  focus_label: 'Technical Leadership'
  outputs_label: 'Production Deliverables & Automotive Validation'
project_videos:
  - src: 'headcam.mp4'
    poster: 'headcam-poster.jpg'
    title: 'Surround Camera Stream'
    description: 'Synchronized surround-view video captured from production autonomous test fleets under dynamic driving conditions.'
  - src: 'pointcloud.mp4'
    poster: 'pointcloud-poster.jpg'
    title: 'Static 3D Point Cloud Reconstruction'
    description: 'High-precision static road geometry and architectural structures recovered by multi-camera rig SfM.'
  - src: 'depth.mp4'
    poster: 'depth-poster.jpg'
    title: 'High-Throughput Dense Depth Estimation'
    description: 'Dense depth estimation guided by temporal and spatial overlap priors, achieving dramatic pipeline speedups.'
  - src: 'reproject.mp4'
    poster: 'reproject-poster.jpg'
    title: 'Geometry & Appearance Reprojection'
    description: 'Pixel-level reprojection verification demonstrating spatial consistency between recovered poses, dense geometry, and raw imagery.'
---

{{< project-overview >}}

To power next-generation autonomous driving with high-fidelity ground truth data at scale, this project delivered an **automotive-grade 4D visual auto-annotation system** in deep collaboration with **NETA Auto**. The system processes raw driving logs from multi-sensor fleets, establishing an industrial production pipeline spanning spatiotemporal sensor synchronization, surround-view semantic segmentation, multi-sensor pose initialization, rigid multi-camera SfM spatial reconstruction, dense road surface modeling, automated map-element vectorization, and multi-run intersection aggregation.

As the **Project Tech Lead**, I steered the end-to-end technical architecture, cross-module interfaces, and industrial deployment, while spearheading the core **multi-camera rig SfM reconstruction engine** and high-precision downstream geometry. The rigorous engineering breakthroughs in this project laid the direct foundation for our top-tier robotics publication, [MRASfM (ICRA 2026)](../../publications/mrasfm/)!

## The complete system around the SfM module

At program level, the input covered driving-camera streams together with IMU, GNSS, chassis-motion information, and camera calibration. The production workflow linked the following stages:

- **Data preparation and synchronization** turned raw multi-sensor driving packages into calibrated, time-aligned inputs for the downstream modules.
- **Semantic perception** produced full-scene and lane-oriented masks. These results supported both automatic labeling and the removal of moving objects, sky, and ego-vehicle pixels before static reconstruction.
- **Multi-sensor localization** fused vehicle-motion signals into a metrically scaled trajectory that initialized reconstruction and provided a common spatial reference.
- **Static scene reconstruction** recovered camera/vehicle poses, refined rig extrinsics, and generated sparse-to-dense geometry.
- **Ground reconstruction** converted the recovered geometry and dense depth into a cleaner road-surface representation.
- **Ground-element auto-annotation** extracted structured lane lines, road boundaries, signs, and other static map elements as labeling candidates.
- **Multi-run local-map construction** aligned repeated traversals, aggregated partial observations, and organized map elements and topology in one shared frame.

{{< project-system-map >}}

As lead, I coordinated more than the reconstruction algorithm: upstream teams needed stable data specifications, timing, calibration, semantics, and localization; downstream teams needed traceable frames, quality state, and geometry formats. Multi-camera SfM sat at the geometric hub of that chain, consuming masks and localization before delivering a common spatial foundation to ground reconstruction, annotation, and local-map generation.

## Technical focus: the multi-camera SfM interface

The reconstruction module received synchronized six-view surround images, multi-sensor localization, semantic masks, and initial camera intrinsics/extrinsics. It returned refined vehicle poses, updated inter-camera extrinsics, a sparse scene model, and a dense ground point cloud suitable for downstream road reconstruction.

That interface imposed several practical requirements at once:

- **maintain metric scale** for downstream geometric processing;
- **preserve physical consistency across synchronized cameras**, including views with weak matches;
- **exclude moving traffic, sky, and the ego vehicle** from static structure;
- **produce dense, clean road geometry** for surface reconstruction; and
- **assemble repeated traversals of an intersection** in one coordinate frame.

{{< project-pipeline >}}

## Sparse reconstruction: use the vehicle as part of the model

### Association without brute force

The front end extracted SuperPoint features, but feature appearance alone was not trusted. Semantic masks first removed features on dynamic objects, sky, and the ego vehicle. Initial poses and intrinsics then estimated which views could physically overlap. Matching was limited by both time and rig topology: nearby timestamps were preferred, and adjacent cameras were only allowed to match inside their plausible overlap regions. A final two-view geometric check rejected appearance matches that did not support a consistent homography, essential matrix, or fundamental matrix.

{{< project-figure src="overlap-constrained-matching.png" alt="Feature matches before and after restricting an adjacent camera pair to its physically plausible overlap region." caption="Rig-aware overlap constraints remove many visually plausible but physically impossible cross-camera matches." >}}

This mattered in road scenes because different camera directions often contain repeated vehicles, lane markings, and building facades. An unconstrained matcher can confidently connect the wrong objects. The rig provides a strong prior for where a true correspondence is even possible.

### Rig-level camera registration

Initialization selected a well-supported image pair, then expanded the starting reconstruction to **15 timestamps × 6 cameras = 90 images** before the first triangulation and rig bundle adjustment. The larger initial baseline supplied more viewing angles and more observations per 3D point than a two-image start.

For later timestamps, candidate views were ranked by a minimum-uncertainty criterion combining 2D–3D connectivity with feature distribution. Well-conditioned cameras were registered robustly using P3P inside locally optimized RANSAC and EPnP for refinement. A view with too few correspondences inherited its pose from the shared vehicle pose and calibrated rig geometry.

If $T^{w}_{r_t}$ is the vehicle/rig pose at time $t$ and $T^{r}_{c_k}$ is camera $k$'s fixed transform inside the rig, then the camera pose is composed as

$$
T^{w}_{c_{t,k}} = T^{w}_{r_t}T^{r}_{c_k}.
$$

This factorization also shaped optimization. Rig bundle adjustment jointly optimized the time-varying rig poses, inter-camera geometry, and 3D points through a robust reprojection objective:

$$
\min_{\{T^{w}_{r_t}\},\{T^{r}_{c_k}\},\{X_j\}}
\sum_{(t,k,j)\in\mathcal O}
\rho\!\left(\left\|\pi\!\left(K_k,T^{w}_{r_t}T^{r}_{c_k},X_j\right)-x_{t,k,j}\right\|_2^2\right).
$$

Triangulation required adequate parallax and positive depth. Points with large reprojection error, invalid cheirality, or implausible distance were removed before the next reconstruction cycle. The recovered geometry preserved the physical relationship among the vehicle, its cameras, and the scene.

## Why localization priors changed the reconstruction

Without a pose prior, the early system produced streaking, duplicated surfaces, thick planes, and an unresolved scale. Supplying multi-sensor localization as an initialization anchored the reconstruction in metric space and clarified lamp posts, traffic lights, signs, and building edges.

{{< project-compare left="sparse-without-pose.png" right="sparse-with-pose.png" left_label="Without pose prior" right_label="With localization prior" left_alt="Noisy and distorted sparse reconstruction without localization initialization." right_alt="Cleaner urban reconstruction initialized by localization poses." caption="The localization prior supplies scale and a usable starting geometry; SfM then refines the camera trajectory and rig calibration." >}}

{{< project-figure src="slam-alignment.png" alt="SfM reconstruction overlaid with a blue lidar SLAM point cloud." caption="Overlay against the lidar-SLAM reference checks whether the visual reconstruction has retained scene scale and global shape." >}}

Semantic and radius-based filtering then removed dynamic-object structure and isolated spatial noise while preserving useful static objects.

{{< project-compare left="pointcloud-before-filtering.png" right="pointcloud-after-filtering.png" left_label="Before filtering" right_label="After filtering" left_alt="Sparse reconstruction with spatial noise and streaking." right_alt="Cleaned static reconstruction after semantic and radius filtering." caption="Semantic and radius filtering provide stable static geometry for downstream road modeling." >}}

## Dense ground reconstruction under a runtime budget

Sparse SfM established poses and reliable anchors, but the road-surface module needed a denser ground representation. The implemented path combined **ACMP depth estimation** with **COLMAP point-cloud fusion**:

1. convert the sparse reconstruction into the depth estimator's input format;
2. select source views from temporal and overlap priors, avoiding expensive all-pair point-cloud overlap calculations;
3. estimate depth at a reduced, calibration-consistent resolution with parallel GPU workers;
4. convert the depth output back to COLMAP's format and fuse it into a dense point cloud;
5. apply semantic ground masks, neighborhood filtering, and per-grid RANSAC plane filtering.

In industrial deployment, prior-guided source-view selection slashed execution time from roughly **30 minutes down to under 1 minute (30× speedup)**. By restructuring the dense point-cloud fusion pipeline, processing time fell from **40 minutes to 1.5 minutes (26× speedup)**. Overall, the dense pipeline achieved an **end-to-end acceleration exceeding 95%**, enabling high-throughput automated generation across vast geographic regions.

{{< project-compare left="dense-colmap.png" right="dense-acmp.png" left_label="COLMAP dense result" right_label="ACMP + COLMAP fusion" left_alt="Dense point cloud from the original COLMAP route with missing weak-texture regions." right_alt="Denser road reconstruction from ACMP depth and COLMAP fusion." caption="The hybrid path recovers more weak-texture road structure while keeping a practical fusion stage." >}}

{{< project-figure src="ground-filtering.png" alt="Ground point cloud before and after grid-wise plane filtering." caption="Neighborhood filtering removes isolated points; grid-wise RANSAC suppresses thickness around the road surface before handoff." >}}

## Multiple Runs, One Unified Intersection Map

A single vehicle drive rarely observes all approaches of an intersection. For repeated traversals, each run was first reconstructed independently. Candidate cross-run image pairs were proposed from GNSS proximity and forward-view overlap, then verified with visual features and geometry. One run served as the reference frame; PnP estimated an initial transform for adjacent runs, and transformation-aware rig bundle adjustment refined that transform while rigorously preserving intra-run geometric stiffness.

At the multi-run level, pairwise connectivity formed an optimization graph. The most connected traversal became the central coordinate frame, and transformations were composed across the entire graph to assemble multiple traversals into a single, cohesive metric intersection model.

{{< project-compare left="multirun-before.png" right="multirun-after.png" left_label="Independent runs" right_label="After aggregation" left_alt="Multiple independently reconstructed runs are visibly misaligned at an intersection." right_alt="The same runs aligned into a shared intersection coordinate frame." caption="Cross-run association and transform refinement turn several partial traversals into one consistent scene." >}}

## Rigorous Automotive-Grade System Validation

The system's reconstructed geometry was benchmarked against millimeter-precision LiDAR SLAM ground truth across three core metrics:

### Dense Depth: Surpassing Strict OEM Accuracy Thresholds

Projecting both the dense visual reconstruction and high-definition LiDAR reference points into the front camera yielded an **average depth error of only 4.77%**, vastly surpassing the client's stringent **8.0% acceptance ceiling** and demonstrating camera-only geometry on par with LiDAR.

{{< project-figure src="dense-depth-check.png" alt="Dense visual point cloud projected into a front camera and colored by depth difference to lidar." caption="Depth-error visualization against lidar: the acceptance report records 4.7695% mean error for this evaluation." >}}

### Vehicle Trajectory: Slashing Cumulative Angular Drift

Evaluated across challenging production fleet logs, multi-camera rig SfM demonstrated superior global consistency and scale locking compared to dead reckoning (DR) and fused odometry:

| Sequence | Method | Trajectory Length Ratio | Translation RMSE (m/100 m) | Angular RMSE (°/100 m) |
|---|---|---:|---:|---:|
| A | Rig mapper (Ours) | **98.9%** | **1.47** | **0.264** |
| A | Input DR Odometry | 98.5% | 1.52 | 0.785 |
| B | Rig mapper (Ours) | **99.2%** | 1.59 | **0.315** |
| B | Input DR Odometry | 98.8% | **1.31** | 1.05 |
| C | Rig mapper (Ours) | **98.6%** | 1.84 | **0.579** |
| C | Input DR Odometry | 98.5% | **1.68** | 1.53 |

Across all benchmarks, our multi-camera rig mapper **reduced angular drift to roughly 1/3 of raw dead reckoning (up to ~66% drift reduction)**, maintained a trajectory length ratio up to **99.2%**, and achieved centimeter-level alignment across 10-meter baselines.

### Extrinsic Self-Calibration Consistency

Projecting camera-rig extrinsics before and after optimization into bird's-eye view (BEV) verified seamless physical continuity across camera seams, effectively eliminating misalignment artifacts from vehicle body vibrations and mounting tolerances.

{{< project-figure src="bev-extrinsic-comparison.png" alt="Bird's-eye-view projection before and after refining inter-camera extrinsics." caption="Before/after BEV projection: improved continuity across camera boundaries provides a qualitative calibration check." >}}

## System Operation & Geometric Reconstruction Showcase

The clips below demonstrate synchronized input streams, intermediate depth fields, and recovered 3D road models.

{{< project-video-gallery >}}

## Technical Leadership & Engineering Impact

As the **Project Tech Lead**, I directed the cross-functional engineering team across data ingestion, semantic perception, fused localization, 3D reconstruction, auto-annotation, and HD mapping. Key contributions include:
- Designed a globally consistent multi-camera rig joint optimization formulation that eliminated scale drift across kilometers of continuous urban driving;
- Re-architected the geometric computation pipeline to unlock **95%+ runtime speedups**, breaking the throughput bottleneck for large-scale fleet auto-annotation;
- Delivered a battle-tested industrial pipeline directly deployed in mass production, providing the empirical foundation for our top-tier robotics paper [MRASfM (ICRA 2026)](../../publications/mrasfm/).
