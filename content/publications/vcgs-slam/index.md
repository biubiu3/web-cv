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
publication_order: 40
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
  caption: "A compact Gaussian map grows with the robot."
  alt_text: "VCGS-SLAM — A compact Gaussian map grows with the robot."
hugoblox:
  ids:
    arxiv: 2403.11247v3
links:
  - type: code
    url: https://github.com/dtc111111/VCGS-SLAM
---

## Half a gigabyte for a small room

Sparse feature-based SLAM is accurate and its maps are too thin to be useful. Navigation, path planning and obstacle avoidance need surface information, not a cloud of keypoints, which is why dense mapping has been pursued for as long as it has.

The dense alternatives each carry a cost. Classical dense fusion systems such as DTAM, Kintinuous and ElasticFusion are memory-hungry and slow, and their accuracy suffers for it. Neural radiance field SLAM produces better geometry but carries an implicit decoder, which means rendering is a network evaluation rather than a rasterization. 3D Gaussian splatting looked like the resolution: real-time rendering with high fidelity, no decoder, no volumetric integration.

Then you try to deploy it. A Gaussian-splatting SLAM system typically needs more than 500 MB to represent a small room-sized scene. That number is the difference between a demonstration and something that runs on a robot, and it is where this work starts.

## The redundancy is made by SLAM, not by Gaussians

The obvious conclusion would be that Gaussian primitives are simply expensive, and that the fix is compression. We do not think that is right, and the diagnosis is the part of this paper we would most want read.

We looked at the Gaussian ellipsoids that these systems create and found that their geometric similarity is far higher than in the original 3D Gaussian splatting. Measuring similarity between normalized, mean-free Gaussians reduces to comparing their covariance, which isolates shape and size from position, and the distribution we see in SLAM systems is a tall narrow spike compared with the broad low curve of the offline method. These systems are storing near-duplicates of the same ellipsoid, over and over.

The cause is not the primitive. It is the optimization schedule, and there are two structural differences that explain it.

Offline 3D Gaussian splatting receives every image at once. It optimizes across all of them jointly, and when it selects keyframes it samples randomly from the entire set. A SLAM system receives frames in timestamp order. It waits for each frame's training to finish before moving to the next, and it only ever optimizes selected keyframes. Same primitive, sequential and locally scoped optimization, and a very different resulting distribution. The online regime has, to a certain extent, exacerbated the geometric similarity.

That distinction matters because it decides which existing tools are usable. The offline compression literature, including compact Gaussian representations, lightweight Gaussian pruning and self-organizing Gaussian grids, all assume you have every image, every pose and the corresponding point cloud available from the start. SLAM systems are incrementally optimized. Every one of those methods is disqualified by construction, however well it works offline.

![Redundancy is a property of the optimization schedule rather than the primitive.](compact-representation.jpg "Anchors carry structure; per-view decoding generates Gaussian attributes.")

## Why online compaction is awkward

Three things make the problem harder than compressing a finished map.

Offline 3D Gaussian splatting seeds its Gaussians from a complete posed point cloud. In SLAM that cloud only exists for where the camera has already been, so the decision of where to add representational capacity has to be made from a partial map, online, without knowing what is coming.

Deletion has to be causal. You cannot consult the full training set to decide whether a Gaussian is still needed, because the future views have not arrived.

And opacity alone is the wrong criterion for removal. A Gaussian can carry low opacity and still be critical across multiple views, or occupy a useful volume while contributing little colour. Volume and opacity together are closer to what we want.

There is also a failure mode specific to learning the decision. Our mask loss pushes mask values down, which is what a sparsity prior does, and if you leave it running without interruption the optimization will eventually eliminate every Gaussian in the map. A one-directional regularizer with no reset destroys the thing it is regularizing.

Finally, compression here is not a post-processing step. In offline compression you quantize a finished artifact. Here the codebooks are learned jointly with attributes that are still being optimized, so the quantizer is chasing a moving target.

## Fewer anchors, then fewer bits

Two layers of compaction, in that order.

The first is structural. Instead of storing Gaussians, we store anchors. An anchor is a voxel centre together with a small learned feature, a scale, and a set of offsets. The Gaussian centres are generated as the voxel centre plus each offset scaled by that anchor's scale, and the remaining attributes, opacity, rotation, scale and colour, are decoded from the anchor feature together with the current viewing distance and direction. Structure carries the representation rather than individual primitives, and because decoding is view-conditional, detail is generated per view rather than stored per Gaussian.

The second is parametric, and it applies once the anchor count is under control. The offsets and scales are the geometry every anchor has to carry, so those are where the bits go. We compress them with cascaded residual vector quantization: the first codebook approximates the vector, and each subsequent stage quantizes only the residual the earlier stages left behind, with indices chosen by nearest-neighbour search against the running residual.

The analogy comes from neural audio coding, and it is a good one. The first codebook gives a rough description of the number. Each later codebook describes only what is left over. The codebooks are shared across the whole scene the way a palette is shared across an image. We initialize them with K-means.

Two tradeoffs are worth stating. More stages mean more residual levels to store and slower inference for gains that are only marginal. A larger codebook leaves many indices unused while still costing memory and training time, and a smaller one costs accuracy. The paper's configuration uses six residual stages over a codebook of size 64, and the abbreviation is worth spelling out for readers who have met particle filters: residual vector quantization and particle swarm optimization have nothing to do with each other, and no particle filter appears anywhere in this work.

![Anchor geometry is stored as short indices into shared codebooks.](residual-codebook.jpg "Each stage quantizes only what the previous stages left behind.")

## Growing where the optimizer is still struggling

With no structure-from-motion cloud to seed from, the question of where to put capacity has to be answered online. The signal we use is the gradient.

