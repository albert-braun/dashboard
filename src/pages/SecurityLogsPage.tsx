import { LogTable } from '../components/LogTable'
import { Panel } from '../components/Panel'
import { useDashboard } from '../context/DashboardContext'
import { SECURITY_LOGS } from '../data/mock'
import { ContentGrid, GridItem } from '../layout/ContentGrid'
import { filterLogs } from '../utils/search'

export function SecurityLogsPage() {
  const { searchQuery } = useDashboard()
  const logs = filterLogs(searchQuery)
  const critical = SECURITY_LOGS.filter((log) => log.severity === 'critical').length
  const warning = SECURITY_LOGS.filter((log) => log.severity === 'warning').length

  return (
    <ContentGrid>
      <GridItem span={4}>
        <Panel eyebrow="Severity" title="Critical">
          <p className="font-mono text-3xl text-danger">{critical}</p>
          <p className="mt-1 text-sm text-dim">require SOC response</p>
        </Panel>
      </GridItem>
      <GridItem span={4}>
        <Panel eyebrow="Severity" title="Warning">
          <p className="font-mono text-3xl text-warn">{warning}</p>
          <p className="mt-1 text-sm text-dim">watch and escalate</p>
        </Panel>
      </GridItem>
      <GridItem span={4}>
        <Panel eyebrow="Stream" title="Events in feed">
          <p className="font-mono text-3xl text-cyan">{logs.length}</p>
          <p className="mt-1 text-sm text-dim">matching the current filter</p>
        </Panel>
      </GridItem>
      <GridItem span={12}>
        <Panel eyebrow="SIEM" title="Security journal">
          <LogTable logs={logs} />
        </Panel>
      </GridItem>
    </ContentGrid>
  )
}
