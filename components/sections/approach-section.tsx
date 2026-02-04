import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const dimensions = [
  { title: "Data", items: "Data quality, system integration, governance, single source of truth" },
  { title: "People", items: "Leadership fluency, decision rights, talent alignment" },
  { title: "Process", items: "Intake gaps, coordination overhead, bottlenecks" },
  { title: "Technology", items: "Stack complexity, automation readiness, spend trajectory" },
  { title: "Politics", items: "Executive alignment, change sponsorship, prior trauma" },
];

/**
 * Approach section - The Assessment overview.
 * Clean, editorial design.
 */
export function ApproachSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <h2 className="text-3xl font-bold sm:text-4xl">
            Our approach: simplify first
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Before we recommend anything, we need to understand where you are. Not where you think you are—where you actually are.
          </p>

          {/* The Assessment */}
          <div className="mt-8 p-8 bg-muted/30 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold">The Assessment</h3>
                <p className="mt-2 text-muted-foreground">
                  A 2-3 week diagnostic. Detailed findings. Leadership presentation. Prioritized roadmap.
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold">$12K–$25K</p>
                <p className="text-sm text-muted-foreground">Satisfaction guarantee</p>
              </div>
            </div>
          </div>

          {/* Five Dimensions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Five dimensions we evaluate</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {dimensions.map((d) => (
                <div key={d.title} className="p-4 border rounded-lg">
                  <p className="font-medium">{d.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{d.items}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              <strong>Why Politics?</strong> Because politics kills more transformations than bad technology.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Button asChild size="lg" className="group">
              <Link href="/assessment">
                Learn More About The Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
