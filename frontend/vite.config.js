import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure this is the port you're using
    historyApiFallback: true, // This ensures Vite serves index.html for all routes
  },
})
