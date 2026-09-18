---
title: "Teach and Grow: An Agent-Centered Architecture for General Robot Learning"
authors:
  - me
  - Zhe Liu
  - Hesheng Wang
date: "2026-08-17T23:45:21Z"
publication_types: ["article"]
publication:
  name: "Under review at IEEE Transactions on Robotics"
  short_name: "T-RO (under review)"
venue_display: "IEEE Transactions on Robotics (T-RO)"
publication_status: "Under review"
publication_status_key: "under_review"
display_area: "General Robot Learning"
publication_order: 10
spotlight: true
peer_reviewed: false
open_access: true
abstract: "Teach-and-Grow Learning (TGL) acquires reusable robot skills from sparse teaching without gradient updates, fine-tuning, or reinforcement learning. OpenAI GPT-6 Astra reasons over subgoals and physical feedback, while Codex connects the agent to robot tools. Verified Skill Blocks and structured Experience Memory grow with fixed pretrained weights. The v2 paper reports 99.9% mean success on LIBERO and 92.4% on LIBERO-Plus."
summary: "Training-free skill acquisition with an AI Agent: fixed model weights, reusable skills, and 99.9% / 92.4% mean success on LIBERO / LIBERO-Plus."
story_order: 80
homepage_order: 10
topic_keywords:
  - Training-Free Robot Learning
  - Agentic AI
  - Generalist Robots
  - Continual Robot Learning
  - Embodied Agents
  - Skill Learning
  - Long-Term Memory
tags:
  - T-RO · Under Review
  - General Robot Systems
  - Agentic Robot Learning
  - Embodied Intelligence
  - Continual Learning
  - Multimodal Agents
  - Robot Manipulation
featured: true
image:
  caption: "Sparse teaching, fixed weights, reusable skills. Conceptual illustration."
  alt_text: "A Franka robot reuses a taught skill to place a plush toy into a bowl in a changed scene."
links:
  - type: preprint
    provider: arxiv
    id: 2608.17209v2
  - type: custom
    name: Project website
    url: https://tgl.changnie.top/
  - type: code
    url: https://github.com/IRMVLab/TGL
---

## Training-free robot learning

A robot encounters a new object or a grasp that no longer works. Adapting a learned policy typically requires more interaction data, another optimization run, and regression checks on earlier tasks. Teach-and-Grow Learning (TGL) asks whether that new capability can instead become an explicit, reusable skill while pretrained model weights stay fixed.

TGL uses an AI Agent to turn sparse teaching into closed-loop **Skill Blocks**. The agent grounds them in the current scene, calls robot tools, checks physical outcomes, and retains verified behavior for later tasks. The v2 paper reports **99.9% mean success on LIBERO** and **92.4% on LIBERO-Plus**.

