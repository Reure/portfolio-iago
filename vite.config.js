import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// As duas páginas são incluídas na versão final do site.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        dados: resolve(import.meta.dirname, 'dados.html'),
      },
    },
  },
});
