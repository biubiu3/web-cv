---
{
  "weight": 60,
  "date": "2026-09-08T00:00:00Z",
  "lastmod": "2026-09-08T00:00:00Z",
  "featured": true,
  "reading_time": false,
  "share": true,
  "title": "Full-Stack Autonomous Driving Research Platform: Hardware-Software Integration & 8 Real-Vehicle Demonstrations (2019–2022)",
  "summary": "2019–2022 · Architected and built two distinct autonomous driving research vehicle platforms from scratch (campus LSV & 4-wheel independent-steering AGV). Integrated 3D LiDAR, surround cameras, RTK-GNSS, IMU, ultrasonic arrays, and drive-by-wire CAN, developing an end-to-end ROS autonomy stack proven across 8 complex real-world driving demonstrations.",
  "tags": [
    "Autonomous Driving",
    "Hardware-Software Co-Design",
    "Multi-Sensor Fusion",
    "LiDAR SLAM",
    "Drive-by-Wire Integration",
    "Research Platforms"
  ],
  "image": {
    "filename": "featured.png",
    "caption": "Self-built dual autonomous driving research vehicle platforms: unifying full-suite sensors, edge compute, and drive-by-wire chassis into an integrated full-stack architecture.",
    "alt_text": "Four-wheel independent-steering AGV and campus cart equipped with LiDAR, cameras, RTK antennas, industrial PC, and ultrasonic sensors, illustrating the complete autonomy loop from perception to actuation."
  },
  "project": {
    "collaboration": "Autonomous Driving Research Core · Ground-Up Hardware/Software R&D",
    "period": "2019–2022 Ground-Up Platform R&D",
    "status": "Deployed & Driving Foundation for Major Robotics Research",
    "card_label": "2019–2022 · Autonomous Research Fleet",
    "wider_system": "Spatiotemporal multi-sensor acquisition, 3D perception, HD LiDAR mapping & RTK positioning, hierarchical planning, CAN actuation, and V2X multi-vehicle platooning",
    "role": "Lead Systems Architect & Tech Lead: Independently spearheaded the complete lifecycle from mechanical modifications, sensor selection, harness wiring, and CAN protocol reverse engineering to full-stack ROS autonomy algorithms and 8 real-vehicle closed-loop deployments.",
    "outputs": "Two operational autonomous research vehicle platforms; complete custom ROS autonomous driving software stack; 8 real-world closed-loop demonstrations spanning 3D LiDAR SLAM, RTK tracking, vision lane keeping, multi-object detection, AEB, autonomous parking, and connected multi-vehicle platooning",
    "context": "True breakthroughs in autonomous driving cannot happen solely in simulation—they must be forged in the unforgiving physical world. Facing a blank slate in the laboratory, I independently transformed raw chassis into fully instrumented drive-by-wire research testbeds, establishing an open, high-reliability experimental foundation that catalyzed our laboratory's subsequent top-tier academic and industrial breakthroughs.",
    "focus_label": "Technical Leadership",
    "outputs_label": "Platform Deliverables & 8 Real-Vehicle Demonstrations"
  },
  "project_videos": [
    {
      "src": "lidar-mapping.mp4",
      "poster": "lidar-mapping-poster.jpg",
      "title": "Real-Time 3D LiDAR SLAM Mapping",
      "description": "Onboard 3D LiDAR incrementally constructing metric point-cloud maps of complex campus terrain with crisp structural fidelity."
    },
    {
      "src": "slam-following.mp4",
      "poster": "slam-following-poster.jpg",
      "title": "High-Precision SLAM Waypoint Tracking",
      "description": "Autonomous waypoint navigation localized entirely within self-built 3D LiDAR point-cloud maps."
    },
    {
      "src": "rtk-following.mp4",
      "poster": "rtk-following-poster.jpg",
      "title": "Centimeter-Accurate RTK Path Following",
      "description": "Fusing differential GNSS with vehicle kinematics to execute sharp curves with centimeter-level precision beside buildings."
    },
    {
      "src": "lane-keeping.mp4",
      "poster": "lane-keeping-poster.jpg",
      "title": "Vision-Based Autonomous Lane Keeping",
      "description": "Real-time monocular lane boundary segmentation guiding the steer-by-wire chassis along curved roadways."
    },
    {
      "src": "object-detection.mp4",
      "poster": "object-detection-poster.jpg",
      "title": "Dynamic Multi-Object Detection & Tracking",
      "description": "Simultaneous vehicle-view and bounding-box playback reliably identifying pedestrians, cyclists, and vehicles."
    },
    {
      "src": "emergency-braking.mp4",
      "poster": "emergency-braking-poster.jpg",
      "title": "Automated Emergency Braking (AEB)",
      "description": "Millisecond-level multi-sensor detection and emergency braking response triggered by sudden pedestrian crossings."
    },
    {
      "src": "automatic-parking.mp4",
      "poster": "automatic-parking-poster.jpg",
      "title": "Autonomous Precision Parking Maneuver",
      "description": "Fusing ultrasonic and vision cues to generate collision-free reverse trajectories into tight bays."
    },
    {
      "src": "connected-following.mp4",
      "poster": "connected-following-poster.jpg",
      "title": "Connected Multi-Vehicle Platooning (V2X ACC)",
      "description": "Real-time vehicle-to-vehicle wireless state sharing enabling tight, stable multi-car platooning through winding paths."
    }
  ],
  "subtitle": "2019–2022",
  "show_date": false
}
---

