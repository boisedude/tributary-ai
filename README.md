# Tributary AI Systems Website

Marketing website for Tributary AI Systems - AI consulting firm helping mid-market companies build solid foundations for AI transformation.

**Live Site:** https://www.thetributary.ai

## For AI Agents

See [CLAUDE.md](./CLAUDE.md) for comprehensive project context, patterns, constants, and conventions.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, static export)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (CSS variables, OKLch colors)
- **Components:** shadcn/ui (Radix primitives)
- **Animations:** Framer Motion 12
- **Blog:** MDX with next-mdx-remote
- **Database:** Supabase (quiz submissions, contacts, preferences)
- **Deployment:** Hostinger via SSH/rsync

## Quick Start

```bash
npm install
npm run dev      # Dev server at localhost:3000
npm run build    # Static export to ./out/
npm run deploy   # Deploy via rsync (see DEPLOYMENT.md)
```

## Project Structure

```
app/              # Pages & routes (App Router)
components/       # UI components
  ui/             # shadcn/ui primitives
  sections/       # Homepage sections
  layout/         # Navigation, Footer
  quiz/           # AI readiness quiz
content/blog/     # MDX blog posts (36 posts)
lib/              # Utilities & constants
  constants.ts    # Routes, emails, company info, assets
  supabase.ts     # Database client
  utils.ts        # cn() helper
public/           # Static assets
```

## Key Files

| File | Purpose |
|------|---------|
| `lib/constants.ts` | All routes, emails, external links, assets |
| `lib/supabase.ts` | Database types and client |
| `app/layout.tsx` | Root layout, metadata, fonts |
| `app/globals.css` | Tailwind config, CSS variables, custom utilities |

## Content Management

### Blog Posts
Create `.mdx` files in `content/blog/` with frontmatter:
```yaml
---
title: "Post Title"
date: "2026-01-30"
excerpt: "Brief description"
author: "Michael Cooper"
tags: ["AI", "Strategy"]
image: "/blog/post-image.webp"
---
```

### Service Data
Edit `data/services.ts` for service information.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_GA_ID=G-3TLS4354D6  # Optional
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

Quick deploy: `npm run deploy` (builds and syncs via rsync)

## Contact

- **Email:** michael@thetributary.ai
- **Site:** https://www.thetributary.ai

---

(c) 2026 Tributary AI Systems
