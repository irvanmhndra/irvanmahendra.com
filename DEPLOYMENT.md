# Deployment Guide

## Overview

This is a fully static site built with Astro 5. The output is plain HTML/CSS/JS in `dist/` — no Node.js needed on the server. Nginx serves the files directly.

## Local Development

```bash
npm install
npm run dev       # http://localhost:4321
```

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview the built output locally
```

## Server Setup (VPS)

### Nginx Config

```nginx
server {
    listen 80;
    server_name irvanmahendra.com www.irvanmahendra.com;

    root /var/www/irvanmahendra.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

For HTTPS, use Certbot:

```bash
sudo certbot --nginx -d irvanmahendra.com -d www.irvanmahendra.com
```

### Manual Deploy

```bash
npm run build
scp -r dist/* user@your-vps:/var/www/irvanmahendra.com/
```

## CI/CD (GitHub Actions)

Automatically deploys on push to `main`. See `.github/workflows/deploy.yml`.

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `VPS_HOST` | VPS IP address or domain |
| `VPS_USER` | SSH username |
| `VPS_SSH_KEY` | Private SSH key (add public key to `~/.ssh/authorized_keys` on VPS) |

### Setup Steps

1. Generate SSH key pair: `ssh-keygen -t ed25519 -C "github-actions"`
2. Add public key to VPS: `~/.ssh/authorized_keys`
3. Add private key to GitHub: Settings → Secrets → `VPS_SSH_KEY`
4. Add `VPS_HOST` and `VPS_USER` secrets
5. Push to `main` — GitHub Actions handles the rest

## Adding Blog Posts

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
excerpt: "A short description shown on the blog listing page."
publishedAt: 2026-03-08
readingTime: 5
tags: ["golang", "backend"]
---

Your content here in Markdown.
```

The slug is derived from the filename (e.g. `my-post.mdx` → `/blog/my-post`).
