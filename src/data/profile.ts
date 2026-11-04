// ============================================================
// 目标岗位能力画像 · 缺口分析
// 数据来源：2026 秋招供应链分析/计划/运营岗 JD 公开信息
// （京东物流、京东方、联想、亚士德、前程无忧在招岗位）
// 每个维度：市场要求 vs 我的现状 → 缺口 = 该补的
// 原则：事实记录 + 最小行动，不打分羞辱自己
// ============================================================

export interface GapDimension {
  id: string
  name: string
  /** 市场要求摘要（来自 JD 高频关键词） */
  marketRequirement: string
  /** 市场要求熟练度 1-5 */
  requiredLevel: number
  /** 我当前的熟练度 1-5（基于实证，不是感觉） */
  currentLevel: number
  /** 支撑当前水平判断的能力原子 */
  relatedAtomIds: string[]
  /** 当前事实记录 */
  fact: string
  /** 下一个最小行动 */
  nextAction: string
  /** 优先级：high 直接影响求职 / mid 加分项 / low 可以等 */
  priority: 'high' | 'mid' | 'low'
}

export const PROFILE_META = {
  targetRole: '供应链分析 / 计划岗（应届 → 1-3 年）',
  targetCity: '广深优先',
  source: '2026 秋招 JD 整理：京东物流、京东方、联想、亚士德、前程无忧在招岗位 + 牛客网面经',
  updatedAt: '2026-11',
}

