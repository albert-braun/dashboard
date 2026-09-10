import type { LogSeverity, ServerStatus } from '../types'

const STATUS_CLASS: Record<ServerStatus, string> = {
  online: 'bg-neon/15 text-neon border-neon/30',
  degraded: 'bg-warn/15 text-warn border-warn/30',
  offline: 'bg-danger/15 text-danger border-danger/30',
}

const STATUS_LABEL: Record<ServerStatus, string> = {
  online: 'Online',
  degraded: 'Degraded',
  offline: 'Offline',
}

const SEVERITY_CLASS: Record<LogSeverity, string> = {
  info: 'bg-cyan/15 text-cyan border-cyan/30',
  warning: 'bg-warn/15 text-warn border-warn/30',
  critical: 'bg-danger/15 text-danger border-danger/30',
}

interface StatusBadgeProps {
  status: ServerStatus
}

interface SeverityBadgeProps {
  severity: LogSeverity
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${SEVERITY_CLASS[severity]}`}
    >
      {severity}
    </span>
  )
}
