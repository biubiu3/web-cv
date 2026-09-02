---
title: "From Surround Cameras to Production Geometry: Multi-Camera SfM for 4D Auto-Annotation"
date: "2024-06-20T00:00:00Z"
lastmod: "2026-09-02T00:00:00Z"
summary: "An applied industry–academia project with NETA Auto in which I owned the SfM scene-reconstruction subsystem: turning synchronized surround-camera data into refined poses, calibration, and sparse-to-dense geometry for a 4D vision auto-annotation pipeline."
featured: true
reading_time: false
share: true
tags:
  - Engineering Project
  - Industry Collaboration
  - Autonomous Driving
  - Structure from Motion
  - Multi-Camera Reconstruction
  - 3D Vision
image:
  caption: 'Six-view surround imagery is converted into a geometrically consistent road-scene reconstruction.'
  alt_text: 'Six surround-camera views beside a reconstructed urban point cloud.'
project:
  collaboration: 'NETA Auto industry–academia collaboration'
  period: '2023–2024'
  status: 'Production-applied'
  role: 'SfM scene-reconstruction subsystem'
  outputs: 'Refined vehicle poses and camera extrinsics; sparse and dense ground point clouds'
  context: 'A large 4D vision auto-annotation program spanning perception, localization, reconstruction, and map-element generation. My ownership was the SfM/static-reconstruction part and its handoff to downstream modules.'
project_videos:
  - src: 'headcam.mp4'
    poster: 'headcam-poster.jpg'
    title: 'Road-camera input'
    description: 'A representative front-camera stream from the synchronized driving sequence.'
  - src: 'pointcloud.mp4'
    poster: 'pointcloud-poster.jpg'
    title: 'Reconstructed point cloud'
    description: 'A moving inspection of the reconstructed static road scene and recovered structure.'
  - src: 'depth.mp4'
    poster: 'depth-poster.jpg'
    title: 'Estimated depth'
    description: 'The dense depth result used to move from sparse geometry toward a ground-surface point cloud.'
  - src: 'reproject.mp4'
    poster: 'reproject-poster.jpg'
    title: 'Image reprojection'
    description: 'Reprojected appearance provides an immediate visual check on pose and depth consistency.'
---

{{< project-overview >}}

This was not a research prototype built around a clean benchmark. It was one subsystem inside a larger, applied **4D vision auto-annotation project with NETA Auto**. The complete program connected semantic perception, vehicle localization, static reconstruction, road-surface reconstruction, and map-element generation. My responsibility was deliberately narrower and technically deep: I owned the **Structure-from-Motion (SfM) scene-reconstruction subsystem** and the geometry it delivered downstream.

The project later provided the engineering foundation for the [MRASfM research paper](../../publications/mrasfm/). The two pages therefore serve different purposes. The paper page explains the formal research method and public experiments; this page records the engineering case—interfaces, failure modes, implementation choices, acceptance evidence, and how the module operated inside a real production workflow.

## What the subsystem had to deliver

The reconstruction module received synchronized six-view surround images, multi-sensor localization, semantic masks, and initial camera intrinsics/extrinsics. It returned refined vehicle poses, updated inter-camera extrinsics, a sparse scene model, and a dense ground point cloud suitable for downstream road reconstruction.

That interface imposed several practical requirements at once:

- **metric scale had to survive reconstruction**, because downstream geometry could not use an arbitrary-scale model;
- **all cameras at a timestamp had to remain physically consistent**, even when an individual view lacked reliable matches;
- **moving traffic, sky, and the ego vehicle could not become static structure**;
- **road geometry had to be dense and clean enough for later surface reconstruction**; and
- **multiple traversals of the same intersection had to be assembled into one coordinate frame**.

{{< project-pipeline >}}

## Sparse reconstruction: use the vehicle as part of the model

### Association without brute force

The front end extracted SuperPoint features, but feature appearance alone was not trusted. Semantic masks first removed features on dynamic objects, sky, and the ego vehicle. Initial poses and intrinsics then estimated which views could physically overlap. Matching was limited by both time and rig topology: nearby timestamps were preferred, and adjacent cameras were only allowed to match inside their plausible overlap regions. A final two-view geometric check rejected appearance matches that did not support a consistent homography, essential matrix, or fundamental matrix.

{{< project-figure src="overlap-constrained-matching.png" alt="Feature matches before and after restricting an adjacent camera pair to its physically plausible overlap region." caption="Rig-aware overlap constraints remove many visually plausible but physically impossible cross-camera matches." >}}

