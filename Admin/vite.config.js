import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Added TailwindCSS here
  ],
  server: {
    port: 5174, // Runs the development server on port 5174
  },
})
