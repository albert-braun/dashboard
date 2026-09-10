import type { Accent, StatMetric } from '../types'

const ACCENT_ICON: Record<Accent, string> = {
  neon: 'text-neon bg-neon/10',
  cyan: 'text-cyan bg-cyan/10',
  danger: 'text-danger bg-danger/10',
  info: 'text-info bg-info/10',
  warn: 'text-warn bg-warn/10',
}

const TREND_CLASS = {
  up: 'text-neon',
  down: 'text-cyan',
  neutral: 'text-dim',
} as const

interface StatCardProps {
  metric: StatMetric
}

export function StatCard({ metric }: StatCardProps) {
  const Icon = metric.icon

  return (
    <article className="relative overflow-hidden rounded-xl border border-line bg-surface p-4">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-neon/5 blur-2xl" />
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-dim">
          {metric.label}
        </p>
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${ACCENT_ICON[metric.accent]}`}
        >
          <Icon size={18} strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold tracking-tight text-ink">
        {metric.value}
      </p>
      <p className={`mt-1 text-xs ${TREND_CLASS[metric.trend]}`}>{metric.delta}</p>
    </article>
  )
}
