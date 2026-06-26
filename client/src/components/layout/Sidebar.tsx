import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { label: 'All Forms',  to: '/dashboard'             },
  { label: 'Drafts',     to: '/dashboard?status=draft' },
  { label: 'Submitted',  to: '/dashboard?status=submitted' },
  { label: 'Approved',   to: '/dashboard?status=approved'  },
]

export function Sidebar() {
  return (
    <aside className="flex w-52 flex-col border-r border-border-subtle bg-surface-sidebar">
      <nav className="flex flex-col gap-0.5 p-3 pt-5">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-fg-muted">
          Inspections
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent-light font-semibold text-accent'
                  : 'text-fg-secondary hover:bg-surface-primary hover:text-fg-primary',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
