# Deployment Guide - Tributary AI Website

## Quick Reference

**Project:** Tributary AI Systems Website
**Built:** January 2025
**Framework:** Next.js 16 (Static Export)
**Target Host:** Hostinger
**Domain:** www.thetributary.ai

---

## Pre-Deployment Checklist

### Required Items
- [x] Tributary AI logo (`/public/logos/logo-header.png`, `/public/logos/logo-footer.png`)
- [x] OpenGraph social image (`/public/og-image.png` - 1200x630px)
- [x] Favicon files (`/public/favicon.png`, `/public/icon-192.png`, `/public/icon-512.png`, `/public/apple-touch-icon.png`)
- [x] Blog images optimized (`/public/blog/*.webp` - 30 images)
- [ ] Calendly URL updated in `/app/contact/page.tsx`
- [x] Content review complete
- [x] All services information verified

### SEO Items
- [x] robots.txt configured (`/public/robots.txt`)
- [x] Sitemap auto-generated (`/app/sitemap.ts`)
- [x] Structured data schemas (Organization, LocalBusiness, BlogPosting, FAQ)
- [ ] Google Search Console verification (update code in `/app/layout.tsx` line 87)
- [ ] Google Business Profile claimed

### Optional Items
- [ ] Google Analytics tracking ID
- [ ] Additional blog posts written
- [ ] Service page images/illustrations

---

## Build Process

### 1. Final Content Review

Before building, verify these files:
- `data/services.ts` - All service information accurate
- `app/about/page.tsx` - Your bio and credentials current
- `content/blog/*.mdx` - Blog posts proofread
- `app/layout.tsx` - Metadata and SEO information correct

### 2. Build Static Site

```bash
# Navigate to project
cd /mnt/c/Projects/Tributary.ai/tributary-site

# Install dependencies (if not already done)
npm install

# Run production build
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Generating static pages (14/14)
✓ Finalizing page optimization

Route (app)
├ ○ / (Homepage)
├ ○ /about
├ ○ /blog
├ ● /blog/[slug] (2 posts)
├ ○ /contact
├ ○ /services (+ 4 detail pages)
```

This creates an `out/` directory with all static files.

### 3. Verify Build

Check the `out/` directory contains:
- `index.html` (homepage)
- `about.html`
- `services.html`
- `contact.html`
- `blog/` directory with posts
- `_next/` directory with assets
- All CSS and JavaScript files

---

## Hostinger Deployment

### Method 1: Automated FTP Deploy Script (Recommended)

The project includes an automated deployment script that handles everything.

#### One-Command Deployment

```bash
npm run deploy
```

This will:
1. Build the static site (`npm run build`)
2. Upload all files via FTP to Hostinger

#### Manual FTP Script

```bash
# Build first
npm run build

# Then deploy
node deploy-ftp.js
```

#### FTP Configuration

The deployment script (`deploy-ftp.js`) is pre-configured:
- **Host:** `ftp.thetributary.ai`
- **User:** `u951885034.tribFTPuser`
- **Remote Directory:** `/` (FTP root = web root)

**IMPORTANT:** The FTP account automatically starts in `public_html`, so upload to `/` NOT `/public_html/`. Uploading to `/public_html/` would create a nested folder.

---

### Method 2: Manual FTP Upload

#### FTP Credentials

- **FTP Hostname:** `ftp.thetributary.ai`
- **FTP Username:** `u951885034.tribFTPuser`
- **Port:** 21

#### Connect via FTP Client

**Recommended FTP Clients:**
- FileZilla (Windows/Mac/Linux)
- Cyberduck (Mac)
- WinSCP (Windows)

**FileZilla Example:**
1. Open FileZilla
2. Enter Host: `ftp.thetributary.ai`
3. Enter Username: `u951885034.tribFTPuser`
4. Enter Password: [your FTP password]
5. Port: 21
6. Click "Quickconnect"

#### Upload Files

**IMPORTANT:** Upload to `/` (root), NOT `/public_html/`

The FTP account automatically lands in the web root. If you see folders like `app/`, `components/`, `package.json` at `/`, that's from a previous Git deployment - upload your files alongside them.

1. On local side (left panel), navigate to:
   ```
   /mnt/c/Projects/Tributary.ai/tributary-site/out/
   ```

2. On remote side, stay at `/` (root)

3. Select ALL files and folders in the `out/` directory

4. Drag to the remote server root

5. Wait for upload to complete (may take 5-15 minutes)

#### File Permissions

Permissions are set automatically:
- **Directories:** 755 (rwxr-xr-x)
- **Files:** 644 (rw-r--r--)

### Method 3: Hostinger File Manager

1. Log into Hostinger control panel
2. Go to "Files" → "File Manager"
3. Navigate to `public_html/`
4. Click "Upload" button
5. Zip the contents of `out/` directory first (not the folder itself)
6. Upload the zip file
7. Extract in public_html
8. Delete the zip file

---

