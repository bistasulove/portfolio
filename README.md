# Portfolio & Blog — Sulav Raj Bista

The source for my personal portfolio, project case studies, and technical blog.
Live at **<https://sulove.dev>**.

It's a content-driven static site: a home page, in-depth project case studies
(`/work`), a writing/blog section (`/writing`), an about page, an inline résumé
with PDF download, and a `/uses` page. Project and blog content are authored as
Markdown/MDX in `src/content/` and rendered through Astro Content Collections —
no hardcoded content arrays, no CMS, no database.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build) 6 — static output, islands architecture |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 (via `@tailwindcss/vite`) |
| Content | Markdown/MDX + Astro Content Collections (`@astrojs/mdx`) |
| Code highlighting | Shiki (`github-dark`), built into Astro |
| Reading time | Custom remark plugin (`src/plugins/remark-reading-time.mjs`) |
| Social images | Dynamic OG images generated at build time with [Satori](https://github.com/vercel/satori) + [`@resvg/resvg-js`](https://github.com/yisibl/resvg-js) |
| Feeds & SEO | RSS (`@astrojs/rss`), sitemap (`@astrojs/sitemap`), JSON-LD structured data |
| Comments | [Giscus](https://giscus.app) (GitHub Discussions — no backend) |
| Fonts | Playfair Display + DM Sans, self-hosted via `@fontsource` |
| Hosting / CI | GitHub Pages, auto-deployed by GitHub Actions on push to `master` |

## Why this stack

The goal was a fast, content-heavy site that costs nothing to run and is easy to
keep adding writing to over time. A few deliberate choices:

- **Astro over Next.js / Gatsby.** This is a content site with essentially no
  server-side logic, so a static-first generator fits better than a full React
  framework. Astro ships **zero JavaScript by default** and only hydrates the
  islands that need interactivity, which keeps pages small and Lighthouse scores
  high. Next.js + Vercel was the main alternative considered — perfectly capable,
  but more machinery than a portfolio needs.
- **GitHub Pages over Vercel / Netlify / Cloudflare Pages.** All would work on a
  free tier. GitHub Pages won because the code already lives on GitHub, it's free
  with no account sprawl, and a simple GitHub Actions workflow handles deploys on
  every push to `master`.
- **Markdown/MDX Content Collections over a headless CMS.** Contentful / Sanity
  were considered and rejected as overkill: the content is just mine, it belongs
  in version control next to the code, and Content Collections give type-safe
  frontmatter (validated by a Zod schema in `src/content.config.ts`) for free.
- **Tailwind v4 over hand-written CSS.** A small set of design tokens plus utility
  classes keeps styling consistent and colocated with markup, with almost no
  custom CSS to maintain.
- **Giscus over Disqus / Utterances.** Comments are backed by GitHub Discussions —
  no third-party tracking, no ads, no backend to host.

## Running locally

**Prerequisites:** Node.js `>= 22.12.0` and npm.

```bash
# 1. Clone
git clone https://github.com/bistasulove/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

> **Internal links:** the site serves from the root (`base: '/'`) on the custom
> domain. Always build internal links with the `href()` helper in `src/consts.ts`
> rather than hardcoding paths — it keeps links correct even if the base path
> changes (e.g. moving back to a subpath).

### Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro ...` | Run Astro CLI commands (`astro check`, `astro add`, …) |

## Project structure

```text
src/
├── components/      # Astro UI components (Hero, ProjectCard, Timeline, …)
├── content/         # Markdown/MDX content
│   ├── projects/    # Project case studies (/work)
│   └── posts/       # Blog posts (/writing)
├── content.config.ts# Content Collection schemas (Zod-validated frontmatter)
├── consts.ts        # Site metadata, career/projects data, href() helper
├── layouts/         # Page layouts
├── pages/           # File-based routes
├── plugins/         # Remark plugins (reading time)
└── styles/          # Global styles + design tokens
public/              # Static assets (incl. resume.pdf)
```

## Deployment

Every push to `master` triggers a GitHub Actions workflow that builds the site
and publishes `./dist/` to GitHub Pages. The site is served from the custom
domain **sulove.dev**: `astro.config.mjs` sets `site: 'https://sulove.dev'` and
`base: '/'`, and `public/CNAME` tells GitHub Pages which domain to serve.
