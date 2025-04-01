/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontSize: {
        base: '1.125rem',
        sm: '0.9375rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '1.875rem',
      },
      colors: {
        'dropdown-bg': {
          DEFAULT: '#FFFFFF',
          dark: '#1f2937',
        },
        primary: {
          DEFAULT: '#14b8a6', // Teal for primary actions
          dark: '#0f766e',
        },
        secondary: {
          DEFAULT: '#6b7280', // Blue for secondary actions
          dark: '#1d4ed8',
        },
        accent: {
          DEFAULT: '#8b5cf6', // Purple for sidebar active button
          dark: '#6d28d9',
        },
        destructive: {
          DEFAULT: '#ef4444', // Red for delete buttons
          dark: '#b91c1c',
        },
        success: {
          DEFAULT: '#22c55e', // Green for edit buttons
          dark: '#15803d',
        },
        card: {
          DEFAULT: '#f9fafb', // Green for edit buttons
        },
        border: {
          DEFAULT: '#ffffff', // Green for edit buttons
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};