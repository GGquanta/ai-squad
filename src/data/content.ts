/** 页面全部文案与结构化数据。改内容优先改本文件，再同步 docs/PRD.md。 */

export const siteMeta = {
  brand: '中科国光 · AI 研究小组',
  brandShort: 'AI 研究小组',
  company: '北京中科国光量子科技有限公司',
  companyBrand: '国光量子',
  companyEn: 'GGQUANTA',
  tagline: '让量子科研更可及，让 AI 在硬核科学中可信赖',
  github: 'https://github.com/ggquanta',
} as const

export const navLinks = [
  { id: 'team', label: '团队介绍' },
  { id: 'focus', label: '职责介绍' },
  { id: 'products', label: '核心产品' },
  { id: 'vision', label: '发展愿景' },
  { id: 'join', label: '加入我们' },
] as const

export const hero = {
  eyebrow: 'Quantum × Artificial Intelligence',
  titleLines: ['中科国光', 'AI 研究小组'],
  lead:
    '我们聚焦人工智能与量子科技的交叉融合，面向科研辅助、知识工程与垂直场景智能体，开展可复现的工程化研究与产品交付。',
  primaryCta: { label: '了解产品', href: '#products' },
  secondaryCta: { label: '加入我们', href: '#join' },
  scrollHint: 'Scroll',
} as const

/** Hero 背景 LLM 文本流语料：经典论文英文短摘，供 TokenStreamField 轮播 */
export const heroTokenStream = {
  excerpts: [
    {
      source: 'Attention Is All You Need (2017)',
      text: 'Attention is all you need — we propose a new simple network architecture, the Transformer.',
    },
    {
      source: 'Attention Is All You Need (2017)',
      text: 'Multi-head attention allows the model to jointly attend to information from different positions.',
    },
    {
      source: 'Attention Is All You Need (2017)',
      text: 'Scaled dot-product attention computes compatibility between a query and all keys in the input.',
    },
    {
      source: 'Improving Language Understanding by Generative Pre-Training (2018)',
      text: 'Large gains can be realized by generative pre-training of a language model on a diverse corpus.',
    },
    {
      source: 'Language Models are Unsupervised Multitask Learners (2019)',
      text: 'GPT-2 demonstrates that language models trained on WebText acquire broad zero-shot capabilities.',
    },
    {
      source: 'BERT: Pre-training of Deep Bidirectional Transformers (2019)',
      text: 'BERT is designed to pre-train deep bidirectional representations from unlabeled text.',
    },
    {
      source: 'BERT: Pre-training of Deep Bidirectional Transformers (2019)',
      text: 'Masked language modeling enables the representation to fuse left and right context.',
    },
    {
      source: 'Scaling Laws for Neural Language Models (2020)',
      text: 'Loss scales as a power-law with model size, dataset size, and compute used for training.',
    },
    {
      source: 'Training language models to follow instructions (2022)',
      text: 'Aligning language models with human intent via reinforcement learning from human feedback.',
    },
    {
      source: 'Chain-of-Thought Prompting (2022)',
      text: 'Generating a chain of thought — a series of intermediate reasoning steps — improves performance.',
    },
  ],
} as const

export const team = {
  eyebrow: '关于我们',
  title: '一支年轻、专注、开放的研究小队',
  mission:
    '人工智能研发团队聚焦人工智能与量子科技交叉领域的技术探索与产品研发，致力于推动「人工智能 + 量子计算」协同发展。我们借鉴人工智能在垂直场景中的成熟实践，开展智能体软件研发与集成化产品交付，并分阶段推进既有产品的升级与架构整合，为企业各业务条线提供可落地的智能化方案。',
  composition:
    '核心成员来自北京大学、中国人民大学等重点高校，兼具扎实的工程落地能力与开拓性的产品思维。团队重视规范驱动开发与文档沉淀，在轻松开放的协作氛围中推进前沿探索。',
  playful: {
    prefix: '我们是',
    segments: [
      { brands: 'Anthropic、OpenAI、Cursor', note: '忠实用户' },
      { brands: 'GPT、DeepSeek、Claude 等模型', note: '长期订阅者' },
      { brands: 'NVIDIA、Apple、AMD 等公司', note: '多年产品使用方' },
    ],
  },
} as const

