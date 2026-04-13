# irvanmahendra.com

Personal portfolio and blog site.

## Stack
- **Framework**: Astro 5 (fully static)
- **Content**: MDX via `astro:content` (`src/content/blog/`)
- **Styling**: Tailwind CSS v4 + custom CSS variables in `src/styles/global.css`
- **Integrations**: `@astrojs/sitemap`, `@astrojs/rss`

## Commands
```bash
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview production build
```

## Key files
- `src/pages/index.astro` — portfolio homepage
- `src/pages/blog/index.astro` — blog feed
- `src/pages/blog/[slug].astro` — article page
- `src/layouts/Layout.astro` — base layout (SEO meta, dark mode FOUC prevention)
- `src/styles/global.css` — all styles, CSS custom properties for light/dark theming
- `src/components/ThemeToggle.astro` — light/dark toggle
- `src/components/TechStack.astro` — tech stack icons (simple-icons)
- `src/components/CompanyLogo.astro` — company logos with initials fallback

## Theming
Light/dark via `data-theme` on `<html>`. Stored in `localStorage`, falls back to `prefers-color-scheme`. FOUC prevented by inline script in `<head>`.

## Adding a blog post
Create a `.mdx` file in `src/content/blog/` with this frontmatter:
```yaml
---
title: ''
excerpt: ''
publishedAt: YYYY-MM-DD
readingTime: 5
tags: []
featuredImage: '/blog-images/filename.jpg'  # optional
---
```
Then commit and push to `master` — the host rebuilds automatically.

## Publishing
Static site — all pages pre-rendered at build time. Push to `master` triggers a rebuild and deploy.
