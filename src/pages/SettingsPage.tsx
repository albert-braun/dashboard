import { Panel } from '../components/Panel'
import { useTheme } from '../context/ThemeContext'
import { ContentGrid, GridItem } from '../layout/ContentGrid'

export function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <ContentGrid>
      <GridItem span={6}>
        <Panel eyebrow="Appearance" title="Theme">
          <p className="mb-4 text-sm text-dim">
            Dark SOC console is the default. Light theme keeps the same neon accents.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`rounded-lg border px-4 py-2 text-sm ${
                theme === 'dark'
                  ? 'border-neon bg-neon/10 text-neon'
                  : 'border-line text-dim hover:text-ink'
              }`}
            >
              Dark
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`rounded-lg border px-4 py-2 text-sm ${
                theme === 'light'
                  ? 'border-neon bg-neon/10 text-neon'
                  : 'border-line text-dim hover:text-ink'
              }`}
            >
              Light
            </button>
          </div>
        </Panel>
      </GridItem>
      <GridItem span={6}>
        <Panel eyebrow="Alerts" title="Notification channels">
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between gap-3 rounded-lg border border-line bg-elevated px-3 py-2">
              <span className="text-ink">Critical in UI</span>
              <span className="rounded-full border border-neon/30 bg-neon/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neon">
                ON
              </span>
            </li>
            <li className="flex items-center justify-between gap-3 rounded-lg border border-line bg-elevated px-3 py-2">
              <span className="text-ink">Slack #soc-alerts</span>
              <span className="rounded-full border border-neon/30 bg-neon/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neon">
                ON
              </span>
            </li>
            <li className="flex items-center justify-between gap-3 rounded-lg border border-line bg-elevated px-3 py-2">
              <span className="text-ink">Email digest</span>
              <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-dim">
                OFF
              </span>
            </li>
          </ul>
        </Panel>
      </GridItem>
      <GridItem span={12}>
        <Panel eyebrow="Session" title="Workstation">
          <dl className="grid gap-4 text-sm md:grid-cols-3">
            <div>
              <dt className="text-dim">Operator</dt>
              <dd className="mt-1 font-medium text-ink">Albert Braun · SOC-1</dd>
            </div>
            <div>
              <dt className="text-dim">Role</dt>
              <dd className="mt-1 font-medium text-ink">Read / Respond</dd>
            </div>
            <div>
              <dt className="text-dim">Cluster</dt>
              <dd className="mt-1 font-mono text-ink">eu-central-ops</dd>
            </div>
          </dl>
        </Panel>
      </GridItem>
    </ContentGrid>
  )
}
