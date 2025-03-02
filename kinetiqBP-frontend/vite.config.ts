import react from '@vitejs/plugin-react';
import path from 'path';
import { type AliasOptions, defineConfig } from 'vite';

const root = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': root,
    } as AliasOptions,
  },
  server: {
    port: 13403, // Set the port to your desired value
  },
  optimizeDeps: {
    exclude: ['@pundima-lakshan/bpmn-form-extended'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('bpmn-form-extended')) {
            return 'customFormEditor';
          }

          return 'app';
        },
      },
      // plugins: [minifyBundles()], // have to fix the minify method
    },
    minify: false,
  },
});
