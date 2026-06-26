import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { Button, StatusBadge } from '@/components/ui'
import { formatRelativeTime, formatDate } from '@/utils/formatters'
import type { InspectionStatus } from '@/lib/db'

const STATUS_FILTERS: { label: string; value: InspectionStatus | 'all' }[] = [
  { label: 'All',       value: 'all'       },
  { label: 'Draft',     value: 'draft'     },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Approved',  value: 'approved'  },
]

export function DashboardPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<InspectionStatus | 'all'>('all')

  const inspections = useLiveQuery(async () => {
    let query = db.inspections.orderBy('updatedAt').reverse()
    if (statusFilter !== 'all') query = query.filter((i) => i.status === statusFilter)
    const results = await query.toArray()
    if (!search) return results
    const term = search.toLowerCase()
    return results.filter((i) => i.title.toLowerCase().includes(term) || i.siteLabel.toLowerCase().includes(term))
  }, [statusFilter, search])

  async function createInspection() {
    const id = await db.inspections.add({
      title: 'New Inspection',
      siteLabel: '',
      status: 'draft',
      formData: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    navigate(`/inspections/${id}`)
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Page header */}
      <div className="flex items-center gap-4 border-b border-border-subtle px-8 py-6">
        <div>
          <h1 className="text-xl font-bold text-fg-primary">All Inspections</h1>
          <p className="mt-0.5 text-sm text-fg-muted">{inspections?.length ?? 0} forms</p>
        </div>
        <div className="ml-auto">
          <Button size="lg" onClick={createInspection}>+ New Inspection</Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-border-subtle px-8 py-4">
        <input
          type="search"
          placeholder="Search inspections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-72 rounded-md border border-border-primary bg-surface-primary px-3 text-sm placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        <div className="flex gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                statusFilter === f.value
                  ? 'bg-accent font-semibold text-black'
                  : 'bg-surface-primary text-fg-secondary hover:text-fg-primary border border-border-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 xl:grid-cols-3">
        {inspections?.map((inspection) => (
          <button
            key={inspection.id}
            onClick={() => navigate(`/inspections/${inspection.id}`)}
            className="group flex flex-col rounded-lg border border-border-subtle bg-surface-primary text-left shadow-card transition-all hover:border-border-primary hover:shadow-card-hover"
          >
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-fg-primary group-hover:text-accent transition-colors">
                  {inspection.title}
                </h3>
                <StatusBadge status={inspection.status} />
              </div>
              <div className="space-y-1 text-xs text-fg-muted">
                <p>Created {formatDate(inspection.createdAt)}</p>
                <p>Last edited {formatRelativeTime(inspection.updatedAt)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border-subtle px-5 py-3">
              <span className="text-xs text-fg-muted">{inspection.siteLabel || '—'}</span>
              <span className="text-xs font-medium text-accent">Open →</span>
            </div>
          </button>
        ))}

        {inspections?.length === 0 && (
          <div className="col-span-full py-20 text-center text-fg-muted">
            <p className="text-lg font-medium text-fg-secondary">No inspections yet</p>
            <p className="mt-1 text-sm">Create your first inspection to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
