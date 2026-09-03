---
title: "A Lawn Robot Designed Like an Autonomous Vehicle: LiDAR Obstacle Perception and Multi-Sensor Fusion"
date: "2022-01-19T00:00:00Z"
lastmod: "2026-09-03T00:00:00Z"
summary: "A large applied industry–academia project with Positec that treated autonomous mowing as a full mobile-robot problem. I owned terrain-aware LiDAR obstacle detection and the fusion of point clouds, semantic segmentation, and visual detections."
featured: true
reading_time: false
share: true
tags:
  - Engineering Project
  - Industry Collaboration
  - Autonomous Mobile Robot
  - LiDAR Perception
  - Multi-Sensor Fusion
  - Outdoor Robotics
image:
  caption: 'Field replay of the lawn robot perception stack: LiDAR returns and detected obstacles in RViz, synchronized with front and rear camera views.'
  alt_text: 'RViz field replay showing a lawn point cloud, a detected obstacle highlighted in red, and synchronized front and rear camera images.'
project:
  collaboration: 'Positec industry–academia collaboration'
  period: '2021–2022 project phase'
  status: 'Field-tested and applied'
  card_label: 'Autonomous lawn robot · LiDAR & fusion ownership'
  wider_system: 'Multi-camera, RGB-D, LiDAR, RTK/GNSS, IMU, wheel odometry, onboard GPU, localization, planning, and control'
  role: 'LiDAR obstacle detection and multi-sensor obstacle fusion'
  outputs: 'Terrain-aware 3D obstacles and class-aware fused hypotheses for planning'
  context: 'A large industry–academia engineering program that built an autonomous mobile robot for unstructured lawns. The complete platform combined an automotive-style sensor and compute stack with localization, perception, planning, control, and mowing functions. My ownership was the LiDAR obstacle-detection module and the cross-modal obstacle-fusion layer.'
project_videos:
  - src: 'pointcloud-detection.mp4'
    poster: 'pointcloud-detection-poster.jpg'
    title: 'Field playback: terrain-aware point-cloud obstacles'
    description: 'A recorded outdoor run viewed in RViz. Red point clusters mark detected obstacles while synchronized front and rear camera streams provide scene context.'
---

{{< project-overview >}}

This project asked a different question from a conventional robotic mower: **what changes when a mower is designed as an autonomous vehicle that happens to cut grass?** The answer was not one better boundary sensor. It was a complete mobile-robot architecture with multiple cameras, RGB-D sensing, LiDAR, RTK/GNSS, IMU, wheel odometry, onboard GPU compute, simultaneous localization and mapping, perception, planning, and control.

