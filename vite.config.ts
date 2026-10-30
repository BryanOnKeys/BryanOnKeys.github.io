import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    react(),
    {
      name: 'development-csp',
      apply: 'serve',
      transformIndexHtml(html) {
        return html.replace(/<meta\s+http-equiv="Content-Security-Policy"[^>]+>/i, '');
      },
    },
  ],
  server: { host: '0.0.0.0', allowedHosts: true },
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        engineering: resolve(import.meta.dirname, 'engineering/index.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'three';
          if (id.includes('/node_modules/motion') || id.includes('/node_modules/framer-motion'))
            return 'motion';
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          )
            return 'react-vendor';
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
});
