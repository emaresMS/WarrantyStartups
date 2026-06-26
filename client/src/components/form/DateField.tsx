import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface DateFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
  required?: boolean
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId} className="text-sm font-medium text-fg-secondary">
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
        <input
          ref={ref}
          id={fieldId}
          type="date"
          className={cn(
            'h-11 w-full rounded-md border border-border-primary bg-surface-primary px-4 text-sm text-fg-primary',
            'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors',
            '[color-scheme:dark]',
            error && 'border-error bg-error-light',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    )
  },
)
DateField.displayName = 'DateField'
