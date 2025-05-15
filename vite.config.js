import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    host: true, // <- penting untuk akses via IP/ngrok
    historyApiFallback: true,
    allowedHosts: ['c76e-36-82-76-124.ngrok-free.app'],
  },
});
 