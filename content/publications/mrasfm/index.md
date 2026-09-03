---
title: "MRASfM: Multi-Camera Reconstruction and Aggregation through Structure-from-Motion in Driving Scenes"
authors:
  - me
  - Lingfeng Xuan
  - Yiqing Xu
  - Zhe Liu
  - Yanzi Miao
  - Hesheng Wang
author_notes:
  - "Equal contribution"
  - "Equal contribution"
date: "2026-06-01T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE International Conference on Robotics and Automation"
  short_name: "ICRA"
venue_display: "IEEE International Conference on Robotics and Automation (ICRA 2026)"
display_area: "Robot Perception & Reconstruction"
publication_order: 30
peer_reviewed: true
open_access: true
abstract: "MRASfM adapts structure-from-motion to multi-camera driving systems by exploiting fixed inter-camera geometry during registration. It removes unreliable road-surface points with a plane model, treats the camera set as a unit during bundle adjustment, and aggregates multiple scenes through coarse-to-fine association and assembly."
summary: "A multi-camera structure-from-motion framework for reliable and efficient reconstruction and scene aggregation in driving environments."
story_order: 30
tags:
  - ICRA 2026
  - Perception & Geometry
  - Structure from Motion
  - Multi-Camera Reconstruction
  - Autonomous Driving
  - Computer Vision
featured: false
image:
  caption: 'Research overview: a rigid surround-camera set, road filtering, camera-set BA, and cross-session alignment produce one coherent 3D map.'
  alt_text: 'White cartographic MRASfM infographic showing a six-camera driving rig, fixed inter-camera geometry, road-plane filtering, camera-set bundle adjustment, two driving sessions, and their assembled 3D street map.'
links:
  - type: preprint
    provider: arxiv
    id: 2510.15467v1
---

## At a glance

| Challenge | MRASfM mechanism |
|---|---|
| Many synchronized cameras | Register the calibrated camera set as one rigid unit |
| Weak road texture and shadows | Semantic-aided plane filtering during triangulation |
| Too many bundle-adjustment variables | Optimize vehicle poses plus fixed inter-camera relationships |
| Multiple driving sessions | GNSS-assisted association and coarse-to-fine scene aggregation |

Structure from Motion (SfM) is usually introduced with a moving monocular camera and a mostly static scene. A surround-view driving rig breaks that simple picture. Several cameras observe different directions at once; road surfaces produce unstable low-texture matches; and a city-scale model may require combining runs collected at different times. Treating every image as an unrelated camera discards one of the strongest pieces of information in the system: the cameras are bolted to the same vehicle.

MRASfM makes this physical fact a first-class optimization constraint.

## From individual cameras to a rigid camera set

Classical SfM seeks camera parameters and 3D points that minimize reprojection error. For point $X_j$ observed in camera $i$,

$$
x'_{ij}=\pi(K_i,R_i,t_i,X_j),
$$

where $K_i$, $R_i$, and $t_i$ denote intrinsics and pose. In a calibrated multi-camera rig, however, the relative transform between cameras is fixed. MRASfM therefore separates the time-varying vehicle or camera-set pose from the static internal geometry of the rig.

The correspondence stage detects SuperPoint features, uses overlap priors to avoid impossible camera pairs, matches with SuperGlue, rejects semantically incompatible pairs, and applies geometric verification. Reliable views are first registered with PnP; robust local rotation and translation averaging then estimates the camera-set pose and infers the remaining cameras from calibration.

![Reliable views determine the camera-set pose; fixed rig geometry registers the rest.](camera-set-registration.jpg "Camera-set registration shares evidence across synchronized, calibrated cameras.")

This is especially useful when one camera looks at a textureless road or experiences motion blur. That camera no longer needs to establish a full independent pose from weak evidence: the better-conditioned views can carry the rigid unit.

## Semantic-aided triangulation

Road surfaces occupy a large image area but often contain repetitive texture, cast shadows, and reflections. Matches on those regions can create plausible yet geometrically destructive 3D points. MRASfM fits a road-plane model with LO-RANSAC and combines it with semantic road labels to remove inconsistent triangulations. The goal is not to erase the road; it is to prevent low-confidence road appearance from dominating structure.

![Semantic labels and a robust road-plane model reject unstable structure.](road-filtering.jpg "Road-surface filtering removes shadow and low-texture outliers before optimization.")

