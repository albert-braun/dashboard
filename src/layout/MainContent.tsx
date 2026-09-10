import type { ComponentType } from 'react'
import { useDashboard } from '../context/DashboardContext'
import { PAGE_META } from '../data/navigation'
import { AnalyticsPage } from '../pages/AnalyticsPage'
import { DashboardPage } from '../pages/DashboardPage'
import { SecurityLogsPage } from '../pages/SecurityLogsPage'
import { ServersPage } from '../pages/ServersPage'
import { SettingsPage } from '../pages/SettingsPage'
import type { NavId } from '../types'

const PAGES: Record<NavId, ComponentType> = {
  dashboard: DashboardPage,
  servers: ServersPage,
  analytics: AnalyticsPage,
  logs: SecurityLogsPage,
  settings: SettingsPage,
}

export function MainContent() {
  const { activePage } = useDashboard()
  const meta = PAGE_META[activePage]
  const Page = PAGES[activePage]

  return (
    <main className="scrollbar-thin flex-1 overflow-y-auto p-4 md:p-6">
      <div className="mb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan">
          {activePage}
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-ink md:text-2xl">
          {meta.title}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-dim">{meta.subtitle}</p>
      </div>
      <Page />
    </main>
  )
}
