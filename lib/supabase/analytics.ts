/**
 * Analytics and company rollup functions.
 */

import { supabase } from "./client";
import type { CompanyRollup } from "./types";
import { anonymizeEmail, aggregateDimensionScores } from "./utils";

/**
 * Generate company-specific recommendations based on dimension averages.
 */
function generateCompanyRecommendations(
  dimensionAverages: Record<string, number>,
  averageScore: number
): string[] {
  const recommendations: string[] = [];

  // Overall score recommendation
  if (averageScore < 40) {
    recommendations.push(
      "Your organization has significant foundational gaps. Consider a comprehensive AI readiness assessment before investing in AI initiatives."
    );
  } else if (averageScore < 60) {
    recommendations.push(
      "Focus on strengthening your weakest dimensions before pursuing ambitious AI projects. Quick wins can build momentum."
    );
  } else {
    recommendations.push(
      "Your organization has solid foundations. Prioritize high-impact AI use cases that leverage your strengths."
    );
  }

  // Dimension-specific recommendations
  if (dimensionAverages.data < 50) {
    recommendations.push(
      "Data readiness is a critical gap. Invest in data quality, governance, and accessibility before AI implementation."
    );
  }

  if (dimensionAverages.technology < 50) {
    recommendations.push(
      "Technology integration needs attention. Focus on API connectivity and reducing data silos."
    );
  }

  if (dimensionAverages.people < 50) {
    recommendations.push(
      "Leadership AI literacy is low. Consider executive education on AI capabilities and limitations."
    );
  }

  if (dimensionAverages.process < 50) {
    recommendations.push(
      "Process documentation is insufficient for AI automation. Document and standardize key workflows first."
    );
  }

  if (dimensionAverages.governance < 50) {
    recommendations.push(
      "AI governance framework is needed. Establish policies before scaling AI adoption."
    );
  }

  if (dimensionAverages.politics < 50) {
    recommendations.push(
      "Executive alignment on AI priorities is weak. Facilitate alignment discussions before major investments."
    );
  }

  return recommendations.slice(0, 5); // Max 5 recommendations
}

/**
 * Get company rollup data (requires 3+ submissions).
 *
 * @param domain - Company domain to get rollup for
 * @returns Company rollup data or null if not enough submissions
 */
export async function getCompanyRollup(domain: string): Promise<CompanyRollup | null> {
  try {
    const { data, error } = await supabase
      .from("quiz_submissions")
      .select("*")
      .eq("company_domain", domain)
      .order("created_at", { ascending: false });

    if (error || !data || data.length < 3) {
      return null;
    }

    const totalSubmissions = data.length;

    // Average score
    const averageScore = Math.round(
      data.reduce((sum, s) => sum + s.weighted_percentage, 0) / totalSubmissions
    );

    // Dimension averages using utility
    const dimensionAverages = aggregateDimensionScores(data);

    // Band distribution
    const bandDistribution: Record<string, number> = {};
    data.forEach(s => {
      bandDistribution[s.band] = (bandDistribution[s.band] || 0) + 1;
    });

    // Role distribution
    const roleDistribution: Record<string, number> = {};
    data.forEach(s => {
      roleDistribution[s.user_role] = (roleDistribution[s.user_role] || 0) + 1;
    });

    // Individual submissions (anonymized emails)
    const submissions = data.map(s => ({
      email: s.user_email ? anonymizeEmail(s.user_email) : "Anonymous",
      role: s.user_role,
      score: Math.round(s.weighted_percentage),
      band: s.band_name,
      createdAt: s.created_at,
    }));

    // Identify strengths and weaknesses
    const sortedDimensions = Object.entries(dimensionAverages)
      .sort(([, a], [, b]) => b - a);

    const strengths = sortedDimensions
      .filter(([, score]) => score >= 65)
      .slice(0, 2)
      .map(([dim]) => dim);

    const weaknesses = sortedDimensions
      .filter(([, score]) => score < 50)
      .slice(-2)
      .map(([dim]) => dim);

    // Generate recommendations based on weaknesses
    const recommendations = generateCompanyRecommendations(dimensionAverages, averageScore);

    return {
      domain,
      totalSubmissions,
      averageScore,
      dimensionAverages,
      bandDistribution,
      roleDistribution,
      submissions,
      strengths,
      weaknesses,
      recommendations,
    };
  } catch (err) {
    console.error("Error in getCompanyRollup:", err);
    return null;
  }
}

/**
 * Get list of companies eligible for rollup (3+ submissions).
 *
 * @returns Array of domains with submission counts
 */
export async function getCompaniesForRollup(): Promise<{ domain: string; count: number }[]> {
  try {
    const { data, error } = await supabase
      .from("quiz_submissions")
      .select("company_domain");

    if (error || !data) {
      return [];
    }

    // Count submissions per domain
    const domainCounts: Record<string, number> = {};
    data.forEach(s => {
      if (s.company_domain) {
        domainCounts[s.company_domain] = (domainCounts[s.company_domain] || 0) + 1;
      }
    });

    // Filter to domains with 3+ submissions
    return Object.entries(domainCounts)
      .filter(([, count]) => count >= 3)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count);
  } catch (err) {
    console.error("Error in getCompaniesForRollup:", err);
    return [];
  }
}
