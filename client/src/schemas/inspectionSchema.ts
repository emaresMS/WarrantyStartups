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
  type: z.enum(['Compact', 'MCC', 'MCE', 'Systems', 'Wall Mount']),
  manualOperation: z.enum(['Normal', 'Not Ready']),
  remoteOperation: z.enum(['Normal', 'Not Ready']),
  COMOperation: z.enum(['No COM', 'Normal', 'Not Ready']),
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
  inputVoltageL1Ground: z.coerce.number().optional(),
  inputVoltageL2Ground: z.coerce.number().optional(),
  inputVoltageL3Ground: z.coerce.number().optional(),
  motorOhmL1Ground: z.coerce.number().optional(),
  motorOhmL2Ground: z.coerce.number().optional(),
  motorOhmL3Ground: z.coerce.number().optional(),
  motorOhmL1L2: z.coerce.number().optional(),
  motorOhmL1L3: z.coerce.number().optional(),
  motorOhmL2L3: z.coerce.number().optional()
})

const enclosureCondition = z.enum(['Normal', 'Dents', 'Scratches', 'Scratches and Dents'])
const torqueStatus = z.enum(['Found Loose - Damaged', 'Found Loose - Torqued', 'Torque Validated'])

export const safetyCheckSchema = z.object({
  exteriorEnclosureCondition: enclosureCondition,
  interiorEnclosureCondition: enclosureCondition,
  breakerMNFuseType: z.string().min(1, 'Required'),
  vfdL1L2L3Torque: torqueStatus,
  vfdT1T2T3Torque: torqueStatus,
  highVoltageConnections: torqueStatus,
  controlWireConnections: z.enum(['Verified - Torqued', 'Found Loose - Torqued', 'Wiring Error - Resolved']),
  groundConnections: z.enum(['Properly Grounded', 'Not Properly Grounded']),
  inputReferenceMethod: z.enum(['0-10V (Al1)', '0-10V (Al2)', '0-10V (Al3)', '4-20mA (Al1)', '4-20mA (Al2)', '4-20mA (Al3)', 'COM']),
  outputReferenceMethod: z.enum(['0-10V (AQ1)', '0-10V (AQ2)', '0-10V (AQ3)', '4-20mA (AQ1)', '4-20mA (AQ2)', '4-20mA (AQ3)', 'COM']),
  COMProtocolAndAddress: z.enum(['CANopen', 'DeviceNet', 'EtherCAT', 'EtherNet/IP', 'Modbus TCP', 'Not Applicable', 'PROFINET']),
  contactorConnections: z.enum(['Found Loose - Damaged', 'Found Loose - Torqued', 'No Contactors', 'Torque Validated']),
  lineReactorConnections: torqueStatus,
  statusIndicatorLights: z.enum(['AUTO LED Defective', 'FAULT LED Defective', 'LED Lights Normal', 'POWER LED Defective', 'RUN LED Defective']),
  location: z.enum(['Exterior - Covered', 'Exterior - Direct Sun Exposure', 'Exterior - Enclosed A/C', 'Exterior - No A/C', 'Interior - A/C', 'Interior - No A/C']),
  balancedOutputCurrent: z.enum(['Balanced', 'Suspect Motor', 'VFD Output Issue']),
  balancedOutputVoltage: z.enum(['Balanced', 'Not Balanced']),
  powerSupplyVoltages: z.enum(['Normal Via SoMove Test', 'Defective Via SoMove Test']),
  DCBusVoltage: z.enum(['Defective (In x 1.414)', 'Normal (In x 1.414)']),
  RFIFilterStatus: z.enum(['RFI Filter Enabled', 'RFI Filter Disabled'])
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
