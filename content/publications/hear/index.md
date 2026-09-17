---
title: "Towards the Vision-Sound-Language-Action Paradigm: The HEAR Framework for Sound-Centric Manipulation"
authors:
  - me
  - Tianchen Deng
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2026-03-17T03:22:30Z"
publication_types: ["article-journal"]
publication:
  name: "The International Journal of Robotics Research"
  short_name: "IJRR"
venue_display: "The International Journal of Robotics Research (IJRR)"
publication_status: "Published"
publication_status_key: "published"
display_area: "Multisensory Robot Manipulation"
publication_order: 20
spotlight: true
peer_reviewed: true
open_access: true
abstract: "HEAR models vision, sound, language, and action in continuous robot control in which transient acoustic events remain available across delayed, chunked decision loops. The framework combines causal audio memory, multimodal reasoning, near-future audio prediction, and flow-matching action generation. OpenX-Sound and HEAR-Bench provide pretraining data and sound-causal evaluation tasks for this setting."
summary: "A sound-centric embodied framework that gives robot policies causal audio memory, multimodal reasoning, future-audio prediction, and smooth action generation."
story_order: 70
homepage_order: 20
topic_keywords:
  - Physical AI
  - Multisensory Robotics
  - Vision-Sound-Language-Action
  - Embodied AI
  - Multimodal Foundation Models
  - Robot Manipulation
tags:
  - IJRR 2026
  - General Robot Systems
  - Embodied Intelligence
  - Vision-Sound-Language-Action
  - Multimodal Foundation Models
  - Robot Manipulation
featured: true
image:
  caption: "Listening while acting."
  alt_text: "HEAR — Listening while acting."
hugoblox:
  ids:
    arxiv: 2603.16086v1
links:
  - type: custom
    label: Project
    url: https://hear.irmv.top/
  - type: code
    url: https://github.com/IRMVLab/HEAR
---

## Robots that cannot hear the physics

Current vision-language-action models see, understand language, and move. What they do not do is listen. They operate in what amounts to a silent world, even though the robot's own environment is full of sound that encodes physical state the cameras cannot recover: liquid starting to sputter as it boils, the sharp click of a collision, the difference in timbre between a full container and an empty one, the moment a material stops flexing and starts cracking.

Contact acoustics are the cheapest tactile sensor available. A microphone is a few dollars, it needs no contact, and it covers the whole workspace at once. The case for using it is not speculative. The problem is that nobody has built a policy that can.

## The cue is gone before the policy is asked

The difficulty is not a modelling problem, and framing it that way is why earlier approaches have not solved it. It comes from the control architecture that makes large VLA models practical.

A large backbone cannot run at control frequency. So the standard design chunks actions: the model produces a short sequence of future commands, the robot executes them open-loop, and only then does the model get queried again. That gap is where the physics happens. A collision, a boil-over, a completed press: these are brief, non-repeatable acoustic events, roughly on the order of a hundred milliseconds, and they routinely fall entirely inside the interval where the policy is not looking. The average chunk at 30 Hz is about a second long.

The consequence is worth stating precisely, because it is not what people usually assume. A late reaction would be a delay. What actually happens is that the evidence is destroyed. The audio arrives, nothing is listening, and by the time the policy is queried again, the window contains only silence. If an event occupies samples that end before the next window opens, the window does not contain a weak version of that event. It contains nothing. We call the interval between decisions the Blind Execution Interval, and the word blind is doing real work.

There is a second failure that has nothing to do with timing. Look at a robot that has been waiting beside a running appliance. If the scene is quasi-static, the current image looks the same whether it has been waiting one second or ten. The expert demonstrations differ, because the right next action depends on elapsed time, but the observation does not. A snapshot policy has no way to tell those situations apart, so it either drifts or freezes. This is the aliasing problem that temporal context is supposed to solve, and without audio it is genuinely unobservable.

## What earlier attempts leave out

Turning audio into text is the obvious first instinct, and it loses the thing we need. Speech recognition front ends discard non-speech cues and prosody entirely, and they compress timing into discrete tokens. A beep produces nothing at all. More subtly, an affirmative "Yes!" and a doubtful "Yes?" collapse into nearly identical token sequences, so the difference in pragmatic intent disappears while transcription accuracy looks perfect.

Rendering the waveform as an image and treating it as another camera view is the second instinct. It captures amplitude changes, and it obscures spectral structure: frequency contours and timbre, which is where material and contact information live. It is also sensitive to where the event happens to land inside the rendered window, so performance changes for reasons that have nothing to do with the physics.

