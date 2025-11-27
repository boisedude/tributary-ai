# Tributary AI Systems Website

**Official website for Tributary AI Systems** - Expert consulting in AI readiness, cloud marketplace GTM, and agentic systems strategy.

## 🌐 Live Site
- **Production URL:** https://www.thetributary.ai
- **Current Status:** Ready for deployment

## 🎨 Brand Identity

### Tagline
"Where Business Experience Meets Intelligent Innovation"

### Positioning
Preparing businesses for the agentic era through strategic technology transformation and AI readiness consulting.

### Color Palette
- **Primary:** Oxford Blue (#0F172A) - Deep expertise, authority
- **Accent:** Teal (#14B8A6) - Innovation, modern technology
- **Secondary:** Coral (#F97316) - Warmth, human-centered approach

## 🚀 Tech Stack

- **Framework:** Next.js 16.0.5 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Animations:** Framer Motion 12
- **Theme:** next-themes (dark/light mode)
- **Blog:** MDX with next-mdx-remote
- **Syntax Highlighting:** rehype-highlight (GitHub Dark theme)
- **Build Output:** Static export for Hostinger deployment

## 📁 Project Structure

```
tributary-site/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with nav/footer
│   ├── page.tsx                 # Homepage
│   ├── about/                   # About page
│   ├── blog/                    # Blog system
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/             # Individual posts
│   ├── contact/                 # Contact page with Calendly
│   └── services/                # Services pages
│       ├── page.tsx            # Services overview
│       ├── ai-readiness/       # Service detail pages
│       ├── agentic-systems/
│       ├── implementation/
│       └── cloud-marketplace/
│
├── components/
│   ├── layout/                  # Navigation & Footer
│   ├── sections/                # Homepage sections
│   ├── blog/                    # Blog components
│   ├── ui/                      # shadcn/ui components
│   └── theme-provider.tsx
│
├── content/
│   └── blog/                    # MDX blog posts
│
├── data/
│   └── services.ts              # Service data structure
│
├── lib/
│   ├── blog.ts                  # Blog utilities
│   └── utils.ts                 # Helper functions
│
├── public/                      # Static assets
│   ├── logo.png                # [TO ADD]
│   └── og-image.png            # [TO ADD]
│
└── next.config.ts              # Next.js config (static export)
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd /mnt/c/Projects/Tributary.ai/tributary-site

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000 to view the site.

### Available Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production (static export)
npm run start    # Start production server (if needed)
npm run lint     # Run ESLint
```

## 📝 Content Management

### Adding Blog Posts

1. Create a new `.mdx` file in `content/blog/`
2. Add frontmatter:

```yaml
---
title: "Your Post Title"
date: "2025-01-27"
excerpt: "Brief description for listings"
author: "Tributary AI Systems"
tags: ["AI", "Business Strategy"]
image: "/blog/post-image.png"
readingTime: "8 min read"
---
```

3. Write your content using Markdown/MDX
4. Build the site - the post will be automatically generated

### Updating Services

Edit `data/services.ts` to modify service information. Changes will reflect across:
- Homepage services overview
- Services listing page
- Individual service detail pages

## 🎯 Key Features

### Pages & Routes
- ✅ Homepage with hero, services overview, and CTA
- ✅ 4 Service detail pages (AI Readiness, Agentic Systems, Implementation, Cloud Marketplace)
- ✅ About page with founder story and credentials
- ✅ Contact page with Calendly integration
- ✅ Blog with MDX support and 2 starter posts
- ✅ Dynamic routing for blog posts
- ✅ Responsive navigation with mobile menu
- ✅ Footer with links and contact info

### Design Features
- ✨ Dark/light theme toggle
- ✨ Smooth scroll animations (Framer Motion)
- ✨ Card glow effects (teal & coral)
- ✨ Gradient backgrounds
- ✨ Responsive grid layouts
- ✨ Mobile-first design
- ✨ Accessible components (ARIA labels)

### SEO Optimization
- 📊 Metadata API for all pages
- 📊 OpenGraph tags for social sharing
- 📊 Twitter Card metadata
- 📊 Structured data (JSON-LD)
- 📊 Semantic HTML
- 📊 Sitemap generation
- 📊 Robots.txt configuration

## 🚢 Deployment to Hostinger

### Build for Production

```bash
# Create static export
npm run build
```

This generates an `out/` directory with static files.

### Upload to Hostinger

1. **Connect via FTP:**
   - Host: Your Hostinger FTP hostname
   - Username: Your FTP username
   - Password: Your FTP password

2. **Upload files:**
   - Navigate to your domain's `public_html` directory
   - Upload all contents from the `out/` directory
   - Ensure file permissions are correct (644 for files, 755 for directories)

3. **Configure domain:**
   - Ensure www.thetributary.ai points to the correct directory
   - Update DNS if needed
   - Wait for DNS propagation (up to 24-48 hours)

### Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify mobile responsiveness
- [ ] Check dark/light theme toggle
- [ ] Test blog post links
- [ ] Verify contact form/Calendly embed
- [ ] Check social sharing (OG images)
- [ ] Test navigation on all pages
- [ ] Verify Google Analytics (if configured)

## 🔧 Configuration

### Environment Variables

Currently, no environment variables are required. The site is fully static.

If you add dynamic features later (API routes, database), create a `.env.local` file:

```env
# Example for future use
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_CALENDLY_URL=your-calendly-url
```

### Update Calendly Link

Edit `app/contact/page.tsx` and replace the placeholder:

```typescript
// Find this line:
src="https://calendly.com/your-calendly-link"

// Replace with:
src="https://calendly.com/your-actual-link"
```

## 📋 TODO / Future Enhancements

### Immediate (Before Launch)
- [ ] Add Tributary AI logo (`/public/logo.png`)
- [ ] Add OpenGraph image (`/public/og-image.png`, 1200x630px)
- [ ] Update Calendly URL in contact page
- [ ] Review all content for accuracy
- [ ] Test on mobile devices
- [ ] Add favicon

### Short-term
- [ ] Add Google Analytics
- [ ] Create more blog posts
- [ ] Add service page images/illustrations
- [ ] Configure contact form (optional - currently using Calendly)
- [ ] Add newsletter signup (optional)

### Long-term
- [ ] Add case studies page (when clients available)
- [ ] Add testimonials section
- [ ] Integrate Agentic SaaS Talks podcast feed
- [ ] Add team section (when hiring)
- [ ] Create resources/downloads section
- [ ] Add client logos/partners section

## 🎨 Design System

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Bold, tracking-tight
- **Body:** Regular, comfortable line-height

### Spacing
- Uses Tailwind's spacing scale (4px base unit)
- Consistent padding/margin across components

### Components
All UI components use shadcn/ui with Tributary brand colors:
- Button (6 variants, 6 sizes)
- Card (with header, content, footer)
- Navigation Menu
- Tabs
- Tooltip
- Hover Card
- Badge
- Input/Textarea

### Custom Utilities
See `app/globals.css` for custom classes:
- `.bg-gradient-tributary` - Brand gradient
- `.bg-gradient-subtle` - Light background gradient
- `.card-glow-teal` - Teal glow effect on hover
- `.card-glow-coral` - Coral glow effect on hover
- `.text-gradient` - Teal to Coral text gradient
- `.animate-fade-up` - Fade up animation
- `.animate-fade-in` - Fade in animation

## 📞 Contact & Support

- **Email:** mcooper@mcooper.com
- **LinkedIn:** https://www.linkedin.com/company/tributaryai
- **Location:** Boise, Idaho (serving clients nationally)

## 📄 License

© 2025 Tributary AI Systems. All rights reserved.

---

**Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui**
