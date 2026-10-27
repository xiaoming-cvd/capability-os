// ============================================================
// 能力原子库 · 数据层
// 一个「能力原子」= 最小可迁移的能力单元：
//   抽象定义（它到底是什么）+ 实证场景（我在哪真的用过）
//   + 可迁移方向 + 与其他原子的连接
// 学习新东西时先查这里：能映射的原子直接复用，
// 映射不上的才新建——避免能力冗余。
// ============================================================

export type AtomStatus = 'core' | 'active' | 'weak' | 'pruned'

export interface AbilityAtom {
  id: string
  name: string
  domain: Domain
  /** 抽象化定义：剥掉具体场景后，这个能力的本质动作 */
  abstraction: string
  /** 实证：我在哪些真实场景里用过它 */
  evidence: string[]
  /** 可迁移方向：这些场景可以直接调用它 */
  transferableTo: string[]
  /** 关键词，用于「学习接入」时的自动映射 */
  keywords: string[]
  /** 与其他原子的连接（id） */
  connections: string[]
  /** 熟练度 1-5 */
  level: number
  status: AtomStatus
}

export type Domain =
  | '项目落地'
  | '研究与分析'
  | '表达与叙事'
  | '工具与技术'
  | '语言与商务'
  | '认知与自我'

export const DOMAINS: Domain[] = [
  '项目落地',
  '研究与分析',
  '表达与叙事',
  '工具与技术',
  '语言与商务',
  '认知与自我',
]

export const DOMAIN_COLORS: Record<Domain, string> = {
  项目落地: '#e8a04c',
  研究与分析: '#7fb4a8',
  表达与叙事: '#c98bb0',
  工具与技术: '#8fa8d8',
  语言与商务: '#d8c86a',
  认知与自我: '#9d8fd8',
}

