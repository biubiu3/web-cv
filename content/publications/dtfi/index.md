---
title: "3D Object Detection and Tracking Based on Lidar-Camera Fusion and IMM-UKF Algorithm Towards Highway Driving"
authors:
  - Chang Nie
  - Zhiyang Ju
  - Zhifeng Sun
  - Hui Zhang
date: "2023-04-04T00:00:00Z"
publication_types: ["article-journal"]
publication:
  name: "IEEE Transactions on Emerging Topics in Computational Intelligence"
  short_name: "TETCI"
venue_display: "IEEE Transactions on Emerging Topics in Computational Intelligence (TETCI), 7(4): 1242–1252, 2023"
publication_status: "Published"
publication_status_key: "published"
publication_order: 90
homepage_order: 100
story_order: 5
peer_reviewed: true
open_access: false
featured: false
topic_keywords:
  - LiDAR-Camera Fusion
  - 3D Object Detection
  - Multi-Object Tracking
  - IMM-UKF
  - Autonomous Driving
tags:
  - TETCI 2023
  - Perception & Geometry
  - Computer Vision
  - Multimodal Learning
  - Autonomous Driving
hugoblox:
  ids:
    doi: 10.1109/TETCI.2023.3259441
links:
  - type: custom
    name: Publisher
    url: https://doi.org/10.1109/TETCI.2023.3259441

display_area: "Autonomous Driving Perception"
abstract: "DTFI connects local LiDAR-camera feature fusion with pillar-based vehicle detection and multiple-model tracking. Image neighborhoods enrich point geometry; motion hypotheses and association maintain vehicle trajectories across frames."
summary: "Local image–point fusion, efficient pillar detection, and adaptive CV/CTRV tracking for highway-oriented perception."
image:
  caption: "Fused observations support continuous vehicle tracking."
  alt_text: "DTFI — Fused observations support continuous vehicle tracking."
---

## Perception that is blind for two metres at a time

The design constraint behind this work is not accuracy. It is latency.

Most fusion-based 3D detection algorithms run below 15 Hz on a workstation, and a workstation is not what drives a car. An onboard computing centre is slower still, and it is not dedicated to perception: planning, control and the rest of the stack have to run concurrently, which takes a further bite out of the same budget.

Now put a number on what 15 Hz costs. At highway speed the vehicle covers about 1.94 metres between two consecutive frames. For that distance the perception system effectively does not see anything that has just happened, and we call that being time blind. The consequences are not abstract. A system that reacts to where a car was two metres ago is reacting to a situation that no longer exists.

Thirty hertz substantially reduces the blind distance and leaves room for the other modules to run. That target, on affordable hardware rather than a development machine, is what shaped every choice in this paper. It also means we made a deliberate trade: LiDAR-only methods achieve better detection accuracy than fusion methods do, and we did not set out to beat them on that axis. We set out to be competitive while running at a frequency they cannot reach.

## What the fusion families cost

There are three ways to combine an image with a point cloud, and each has a price.

Detecting in 2D and lifting the boxes into the point cloud, the frustum approach, makes the whole system depend on the 2D detector. An error in the image branch propagates into 3D with no way to recover it.

Fusing at the feature or proposal level and training end to end produces strong results, and it loses original information in the process of fusing at the region level. These methods also tend to be complex and to run slowly, which is the specific problem we were trying to solve.

The third family projects the point cloud into an image feature map and augments each point with what it finds there. The architecture stays close to a LiDAR-only detector, which is what we wanted, and the pillar encoder keeps the runtime low. We chose this family for exactly that reason.

Within LiDAR-only detection the lineage matters too. Voxel-based 3D convolution was accurate and slow. Sparse convolution improved efficiency without making it fast enough. Pillars, which reduce the problem to 2D convolutions, hit the best tradeoff between accuracy and speed, and we built on that.

For tracking, the choice of a classical filter over a learned one was deliberate rather than conservative. Learning-based trackers perform poorly in real time, and neural data association is time-consuming, so the Hungarian algorithm stays. Batch tracking is ruled out for a different reason: it uses all data, and a driving system only ever has history. 2D tracking is ruled out because it cannot tell you an object's position and size in 3D.

