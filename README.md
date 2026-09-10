# Aegis

**Real-time CyberSecurity & DevOps Dashboard**

**Live demo:** [https://albert-braun.github.io/dashboard/](https://albert-braun.github.io/dashboard/)

Aegis is a modern operations console for monitoring infrastructure health, network traffic, and security events. It is a front-end simulation of a SOC / DevOps panel: live KPI cards, streaming charts, a Linux-style security journal, and a one-click DDoS attack drill.

Dark theme is the default (near-black surfaces with neon green, cyan, and red accents). Light theme is available from the header or Settings.

---

## Features

- **Real-time data streaming** — CPU, RAM, throughput, and threat counters update every second; charts use a sliding window so new points push the series to the left.
- **Cyber attack simulation mode** — a header action (`Simulate DDoS attack`) flips global status to **SYSTEM UNDER ATTACK**, spikes CPU to 95–98%, and floods the terminal with `[CRITICAL]` lines. A second click or a 10-second timeout restores normal operation.
- **Live security journal** — a black, monospace terminal under the charts. Every 3 seconds a new `[INFO]`, `[WARN]`, or `[CRITICAL]` line is appended and the view auto-scrolls.
- **Responsive design** — sidebar, 12-column CSS Grid, and header controls adapt from desktop to a mobile burger menu.
- **Dark / Light mode** — class-based theming with `localStorage` persistence (dark by default).
- **Interactive Recharts** — area chart for CPU/RAM, doughnut for protocol mix (HTTPS, SSH, FTP, DNS), custom tooltips.
- **Global search** — filters server inventory and security log tables from the header.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Language | TypeScript (strict, no `any`) |
| Bundler | Vite 8 |
| Styling | Tailwind CSS 4 |
| Charts | Recharts 3 |
| Icons | Lucide React |

---

## Installation & Running

**Requirements:** Node.js 20+ and npm.

```bash
git clone https://github.com/albert-braun/dashboard.git
cd dashboard
npm install
npm run dev
```

Open [http://localhost:5173/dashboard/](http://localhost:5173/dashboard/).

The production site is published automatically to GitHub Pages on every push to `main`: [https://albert-braun.github.io/dashboard/](https://albert-braun.github.io/dashboard/).

| Script | Command | Purpose |
| --- | --- | --- |
| Dev server | `npm run dev` | Vite HMR |
| Production build | `npm run build` | `tsc -b` + Vite build |
| Preview build | `npm run preview` | Serve `dist/` |
| Lint | `npm run lint` | oxlint |

---

## Architecture

```
src/
  App.tsx                 Providers + shell
  context/
    ThemeContext.tsx      Dark / light, persisted
    DashboardContext.tsx  Navigation, search, notifications, DDoS flag
  layout/                 Sidebar, Header, MainContent, CSS Grid
  pages/                  Dashboard, Servers, Analytics, Security Logs, Settings
  components/
    kpi/                  Active Servers, Traffic, Threats, System Load
    charts/               ResourceChart, ProtocolChart, tooltips
    SecurityTerminal.tsx  Live journal (tty)
    DdosButton.tsx        Attack toggle in the header
  hooks/
    useLiveMetrics.ts     Sliding-window CPU / RAM / traffic / threats
    useClock.ts           Header clock
  data/                   Mock inventory, journal templates, nav
  types/                  Shared strict TypeScript models
```

**How real-time simulation works**

There is no backend. Telemetry is generated in the browser.

1. **`useLiveMetrics`** keeps a fixed-length series (32 points). A `setInterval` (1s) appends a new CPU/RAM sample and drops the oldest one, so Recharts areas appear to stream left. Values random-walk toward targets (~42% CPU, ~452 Mb/s). The threats KPI eases toward a rising integer with `requestAnimationFrame`.
2. **`SecurityTerminal`** uses another `setInterval` (3s) to push colored log lines (`[INFO]` / `[WARN]` / `[CRITICAL]`) and sets `scrollTop = scrollHeight` after each append.
3. **Attack mode** lives in `DashboardContext` (`underAttack`). Starting a drill:
   - header/sidebar status switches to **SYSTEM UNDER ATTACK**;
   - metrics retarget CPU to 95–98% immediately and hold it there;
   - the journal interval drops to ~280ms and emits only `[CRITICAL]` events.
   A second click clears a timeout; otherwise the timeout fires after **10 seconds** and walk targets return to baseline so charts and load bars recover smoothly.

State is scoped with React context (`ThemeProvider`, `DashboardProvider`). Pages are swapped in `MainContent` without a router, which keeps the demo self-contained.

---

## License

Portfolio project. Source: [github.com/albert-braun/dashboard](https://github.com/albert-braun/dashboard).
