import { LucideIcon, Brain, Cloud, Sparkles, TrendingUp } from "lucide-react";

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
    id: "ai-readiness",
    title: "AI Readiness Assessment",
    tagline: "Is your business ready for AI? We'll show you the path.",
    description:
      "Comprehensive evaluation of your organization's technology, processes, and culture to identify opportunities and readiness for AI adoption. We assess your current systems, identify gaps, and create a clear roadmap for intelligent transformation.",
    icon: Brain,
    features: [
      "System architecture and infrastructure review",
      "Process modernization assessment",
      "Technology stack evaluation",
      "Data readiness analysis",
      "Change management planning",
      "ROI modeling and business case development",
    ],
    idealFor:
      "Mid-market companies and startups ready to explore AI but uncertain where to begin.",
    deliverables: [
      "Comprehensive readiness scorecard",
      "Prioritized opportunity roadmap",
      "Technology stack recommendations",
      "Implementation timeline and budget",
      "Quick wins identification",
    ],
    href: "/services/ai-readiness",
  },
  {
    id: "agentic-systems",
    title: "Agentic Systems Strategy",
    tagline:
      "Navigate the shift from seat-based to outcome-based business models.",
    description:
      "The future of SaaS and business software is agentic—AI systems that work autonomously to achieve outcomes rather than requiring human operators for each task. We help you understand this shift and position your business to thrive in the agentic era.",
    icon: Sparkles,
    features: [
      "Agentic SaaS advisory and positioning",
      "Business model evolution planning",
      "Pricing strategy for outcome-based models",
      "Product roadmap adaptation",
      "Go-to-market strategy for AI-native offerings",
      "Competitive positioning in the agentic landscape",
    ],
    idealFor:
      "SaaS companies, software vendors, and service providers adapting to AI-driven competition.",
    deliverables: [
      "Agentic transformation strategy",
      "Updated business model canvas",
      "Pricing and packaging recommendations",
      "GTM playbook for agentic offerings",
      "Competitive differentiation framework",
    ],
    href: "/services/agentic-systems",
  },
  {
    id: "implementation",
    title: "AI Implementation & Integration",
    tagline: "From strategy to reality—measurable results.",
    description:
      "Turn your AI vision into working solutions. We implement AI tools, custom systems, and intelligent workflows that integrate seamlessly with your existing operations. Our focus is on practical, measurable outcomes that scale with your business.",
    icon: TrendingUp,
    features: [
      "AI tools and services implementation",
      "Custom AI system development",
      "Integration with existing systems",
      "Workflow automation design",
      "Vendor selection and management",
      "Performance monitoring and optimization",
    ],
    idealFor:
      "Organizations ready to move from planning to execution with clear business objectives.",
    deliverables: [
      "Implemented AI solutions",
      "Integration documentation",
      "Team training and enablement",
      "Success metrics and dashboards",
      "Ongoing optimization recommendations",
    ],
    href: "/services/implementation",
  },
  {
    id: "cloud-marketplace",
    title: "Cloud Marketplace Acceleration",
    tagline: "Unlock new revenue channels through AWS, Azure, and GCP.",
    description:
      "Navigate the complexities of cloud marketplace listings, co-sell programs, and partner ecosystems. With decades of experience in platform partnerships and marketplace GTM, we help you get listed, transact, and scale through AWS, Azure, and GCP marketplaces.",
    icon: Cloud,
    features: [
      "Marketplace listing strategy and execution",
      "Co-sell program enablement (AWS, Azure, GCP)",
      "Partner ecosystem development",
      "Marketplace operations optimization",
      "Deal registration and pipeline management",
      "Seller success program navigation",
    ],
    idealFor:
      "B2B SaaS companies from Series A to growth stage looking to scale through cloud channels.",
    deliverables: [
      "Live marketplace listings",
      "Co-sell program activation",
      "Partner engagement playbook",
      "Deal flow processes",
      "Marketplace performance analytics",
    ],
    href: "/services/cloud-marketplace",
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === id);
};
