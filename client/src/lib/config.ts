interface AppConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  apiUrl: string
}

function loadConfig(): AppConfig {
  const required = {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    apiUrl: import.meta.env.VITE_API_URL,
  }

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        'Copy client/.env.example to client/.env and fill in the values.',
    )
  }

  return required as AppConfig
}

export const config: AppConfig = loadConfig()
