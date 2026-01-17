# Contributing Guide

This guide explains how to add new content and features to the Tributary AI website. It's designed for both human developers and AI agents working with the codebase.

## Table of Contents

- [Project Structure](#project-structure)
- [Adding a New Blog Post](#adding-a-new-blog-post)
- [Adding a New Service](#adding-a-new-service)
- [Adding a New Page](#adding-a-new-page)
- [Modifying Navigation](#modifying-navigation)
- [Working with Constants](#working-with-constants)
- [Component Patterns](#component-patterns)
- [Styling Guidelines](#styling-guidelines)

---

## Project Structure

```
tributary-ai/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with metadata
│   ├── blog/              # Blog pages
│   │   ├── page.tsx       # Blog listing
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── services/          # Service pages
│   │   ├── page.tsx       # Services overview
│   │   └── [id]/          # Individual service pages
│   └── ...                # Other pages (about, contact, etc.)
├── components/            # React components
│   ├── layout/           # Navigation, footer
│   ├── sections/         # Page sections (hero, CTA, etc.)
│   ├── blog/             # Blog-specific components
│   ├── forms/            # Form components
│   └── ui/               # shadcn/ui primitives
├── content/
│   └── blog/             # MDX blog posts
├── data/
│   └── services.ts       # Service definitions
├── lib/
│   ├── constants.ts      # Centralized constants
│   ├── blog.ts           # Blog utilities
│   └── utils.ts          # Utility functions
├── public/               # Static assets
│   ├── images/          # Blog and page images
│   └── logos/           # Brand logos
└── docs/                 # Documentation
```

---

## Adding a New Blog Post

### Step 1: Create the MDX File

Create a new file in `content/blog/` with a URL-friendly filename:

```bash
content/blog/your-post-slug.mdx
```

### Step 2: Add Frontmatter

Every blog post requires frontmatter at the top of the file:

```mdx
---
title: "Your Post Title"
date: "2025-01-15"
excerpt: "A brief description of your post (1-2 sentences). This appears in listings and SEO."
tags: ["AI", "SaaS", "GTM Strategy"]
author: "Michael Cooper"
image: "/images/blog/your-post-image.jpg"
---

Your content starts here...
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title (displayed as H1) |
| `date` | Yes | Publication date (YYYY-MM-DD format) |
| `excerpt` | Yes | Short description for listings and SEO |
| `tags` | No | Array of categorization tags |
| `author` | No | Author name (defaults to "Tributary AI Systems") |
| `image` | No | Featured image path (relative to /public) |

### Step 3: Write Content

Use standard Markdown with MDX enhancements:

```mdx
## Section Heading

Regular paragraph text with **bold** and *italic*.

### Subsection

- Bullet points
- Work as expected

1. Numbered lists
2. Also work

> Blockquotes for emphasis

```javascript
// Code blocks with syntax highlighting
const example = "hello world";
```

### Step 4: Add Images (Optional)

Place images in `public/images/blog/` and reference them:

```mdx
![Alt text](/images/blog/your-image.jpg)
```

### Step 5: Build and Test

```bash
npm run build
npm run dev
```

Visit `http://localhost:3000/blog/your-post-slug` to verify.

---

## Adding a New Service

### Step 1: Add Service Data

Edit `data/services.ts` and add a new entry to the `services` array:

```typescript
{
  id: "your-service-id",  // URL-friendly identifier
  title: "Your Service Title",
  tagline: "Short compelling tagline.",
  description: "Detailed description of the service...",
  icon: YourIcon,  // Import from lucide-react
  features: [
    "Feature one",
    "Feature two",
    "Feature three",
  ],
  idealFor: "Description of ideal client for this service.",
  deliverables: [
    "Deliverable one",
    "Deliverable two",
  ],
  href: "/services/your-service-id",
}
```

### Step 2: Add Service ID Constant

Edit `lib/constants.ts` and add to `SERVICE_IDS`:

```typescript
export const SERVICE_IDS = {
  CLOUD_MARKETPLACE: "cloud-marketplace",
  FRACTIONAL_GTM: "fractional-gtm",
  AGENTIC_ADVISORY: "agentic-advisory",
  YOUR_SERVICE: "your-service-id",  // Add this
} as const;
```

Also add to `SERVICE_ROUTES`:

```typescript
export const SERVICE_ROUTES = {
  // ... existing routes
  YOUR_SERVICE: "/services/your-service-id",
} as const;
```

### Step 3: Create Service Page

Create `app/services/your-service-id/page.tsx`:

```typescript
import { getServiceById } from "@/data/services";
import { SERVICE_IDS } from "@/lib/constants";
import { notFound } from "next/navigation";
// ... copy structure from existing service pages

export default function YourServicePage() {
  const service = getServiceById(SERVICE_IDS.YOUR_SERVICE);
  if (!service) notFound();

  // ... render service page
}
```

---

## Adding a New Page

### Step 1: Create Page File

Create a new directory and page in `app/`:

```bash
app/your-page/page.tsx
```

### Step 2: Basic Page Structure

```typescript
import { Metadata } from "next";
import { SITE_METADATA, COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Your Page Title | ${COMPANY.NAME}`,
  description: "Page description for SEO",
};

export default function YourPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Your Page Title</h1>
      {/* Page content */}
    </main>
  );
}
```

### Step 3: Add to Navigation (If Needed)

Edit `lib/constants.ts`:

```typescript
// Add to ROUTES
export const ROUTES = {
  // ... existing routes
  YOUR_PAGE: "/your-page",
} as const;

// Add to NAV_ITEMS if it should appear in main navigation
export const NAV_ITEMS: NavItem[] = [
  // ... existing items
  { href: ROUTES.YOUR_PAGE, label: "Your Page" },
];
```

---

## Modifying Navigation

All navigation is centralized in `lib/constants.ts`:

### Main Navigation (Header)

Edit `NAV_ITEMS` array:

```typescript
export const NAV_ITEMS: NavItem[] = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.SERVICES, label: "Services" },
  // Add or modify items here
];
```

### Footer Navigation

Edit `FOOTER_NAV_ITEMS` array:

```typescript
export const FOOTER_NAV_ITEMS: NavItem[] = [
  // Footer-specific navigation items
];
```

---

## Working with Constants

### Why Use Constants?

- **Single source of truth**: Change once, update everywhere
- **Type safety**: TypeScript catches typos
- **AI-friendly**: Clear patterns for automated modifications

### Available Constants

| Constant | Purpose |
|----------|---------|
| `ROUTES` | Application URL paths |
| `SERVICE_IDS` | Service identifiers for `getServiceById()` |
| `SERVICE_ROUTES` | Service-specific URLs |
| `EMAILS` | Contact email addresses |
| `EXTERNAL_LINKS` | External URLs (Calendly, LinkedIn, etc.) |
| `COMPANY` | Brand name, tagline, location |
| `SITE_METADATA` | SEO metadata defaults |
| `NAV_ITEMS` | Main navigation items |
| `FOOTER_NAV_ITEMS` | Footer navigation items |
| `ASSETS` | Image and asset paths |
| `BLOG_CONFIG` | Blog configuration |
| `CREDENTIALS` | Company credentials for display |

### Usage Example

```typescript
import { ROUTES, EMAILS, COMPANY } from "@/lib/constants";

// Use in components
<Link href={ROUTES.CONTACT}>Contact Us</Link>
<a href={`mailto:${EMAILS.SALES}`}>Email Sales</a>
<p>{COMPANY.NAME}</p>
```

---

## Component Patterns

### Naming Conventions

- **Files**: `kebab-case.tsx` (e.g., `blog-list.tsx`)
- **Components**: `PascalCase` (e.g., `BlogList`)
- **Functions**: `camelCase` (e.g., `getAllPosts`)

### Component Structure

```typescript
"use client"; // Only if using hooks/interactivity

import { /* dependencies */ } from "...";
import { CONSTANTS } from "@/lib/constants";

/**
 * JSDoc description of what this component does.
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} Component description
 *
 * @example
 * <ComponentName prop="value" />
 */
export function ComponentName({ prop }: Props) {
  // Component logic
  return (
    // JSX
  );
}
```

### Using shadcn/ui Components

This project uses shadcn/ui for UI primitives. Import from `@/components/ui/`:

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

---

## Styling Guidelines

### Tailwind CSS

Use Tailwind classes for all styling:

```typescript
<div className="container mx-auto px-4 py-16">
  <h1 className="text-4xl font-bold text-foreground">Title</h1>
  <p className="text-muted-foreground">Subtitle</p>
</div>
```

### Theme Colors

Use semantic color names that support dark mode:

| Class | Purpose |
|-------|---------|
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary text |
| `bg-background` | Page background |
| `bg-muted` | Subtle background |
| `text-accent` | Brand accent color |
| `bg-accent` | Accent background |

### Animations

Use Framer Motion for animations:

```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## Testing Changes

### Local Development

```bash
npm run dev
```

### Build Check

```bash
npm run build
```

### Lint Check

```bash
npm run lint
```

---

## Deployment

The site deploys to Hostinger via FTP. After changes:

1. Ensure build passes: `npm run build`
2. Deploy: `npm run deploy`

See `DEPLOYMENT.md` for detailed deployment instructions.
