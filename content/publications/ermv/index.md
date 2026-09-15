---
title: "ERMV: A 4D Multi-View Robotic World Model for Embodied Agents"
authors:
  - me
  - Guangming Wang
  - Zhe Liu
  - Hesheng Wang
date: "2025-07-23T12:41:11Z"
publication_types: ["article"]
publication:
  name: "Under review at IEEE Transactions on Circuits and Systems for Video Technology"
  short_name: "TCSVT (under review)"
venue_display: "IEEE Transactions on Circuits and Systems for Video Technology (TCSVT)"
publication_status: "Under review"
publication_status_key: "under_review"
display_area: "Embodied World Models & Generative Data"
publication_order: 60
peer_reviewed: false
open_access: true
abstract: "ERMV edits synchronized robot videos around recorded state and action. Sparse temporal context, motion-aware epipolar attention and segment feedback preserve the interaction across visual variations."
summary: "ERMV edits synchronized robot videos around recorded state and action. Sparse temporal context, motion-aware epipolar attention and segment feedback preserve the interaction across visual variations."
story_order: 60
homepage_order: 30
topic_keywords:
  - Embodied World Models
  - Robotic World Models
  - Action-Aligned Video Editing
  - Synchronized Robot Trajectories
  - Sparse Spatiotemporal Attention
  - Robot Data Augmentation
  - Multi-View Geometric Consistency
  - VLA Training Data Engine
tags:
  - TCSVT · Under Review
  - Embodied World Models
  - World Models
  - Generative Physical AI
  - Multimodal Data & Models
  - Embodied Intelligence
  - Data Augmentation
  - Vision-Language-Action
  - Multimodal Learning
featured: false
image:
  caption: "Consistent views of a recorded robot action."
  alt_text: "ERMV — Consistent views of a recorded robot action."
hugoblox:
  ids:
    arxiv: 2507.17462v1
links:
  - type: code
    url: https://github.com/IRMVLab/ERMV
---

## More visual variety from an existing demonstration

A robot demonstration contains both images and an executed action sequence. Changing the images can broaden the environments seen during training, but the edited observations must still agree with those actions. A gripper should keep contacting the same object, and cameras looking at the same interaction should describe compatible geometry.

ERMV organizes this problem as synchronized multi-view trajectory editing. An edited anchor supplies the intended appearance change. The source video, camera poses, robot states and recorded actions guide how that change propagates through the rest of the sequence.

## The action sequence anchors the edit

The input contains synchronized camera views together with proprioception and action records. The output changes visual observations while retaining the recorded state and action supervision. This allows the edited sequence to remain connected to the behavior that originally produced it.

The model encodes camera motion, joint state changes, action chunks, and each observation's time and camera identity. Missing signals are masked. These conditions help the denoiser distinguish a change in appearance from motion that belongs to the demonstration.

A latent diffusion model processes windows of the time–view grid. Spatial layers handle image content, temporal context links neighboring windows, and cross-view attention exchanges evidence among cameras. The edited anchor and accepted overlap stay fixed during sampling, giving successive windows a common reference.

## Keeping useful history within an attention budget

Long sequences create a practical tension. Earlier views can reveal an object that is now occluded, but attending densely to every frame and camera is expensive. Simply shortening the window discards that useful history.

Sparse Spatio-Temporal context selects source observations across the full window. It retains structural references such as endpoints and accepted context, then prioritizes observations with informative motion or state changes. Selection is balanced across time and cameras, so a highly active view does not consume the entire budget.

![Sparse source context retains time and camera identity.](sparse-spatiotemporal.jpg "Selected observations provide long-range context for synchronized trajectory editing.")

The selected features keep their original identities. A distant observation can therefore contribute appearance evidence without being mistaken for the current state.

## Matching across views while the robot moves

Calibration constrains where a corresponding feature can appear in another camera. For a moving gripper or manipulated object, the model also needs to account for motion and ambiguous correspondence.

Epipolar Motion-Aware Attention combines these sources of information. Camera geometry narrows the search region, while state and action conditions predict bounded adjustments to several possible supports. Attention weighs the usable evidence within those regions.

![Geometry and robot state guide cross-view feature exchange.](epipolar-attention.jpg "Motion-aware neighborhoods connect synchronized views.")

Invalid or occluded samples are masked. A self branch preserves the current view's information when other cameras provide no reliable match. This makes cross-view exchange useful without requiring every object to be visible everywhere.

## Checking a segment before carrying it forward

An editing error can persist if a later window treats it as trusted history. ERMV therefore checks each candidate segment before accepting it as temporal context.

Foreground, geometry, motion and action diagnostics identify inconsistencies. Clear failures trigger regeneration. For ambiguous local defects, an agent examines the aligned views and diagnostic evidence, then selects acceptance, regeneration or correction within candidate regions supplied by perception modules. Corrected segments are checked again.

![Feedback identifies regions that require another editing pass.](feedback-intervention.jpg "Candidate segments are checked before entering subsequent temporal context.")

This places feedback at the point where an error would otherwise propagate. The decision is about whether a visual segment remains compatible with the recorded interaction.

## From edited trajectories to policy learning

Accepted sequences supply visual variants of familiar behavior. A policy can encounter different appearances while retaining the underlying action supervision. The evaluation examines both sequence consistency and the usefulness of edited data for downstream robot learning.

![Multi-view editing examples in manipulation scenes.](simulation-editing.jpg "Visual changes propagate through synchronized trajectories.")

ERMV's central idea is to coordinate generation around the structure already present in robot data: shared time, calibrated views, recorded motion and observed interaction. Sparse context carries identity, geometric attention connects cameras, and feedback controls what becomes future history.
