/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand
        primary: {
          50:  '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe',
          300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6',
          600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
        },
        // Semantic — map to light/dark in theme/colors.ts
        background: 'var(--color-background)',
        surface:    'var(--color-surface)',
        border:     'var(--color-border)',
        muted:      'var(--color-muted)',
      },
      fontFamily: {
        sans:   ['Inter-Regular',    'sans-serif'],
        medium: ['Inter-Medium',     'sans-serif'],
        bold:   ['Inter-Bold',       'sans-serif'],
        light:  ['Inter-Light',      'sans-serif'],
      },
      spacing: {
        xs: '4px', sm: '8px', md: '16px',
        lg: '24px', xl: '32px', '2xl': '48px',
      },
      borderRadius: {
        sm: '4px', md: '8px', lg: '12px',
        xl: '16px', '2xl': '24px', full: '9999px',
      },
    },
  },
  plugins: [],
};
