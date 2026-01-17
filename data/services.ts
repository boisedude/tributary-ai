/**
 * @fileoverview Service definitions for Tributary AI consulting offerings.
 * This is the single source of truth for all service data displayed on the website.
 *
 * To add a new service:
 * 1. Add a new entry to the `services` array below
 * 2. Create a new page at app/services/[service-id]/page.tsx
 * 3. Add the service ID to SERVICE_IDS in lib/constants.ts
 *
 * @see {@link SERVICE_IDS} from lib/constants.ts for type-safe service references
 */

import { LucideIcon, Cloud, Users, Sparkles, Brain } from "lucide-react";

/**
 * Service data structure for consulting offerings.
 */
export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  idealFor: string;
  deliverables: string[];
  href: string;
}

export const services: Service[] = [
  {
    id: "cloud-marketplace",
    title: "Cloud Marketplace GTM",
    tagline: "Get listed, transact, and co-sell on AWS, Azure, and GCP.",
    description:
      "Navigate the complexities of cloud marketplace listings, co-sell programs, and partner ecosystems. With decades of experience in platform partnerships and marketplace GTM—including leading teams to Microsoft and Google Partner of the Year—we help SaaS companies unlock new revenue channels through strategic cloud marketplace acceleration.",
    icon: Cloud,
    features: [
      "Marketplace listing strategy and execution (AWS, Azure, GCP)",
      "Co-sell program qualification and enablement",
      "Private offer structuring and negotiation",
      "Partner ecosystem development and ISV programs",
      "Deal registration and pipeline coordination",
      "Marketplace operations and performance optimization",
    ],
    idealFor:
      "Series A-C SaaS companies looking to accelerate revenue through cloud marketplace channels and co-sell motions.",
    deliverables: [
      "Live marketplace listings on target platforms",
      "Co-sell program activation (ISV Accelerate, Co-sell Ready, etc.)",
      "Private offer playbook and templates",
      "Cloud provider relationship roadmap",
      "Marketplace performance dashboards and KPIs",
    ],
    href: "/services/cloud-marketplace",
  },
  {
    id: "fractional-gtm",
    title: "Fractional GTM Leadership",
    tagline: "Part-time strategic leadership, full-time impact.",
    description:
      "Not every company needs—or can afford—a full-time CRO or VP of Partnerships. Get senior GTM leadership on a fractional basis: strategic sales leadership, partnerships strategy, revenue operations, and go-to-market execution from someone who's built and scaled GTM functions at Microsoft, Citrix, Confluent, and Astronomer.",
    icon: Users,
    features: [
      "Fractional CRO / VP Sales / VP Partnerships",
      "Go-to-market strategy development and execution",
      "Sales process design and optimization",
      "Partnership and channel strategy",
      "Revenue operations and metrics frameworks",
      "Team hiring, coaching, and enablement",
    ],
    idealFor:
      "Seed to Series B SaaS companies needing senior GTM expertise without full-time executive overhead.",
    deliverables: [
      "GTM strategy and execution roadmap",
      "Sales playbooks and process documentation",
      "Partnership program design",
      "Revenue metrics and reporting frameworks",
      "Hiring plans and interview frameworks",
    ],
    href: "/services/fractional-gtm",
  },
  {
    id: "agentic-advisory",
    title: "Agentic SaaS Advisory",
    tagline: "The business model shift is happening now. Get ahead of it.",
    description:
      "Per-seat pricing is under pressure. Outcome-based models are gaining traction. Companies that figure this out in 2026 will gain significant market share. Those that don't will struggle to compete as AI reshapes software economics. I help SaaS companies see where this is going and position themselves to win.",
    icon: Sparkles,
    features: [
      "Agentic business model assessment",
      "Pricing strategy for outcome-based models",
      "Product roadmap adaptation for AI-native features",
      "Competitive positioning in the agentic landscape",
      "Go-to-market strategy for AI-enhanced offerings",
      "Board and investor narrative development",
    ],
    idealFor:
      "SaaS companies that recognize the shift happening and want to lead rather than follow.",
    deliverables: [
      "Agentic transformation strategy document",
      "Updated business model and pricing framework",
      "Competitive landscape analysis",
      "GTM playbook for agentic offerings",
      "Investor/board presentation materials",
    ],
    href: "/services/agentic-advisory",
  },
  {
    id: "ai-readiness",
    title: "AI-Ready Operating Model",
    tagline: "The gap between winners and losers is about to get very wide.",
    description:
      "2026 marks a structural break: thinking is no longer the constraint. Execution is. Companies that adapt will cut costs, move faster, and take market share. Those that don't will stall—watching competitors pull ahead while they struggle to keep up. This assessment shows you exactly where you stand, what's holding you back, and what it will take to be on the winning side.",
    icon: Brain,
    features: [
      "Four functional layers analysis (Cognition, Judgment, Commitment, Execution)",
      "5-level maturity assessment across your organization",
      "Bottleneck identification and prioritization",
      "Transformation phase planning (Phases 0-4)",
      "Operating model redesign recommendations",
      "AI leverage opportunity mapping",
    ],
    idealFor:
      "Leadership teams ready for honest assessment of where they actually stand—not where they think they are.",
    deliverables: [
      "Comprehensive AI readiness scorecard",
      "Current-state maturity assessment report",
      "Transformation roadmap with prioritized phases",
      "Bottleneck analysis with top 5 constraints identified",
      "Operating model recommendations document",
      "90-day quick wins action plan",
    ],
    href: "/services/ai-readiness",
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === id);
};
