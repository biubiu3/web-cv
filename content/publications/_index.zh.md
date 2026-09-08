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
        涵盖通用机器人自主学习、跨模态因果操作、具身世界模型与 4D 数据引擎、嵌入式 3D 高斯 SLAM 以及极端鲁棒几何估计。深入解读每项工作的核心瓶颈、突破性方法设计与 SOTA 实验战绩。
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
