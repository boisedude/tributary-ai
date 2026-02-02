# Tributary AI Website UX Audit Report
**Date:** January 16, 2026
**URL:** https://thetributary.ai
**Auditor:** Automated UX Analysis

---

## Executive Summary

The Tributary AI website presents a professional, clean design with a clear value proposition. The site effectively communicates its SaaS GTM consulting services. However, several UX improvements could enhance user experience and conversion rates, particularly around navigation feedback, mobile interactions, and content discoverability.

**Overall Score: 7.5/10**

---

## 1. Strengths - What's Working Well

### Brand & Visual Identity
- **Strong visual consistency** across all pages with cohesive color scheme (teal/dark theme)
- **Clean, professional typography** that reinforces B2B consulting positioning
- **Well-designed hero sections** on each page with clear headlines
- **Dark mode support** provides good alternative viewing experience
- **Excellent image optimization** - all images have proper alt text (accessibility win)

### Content Quality
- **Clear value proposition** in hero: "SaaS GTM Acceleration for the Agentic Era"
- **Well-structured service offerings** with three clear service tiers
- **Comprehensive blog content** (30+ articles) demonstrating expertise
- **Good use of bullet points** for scannability on Services pages
- **FAQ section on Contact page** addresses common questions proactively

### Navigation & Structure
- **Consistent navigation** across all pages (same nav items in same order)
- **Logical information architecture** - Services, Resources, About, Blog, Contact flow
- **Footer includes essential links** including Privacy Policy and Terms of Service
- **Clear CTA presence** on every page ("Book a Strategy Call")

### Conversion Elements
- **Calendly integration** on Contact page for easy scheduling
- **Multiple CTAs per page** providing various entry points
- **Email contact option** available as alternative to scheduling
- **LinkedIn/social presence** linked in footer

### Performance
- **Average page load time: 1,546ms** - acceptable for content-rich pages
- **No critical JavaScript errors** detected during navigation
- **Images load properly** without significant lazy-load issues

---

## 2. Issues Found - Specific UX Problems

### Critical Issues

#### A. Calendly Widget Shows "Page Not Found" Error
**Location:** Contact page (`/contact`)
**Screenshot:** `calendly-area.png`, `contact-page.png`
**Issue:** The embedded Calendly widget displays a "Page not found" error. Investigation confirmed:
- Calendly embed URL: `https://calendly.com/tributary-ai/30min`
- Direct URL returns HTTP 404 status
- The meeting type "30min" appears to no longer exist or the account URL has changed
**Impact:** CRITICAL - This is the primary conversion mechanism and it is completely broken. Users cannot schedule meetings.

#### B. Missing Mobile Menu Functionality Detection
**Location:** All pages on mobile viewport
**Issue:** While a mobile menu toggle button exists, the audit couldn't detect visible navigation links on mobile. Navigation links show as "hidden" in mobile viewport tests.
**Impact:** HIGH - Users may struggle to navigate on mobile devices.

#### C. 404 Page Missing Navigation
**Location:** 404 error page
**Screenshot:** `404-page.png`
**Issue:** The 404 page has no header navigation, no footer, and no clear path back to the main site. Users hitting a broken link are essentially stranded.
**Impact:** MEDIUM-HIGH - Lost users with no recovery path.

### High Priority Issues

#### D. No Sticky Header
**Issue:** Header scrolls away and doesn't remain fixed/sticky when scrolling.
**Impact:** Users must scroll to top to access navigation, increasing friction.

#### E. Touch Targets Below Minimum Size
**Location:** Mobile viewport
**Issue:** 17 out of 19 interactive elements are below the 44x44px minimum touch target size recommended by WCAG.
**Examples:**
- Toggle menu button: 36x36px
- "Book a Strategy Call" button: 207x40px (height issue)
- "Learn More" links: 278x34px (height issue)
**Impact:** Mobile usability and accessibility degradation.

