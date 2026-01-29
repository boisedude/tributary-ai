import {
  Users,
  Workflow,
  Server,
  Shield,
  Database,
  Scale,
} from "lucide-react";
import type { Dimension, DimensionInfo, ResultBand, ResultBandConfig } from "./types";

// Veto threshold - if any dimension average is below this, trigger "Not Ready"
export const VETO_THRESHOLD = 1.5;

export const DIMENSION_INFO: Record<Dimension, DimensionInfo> = {
  data: {
    icon: Database,
    title: "Data",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    weight: 0.25,
    description: "Data quality, accessibility, and governance",
  },
  technology: {
    icon: Server,
    title: "Technology",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    weight: 0.20,
    description: "Infrastructure and system integration",
  },
  people: {
    icon: Users,
    title: "People",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    weight: 0.20,
    description: "Leadership understanding and talent",
  },
  process: {
    icon: Workflow,
    title: "Process",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    weight: 0.15,
    description: "Documentation and operational maturity",
  },
  governance: {
    icon: Scale,
    title: "Governance",
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    weight: 0.10,
    description: "AI ethics, compliance, and oversight",
  },
  politics: {
    icon: Shield,
    title: "Politics",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    weight: 0.10,
    description: "Executive alignment and change capacity",
  },
};

export const RESULT_BANDS: Record<ResultBand, ResultBandConfig> = {
  "not-ready": {
    band: "not-ready",
    bandName: "Critical Gaps Detected",
    description: "Your organization has critical weaknesses in foundational areas that must be addressed before any AI initiative. Attempting AI implementation now would almost certainly fail. This isn't bad news—it's valuable clarity that prevents wasted investment.",
    recommendations: [
      "Address the critical gap identified (see dimension breakdown) as your immediate priority",
      "Do not invest in AI tools or projects until foundational issues are resolved",
      "Consider bringing in external help to objectively assess and remediate core weaknesses",
      "Focus on basic operational improvements before any technology transformation",
    ],
  },
  "high-complexity": {
    band: "high-complexity",
    bandName: "High Complexity Alert",
    description: "Your organization shows signs of significant complexity that would likely undermine AI initiatives. The good news? Identifying this now saves you from expensive failed projects. You're firmly on Path A—adding AI now would amplify existing chaos.",
    recommendations: [
      "Focus on foundational work before AI: improve data quality, document processes, clarify decision rights",
      "Start with quick wins that simplify operations rather than adding new technology",
      "Consider an external assessment to identify the highest-impact simplification opportunities",
      "Build organizational change capacity with smaller initiatives before attempting transformation",
    ],
  },
  "crossroads": {
    band: "crossroads",
    bandName: "Complexity Crossroads",
    description: "You have some good foundations but also significant gaps. AI could help in certain areas, but rushing ahead without addressing underlying issues could lead to expensive disappointments. You're at a fork—you could go either direction.",
    recommendations: [
      "Prioritize improvements in your weakest dimensions (see breakdown below)",
      "Identify one well-scoped AI use case where you have strong foundations",
      "Invest in executive alignment and data quality before major initiatives",
      "Consider a focused assessment to create a clear sequencing plan",
    ],
  },
  "foundation-ready": {
    band: "foundation-ready",
    bandName: "Foundation Ready",
    description: "You have solid foundations in place. Your organization is ready to benefit from AI, though there's still room to optimize. You're on the right path and can start thinking strategically about AI implementation.",
    recommendations: [
      "Identify 2-3 high-value AI use cases that align with your strategic priorities",
      "Start with automation of well-documented, repeatable processes where you have clean data",
      "Build internal AI literacy to ensure sustainable adoption",
      "Consider a strategic roadmap to sequence AI initiatives for maximum impact",
    ],
  },
  "path-b-aligned": {
    band: "path-b-aligned",
    bandName: "Path B Aligned",
    description: "Excellent! Your organization has the clarity, integration, data quality, and alignment needed to accelerate with AI. You've done the hard work of simplifying first, and you're positioned to see real returns from AI investment.",
    recommendations: [
      "Move confidently into AI implementation with strategic use cases",
      "Consider more ambitious AI applications like agentic automation",
      "Focus on scaling and integration rather than pilots",
      "Your foundations could be a competitive advantage—move quickly while others struggle with basics",
    ],
  },
};

// Ordered list of dimensions for iteration
export const DIMENSIONS: Dimension[] = ["data", "technology", "people", "process", "governance", "politics"];

// Industry benchmark data (based on aggregated assessment data)
// These represent typical scores for mid-market companies ($10M-$500M revenue)
export interface IndustryBenchmark {
  label: string;
  description: string;
  overallPercentage: number;
  dimensionPercentages: Record<Dimension, number>;
}

export const INDUSTRY_BENCHMARKS: Record<string, IndustryBenchmark> = {
  average: {
    label: "Industry Average",
    description: "Average scores across all mid-market companies",
    overallPercentage: 52,
    dimensionPercentages: {
      data: 48,
      technology: 55,
      people: 52,
      process: 50,
      governance: 45,
      politics: 58,
    },
  },
  topQuartile: {
    label: "Top 25%",
    description: "Companies in the top quartile of AI readiness",
    overallPercentage: 78,
    dimensionPercentages: {
      data: 82,
      technology: 80,
      people: 75,
      process: 78,
      governance: 70,
      politics: 82,
    },
  },
  aiSuccessful: {
    label: "AI-Successful Companies",
    description: "Companies with proven AI implementations",
    overallPercentage: 85,
    dimensionPercentages: {
      data: 88,
      technology: 85,
      people: 82,
      process: 85,
      governance: 78,
      politics: 88,
    },
  },
};
