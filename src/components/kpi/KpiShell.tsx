import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Accent } from '../../types'

const ACCENT_ICON: Record<Accent, string> = {
  neon: 'text-neon bg-neon/10',
  cyan: 'text-cyan bg-cyan/10',
  danger: 'text-danger bg-danger/10',
  info: 'text-info bg-info/10',
  warn: 'text-warn bg-warn/10',
}

interface KpiShellProps {
  label: string
  icon: LucideIcon
  accent: Accent
  live?: boolean
  children: ReactNode
}

export function KpiShell({ label, icon: Icon, accent, live = false, children }: KpiShellProps) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-4">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-neon/5 blur-2xl" />
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-dim">{label}</p>
        <span className="inline-flex items-center gap-2">
          {live ? (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-danger">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-danger" />
              </span>
              live
            </span>
          ) : null}
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${ACCENT_ICON[accent]}`}
          >
            <Icon size={18} strokeWidth={1.75} />
          </span>
        </span>
      </div>
      <div className="mt-3 flex min-h-0 flex-1 flex-col">{children}</div>
    </article>
  )
}
