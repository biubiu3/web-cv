---
# Leave the homepage title empty to use the site title
title: ''
summary: 'Nie Chang is a final-year Ph.D. researcher developing agentic robot systems, LLM/VLM reasoning, and Vision-Language-Action models for Physical AI and embodied intelligence.'
date: 2022-10-24
lastmod: 2026-09-04
type: landing
seo:
  title: 'Nie Chang | Physical AI & Embodied Intelligence'

sections:
  - block: resume-biography-3
    id: about
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: me
      text: ''
      headings:
        about: About Me
        education: Education
        interests: Research Interests
    design:
      # Use the new Gradient Mesh which automatically adapts to the selected theme colors
      background:
        gradient_mesh:
          enable: true

      # Name heading sizing to accommodate long or short names
      name:
        size: md # Options: xs, sm, md, lg (default), xl

      # Avatar customization
      avatar:
        size: medium # Options: small (150px), medium (200px, default), large (320px), xl (400px), xxl (500px)
        shape: circle # Options: circle (default), square, rounded
  - block: news-timeline
    id: news
    content:
      title: 'News & Milestones'
      text: 'Key breakthroughs and latest milestones across embodied intelligence research and full-stack robotics deployment.'
      initial_count: 4
      more_label: 'More milestones'
      less_label: 'Show less'
      items:
        - date: '2026'
          display_date: '2026'
          tag: 'Flagship Project'
          text: 'Unveiled the Robotic Chemist: dual-arm mobile manipulation and autonomous experimental workflows for AI for Science.'
          url: 'projects/robot-chemist/'
        - date: '2026'
          display_date: '2026'
          tag: 'Top Journal'
          text: 'HEAR, our pioneering acoustic-embodied manipulation framework, is officially published in The International Journal of Robotics Research (IJRR)!'
          url: 'publications/hear/'
        - date: '2026'
          display_date: '2026'
          tag: 'Under Review'
          text: 'Teach and Grow (TGL), an agent-centered lifelong robot learning architecture, is under review at IEEE Transactions on Robotics (T-RO).'
          url: 'publications/tgl/'
        - date: '2026'
          display_date: '2026'
          tag: 'Accepted'
          text: 'VCGS-SLAM, an embedded 3D Gaussian Splatting SLAM system, is accepted by the International Journal of Computer Vision (IJCV 2026)!'
          url: 'publications/vcgs-slam/'
        - date: '2026'
          display_date: '2026'
          tag: 'Top Journal'
          text: 'MID, a self-supervised multimodal iterative denoising framework, is officially published in IEEE Transactions on Neural Networks and Learning Systems (TNNLS)!'
          url: 'publications/mid/'
        - date: '2026'
          display_date: '2026'
          tag: 'Top Conference'
          text: 'MRASfM, a multi-camera SfM and large-scale scene aggregation framework, is published at ICRA 2026 (ranking #1 on nuScenes)!'
          url: 'publications/mrasfm/'
        - date: '2026'
          display_date: '2026'
          tag: 'Under Review'
          text: 'DiffSAC, diffusion-guided sample consensus for robust geometric estimation, is under review at IJCV.'
          url: 'publications/diffsac/'
        - date: '2025'
          display_date: '2025'
          tag: 'Under Review'
          text: 'ERMV, a 4D generative trajectory editing framework, is under review at IEEE TCSVT (boosting real dual-arm robot success from 2% to 89%).'
          url: 'publications/ermv/'
        - date: '2025'
          display_date: '2025'
          tag: 'Top Conference'
          text: 'MovSAM, deep reasoning for single-image moving object segmentation, is published at IROS 2025 (outperforming temporal video baselines).'
          url: 'publications/movsam/'
        - date: '2023'
          display_date: '2023'
          tag: 'Top Conference'
          text: 'RLSAC, reinforcement learning for sample consensus, was published and presented at ICCV 2023.'
          url: 'publications/rlsac/'
        - date: '2024'
          display_date: '2024'
          tag: 'Production Delivery'
          text: 'Led the multi-camera SfM 4D auto-annotation platform deployed into production at Hozon Auto, slashing processing time by over 95%!'
          url: 'projects/sfm/'
        - date: '2022'
          display_date: '2022'
          tag: 'Production Delivery'
          text: 'As Project Lead, directed the full-stack campus Autonomous Valet Parking system through real-vehicle integration and closed-loop testing with Ingeek.'
          url: 'projects/avp/'
        - date: '2022'
          display_date: '2022'
          tag: 'Production Delivery'
          text: 'As Project Lead, directed the commercial autonomous lawn mower program with Positec, overcoming unconstrained outdoor turf perception in large-scale field trials.'
          url: 'projects/mower/'
  - block: markdown
    id: research
    content:
      title: 'Research Vision: Building General-Purpose Physical AI with Lifelong Evolution'
      subtitle: ''
      text: |-
        The extreme complexity of the physical world demands that robots transcend rigid, single-policy models. Robots must become **general-purpose physical agents equipped with cross-modal causal perception, physical reasoning, and the capability to continuously accumulate and reuse skills through real-world experience**.

        My research realizes this vision across three interconnected pillars:

        1. **Agent-Centered Lifelong Robot Learning**: Overcoming the prohibitive "retraining tax" of monolithic end-to-end models by introducing verifiable, self-repairing Skill Blocks and structured Experience Memory. Robots acquire closed-loop capabilities from sparse demonstrations, autonomously diagnose and recover from physical failures, and continually grow their skill repertoires without global retraining (e.g., **TGL**, under review at IEEE T-RO).
        2. **Multimodal Embodied Foundation Models & VLA**: Breaking the visual-only barrier by pioneering the Visual-Sound-Language-Action (VSLA) paradigm. By seamlessly integrating continuous high-frequency acoustics, touch, and proprioception with multimodal foundation models, our systems eliminate the dangerous evidence gaps created by action chunking, maintaining razor-sharp causal situational awareness during dynamic manipulation (e.g., **HEAR**, published in IJRR 2026).
        3. **High-Precision Spatial Intelligence & 4D Embodied World Engines**: From diffusion-guided robust estimation (**DiffSAC**), embedded 3D Gaussian Splatting SLAM (**VCGS-SLAM**, IJCV 2026), and rigid camera-rig SfM (**MRASfM**, ICRA 2026) to geometrically consistent 4D generative trajectory synthesis (**ERMV**), building the metric foundation and infinite high-fidelity data engines essential for physical AI.
    design:
      columns: '1'
  - block: markdown
    id: papers
    content:
      title: 'Selected Publications: From Spatial Foundations to Generalist Agents'
      text: |-
        My publications systematically realize a three-layer technical architecture: rigorous spatial geometry and perception form the bedrock; generative world models and self-supervised representations build the bridge; and multimodal embodied agents drive robots that listen, reason, act, and continuously evolve.
    design:
      columns: '1'
  - block: collection
    id: selected-publications
    content:
      title: 'Selected Publications'
      text: Ten featured works highlighting breakthrough contributions across top robotics, computer vision, and machine learning venues.
      filters:
        folders:
          - publications
        tags:
          - Computer Vision
          - Multimodal Learning
          - Robot Manipulation
      sort_by: homepage_order
      sort_ascending: true
      count: 10
    design:
      view: article-grid
      columns: 2
      fill_image: false
  - block: research-trajectory
    id: research-trajectory
    content:
      eyebrow: 'Core Technical Blueprint'
      title: 'Three Interconnected Technical Layers'
      text: 'From high-precision spatial geometry, to multimodal world engines, to generalist lifelong embodied agents.'
      stages:
        - index: '01'
          label: 'Bedrock'
          title: 'Spatial Intelligence & Robust Geometry'
          text: 'Diffusion-guided sample consensus, reinforcement learning, embedded 3D Gaussian SLAM, and multi-camera SfM establish millimeter-accurate scene structure under extreme outliers.'
          papers:
            - label: 'DiffSAC'
              url: 'publications/diffsac/'
            - label: 'MRASfM'
              url: 'publications/mrasfm/'
            - label: 'VCGS-SLAM'
              url: 'publications/vcgs-slam/'
            - label: 'MovSAM'
              url: 'publications/movsam/'
            - label: 'RLSAC'
              url: 'publications/rlsac/'
        - index: '02'
          label: 'Bridge'
          title: 'Multimodal Representations & 4D Data Engines'
          text: 'Self-supervised iterative denoising and geometrically consistent 4D video editing shatter the real-world data bottleneck for generalist robot policy learning.'
          papers:
            - label: 'MID'
              url: 'publications/mid/'
            - label: 'ERMV'
              url: 'publications/ermv/'
        - index: '03'
          label: 'Frontier'
          title: 'General-Purpose Embodied Agent Systems'
          text: 'Pioneering continuous audio-visual-action learning and lifelong experience memory to create robots that listen, reason, act, and continuously self-improve.'
          papers:
            - label: 'Teach and Grow'
              url: 'publications/tgl/'
            - label: 'HEAR'
              url: 'publications/hear/'
  - block: video-showcase
    id: robot-demos
    content:
      title: Robots That Listen, Reason, and Act
      text: |-
        Real-robot evaluations from **HEAR**, our acoustic-embodied manipulation framework published in **IJRR**. Turn on audio to experience how continuous acoustic cues transform robot causal decision-making!
      project_url: https://hear.irmv.top/
      project_label: Explore HEAR Project & Code
      videos:
        - title: Long-Horizon Moka Pot Coffee
          eyebrow: Real Robot · VSLA Paradigm
          description: In a complex multi-stage task, the robot continuously tracks boiling, bubbling, and contact acoustics to trigger timely actions.
          src: https://hear.irmv.top/static/videos/moka_pot_all_web.mp4?v=681a0fb
          poster: moka.webp
        - title: Millisecond-Level Transient Alarm Interception
          eyebrow: Causal Acoustic Memory
          description: A fleeting alarm occurring inside the open-loop execution gap is instantly preserved by causal memory, seamlessly overriding the next trajectory!
          src: https://hear.irmv.top/static/videos/alarm_all.mp4?v=681a0fb
          poster: alarm.webp
        - title: Active Bottle Shaking & Physical State Inference
          eyebrow: Interactive Acoustic Reasoning
          description: The robot actively shakes an opaque container, inferring liquid/solid occupancy from transient sound before executing precision sorting.
          src: https://hear.irmv.top/static/videos/empty_all.mp4?v=681a0fb
          poster: empty.webp
    design:
      background:
        color:
          light: '#edf7fb'
          dark: '#061426'
  - block: collection
    id: engineering-projects
    content:
      title: 'Engineering Projects & Production Systems'
      text: |-
        Beyond laboratory benchmarks, I lead complex, full-stack systems engineering in the wild: directing large-scale programs in commercial Autonomous Valet Parking (AVP), industrial 4D auto-annotation, mass-production outdoor robotic mowers, and AI for Science dual-arm mobile manipulation.
      sort_by: weight
      sort_ascending: true
      filters:
        folders:
          - projects
      count: 6
    design:
      view: project-feature
      columns: 1
      fill_image: false
      show_date: false
      show_read_time: false
      show_read_more: false
  - block: cta-card
    id: contact
    content:
      title: Building the Future of Physical AI Together
      text: |-
        I am actively seeking research scientist, staff engineer, and postdoctoral opportunities worldwide across Physical AI, Embodied Foundation Models, and Autonomous Systems. If you are looking for an ambitious researcher who bridges mathematical depth, top-tier publications, and proven full-stack real-robot leadership, let's connect!
      button:
        text: Get in Touch
        url: mailto:changniep@gmail.com
    design:
      card:
        css_class: 'bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white shadow-2xl'
        css_style: ''
---
