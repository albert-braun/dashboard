import { IncidentsChart } from '../components/charts/IncidentsChart'
import { TrafficChart } from '../components/charts/TrafficChart'
import { ThreatChart } from '../components/charts/ThreatChart'
import { Panel } from '../components/Panel'
import { ContentGrid, GridItem } from '../layout/ContentGrid'

export function AnalyticsPage() {
  return (
    <ContentGrid>
      <GridItem span={8}>
        <Panel eyebrow="Week" title="Blocks and alerts">
          <IncidentsChart />
        </Panel>
      </GridItem>
      <GridItem span={4}>
        <Panel eyebrow="Mix" title="Event types">
          <ThreatChart />
        </Panel>
      </GridItem>
      <GridItem span={12}>
        <Panel eyebrow="24h" title="Network profile">
          <TrafficChart />
        </Panel>
      </GridItem>
    </ContentGrid>
  )
}
