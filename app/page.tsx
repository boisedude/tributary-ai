import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { PodcastBanner } from "@/components/sections/podcast-banner";
import { Differentiators } from "@/components/sections/differentiators";
import { ServicesOverview } from "@/components/sections/services-overview";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Tributary AI | SaaS GTM Consulting for the Agentic Era",
  description:
    "SaaS GTM acceleration for the agentic era. Cloud marketplace strategy, fractional GTM leadership, and agentic SaaS advisory. Expert consulting from Partner of the Year award winners with 30+ years of enterprise technology experience.",
  keywords: [
    "SaaS GTM consulting",
    "cloud marketplace strategy",
    "AWS marketplace consulting",
    "Azure marketplace strategy",
    "fractional GTM leadership",
    "agentic SaaS advisory",
    "AI consulting",
    "Boise Idaho consulting",
  ],
  openGraph: {
    title: "Tributary AI | SaaS GTM Consulting for the Agentic Era",
    description:
      "Cloud marketplace strategy, fractional GTM leadership, and agentic SaaS advisory from Partner of the Year award winners.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <PodcastBanner />
      <Differentiators />
      <ServicesOverview />
      <CTASection />
    </>
  );
}
