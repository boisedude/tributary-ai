import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ShiftSection } from "@/components/sections/shift-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { WhoThisIsForSection } from "@/components/sections/who-this-is-for-section";
import { ThoughtLeadershipSection } from "@/components/sections/thought-leadership-section";
import { ResourcesSection } from "@/components/sections/resources-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Tributary AI | Technology Consulting for the AI Era",
  description:
    "AI changes everything—that's the opportunity. We help companies navigate the next evolution of business by simplifying operations, not adding complexity. 30 years of transformation experience.",
  keywords: [
    "AI consulting",
    "technology consulting",
    "digital transformation",
    "AI strategy",
    "mid-market consulting",
    "simplify operations",
    "reduce tech spend",
    "AI transformation",
    "technology simplification",
    "Boise Idaho consulting",
  ],
  openGraph: {
    title: "Tributary AI | Technology Consulting for the AI Era",
    description:
      "AI changes everything—that's the opportunity. We help companies navigate the next evolution of business by simplifying operations, not adding complexity.",
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
      <ThoughtLeadershipSection />
      <ResourcesSection />
      <CTASection />
    </>
  );
}
