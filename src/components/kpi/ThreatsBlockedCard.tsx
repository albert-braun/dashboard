import { ShieldCheck } from 'lucide-react'
import { KpiShell } from './KpiShell'

interface ThreatsBlockedCardProps {
  value: number
}

export function ThreatsBlockedCard({ value }: ThreatsBlockedCardProps) {
  const formatted = new Intl.NumberFormat('en-US').format(value)

  return (
    <KpiShell label="Threats Blocked" icon={ShieldCheck} accent="danger" live>
      <p className="font-mono text-2xl font-semibold tracking-tight text-ink tabular-nums">
        {formatted}
      </p>
      <p className="mt-2 text-xs text-dim">WAF / IDS blocks in real time</p>
    </KpiShell>
  )
}
