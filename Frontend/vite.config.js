import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      "/users": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/category": {
        target: "http://localhost:3001",
        changeOrigin: true,
      }
    }
  }
})
