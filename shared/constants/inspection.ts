export const INSPECTION_STATUSES = ['draft', 'submitted', 'approved'] as const

export type InspectionStatus = (typeof INSPECTION_STATUSES)[number]
