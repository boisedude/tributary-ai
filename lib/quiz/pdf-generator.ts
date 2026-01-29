import { jsPDF } from "jspdf";
import type { QuizResult, Dimension, UserRole } from "./types";
import { DIMENSION_INFO, DIMENSIONS, INDUSTRY_BENCHMARKS } from "./config";
import { COMPANY, SITE_METADATA } from "@/lib/constants";

// Brand colors
const COLORS = {
  primary: "#0ea5e9", // sky-500 / accent
  primaryDark: "#0284c7", // sky-600
  text: "#1e293b", // slate-800
  textMuted: "#64748b", // slate-500
  success: "#10b981", // emerald-500
  warning: "#f59e0b", // amber-500
  danger: "#ef4444", // red-500
  border: "#e2e8f0", // slate-200
  background: "#f8fafc", // slate-50
};

export async function generateQuizPDF(
  result: QuizResult,
  userRole: NonNullable<UserRole>,
  userEmail?: string
): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = margin;

  // Helper functions
  const addText = (text: string, x: number, y: number, options: {
    size?: number;
    color?: string;
    style?: "normal" | "bold" | "italic";
    align?: "left" | "center" | "right";
    maxWidth?: number;
  } = {}) => {
    const { size = 10, color = COLORS.text, style = "normal", align = "left", maxWidth } = options;
    doc.setFontSize(size);
    doc.setTextColor(color);
    doc.setFont("helvetica", style);

    if (maxWidth) {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y, { align });
      return lines.length * (size * 0.4); // Approximate line height
    } else {
      doc.text(text, x, y, { align });
      return size * 0.4;
    }
  };

  const addLine = (y: number, color: string = COLORS.border) => {
    doc.setDrawColor(color);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
  };

  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // === HEADER ===
  // Company name
  addText("TRIBUTARY", margin, yPos, { size: 24, color: COLORS.primary, style: "bold" });
  addText("AI Readiness Assessment Report", margin, yPos + 10, { size: 12, color: COLORS.textMuted });

  // Date
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  addText(dateStr, pageWidth - margin, yPos + 5, { size: 9, color: COLORS.textMuted, align: "right" });

  yPos += 20;
  addLine(yPos);
  yPos += 10;

  // === OVERALL SCORE ===
  // Score badge
  const scoreX = pageWidth / 2;
  const scoreColor = result.band === "path-b-aligned" || result.band === "foundation-ready"
    ? COLORS.success
    : result.band === "not-ready"
      ? COLORS.danger
      : COLORS.warning;

  doc.setFillColor(scoreColor);
  doc.roundedRect(scoreX - 25, yPos, 50, 25, 3, 3, "F");
  addText(`${Math.round(result.weightedPercentage)}%`, scoreX, yPos + 16, {
    size: 20,
    color: "#ffffff",
    style: "bold",
    align: "center",
  });

  yPos += 32;

  // Band name
  addText(result.bandName, pageWidth / 2, yPos, {
    size: 16,
    color: COLORS.text,
    style: "bold",
    align: "center",
  });
  yPos += 8;

  // Role
  const roleLabel = userRole === "business" ? "Business Leader" : "Technical Leader";
  addText(`Assessment taken as: ${roleLabel}`, pageWidth / 2, yPos, {
    size: 10,
    color: COLORS.textMuted,
    align: "center",
  });
  yPos += 12;

  // Description
  const descHeight = addText(result.description, margin, yPos, {
    size: 10,
    color: COLORS.textMuted,
    maxWidth: contentWidth,
  });
  yPos += descHeight + 10;

  // Veto warning if applicable
  if (result.vetoTriggered && result.vetoDimension) {
    doc.setFillColor(255, 240, 240);
    doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, "F");
    addText("⚠ CRITICAL WEAKNESS", margin + 5, yPos + 8, {
      size: 10,
      color: COLORS.danger,
      style: "bold",
    });
    addText(
      `Your ${DIMENSION_INFO[result.vetoDimension].title} score is critically low and must be addressed first.`,
      margin + 5,
      yPos + 14,
      { size: 9, color: COLORS.danger }
    );
    yPos += 25;
  }

  addLine(yPos);
  yPos += 10;

  // === DIMENSION BREAKDOWN ===
  checkPageBreak(80);

  addText("Dimension Breakdown", margin, yPos, { size: 14, style: "bold" });
  yPos += 10;

  // Sort dimensions by score
  const sortedDims = DIMENSIONS.slice().sort((a, b) => {
    const aScore = result.dimensionScores[a]?.percentage || 0;
    const bScore = result.dimensionScores[b]?.percentage || 0;
    return aScore - bScore;
  });

  for (const dim of sortedDims) {
    checkPageBreak(15);

    const scores = result.dimensionScores[dim];
    const info = DIMENSION_INFO[dim];
    const percentage = Math.round(scores.percentage);
    const isCritical = dim === result.vetoDimension;
    const isWeak = percentage < 50;

    // Dimension name and percentage
    addText(info.title, margin, yPos, {
      size: 11,
      style: "bold",
      color: isCritical ? COLORS.danger : COLORS.text,
    });
    addText(`${percentage}%`, pageWidth - margin - 10, yPos, {
      size: 11,
      style: "bold",
      color: isCritical ? COLORS.danger : isWeak ? COLORS.warning : COLORS.success,
      align: "right",
    });

    yPos += 5;

    // Progress bar
    const barWidth = contentWidth - 30;
    const barHeight = 4;
    doc.setFillColor(COLORS.border);
    doc.roundedRect(margin, yPos, barWidth, barHeight, 1, 1, "F");

    const fillColor = isCritical ? COLORS.danger : isWeak ? COLORS.warning : COLORS.success;
    doc.setFillColor(fillColor);
    doc.roundedRect(margin, yPos, barWidth * (percentage / 100), barHeight, 1, 1, "F");

    yPos += 8;

    // Description
    addText(info.description, margin, yPos, { size: 8, color: COLORS.textMuted });
    yPos += 8;
  }

  addLine(yPos);
  yPos += 10;

  // === INDUSTRY BENCHMARKS ===
  checkPageBreak(50);

  addText("Industry Benchmarks", margin, yPos, { size: 14, style: "bold" });
  yPos += 8;

  const userScore = Math.round(result.weightedPercentage);
  const benchmarks = [
    { label: "Industry Average", value: INDUSTRY_BENCHMARKS.average.overallPercentage },
    { label: "Top 25%", value: INDUSTRY_BENCHMARKS.topQuartile.overallPercentage },
    { label: "AI-Successful", value: INDUSTRY_BENCHMARKS.aiSuccessful.overallPercentage },
  ];

  for (const benchmark of benchmarks) {
    const diff = userScore - benchmark.value;
    const diffText = diff >= 0 ? `+${diff}%` : `${diff}%`;
    const diffColor = diff >= 0 ? COLORS.success : COLORS.warning;

    addText(`${benchmark.label}:`, margin, yPos, { size: 10 });
    addText(`${benchmark.value}%`, margin + 45, yPos, { size: 10, color: COLORS.textMuted });
    addText(`(You: ${diffText})`, margin + 60, yPos, { size: 10, color: diffColor });
    yPos += 6;
  }

  yPos += 5;
  addLine(yPos);
  yPos += 10;

  // === RECOMMENDATIONS ===
  checkPageBreak(60);

  addText("Recommendations", margin, yPos, { size: 14, style: "bold" });
  yPos += 8;

  for (const rec of result.recommendations) {
    checkPageBreak(15);
    addText("→", margin, yPos, { size: 10, color: COLORS.primary });
    const recHeight = addText(rec, margin + 8, yPos, {
      size: 10,
      color: COLORS.text,
      maxWidth: contentWidth - 10,
    });
    yPos += Math.max(recHeight, 6) + 3;
  }

  yPos += 5;
  addLine(yPos);
  yPos += 10;

  // === NEXT STEPS ===
  checkPageBreak(40);

  addText("Next Steps", margin, yPos, { size: 14, style: "bold" });
  yPos += 8;

  const nextSteps = [
    "Schedule a complimentary 30-minute consultation to discuss your results",
    "Learn about our AI Readiness Assessment for deeper organizational insight",
    "Explore our services to address your specific gaps",
  ];

  for (const step of nextSteps) {
    addText("•", margin, yPos, { size: 10, color: COLORS.primary });
    addText(step, margin + 6, yPos, { size: 10 });
    yPos += 7;
  }

  // === FOOTER ===
  const footerY = pageHeight - 15;
  addLine(footerY - 5);
  addText(SITE_METADATA.URL, margin, footerY, { size: 8, color: COLORS.textMuted });
  addText(COMPANY.TAGLINE, pageWidth / 2, footerY, {
    size: 8,
    color: COLORS.textMuted,
    align: "center",
  });
  addText(`© ${COMPANY.COPYRIGHT_YEAR} ${COMPANY.NAME}`, pageWidth - margin, footerY, {
    size: 8,
    color: COLORS.textMuted,
    align: "right",
  });

  // Save the PDF
  const fileName = `AI-Readiness-Report-${Math.round(result.weightedPercentage)}pct.pdf`;
  doc.save(fileName);
}
