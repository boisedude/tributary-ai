# CLAUDE.md - Tributary AI Systems Website

> **IMPORTANT:** Always use retrieval-led reasoning. Search docs and read files before making changes.

## Project Overview

Static marketing website for Tributary AI Systems (www.thetributary.ai) - an AI consulting firm specializing in technology readiness assessments for mid-market companies.

**Core Offering:** "The Assessment" - 2-3 week diagnostic ($12K-$25K)
**Target:** Mid-market companies ($10M-$500M revenue)

## Tech Stack

```
Next.js 16.1.6 (App Router) | React 19 | TypeScript 5
Tailwind CSS v4 | shadcn/ui | Framer Motion 12 | MDX | Supabase
```

## Directory Structure

```
app/              # Pages & routes (App Router)
  about/          # About page
  admin/          # Admin dashboard
  assessment/     # Assessment service page
  blog/           # Blog listing and [slug] pages
  brand/          # Brand assets page
  careers/        # Careers page
  contact/        # Contact page with Cal.com embed
  partners/       # Partners page
  preferences/    # Email preference center
  privacy/        # Privacy policy
  quiz/           # AI readiness quiz
  security/       # Security practices page
  services/       # Services overview + subpages
  terms/          # Terms of service
components/
  ui/             # shadcn/ui primitives (button, card, input, toast, etc.)
  sections/       # Homepage sections (hero, cta, approach, etc.)
  layout/         # Navigation, Footer
  blog/           # Blog components
  interactive/quiz/ # Quiz components (role-selector, results, benchmarks, etc.)
  admin/          # Admin dashboard components
  newsletter/     # Newsletter signup
  faq-accordion.tsx # Reusable FAQ accordion component
content/blog/     # MDX blog posts (36 posts with frontmatter)
lib/
  constants.ts    # ALL routes, emails, company info, assets - USE THIS
  supabase.ts     # DB client, types, rate limiting
  blog.ts         # getAllPosts(), getPostBySlug(), getAllTags()
  utils.ts        # cn() classnames helper
  preferences.ts  # Email preference management
  newsletter.ts   # Newsletter subscriptions
  quiz/           # Quiz logic and scoring
public/           # Static assets (logos, images, blog images)
  blog/           # Blog post images
  brand/          # Brand assets for download
  images/         # General images
  logos/          # Logo variations
scripts/          # Build scripts (image optimization, migrations)
supabase/         # Database schema & migrations
docs/             # Project documentation
  archive/        # Historical docs
  research/       # Research notes
```

## Essential Constants (lib/constants.ts)

**Always import from constants.ts - never hardcode values:**

```typescript
import { ROUTES, EMAILS, COMPANY, SITE_URL, EXTERNAL_LINKS, ASSETS, BAND_COLORS } from '@/lib/constants'

// Routes
ROUTES.HOME           // "/"
ROUTES.SERVICES       // "/services"
ROUTES.ASSESSMENT     // "/assessment"
ROUTES.QUIZ           // "/quiz"
ROUTES.BLOG           // "/blog"
ROUTES.CONTACT        // "/contact"

// Company Info
COMPANY.NAME          // "Tributary"
COMPANY.DISPLAY_NAME  // "Tributary AI"
COMPANY.FOUNDER_NAME  // "Michael Cooper"
COMPANY.PHONE         // "(208) 330-5534"
COMPANY.LOCATION      // "723 W Headwaters Dr, Eagle, Idaho"

// Site
SITE_URL              // "https://www.thetributary.ai"

// External Links
EXTERNAL_LINKS.CALENDAR    // "https://cal.com/thetributary"
EXTERNAL_LINKS.PODCAST_URL // "https://www.agentic-saas-talks.com/"

// Emails
EMAILS.MICHAEL        // "michael@thetributary.ai"
EMAILS.SALES          // "sales@thetributary.ai"

// Assets
ASSETS.LOGO_HEADER    // "/logos/logo-header.png"
ASSETS.OG_IMAGE       // "/og-image.png"

// Quiz Result Bands (for admin/results styling)
BAND_COLORS['path-b-aligned']    // { bg, bgLight, text, bgSubtle }
BAND_COLORS['foundation-ready']
BAND_COLORS['crossroads']
BAND_COLORS['high-complexity']
BAND_COLORS['not-ready']
```

## Key Patterns