export const ATOMS: AbilityAtom[] = [
  {
    id: 'transfer-meta',
    name: '能力迁移元技能',
    domain: '认知与自我',
    abstraction:
      '学任何新东西的第一步不是学，是映射：先查已有原子能覆盖多少，缺口单独补，与主线无连接的一律不碰。',
    evidence: ['本网站即此技能的外化——能力原子化的具象产物'],
    transferableTo: ['一切新学习', '考研专业课搭建', '跨领域转轨'],
    keywords: ['学习', '迁移', '新东西', '能力', '元技能', '考研'],
    connections: ['cogn-framework', 'info-retrieval', 'ai-orchestration'],
    level: 4,
    status: 'core',
  },
  {
    id: 'cogn-framework',
    name: '认知框架 A-F 六层',
    domain: '认知与自我',
    abstraction:
      '把经验抽象成分层框架（A 回应策略 / B 沟通语法 / C 边界伦理 / D 自我审计 / E 关系本体 / F 认知创造），需要时整层调用，而不是每次重新发明。',
    evidence: ['《认知演化个人操作指南》及六层文档'],
    transferableTo: ['一切学习与沟通场景', '压力过载时的自我诊断', '复盘'],
    keywords: ['认知', '框架', '复盘', '抽象', '心智'],
    connections: ['transfer-meta', 'boundary-comms'],
    level: 5,
    status: 'core',
  },
  {
    id: 'boundary-comms',
    name: '边界沟通（课题分离）',
    domain: '认知与自我',
    abstraction:
      '先识别这件事是谁的课题，再用「诉求→事件→感受」表达；锋利的话先找活点、缠绷带、只切一刀。',
    evidence: ['HSP 自我调节与关系实践的长期积累'],
    transferableTo: ['亲密关系', '团队协作', '客户与供应商沟通', '谈判'],
    keywords: ['沟通', '边界', '谈判', '关系', '表达诉求', '人际'],
    connections: ['cogn-framework', 'structured-expression'],
    level: 4,
    status: 'core',
  },
  {
    id: 'pm-fullcycle',
    name: '全流程项目管理',
    domain: '项目落地',
    abstraction:
      '把模糊目标拆成阶段→任务→责任人→截止时间，用节奏点（例会/检查点）维持推进，收尾必须复盘归档。',
    evidence: ['中型社区合唱活动全流程负责人：排练/视频/演出/志愿统筹，已收尾'],
    transferableTo: ['活动统筹', '考研备考计划', '供应链协同', '任何多人协作'],
    keywords: ['项目', '管理', '统筹', '供应链', '协作', '计划', '活动'],
    connections: ['structured-expression', 'boundary-comms', 'product-ship'],
    level: 4,
    status: 'core',
  },
  {
    id: 'product-ship',
    name: '产品从 0 到 1 落地',
    domain: '项目落地',
    abstraction:
      '需求判断→工具选型→MVP→合规交付（备案/上线）。核心不是写代码，是判断「这个方案值不值得做、能不能带出去」。',
    evidence: ['大创微信小程序：从想法到代码完成、备案推进中'],
    transferableTo: ['供应链数字化小工具', '创业项目', '大挑战杯项目'],
    keywords: ['产品', '创业', '小程序', '数字化', '落地', '大创', '大挑'],
    connections: ['ai-orchestration', 'pm-fullcycle', 'research-market'],
    level: 3,
    status: 'active',
  },
  {
    id: 'research-market',
    name: '市场调研方法论',
    domain: '研究与分析',
    abstraction:
      '定义问题→选指标→采集→交叉验证→结论。工具（卖家精灵/AI）是放大器，判断永远自己出。',
    evidence: ['亚马逊平台选品 + 卖家精灵，完成一次完整市场调查'],
    transferableTo: ['行业研究', '选品', '论文选题论证', '供应链需求预测'],
    keywords: ['调研', '市场', '选品', '分析', '研究', '需求预测', '行业'],
    connections: ['info-retrieval', 'excel-analysis', 'ai-orchestration'],
    level: 4,
    status: 'core',
  },
  {
    id: 'info-retrieval',
    name: '信息检索与赛题拆解',
    domain: '研究与分析',
    abstraction:
      '把一个大问题拆成可检索的子问题，选对库、选对词、交叉验证来源，再组装回整体。',
    evidence: ['全国信息检索大赛进入省赛淘汰赛'],
    transferableTo: ['考研 434 资料搜集', '论文写作', '合规检索', '供应商尽调'],
    keywords: ['检索', '信息', '搜索', '资料', '论文', '尽调', '合规'],
    connections: ['research-market', 'transfer-meta'],
    level: 4,
    status: 'core',
  },
  {
    id: 'excel-analysis',
    name: 'Excel 数据分析（够用级）',
    domain: '研究与分析',
    abstraction:
      '清洗→透视→图表→一句话结论。标准是「够用、服务决策」，不追求炫技。',
    evidence: ['市场调查数据处理与建模练习'],
    transferableTo: ['财务/运营分析', '434 案例计算', '大挑数据处理'],
    keywords: ['excel', '数据', '分析', '透视', '图表', '财务'],
    connections: ['research-market', 'ai-orchestration'],
    level: 3,
    status: 'active',
  },
  {
    id: 'structured-expression',
    name: '结构化表达',
    domain: '表达与叙事',
    abstraction:
      '一页只讲一个观点：结论先行→证据分层→视觉引导。先搭骨架再填肉。',
    evidence: ['思客沙龙：PPT/讲稿/现场筹备/新闻稿全流程'],
    transferableTo: ['商务写作', '谈判陈述', '面试', '课堂展示', '复试'],
    keywords: ['表达', 'ppt', '演讲', '写作', '展示', '面试', '陈述', '汇报'],
    connections: ['pm-fullcycle', 'video-story', 'english-biz'],
    level: 4,
    status: 'core',
  },
  {
    id: 'video-story',
    name: '视频叙事制作',
    domain: '表达与叙事',
    abstraction:
      '脚本→素材→节奏→导出的流水线思维；模板和流程一旦建好就批量复用。',
    evidence: ['微团课视频制作完成', 'AIGC 赛道 AI 数字人创意视频完成约四分之三'],
    transferableTo: ['自媒体内容', '课程作业', '产品演示视频'],
    keywords: ['视频', '叙事', '剪辑', '内容', '自媒体'],
    connections: ['structured-expression', 'ai-orchestration'],
    level: 3,
    status: 'active',
  },
  {
    id: 'ai-orchestration',
    name: 'AI 协调与提示工程',
    domain: '工具与技术',
    abstraction:
      '把目标翻译成 AI 可执行的分解指令，验收输出、迭代指令——是「指挥」，不是「代劳」，更不是「全信」。',
    evidence: ['大创小程序代码全靠行业判断 + AI 协调完成', 'AI 数字人视频'],
    transferableTo: ['所有知识工作', '代码与数据处理', '写作与翻译', '研究报告'],
    keywords: ['ai', '提示词', '人工智能', 'gpt', '工具', '代码', '编程'],
    connections: ['product-ship', 'research-market', 'transfer-meta', 'video-story', 'excel-analysis'],
    level: 4,
    status: 'core',
  },
  {
    id: 'python-tool',
    name: 'Python 数据处理',
    domain: '工具与技术',
    abstraction:
      'pandas 清洗与建模。已从「主轴」降级为「工具」——按需重启，不再为它单独投入整块时间。',
    evidence: ['Python 项目 1 已主动砍掉（2026-10 裁定）', '重启依赖：2027 春大挑数据处理'],
    transferableTo: ['大挑数据处理（2027 春必须回归）', '批量自动化'],
    keywords: ['python', 'pandas', '编程', '数据清洗', '自动化'],
    connections: ['excel-analysis'],
    level: 2,
    status: 'weak',
  },
  {
    id: 'english-biz',
    name: '英语商务沟通',
    domain: '语言与商务',
    abstraction:
      '把英语从「考试科目」升级为主武器：口语、谈判、商务写作三条线并行。',
    evidence: ['商挑 12 月底全英语参赛（备赛中）', '六级推迟至 2027 春（与主线兼容）'],
    transferableTo: ['MIB 复试口语', '外企面试', '国际供应链沟通'],
    keywords: ['英语', '商务', '口语', '谈判', '外贸', '六级', '面试'],
    connections: ['structured-expression', 'guomao-practice'],
    level: 3,
    status: 'active',
  },
  {
    id: 'guomao-practice',
    name: '国际贸易实务',
    domain: '语言与商务',
    abstraction:
      '贸易术语→结算→单证→运输的规则系统；学它的终点是能做合规判断，不是背条款。',
    evidence: ['国贸实务（在读课程）'],
    transferableTo: ['434 专业课', '贸易合规判断', '跨境供应链'],
    keywords: ['贸易', '国贸', '单证', '结算', '物流', '跨境', '供应链'],
    connections: ['english-biz', 'research-market'],
    level: 2,
    status: 'active',
  },
  {
    id: 'logic-396',
    name: '逻辑与数学（396）',
    domain: '研究与分析',
    abstraction:
      '形式逻辑 + 经济数学的题型套路库；靠重复形成肌肉记忆，不与专业课抢深度加工带宽。',
    evidence: ['396 数学/逻辑刚启动（2026-10）'],
    transferableTo: ['考研初试 396', '商业分析中的数量基础'],
    keywords: ['数学', '逻辑', '396', '考研', '初试'],
    connections: ['transfer-meta'],
    level: 1,
    status: 'active',
  },
  {
    id: 'mem-path',
    name: '物流工程 / MEM 路径知识',
    domain: '项目落地',
    abstraction:
      '2026-10-21 前职业备选路径的知识储备。已裁定弃用——职业主轴定为供应链商务面（MIB）。',
    evidence: ['10-21 本人终裁：弃用 199/MEM 路径，方向锁至 2027 年 6 月'],
    transferableTo: [],
    keywords: ['mem', '物流工程', '199', '管理类联考'],
    connections: [],
    level: 1,
    status: 'pruned',
  },
]