The collaboration was a large applied program with [Positec](https://www.positecgroup.com/), not a laboratory demo isolated from a product workflow. Within that larger team system, I was responsible for two tightly coupled parts:

1. **terrain-aware point-cloud obstacle detection** that could separate real hazards from grass, slopes, and uneven ground; and
2. **multi-sensor obstacle fusion** that combined LiDAR geometry with semantic segmentation and visual object detections.

The distinction matters. I contributed to the broader platform and interfaces, but I do not claim sole ownership of localization, visual-model training, planning, chassis control, mechanical design, or the commercial product.

## Why this was more than a wire-free mower

Robotic mowing has used several navigation paradigms. A conventional design can stay inside a physical loop: Husqvarna's own documentation describes a [boundary wire placed or buried around the lawn and obstacles](https://www.husqvarna.com/us/discover/robotic-mowers/automower-how-it-works/). Satellite-guided products replace the wire with a virtual boundary; for example, [EPOS uses RTK-GNSS and correction data](https://www.husqvarna.com/us/discover/epos/) to localize a mower within an editable work area. More recent systems use vision to recognize grass and obstacles without a wire or local antenna, as illustrated by [Worx Landroid Vision](https://www.worx.com/landroid/vision-technology/).

Each is useful, but **position is not the same as scene understanding**. RTK can tell a robot where it is; it does not by itself tell the robot whether a return is grass, a depression, a child, an animal, garden furniture, or vegetation moving in the wind. A camera can provide semantics but may not supply stable metric geometry in every lighting or texture condition. LiDAR supplies shape and distance but does not automatically know what a cluster means. Unstructured lawns make these weaknesses visible: the ground is compliant and uneven, grass blades form noisy 3D returns, slopes violate a single-plane assumption, and people or animals can enter without warning.

Our design therefore followed the architectural logic of an autonomous vehicle: complementary sensors feed a shared perception and decision stack. The analogy is about **systems engineering**, not vehicle class or safety certification. A road-vehicle autonomy stack may combine cameras, LiDAR, radar, and powerful compute; [Waymo describes that same sensing-to-reasoning pattern](https://waymo.com/faq/). Our mower used the subset appropriate to low-speed outdoor work and added terrain-specific reasoning.

{{< mower-system-map >}}

## The complete platform—and the boundary of my contribution

The project's engineering report organizes the wider program around three major technical threads: multi-sensor fusion localization, vision-based object detection, and point-cloud obstacle detection. Together with planning and control, they formed a closed perception–action loop:

- **Localization** combined global satellite constraints with local visual, LiDAR, inertial, and wheel-motion cues. A factor-graph back end provided a common trajectory for the rest of the system.
- **Visual perception** detected safety-relevant object classes and produced scene semantics under an embedded-GPU runtime budget.
- **LiDAR perception** modeled the lawn surface, extracted obstacles, clustered them efficiently, and tracked them over time.
- **Fusion** reconciled metric geometry, pixel-level semantics, and object-level categories before publishing obstacles to planning.
- **Planning and control** turned the local environment model into safe motion, coverage mowing, and return-to-charge behavior.

My direct ownership begins at the LiDAR stream and ends at the fused obstacle interface. This boundary is both technically meaningful and publicly auditable in the project artifacts below.

## Point-cloud perception on grass is a terrain problem

### Why a single ground plane fails

Road-oriented point-cloud pipelines often begin by fitting one dominant plane. A lawn is different. Slopes change locally; long grass creates a thick, irregular return layer; depressions and edges can be hazards even though they are not objects standing above a plane. Removing too much “ground” hides low obstacles, while removing too little turns the grass itself into a wall.

The implemented pipeline converted the LiDAR scan into a structured grid/range representation and reasoned locally about height, relative height, slope, and neighborhood continuity. It could switch between flatter-ground and grass/slope logic rather than enforcing one global surface model. Candidate non-ground cells were connected and clustered, then associated across time using robot odometry and a persistent grid representation.

That design served three goals at once:

- retain low or irregular hazards that do not look like clean boxes;
- avoid flooding the planner with grass and terrain returns; and
- keep computation bounded enough for an onboard system.

{{< project-figure src="pointcloud-pipeline.png" alt="Original Chinese project flowchart for terrain-aware point-cloud obstacle detection, from filtering and grid projection through grass and flat-ground modes, clustering, tracking, and obstacle publication." caption="Original engineering flowchart. The implementation combines structured point-cloud projection, terrain-mode reasoning, local surface checks, clustering, temporal tracking, and final removal of lawn returns. Chinese labels are retained as a dated project artifact." >}}

### Fast clustering and temporal reuse

After terrain separation, the system clustered candidate obstacles in the organized point-cloud representation rather than relying only on expensive all-pairs Euclidean search. Odometry linked successive scans to a global/local grid so that recent terrain evidence could be reused. In practice, this made the detector less dependent on solving the entire grass-removal problem again from scratch at every frame.

The output was deliberately geometric: position, extent, and tracked obstacle support. Classification was deferred to the fusion layer, where vision had stronger evidence about object identity.

## Fusion: keep geometry and semantics honest

A robust fusion layer should not erase an obstacle merely because one model failed to name it. It should also avoid pretending that a two-dimensional detection has precise range when no geometric observation supports that claim. The fusion design therefore retained three kinds of planning-facing result:

- a **geometry-only obstacle**, when LiDAR supported a hazard but vision did not assign a reliable class;
- a **class-aware obstacle**, when projected LiDAR and visual evidence agreed; and
- a **vision-estimated obstacle**, when the detector saw a relevant object but useful LiDAR support was missing or sparse.

Point-cloud candidates were projected into the semantic mask to reason about lawn versus non-lawn regions, then into object detections to associate 3D support with a visual class. Size and terrain checks protected hazards that should not be discarded simply because they appeared inside a grass region. The result was a typed obstacle representation with an explicit evidence path rather than a single opaque confidence score.

{{< mower-fusion-flow >}}

{{< project-figure src="fusion-pipeline.png" alt="Original Chinese project flowchart showing point-cloud results, semantic segmentation, and target detections projected and associated into geometry-only, class-aware, and vision-estimated obstacles." caption="Original fusion design artifact. Point-cloud geometry, semantic regions, and object detections are aligned before the system emits three evidence-aware obstacle types." >}}

{{< project-figure src="fusion-detection.png" alt="Field visualization with a child detection label, aligned point-cloud returns, and a fused camera-view obstacle result." caption="A field example of cross-modal association: visual category information and projected point-cloud support are shown together rather than as unrelated detector outputs." >}}

## What the available evidence shows

The materials include a dated 44-page engineering report, the two algorithm flowcharts above, a fused-perception screenshot, and a 41-second field playback. Together they support several concrete statements:

- this was an integrated outdoor robot stack, not an offline point-cloud experiment;
- the detector ran on recorded field data with synchronized LiDAR and camera context;
- the point-cloud module explicitly handled grass, slopes, clustering, temporal information, and publication to the wider system; and
- the fusion module explicitly joined geometry, semantic segmentation, and object detection.

{{< project-video-gallery >}}

The red clusters in the video are easy to see, but the more important engineering evidence is the interface: obstacle geometry is produced in the same playback in which front and rear images provide scene context. This is the bridge from an algorithm result to a robot decision input.

The project reached field testing and practical application within the collaboration. The public artifacts do **not** establish a universal recall rate, safety certification, or performance under every lawn, weather, and lighting condition, so this page does not invent those claims. Nor does it claim that a later commercial mower model is a direct productization of this exact prototype.

## Looking back from today's mower landscape

The market has since moved toward richer sensing. Current commercial systems now openly advertise combinations such as [LiDAR + network RTK + vision](https://navimow.segway.com/pages/navimow-h2-robot-lawn-mower), which makes the systems argument less unusual than it was during this project phase. That later market direction is useful context, but not evidence of lineage. The contribution documented here remains specific: designing terrain-aware LiDAR obstacle perception and an evidence-preserving multi-sensor fusion interface for a real, unstructured lawn robot.

## Engineering lessons that carried forward

Three lessons from the project continue to shape my robotics work.

First, **the environment determines the representation**. A mathematically clean ground plane is the wrong abstraction if grass and local slope dominate the sensor return. Second, **multi-sensor fusion should preserve disagreement**. Unknown-but-geometric, class-supported, and vision-estimated obstacles should not be silently collapsed into one type. Third, **ownership includes the handoff**. A detector is useful only when its coordinates, timing, uncertainty, and failure behavior are legible to planning and control.

This project was an early example of the research-to-engineering thread that runs through my later work: use geometry where it is reliable, learn semantics where they add information, and design the interface so a physical robot can act on both.

> **Disclosure scope.** This case study uses only technical material needed to explain the public engineering contribution. The collaboration contract, commercial terms, personnel details, internal paths, and nonessential delivery information are intentionally excluded.
