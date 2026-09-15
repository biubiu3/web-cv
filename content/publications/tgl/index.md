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

## The retraining tax

Language models inherited a substrate that took humanity centuries to produce: text, code, books, records. Embodied intelligence has no such inheritance, because its evidence does not exist until a robot or a simulator is run. Robot datasets have grown impressively, and the more impressive they get, the clearer it becomes how much infrastructure has to be built before robot data resembles a mature substrate at all.

The problem is not only volume. The evidence a robot most needs is the evidence least likely to appear in a clean demonstration set: near collisions, transparent and deformable objects, unstable grasps, partial insertions, moments where two sensors disagree, recoveries after an interrupted sequence, and the chained states that earlier mistakes produce. These are exactly the situations that make a policy fail, and they are the situations a curated dataset quietly filters out.

So consider what happens when a deployed robot meets one of them. Maybe the grasp slips on a new kind of packaging. The fix is local. It concerns one object, one material, one scene. But if the policy is a monolithic network, there is no way to make a local fix. You collect more data covering the failure, retrain, and regression-test the whole thing to confirm you did not break something else. A change distributed across parameters is hard to inspect, delimiting is hard, and certifying it locally is impossible.

We call this the retraining tax: the mismatch between a local gap and a global update. Every uncovered object becomes a new version of the entire policy.

![A local gap forces a global update.](retraining-tax.png "Repairing one failure in a monolithic policy costs new data, a full update, and regression testing.")

Three constraints shaped what we did about it. Robot data has to be produced by operating machines, so we cannot simply wait for more. Exploration on real hardware is slow and sometimes unsafe, which rules out learning from scratch by trial. And whatever we build has to preserve the fast, low-latency execution that end-to-end policies are genuinely good at. We have no interest in trading a working controller for a slower one.

## What the alternatives leave unrepaired

End-to-end vision-language-action and world-action models are remarkable in coverage and bounded by it. Beyond the validated physical range, web-scale semantics do not supply the geometry, dynamics or contact behavior needed to execute. There is also an architectural limit that matters more for our purposes: the observation interface, the policy invocation, the action decoder, the success check and the fallback are all predetermined. Feedback can change the next action. It cannot change the route.

Learning by exploration removes the need for demonstrations but moves the cost onto the robot. Agentic exploration can assemble and repair behavior without updating a task-specific policy, and on a physical platform it requires many sequential decisions and can trigger unsafe actions. That is our reason for seeding with teaching rather than starting from nothing.

Behavior cloning and reinforcement learning are defined by their learning object, not by being wrong. Cloning turns demonstrations into supervised action targets. Reinforcement learning uses interaction to change a policy or a value function. Neither makes capability itself the object of learning: a failure becomes distribution mismatch or a reward signal rather than a structured cause, a missing block or a negative condition, and whatever is learned persists distributed in parameters.

Planner and tool-using agents are the important ancestors here, and the difference is one of placement. SayCan, Code as Policies, VoxPoser, ReKep and Inner Monologue all put a model inside a workflow that someone else fixed. Our step is that the agent owns the evolving workflow instead of filling a slot in it.

Robot operating layers and skill-memory systems are the family we are closest to, and we should say so plainly. What we could not find is the conjunction: a continuous cycle where few-shot teaching seeds abstraction across demonstrations, the agent executes and revises a closed-loop composition, success and failure change persistent skill state, and mature behavior can be compressed into something fast.

## Why this is hard in specific ways

Coverage is combinatorial rather than additive. Object identity, pose, clutter, illumination, camera, gripper, material, contact mode, task relation: dense coverage is the product of the regimes along each factor, and even screening every pair of factors is quadratic. Factored scaling curves exist in the first place because exhaustive environmental variation is unaffordable.

Precision behaves like a tail that wags the data. As tolerance tightens, the demonstrations required grow sharply, so the last increments of physical precision can cost more than everything before them.