export const focusAreas = {
  eyebrow: '我们做什么',
  title: '职责清晰，方向明确',
  intro:
    '团队以可交付的工程成果为目标，覆盖科研文献智能、量子实验辅助与企业级知识管理等核心方向。',
  items: [
    {
      title: '科研文献智能体',
      label: 'Literature Agents',
      desc: '在规模化学术文献访问能力之上，构建多角色智能体工作流，覆盖检索、规划、证据综合、引用核查与分级受众表达。',
    },
    {
      title: '量子计算实验辅助',
      label: 'Quantum Lab Assist',
      desc: '将大语言模型与量子计算知识、混合编程及实验全链路相结合，降低量子科研与教学门槛。',
    },
    {
      title: '科普与 STEM 数据工程',
      label: 'STEM Data Engineering',
      desc: '建设面向科普和科研的监督微调数据体系，强调封闭上下文、事实校订与可审计血缘。',
    },
    {
      title: '文献知识结构化',
      label: 'Knowledge Structuring',
      desc: '从论文正文到实体词典、文献—实体映射与知识图谱扩展，支撑领域术语一致性与检索增强生成。',
    },
    {
      title: '量子安全与 AI 协同',
      label: 'Quantum Security × AI',
      desc: '在后量子密码、量子密钥分发等议题上，探索监测、测评与智能体安全通道等工程化路径。',
    },
  ],
  goals: {
    title: '当前核心目标',
    items: [
      '推动以大语言模型为代表的人工智能技术在量子科研领域的广泛应用',
      '利用现代化 AI 工具加快量子产业的产品化、工程化和智能化步伐',
      '探索量子计算与人工智能在算法基座和系统构建方面的深度融合',
    ],
  },
} as const

export type Product = {
  id: string
  name: string
  nameEn: string
  tags: string[]
  summary: string
  icon: string
}

export const products: {
  eyebrow: string
  title: string
  intro: string
  items: Product[]
} = {
  eyebrow: '产品矩阵',
  title: '从知识底座到应用工作台',
  intro:
    '六个核心项目既各自独立交付，又在数据、模型与智能体编排层面相互支撑，共同服务于科研创新与企业智能化办公。',
  items: [
    {
      id: 'smartx',
      name: '小光',
      nameEn: 'SmartX',
      tags: ['企业办公', '多智能体', '桌面客户端'],
      summary:
        '基于 OpenClaw 的企业级智能办公桌面客户端，将命令行式 AI 编排转化为图形化、可扩展的日常办公体验。',
      icon: '/icons/smartx.png',
    },
    {
      id: 'quantamate',
      name: '夸米',
      nameEn: 'QuantaMate',
      tags: ['量子科研', '工作台', '多智能体'],
      summary:
        '面向量子科研的多智能体研究操作系统，把文献、设计、编程、提交、分析与报告串成可验收的流水线。',
      icon: '/icons/quantamate.png',
    },
    {
      id: 'xenomi',
      name: '玄幂',
      nameEn: 'Xenomi',
      tags: ['领域大模型', '可溯源', '私有化'],
      summary:
        '可私有化、可溯源、可审计的领域大语言模型家族，把 AI 写作从开放域对话升级为在证据链内交付材料。',
      icon: '/icons/xenomi.png',
    },
    {
      id: 'linkcorpus',
      name: '量库',
      nameEn: 'LinkCorpus',
      tags: ['文献知识库', 'Agentic RAG', '多模态'],
      summary:
        '基于数千万级科研文献接口的知识基础设施，为智能体与垂类模型提供可溯源、可扩展的文献证据池。',
      icon: '/icons/linkcorpus.png',
    },
    {
      id: 'classroom',
      name: 'AI 课堂',
      nameEn: 'AI Classroom',
      tags: ['知识分享', '协同流程', '最佳实践'],
      summary:
        '团队 AI 协同办公与开发赋能经验的知识分享站，以可检索、可投稿的方式沉淀工具使用与协作方法。',
      icon: '/icons/classroom.png',
    },
    {
      id: 'inkmote',
      name: '引墨',
      nameEn: 'InkMote',
      tags: ['文档全链路', '采编发', '深度排版'],
      summary:
        '以可追溯多智能体工作流覆盖撰写、优化、排版与发布，把文书生产升级为可监视、可管理的流水线。',
      icon: '/icons/inkmote.png',
    },
  ],
}

