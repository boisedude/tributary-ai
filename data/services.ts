import { LucideIcon, Cloud, Users, Sparkles } from "lucide-react";

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
    tagline: "Navigate the shift from seat-based to outcome-based models.",
    description:
      "The SaaS industry is undergoing its biggest transformation since the shift to cloud. Agentic AI is changing how software creates and captures value—from per-seat licensing to outcome-based pricing. We help SaaS companies understand this shift, adapt their business models, and position for the agentic era.",
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
      "SaaS companies building or integrating agentic AI capabilities and rethinking their business models.",
    deliverables: [
      "Agentic transformation strategy document",
      "Updated business model and pricing framework",
      "Competitive landscape analysis",
      "GTM playbook for agentic offerings",
      "Investor/board presentation materials",
    ],
    href: "/services/agentic-advisory",
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === id);
};
