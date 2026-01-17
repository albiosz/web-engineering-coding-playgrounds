import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Generate relative paths instead of absolute paths
  build: {
    minify: 'esbuild', // default setting
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})

