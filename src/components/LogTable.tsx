import { SeverityBadge } from './StatusBadge'
import type { SecurityLog } from '../types'

interface LogTableProps {
  logs: readonly SecurityLog[]
}

export function LogTable({ logs }: LogTableProps) {
  if (logs.length === 0) {
    return <p className="py-8 text-center text-sm text-dim">Nothing found</p>
  }

  return (
    <ul className="divide-y divide-line">
      {logs.map((log) => (
        <li key={log.id} className="flex gap-3 py-2.5 first:pt-0 last:pb-0">
          <time className="w-16 shrink-0 font-mono text-xs text-dim">{log.timestamp}</time>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <SeverityBadge severity={log.severity} />
              <span className="truncate font-mono text-[11px] text-cyan">{log.source}</span>
            </div>
            <p className="text-sm text-ink">{log.event}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
