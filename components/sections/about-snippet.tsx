import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

/**
 * About snippet section for the homepage.
 * Links to full about page.
 */
export function AboutSnippet() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold sm:text-4xl mb-6">
                  Why Tributary
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  30 years leading technology transformations. I&apos;ve seen what works, what fails, and why most initiatives stall. Now I help companies see clearly and move faster.
                </p>

                {/* Company Logo Row */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
                  <Image
                    src="/logos/companies/microsoft.png"
                    alt="Microsoft"
                    width={120}
                    height={26}
                    className="h-5 w-auto object-contain"
                    style={{ opacity: 0.6 }}
                  />
                  <Image
                    src="/logos/companies/citrix.png"
                    alt="Citrix"
                    width={80}
                    height={26}
                    className="h-5 w-auto object-contain"
                    style={{ opacity: 0.6 }}
                  />
                  <Image
                    src="/logos/companies/confluent.png"
                    alt="Confluent"
                    width={120}
                    height={26}
                    className="h-5 w-auto object-contain"
                    style={{ opacity: 0.6 }}
                  />
                  <Image
                    src="/logos/companies/micron.png"
                    alt="Micron"
                    width={100}
                    height={26}
                    className="h-5 w-auto object-contain"
                    style={{ opacity: 0.6 }}
                  />
                  <Image
                    src="/logos/companies/simplot.png"
                    alt="Simplot"
                    width={100}
                    height={26}
                    className="h-5 w-auto object-contain"
                    style={{ opacity: 0.6 }}
                  />
                </div>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  I know change is hard. I know the difference between complexity that should be eliminated and institutional knowledge that has to be protected. The goal isn&apos;t disruption—it&apos;s making sure AI simplifies your operation instead of adding another layer to it.
                </p>
                <div className="mt-8">
                  <Button asChild variant="outline" size="lg" className="group">
                    <Link href="/about">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
