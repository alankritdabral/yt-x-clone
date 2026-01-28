// TODO: Configure Vite for optimal development and production builds
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // TODO: Proxy API requests to backend in development
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
  build: {
    // TODO: Optimize chunk size and bundle
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'store': ['zustand'],
          'http': ['axios'],
        },
      },
    },
    // TODO: Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
});
