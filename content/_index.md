---
# Leave the homepage title empty to use the site title
title: ''
summary: 'Nie Chang is a final-year Ph.D. researcher developing agentic robot systems, LLM/VLM reasoning, and Vision-Language-Action models for Physical AI and embodied intelligence.'
date: 2022-10-24
lastmod: 2026-09-02
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
      title: 'A Research Story: From Reliable Perception to Growing Robots'
      text: |-
        My work follows a continuous path: **make perception reliable**, then **learn across modalities and generate better data**, and finally **build robot systems that can use sound, tools, feedback, and memory to acquire reusable capabilities**. The papers below are ordered by that intellectual story rather than publication date. **HEAR** and **Teach and Grow (TGL)** are the current representative outcomes.
    design:
      columns: '1'
  - block: collection
    id: foundations
    content:
      title: '01 · Reliable Perception & Geometry'
      text: Learning how to sample, segment, and reconstruct robustly provides the geometric foundation for later embodied systems.
      filters:
        folders:
          - publications
        tags:
          - Computer Vision
      sort_by: story_order
      sort_ascending: true
      count: 4
    design:
      view: article-grid
      columns: 2
      fill_image: false
  - block: collection
    id: multimodal-models
    content:
      title: '02 · Multimodal Data & Models'
      text: The next step is to learn transferable restoration principles and create consistent robot experience across modalities and time.
      filters:
        folders:
          - publications
        tags:
          - Multimodal Learning
      sort_by: story_order
      sort_ascending: true
      count: 2
    design:
      view: article-grid
      columns: 2
      fill_image: false
  - block: collection
    id: general-systems
    content:
      title: '03 · General Robot Systems'
      text: HEAR and TGL bring the earlier threads together in multisensory and agent-centered robot systems that perceive causal signals and grow through physical experience.
      filters:
        folders:
          - publications
        tags:
          - Robot Manipulation
      sort_by: story_order
      sort_ascending: true
      count: 2
    design:
      view: article-grid
      columns: 2
      fill_image: false
  - block: collection
    id: engineering-projects
    content:
      title: 'Engineering Projects'
      text: |-
        Beyond research papers, I build systems that must work with real sensors, real interfaces, and downstream production constraints. These cases separate the wider industry–academia program from my personal ownership: multi-camera SfM for autonomous-driving data, and LiDAR plus multi-sensor obstacle perception for an intelligent lawn robot.
      filters:
        folders:
          - projects
      count: 2
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
