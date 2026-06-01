// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

// Deployed to GitHub Pages under the `portfolio` repo, so the site lives at a
// subpath. When a custom domain is added later, set `site` to it and `base` to '/'.
// https://astro.build/config
export default defineConfig({
  site: 'https://bistasulove.github.io',
  base: '/portfolio',

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
