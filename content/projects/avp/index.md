---
title: "A Car That Finds, Parks, and Returns: A Campus-Scale AVP System"
date: "2022-02-15T00:00:00Z"
lastmod: "2026-09-04T00:00:00Z"
summary: "An applied industry–academia program with Voyager Intelligent Systems that built a complete automated-valet-parking stack—from surround perception, fusion localization, and semantic mapping to driving/parking planning, tracking control, and remote summon. As project lead, I directed the architecture, integration, and vehicle validation, with a hands-on focus on planning and control."
featured: true
reading_time: false
share: true
tags:
  - Engineering Project
  - Industry Collaboration
  - Autonomous Driving
  - Automated Valet Parking
  - BEV Perception
  - Localization and Mapping
  - Planning and Control
image:
  filename: 'featured.png'
  caption: 'Complete AVP system: surround and ultrasonic sensing feed BEV semantic mapping, hierarchical driving and parking planning, and closed-loop vehicle execution.'
  alt_text: 'Technical overview of an automated valet parking system, showing four surround camera views and ultrasonic sensing, a central bird-eye semantic parking map, and global driving, local avoidance, parking, and vehicle-control stages.'
project:
  collaboration: 'Voyager Intelligent Systems industry–academia collaboration'
  period: '2022 project phase'
  status: 'System-integrated, vehicle-tested, and applied'
  card_label: 'Automated valet parking · full AVP stack'
  wider_system: 'HMI, surround/ultrasonic perception, fusion localization, semantic mapping, driving and parking planning, vehicle control, and remote summon'
  role: 'Project lead; overall architecture and cross-module integration, with a technical focus on planning, control, and end-to-end commissioning'
  outputs: 'BEV perception and semantic maps; closed-loop driving, park-in/out, and summon in known and previously unseen parking environments'
  context: 'A complete automated-valet-parking engineering program for real campuses and garages. The system went beyond the final parking maneuver: it connected user tasks, onboard perception, localization and mapping, hierarchical planning, chassis control, and safety replanning. I led the overall design, interfaces, milestones, and vehicle integration while taking a hands-on technical role in planning and control.'
project_videos:
  - src: 'bev-perception.mp4'
    poster: 'bev-perception-poster.jpg'
    title: 'Surround-view BEV multi-task perception'
    description: 'A sanitized vehicle playback showing bird-eye semantics, the unwrapped surround view, and detections for parking-space and ground-marking tasks.'
  - src: 'garage-mapping.mp4'
    poster: 'garage-mapping-poster.jpg'
    title: 'Garage exploration, mapping, and integration'
    description: 'A vehicle run in an underground garage with surround perception, image features, vehicle motion, and the growing parking-space map updating together.'
---

{{< project-overview >}}

