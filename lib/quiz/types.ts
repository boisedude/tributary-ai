import type { LucideIcon } from "lucide-react";

export type Dimension = "people" | "process" | "technology" | "data" | "governance" | "politics";

export type UserRole = "business" | "technical" | null;

export type ResultBand = "not-ready" | "high-complexity" | "crossroads" | "foundation-ready" | "path-b-aligned";

export interface QuizQuestion {
  id: string;
  dimension: Dimension;
  question: string;
  questionBusiness?: string;
  questionTechnical?: string;
  explanation?: string; // "Why we ask this" - expandable explanation
  learnMoreUrl?: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  textBusiness?: string;
  textTechnical?: string;
  score: number;
}

export interface DimensionInfo {
  icon: LucideIcon;
  title: string;
  color: string;
  bgColor: string;
  weight: number;
  description: string;
}

export interface DimensionScore {
  score: number;
  maxScore: number;
  percentage: number;
  weight: number;
  weightedScore: number;
}

export interface QuizResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  weightedPercentage: number;
  band: ResultBand;
  bandName: string;
  description: string;
  recommendations: string[];
  dimensionScores: Record<Dimension, DimensionScore>;
  vetoTriggered: boolean;
  vetoDimension?: Dimension;
}

export interface ResultBandConfig {
  band: ResultBand;
  bandName: string;
  description: string;
  recommendations: string[];
}
