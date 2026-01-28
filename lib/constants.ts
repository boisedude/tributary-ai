/**
 * @fileoverview Centralized constants for the Tributary AI website.
 * This file contains all magic strings, routes, emails, and configuration
 * values used throughout the application. AI agents and developers should
 * reference these constants instead of hardcoding values.
 */

// =============================================================================
// ROUTES
// =============================================================================

/**
 * Application route constants.
 * Use these instead of hardcoding paths throughout the application.
 */
export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  ASSESSMENT: "/assessment",
  QUIZ: "/quiz",
  AI_AUTOMATION: "/services/ai-automation",
  AI_DEVELOPMENT: "/services/ai-development",
  DATA_READINESS: "/services/data-readiness",
  MANAGED_SERVICES: "/services/managed-services",
  ABOUT: "/about",
  BLOG: "/blog",
  CONTACT: "/contact",
  PARTNERS: "/partners",
  CAREERS: "/careers",
  BRAND: "/brand",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

// =============================================================================
// CONTACT INFORMATION
// =============================================================================

/**
 * Email addresses used throughout the site.
 */
export const EMAILS = {
  INFO: "info@thetributary.ai",
  SALES: "sales@thetributary.ai",
  PARTNER: "partner@thetributary.ai",
  CAREERS: "careers@thetributary.ai",
  MICHAEL: "michael@thetributary.ai",
} as const;

/**
 * External URLs and links.
 */
export const EXTERNAL_LINKS = {
  CALENDLY: "https://calendly.com/tributary-ai/30min",
  LINKEDIN: "https://www.linkedin.com/company/tributaryai",
  TWITTER: "https://twitter.com/tributaryai",
  PODCAST_URL: "https://www.agentic-saas-talks.com/",
} as const;

// =============================================================================
// COMPANY INFORMATION
// =============================================================================

/**
 * Company branding and identity constants.
 */
export const COMPANY = {
  NAME: "Tributary",
  LEGAL_NAME: "MDC IT, dba Tributary AI",
  TAGLINE: "Serving enterprises since 1999",
  TAGLINE_SECONDARY: "AI should reduce your tech spend. Not increase it.",
  DESCRIPTION:
    "Technology consulting that helps companies use AI to work smarter and spend less—not more. Simplify operations. Reduce costs. Move faster.",
  LOCATION: "723 W Headwaters Dr, Eagle, Idaho",
  PHONE: "(208) 330-5534",
  FOUNDED_YEAR: 1999,
  COPYRIGHT_YEAR: new Date().getFullYear(),
} as const;

/**
 * Website metadata for SEO and social sharing.
 */
export const SITE_METADATA = {
  TITLE: "Tributary AI | Technology Consulting for the AI Era",
  DESCRIPTION:
    "AI should reduce your tech spend—not increase it. We help companies simplify operations, cut complexity, and move faster. 30 years of transformation experience.",
  URL: "https://thetributary.ai",
  OG_IMAGE: "/og-image.png",
  TWITTER_HANDLE: "@tributaryai",
} as const;

// =============================================================================
// NAVIGATION
// =============================================================================

/**
 * Navigation item interface for type safety.
 */
export interface NavItem {
  /** The route path */
  href: string;
  /** Display label for the navigation item */
  label: string;
  /** Optional description for accessibility or tooltips */
  description?: string;
}

/**
 * Main navigation items displayed in header and mobile menu.
 * Order determines display order in the navigation.
 */
export const NAV_ITEMS: NavItem[] = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.SERVICES, label: "Services" },
  { href: ROUTES.ASSESSMENT, label: "The Assessment" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.BLOG, label: "Blog" },
  { href: ROUTES.CONTACT, label: "Contact" },
];

/**
 * Footer navigation items (may include additional links like Privacy, Terms).
 * @deprecated Use FOOTER_NAV_GROUPS instead for organized footer layout
 */
