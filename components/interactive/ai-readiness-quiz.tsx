"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitToWeb3Forms, Web3FormsError } from "@/lib/web3forms";
import { ROUTES, EXTERNAL_LINKS } from "@/lib/constants";
import Link from "next/link";
import {
  Users,
  Workflow,
  Server,
  Shield,
  Database,
  Scale,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Loader2,
  Calendar,
  FileText,
  RotateCcw,
  BookOpen,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

type Dimension = "people" | "process" | "technology" | "data" | "governance" | "politics";

interface QuizQuestion {
  id: string;
  dimension: Dimension;
  question: string;
  learnMoreUrl?: string; // Link to relevant blog post
  options: {
    text: string;
    score: number;
  }[];
}

interface DimensionScore {
  score: number;
  maxScore: number;
  percentage: number;
  weight: number;
  weightedScore: number;
}

interface QuizResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  weightedPercentage: number;
  band: "not-ready" | "high-complexity" | "crossroads" | "foundation-ready" | "path-b-aligned";
  bandName: string;
  description: string;
  recommendations: string[];
  dimensionScores: Record<Dimension, DimensionScore>;
  vetoTriggered: boolean;
  vetoDimension?: Dimension;
}

// =============================================================================
// QUIZ CONFIGURATION
// =============================================================================

const DIMENSION_INFO: Record<Dimension, {
  icon: typeof Users;
  title: string;
  color: string;
  bgColor: string;
  weight: number;
  description: string;
}> = {
  data: {
    icon: Database,
    title: "Data",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    weight: 0.25, // 25% - highest weight per expert recommendation
    description: "Data quality, accessibility, and governance",
  },
  technology: {
    icon: Server,
    title: "Technology",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    weight: 0.20, // 20%
    description: "Infrastructure and system integration",
  },
  people: {
    icon: Users,
    title: "People",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    weight: 0.20, // 20%
    description: "Leadership understanding and talent",
  },
  process: {
    icon: Workflow,
    title: "Process",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    weight: 0.15, // 15%
    description: "Documentation and operational maturity",
  },
  governance: {
    icon: Scale,
    title: "Governance",
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    weight: 0.10, // 10%
    description: "AI ethics, compliance, and oversight",
  },
  politics: {
    icon: Shield,
    title: "Politics",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    weight: 0.10, // 10%
    description: "Executive alignment and change capacity",
  },
};

// Veto threshold - if any dimension average is below this, trigger "Not Ready"
const VETO_THRESHOLD = 1.5;

// =============================================================================
// QUESTIONS - Reordered per expert recommendations
// =============================================================================