A voxel whose constituent Gaussians keep producing large averaged gradients over a run of iterations is a place the optimizer is still fighting, which is a reasonable indication that the current representation cannot express what the data wants. If that averaged gradient exceeds a threshold and no anchor exists at that voxel centre yet, we plant one. Candidates are eliminated randomly to keep growth from exploding, and trivial anchors get removed by accumulating the opacity of their Gaussians.

Three resolutions run in parallel, with voxel size shrinking by a factor of four at each level and the gradient threshold doubling. Coarse voxels absorb bulk geometry such as walls and floors. Fine voxels handle detail such as a chair leg. A single voxel size would force one choice to serve both, which is why the ladder exists.

Initialization is separate: at map start, points are sampled where accumulated opacity is low or where the rendered depth disagrees with the measurement.

## The mask is a dimmer, not a switch

Inside a sliding window, each Gaussian carries a learnable mask parameter, which a stop-gradient straight-through form turns into a binary mask. That mask multiplies the Gaussian's scale and opacity before rendering, so a masked primitive fades out of the image rather than being deleted from the data structure. Removal happens later, at the window boundary, where we use hit frequency together with the learned mask.

The window is short-term memory with a defined composition: the current frame, the keyframe it overlaps most, and the two earlier keyframes with the highest frustum overlap with the current depth point cloud. Everything outside the current view is frozen by frustum culling, which preserves past geometry and reduces the number of parameters being optimized. Masking runs on keyframes only.

The reset is the detail that makes the mechanism safe. At the window boundary, once removals are applied, both the gradients and the masks are cleared so the system can relearn. Without that reset, the sparsity pressure described earlier runs unopposed and the map erases itself.

Window size is a genuine tradeoff rather than a hyperparameter to tune casually. Too large a window masks away Gaussians that were doing useful work, which costs accuracy. Too small a window costs memory and optimization quality.

![Gaussians that stop earning their place fade out within a moving window.](sliding-window-mask.jpg "Masking modulates scale and opacity; removal happens at the window boundary, after which the masks and gradients are reset.")

## Tracking depends on the map you just compacted

Three signals drive tracking, and all of them come out of the same alpha-compositing pass. Colour, depth, and a silhouette channel that accumulates only the visibility weights. Because they share the rasterization, the silhouette is nearly free.

Tracking minimizes squared colour error plus squared depth error over rays with valid depth, gated by the silhouette: only pixels where the renderer is confident it is actually covering something are trusted. An ICP term ties Gaussian centres to their nearest points across frames, on the reasoning that Gaussians are a point cloud and classical geometric association therefore applies to them. Pose is initialized by constant-velocity forward projection, which the ablation calls vital.

The ablations here are the clearest argument that these components are load-bearing. With only the depth term, tracking fails outright. With only colour, tracking works at substantially worse error. Without the silhouette gate, tracking fails outright. A renderer-derived trust region turns out to be doing real work, and a photometric pipeline apparently needs both a geometry term and a region it can believe.

Bundle adjustment runs at two scales. Local adjustment refines the recent window, and a global stage samples rays from a deliberately larger keyframe database to refine map and poses together, with an additional structural similarity term. The purpose is to bound accumulated drift over long trajectories and large scenes without touching every historical frame.

## Evidence, and the shape of it

The system is evaluated on Replica, ScanNet and TUM RGB-D, on an embedded module and a laptop-class GPU, and on a multisensor mobile-robot dataset we collected ourselves with LiDAR, an inertial unit and a depth camera, covering scenes over a thousand square metres with high-quality trajectory ground truth. The dataset exists to answer a question the standard benchmarks cannot: whether the representation holds up when the map is being built on a moving robot rather than on a desk.

The most useful evaluation is not a table. We inserted the compact representation into SplaTAM, MonoGS and Gaussian-SLAM and re-ran them. The same direction of improvement appeared in each. That is evidence about the diagnosis rather than about our system, since a representation that helps three different systems is addressing something those systems share.

![The pipeline runs on laptop and embedded hardware.](embedded-demo.jpg "Compactness is what makes on-robot deployment possible.")

## What we take from this

Diagnose the representation you inherited from the training regime before you build a compressor. The interesting move here was not designing a better quantizer. It was noticing that sequential online optimization produces a different and more redundant distribution than joint optimization, and measuring it before writing any code.

Related to that, any module that needs the entire dataset is disqualified by construction in an incremental system, no matter how well it performs offline. That single constraint eliminates most of the available literature.

Compact in two layers, structural and then parametric. Quantizing alone leaves millions of primitives to encode. Masking alone leaves a large per-primitive payload.

Gradients are a capacity-allocation signal, not just an optimization artifact, and using them that way turns where should the map be detailed into a decision the system makes for itself.

And any learned pruning pressure that only pushes in one direction needs a reset. That pattern generalizes well beyond this paper.

## What it does not handle

Fast motion produces motion blur in both the colour and depth images, and tracking depends on exactly those losses, so rapid movement degrades it. Scenes with many dynamic objects produce artifacts and drift, and the system is still limited in dealing with highly dynamic environments.

Loop closure and relocalization are not implemented, which bounds how well drift can be corrected on large loops. The system is RGB-D only, so there is no monocular or stereo path. And we owe the reader a clearer account of the reported memory figure: it is checkpoint size rather than peak memory footprint, and those are different numbers.

## Why embedded matters

The paper's claim is not that a compact map is an acceptable compromise. It is that a compact map is still a good map, and the same quality is available at a fraction of the storage. That claim only has teeth in a setting where the storage is a real constraint, which is why the embedded experiments are the ones we care about. A representation that fits on the robot is the one that gets used.
