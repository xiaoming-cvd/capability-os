import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ArrowUpRight, Link2, MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ATOMS,
  DOMAIN_COLORS,
  DOMAINS,
  STATUS_META,
  atomById,
  degree,
  type AbilityAtom,
  type AtomStatus,
} from '../data/atoms'

const STATUS_FILTERS: (AtomStatus | 'all')[] = ['all', 'core', 'active', 'weak', 'pruned']

function LevelDots({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1" title={`熟练度 ${level}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-3 rounded-full"
          style={{
            backgroundColor:
              i < level ? 'hsl(36 88% 62%)' : 'hsl(36 8% 20%)',
          }}
        />
      ))}
    </span>
  )
}

export default function Atoms() {
  const [params, setParams] = useSearchParams()
  const [domain, setDomain] = useState<DomainChoice>('全部')
  const [status, setStatus] = useState<AtomStatus | 'all'>('all')

  const focusId = params.get('focus')
  const focusAtom = focusId ? atomById(focusId) : undefined

  const filtered = useMemo(
    () =>
      ATOMS.filter(
        (a) =>
          (domain === '全部' || a.domain === domain) &&
          (status === 'all' || a.status === status)
      ),
    [domain, status]
  )

  return (
    <div className="fade-up space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl">原子库</h1>
        <p className="text-sm text-muted-foreground">
          每个原子 = 抽象定义 + 实证场景 + 可迁移方向。点开看全貌。
        </p>
      </header>

      {/* 过滤器 */}
      <div className="flex flex-wrap items-center gap-2">
        {(['全部', ...DOMAINS] as DomainChoice[]).map((d) => (
          <button
            key={d}
            onClick={() => setDomain(d)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
              domain === d
                ? 'border-primary/60 bg-primary/15 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {d}
          </button>
        ))}
        <span className="mx-2 hidden h-4 w-px bg-border sm:inline-block" />
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
              status === s
                ? 'border-primary/60 bg-primary/15 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {s === 'all' ? '全部状态' : STATUS_META[s].label}
          </button>
        ))}
      </div>

      {/* 卡片网格 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <AtomCard
            key={a.id}
            atom={a}
            onOpen={() => setParams({ focus: a.id })}
          />
        ))}
      </div>

      {/* 详情弹窗 */}
      <Dialog
        open={!!focusAtom}
        onOpenChange={(o) => !o && setParams({})}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {focusAtom && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px]"
                    style={{
                      color: DOMAIN_COLORS[focusAtom.domain],
                      backgroundColor: `${DOMAIN_COLORS[focusAtom.domain]}1a`,
                    }}
                  >
                    {focusAtom.domain}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px]"
                    style={{
                      color: STATUS_META[focusAtom.status].color,
                      backgroundColor: `${STATUS_META[focusAtom.status].color}1a`,
                    }}
                  >
                    {STATUS_META[focusAtom.status].label}
                  </span>
                  <LevelDots level={focusAtom.level} />
                </div>
                <DialogTitle className="font-display text-2xl">
                  {focusAtom.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-2">
                <section>
                  <h4 className="mb-2 text-xs tracking-widest text-primary">
                    抽象定义
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {focusAtom.abstraction}
                  </p>
                </section>

                <section>
                  <h4 className="mb-2 text-xs tracking-widest text-primary">
                    实证 · 我在哪真的用过
                  </h4>
                  <ul className="space-y-2">
                    {focusAtom.evidence.map((e, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ArrowUpRight
                          size={14}
                          className="mt-1 shrink-0 text-primary/70"
                        />
                        {e}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="mb-2 text-xs tracking-widest text-primary">
                    可迁移方向
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {focusAtom.transferableTo.length ? (
                      focusAtom.transferableTo.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs"
                        >
                          <MapPin size={11} className="text-primary/70" />
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        已判定无迁移价值——这正是它被砍的原因。
                      </span>
                    )}
                  </div>
                </section>

                {focusAtom.connections.length > 0 && (
                  <section>
                    <h4 className="mb-2 text-xs tracking-widest text-primary">
                      与 {focusAtom.connections.length} 个原子相连
                    </h4>
                    <div className="space-y-1.5">
                      {focusAtom.connections.map((cid) => {
                        const c = atomById(cid)
                        if (!c) return null
                        return (
                          <button
                            key={cid}
                            onClick={() => setParams({ focus: cid })}
                            className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-left text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
                          >
                            <span className="flex items-center gap-2">
                              <Link2 size={13} className="text-primary/70" />
                              {c.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {c.domain}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </section>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

type DomainChoice = '全部' | (typeof DOMAINS)[number]

function AtomCard({
  atom,
  onOpen,
}: {
  atom: AbilityAtom
  onOpen: () => void
}) {
  return (
    <button
      onClick={onOpen}
      className="card-hover rounded-xl border border-border bg-card/60 p-5 text-left"
    >
      <div className="flex items-center justify-between">
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px]"
          style={{
            color: DOMAIN_COLORS[atom.domain],
            backgroundColor: `${DOMAIN_COLORS[atom.domain]}1a`,
          }}
        >
          {atom.domain}
        </span>
        <span
          className="text-[11px]"
          style={{ color: STATUS_META[atom.status].color }}
        >
          {STATUS_META[atom.status].label}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg">{atom.name}</h3>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
        {atom.abstraction}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <LevelDots level={atom.level} />
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Link2 size={11} />
          {degree(atom)} 连接
        </span>
      </div>
    </button>
  )
}
