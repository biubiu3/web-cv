---
{
  "weight": 10,
  "title": "A Robotic Chemist: Full-Stack Dual-Arm Mobile Manipulation for AI for Science",
  "date": "2026-09-06T00:00:00Z",
  "lastmod": "2026-09-06T00:00:00Z",
  "summary": "Empowering robots to operate autonomously in modern chemical laboratories: a full-stack dual-arm mobile platform combining human demonstration retargeting, few-shot sim-to-real transfer, millimeter-precision labware handling, and long-horizon self-repairing task planning.",
  "featured": true,
  "reading_time": false,
  "share": true,
  "tags": [
    "AI for Science",
    "Dual-Arm Mobile Manipulation",
    "Embodied AI",
    "Robot Learning"
  ],
  "image": {
    "filename": "featured.png",
    "caption": "Robotic Chemist system architecture: an autonomous mobile base connects workstations, while coordinated dual arms perform delicate labware manipulation unified with demonstration learning and closed-loop physical feedback.",
    "alt_text": "Robotic Chemist system overview: a dual-arm mobile robot navigating between laboratory workstations to manipulate tubes and beakers."
  },
  "project": {
    "collaboration": "AI for Science · Modern Laboratory Robotics",
    "period": "Core System R&D and Real-Robot Validation",
    "status": "Full-System Real-Robot Validation & Policy Deployment",
    "card_label": "Robotic Chemist · Dual-Arm Mobile Manipulation",
    "wider_system": "Autonomous mobile navigation, multimodal 3D perception, coordinated dual-arm manipulation, demonstration retargeting, few-shot skill learning, and LLM/VLM hierarchical planning",
    "role": "Core Technical Lead: Directed dual-arm manipulation policy development and closed-loop task execution, mastering millimeter-precision labware handling, centrifuge insertion, and autonomous self-repairing workflows.",
    "outputs": "End-to-end real-robot mobile chemistry trials, precision centrifuge loading, few-shot skill learning, and adaptive closed-loop execution",
    "context": "Addressing the critical physical bottleneck of AI for Science, this project creates an autonomous 'Robotic Chemist' capable of multi-station navigation, delicate bimanual manipulation, and adaptive task planning. The platform unifies human demonstrations, high-fidelity simulation, and physical execution to automate complex chemical workflows end-to-end.",
    "focus_label": "Technical Leadership",
    "outputs_label": "Key Deliverables & Verification"
  },
  "project_videos": [
    {
      "src": "labware.mp4",
      "poster": "labware-poster.jpg",
      "title": "Precision Tube & Beaker Coordinated Manipulation",
      "description": "Real-time recording: the dual-arm robot autonomously identifies labware, executes stable adaptive grasps, and performs precision fluid transfer."
    },
    {
      "src": "centrifuge.mp4",
      "poster": "centrifuge-poster.jpg",
      "title": "Autonomous Centrifuge Workstation Operation",
      "description": "Real-time recording: the robotic arm localizes narrow centrifuge slots with millimeter precision, executing smooth tube insertion and balanced loading."
    }
  ]
}
---

Scientific discovery is entering an era driven by computational models and generative hypothesis generation. However, computational proposals must ultimately be verified through physical experiments in real laboratories with delicate vessels and analytical instruments. **This project develops an autonomous 'Robotic Chemist' that executes complete experimental workflows end-to-end.**

An agile mobile base traverses fume hoods, balances, centrifuges, and analytical workstations; coordinated bimanual arms execute delicate reagent handling; and a hierarchical embodied agent translates experimental protocols into verified physical execution.

{{< project-overview >}}

## From Atomic Actions to Autonomous Laboratory Workflows

Operating in a chemical laboratory poses rigorous challenges to robot spatial perception, trajectory smoothness, and contact precision: grasping fragile thin-walled glass beakers requires contact force awareness and precise surface orientation; pouring demands millimeter-level relative 6D pose tracking; and loading sample tubes into a high-speed centrifuge demands insertion under sub-millimeter tolerances.

