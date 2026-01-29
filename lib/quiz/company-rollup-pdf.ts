import { jsPDF } from "jspdf";
import type { CompanyRollup } from "@/lib/supabase";
import { DIMENSION_INFO, DIMENSIONS, INDUSTRY_BENCHMARKS } from "./config";
import { COMPANY, SITE_METADATA } from "@/lib/constants";

// Brand colors
const COLORS = {
  primary: "#0ea5e9",
  primaryDark: "#0284c7",
  text: "#1e293b",
  textMuted: "#64748b",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  border: "#e2e8f0",
  background: "#f8fafc",
};

export async function generateCompanyRollupPDF(rollup: CompanyRollup): Promise<void> {
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
      return lines.length * (size * 0.4);
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
  addText("TRIBUTARY", margin, yPos, { size: 24, color: COLORS.primary, style: "bold" });
  addText("Company AI Readiness Rollup", margin, yPos + 10, { size: 12, color: COLORS.textMuted });

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  addText(dateStr, pageWidth - margin, yPos + 5, { size: 9, color: COLORS.textMuted, align: "right" });

  yPos += 20;
  addLine(yPos);
  yPos += 10;

  // === COMPANY INFO ===
  addText(rollup.domain, pageWidth / 2, yPos, {
    size: 20,
    color: COLORS.text,
    style: "bold",
    align: "center",
  });
  yPos += 10;

  addText(`${rollup.totalSubmissions} Team Members Assessed`, pageWidth / 2, yPos, {
    size: 12,
    color: COLORS.textMuted,
    align: "center",
  });
  yPos += 15;

  // === OVERALL SCORE ===
  const scoreColor = rollup.averageScore >= 65 ? COLORS.success :
    rollup.averageScore >= 50 ? COLORS.warning : COLORS.danger;

  doc.setFillColor(scoreColor);
  doc.roundedRect(pageWidth / 2 - 30, yPos, 60, 30, 3, 3, "F");
  addText(`${rollup.averageScore}%`, pageWidth / 2, yPos + 20, {
    size: 24,
    color: "#ffffff",
    style: "bold",
    align: "center",
  });

  yPos += 40;

  // Industry comparison
  const avgBenchmark = INDUSTRY_BENCHMARKS.average.overallPercentage;
  const diff = rollup.averageScore - avgBenchmark;
  const comparisonText = diff >= 0
    ? `${diff}% above industry average (${avgBenchmark}%)`
    : `${Math.abs(diff)}% below industry average (${avgBenchmark}%)`;

  addText(comparisonText, pageWidth / 2, yPos, {
    size: 11,
    color: diff >= 0 ? COLORS.success : COLORS.warning,
    align: "center",
  });
  yPos += 15;

  addLine(yPos);
  yPos += 10;

  // === DIMENSION BREAKDOWN ===
  checkPageBreak(80);

  addText("Dimension Analysis", margin, yPos, { size: 14, style: "bold" });
  yPos += 10;

  // Sort dimensions by score
  const sortedDims = DIMENSIONS.slice().sort((a, b) => {
    const aScore = rollup.dimensionAverages[a] || 0;
    const bScore = rollup.dimensionAverages[b] || 0;
    return bScore - aScore;
  });

  for (const dim of sortedDims) {
    checkPageBreak(12);

    const avg = rollup.dimensionAverages[dim] || 0;
    const info = DIMENSION_INFO[dim];
    const isStrength = rollup.strengths.includes(dim);
    const isWeakness = rollup.weaknesses.includes(dim);

    // Dimension name
    let dimLabel = info.title;
    if (isStrength) dimLabel += " ★";
    if (isWeakness) dimLabel += " ⚠";

    addText(dimLabel, margin, yPos, {
      size: 11,
      style: "bold",
      color: isStrength ? COLORS.success : isWeakness ? COLORS.warning : COLORS.text,
    });
    addText(`${avg}%`, pageWidth - margin - 10, yPos, {
      size: 11,
      style: "bold",
      color: avg >= 65 ? COLORS.success : avg >= 50 ? COLORS.warning : COLORS.danger,
      align: "right",
    });

    yPos += 5;

    // Progress bar
    const barWidth = contentWidth - 30;
    const barHeight = 4;
    doc.setFillColor(COLORS.border);
    doc.roundedRect(margin, yPos, barWidth, barHeight, 1, 1, "F");

    const fillColor = avg >= 65 ? COLORS.success : avg >= 50 ? COLORS.warning : COLORS.danger;
    doc.setFillColor(fillColor);
    doc.roundedRect(margin, yPos, barWidth * (avg / 100), barHeight, 1, 1, "F");

    yPos += 10;
  }

  yPos += 5;
  addText("★ Strength   ⚠ Needs Attention", margin, yPos, { size: 8, color: COLORS.textMuted });
  yPos += 10;

  addLine(yPos);
  yPos += 10;

  // === TEAM DISTRIBUTION ===
  checkPageBreak(50);

  addText("Team Distribution by Result", margin, yPos, { size: 14, style: "bold" });
  yPos += 8;

  const bandLabels: Record<string, string> = {
    "path-b-aligned": "Path B Aligned",
    "foundation-ready": "Foundation Ready",
    "crossroads": "Crossroads",
    "high-complexity": "High Complexity",
    "not-ready": "Not Ready",
  };

  Object.entries(rollup.bandDistribution)
    .sort((a, b) => b[1] - a[1])
    .forEach(([band, count]) => {
      const percentage = Math.round((count / rollup.totalSubmissions) * 100);
      addText(`${bandLabels[band] || band}:`, margin, yPos, { size: 10 });
      addText(`${count} (${percentage}%)`, margin + 60, yPos, { size: 10, color: COLORS.textMuted });
      yPos += 6;
    });

  yPos += 5;
  addLine(yPos);
  yPos += 10;

  // === RECOMMENDATIONS ===
  checkPageBreak(60);

  addText("Recommendations", margin, yPos, { size: 14, style: "bold" });
  yPos += 8;

  for (const rec of rollup.recommendations) {
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
    "Schedule a complimentary consultation to review these findings with your leadership team",
    "Consider our full AI Readiness Assessment for deeper organizational insight",
    "Develop an action plan to address your lowest-scoring dimensions",
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
  addText("Confidential - For Internal Use Only", pageWidth / 2, footerY, {
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
  const fileName = `${rollup.domain}-AI-Readiness-Rollup.pdf`;
  doc.save(fileName);
}
