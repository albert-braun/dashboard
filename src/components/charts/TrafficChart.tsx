import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TRAFFIC_SERIES } from '../../data/mock'
import { ChartTooltip, useChartColors } from './ChartTooltip'

export function TrafficChart() {
  const colors = useChartColors()

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={[...TRAFFIC_SERIES]} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillInbound" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillOutbound" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22f0a0" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#22f0a0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={colors.grid} strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: colors.axis, fontSize: 11, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: colors.axis, fontSize: 11, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="inbound"
            name="Inbound"
            stroke="#22d3ee"
            fill="url(#fillInbound)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="outbound"
            name="Outbound"
            stroke="#22f0a0"
            fill="url(#fillOutbound)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
