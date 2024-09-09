import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 5173, // You can change this port if desired
  },
  build: {
    outDir: 'dist',
  },
});