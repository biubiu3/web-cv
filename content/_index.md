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
  - block: profile
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
          text: "HEAR studies sound-aware robotic manipulation and continuous acoustic memory."
          url: 'publications/hear/'
        - date: '2026'
          display_date: '2026'
          tag: 'Latest Breakthrough'
          text: "Teach and Grow organizes reusable robot skills and experience around an agent."
          url: 'publications/tgl/'
        - date: '2026'
          display_date: '2026'
          tag: 'Accepted'
          text: "VCGS-SLAM combines compact Gaussian mapping with camera tracking."
          url: 'publications/vcgs-slam/'
        - date: '2026'
          display_date: '2026'
          tag: 'Top Journal'
          text: "MID studies self-supervised iterative denoising across data modalities."
          url: 'publications/mid/'
        - date: '2026'
          display_date: '2026'
          tag: 'Top Conference'
          text: "MRASfM connects multi-camera reconstruction with cross-session scene aggregation."
          url: 'publications/mrasfm/'
        - date: '2026'
          display_date: '2026'
          tag: 'Research Highlight'
          text: "DiffSAC learns geometric sampling proposals through conditional diffusion."
          url: 'publications/diffsac/'
        - date: '2025'
          display_date: '2025'
          tag: 'Research Highlight'
          text: "ERMV edits synchronized robot trajectories while preserving recorded actions."
          url: 'publications/ermv/'
        - date: '2025'
          display_date: '2025'
          tag: 'Top Conference'
          text: "MovSAM combines scene reasoning and single-image object segmentation."
          url: 'publications/movsam/'
        - date: '2023'
          display_date: '2023'
          tag: 'Top Conference'
          text: "RLSAC learns a sampling policy from geometric feedback."
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
      title: 'Learning, perception, and robot action'
      text: |-
        My research asks how robots can turn observations and experience into useful behavior. I study reusable skills, sound-aware manipulation, visual data generation, and geometric perception.

        **Learning from experience.** Teach and Grow organizes demonstrations into skills that can be grounded, executed and checked in a new scene. A library and structured memory preserve behavior and the experience of using it.

        **Understanding an interaction.** HEAR connects continuous sound with robot decisions. ERMV studies how visual conditions can change while recorded actions remain consistent across cameras.

        **Recovering spatial structure.** My work on robust estimation, denoising, multi-camera reconstruction and compact Gaussian mapping builds geometric representations for robot perception.
    design:
      columns: '1'
  - block: markdown
    id: papers
    content:
      title: 'Publications & Research'
      text: 'Ideas and methods in robot learning, multimodal perception, and geometric vision.'
    design:
      columns: '1'
  - block: collection
    id: selected-publications
    content:
      filters:
        folders:
          - publications
      sort_by: homepage_order
      sort_ascending: true
      count: 6
      archive:
        enable: false
    design:
      view: publication-gallery
      columns: 1
  - block: research-trajectory
    id: research-trajectory
    content:
      eyebrow: 'Core Technical Blueprint'
      title: 'Three Interconnected Technical Layers'
      text: 'Related research on spatial structure, multimodal observations, and reusable robot behavior.'
      stages:
        - index: '01'
          label: 'Bedrock'
          title: 'Spatial Intelligence & Robust Geometry'
          text: 'Robust sampling, multi-camera reconstruction and compact mapping recover useful spatial structure from imperfect observations.'
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
          text: 'Iterative denoising and synchronized video editing study how to recover and vary the observations used for learning.'
          papers:
            - label: 'MID'
              url: 'publications/mid/'
            - label: 'ERMV'
              url: 'publications/ermv/'
        - index: '03'
          label: 'Frontier'
          title: 'General-Purpose Embodied Agent Systems'
          text: 'Continuous acoustic memory and reusable skills connect observations and past experience to physical decisions.'
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
        HEAR robot demonstrations show how acoustic events influence manipulation. Audio accompanies the task videos.
      project_url: https://hear.irmv.top/
      project_label: Explore HEAR Project & Code
      videos:
        - title: Long-Horizon Moka Pot Coffee
          eyebrow: Real Robot · VSLA Paradigm
          description: In a complex multi-stage task, the robot continuously tracks boiling, bubbling, and contact acoustics to trigger timely actions.
          src: https://hear.irmv.top/static/videos/moka_pot_all_web.mp4?v=681a0fb
          poster: moka.webp
        - title: Responding to a Brief Alarm
          eyebrow: Causal Acoustic Memory
          description: Acoustic memory preserves a brief alarm during action execution so it can inform the next decision.
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
        I am actively seeking research scientist, staff engineer, and postdoctoral opportunities worldwide across Physical AI, Embodied Foundation Models, and Autonomous Systems. If you are looking for an ambitious researcher who combines frontier theoretical innovation, top-tier publications, and proven full-stack real-robot leadership, let's connect!
      button:
        text: Get in Touch
        url: mailto:changniep@gmail.com
    design:
      card:
        css_class: 'bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white shadow-2xl'
        css_style: ''
---
