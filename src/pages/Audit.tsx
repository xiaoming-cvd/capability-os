import { Link } from 'react-router'
import { AlertTriangle, ArrowRight, Check, Scissors } from 'lucide-react'
import { ATOMS, STATUS_META, degree } from '../data/atoms'

export default function Audit() {
  const weak = ATOMS.filter((a) => a.status === 'weak').sort(
    (a, b) => degree(a) - degree(b)
  )
  const pruned = ATOMS.filter((a) => a.status === 'pruned')

  return (
    <div className="fade-up space-y-10">
      <header className="space-y-2">
        <h1 className="font-display text-3xl">冗余审计</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          能力库也会堆积废件。每月来这里做一次审计：每个弱连接原子只有三条路——
          <span className="text-foreground">强化（找到新连接）、降级（保持观察）、砍掉（标记为冗余）</span>。
          不允许第四种「先留着以后再说」。
        </p>
      </header>

      {/* 弱连接 */}
      <section>
        <h2 className="mb-1 flex items-center gap-2 font-display text-xl">
          <AlertTriangle size={18} className="text-primary" />
          弱连接原子（{weak.length}）
        </h2>
        <p className="mb-5 text-xs text-muted-foreground">
          连接度 ≤ 1，尚未融入能力网络。逐个裁决：
        </p>
        <div className="space-y-3">
          {weak.map((a) => (
            <div
              key={a.id}
              className="rounded-xl border border-border bg-card/60 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Link
                    to={`/atoms?focus=${a.id}`}
                    className="font-medium hover:text-primary"
                  >
                    {a.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {a.domain} · {degree(a)} 连接 · {STATUS_META[a.status].label}
                  </p>
                </div>
                <div className="flex gap-2">
                  {['强化', '降级', '砍掉'].map((v) => (
                    <button
                      key={v}
                      className={`rounded-md border px-3.5 py-1.5 text-xs transition-colors ${
                        v === '砍掉'
                          ? 'border-destructive/50 text-destructive hover:bg-destructive/10'
                          : 'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {a.abstraction}
              </p>
              <div className="mt-3 rounded-lg bg-muted/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                <span className="text-primary">审计备注：</span>
                {a.id === 'python-tool'
                  ? '已有明确重启依赖：2027 春大挑数据处理前必须回归。裁决建议：保持「弱连接」观察，到 2026-12 检查重启时机。'
                  : '该原子近期无实证场景，若 4 周内仍没有新连接，建议砍掉。'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 已砍 */}
      <section>
        <h2 className="mb-1 flex items-center gap-2 font-display text-xl">
          <Scissors size={18} className="text-muted-foreground" />
          已砍冗余（{pruned.length}）· 防回流清单
        </h2>
        <p className="mb-5 text-xs text-muted-foreground">
          砍掉的东西最容易以「说不定有用」的名义回来。这里公开处刑，提醒自己当初为什么砍。
        </p>
        <div className="space-y-3">
          {pruned.map((a) => (
            <div
              key={a.id}
              className="rounded-xl border border-dashed border-border bg-card/30 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  to={`/atoms?focus=${a.id}`}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  {a.name}
                </Link>
                <span className="text-[11px] text-muted-foreground">
                  已砍 · 无连接
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {a.abstraction}
              </p>
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-muted/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                <Check size={13} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  <span className="text-primary">砍掉的理由：</span>
                  {a.evidence[0]}。除非出现硬证据，否则不恢复。
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 审计流程 */}
      <section className="rounded-2xl border border-primary/25 bg-primary/5 p-7">
        <h2 className="font-display text-xl">每月 15 分钟审计流程</h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            {
              t: '5 min · 看弱连接',
              d: '弱连接列表逐个过：过去 4 周有没有用到？有没有产生新连接？',
            },
            {
              t: '5 min · 做裁决',
              d: '强化 / 降级 / 砍掉，三选一，当场执行，不留「以后再说」。',
            },
            {
              t: '5 min · 查回流',
              d: '看「已砍」清单：有没有旧知识借新课题的名义试图回来？有就记下拒绝理由。',
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
        <div className="mt-6 border-t border-primary/20 pt-5">
          <Link
            to="/atoms"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            去原子库执行今天的裁决 <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
