import { Search } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useDashboard()

  return (
    <label className="relative block min-w-0 flex-1 md:max-w-md">
      <span className="sr-only">Search infrastructure</span>
      <Search
        size={16}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-dim"
      />
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search servers, logs, IPs…"
        className="h-10 w-full rounded-lg border border-line bg-elevated/80 pr-3 pl-9 font-mono text-sm text-ink outline-none placeholder:text-dim/80 focus:border-cyan/50 focus:ring-2 focus:ring-cyan/20"
      />
    </label>
  )
}