Then there is verification. Confirming that a repair did not break anything else scales with coverage, which means the cost of checking is the cost of the whole system. Adding a sensor or a new body is not impossible, but each one demands aligned interaction, fusion, calibration and broad regression. Alignment across demonstrations is its own problem: two demonstrations of the same task differ in timing and motion, so they have to be aligned by what they accomplish rather than by motor coordinates, and they need not contain the same number of raw segments.

Two conceptual traps sit underneath all of this. The first is invariance. A segment that still depends on the original coordinates is an episode, not a reusable behavior, and deciding which parts are invariant and which are instance-specific is the central judgement. The second is fluency. A plan that reads well is not evidence that a grasp succeeded, and we wanted an architecture where it is hard to confuse the two.

## Changing what the robot can retrieve, not what it knows

The idea is simple to state. A robot should learn by changing what it can retrieve and execute, not by changing its weights.

That means each acquisition has to produce an explicit object. The object separates semantic structure, which is invariant and reusable, from physical realization, which is recomputed for the current scene. And it carries its own applicability conditions, executors, success test and recovery. That object is what we call a Skill Block.

![A Skill Block separates reusable strategy from scene-bound execution.](skill-block.png "Subgoal, scope, strategy, grounding, executors, outcome test and recoveries.")

A block is a tuple: a subgoal, a scope, a reusable strategy, a grounding function that turns current observations into scene-bound variables, a set of executors, an outcome test returning pass, fail or inconclusive, and a bounded set of recoveries. Remove the scope and the verifier and a block is a plan nobody can check. Remove grounding and it is a trajectory replayed into a world that has changed.

Granularity is decided by semantic closure and reuse, not by duration or the number of motor commands. Closing a gripper can be a block. So can the sequence of detecting a container, approaching it, closing, lifting, and checking that the object is retained.

The parameter update rule is deliberately trivial. The foundation weights do not move. What changes is the library of blocks and the memory, and both change only through admission checks. The policy supplies priors. The library supplies executable behavior. The memory guides the agent but cannot execute anything by itself.

## Two stores, and why they are separate

The Skill Library keeps validated behavior. Experience Memory keeps structured records of what happened: the task, the context, which blocks were used, the outcome, the diagnosis, the repair, and the evidence behind it, stored in a compact form a human can read and correct.

The split is deliberate. The library remembers how to act. Memory remembers what experience taught. Systems that conflate the two end up remembering a great many episodes without gaining a reusable behavior, or carrying a broad policy without retaining the lesson behind a repair.

![Skills and experience are stored separately and used differently.](learning-ecosystem.png "The library holds executable behavior; memory holds the reasoning behind it.")

## From demonstrations to blocks

Teaching comes in more forms than the phrase "a few demonstrations" suggests: robot demonstrations, human video, written instructions. We normalize each source while keeping its type, because a video and a joint trajectory carry different kinds of evidence.

The pipeline then splits trajectories at meaningful state changes, aligns the resulting segments by the effect they achieve rather than by their motor profile, and separates each aligned group into semantic invariants, behavioral invariants, and instance variables. What gets excluded is as important as what gets kept. Demonstration world coordinates, pixel values, the path that was actually taken, the joint trajectory, and a low-level replay of the actions are all discarded. Storing any of them would tie the lesson to its first setting.

Scope expands only when there is variation to support it. Pose invariance requires repeated success across poses. Object-level abstraction requires multiple instances of the object. Affordance-level reuse requires cross-category success. Generality is earned by evidence, and a pattern seen with one instrument stays narrow.

At task time the agent composes blocks into a route, and the route is a plan for what comes next rather than a script fixed at episode start. The agent may keep it, shorten it, or replace the rest, and it can change its mind whenever the physical state changes meaningfully.

## Who controls what

The architecture assigns responsibility asymmetrically, and this is the part we would defend hardest. The agent owns questions that change the route. Robot-native executors own metric motion, contact, and control.

Keeping that line lets a language-level plan exist without being treated as motor authority. It also localizes improvement. A better grasp detector replaces one component. A new recovery attaches to the effect that failed.

