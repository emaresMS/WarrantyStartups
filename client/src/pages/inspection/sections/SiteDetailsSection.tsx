import { useFormContext } from 'react-hook-form'
import type { InspectionFormValues } from '@/schemas/inspectionSchema'
import { TextField, DateField, SelectField } from '@/components/form'

export function SiteDetailsSection() {
  const { register, formState: { errors } } = useFormContext<InspectionFormValues>()
  const e = errors.siteDetails ?? {}

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 1 of 6</p>
        <h2 className="mt-1 text-2xl font-bold text-fg-primary">Site Details</h2>
        <p className="mt-2 text-sm text-fg-secondary">
          Enter the job and site identification information exactly as it appears on the work order.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <TextField label="Designation ID" placeholder="e.g. Pump 3" error={e.designationId?.message} required {...register('siteDetails.designationId')} />
        <DateField label="Date" error={e.date?.message} required {...register('siteDetails.date')} />
        <TextField label="Job #" placeholder="e.g. WF-2026-001" error={e.jobNumber?.message} required {...register('siteDetails.jobNumber')} />
        <SelectField
          label="Type"
          options={[{ value: 'systems', label: 'Systems' }, { value: 'standalone', label: 'Standalone' }, { value: 'other', label: 'Other' }]}
          placeholder="Select type..."
          error={e.type?.message}
          required
          {...register('siteDetails.type')}
        />
        <TextField label="Commissioning Company" placeholder="Company name" error={e.commissioningCompany?.message} required {...register('siteDetails.commissioningCompany')} />
        <TextField label="Commissioner" placeholder="Full name" error={e.commissioner?.message} required {...register('siteDetails.commissioner')} />
        <TextField label="Drive Model #" placeholder="e.g. ATV630D11N4" error={e.driveModelNumber?.message} required {...register('siteDetails.driveModelNumber')} />
        <TextField label="Serial Number" placeholder="Drive serial number" error={e.serialNumber?.message} required {...register('siteDetails.serialNumber')} />
        <TextField label="Firmware Version" placeholder="e.g. V3.1 IE56" {...register('siteDetails.firmwareVersion')} />
        <SelectField
          label="Manual Operation"
          options={[{ value: 'Normal', label: 'Normal' }, { value: 'Not Ready', label: 'Not Ready' }]}
          placeholder="Select status..."
          error={e.manualOperation?.message}
          required
          {...register('siteDetails.manualOperation')}
        />
        <SelectField
          label="Remote Operation"
          options={[{ value: 'Normal', label: 'Normal' }, { value: 'Not Ready', label: 'Not Ready' }]}
          placeholder="Select status..."
          error={e.remoteOperation?.message}
          required
          {...register('siteDetails.remoteOperation')}
        />
        <SelectField
          label="COM Operation"
          options={[{ value: 'No COM', label: 'No COM' }, { value: 'Normal', label: 'Normal' }, { value: 'Not Ready', label: 'Not Ready' }]}
          placeholder="Select status..."
          error={e.COMOperation?.message}
          required
          {...register('siteDetails.COMOperation')}
        />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <TextField label="Customer and Location Name" placeholder="Customer name and site" error={e.customerName?.message} required {...register('siteDetails.customerName')} />
        <TextField label="Customer Physical Address" placeholder="Full address" error={e.customerAddress?.message} required {...register('siteDetails.customerAddress')} />
        <div className="grid grid-cols-2 gap-5">
          <TextField label="Site Contact Name" placeholder="On-site contact" {...register('siteDetails.siteContactName')} />
          <TextField label="Site Contact Number" placeholder="Phone number" type="tel" {...register('siteDetails.siteContactNumber')} />
        </div>
      </div>
    </div>
  )
}
