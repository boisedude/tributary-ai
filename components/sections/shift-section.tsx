import { Card, CardContent } from "@/components/ui/card";

/**
 * The Shift section - explains why this moment matters.
 * Clean, editorial design with minimal decoration.
 */
export function ShiftSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <h2 className="text-3xl font-bold sm:text-4xl">
            This is a pivotal moment
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            AI isn&apos;t just another tool to bolt onto existing processes. It&apos;s a fundamental shift in how companies operate, compete, and create value.
          </p>

          {/* The Opportunity */}
          <div className="mt-12 space-y-6">
            <p className="text-lg font-medium leading-relaxed">
              AI is a capability, not a product.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The challenge isn&apos;t adopting new tools; it&apos;s adapting how technology and business work together. Companies that simply &quot;bolt on&quot; AI features to legacy systems will struggle to see value. The bottleneck isn&apos;t the AI models—it&apos;s 6-month roadmaps and fragmented data structures that weren&apos;t built for this speed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That&apos;s why we launched Tributary AI.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We help you retool the data platforms and infrastructure you already run. We clear the technical and operational debt so small, focused teams can put AI to work on real data to solve real business problems—minus the friction.
            </p>
            <p className="text-lg leading-relaxed">
              When AI is leveraged correctly, IT spend should go down and revenue per employee should go up.
            </p>
          </div>

          {/* Why Most Fail */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-6">
              Why most approaches fail
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <p className="font-medium mb-2">They add AI to existing complexity</p>
                  <p className="text-sm text-muted-foreground">
                    Companies layer AI onto fragmented data, disconnected systems, and undocumented processes. They automate chaos instead of fixing it first.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-accent/30">
                <CardContent className="p-6">
                  <p className="font-medium mb-2">The alternative: consolidate, then accelerate</p>
                  <p className="text-sm text-muted-foreground">
                    Clean your data. Establish a single source of truth. Integrate systems before adding AI. The companies that win build AI on a solid foundation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats - understated */}
          <div className="mt-10 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">The data confirms what we see with clients:</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-semibold">95%</p>
                <p className="text-xs text-muted-foreground">GenAI projects stall before production</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">60%</p>
                <p className="text-xs text-muted-foreground">AI projects will be abandoned by 2026</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">42%</p>
                <p className="text-xs text-muted-foreground">Companies scaled back AI in 2025</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4 text-center">
              Sources: MIT, Gartner, S&P Global
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
