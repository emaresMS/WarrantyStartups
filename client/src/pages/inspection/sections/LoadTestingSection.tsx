import { useFormContext } from 'react-hook-form'
import type { InspectionFormValues } from '@/schemas/inspectionSchema'
import { NumberField } from '@/components/form'

const HALF_LOAD_FIELDS = [
  ['Output Voltage T1-T2', 'halfLoadOutputVoltageT1T2', 'V'],
  ['Output Voltage T1-T3', 'halfLoadOutputVoltageT1T3', 'V'],
  ['Output Voltage T2-T3', 'halfLoadOutputVoltageT2T3', 'V'],
  ['Output Current T1',    'halfLoadOutputCurrentT1',   'A'],
  ['Output Current T2',    'halfLoadOutputCurrentT2',   'A'],
  ['Output Current T3',    'halfLoadOutputCurrentT3',   'A'],
  ['Mains Voltage',        'halfLoadMainsVoltage',      'V'],
  ['Mains Current',        'halfLoadMainsCurrent',      'A'],
  ['DC Bus Voltage',       'halfLoadDcBusVoltage',      'V'],
  ['Output Voltage',       'halfLoadOutputVoltageReading', 'V'],
  ['Output Current',       'halfLoadOutputCurrentReading', 'A'],
  ['Thermal State',        'halfLoadThermalState',      '%'],
] as const

const FULL_LOAD_FIELDS = [
  ['Output Voltage T1-T2', 'fullLoadOutputVoltageT1T2', 'V'],
  ['Output Voltage T1-T3', 'fullLoadOutputVoltageT1T3', 'V'],
  ['Output Voltage T2-T3', 'fullLoadOutputVoltageT2T3', 'V'],
  ['Output Current T1',    'fullLoadOutputCurrentT1',   'A'],
  ['Output Current T2',    'fullLoadOutputCurrentT2',   'A'],
  ['Output Current T3',    'fullLoadOutputCurrentT3',   'A'],
  ['Mains Voltage',        'fullLoadMainsVoltage',      'V'],
  ['Mains Current',        'fullLoadMainsCurrent',      'A'],
  ['DC Bus Voltage',       'fullLoadDcBusVoltage',      'V'],
  ['Output Voltage',       'fullLoadOutputVoltageReading', 'V'],
  ['Output Current',       'fullLoadOutputCurrentReading', 'A'],
  ['Thermal State',        'fullLoadThermalState',      '%'],
] as const

export function LoadTestingSection() {
  const { register } = useFormContext<InspectionFormValues>()

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 5 of 6</p>
        <h2 className="mt-1 text-2xl font-bold text-fg-primary">Load Testing</h2>
        <p className="mt-2 text-sm text-fg-secondary">
          Record readings at both half load and full load conditions.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="flex items-center gap-3 text-base font-semibold text-fg-primary">
          Readings at Half Load
          <span className="rounded-full bg-accent-light px-2 py-0.5 font-mono text-xs text-accent">~50%</span>
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {HALF_LOAD_FIELDS.map(([label, field, unit]) => (
            <NumberField key={field} label={label} placeholder="0.0" unit={unit} {...register(`loadTesting.${field}`)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="flex items-center gap-3 text-base font-semibold text-fg-primary">
          Readings at Full Load
          <span className="rounded-full bg-accent-light px-2 py-0.5 font-mono text-xs text-accent">100%</span>
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {FULL_LOAD_FIELDS.map(([label, field, unit]) => (
            <NumberField key={field} label={label} placeholder="0.0" unit={unit} {...register(`loadTesting.${field}`)} />
          ))}
        </div>
      </section>
    </div>
  )
}