The closest filter-based alternative is a well-known 3D tracker that is simple and efficient and uses a single constant-velocity model. A constant-velocity model has no way to represent a car that is turning, so its state estimate degrades in exactly the situations where prediction matters most. A monocular tracker uses an extended Kalman filter under one camera. An urban JPDA-IMM-UKF system exists and uses traditional clustering for detection, which produces fragmented trajectories and hurts tracking performance downstream.

IMM itself is standard in aviation and nearly absent in vehicles, and the reason is instructive. Aircraft maneuver drastically: large speed changes, fast heading changes, so a switching model earns its complexity. Vehicle motion is comparatively mild. And with little prior work in the automotive setting, the parameters that IMM needs are hard to set.

## What makes it hard

Fusing at full image resolution, per point, at thirty hertz, is a budget problem before it is an accuracy problem. The number of image channels you attach to each point is the knob you turn, and we tuned it as a tradeoff rather than maximizing it.

Data-layer fusion is also fragile in a specific and quiet way. Because each point is matched to an image location, a calibration error puts the sampled feature at the wrong pixel for every point, and the resulting input looks entirely plausible. There is no error signal. The system does not know it is being fed garbage.

Choosing a motion model is a lose-lose if you must choose one. Constant velocity is simple and strong for linear motion. Constant turn rate and velocity handles rotation. Either alone is wrong in the other regime. Switching between them is the answer, and switching introduces a set of prior parameters: the state switching matrix, the state covariance, the process and measurement noise covariances. These are conventionally set from experience, and empirical values are not guaranteed to apply to a different scenario. That is a real methodological problem, not a tuning nuisance.

There is a nonlinearity problem too. Constant-velocity transitions are linear in the state. Constant-turn transitions involve position expressed through velocity and yaw rate multiplied by sine and cosine of the heading, which is not linear, so the filter needs sigma points rather than a plain Kalman update.

Tracking also has to survive gaps and resist noise at the same time. Occlusion causes detections to drop, and being too permissive about starting new tracks admits detector false positives. The two failure modes pull in opposite directions.

And the physics caps detection regardless of architecture. In one of our examples, three very distant cars return only three to five LiDAR points each. Too few points and the detection simply does not fire.

## Attach a neighbourhood, not a pixel

The first half of the idea addresses the fragility of data-layer fusion. Instead of sampling a single projected pixel for each point, we sample a 5×5 window of image features around the projection and attach the whole neighbourhood to the point.

The consequence is that the network learns the matching relationship between the two modalities rather than trusting the calibration exactly. A point whose projection lands a pixel or two off still finds relevant appearance features in its window. This was the single most useful conceptual move in the detection half, and it is what makes the difference between fusion that survives calibration error and fusion that quietly degrades.

The features come from a full-resolution extractor, which matters for a related reason: the point has to map to a precise image location for the window to mean anything, and a downsampled feature map destroys that precision. The encoder is VGG-based with two modifications. We reduced the channel count to keep optimization manageable, and we cut the network off in the middle so that the feature map does not shrink too far, which would make it useless for generating fusion data. A top-down decoder upsamples and merges with same-resolution encoder maps, with 1×1 convolutions controlling the output dimension.

![Image features are sampled around the projected location rather than at a single pixel.](image-features.png "A local window learns the correspondence between the two modalities instead of assuming the calibration is exact.")

## Collapsing the height axis to get the frame rate

The augmented points then go through a pillar encoder. Points are binned onto a bird's-eye-view grid with cell size and a cap on how many points a cell keeps, with random subsampling beyond the cap. The height axis is collapsed to a single cell, which is the trick that turns 3D convolution into 2D convolution and is where the frame rate comes from.

Each point carries its geometry and appearance plus five offset features that describe where it sits relative to its cell's mean and its voxel centre. A PointNet layer expands these, max-pooling reduces each cell to one representative, and the cells are scattered back into a pseudo-image. A 2D convolutional backbone and a region proposal head then predict oriented 3D boxes.

The cost of the pillar representation is that height structure inside a cell is discarded and the detection range is bounded by the camera's field of view, since fusion needs pixels. We accept both as the price of the frequency target.

