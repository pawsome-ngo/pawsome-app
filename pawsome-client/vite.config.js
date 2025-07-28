import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This 'define' block is the fix for the "global is not defined" error.
  define: {
    global: {},
  },
})