### Server vs Client Components

- **Default to Server Components** (pages, layouts, data fetching)
- **Use "use client" only for:** interactivity, forms, theme toggle, animations, hooks
- **Client components:** Navigation, Quiz, NewsletterSignup, AdminLogin, ThemeToggle

### Styling with cn()

Always use `cn()` from `lib/utils.ts` for conditional Tailwind classes:

```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-classes"
)} />
```

### Tailwind CSS v4

- Uses CSS variables with OKLch color space
- Dark mode via `.dark` class and `next-themes`
- Custom utilities defined in `app/globals.css`

### Data Fetching

- **Blog:** File system via `getAllPosts()` (server-side only)
- **Quiz/Contacts:** Supabase client-side with RLS
- **All pages:** Statically generated at build time

### Blog Posts

Required frontmatter:
```yaml
---
title: "Post Title"
date: "2026-01-30"
excerpt: "Brief description for listings"
author: "Michael Cooper"
tags: ["AI", "Strategy"]
image: "/blog/post-image.webp"
---
```

## Commands

```bash
npm run dev      # Dev server (Turbopack) - localhost:3000
npm run build    # Static export to ./out/
npm run deploy   # SSH/rsync to Hostinger
npm run lint     # ESLint
```

## Deployment

- **Output:** Static export (`output: "export"` in next.config.ts)
- **Host:** Hostinger via SSH/rsync (`deploy-rsync.sh`)
- **Images:** Unoptimized (static export requirement)
- **Trailing slashes:** Enabled for Hostinger compatibility

## Gotchas & Common Issues