export const FOOTER_NAV_ITEMS: NavItem[] = [
  { href: ROUTES.SERVICES, label: "Services" },
  { href: ROUTES.ASSESSMENT, label: "The Assessment" },
  { href: ROUTES.AI_AUTOMATION, label: "AI Automation" },
  { href: ROUTES.AI_DEVELOPMENT, label: "AI Development" },
  { href: ROUTES.DATA_READINESS, label: "Data Readiness" },
  { href: ROUTES.MANAGED_SERVICES, label: "Managed Services" },
  { href: ROUTES.ABOUT, label: "Our Founder" },
  { href: ROUTES.PARTNERS, label: "Partners" },
  { href: ROUTES.CAREERS, label: "Careers" },
  { href: ROUTES.BRAND, label: "Brand Assets" },
  { href: ROUTES.BLOG, label: "Blog" },
  { href: ROUTES.CONTACT, label: "Contact" },
  { href: ROUTES.PRIVACY, label: "Privacy Policy" },
  { href: ROUTES.TERMS, label: "Terms of Service" },
];

/**
 * Grouped footer navigation for organized multi-column layout.
 */
export const FOOTER_NAV_GROUPS = {
  services: {
    title: "Services",
    items: [
      { href: ROUTES.ASSESSMENT, label: "The Assessment" },
      { href: ROUTES.AI_AUTOMATION, label: "AI Automation" },
      { href: ROUTES.AI_DEVELOPMENT, label: "AI Development" },
      { href: ROUTES.DATA_READINESS, label: "Data Readiness" },
      { href: ROUTES.MANAGED_SERVICES, label: "Managed Services" },
    ],
  },
  company: {
    title: "Company",
    items: [
      { href: ROUTES.ABOUT, label: "About" },
      { href: ROUTES.BLOG, label: "Blog" },
      { href: ROUTES.CAREERS, label: "Careers" },
      { href: ROUTES.PARTNERS, label: "Partners" },
      { href: ROUTES.BRAND, label: "Brand Assets" },
      { href: ROUTES.CONTACT, label: "Contact" },
    ],
  },
  legal: {
    title: "Legal",
    items: [
      { href: ROUTES.PRIVACY, label: "Privacy" },
      { href: ROUTES.TERMS, label: "Terms" },
    ],
  },
} as const;

// =============================================================================
// ASSETS
// =============================================================================

/**
 * Image and asset paths.
 */
export const ASSETS = {
  LOGO_HEADER: "/logos/logo-header.png",
  LOGO_HEADER_DARK: "/logos/logo-header-dark.png",
  LOGO_FOOTER: "/logos/logo-footer.png",
  LOGO_FOOTER_DARK: "/logos/logo-footer-dark.png",
  LOGO_FULL: "/logos/logo-full.png",
  LOGO_ICON: "/logos/logo-icon.png",
  LOGO_HORIZONTAL: "/logos/logo-horizontal.png",
  OG_IMAGE: "/og-image.png",
  FAVICON: "/favicon.ico",
} as const;

// =============================================================================
// BLOG CONFIGURATION
// =============================================================================

/**
 * Blog-related constants and configuration.
 */
export const BLOG_CONFIG = {
  /** Directory where blog MDX files are stored */
  CONTENT_DIR: "content/blog",
  /** Number of posts to show per page */
  POSTS_PER_PAGE: 12,
  /** Default author if not specified in frontmatter */
  DEFAULT_AUTHOR: "Michael Cooper",
  /** Default author image */
  DEFAULT_AUTHOR_IMAGE: "/images/michael-cooper.jpg",
} as const;

// =============================================================================
// FORM CONFIGURATION
// =============================================================================

/**
 * Form-related constants.
 */
export const FORM_CONFIG = {
  /** Web3Forms API endpoint */
  WEB3FORMS_ENDPOINT: "https://api.web3forms.com/submit",
  /** Form submission success message */
  SUCCESS_MESSAGE: "Thank you! We'll be in touch soon.",
  /** Form submission error message */
  ERROR_MESSAGE: "Something went wrong. Please try again or email us directly.",
} as const;

// =============================================================================
// CREDENTIALS & AWARDS
// =============================================================================

/**
 * Company credentials and awards for display.
 */
export const CREDENTIALS = [
  "30 Years Transformation Experience",
  "Microsoft",
  "Citrix",
  "Confluent",
  "Astronomer",
  "Micron",
] as const;
