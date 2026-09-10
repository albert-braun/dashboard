import { useDashboard } from '../context/DashboardContext'

interface SystemStatusProps {
  compact?: boolean
}

export function SystemStatus({ compact = false }: SystemStatusProps) {
  const { underAttack } = useDashboard()

  if (underAttack) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-danger/50 bg-danger/15 px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-80" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
        </span>
        {compact ? (
          <span className="sr-only">SYSTEM UNDER ATTACK!</span>
        ) : (
          <span className="blink-critical text-xs font-semibold tracking-wide text-danger">
            SYSTEM UNDER ATTACK!
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
      </span>
      {compact ? null : (
        <span className="text-xs font-medium tracking-wide text-neon">
          All systems operational
        </span>
      )}
      {compact ? <span className="sr-only">All systems operational</span> : null}
    </div>
  )
}
