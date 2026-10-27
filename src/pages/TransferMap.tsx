import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { MousePointerClick } from 'lucide-react'
import {
  ATOMS,
  DOMAIN_COLORS,
  DOMAINS,
  STATUS_META,
  degree,
} from '../data/atoms'

// ---- 布局：领域成簇围绕中心的「迁移元技能」 ----
const CX = 600
const CY = 400
const RX = 400
const RY = 290
const NODE_R = 24
const GAP = 92

interface NodePos {
  id: string
  x: number
  y: number
}

export default function TransferMap() {
  const navigate = useNavigate()
  const [hover, setHover] = useState<string | null>(null)

  const { nodes, edges } = useMemo(() => {
    const nodes: NodePos[] = []
    const byId = new Map<string, NodePos>()

    // 中心：能力迁移元技能
    const center = ATOMS.find((a) => a.id === 'transfer-meta')
    if (center) {
      const p = { id: center.id, x: CX, y: CY }
      nodes.push(p)
      byId.set(p.id, p)
    }

    // 六个领域簇
    DOMAINS.forEach((d, di) => {
      const angle = (di * Math.PI * 2) / DOMAINS.length - Math.PI / 2
      const dx = CX + RX * Math.cos(angle)
      const dy = CY + RY * Math.sin(angle)
      const members = ATOMS.filter((a) => a.domain === d)
      members.forEach((a, i) => {
        const p = {
          id: a.id,
          x: dx,
          y: dy + (i - (members.length - 1) / 2) * GAP,
        }
        nodes.push(p)
        byId.set(p.id, p)
      })
    })

    // 连线（去重）
    const seen = new Set<string>()
    const edges: { a: NodePos; b: NodePos }[] = []
    for (const atom of ATOMS) {
      for (const cid of atom.connections) {
        const pa = byId.get(atom.id)
        const pb = byId.get(cid)
        if (!pa || !pb) continue
        const key = [atom.id, cid].sort().join('|')
        if (seen.has(key)) continue
        seen.add(key)
        edges.push({ a: pa, b: pb })
      }
    }
    return { nodes, edges }
  }, [])

  const hoverAtom = hover ? ATOMS.find((a) => a.id === hover) : undefined
  const connectedIds = useMemo(() => {
    if (!hover) return new Set<string>()
    const s = new Set<string>([hover])
    const atom = ATOMS.find((a) => a.id === hover)
    atom?.connections.forEach((c) => s.add(c))
    // 反向连接也算
    ATOMS.forEach((a) => {
      if (a.connections.includes(hover)) s.add(a.id)
    })
    return s
  }, [hover])

  return (
    <div className="fade-up space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">迁移地图</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            原子和原子的连接方式 = 能力的复用路径。悬停看单个原子的连接，点击进详情。
          </p>
        </div>
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MousePointerClick size={13} className="text-primary" />
          {edges.length} 条连接 · 连线越密的原子越值得优先复用
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-4">
        {/* 图 */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card/40 lg:col-span-3">
          <svg viewBox="0 0 1200 800" className="h-auto w-full select-none">
            {/* 领域标签 */}
            {DOMAINS.map((d, di) => {
              const angle = (di * Math.PI * 2) / DOMAINS.length - Math.PI / 2
              const dx = CX + RX * Math.cos(angle)
              const dy = CY + RY * Math.sin(angle)
              const n = ATOMS.filter((a) => a.domain === d).length
              const topY = dy - ((n - 1) / 2) * GAP
              return (
                <text
                  key={d}
                  x={dx}
                  y={topY - 34}
                  textAnchor="middle"
                  fill={DOMAIN_COLORS[d]}
                  fontSize={15}
                  opacity={0.9}
                  style={{ fontFamily: 'inherit', letterSpacing: '0.15em' }}
                >
                  {d}
                </text>
              )
            })}

            {/* 连线 */}
            {edges.map((e) => {
              const active = hover !== null &&
                (e.a.id === hover || e.b.id === hover)
              const dim = hover !== null && !active
              return (
                <line
                  key={`${e.a.id}|${e.b.id}`}
                  x1={e.a.x}
                  y1={e.a.y}
                  x2={e.b.x}
                  y2={e.b.y}
                  stroke={
                    active ? 'hsl(36 88% 62%)' : 'hsl(38 10% 30%)'
                  }
                  strokeWidth={active ? 2.4 : 1.1}
                  strokeDasharray={active ? undefined : '3 5'}
                  opacity={dim ? 0.12 : active ? 0.95 : 0.55}
                  className="map-edge"
                />
              )
            })}

            {/* 节点 */}
            {nodes.map((p) => {
              const atom = ATOMS.find((a) => a.id === p.id)!
              const isCenter = atom.id === 'transfer-meta'
              const dim = hover !== null && !connectedIds.has(atom.id)
              const isHover = hover === atom.id
              const r = isCenter ? 34 : NODE_R
              const stroke = isCenter
                ? 'hsl(36 88% 62%)'
                : DOMAIN_COLORS[atom.domain]
              return (
                <g
                  key={p.id}
                  transform={`translate(${p.x}, ${p.y})`}
                  opacity={dim ? 0.22 : 1}
                  style={{ cursor: 'pointer', transition: 'opacity 0.25s' }}
                  onMouseEnter={() => setHover(atom.id)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => navigate(`/atoms?focus=${atom.id}`)}
                >
                  {isHover && (
                    <circle r={r + 9} fill="none" stroke={stroke} strokeOpacity={0.4} strokeWidth={1.5} />
                  )}
                  <circle
                    r={r}
                    fill={
                      atom.status === 'pruned'
                        ? 'hsl(36 6% 12%)'
                        : isCenter
                          ? 'hsl(36 45% 14%)'
                          : 'hsl(36 10% 11%)'
                    }
                    stroke={stroke}
                    strokeWidth={isCenter ? 2.5 : atom.status === 'core' ? 2 : 1.3}
                    strokeOpacity={atom.status === 'pruned' ? 0.4 : 0.95}
                  />
                  <text
                    textAnchor="middle"
                    dy={isCenter ? 5 : 4}
                    fontSize={isCenter ? 13 : 12}
                    fill={
                      atom.status === 'pruned'
                        ? 'hsl(38 6% 45%)'
                        : 'hsl(40 18% 90%)'
                    }
                    style={{ pointerEvents: 'none' }}
                  >
                    {atom.name.length > 6 && !isCenter
                      ? atom.name.slice(0, 6)
                      : atom.name}
                  </text>
                  {/* 连接度角标 */}
                  {!isCenter && (
                    <text
                      x={r + 4}
                      y={-r + 6}
                      fontSize={10}
                      fill="hsl(38 8% 55%)"
                      style={{ pointerEvents: 'none' }}
                    >
                      {degree(atom)}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* 侧栏 */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card/60 p-5">
            <h3 className="font-display mb-3 text-lg">
              {hoverAtom ? hoverAtom.name : '悬停任意原子'}
            </h3>
            {hoverAtom ? (
              <div className="space-y-3 text-sm">
                <p
                  className="text-xs"
                  style={{ color: DOMAIN_COLORS[hoverAtom.domain] }}
                >
                  {hoverAtom.domain} · {STATUS_META[hoverAtom.status].label} ·{' '}
                  {degree(hoverAtom)} 连接
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  {hoverAtom.abstraction}
                </p>
                <button
                  onClick={() => navigate(`/atoms?focus=${hoverAtom.id}`)}
                  className="text-xs text-primary hover:underline"
                >
                  查看完整原子 →
                </button>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                右侧每个圆是一个能力原子，颜色 = 领域，数字 = 连接度。中心的「能力迁移元技能」是所有学习的入口。
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-5">
            <h3 className="font-display mb-3 text-base">图例</h3>
            <div className="space-y-2.5 text-xs">
              {DOMAINS.map((d) => (
                <div key={d} className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: DOMAIN_COLORS[d] }}
                  />
                  <span className="text-muted-foreground">{d}</span>
                </div>
              ))}
              <div className="mt-3 space-y-2.5 border-t border-border pt-3">
                {(['core', 'active', 'weak', 'pruned'] as const).map((s) => (
                  <div key={s} className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: STATUS_META[s].color }}
                    />
                    <span className="text-muted-foreground">
                      {STATUS_META[s].label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
