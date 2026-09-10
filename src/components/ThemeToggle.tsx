import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-elevated text-ink transition hover:border-neon/40 hover:text-neon"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
