import { cn } from '@/utils/cn'

interface RadioOption {
  value: string
  label: string
}

interface RadioFieldProps {
  label: string
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  error?: string
  required?: boolean
  className?: string
}

export function RadioField({ label, name, options, value, onChange, error, required, className }: RadioFieldProps) {
  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      <legend className="text-sm font-medium text-fg-secondary">
        {label}
        {required && <span className="ml-1 text-error">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.value
          return (
            <label
              key={opt.value}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors',
                isSelected
                  ? 'border-accent bg-accent-light text-accent font-medium'
                  : 'border-border-primary bg-surface-primary text-fg-secondary hover:border-border-primary/70',
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange?.(opt.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  'h-4 w-4 rounded-full border-2 flex items-center justify-center',
                  isSelected ? 'border-accent' : 'border-fg-muted',
                )}
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-accent" />}
              </span>
              {opt.label}
            </label>
          )
        })}
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </fieldset>
  )
}
