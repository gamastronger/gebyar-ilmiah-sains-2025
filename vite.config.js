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
    allowedHosts: ['e17c-36-81-163-66.ngrok-free.app'],
  },
});
 