# glittering katie

Personal site and blog at [glitteringkatie.com](https://glitteringkatie.com). Built with Astro 4 and React 18, hosted on Netlify.

## Stack

- **Framework**: [Astro 4](https://astro.build) (static site)
- **UI**: React 18 (islands), Tailwind v3
- **Fonts**: Source Serif Pro, Work Sans, Fira Mono
- **Hosting**: Netlify (auto-deploy from `main`)
- **Functions**: Netlify Functions v2 + Netlify Blobs (workshop sync)

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

> For the workshop page (password-protected todo list), run `netlify dev` instead — it requires Netlify Functions to be available locally.

## Structure

- `src/content/blog/` — blog posts in Markdown
- `src/pages/` — Astro routes
- `src/components/` — Astro and React components
- `public/bookmarks/` — standalone bookmark collection app (vanilla JS, no build step)
- `netlify/functions/` — Netlify Functions (workshop sync)
- `scripts/` — utility scripts (e.g. `add-bookmarks.mjs` for populating bookmark data)
