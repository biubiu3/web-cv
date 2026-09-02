---
title: 论文与研究
summary: 聂畅在具身智能、多模态学习、机器人感知与鲁棒估计方向的论文和研究工作。
lastmod: 2026-09-02
cms_exclude: true
type: landing
seo:
  title: '机器人与具身智能论文 | 聂畅'

sections:
  - block: markdown
    id: publication-intro
    content:
      title: 论文与研究
      text: |-
        八项工作覆盖通用机器人学习、多感官操作、视觉-语言-动作模型、具身数据生成、多模态去噪与鲁棒几何感知。已发表论文和审稿中稿件按年份由新到旧组织；同一年内优先展示代表性工作与机器人相关工作。每条记录均给出完整作者、期刊或会议全名、发表状态、方法图和简要技术总结。
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
