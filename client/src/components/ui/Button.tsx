import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const variants = {
  primary:   'bg-accent text-black font-semibold hover:bg-accent/90 shadow-accent-glow',
  secondary: 'bg-surface-primary text-fg-primary border border-border-primary hover:border-border-primary/70',
  ghost:     'text-fg-secondary hover:text-fg-primary hover:bg-surface-primary',
  danger:    'bg-error text-white font-semibold hover:bg-error/90',
}

const sizes = {
  sm:  'h-8  px-3  text-sm',
  md:  'h-10 px-4  text-sm',
  lg:  'h-12 px-6  text-base',
  xl:  'h-14 px-8  text-base',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  ),
)
Button.displayName = 'Button'