## Post-Deployment Steps

### 1. DNS Configuration

Ensure DNS points to Hostinger:
```
A Record: @ → [Hostinger IP]
CNAME: www → thetributary.ai
```

DNS propagation can take 24-48 hours.

---

## Email Configuration (Microsoft 365)

Both domains use Microsoft 365 for email. DNS records are managed via Hostinger.

### Email Addresses (thetributary.ai)

| Address | Purpose |
|---------|---------|
| michael@thetributary.ai | Primary mailbox |
| sales@thetributary.ai | Sales inquiries (alias) |
| info@thetributary.ai | General inquiries (alias) |
| careers@thetributary.ai | Job applications (alias) |
| partner@thetributary.ai | Partner inquiries (alias) |
| dmarc@thetributary.ai | DMARC/TLS reports |

### DNS Records - thetributary.ai

| Type | Host | Value |
|------|------|-------|
| MX | @ | `0 thetributary-ai.mail.protection.outlook.com` |
| TXT | @ | `v=spf1 include:spf.protection.outlook.com -all` |
| TXT | _dmarc | `v=DMARC1; p=reject; rua=mailto:dmarc@thetributary.ai; pct=100` |
| TXT | _mta-sts | `v=STSv1; id=20260127` |
| TXT | _smtp._tls | `v=TLSRPTv1; rua=mailto:dmarc@thetributary.ai` |
| CNAME | autodiscover | `autodiscover.outlook.com` |
| CNAME | selector1._domainkey | `selector1-thetributary-ai._domainkey.DAVECOOPER.r-v1.dkim.mail.microsoft` |
| CNAME | selector2._domainkey | `selector2-thetributary-ai._domainkey.DAVECOOPER.r-v1.dkim.mail.microsoft` |

### DNS Records - thetributary.io

| Type | Host | Value |
|------|------|-------|
| MX | @ | `0 thetributary-io.mail.protection.outlook.com` |
| TXT | @ | `v=spf1 include:spf.protection.outlook.com -all` |
| TXT | _dmarc | `v=DMARC1; p=reject; rua=mailto:dmarc@thetributary.io; pct=100` |
| TXT | _mta-sts | `v=STSv1; id=20260127` |
| TXT | _smtp._tls | `v=TLSRPTv1; rua=mailto:dmarc@thetributary.io` |
| CNAME | autodiscover | `autodiscover.outlook.com` |
| CNAME | selector1._domainkey | `selector1-thetributary-io._domainkey.DAVECOOPER.d-v1.dkim.mail.microsoft` |
| CNAME | selector2._domainkey | `selector2-thetributary-io._domainkey.DAVECOOPER.d-v1.dkim.mail.microsoft` |

### MTA-STS Policy Files

MTA-STS requires a policy file hosted at `https://mta-sts.<domain>/.well-known/mta-sts.txt`

**thetributary.ai policy:**
```
version: STSv1
mode: testing
mx: thetributary-ai.mail.protection.outlook.com
max_age: 86400
```

**thetributary.io policy:**
```
version: STSv1
mode: testing
mx: thetributary-io.mail.protection.outlook.com
max_age: 86400
```

### MTA-STS FTP Credentials

| Domain | Host | Username |
|--------|------|----------|
| mta-sts.thetributary.ai | 191.101.13.61 | u951885034.mta-sts.thetributary.ai |
| mta-sts.thetributary.io | 191.101.13.61 | u951885034.mta-sts.thetributary.io |

*Passwords stored in hPanel → Files → FTP Accounts*

### Domain Forwarding

thetributary.io redirects (301) to https://www.thetributary.ai

### Adding Marketing Tools (Future)

When adding email marketing services (Mailchimp, ConvertKit, etc.):

1. **Update SPF** - Add their include (e.g., `include:servers.mcsv.net`)
2. **Add DKIM** - Add CNAME records they provide
3. **Test** - Use mail-tester.com to verify

### Email Testing

- **Mail-Tester:** https://www.mail-tester.com (target: 10/10)
- **MX Toolbox:** https://mxtoolbox.com/SuperTool.aspx

### 2. SSL Certificate

In Hostinger control panel:
1. Go to "Advanced" → "SSL"
2. Enable SSL for www.thetributary.ai
3. Force HTTPS redirect

### 3. Test the Site

Visit these URLs and verify:

**Homepage:**
- https://www.thetributary.ai
- Hero section loads
- Navigation works
- Theme toggle works

**Services:**
- https://www.thetributary.ai/services/
- https://www.thetributary.ai/services/ai-readiness/
- https://www.thetributary.ai/services/agentic-systems/
- https://www.thetributary.ai/services/implementation/
- https://www.thetributary.ai/services/cloud-marketplace/

**Other Pages:**
- https://www.thetributary.ai/about/
- https://www.thetributary.ai/contact/
- https://www.thetributary.ai/blog/

