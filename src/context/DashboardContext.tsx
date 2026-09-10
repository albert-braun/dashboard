import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { INITIAL_NOTIFICATIONS } from '../data/mock'
import type { NavId, NotificationItem } from '../types'

const ATTACK_DURATION_MS = 10_000

interface DashboardContextValue {
  activePage: NavId
  setActivePage: (id: NavId) => void
  sidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  notifications: NotificationItem[]
  unreadCount: number
  markAllNotificationsRead: () => void
  underAttack: boolean
  toggleAttack: () => void
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePageState] = useState<NavId>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [underAttack, setUnderAttack] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => [
    ...INITIAL_NOTIFICATIONS,
  ])
  const attackTimerRef = useRef<number | null>(null)

  const clearAttackTimer = useCallback(() => {
    if (attackTimerRef.current !== null) {
      window.clearTimeout(attackTimerRef.current)
      attackTimerRef.current = null
    }
  }, [])

  const stopAttack = useCallback(() => {
    clearAttackTimer()
    setUnderAttack(false)
  }, [clearAttackTimer])

  const startAttack = useCallback(() => {
    clearAttackTimer()
    setUnderAttack(true)
    attackTimerRef.current = window.setTimeout(() => {
      setUnderAttack(false)
      attackTimerRef.current = null
    }, ATTACK_DURATION_MS)
  }, [clearAttackTimer])

  const toggleAttack = useCallback(() => {
    if (underAttack) {
      stopAttack()
    } else {
      startAttack()
    }
  }, [underAttack, startAttack, stopAttack])

  useEffect(() => () => clearAttackTimer(), [clearAttackTimer])

  const setActivePage = useCallback((id: NavId) => {
    setActivePageState(id)
    setSidebarOpen(false)
  }, [])

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const toggleSidebar = useCallback(() => setSidebarOpen((open) => !open), [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((items) => items.map((item) => ({ ...item, read: true })))
  }, [])

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  )

  const value = useMemo(
    () => ({
      activePage,
      setActivePage,
      sidebarOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      searchQuery,
      setSearchQuery,
      notifications,
      unreadCount,
      markAllNotificationsRead,
      underAttack,
      toggleAttack,
    }),
    [
      activePage,
      setActivePage,
      sidebarOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      searchQuery,
      notifications,
      unreadCount,
      markAllNotificationsRead,
      underAttack,
      toggleAttack,
    ],
  )

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  )
}

export function useDashboard(): DashboardContextValue {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider')
  }
  return context
}
