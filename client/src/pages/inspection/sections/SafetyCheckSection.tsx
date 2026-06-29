import { useFormContext, Controller } from 'react-hook-form'
import type { InspectionFormValues } from '@/schemas/inspectionSchema'
import { RadioField } from '@/components/form'

const CONDITION_OPTS = [
  { value: 'normal',   label: 'Normal'   },
  { value: 'damaged',  label: 'Damaged'  },
  { value: 'corroded', label: 'Corroded' },
]

const TORQUE_OPTS = [
  { value: 'validated',     label: 'Torque Validated' },
  { value: 'not_validated', label: 'Not Validated'    },
]

export function SafetyCheckSection() {
  const { control, formState: { errors } } = useFormContext<InspectionFormValues>()
  const e = errors.safetyCheck ?? {}

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 4 of 6</p>
        <h2 className="mt-1 text-2xl font-bold text-fg-primary">Safety Check</h2>
        <p className="mt-2 text-sm text-fg-secondary">
          Visually inspect and verify all mechanical and electrical connections before energizing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {([
          ['Exterior Enclosure Condition', 'exteriorEnclosureCondition', CONDITION_OPTS],
          ['Interior Enclosure Condition', 'interiorEnclosureCondition', CONDITION_OPTS],
          ['VFD L1, L2, L3 Torque',       'vfdL1L2L3Torque',           TORQUE_OPTS   ],
          ['VFD T1, T2, T3 Torque',        'vfdT1T2T3Torque',           TORQUE_OPTS   ],
          ['High Voltage Connections',      'highVoltageConnections',     TORQUE_OPTS   ],
          ['Contactor Connections',         'contactorConnections',        TORQUE_OPTS   ],
          ['Line Reactor Connections',      'lineReactorConnections',      TORQUE_OPTS   ],
        ] as const).map(([label, field, opts]) => (
          <Controller
            key={field}
            control={control}
            name={`safetyCheck.${field}`}
            render={({ field: f }) => (
              <RadioField
                label={label}
                name={f.name}
                options={opts as { value: string; label: string }[]}
                value={f.value}
                onChange={f.onChange}
                error={e[field]?.message}
                required
              />
            )}
          />
        ))}

        <Controller
          control={control}
          name="safetyCheck.controlWireConnections"
          render={({ field: f }) => (
            <RadioField
              label="Control Wire Connections"
              name={f.name}
              options={[{ value: 'verified_torqued', label: 'Verified – Torqued' }, { value: 'not_verified', label: 'Not Verified' }]}
              value={f.value}
              onChange={f.onChange}
              error={e.controlWireConnections?.message}
              required
            />
          )}
        />
        <Controller
          control={control}
          name="safetyCheck.groundConnections"
          render={({ field: f }) => (
            <RadioField
              label="Ground Connections"
              name={f.name}
              options={[{ value: 'properly_grounded', label: 'Properly Grounded' }, { value: 'not_grounded', label: 'Not Grounded' }]}
              value={f.value}
              onChange={f.onChange}
              error={e.groundConnections?.message}
              required
            />
          )}
        />
      </div>
    </div>
  )
}
