import { cn } from '@/utils/cn'
import type { InspectionStatus } from '@/lib/db'

const statusStyles: Record<InspectionStatus, string> = {
  draft:     'bg-warning-light text-warning',
  submitted: 'bg-accent-light text-accent',
  approved:  'bg-success-light text-success',
}

const statusLabels: Record<InspectionStatus, string> = {
  draft:     'Draft',
  submitted: 'Submitted',
  approved:  'Approved',
}

interface BadgeProps {
  status: InspectionStatus
  className?: string
}

export function StatusBadge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold',
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  )
}