export const vision = {
  eyebrow: '向前看',
  title: '量子技术与人工智能的共同探索',
  paragraphs: [
    '我们持续关注「AI 推动量子认知与科研效率」与「量子能力增强可信计算与通信」的双向协同。量子技术提供更高可信的随机性、传感与计算范式，人工智能则加速知识生产、实验设计与工程交付。',
    '面向未来产业的交叉融合，团队将在垂直领域追求达到业界先进水平的模型与智能体能力，持续产出可沉淀的科研成果，并搭建具备强交互能力的企业级演示与体验平台。',
  ],
  pillars: [
    { title: '交叉融合', desc: '以量子芯片与产业场景为土壤，让 AI 能力扎根真实问题。' },
    { title: '可信可溯', desc: '强调证据链、引文核验与可审计交付，拒绝不可解释的黑箱输出。' },
    { title: '开放共建', desc: '在合规前提下逐步开放工具链、数据集 Schema 与技术方案摘要。' },
  ],
} as const

export const join = {
  eyebrow: '一起做事',
  title: '加入我们，共同探索前沿',
  intro:
    '我们重视培养计划、文档沉淀与轻松开放的协作氛围。新人可以从规范驱动开发与 AI 协同工作流起步，逐步成长为能独立闭环交付的工程师。',
  stages: [
    {
      period: '基础 · 约 1 个月',
      items: [
        '熟悉 AI 协同开发工具与工程化流程',
        '建立规范的技术文档撰写与演示表达能力',
        '理解 TDD、SDD 与基础 DevOps 实践',
        '培养产品化思维，识别场景与用户痛点',
      ],
    },
    {
      period: '短期 · 约 3 个月',
      items: [
        '独立完成调研、方案设计类基础文档',
        '独立制作结构清晰的演示材料',
        '完成与智能体相关的基础功能模块开发',
        '系统学习人工智能与量子科技基础知识',
      ],
    },
    {
      period: '长期 · 约 1 年',
      items: [
        '深度参与年度核心产品研发全周期',
        '独立完成需求分析到部署的基础闭环',
        '形成对行业形态与发展趋势的稳定认知',
        '能够独立完成产品演示与对外介绍',
      ],
    },
  ],
  culture: [
    { title: 'GitHub 协作', desc: 'Issues / Projects 跟踪任务，文档与代码同仓管理。' },
    { title: 'AI 协同开发', desc: '鼓励使用主流编码辅助工具完成设计、实现与审查。' },
    { title: '月度成果演示', desc: '每月一次展示产出、学习心得与改进思考。' },
    { title: '开源回馈', desc: '在合规与知识产权策略允许时，将成果以开源形式发布。' },
  ],
  cta: {
    tag: 'Join the Squad',
    label: '了解岗位详情',
    note: '欢迎通过企业邮箱或团队渠道投递简历，并附上你感兴趣的方向与代表性作品。',
    action: { label: '访问团队 GitHub' },
  },
} as const

export const footer = {
  columns: {
    nav: '页面导航',
    connect: '联系与关注',
  },
} as const
