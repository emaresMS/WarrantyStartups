const API_URL = import.meta.env.VITE_API_URL as string

export const OAUTH_PROVIDERS = {
  google: {
    name: 'Google',
    authUrl: `${API_URL}/api/v1/auth/google`,
  },
  microsoft: {
    name: 'Microsoft',
    authUrl: `${API_URL}/api/v1/auth/microsoft`,
  },
} as const

export type OAuthProvider = keyof typeof OAUTH_PROVIDERS

export function redirectToOAuth(provider: OAuthProvider) {
  window.location.href = OAUTH_PROVIDERS[provider].authUrl
}

export function getStoredToken(): string | null {
  return localStorage.getItem('wf_access_token')
}

export function setStoredToken(token: string) {
  localStorage.setItem('wf_access_token', token)
}

export function clearStoredToken() {
  localStorage.removeItem('wf_access_token')
}
