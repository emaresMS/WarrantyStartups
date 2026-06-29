import type { LocalInspection } from '@/lib/db'

const API_URL = import.meta.env.VITE_API_URL as string

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem('wf_access_token')
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const inspectionService = {
  list() {
    return request<LocalInspection[]>('/api/v1/inspections')
  },

  get(id: string) {
    return request<LocalInspection>(`/api/v1/inspections/${id}`)
  },

  create(data: Omit<LocalInspection, 'id'>) {
    return request<LocalInspection>('/api/v1/inspections', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update(id: string, data: Partial<LocalInspection>) {
    return request<LocalInspection>(`/api/v1/inspections/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  submit(id: string) {
    return request<LocalInspection>(`/api/v1/inspections/${id}/submit`, {
      method: 'POST',
    })
  },
}
