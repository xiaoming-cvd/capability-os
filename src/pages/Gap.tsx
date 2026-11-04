import { useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowRight,
  Briefcase,
  Check,
  Lightbulb,
  Plus,
  Scissors,
  Search,
} from 'lucide-react'
import {
  GAP_DIMENSIONS,
  GAP_STATUS_META,
  PROFILE_META,
  gapStatus,
  gapSummary,
} from '../data/profile'
import {
  DOMAIN_COLORS,
  STATUS_META,
  atomById,
  buildLearnPlan,
  type LearnPlan,
} from '../data/atoms'

const PRIORITY_META = {
  high: { label: '求职门槛', color: '#d97a6a' },
  mid: { label: '加分/保持', color: '#7fb4a8' },
  low: { label: '可等待', color: '#8a8578' },
} as const

function LevelBar({ label, level, color }: { label: string; level: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 shrink-0 text-[11px] text-muted-foreground">
        {label}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{ width: `${(level / 5) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-3 text-right text-[11px]">{level}</span>
    </div>
  )
}

export default function Gap() {
  const [tab, setTab] = useState<'role' | 'topic'>('role')

  return (
    <div className="fade-up space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl">缺口分析</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          缺口不是我哪里不行，是「目标在哪」和「我在哪」之间的距离。距离 = 清单，清单 = 最小行动。
          <span className="text-foreground">只记录事实，不做自我评判。</span>
        </p>
      </header>

      {/* 页签 */}
      <div className="flex gap-2">
        {(
          [
            { key: 'role', label: '目标岗位缺口', icon: Briefcase },
            { key: 'topic', label: '任意课题接入', icon: Search },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${
              tab === t.key
                ? 'border-primary/60 bg-primary/15 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'role' ? <RoleGap /> : <TopicIntake />}
    </div>
  )
}

// ================= 目标岗位缺口 =================

function RoleGap() {
  const summary = gapSummary()
  return (
    <div className="space-y-8">
      {/* 画像头部 */}
      <div className="rounded-2xl border border-border bg-card/60 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest text-primary">目标岗位画像</p>
            <h2 className="font-display mt-1 text-2xl">
              {PROFILE_META.targetRole}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {PROFILE_META.targetCity} · 数据更新：{PROFILE_META.updatedAt}
            </p>
          </div>
          <div className="flex gap-5">
            {(
              [
                ['硬缺口', summary.gap, '#d97a6a'],
                ['差一点', summary.edge, '#e8a04c'],
                ['达标/优势', summary.ok, '#7fb4a8'],
              ] as const
            ).map(([label, n, color]) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl" style={{ color }}>
                  {n}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          依据：{PROFILE_META.source}
        </p>
      </div>

      {/* 维度卡片 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {GAP_DIMENSIONS.map((d) => {
          const s = gapStatus(d)
          const meta = GAP_STATUS_META[s]
          const p = PRIORITY_META[d.priority]
          return (
            <div
              key={d.id}
              className="card-hover rounded-xl border border-border bg-card/60 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium">{d.name}</h3>
                <div className="flex shrink-0 gap-1.5">
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px]"
                    style={{ color: p.color, backgroundColor: `${p.color}1a` }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px]"
                    style={{ color: meta.color, backgroundColor: `${meta.color}1a` }}
                  >
                    {meta.label}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <LevelBar label="市场要求" level={d.requiredLevel} color="#8a8578" />
                <LevelBar label="我的现状" level={d.currentLevel} color={meta.color} />
              </div>

              <div className="mt-4 space-y-3 text-sm leading-relaxed">
                <p className="text-muted-foreground">
                  <span className="text-foreground">市场要求：</span>
                  {d.marketRequirement}
                </p>
                <p className="text-muted-foreground">
                  <span className="text-foreground">事实记录：</span>
                  {d.fact}
                </p>
                {d.relatedAtomIds.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {d.relatedAtomIds.map((id) => {
                      const a = atomById(id)
                      if (!a) return null
                      return (
                        <Link
                          key={id}
                          to={`/atoms?focus=${id}`}
                          className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground hover:text-primary"
                        >
                          {a.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
                <div className="flex items-start gap-2 rounded-lg bg-primary/5 px-3.5 py-3">
                  <Lightbulb size={14} className="mt-0.5 shrink-0 text-primary" />
                  <p className="text-xs leading-relaxed">
                    <span className="text-primary">最小行动：</span>
                    {d.nextAction}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ================= 任意课题接入（原学习接入） =================

const EXAMPLES = ['供应链管理', '国际商务谈判', '贸易合规', '数据分析', '考研复试']

function TopicIntake() {
  const [topic, setTopic] = useState('')
  const [plan, setPlan] = useState<LearnPlan | null>(null)
  const [queried, setQueried] = useState('')

  const run = (t: string) => {
    const trimmed = t.trim()
    if (!trimmed) return
    setQueried(trimmed)
    setPlan(buildLearnPlan(trimmed))
  }

  return (
    <div className="space-y-8">
      <p className="text-sm leading-relaxed text-muted-foreground">
        想学一个具体课题？先别急着找课。输入后系统把已有原子映射上去：
        <span className="text-foreground">能复用的直接复用，缺口单独补，无关的弱连接提醒你不要回头去捡。</span>
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          run(topic)
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="输入想学的课题，例如：SQL 数据库"
          className="w-full rounded-xl border border-border bg-card/70 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          生成迁移方案 <ArrowRight size={16} />
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        试试：
        {EXAMPLES.map((e) => (
          <button
            key={e}
            onClick={() => {
              setTopic(e)
              run(e)
            }}
            className="rounded-full border border-border px-3 py-1 transition-colors hover:border-primary/50 hover:text-primary"
          >
            {e}
          </button>
        ))}
      </div>

      {plan && (
        <div className="space-y-8">
          <h2 className="font-display text-2xl">「{queried}」的迁移方案</h2>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm tracking-wide text-primary">
              <Check size={15} /> 可直接复用的原子（{plan.reusable.length}）
            </h3>
            {plan.reusable.length ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {plan.reusable.map(({ atom, reason }) => (
                  <Link
                    key={atom.id}
                    to={`/atoms?focus=${atom.id}`}
                    className="card-hover rounded-xl border border-border bg-card/60 p-4"
                  >
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px]"
                      style={{
                        color: DOMAIN_COLORS[atom.domain],
                        backgroundColor: `${DOMAIN_COLORS[atom.domain]}1a`,
                      }}
                    >
                      {atom.domain}
                    </span>
                    <h4 className="mt-2 font-medium">{atom.name}</h4>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {atom.abstraction}
                    </p>
                    <p className="mt-2 text-[11px] text-primary/80">命中：{reason}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
                没有命中已有原子——全新领域，按缺口清单从零开始，但只补列出来的部分。
              </p>
            )}
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-border bg-card/60 p-6">
              <h3 className="flex items-center gap-2 text-sm tracking-wide text-primary">
                <Plus size={15} /> 需要新增的缺口
              </h3>
              <ul className="mt-4 space-y-3">
                {plan.gaps.map((g) => (
                  <li key={g.domain} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: DOMAIN_COLORS[g.domain] }}
                    />
                    <div>
                      <p className="text-sm font-medium">「{queried}」× {g.domain}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {g.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-dashed border-border bg-card/30 p-6">
              <h3 className="flex items-center gap-2 text-sm tracking-wide text-muted-foreground">
                <Scissors size={15} /> 建议不要回头去捡（{plan.skip.length}）
              </h3>
              <ul className="mt-4 space-y-3">
                {plan.skip.map((a) => (
                  <li key={a.id} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm">{a.name}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {a.status === 'pruned'
                          ? '已砍冗余——别因为它和课题沾点边就回流。'
                          : '弱连接且与本课题无关——保持观察，不投入。'}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[11px]"
                      style={{
                        color: STATUS_META[a.status].color,
                        backgroundColor: `${STATUS_META[a.status].color}1a`,
                      }}
                    >
                      {STATUS_META[a.status].label}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        * 提示：如果刚学完一个课题，把新能力登记进{' '}
        <code className="rounded bg-muted px-1">src/data/atoms.ts</code>{' '}
        并写明它连接哪个原子，下次接入就能命中。
      </p>
    </div>
  )
}
