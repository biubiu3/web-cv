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
publication_order: 10
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

## At a glance

| Problem | Short sounds can begin and end while a robot is executing an open-loop action chunk |
|---|---|
| Paradigm | Vision–Sound–Language–Action (VSLA) in continuous physical time |
| Architecture | Historizer → Envisioner → Advancer → Realizer |
| Data | Sound-augmented robot demonstrations for pretraining |
| Evaluation | HEAR-Bench: seven sound-causal tasks in simulation plus four real-robot tasks |

A microwave beep, a spoken interruption, or the first bubble of boiling water may last less than one robot action chunk. A vision-language-action policy that observes once, predicts a long action sequence, and looks again only after executing it can miss the event completely. The timing mismatch persists when audio is simply appended to the observation vector; the event must remain causally available after the waveform disappears.

HEAR models sound and action in continuous time and preserves audio events for later decisions.

## Why chunked control creates an evidence gap

Let robot decisions occur at control times $t_k$, while audio arrives continuously at a higher rate. A causal audio window with system delay $\tau_{\mathrm{sys}}$ can be written as

$$
\mathcal{A}_k=
\left[a\!\left(\bar t_k-W,\bar t_k\right)\right],
\qquad
\bar t_k=t_k-\tau_{\mathrm{sys}},
$$

and the multimodal observation is

$$
o_k=\left(I_k^{1:V},\mathcal{A}_k,\ell,q_k\right),
$$

with multi-view RGB images, a language instruction $\ell$, and robot state $q_k$. Suppose the policy predicts a horizon $H$, executes $H_{\mathrm{exec}}$ actions open loop, and observes again after decision interval $\Delta=H_{\mathrm{exec}}$. The effective evidence gap is approximately

$$
G=\Delta+\tau_{\mathrm{sys}}.
$$

If a sound begins and ends inside that gap and the next causal window no longer covers it, the raw observation at $t_{k+1}$ contains no trace of the event. A persistent causal memory state $h_k$ carries the event into the next decision.

HEAR also distinguishes ordinary geometric success from **timed success**. If $t_{\mathrm{snd}}$ is the event time and $t_{\mathrm{goal}}$ the completion time,

$$
S_{\mathrm{timed}}=\mathbf{1}\!\left[t_{\mathrm{snd}}\le t_{\mathrm{goal}}\le T\right].
$$

Completing the physical goal too early can cause failure. For example, the robot may remove an object before the alarm.

## Four modules with different temporal roles

### 1. Historizer: preserve transient evidence

The Historizer consumes causal packets of 640 audio samples, or 40 ms at 16 kHz. A stateful streaming Transformer with four layers, width 256, four attention heads, and 16 memory tokens updates a compact recurrent state. The memory is designed to span the decision gaps in which short events would otherwise vanish.

![Streaming causal packets update a persistent audio state.](historizer.jpg "The Historizer bridges the rate mismatch between continuous sound and chunked robot decisions.")

This avoids a common temporal-aliasing failure: two current visual observations may appear nearly identical, $o_{t_k}\approx o_{t_{k'}}$, even though one follows a beep and the other does not. The correct actions differ, so the hidden history must disambiguate them.

### 2. Envisioner: turn memory into task stage

The Envisioner performs multimodal reasoning over vision, remembered audio, language, and robot state. A high-level Qwen3-Omni model derives semantic context $z$; a Qwen3-0.6B low-level component maintains a structured stage representation with KV caching and emits a constrained JSON state. The hierarchy separates expensive semantic interpretation from the frequent task-stage updates needed by control.

![High- and low-level reasoning convert multisensory evidence into a structured stage.](envisioner.jpg "The Envisioner identifies what happened and what the task now requires.")

### 3. Advancer: predict what should be heard next

The Advancer is a four-layer, width-512, eight-head Transformer trained to predict near-future Mimi audio codes using cross-entropy. It serves as a training objective that encourages the shared representation to encode temporal progress: pouring, boiling, alarms, and spoken exchanges have different acoustic futures even when a still frame looks similar.

![Future-audio prediction supplies a temporal training signal.](advancer.jpg "The Advancer grounds representation learning in the near-future acoustic dynamics of the task.")

### 4. Realizer: generate smooth actions

The Realizer maps the fused representation to an action trajectory using conditional flow matching. At inference, the reported implementation integrates the learned vector field with eight Euler steps. Its training objective is combined with the audio-prediction and stage-text terms:

$$
\mathcal{L}=
\mathcal{L}_{\mathrm{flow}}
+0.1\mathcal{L}_{\mathrm{adv}}
+0.05\mathcal{L}_{\mathrm{text}}.
$$

The four modules therefore answer four different questions: what sound must be remembered, what it means now, what temporal process it predicts, and what continuous action should follow.

## Learning acoustic context from robot activity

OpenX-Sound augments robot videos with synthesized task audio for pretraining. This gives the model examples of how manipulation stages relate to sounds. Temporal alignment matters because an otherwise plausible sound can teach the wrong association if it occurs before or after the relevant action.

The distinction between synthesized audio and recorded microphone data remains important. Pretraining supplies acoustic context; evaluation in separate tasks examines whether that context helps the policy interpret events during execution.

![Robot platforms represented in the pretraining resource.](robot-platforms.jpg "Pretraining connects different manipulation activities with acoustic context.")

## Tasks where sound changes the next action

HEAR-Bench uses several kinds of acoustic evidence. Alarms indicate that an action should begin; speech can confirm or interrupt an operation; process sounds describe the progress of pouring or boiling; contact sounds provide clues about material properties.

Event timing varies across episodes. A policy therefore needs to react to what it heard and retain the event long enough to use it. Completing a geometric goal before the relevant sound may be the wrong behavior.

![An alarm determines when the robot should act.](alarm-clock.jpg "The acoustic event changes the correct task transition.")

![Pouring produces sound that evolves with the physical process.](pour-water.jpg "Continuous process sounds provide evidence for stage changes.")

## What the evaluation examines

The study compares policies in simulation and real-robot tasks, then varies memory and timing components to examine their roles. The central questions are whether short events survive action gaps, whether acoustic context changes the selected stage, and whether the generated action follows the intended timing.

## Design insight

Sound has a temporal structure that a single visual observation cannot capture. HEAR assigns explicit responsibilities to remembering, interpreting, predicting and acting. This makes the path from a transient event to a later physical decision visible in the architecture.
