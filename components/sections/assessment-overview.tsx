import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Workflow, Server, Shield } from "lucide-react";

const dimensions = [
  {
    icon: Users,
    title: "People",
    description: "Leadership AI fluency, cognitive load distribution, decision rights clarity, talent-to-work alignment",
  },
  {
    icon: Workflow,
    title: "Process",
    description: "Intake-to-action gaps, coordination overhead, bottleneck visibility, process documentation",
  },
  {
    icon: Server,
    title: "Technology",
    description: "Stack complexity, data accessibility, automation readiness, spend trajectory",
  },
  {
    icon: Shield,
    title: "Politics",
    description: "Executive alignment, change sponsorship, turf risk, prior initiative trauma",
  },
];

/**
 * Assessment overview section for the homepage.
 * Based on MESSAGING_FRAMEWORK.md "The Assessment" section.
 */
export function AssessmentOverview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              The Assessment
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              A two-week diagnostic that shows you exactly where you stand, what&apos;s holding you back, and what to change.
            </p>
          </div>

          {/* Four Dimensions */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {dimensions.map((dimension) => {
              const Icon = dimension.icon;
              return (
                <Card key={dimension.title}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{dimension.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {dimension.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Why Politics */}
          <Card className="mb-12 border-accent/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Why Politics?</h3>
              <p className="text-muted-foreground">
                Politics kills more transformations than bad technology. If your executives aren&apos;t aligned, or your last initiative left scars, it will have a direct impact on your project&apos;s chance of success.
              </p>
            </CardContent>
          </Card>

          {/* AI Technology Decision Matrix */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center">When to use what</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">If your problem is...</th>
                    <th className="text-left py-3 px-4 font-semibold text-accent">Start here</th>
                    <th className="text-left py-3 px-4 font-semibold text-destructive">Avoid</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-4">High-volume, rule-based tasks</td>
                    <td className="py-3 px-4 text-accent">RPA</td>
                    <td className="py-3 px-4 text-destructive">LLMs (expensive overkill)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Predicting outcomes from historical data</td>
                    <td className="py-3 px-4 text-accent">ML</td>
                    <td className="py-3 px-4 text-destructive">LLMs (wrong tool)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Processing unstructured documents</td>
                    <td className="py-3 px-4 text-accent">LLMs</td>
                    <td className="py-3 px-4 text-destructive">RPA (can&apos;t handle it)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Mission-critical, audit-required</td>
                    <td className="py-3 px-4 text-accent">RPA or ML</td>
                    <td className="py-3 px-4 text-destructive">Autonomous LLMs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              For most mid-market companies, the right order is: automation first, ML for prediction problems second, LLMs for unstructured reasoning third.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
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
