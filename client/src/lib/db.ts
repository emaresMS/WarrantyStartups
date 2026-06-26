import Dexie, { type Table } from 'dexie'

export type InspectionStatus = 'draft' | 'submitted' | 'approved'

export interface LocalInspection {
  id?: number
  remoteId?: string
  title: string
  siteLabel: string
  status: InspectionStatus
  formData: Record<string, unknown>
  createdAt: string
  updatedAt: string
  syncedAt?: string
}

export interface PendingSync {
  id?: number
  inspectionId: number
  operation: 'create' | 'update'
  queuedAt: string
}

class WarrantyFieldDB extends Dexie {
  inspections!: Table<LocalInspection>
  pendingSync!: Table<PendingSync>

  constructor() {
    super('WarrantyFieldDB')
    this.version(1).stores({
      inspections: '++id, remoteId, status, updatedAt, createdAt',
      pendingSync: '++id, inspectionId, queuedAt',
    })
  }
}

export const db = new WarrantyFieldDB()
