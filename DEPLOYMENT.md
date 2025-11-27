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
- [ ] Tributary AI logo (`/public/logo.png`)
- [ ] OpenGraph social image (`/public/og-image.png` - 1200x630px)
- [ ] Favicon files (`/public/favicon.ico`)
- [ ] Calendly URL updated in `/app/contact/page.tsx`
- [ ] Content review complete
- [ ] All services information verified

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

### Method 1: FTP Upload (Recommended)

#### Step 1: Gather FTP Credentials

From Hostinger control panel:
- **FTP Hostname:** Usually `ftp.yourdomain.com`
- **FTP Username:** Provided by Hostinger
- **FTP Password:** Your FTP password
- **Port:** 21 (or 22 for SFTP)

#### Step 2: Connect via FTP Client

**Recommended FTP Clients:**
- FileZilla (Windows/Mac/Linux)
- Cyberduck (Mac)
- WinSCP (Windows)

**FileZilla Example:**
1. Open FileZilla
2. Enter Host: `ftp.thetributary.ai`
3. Enter Username: [your FTP username]
4. Enter Password: [your FTP password]
5. Port: 21
6. Click "Quickconnect"

#### Step 3: Navigate to Web Root

On the remote server (right panel), navigate to:
```
/public_html/
```

If www.thetributary.ai has a separate directory:
```
/domains/thetributary.ai/public_html/
```

#### Step 4: Upload Files

1. On local side (left panel), navigate to:
   ```
   /mnt/c/Projects/Tributary.ai/tributary-site/out/
   ```

2. Select ALL files and folders in the `out/` directory

3. Drag to the remote server's public_html

4. Wait for upload to complete (may take 5-15 minutes depending on connection)

#### Step 5: Verify File Permissions

Ensure proper permissions:
- **Directories:** 755 (rwxr-xr-x)
- **Files:** 644 (rw-r--r--)

Most FTP clients set these automatically. If not, right-click → File Permissions.

### Method 2: Hostinger File Manager

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
- **Site Owner:** Mike Cooper (mcooper@mcooper.com)

---

## Version History

**v1.0.0** - January 2025
- Initial build and deployment
- 14 pages including blog
- Oxford Blue + Teal + Coral rebrand
- AI readiness positioning
- Static export for Hostinger

---

**Last Updated:** January 27, 2025
