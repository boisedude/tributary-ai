import { Hero } from "@/components/sections/hero";
import { StatsCounter } from "@/components/sections/stats-counter";
import { Differentiators } from "@/components/sections/differentiators";
import { ServicesOverview } from "@/components/sections/services-overview";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <Differentiators />
      <ServicesOverview />
      <CTASection />
    </>
  );
}