export const GAP_DIMENSIONS: GapDimension[] = [
  {
    id: 'excel',
    name: 'Excel 高级分析',
    marketRequirement:
      '硬性门槛：数据透视表、Power Query、VLOOKUP 是 JD 前三条高频要求，初筛缺关键词直接淘汰。',
    requiredLevel: 5,
    currentLevel: 3,
    relatedAtomIds: ['excel-analysis'],
    fact: '市场调查做过清洗+透视+图表，够「够用级」；未系统练过 Power Query 与复杂函数嵌套。',
    nextAction: '用 434 真题数据或商挑数据做一次完整练习：透视表 + 一个 Power Query 清洗流程，产出一张能给别人看的图。',
    priority: 'high',
  },
  {
    id: 'sql',
    name: 'SQL 取数',
    marketRequirement:
      '初筛关键词：「掌握基础 SQL 取数」是数据分析岗 JD 标配，笔试常考多表联查。',
    requiredLevel: 4,
    currentLevel: 1,
    relatedAtomIds: [],
    fact: '完全没学过。这是目前离市场要求最远的一项。',
    nextAction: '不等考研结束：2026-12 前用牛客/LeetCode 数据库免费题刷完 SELECT-WHERE-JOIN-GROUP BY 四件套，目标每天 30 分钟 × 2 周。',
    priority: 'high',
  },
  {
    id: 'sc-logic',
    name: '供应链业务逻辑',
    marketRequirement:
      '面试核心：需求预测、安全库存、MAPE、OTIF、库存周转、S&OP 指标逻辑；会给 SKU 数据情景题要求诊断预测偏差。',
    requiredLevel: 4,
    currentLevel: 1,
    relatedAtomIds: ['guomao-practice'],
    fact: '国贸实务在学（偏贸易端），供应链计划的核心指标还没建立。MIB 434 正好是系统补这个的载体。',
    nextAction: '把 434「供应链管理」章节的指标体系单独做成一页纸：每个指标 = 定义 + 公式 + 一个算例，12 月前完成。',
    priority: 'high',
  },
  {
    id: 'insight-comms',
    name: '数据→业务建议的表达',
    marketRequirement:
      'JD 明确写「把数据分析结论转化为业务建议，对接采购、仓储、计划多部门」——不只是做报表。',
    requiredLevel: 4,
    currentLevel: 4,
    relatedAtomIds: ['structured-expression', 'research-market', 'boundary-comms'],
    fact: '思客沙龙全程呈现 + 亚马逊选品报告把数据讲成了决策——这正是 JD 要的能力，已有实证。',
    nextAction: '保持：每次练手分析（如 SQL 练习产出）都强制写 3 句话「业务建议」收尾，形成肌肉记忆。',
    priority: 'mid',
  },
  {
    id: 'erp-bi',
    name: 'ERP 认知 + BI 可视化',
    marketRequirement:
      '「了解 SAP/Oracle ERP 优先」，Power BI/Tableau 是加分项；面试会问 WMS/ERP 基础逻辑。',
    requiredLevel: 3,
    currentLevel: 1,
    relatedAtomIds: [],
    fact: '零接触。但 JD 用词是「了解」「优先」——属于加分项而非门槛。',
    nextAction: '低优先：考研后用一周搭一个 Power BI 看板（就用 SQL 练习的数据），同时把 ERP 当概念学，知道单据流转逻辑即可。',
    priority: 'low',
  },
  {
    id: 'english',
    name: '英语（商务听说读写）',
    marketRequirement:
      '外企/跨境岗硬性要求：CET-4/6 + 良好听说读写；广深外资供应链岗普遍要求。',
    requiredLevel: 4,
    currentLevel: 3,
    relatedAtomIds: ['english-biz'],
    fact: '商挑 12 月全英语参赛是现成检验场；六级已排到 2027 春，与主线兼容。',
    nextAction: '商挑参赛后写一篇 300 词英文复盘（不追求发表，追求写完），作为口语之外的写作实证。',
    priority: 'high',
  },
  {
    id: 'ai-data',
    name: 'AI 辅助数据分析',
    marketRequirement:
      '2026 新增加分项：用 AI 工具辅助数据清洗、生成分析脚本、撰写报告；部分 JD 写「有案例者优先」。',
    requiredLevel: 3,
    currentLevel: 4,
    relatedAtomIds: ['ai-orchestration'],
    fact: 'AI 协调是现有最强原子（5 连接）。差的是「供应链场景」的实证案例。',
    nextAction: '把 SQL/Excel 练习过程本身做成案例：记录「我如何让 AI 帮我写查询、我怎么验收」，面试可直接讲。',
    priority: 'mid',
  },
  {
    id: 'soft',
    name: '软素质（责任 / 协作 / 抗压）',
    marketRequirement:
      '每条 JD 都写：责任心强、跨部门协作、抗压能力、执行力——供应链岗的日常就是异常处理和多方协调。',
    requiredLevel: 4,
    currentLevel: 4,
    relatedAtomIds: ['reliability', 'orderliness', 'boundary-comms', 'pm-fullcycle'],
    fact: '合唱活动收尾、多线并行无烂尾、课题分离式沟通——有完整实证链，这是真实优势而非自评。',
    nextAction: '面试弹药化：把每个软素质配一个 STAR 故事（情境-任务-行动-结果），12 月前写进简历素材库。',
    priority: 'mid',
  },
]

// ---------- 派生 ----------

export type GapStatus = 'gap' | 'edge' | 'ok'

export function gapStatus(d: GapDimension): GapStatus {
  const diff = d.requiredLevel - d.currentLevel
  if (diff >= 2) return 'gap'
  if (diff === 1) return 'edge'
  return 'ok'
}

export const GAP_STATUS_META: Record<
  GapStatus,
  { label: string; color: string }
> = {
  gap: { label: '硬缺口', color: '#d97a6a' },
  edge: { label: '差一点', color: '#e8a04c' },
  ok: { label: '已达标/优势', color: '#7fb4a8' },
}

export function gapSummary() {
  const list = GAP_DIMENSIONS.map((d) => ({ d, s: gapStatus(d) }))
  return {
    gap: list.filter((x) => x.s === 'gap').length,
    edge: list.filter((x) => x.s === 'edge').length,
    ok: list.filter((x) => x.s === 'ok').length,
    highPriorityOpen: list.filter(
      (x) => x.s !== 'ok' && x.d.priority === 'high'
    ).length,
  }
}