const QUESTIONS: QuizQuestion[] = [
  // 1. People - Leadership understanding (engaging opener)
  {
    id: "people-1",
    dimension: "people",
    question: "How would you describe your leadership team's understanding of AI capabilities and limitations?",
    learnMoreUrl: "/blog/ai-isnt-one-thing-decision-framework",
    options: [
      { text: "They think AI can solve everything, or dismiss it entirely", score: 1 },
      { text: "They're enthusiastic but haven't distinguished between AI types (RPA, ML, LLMs)", score: 2 },
      { text: "They understand AI basics and have realistic expectations for some use cases", score: 3 },
      { text: "They can articulate which AI tools fit which problems and set clear priorities", score: 4 },
    ],
  },
  // 2. People - Employee time allocation (relatable)
  {
    id: "people-2",
    dimension: "people",
    question: "How do your best employees spend their time?",
    learnMoreUrl: "/blog/employees-fear-ai-how-to-fix",
    options: [
      { text: "Mostly on manual data entry, reconciliation, and administrative tasks", score: 1 },
      { text: "A mix of grunt work and strategic work, but grunt work often wins", score: 2 },
      { text: "Primarily on valuable work, with some repetitive tasks they wish they could eliminate", score: 3 },
      { text: "Almost entirely on judgment-intensive, strategic work that leverages their expertise", score: 4 },
    ],
  },
  // 3. Process - Documentation
  {
    id: "process-1",
    dimension: "process",
    question: "If a new employee asked 'How does X work here?', what would happen?",
    learnMoreUrl: "/blog/intake-to-action-loop",
    options: [
      { text: "'It depends' or 'Ask Sarah' - critical knowledge lives in people's heads", score: 1 },
      { text: "Some documentation exists but it's outdated or incomplete", score: 2 },
      { text: "Core processes are documented, but variations and exceptions aren't clear", score: 3 },
      { text: "Processes are documented, standardized, and regularly updated", score: 4 },
    ],
  },
  // 4. Process - Coordination burden
  {
    id: "process-2",
    dimension: "process",
    question: "How much time does your team spend coordinating work across departments?",
    learnMoreUrl: "/blog/intake-to-action-loop",
    options: [
      { text: "Constantly - we have meetings about meetings and chase people for updates", score: 1 },
      { text: "Significant - handoffs are messy and things fall through cracks regularly", score: 2 },
      { text: "Moderate - we have some systems but still need manual coordination", score: 3 },
      { text: "Minimal - information flows automatically and handoffs are clear", score: 4 },
    ],
  },
  // 5. Process - Bottleneck visibility
  {
    id: "process-3",
    dimension: "process",
    question: "When something goes wrong, how quickly can you identify the bottleneck?",
    learnMoreUrl: "/blog/5-signs-your-business-isnt-ready-for-ai",
    options: [
      { text: "We often don't know something's wrong until a customer complains", score: 1 },
      { text: "We know there are problems but can't pinpoint where things break down", score: 2 },
      { text: "We can usually find issues but it takes investigation and meetings", score: 3 },
      { text: "We have visibility into workflows and can spot bottlenecks in real-time", score: 4 },
    ],
  },
  // 6. Technology - Ecosystem integration
  {
    id: "tech-1",
    dimension: "technology",
    question: "How would you describe your company's software ecosystem?",
    learnMoreUrl: "/blog/build-vs-buy-ai-decision-guide",
    options: [
      { text: "A patchwork of disconnected tools - nothing talks to anything else", score: 1 },
      { text: "We have many tools with some manual workarounds to connect them", score: 2 },
      { text: "Core systems are integrated, but we still have data silos", score: 3 },
      { text: "Well-integrated stack with APIs connecting critical systems", score: 4 },
    ],
  },
  // 7. Data - AI training readiness (NEW - Critical)
  {
    id: "data-1",
    dimension: "data",
    question: "If your organization wanted to train an AI model on your historical data tomorrow, what would happen?",
    learnMoreUrl: "/blog/why-ai-projects-fail-data-architecture",
    options: [
      { text: "We'd spend months just locating and cleaning the data", score: 1 },
      { text: "We could find the data but would face significant quality and format issues", score: 2 },
      { text: "Most core data is accessible and reasonably clean, with some preparation needed", score: 3 },
      { text: "Our data is well-organized, documented, and ready for advanced analytics", score: 4 },
    ],
  },
  // 8. Data - Data-driven decisions (NEW - Critical)
  {
    id: "data-2",
    dimension: "data",
    question: "How does your organization currently use data in decision-making?",
    learnMoreUrl: "/blog/data-quality-for-ai-quick-wins",
    options: [
      { text: "Decisions are mostly intuition-based; data is rarely consulted", score: 1 },
      { text: "We look at data occasionally, but it's often outdated or incomplete", score: 2 },
      { text: "Key decisions involve data analysis, though it's often manual", score: 3 },
      { text: "Data-driven decision-making is standard, with dashboards and analytics widely used", score: 4 },
    ],
  },
  // 9. Data - Single source of truth (REVISED from tech-2)
  {
    id: "data-3",
    dimension: "data",
    question: "How would you rate your organization's data quality and governance?",
    learnMoreUrl: "/blog/why-ai-projects-fail-data-architecture",
    options: [
      { text: "Data is scattered, inconsistent, and no one trusts it", score: 1 },
      { text: "We have data, but quality issues and access limitations are common", score: 2 },
      { text: "Core data is reasonably clean and accessible, with some governance", score: 3 },
      { text: "High-quality, well-governed data with clear ownership and documented lineage", score: 4 },
    ],
  },
  // 9b. Data - Data lineage and traceability (NEW - from research)
  {
    id: "data-4",
    dimension: "data",
    question: "Can you trace where your critical business data comes from and how it's transformed?",
    learnMoreUrl: "/blog/why-ai-projects-fail-data-architecture",
    options: [
      { text: "No idea - data appears in reports but we don't know its origin", score: 1 },
      { text: "We have a general sense, but couldn't document the full chain", score: 2 },
      { text: "Key data flows are understood by certain people, but not formally documented", score: 3 },
      { text: "We have documented data lineage with clear transformation logic and audit trails", score: 4 },
    ],
  },
  // 10. Technology - Infrastructure (NEW implied by expert)
  {
    id: "tech-2",
    dimension: "technology",
    question: "If someone asked 'How many active customers do we have?', what would happen?",
    learnMoreUrl: "/blog/ai-strategy-outcomes-not-technology",
    options: [
      { text: "Different systems would give different answers - it's anyone's guess", score: 1 },
      { text: "Someone would spend hours pulling data from multiple sources", score: 2 },
      { text: "We could get an answer fairly quickly, but might need to reconcile sources", score: 3 },
      { text: "We'd have a single source of truth that provides instant, reliable answers", score: 4 },
    ],
  },
  // 10b. Technology - MLOps maturity (NEW - from research)
  {
    id: "tech-3",
    dimension: "technology",
    question: "Has your organization successfully deployed and maintained an AI or ML model in production?",
    learnMoreUrl: "/blog/why-ai-pilots-fail-to-scale",
    options: [
      { text: "No - we haven't attempted AI/ML deployment", score: 1 },
      { text: "We've tried pilots but they never made it to production", score: 2 },
      { text: "We have one or two models in production, but maintenance is challenging", score: 3 },
      { text: "We have established MLOps practices with versioning, monitoring, and regular updates", score: 4 },
    ],
  },
  // 11. Governance - AI ethics (NEW - Important)
  {
    id: "governance-1",
    dimension: "governance",
    question: "How prepared is your organization to ensure AI is used responsibly and ethically?",
    learnMoreUrl: "/blog/ai-governance-framework-mid-market",
    options: [
      { text: "We haven't thought about AI ethics or governance yet", score: 1 },
      { text: "We're aware of the issues but have no formal policies or oversight", score: 2 },
      { text: "We have some guidelines, but they're informal or inconsistently applied", score: 3 },
      { text: "We have formal AI governance policies, clear accountability, and review processes", score: 4 },
    ],
  },
  // 12. People - Decision authority (REVISED per expert)
  {
    id: "people-3",
    dimension: "people",
    question: "When critical decisions need to be made about technology investments or process changes, how does your organization proceed?",
    learnMoreUrl: "/blog/ai-talent-strategy-hire-train-partner",
    options: [
      { text: "Decisions stall or get reversed frequently—there's no clear authority", score: 1 },
      { text: "One executive decides everything, but often lacks key information", score: 2 },
      { text: "Defined decision-makers exist, but cross-functional input is inconsistent", score: 3 },
      { text: "Structured process with clear authority, defined criteria, and stakeholder input", score: 4 },
    ],
  },
  // 13. Politics - Executive alignment
  {
    id: "politics-1",
    dimension: "politics",
    question: "How aligned is your executive team on technology and AI priorities?",
    learnMoreUrl: "/blog/why-ai-pilots-fail-to-scale",
    options: [
      { text: "Openly conflicting - different leaders push different agendas", score: 1 },
      { text: "Surface agreement but hidden disagreements emerge during execution", score: 2 },
      { text: "Generally aligned but some leaders are more bought-in than others", score: 3 },
      { text: "Unified vision with clear sponsorship and accountability", score: 4 },
    ],
  },
  // 13b. Politics - Cross-functional collaboration (NEW - from research)
  {
    id: "politics-3",
    dimension: "politics",
    question: "When initiatives require collaboration across departments, how smoothly does it work?",
    learnMoreUrl: "/blog/ai-implementation-mistakes-avoid",
    options: [
      { text: "Departments actively protect their turf - cross-functional work is a battle", score: 1 },
      { text: "Collaboration happens but requires constant negotiation and escalation", score: 2 },
      { text: "Most departments cooperate, though some friction exists", score: 3 },
      { text: "Cross-functional collaboration is the norm with shared goals and mutual support", score: 4 },
    ],
  },
  // 14. Governance - Strategy (NEW - combines strategy into governance)
  {
    id: "governance-2",
    dimension: "governance",
    question: "Does your organization have a documented AI strategy connected to business objectives?",
    learnMoreUrl: "/blog/ai-maturity-roadmap-18-months",
    options: [
      { text: "No—AI is not on our strategic agenda", score: 1 },
      { text: "There's interest but no formal strategy or roadmap", score: 2 },
      { text: "We have an emerging AI strategy, though it's still being developed", score: 3 },
      { text: "Clear AI strategy aligned with business goals, with defined priorities and metrics", score: 4 },
    ],
  },
  // 15. Politics - Past initiative outcomes (end on reflection)
  {
    id: "politics-2",
    dimension: "politics",
    question: "What happened with your last major technology or process initiative?",
    learnMoreUrl: "/blog/ai-implementation-mistakes-avoid",
    options: [
      { text: "It failed badly and left organizational scars - people are wary of new projects", score: 1 },
      { text: "It was partially implemented but never fully adopted", score: 2 },
      { text: "It succeeded eventually, but took longer and cost more than expected", score: 3 },
      { text: "It succeeded and built confidence for future initiatives", score: 4 },
    ],
  },
];

