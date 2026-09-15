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
      text: 聚焦具身智能前沿探索与全栈机器人系统落地的关键突破与最新里程碑。
      initial_count: 4
      more_label: 展开更多动态
      less_label: 收起动态
      items:
        - date: '2026'
          display_date: '2026'
          tag: 核心项目
          text: 发布机器人化学家（Robotic Chemist）：面向 AI for Science 的双臂移动操作与全自动实验工作流。
          url: 'projects/robot-chemist/'
        - date: '2026'
          display_date: '2026'
          tag: 顶刊发表
          text: "HEAR 研究声音感知机器人操作与连续听觉记忆。"
          url: 'publications/hear/'
        - date: '2026'
          display_date: '2026'
          tag: 最新突破
          text: "Teach and Grow 围绕智能体组织可复用技能与经验。"
          url: 'publications/tgl/'
        - date: '2026'
          display_date: '2026'
          tag: 顶刊接收
          text: "VCGS-SLAM 将紧凑高斯建图与相机跟踪结合起来。"
          url: 'publications/vcgs-slam/'
        - date: '2026'
          display_date: '2026'
          tag: 顶刊发表
          text: "MID 研究跨模态的自监督迭代去噪。"
          url: 'publications/mid/'
        - date: '2026'
          display_date: '2026'
          tag: 顶会发表
          text: "MRASfM 将多相机重建与跨片段场景聚合连接起来。"
          url: 'publications/mrasfm/'
        - date: '2026'
          display_date: '2026'
          tag: 研究亮点
          text: "DiffSAC 通过条件扩散学习几何采样提议。"
          url: 'publications/diffsac/'
        - date: '2025'
          display_date: '2025'
          tag: 研究亮点
          text: "ERMV 在保留记录动作的同时编辑同步机器人轨迹。"
          url: 'publications/ermv/'
        - date: '2025'
          display_date: '2025'
          tag: 顶会发表
          text: "MovSAM 将场景推理与单图像物体分割结合起来。"
          url: 'publications/movsam/'
        - date: '2023'
          display_date: '2023'
          tag: 顶会发表
          text: "RLSAC 从几何反馈中学习采样策略。"
          url: 'publications/rlsac/'
        - date: '2024'
          display_date: '2024'
          tag: 工业落地
          text: 作为总体技术负责人主导的哪吒汽车 4D 自动标注多相机 SfM 平台投入量产运行，端到端重建提速 95%+。
          url: 'projects/sfm/'
        - date: '2023'
          display_date: '2023'
          tag: 工业落地
          text: 作为项目负责人主导的寅家科技全栈自主代客泊车系统（AVP）完成商业化园区与多层地下车库全流程闭环验证。
          url: 'projects/avp/'
        - date: '2022'
          display_date: '2022'
          tag: 工业落地
          text: 作为项目负责人主导的宝时得产学研智能割草机器人攻克复杂草坪全天候感知，完成大规模实地验证。
          url: 'projects/mower/'
  - block: markdown
    id: research
    content:
      title: 学习、感知与机器人行动
      text: |-
        我的研究关注机器人如何将观测与经验转化为可用行为，涉及可复用技能、声音感知操作、视觉数据生成与几何感知。

        **从经验中学习。** Teach and Grow 将示范组织为可以在新场景中落地、执行和检查的技能，通过技能库与结构化记忆保存行为及其使用经验。

        **理解一次交互。** HEAR 将连续声音与机器人决策连接起来；ERMV 研究改变视觉条件时，如何在多个相机中保持记录动作的一致性。

        **恢复空间结构。** 鲁棒估计、去噪、多相机重建与紧凑高斯建图共同构成我在机器人几何感知方向的研究。
    design:
      columns: '1'
  - block: markdown
    id: papers
    content:
      title: 论文与研究
      text: 机器人学习、多模态感知与几何视觉中的问题、思路和方法。
    design:
      columns: '1'
  - block: collection
    id: selected-publications
    content:
      filters:
        folders:
          - publications
      sort_by: homepage_order
      sort_ascending: true
      count: 0
    design:
      view: publication-gallery
      columns: 1
  - block: research-trajectory
    id: research-trajectory
    content:
      eyebrow: 核心技术矩阵
      title: 三层连贯演进的技术架构
      text: 围绕空间结构、多模态观测与可复用机器人行为展开的相关研究。
      stages:
        - index: '01'
          label: 空间基石
          title: 高精度空间几何与鲁棒感知
          text: 通过鲁棒采样、多相机重建与紧凑建图，从不完美观测中恢复有用的空间结构。
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
          label: 模态桥梁
          title: 多模态表征与 4D 具身数据引擎
          text: 通过迭代去噪与同步视频编辑，研究如何恢复和扩展学习所使用的观测。
          papers:
            - label: 'MID'
              url: 'publications/mid/'
            - label: 'ERMV'
              url: 'publications/ermv/'
        - index: '03'
          label: 智能前沿
          title: 通用多感官具身智能体系统
          text: 通过连续听觉记忆与可复用技能，将当前观测和历史经验连接到物理决策。
          papers:
            - label: 'Teach and Grow'
              url: 'publications/tgl/'
            - label: 'HEAR'
              url: 'publications/hear/'
  - block: video-showcase
    id: robot-demos
    content:
      title: 能够聆听、推理并果断行动的物理智能体
      text: |-
        HEAR 机器人演示展示声音事件如何影响操作，任务视频包含同步音频。
      project_url: https://hear.irmv.top/
      project_label: 访问 HEAR 项目主页与开源资源
      videos:
        - title: 摩卡咖啡长时序冲泡
          eyebrow: 真实机械臂 · VSLA 范式
          description: 机器人在多阶段连续复杂任务中，实时融合水沸、蒸汽、碰撞等声学动态与视觉流，精准决策每个动作步。
          src: https://hear.irmv.top/static/videos/moka_pot_all_web.mp4?v=681a0fb
          poster: moka.webp
        - title: 响应短暂警报
          eyebrow: 跨越开环盲区的声学因果记忆
          description: 听觉记忆保存动作执行期间出现的短暂警报，为下一次决策提供依据。
          src: https://hear.irmv.top/static/videos/alarm_all.mp4?v=681a0fb
          poster: alarm.webp
        - title: 主动摇瓶与物理状态推理
          eyebrow: 交互式多感官推理
          description: 机器人主动摇晃不透明药瓶，仅凭瞬时声响精准推断瓶内装载状态与材质属性，果断执行差异化分拣放置。
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
      title: '核心工程项目与系统落地'
      text: |-
        我不局限于实验室与仿真算法，更作为项目负责人与核心架构师深入物理世界与工业一线：主导了面向量产的全栈园区自主代客泊车（AVP）、工业级 4D 自动标注平台、全天候自主智能割草机器人与生化实验室双臂移动操作平台，构建了经受住严苛实战考验的完整系统闭环。
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
      title: 携手开拓物理 AI 与通用具身智能的未来
      text: |-
        我正在寻找全球顶尖科研机构、顶尖工业研究实验室（Physical AI / Embodied Foundation Models / Autonomous Robotics）的研究科学家、核心工程专家与博士后科研职位。如果您正在寻找一位既能推导前沿算法并发表顶刊顶会，又能带领团队打造复杂软硬件全栈实车/机器人系统的学者与工程师，期待与您深度交流！
      button:
        text: 立即联系我
        url: mailto:changniep@gmail.com
    design:
      card:
        css_class: 'bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white shadow-2xl'
        css_style: ''
---
