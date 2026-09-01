---
# Leave the homepage title empty to use the site title
title: ''
summary: ''
date: 2022-10-24
type: landing

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
  - block: markdown
    id: research
    content:
      title: 'Research Vision'
      subtitle: ''
      text: |-
        My research asks how robots can move beyond fixed, one-shot policies and become systems that **perceive across modalities, reason about physical outcomes, and grow through experience**.

        This agenda connects three threads. First, I study **agent-centered robot learning**, where reusable skills and persistent experience support adaptation without repeatedly rebuilding an entire policy. Second, I develop **multisensory and multimodal models** that combine vision, sound, language, proprioception, and action. Third, I work on **robust perception and data generation**, from learned sample consensus to consistent editing of robotic multi-view sequences.

        **HEAR** and **Teach and Grow (TGL)** are the clearest expressions of this direction: HEAR introduces continuous sound-aware manipulation, while TGL organizes demonstrations, tools, feedback, and memory into a robot system that can accumulate reusable capability.
    design:
      columns: '1'
  - block: collection
    id: papers
    content:
      title: Representative Research
      text: HEAR and TGL are my current representative works on multisensory embodied models and agent-centered robot learning.
      filters:
        folders:
          - publications
        featured_only: true
    design:
      view: citation
  - block: collection
    id: publications
    content:
      title: Publications
      text: Selected publications spanning embodied intelligence, multimodal learning, and robust visual estimation.
      filters:
        folders:
          - publications
        exclude_featured: false
      count: 8
    design:
      view: citation
  - block: cta-card
    id: contact
    content:
      title: Open to Global Opportunities
      text: |-
        I am seeking research, engineering, and postdoctoral opportunities worldwide. I am especially interested in teams working on Physical AI, embodied intelligence, multimodal foundation models, and general robot systems.
      button:
        text: Contact Me
        url: mailto:changniep@gmail.com
    design:
      card:
        css_class: 'bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white shadow-2xl'
        css_style: ''
---
