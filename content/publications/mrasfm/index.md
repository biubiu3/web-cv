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
publication_status: "Published"
publication_status_key: "published"
display_area: "Robot Perception & Reconstruction"
publication_order: 30
peer_reviewed: true
open_access: true
abstract: "MRASfM adapts structure-from-motion to multi-camera driving systems by exploiting fixed inter-camera geometry during registration. It removes unreliable road-surface points with a plane model, treats the camera set as a unit during bundle adjustment, and aggregates multiple scenes through coarse-to-fine association and assembly."
summary: "A multi-camera structure-from-motion framework for reliable and efficient reconstruction and scene aggregation in driving environments."
story_order: 30
homepage_order: 50
topic_keywords:
  - Autonomous Driving
  - Multi-Camera 3D Reconstruction
  - Structure from Motion
  - Bundle Adjustment
  - 4D Auto-Annotation
  - HD Mapping
tags:
  - ICRA 2026
  - Perception & Geometry
  - Structure from Motion
  - Multi-Camera Reconstruction
  - Autonomous Driving
  - Computer Vision
featured: false
image:
  caption: "Multiple cameras and journeys form a shared map."
  alt_text: "MRASFM — Multiple cameras and journeys form a shared map."
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

A vehicle rig records several directions at once, while weak road texture can produce unreliable matches. Combining repeated drives also requires alignment across recording sessions. The cameras share a fixed mounting, so their relative geometry can constrain each view’s pose.

MRASfM uses fixed inter-camera geometry in registration and bundle adjustment.

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

Road surfaces occupy a large image area but often contain repetitive texture, cast shadows, and reflections. Matches on those regions can create plausible yet geometrically destructive 3D points. MRASfM fits a road-plane model with LO-RANSAC and combines it with semantic road labels to remove inconsistent triangulations, reducing the influence of low-confidence road appearance on the recovered structure.

![Semantic labels and a robust road-plane model reject unstable structure.](road-filtering.jpg "Road-surface filtering removes shadow and low-texture outliers before optimization.")

## Camera-set bundle adjustment

If $k$ synchronized frames are captured by an $n$-camera rig, naive bundle adjustment may optimize roughly $kn$ camera poses. Camera-set bundle adjustment (CSBA) instead optimizes $k$ unit poses together with the $n$ fixed relative camera transformations. Both local and global stages use a Cauchy robust loss on reprojection residuals.

![Bundle adjustment factors the trajectory pose from fixed inter-camera geometry.](camera-set-ba.jpg "CSBA reduces redundant variables and preserves calibrated rig structure.")

This factorization improves both stability and efficiency: multiple views constrain a shared platform pose, while the optimizer does not repeatedly relearn the same physical rig at every time step.

## Aggregating multiple scenes

A single run rarely covers a complete driving environment. MRASfM uses GNSS to propose cross-session associations, hierarchical spatial partitioning to search plausible overlaps, and a coarse transform to bring reconstructions into a common frame. Relocalization adds verified visual constraints; transformation-based CSBA then refines the assembly iteratively.

![Independent journeys are associated, transformed, and jointly refined.](multi-scene-aggregation.jpg "Coarse-to-fine aggregation builds a larger reconstruction from separate sessions.")

## A reconstruction workflow across driving sessions

The pipeline begins with image matching inside plausible camera overlaps. Registered views constrain a shared camera-set pose, road filtering removes unreliable structure, and bundle adjustment jointly refines the trajectory and scene. This sequence uses the rig calibration throughout reconstruction.

For another driving session, spatial association first identifies likely overlap. Visual relocalization then provides correspondences that support a common transform. Joint refinement resolves remaining alignment errors after the scenes have been brought together.

![A reconstruction from a surround-camera driving rig.](real-reconstruction.jpg "Roads, buildings and street structure reconstructed from multiple cameras.")

## What the evaluation examines

The study uses KITTI, nuScenes and multi-camera driving data to examine trajectory accuracy, reconstruction quality and processing cost. Component ablations test camera-set registration, semantic triangulation and bundle adjustment.

## Design insight

A rigid camera rig provides structure that should remain visible to the optimizer. Sharing its pose across views reduces redundant estimation and lets well-observed cameras support views with weak texture. Cross-session aggregation extends this idea to repeated drives: independently collected observations become constraints on a common scene.

This is useful for building reconstruction workflows that feed mapping and annotation. The central contribution is a coordinated treatment of camera geometry, unreliable road observations and scene alignment.
