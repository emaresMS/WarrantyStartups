import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { Sidebar } from './Sidebar'
import { OfflineBanner } from './OfflineBanner'
import { useOfflineSync } from '@/hooks/useOfflineSync'

export function AppShell() {
  useOfflineSync()

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopNav />
      <OfflineBanner />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-surface-secondary">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
