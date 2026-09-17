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
publication_order: 30
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

## Demonstrations are expensive and we already have them

Vision-language-action models are trained on multi-view image sequences paired with the actions that produced them. Collecting that data is slow, expensive, and does not scale: a single manipulation sequence can comprise thousands of images, and the scarcity of high-quality expert demonstrations is one of the main limits on how well these policies generalize to open-world scenes.

The observation that started this work is that the data already exists. What is missing is variety. A demonstration of picking up a box teaches the policy the behaviour but only one version of the world it happens in, and a policy that has only ever seen that box on that table in that room has no reason to transfer.

So the question becomes whether we can take an existing high-quality demonstration and change its visual appearance without changing the behaviour. The answer we argue for is yes, and the paper's thesis is that policy performance can be improved by editing existing data efficiently and consistently rather than by collecting more of it.

The constraint that makes this hard to do naively is the action pairing. A demonstration is not a video. It is a set of synchronized camera views together with the states and commands that were executed. If an edit moves the manipulated object, or changes a camera's apparent geometry, or rewrites the background in a way that contradicts what the robot is doing, the resulting sequence no longer demonstrates anything. It becomes bad training data, and it is bad in a way that is worse than having less data.

![Editing a recorded trajectory changes the world, not the behaviour.](simulation-editing.jpg "Visual variation propagates through synchronized views while the recorded actions stay intact.")

## Why existing approaches do not transfer

Single-image augmentation for robotics applies inpainting and text-driven editing to still images to add scene, object and background diversity. It works, and it edits frame by frame. For a sequence of thousands of frames that is wasteful, and more importantly it enforces nothing across time or across cameras, so the temporal and multi-view consistency that a 4D trajectory requires is simply absent.

Multi-view generation gets consistency from fixed camera rigs. Methods built for driving scenes rely on the strong priors of a fixed circumferential rig and a shared bird's-eye-view representation, and their cross-view attention is hard-coded to neighbouring views with known relative positions. A manipulation platform has a dynamically changing multi-camera system. Those priors do not exist here, so the approach does not apply.

Video editing methods handle a single view over time. Multi-view video editing, where several cameras observe the same dynamic scene at once, remains open.

Rebuilding the scene in 3D and editing it there is the more principled route, and it has its own obstacle. Reconstructing geometry gives cross-view consistency by construction, and it makes it hard to accurately edit the interaction between a robot and an object, which is the thing we actually need to change. These methods also have no mechanism for motion blur or for the complex interactions between a tool and the object it is working on.

There is one adjacent case worth distinguishing explicitly, because it is easy to conflate with ours. Generative world models for robot data learn consistency implicitly by merging multi-view inputs and leaning on computationally intensive video models. That is a generative model. ERMV is an editing model. The distinction matters for what the user controls and for what the system guarantees.

## What makes it hard

The camera rig is not fixed. Manipulation footage comes from a moving, egocentric multi-camera system, so any consistency mechanism keyed to known static inter-camera geometry stops applying.

Motion blur breaks the geometry we would normally rely on. Because the camera and the objects move at the same time, features sampled along a precise epipolar line in a blurry image may not correspond to the true pixel positions at all. The constraint that makes multi-view attention correct is, under motion, wrong.

Errors compound. Edited frames are fed back as history for the next window, so a small error does not stay small. Over long horizons this shows up as semantic drift and blurred detail. In this domain the tolerance is especially low, because the robot arm and the manipulated object have to stay consistent through the entire sequence. When they do not, the sequence does not merely look wrong. It stops being valid training data.

The compute tension is structural rather than incidental. Long-range memory wants a large working window, and dense attention over a window of L timesteps and N views wants a large amount of GPU memory. We wanted something that trains on a single consumer GPU.

Preserving the objects that matter has no cheap solution. Training a general segmenter for manipulated objects is not feasible, because those objects are diverse, often novel, and viewed from challenging egocentric angles. Labelling every frame by hand across thousands of images is not feasible either.

And text prompts lack the granularity the task needs. Asking for a background change to an office leaves the colour, the type of room, and its orientation undefined, and the result may conflict with what the robot is doing.

## Use the structure that robot data already has

Robot data is unusually well structured. It comes with calibrated cameras, recorded camera poses, recorded robot states, and a shared clock. Our idea is to stop trying to invent a specification for the edit and instead reuse that structure, plus a single hand-edited keyframe.

The first frame of the primary camera is edited, by an inpainting model or by hand, and that edited image becomes the visual specification. The paper calls it a blueprint, which is the right word. It carries colour, layout and orientation unambiguously in a way that a sentence cannot, and it takes a person one edit rather than thousands.

Two design decisions follow from the structure, and both are about relaxing constraints rather than satisfying them.

The first concerns epipolar geometry. A moving gripper is smeared across pixels by motion blur, and the epipolar line computed from the poses points to where the gripper would be if it were stationary. Enforcing that constraint exactly matches the wrong pixel. So we keep epipolar geometry as the search structure and learn the deviation. A small network predicts the motion-induced offset from local image features and the motion condition, and attention is taken along the shifted line. The constraint is relaxed rather than discarded.

The second concerns attention. Dense spatio-temporal attention is the default way to keep a sequence consistent, and it is expensive. The domain-specific observation that justifies not doing it is that in many manipulation scenarios the background is largely static and the images change slowly. There are not many inter-frame distinctions that need to be captured by a dense mechanism. So we sample.