This large applied program was developed with [Voyager Intelligent Systems](https://www.voyager-tech.com/col.jsp?id=143) for real campus and parking-garage operation. Given a park-in, retrieve, or summon task, the vehicle used onboard sensors to understand its surroundings, build or reuse a map, plan a feasible trajectory, and execute it through the chassis. Voyager's current public intelligent-vehicle portfolio likewise spans AVM, APA/AVP/HPA, and integrated driving-and-parking systems; this project was an industry–academia implementation of the complete AVP chain.

I served as project lead, directing requirement decomposition, the system architecture, module interfaces, milestones, and vehicle commissioning. My hands-on algorithmic focus was **driving/parking planning and control**, but the program could not be managed as an isolated submodule: perception semantics and obstacles, localization frames and confidence, vehicle-constrained trajectories, chassis execution, and fault feedback all had to agree inside one loop.

## AVP is more than a single parking maneuver

Automated valet parking addresses the full driverless “last mile”: a user leaves a vehicle at a drop-off point; the vehicle travels through the facility, finds or approaches a space, and parks; it later returns to a requested pickup point. Published after this project, [ISO 23374-1:2023](https://www.iso.org/standard/78420.html) describes AVP as Level 4 operation of unoccupied vehicles within a prescribed parking facility and defines a logical architecture across vehicle, facility, and user domains. The industry also includes infrastructure-guided designs, exemplified by the public [Bosch–Daimler AVP system](https://www.bosch-presse.de/pressportal/us/en/press-release-8576.html).

This project concentrated on an **onboard, vehicle-centric route**. Four fisheye cameras covered the vehicle perimeter, ultrasonic sensing filled the immediate near field, and IMU, wheel, visual, and GPS cues supported motion estimation. Perception, maps, planning, and control ran on the vehicle platform, supporting both mapped garages and exploration of a previously unseen parking area.

The requirements covered several end-to-end operating modes:

| Map condition | Task entry | System behavior | Outcome |
|---|---|---|---|
| Known map | Remembered space | Load the local map and localize | Return to the previously used space and park |
| Known map | Assigned or available space | Localize and select the target | Drive, avoid obstacles, and park autonomously |
| Unknown map | No local map | Explore while constructing the map | Discover a usable space and complete park-in |
| Known map | Phone summon | Depart the space under continuous perception | Return to the requested pickup point |

{{< avp-system-map >}}

## Complete technical route

### Surround, near-field, and BEV multi-task perception

Perception centered on four automotive fisheye cameras. Under a shared onboard compute budget, a multi-task model reused one backbone and specialized heads to infer parking spaces, ground markings, text, and drivable-area semantics in bird's-eye view. Two-dimensional detection and tracking on the surround images covered pedestrians, vehicles, cones, and traffic signs; ultrasonic sensors provided immediate near-field obstacle coverage.

The useful output was not merely a set of detections. Parking spaces and markings had to enter the semantic map; obstacles needed position and track state for local planning; text, arrows, and other ground semantics contributed to interpreting the garage. Sharing a backbone across tasks also avoided running an independent heavy model for every output.

### Fusion localization and semantic mapping

The localization stack combined visual, inertial, and wheel-odometry information, using extrinsic calibration and online initialization to establish a continuous vehicle trajectory. A factor graph brought motion observations, loop closures, and map constraints into one optimization. Bag-of-words retrieval proposed loop closures, while semantic ICP could further align current onboard perception with an existing offline map.

The map itself was layered. An occupancy/grid layer represented spaces, static obstacles, and free space; a structured semantic layer retained centerlines and other elements consumed by planning. Known-map mode localized directly against a reusable map. Unknown-map mode expanded the parking-space and aisle representation during safe exploration, creating a local map that could be used again.

### Separate planning for aisle driving and final parking

Driving through a garage aisle and maneuvering into a tight space have different geometry and timing constraints, so the system used hierarchical, phase-specific planners rather than one search method for every motion.

{{< avp-planning-pipeline >}}

During the **driving phase**, global planning treated the mapped aisle centerline as a structural prior. Improved A* found a coarse route from the current pose toward the target parking region; minimum-turning-radius arcs and a cubic B-spline then produced a smoother, curvature-continuous guide. Local planning sampled candidate states along that guide and scored centerline deviation, transition quality, obstacle clearance, and curvature:

$$
J_{\text{local}} = w_cJ_{\text{center}} + w_tJ_{\text{transition}}
+ w_oJ_{\text{obstacle}} + w_\kappa J_{\text{curvature}}.
$$

When perception reported a new obstacle or the current corridor became blocked, the local layer could select a new trajectory without rebuilding the entire global route.

During the **parking phase**, an improved Hybrid A* searched a pose-and-heading state space while respecting nonholonomic motion, minimum turning radius, and static collision constraints. Its coarse feasible path initialized an optimal-control problem:

$$
\min_{z(\cdot),u(\cdot),T}\; w_TT + \int_0^T u(t)^\mathsf{T}Ru(t)\,dt,
$$

which IPOPT refined under vehicle kinematics/dynamics, boundary states, and collision constraints. Combining search for topological feasibility with continuous optimization produced a trajectory that remained practical for the vehicle controller to track.

### Tracking control and safety feedback

The control layer separated lateral and longitudinal tracking and issued steering, braking, and drive commands through the vehicle network. In closed-loop operation, localization continuously updated tracking error, while visual and ultrasonic sensing refreshed obstacle state. A newly blocked aisle could trigger a stop or local replan. Park-in, retrieval, and summon were therefore online perception–localization–planning–control processes, not open-loop playback of a precomputed trajectory.

## Vehicle-system demonstrations

{{< project-video-gallery >}}

The first clip shows deployed surround multi-task perception. The second connects real garage images, tracked visual features, semantics, and the expanding map in one runtime view. The public versions crop out the IDE, internal paths, and irrelevant debug regions, and strip audio and file metadata.

## Project leadership and technical contribution

As project lead, I directed the program from requirement analysis and architecture through task decomposition, cross-module interfaces, and vehicle integration. My deeper algorithmic work centered on planning and control:

- aligned frames, rates, state semantics, and failure feedback across perception, mapping, planning, and control;
- created known-map and unknown-map operating flows so exploration, map reuse, park-in/out, and summon shared one system backbone;
- designed the global/local driving planners and the Hybrid-A*–optimal-control parking stack;
- connected vehicle motion, obstacle, and smoothness constraints to trajectories the chassis could track; and
- drove simulation, closed-site, and real-garage integration around perception updates, localization drift, planning failures, and tracking error.

This page publishes the program-level architecture, an explainable technical route, and sanitized demonstrations. Internal requirement, acceptance, and commercial documents are intentionally not distributed as webpage assets.

## Engineering perspective

AVP compresses an autonomous-driving stack into a low-speed but tightly constrained environment. Fisheye distortion, weak texture, and repeated structures challenge perception and localization; narrow aisles and a nonholonomic vehicle challenge planning; space boundaries and near-field obstacles demand stable control. Leading this program reinforced that deployment depends less on one algorithm's peak score than on whether every interface in the loop is observable, testable, and able to degrade safely when conditions change.
