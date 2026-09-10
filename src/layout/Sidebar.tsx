import { Shield } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import { NAV_ITEMS } from '../data/navigation'
import { SystemStatus } from '../components/SystemStatus'

export function Sidebar() {
  const { activePage, setActivePage, sidebarOpen, closeSidebar } = useDashboard()

  return (
    <>
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] lg:hidden"
          onClick={closeSidebar}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-surface transition-transform duration-200 lg:static lg:z-auto lg:w-[16.5rem] lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="glow-neon inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neon/10 text-neon">
            <Shield size={20} strokeWidth={1.8} />
          </span>
          <div>
            <p className="font-mono text-sm font-semibold tracking-[0.22em] text-ink">AEGIS</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-dim">Cyber Ops</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activePage

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePage(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  isActive
                    ? 'bg-neon/10 text-neon shadow-[inset_2px_0_0_0_var(--app-neon)]'
                    : 'text-dim hover:bg-elevated hover:text-ink'
                }`}
              >
                <Icon size={18} strokeWidth={1.75} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="border-t border-line p-4">
          <SystemStatus />
          <div className="mt-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-elevated font-mono text-xs text-cyan">
              AB
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">Albert Braun</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-dim">
                SOC operator
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
