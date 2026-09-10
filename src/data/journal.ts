import type { TerminalLevel } from '../types'

const INFO_EVENTS: readonly string[] = [
  'Heartbeat OK from edge-fra-01',
  'TLS handshake completed on api-ams-02',
  'Auth token rotated for SOC-1',
  'Nightly snapshot verified on backup-sto-08',
  'WAF rule-set synced (build 8.4.12)',
  'NTP offset 2ms — within SLA',
]

const WARN_EVENTS: readonly string[] = [
  'High latency on cdn-lon-05 (p95=410ms)',
  'Certificate for cdn-lon-05 expires in 12 days',
  'Rate-limit 78% on api-ams-02',
  'Unusual User-Agent burst from 91.214.xx.xx',
  'Disk pressure 81% on db-hel-03',
]

const CRITICAL_EVENTS: readonly string[] = [
  'SYN flood detected on edge-fra-01',
  'WAF blocked malformed HTTP/2 frames',
  'Anomalous outbound traffic 9.4 Gbps — rate-limit engaged',
  'Brute-force SSH from {ip} — IP blackholed',
  'Privilege escalation attempt rejected on auth-prg-06',
]

const ATTACK_EVENTS: readonly string[] = [
  'DDoS attack suspected from IP {ip}',
  'UDP amplification flood from {ip}',
  'HTTP/2 rapid-reset burst from {ip}',
  'SYN flood {ip} → :443 (drop/blackhole)',
  'Anycast scrubber overflow — spilling to origin',
  'BGP hijack check triggered for prefix 185.12.0.0/16',
  'Connection table 97% on edge-fra-01',
  'WAF emergency mode ON — challenge all unmatched',
]

function randomItem(list: readonly string[]): string {
  const index = Math.floor(Math.random() * list.length)
  return list[index] ?? list[0] ?? ''
}

function randomOctet(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export function randomIp(): string {
  return `${randomOctet(1, 223)}.${randomOctet(0, 255)}.${randomOctet(0, 255)}.${randomOctet(1, 254)}`
}

export function formatLogTime(date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

export function pickNormalLevel(): TerminalLevel {
  const roll = Math.random()
  if (roll < 0.12) {
    return 'CRITICAL'
  }
  if (roll < 0.4) {
    return 'WARN'
  }
  return 'INFO'
}

export function composeLogMessage(level: TerminalLevel, attack: boolean): string {
  const pool = attack
    ? ATTACK_EVENTS
    : level === 'INFO'
      ? INFO_EVENTS
      : level === 'WARN'
        ? WARN_EVENTS
        : CRITICAL_EVENTS
  return randomItem(pool).replaceAll('{ip}', randomIp())
}