| System Layer | Core Technical Focus | Laboratory Impact |
|---|---|---|
| Environment & Proprioception | 3D visual 6D pose estimation & unified multimodal states | Accurately resolves transparent/reflective glassware and instrument slots |
| Mobility & Whole-Body Coordination | Coordinated base, torso, and dual-arm dynamics | Navigates across workstations and establishes optimal ergonomic manipulation postures |
| Precision Skill Library | Robust grasping, adaptive alignment, pouring, and instrument use | Encapsulates reliable, reusable closed-loop atomic manipulation skills |
| Agentic Planning & Self-Repair | VLM-driven hierarchical task decomposition & physical outcome verification | Autonomously parses complex protocols, detects deviations, and self-repairs without human intervention |

{{< chemist-system-map >}}

## Key Technical Breakthroughs: From Demonstrations to Lifelong Skills

### High-Fidelity Human-to-Robot Motion Retargeting

Human expert demonstrations capture rich bimanual coordination and intuitive collision avoidance. To bridge the kinematic discrepancies between human anatomy and industrial robot arms, we developed a temporal motion retargeting pipeline using segmented inverse kinematics.

The algorithm extracts relative 6D vessel geometry, approach/retreat vectors, and temporal coordination constraints. By optimizing joint limits, workspace reachability, and acceleration smoothness, it produces dynamically feasible robot trajectories that preserve fine-grained manipulation semantics.

### Few-Shot Sim-to-Real Transfer with 3D Gaussian Scene Synthesis

Fragile glassware and expensive reagents forbid unconstrained trial-and-error in the real world. We introduced a few-shot sim-to-real transfer paradigm: 3D Gaussian Splatting (3DGS) reconstructs high-fidelity digital twins of laboratory workstations and instruments, creating interactive, physics-grounded simulation environments.

Privileged teacher policies explore freely with ground-truth state supervision, while lightweight student policies learn to act strictly from realistic onboard sensor streams. Domain randomization across lighting, textures, and physical friction enables seamless zero-shot sim-to-real transfer.

### Coordinated Bimanual Manipulation & Modular Skill Library

As **Core Technical Lead**, I spearheaded the development of the dual-arm manipulation stack, solving critical challenges in grasp stability, narrow-space insertion, and cross-arm collision avoidance:

- **Beaker & Large-Vessel Handling**: Modeled contact point stability and dynamic center-of-mass shifts to suppress liquid sloshing during high-speed transport;
- **Slender-Neck Object Acquisition**: Optimized gripper attack angles and normal approach vectors to acquire delicate tubes across diverse tabletop layouts;
- **Precision Centrifuge Insertion**: Implemented hierarchical visual servoing—coarse overhead alignment followed by axial descent and compliant insertion—ensuring damage-free tube placement;
- **Workspace Decoupling**: Organized grasping, transfer, alignment, and release into self-contained Skill Blocks with explicit preconditions and post-conditions for dynamic orchestration.

{{< chemist-skills >}}

### Long-Horizon Agent Planning & Autonomous Error Recovery

Complex synthesis protocols involve dozens of sequential stages spanning hours. We leveraged multimodal foundation models (VLMs) grounded in domain chemistry knowledge to decompose high-level protocols into structured skill sequences.

After executing each skill, onboard multimodal perception verifies spatial relationships and physical outcomes (e.g., verifying complete tube seating or exact liquid transfer). When deviations occur, the agent initiates multi-tiered recovery: local re-perception, adaptive retry, or dynamic plan re-routing—enabling true unattended autonomy.

## Real-Robot Demonstrations & Physical Validation

<div class="chemist-videos">

{{< project-video-gallery >}}

</div>

The real-robot demonstrations illustrate the system's dexterity in a physical laboratory: transferring vessels between tube racks, balances, and beakers, and performing high-precision tube loading into a benchtop centrifuge with remarkable stability.

## AI for Science: The Physical Foundation for Autonomous Discovery

The strategic value of the Robotic Chemist lies in bridging computational intelligence with the physical world. From Nature-featured mobile chemists to autonomous reasoning systems like Coscientist, robotics is revolutionizing the scientific method.

By unifying autonomous navigation, delicate dual-arm manipulation, and closed-loop validation, our platform allows high-dimensional computational models to be tested around the clock with unprecedented throughput and reproducibility.

Looking forward, this system will integrate inline spectroscopy, microfluidics, and active learning loops—transforming experimental science from manual trial-and-error into autonomous, hypothesis-driven discovery!
