import Script from "next/script";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tributary AI",
    alternateName: "Tributary",
    url: "https://www.thetributary.ai",
    logo: "https://www.thetributary.ai/logo.png",
    description:
      "Technology consulting that helps companies use AI to work smarter and spend less—not more. Simplify operations. Reduce costs. Move faster.",
    founder: {
      "@type": "Person",
      name: "Michael Cooper",
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
    name: "Tributary AI",
    image: "https://www.thetributary.ai/logo.png",
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
    url: "https://www.thetributary.ai",
    email: "sales@thetributary.ai",
    telephone: "(208) 330-5534",
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
      name: "Tributary AI",
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

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "The Assessment - AI Readiness Diagnostic",
    description:
      "A two-week diagnostic evaluating People, Process, Technology, and Politics to identify AI transformation opportunities",
    provider: {
      "@type": "LocalBusiness",
      name: "Tributary AI",
      url: "https://www.thetributary.ai",
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