A more recent line adds speech to VLA models and preserves prosody and speaker identity. That is real progress, and it targets explicit verbal commands rather than the ambient acoustic physics of manipulation, which is a different problem. The omni-modal systems are closer still, and the reservation is structural: they are built to listen before acting, using sound to establish context or infer intent around an action, rather than as low-level feedback during contact. None of them address the misalignment between transient events and chunked execution, which is the actual bottleneck.

Audio foundation models such as CLAP and ImageBind were trained on fixed-length clips, offline and independently. Deployed statelessly, they carry no temporal context across clips. Compact audio-native policies run fast and can handle contact, but their scale makes long-horizon, multi-stage behavior brittle. Processing audio natively turns out to be necessary and not sufficient.

The shortcut worth naming is faster replanning. Truncate the chunk, query more often, and the blind interval shrinks. We tried the variants. It helps less than it looks like it should, and it pays in motion quality: discontinuous, jerky trajectories that introduce localized action loops. It also cannot fix system latency, which no query rate eliminates. A cue lost to latency is lost regardless of how often you ask.

And the benchmarks are no help, because every standard simulator is silent. RLBench and ManiSkill test spatial reasoning and visual control in environments with no acoustic channel at all. Navigation benchmarks that do use sound let the agent move its base to improve its listening geometry, which is not an option for a manipulator that has to keep working while generating its own mechanical noise.

## Separate the sensing rate from the decision rate

Our answer comes from noticing that this is a rate mismatch, not an information deficit. The sound is there. The policy is simply asked too rarely to catch it.

So instead of making the policy faster, we stop tying the two rates together. A persistent memory is updated continuously from the audio stream, packet by packet, independently of when the policy is queried. When a decision is finally requested, the memory already contains everything that arrived, including events that happened during blind intervals. The robot is not reacting to the last window. It is reacting to the last second of listening, with the recent history summarized.

That is the core move, and everything else in the architecture is bookkeeping around it. There is something that remembers, something that interprets, something that predicts what comes next acoustically, and something that acts. We named them accordingly.

Two constraints shaped the design. The first is that the audio path has to be causal in the strict sense: nothing may look at samples that have not arrived, and the tokenizer must produce codes for a segment from that segment alone. The second is that the memory horizon has to be a target, not a hope. It needs to cover the worst-case decision gap plus the measured system latency, otherwise the guarantee is only statistical.

## The four modules

**Historizer.** Between two decision boundaries, the robot may receive a long run of consecutive audio packets, each about forty milliseconds. The Historizer consumes them as they arrive and updates a streaming stateful Transformer memory. The memory is read out at decision times and never otherwise. Its entire justification is the evidence-vanishing argument above: a window-only interface cannot represent something that happened just before the window opened. We also tried a causal GRU and exponential moving average pooling over audio features; the streaming attention's extra capacity earned its place. We chose a short window with a persistent summary over a very long window, because long windows mix distinct interaction phases together and make the result sensitive to exactly where the window boundary falls.

**Envisioner.** Interpretation is hierarchical, because the two jobs have very different frequencies. A high-level model reads the multi-view images, the current acoustic window, the instruction, proprioception and the memory, and produces three things: a semantic latent, a key-value cache, and a short structured description of the current task stage, something like `{"stage": "wait", "subgoal": "listen for beep"}`. That stage text comes from the high-level model's own text head. A smaller low-level model then reuses the cache with the current robot state to produce the control feature. The split keeps expensive semantic interpretation out of the fast path. The stage supervision matters more than it might appear: without it, tasks that require a quick behavioral shift suffer, because nothing forces the latent to name the phase it is in, and the phases that matter acoustically are often visually identical.

**Advancer.** This one predicts the audio that will arrive between the current decision and the next one, as discrete codes from the streaming tokenizer, trained by cross-entropy. It is used only during training and is dropped at deployment, so it costs nothing at inference time. Its purpose is to give the latent a concrete sense of elapsed time and process progression. Pouring, boiling, an alarm, a conversation: each has a different acoustic future, and predicting it forces the shared representation to encode where in the process the robot currently is. Without it, the failures look different from the Historizer's. They happen late. The robot keeps pouring after the sound has already told it to stop. That asymmetry is how we knew the two modules were solving different problems rather than duplicating each other.

**Realizer.** Actions are generated by conditional flow matching from a Gaussian prior to the action chunk, integrated in a handful of Euler steps, conditioned on the control feature through adaptive normalization. We used flow matching rather than diffusion for the step count. The detail worth dwelling on is why smoothness matters here. Replacing the Realizer with direct regression produces jitter, and jitter injects mechanical self-noise into the microphone signal, which masks the brief cues the rest of the system is trying to hear. A perception failure caused by a control choice. The sharpest version of the claim is that a policy which listens while moving has to move in a way that makes listening possible. Sensing and control are not separable in this setting.

