import { ServerTable } from '../components/ServerTable'
import { Panel } from '../components/Panel'
import { useDashboard } from '../context/DashboardContext'
import { SERVERS } from '../data/mock'
import { ContentGrid, GridItem } from '../layout/ContentGrid'
import { filterServers } from '../utils/search'

export function ServersPage() {
  const { searchQuery } = useDashboard()
  const servers = filterServers(searchQuery)
  const online = SERVERS.filter((server) => server.status === 'online').length
  const degraded = SERVERS.filter((server) => server.status === 'degraded').length

  return (
    <ContentGrid>
      <GridItem span={4}>
        <Panel eyebrow="Fleet" title="Online">
          <p className="font-mono text-3xl text-neon">{online}</p>
          <p className="mt-1 text-sm text-dim">nodes answering heartbeat</p>
        </Panel>
      </GridItem>
      <GridItem span={4}>
        <Panel eyebrow="Watch" title="Degraded">
          <p className="font-mono text-3xl text-warn">{degraded}</p>
          <p className="mt-1 text-sm text-dim">elevated load, autoscale engaged</p>
        </Panel>
      </GridItem>
      <GridItem span={4}>
        <Panel eyebrow="SLA" title="Availability">
          <p className="font-mono text-3xl text-cyan">99.98%</p>
          <p className="mt-1 text-sm text-dim">rolling 30-day window</p>
        </Panel>
      </GridItem>
      <GridItem span={12}>
        <Panel eyebrow="Inventory" title="Node inventory">
          <ServerTable servers={servers} />
        </Panel>
      </GridItem>
    </ContentGrid>
  )
}