**Blog Posts:**
- https://www.thetributary.ai/blog/5-signs-your-business-isnt-ready-for-ai/
- https://www.thetributary.ai/blog/what-agentic-really-means-for-your-business/

### 4. Mobile Testing

Test on:
- iPhone (Safari)
- Android (Chrome)
- Tablet (iPad/Android)

Check:
- Navigation menu works
- Cards display properly
- Images load
- Forms work (Calendly)

### 5. Social Sharing Test

Use tools to verify metadata:
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

### 6. Performance Check

Run these tests:
- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

## Updating the Site

### Process for Content Updates

1. **Make changes locally** in the project files
2. **Test locally:** `npm run dev`
3. **Build:** `npm run build`
4. **Upload only changed files** via FTP

### Quick Updates

For small text changes:
- Edit the file locally
- Rebuild: `npm run build`
- Upload only the affected HTML file(s) from `out/`

### Blog Post Additions

1. Create new `.mdx` file in `content/blog/`
2. Add frontmatter
3. Run `npm run build`
4. Upload the entire `blog/` directory from `out/`

---

## Troubleshooting

### Site Shows "Index of /" or Directory Listing

**Problem:** No index.html in the root
**Solution:** Ensure `out/index.html` is uploaded to the root of public_html

### 404 Errors on Sub-pages

**Problem:** Missing trailing slashes or .html files
**Solution:**
- Check `next.config.ts` has `trailingSlash: true`
- Rebuild and re-upload

### Images Not Loading

**Problem:** Image paths incorrect
**Solution:**
- Verify images in `/public/` folder
- Rebuild to ensure they're in `out/_next/static/media/`
- Check file permissions (644)

### Styles Not Applying

**Problem:** CSS files not loading
**Solution:**
- Clear browser cache
- Check `out/_next/static/css/` folder exists
- Verify file permissions on server

### Calendly Not Showing

**Problem:** iframe blocked or wrong URL
**Solution:**
- Update URL in `app/contact/page.tsx`
- Rebuild
- Check browser console for iframe errors

---

## Rollback Procedure

If something goes wrong:

1. **Keep backup:** Before deploying, backup existing public_html
2. **FTP Method:** Keep previous `out/` directory renamed to `out-backup/`
3. **Restore:** Simply re-upload the previous version

---

## Maintenance Schedule

### Weekly
- [ ] Check site loads correctly
- [ ] Test contact form/Calendly
- [ ] Review Google Analytics (if configured)

### Monthly
- [ ] Run PageSpeed Insights
- [ ] Check for broken links
- [ ] Review and update blog content
- [ ] Update npm packages: `npm update`

### Quarterly
- [ ] Review and update service information
- [ ] Update About page with new credentials/awards
- [ ] Add new blog posts
- [ ] Major Next.js updates (if available)

---

## Support & Resources

### Hostinger Support
- **Control Panel:** https://hpanel.hostinger.com
- **Support:** 24/7 chat support
- **Knowledge Base:** https://support.hostinger.com

### Development Resources
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com

### Contact
- **Developer:** Claude AI (via Claude Code)
- **Site Owner:** Mike Cooper (michael@thetributary.ai)

---

## Version History

**v1.3.0** - January 27, 2026
- Configured Microsoft 365 email for both domains
- Added email DNS records: MX, SPF, DKIM, DMARC
- Configured MTA-STS with policy files for both domains
- Added TLS-RPT for TLS failure reporting
- Set up thetributary.io → thetributary.ai redirect
- Added phone number to contact page and footer
- DMARC policy set to `p=reject` for maximum protection

**v1.2.0** - November 28, 2025
- Added optimized blog images (30 WebP files, 91% size reduction: 41MB → 3.6MB)
- Added new jellyfish logo to header and footer navigation
- Added comprehensive favicon set (32px, 48px, 192px, 512px, apple-touch-icon)
- Added robots.txt and dynamic sitemap.ts (41 URLs)
- Added SEO enhancements: canonical URLs, enhanced metadata, Twitter cards
- Added structured data: BlogPostSchema, FAQSchema, BreadcrumbListSchema
- Fixed memory leak in stats-counter.tsx (event listener cleanup)
- Fixed React useEffect cascading render warning in navigation.tsx
- Removed unused imports and cleaned up ESLint configuration
- Removed duplicate parent lockfile causing build warnings

**v1.1.0** - November 2025
- Added 30 blog posts covering AI strategy, implementation, and industry topics
- Added AI Readiness Assessment page with Web3Forms integration
- Added Resources page with downloadable guides
- Added Differentiators and Engagement Models sections
- Enhanced UX with animations, parallax, and 3D effects
- Fixed FTP deployment (upload to `/` not `/public_html/`)
- Added automated `npm run deploy` command

**v1.0.0** - January 2025
- Initial build and deployment
- 14 pages including blog
- Oxford Blue + Teal + Coral rebrand
- AI readiness positioning
- Static export for Hostinger

---

**Last Updated:** January 27, 2026
