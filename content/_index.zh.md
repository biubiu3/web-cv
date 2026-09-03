---
title: ''
summary: '聂畅是上海交通大学博士生，研究物理 AI、具身智能、智能体机器人系统、LLM/VLM 推理与视觉-语言-动作模型。'
date: 2022-10-24
lastmod: 2026-09-03
type: landing
seo:
  title: '聂畅 | 物理 AI、具身智能与机器人学习'

sections:
  - block: resume-biography-3
    id: about
    content:
      username: me
      text: ''
      headings:
        about: 关于我
        education: 教育经历
        interests: 研究兴趣
    design:
      background:
        gradient_mesh:
          enable: true
      name:
        size: md
      avatar:
        size: medium
        shape: circle
  - block: markdown
    id: research
    content:
      title: 研究愿景
      text: |-
        我的研究关注如何让机器人超越固定的一次性策略，成为能够**跨模态感知、推理物理结果，并从经验中持续改进**的系统。

        这条主线连接三个方向。首先，我研究**以智能体为中心的机器人学习**，通过可复用技能和持久经验实现局部适应，而不必每次重训完整策略。其次，我将<strong>大语言模型（LLM）、视觉语言模型（VLM）和视觉—语言—动作模型（VLA）</strong>连接起来，并引入声音、本体感觉和记忆，使模型推理始终落在真实物理交互中。最后，我研究**鲁棒感知与具身数据生成**，从学习式采样一致性到机器人多视角轨迹的一致编辑。

        **HEAR** 与 **Teach and Grow（TGL）** 是这条路线最具代表性的工作：HEAR 让机器人能够持续感知声音并据此操作；TGL 则将示范、工具、物理反馈和记忆组织为能够积累并复用能力的机器人系统。
    design:
      columns: '1'
  - block: markdown
    id: papers
    content:
      title: 从可靠感知到持续成长的机器人
      text: |-
        我的工作形成了一条连续的故事线：先让**感知与几何估计更可靠**，再研究**跨模态学习和高质量数据生成**，最终构建能够利用声音、工具、反馈与记忆来获得可复用能力的**通用机器人系统**。以下论文沿研究脉络展开，每张卡片同时标注年份与发表信息，其中 **HEAR** 和 **TGL** 是当前最具代表性的成果。
    design:
      columns: '1'
  - block: collection
    id: foundations
    content:
      title: '01 · 可靠感知与几何'
      text: 从学习如何采样、分割和重建开始，为后续具身系统建立可靠的几何基础。
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
      title: '02 · 多模态数据与模型'
      text: 进一步探索跨模态可迁移的学习规律，并生成跨视角、跨时间一致的机器人经验。
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
      title: '03 · 通用机器人系统'
      text: HEAR 与 TGL 将此前的工作汇聚为多感官、智能体中心的机器人系统，使其能够感知因果信号并从物理经验中成长。
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
  - block: video-showcase
    id: robot-demos
    content:
      title: 能够聆听、推理与行动的机器人
      text: |-
        以下是声音中心机器人操作框架 **HEAR** 的实机实验。打开声音，你可以直观看到：为什么机器人在执行动作的同时，还需要记住稍纵即逝的声学事件。
      project_url: https://hear.irmv.top/
      project_label: 查看 HEAR 项目页
      videos:
        - title: 摩卡咖啡
          eyebrow: 实机 · VSLA
          description: 机器人在多阶段咖啡任务中持续结合声音和视觉上下文完成操作。
          src: https://hear.irmv.top/static/videos/moka_pot_all_web.mp4?v=681a0fb
          poster: moka.webp
        - title: 闹钟
          eyebrow: 瞬时触发声
          description: 即使短促的闹铃发生在动作块之间，它仍会改变机器人的后续决策。
          src: https://hear.irmv.top/static/videos/alarm_all.mp4?v=681a0fb
          poster: alarm.webp
        - title: 空瓶还是有内容物？
          eyebrow: 交互声音
          description: 机器人摇晃瓶子，根据产生的声音判断状态，再完成对应放置。
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
      title: '工程项目'
      text: |-
        除了论文研究，我也参与面向真实传感器、生产接口与实地运行的工程项目。两个代表性案例分别是面向自动驾驶数据的多相机 SfM，以及智能割草机器人的点云与多传感器融合障碍感知。
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
      title: 寻找全球工作与博士后机会
      text: |-
        我正在寻找全球范围内的研究、工程和博士后岗位，尤其希望加入从事物理 AI、具身智能、智能体机器人系统、LLM/VLM 推理与视觉-语言-动作模型的团队。
      button:
        text: 联系我
        url: mailto:changniep@gmail.com
    design:
      card:
        css_class: 'bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white shadow-2xl'
        css_style: ''
---
