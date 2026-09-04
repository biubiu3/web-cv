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
      title: 'News'
      text: 'Selected paper and project milestones across my research trajectory.'
      initial_count: 4
      more_label: 'More news'
      less_label: 'Show less'
      items:
        - date: '2026'
          display_date: '2026'
          tag: 'Paper'
          text: 'HEAR was published in IJRR.'
          url: 'publications/hear/'
        - date: '2026'
          display_date: '2026'
          tag: 'Manuscript'
          text: 'Teach and Grow is under review at T-RO.'
          url: 'publications/tgl/'
        - date: '2025'
          display_date: '2025'
          tag: 'Manuscript'
          text: 'ERMV is under review at TCSVT.'
          url: 'publications/ermv/'
        - date: '2026'
          display_date: '2026'
          tag: 'Paper'
          text: 'MID was published in IEEE TNNLS.'
          url: 'publications/mid/'
        - date: '2026'
          display_date: '2026'
          tag: 'Paper'
          text: 'MRASfM was published at ICRA 2026.'
          url: 'publications/mrasfm/'
        - date: '2026'
          display_date: '2026'
          tag: 'Accepted'
          text: 'VCGS-SLAM was accepted by IJCV.'
          url: 'publications/vcgs-slam/'
        - date: '2025'
          display_date: '2025'
          tag: 'Paper'
          text: 'MovSAM was published at IROS 2025.'
          url: 'publications/movsam/'
        - date: '2026'
          display_date: '2026'
          tag: 'Manuscript'
          text: 'DiffSAC is under review at IJCV.'
          url: 'publications/diffsac/'
        - date: '2023'
          display_date: '2023'
          tag: 'Paper'
          text: 'RLSAC was published at ICCV 2023.'
          url: 'publications/rlsac/'
        - date: '2024'
          display_date: '2024'
          tag: 'Project'
          text: 'Multi-camera SfM entered a production 4D auto-annotation pipeline.'
          url: 'projects/sfm/'
        - date: '2022'
          display_date: '2022'
          tag: 'Project'
          text: 'The campus-scale AVP system completed integration and vehicle testing with Voyager Intelligent Systems.'
          url: 'projects/avp/'
        - date: '2022'
          display_date: '2022'
          tag: 'Project'
          text: 'The autonomous lawn robot completed its field-tested project phase.'
          url: 'projects/mower/'
  - block: markdown
    id: research
    content:
      title: 'Research Vision'
      subtitle: ''
      text: |-
        My research asks how robots can move beyond fixed, one-shot policies to become systems that **perceive across modalities, reason about physical outcomes, and improve through experience**.

        This agenda connects three threads. First, I study **agent-centered robot learning**, where reusable skills and persistent experience support adaptation without repeatedly rebuilding an entire policy. Second, I connect **Large Language Models (LLMs)** and **Vision-Language Models (VLMs)** with **Vision-Language-Action (VLA) models**, extending them with sound, proprioception, and memory so that reasoning remains grounded in physical interaction. Third, I develop **robust perception and embodied data generation**, from learned sample consensus to consistent editing of robotic multi-view trajectories.

        **HEAR** and **Teach and Grow (TGL)** are the clearest expressions of this direction: HEAR introduces continuous sound-aware manipulation, while TGL organizes demonstrations, tools, physical feedback, and memory into a robot system that accumulates reusable capabilities.
    design:
      columns: '1'
  - block: markdown
    id: papers
    content:
      title: 'Selected Publications, Connected by One Research Agenda'
      text: |-
        The publication list follows a curated order that foregrounds the work I most want readers to encounter. Each card retains its year, venue or review status, and technical area. The connection between the papers is explained separately: reliable perception and geometry support multimodal data and models, which in turn enable robot systems that listen, reason, act, and learn from experience.
    design:
      columns: '1'
  - block: collection
    id: selected-publications
    content:
      title: 'Selected Publications'
      text: Nine representative works in a curated reading order; the research map below explains their technical continuity.
      filters:
        folders:
          - publications
        tags:
          - Computer Vision
          - Multimodal Learning
          - Robot Manipulation
      sort_by: homepage_order
      sort_ascending: true
      count: 9
    design:
      view: article-grid
      columns: 2
      fill_image: false
  - block: research-trajectory
    id: research-trajectory
    content:
      eyebrow: 'How the work connects'
      title: 'One trajectory, three technical layers'
      text: 'The cards above follow a curated reading order. This map shows how the works connect from dependable scene understanding to multimodal learning and general robot systems.'
      stages:
        - index: '01'
          label: 'Foundation'
          title: 'Reliable Perception & Geometry'
          text: 'Robust sampling, open-world segmentation, SLAM, and multi-camera reconstruction establish dependable scene structure.'
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
          title: 'Multimodal Data & Models'
          text: 'Self-supervised denoising and consistent 4D editing turn heterogeneous observations into more useful learning experience.'
          papers:
            - label: 'MID'
              url: 'publications/mid/'
            - label: 'ERMV'
              url: 'publications/ermv/'
        - index: '03'
          label: 'Current frontier'
          title: 'General Robot Systems'
          text: 'Sound, tools, feedback, skills, and memory are integrated into robots that reason and improve through physical interaction.'
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
        Selected real-robot trials from **HEAR**, my sound-centric manipulation framework. Turn on sound to see why a robot must remember transient acoustic events while it acts.
      project_url: https://hear.irmv.top/
      project_label: Explore the HEAR project
      videos:
        - title: Moka Coffee
          eyebrow: Real robot · VSLA
          description: The robot uses continuous sound and visual context while completing a multi-stage coffee task.
          src: https://hear.irmv.top/static/videos/moka_pot_all_web.mp4?v=681a0fb
          poster: moka.webp
        - title: Alarm Clock
          eyebrow: Trigger sound
          description: A short alarm event changes the manipulation decision even when it falls between action chunks.
          src: https://hear.irmv.top/static/videos/alarm_all.mp4?v=681a0fb
          poster: alarm.webp
        - title: Empty or Occupied?
          eyebrow: Interactive sound
          description: The robot shakes a bottle and uses the resulting sound to infer its state before placing it.
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
      title: 'Engineering Projects'
      text: |-
        Alongside my research papers, I lead industry–academia systems built around real sensors, production interfaces, and field operation. Three case studies cover automated valet parking, 4D vision auto-annotation for autonomous-driving data, and the complete autonomy stack of an intelligent lawn robot.
      filters:
        folders:
          - projects
      count: 3
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
      title: Open to Global Opportunities
      text: |-
        I am seeking research, engineering, and postdoctoral opportunities worldwide. I am especially interested in teams working on Physical AI, embodied intelligence, agentic robot systems, LLM/VLM reasoning, and Vision-Language-Action models.
      button:
        text: Contact Me
        url: mailto:changniep@gmail.com
    design:
      card:
        css_class: 'bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white shadow-2xl'
        css_style: ''
---
