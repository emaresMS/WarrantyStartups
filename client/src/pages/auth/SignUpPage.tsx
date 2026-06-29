import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { signUpSchema, type SignUpFormValues } from '@/schemas/authSchema'
import { authService } from '@/services/authService'
import { redirectToOAuth } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/form/TextField'
import { CheckboxField } from '@/components/form/CheckboxField'

export function SignUpPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(values: SignUpFormValues) {
    await authService.signUp(values)
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
            Join thousands of<br />field engineers.
          </h1>
          <p className="text-base leading-relaxed text-fg-secondary">
            Set up your account in under 2 minutes. No credit card required.
          </p>
          <ol className="space-y-4">
            {['Create your account', 'Set up your first inspection', 'Start capturing in the field'].map(
              (step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm text-fg-secondary">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent bg-accent-light font-mono text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ),
            )}
          </ol>
        </div>
        <p className="text-xs text-fg-muted">© 2026 WarrantyField. All rights reserved.</p>
      </div>

      {/* Auth panel */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto bg-surface-secondary p-6">
        <div className="w-full max-w-[480px] space-y-7 rounded-2xl border border-border-subtle bg-surface-primary p-10 shadow-modal">
          <div>
            <h2 className="text-2xl font-bold text-fg-primary">Create your account</h2>
            <p className="mt-1 text-sm text-fg-secondary">Start your free WarrantyField account today</p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="md" className="w-full" onClick={() => redirectToOAuth('google')}>
              <span className="flex h-4 w-4 items-center justify-center rounded bg-[#EA4335] text-[9px] text-white font-bold">G</span>
              Google
            </Button>
            <Button variant="secondary" size="md" className="w-full" onClick={() => redirectToOAuth('microsoft')}>
              <span className="flex h-4 w-4 items-center justify-center rounded bg-[#00A4EF] text-[9px] text-white font-bold">M</span>
              Microsoft
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border-primary" />
            <span className="text-xs text-fg-muted">or sign up with email</span>
            <div className="h-px flex-1 bg-border-primary" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <TextField label="First name" placeholder="Jane" error={errors.firstName?.message} required {...register('firstName')} />
              <TextField label="Last name" placeholder="Smith" error={errors.lastName?.message} required {...register('lastName')} />
            </div>
            <TextField label="Work email" type="email" placeholder="you@company.com" error={errors.email?.message} required {...register('email')} />
            <TextField label="Password" type="password" placeholder="Min. 8 characters" error={errors.password?.message} required {...register('password')} />
            <TextField label="Confirm password" type="password" placeholder="Repeat password" error={errors.confirmPassword?.message} required {...register('confirmPassword')} />

            <CheckboxField
              label={
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-accent hover:text-accent/80">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-accent hover:text-accent/80">Privacy Policy</Link>
                </span>
              }
              error={errors.acceptTerms?.message}
              {...register('acceptTerms')}
            />

            <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
              Create account
            </Button>
          </form>

          <p className="text-center text-sm text-fg-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-accent hover:text-accent/80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
