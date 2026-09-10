import type { CSSProperties, ReactNode } from 'react'
import { useTheme } from '../../context/ThemeContext'

interface ChartTooltipItem {
  name?: string
  value?: number
  color?: string
  percent?: number
  dataKey?: string | number
}

export interface ChartTooltipProps {
  active?: boolean
  label?: string | number
  payload?: ReadonlyArray<ChartTooltipItem>
  unit?: string
  title?: string
}

export function useChartColors(): {
  grid: string
  axis: string
  tooltip: CSSProperties
} {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return {
    grid: isDark ? '#1c2733' : '#d5dee8',
    axis: isDark ? '#8b9cb0' : '#5b6b7c',
    tooltip: {
      backgroundColor: isDark ? '#121a22' : '#ffffff',
      border: isDark ? '1px solid #1c2733' : '1px solid #d5dee8',
      borderRadius: 10,
      fontSize: 12,
      color: isDark ? '#e8eef4' : '#121820',
    },
  }
}

function formatValue(value: number, unit: string | undefined): string {
  const formatted = Number.isInteger(value) ? value.toString() : value.toFixed(1)
  if (!unit) {
    return formatted
  }
  return `${formatted} ${unit}`
}

export function ChartTooltip({
  active,
  label,
  payload,
  unit,
  title,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="min-w-40 rounded-xl border border-cyan/25 bg-elevated/95 px-3 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <p className="mb-2 font-mono text-[11px] tracking-wide text-cyan">
        {title ?? (label !== undefined ? String(label) : 'metric')}
      </p>
      <ul className="space-y-1.5">
        {payload.map((item) => {
          const key = String(item.dataKey ?? item.name ?? 'series')
          const share =
            unit !== '%' && item.percent !== undefined
              ? ` · ${(item.percent * 100).toFixed(1)}%`
              : ''

          return (
            <li key={key} className="flex items-center gap-2 text-xs text-ink">
              <span
                className="h-2 w-2 shrink-0 rounded-full shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: item.color ?? 'currentColor' }}
              />
              <span className="text-dim">{item.name}</span>
              <span className="ml-auto font-mono text-ink">
                {formatValue(item.value ?? 0, unit)}
                {share}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function PercentTooltip(props: ChartTooltipProps): ReactNode {
  return <ChartTooltip {...props} unit="%" />
}

export function TrafficTooltip(props: ChartTooltipProps): ReactNode {
  return <ChartTooltip {...props} unit="Mb/s" />
}
