import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// STEP 51-FIX + STEP 56: classic scripts copied as-is into dist/
// base: './' so GitHub Pages project sites (user.github.io/repo/) resolve assets correctly.

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'js', dest: '.' },
        { src: 'css', dest: '.' }
      ]
    })
  ]
});