[Read arXiv v2](https://arxiv.org/html/2608.17209v2) · [Project website and videos](https://tgl.changnie.top/) · [Code](https://github.com/IRMVLab/TGL)

## Why a local failure can require another training cycle

Robot experience has to be collected through physical or simulated interaction. Object pose, camera geometry, clutter, material, and embodiment also interact: covering each factor separately does not cover their combinations. A rare contact condition may need one specific correction, yet incorporating it through shared policy parameters can require a broader update and validation cycle. The paper calls this recurring cost the **retraining tax**.

TGL keeps the correction addressable. A new skill has a stated scope, an execution strategy, and an outcome test; a failed attempt can leave a condition or recovery rule that guides the next attempt. Learned policies still provide useful physical priors and can serve as executors within this architecture.

![Two routes to acquiring an unfamiliar pick-and-place behavior.](fig1-v2.webp "Figure 1. Policy training and agent-guided skill acquisition, illustrated with an unfamiliar plush toy. Conceptual comparison from the project website.")

## What changes when the weights stay fixed?

**Training-free refers to acquiring the incoming task:** no gradient update, fine-tuning, or reinforcement-learning stage is invoked. The agent and specialist robot models can already be pretrained. Task acquisition changes the Skill Library and Experience Memory.

The implementation uses **OpenAI GPT-6 Astra** for multimodal reasoning and **Codex** to connect the agent to robot tools. The agent selects subgoals, requests observations, chooses tools, and revises the remaining route. Perception, grasping, motion planning, servos, and controllers supply metric geometry, contact handling, and continuous control.

This division grew from direct agent control: inspect a scene, call a tool, observe the result, and try again. Such a loop can complete tasks without demonstrations, but repeated exploration consumes interactions and model calls. Teaching gives it a useful starting structure. It is an accelerator, rather than a prerequisite for agent control.

## Teach, act, verify, grow

1. **Teach.** Align demonstrations by the state changes they accomplish. Extract shared subgoals and strategies while keeping the evidence associated with each teaching source.
2. **Compose and act.** Retrieve suitable Skill Blocks, bind objects and geometry from fresh observations, and execute one meaningful stage.
3. **Verify.** Compare the observed effect with the intended one. Continue, reobserve, repair the route, request focused teaching, or stop.
4. **Grow.** Admit validated behavior to the Skill Library and record its conditions, outcome, diagnosis, and repair in Experience Memory. Both stores inform the next task.

![The full Teach-and-Grow loop, from teaching through execution and verification to persistent skills and experience.](fig2-v2.png "Figure 2. The agent checks each block's physical effect before deciding what comes next. The complete Grow state returns to composition for the next task.")

Successful teaching supplies a strategy; a failure identifies a condition under which that strategy needs attention. As the library grows, teaching can focus on a missing transition or an unfamiliar tool instead of repeating a complete task.

## A Skill Block keeps the effect, recomputes the motion

Consider placing a bowl on a plate. Demonstrations may use different approaches and paths, yet share the same effects: acquire the requested bowl, verify that it is held, establish the target relation, and release it. TGL retains this structure and computes the physical realization again for the current scene.

Each block carries seven fields: **subgoal, scope, reusable strategy, grounding function, compatible executors, outcome test, and bounded recovery choices**. The outcome test returns pass, fail, or inconclusive. A block may contain several perception–action iterations; its boundary follows a meaningful state change rather than a fixed duration.

![A Skill Block's seven fields and its observe, ground, execute, and verify loop.](fig3-v2.png "Figure 3. An explicit contract connects a semantic subgoal to current-scene execution and observable evidence.")

Demonstration world coordinates, pixels, old paths, joint trajectories, and low-level action replay are excluded from the reusable strategy. Scope expands only when supporting variation has been validated. The paper's induced acquisition block, for example, remains object-specific rather than becoming a generic can-grasping skill.

The **Skill Library** stores executable behavior. **Experience Memory** stores task context, selection conditions, outcomes, diagnoses, and repairs. This separation lets the agent retrieve both a behavior and the evidence needed to judge whether it applies. A stored episode alone does not become a validated skill.

## Results in the v2 paper

The paper evaluates task success on LIBERO and its perturbed extension, LIBERO-Plus. The following values reproduce TGL's rows in Tables I and II; each mean weights its suites or categories equally.

| LIBERO suite | Success rate |
| --- | ---: |
| Spatial | 99.7% |
| Object | 100.0% |
| Goal | 100.0% |
| Long | 99.9% |
| **Mean** | **99.9%** |

TGL ties LaST-R1 for the highest LIBERO mean among the methods compared in Table I.

| LIBERO-Plus perturbation | Success rate |
| --- | ---: |
| Camera | 87.3% |
| Robot initial state | 90.7% |
| Language | 96.8% |
| Lighting | 97.3% |
| Background | 97.4% |
| Sensor noise | 89.9% |
| Object layout | 87.2% |
| **Mean** | **92.4%** |

The LIBERO-Plus mean is the highest among the methods in Table II. Camera and sensor-noise results also identify room to improve visual grounding. The full comparison and cited baseline sources are in the [paper's evaluation section](https://arxiv.org/html/2608.17209v2#S5).

Controlled studies examine the learning operations behind task success:

**Demonstration decomposition.** Ten visual demonstrations yield 20 confirmed acquisition and release effects, using a deterministic decomposition.

**Persistent task-specific learning.** Three teacher trajectories produce two blocks that solve 3/3 evaluation states and retain 3/3 success after save-and-reload. Outside their learned scope, execution stops at the first unmet effect.

**Feedback-driven execution.** Two representative successful traces show route revision after grasping and a fresh observation after an inconclusive drawer-opening result.

**Fixed-executor library pilot.** Expanding the library from six to eight blocks raises success from 0/6 to 4/6 with model weights, runtime, and evaluation budget held fixed.


The pilot tests local library growth on two tasks. Its sample size and purpose differ from the benchmark tables; detailed protocols, uncertainty estimates, and acquisition costs appear in Appendix I. Demonstration videos are available on the [project website](https://tgl.changnie.top/).

## Scaling with reusable experience

TGL proposes effective reusable experience as a resource that can grow during deployment. It counts experience that remains validated, retrievable, grounded, and composable. Redundant episodes can add little, while one missing bridge block can enable several new compositions.

The scaling hypothesis predicts that related future-task error and teaching demand approach their own floors as this resource grows. The curves below are schematic, and the paper presents them as a hypothesis to test.

![Schematic future-task error and teaching demand as effective reusable experience grows.](fig4-v2.png "Figure 4. The scaling hypothesis and a proposed path from agentic acquisition to a fast student policy.")

A complementary cost analysis asks when adding a skill can remain local. Near-additive growth depends on bounded interfaces, local validation, and retrieval costs that are at most linear. If every addition reopens joint coverage and broad regression, acquisition can become more expensive as capability expands.

![Conceptual acquisition-cost regimes for globally coupled updates and local Skill Block additions.](fig5-v2.png "Figure 5. Conditional cost regimes and a precision-cost illustration; these are analytic concepts rather than measured benchmark curves.")

## How the architecture fits the robot stack

Human instruction, robot demonstrations, simulation, and video can supply teaching evidence. Learned policies and specialist tools supply executable behavior. The agent organizes these resources around subgoals and measured outcomes, with skill and experience storage closing the learning loop.

![The TGL ecosystem connects teaching sources, models, robot tools, verification, skills, and memory.](fig6-v2.png "Figure 6. The whole-system view. Dashed paths indicate proposed fast-policy distillation and fleet sharing.")

Repeated reasoning and observation add latency to unfamiliar tasks. The proposed fast-policy extension would train a student on verified trajectories and return uncertain cases to the agent. Such later training is separate from training-free task acquisition. Fleet sharing and cross-embodiment reuse likewise require local grounding and verification; the reported studies use LIBERO simulation on a single embodiment.

The practical objective is to make a lesson persist: acquire a behavior, check what it accomplishes, and leave the robot with a skill and experience it can use again.
