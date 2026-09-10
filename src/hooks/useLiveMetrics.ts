import { useEffect, useRef, useState } from 'react'
import type { ResourcePoint } from '../types'

const WINDOW_SIZE = 32
const TRAFFIC_WINDOW = 18
const INITIAL_THREATS = 1284

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function walk(previous: number, target: number, step: number, min: number, max: number): number {
  const noise = (Math.random() - 0.5) * step
  const pull = (target - previous) * 0.14
  return Number(clamp(previous + noise + pull, min, max).toFixed(1))
}

function formatClock(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function seedResourceSeries(): ResourcePoint[] {
  const now = Date.now()
  const points: ResourcePoint[] = []
  let cpu = 41
  let ram = 57

  for (let offset = WINDOW_SIZE - 1; offset >= 0; offset -= 1) {
    cpu = walk(cpu, 42, 6, 18, 88)
    ram = walk(ram, 58, 4, 32, 86)
    points.push({
      time: formatClock(new Date(now - offset * 1000)),
      cpu,
      ram,
    })
  }

  return points
}

function seedTrafficHistory(): number[] {
  const history: number[] = []
  let value = 452
  for (let index = 0; index < TRAFFIC_WINDOW; index += 1) {
    value = walk(value, 452, 24, 320, 620)
    history.push(value)
  }
  return history
}

export interface LiveMetrics {
  series: ResourcePoint[]
  cpu: number
  ram: number
  traffic: number
  trafficHistory: number[]
  trafficDelta: number
  threats: number
}

export function useLiveMetrics(underAttack: boolean): LiveMetrics {
  const [series, setSeries] = useState<ResourcePoint[]>(() => seedResourceSeries())
  const [trafficHistory, setTrafficHistory] = useState<number[]>(() => seedTrafficHistory())
  const [threatsTarget, setThreatsTarget] = useState(INITIAL_THREATS)
  const [threats, setThreats] = useState(INITIAL_THREATS)
  const threatsRef = useRef(INITIAL_THREATS)

  useEffect(() => {
    if (!underAttack) {
      return
    }

    setSeries((previous) => {
      const last = previous[previous.length - 1]
      return [
        ...previous.slice(1),
        {
          time: formatClock(new Date()),
          cpu: Number((95 + Math.random() * 3).toFixed(1)),
          ram: walk(last?.ram ?? 70, 84, 6, 40, 95),
        },
      ]
    })
    setTrafficHistory((previous) => [...previous.slice(1), walk(previous[previous.length - 1] ?? 452, 860, 80, 500, 980)])
    setThreatsTarget((previous) => previous + 18)
  }, [underAttack])

  useEffect(() => {
    const timer = window.setInterval(() => {
      const cpuTarget = underAttack ? 96.5 : 42
      const ramTarget = underAttack ? 84 : 58
      const trafficTarget = underAttack ? 860 : 452
      const cpuMin = underAttack ? 95 : 18
      const cpuMax = underAttack ? 98 : 88

      setSeries((previous) => {
        const last = previous[previous.length - 1]
        const nextPoint: ResourcePoint = {
          time: formatClock(new Date()),
          cpu: walk(last?.cpu ?? cpuTarget, cpuTarget, underAttack ? 1.2 : 6, cpuMin, cpuMax),
          ram: walk(last?.ram ?? ramTarget, ramTarget, underAttack ? 3 : 4, 32, 95),
        }
        return [...previous.slice(1), nextPoint]
      })

      setTrafficHistory((previous) => {
        const last = previous[previous.length - 1] ?? trafficTarget
        return [
          ...previous.slice(1),
          walk(last, trafficTarget, underAttack ? 50 : 28, underAttack ? 500 : 320, underAttack ? 980 : 620),
        ]
      })

      setThreatsTarget((previous) => previous + (underAttack ? 8 + Math.floor(Math.random() * 10) : 1 + Math.floor(Math.random() * 3)))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [underAttack])

  useEffect(() => {
    const from = threatsRef.current
    const to = threatsTarget
    if (from === to) {
      return
    }

    const startedAt = performance.now()
    const duration = 680
    let frame = 0

    const step = (now: number): void => {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - (1 - progress) ** 3
      const value = Math.round(from + (to - from) * eased)
      threatsRef.current = value
      setThreats(value)
      if (progress < 1) {
        frame = window.requestAnimationFrame(step)
      }
    }

    frame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frame)
  }, [threatsTarget])

  const lastPoint = series[series.length - 1]
  const traffic = trafficHistory[trafficHistory.length - 1] ?? 452
  const previousTraffic = trafficHistory[trafficHistory.length - 2] ?? traffic

  return {
    series,
    cpu: lastPoint?.cpu ?? 0,
    ram: lastPoint?.ram ?? 0,
    traffic,
    trafficHistory,
    trafficDelta: Number((traffic - previousTraffic).toFixed(1)),
    threats,
  }
}