1. **No `next/image` optimization** - Static export requires unoptimized images
2. **Quiz uses client-side Supabase** - All quiz components need "use client"
3. **Rate limiting** - Uses localStorage fingerprinting for quiz submissions
4. **Blog images** - Use WebP format, max 1200px width
5. **Trailing slashes** - All internal links must use trailing slashes
6. **Cal.com embed** - Configured in `app/contact/page.tsx`
7. **Dark mode logos** - Use `ASSETS.LOGO_HEADER_DARK` for dark theme
8. **Security page** - `/security` route, explains data handling practices
9. **FAQ component** - Use `FAQAccordion` for consistent FAQ styling
10. **Quiz components path** - Located in `components/interactive/quiz/`, not `components/quiz/`

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL        # Required for quiz/contacts
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Required for quiz/contacts
NEXT_PUBLIC_GA_ID               # Optional: Google Analytics
```

## Database (Supabase)

**Tables:**
- `quiz_submissions` - Quiz results with dimension scores
- `contacts` - CRM contacts linked to companies
- `companies` - Client/prospect organizations
- `preference_tokens` - Email preference management tokens
- `preference_changes` - Audit log for GDPR compliance

**Key Types (lib/supabase.ts):**
- `QuizSubmission` - Quiz result with email, scores, band
- `Contact` - Contact with preferences and company link

## File Naming Conventions

- **Components:** PascalCase (`NewsletterSignup.tsx`)
- **Pages/Routes:** lowercase with hyphens (`ai-readiness/page.tsx`)
- **Utilities:** camelCase (`utils.ts`, `supabase.ts`)
- **Blog posts:** lowercase with hyphens (`post-title.mdx`)
- **Images:** lowercase with hyphens (`hero-image.webp`)

## Common Tasks

### Add a new page
1. Create `app/[route]/page.tsx`
2. Add route to `ROUTES` in `lib/constants.ts`
3. Add to navigation if needed in `NAV_ITEMS`
4. Add to `FOOTER_NAV_GROUPS` for footer links
5. Add to `app/sitemap.ts` if public page

### Add a blog post
1. Create `content/blog/post-slug.mdx`
2. Add frontmatter with all required fields
3. Add image to `public/blog/`
4. Build to generate static page

### Update navigation
1. Edit `NAV_ITEMS` in `lib/constants.ts`
2. For footer, edit `FOOTER_NAV_GROUPS`

### Add a new UI component
1. Use shadcn/ui: `npx shadcn@latest add [component]`
2. Components go to `components/ui/`

### Add FAQ section to a page
1. Import `FAQAccordion` from `@/components/faq-accordion`
2. Pass array of `{ question: string, answer: string }` objects
3. Component handles accessibility and animations

## Key Components

### FAQAccordion
Reusable accordion for FAQ sections. Used on Services page.
```typescript
import { FAQAccordion } from "@/components/faq-accordion"
<FAQAccordion faqs={[{ question: "...", answer: "..." }]} />
```

### Quiz Components
Located in `components/interactive/quiz/`:
- `quiz-role-selector.tsx` - Initial role selection
- `quiz-question.tsx` - Question display
- `quiz-results.tsx` - Results display with scoring
- `quiz-benchmarks.tsx` - Industry comparison
- `quiz-pdf-download.tsx` - PDF export
- `quiz-share.tsx` - Social sharing
- `quiz-resume-prompt.tsx` - Resume saved progress
- `quiz-company-comparison.tsx` - Compare results

---

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output CLAUDE.md|01-app:{04-glossary.mdx}|01-app/01-getting-started:{01-installation.mdx,02-project-structure.mdx,03-layouts-and-pages.mdx,04-linking-and-navigating.mdx,05-server-and-client-components.mdx,06-cache-components.mdx,07-fetching-data.mdx,08-updating-data.mdx,09-caching-and-revalidating.mdx,10-error-handling.mdx,11-css.mdx,12-images.mdx,13-fonts.mdx,14-metadata-and-og-images.mdx,15-route-handlers.mdx,16-proxy.mdx,17-deploying.mdx,18-upgrading.mdx}|01-app/02-guides:{analytics.mdx,authentication.mdx,backend-for-frontend.mdx,caching.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,data-security.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,json-ld.mdx,lazy-loading.mdx,local-development.mdx,mcp.mdx,mdx.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,prefetching.mdx,production-checklist.mdx,progressive-web-apps.mdx,public-static-pages.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,single-page-applications.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx,videos.mdx}|01-app/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|01-app/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|01-app/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx,version-16.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache-private.mdx,use-cache-remote.mdx,use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,proxy.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,refresh.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,updateTag.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheHandlers.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,isolatedDevBuild.mdx,logging.mdx,mdxRs.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackFileSystemCache.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-10.mdx,version-11.mdx,version-12.mdx,version-13.mdx,version-14.mdx,version-9.mdx}|02-pages/03-building-your-application/01-routing:{01-pages-and-layouts.mdx,02-dynamic-routes.mdx,03-linking-and-navigating.mdx,05-custom-app.mdx,06-custom-document.mdx,07-api-routes.mdx,08-custom-error.mdx}|02-pages/03-building-your-application/02-rendering:{01-server-side-rendering.mdx,02-static-site-generation.mdx,04-automatic-static-optimization.mdx,05-client-side-rendering.mdx}|02-pages/03-building-your-application/03-data-fetching:{01-get-static-props.mdx,02-get-static-paths.mdx,03-forms-and-mutations.mdx,03-get-server-side-props.mdx,05-client-side.mdx}|02-pages/03-building-your-application/06-configuring:{12-error-handling.mdx}|02-pages/04-api-reference:{06-edge.mdx,08-turbopack.mdx}|02-pages/04-api-reference/01-components:{font.mdx,form.mdx,head.mdx,image-legacy.mdx,image.mdx,link.mdx,script.mdx}|02-pages/04-api-reference/02-file-conventions:{instrumentation.mdx,proxy.mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-api-reference/03-functions:{get-initial-props.mdx,get-server-side-props.mdx,get-static-paths.mdx,get-static-props.mdx,next-request.mdx,next-response.mdx,use-params.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,userAgent.mdx}|02-pages/04-api-reference/04-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,assetPrefix.mdx,basePath.mdx,bundlePagesRouterDependencies.mdx,compress.mdx,crossOrigin.mdx,devIndicators.mdx,distDir.mdx,env.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,httpAgentOptions.mdx,images.mdx,isolatedDevBuild.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,serverExternalPackages.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,webVitalsAttribution.mdx,webpack.mdx}|02-pages/04-api-reference/04-config:{01-typescript.mdx,02-eslint.mdx}|02-pages/04-api-reference/05-cli:{create-next-app.mdx,next.mdx}|03-architecture:{accessibility.mdx,fast-refresh.mdx,nextjs-compiler.mdx,supported-browsers.mdx}|04-community:{01-contribution-guide.mdx,02-rspack.mdx}<!-- NEXT-AGENTS-MD-END -->
