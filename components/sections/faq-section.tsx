"use client";

import { FAQAccordion } from "@/components/faq-accordion";

const homepageFAQs = [
  {
    question: "Why now? Can't we wait to see how AI develops?",
    answer:
      "AI is already dramatically cutting costs and increasing revenue per employee for companies that adopt it effectively. Organizations using AI for process automation are seeing 30-50% efficiency gains. Those using AI for customer service are handling 3-5x more inquiries without adding headcount. Every quarter you delay, competitors who are moving now gain ground—and that disadvantage starts this year, not years from now. As AI capabilities continue to evolve exponentially, the gap between adopters and laggards will widen faster than most executives expect. The question isn't whether to adopt AI—it's whether you'll be leading or catching up.",
  },
  {
    question: "Why can't we do this assessment internally?",
    answer:
      "Your team can't objectively assess your own organization for three reasons: they're running the business and don't have time to step back, they don't have visibility across all functions, and they can't recommend killing their own projects or restructuring their own teams. An external assessment surfaces the uncomfortable truths that internal teams can't or won't raise—like the VP who's blocking data sharing, the legacy system everyone's afraid to touch, or the process that exists only because 'we've always done it that way.'",
  },
  {
    question: "What if the Assessment reveals we're not ready for AI?",
    answer:
      "That's actually a valuable outcome—it means we've saved you from wasting money on premature AI projects that would fail. The Assessment includes a prioritized roadmap showing exactly what to fix first, whether that's data quality, process documentation, or organizational alignment. Many clients spend 3-6 months on foundational work before pursuing AI, and that's the smart path. We can help with that foundation, or you can handle it internally with our roadmap as your guide.",
  },
  {
    question: "How is Tributary different from big consulting firms?",
    answer:
      "When you work with Tributary, you work directly with Michael Cooper—30 years of enterprise transformation experience, not a rotating cast of junior consultants learning on your dime. We're 30-50% less expensive than Big Four firms because we use AI tools extensively in our own work and don't carry their overhead. We also specialize in mid-market companies ($10M-$500M revenue) where every dollar needs to show ROI, not enterprises with unlimited budgets.",
  },
  {
    question: "What does implementation actually cost after the Assessment?",
    answer:
      "Our implementation services range from $25K-$50K for Data Readiness projects, $40K-$100K for AI Automation, and $55K-$165K for custom AI Application Development. Managed Services (fractional CTO/IT support) run $5K-$10K per month. These are 30-50% below Big Four rates. The Assessment gives you a clear picture of which services you actually need—many clients discover they need less than they thought, while others identify high-ROI opportunities they hadn't considered.",
  },
];

/**
 * FAQ section for the homepage.
 * Addresses common objections and questions from the ICP persona.
 */
export function FAQSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-wide text-accent uppercase mb-4">
              Common Questions
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Before You Decide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Answers to the questions we hear most from executives evaluating AI initiatives.
            </p>
          </div>
          <FAQAccordion faqs={homepageFAQs} />
        </div>
      </div>
    </section>
  );
}