This mattered in road scenes because different camera directions often contain repeated vehicles, lane markings, and building facades. An unconstrained matcher can confidently connect the wrong objects. The rig provides a strong prior for where a true correspondence is even possible.

### Register the synchronized rig, not six unrelated cameras

Initialization selected a well-supported image pair, then expanded the starting reconstruction to **15 timestamps × 6 cameras = 90 images** before the first triangulation and rig bundle adjustment. The larger initial baseline supplied more viewing angles and more observations per 3D point than a two-image start.

For later timestamps, candidate views were ranked by a minimum-uncertainty criterion combining 2D–3D connectivity with feature distribution. Well-conditioned cameras were registered robustly using P3P inside locally optimized RANSAC and EPnP for refinement. When another camera at the same timestamp had too few correspondences, its pose was inferred from the shared vehicle pose and the calibrated rig geometry rather than being allowed to fail independently.

If $T^{w}_{r_t}$ is the vehicle/rig pose at time $t$ and $T^{r}_{c_k}$ is camera $k$'s fixed transform inside the rig, then the camera pose is composed as

$$
T^{w}_{c_{t,k}} = T^{w}_{r_t}T^{r}_{c_k}.
$$

This factorization also shaped optimization. Instead of giving every synchronized image a free pose, rig bundle adjustment optimized time-varying rig poses, the inter-camera geometry, and 3D points through a robust reprojection objective:

$$
\min_{\{T^{w}_{r_t}\},\{T^{r}_{c_k}\},\{X_j\}}
\sum_{(t,k,j)\in\mathcal O}
\rho\!\left(\left\|\pi\!\left(K_k,T^{w}_{r_t}T^{r}_{c_k},X_j\right)-x_{t,k,j}\right\|_2^2\right).
$$

Triangulation required adequate parallax and positive depth. Points with large reprojection error, invalid cheirality, or implausible distance were removed before the next reconstruction cycle. The result was not merely a prettier cloud: it preserved the physical relationship among the vehicle, its cameras, and the recovered scene.

## Why localization priors changed the reconstruction

Without a pose prior, the early system produced streaking, duplicated surfaces, thick planes, and an unresolved scale. Supplying multi-sensor localization as an initialization anchored the reconstruction in metric space and made street furniture—lamp posts, traffic lights, signs, and building edges—substantially clearer.

{{< project-compare left="sparse-without-pose.png" right="sparse-with-pose.png" left_label="Without pose prior" right_label="With localization prior" left_alt="Noisy and distorted sparse reconstruction without localization initialization." right_alt="Cleaner urban reconstruction initialized by localization poses." caption="The localization prior supplies scale and a usable starting geometry; SfM then refines the camera trajectory and rig calibration." >}}

{{< project-figure src="slam-alignment.png" alt="SfM reconstruction overlaid with a blue lidar SLAM point cloud." caption="Overlay against the lidar-SLAM reference checks whether the visual reconstruction has retained scene scale and global shape." >}}

Semantic and radius-based filtering then removed dynamic-object structure and isolated spatial noise while preserving useful static objects.

{{< project-compare left="pointcloud-before-filtering.png" right="pointcloud-after-filtering.png" left_label="Before filtering" right_label="After filtering" left_alt="Sparse reconstruction with spatial noise and streaking." right_alt="Cleaned static reconstruction after semantic and radius filtering." caption="Filtering is part of the reconstruction contract: downstream road modeling needs stable static geometry, not every triangulated point." >}}

## Dense ground reconstruction under a runtime budget

Sparse SfM established poses and reliable anchors, but the road-surface module needed a denser ground representation. The implemented path combined **ACMP depth estimation** with **COLMAP point-cloud fusion**:

1. convert the sparse reconstruction into the depth estimator's input format;
2. select source views directly from temporal and overlap priors instead of recomputing expensive all-pair point-cloud overlap;
3. estimate depth at a reduced, calibration-consistent resolution with parallel GPU workers;
4. convert the depth output back to COLMAP's format and fuse it into a dense point cloud;
5. apply semantic ground masks, neighborhood filtering, and per-grid RANSAC plane filtering.

The acceptance record reports that prior-guided source-view selection reduced this stage from roughly **30 minutes to under 1 minute**, while replacing the original dense fusion path reduced fusion from roughly **40 minutes to 1.5 minutes** in that prototype environment. These are pipeline-specific engineering measurements, not hardware-independent speed claims.

