import type { LoginFormValues, SignUpFormValues } from '@/schemas/authSchema'
import { setStoredToken, clearStoredToken } from '@/lib/auth'

const API_URL = import.meta.env.VITE_API_URL as string

interface AuthResponse {
  accessToken: string
  user: { id: string; email: string; firstName: string; lastName: string }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const authService = {
  async login(values: LoginFormValues): Promise<AuthResponse> {
    const data = await post<AuthResponse>('/api/v1/auth/login', values)
    setStoredToken(data.accessToken)
    return data
  },

  async signUp(values: SignUpFormValues): Promise<AuthResponse> {
    const data = await post<AuthResponse>('/api/v1/auth/register', values)
    setStoredToken(data.accessToken)
    return data
  },

  logout() {
    clearStoredToken()
    window.location.href = '/login'
  },
}
