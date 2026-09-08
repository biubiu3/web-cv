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
          text: 首创听觉具身操作大模型 HEAR 正式发表于机器人学顶级旗舰期刊 The International Journal of Robotics Research (IJRR)！
          url: 'publications/hear/'
        - date: '2026'
          display_date: '2026'
          tag: 顶刊在审
          text: 智能体终身机器人学习架构 Teach and Grow (TGL) 投稿 IEEE Transactions on Robotics (T-RO) 审稿中。
          url: 'publications/tgl/'
        - date: '2026'
          display_date: '2026'
          tag: 顶刊接收
          text: 紧凑型嵌入式 3D 高斯 SLAM 系统 VCGS-SLAM 被计算机视觉顶级期刊 International Journal of Computer Vision (IJCV 2026) 接收！
          url: 'publications/vcgs-slam/'
        - date: '2026'
          display_date: '2026'
          tag: 顶刊发表
          text: 自监督多模态迭代去噪统一框架 MID 正式发表于 IEEE Transactions on Neural Networks and Learning Systems (TNNLS)！
          url: 'publications/mid/'
        - date: '2026'
          display_date: '2026'
          tag: 顶会发表
          text: 多相机 SfM 与大尺度场景聚合框架 MRASfM 发表并在机器人顶会 ICRA 2026 宣读（nuScenes 榜单斩获第一）！
          url: 'publications/mrasfm/'
        - date: '2026'
          display_date: '2026'
          tag: 顶刊在审
          text: 扩散引导采样一致性几何估计 DiffSAC 投稿计算机视觉顶级期刊 IJCV 审稿中。
          url: 'publications/diffsac/'
        - date: '2025'
          display_date: '2025'
          tag: 顶刊在审
          text: 4D 多视角机器人轨迹生成模型 ERMV 投稿 IEEE TCSVT 审稿中（双臂实机成功率由 2% 跃升至 89%）。
          url: 'publications/ermv/'
        - date: '2025'
          display_date: '2025'
          tag: 顶会发表
          text: 深度思考单图像运动分割模型 MovSAM 发表并在机器人顶会 IROS 2025 宣读（超越时序视频基线）。
          url: 'publications/movsam/'
        - date: '2023'
          display_date: '2023'
          tag: 顶会发表
          text: 强化学习几何采样一致性 RLSAC 发表并在计算机视觉顶会 ICCV 2023 宣读！
          url: 'publications/rlsac/'
        - date: '2024'
          display_date: '2024'
          tag: 工业落地
          text: 主导的多相机 SfM 工业级 4D 自动标注平台在哪吒汽车量产流程全面交付，数据处理提速超 95%！
          url: 'projects/sfm/'
        - date: '2022'
          display_date: '2022'
          tag: 工业落地
          text: 作为项目负责人主导的园区 AVP 自主代客泊车全栈系统与寅家科技完成严苛实车集成与闭环测试。
          url: 'projects/avp/'
        - date: '2022'
          display_date: '2022'
          tag: 工业落地
          text: 作为项目负责人主导的宝时得产学研智能割草机器人攻克复杂草坪全天候感知，完成大规模实地验证。
          url: 'projects/mower/'
  - block: markdown
    id: research
    content:
      title: 研究愿景：打造具备物理常识与终身进化的通用机器人系统
      text: |-
        物理世界的极端复杂性要求机器人绝不能停留在单一、静态的固定策略，而必须进化为**具备全模态因果感知、物理常识推理并能在真实交互中终身积累复用技能的高阶通用智能体**。

        我的研究围绕这一宏伟使命，贯通三大相互支撑的核心支柱：

        1. **以智能体为中心的持续进化学习（Agentic Robot Learning & Lifelong Autonomy）**：攻克端到端大模型高昂的“重训税”瓶颈，提出可验证、可自愈的模块化技能块（Skill Block）与结构化经验记忆（Experience Memory）。机器人仅需少量示范即可形成闭环技能，并在物理交互中自主诊断、修复并跨任务复用，实现无需全模型重训的终身持续进化（代表作：**TGL**，T-RO 审稿中）；
        2. **全模态具身基础模型（Multimodal Embodied Foundation Models & VLA）**：突破传统视觉独占范式，首创将高频听觉、触觉、本体感觉与多模态大模型深度统一的视觉-声音-语言-动作范式（VSLA），破解动作分块执行导致的关键信息盲区，让机器人在瞬息万变的物理交互中保持敏锐的因果洞察（代表作：**HEAR**，机器人旗舰顶刊 IJRR 2026）；
        3. **高精度空间智能与 4D 具身世界模型（Spatial Intelligence & 4D Data Engine）**：从扩散引导的鲁棒几何估计（**DiffSAC**）、嵌入式 3D 高斯 SLAM（**VCGS-SLAM**，IJCV 2026）、刚性相机组 SfM（**MRASfM**，ICRA 2026），到物理一致的 4D 生成式多视角轨迹编辑（**ERMV**），为物理 AI 构建高精度空间度量基石与取之不尽的高保真世界泛化数据。
    design:
      columns: '1'
  - block: markdown
    id: papers
    content:
      title: 代表性学术论著：从几何基底到通用智能体
      text: |-
        我的学术论著系统性锚定三层演进架构：底层以高精几何与鲁棒感知构筑物理空间基石；中层以自监督与生成式世界模型打通全模态数据桥梁；顶层驱动具备听觉、常识推理、精准操作与终身成长能力的通用机器人系统。
    design:
      columns: '1'
  - block: collection
    id: selected-publications
    content:
      title: '代表性论文'
      text: 精选十项代表性工作，展示在机器人学、计算机视觉与多模态智能顶级期刊与会议上的突破性成果。
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
      eyebrow: 核心技术矩阵
      title: 三层连贯演进的技术架构
      text: 从高精度空间感知基底，到多模态数据生成引擎，再到终身进化的通用机器人系统。
      stages:
        - index: '01'
          label: 空间基石
          title: 高精度空间几何与鲁棒感知
          text: 结合扩散模型、强化学习、嵌入式 3D 高斯 SLAM 与多相机 SfM，在极端外点与复杂光照下建立毫米级高精几何基底。
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
          text: 自监督迭代去噪与多视角极线一致性 4D 轨迹生成，彻底破除具身策略泛化中的真实数据匮乏瓶颈。
          papers:
            - label: 'MID'
              url: 'publications/mid/'
            - label: 'ERMV'
              url: 'publications/ermv/'
        - index: '03'
          label: 智能前沿
          title: 通用多感官具身智能体系统
          text: 首创连续声音-视觉-动作（VSLA）范式与技能经验记忆架构，赋予机器人感知瞬时物理事件与终身自主成长的能力。
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
        以下为发表于国际机器人顶级期刊 **IJRR** 的 **HEAR** 框架在真实物理机械臂上的实机评测。开启声音，感受瞬时声学线索如何颠覆性改变机器人的因果决策！
      project_url: https://hear.irmv.top/
      project_label: 访问 HEAR 项目主页与开源资源
      videos:
        - title: 摩卡咖啡长时序冲泡
          eyebrow: 真实机械臂 · VSLA 范式
          description: 机器人在多阶段连续复杂任务中，实时融合水沸、蒸汽、碰撞等声学动态与视觉流，精准决策每个动作步。
          src: https://hear.irmv.top/static/videos/moka_pot_all_web.mp4?v=681a0fb
          poster: moka.webp
        - title: 毫秒级瞬时警报拦截
          eyebrow: 跨越开环盲区的声学因果记忆
          description: 即使警报声仅极其短暂地出现在开环动作块的执行间隙，因果音频记忆网络依然瞬间捕获并彻底重塑后续动作！
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
