---
title: Publications
summary: Publications by Nie Chang in embodied intelligence, multimodal learning, robot perception, and robust estimation.
lastmod: 2026-09-02
cms_exclude: true
type: landing
seo:
  title: 'Robotics & Embodied AI Publications | Nie Chang'

sections:
  - block: markdown
    id: publication-intro
    content:
      title: Publications
      text: |-
        Eight works spanning general robot learning, multisensory manipulation, Vision-Language-Action models, embodied data generation, multimodal denoising, and robust geometric perception. Published papers and manuscripts under review are grouped by year; within each year, representative and robot-centered work appears first. Every record includes the complete author list, full venue name, publication status, method figure, and a concise account of the technical contribution.
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
      count: 8
    design:
      view: publication-rich
      columns: 1
      show_read_time: false
      show_date: false
---