// =============================================================================
// RESULT BANDS - Updated for 15 questions (max 60 points, weighted scoring)
// =============================================================================

const RESULT_BANDS: Record<QuizResult["band"], Omit<QuizResult, "totalScore" | "maxScore" | "percentage" | "weightedPercentage" | "dimensionScores" | "vetoTriggered" | "vetoDimension">> = {
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

// =============================================================================
// COMPONENT
// =============================================================================

interface AIReadinessQuizProps {
  embedded?: boolean;
}

export function AIReadinessQuiz({ embedded = false }: AIReadinessQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  const handleAnswer = useCallback((questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  }, [currentQuestion]);

  // Calculate results with weighting and veto logic
  const calculateResult = useCallback((): QuizResult => {
    const dimensionScores: Record<Dimension, DimensionScore> = {} as Record<Dimension, DimensionScore>;

    // Calculate scores per dimension
    const dimensions: Dimension[] = ["data", "technology", "people", "process", "governance", "politics"];

    dimensions.forEach((dim) => {
      const dimQuestions = QUESTIONS.filter(q => q.dimension === dim);
      const dimScore = dimQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const maxScore = dimQuestions.length * 4;
      const percentage = maxScore > 0 ? (dimScore / maxScore) * 100 : 0;
      const weight = DIMENSION_INFO[dim].weight;
      const weightedScore = percentage * weight;

      dimensionScores[dim] = {
        score: dimScore,
        maxScore,
        percentage,
        weight,
        weightedScore,
      };
    });

    // Calculate totals
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = QUESTIONS.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    // Calculate weighted percentage
    const weightedPercentage = dimensions.reduce((sum, dim) =>
      sum + dimensionScores[dim].weightedScore, 0
    );

    // Check for veto conditions (any dimension average below threshold)
    let vetoTriggered = false;
    let vetoDimension: Dimension | undefined;

    for (const dim of dimensions) {
      const dimQuestions = QUESTIONS.filter(q => q.dimension === dim);
      const avgScore = dimQuestions.length > 0
        ? dimensionScores[dim].score / dimQuestions.length
        : 0;

      if (avgScore > 0 && avgScore < VETO_THRESHOLD) {
        vetoTriggered = true;
        vetoDimension = dim;
        break;
      }
    }

    // Determine band based on weighted percentage (with veto override)
    let band: QuizResult["band"];

    if (vetoTriggered) {
      band = "not-ready";
    } else if (weightedPercentage <= 35) {
      band = "high-complexity";
    } else if (weightedPercentage <= 55) {
      band = "crossroads";
    } else if (weightedPercentage <= 75) {
      band = "foundation-ready";
    } else {
      band = "path-b-aligned";
    }

    return {
      totalScore,
      maxScore,
      percentage,
      weightedPercentage,
      dimensionScores,
      vetoTriggered,
      vetoDimension,
      ...RESULT_BANDS[band],
    };
  }, [answers]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setIsSubmitting(true);

    const result = calculateResult();

    const dimensionBreakdown = Object.entries(result.dimensionScores)
      .map(([dim, scores]) => `- ${DIMENSION_INFO[dim as Dimension].title}: ${scores.score}/${scores.maxScore} (${Math.round(scores.percentage)}%)`)
      .join('\n');

    try {
      await submitToWeb3Forms({
        subject: `AI Readiness Quiz: ${result.bandName} (${Math.round(result.weightedPercentage)}%)`,
        email: email,
        from_name: "Tributary AI Quiz",
        message: `
AI Readiness Quiz Results
========================
Overall Score: ${result.totalScore}/${result.maxScore} (${Math.round(result.percentage)}%)
Weighted Score: ${Math.round(result.weightedPercentage)}%
Result Band: ${result.bandName}
${result.vetoTriggered ? `\n⚠️ VETO TRIGGERED: Critical weakness in ${DIMENSION_INFO[result.vetoDimension!].title}\n` : ''}

Dimension Breakdown (weighted):
${dimensionBreakdown}

Detailed Answers:
${QUESTIONS.map(q => `- [${DIMENSION_INFO[q.dimension].title}] ${q.question}: ${answers[q.id] || 'Not answered'}/4`).join('\n')}
        `.trim(),
      });

      setEmailSubmitted(true);
    } catch (err) {
      const message = err instanceof Web3FormsError ? err.message : "An error occurred. Please try again.";
      setEmailError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setEmail("");
    setEmailSubmitted(false);
    setEmailError("");
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const question = QUESTIONS[currentQuestion];
  const dimensionInfo = question ? DIMENSION_INFO[question.dimension] : null;
  const DimensionIcon = dimensionInfo?.icon;

  // Results view
  if (showResults) {
    const result = calculateResult();
    const isGoodResult = result.band === "foundation-ready" || result.band === "path-b-aligned";
    const isCritical = result.band === "not-ready";

    // Sort dimensions by percentage for display
    const sortedDimensions = Object.entries(result.dimensionScores)
      .sort(([, a], [, b]) => a.percentage - b.percentage) as [Dimension, DimensionScore][];

    return (
      <Card className={embedded ? "" : "max-w-2xl mx-auto"}>
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-4"
          >
            <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full ${
              isCritical
                ? "bg-red-100 dark:bg-red-900/30"
                : isGoodResult
                  ? "bg-accent/10"
                  : "bg-amber-100 dark:bg-amber-900/30"
            }`}>
              {isCritical ? (
                <AlertOctagon className="h-10 w-10 text-red-600 dark:text-red-400" />
              ) : isGoodResult ? (
                <CheckCircle className="h-10 w-10 text-accent" />
              ) : (
                <AlertTriangle className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              )}
            </div>
          </motion.div>
          <CardTitle className="text-2xl">{result.bandName}</CardTitle>
          <CardDescription className="text-base">
            Weighted Score: <span className="font-semibold">{Math.round(result.weightedPercentage)}%</span>
            <span className="text-muted-foreground ml-2">({result.totalScore}/{result.maxScore} points)</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Veto warning */}
          {result.vetoTriggered && result.vetoDimension && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <AlertOctagon className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-200">Critical Weakness: {DIMENSION_INFO[result.vetoDimension].title}</p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    Your score in this dimension is critically low. This must be addressed before any AI initiative can succeed.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            {result.description}
          </motion.p>

          {/* Dimension breakdown visualization */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-3"
          >
            <h3 className="font-semibold">Your Dimension Breakdown:</h3>
            <div className="space-y-2">
              {sortedDimensions.map(([dim, scores], index) => {
                const info = DIMENSION_INFO[dim];
                const Icon = info.icon;
                const isWeak = scores.percentage < 50;
                const isCriticalDim = dim === result.vetoDimension;

                return (
                  <motion.div
                    key={dim}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isCriticalDim
                        ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        : isWeak
                          ? "bg-amber-50 dark:bg-amber-900/20"
                          : "bg-muted/50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${info.bgColor}`}>
                      <Icon className={`h-4 w-4 ${info.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{info.title}</span>
                        <span className={`text-sm font-semibold ${
                          isCriticalDim
                            ? "text-red-600 dark:text-red-400"
                            : isWeak
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-foreground"
                        }`}>
                          {Math.round(scores.percentage)}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            isCriticalDim
                              ? "bg-red-500"
                              : isWeak
                                ? "bg-amber-500"
                                : "bg-accent"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${scores.percentage}%` }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground italic">
              Dimensions are weighted: Data (25%), Technology (20%), People (20%), Process (15%), Governance (10%), Politics (10%)
            </p>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-semibold mb-3">Recommendations:</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-6 border-t"
          >
            {!emailSubmitted ? (
              <>
                <h3 className="font-semibold mb-2">Get Your Detailed Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your email to receive a personalized PDF with specific action items for each dimension, industry benchmarks, and a 90-day improvement roadmap.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    aria-label="Email address"
                  />
                  {emailError && <p className="text-sm text-destructive">{emailError}</p>}
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Send My Detailed Report
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-3">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <p className="font-semibold">Report Sent!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Check your inbox for your detailed AI readiness breakdown with action items.
                </p>
              </div>
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-6 border-t space-y-3"
          >
            <p className="text-sm text-muted-foreground text-center mb-4">
              Want expert help addressing your gaps?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="default" className="flex-1 group">
                <Link href={ROUTES.ASSESSMENT}>
                  Learn About The Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 group">
                <a href={EXTERNAL_LINKS.CALENDLY} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Call
                </a>
              </Button>
            </div>
          </motion.div>
        </CardContent>

        <CardFooter className="border-t pt-6 justify-center">
          <Button variant="ghost" onClick={resetQuiz} className="text-muted-foreground">
            <RotateCcw className="mr-2 h-4 w-4" />
            Take Quiz Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Quiz question view
  return (
    <Card className={embedded ? "" : "max-w-2xl mx-auto"}>
      <CardHeader>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {dimensionInfo && DimensionIcon && (
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${dimensionInfo.bgColor} ${dimensionInfo.color} w-fit mb-2`}>
            <DimensionIcon className="h-4 w-4" />
            {dimensionInfo.title}
            <span className="text-xs opacity-70">({Math.round(dimensionInfo.weight * 100)}% weight)</span>
          </div>
        )}

        <CardTitle className="text-xl leading-relaxed">
          {question?.question}
        </CardTitle>

        {question?.learnMoreUrl && (
          <Link
            href={question.learnMoreUrl}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mt-2"
          >
            <BookOpen className="h-4 w-4" />
            Learn more about this topic
          </Link>
        )}
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={question?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {question?.options.map((option, index) => {
              const isSelected = answers[question.id] === option.score;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, option.score)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                      : "border-border hover:border-accent/50 hover:bg-muted/50"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-sm">{option.text}</span>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="border-t pt-6 flex justify-between">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={currentQuestion === 0}
          className="text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {answers[question?.id] !== undefined && (
          <Button
            onClick={() => {
              if (currentQuestion < QUESTIONS.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
              } else {
                setShowResults(true);
              }
            }}
            className="group"
          >
            {currentQuestion === QUESTIONS.length - 1 ? "See Results" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
