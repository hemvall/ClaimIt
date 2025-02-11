import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'public/index.html', // Point d'entrée du fichier HTML
    },
    assetsInlineLimit: 0, // Cela permet d'éviter l'inlining des assets (comme les images)
  },
  publicDir: 'public', // Dossier public, utilisé pour les fichiers statiques
});
