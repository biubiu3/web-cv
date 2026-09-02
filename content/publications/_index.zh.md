---
title: 论文与研究
summary: 聂畅在具身智能、多模态学习、机器人感知与鲁棒估计方向的论文和研究工作。
cms_exclude: true
type: landing

sections:
  - block: markdown
    id: publication-intro
    content:
      title: 论文与研究
      text: |-
        以下按时间从新到旧列出已发表论文与当前预印本；每条记录均完整列出作者，并标明经核实的期刊、会议或预印本平台。
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
      sort_by: date
      sort_ascending: false
      count: 8
    design:
      view: citation
      columns: 1
      show_read_time: false
      show_date: true
---
