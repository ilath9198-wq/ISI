import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#090D14',
        },
        accent: {
          DEFAULT: '#0052FF', // Electric Studio Blue
          hover: '#0041CC',
          light: '#EBF2FF',
          dark: '#0033A0',
        },
        ink: {
          DEFAULT: '#0D0F12',
          soft: '#1F242D',
          muted: '#626B7A',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        display: [
          'Clash Display',
          'Syne',
          'Inter',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        editorial: '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'editorial-hover': '0 30px 60px -15px rgba(0, 0, 0, 0.12)',
        card: '0 2px 10px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