## Camera-set bundle adjustment

If $k$ synchronized frames are captured by an $n$-camera rig, naive bundle adjustment may optimize roughly $kn$ camera poses. Camera-set bundle adjustment (CSBA) instead optimizes $k$ unit poses together with the $n$ fixed relative camera transformations. Both local and global stages use a Cauchy robust loss on reprojection residuals.

![Bundle adjustment factors the trajectory pose from fixed inter-camera geometry.](camera-set-ba.jpg "CSBA reduces redundant variables and preserves calibrated rig structure.")

This factorization improves both stability and efficiency: multiple views constrain a shared platform pose, while the optimizer does not repeatedly relearn the same physical rig at every time step.

## Aggregating multiple scenes

A single run rarely covers a complete driving environment. MRASfM uses GNSS to propose cross-session associations, hierarchical spatial partitioning to search plausible overlaps, and a coarse transform to bring reconstructions into a common frame. Relocalization adds verified visual constraints; transformation-based CSBA then refines the assembly iteratively.

![Independent journeys are associated, transformed, and jointly refined.](multi-scene-aggregation.jpg "Coarse-to-fine aggregation builds a larger reconstruction from separate sessions.")

## Experiments

The real data use six- or seven-camera surround rigs recording $1920\times1080$ video at 30 Hz, with driving speeds from 10 to 60 km/h. Runtime is reported on a 3.4 GHz CPU. Qualitative models show roads, buildings, and street furniture reconstructed across wide fields of view.

![A large-scale reconstruction produced from the multi-camera driving rig.](real-reconstruction.jpg "Representative real-scene reconstruction and detail views.")

### KITTI sequences 00–10

The full study evaluates all 11 KITTI odometry sequences. Selected rows illustrate the accuracy/runtime trade-off against MCSfM:

| Sequence | Method | Rotation RMSE $\downarrow$ | Translation RMSE $\downarrow$ | Time $\downarrow$ |
|---:|---|---:|---:|---:|
| 00 | MCSfM | **$0.3^\circ$** | 0.5 m | 286 min |
| 00 | MRASfM | $0.5^\circ$ | **0.3 m** | **192 min** |
| 01 | MCSfM | $0.4^\circ$ | 1.0 m | 47 min |
| 01 | MRASfM | **$0.2^\circ$** | **0.6 m** | **34 min** |
| 08 | MCSfM | $0.4^\circ$ | 1.2 m | 276 min |
| 08 | MRASfM | **$0.3^\circ$** | **0.5 m** | **188 min** |

The selected sequence 00 row is deliberately not simplified into “wins every metric”: MCSfM has the lower rotation error there, while MRASfM improves translation and runtime. The broader benefit is consistent structured optimization, not a claim that every scalar must be best on every route.

### nuScenes comparison

On nuScenes, translation RMSE is 0.124 for MRASfM, compared with 0.134 for MGSfM, 0.140 for OCCVO, 0.158 for GLOMAP, 0.199 for ORB-SLAM, and 0.282 for DROID-SLAM.

### Component ablation

Sequence 00 exposes the cost of discarding the rig structure:

| Configuration | Rotation RMSE | Translation RMSE | Runtime |
|---|---:|---:|---:|
| Without CSBA | $1.8^\circ$ | 2.7 m | 8,720 min |
| Without camera-set registration | $0.6^\circ$ | 0.4 m | 203 min |
| Without semantic triangulation | $0.6^\circ$ | 0.3 m | 197 min |
| Full MRASfM | **$0.5^\circ$** | **0.3 m** | **192 min** |

CSBA is responsible for the largest change: removing it creates many redundant variables, substantially increasing both error and computation. Registration and semantic filtering provide smaller, complementary gains.

## Assumptions and limits

MRASfM benefits from a calibrated, mechanically stable rig; if the camera relationships drift, the structural prior can become wrong rather than helpful. Multi-session association uses GNSS for initialization, so operation without any global positioning cue requires another coarse retrieval mechanism. Like other SfM systems, it also assumes sufficient static visual structure and can struggle with dynamic traffic, severe illumination change, or long textureless segments.

Within those assumptions, the work demonstrates a general systems lesson: geometry should reflect the hardware that produced the measurements. Modeling the camera set as a physical unit reduces needless freedom, lets strong views support weak ones, and makes large multi-camera reconstructions more tractable.
