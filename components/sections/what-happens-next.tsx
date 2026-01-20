import { Card, CardContent } from "@/components/ui/card";
import { Search, Map, Wrench, MessageSquare } from "lucide-react";

const followOnWork = [
  {
    icon: Search,
    title: "Deep dives",
    description: "Detailed analysis of specific systems or processes the Assessment flagged",
  },
  {
    icon: Map,
    title: "Migration planning",
    description: "Roadmaps to turn off existing features, consolidate systems, or retire tools",
  },
  {
    icon: Wrench,
    title: "Tool recommendations",
    description: "What to keep, what to replace, what to eliminate entirely",
  },
  {
    icon: MessageSquare,
    title: "Ongoing advisory",
    description: "Monthly check-ins as you execute, decision support when you hit roadblocks",
  },
];

/**
 * What Happens Next section for the homepage.
 * Based on MESSAGING_FRAMEWORK.md "What Happens Next" section.
 */
export function WhatHappensNext() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              What Happens Next
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              The Assessment is how we start. What happens next depends on what we find.
            </p>
          </div>

          {/* Follow-on Work Options */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {followOnWork.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Closing Statement */}
          <Card className="border-0 bg-background">
            <CardContent className="p-8 text-center">
              <p className="text-xl text-muted-foreground">
                We solve problems. Provide clarity. Cut through the noise. Give you a simple path forward.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
