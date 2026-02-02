# Deployment Guide - Tributary AI Website

**Domain:** www.thetributary.ai
**Host:** Hostinger
**Framework:** Next.js 16.1.6 (Static Export)

## Quick Deploy

```bash
npm run deploy  # Builds and deploys via rsync
```

This runs `deploy-rsync.sh` which:
1. Builds static site (`npm run build`)
2. Syncs to Hostinger via SSH (only changed files)

## Deployment Options

### Method 1: Rsync over SSH (Recommended)

```bash
./deploy-rsync.sh              # Build and deploy
./deploy-rsync.sh --skip-build # Deploy only (if already built)
./deploy-rsync.sh --dry        # Preview changes (no upload)
```

**SSH Configuration:**
- Host: `191.101.13.61`
- Port: `65002`
- User: `u951885034`
- Key: `~/.ssh/hostinger_rsa`
- Remote: `/home/u951885034/domains/thetributary.ai/public_html`

### Method 2: FTP (Backup Only)

```bash
npm run deploy:ftp  # Build + smart upload
```

FTP is slower - only use if SSH unavailable.

### Method 3: Manual Upload

1. Run `npm run build`
2. Upload contents of `out/` to Hostinger File Manager
3. Extract to `public_html/`

## Build Output

The build creates an `out/` directory with:
- `index.html` (homepage)
- `about.html`, `services.html`, `contact.html`
- `blog/` directory with all posts
- `_next/` directory with assets

## Pre-Deployment Checklist

- [ ] Test locally: `npm run dev`
- [ ] Run lint: `npm run lint`
- [ ] Verify environment variables in production

## Post-Deployment Verification

Test these URLs:
- https://www.thetributary.ai
- https://www.thetributary.ai/services/
- https://www.thetributary.ai/assessment/
- https://www.thetributary.ai/quiz/
- https://www.thetributary.ai/blog/

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 on sub-pages | Verify `trailingSlash: true` in next.config.ts |
| Styles not loading | Clear browser cache, check `_next/static/css/` |
| Images not loading | Check file permissions (644), verify paths |
| Cal.com not showing | Verify embed URL in `app/contact/page.tsx` |

## Environment Variables

Production variables stored in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

SSH credentials stored in `.env.local` (gitignored):
```env
SSH_USER=u951885034
SSH_HOST=191.101.13.61
SSH_PORT=65002
SSH_KEY_PATH=~/.ssh/hostinger_rsa
SSH_REMOTE_DIR=/home/u951885034/domains/thetributary.ai/public_html
```

## Email Configuration

Both domains use Microsoft 365 for email. DNS records managed via Hostinger hPanel.

| Address | Purpose |
|---------|---------|
| michael@thetributary.ai | Primary |
| sales@thetributary.ai | Sales (alias) |
| info@thetributary.ai | General (alias) |

## SSL Certificate

In Hostinger hPanel:
1. Go to "Advanced" > "SSL"
2. Enable SSL for www.thetributary.ai
3. Force HTTPS redirect

---

**Last Updated:** February 2026
