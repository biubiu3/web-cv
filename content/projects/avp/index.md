---
weight: 40
title: "Production-Grade Campus & Garage Automated Valet Parking (AVP) Full-Stack System"
date: "2022-02-15T00:00:00Z"
lastmod: "2026-09-08T00:00:00Z"
summary: "A production-oriented full-stack Automated Valet Parking (AVP) system developed with Voyager Intelligent Systems. Integrating surround fisheye BEV multi-task perception, multi-sensor SLAM, hierarchical driving & parking planning, and robust vehicle tracking control into an unmanned, closed-loop real-vehicle system across complex multi-floor garages."
featured: true
reading_time: false
share: true
tags:
  - Autonomous Driving
  - Automated Valet Parking
  - Industrial Deployment
  - BEV Multi-Task Perception
  - Multi-Sensor Fusion SLAM
  - Hybrid A* Planning
  - Optimal Control
image:
  filename: 'featured.png'
  caption: 'Full-stack AVP system architecture: surround and ultrasonic perception feed BEV semantic mapping, hierarchical driving/parking planning, and robust chassis execution.'
  alt_text: 'Technical overview of an automated valet parking system, showing four surround camera views and ultrasonic sensing, a central bird-eye semantic parking map, and global driving, local avoidance, parking, and vehicle-control stages.'
project:
  collaboration: 'Voyager Intelligent Systems Mass-Production Partnership'
  period: 'Full-Stack Architecture & Real-Vehicle Fleet Validation'
  status: 'Production-Engineered & Real-Vehicle Deployed'
  card_label: 'Automated Valet Parking · Full AVP Stack'
  wider_system: 'User HMI, surround fisheye/ultrasonic perception, multi-sensor fusion localization, BEV semantic mapping, driving & parking planning, dynamic chassis control, and remote summon'
  role: 'Project Lead (Tech Lead): Directed overall full-stack architecture, cross-module integration, and real-vehicle deployment; led the core algorithmic R&D for the integrated driving-parking planning and control pipeline.'
  outputs: 'Industrial-grade BEV perception and semantic mapping system; end-to-end autonomous exploration, precision park-in/out, and remote multi-floor summoning on real production vehicles'
  context: 'Overcoming extreme challenges in multi-floor underground garages—including featureless corridors, dynamic obstacles, tight clearance, and total GNSS denial—this system established an onboard-compute-powered L4 autonomous valet parking stack validated across extensive real-vehicle fleet trials.'
  focus_label: 'Technical Leadership'
  outputs_label: 'Core Deliverables & Real-World Validation'
project_videos:
  - src: 'bev-perception.mp4'
    poster: 'bev-perception-poster.jpg'
    title: 'Surround-View BEV Multi-Task Perception'
    description: 'Dynamic in-vehicle playback: real-time bird-eye view semantics, 4-way unwrapped fisheye streams, and high-precision parking space and lane marking tracking.'
  - src: 'garage-mapping.mp4'
    poster: 'garage-mapping-poster.jpg'
    title: 'Autonomous Garage Exploration & Full-Stack System Integration'
    description: 'Autonomous vehicle operation in multi-floor garages: synchronized surround perception, visual odometry, vehicle kinematics, and incremental semantic parking map construction.'
---

{{< project-overview >}}

Addressing the driverless "last-mile" mobility challenge, this project delivered a **production-grade Automated Valet Parking (AVP) full-stack system** in deep collaboration with leading ADAS provider **Voyager Intelligent Systems**. Operating entirely on onboard computing and sensing without reliance on expensive infrastructure, the vehicle autonomously navigates complex multi-floor garages: parsing dense spatial semantics, exploring unmapped facilities or reusing prior maps, planning collision-free trajectories through tight aisles, executing millimeter-accurate parking maneuvers into tight spaces, and returning safely to the driver via remote smartphone summoning.

