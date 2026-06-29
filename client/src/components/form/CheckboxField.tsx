import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string | React.ReactNode
  error?: string
}

import type React from 'react'

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const fieldId = id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : 'checkbox')
    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label htmlFor={fieldId} className="flex cursor-pointer items-start gap-3">
          <div className="relative mt-0.5 h-5 w-5 shrink-0">
            <input
              ref={ref}
              id={fieldId}
              type="checkbox"
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                'h-5 w-5 rounded border border-border-primary bg-surface-primary transition-colors',
                'peer-checked:border-accent peer-checked:bg-accent',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-accent/20',
              )}
            />
            <svg
              className="pointer-events-none absolute inset-0 hidden h-5 w-5 text-black peer-checked:block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm text-fg-secondary">{label}</span>
        </label>
        {error && <p className="ml-8 text-xs text-error">{error}</p>}
      </div>
    )
  },
)
CheckboxField.displayName = 'CheckboxField'
