import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inspectionSchema, type InspectionFormValues } from '@/schemas/inspectionSchema'
import { useAutoSave } from './useAutoSave'
import { db } from '@/lib/db'

export const FORM_SECTIONS = [
  { id: 'siteDetails',          label: 'Site Details',           fieldCount: 15 },
  { id: 'equipmentNameplate',   label: 'Equipment Nameplate',    fieldCount: 6  },
  { id: 'electricalReadings',   label: 'Electrical Readings',    fieldCount: 12 },
  { id: 'safetyCheck',          label: 'Safety Check',           fieldCount: 20 },
  { id: 'loadTesting',          label: 'Load Testing',           fieldCount: 24 },
  { id: 'signOff',              label: 'Sign-off',               fieldCount: 3  },
] as const

export type SectionId = (typeof FORM_SECTIONS)[number]['id']

export function useInspectionForm(inspectionId?: number) {
  const [activeSection, setActiveSection] = useState<SectionId>('siteDetails')

  const form = useForm<InspectionFormValues>({
    resolver: zodResolver(inspectionSchema),
    mode: 'onBlur',
    defaultValues: {
      siteDetails: {},
      equipmentNameplate: {},
      electricalReadings: {},
      safetyCheck: {},
      loadTesting: {},
      signOff: {},
    } as InspectionFormValues,
  })

  const { lastSavedAt, isSaving } = useAutoSave({
    data: form.watch(),
    onSave: async (data) => {
      if (!inspectionId) return
      await db.inspections.update(inspectionId, {
        formData: data,
        updatedAt: new Date().toISOString(),
      })
    },
  })

  const activeSectionIndex = FORM_SECTIONS.findIndex((s) => s.id === activeSection)
  const isFirstSection = activeSectionIndex === 0
  const isLastSection = activeSectionIndex === FORM_SECTIONS.length - 1

  function goToNext() {
    if (!isLastSection) setActiveSection(FORM_SECTIONS[activeSectionIndex + 1].id)
  }

  function goToPrev() {
    if (!isFirstSection) setActiveSection(FORM_SECTIONS[activeSectionIndex - 1].id)
  }

  const errors = form.formState.errors

  const sectionStates = FORM_SECTIONS.map((section) => ({
    ...section,
    isActive: section.id === activeSection,
    hasError: !!errors[section.id as keyof typeof errors],
  }))

  return {
    form,
    activeSection,
    setActiveSection,
    sectionStates,
    activeSectionIndex,
    isFirstSection,
    isLastSection,
    goToNext,
    goToPrev,
    lastSavedAt,
    isSaving,
  }
}
