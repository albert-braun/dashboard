import { DashboardProvider } from './context/DashboardContext'
import { ThemeProvider } from './context/ThemeContext'
import { Layout } from './layout/Layout'

export default function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <Layout />
      </DashboardProvider>
    </ThemeProvider>
  )
}
