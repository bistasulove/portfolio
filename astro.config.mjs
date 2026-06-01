// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

// Deployed to GitHub Pages on the custom domain sulove.dev, so the site lives at
// the root. The CNAME file in public/ tells GitHub Pages which domain to serve.
// https://astro.build/config
export default defineConfig({
  site: 'https://sulove.dev',
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  integrations: [mdx(), sitemap()],
});
