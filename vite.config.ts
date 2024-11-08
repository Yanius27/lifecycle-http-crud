import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'lifecycle-http-crud',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
