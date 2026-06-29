import { useFormContext } from 'react-hook-form'
import type { InspectionFormValues } from '@/schemas/inspectionSchema'
import { TextField, NumberField, SelectField } from '@/components/form'

const INSULATION_OPTIONS = [
  { value: 'A', label: 'Class A (105°C)' },
  { value: 'B', label: 'Class B (130°C)' },
  { value: 'F', label: 'Class F (155°C)' },
  { value: 'H', label: 'Class H (180°C)' },
]

export function EquipmentNameplateSection() {
  const { register, formState: { errors } } = useFormContext<InspectionFormValues>()
  const e = errors.equipmentNameplate ?? {}

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 2 of 6</p>
        <h2 className="mt-1 text-2xl font-bold text-fg-primary">Equipment Nameplate</h2>
        <p className="mt-2 text-sm text-fg-secondary">
          Record the motor nameplate data exactly as printed on the equipment label.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <TextField label="Motor Voltage" placeholder="e.g. 460V" error={e.motorVoltage?.message} required {...register('equipmentNameplate.motorVoltage')} />
        <NumberField label="Motor Amps (FLA)" placeholder="0.0" unit="A" error={e.motorAmps?.message} required {...register('equipmentNameplate.motorAmps')} />
        <NumberField label="Motor RPM" placeholder="0" error={e.motorRpm?.message} required {...register('equipmentNameplate.motorRpm')} />
        <NumberField label="Motor HP" placeholder="0" unit="HP" error={e.motorHp?.message} required {...register('equipmentNameplate.motorHp')} />
        <TextField label="Motor Manufacturer" placeholder="e.g. WEG" error={e.motorManufacturer?.message} required {...register('equipmentNameplate.motorManufacturer')} />
        <SelectField
          label="Insulation Rating Code"
          options={INSULATION_OPTIONS}
          placeholder="Select class..."
          error={e.insulationRatingCode?.message}
          required
          {...register('equipmentNameplate.insulationRatingCode')}
        />
      </div>
    </div>
  )
}
