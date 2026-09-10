import type { ReactNode } from 'react'
import type { GridSpan } from '../types'

interface ContentGridProps {
  children: ReactNode
}

interface GridItemProps {
  span?: GridSpan
  children: ReactNode
}

const SPAN_CLASS: Record<GridSpan, string> = {
  3: 'md:col-span-1 lg:col-span-3',
  4: 'md:col-span-1 lg:col-span-4',
  6: 'md:col-span-2 lg:col-span-6',
  8: 'md:col-span-2 lg:col-span-8',
  12: 'md:col-span-2 lg:col-span-12',
}

export function ContentGrid({ children }: ContentGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      {children}
    </div>
  )
}

export function GridItem({ span = 3, children }: GridItemProps) {
  return <div className={SPAN_CLASS[span]}>{children}</div>
}