![Streaming acoustic memory is updated between decisions, not at them.](historizer.jpg "The Historizer keeps cues that arrive inside a blind execution interval.")

![Interpretation is split across two frequencies.](envisioner.jpg "A high-level model produces semantics and task stage; a low-level model produces the control feature.")

![Predicting the near-future acoustics grounds the shared latent in time.](advancer.jpg "The Advancer is used only during training and is removed at deployment.")

The three objectives are summed with weights that ramp in over the first part of fine-tuning, so the model learns imitation before it is asked to be temporally grounded.

## Where the data came from, since it did not exist

No robot dataset contains synchronized audio. Open X-Embodiment has no microphones at all, real synchronized audio is noisy and hardware-specific and does not scale across labs, and no standard simulator models acoustics.

We built both pieces. OpenX-Sound retrofits audio onto existing episodes from video, preserving every original signal, and we audited a sample of it by hand for synchronization and semantic relevance. We are explicit that this is a bootstrapping mechanism for representation learning and not a substitute for physical data: synthesized audio can omit subtle contact cues, shift event timing, or hallucinate a sound with no physical source. Every result in the paper fine-tunes an OpenX-Sound checkpoint on real task-specific demonstrations with real audio. The synthesized audio is what makes a pretrained acoustic prior possible, not what makes the behavior work.

HEAR-Bench is the other half. Built on a dual-arm simulator, it runs an asynchronous audio thread that injects ambient noise and trigger clips at the exact sample index implied by the control cycle, and it scores success only if the geometric goal is reached after the cue. That timing rule is the whole contribution. Without it, pressing a button the instant the episode starts and pressing it when the alarm actually rings look identical.

## The examples that make the point

An alarm clock with a clearly visible stop button is a deliberately tempting shortcut. A vision-only policy presses it immediately and looks fine under standard goal-reaching metrics. The task is only meaningful if you require that the press happen after the ring.

Some tasks require the robot to generate the sound before it can hear anything. In one of our real-robot setups the robot has to tap two visually identical plates to tell them apart, then hold still enough to hear the result. Shaking a bottle is the same idea: the cue exists only because the robot moved, and a weak shake produces a quiet signal.

Pouring into an opaque container is the case where audio is not an enhancement but the only signal. The fill level is invisible, and the decision variable is the rate of change of the pouring sound. Plotted as a waveform, pouring looks like a dense static block of lines, which is a good illustration of why treating the audio as an image does not work.

![An opaque container makes the pouring sound the only progress signal.](pour-water.jpg "The decision variable is how the acoustics change, not what the scene looks like.")

Coffee brewing without any sensor or indicator light is the same structure with a sharper ending. Nothing tells the robot the coffee is ready except the shift into sputtering.

## What we take from this

The claim we would put on a slide is that incorporating audio into a foundation model requires more than appending an input stream. Every previous approach treated it as an extra channel. It is a different cadence, and cadences have to be reconciled architecturally.

The pattern repeats beyond audio. Any modality that produces brief, non-repeatable events at a rate faster than the policy is queried will hit the same wall, and tactile sensing is the obvious next one. The binding constraint is the rate mismatch, and it is not fixed by making inference faster.

A few smaller lessons. Naive fixes fail for structural reasons rather than tuning reasons, which is why faster replanning trades stability for reactivity and adds noise instead of solving anything. Auxiliary predictive objectives can supply temporal grounding at no inference cost. Memory should be sized against a required coverage horizon rather than set to "as much as fits." And evaluation design is part of the contribution: a timing-aware success rule is what turns "it looks right" into "it listened."

## What it cannot do yet

One workspace microphone means no source localization and no separation of overlapping events, which is functionally the cocktail party problem. We would want an array, or a base-plus-end-effector pair for beamforming. The system is trained purely by offline imitation, so its robustness is bounded by the diversity of noise and timing variation in the demonstrations; online fine-tuning or reinforcement learning in the deployed room is the obvious remedy. Audio and vision are processed as separate streams and fused at the representation level, and we suspect native audio-visual encoders that associate timbre with contact directly would do better. And unconstrained real-world cooking acoustics remain an open problem, with real deployment markedly harder than simulation.

## The larger frame

The tension we started from, between high-frequency transient sensory events and low-frequency delayed policy updates, is not specific to sound. It will show up for every physical modality that carries information in its timing. HEAR is our attempt to show that the fix is architectural, and to leave behind the pieces, the VSLA formulation, the pretraining corpus and the benchmark, that let other people build on it.
