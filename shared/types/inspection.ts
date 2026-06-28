import type { InspectionStatus } from '../constants/inspection'

export interface Inspection {
  id: string
  userId: string
  title: string
  siteLabel: string
  status: InspectionStatus
  formData: Record<string, unknown>
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

export interface CreateInspectionRequest {
  title: string
  siteLabel: string
  status: InspectionStatus
  formData: Record<string, unknown>
}

export type UpdateInspectionRequest = Partial<CreateInspectionRequest>
