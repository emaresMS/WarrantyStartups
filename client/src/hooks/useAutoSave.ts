import { useEffect, useRef, useState } from 'react'

interface UseAutoSaveOptions<T> {
  data: T
  onSave: (data: T) => Promise<void>
  debounceMs?: number
}

export function useAutoSave<T>({ data, onSave, debounceMs = 2000 }: UseAutoSaveOptions<T>) {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onSaveRef = useRef(onSave)
  onSaveRef.current = onSave

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      setIsSaving(true)
      try {
        await onSaveRef.current(data)
        setLastSavedAt(new Date())
      } finally {
        setIsSaving(false)
      }
    }, debounceMs)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [data, debounceMs])

  return { lastSavedAt, isSaving }
}
