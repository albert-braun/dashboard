import { Menu, X } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

export function MenuToggle() {
  const { sidebarOpen, toggleSidebar } = useDashboard()

  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-elevated text-ink lg:hidden"
      aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={sidebarOpen}
      onClick={toggleSidebar}
    >
      {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
    </button>
  )
}
