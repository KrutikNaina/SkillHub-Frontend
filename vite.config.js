import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  base: './', // ✅ Important for production build

  build: {
    // ✅ Output build directly into backend's dist folder
    outDir: path.resolve(__dirname, '../skillhub-backend/dist'),
    emptyOutDir: true, // clears previous build
  },

  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
