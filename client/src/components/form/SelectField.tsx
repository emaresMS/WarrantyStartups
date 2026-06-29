import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  placeholder?: string
  error?: string
  required?: boolean
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, placeholder, error, required, className, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId} className="text-sm font-medium text-fg-secondary">
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            className={cn(
              'h-11 w-full appearance-none rounded-md border border-border-primary bg-surface-primary',
              'pl-4 pr-10 text-sm text-fg-primary',
              'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors',
              '[color-scheme:dark]',
              error && 'border-error bg-error-light',
              className,
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
            ▾
          </span>
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    )
  },
)
SelectField.displayName = 'SelectField'
