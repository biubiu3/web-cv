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
      text: 论文与项目进展。
      initial_count: 4
      more_label: 展开更多
      less_label: 收起
      items:
        - date: '2026'
          display_date: '2026'
          tag: 项目
          text: 新增机器人化学家项目：面向 AI for Science 的双臂移动操作。
          url: 'projects/robot-chemist/'
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
          text: 智能割草机器人完成实地测试。
          url: 'projects/mower/'
  - block: markdown
    id: research
    content:
      title: 研究愿景
      text: |-
        我研究机器人如何**结合多模态感知做出决策，并从执行经验中学习**。具体问题包括：如何用少量示教学习可复用技能，如何将声音和记忆用于操作，以及如何生成一致的多视角训练数据。

        我将大语言模型（LLM）、视觉语言模型（VLM）与视觉语言动作模型（VLA）用于机器人推理和控制，并研究声音、本体感觉与记忆的使用。视觉几何和自监督去噪也是我的研究方向，涵盖采样一致性估计与机器人多视角轨迹编辑。

        **HEAR** 持续记录声音，使短促事件能够影响后续操作。**Teach and Grow（TGL）** 从示教中提取技能，利用物理反馈验证执行结果，并保存技能与修复经验供后续任务复用。
    design:
      columns: '1'
  - block: markdown
    id: papers
    content:
      title: 论文与研究方向
      text: |-
        我的工作涉及视觉几何、多模态学习和机器人操作。几何方法恢复场景结构，数据生成与去噪方法改善训练数据，机器人系统则利用声音和执行反馈调整动作。
    design:
      columns: '1'
  - block: collection
    id: selected-publications
    content:
      title: '代表性论文'
      text: 十项代表性工作，附发表信息与方法介绍。
      filters:
        folders:
          - publications
        tags:
          - Computer Vision
          - Multimodal Learning
          - Robot Manipulation
      sort_by: homepage_order
      sort_ascending: true
      count: 10
    design:
      view: article-grid
      columns: 2
      fill_image: false
  - block: research-trajectory
    id: research-trajectory
    content:
      eyebrow: 这些工作如何连接
      title: 三个相关的研究方向
      text: 这些工作分别研究场景几何、训练数据和机器人行为。
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
          text: 利用自监督去噪与一致的 4D 编辑，改善不同模态的观测质量，扩充机器人训练数据。
          papers:
            - label: 'MID'
              url: 'publications/mid/'
            - label: 'ERMV'
              url: 'publications/ermv/'
        - index: '03'
          label: 机器人学习
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
        以下实机实验展示 **HEAR** 如何利用声音完成操作。开启声音可听到影响机器人决策的提示音与交互声音。
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
        - title: 摇瓶辨别内容物
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
        我曾负责园区自主代客泊车、自动驾驶 4D 自动标注和智能割草机器人项目，参与系统设计、算法开发与实地测试。在工业机器人项目中，我负责工厂搬运机器人的物体识别与双臂操作。
      sort_by: weight
      sort_ascending: true
      filters:
        folders:
          - projects
      count: 6
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
