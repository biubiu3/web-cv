---
title: "MovSAM: A Single-image Moving Object Segmentation Framework Based on Deep Thinking"
authors:
  - me
  - Yiqing Xu
  - Guangming Wang
  - Zhe Liu
  - Yanzi Miao
  - Hesheng Wang
date: "2025-10-19T00:00:00Z"
publication_types: ["paper-conference"]
publication:
  name: "IEEE/RSJ International Conference on Intelligent Robots and Systems"
  short_name: "IROS"
venue_display: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS 2025)"
publication_status: "Published"
publication_status_key: "published"
display_area: "Robot Perception"
publication_order: 60
peer_reviewed: true
open_access: true
abstract: "MovSAM performs moving-object segmentation from a single image, where temporal motion cues are unavailable. A multimodal large language model reasons about the scene and produces textual object prompts; these are fused with visual representations from SAM and a vision-language model, then refined through an iterative reasoning loop."
summary: "Scene reasoning, language prompts and iterative mask feedback connect a single image to moving-object segmentation."
story_order: 20
homepage_order: 60
topic_keywords:
  - Multimodal Large Language Models
  - Segment Anything
  - Moving Object Segmentation
  - Vision-Language Reasoning
  - Open-World Perception
  - Autonomous Driving
tags:
  - IROS 2025
  - Perception & Geometry
  - Moving Object Segmentation
  - Multimodal Large Language Models
  - Segment Anything
  - Computer Vision
featured: false
image:
  caption: "Scene semantics guide object segmentation."
  alt_text: "MOVSAM — Scene semantics guide object segmentation."
hugoblox:
  ids:
    doi: 10.1109/IROS60139.2025.11246064
    arxiv: 2504.06863v1
links:
  - type: code
    url: https://github.com/IRMVLab/MovSAM
---

## A photograph contains no motion

Moving object segmentation is normally a measurement problem. You compare successive frames, or you compute optical flow, and the pixels that changed are the pixels that moved. The assumption is so standard that it stops being visible.

It breaks in specific, practical ways. A pedestrian shifting their weight at the curb before stepping off produces almost no pixel change, and the intent is invisible to a frame-difference method. A vehicle's own motion contaminates the comparison, since apparent movement in the image is a mixture of the other object's motion and the camera's own, and separating the two is not something a two-frame difference does. Occlusion makes pixel changes unreliable for anything partly hidden. And sometimes there is only one frame: if a camera fails or a communication link drops, the multi-frame pipeline does not degrade, it stops.

There is also a simpler observation behind this work. A person looking at a photograph can usually point at the thing that is about to move. Not because they measured displacement, but because they read the scene: the posture, the contact, the loose fabric, the blur along an edge. The motion is inferred from semantics rather than observed from change.

We wanted a system that could do that. Which means the temporal signal has to be replaced by something else, and language is the obvious candidate.

## What earlier methods assume

Optical-flow-based approaches use short-term motion cues to separate moving objects from static background. Generating accurate optical flow requires multiple frames, so it is not a substitute for frames. It consumes them.

Multi-frame and video-based methods relate appearance to motion patterns and are genuinely effective. They also require either flow computations or temporal information from more than one frame, and on a single image they have nothing to work with.

Segment Anything is the natural tool for the segmentation half, and it has two problems here. It was built for point and box prompts, and text prompts are not its native interface, so a bridge has to be constructed rather than configured. More fundamentally, SAM analyzes image texture. It has no scene comprehension, so it cannot tell you which texture is moving.

The line of work that connects a multimodal language model to SAM for instructed segmentation is closer, and the distinction that matters is between recognizing and reasoning. Those methods enhance SAM with text and focus on identifying object categories. They answer what something is, not whether it is moving or whether the mask captured all of it. Generic open-vocabulary segmentation has a related blind spot: it does not address problems specific to motion, such as motion illusions, where appearance suggests movement that is not happening.

And stacking an MLLM, SAM and a vision-language model together directly does not work either. That composition still produces inaccuracies from hallucinations or flawed reasoning, and it produces visible contradictions between what was predicted and what was expected. Building a loop that can notice and repair those contradictions is the part that had to be designed.

## What makes it hard

The deepest difficulty is that a still image contains no displacement information at all. Motion has to be inferred from static correlates, and those correlates are heuristics. A flowing effect in hair or clothing, motion blur along contours, an object suspended in mid-air without support, a pose resting on minimal support such as a single toe touching the ground: all of these suggest motion, and none of them prove it. The paper is explicit that the model identifies the moving object based on these features but not limited to them.

Motion illusions follow directly. Appearance that suggests movement can be wrong, and genuine movement can look static.

Ego-motion is unobservable in a single frame by construction. Nothing in one photograph distinguishes "they moved" from "I moved," and no amount of reasoning recovers a distinction the data does not contain.

There is also a representation mismatch at the centre of the architecture. SAM's image embedding is spatially rich and semantically empty. A vision-language model's features are semantic and spatially coarse. Something has to make SAM's detail legible to the VLM without destroying it.

Then there is the feedback problem, which is subtler than it first appears. For a loop to work, a mask has to be turned back into something the reasoner can critique. Not just whether the right object was chosen, but whether the mask is complete and whether it contains anything that does not belong. A prediction has to become an arguable claim.

Finally, supervision barely exists. There is no dataset of single images labelled with the moving object, because the label is inherently a judgement. We had to construct the training data by filtering existing video datasets down to images where the moving object is clearly distinguishable.

