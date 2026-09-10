import { MenuToggle } from '../components/MenuToggle'
import { DdosButton } from '../components/DdosButton'
import { NotificationButton } from '../components/NotificationButton'
import { SearchBar } from '../components/SearchBar'
import { SystemStatus } from '../components/SystemStatus'
import { ThemeToggle } from '../components/ThemeToggle'
import { useDashboard } from '../context/DashboardContext'
import { useClock } from '../hooks/useClock'

export function Header() {
  const { time, date } = useClock()
  const { underAttack } = useDashboard()

  return (
    <header
      className={`sticky top-0 z-30 flex min-h-16 flex-wrap items-center gap-3 border-b bg-surface/85 px-4 py-2 backdrop-blur-md md:px-6 ${
        underAttack ? 'border-danger/60' : 'border-line'
      }`}
    >
      <MenuToggle />
      <div className="hidden sm:block">
        <SystemStatus />
      </div>
      <div className="sm:hidden">
        <SystemStatus compact />
      </div>

      <DdosButton />
      <SearchBar />

      <div className="ml-auto hidden items-end text-right lg:flex lg:flex-col">
        <span className={`font-mono text-sm ${underAttack ? 'text-danger' : 'text-neon'}`}>
          {time}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-dim">{date}</span>
      </div>

      <NotificationButton />
      <ThemeToggle />
    </header>
  )
}