#### F. Missing Breadcrumbs
**Location:** Service detail pages, Blog posts
**Issue:** No breadcrumb navigation on nested pages, making it hard to understand site hierarchy or navigate back.
**Impact:** Users may feel lost in deep pages.

#### G. Duplicate Page Titles
**Issue:** Multiple pages have repeated brand name in titles:
- "Cloud Marketplace GTM | Tributary AI | Tributary AI"
- "AI Strategy & Business Transformation Blog | Tributary AI | Tributary AI"
**Impact:** Poor SEO and cluttered browser tabs.

### Medium Priority Issues

#### H. Blog Posts Missing Key Elements
**Location:** Individual blog posts
**Screenshot:** `blog-post-detail.png`
**Issues found:**
- No visible publication date
- No reading time estimate
- No author information/byline
- No social sharing buttons
- No related posts section
- No "back to blog" navigation
**Impact:** Reduced content credibility and engagement.

#### I. Skip Navigation Link Missing
**Location:** All pages
**Issue:** No skip-to-content link for keyboard/screen reader users.
**Impact:** Accessibility barrier for users relying on keyboard navigation.

#### J. Resources Page - No Direct Downloads
**Location:** `/resources`
**Issue:** Resources page shows guide previews but requires email to download. While this is intentional for lead gen, the UX could clarify this better upfront.
**Impact:** Potential user frustration if expecting immediate downloads.

#### K. Console Errors - 404 Resources
**Issue:** Three 404 errors detected in browser console across pages, indicating missing assets.
**Impact:** Minor - likely analytics or third-party scripts but should be investigated.

### Low Priority Issues

#### L. Hero Text Spacing Issue
**Location:** Homepage
**Issue:** H1 reads "SaaS GTM Accelerationfor the Agentic Era" - missing space between "Acceleration" and "for".
**Impact:** Minor visual/copy issue.

#### M. Service Cards - Generic CTA Text
**Location:** Services page
**Issue:** All three service cards use "Learn More" as CTA, missing opportunity for more specific action language.
**Impact:** Minor - could improve click-through clarity.

#### N. Potential Color Contrast Issues
**Issue:** 59 elements flagged for potentially light text that may have contrast issues.
**Impact:** Should be validated with proper contrast checker tools.

---

## 3. Suggested Improvements - Prioritized Recommendations

### HIGH Priority (Fix Immediately)

| # | Issue | Recommendation | Effort |
|---|-------|----------------|--------|
| 1 | Calendly widget broken (404) | The Calendly URL `calendly.com/tributary-ai/30min` returns 404. Either recreate this meeting type in Calendly or update the embed to use a valid meeting URL. Add a fallback email/phone CTA until fixed. | Low |
| 2 | 404 page lacks navigation | Add header/footer to 404 page; include search functionality; add "Return to Home" CTA | Low |
| 3 | Touch targets too small | Increase button padding to minimum 44px height; ensure all tappable elements meet size requirements | Medium |
| 4 | Mobile menu verification | Test and confirm mobile navigation works properly; ensure menu opens and links are accessible | Low |

### MEDIUM Priority (Address Within 2-4 Weeks)

| # | Issue | Recommendation | Effort |
|---|-------|----------------|--------|
| 5 | Add sticky header | Implement `position: sticky` on header for persistent navigation access | Low |
| 6 | Add breadcrumbs | Implement breadcrumb component on service detail pages and blog posts | Medium |
| 7 | Fix duplicate titles | Update page titles to: "Cloud Marketplace GTM - Tributary AI" (single brand mention) | Low |
| 8 | Enhance blog posts | Add: publication date, author byline, reading time, social share buttons, related posts | Medium |
| 9 | Add skip navigation | Add "Skip to main content" link as first focusable element for accessibility | Low |
| 10 | Fix hero text spacing | Add space between "Acceleration" and "for" in homepage H1 | Low |

### LOW Priority (Backlog Improvements)

