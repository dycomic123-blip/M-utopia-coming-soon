import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3002,
    host: '127.0.0.1',
    open: true,
    strictPort: true
  },
  preview: {
    port: 3002,
    host: '127.0.0.1',
    strictPort: true
  }
})
