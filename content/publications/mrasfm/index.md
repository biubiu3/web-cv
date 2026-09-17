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
publication_order: 50
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

## Driving is the wrong shape for photogrammetry

Image-based reconstruction for driving is usually handled by visual SLAM, and for HD mapping and novel-view synthesis the SLAM route has a structural limitation. Its estimates are incremental and locally optimized, which blocks global refinement, and the result is drift that accumulates over a long trajectory. Structure-from-motion does the opposite: it processes everything in a batch with a global bundle adjustment at the end. The offline nature that makes SfM impractical for a live robot is exactly what makes it attractive here, because it can spend computation a real-time system cannot.

So the obvious move is to use SfM for driving. Three facts about driving data make that harder than it should be.

The first is the capture geometry. Classic SfM assumes you walk around the subject and photograph it from many directions. A car drives down a corridor. Viewpoints are almost collinear, which is the worst case for the translation estimation that SfM depends on.

The second is that data arrives fragmented. Driving scenes are captured over short durations with limited overlap, and drives covering the same area may be recorded weeks apart. There are often no shared images at all between two datasets that need to end up in the same map.

The third is calibration, and this is the one that changed how we designed everything. Vehicle calibration is difficult, initial values contain errors, and those errors get worse on uneven terrain. So the extrinsics you have at the start of a drive are not the extrinsics you need, and they are also the strongest prior available. That tension runs through the whole design.

## What prior methods assume

Multi-camera SLAM systems are accurate and require precise internal relative poses and intrinsics as input. They need calibration done before deployment, and they struggle to accommodate different camera configurations, which restricts flexibility in practice.

Incremental SfM is the closest baseline, and our criticism of it is specific. It ignores camera-set priors during incremental reconstruction and applies them only afterward, in rigid bundle adjustment once the reconstruction is already complete. By that point, errors that accumulated during incremental estimation cannot be corrected. Rigid BA cannot undo drift that has already been baked into the structure. Per-image bundle adjustment has a related problem: it can leave the internal relative poses inconsistent from frame to frame.

Global multi-camera SfM does fix the relative camera poses from the start, and it is sensitive to outlier matches and tends to degenerate when the estimated relative translations are collinear. In a driving scene the trajectory is close to collinear by default, so this is a structural hazard rather than an edge case.

Odometry-guided SfM takes the opposite bet and uses odometry poses and camera extrinsics directly for registration. That demands highly precise extrinsic calibration and accurate odometry, which are exactly the two things field deployment cannot reliably supply. We borrow this line of work's idea of using homography to identify overlapping image pairs. We do not borrow the assumption that the priors can be trusted.

There is also a matching problem specific to the setting. Traditional descriptors produce limited feature points in low-texture images, and road scenes are full of low-texture surfaces.

Finally, existing aggregation modules for merging reconstructions typically assume shared imagery between the segments being merged. In practice that imagery usually does not exist.

## What makes it hard

Priors have to be used without being trusted. Extrinsics and odometry are the strongest signal available and the least reliable thing on the vehicle. Trust them entirely and you get one family of failures; ignore them and you get another. The design space in between is narrow.

Collinearity is a real degeneracy, not a numerical nuisance. Fixed-rig global methods hinge on relative translation estimates, and straight-line driving makes those ill-conditioned.

The failure modes sit exactly where the useful signal is. The road surface occupies a large part of every image and has almost no texture, so it produces both few matches and bad ones. Worse, the edges of vehicle shadows are high-contrast and get detected as feature points. A shadow edge is not a scene point. When the shadow moves, that feature moves, which injects motion into the road surface precisely where the structure matters most.

Occlusion behaves differently on a rig than on a single camera. One blocked camera on a monocular system is a total failure; on a surround rig the other cameras still see the world. But that redundancy is only worth anything if registration actually shares the pose, and per-camera estimation throws the advantage away.

