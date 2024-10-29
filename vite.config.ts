import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  root: './frontend/src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: Number(process.env.PORT) || 5000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:5001',
        ws: true,
        changeOrigin: true,
      },
    },
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
