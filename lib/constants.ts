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
  RESOURCES: "/resources",
  ABOUT: "/about",
  BLOG: "/blog",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  ASSESSMENT: "/assessment",
} as const;

/**
 * Service-specific route paths.
 */
export const SERVICE_ROUTES = {
  CLOUD_MARKETPLACE: "/services/cloud-marketplace",
  FRACTIONAL_GTM: "/services/fractional-gtm",
  AGENTIC_ADVISORY: "/services/agentic-advisory",
  AI_READINESS: "/services/ai-readiness",
} as const;

// =============================================================================
// SERVICE IDS
// =============================================================================

/**
 * Service identifier constants.
 * Use these when calling getServiceById() or referencing services programmatically.
 */
export const SERVICE_IDS = {
  CLOUD_MARKETPLACE: "cloud-marketplace",
  FRACTIONAL_GTM: "fractional-gtm",
  AGENTIC_ADVISORY: "agentic-advisory",
  AI_READINESS: "ai-readiness",
} as const;

export type ServiceId = (typeof SERVICE_IDS)[keyof typeof SERVICE_IDS];

// =============================================================================
// CONTACT INFORMATION
// =============================================================================

/**
 * Email addresses used throughout the site.
 */
export const EMAILS = {
  SALES: "sales@thetributary.ai",
  MICHAEL: "michael@thetributary.ai",
  SUPPORT: "support@thetributary.ai",
} as const;

/**
 * External URLs and links.
 */
export const EXTERNAL_LINKS = {
  CALENDLY: "https://calendly.com/tributary-ai/30min",
  LINKEDIN: "https://www.linkedin.com/company/tributary-ai",
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
  NAME: "Tributary AI",
  LEGAL_NAME: "Tributary AI Systems",
  TAGLINE: "SaaS GTM Acceleration for the Agentic Era",
  DESCRIPTION:
    "SaaS GTM acceleration for the agentic era. Cloud marketplace strategy, fractional GTM leadership, and agentic SaaS advisory.",
  LOCATION: "Boise, Idaho",
  FOUNDED_YEAR: 2024,
  COPYRIGHT_YEAR: new Date().getFullYear(),
} as const;

/**
 * Website metadata for SEO and social sharing.
 */
export const SITE_METADATA = {
  TITLE: "Tributary AI | SaaS GTM Consulting for the Agentic Era",
  DESCRIPTION:
    "SaaS GTM acceleration for the agentic era. Cloud marketplace strategy, fractional GTM leadership, and agentic SaaS advisory. Expert consulting from Partner of the Year award winners with 30+ years of enterprise technology experience.",
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
  { href: ROUTES.RESOURCES, label: "Resources" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.BLOG, label: "Blog" },
  { href: ROUTES.CONTACT, label: "Contact" },
];

/**
 * Footer navigation items (may include additional links like Privacy, Terms).
 */
export const FOOTER_NAV_ITEMS: NavItem[] = [
  { href: ROUTES.SERVICES, label: "Services" },
  { href: ROUTES.RESOURCES, label: "Resources" },
  { href: ROUTES.ABOUT, label: "About Us" },
  { href: ROUTES.BLOG, label: "Blog" },
  { href: ROUTES.CONTACT, label: "Contact" },
  { href: ROUTES.PRIVACY, label: "Privacy Policy" },
  { href: ROUTES.TERMS, label: "Terms of Service" },
];

// =============================================================================
// ASSETS
// =============================================================================

/**
 * Image and asset paths.
 */
export const ASSETS = {
  LOGO_HEADER: "/logos/logo-header.png",
  LOGO_FULL: "/logos/logo-full.png",
  LOGO_ICON: "/logos/logo-icon.png",
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
  "30+ Years GTM Experience",
  "Microsoft Partner of the Year",
  "Google Partner of the Year",
  "AWS/Azure/GCP Expert",
] as const;
