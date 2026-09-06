---
{
  "weight": 20,
  "title": "Factory Material Handling with a Dual-Arm Mobile Robot",
  "date": "2026-09-06T00:00:00Z",
  "lastmod": "2026-09-06T00:00:00Z",
  "summary": "A factory deployment connecting object recognition, workstation navigation, and dual-arm manipulation for tote unstacking, transport, and placement.",
  "featured": true,
  "reading_time": false,
  "share": true,
  "tags": [
    "Industrial Robotics",
    "Dual-arm Manipulation",
    "Object Recognition"
  ],
  "image": {
    "filename": "featured.png",
    "caption": "Generated technical illustration of perception, navigation, and tote handling with a dual-arm mobile robot.",
    "alt_text": "Generated technical illustration: a wheeled robot holds one tote with both arms beside perception, navigation, handling, and feedback panels."
  },
  "project": {
    "collaboration": "Industrial material handling",
    "period": "Factory application and robot validation",
    "status": "Factory deployment project",
    "card_label": "Factory handling · Dual-arm mobile manipulation",
    "wider_system": "Object recognition, navigation, dual-arm unstacking, tote transfer, and state feedback",
    "role": "Responsible for object recognition and dual-arm manipulation.",
    "outputs": "Tote recognition, coordinated lifting, mobile transport, and placement demonstration",
    "context": "The project connects perception, mobility, and manipulation into a handling cycle that transfers totes between pickup and delivery areas.",
    "focus_label": "My role",
    "outputs_label": "Robot demonstration"
  },
  "project_videos": [
    {
      "src": "tote-transfer.mp4",
      "poster": "tote-transfer-poster.jpg",
      "title": "Autonomous dual-arm tote transfer",
      "description": "Robot handling excerpt: recognition, lifting, transport, and placement. Source footage is labeled 3× speed."
    }
  ]
}
---

Factory tote handling connects storage areas with workstations. A robot must identify an accessible tote, approach from a suitable position, lift it with both arms, transport it, and place it at its destination. **This project brings object recognition, mobile navigation, and dual-arm manipulation together for material handling in a real factory deployment.**

{{< project-overview >}}

## From tote recognition to transport between workstations

A fixed arm has a limited workspace. A mobile base extends that reach, but its stopping position must support camera visibility, arm reachability, and clearance for retreating with a tote. Removing successive totes also changes the stack and the next grasp height, so each handling cycle needs updated target and scene information.

The system connects perception and decision-making, navigation coordination, tote handling, and motion control. Perception supplies target and neighboring-object states; navigation establishes viewing and working positions; manipulation handles grasping, lifting, and release. Arrival and action-completion signals advance the task.

{{< factory-system-map >}}

## Technical approach

### Recognizing objects and selecting a target

Images and depth observations describe the totes and their spatial arrangement. The perception pipeline turns visible objects into an actionable target through depth processing, geometric feature extraction, segmentation, and assessment of neighboring objects. These observations inform the unloading order and handling mode.

Near the working position, target pose tracking and refinement connect the tote's principal directions with suitable contact locations. The resulting spatial description supports dual-arm action generation. Closely packed or occluded totes also require attention to approach direction and gripper clearance.

### Navigation and workstation alignment

Navigation connects pickup and delivery areas while establishing a useful viewpoint for manipulation. The robot first approaches the target region, determines whether a side view is needed, and then moves to a finer pickup position. Arrival at the delivery region triggers the placement sequence.

This staged approach connects travel with close-range manipulation: the base establishes a reachable working position, vision updates the relative tote pose, and the arms execute the handling action. Task states distinguish target search, pickup arrival, and delivery arrival so that navigation and manipulation progress together.

### Coordinating two arms around one tote

Both arms act on the same object. Target pose information supports contact-pose generation, followed by approach, grasp, lift, and retreat. During handling, coordinated end-effector motion maintains the tote's orientation while allowing clearance from nearby structures.

Planning must account for both arms, the carried tote, and surrounding obstacles. Arm clearance alone is insufficient when the tote can collide with a stack or workstation. Joint motion constraints also matter when connecting lifting, transfer, and lowering into a smooth trajectory.

### Placement and the next cycle

At the destination, the system adjusts the placement position, lowers the tote with both arms, releases it, and retreats. Completion resets the manipulation state and refreshes perception before selecting the next target.

This cycle connects individual grasps into repeated material transfer. Arrival, holding, placement, and release states provide the interfaces between navigation and manipulation.

## Robot demonstration

{{< project-video-gallery >}}

The clip shows viewpoint adjustment, target recognition, coordinated lifting, mobile transport, and placement. **The source video is labeled 3× speed**; this page preserves its playback timing. It is an indoor robot demonstration and does not establish factory throughput or long-duration success rates.

## My contribution

I was responsible for **object recognition and dual-arm manipulation**, helping connect target perception with robot handling actions for tote unstacking and transfer.

## Industrial context and related research

Dual-arm mobile manipulation connects transport between workstations with object handling within them. Tote transfer, unstacking, and loading or unloading require coordination across perception, docking, grasping, and release, with state updates as the material layout changes.

Two public research directions provide useful context. [FoundationPose](https://nvlabs.github.io/FoundationPose/) studies 6D object pose estimation and tracking, connecting visual observations with object coordinates. [ReKep](https://rekep-robot.github.io/) represents manipulation tasks through relational keypoint constraints and connects spatial relationships with closed-loop action planning. These are external references; the project workflow and robot demonstration are described above.

The broader project plan also explores material picking and task-level closed-loop decision-making. This page focuses on tote handling; those research extensions are not counted among the demonstrated results.
