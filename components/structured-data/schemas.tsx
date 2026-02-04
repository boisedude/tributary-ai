import Script from "next/script";
import { SITE_URL, COMPANY, EMAILS, EXTERNAL_LINKS } from "@/lib/constants";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.DISPLAY_NAME,
    alternateName: COMPANY.NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: COMPANY.DESCRIPTION,
    founder: {
      "@type": "Person",
      name: COMPANY.FOUNDER_NAME,
      jobTitle: "Founder",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boise",
      addressRegion: "ID",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: EMAILS.SALES,
      contactType: "sales",
    },
    sameAs: [EXTERNAL_LINKS.LINKEDIN],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: COMPANY.DISPLAY_NAME,
    image: `${SITE_URL}/logo.png`,
    description:
      "Technology consulting firm helping mid-market companies simplify operations, cut complexity, and move faster with AI.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boise",
      addressRegion: "ID",
      postalCode: "83702",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.615,
      longitude: -116.2023,
    },
    url: SITE_URL,
    email: EMAILS.SALES,
    telephone: COMPANY.PHONE,
    priceRange: "$$$$",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceArea: {
      "@type": "Country",
      name: "United States",
    },
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  url: string;
}

export function BlogPostSchema({
  title,
  description,
  datePublished,
  dateModified,
  author,
  image,
  url,
}: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.DISPLAY_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: image ? `${SITE_URL}${image}` : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Script
      id="blog-post-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "The Assessment - AI Readiness Diagnostic",
    description:
      "A 2-3 week diagnostic evaluating Data, People, Process, Technology, and Politics to identify AI transformation opportunities",
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.DISPLAY_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "AI Consulting",
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AIAutomationServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Automation & Deployment",
    description:
      "Implementing AI into existing workflows. RPA, process automation, AI agent deployment for mid-market companies.",
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.DISPLAY_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Process Automation",
  };

  return (
    <Script
      id="ai-automation-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AIDevelopmentServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Application Development",
    description:
      "Custom AI-powered applications. Internal tools, customer-facing products. From prototype to production.",
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.DISPLAY_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Software Development",
  };

  return (
    <Script
      id="ai-development-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ManagedServicesSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Managed IT Services & Fractional CTO",
    description:
      "Ongoing IT management, cloud administration, and fractional CTO/CIO advisory. AI-powered operations at a fraction of traditional MSP costs.",
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.DISPLAY_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Managed IT Services",
  };

  return (
    <Script
      id="managed-services-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function DataReadinessServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Data Readiness Services",
    description:
      "Get your data AI-ready. Data quality assessment, consolidation, governance, and integration services for companies preparing for AI implementation.",
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.DISPLAY_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Data Consulting",
  };

  return (
    <Script
      id="data-readiness-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogListingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${COMPANY.DISPLAY_NAME} Blog`,
    description:
      "Expert insights on AI strategy, agentic systems, business transformation, and cloud marketplaces. Practical guidance for mid-market companies adopting AI.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: COMPANY.DISPLAY_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <Script
      id="blog-listing-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
