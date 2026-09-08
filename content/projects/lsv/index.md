---
{
  "weight": 60,
  "date": "2026-09-08T00:00:00Z",
  "lastmod": "2026-09-08T00:00:00Z",
  "featured": true,
  "reading_time": false,
  "share": true,
  "title": "Low-Speed Autonomous Research Vehicle (2019–2022)",
  "summary": "2019–2022 · A self-built autonomous driving research platform on low-speed vehicle and AGV chassis, integrating cameras, LiDAR, IMU, RTK GNSS, ultrasonic sensing, onboard computing, and drive-by-wire control.",
  "tags": [
    "Autonomous Driving",
    "Multi-sensor Integration",
    "Research Platforms"
  ],
  "image": {
    "filename": "featured.png",
    "caption": "Generated technical illustration based on the project’s two chassis configurations.",
    "alt_text": "Small four-wheel AGV with LiDAR, camera, RTK antennas, onboard computer and ultrasonic sensors, beside a low-speed campus cart and a sensing-to-control diagram."
  },
  "project": {
    "collaboration": "Autonomous driving · Research vehicle development",
    "period": "2019–2022",
    "status": "Built platforms and driving demonstrations",
    "card_label": "2019–2022 · Research vehicle",
    "wider_system": "Multi-sensor acquisition, perception, map-based and RTK localization, planning, control, and CAN communication",
    "role": "Built the autonomous driving research vehicle around low-speed vehicle and AGV chassis.",
    "outputs": "Two research chassis configurations; mapping, route following, perception, braking, parking, and vehicle-following demonstrations",
    "context": "A compact vehicle gives autonomy research a physical testbed with real sensors, onboard computation, chassis actuation, and feedback.",
    "focus_label": "My contribution",
    "outputs_label": "Platform and demonstrations"
  },
  "project_videos": [
    {
      "src": "lidar-mapping.mp4",
      "poster": "lidar-mapping-poster.jpg",
      "title": "LiDAR mapping",
      "description": "Point-cloud mapping visualization of the road and surrounding structures."
    },
    {
      "src": "slam-following.mp4",
      "poster": "slam-following-poster.jpg",
      "title": "SLAM route following",
      "description": "Vehicle motion along a test-area route, labeled SLAM route following in the project presentation."
    },
    {
      "src": "rtk-following.mp4",
      "poster": "rtk-following-poster.jpg",
      "title": "RTK route following",
      "description": "Excerpt from the RTK route-following test, showing a bend and travel beside a building."
    },
    {
      "src": "lane-keeping.mp4",
      "poster": "lane-keeping-poster.jpg",
      "title": "Lane keeping on the AGV platform",
      "description": "Vehicle motion on a marked road and the lane-region overlay on the onboard display."
    },
    {
      "src": "object-detection.mp4",
      "poster": "object-detection-poster.jpg",
      "title": "Multi-object detection",
      "description": "Onboard and close-up display views showing vehicle and pedestrian detection boxes and class labels."
    },
    {
      "src": "emergency-braking.mp4",
      "poster": "emergency-braking-poster.jpg",
      "title": "Automatic emergency braking (AEB)",
      "description": "Vehicle-response demonstration as a pedestrian stands ahead of the AGV and moves away from its path."
    },
    {
      "src": "automatic-parking.mp4",
      "poster": "automatic-parking-poster.jpg",
      "title": "Automatic parking",
      "description": "Low-speed parking maneuver beside marked spaces, showing vehicle positioning and entry into a bay."
    },
    {
      "src": "connected-following.mp4",
      "poster": "connected-following-poster.jpg",
      "title": "Connected ACC: two-vehicle following",
      "description": "Two low-speed vehicles following a curved course."
    }
  ],
  "subtitle": "2019–2022",
  "show_date": false
}
---

Autonomous driving research needs a way to put algorithms on a moving vehicle. Sensor observations must reach the onboard computer, estimated states must support planning, and control commands must produce the intended motion. **From 2019 to 2022, I built this research platform around low-speed campus-vehicle and logistics AGV chassis**, bringing the main sensing, computing, and actuation elements of an autonomous vehicle into a compact, accessible testbed.

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

The clips come from the project’s original animations, videos, and embedded presentation media, preserving the timing of the selected footage. RTK route following is a continuous excerpt; the other seven clips retain their full source sequences. Some background markings are blurred. These demonstrations show system behavior; localization error, braking distance, and following-gap accuracy require dedicated measurements.

## My contribution and the platform’s research value

My work was to **build the autonomous driving research vehicle using existing low-speed and AGV chassis**, integrating the sensors, onboard computing, and vehicle interfaces into a platform for real-world experiments. The resulting setup brings software development into contact with mounting constraints, sensor coverage, communication, and physical vehicle response.

A compact platform is useful for repeated experiments in a limited test area. Researchers can compare localization inputs, examine how perception affects vehicle motion, and investigate the connection between a planned path and its execution. It also makes hardware and intermediate software outputs accessible during development.

For broader context, [Autoware’s public overview](https://autoware.org/autoware-overview/) describes autonomous driving through sensing, perception, localization, planning, and control. Its [architecture documentation](https://docs.autoware.org/main/design/autoware-architecture-v1/) explains how defined interfaces allow individual modules to be replaced. These references help place the platform in the wider field; the project materials establish the ROS-based implementation described here.
