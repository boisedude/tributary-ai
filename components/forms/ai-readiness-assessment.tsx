"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

type QuestionType = {
  id: string;
  question: string;
  description: string;
  options: {
    value: number;
    label: string;
    description: string;
  }[];
};

const questions: QuestionType[] = [
  {
    id: "data-integration",
    question: "Data Integration & Accessibility",
    description: "How well-integrated and accessible is your business data?",
    options: [
      { value: 1, label: "Siloed", description: "Data scattered across multiple systems with no integration" },
      { value: 2, label: "Partially Connected", description: "Some systems connected but significant data silos remain" },
      { value: 3, label: "Mostly Integrated", description: "Most systems connected with a central data repository" },
      { value: 4, label: "Fully Integrated", description: "Comprehensive data integration with real-time accessibility" },
    ],
  },
  {
    id: "process-documentation",
    question: "Process Documentation",
    description: "How well-documented are your business processes and workflows?",
    options: [
      { value: 1, label: "Minimal", description: "Processes exist mainly in people's heads" },
      { value: 2, label: "Basic", description: "Some key processes documented but many gaps" },
      { value: 3, label: "Comprehensive", description: "Most processes well-documented and regularly updated" },
      { value: 4, label: "Optimized", description: "All processes documented, standardized, and continuously improved" },
    ],
  },
  {
    id: "team-readiness",
    question: "Team Readiness & Culture",
    description: "How ready is your team to adopt AI-driven changes?",
    options: [
      { value: 1, label: "Resistant", description: "Team resistant to change, prefers traditional methods" },
      { value: 2, label: "Cautious", description: "Team open to change but needs significant support" },
      { value: 3, label: "Engaged", description: "Team actively interested and willing to learn" },
      { value: 4, label: "Champions", description: "Team enthusiastic and driving AI adoption initiatives" },
    ],
  },
  {
    id: "tech-infrastructure",
    question: "Technology Infrastructure",
    description: "What&apos;s the current state of your technology infrastructure?",
    options: [
      { value: 1, label: "Legacy", description: "Primarily legacy systems with significant technical debt" },
      { value: 2, label: "Mixed", description: "Mix of legacy and modern systems" },
      { value: 3, label: "Modern", description: "Mostly modern, cloud-based infrastructure" },
      { value: 4, label: "Advanced", description: "Cutting-edge infrastructure with API-first architecture" },
    ],
  },
  {
    id: "ai-goals",
    question: "AI Goals & Vision",
    description: "How clear are your AI implementation goals?",
    options: [
      { value: 1, label: "Exploring", description: "Just exploring what's possible with AI" },
      { value: 2, label: "Defined Problem", description: "Identified specific problems AI could solve" },
      { value: 3, label: "Strategic Plan", description: "Clear strategy for AI implementation" },
      { value: 4, label: "Roadmap", description: "Detailed roadmap with milestones and success metrics" },
    ],
  },
  {
    id: "budget-resources",
    question: "Budget & Resources",
    description: "What resources do you have allocated for AI initiatives?",
    options: [
      { value: 1, label: "None Yet", description: "No budget allocated, still exploring" },
      { value: 2, label: "Limited", description: "Small pilot budget available" },
      { value: 3, label: "Moderate", description: "Dedicated budget for initial implementation" },
      { value: 4, label: "Substantial", description: "Significant investment allocated for comprehensive AI transformation" },
    ],
  },
];

