"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("divide-y divide-border rounded-lg border", className)}>
      {faqs.map((faq, index) => (
        <div key={index} className="overflow-hidden">
          <button
            type="button"
            onClick={() => toggleFAQ(index)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-md"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-semibold text-foreground">{faq.question}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          <div
            id={`faq-answer-${index}`}
            className={cn(
              "grid transition-all duration-200 ease-in-out",
              openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
            aria-hidden={openIndex !== index}
          >
            <div className="overflow-hidden">
              <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
