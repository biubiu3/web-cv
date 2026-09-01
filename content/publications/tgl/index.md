---
title: "Teach and Grow: An Agent-Centered Architecture for General Robot Learning"
authors:
  - me
  - Zhe Liu
  - Hesheng Wang
date: "2026-08-17T23:45:21Z"
publication_types: ["article"]
peer_reviewed: false
open_access: true
abstract: "Teach-and-Grow Learning (TGL) is an agent-centered architecture for acquiring reusable robot capabilities from a small number of successful demonstrations. A multimodal agent builds closed-loop Skill Blocks, grounds and composes them in new scenes, chooses between learned and geometric tools, observes physical outcomes, and revises its route when execution departs from intent. A Skill Library and structured Experience Memory preserve successful behaviors, failures, and repairs for later reuse."
summary: "An agent-centered robot-learning architecture that turns sparse teaching into reusable Skill Blocks and persistent experience for future tasks."
story_order: 80
tags:
  - General Robot Systems
  - Agentic Robot Learning
  - Embodied Intelligence
  - Continual Learning
  - Multimodal Agents
  - Robot Manipulation
featured: true
image:
  caption: 'End-to-end retraining versus agent-centered growth in [Teach and Grow](https://arxiv.org/abs/2608.17209).'
  alt_text: 'Teach and Grow contrasts brittle global retraining with few-shot teaching, reusable skills, feedback adaptation, and post-deployment growth.'
links:
  - type: preprint
    provider: arxiv
    id: 2608.17209v1
---

## Research focus

General robot systems should be able to learn a local lesson locally, instead of paying the full cost of collecting data and retraining a task-specific policy after every unfamiliar situation.

## What it contributes

TGL centers the system on an agent that induces, stores, grounds, composes, and repairs reusable **Skill Blocks**. Persistent experience allows physical successes and failures to change how later tasks are approached, while targeted teaching expands capability without task-specific policy retraining.

## Why it matters in this research story

TGL makes the system-level goal explicit: one physical lesson should make the next task easier. It brings perception, tools, closed-loop feedback, reusable behavior, and structured memory into an architecture designed for continued learning after deployment. Together with HEAR, it represents the current culmination of my research direction.
