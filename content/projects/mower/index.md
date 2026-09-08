---
weight: 50
title: "Commercial Autonomous Mowing Robot: Multi-Modal Fusion & Terrain-Aware 3D Perception"
date: "2022-01-19T00:00:00Z"
lastmod: "2026-09-08T00:00:00Z"
summary: "A production-oriented outdoor mobile robot developed with global power-tool leader Positec (WORX). Integrating RTK/GNSS, surround vision, 3D LiDAR, and factor-graph IMU fusion to conquer unstructured undulating turf, fine obstacle clustering, and cross-modal fusion for boundary-wire-free, fully autonomous lawn maintenance."
featured: true
reading_time: false
share: true
tags:
  - Commercial Robotics
  - Autonomous Mobile Robot
  - Industrial Deployment
  - LiDAR Perception
  - Multi-Sensor Fusion
  - Outdoor Complex Terrain
  - Factor-Graph Localization
image:
  caption: 'Autonomous mowing system architecture: onboard multi-modal perception feeds terrain-adaptive modeling and cross-sensor obstacle fusion for agile outdoor navigation.'
  alt_text: 'Technical illustration of a sensor-rich autonomous mower feeding camera and LiDAR observations into terrain perception, obstacle fusion, and planning.'
project:
  collaboration: 'Positec Group (WORX) Mass-Production Partnership'
  period: 'Full-Stack Robotics Architecture & Outdoor Field Deployment'
  status: 'Field-Tested & Commercialized'
  card_label: 'Autonomous Mower · Multi-Sensor Perception & Fusion'
  wider_system: 'Multi-camera, RGB-D, LiDAR, RTK/GNSS, IMU, wheel odometry, embedded GPU, factor-graph localization, coverage planning, and closed-loop actuation'
  role: 'Project Lead (Tech Lead): Spearheaded outdoor full-stack robotics architecture, sensor integration, and field deployment; spearheaded algorithmic breakthroughs in terrain-adaptive point-cloud perception and cross-modal obstacle fusion.'
  outputs: 'Commercial-grade integrated robotic hardware-software system; terrain-adaptive 3D obstacle perception engine, class-aware fusion pipeline, and field-proven autonomous mowing'
  context: 'Overcoming the severe challenges of unstructured, deformable outdoor turf—including thick grass returns, non-planar slopes, hidden trenches, and dynamic pedestrian/pet traffic—this system brings automotive-grade autonomous driving technologies to outdoor mobile robotics, pioneering truly scene-aware, wire-free lawn robotics.'
  focus_label: 'Technical Leadership'
  outputs_label: 'Key Deliverables & Field Validation'
project_videos:
  - src: 'pointcloud-detection.mp4'
    poster: 'pointcloud-detection-poster.jpg'
    title: 'Field Playback: Terrain-Adaptive Point-Cloud Perception'
    description: 'Real-world field operation: red 3D point clusters mark detected low-profile obstacles and terrain boundaries, while front/rear cameras provide real-time visual confirmation.'
---

{{< project-overview >}}

Addressing the massive global demand for autonomous groundskeeping, this project delivered a **commercial-grade autonomous lawn mower full-stack system** in deep partnership with global power tool giant **Positec Group (WORX)**. Radically departing from traditional, cumbersome perimeter wires and fragile random-bounce mechanics, the system translates automotive-grade autonomous driving architecture to outdoor consumer robotics: deeply integrating multi-camera vision, 3D LiDAR, RTK-GNSS, industrial IMU, wheel odometry, and embedded GPU compute into an end-to-end stack spanning terrain modeling, factor-graph localization, cross-modal perception, coverage path planning, and robust outdoor execution.

As the **Project Tech Lead**, I directed the full-stack system architecture, sensor synchronization, and field trials, while authoring the core algorithms for **terrain-adaptive point-cloud perception** and **cross-modal obstacle fusion**, overcoming notorious industry bottlenecks including grass-obstacle confusion, micro-trench hazards, and dynamic pet/pedestrian detection.

## From boundary following to scene-aware autonomy

Robotic mowing has used several navigation methods. A conventional design can stay inside a physical loop: Husqvarna's own documentation describes a [boundary wire placed or buried around the lawn and obstacles](https://www.husqvarna.com/us/discover/robotic-mowers/automower-how-it-works/). Satellite-guided products replace the wire with a virtual boundary; for example, [EPOS uses RTK-GNSS and correction data](https://www.husqvarna.com/us/discover/epos/) to localize a mower within an editable work area. More recent systems use vision to recognize grass and obstacles without a wire or local antenna, as illustrated by [Worx Landroid Vision](https://www.worx.com/landroid/vision-technology/).

