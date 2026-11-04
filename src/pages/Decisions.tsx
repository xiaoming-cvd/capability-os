import { GitFork, Lock, ScrollText, ShieldQuestion } from 'lucide-react'
import { DECISIONS, DECISION_GUIDE, type Decision } from '../data/decisions'

export default function Decisions() {
  return (
    <div className="fade-up space-y-10">
      <header className="space-y-2">
        <h1 className="font-display text-3xl">决策日志</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          每个做过终裁的岔路口都存档在这里：当时的判断、理由、锁定期、反悔条件。
          <span className="text-foreground">不是为了证明自己对，是为了让未来的自己不用重算一遍——重算的带宽拿去做新题。</span>
        </p>
      </header>

      {/* 时间线 */}
      <div className="relative space-y-6 pl-6">
        <span className="absolute bottom-6 left-[9px] top-2 w-px bg-border" />
        {DECISIONS.map((d) => (
          <DecisionCard key={d.id} d={d} />
        ))}
      </div>

      {/* 记录指南 */}
      <section className="rounded-2xl border border-primary/25 bg-primary/5 p-7">
        <h2 className="flex items-center gap-2 font-display text-xl">
          <ScrollText size={18} className="text-primary" /> 什么时候记一条新决策
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {DECISION_GUIDE.whenToLog}
        </p>
        <h3 className="mt-5 text-sm font-medium">一条决策必须包含的字段：</h3>
        <ol className="mt-3 grid gap-3 md:grid-cols-5">
          {DECISION_GUIDE.fields.map((f, i) => (
            <li
              key={f}
              className="rounded-lg border border-border bg-card/60 px-3 py-3 text-xs leading-relaxed"
            >
              <span className="font-display text-lg text-primary/70">{i + 1}</span>
              <p className="mt-1">{f}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-primary/20 pt-4 text-xs leading-relaxed text-muted-foreground">
          操作：打开{' '}
          <code className="rounded bg-muted px-1.5 py-0.5">
            src/data/decisions.ts
          </code>{' '}
          ，复制一条现有决策，改掉内容，推送即更新。{DECISION_GUIDE.rule}
        </p>
      </section>
    </div>
  )
}

function DecisionCard({ d }: { d: Decision }) {
  return (
    <article className="relative">
      <span className="absolute -left-6 top-2 h-3 w-3 rounded-full border-2 border-primary bg-background" />
      <div className="card-hover rounded-xl border border-border bg-card/60 p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-full bg-muted px-2.5 py-0.5">{d.date}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5">
            <GitFork size={10} className="text-primary/70" />
            {d.branch}
          </span>
          {d.lockUntil && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">
              <Lock size={10} />
              锁定期至 {d.lockUntil}
            </span>
          )}
        </div>
        <h2 className="font-display mt-3 text-xl leading-snug">{d.title}</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-3 text-sm leading-relaxed">
            <div>
              <h4 className="mb-1 text-xs tracking-widest text-primary">当时情境</h4>
              <p className="text-muted-foreground">{d.context}</p>
            </div>
            <div>
              <h4 className="mb-1 text-xs tracking-widest text-primary">终裁内容</h4>
              <p>{d.decision}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm leading-relaxed">
            <div>
              <h4 className="mb-1 text-xs tracking-widest text-primary">
                理由（写给未来焦虑的自己）
              </h4>
              <p className="text-muted-foreground">{d.reasoning}</p>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-dashed border-border bg-card/40 px-4 py-3">
              <ShieldQuestion size={14} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="text-foreground">反悔条件：</span>
                {d.reverseCondition}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
