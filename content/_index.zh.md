---
title: ''
summary: '聂畅是上海交通大学博士生，研究物理 AI、具身智能、智能体机器人系统、LLM/VLM 推理与视觉-语言-动作模型。'
date: 2022-10-24
lastmod: 2026-09-04
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
  - block: news-timeline
    id: news
    content:
      title: 最新动态
      text: 沿研究主线选取的论文与项目进展。
      initial_count: 4
      more_label: 展开更多
      less_label: 收起
      items:
        - date: '2026'
          display_date: '2026'
          tag: 论文
          text: HEAR 发表于 IJRR。
          url: 'publications/hear/'
        - date: '2026'
          display_date: '2026'
          tag: 论文
          text: Teach and Grow 正在 T-RO 审稿。
          url: 'publications/tgl/'
        - date: '2025'
          display_date: '2025'
          tag: 论文
          text: ERMV 正在 TCSVT 审稿。
          url: 'publications/ermv/'
        - date: '2026'
          display_date: '2026'
          tag: 论文
          text: MID 发表于 IEEE TNNLS。
          url: 'publications/mid/'
        - date: '2026'
          display_date: '2026'
          tag: 论文
          text: MRASfM 发表于 ICRA 2026。
          url: 'publications/mrasfm/'
        - date: '2026'
          display_date: '2026'
          tag: 已接收
          text: VCGS-SLAM 被 IJCV 2026 接收。
          url: 'publications/vcgs-slam/'
        - date: '2025'
          display_date: '2025'
          tag: 论文
          text: MovSAM 发表于 IROS 2025。
          url: 'publications/movsam/'
        - date: '2026'
          display_date: '2026'
          tag: 论文
          text: DiffSAC 正在 IJCV 审稿。
          url: 'publications/diffsac/'
        - date: '2023'
          display_date: '2023'
          tag: 论文
          text: RLSAC 发表于 ICCV 2023。
          url: 'publications/rlsac/'
        - date: '2024'
          display_date: '2024'
          tag: 项目
          text: 多相机 SfM 进入量产 4D 自动标注流程。
          url: 'projects/sfm/'
        - date: '2022'
          display_date: '2022'
          tag: 项目
          text: 园区 AVP 系统与寅家科技完成系统集成和实车测试。
          url: 'projects/avp/'
        - date: '2022'
          display_date: '2022'
          tag: 项目
          text: 智能割草机器人完成实地测试项目阶段。
          url: 'projects/mower/'
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
      title: 代表性论文与贯穿其中的研究主线
      text: |-
        以下论文按照经过筛选的展示顺序排列，优先呈现最希望读者首先了解的工作；每张卡片保留年份、发表或审稿状态及技术方向。论文之间的联系单独通过研究路线呈现：可靠感知与几何支撑多模态数据和模型，进一步走向能够聆听、推理、行动并从经验中成长的机器人系统。
    design:
      columns: '1'
  - block: collection
    id: selected-publications
    content:
      title: '代表性论文'
      text: 九项工作的重点展示顺序；下方研究路线图进一步说明它们之间的技术联系。
      filters:
        folders:
          - publications
        tags:
          - Computer Vision
          - Multimodal Learning
          - Robot Manipulation
      sort_by: homepage_order
      sort_ascending: true
      count: 9
    design:
      view: article-grid
      columns: 2
      fill_image: false
  - block: research-trajectory
    id: research-trajectory
    content:
      eyebrow: 这些工作如何连接
      title: 一条研究主线，三个技术层次
      text: 论文卡片采用经过筛选的阅读顺序；这张路线图进一步展示这些工作如何从可靠场景理解连接到多模态学习与通用机器人系统。
      stages:
        - index: '01'
          label: 技术基础
          title: 可靠感知与几何
          text: 通过鲁棒采样、开放世界分割、SLAM 和多相机重建，建立可信的场景结构。
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
          label: 连接层
          title: 多模态数据与模型
          text: 利用自监督去噪与一致的 4D 编辑，把异构观测转化为更有效的学习经验。
          papers:
            - label: 'MID'
              url: 'publications/mid/'
            - label: 'ERMV'
              url: 'publications/ermv/'
        - index: '03'
          label: 当前前沿
          title: 通用机器人系统
          text: 将声音、工具、反馈、技能与记忆集成到能够推理并从物理交互中持续改进的机器人中。
          papers:
            - label: 'Teach and Grow'
              url: 'publications/tgl/'
            - label: 'HEAR'
              url: 'publications/hear/'
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
        除了论文研究，我也负责面向真实传感器、生产接口与实地运行的产学研工程项目。三个代表性案例覆盖园区自主代客泊车、自动驾驶 4D 视觉自动标注，以及智能割草机器人的完整自主系统。
      filters:
        folders:
          - projects
      count: 3
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