// ---------- 派生工具 ----------

export function degree(atom: AbilityAtom): number {
  return atom.connections.length
}

export function atomById(id: string): AbilityAtom | undefined {
  return ATOMS.find((a) => a.id === id)
}

export const STATUS_META: Record<AtomStatus, { label: string; color: string; desc: string }> = {
  core: { label: '核心', color: '#e8a04c', desc: '高连接度，所有迁移从这里出发' },
  active: { label: '活跃', color: '#7fb4a8', desc: '正在使用或成长中' },
  weak: { label: '弱连接', color: '#8a8578', desc: '连接少，观察：强化、降级或砍掉' },
  pruned: { label: '已砍', color: '#5a564d', desc: '已判定为冗余，防止回流' },
}

// ---------- 学习接入：课题 → 迁移分析 ----------

export interface MatchResult {
  atom: AbilityAtom
  score: number
  reason: string
}

export function matchAtoms(topic: string): MatchResult[] {
  const t = topic.toLowerCase()
  const results: MatchResult[] = []
  for (const atom of ATOMS) {
    if (atom.status === 'pruned') continue
    let score = 0
    const hits: string[] = []
    for (const kw of atom.keywords) {
      if (t.includes(kw.toLowerCase())) {
        score += kw.length >= 3 ? 2 : 1
        hits.push(kw)
      }
    }
    // 可迁移方向的匹配
    for (const dir of atom.transferableTo) {
      if (t.includes(dir)) {
        score += 2
        hits.push(dir)
      }
    }
    if (score > 0) results.push({ atom, score, reason: hits.slice(0, 3).join(' · ') })
  }
  return results.sort((a, b) => b.score - a.score)
}

export const DOMAIN_GAP: Record<Domain, string> = {
  项目落地: '该领域的流程与协同规则（和谁、按什么节奏、交付什么）',
  研究与分析: '该领域的指标体系与验证方法（什么算数、什么不算）',
  表达与叙事: '该领域的语料与案例积累（内行怎么说话、怎么呈现）',
  工具与技术: '该领域的专用工具链（先够用，再求精）',
  语言与商务: '该领域的术语体系与商业惯例',
  认知与自我: '',
}

export interface LearnPlan {
  reusable: MatchResult[]
  gaps: { domain: Domain; text: string }[]
  skip: AbilityAtom[]
}

export function buildLearnPlan(topic: string): LearnPlan {
  const reusable = matchAtoms(topic)
  const covered = new Set(reusable.map((r) => r.atom.domain))
  const gaps = DOMAINS.filter((d) => !covered.has(d) && DOMAIN_GAP[d])
    .slice(0, 3)
    .map((d) => ({ domain: d, text: DOMAIN_GAP[d] }))
  const related = new Set(reusable.map((r) => r.atom.id))
  const skip = ATOMS.filter(
    (a) =>
      (a.status === 'pruned' || (a.status === 'weak' && degree(a) <= 1)) &&
      !related.has(a.id)
  )
  return { reusable, gaps, skip }
}
