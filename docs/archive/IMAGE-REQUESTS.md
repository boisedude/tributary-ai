# Image Requests for Tributary AI Website

## Summary

This document outlines images needed to complete the website. Images are organized by priority and purpose.

---

## Priority 1: Missing/Broken Assets

These are referenced in code but don't exist or have format mismatches.

### 1. Author Headshot
- **File needed:** `/public/images/michael-cooper.jpg`
- **Referenced in:** `lib/constants.ts` line 149
- **Purpose:** Default author image for blog posts
- **Specs:**
  - Square format (400x400px recommended)
  - Professional headshot
  - Neutral background or on-brand colors
- **Style notes:** Approachable, professional, matches the direct/no-nonsense tone of the site

### 2. Logo Icon (Square)
- **File needed:** `/public/logos/logo-icon.png`
- **Referenced in:** `lib/constants.ts` line 129
- **Purpose:** Square icon version of logo for favicons, app icons, small spaces
- **Specs:**
  - Square format (512x512px source)
  - PNG with transparency
  - Just the mark/symbol, no text
- **Note:** Currently `logo-mark.webp` exists but PNG version needed

### 3. Favicon ICO
- **File needed:** `/public/favicon.ico`
- **Referenced in:** `lib/constants.ts` line 131
- **Purpose:** Browser tab icon
- **Specs:**
  - Multi-size ICO file (16x16, 32x32, 48x48)
  - Or convert existing favicon-32.png to .ico format

---

## Priority 2: Page Enhancement Images

These pages currently use icons/gradients but could benefit from custom artwork.

### 4. About Page - Founder Photo
- **File needed:** `/public/images/michael-cooper-about.jpg`
- **Location:** About page hero or credentials section
- **Purpose:** Humanize the brand, build trust
- **Specs:**
  - Landscape or portrait, 800x600px minimum
  - Professional but approachable
  - Could be environmental (office, workspace) or studio
- **Style notes:** The about page is text-heavy; a photo would add visual interest and credibility

### 5. Assessment Page - Process Diagram
- **File needed:** `/public/images/assessment-process.webp`
- **Location:** Assessment page, "Four Dimensions" section
- **Purpose:** Visual representation of the People/Process/Technology/Politics framework
- **Specs:**
  - Wide format (1200x600px)
  - Clean, modern infographic style
  - Should show the four dimensions interconnected
- **Style notes:** Match the teal/dark color scheme. Could be a quadrant diagram, Venn diagram, or circular flow

### 6. Assessment Page - Deliverables Preview
- **File needed:** `/public/images/assessment-deliverables.webp`
- **Location:** Assessment page, "What You Get" section
- **Purpose:** Show what the actual deliverables look like (mock report cover, presentation slide)
- **Specs:**
  - 1200x800px
  - Could be a stylized mockup of documents/presentation
- **Style notes:** Professional, implies high-quality output without revealing actual client work

---

## Priority 3: Homepage Enhancements

The homepage currently uses CSS gradients and animations. These are optional but could enhance visual impact.

### 7. Hero Background/Illustration
- **File needed:** `/public/images/hero-illustration.webp`
- **Location:** Homepage hero section (could be subtle background or accent)
- **Purpose:** Add visual interest to the hero section
- **Specs:**
  - Wide format (1920x1080px)
  - Abstract or semi-abstract
  - Should work with text overlay
- **Style notes:** Current design uses animated gradient orbs. An illustration could complement or replace this. Think: flowing water (tributary theme), network connections, simplification visual

### 8. "Two Paths" Section Illustrations
- **Files needed:**
  - `/public/images/path-complexity.webp` (tangled, complex)
  - `/public/images/path-simplicity.webp` (clean, streamlined)
- **Location:** Homepage "Two Paths" section
- **Purpose:** Visually contrast the "add complexity" vs "simplify" approaches
- **Specs:**
  - Square or 4:3 ratio, 600x600px each
  - Abstract/conceptual style
  - One should feel chaotic/tangled, one should feel clean/flowing
- **Style notes:** Could be abstract line art, network diagrams, or water/tributary metaphor

---

## Priority 4: Social & Marketing

### 9. Open Graph Image Update
- **Current file:** `/public/og-image.png` (exists, 570KB)
- **Purpose:** Social sharing preview image
- **Consider refreshing if:**
  - Current image doesn't reflect latest branding
  - Want to include new tagline or visual style
- **Specs:** 1200x630px, PNG or JPG

### 10. Blog Default/Fallback Image
- **File needed:** `/public/blog/default-post.webp`
- **Purpose:** Fallback image for any blog post missing a custom image
- **Specs:**
  - 1200x655px (matches other blog images)
  - Generic but on-brand
  - Could include Tributary logo mark or abstract pattern
- **Style notes:** Should work as a dignified placeholder that doesn't look like an error

---

## Existing Blog Images - All Complete

All 35 blog posts have their images created and optimized. No additional blog images needed unless new posts are added.

---

## Style Guide Reference

Based on existing blog images and site design:

- **Color palette:** Dark backgrounds, teal accents (#14b8a6), white text
- **Style:** Modern, clean, professional
- **Tone:** Direct, no-nonsense, confident
- **Avoid:** Stock photo clichés (handshakes, people pointing at screens, generic "AI" imagery with robots)
- **Preferred:** Abstract, conceptual, clean geometric shapes, water/flow metaphors

---

## Technical Notes

- **Format:** Use WebP for all new images (better compression)
- **Optimization:** Max width 1200px for content images, quality 80
- **Naming:** Lowercase, hyphens, descriptive (e.g., `assessment-process-diagram.webp`)
- **Location:**
  - Blog images: `/public/blog/`
  - Page images: `/public/images/`
  - Logos: `/public/logos/`
