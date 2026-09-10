import { Cpu } from 'lucide-react'
import { KpiShell } from './KpiShell'

interface SystemLoadCardProps {
  cpu: number
}

function loadTone(cpu: number): string {
  if (cpu >= 80) {
    return 'bg-danger'
  }
  if (cpu >= 70) {
    return 'bg-warn'
  }
  return 'bg-neon'
}

export function SystemLoadCard({ cpu }: SystemLoadCardProps) {
  const tone = loadTone(cpu)

  return (
    <KpiShell label="System Load" icon={Cpu} accent="info" live>
      <p className="font-mono text-2xl font-semibold tracking-tight text-ink tabular-nums">
        {cpu.toFixed(1)}%
      </p>
      <p className="mt-1 text-xs text-dim">CPU load</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${tone}`}
          style={{ width: `${cpu}%` }}
        />
      </div>
    </KpiShell>
  )
}
