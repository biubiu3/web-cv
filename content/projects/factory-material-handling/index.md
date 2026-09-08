---
{
  "weight": 20,
  "title": "Industrial Logistics Robot: Autonomous Dual-Arm Mobile Manipulation & Tote Handling",
  "date": "2026-09-06T00:00:00Z",
  "lastmod": "2026-09-06T00:00:00Z",
  "summary": "Targeting unmanned industrial logistics, this full-stack system integrates robust 3D vision, high-precision workstation docking, and dual-arm coordinated heavy-payload manipulation for autonomous tote unstacking, inter-station transfer, and precision placement.",
  "featured": true,
  "reading_time": false,
  "share": true,
  "tags": [
    "Industrial Robotics",
    "Dual-Arm Manipulation",
    "3D Vision & 6D Pose Estimation",
    "Autonomous Mobile Manipulation",
    "System Deployment"
  ],
  "image": {
    "filename": "featured.png",
    "caption": "Full-stack dual-arm mobile manipulation system: fusing panoramic navigation with high-precision 3D vision for adaptive tote grasping and cross-station transfer.",
    "alt_text": "A wheeled dual-arm mobile robot autonomously identifying, unstacking, and transporting heavy totes across industrial workstations."
  },
  "project": {
    "collaboration": "Smart Manufacturing & Autonomous Factory Logistics",
    "period": "Core Algorithm Development & Production Deployment",
    "status": "Industrial Production Deployment",
    "card_label": "Industrial Logistics · Dual-Arm Mobile Manipulation",
    "wider_system": "3D vision pose estimation, autonomous navigation, dual-arm coordinated unstacking, adaptive tote transfer, and closed-loop execution",
    "role": "Core Algorithm Lead: Architected and implemented the end-to-end stack for 3D object recognition, 6D pose estimation, and dual-arm coordinated control, driving autonomous cross-workstation unstacking and tote transport to production deployment.",
    "outputs": "Production-grade high-precision tote perception, synchronized dual-arm unstacking, dynamic heavy-payload transport, and millimeter-level placement in real factories",
    "context": "Addressing flexible manufacturing and autonomous material flow, this system establishes seamless synergy across spatial perception, mobile navigation, and heavy-payload dual-arm manipulation. The robot autonomously performs dense tote unstacking, agile inter-station transit, and adaptive palletizing, establishing a reliable unmanned logistics loop.",
    "focus_label": "Technical Leadership",
    "outputs_label": "Key Deliverables & Real-World Validation"
  },
  "project_videos": [
    {
      "src": "tote-transfer.mp4",
      "poster": "tote-transfer-poster.jpg",
      "title": "Autonomous Dual-Arm Tote Transfer Pipeline",
      "description": "Real-world demonstration: robot autonomously identifies stacked totes, executes synchronized dual-arm lifting, navigates across workstations, and achieves millimeter-accurate placement."
    }
  ]
}
---

In modern smart manufacturing, agile inter-station material flow bridges automated storage and flexible assembly lines. Traditional fixed robotic arms suffer from restricted reach, while standard AGVs can only transport without manipulation capabilities. **This project delivers a breakthrough in whole-body coordination between an omnidirectional mobile base and dual collaborative arms, uniting 3D visual perception, agile navigation, and synchronized manipulation into a fully autonomous, production-ready material handling system.**

{{< project-overview >}}

## From Dense Tote Perception to Inter-Workstation Transfer

Tote handling in actual industrial environments demands uncompromising precision: totes are tightly stacked with batch-variable heights, while specular reflections and surface wear challenge computer vision. Mobile base docking must jointly satisfy camera field-of-view, kinematic dual-arm reachability, and collision-free clearance. Crucially, transporting heavy, rigid totes across uneven factory floors requires millisecond-level force-position coordination between both manipulators to prevent slipping, tilt, or excessive internal stresses.

The system is built upon four robust pillars: **Perception & Reasoning — Multi-Station Docking — Dual-Arm Coordination — Autonomous Recovery**.

{{< factory-system-map >}}

## Technical Architecture & Core Innovations

### Robust 3D Vision & Millimeter-Level 6D Pose Estimation

To conquer reflections, dirt, and severe occlusions common to industrial containers, the perception pipeline deeply fuses high-resolution RGB imagery with dense 3D point clouds:
- **Topology Parsing & Layer Segmentation**: Accurately establishes stacking hierarchy and geometric bounds from depth cues, determining the optimal unstacking sequence in real time.
- **6D Pose Estimation & Continuous Tracking**: Leverages geometric surface normal constraints and local point cloud registration to compute principal orientations and gripper contact surfaces with millimeter accuracy.
- **Interference-Free Approach Synthesis**: Automatically computes clearance cones within millimetric gaps between adjacent totes, guaranteeing collision-free gripper insertion.

### High-Precision Mobile Base Docking & Alignment

The mobile base and robotic arms coordinate in a multi-stage coarse-to-fine docking strategy:
- **Global Approach**: The mobile base navigates to the target workstation via global topological maps, autonomously choosing the optimal viewpoint based on visual observability.
- **Fine-Grained Visual Servoing**: Actively adjusts base orientation according to real-time 3D tracking, centering the tote within the dual-arm dexterous manipulation envelope.
- **Unified Mission State Machine**: Coordinates target acquisition, docking confirmation, dual-arm clamping, transit locking, and precision unloading, eliminating timing jitter between mobility and manipulation.

### Synchronized Dual-Arm Heavy-Payload Manipulation

Handling a single rigid body with two independent manipulators requires tight closed-loop kinematic and dynamic coupling:
- **Synchronized Trajectory Generation**: Automatically synthesizes symmetric dual-arm grasp poses, executing coordinated approach, force-controlled clamping, unified lifting, and compliant extraction.
- **Anti-Slosh & Inertial Stabilization**: Dynamically optimizes acceleration profiles along the transit path to dampen inertial oscillations, ensuring liquid and delicate payloads remain stable during rapid mobile transit.
- **Whole-Body Collision Avoidance**: Jointly models the swept volumes of both arms, the gripped container, the chassis, and surrounding machinery, ensuring safe traversal through narrow industrial corridors.

### Adaptive Precision Unloading & Continuous Operation

Upon reaching the destination workstation, the visual system recalibrates the drop-off plane and stacking height. The dual arms execute a compliant descent, releasing the tote with gentle touch sensing before retracting to home configuration. The perception state immediately updates, enabling seamless multi-cycle autonomous operation.

## Real-Robot Demonstration & Industrial Validation

{{< project-video-gallery >}}

The accompanying footage captures the complete autonomous cycle in a production environment: viewpoint self-adjustment, millisecond-level target recognition, synchronized dual-arm grasping, long-range mobile transit, and millimeter-level placement, proving industrial-grade reliability under demanding conditions.

## Technical Leadership & Engineering Impact

As the **Core Algorithm Lead**, I spearheaded the end-to-end development of the **3D vision, 6D pose estimation, and dual-arm coordinated manipulation** algorithms. Overcoming severe challenges in low-texture recognition, tight-clearance insertion, and dynamic whole-body stabilization, this work propelled the dual-arm mobile manipulation system into reliable industrial deployment, setting a benchmark for agile factory logistics.
