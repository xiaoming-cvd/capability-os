import { NavLink } from 'react-router'
import { Atom } from 'lucide-react'

const NAV = [
  { to: '/', label: '总览', end: true },
  { to: '/atoms', label: '原子库' },
  { to: '/map', label: '迁移地图' },
  { to: '/learn', label: '学习接入' },
  { to: '/audit', label: '冗余审计' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-grain">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <NavLink to="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Atom size={16} strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg tracking-wide">
              能力原子库
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              · 清微子的迁移底座
            </span>
          </NavLink>
          <nav className="flex items-center gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end as boolean | undefined}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-10">{children}</main>
    </div>
  )
}