Reliable mowing across uneven turf requires both localization and local scene understanding. RTK supplies global position; cameras contribute object identity and lawn semantics; LiDAR provides range and shape. Their complementary measurements are especially useful on compliant ground, where long grass creates thick 3D returns, local slopes break a single-plane model, and people or animals may enter the work area.

The platform followed a familiar autonomous-driving systems principle: complementary sensors feed a shared perception and decision stack. [Waymo's public description of its sensing-to-reasoning chain](https://waymo.com/faq/) illustrates the same architectural pattern at road-vehicle scale. Our implementation selected sensors for low-speed outdoor work and added terrain models for grass.

{{< mower-system-map >}}

## System architecture and perception interface

The system connected three perception threads with planning and control:

- **Localization** combined global satellite constraints with local visual, LiDAR, inertial, and wheel-motion cues. A factor-graph back end provided a common trajectory for the rest of the system.
- **Visual perception** detected safety-relevant object classes and produced scene semantics under an embedded-GPU runtime budget.
- **LiDAR perception** modeled the lawn surface, extracted obstacles, clustered them efficiently, and tracked them over time.
- **Fusion** reconciled metric geometry, pixel-level semantics, and object-level categories before publishing obstacles to planning.
- **Planning and control** turned the local environment model into safe motion, coverage mowing, and return-to-charge behavior.

As project lead, I also had to make localization, vision, LiDAR, fusion, planning, and control agree on frames, timestamps, confidence/state semantics, and failure feedback. My focused technical work connected the LiDAR stream to the planning interface through terrain-aware detection, temporal tracking, and cross-modal obstacle association.

### Multi-sensor localization

Localization combined global and local motion cues. RTK/GPS provided global constraints; IMU preintegration and wheel odometry maintained short-term continuity; visual and LiDAR odometry supplied environmental geometry. A factor-graph back end organized priors, odometry, inertial, and satellite measurements into a trajectory that could be continuously optimized.

The engineering route explicitly addressed the weak points of both VIO and LIO. The visual branch considered initialization, ground-contact constraints, timing/extrinsic calibration, and health checks. The LiDAR branch covered motion compensation, feature selection, incremental map maintenance, and degeneracy detection. Localization supplied the common robot state needed by terrain grids, temporal obstacle tracking, planning, and control.

### Visual objects and scene semantics

The visual branch balanced safety-class coverage, recognition quality, and embedded runtime. After comparing one-stage detectors with two-stage and Transformer families, the project advanced YOLOR and YOLOX as complementary main routes: one emphasized detection-head and data-loop improvements, while the other emphasized deployment through TensorRT, quantization/operator optimization, pruning, and distillation.

Camera outputs covered object-level categories such as people, animals, vehicles, hydrants, and fences, together with pixel-level lawn semantics. The fusion layer combined these signals with point-cloud distance, shape, and terrain evidence to assess traversability.

{{< project-figure src="field-object-detection.gif" alt="Outdoor mower visual-detection debug view with multiple safety-relevant object classes over point-cloud and image observations." caption="Field detection example: vision supplies object semantics while 3D sensing contributes distance, shape, and terrain support." >}}

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

## Industry Evolution & Pioneering Vision

The global robotic mower industry is now rapidly converging toward wire-free scene awareness fusing 3D LiDAR, surround cameras, and RTK-GNSS. Pioneered in 2021–2022, this project established an early architectural benchmark for multi-sensor factor-graph localization and non-planar terrain modeling, successfully proving that consumer outdoor mobile robots can execute robust Level-4 autonomous behaviors under complex real-world lawn conditions.

## Technical Leadership & Core Engineering Contributions

As the **Project Tech Lead**, I directed the end-to-end robotics lifecycle and field delivery:
- **Full-Stack Robotic Architecture**: Designed the synchronized multi-modal sensing payload (surround vision, LiDAR, RTK-GNSS, IMU) and low-latency IPC pipeline on an embedded edge GPU;
- **Terrain-Adaptive 3D Perception**: Developed an adaptive ground-filtering and organized point-cloud clustering pipeline that suppresses compliant grass returns while reliably detecting micro-depressions down to 7 cm and low-profile garden obstacles;
- **Cross-Modal Sensor Fusion**: Engineered a multi-stage fusion engine reconciling 3D metric bounding boxes with 2D semantic masks, providing high-confidence free-space corridors for motion planning;
- **Extensive Field Validation**: Led hundreds of hours of autonomous outdoor operation across diverse unstructured terrains, achieving production-grade operational robustness.
