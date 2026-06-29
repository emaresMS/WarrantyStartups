import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#22C55E',
        'accent-light': '#14532D',
        fg: {
          primary: '#FAFAFA',
          secondary: '#A3A3A3',
          muted: '#525252',
        },
        surface: {
          primary: '#141414',
          secondary: '#0A0A0A',
        },
        border: {
          subtle: '#1C1C1C',
          primary: '#2E2E2E',
        },
        error: '#EF4444',
        warning: '#F59E0B',
        'warning-light': '#292400',
        success: '#22C55E',
        'success-light': '#14532D',
      },
      boxShadow: {
        modal: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'accent-glow': '0 0 20px rgba(74, 222, 128, 0.25)',
        card: '0 1px 3px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config
