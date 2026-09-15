---
title: 论文与研究
summary: 聂畅在具身智能、多模态学习、机器人感知与鲁棒估计方向的论文和研究工作。
lastmod: 2026-09-06
cms_exclude: true
type: landing
seo:
  title: '机器人与具身智能论文 | 聂畅'

sections:
  - block: markdown
    id: publication-intro
    content:
      title: 代表性学术论著
      text: |-
        机器人学习、声音感知操作、视觉数据生成、建图与鲁棒几何估计。
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
      count: 0
    design:
      view: publication-gallery
      columns: 1
      show_read_time: false
      show_date: false
---
