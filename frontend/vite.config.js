import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Generate relative paths instead of absolute paths
  build: {
    minify: 'esbuild', // default setting
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
})

