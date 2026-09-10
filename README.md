# Aegis

SOC / DevOps console UI: live KPIs, streaming charts, a security journal, and a one-click DDoS drill. Front-end simulation — no backend. Dark theme by default, light theme from the header.

**Live:** [albert-braun.github.io/dashboard](https://albert-braun.github.io/dashboard/)

## What it does

- **Live metrics** — CPU, RAM, throughput, and threats update every second
- **Charts** — area (CPU/RAM) and doughnut (HTTPS, SSH, FTP, DNS)
- **Security journal** — scrolling `[INFO]` / `[WARN]` / `[CRITICAL]` log
- **Attack drill** — spikes load, floods the terminal, then recovers
- **Inventory** — servers, analytics, logs, and settings; header search
- **Responsive** — sidebar + burger on mobile

Telemetry is generated in the browser.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS · Recharts

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).
