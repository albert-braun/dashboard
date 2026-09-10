import { ProtocolChart } from '../components/charts/ProtocolChart'
import { ResourceChart } from '../components/charts/ResourceChart'
import { LogTable } from '../components/LogTable'
import { Panel } from '../components/Panel'
import { SecurityTerminal } from '../components/SecurityTerminal'
import { ServerTable } from '../components/ServerTable'
import { ActiveServersCard } from '../components/kpi/ActiveServersCard'
import { NetworkTrafficCard } from '../components/kpi/NetworkTrafficCard'
import { SystemLoadCard } from '../components/kpi/SystemLoadCard'
import { ThreatsBlockedCard } from '../components/kpi/ThreatsBlockedCard'
import { useDashboard } from '../context/DashboardContext'
import { useLiveMetrics } from '../hooks/useLiveMetrics'
import { ContentGrid, GridItem } from '../layout/ContentGrid'
import { filterLogs, filterServers } from '../utils/search'

export function DashboardPage() {
  const { searchQuery, underAttack } = useDashboard()
  const live = useLiveMetrics(underAttack)
  const servers = filterServers(searchQuery).slice(0, 5)
  const logs = filterLogs(searchQuery).slice(0, 5)

  return (
    <ContentGrid>
      <GridItem span={3}>
        <ActiveServersCard />
      </GridItem>
      <GridItem span={3}>
        <NetworkTrafficCard
          mbps={live.traffic}
          delta={live.trafficDelta}
          history={live.trafficHistory}
        />
      </GridItem>
      <GridItem span={3}>
        <ThreatsBlockedCard value={live.threats} />
      </GridItem>
      <GridItem span={3}>
        <SystemLoadCard cpu={live.cpu} />
      </GridItem>

      <GridItem span={8}>
        <Panel
          eyebrow="Telemetry"
          title="CPU and RAM dynamics"
          action={
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-danger">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-danger" />
              </span>
              live · 1s
            </span>
          }
        >
          <ResourceChart data={live.series} />
        </Panel>
      </GridItem>

      <GridItem span={4}>
        <Panel eyebrow="Network" title="Traffic by protocol">
          <ProtocolChart />
        </Panel>
      </GridItem>

      <GridItem span={12}>
        <SecurityTerminal />
      </GridItem>

      <GridItem span={6}>
        <Panel eyebrow="Fleet" title="Server health">
          <ServerTable servers={servers} compact />
        </Panel>
      </GridItem>

      <GridItem span={6}>
        <Panel eyebrow="Live" title="Latest security logs">
          <LogTable logs={logs} />
        </Panel>
      </GridItem>
    </ContentGrid>
  )
}
