import type { LucideIcon } from 'lucide-react'

export type Theme = 'dark' | 'light'

export type NavId = 'dashboard' | 'servers' | 'analytics' | 'logs' | 'settings'

export type ServerStatus = 'online' | 'degraded' | 'offline'

export type LogSeverity = 'info' | 'warning' | 'critical'

export type Accent = 'neon' | 'cyan' | 'danger' | 'info' | 'warn'

export type Trend = 'up' | 'down' | 'neutral'

export type GridSpan = 3 | 4 | 6 | 8 | 12

export interface NavItem {
  id: NavId
  label: string
  icon: LucideIcon
}

export interface PageMeta {
  title: string
  subtitle: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  severity: LogSeverity
}

export interface StatMetric {
  id: string
  label: string
  value: string
  delta: string
  trend: Trend
  icon: LucideIcon
  accent: Accent
}

export interface ServerNode {
  id: string
  name: string
  region: string
  role: string
  status: ServerStatus
  cpu: number
  memory: number
  uptime: string
}

export interface SecurityLog {
  id: string
  timestamp: string
  severity: LogSeverity
  source: string
  event: string
}

export interface TrafficPoint {
  time: string
  inbound: number
  outbound: number
  blocked: number
}

export interface ThreatSlice {
  name: string
  value: number
  color: string
}

export interface IncidentPoint {
  day: string
  blocked: number
  alerts: number
}

export interface ResourcePoint {
  time: string
  cpu: number
  ram: number
}

export interface ProtocolSlice {
  name: string
  value: number
  color: string
}

export type TerminalLevel = 'INFO' | 'WARN' | 'CRITICAL'

export interface TerminalLine {
  id: string
  time: string
  level: TerminalLevel
  message: string
}
