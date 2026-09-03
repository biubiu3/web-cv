---
title: "A Lawn Robot Designed Like an Autonomous Vehicle: LiDAR Obstacle Perception and Multi-Sensor Fusion"
date: "2022-01-19T00:00:00Z"
lastmod: "2026-09-03T00:00:00Z"
summary: "A large applied industry–academia project with Positec that treated autonomous mowing as a full mobile-robot problem. I developed terrain-aware LiDAR obstacle detection and fused point clouds with semantic segmentation and visual detections."
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
  caption: 'System view of the autonomous lawn robot, from onboard sensing and terrain-aware perception to fused obstacles and path planning.'
  alt_text: 'Technical illustration of a sensor-rich autonomous mower feeding camera and LiDAR observations into terrain perception, obstacle fusion, and planning.'
project:
  collaboration: 'Positec industry–academia collaboration'
  period: '2021–2022 project phase'
  status: 'Field-tested and applied'
  card_label: 'Autonomous lawn robot · LiDAR perception & fusion'
  wider_system: 'Multi-camera, RGB-D, LiDAR, RTK/GNSS, IMU, wheel odometry, onboard GPU, localization, planning, and control'
  role: 'LiDAR obstacle detection and multi-sensor obstacle fusion'
  outputs: 'Terrain-aware 3D obstacles and class-aware fused hypotheses for planning'
  context: 'A large industry–academia engineering program that built an autonomous mobile robot for unstructured lawns. The platform combined an automotive-style sensor and compute stack with localization, perception, planning, control, and mowing functions. I developed the LiDAR obstacle-detection module and the cross-modal obstacle-fusion layer.'
project_videos:
  - src: 'pointcloud-detection.mp4'
    poster: 'pointcloud-detection-poster.jpg'
    title: 'Field playback: terrain-aware point-cloud obstacles'
    description: 'A recorded outdoor run viewed in RViz. Red point clusters mark detected obstacles while synchronized front and rear camera streams provide scene context.'
---

{{< project-overview >}}

