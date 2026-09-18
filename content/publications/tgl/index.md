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
abstract: "Teach-and-Grow Learning (TGL) turns sparse teaching into reusable robot skills while pretrained model weights stay fixed. An AI Agent identifies shared subgoals, grounds closed-loop Skill Blocks in the current scene, and checks physical outcomes before deciding what comes next. A persistent Skill Library keeps verified behavior; Experience Memory retains the conditions, failures, and repairs that guide later tasks."
summary: "A few demonstrations become reusable robot skills. An AI Agent executes, verifies, and retains behavior and experience with pretrained weights fixed."
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
    id: 2608.17209
  - type: custom
    name: Project website
    url: https://tgl.changnie.top/
  - type: code
    url: https://github.com/IRMVLab/TGL
---

## A few demonstrations become skills that stay

Teach-and-Grow Learning (TGL) is a training-free architecture for general robot learning. A few successful demonstrations become reusable robot skills, with pretrained model weights that remain fixed. An AI Agent organizes the task, grounds each skill in the current scene, checks what the robot actually did, and keeps the behavior and experience that can help with the next task.

**Teach → Act and verify → Grow.** Teaching supplies subgoals and shared structure. Physical feedback guides execution and recovery. A persistent Skill Library and Experience Memory make the result of one task the starting point for another.