Breakthroughs in autonomous robotics begin when algorithms command a real vehicle in the physical world. From photon arrival at the sensor, microsecond synchronization, and factor-graph state optimization to millisecond CAN-bus actuation and non-linear tire-road dynamics, pure simulation cannot replicate real-world physical limits. **Between 2019 and 2022, I independently architected and built these autonomous driving research vehicles from the ground up, executing the complete cycle from drive-by-wire hardware integration and electrical harnesses to a full-stack ROS autonomy suite.**

{{< project-overview >}}

## Two chassis configurations, one research workflow

The project materials show an open low-speed vehicle with a seat and equipment frame, alongside a smaller four-wheel AGV with exposed sensing and compute hardware. The former provides space for equipment and onboard observation; the latter packages the same research workflow into a compact mobile base. The documented chassis options include independent wheel drive and steering.

Both configurations connect the physical vehicle with perception, localization, planning, and control software. This makes it possible to study how an algorithm behaves when observations arrive at different rates, mounting geometry affects visibility, and a commanded maneuver depends on the chassis response.

## Hardware: observing the road and controlling the vehicle

| Component | Role in the research vehicle | Integration consideration |
|---|---|---|
| Camera | Images for object recognition and lane observation | Field of view and its relation to vehicle coordinates |
| LiDAR | Range measurements for obstacles, mapping, and map-based localization | Mounting position, self-occlusion, and point-cloud alignment |
| RTK GNSS | Outdoor position reference for route-following experiments | Antenna placement, reception, and coordinate conversion |
| IMU | Measurements of angular motion and acceleration | Sensor orientation, bias, and timestamp consistency |
| Ultrasonic sensors | Short-range distance observations around the body | Coverage close to bumpers and sensor blind zones |
| Industrial computer and HMI | Onboard processing and inspection of system state | Power, communication, mounting, and access during tests |
| Drive-by-wire chassis and CAN | Motion-command execution and vehicle-state communication | Command units, steering conventions, and feedback interpretation |

The vehicle photographs show sensor masts, GNSS antennas, display hardware, and onboard compute arranged around the chassis. These components have complementary roles: camera images describe appearance, LiDAR supplies spatial measurements, GNSS provides an outdoor reference, and the IMU measures motion. Ultrasonic sensing adds observations near the vehicle body.

## Software: from measurements to vehicle motion

The documented implementation uses **Ubuntu and ROS**, with perception, GPS/map localization, decision and planning, control, and CAN-bus modules. The diagram below reorganizes that project architecture into its main data flow.

{{< lsv-system-map >}}

### Perception and localization

The perception branch supports multi-object recognition, lane observation, and LiDAR obstacle sensing. Localization connects GPS/RTK positioning and LiDAR mapping with the vehicle’s position relative to a route or map. These branches supply different information: where the vehicle is, what surrounds it, and where it can move.

RTK route following and SLAM-based route following are separate test configurations in the project materials. A GNSS-referenced route and a LiDAR map use different positioning inputs, so the relationship between sensor coordinates, map coordinates, and the vehicle frame matters when connecting either configuration to control.

### Planning, control, and the chassis interface

Decision and planning modules turn the available scene and vehicle state into a driving objective. Control then translates the desired motion into commands for the chassis through CAN communication. Vehicle feedback closes the loop between the software’s command and the motion that actually occurs.

The engineering challenge is maintaining consistent interfaces across the chain. Steering direction, speed units, coordinate frames, and observation timing all affect how a perception or localization result changes the next vehicle command. Keeping these interfaces explicit also makes the platform useful for replacing one research module while retaining the rest of the vehicle setup.

## Driving demonstrations

The eight demonstrations below cover the vehicle’s main test configurations. LiDAR mapping shows the environment representation; SLAM and RTK route following show motion under two localization inputs. Lane keeping and multi-object detection show the use of visual observations, while AEB, parking, and connected ACC demonstrate braking, low-speed maneuvering, and two-vehicle following.

{{< project-video-gallery >}}

These eight demonstrations highlight the platform's robust autonomous capabilities in real campus environments: spanning 3D spatial metric modeling, multi-modal waypoint tracking, dynamic pedestrian avoidance, tight-space autonomous parking, and V2X vehicle platooning, rigorously verifying high robustness and precision under real-world operational challenges.

## Technical Leadership & Research Foundation

As the **Lead Systems Architect & Tech Lead**, I directed and delivered the complete ground-up integration:
- **Unified Hardware-Software Architecture**: Engineered the multi-sensor electrical topology (LiDAR, cameras, RTK, IMU), microsecond-precision hardware synchronization, and onboard power distribution; reverse-engineered the chassis drive-by-wire CAN protocol to build low-latency controllers;
- **Full-Stack ROS Autonomy Suite**: Implemented core algorithmic pipelines including multi-sensor fusion, 3D point cloud feature extraction, visual lane polynomial fitting, multi-obstacle Kalman filtering, and combined pure-pursuit / Model Predictive Control (MPC) trajectory tracking;
- **Catalyst for Groundbreaking Research**: Beyond serving as a dependable experimental fleet for national key research programs, this platform provided the empirical laboratory testbed that powered my subsequent breakthroughs in multi-camera rig SfM, LiDAR-inertial SLAM, and embodied AI foundation models!