As the **Project Tech Lead**, I directed the end-to-end system architecture, cross-team module harmonization, and real-vehicle field trials, while spearheading the core algorithmic engineering for **hierarchical driving & parking planning, nonlinear trajectory optimization, and robust lateral-longitudinal tracking control**.

## Autonomous driving from drop-off to parking

Automated valet parking addresses the full driverless last mile: a user leaves a vehicle at a drop-off point; the vehicle travels through the facility, finds or approaches a space, and parks; it later returns to a requested pickup point. Published after this project, [ISO 23374-1:2023](https://www.iso.org/standard/78420.html) describes AVP as Level 4 operation of unoccupied vehicles within a prescribed parking facility and defines a logical architecture across vehicle, facility, and user domains. The industry also includes infrastructure-guided designs, exemplified by the public [Bosch–Daimler AVP system](https://www.bosch-presse.de/pressportal/us/en/press-release-8576.html).

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

Perception outputs were organized for downstream use. Parking spaces and markings entered the semantic map; obstacle positions and tracks fed local planning. Text and arrows helped interpret the garage. Sharing the network backbone reduced onboard computation.

### Fusion localization and semantic mapping

The localization stack combined visual, inertial, and wheel-odometry information, using extrinsic calibration and online initialization to establish a continuous vehicle trajectory. A factor graph brought motion observations, loop closures, and map constraints into one optimization. Bag-of-words retrieval proposed loop closures, while semantic ICP could further align current onboard perception with an existing offline map.

The map itself was layered. An occupancy/grid layer represented spaces, static obstacles, and free space; a structured semantic layer retained centerlines and other elements consumed by planning. Known-map mode localized directly against a reusable map. Unknown-map mode expanded the parking-space and aisle representation during safe exploration, creating a local map that could be used again.

### Separate planning for aisle driving and final parking

Driving through a garage aisle and maneuvering into a tight space have different geometry and timing constraints, so the system used a separate planner for each phase.

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

The controller tracked lateral and longitudinal motion and sent steering, braking, and drive commands through the vehicle network. Localization updated tracking error, while visual and ultrasonic sensing refreshed obstacles. A blocked aisle triggered a stop or local replan. Parking, retrieval, and summon all used this feedback.

## Vehicle-system demonstrations

{{< project-video-gallery >}}

The first clip shows surround multi-task perception. The second shows garage images, tracked features, and map updates during a vehicle run.

## Technical Leadership & Full-Stack Engineering Contributions

As the **Project Tech Lead**, I directed the end-to-end engineering lifecycle—from system architecture, module decoupling, and spatiotemporal calibration to simulation, closed-track validation, and real-garage commissioning:

- **System Architecture & Robust Interface Design**: Defined unified, low-latency protocols connecting perception, SLAM, planning, and CAN chassis actuation, implementing hierarchical fail-safes and health monitoring;
- **Full-Cycle Autonomous Operational Workflows**: Architected end-to-end state machines supporting both prior-map reuse and zero-prior autonomous garage exploration, unifying autonomous cruising, precision parking, and cross-floor summoning into a cohesive pipeline;
- **High-Performance Planning & Control Algorithms**: Developed a hierarchical planning architecture uniting B-spline global smoothing, dynamic collision-avoidance local search, and Hybrid A* coupled with IPOPT optimal control to achieve centimeter-accurate parking with high ride comfort;
- **Real-Vehicle Fleet Validation**: Directed hundreds of autonomous parking trials across multi-floor commercial garages, systematically identifying and resolving edge-case visual feature loss, non-holonomic tracking drift, and dynamic obstacle deadlocks.

## Engineering Impact & Commercial Takeaways

Commercial underground garages represent one of the most challenging operational domains for autonomous driving: narrow corridors, dense structural columns, extreme lighting transitions, and uncooperative traffic. This project proved that robust Level-4 autonomous valet parking can be achieved purely via low-cost vehicle-side compute and sensors without expensive facility retrofitting. It demonstrated full-lifecycle technical maturity from mathematical modeling to real-world mass-production engineering.
