import type { Metadata } from "next";
import { AIReadinessAssessment } from "@/components/forms/ai-readiness-assessment";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Free GTM Readiness Assessment - Get Your Score",
  description:
    "Take our free GTM Readiness Assessment to discover how prepared your SaaS company is for cloud marketplace acceleration and GTM optimization. Get personalized insights in just 5 minutes.",
  keywords: [
    "free GTM assessment",
    "cloud marketplace readiness",
    "SaaS GTM assessment",
    "marketplace readiness test",
    "GTM maturity assessment",
    "SaaS go-to-market evaluation",
    "free SaaS assessment",
  ],
  openGraph: {
    title: "Free GTM Readiness Assessment - Tributary AI",
    description:
      "Discover how prepared your SaaS company is for cloud marketplace GTM. Get personalized insights and recommendations in 5 minutes.",
    type: "website",
  },
};

const benefits = [
  {
    icon: TrendingUp,
    title: "Identify Opportunities",
    description: "Discover which cloud marketplaces offer the best fit for your solution",
  },
  {
    icon: Target,
    title: "Set Clear Goals",
    description: "Understand your GTM maturity and define your marketplace acceleration roadmap",
  },
  {
    icon: Users,
    title: "Assess Team Readiness",
    description: "Evaluate your organization&apos;s readiness for marketplace and co-sell motions",
  },
  {
    icon: CheckCircle,
    title: "Get Expert Insights",
    description: "Receive personalized recommendations from marketplace GTM specialists",
  },
];

export default function AssessmentPage() {
  return (
    <article className="bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              GTM Readiness Assessment
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Discover how prepared your SaaS company is for cloud marketplace acceleration.
              Get your free readiness score and personalized recommendations in just 5 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border-0 bg-background/50 shadow-sm">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Form Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <AIReadinessAssessment />
        </div>
      </section>

      {/* Why Take the Assessment Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Why Take This Assessment?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Understanding your GTM readiness is the first step toward marketplace success
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <h3 className="mb-2 font-semibold">Objective Evaluation</h3>
                      <p className="text-muted-foreground">
                        Get an unbiased assessment of your GTM readiness across critical dimensions: marketplace fit, pricing strategy, partner readiness, and sales motion alignment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <h3 className="mb-2 font-semibold">Actionable Insights</h3>
                      <p className="text-muted-foreground">
                        Receive specific, prioritized recommendations tailored to your current maturity level. No generic advice—just practical next steps you can act on immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <h3 className="mb-2 font-semibold">Strategic Roadmap</h3>
                      <p className="text-muted-foreground">
                        Understand the gaps between your current state and marketplace success. Our assessment helps you build a realistic roadmap for cloud GTM acceleration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <h3 className="mb-2 font-semibold">Expert Follow-Up</h3>
                      <p className="text-muted-foreground">
                        Based on your results, our team will reach out with personalized recommendations and can schedule a deeper consultation to discuss your specific opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Note Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="border-0 bg-muted/30">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Your information is confidential and will only be used to provide your assessment results and personalized recommendations. We respect your privacy and will never share your data with third parties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </article>
  );
}
