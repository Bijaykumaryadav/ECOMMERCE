import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    build: {
    outDir: "dist", // This is the default, change if needed
  },
  chunkSizeWarningLimit: 1000, // Adjust this value to avoid chunk size warnings
  },
})
