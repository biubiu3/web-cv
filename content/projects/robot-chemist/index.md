---
{
  "title": "A Robotic Chemist: Dual-Arm Mobile Manipulation for AI for Science",
  "date": "2026-09-06T00:00:00Z",
  "lastmod": "2026-09-06T00:00:00Z",
  "summary": "Bringing robotic action to the laboratory: a dual-arm mobile platform for handling labware and interacting with instruments, with research into human demonstration, few-demonstration skill learning, simulation-to-reality transfer, and long-horizon task planning.",
  "featured": true,
  "reading_time": false,
  "share": true,
  "tags": [
    "AI for Science",
    "Dual-Arm Mobile Manipulation",
    "Robot Learning"
  ],
  "image": {
    "filename": "featured.jpg",
    "caption": "Robot footage at a laboratory instrument workstation.",
    "alt_text": "Robot arms, centrifuge, and tube racks"
  },
  "project": {
    "collaboration": "AI for Science · Laboratory robotics",
    "period": "Research and prototype validation",
    "status": "Laboratory demonstrations and policy-learning research",
    "card_label": "Robotic chemist · Dual-arm mobile manipulation",
    "wider_system": "Multimodal perception, mobile platform, dual-arm manipulation, demonstration mapping, skill learning, and hierarchical planning",
    "role": "Primary responsibility: robot manipulation.",
    "outputs": "Labware grasping, placement, and pouring demonstrations; centrifuge workstation footage",
    "context": "The project explores how a dual-arm mobile robot can learn and execute laboratory operations. Its architecture connects perception, learning, control, hardware, and task validation. Demonstrations show interactions with labware and instruments; the research route extends toward reusable skills and feedback-driven long-horizon tasks.",
    "focus_label": "My role",
    "outputs_label": "Demonstrations"
  },
  "project_videos": [
    {
      "src": "labware.mp4",
      "poster": "labware-poster.jpg",
      "title": "Tube and beaker manipulation",
      "description": "Real-time footage of labware manipulation at the bench."
    },
    {
      "src": "centrifuge.mp4",
      "poster": "featured.jpg",
      "title": "Centrifuge workstation",
      "description": "A real-time excerpt focused on robot arms, tubes, and the instrument."
    }
  ]
}
---

An AI-generated experimental plan still needs a physical executor. Tubes must leave their racks, vessels must be held steadily, and samples must move between instruments. A failed grasp or misplaced container can interrupt every subsequent step. **A robotic chemist connects experimental intent with action in the physical laboratory.**

This project uses a dual-arm mobile robot for labware manipulation and instrument interaction. Mobility connects workstations; two arms support coordinated handling; learning and planning research seeks to turn a small number of demonstrations into reusable, verifiable skills.

{{< project-overview >}}

## From individual actions to laboratory workflows

Grasping a beaker requires object geometry, pose, and a suitable contact region. Pouring adds relative-pose coordination between vessels. Instrument loading introduces narrow openings, contact, and release timing. Moving between workstations also couples base positioning with arm reachability.

| System layer | Core problem | Laboratory function |
|---|---|---|
| Environment and robot perception | Represent objects, workstations, and robot state | Identify targets and starting conditions |
| Mobility and whole-body coordination | Coordinate base, torso, and arms | Reach a workstation in a useful manipulation posture |
| Manipulation skills | Grasp, place, pour, and interact with instruments | Execute reusable short tasks |
| Planning and assessment | Sequence steps, check outcomes, and recover | Assemble skills into longer workflows |

{{< chemist-system-map >}}

## Research route: demonstrations to reusable skills

The following describes the research architecture. The videos illustrate manipulation settings and actions; validation of the complete learning, planning, and online-improvement loop requires separate system experiments.

### Human demonstration and motion mapping

Human demonstrations provide action order and bimanual coordination, but human joints and robot mechanisms differ. The research route uses temporal information to estimate continuous human motion, then segmented inverse kinematics to map it into executable robot joint configurations.

The useful structure includes relative vessel poses, approach and retreat directions, and timing between the arms. Joint limits, reachability, and continuity must be respected when converting that structure into training trajectories.

### Learning from few demonstrations across simulation and reality

Real-robot demonstrations are costly, while glassware and delicate contact constrain trial and error. The proposed route combines a small real demonstration set with interactive simulation: reconstruct the scene and objects, learn initial policies in simulation, and transfer deployable policies to real observation conditions.

Visual reconstruction methods such as 3D Gaussian representations can improve appearance consistency; collision geometry and physical parameters still require their own models. A teacher policy can use privileged simulation information, including accurate object states. A student learns to act from observations available on the robot. Variation in object poses, appearance, and physical conditions broadens training coverage.

### Whole-body coordination and a dual-arm skill library

The base and arms jointly determine reachability, collision clearance, and vessel orientation. Whole-body coordination must therefore organize mobility and manipulation together. Short laboratory tasks—tube pickup, placement, vessel holding, and pouring—provide reusable execution units.

{{< chemist-skills >}}

### Long-horizon planning, assessment, and recovery

A task planner must decompose an experimental instruction into steps with explicit prerequisites and select the corresponding skills. The research route explores scene knowledge and vision-language models for task decomposition, followed by checks on spatial relationships and completion state. A failed step can require renewed perception, a skill retry, or a revised plan.

Execution failures can also guide targeted simulation updates and further skill training. This makes errors useful for diagnosis and improvement. The benefit must ultimately be measured through task completion, error detection, and recovery performance.

## Robot demonstrations

<div class="chemist-videos">

{{< project-video-gallery >}}

</div>

The labware video records interactions around a tube rack, balance, beaker, and robot arms. The centrifuge excerpt shows arm and tube operations at an instrument workstation. These are observable action demonstrations; they do not establish liquid identity, dispensing accuracy, experimental yield, or unattended operation.

## My contribution: robot manipulation

I was primarily responsible for **robot manipulation**, the physical execution component for interacting with laboratory vessels and instruments. The architecture and research route above describe the wider project; my responsibility centered on the manipulation tasks.

## AI for Science: bringing computational proposals to the bench

Robotic chemists provide a physical interface between scientific computation and experimental execution. Two published directions offer context: [Burger et al.'s mobile robotic chemist](https://www.nature.com/articles/s41586-020-2442-2) demonstrated laboratory instrument use and experimental search; [Boiko et al.'s Coscientist](https://www.nature.com/articles/s41586-023-06792-0) explored language models connected to information retrieval, experimental planning, and automation. These are external research examples, not results or integrated components of this project.

This project focuses on embodied execution: grounding laboratory steps in perception, executable skills, and state feedback. Future connections to experimental design, instrument data, and sample tracking could support a cycle of proposing experiments, executing them, collecting results, and updating the next proposal.

## A scientific tool beyond chemistry

Reusable handling and workstation coordination could support reaction-condition screening, sample preparation, and formulation exploration in chemistry and materials research. Further development could address aliquoting and sample preparation in biology, or experimental preparation and analysis for drug-discovery research. These are prospective applications whose realization depends on domain requirements for measurement, cleanliness, cross-contamination control, and sample traceability.

The longer-term aim is to give researchers more time to formulate questions, design controls, and interpret results, while making repetitive experiments more consistent and better documented. Robotics can connect algorithms, instruments, and researchers so that more scientific ideas can be tested systematically.
