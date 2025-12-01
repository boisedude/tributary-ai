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
      "SaaS GTM consulting for the agentic era. Cloud marketplace strategy, fractional GTM leadership, and agentic SaaS advisory.",
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
      email: "sales@thetributary.ai",
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
      "SaaS GTM consulting firm specializing in cloud marketplace strategy, fractional GTM leadership, and agentic SaaS advisory.",
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
    email: "sales@thetributary.ai",
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
    serviceType: "SaaS GTM Consulting",
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
      name: "SaaS GTM Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud Marketplace GTM",
            description:
              "Get listed, transact, and co-sell on AWS, Azure, and GCP marketplaces. Marketplace listings, co-sell programs, and partner ecosystem development.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fractional GTM Leadership",
            description:
              "Part-time strategic GTM leadership for SaaS companies. Fractional CRO, VP Sales, and VP Partnerships services.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Agentic SaaS Advisory",
            description:
              "Navigate the shift from seat-based to outcome-based business models. Strategic advisory for SaaS companies in the agentic era.",
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
