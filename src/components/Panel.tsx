import type { ReactNode } from 'react'

interface PanelProps {
  title?: string
  eyebrow?: string
  action?: ReactNode
  className?: string
  children: ReactNode
}

export function Panel({
  title,
  eyebrow,
  action,
  className = '',
  children,
}: PanelProps) {
  return (
    <section
      className={`flex h-full flex-col rounded-xl border border-line bg-surface/90 shadow-[0_0_0_1px_rgba(34,240,160,0.04)] ${className}`}
    >
      {(title || action || eyebrow) && (
        <header className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
          <div>
            {eyebrow ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-sm font-semibold tracking-tight text-ink">{title}</h2>
            ) : null}
          </div>
          {action}
        </header>
      )}
      <div className="min-h-0 flex-1 p-4">{children}</div>
    </section>
  )
}