A block handoff illustrates the boundary. An acquisition block ends by verifying that the object is retained. The next block only needs the achieved effect, that the target is held. It does not need to know which backend produced it, which is what makes the block portable across a parallel gripper, a suction cup, or a dexterous hand.

## Teaching and learning promote each other

The loop we are describing has a name in the Xue Ji, the classical Chinese text on learning: 教学相长, teaching and learning promote one another. The cycle runs teach, compose, act and check, grow, then teach again from a better position than before.

The character of the teaching changes as the system matures. Early on you teach whole behaviors, because nothing exists yet. Later you teach against specific gaps: rare failures, new tools, missing transitions. That progression is what the paper's closing line is about. Deployment remains a period of learning. The goal is not to preserve every interaction, but to keep the small part of experience that turns today's unfamiliar task into tomorrow's reusable capability.

## The scaling claim, stated carefully

We propose that two quantities follow power laws toward floors. The first is how much of a task the system can handle as effective experience grows. The second is how much teaching is still needed. Writing $X$ for effective reusable experience, we hypothesize

$$
E_{\mathrm{future}}(X) = E_\infty + A X^{-\alpha},
\qquad
D_{\mathrm{teach}}(X) = D_\infty + B X^{-\beta}.
$$

The important word is effective. $X$ is not a count of episodes. It is a score over stored history, fixed in advance and hidden from future task outcomes, weighted by how reliable the evidence behind a lesson is, how much new coverage it adds, whether it can be retrieved when needed, whether its grounding still holds, and whether it composes with blocks already admitted. Two robots can store the same number of episodes yet possess very different amounts of effective experience.

On the cost side, the per-block cost decomposes into teaching, grounding, validating and linking. If scope and validation stay local, cumulative cost grows at most linearly in the number of blocks. Block contracts and scopes are what keep the update local.

We are explicit that this is a hypothesis. The claim that more experience should help is not yet a scaling law, and it will not be one without a defined resource, a defined outcome, a stable relationship between them, and a prediction on held-out tasks.

![Effective reusable experience, not episode count, is the proposed resource.](experience-scaling.png "The scaling claim is stated as a testable hypothesis rather than a measured law.")

## Where the architecture is heading

A mature behavior can eventually be compressed into a fast student, whether that is a vision-language-action model, a world-action model, a diffusion policy, or a controller specialized to one block. The student is trained only on verified agentic trajectories and hands control back to the agent when it is uncertain.

The ordering matters. Distillation is the proposed next step for the fast path, and it is not the mechanism by which a task first became available. Compressing behavior before it has been acquired and verified would recreate exactly the problem we started with.

## What the studies do and do not show

We evaluated in the LIBERO simulator on a single embodiment. The visual decomposition study uses a deterministic decomposition, with the multimodal agent as the general formulation. The fixed-executor library study is a compact mechanism study rather than a broad benchmark. The induced acquisition block's scope is object-specific and was not exposed as a generic capability.

The main practical cost today is time. An unfamiliar task may need several rounds of agent reasoning, tool use and observation, and the agentic path is slower than feedforward policy inference. Cross-embodiment reuse is the natural next test and we have not run it. The four levels of retention need to be measured rather than asserted, and fleet-level sharing of blocks is future work.

A failure-localization cohort in the paper shows something we think is more useful than a headline number: the learned route does not close every gap. Motion planning, path consistency and calibration problems, and gripper-closure failures stay outside what this architecture repairs, and knowing which failures are localized and which are not is the beginning of knowing where to invest.

## Why we think the framing survives the next model

The architecture is built to be indifferent to progress in foundation models. A stronger model becomes a better block executor, a better fast path, or a better distilled student. The toolbox may shrink, but the need to organize behavior, interpret outcomes, and retain new competence does not.

The analogy we keep using is the difference between asking a language model for one answer and giving a coding agent a workspace. In robotics the workspace is physical and the artifacts are executable skills and grounded experience. The last line of the paper is the version we would put on a wall: a robot should be able to learn a local lesson locally.
