import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
  build: {
    outDir: "dist", 
  },
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  chunkSizeWarningLimit: 1000, 
  },
})
