import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // Disable host checking entirely — required because Emergent's preview
    // ingress forwards via an internal cluster hostname that varies per env.
    allowedHosts: true,
    hmr: {
      clientPort: 443,
    },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  },
});