export function AIReadinessAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [readinessScore, setReadinessScore] = useState(0);
  const [readinessLevel, setReadinessLevel] = useState("");

  const isQuestionStep = currentStep < questions.length;
  const isEmailStep = currentStep === questions.length;
  const currentQuestion = isQuestionStep ? questions[currentStep] : null;
  const progress = ((currentStep) / (questions.length + 1)) * 100;

  const handleAnswer = (value: number) => {
    if (currentQuestion) {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateReadiness = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);

    let level = "";
    if (percentage >= 85) {
      level = "AI-Ready Leader";
    } else if (percentage >= 70) {
      level = "Strong Foundation";
    } else if (percentage >= 50) {
      level = "Building Momentum";
    } else {
      level = "Early Stage";
    }

    return { score: percentage, level };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { score, level } = calculateReadiness();
    setReadinessScore(score);
    setReadinessLevel(level);

    // Prepare form data for Web3Forms
    const formData = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY",
      subject: "New AI Readiness Assessment Submission",
      email: email,
      company_name: companyName,
      readiness_score: score,
      readiness_level: level,
      answers: JSON.stringify(answers, null, 2),
      from_name: "Tributary AI Assessment",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsComplete(true);
      } else {
        console.error("Form submission failed:", result);
        alert("There was an error submitting your assessment. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting your assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (isQuestionStep && currentQuestion) {
      return answers[currentQuestion.id] !== undefined;
    }
    if (isEmailStep) {
      return email.length > 0 && companyName.length > 0;
    }
    return false;
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="mx-auto max-w-3xl card-glow-teal">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-3xl">Thank You for Completing the Assessment!</CardTitle>
            <CardDescription className="text-base">
              Your AI readiness results are ready
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="rounded-lg bg-gradient-subtle p-8 text-center">
              <div className="mb-2 text-sm font-medium text-muted-foreground">
                Your AI Readiness Score
              </div>
              <div className="mb-4 text-6xl font-bold text-gradient">
                {readinessScore}%
              </div>
              <div className="text-xl font-semibold">{readinessLevel}</div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What This Means for You:</h3>

              {readinessScore >= 85 && (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Excellent! Your organization shows strong readiness for AI implementation. You have the foundation, culture, and vision in place to successfully deploy AI solutions.
                  </p>
                  <p className="font-medium">Recommended Next Steps:</p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>Begin with a strategic AI implementation roadmap</li>
                    <li>Identify quick-win use cases to build momentum</li>
                    <li>Establish AI governance and ethics guidelines</li>
                  </ul>
                </div>
              )}

              {readinessScore >= 70 && readinessScore < 85 && (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Great progress! You have a solid foundation for AI adoption. With some focused preparation, you&apos;ll be ready for successful AI implementation.
                  </p>
                  <p className="font-medium">Recommended Next Steps:</p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>Strengthen data integration and accessibility</li>
                    <li>Develop comprehensive AI strategy and roadmap</li>
                    <li>Invest in team training and change management</li>
                  </ul>
                </div>
              )}

              {readinessScore >= 50 && readinessScore < 70 && (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    You&apos;re on the right track! While there are areas to strengthen, you&apos;re building momentum toward AI readiness.
                  </p>
                  <p className="font-medium">Recommended Next Steps:</p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>Focus on process documentation and standardization</li>
                    <li>Begin modernizing technology infrastructure</li>
                    <li>Build team awareness and AI literacy</li>
                    <li>Start with small pilot projects to prove value</li>
                  </ul>
                </div>
              )}

              {readinessScore < 50 && (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    You&apos;re at the beginning of your AI journey, which is a great place to start! Focus on building foundational capabilities first.
                  </p>
                  <p className="font-medium">Recommended Next Steps:</p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>Conduct a comprehensive readiness assessment with our team</li>
                    <li>Begin with process documentation and optimization</li>
                    <li>Identify critical data integration opportunities</li>
                    <li>Build executive and team awareness of AI potential</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-lg border bg-muted/30 p-6">
              <p className="mb-4 font-medium">What&apos;s Next?</p>
              <p className="mb-4 text-sm text-muted-foreground">
                We&apos;ve sent your detailed assessment results to <span className="font-medium text-foreground">{email}</span>.
                Our team will review your responses and reach out within 1-2 business days with personalized recommendations.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1">
                  <a href="/contact">
                    Schedule a Strategy Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a href="/services/ai-readiness">
                    Learn About Our Services
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">
            {isEmailStep ? "Contact Information" : `Question ${currentStep + 1} of ${questions.length}`}
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-gradient-tributary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isQuestionStep && currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
                <CardDescription className="text-base">
                  {currentQuestion.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-accent hover:bg-accent/5 ${
                      answers[currentQuestion.id] === option.value
                        ? "border-accent bg-accent/10"
                        : "border-border"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          answers[currentQuestion.id] === option.value
                            ? "border-accent bg-accent"
                            : "border-muted-foreground"
                        }`}
                      >
                        {answers[currentQuestion.id] === option.value && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{option.label}</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {isEmailStep && (
          <motion.div
            key="email-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get Your Results</CardTitle>
                <CardDescription className="text-base">
                  Enter your information to receive your personalized AI readiness assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="mb-2 block text-sm font-medium">
                      Company Name *
                    </label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We&apos;ll send your detailed assessment results to this email and follow up with personalized recommendations.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {isEmailStep ? (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get My Results
                <CheckCircle className="h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
