import { StatusBadge } from './StatusBadge'
import type { ServerNode } from '../types'

interface MeterProps {
  value: number
}

function Meter({ value }: MeterProps) {
  const tone = value >= 80 ? 'bg-danger' : value >= 60 ? 'bg-warn' : 'bg-neon'

  return (
    <div className="flex min-w-20 items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
      </div>
      <span className="w-8 text-right font-mono text-[11px] text-dim">{value}%</span>
    </div>
  )
}

interface ServerTableProps {
  servers: readonly ServerNode[]
  compact?: boolean
}

export function ServerTable({ servers, compact = false }: ServerTableProps) {
  if (servers.length === 0) {
    return <p className="py-8 text-center text-sm text-dim">Nothing found</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-dim">
            <th className="pb-2 font-medium">Host</th>
            <th className="pb-2 font-medium">Region</th>
            {!compact ? <th className="pb-2 font-medium">Role</th> : null}
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">CPU</th>
            <th className="pb-2 font-medium">RAM</th>
            {!compact ? <th className="pb-2 font-medium">Uptime</th> : null}
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.id} className="border-b border-line/70 last:border-b-0">
              <td className="py-2.5 font-mono text-ink">{server.name}</td>
              <td className="py-2.5 text-dim">{server.region}</td>
              {!compact ? <td className="py-2.5 text-dim">{server.role}</td> : null}
              <td className="py-2.5">
                <StatusBadge status={server.status} />
              </td>
              <td className="py-2.5">
                <Meter value={server.cpu} />
              </td>
              <td className="py-2.5">
                <Meter value={server.memory} />
              </td>
              {!compact ? (
                <td className="py-2.5 font-mono text-xs text-dim">{server.uptime}</td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
