import { Server } from 'lucide-react'
import { KpiShell } from './KpiShell'

export function ActiveServersCard() {
  return (
    <KpiShell label="Active Servers" icon={Server} accent="neon">
      <p className="font-mono text-2xl font-semibold tracking-tight text-ink">24/24</p>
      <p className="mt-2 inline-flex items-center gap-2 text-xs text-neon">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
        </span>
        stable
      </p>
    </KpiShell>
  )
}
