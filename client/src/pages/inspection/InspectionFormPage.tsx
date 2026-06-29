import { useParams } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { useInspectionForm, FORM_SECTIONS } from '@/hooks/useInspectionForm'
import { Button } from '@/components/ui/Button'
import { formatRelativeTime } from '@/utils/formatters'
import { cn } from '@/utils/cn'
import { SiteDetailsSection } from './sections/SiteDetailsSection'
import { EquipmentNameplateSection } from './sections/EquipmentNameplateSection'
import { ElectricalReadingsSection } from './sections/ElectricalReadingsSection'
import { SafetyCheckSection } from './sections/SafetyCheckSection'
import { LoadTestingSection } from './sections/LoadTestingSection'
import { SignOffSection } from './sections/SignOffSection'

const SECTION_COMPONENTS = {
  siteDetails:          SiteDetailsSection,
  equipmentNameplate:   EquipmentNameplateSection,
  electricalReadings:   ElectricalReadingsSection,
  safetyCheck:          SafetyCheckSection,
  loadTesting:          LoadTestingSection,
  signOff:              SignOffSection,
}

export function InspectionFormPage() {
  const { id } = useParams<{ id: string }>()
  const {
    form, activeSection, setActiveSection, sectionStates,
    activeSectionIndex, isFirstSection, isLastSection,
    goToNext, goToPrev, lastSavedAt, isSaving,
  } = useInspectionForm(id ? parseInt(id) : undefined)

  const ActiveSection = SECTION_COMPONENTS[activeSection]
  const completedCount = sectionStates.filter((s) => !s.hasError && s.id !== activeSection).length
  const pct = Math.round((completedCount / FORM_SECTIONS.length) * 100)

  return (
    <FormProvider {...form}>
      <div className="flex h-full flex-col">
        {/* Form top bar */}
        <div className="flex h-14 shrink-0 items-center gap-4 border-b border-border-subtle bg-surface-primary px-6">
          <div className="flex items-center gap-2 text-sm text-fg-muted">
            <span>Step {activeSectionIndex + 1} of {FORM_SECTIONS.length}</span>
            <span className="text-border-primary">—</span>
            <span className="font-medium text-fg-primary">
              {FORM_SECTIONS[activeSectionIndex].label}
            </span>
          </div>

          <div className="mx-4 h-1.5 flex-1 overflow-hidden rounded-full bg-border-subtle">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-mono text-xs font-semibold text-accent">{pct}%</span>

          <div className="ml-auto flex items-center gap-3">
            {lastSavedAt && !isSaving && (
              <span className="text-xs text-fg-muted">
                Saved {formatRelativeTime(lastSavedAt)}
              </span>
            )}
            {isSaving && <span className="text-xs text-fg-muted">Saving…</span>}
            <Button variant="secondary" size="sm">Save Draft</Button>
            <Button size="sm">Submit Report</Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Section sidebar */}
          <nav className="flex w-64 shrink-0 flex-col border-r border-border-subtle bg-surface-sidebar overflow-y-auto">
            <div className="p-4 pt-5">
              <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-fg-muted">
                Sections
              </p>
              <ul className="space-y-0.5">
                {sectionStates.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors',
                        section.isActive
                          ? 'bg-accent-light font-semibold text-accent'
                          : section.hasError
                          ? 'text-error hover:bg-surface-primary'
                          : 'text-fg-secondary hover:bg-surface-primary hover:text-fg-primary',
                      )}
                    >
                      <span
                        className={cn(
                          'h-2 w-2 shrink-0 rounded-full',
                          section.isActive ? 'bg-accent' : section.hasError ? 'bg-error' : 'bg-border-primary',
                        )}
                      />
                      <span className="flex-1 text-left">{section.label}</span>
                      <span className="font-mono text-[10px] text-fg-muted">
                        0/{section.fieldCount}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto border-t border-border-subtle p-4">
              <p className="mb-2 text-xs text-fg-muted">Overall Completion</p>
              <div className="h-1 overflow-hidden rounded-full bg-border-subtle">
                <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1.5 font-mono text-[11px] text-fg-secondary">
                {completedCount} / {FORM_SECTIONS.length} sections
              </p>
            </div>
          </nav>

          {/* Form content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-12 py-10">
              <ActiveSection />
            </div>

            {/* Step nav footer */}
            <div className="flex shrink-0 items-center gap-4 border-t border-border-subtle bg-surface-primary px-12 py-4">
              <Button variant="secondary" onClick={goToPrev} disabled={isFirstSection}>
                ← {!isFirstSection && FORM_SECTIONS[activeSectionIndex - 1].label}
              </Button>
              <div className="ml-auto">
                <Button onClick={goToNext} disabled={isLastSection}>
                  {!isLastSection && FORM_SECTIONS[activeSectionIndex + 1].label} →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
