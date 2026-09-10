import {
  Activity,
  LayoutDashboard,
  Server,
  Settings,
  ShieldAlert,
} from 'lucide-react'
import type { NavId, NavItem, PageMeta } from '../types'

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'servers', label: 'Servers', icon: Server },
  { id: 'analytics', label: 'Analytics', icon: Activity },
  { id: 'logs', label: 'Security Logs', icon: ShieldAlert },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export const PAGE_META: Record<NavId, PageMeta> = {
  dashboard: {
    title: 'Infrastructure overview',
    subtitle: 'Live monitoring of servers, traffic, and threats',
  },
  servers: {
    title: 'Servers',
    subtitle: 'Node health, CPU/RAM load, and uptime by region',
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Incident trends, blocks, and network activity',
  },
  logs: {
    title: 'Security Logs',
    subtitle: 'SIEM stream: alerts, anomalies, and access audit',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Theme, alerts, and operator workstation options',
  },
}
