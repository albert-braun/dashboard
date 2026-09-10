import { useEffect, useId, useRef, useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import { composeLogMessage, formatLogTime, pickNormalLevel } from '../data/journal'
import type { TerminalLevel, TerminalLine } from '../types'

const MAX_LINES = 180
const NORMAL_INTERVAL_MS = 3000
const ATTACK_INTERVAL_MS = 280

const LEVEL_CLASS: Record<TerminalLevel, string> = {
  INFO: 'text-[#22f0a0]',
  WARN: 'text-[#fbbf24]',
  CRITICAL: 'text-[#ff4d6d] blink-critical',
}

function createLine(level: TerminalLevel, attack: boolean, id: string): TerminalLine {
  return {
    id,
    time: formatLogTime(),
    level,
    message: composeLogMessage(level, attack),
  }
}

function seedLines(): TerminalLine[] {
  return [
    createLine('INFO', false, 'seed-1'),
    createLine('INFO', false, 'seed-2'),
    createLine('WARN', false, 'seed-3'),
    createLine('CRITICAL', false, 'seed-4'),
  ]
}

export function SecurityTerminal() {
  const { underAttack } = useDashboard()
  const [lines, setLines] = useState<TerminalLine[]>(() => seedLines())
  const scrollerRef = useRef<HTMLDivElement>(null)
  const seqRef = useRef(4)
  const labelId = useId()

  useEffect(() => {
    const delay = underAttack ? ATTACK_INTERVAL_MS : NORMAL_INTERVAL_MS
    const timer = window.setInterval(() => {
      seqRef.current += 1
      const level: TerminalLevel = underAttack ? 'CRITICAL' : pickNormalLevel()
      const line = createLine(level, underAttack, `line-${seqRef.current}`)
      setLines((previous) => [...previous, line].slice(-MAX_LINES))
    }, delay)

    return () => window.clearInterval(timer)
  }, [underAttack])

  useEffect(() => {
    if (!underAttack) {
      return
    }

    const burst: TerminalLine[] = []
    for (let index = 0; index < 6; index += 1) {
      seqRef.current += 1
      burst.push(createLine('CRITICAL', true, `burst-${seqRef.current}`))
    }
    setLines((previous) => [...previous, ...burst].slice(-MAX_LINES))
  }, [underAttack])

  useEffect(() => {
    const node = scrollerRef.current
    if (!node) {
      return
    }
    node.scrollTop = node.scrollHeight
  }, [lines])

  return (
    <section className="overflow-hidden rounded-xl border border-line bg-black shadow-[inset_0_0_0_1px_rgba(34,240,160,0.08)]">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#0b0b0b] px-4 py-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22d3ee]">
            tty1
          </p>
          <h2 id={labelId} className="text-sm font-semibold text-white">
            System journal · Live Security Logs
          </h2>
        </div>
        <p className="font-mono text-[11px] text-white/45">root@aegis:~# journalctl -f</p>
      </header>
      <div
        ref={scrollerRef}
        role="log"
        aria-labelledby={labelId}
        aria-live="polite"
        className="h-64 overflow-y-auto bg-black px-4 py-3 font-mono text-[13px] leading-6"
      >
        {lines.map((line) => (
          <p key={line.id} className={LEVEL_CLASS[line.level]}>
            <span className="text-white/40">[{line.time}]</span> [{line.level}] {line.message}
          </p>
        ))}
        <p className="text-[#22f0a0]">
          <span className="animate-pulse">█</span>
        </p>
      </div>
    </section>
  )
}
