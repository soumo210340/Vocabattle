import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    onListening: () => {
      console.log('\x1b[36m%s\x1b[0m', '=== Frontend Development Server ===');
      console.log('\x1b[32m%s\x1b[0m', '✓ Server is running at: http://localhost:3000');
      console.log('\x1b[33m%s\x1b[0m', '⚡ Environment: Development');
      console.log('\x1b[35m%s\x1b[0m', '📝 Project: VocaBattle Frontend');
      console.log('\x1b[34m%s\x1b[0m', '🔄 Hot Module Replacement (HMR) is active');
      console.log('\x1b[90m%s\x1b[0m', '-----------------------------------');
    }
  }
});
