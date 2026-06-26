import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, helperText, required, className, id, ...props }, ref) => {
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
          className={cn(
            'h-11 w-full rounded-md border border-border-primary bg-surface-primary px-4 text-sm text-fg-primary',
            'placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
            'transition-colors',
            error && 'border-error bg-error-light focus:ring-error/20',
            className,
          )}
          {...props}
        />
        {error && <p className="flex items-center gap-1.5 text-xs text-error">{error}</p>}
        {!error && helperText && <p className="text-xs text-fg-muted">{helperText}</p>}
      </div>
    )
  },
)
TextField.displayName = 'TextField'
