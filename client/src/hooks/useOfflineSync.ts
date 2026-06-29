import { useEffect } from 'react'
import { useNetworkStatus } from './useNetworkStatus'
import { db } from '@/lib/db'
import { inspectionService } from '@/services/inspectionService'

export function useOfflineSync() {
  const { isOnline } = useNetworkStatus()

  useEffect(() => {
    if (!isOnline) return

    async function flushQueue() {
      const pending = await db.pendingSync.orderBy('queuedAt').toArray()
      for (const item of pending) {
        const inspection = await db.inspections.get(item.inspectionId)
        if (!inspection) {
          await db.pendingSync.delete(item.id!)
          continue
        }
        try {
          if (item.operation === 'create') {
            await inspectionService.create(inspection)
          } else {
            await inspectionService.update(inspection.remoteId!, inspection)
          }
          await db.inspections.update(item.inspectionId, { syncedAt: new Date().toISOString() })
          await db.pendingSync.delete(item.id!)
        } catch {
          // leave in queue — will retry on next online event
        }
      }
    }

    flushQueue()
  }, [isOnline])
}