| # | Issue | Recommendation | Effort |
|---|-------|----------------|--------|
| 11 | Improve service CTAs | Change "Learn More" to specific CTAs: "Explore Marketplace GTM", "Learn About Fractional Leadership", etc. | Low |
| 12 | Add blog navigation | Include "Back to Blog" link and category tags on blog posts | Low |
| 13 | Audit color contrast | Run full WCAG contrast audit and fix any failing elements | Medium |
| 14 | Resources page clarity | Add clearer messaging that guides require email signup before download | Low |
| 15 | Investigate console errors | Check browser console for 404 resources and fix missing assets | Low |

---

## 4. Page-by-Page Summary

### Homepage (/)
- **Load time:** 1,981ms
- **Strengths:** Clear value prop, good CTA placement, trust indicators present
- **Issues:** Missing space in hero text, no sticky header

### Services (/services)
- **Load time:** 1,238ms
- **Strengths:** Well-organized three-tier offering, good feature lists, clear pricing context
- **Issues:** Generic "Learn More" CTAs

### Service Detail (/services/cloud-marketplace)
- **Load time:** 1,108ms
- **Strengths:** Detailed service explanation, clear "What We Do" / "What You Get" sections
- **Issues:** No breadcrumbs, limited social proof

### Blog (/blog)
- **Load time:** 1,754ms
- **Strengths:** Good content volume (30+ posts), visual blog cards with imagery
- **Issues:** No filtering/categories, no search

### Blog Post
- **Load time:** 580ms
- **Strengths:** Well-structured content with good headers
- **Issues:** Missing date, author, sharing, related posts

### About (/about)
- **Load time:** 928ms
- **Strengths:** Personal founder story, experience highlights, awards/recognition section
- **Issues:** None significant

### Contact (/contact)
- **Load time:** 4,065ms (slowest - likely Calendly embed)
- **Strengths:** FAQ section, multiple contact options, clear expectations setting
- **Issues:** Calendly showing error, longer load time

### Resources (/resources)
- **Load time:** 712ms
- **Strengths:** Clear guide offerings, clean layout
- **Issues:** Email required for downloads (by design, but could be clearer)

---

## 5. Screenshots Reference

All screenshots saved to `/mnt/d/Projects/Tributary/ux-audit-screenshots/`:

| Screenshot | Description |
|------------|-------------|
| `homepage-desktop.png` | Full homepage - desktop view |
| `homepage-mobile.png` | Full homepage - mobile view |
| `services-desktop.png` | Services listing page |
| `services-mobile.png` | Services page - mobile view |
| `cloud-marketplace-service-desktop.png` | Service detail page |
| `blog-desktop.png` | Blog listing page |
| `blog-post-detail.png` | Individual blog post |
| `about-desktop.png` | About page |
| `contact-page.png` | Contact page showing Calendly issue |
| `contact-mobile.png` | Contact page - mobile view |
| `resources-desktop.png` | Resources/guides page |
| `dark-mode.png` | Homepage in dark mode |
| `404-page.png` | 404 error page (missing navigation) |

---

## 6. Technical Metrics Summary

| Metric | Value | Status |
|--------|-------|--------|
| Average Load Time | 1,546ms | Good |
| Images with Alt Text | 100% | Excellent |
| H1 Per Page | 1 | Correct |
| Console Errors | 3 (404s) | Needs attention |
| Mobile Menu | Present | Verify functionality |
| Dark Mode | Supported | Good |
| Calendly Integration | Broken | Critical |

---

## 7. Recommended Next Steps

1. **Immediate:** Fix Calendly embed on Contact page - this is blocking conversions
2. **This Week:** Add navigation to 404 page and fix touch target sizes
3. **Next Sprint:** Implement sticky header and breadcrumbs
4. **Ongoing:** Enhance blog post template with missing elements
5. **Audit Follow-up:** Re-test after fixes implemented

---

*Report generated through automated Playwright browser testing and manual visual inspection.*
