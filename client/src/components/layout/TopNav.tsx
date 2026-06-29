import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import { cn } from '@/utils/cn'

interface TopNavProps {
  title?: string
  actions?: React.ReactNode
}

export function TopNav({ title, actions }: TopNavProps) {
  const { isOnline } = useNetworkStatus()

  return (
    <header className="flex h-14 items-center gap-4 border-b border-border-subtle bg-surface-primary px-6">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-fg-primary">Warranty Startups</span>
      </div>

      {title && (
        <>
          <div className="h-4 w-px bg-border-primary" />
          <span className="text-sm text-fg-muted">{title}</span>
        </>
      )}

      <div className="ml-auto flex items-center gap-3">
        {actions}

        <span
          className={cn(
            'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
            isOnline ? 'bg-success-light text-success' : 'bg-warning-light text-warning',
          )}
        >
          <span className={cn('h-1.5 w-1.5 rounded-full', isOnline ? 'bg-success' : 'bg-warning')} />
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
    </header>
  )
}
