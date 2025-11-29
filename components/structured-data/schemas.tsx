import Script from "next/script";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tributary AI Systems",
    alternateName: "Tributary AI",
    url: "https://www.thetributary.ai",
    logo: "https://www.thetributary.ai/logo.png",
    description:
      "AI consulting and business transformation services helping companies prepare for the agentic era.",
    founder: {
      "@type": "Person",
      name: "Mike Cooper",
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
      email: "mcooper@mcooper.com",
      contactType: "sales",
    },
    sameAs: ["https://www.linkedin.com/company/tributaryai"],
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
    "@id": "https://www.thetributary.ai/#localbusiness",
    name: "Tributary AI Systems",
    image: "https://www.thetributary.ai/logo.png",
    description:
      "Boutique AI consulting firm specializing in AI readiness assessment, agentic systems strategy, and cloud marketplace acceleration.",
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
    url: "https://www.thetributary.ai",
    email: "mcooper@mcooper.com",
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

export function ServicesSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Consulting",
    provider: {
      "@type": "Organization",
      name: "Tributary AI Systems",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Consulting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Readiness Assessment",
            description:
              "Comprehensive evaluation of your organization's technology, processes, and culture to identify opportunities and readiness for AI adoption.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Agentic Systems Strategy",
            description:
              "Navigate the shift from seat-based to outcome-based business models with strategic guidance for the agentic era.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Implementation & Integration",
            description:
              "Turn your AI vision into working solutions with practical implementation and seamless integration.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud Marketplace Acceleration",
            description:
              "Navigate AWS, Azure, and GCP marketplace listings, co-sell programs, and partner ecosystems.",
          },
        },
      ],
    },
  };

  return (
    <Script
      id="services-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  image?: string;
  url: string;
}

export function BlogPostSchema({
  title,
  description,
  datePublished,
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
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Tributary AI Systems",
      logo: {
        "@type": "ImageObject",
        url: "https://www.thetributary.ai/logo.png",
      },
    },
    image: image ? `https://www.thetributary.ai${image}` : undefined,
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
