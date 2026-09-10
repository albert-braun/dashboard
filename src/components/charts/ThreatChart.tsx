import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { THREAT_SLICES } from '../../data/mock'
import { ChartTooltip } from './ChartTooltip'

const TOTAL = THREAT_SLICES.reduce((sum, slice) => sum + slice.value, 0)

export function ThreatChart() {
  return (
    <div className="flex h-64 flex-col">
      <div className="relative min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[...THREAT_SLICES]}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
            >
              {THREAT_SLICES.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-2xl font-semibold text-ink">{TOTAL}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-dim">events</p>
        </div>
      </div>
      <ul className="mt-2 flex flex-wrap justify-center gap-3">
        {THREAT_SLICES.map((slice) => (
          <li key={slice.name} className="flex items-center gap-1.5 text-xs text-dim">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: slice.color }} />
            {slice.name}
            <span className="font-mono text-ink">{slice.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
