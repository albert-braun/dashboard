import { Bell } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import type { LogSeverity } from '../types'

const SEVERITY_DOT: Record<LogSeverity, string> = {
  critical: 'bg-danger',
  warning: 'bg-warn',
  info: 'bg-cyan',
}

export function NotificationButton() {
  const { notifications, unreadCount, markAllNotificationsRead } = useDashboard()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const onPointer = (event: MouseEvent): void => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-elevated text-ink transition hover:border-cyan/40 hover:text-cyan"
      >
        <Bell size={18} />
        {unreadCount > 0 ? (
          <span className="absolute -top-1 -right-1 inline-flex min-w-4 items-center justify-center rounded-full bg-danger px-1 font-mono text-[10px] leading-4 text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-line px-3 py-2">
            <p className="text-xs font-semibold tracking-wide text-ink">Notifications</p>
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-[11px] text-cyan hover:underline"
            >
              Mark all read
            </button>
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {notifications.map((item) => (
              <li
                key={item.id}
                className={`border-b border-line px-3 py-2.5 last:border-b-0 ${item.read ? 'opacity-70' : 'bg-elevated/60'}`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${SEVERITY_DOT[item.severity]}`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{item.title}</p>
                    <p className="mt-0.5 text-xs text-dim">{item.message}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-dim">
                      {item.time} ago
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