{{< project-compare left="dense-colmap.png" right="dense-acmp.png" left_label="COLMAP dense result" right_label="ACMP + COLMAP fusion" left_alt="Dense point cloud from the original COLMAP route with missing weak-texture regions." right_alt="Denser road reconstruction from ACMP depth and COLMAP fusion." caption="The hybrid path recovers more weak-texture road structure while keeping a practical fusion stage." >}}

{{< project-figure src="ground-filtering.png" alt="Ground point cloud before and after grid-wise plane filtering." caption="Neighborhood filtering removes isolated points; grid-wise RANSAC suppresses thickness around the road surface before handoff." >}}

## Multiple runs, one intersection

A single drive rarely observes every corner of an intersection. For repeated traversals, each run was first reconstructed independently. Candidate cross-run image pairs were proposed from approximate GNSS proximity and forward-view overlap, then verified with visual features and geometry. One run served as the reference; PnP estimated an initial transform for the next run, and transformation-aware rig bundle adjustment refined that transform while preserving the internal geometry of each run.

At the multi-run level, pairwise connection scores formed a graph. Disconnected or badly initialized runs could be excluded, the most connected run became the central coordinate frame, and the remaining transformations were composed along the graph.

{{< project-compare left="multirun-before.png" right="multirun-after.png" left_label="Independent runs" right_label="After aggregation" left_alt="Multiple independently reconstructed runs are visibly misaligned at an intersection." right_alt="The same runs aligned into a shared intersection coordinate frame." caption="Cross-run association and transform refinement turn several partial traversals into one consistent scene." >}}

## Validation: what the evidence actually supports

The project used lidar-SLAM geometry as an external reference and checked several distinct aspects of the output.

### Dense depth

Projecting both the dense visual reconstruction and lidar points into the front camera yielded a reported **mean depth error of 4.7695%**, below the project's **8% acceptance threshold**.

{{< project-figure src="dense-depth-check.png" alt="Dense visual point cloud projected into a front camera and colored by depth difference to lidar." caption="Depth-error visualization against lidar: the acceptance report records 4.7695% mean error for this evaluation." >}}

### Vehicle trajectory

The acceptance table compared the rig mapper with the incoming dead-reckoning/localization result on three anonymized sequences. A value closer to 100% is better for trajectory-length ratio; lower is better for both RMSE columns.

| Sequence | Method | Length ratio | Translation RMSE (m/100 m) | Angle RMSE (°/100 m) |
|---|---|---:|---:|---:|
| A | Rig mapper | **98.9%** | **1.47** | **0.264** |
| A | Input DR | 98.5% | 1.52 | 0.785 |
| B | Rig mapper | **99.2%** | 1.59 | **0.315** |
| B | Input DR | 98.8% | **1.31** | 1.05 |
| C | Rig mapper | **98.6%** | 1.84 | **0.579** |
| C | Input DR | 98.5% | **1.68** | 1.53 |

The honest reading is mixed: rig-aware SfM improved trajectory-length agreement and angular RMSE on all three sequences, while translation RMSE improved on one of three. The project also reported centimeter-level differences in selected physical-distance spot checks over roughly ten-meter horizontal spans; that is a limited check, not a blanket centimeter-accuracy claim for every scene.

### Calibration consistency

When the refined inter-camera extrinsics were projected into bird's-eye view, lane boundaries became more continuous across camera seams. This was a direct systems check: a calibration improvement should be visible where adjacent camera views meet.

{{< project-figure src="bev-extrinsic-comparison.png" alt="Bird's-eye-view projection before and after refining inter-camera extrinsics." caption="Before/after BEV projection: improved continuity across camera boundaries provides a qualitative calibration check." >}}

## Watch the reconstruction outputs

The clips below connect the sensor stream to the intermediate and final geometry. They are loaded only when requested so the page remains usable on slower connections.

{{< project-video-gallery >}}

## What made this an engineering project

The central challenge was not inventing one isolated algorithm. It was deciding where to trust upstream priors, where to re-estimate them, how to preserve rigid hardware constraints, and what representation downstream teams could actually consume. A robust subsystem needed explicit fallbacks for weak views, bounded matching rather than uncontrolled pair growth, geometric and semantic rejection, runtime-aware dense reconstruction, and validation at every interface.

That experience subsequently informed the research abstraction in MRASfM. The [paper page](../../publications/mrasfm/) focuses on the general multi-camera reconstruction and aggregation method; this engineering page focuses on ownership, integration, delivery constraints, and the evidence used to decide that the subsystem was useful in practice.

> **Disclosure scope.** This public case study retains only the material needed to explain the technical work. Commercial terms, personnel details, internal paths, and nonessential delivery information are intentionally omitted.