And robustness has a price. More cameras mean more poses to optimize in bundle adjustment, which reduces efficiency. The coverage that buys robustness is paid for in optimization size, and cancelling that cost is what a large part of our design exists to do.

## The camera set is the unit

Our idea is to change the atomic element of reconstruction. Instead of treating each image as an independent camera to be solved, we take the rigid unit, every image captured at the same instant, as the thing that gets a pose. That pose is by definition the vehicle's pose at that moment.

The benefit is that the pose of a rig factorizes into a time-varying vehicle pose and a static internal relative pose. One well-observed camera can carry the poses of the cameras that see nothing useful. The rig is estimated once rather than re-learned at every frame.

The important part is how that factorization is applied. We use it as a reparameterization inside registration and bundle adjustment, not as a constraint imposed afterward. That single decision does three things at once. It reduces the pose variables from one per camera per timestamp down to one per timestamp plus one per camera. It keeps the optimized rig consistent across frames, because there is only one rig to be consistent. And it turns calibration from an input that must be correct into a quantity that can be corrected.

## Building a reconstruction

Correspondence search comes first. SuperPoint detects and SuperGlue matches, pairs whose matched points fall into different semantic categories are discarded, and geometric verification removes the rest. Pairs are not all tried: with the rough internal relative poses and vehicle poses in hand, we compute the approximate field of view of each image and only match pairs that could plausibly overlap. Filtering this way improves both efficiency and accuracy, since matching everything against everything is expensive and injects noise from pairs that were never going to share content.

Registration then runs in three steps. PnP is estimated on the images with the richest correspondences. Those per-image estimates are converted into per-unit estimates and fused by local robust rotation averaging and translation averaging into a single unit pose. Every remaining image in that unit gets its pose by composing the unit pose with the calibration.

That middle step is where the method sits between the two failure modes described earlier. It averages, like the global family, but it averages over unit hypotheses derived from reliable images rather than over raw relative translations, which is what makes it survive collinearity.

The honest accounting of this module is narrow. It has minimal effect on average pose accuracy and efficiency, and it is particularly useful for handling occluded viewpoints. In scenes with rich correspondences the impact is less noticeable. We state that tradeoff rather than presenting the module as uniformly beneficial, because the value of redundancy is concentrated in the tail.

![Registration estimates a few well-observed cameras and derives the rest from rig geometry.](camera-set-registration.jpg "Occlusion on one camera no longer fails the unit.")

## Getting the road out of the way

After a unit is registered, we fit a plane model to the road points with LO-RANSAC and remove them. This targets the shadow-edge problem directly. A moving shadow edge produces a feature that is not attached to the scene, and it lands on the largest and least textured surface in view, so the triangulation noise concentrates there by default. Removing those points improves reconstruction accuracy and accelerates convergence.

The assumption being made is local flatness of the road, and our own real-world scenes include slope changes, so this is an approximation rather than a guarantee.

![Road-surface points are filtered with a plane model before triangulation.](road-filtering.jpg "Removing shadow-driven and texture-poor points where the noise concentrates.")

## Bundle adjustment on the rig

Camera set bundle adjustment optimizes vehicle poses and internal relative poses under substitution constraints that express each camera pose in terms of the vehicle pose and the rig geometry, with a Cauchy loss for the local stage. The variables include intrinsics, vehicle poses, internal relative poses and scene points.

There are two modes and the split matters. Local CSBA fixes intrinsics and internal relative poses and touches only newly registered units and their neighbours. Global CSBA optimizes everything across all registered units, and we trigger it when many units remain unoptimized.

Global CSBA re-optimizing intrinsics and relative poses is the online recalibration capability claimed in the paper. It is also the practical payoff, because it converts the field's least reliable input into an output. Local CSBA is cheaper, and it freezes exactly those parameters, which is the tradeoff: the cheap mode cannot fix calibration, and the mode that can fix it costs more.

