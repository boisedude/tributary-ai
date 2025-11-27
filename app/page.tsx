import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <CTASection />
    </>
  );
}
