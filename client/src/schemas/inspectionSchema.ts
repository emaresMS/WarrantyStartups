import { z } from 'zod'

export const siteDetailsSchema = z.object({
  designationId: z.string().min(1, 'Required'),
  jobNumber: z.string().min(1, 'Required'),
  date: z.string().min(1, 'Required'),
  commissioningCompany: z.string().min(1, 'Required'),
  commissioner: z.string().min(1, 'Required'),
  driveModelNumber: z.string().min(1, 'Required'),
  serialNumber: z.string().min(1, 'Required'),
  firmwareVersion: z.string().optional(),
  customerName: z.string().min(1, 'Required'),
  customerAddress: z.string().min(1, 'Required'),
  siteContactName: z.string().optional(),
  siteContactNumber: z.string().optional(),
  type: z.enum(['systems', 'standalone', 'other']),
})

export const equipmentNameplateSchema = z.object({
  motorVoltage: z.string().min(1, 'Required'),
  motorAmps: z.coerce.number().positive('Must be a positive number'),
  motorRpm: z.coerce.number().positive('Must be a positive number'),
  motorHp: z.coerce.number().positive('Must be a positive number'),
  motorManufacturer: z.string().min(1, 'Required'),
  insulationRatingCode: z.enum(['A', 'B', 'F', 'H'], {
    errorMap: () => ({ message: 'Select an insulation class' }),
  }),
})

export const electricalReadingsSchema = z.object({
  inputVoltageL1L2: z.coerce.number(),
  inputVoltageL1L3: z.coerce.number(),
  inputVoltageL2L3: z.coerce.number(),
  motorOhmL1Ground: z.coerce.number().optional(),
  motorOhmL2Ground: z.coerce.number().optional(),
  motorOhmL3Ground: z.coerce.number().optional(),
  motorOhmL1L2: z.coerce.number().optional(),
  motorOhmL1L3: z.coerce.number().optional(),
  motorOhmL2L3: z.coerce.number().optional(),
  outputCurrentT1: z.coerce.number().optional(),
  outputCurrentT2: z.coerce.number().optional(),
  outputCurrentT3: z.coerce.number().optional(),
  outputVoltageT1T2: z.coerce.number().optional(),
  outputVoltageT1T3: z.coerce.number().optional(),
  outputVoltageT2T3: z.coerce.number().optional(),
})

const enclosureCondition = z.enum(['normal', 'damaged', 'corroded'])
const torqueStatus = z.enum(['validated', 'not_validated'])

export const safetyCheckSchema = z.object({
  exteriorEnclosureCondition: enclosureCondition,
  interiorEnclosureCondition: enclosureCondition,
  vfdL1L2L3Torque: torqueStatus,
  vfdT1T2T3Torque: torqueStatus,
  highVoltageConnections: torqueStatus,
  controlWireConnections: z.enum(['verified_torqued', 'not_verified']),
  groundConnections: z.enum(['properly_grounded', 'not_grounded']),
  contactorConnections: torqueStatus,
  lineReactorConnections: torqueStatus,
  statusIndicatorLights: z.enum(['normal', 'fault', 'off']),
  location: z.enum(['interior_ac', 'interior_no_ac', 'exterior']),
  balancedOutputCurrent: z.enum(['balanced', 'unbalanced']),
  balancedOutputVoltage: z.enum(['balanced', 'unbalanced']),
})

export const loadTestingSchema = z.object({
  halfLoadOutputVoltageT1T2: z.coerce.number().optional(),
  halfLoadOutputVoltageT1T3: z.coerce.number().optional(),
  halfLoadOutputVoltageT2T3: z.coerce.number().optional(),
  halfLoadOutputCurrentT1: z.coerce.number().optional(),
  halfLoadOutputCurrentT2: z.coerce.number().optional(),
  halfLoadOutputCurrentT3: z.coerce.number().optional(),
  halfLoadMainsVoltage: z.coerce.number().optional(),
  halfLoadMainsCurrent: z.coerce.number().optional(),
  halfLoadDcBusVoltage: z.coerce.number().optional(),
  halfLoadOutputVoltageReading: z.coerce.number().optional(),
  halfLoadOutputCurrentReading: z.coerce.number().optional(),
  halfLoadThermalState: z.coerce.number().optional(),
  fullLoadOutputVoltageT1T2: z.coerce.number().optional(),
  fullLoadOutputVoltageT1T3: z.coerce.number().optional(),
  fullLoadOutputVoltageT2T3: z.coerce.number().optional(),
  fullLoadOutputCurrentT1: z.coerce.number().optional(),
  fullLoadOutputCurrentT2: z.coerce.number().optional(),
  fullLoadOutputCurrentT3: z.coerce.number().optional(),
  fullLoadMainsVoltage: z.coerce.number().optional(),
  fullLoadMainsCurrent: z.coerce.number().optional(),
  fullLoadDcBusVoltage: z.coerce.number().optional(),
  fullLoadOutputVoltageReading: z.coerce.number().optional(),
  fullLoadOutputCurrentReading: z.coerce.number().optional(),
  fullLoadThermalState: z.coerce.number().optional(),
})

export const signOffSchema = z.object({
  notes: z.string().optional(),
  commissionerSignature: z.string().min(1, 'Signature is required'),
  signedAt: z.string().min(1, 'Required'),
})

export const inspectionSchema = z.object({
  siteDetails: siteDetailsSchema,
  equipmentNameplate: equipmentNameplateSchema,
  electricalReadings: electricalReadingsSchema,
  safetyCheck: safetyCheckSchema,
  loadTesting: loadTestingSchema,
  signOff: signOffSchema,
})

export type InspectionFormValues = z.infer<typeof inspectionSchema>
export type SiteDetailsValues = z.infer<typeof siteDetailsSchema>
export type EquipmentNameplateValues = z.infer<typeof equipmentNameplateSchema>
export type ElectricalReadingsValues = z.infer<typeof electricalReadingsSchema>
export type SafetyCheckValues = z.infer<typeof safetyCheckSchema>
export type LoadTestingValues = z.infer<typeof loadTestingSchema>
export type SignOffValues = z.infer<typeof signOffSchema>
