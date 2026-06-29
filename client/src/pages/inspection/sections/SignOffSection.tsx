import { useFormContext, Controller } from 'react-hook-form'
import type { InspectionFormValues } from '@/schemas/inspectionSchema'
import { TextareaField, DateField, SignaturePad } from '@/components/form'

export function SignOffSection() {
  const { register, control, formState: { errors } } = useFormContext<InspectionFormValues>()
  const e = errors.signOff ?? {}

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 6 of 6</p>
        <h2 className="mt-1 text-2xl font-bold text-fg-primary">Sign-off</h2>
        <p className="mt-2 text-sm text-fg-secondary">
          Add any final notes and provide your signature to complete the commissioning report.
        </p>
      </div>

      <TextareaField
        label="Notes"
        placeholder="Add any additional observations, anomalies, or instructions for the site team..."
        helperText="Optional — include anything not covered in the sections above."
        {...register('signOff.notes')}
      />

      <DateField
        label="Sign-off Date"
        error={e.signedAt?.message}
        required
        {...register('signOff.signedAt')}
      />

      <Controller
        control={control}
        name="signOff.commissionerSignature"
        render={({ field }) => (
          <SignaturePad
            label="Commissioner Signature"
            value={field.value}
            onChange={field.onChange}
            error={e.commissionerSignature?.message}
            required
          />
        )}
      />
    </div>
  )
}
