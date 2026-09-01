---
title: 论文与研究
summary: 聂畅在具身智能、多模态学习、机器人感知与鲁棒估计方向的论文和研究工作。
cms_exclude: true
type: landing

sections:
  - block: markdown
    content:
      title: 按研究演进讲述工作
      text: |-
        以下顺序遵循思想演进，而不是简单按年份排列：**可靠感知与几何 → 多模态数据与模型 → 通用机器人系统**。每张卡片会进入官方项目/论文页，或打开本站的图文概览，说明问题、核心方法及其在整体研究路线中的作用。
    design:
      columns: '1'
      background:
        gradient_mesh:
          enable: true
  - block: collection
    content:
      filters:
        folders:
          - publications
      sort_by: story_order
      sort_ascending: true
      count: 8
    design:
      view: article-grid
      columns: 2
      fill_image: false
      show_read_time: false
      show_date: true
---
