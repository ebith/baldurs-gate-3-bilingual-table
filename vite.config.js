import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), WindiCSS()],
  build: { rollupOptions: { output: { manualChunks: { table: ['src/table.json'] } } } },
})
