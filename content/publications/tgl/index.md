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
publication_order: 20
spotlight: true
peer_reviewed: false
open_access: true
abstract: "Teach-and-Grow Learning (TGL) is an agent-centered architecture for acquiring reusable robot capabilities from a small number of successful demonstrations. A multimodal agent builds closed-loop Skill Blocks, grounds and composes them in new scenes, chooses between learned and geometric tools, observes physical outcomes, and revises its route when execution departs from intent. A Skill Library and structured Experience Memory preserve successful behaviors, failures, and repairs for later reuse."
summary: "An agent-centered robot-learning architecture that turns sparse teaching into reusable Skill Blocks and persistent experience for future tasks."
story_order: 80
homepage_order: 10
topic_keywords:
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
  caption: "Experience becomes reusable robot skills."
  alt_text: "TGL — Experience becomes reusable robot skills."
links:
  - type: preprint
    provider: arxiv
    id: 2608.17209v1
---

## At a glance

| Question | Teach-and-Grow Learning (TGL) |
|---|---|
| How is an unfamiliar task acquired? | Several successful demonstrations reveal shared semantic stages and reusable behaviors |
| What is stored? | Closed-loop Skill Blocks in a Skill Library, plus outcomes and repairs in Experience Memory |
| Who controls motion? | Robot-native policies, planners, servos, and controllers |
| How does execution adapt? | The agent acts one meaningful stage, observes its physical effect, then continues, repairs, or asks for targeted teaching |
| Status | Preprint; under review at IEEE Transactions on Robotics |

Today's generalist robot policies absorb knowledge mainly through model weights. When a new object, modality, or failure lies outside that coverage, the usual answer is another data-collection and training cycle. That route is valuable for scalable fast execution, but it makes a small local lesson expensive: learning one unfamiliar placement may require updating a model that already knows hundreds of unrelated behaviors.

Teach-and-Grow Learning asks for a different lifecycle. A robot should be able to learn a new capability locally, verify it in the physical world, keep it as an addressable object, and use it when learning the next related task.

![The retraining route and the Teach-and-Grow route have different acquisition costs.](retraining-tax.png "End-to-end retraining absorbs every lesson into global weights; TGL preserves verified local capability.")

## From demonstrations to reusable strategy

TGL begins with a few successful demonstrations $\mathcal{D}$. The agent aligns demonstrations at state changes such as acquiring an object, opening a container, or reaching a target. It extracts shared stages, then grounds and executes them in a new scene.

A Skill Block is represented as

$$
b_i=\langle g_i,\mathcal{S}_i,\rho_i,\gamma_i,
\Pi_i,v_i,\mathcal{R}_i\rangle,
$$

where $g_i$ is the intended subgoal, $\mathcal{S}_i$ its scope, $\rho_i$ the strategy, $\gamma_i$ grounding requirements, $\Pi_i$ available executors, $v_i$ an outcome verifier, and $\mathcal{R}_i$ recovery behavior. A block specifies the expected effect, scene-grounding requirements, authorized robot tools, and success checks.

![A Skill Block binds intent, grounding, execution, verification, and recovery.](skill-block.png "A Skill Block packages a reusable closed-loop behavior.")

## Dynamic composition with robot-native execution

For the current observation, the agent retrieves and grounds blocks, then forms a route

$$
\tau_t=(b_{i_1},b_{i_2},\ldots,b_{i_m}).
$$

The agent selects between learned policies and geometric tools from the current state. Semantic reasoning chooses the route; robot-native executors handle metric geometry, collision checking, contact, joint targets, and continuous control.

Execution is deliberately receding-horizon at the semantic level:

1. Ground the objects and relations needed by the next block.
2. Invoke its authorized executor.
3. Observe the physical result and run the verifier.
4. Continue if the intended effect occurred; otherwise reobserve, repair the remaining route, explore a missing capability, or request targeted teaching.

Representative traces show this closed loop. In bowl-on-plate placement, the agent replans after an intermediate effect changes the remaining geometry. In drawer manipulation, it reobserves after movement and uses the measured physical consequence for the next semantic decision.

## Two persistent stores, two different jobs

Validated blocks enter the **Skill Library**. Structured **Experience Memory** records task, context, blocks used, outcome, diagnosis, repair, and evidence. The agent connects these recalled experiences to robot-native executors when planning the next attempt.

The learning state after task $n$ can be written schematically as

$$
\theta_{n+1}=\theta,
\qquad
(\mathcal{B}_{n+1},\mathcal{M}_{n+1})
=\operatorname{Update}(\mathcal{B}_n,\mathcal{M}_n,\mathcal{D}_n,\Delta_n),
$$

where foundation-model weights $\theta$ remain fixed while Skill Library $\mathcal{B}$ and Experience Memory $\mathcal{M}$ grow from demonstrations and verified outcomes $\Delta_n$. The architecture therefore operates at two timescales: slow global model improvement and fast local capability acquisition.

![Verified skills and structured experience accumulate through deployment.](experience-scaling.png "TGL treats reusable, validated experience as a resource that grows over the robot's lifetime.")

## How a local lesson becomes reusable

A useful lesson includes more than the successful motion. The system also needs to know when the skill applies, which objects and relations must be identified, and what physical effect should be checked afterwards. These conditions make a block retrievable and testable in a later scene.

For example, a placement skill must ground the object and support surface before execution. After release, the verifier checks whether the intended placement occurred. If the object moved unexpectedly, the agent can inspect the new state and revise the remaining route. The experience record connects that outcome to the context in which it happened.

## Growth through a library and memory

The Skill Library stores callable behavior; Experience Memory records how attempts unfolded. When facing a related task, the agent can retrieve an existing strategy together with relevant failures and repairs. Reuse therefore depends on the match between past experience and the current scene.

The paper asks whether accumulating usable experience can reduce future teaching and exploration. This is a research hypothesis about growth over time. The architecture makes the relevant units explicit: verified skills, their applicability conditions, and records that remain useful when retrieved.

## What the evaluation examines

The studies examine demonstration interpretation, saving and reloading skills, reuse in new states, and execution with different library contents. These tests ask whether a lesson survives beyond the original demonstration and whether added skills change the routes available to the agent.

## Reasoning and continuous control

The agent operates at meaningful task transitions. Policies, planners and controllers perform continuous robot motion. This division lets semantic decisions use observed outcomes while leaving fast control to robot-native components.

![Skill acquisition and familiar execution follow complementary paths.](acquisition-cost.png "The agent acquires and composes skills; robot-native tools execute their physical actions.")

A verified behavior may later become a candidate for policy training or distillation. That is a further development stage: the current architecture already allows learned executors and geometric tools to coexist within the same skill interface.

![Skills, verification and experience form a reusable learning lifecycle.](learning-ecosystem.png "The architecture connects task reasoning with executable behavior and persistent experience.")

The design lesson is to make acquired behavior an explicit part of the robot's operating system. A new skill can be inspected, revised and recalled together with the evidence that supports its use.
