import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { PROTOCOL_SLICES } from '../../data/mock'
import { ChartTooltip } from './ChartTooltip'

const TOTAL = PROTOCOL_SLICES.reduce((sum, slice) => sum + slice.value, 0)

export function ProtocolChart() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)

  return (
    <div className="flex h-80 flex-col">
      <div className="relative min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[...PROTOCOL_SLICES]}
              dataKey="value"
              nameKey="name"
              innerRadius={54}
              outerRadius={76}
              paddingAngle={3}
              cx="50%"
              cy="50%"
              stroke="none"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              {PROTOCOL_SLICES.map((slice, index) => {
                const dimmed = activeIndex !== undefined && activeIndex !== index
                return (
                  <Cell
                    key={slice.name}
                    fill={slice.color}
                    fillOpacity={dimmed ? 0.35 : 1}
                    stroke={activeIndex === index ? slice.color : 'none'}
                    strokeWidth={activeIndex === index ? 2 : 0}
                  />
                )
              })}
            </Pie>
            <Tooltip content={<ChartTooltip unit="%" title="Protocols" />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-2xl font-semibold text-ink">{TOTAL}%</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-dim">mix</p>
        </div>
      </div>
      <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
        {PROTOCOL_SLICES.map((slice, index) => (
          <li key={slice.name}>
            <button
              type="button"
              className={`flex w-full items-center gap-1.5 rounded-md px-1 py-0.5 text-left text-xs text-dim transition ${
                activeIndex === index ? 'bg-elevated text-ink' : 'hover:text-ink'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: slice.color }} />
              {slice.name}
              <span className="ml-auto font-mono text-ink">{slice.value}%</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
