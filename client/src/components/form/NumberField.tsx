import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  unit?: string
  error?: string
  helperText?: string
  required?: boolean
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ label, unit, error, helperText, required, className, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId} className="text-sm font-medium text-fg-secondary">
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
        <div className="relative flex">
          <input
            ref={ref}
            id={fieldId}
            type="number"
            inputMode="decimal"
            className={cn(
              'h-11 w-full rounded-md border border-border-primary bg-surface-primary px-4 font-mono text-sm text-fg-primary',
              'placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
              'transition-colors',
              unit && 'pr-12',
              error && 'border-error bg-error-light focus:ring-error/20',
              className,
            )}
            {...props}
          />
          {unit && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-fg-muted">
              {unit}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        {!error && helperText && <p className="text-xs text-fg-muted">{helperText}</p>}
      </div>
    )
  },
)
NumberField.displayName = 'NumberField'
