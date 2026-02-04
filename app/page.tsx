import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ShiftSection } from "@/components/sections/shift-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { WhoThisIsForSection } from "@/components/sections/who-this-is-for-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ThoughtLeadershipSection } from "@/components/sections/thought-leadership-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Tributary AI | Technology Consulting for the AI Era",
  description:
    "AI isn't the hard part—making it work inside your business can be. We help organizations simplify how they operate so AI creates value instead of noise. 30 years of transformation experience.",
  keywords: [
    "AI consulting",
    "AI readiness assessment",
    "technology consulting",
    "digital transformation",
    "AI strategy",
    "data readiness",
    "data governance",
    "process automation",
    "mid-market consulting",
    "simplify operations",
    "reduce tech spend",
    "AI transformation",
    "technology simplification",
    "Boise Idaho consulting",
  ],
  alternates: {
    canonical: "https://www.thetributary.ai/",
  },
  openGraph: {
    title: "Tributary AI | Technology Consulting for the AI Era",
    description:
      "AI isn't the hard part—making it work inside your business can be. We help organizations simplify how they operate so AI creates value instead of noise.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ShiftSection />
      <ApproachSection />
      <CredentialsSection />
      <WhoThisIsForSection />
      <FAQSection />
      <ThoughtLeadershipSection />
      <CTASection />
    </>
  );
}