The variable reduction from one pose per camera per timestamp to one per timestamp plus one per camera is worth dwelling on. Six cameras over a long trajectory means the per-image formulation optimizes six times as many poses as it needs to, and every extra variable is another degree of freedom that noise can hide in. Fewer variables makes convergence faster and the result more consistent. Robustness and efficiency turn out to be the same lever here, which is not usually the case.

![The rig is optimized once rather than re-estimated at every frame.](camera-set-ba.jpg "Vehicle poses and internal relative poses are refined jointly, which is what allows calibration to improve in the field.")

## Merging drives that share no images

Aggregation has to work without shared imagery, so the whole strategy is coarse-to-fine. Scenes are first placed in a global frame using satellite positioning, represented by trajectory midpoints: one scene sits at the geometric centre, its nearest neighbours become candidates, and homography-guided spatial pairs pick whichever candidate has the greatest visual overlap.

The coarse placement is wrong by an unknown transform, because positioning error is larger than the alignment tolerance. So the transform itself becomes the variable. One image from the incoming scene is relocalized to get a refined pose, which yields the transform between the coarse placement and the true one, and that transform registers the entire rigid unit at once. Triangulation follows, then a transformation-based bundle adjustment optimizes the transform and the scene points while keeping the reference scene's camera poses fixed.

Registration, triangulation and adjustment iterate until every unit of the incoming scene has been absorbed. The merged result then becomes the new reference for the next scene, so aggregation proceeds as a chain rather than against a single global anchor. The reason is simple: chaining keeps error from originating at one fallible alignment.

The whole stage is designed so aggregation never has to be exact at the coarse step, only close enough to relocalize.

![Separately collected drives are bound together from coarse alignment to refined transform.](multi-scene-aggregation.jpg "Satellite positioning places the scene; vision refines the placement.")

## What we take from this

A physical invariant is best used as a reparameterization rather than a constraint. Enforcing rigidity after the fact cannot prevent the error that accumulated before. Making rigidity part of the variable structure prevents it from accumulating in the first place.

Priors should prune, not conclude. Rough poses decide which pairs to match and where to start, and the geometry still comes from matched evidence. That is the line between our approach and the one we criticize.

Design so priors can be corrected rather than merely trusted. Making relative poses optimizable is what turns the least reliable input into an output.

And judge a module where its failure mode lives. Camera set registration barely moves average pose error, and it is the difference between working and failing when a camera is occluded. Aggregate metrics can hide a module's entire value.

## What it still assumes

The method takes rough trajectories, rough calibration and semantic information as inputs. The semantic source is assumed rather than specified, and we report no sensitivity to the quality of those labels.

Multi-scene aggregation is not ablated. The choice of roughly three candidate scenes and the geometric-centre reference heuristic are stated without justification or failure analysis.

The rigid unit is defined purely by simultaneity, and we do not test what happens when that assumption weakens. Camera time-synchronization error and rig flex would both violate it, and neither is discussed. Online calibration is claimed but not characterized: we do not say under what motion diversity or camera count the global stage's refinement of intrinsics and relative poses is well posed.

The plane model presumes a locally flat road while our own deployment includes slope changes. Generality across different multi-camera configurations is asserted but exercised only on six- and seven-camera rigs. Dynamic objects beyond shadows appear in the motivation but have no dedicated treatment.

## Where it leads

The contribution we would state is a change of unit, and everything else follows from it. What the change buys is worth spelling out: camera sets as atomic units for registration and refinement give robust pose estimation in complex environments and better efficiency than conventional per-camera methods. Combined with the road filtering and the aggregation stage, the pipeline produces a single map from drives that were never meant to be merged.

We validated it in two directions on purpose. Real instrumented vehicles demonstrate that it holds up outside a dataset, and public benchmarks establish the accuracy claim against a conventional baseline. The practical statement of the stake is that intelligent vehicles can perceive their environment and estimate their own pose more reliably, which is what the downstream tasks actually consume.
