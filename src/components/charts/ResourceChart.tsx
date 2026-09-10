import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ResourcePoint } from '../../types'
import { PercentTooltip, useChartColors } from './ChartTooltip'

interface ResourceChartProps {
  data: readonly ResourcePoint[]
}

export function ResourceChart({ data }: ResourceChartProps) {
  const colors = useChartColors()

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={[...data]} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillCpuLive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22f0a0" stopOpacity={0.38} />
              <stop offset="95%" stopColor="#22f0a0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillRamLive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.32} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={colors.grid} strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="time"
            interval={4}
            minTickGap={24}
            tick={{ fill: colors.axis, fontSize: 11, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(value: number) => `${value}`}
            tick={{ fill: colors.axis, fontSize: 11, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            content={<PercentTooltip />}
            cursor={{ stroke: '#22f0a0', strokeOpacity: 0.28 }}
          />
          <Area
            type="monotone"
            dataKey="cpu"
            name="CPU"
            stroke="#22f0a0"
            fill="url(#fillCpuLive)"
            strokeWidth={2}
            isAnimationActive={false}
            dot={false}
            activeDot={{ r: 4, fill: '#22f0a0', stroke: '#07090d', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="ram"
            name="RAM"
            stroke="#22d3ee"
            fill="url(#fillRamLive)"
            strokeWidth={2}
            isAnimationActive={false}
            dot={false}
            activeDot={{ r: 4, fill: '#22d3ee', stroke: '#07090d', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
