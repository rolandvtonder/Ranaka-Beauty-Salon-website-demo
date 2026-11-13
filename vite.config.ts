import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
import {defineConfig, type Plugin} from 'vite';
import {configure, headFor, pages, robots, sitemap, type PageKey} from './src/seo';

// Demo builds (GitHub Pages) set BASE_PATH=/<repo>/ and SITE_URL=https://<user>.github.io/<repo>
const base = process.env.BASE_PATH || '/';
configure({base, origin: process.env.SITE_URL});

/** Fills each page's `<!--seo-->` slot and emits sitemap.xml + robots.txt. */
function seo(): Plugin {
  return {
    name: 'ranaka-seo',
    transformIndexHtml(html, ctx) {
      const key = (Object.keys(pages) as PageKey[]).find((k) => `${pages[k].path}index.html` === ctx.path) ?? 'home';
      return html.replace('<!--seo-->', headFor(key));
    },
    generateBundle() {
      this.emitFile({type: 'asset', fileName: 'sitemap.xml', source: sitemap(new Date().toISOString().slice(0, 10))});
      this.emitFile({type: 'asset', fileName: 'robots.txt', source: robots()});
    },
  };
}

export default defineConfig(({isSsrBuild}) => ({
  base,
  plugins: [react(), tailwindcss(), ...(isSsrBuild ? [] : [seo()])],
  build: {
    target: 'es2020',
    rollupOptions: isSsrBuild
      ? undefined
      : {
          input: {
            home: resolve(__dirname, 'index.html'),
            services: resolve(__dirname, 'services/index.html'),
            gallery: resolve(__dirname, 'gallery/index.html'),
            about: resolve(__dirname, 'about/index.html'),
            contact: resolve(__dirname, 'contact/index.html'),
          },
        },
  },
}));
