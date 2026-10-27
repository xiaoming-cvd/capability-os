import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Check, Plus, Scissors, Search } from 'lucide-react'
import {
  DOMAIN_COLORS,
  STATUS_META,
  buildLearnPlan,
  degree,
  type LearnPlan,
} from '../data/atoms'

const EXAMPLES = ['供应链管理', '国际商务谈判', '贸易合规', '数据分析', '考研复试']

export default function Learn() {
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
    <div className="fade-up space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl">学习接入</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          想学一个新东西？先别急着找课。输入课题，系统把已有原子映射上去：
          <span className="text-foreground">能复用的直接复用，缺口单独补，与该课题无关的弱连接提醒你不要回头去捡。</span>
        </p>
      </header>

      {/* 输入 */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          run(topic)
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="输入想学的课题，例如：供应链管理"
            className="w-full rounded-xl border border-border bg-card/70 py-3.5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60"
          />
        </div>
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

      {/* 结果 */}
      {plan && (
        <div className="space-y-8">
          <h2 className="font-display text-2xl">
            「{queried}」的迁移方案
          </h2>

          {/* 可复用 */}
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
                    <div className="flex items-center justify-between">
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px]"
                        style={{
                          color: DOMAIN_COLORS[atom.domain],
                          backgroundColor: `${DOMAIN_COLORS[atom.domain]}1a`,
                        }}
                      >
                        {atom.domain}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {degree(atom)} 连接
                      </span>
                    </div>
                    <h4 className="mt-2 font-medium">{atom.name}</h4>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {atom.abstraction}
                    </p>
                    <p className="mt-2 text-[11px] text-primary/80">
                      命中：{reason}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
                没有命中已有原子——这是一个全新领域，按下面的缺口清单从零开始，但只补列出来的部分。
              </p>
            )}
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* 需新增 */}
            <section className="rounded-2xl border border-border bg-card/60 p-6">
              <h3 className="flex items-center gap-2 text-sm tracking-wide text-primary">
                <Plus size={15} /> 需要新增的缺口（最多补 3 个）
              </h3>
              <ul className="mt-4 space-y-3">
                {plan.gaps.map((g) => (
                  <li key={g.domain} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: DOMAIN_COLORS[g.domain] }}
                    />
                    <div>
                      <p className="text-sm font-medium">
                        「{queried}」× {g.domain}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {g.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                规则：每补一个新缺口，必须写明它连接哪个已有原子；写不出来的，先不学。
              </p>
            </section>

            {/* 建议不碰 */}
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
    </div>
  )
}