Developed with [Positec](https://www.positecgroup.com/), this large industry–academia program approached autonomous mowing as a complete mobile-robot problem. The platform combined multiple cameras, RGB-D sensing, LiDAR, RTK/GNSS, IMU, wheel odometry, onboard GPU compute, localization, mapping, perception, planning, and control.

I developed two connected parts of the perception stack:

1. **terrain-aware point-cloud obstacle detection** for separating hazards from grass, slopes, and uneven ground; and
2. **multi-sensor obstacle fusion** for combining LiDAR geometry with semantic segmentation and visual object detections.

## From boundary following to scene-aware autonomy

Robotic mowing has used several navigation paradigms. A conventional design can stay inside a physical loop: Husqvarna's own documentation describes a [boundary wire placed or buried around the lawn and obstacles](https://www.husqvarna.com/us/discover/robotic-mowers/automower-how-it-works/). Satellite-guided products replace the wire with a virtual boundary; for example, [EPOS uses RTK-GNSS and correction data](https://www.husqvarna.com/us/discover/epos/) to localize a mower within an editable work area. More recent systems use vision to recognize grass and obstacles without a wire or local antenna, as illustrated by [Worx Landroid Vision](https://www.worx.com/landroid/vision-technology/).

Reliable mowing across uneven turf requires both localization and local scene understanding. RTK supplies global position; cameras contribute object identity and lawn semantics; LiDAR provides range and shape. Their complementary measurements are especially useful on compliant ground, where long grass creates thick 3D returns, local slopes break a single-plane model, and people or animals may enter the work area.

The platform followed a familiar autonomous-driving systems principle: complementary sensors feed a shared perception and decision stack. [Waymo's public description of its sensing-to-reasoning chain](https://waymo.com/faq/) illustrates the same architectural pattern at road-vehicle scale. Our implementation selected sensors for low-speed outdoor work and added terrain models tailored to grass.

{{< mower-system-map >}}

## System architecture and perception interface

The system connected three perception threads with planning and control:

- **Localization** combined global satellite constraints with local visual, LiDAR, inertial, and wheel-motion cues. A factor-graph back end provided a common trajectory for the rest of the system.
- **Visual perception** detected safety-relevant object classes and produced scene semantics under an embedded-GPU runtime budget.
- **LiDAR perception** modeled the lawn surface, extracted obstacles, clustered them efficiently, and tracked them over time.
- **Fusion** reconciled metric geometry, pixel-level semantics, and object-level categories before publishing obstacles to planning.
- **Planning and control** turned the local environment model into safe motion, coverage mowing, and return-to-charge behavior.

My work connected the LiDAR stream to the planning interface through terrain-aware detection, temporal tracking, and cross-modal obstacle association.

## Terrain-aware point-cloud perception

### Local surface modeling

Slopes change locally across a lawn, long grass creates a thick and irregular return layer, and depressions or edges can also become hazards. A local terrain model must retain low obstacles while suppressing the dense returns created by the lawn itself.

The pipeline converted each LiDAR scan into a structured grid/range representation and evaluated height, relative height, slope, flatness, and neighborhood continuity locally. Separate flat-ground and lawn modes supplied terrain-specific thresholds. Candidate cells were connected and clustered, then associated across time using robot odometry and a persistent grid representation.

That design served three goals at once:

- retain low or irregular hazards with weak box-like structure;
- avoid flooding the planner with grass and terrain returns; and
- keep computation bounded enough for an onboard system.

{{< project-figure src="pointcloud-pipeline-en.svg" alt="Flowchart of terrain-aware point-cloud obstacle detection, including filtering, grid projection, the 30-point clustering branch, lawn and flat-ground modes, 35-centimeter and 16-centimeter height tests, a 7-centimeter pit test, clustering, tracking, and obstacle publication." caption="Terrain-aware point-cloud pipeline, from grid projection and local terrain tests to clustering, tracking, and obstacle publication." >}}

### Grid-domain clustering and temporal reuse

After terrain separation, candidate obstacles were clustered directly in the organized point-cloud representation. Odometry linked successive scans to a local/global grid, allowing recent terrain estimates to contribute to the next frame and keeping computation suitable for onboard operation.

The output was deliberately geometric: position, extent, and tracked obstacle support. Classification was deferred to the fusion layer, where vision had stronger evidence about object identity.

## Multi-sensor obstacle fusion

The fusion interface retained the source and geometric support of each obstacle. Planning received three result types:

- a **geometry-only obstacle**, when LiDAR supported a hazard without a reliable visual class;
- a **class-aware obstacle**, when projected LiDAR and visual evidence agreed; and
- a **vision-estimated obstacle**, when the detector saw a relevant object but useful LiDAR support was missing or sparse.

Point-cloud candidates were projected into the semantic mask to identify lawn and non-lawn support, then into object detections to associate 3D geometry with a visual class. Pit and size gates retained major geometric hazards. Height and clustering checks handled low returns inside and outside detection boxes. The resulting obstacle message carried its source type together with position, extent, tracking state, and any associated class.

{{< project-figure src="fusion-pipeline-en.svg" alt="Flowchart of multi-sensor obstacle fusion. LiDAR results pass through pit, footprint, and height gates; point clouds are projected into semantic and object-detection results; low returns are filtered with different inside-box and outside-box rules; and the system emits geometry-only, class-associated, and vision-only estimated obstacles." caption="Multi-sensor obstacle fusion, from geometric gating and image projection to geometry-only, class-associated, and vision-estimated outputs." >}}

{{< project-figure src="fusion-detection.png" alt="Field visualization with a child detection label, aligned point-cloud returns, and a fused camera-view obstacle result." caption="Field association example with the visual category and projected point-cloud support displayed in one camera view." >}}

## Field demonstration

{{< project-video-gallery >}}

The 41-second RViz playback shows a recorded outdoor run with synchronized front and rear cameras. Red point clusters mark obstacle geometry produced by the perception module for downstream planning.

## Industry context

The mower market has since moved toward richer sensing. Current commercial systems advertise combinations such as [LiDAR, network RTK, and vision](https://navimow.segway.com/pages/navimow-h2-robot-lawn-mower), reflecting the broader shift toward scene-aware outdoor robots. This project explored that systems direction through terrain-aware LiDAR perception and multi-sensor fusion on unstructured lawns.

## Research influence

Three ideas continued into my later robotics research: select representations around the physical environment; preserve each sensor's distinct contribution during fusion; and design perception interfaces around the timing, coordinates, uncertainty, and state required for action. The mower project connected geometric modeling, learned semantics, and a planning-ready robot interface in one field system.
