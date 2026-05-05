import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Same-origin API in dev so auth cookies work reliably (5173 → backend 5000)
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
})
