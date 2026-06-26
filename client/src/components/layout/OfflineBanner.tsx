import { useNetworkStatus } from '@/hooks/useNetworkStatus'

export function OfflineBanner() {
  const { isOnline } = useNetworkStatus()
  if (isOnline) return null

  return (
    <div className="flex items-center gap-3 bg-warning-light px-4 py-2.5 text-sm text-warning">
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728M12 12h.01" />
      </svg>
      You are offline. Changes are saved locally and will sync when reconnected.
    </div>
  )
}
