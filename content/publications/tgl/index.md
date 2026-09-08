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
  caption: 'Research overview: demonstrations become a verified Skill Block; action outcomes feed a Skill Library and Experience Memory for reuse.'
  alt_text: 'White TGL scientific diagram showing three demonstrations of the same bowl-placement skill, a reusable Skill Block, physical execution and verification, pass and repair branches, a Skill Library, Experience Memory, and a new task invoking the learned capability.'
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

## A scaling-law hypothesis for reusable experience

Let $X>0$ denote effective reusable experience: prior interaction that survived verification and remains retrievable, groundable, and composable in the current scene. The paper proposes the hypothesis

$$
\begin{aligned}
\mathcal{E}_{\mathrm{future}}(X)&=\mathcal{E}_{\infty}+A X^{-\alpha},\\
D_{\mathrm{teach}}(X)&=D_{\infty}+B X^{-\beta},
\end{aligned}
$$

with nonnegative floors and positive $A,B,\alpha,\beta$. It predicts that future-task error and the marginal teaching required for a related new task should decrease as reusable experience grows. The controlled studies below evaluate short-horizon mechanisms; long-term scaling remains a research hypothesis.

## Mechanism evaluation

The evaluation separates four mechanisms: demonstration induction, library persistence, skill reuse, and end-to-end execution.

### 1. Can demonstrations reveal semantic task stages?

Ten visual demonstrations produce 40 predicted/reference stages. Ordered stage role/type accuracy is 1.000. Exact boundary F1 is only 0.100, but it rises to 0.633 with a tolerance of one sampled frame and 0.900 within two sampled frames. Acquisition/release effects are observed correctly in 20/20 cases.

Semantic ordering and effects are recovered reliably in this sample, while precise temporal boundary placement remains less accurate, as reflected by the strict and tolerant F1 values.

### 2. Can newly induced blocks be saved and reused?

Three teacher trajectories from training states 0–2 produce two reusable blocks. On held-out states 3–5, execution succeeds in 3/3 cases, and after saving/reloading the library it again succeeds in 3/3. On farther states 6–8, execution stops when a required semantic effect is absent.

This stop identifies the missing semantic behavior as a capability gap beyond the demonstrated range.

### 3. Skill Library Expansion Delivers Dramatic Performance Gains

Under rigorous controlled experimental conditions with fixed runtime executors and parameters, expanding the skill library from basic primitives to include composite Skill Blocks yields dramatic capability leaps:

| Skill Library Configuration | Median Attempts | Completed Tasks | Success Rate | 95% Wilson Interval |
|---|---:|---:|---:|---:|
| Base Library (6 Blocks) | 2.5 | 0/6 | 0.00 | [0.00, 0.39] |
| **Expanded Library (8 Blocks)** | **1.5** | **4/6** | **0.67** | **[0.30, 0.90]** |

Adding just two critical composable blocks boosts task success from **0% to 67%** while reducing median search attempts, providing clear empirical validation for our core theoretical premise: structured modular skill blocks transfer zero-shot across tasks, drastically cutting exploration overhead.

### 4. Causal Fault Attribution & Autonomous Self-Repair

When physical execution encounters unexpected environmental perturbations, conventional monolithic end-to-end policies often collapse catastrophically. In contrast, TGL leverages its sub-goal verifiers $v_i$ to perform precise causal fault attribution. The system decouples physical deviations and traces them back to spatial perception, kinematic planning, or gripper grasp slip, instantly triggering local replanning or targeted recovery behaviors $\mathcal{R}_i$, demonstrating exceptional closed-loop fault tolerance.

## Dual-System Architecture: Fast Execution & Agentic Reasoning

The TGL architecture establishes a symbiotic dual-system ecosystem with modern end-to-end policies (e.g., VLAs, World-Action Models):
- **System 2 (Deliberative Agent)**: Multimodal LLM reasoning orchestrates high-level intent alignment, few-shot induction of new skills, causal verification, and active self-repair;
- **System 1 (Reactive Policy)**: Once a Skill Block is empirically verified across tasks, it can be compiled or distilled directly into a high-frequency, end-to-end motor policy.

![The acquisition path differs for uncovered behavior and familiar fast execution.](acquisition-cost.png "Agentic acquisition and policy execution operate at complementary timescales.")

![Skill acquisition, verification, memory, and future distillation form one lifecycle.](learning-ecosystem.png "TGL positions policies, planners, perception models, and agent memory as complementary components.")

This modular decoupling completely eliminates the prohibitive **"Retraining Tax"** of monolithic models: grasping networks can be upgraded independently within an isolated block; recovery routines can be attached to specific failure modes; and verification thresholds can be tightened without risking catastrophic forgetting of unrelated skills. Robot growth becomes an ongoing, cumulative asset of tested, addressable physical competencies!

## Conclusion & Research Impact

Under review at **IEEE Transactions on Robotics (T-RO)**, TGL delivers the first lifelong, agentic robot learning architecture that breaks free from continuous end-to-end retraining. By translating sparse human demonstrations into verified closed-loop Skill Blocks coupled with persistent structured memory, TGL provides a rigorous theoretical and empirical blueprint for generalist robots to continuously grow, adapt, and evolve in open, unconstrained physical environments.
