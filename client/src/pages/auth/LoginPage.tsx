import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { loginSchema, type LoginFormValues } from '@/schemas/authSchema'
import { authService } from '@/services/authService'
import { redirectToOAuth } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/form/TextField'
import { CheckboxField } from '@/components/form/CheckboxField'

export function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: LoginFormValues) {
    await authService.login(values)
    window.location.href = '/dashboard'
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div
        className="hidden w-[640px] shrink-0 flex-col justify-between p-14 lg:flex"
        style={{ background: 'linear-gradient(135deg, #040806 0%, #0A150B 50%, #080A0C 100%)' }}
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-accent" />
          <span className="text-lg font-bold text-fg-primary">WarrantyField</span>
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight text-fg-primary">
            Field inspection,<br />done right.
          </h1>
          <p className="text-base leading-relaxed text-fg-secondary">
            Capture equipment data offline, sync automatically, and keep every commissioning report one tap away.
          </p>
          <ul className="space-y-4">
            {[
              'Offline-first — works without signal',
              '80+ field types, structured by section',
              'Instant sync when reconnected',
            ].map((feat) => (
              <li key={feat} className="flex items-center gap-3 text-sm text-fg-secondary">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent">✓</span>
                {feat}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-fg-muted">© 2026 WarrantyField. All rights reserved.</p>
      </div>

      {/* Auth panel */}
      <div className="flex flex-1 items-center justify-center bg-surface-secondary p-6">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-border-subtle bg-surface-primary p-10 shadow-modal">
          <div>
            <h2 className="text-2xl font-bold text-fg-primary">Welcome back</h2>
            <p className="mt-1 text-sm text-fg-secondary">Sign in to your WarrantyField account</p>
          </div>

          <div className="space-y-3">
            <Button variant="secondary" size="lg" className="w-full" onClick={() => redirectToOAuth('google')}>
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#EA4335] text-[10px] text-white font-bold">G</span>
              Continue with Google
            </Button>
            <Button variant="secondary" size="lg" className="w-full" onClick={() => redirectToOAuth('microsoft')}>
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#00A4EF] text-[10px] text-white font-bold">M</span>
              Continue with Microsoft
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border-primary" />
            <span className="text-xs text-fg-muted">or continue with email</span>
            <div className="h-px flex-1 bg-border-primary" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField label="Email address" type="email" placeholder="you@company.com" error={errors.email?.message} required {...register('email')} />
            <TextField label="Password" type="password" placeholder="••••••••••" error={errors.password?.message} required {...register('password')} />

            <div className="flex items-center justify-between">
              <CheckboxField label="Remember me" {...register('rememberMe')} />
              <Link to="/forgot-password" className="text-sm font-medium text-accent hover:text-accent/80">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
              Sign in
            </Button>
          </form>

          <p className="text-center text-sm text-fg-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-accent hover:text-accent/80">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