One loss term deserves a note because it looks redundant and is not. The yaw residual is computed as the sine of the difference between predicted and anchor angle, and sine is symmetric. A car facing forward and a car facing backward produce the same residual. Regression alone cannot break the tie, which is why a separate direction classification term exists in the loss.

![Pillars collapse the height axis so a 2D detector can do the work.](detector.png "The fusion-augmented point cloud is encoded as a bird's-eye-view pseudo-image.")

## Two motion models, and a search for the priors

The tracker predicts every existing trajectory, associates predictions to detections by the Hungarian algorithm on 3D overlap, updates matched tracks, and manages births and deaths for everything unmatched.

The interesting part is the update. Two models run in parallel, one with a constant-velocity state and one with a constant turn rate and velocity state. Mixing probabilities are computed from the previous model weights and the switching matrix, mixed estimates are formed for each model, each model's sigma-point filter predicts forward, and the two are combined into the IMM prediction. After association, each model is updated for the matched detection and the model probabilities are recomputed from the measurement likelihoods. The pairing is complementary by construction: the constant-velocity model estimates linear motion cheaply and well, and the constant-turn model covers the rotational case it cannot.

Life-cycle management handles the gap-versus-noise tension with two guardrails. An unmatched trajectory keeps predicting for a bounded number of frames before it is terminated, because an unmatched track usually means occlusion rather than disappearance, and restarting the trajectory later would fragment it. An unmatched detection has to persist for several consecutive frames before a track is born, which filters out occasional false positives. The two rules guard opposite failure modes.

The priors are where we departed from convention. Rather than setting the switching matrix and the covariances from experience, we treat them as an optimization problem and fit them with particle swarm optimization. The name invites a misreading worth clearing up: particle swarm optimization is a derivative-free search over parameters, it has nothing to do with particle filtering, and no particle filter appears anywhere in this work.

Two caveats on that fitting, and we would rather state them than have them discovered. The optimization runs offline and per dataset, so it is not online adaptation; the parameters are fitted to the data they were fitted on. And a symmetric switching matrix does not by itself tell you that vehicle motion in a dataset favors the constant-velocity model, even though it is tempting to read it that way.

![Tracked trajectories persist through frames where the detector reports nothing.](tracking-results.png "Bridging a missed detection is often cheaper than detecting it.")

## What we take from this

Latency budgets are a design input, not a measurement you take afterward. Once the real-time threshold is crossed, the remaining budget belongs to accuracy, and the architecture should be organized around that ordering.

A local receptive field is a cheap substitute for perfect calibration. When two sensors are aligned imperfectly, learning the correspondence in a neighbourhood beats assuming a pixel.

Reduce the dimensionality of the problem before optimizing the network. Pillarization is the enabling trick, not an afterthought.

Hybrid representations outperform pure ones here: learned appearance features, an explicit geometric projection, and an explicit state estimator, each doing what it is good at. The modularity also helps when something goes wrong, because each component has a distinct role and a distinct failure signature.

Complementarity beats tuning. Two models that fail in different regimes are better than one model that is mediocre in both.

And when the priors genuinely cannot be guessed, search for them. The admission that empirical IMM values may not transfer is the most useful methodological statement in the paper.

## What it does not do

The honest summary is that the system is competitive in accuracy rather than leading. It improves substantially on detection speed and remains behind the best LiDAR-only methods on accuracy, which is the trade we chose.

The IMM-UKF has trouble with objects whose motion direction changes little. A filter that switches between hypotheses needs observable maneuver to be worth switching for.

Detection range is bounded by the camera field of view, which is inherent to this fusion design. Sparse distant objects fail, as the three-to-five-point example shows. The tracker is a separate stage from the detector rather than jointly optimized with it, which is the direction we point to for future work, along with improving accuracy without giving up the frame rate.

## Closing

What we built integrates 3D detection and 3D multi-object tracking into a single pipeline measured against the real-time requirements of highway driving: a detector that produces oriented boxes efficiently, and a tracker that follows objects through uncertain motion using association, an interacting multiple model filter, and tuned parameters. The claim is not that it is the most accurate system available. It is that the accuracy is real at a frequency the fusion alternatives cannot reach, and that on a highway, being two metres behind the world is its own kind of inaccuracy.
