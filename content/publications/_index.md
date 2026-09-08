---
title: Publications
summary: Publications by Nie Chang in embodied intelligence, multimodal learning, robot perception, and robust estimation.
lastmod: 2026-09-06
cms_exclude: true
type: landing
seo:
  title: 'Robotics & Embodied AI Publications | Nie Chang'

sections:
  - block: markdown
    id: publication-intro
    content:
      title: 'Selected Publications & Research'
      text: |-
        Spanning agentic lifelong robot learning, multimodal causal manipulation, embodied generative world models, embedded 3D Gaussian Splatting SLAM, and ultra-robust geometric estimation. Highlighting fundamental challenges, breakthrough methodologies, and state-of-the-art experimental results.
    design:
      columns: '1'
      background:
        gradient_mesh:
          enable: true
  - block: collection
    id: publication-list
    content:
      filters:
        folders:
          - publications
      sort_by: publication_order
      sort_ascending: true
      count: 10
    design:
      view: publication-rich
      columns: 1
      show_read_time: false
      show_date: false
---
