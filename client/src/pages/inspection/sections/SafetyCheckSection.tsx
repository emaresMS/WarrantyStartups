import { useFormContext, Controller } from 'react-hook-form'
import type { InspectionFormValues } from '@/schemas/inspectionSchema'
import { RadioField, SelectField, TextField } from '@/components/form'

const CONDITION_OPTS = [
  { value: 'normal',   label: 'Normal'   },
  { value: 'damaged',  label: 'Damaged'  },
  { value: 'corroded', label: 'Corroded' },
]

const TORQUE_OPTS = [
  { value: 'validated',     label: 'Torque Validated' },
  { value: 'not_validated', label: 'Not Validated'    },
]

const CONTACTOR_OPTS = [
  { value: 'Found Loose - Damaged', label: 'Found Loose - Damaged' },
  { value: 'Found Loose - Torqued', label: 'Found Loose - Torqued' },
  { value: 'No Contactors',         label: 'No Contactors'         },
  { value: 'Torque Validated',      label: 'Torque Validated'      },
]

const LINE_REACTOR_OPTS = [
  { value: 'Found Loose - Damaged', label: 'Found Loose - Damaged' },
  { value: 'Found Loose - Torqued', label: 'Found Loose - Torqued' },
  { value: 'Torque Validated',      label: 'Torque Validated'      },
]

const POWER_SUPPLY_OPTS = [
  { value: 'Normal Via SoMove Test',    label: 'Normal Via SoMove Test'    },
  { value: 'Defective Via SoMove Test', label: 'Defective Via SoMove Test' },
]

const DC_BUS_VOLTAGE_OPTS = [
  { value: 'Normal (In x 1.414)',    label: 'Normal (In x 1.414)'    },
  { value: 'Defective (In x 1.414)', label: 'Defective (In x 1.414)' },
]

const STATUS_INDICATOR_OPTS = [
  { value: 'normal', label: 'Normal' },
  { value: 'fault',  label: 'Fault'  },
  { value: 'off',    label: 'Off'    },
]

const LOCATION_OPTS = [
  { value: 'interior_ac',    label: 'Interior – A/C'    },
  { value: 'interior_no_ac', label: 'Interior – No A/C' },
  { value: 'exterior',       label: 'Exterior'          },
]

const BALANCED_CURRENT_OPTS = [
  { value: 'balanced',   label: 'Balanced'   },
  { value: 'unbalanced', label: 'Unbalanced' },
]

const BALANCED_VOLTAGE_OPTS = [
  { value: 'balanced',   label: 'Balanced'   },
  { value: 'unbalanced', label: 'Unbalanced' },
]

const RFI_FILTER_OPTS = [
  { value: 'RFI Filter Enabled',  label: 'RFI Filter Enabled'  },
  { value: 'RFI Filter Disabled', label: 'RFI Filter Disabled' },
]

const INPUT_REFERENCE_OPTS = [
  { value: '0-10V (Al1)',  label: '0-10V (Al1)'  },
  { value: '0-10V (Al2)',  label: '0-10V (Al2)'  },
  { value: '0-10V (Al3)',  label: '0-10V (Al3)'  },
  { value: '4-20mA (Al1)', label: '4-20mA (Al1)' },
  { value: '4-20mA (Al2)', label: '4-20mA (Al2)' },
  { value: '4-20mA (Al3)', label: '4-20mA (Al3)' },
  { value: 'COM',          label: 'COM'          },
]

const OUTPUT_REFERENCE_OPTS = [
  { value: '0-10V (AQ1)',  label: '0-10V (AQ1)'  },
  { value: '0-10V (AQ2)',  label: '0-10V (AQ2)'  },
  { value: '0-10V (AQ3)',  label: '0-10V (AQ3)'  },
  { value: '4-20mA (AQ1)', label: '4-20mA (AQ1)' },
  { value: '4-20mA (AQ2)', label: '4-20mA (AQ2)' },
  { value: '4-20mA (AQ3)', label: '4-20mA (AQ3)' },
  { value: 'COM',          label: 'COM'          },
]

const COM_PROTOCOL_OPTS = [
  { value: 'CANopen',      label: 'CANopen'      },
  { value: 'DeviceNet',    label: 'DeviceNet'    },
  { value: 'EtherCAT',     label: 'EtherCAT'     },
  { value: 'EtherNet/IP',  label: 'EtherNet/IP'  },
  { value: 'Modbus TCP',   label: 'Modbus TCP'   },
  { value: 'Not Applicable', label: 'Not Applicable' },
  { value: 'PROFINET',    label: 'PROFINET'    },
]

export function SafetyCheckSection() {
  const { control, register, formState: { errors } } = useFormContext<InspectionFormValues>()
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
          ['Contactor Connections',         'contactorConnections',        CONTACTOR_OPTS    ],
          ['Line Reactor Connections',      'lineReactorConnections',      LINE_REACTOR_OPTS ],
          ['Power Supply Voltages',         'powerSupplyVoltages',         POWER_SUPPLY_OPTS ],
          ['DC Bus Voltage',                'DCBusVoltage',                DC_BUS_VOLTAGE_OPTS],
          ['RFI Filter Status',             'RFIFilterStatus',             RFI_FILTER_OPTS   ],
          ['Status Indicator Lights',       'statusIndicatorLights',       STATUS_INDICATOR_OPTS],
          ['Location',                      'location',                    LOCATION_OPTS     ],
          ['Balanced Output Current',       'balancedOutputCurrent',       BALANCED_CURRENT_OPTS],
          ['Balanced Output Voltage',       'balancedOutputVoltage',       BALANCED_VOLTAGE_OPTS],
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

        <TextField
          label="Breaker/MN Fuse Type"
          placeholder="e.g. Class J, 30A"
          error={e.breakerMNFuseType?.message}
          required
          {...register('safetyCheck.breakerMNFuseType')}
        />
        <SelectField
          label="Input Reference Method"
          options={INPUT_REFERENCE_OPTS}
          placeholder="Select method..."
          error={e.inputReferenceMethod?.message}
          required
          {...register('safetyCheck.inputReferenceMethod')}
        />
        <SelectField
          label="Output Reference Method"
          options={OUTPUT_REFERENCE_OPTS}
          placeholder="Select method..."
          error={e.outputReferenceMethod?.message}
          required
          {...register('safetyCheck.outputReferenceMethod')}
        />
        <SelectField
          label="COM Protocol and Address"
          options={COM_PROTOCOL_OPTS}
          placeholder="Select protocol..."
          error={e.COMProtocolAndAddress?.message}
          required
          {...register('safetyCheck.COMProtocolAndAddress')}
        />
      </div>
    </div>
  )
}
