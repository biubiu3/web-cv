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
      text: 'Paper and project updates.'
      initial_count: 4
      more_label: 'More news'
      less_label: 'Show less'
      items:
        - date: '2026'
          display_date: '2026'
          tag: 'Project'
          text: 'New project case: a dual-arm mobile robotic chemist for AI for Science.'
          url: 'projects/robot-chemist/'
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
          text: 'The autonomous lawn robot completed field testing.'
          url: 'projects/mower/'
  - block: markdown
    id: research
    content:
      title: 'Research Vision'
      subtitle: ''
      text: |-
        I study how robots can **combine multimodal observations to make decisions and learn from execution experience**. My work addresses reusable skills from sparse demonstrations, sound and memory for manipulation, and consistent multi-view training data.

        I use Large Language Models (LLMs), Vision-Language Models (VLMs), and Vision-Language-Action (VLA) models for robot reasoning and control. I study how sound, proprioception, and memory inform these models. My work also covers visual geometry and self-supervised denoising, including learned sample consensus and editing of multi-view robot trajectories.

        **HEAR** records sound continuously so brief events can affect later actions. **Teach and Grow (TGL)** extracts skills from demonstrations, checks execution through physical feedback, and stores skills and repairs for later tasks.
    design:
      columns: '1'
  - block: markdown
    id: papers
    content:
      title: 'Publications and Research Directions'
      text: |-
        My work covers visual geometry, multimodal learning, and robot manipulation. Geometry methods recover scene structure; denoising and generation improve training data; robot systems use sound and execution feedback to guide actions.
    design:
      columns: '1'
  - block: collection
    id: selected-publications
    content:
      title: 'Selected Publications'
      text: Ten selected papers with publication details and method descriptions.
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
      eyebrow: 'How the work connects'
      title: 'Three Related Research Directions'
      text: 'These studies address scene geometry, training data, and robot behavior.'
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
          text: 'Self-supervised denoising improves observations across modalities. Consistent 4D editing expands robot training data.'
          papers:
            - label: 'MID'
              url: 'publications/mid/'
            - label: 'ERMV'
              url: 'publications/ermv/'
        - index: '03'
          label: 'Robot learning'
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
        These real-robot trials show how **HEAR** uses sound during manipulation. Turn on the audio to hear the cues that affect its decisions.
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
        - title: Identifying Bottle Contents
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
        I led projects in automated valet parking, 4D auto-annotation for driving data, and autonomous mowing. My work included system design, algorithm development, and field testing. In industrial robotics, I worked on object recognition and dual-arm manipulation for factory material handling.
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