[Read the paper · arXiv](https://arxiv.org/abs/2608.17209) · [Project website and demonstrations](https://tgl.changnie.top/) · [Code](https://github.com/IRMVLab/TGL)

## Where end-to-end robot learning gets expensive

A robot meets a new container, a changed camera, or a grasp that no longer works. The gap may be small, but repairing it through a policy update usually means new data collection, another optimization run, and regression checks on everything the policy already supported. The project calls this recurring burden the **retraining tax**.

Physical interaction data has a different cost structure from text or code. Contact has to be observed, a grasp has to be tried, and the actual change has to be checked. Object pose, camera geometry, clutter, material, and embodiment also interact, so covering one factor does not cover their combinations.

TGL asks whether the correction can stay explicit: a behavior with a supported scope, a failure condition that can be inspected, and a recovery rule that can be revised. Robot foundation models supply the priors the system depends on; TGL changes where new task knowledge is stored.

![Two routes to acquiring an unfamiliar pick-and-place behavior.](fig1-pdf.png "Figure 1. Policy optimization and explicit skill acquisition, illustrated through the same unfamiliar manipulation task.")

## From an AI Agent that can plan to a robot that can grow

The work began with an AI Agent driving the robot through perception, grasping, planning, and control tools. Such an agent can complete a task without teaching. The next question is what remains after the episode ends: does the system have to reason through the same task again, or can it retrieve a behavior it has already verified?

TGL keeps the agent's observe–act–review loop and makes its useful results persistent. A successful task becomes Skill Blocks with a stated scope and an outcome test. The conditions and repairs enter Experience Memory. Later tasks can retrieve the shared structure and use execution to resolve what has changed.

Sparse teaching provides a productive starting point. Successful demonstrations supply a subgoal sequence early, so exploration can concentrate on variation, correction, and missing transitions. **Teaching is an accelerator, not a precondition.** Robot trajectories, simulation, human video, and written procedures can supply different kinds of evidence; the robot still has to ground and verify the behavior locally.

## Make executable capability the object of learning

A demonstration holds two different things: a strategy worth keeping, and physical details that belong to one scene. TGL separates them.

Consider placing a bowl on a plate. Across demonstrations, the hand may approach from different directions and follow different paths. The shared structure is steadier: acquire the requested bowl, establish that it is held, move toward the target relation, and release it onto the plate. A **Skill Block** preserves the intended effect, reusable strategy, applicability conditions, and outcome test. Current observations supply the object pose, grasp, path, and control target.

**Training-free** has a precise meaning here: acquiring the incoming task invokes no gradient update, fine-tuning, or reinforcement-learning stage. The AI Agent and specialist models may already be pretrained. What changes during acquisition is the explicit skill and memory state.

![Teaching, agent-guided execution, verification, and persistent growth.](fig2-pdf.png "Figure 2. One task moves through teaching, composition, execution, verification, and persistent storage. The resulting library and memory become the starting point for the next task.")

## Subgoal reasoning on top, geometric control underneath

The AI Agent organizes the task at meaningful state transitions. Inside each block, specialized executors handle geometry and continuous control.

**Read demonstrations as evidence about change.** Segments align by what they accomplish, even when their timing and motion differ. The shared structure becomes a candidate strategy. Variation across demonstrations determines its supported scope.

**Give each skill a contract with the scene.** A block states the intended effect, when it applies, the evidence it needs, compatible executors, an outcome test, and allowed recovery. A closed gripper alone does not establish that an object is held; verification has to refer to the intended physical effect.

**Revise the remaining plan after the robot acts.** A passed effect opens the next stage. A failed or inconclusive effect can call for another observation, a different executor, or a revised route. What happens next depends on what actually happened.

**Validate before making a candidate reusable.** Supported scope, executor compatibility, outcome tests, and recovery are checked beyond the teaching demonstrations. Weak candidates are narrowed or repaired before entering the library.

![A reusable Skill Block contract and its current-scene execution loop.](fig3-pdf.png "Figure 3. The contract connects a semantic subgoal to grounded execution and observable evidence. Strategy is carried forward; geometry and control are recomputed.")

The implementation uses **OpenAI GPT-6 Astra and Codex** for task-level reasoning and tool interaction. Detection, segmentation, RGB-D geometry, Contact-GraspNet, MPLib, and controllers supply physical grounding and execution. This division lets the agent organize the task while robot tools answer the metric questions that manipulation requires.

## A skill stores behavior. Memory stores its lessons.

The **Skill Library** holds behaviors that can be selected and run: their subgoals, supported conditions, grounding rules, compatible tools, and verification logic. A text description of how to grasp is not enough; the block must connect that intent to an executor and a test of its effect.

**Experience Memory** keeps the context of use: the task, selected blocks, observations, outcome, diagnosis, and repair. A failed attempt may reveal an unsuitable grasp or an ambiguous observation. Keeping that explanation can guide the next selection without turning every episode into a new executable block.

This separation also keeps the system inspectable. A person can narrow an overgeneralized scope, change a recovery rule, or mark a tool version as incompatible. The robot can retrieve both a behavior and the conditions that make it useful.

## Let reusable experience accumulate

Storing more trajectories does not necessarily add more capability. Experience has value when it can still be retrieved, grounded, and composed in a new scene. The Teach-and-Grow hypothesis relates this **effective reusable experience** to lower future-task error and less teaching for related tasks.

![Effective reusable experience, the scaling hypothesis, and a future fast-policy path.](fig4-pdf.png "Figure 4. Conceptual predictions for future-task error and teaching demand. The curves are schematic.")

The same idea motivates local updates. When grounding, validation, compatibility checks, and retrieval stay manageable, adding a Skill Block can avoid reopening the entire learning system. The paper analyzes the conditions under which this can change the cost of acquiring new capabilities.

![Conditional acquisition costs for globally coupled updates and local skill additions.](fig5-pdf.png "Figure 5. Analytic cost regimes under different assumptions about coverage and local compatibility.")

## VLA, WAM, and robot tools within one learning system

TGL provides an AI Agent-driven operating layer that organizes learned policies and classical robot methods. A trained policy can execute a Skill Block; a geometric planner can connect two skills; visual servoing can close a local loop; tactile sensing can strengthen a contact check. The agent selects these capabilities, reads their outcomes, and decides what to retain.

The proposed slow-teacher–fast-student path extends this division. Agentic acquisition handles unfamiliar behavior through observation, reasoning, and tool use. Its verified trajectories can supply training data for a fast policy that executes mature behavior. When that policy encounters an unfamiliar condition, control can return to the agent to diagnose the gap and expand the library.

![Teaching sources, robot methods, tools, and persistent knowledge around the TGL learning cycle.](fig6-pdf.png "Figure 6. A whole-system view of TGL. Dashed paths indicate proposed fast-policy training and fleet sharing.")

The contribution is the connected learning cycle: sparse teaching, explicit closed-loop skills, execution with fixed weights, physical feedback, and persistent experience work together through shared interfaces. A task leaves behind something the robot can retrieve, inspect, and execute again.

## Seeing the mechanism in action

The paper studies TGL in LIBERO and LIBERO-Plus, including how demonstrations become skills, what persists after a task, how feedback changes the next decision, and how library growth supports related tasks. The [paired demonstration videos](https://tgl.changnie.top/#demos) show the same goal reached through a different grasp, or an unsuccessful attempt followed by observation and recovery.

Experimental protocols, quantitative results, and comparisons are available in the [paper](https://arxiv.org/abs/2608.17209).
