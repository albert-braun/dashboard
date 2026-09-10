import { Siren } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

export function DdosButton() {
  const { underAttack, toggleAttack } = useDashboard()

  return (
    <button
      type="button"
      onClick={toggleAttack}
      aria-pressed={underAttack}
      className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_22px_rgba(255,77,109,0.45)] transition md:px-5 md:text-base ${
        underAttack
          ? 'bg-danger ring-2 ring-danger/70 ring-offset-2 ring-offset-bg'
          : 'bg-danger hover:bg-danger/90'
      }`}
    >
      <Siren size={16} />
      <span className="hidden sm:inline">
        {underAttack ? 'Stop attack' : 'Simulate DDoS attack'}
      </span>
      <span className="sm:hidden">{underAttack ? 'STOP' : 'DDoS'}</span>
    </button>
  )
}