![Sparse source context keeps time and camera identity.](sparse-spatiotemporal.jpg "A fixed budget of observations provides long-range context for the whole window.")

## Sparse context, and giving back what sparsity removed

Sparse Spatio-Temporal context takes a sliding window of timesteps and samples a fixed-size subset of images from it, which is far smaller than the full time-by-view grid. The sampling is random, and it is worth saying so plainly rather than attributing intelligence to it that is not there.

What makes it work is the second half. Each sampled image carries its original time index and camera index, and those identities are explicitly encoded as a condition. Subsampling destroyed the spatio-temporal structure, so the structure is re-injected. A frame from three seconds ago is still labelled as three seconds ago, which means it contributes appearance evidence without being mistaken for the current state. This is a small idea with wide applicability: when you subsample structured data, put the structure back.

There is a second decision that distinguishes this from the usual autoregressive scheme. The sampled history is injected into the network as a condition, and it is also generated alongside the future frames. Future frames can therefore extract geometric structure from history during generation, rather than only conditioning on it.

The memory saving from sparse sampling at a fixed window size is roughly a factor of two, and that factor is what makes single-GPU training possible at all.

## Where the motion conditioning lives

Each target image is conditioned on the camera pose, the robot state, and the temporal deltas of both. The static terms ground each view geometrically, and the deltas are what allow the model to render motion blur at all. This is more consequential than it sounds. Removing the motion conditioning produces images that look sharper, because blur is a kind of softness, and they lack the physical characteristics a real camera would have captured. Perceptual sharpness is not physical realism, and a policy trained on impossibly sharp images is trained on a distribution that does not exist.

Training assumes synchronized pose and state records exist. That assumption is satisfied for robot demonstrations, which is why this works here and would not work on arbitrary video.

![Geometry and robot state guide the cross-view search.](epipolar-attention.jpg "The epipolar line is the search structure; a learned offset accounts for motion blur.")

## A loop that spends human effort where it is needed

Generated frames feed back as history, and history is exactly where errors accumulate. Rather than trying to solve this with a better generator, we handle it at the system level with a verifier.

A multimodal model acts as an automated checker, comparing each generated image against the original with a chain-of-thought prompt. It scores degradation of the core objects on a ten-point scale and emits a consistency judgement. When the check fails, the system asks the expert for a segmentation mask of the core objects, and that mask becomes an additional condition for a corrective regeneration.

We describe this as MLLM review plus expert correction, and we think of it as a practical intermediate path rather than a fully solved problem. The two obvious extremes do not work. A universal segmenter for manipulated objects is not trainable, and labelling every frame is not affordable. The loop keeps human annotation confined to the few cases where the model falters, which is where expert time is actually worth spending.

We should be clear about what this means for how automatic the pipeline is. It is not fully automatic. A person produces the guide frame, and a person may be asked for a mask. Making that boundary move is future work, and we point to semantic segmentation and object detection as the tools that would replace parts of the current manual intervention.

![Feedback identifies frames that need another pass.](feedback-intervention.jpg "An automated check catches degradation, and human correction is requested only where it fails.")

## What we take from this

A violated physical constraint should be relaxed rather than dropped. Blur breaks epipolar geometry, and the useful response is to learn the deviation while keeping the geometry as scaffolding. Discarding the constraint would have thrown away the structure that makes cross-view attention work at all.

The justification for sparsity should come from domain statistics, not from generic efficiency arguments. The background is largely static is a real property of manipulation scenes, and it is what makes sparse attention defensible rather than merely cheap.

When you subsample structured data, re-inject the structure you subsampled away. Two indices per sample is a small cost for preserving what the model needs to interpret them.

Error accumulation can be handled at the system level rather than inside the generator. A cheap external verifier is a legitimate alternative to a better model, and it has the side benefit of localizing where the model is weak.

And augment rather than re-collect. That is the practical thesis, and it is the reason the method is worth building even though it needs a guide frame and occasional human help.

## What it does not do

ERMV does not bring in depth images, 3D Gaussian splatting, or similar representations with rich three-dimensional structure, because editing those is considerably more complex than editing single-frame images. Adding them would likely improve the result, and we have not done it.

The pipeline is not fully automatic, and the reliability of the check itself is not characterized, which is a gap we would want closed before trusting it unattended.

And we want to be precise about the scope of the claim. ERMV edits trajectories and produces visually varied training data from existing demonstrations. The paper also describes a generation capability, where a sequence is produced from a first frame and an action sequence, which can serve as an offline testbed for evaluating motion plans without putting hardware at risk. That is a secondary application rather than the contribution, and this is not a physics engine. What it produces is a video demonstration whose appearance has been changed consistently, with the recorded actions preserved.

## Where it leads

The discussion frames the outcome as loosening the data bottleneck in robot imitation learning. Being able to edit scenes cost-effectively and at scale means researchers can manufacture test environments that would be difficult to construct in the real world, and can synthesize sequences that would be difficult or unsafe to record on a real robot, such as near-collision 4D trajectories.

The direction we find most promising is bridging simulation and reality. Take a simulated trajectory, edit its opening frame into a real-world appearance, propagate the edit through the sequence using the original simulated actions, and the result is a pseudo-real trajectory. A policy trained on it can then be evaluated on real hardware. The gap between the two is expensive to cross with data collection, and it may be considerably cheaper to cross with editing.
