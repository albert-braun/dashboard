import { Activity } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { TrafficTooltip } from '../charts/ChartTooltip'
import { KpiShell } from './KpiShell'

interface SparkPoint {
  index: number
  value: number
}

interface NetworkTrafficCardProps {
  mbps: number
  delta: number
  history: readonly number[]
}

export function NetworkTrafficCard({ mbps, delta, history }: NetworkTrafficCardProps) {
  const spark: SparkPoint[] = history.map((value, index) => ({ index, value }))
  const rising = delta >= 0

  return (
    <KpiShell label="Network Traffic" icon={Activity} accent="cyan" live>
      <p className="font-mono text-2xl font-semibold tracking-tight whitespace-nowrap text-ink">
        {mbps.toFixed(1)} <span className="text-base text-dim">Mb/s</span>
      </p>
      <p className={`mt-1 font-mono text-xs ${rising ? 'text-neon' : 'text-danger'}`}>
        {rising ? '▲' : '▼'} {Math.abs(delta).toFixed(1)} Mb/s
      </p>
      <div className="mt-3 h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spark} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillTrafficSpark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              content={<TrafficTooltip title="Traffic" />}
              cursor={{ stroke: '#22d3ee', strokeOpacity: 0.35 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              name="Throughput"
              stroke="#22d3ee"
              fill="url(#fillTrafficSpark)"
              strokeWidth={1.8}
              isAnimationActive={false}
              dot={false}
              activeDot={{ r: 3, fill: '#22d3ee' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </KpiShell>
  )
}
