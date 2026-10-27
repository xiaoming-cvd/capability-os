import { Link } from 'react-router'
import {
  ArrowRight,
  Atom,
  GitBranch,
  Radar,
  Scissors,
  Sparkles,
} from 'lucide-react'
import { ATOMS, DOMAINS, DOMAIN_COLORS, degree, STATUS_META } from '../data/atoms'

export default function Dashboard() {
  const core = ATOMS.filter((a) => a.status === 'core')
  const active = ATOMS.filter((a) => a.status === 'active')
  const weak = ATOMS.filter((a) => a.status === 'weak')
  const pruned = ATOMS.filter((a) => a.status === 'pruned')
  const totalEdges = ATOMS.reduce((s, a) => s + degree(a), 0) / 2

  const stats = [
    { icon: Atom, label: '能力原子', value: ATOMS.length, tone: '#e8a04c' },
    { icon: Sparkles, label: '核心原子', value: core.length, tone: '#c98bb0' },
    { icon: GitBranch, label: '连接数', value: totalEdges, tone: '#7fb4a8' },
    { icon: Scissors, label: '已砍冗余', value: pruned.length, tone: '#8a8578' },
  ]

  return (
    <div className="fade-up space-y-12">
      {/* Hero */}
      <section className="space-y-5">
        <p className="text-sm tracking-[0.3em] text-primary/80">
          CAPABILITY ATOM BASE
        </p>
        <h1 className="font-display max-w-3xl text-4xl leading-snug sm:text-5xl">
          把能力拆成原子，
          <br />
          让每一次学习都先<span className="text-primary">迁移</span>，再新建。
        </h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          这个网站是我的「能力底座」：每个能力被抽象成最小可迁移单元——定义、实证、可迁移方向、与其他原子的连接。
          学新东西之前先查这里：<span className="text-foreground">已有的直接复用，缺口单独补，无连接的坚决不碰。</span>
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Radar size={16} /> 接入一个新课题
          </Link>
          <Link
            to="/map"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            看迁移地图 <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card/60 p-5"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <s.icon size={15} style={{ color: s.tone }} />
              <span className="text-xs">{s.label}</span>
            </div>
            <p className="font-display mt-3 text-4xl" style={{ color: s.tone }}>
              {s.value}
            </p>
          </div>
        ))}
      </section>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* 核心原子 */}
        <section className="lg:col-span-3">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-xl">核心原子 · 迁移从这里出发</h2>
            <Link
              to="/atoms"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              全部原子 →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {core.map((a) => (
              <Link
                key={a.id}
                to={`/atoms?focus=${a.id}`}
                className="card-hover rounded-xl border border-border bg-card/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px]"
                    style={{
                      color: DOMAIN_COLORS[a.domain],
                      backgroundColor: `${DOMAIN_COLORS[a.domain]}1a`,
                    }}
                  >
                    {a.domain}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {degree(a)} 连接
                  </span>
                </div>
                <h3 className="mt-2.5 font-medium">{a.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {a.abstraction}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 领域分布 + 状态 */}
        <section className="space-y-6 lg:col-span-2">
          <div>
            <h2 className="font-display mb-4 text-xl">领域分布</h2>
            <div className="space-y-3">
              {DOMAINS.map((d) => {
                const n = ATOMS.filter((a) => a.domain === d).length
                if (!n) return null
                return (
                  <div key={d} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-xs text-muted-foreground">
                      {d}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(n / ATOMS.length) * 100}%`,
                          backgroundColor: DOMAIN_COLORS[d],
                        }}
                      />
                    </div>
                    <span className="w-6 text-right text-xs">{n}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className="font-display mb-4 text-xl">原子状态</h2>
            <div className="space-y-2.5">
              {(['core', 'active', 'weak', 'pruned'] as const).map((s) => {
                const meta = STATUS_META[s]
                const n =
                  s === 'core'
                    ? core.length
                    : s === 'active'
                      ? active.length
                      : s === 'weak'
                        ? weak.length
                        : pruned.length
                return (
                  <div
                    key={s}
                    className="flex items-center justify-between rounded-lg border border-border bg-card/60 px-4 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: meta.color }}
                      />
                      <span className="text-sm">{meta.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {n} · {meta.desc}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>

      {/* 使用原则 */}
      <section className="rounded-2xl border border-primary/25 bg-primary/5 p-7">
        <h2 className="font-display text-xl">这个底座的三条使用原则</h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            {
              t: '先映射，后学习',
              d: '接到新课题，先去「学习接入」页查已有原子能覆盖多少。覆盖 60% 以上的课题，学习成本直接腰斩。',
            },
            {
              t: '缺口最小化补齐',
              d: '映射不上的部分单独建「新原子」，并强制写清楚它与哪个已有原子连接——连不上的新东西不学。',
            },
            {
              t: '定期砍冗余',
              d: '每月看一次「冗余审计」：弱连接原子要么强化、要么降级、要么砍掉，防止能力库堆积废件。',
            },
          ].map((x, i) => (
            <li key={x.t} className="space-y-2">
              <span className="font-display text-2xl text-primary/70">
                0{i + 1}
              </span>
              <h3 className="font-medium">{x.t}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {x.d}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
