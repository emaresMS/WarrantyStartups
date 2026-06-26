import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, helperText, required, className, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId} className="text-sm font-medium text-fg-secondary">
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          rows={4}
          className={cn(
            'w-full resize-y rounded-md border border-border-primary bg-surface-primary px-4 py-3',
            'text-sm text-fg-primary placeholder:text-fg-muted',
            'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors',
            error && 'border-error bg-error-light',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {!error && helperText && <p className="text-xs text-fg-muted">{helperText}</p>}
      </div>
    )
  },
)
TextareaField.displayName = 'TextareaField'
