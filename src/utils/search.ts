import { SECURITY_LOGS, SERVERS } from '../data/mock'
import type { SecurityLog, ServerNode } from '../types'

function matchesQuery(haystack: string, query: string): boolean {
  return haystack.toLowerCase().includes(query.trim().toLowerCase())
}

export function filterServers(query: string): ServerNode[] {
  if (!query.trim()) {
    return [...SERVERS]
  }
  return SERVERS.filter((server) =>
    matchesQuery(`${server.name} ${server.region} ${server.role} ${server.status}`, query),
  )
}

export function filterLogs(query: string): SecurityLog[] {
  if (!query.trim()) {
    return [...SECURITY_LOGS]
  }
  return SECURITY_LOGS.filter((log) =>
    matchesQuery(`${log.event} ${log.source} ${log.severity}`, query),
  )
}
