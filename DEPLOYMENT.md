# Deployment Guide

## Overview

Fully static site built with Astro 5. Output is plain HTML/CSS/JS in `dist/` — no Node.js needed on the server. Nginx serves the files directly.

## Local Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # preview built output locally
```

---

## VPS Setup (First Time)

> **All steps below require root.** SSH as root or use `sudo su -` before running.

### 1. Create web root and grant access to deploy user

```bash
mkdir -p /var/www/irvanmahendra.com
chown -R deploy:deploy /var/www/irvanmahendra.com
chmod -R 755 /var/www/irvanmahendra.com
```

### 2. Nginx config

Create `/etc/nginx/sites-available/irvanmahendra.com`:

```bash
tee /etc/nginx/sites-available/irvanmahendra.com > /dev/null <<'EOF'
server {
    listen 80;
    server_name irvanmahendra.com www.irvanmahendra.com;

    root /var/www/irvanmahendra.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|pdf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf /etc/nginx/sites-available/irvanmahendra.com /etc/nginx/sites-enabled/irvanmahendra.com
nginx -t && systemctl reload nginx
```

Enable it:

```bash
ln -sf /etc/nginx/sites-available/irvanmahendra.com /etc/nginx/sites-enabled/irvanmahendra.com
nginx -t
systemctl reload nginx
```

> **Note:** This config handles both `irvanmahendra.com` and `www.irvanmahendra.com` in the same block.
> If `www` was previously redirecting to another app, this will fix it.

### 3. HTTPS with Certbot (Let's Encrypt)

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d irvanmahendra.com -d www.irvanmahendra.com
```

Certbot will automatically:
- Obtain SSL certificate
- Update the Nginx config with HTTPS
- Add HTTP → HTTPS redirect

After Certbot, the config will look like:

```nginx
server {
    listen 80;
    server_name irvanmahendra.com www.irvanmahendra.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name irvanmahendra.com www.irvanmahendra.com;

    ssl_certificate /etc/letsencrypt/live/irvanmahendra.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/irvanmahendra.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /var/www/irvanmahendra.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|pdf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Verify auto-renewal:

```bash
certbot renew --dry-run
```

---

## CI/CD (GitHub Actions)

Automatically deploys on push to `master`. See `.github/workflows/deploy.yml`.

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `VPS_HOST` | VPS IP address or domain |
| `VPS_USER` | SSH username (e.g. `deploy`) |
| `VPS_SSH_KEY` | Private SSH key (same one used for other projects on this VPS) |

### First-time Setup

1. Complete the VPS setup steps above
2. Add the 3 secrets to GitHub: repo **Settings → Secrets and variables → Actions**
3. Push to `master` — GitHub Actions builds and deploys automatically

---

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

The slug is derived from the filename — `my-post.mdx` → `/blog/my-post`.
