import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { TwoPathsSection } from "@/components/sections/two-paths-section";
import { AssessmentOverview } from "@/components/sections/assessment-overview";
import { WhatHappensNext } from "@/components/sections/what-happens-next";
import { AboutSnippet } from "@/components/sections/about-snippet";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Tributary AI | Technology Consulting for the AI Era",
  description:
    "AI should reduce your tech spend—not increase it. We help companies simplify operations, cut complexity, and move faster. 30 years of transformation experience.",
  keywords: [
    "AI consulting",
    "technology consulting",
    "digital transformation",
    "AI strategy",
    "mid-market consulting",
    "simplify operations",
    "reduce tech spend",
    "Boise Idaho consulting",
  ],
  openGraph: {
    title: "Tributary AI | Technology Consulting for the AI Era",
    description:
      "AI should reduce your tech spend—not increase it. We help companies simplify operations, cut complexity, and move faster.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <TwoPathsSection />
      <AssessmentOverview />
      <WhatHappensNext />
      <AboutSnippet />
      <CTASection />
    </>
  );
}
