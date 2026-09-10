import { Header } from './Header'
import { MainContent } from './MainContent'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className="cyber-grid min-h-svh bg-bg text-ink">
      <div className="flex min-h-svh">
        <Sidebar />
        <div className="flex min-h-svh min-w-0 flex-1 flex-col">
          <Header />
          <MainContent />
        </div>
      </div>
    </div>
  )
}