## The mask as something you can argue with

Our idea is to replace the missing temporal measurement with an explicit linguistic hypothesis, and then make that hypothesis revisable.

The loop has three parts. A reasoner looks at the scene and writes a sentence describing the object it believes is moving. That sentence is not a bare category label. It carries the category, the position and the motion, in the form of something like "A red ball is flying in the air, in the upper right corner of the frame." A segmentation stack turns that sentence into a mask. Then the mask goes back to the reasoner as visual evidence, and the reasoner is allowed to change its mind.

The last step is what makes this work. Reasoning about a still image is unreliable, and a single pass produces confident mistakes. Showing the result back closes the gap between what the model meant and what it produced.

The prompt is generated under a chain-of-thought guide, which converts an under-specified open judgement into something closer to a checklist: observe the objects and their relations, attend to the plausible movers, apply the motion features above, then emit a prompt or conclude that nothing is moving. The guide is hand-authored, and we did not test alternatives against it. That is a limitation we accept rather than hide.

## Turning language into pixels

The segmentation network takes the prompt and the image together and produces the mask. SAM2 is the core, and we keep its image encoder and mask decoder because they are well suited to the job. We add BEiT-3 features because SAM's weakness is exactly semantic understanding, and the vision-language model supplies what it lacks. The prompt encoder is modified so that the VLM's multimodal features can serve as a prompt at all, rather than being squeezed into a point or box.

The feature aggregation network is our answer to the representation mismatch, and it runs in the direction people usually do not expect. Instead of trying to make SAM semantic, we give the VLM SAM's spatial detail. Five convolutional layers and a fully connected layer compress SAM's image embedding into a global vector, and that vector is concatenated back onto every pixel of the embedding before the result goes to the vision-language model along with the prompt.

Removing it hurts performance noticeably, which is our evidence that the cross-fusion is actually happening rather than being decorative.

![Single-image segmentation in real scenes with missing temporal evidence.](real-world.jpg "MovSAM uses scene semantics and appearance to infer likely moving objects from one image.")

## The reasoning loop

The critique stage has its own guided procedure. Given the image with the candidate mask overlaid, the reasoner examines the spatial arrangement, identifies the object the mask covers, judges whether that object is moving, checks whether the segmentation is complete and did not miss any part of it, and checks whether anything non-moving was absorbed into it.

Notice that completeness and purity are separate questions from correctness. A mask can cover the right object and still be a bad answer.

When the reasoner rejects the result, it rewrites the prompt and the mask is regenerated. When it accepts, it has to give a reason. The published example is a good illustration of how much work the loop does. The first prompt asks for the runner on the right side of the image, and the reasoner rejects it: that is not the moving object. The second prompt asks for the complete moving object, which it identifies as an upside-down dancer in the centre. That one is accepted, with the reason that the man is dancing upside down and has a tendency to fall off.

That exchange is the whole idea in miniature. The first answer was plausible and wrong. The second came from looking at what the first one produced.

We cap the loop at five rounds and stop on acceptance. We have not characterized what happens when it fails to converge, which is a fair question and one we do not answer.

![Segmentation examples with occlusion and fine boundaries.](occlusion-sequence.jpg "Because each frame is processed independently, occlusion does not propagate errors across time.")

## What is and is not trained

The SAM image encoder is frozen, on the grounds that its feature extraction capacity is already established and re-training it would cost more than it returns. The vision-language model, the aggregation network, and SAM's prompt encoder and mask decoder are optimized for this task. The multimodal language model runs off the shelf and is not fine-tuned, which leaves its prompt sensitivity unexamined.

The segmentation loss combines a region-overlap term with pixelwise classification at equal weight. The first is about covering the right region; the second is about getting each pixel right. In practice the pair is more robust than either alone.

## What we take from this

Text is a usable control channel for frozen foundation models. A prompt can carry category, position and a motion verb at once, which is far richer than a class label and requires no retraining at all.

The awkward representation mismatch has a clean resolution that runs against intuition: feed spatial detail into the semantic model rather than trying to make the spatial model semantic.

Making the output criticisable is the generalizable trick. It applies to any task where the supervision signal is a judgement rather than a measurement, and where a plausible wrong answer is the main failure mode.

And it is worth noticing that the composition itself can be the contribution. We say this plainly in the paper rather than pretending otherwise. The novelty is in the loop and in the way the parts are connected, not in any single component.

One more practical note. The training set was filtered down to images where the moving object is clearly distinguishable, which means the supervision concentrates exactly where static inference is easiest. We state the filter and we do not resolve the tension it creates.

![The language prompt carries category, position and motion together.](benchmark-results.jpg "Qualitative comparison of single-image moving object segmentation.")

## What this opens

Single-image moving object segmentation is worth treating as its own problem rather than as a degraded video task. Recovering temporal information from one image is a capability we think has independent value, and it changes what a robot can do when its perception stream is degraded rather than healthy.

The reasoning mechanism is also portable. Any task that needs logical inference over a scene from a large model, including cross-modal settings such as reasoning about the relationships between objects in an image and a point cloud, could use the same propose, segment, critique structure.

The application we care most about is the one we started from. A robot that receives an isolated image, because a link dropped or a sensor failed, can still form an object-level interpretation of what is moving and what to watch. The paper's closing claim is that this makes systems more robust in exactly the situations where conventional methods stop working.
