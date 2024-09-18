import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './frontend/src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5002,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    }
  }
});
