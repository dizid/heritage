/**
 * Vite Configuration
 * Heritage Asia - Southeast Asian Heritage Travel Website
 *
 * Configuration includes:
 * - Vue 3 plugin for SFC support
 * - Tailwind CSS 4 integration via @tailwindcss/vite
 * - Path aliases for clean imports
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Register plugins
  plugins: [
    vue(),           // Vue 3 single file component support
    tailwindcss()    // Tailwind CSS 4 integration
  ],

  // Path resolution aliases for cleaner imports
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true
  },

  // Build optimization
  build: {
    target: 'esnext',
    minify: 'esbuild'
  }
})
