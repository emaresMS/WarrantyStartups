import { useFormContext } from 'react-hook-form'
import type { InspectionFormValues } from '@/schemas/inspectionSchema'
import { NumberField } from '@/components/form'

export function ElectricalReadingsSection() {
  const { register, formState: { errors } } = useFormContext<InspectionFormValues>()
  const e = errors.electricalReadings ?? {}

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 3 of 6</p>
        <h2 className="mt-1 text-2xl font-bold text-fg-primary">Electrical Readings</h2>
        <p className="mt-2 text-sm text-fg-secondary">
          Measure and record all voltage and resistance values with the drive de-energized unless noted.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-base font-semibold text-fg-primary">Input Voltage Values</h3>
        <div className="grid grid-cols-3 gap-4">
          {([
            ['L1 - Ground', 'motorOhmL1Ground'],
            ['L2 - Ground', 'motorOhmL2Ground'],
            ['L3 - Ground', 'motorOhmL3Ground'],
            ['L1-L2',       'motorOhmL1L2'    ],
            ['L1-L3',       'motorOhmL1L3'    ],
            ['L2-L3',       'motorOhmL2L3'    ],
          ] as const).map(([label, field]) => (
            <NumberField key={field} label={label} placeholder="0.0" unit="Ω" {...register(`electricalReadings.${field}`)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-base font-semibold text-fg-primary">Motor Ohm Values</h3>
        <div className="grid grid-cols-3 gap-4">
          {([
            ['L1 - Ground', 'inputVoltageL1Ground'],
            ['L2 - Ground', 'inputVoltageL2Ground'],
            ['L3 - Ground', 'inputVoltageL3Ground'],
            ['L1-L2',       'inputVoltageL1L2'    ],
            ['L1-L3',       'inputVoltageL1L3'    ],
            ['L2-L3',       'inputVoltageL2L3'    ],
          ] as const).map(([label, field]) => (
            <NumberField key={field} label={label} placeholder="0.0" unit="Ω" {...register(`electricalReadings.${field}`)} />
          ))}
        </div>
      </section>
    </div>
  )
}
