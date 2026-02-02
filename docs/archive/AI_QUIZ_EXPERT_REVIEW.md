# AI Readiness Quiz: Expert Peer Review

**Prepared by:** Dr. Marcus Webb, AI Systems Expert
**Date:** January 27, 2026
**Subject:** Critical Analysis of Tributary AI's Self-Assessment Quiz

---

## Executive Summary

This document provides a rigorous academic and practitioner-informed review of Tributary AI's AI Readiness Quiz. The assessment is benchmarked against established frameworks from Gartner, McKinsey, MIT Sloan, Accenture, and peer-reviewed academic literature on organizational readiness for change.

The quiz demonstrates a thoughtful approach with several innovative elements but has notable gaps when compared to comprehensive AI maturity frameworks used by leading consultancies.

---

## 1. Strengths of the Current Quiz

### 1.1 Dimensional Framework
The four-dimensional model (People, Process, Technology, Politics) represents a pragmatic simplification of more complex frameworks. This is appropriate for a 3-minute self-assessment.

**What works well:**
- The "Politics" dimension is a differentiator. Many assessments overlook organizational politics, yet research consistently shows that executive alignment and change history are critical predictors of AI implementation success (MIT CISR, 2024).
- Question framing uses behavioral indicators rather than abstract concepts (e.g., "When a major decision needs to be made, what typically happens?" rather than "Rate your decision-making clarity").
- The Path A/Path B narrative is compelling and aligns with the academic concept of "prerequisites before transformation."

### 1.2 Question Quality
Several questions demonstrate strong design:

- **people-1** (Leadership understanding): Distinguishes between unrealistic optimism, basic awareness, and nuanced understanding—a validated indicator of AI readiness ([MIT Sloan, 2024](https://mitsloan.mit.edu/ideas-made-to-matter/leading-ai-driven-organization)).
- **politics-2** (Past initiative outcomes): Draws on organizational change history as a predictor, which is well-supported in change management literature ([PMC, 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7014613/)).
- **process-1** (Documentation quality): Directly addresses tacit knowledge vs. explicit knowledge, a fundamental barrier to AI automation.

### 1.3 User Experience Design
- 10 questions is within the optimal range for self-assessment completion (research suggests 5-15 questions for >80% completion rates).
- Progressive disclosure and instant results reduce abandonment.
- Email capture with value exchange (detailed report) is appropriate lead generation.

### 1.4 Actionable Results
The four result bands provide specific, differentiated recommendations rather than generic advice. This is superior to many assessments that offer vague guidance regardless of score.

---

## 2. Critical Gaps Compared to Best Practices

### 2.1 Missing Dimensions

Based on comprehensive analysis of leading frameworks, the following dimensions are notably absent:

| Missing Dimension | Importance | Framework Sources |
|-------------------|------------|-------------------|
| **Data Readiness** | Critical | Gartner, McKinsey, MIT Sloan, Deloitte, Accenture |
| **AI/Digital Strategy** | High | Gartner (7 dimensions), McKinsey (6 dimensions) |
| **Governance & Ethics** | High | Accenture, NIST AI RMF, ISO/IEC 42001 |
| **Talent & Skills** | High | McKinsey, MIT CISR, Enterprise Knowledge |
| **Financial Readiness** | Moderate | RSM, Guidehouse, Private Equity frameworks |
| **Scalability & Architecture** | Moderate | Accenture, Microsoft Azure Well-Architected |

**Critical Missing Dimension: Data Readiness**

According to [Deloitte](https://www.deloitte.com/mt/en/Industries/technology/perspectives/Data-governance-and-AI-readiness.html), data governance is a foundational prerequisite for AI success. The current quiz has only one question (tech-2) tangentially addressing data, but it focuses on data accessibility rather than:
- Data quality (accuracy, completeness, consistency, timeliness)
- Data governance maturity
- Data architecture and interoperability
- AI-specific data requirements (contextual alignment, metadata, formats)

Gartner explicitly identifies "AI-ready data" as one of four pillars of AI readiness, noting that organizations must ensure "valuable data meets 5 key criteria" ([Gartner AI-Ready Data](https://www.gartner.com/en/articles/ai-ready-data)).

**Critical Missing Dimension: Governance & Ethics**

McKinsey's AI Trust Maturity Model spans four dimensions with 21 subdimensions, with an average organizational score of only 2.0/4.0 ([McKinsey RAI Survey](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/insights-on-responsible-ai-from-the-global-ai-trust-maturity-survey)). With the EU AI Act now in effect and requiring conformity assessments for high-risk AI systems, governance readiness has become non-negotiable.

### 2.2 Question Imbalance

Current distribution:
- People: 3 questions (30%)
- Process: 3 questions (30%)
- Technology: 2 questions (20%)
- Politics: 2 questions (20%)

**Issues:**
1. Technology is underweighted given its foundational importance. Accenture's framework evaluates 17 key capabilities, with "foundational" AI capabilities (cloud platforms, data platforms, architecture, governance) explicitly required to keep pace with competitors ([Accenture AI Maturity](https://www.accenture.com/us-en/insights/artificial-intelligence/ai-maturity-and-transformation)).
2. No questions address infrastructure, cloud readiness, or technical architecture.
3. No questions address security or compliance posture.

### 2.3 Scoring Methodology Limitations

**Current Approach:**
- Linear 1-4 scoring per question
- Simple summation (max 40 points)
- Four bands with fixed thresholds (≤16, ≤24, ≤32, >32)

**Issues Identified:**

1. **Equal Weighting Problem**: All dimensions and questions are weighted equally. Research suggests data readiness and executive alignment should receive higher weights as they are stronger predictors of AI implementation success ([McKinsey Rewired, 2024](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/rewired-and-running-ahead-digital-and-ai-leaders-are-leaving-the-rest-behind)).

2. **No Dimensional Analysis in Results**: While the code calculates dimension scores, the user-facing results only show a total score. Best practice assessments show dimension-level scores to identify specific areas of weakness.

3. **Linear Scoring May Be Inappropriate**: A score of 1 in a critical area (e.g., complete data chaos) may be a "veto" condition that should prevent advancement regardless of other scores. Current methodology allows a total score of 25+ even with multiple 1s.

4. **Threshold Validation**: The thresholds (16, 24, 32) appear arbitrary. Industry benchmarks from [MIT CISR](https://mitsloan.mit.edu/ideas-made-to-matter/whats-your-companys-ai-maturity-level) and Accenture suggest 5-stage models map more precisely to organizational maturity levels.

### 2.4 Potential Bias Issues

Academic literature on organizational readiness assessment identifies several bias types that may affect this quiz:

1. **Social Desirability Bias**: Self-report measures are subject to respondents answering in ways that present their organization favorably ([PMC, 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7014613/)). The quiz lacks any validation questions or consistency checks.

2. **Single Respondent Bias**: The quiz captures one person's perspective. Research shows that organizational readiness varies significantly by role and department. A CEO and frontline manager may have radically different views of "decision-making clarity."

3. **Present-Moment Bias**: Questions assess current state but not trajectory or velocity of change. An organization actively improving may score the same as a stagnant one.

4. **Industry Blindness**: No industry context is captured. AI readiness benchmarks vary significantly across sectors. A manufacturing company scoring 28 has different implications than a fintech scoring 28.

5. **Size/Complexity Blindness**: A 50-person company and a 5,000-person enterprise face fundamentally different AI readiness challenges, yet receive identical questions.

---

## 3. Question-Level Recommendations

### 3.1 Questions Requiring Revision

**people-2** (Decision authority)
- **Issue**: Conflates decision speed with decision quality. Fast, clear decisions can still be wrong.
- **Recommended Revision**:
  > "When critical decisions need to be made about technology investments or process changes, how does your organization proceed?"
  > - "Decisions stall or get reversed frequently—there's no clear authority"
  > - "One executive decides everything, but often lacks key information"
  > - "Defined decision-makers exist, but cross-functional input is inconsistent"
  > - "Structured process with clear authority, defined criteria, and stakeholder input"

**tech-1** (Software ecosystem)
- **Issue**: Focuses only on integration, missing infrastructure modernization, cloud readiness, and API maturity.
- **Recommended Revision**: Split into two questions:
  > 1. "How integrated is your software ecosystem?"
  > 2. "How modern and flexible is your technical infrastructure?"

**tech-2** (Single source of truth)
- **Issue**: Narrow focus on one data quality aspect.
- **Recommended Revision**:
  > "How would you rate your organization's data readiness for AI?"
  > - "Data is scattered, inconsistent, and no one trusts it"
  > - "We have data, but quality issues and access limitations are common"
  > - "Core data is reasonably clean and accessible, with some governance"
  > - "High-quality, well-governed data with clear ownership and documented lineage"

### 3.2 Recommended New Questions

Based on gap analysis, the following questions should be added:

**Data Dimension (New - Critical)**

> **data-1**: "If your organization wanted to train an AI model on your historical data tomorrow, what would happen?"
> - "We'd spend months just locating and cleaning the data"
> - "We could find the data but would face significant quality and format issues"
> - "Most core data is accessible and reasonably clean, with some preparation needed"
> - "Our data is well-organized, documented, and ready for advanced analytics"

> **data-2**: "How does your organization currently use data in decision-making?"
> - "Decisions are mostly intuition-based; data is rarely consulted"
> - "We look at data occasionally, but it's often outdated or incomplete"
> - "Key decisions involve data analysis, though it's often manual"
> - "Data-driven decision-making is standard, with dashboards and analytics widely used"

**Governance/Ethics Dimension (New - Important)**

> **governance-1**: "How prepared is your organization to ensure AI is used responsibly and ethically?"
> - "We haven't thought about AI ethics or governance yet"
> - "We're aware of the issues but have no formal policies or oversight"
> - "We have some guidelines, but they're informal or inconsistently applied"
> - "We have formal AI governance policies, clear accountability, and review processes"

**Talent/Skills Dimension (New - Important)**

> **talent-1**: "How would you describe your organization's AI and data science capabilities?"
> - "No in-house expertise; we'd need to hire or outsource everything"
> - "A few tech-savvy individuals, but no formal AI/ML skills"
> - "Some data analysts who could upskill; limited but growing capabilities"
> - "Dedicated data science or AI team with proven track record"

**Strategy Dimension (New - Moderate Priority)**

> **strategy-1**: "Does your organization have a documented AI strategy connected to business objectives?"
> - "No—AI is not on our strategic agenda"
> - "There's interest but no formal strategy or roadmap"
> - "We have an emerging AI strategy, though it's still being developed"
> - "Clear AI strategy aligned with business goals, with defined priorities and metrics"

### 3.3 Question Ordering Recommendations

Research on survey design suggests:
1. Start with engaging, non-threatening questions
2. Group by dimension for cognitive ease
3. Place more challenging/sensitive questions in the middle
4. End with forward-looking questions

**Recommended Order:**
1. people-1 (Leadership understanding) - engaging opener
2. people-3 (Employee time allocation) - relatable
3. process-1 (Documentation)
4. process-2 (Coordination burden)
5. process-3 (Bottleneck visibility)
6. tech-1 (Ecosystem integration)
7. data-1 (Data readiness) - NEW
8. data-2 (Data-driven decisions) - NEW
9. tech-2 (Single source of truth) - REVISED
10. talent-1 (AI capabilities) - NEW
11. governance-1 (AI ethics) - NEW
12. strategy-1 (AI strategy) - NEW
13. people-2 (Decision authority) - REVISED
14. politics-1 (Executive alignment)
15. politics-2 (Past initiative outcomes) - end on reflection

This expands to 15 questions (~5-6 minutes), which remains within acceptable range while significantly improving comprehensiveness.

---

## 4. Scoring Methodology Refinements

### 4.1 Introduce Dimensional Weighting

Based on research from [McKinsey's Rewired](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/rewired-and-running-ahead-digital-and-ai-leaders-are-leaving-the-rest-behind) and Accenture's AI Maturity framework, I recommend the following weights:

| Dimension | Weight | Rationale |
|-----------|--------|-----------|
| Data | 25% | Foundational requirement; AI cannot succeed without quality data |
| Technology | 20% | Infrastructure enables scalability |
| People | 20% | Talent and leadership understanding |
| Process | 15% | Operational readiness |
| Governance | 10% | Risk mitigation and sustainability |
| Politics | 10% | Change capacity and alignment |

### 4.2 Introduce "Veto" Conditions

If any dimension averages below 1.5, the organization should be flagged as "Not Ready" regardless of total score. This prevents false positives where strong areas mask critical weaknesses.

### 4.3 Show Dimensional Breakdown in Results

The current code already calculates `dimensionScores` but only uses it for email reports. This should be surfaced in the UI with a radar/spider chart or bar visualization showing relative strengths and weaknesses.

### 4.4 Consider Five-Stage Model

Align with industry-standard maturity models (MIT CISR, Accenture):

| Stage | Score Range | Name |
|-------|-------------|------|
| 1 | 0-20% | AI Unaware |
| 2 | 21-40% | AI Exploring |
| 3 | 41-60% | AI Emerging |
| 4 | 61-80% | AI Proficient |
| 5 | 81-100% | AI Mature |

This provides more granularity than the current four bands and aligns with how enterprises typically think about maturity.

---

## 5. New Dimensions to Consider

Based on comprehensive framework analysis, I recommend prioritizing:

### 5.1 Must-Add (Phase 1)

1. **Data Readiness**: 2-3 questions covering quality, governance, and analytics maturity
2. **AI/Digital Strategy**: 1-2 questions on strategic clarity and alignment

### 5.2 Should-Add (Phase 2)

3. **Talent & Skills**: 1-2 questions on existing capabilities and upskilling plans
4. **Governance & Ethics**: 1 question on responsible AI preparation

### 5.3 Could-Add (Phase 3)

5. **Financial Readiness**: Willingness to invest, budget availability
6. **Vendor/Partner Ecosystem**: External partnerships and resources
7. **Industry Context**: Competitive pressure and regulatory environment

---

## 6. UX Improvements from Assessment Design Perspective

### 6.1 Add Confidence Indicators

After each question, allow respondents to indicate confidence level ("I'm certain" / "I'm unsure"). This provides:
- Data quality signal
- Potential for weighting uncertain responses differently
- Insight into which organizational areas lack visibility

### 6.2 Role-Based Branching (Advanced)

Capture respondent role (Executive, IT, Operations, Finance) and:
- Adjust question wording appropriately
- Weight responses by relevance to role expertise
- Provide role-specific recommendations

### 6.3 Benchmarking Context

After completion, show how the score compares to:
- Industry averages (if data is collected)
- Size-comparable organizations
- "AI Achievers" benchmark (Accenture: top 12%)

### 6.4 Progress Tracking

Allow organizations to retake the assessment quarterly and track trajectory. Static snapshots are less valuable than trends.

### 6.5 Multi-Respondent Support

Encourage multiple stakeholders to complete the assessment and show variance. High internal variance itself is a diagnostic signal.

---

## 7. Validation Suggestions

### 7.1 Content Validity

1. **Expert Panel Review**: Convene 5-7 AI implementation practitioners to review question coverage and wording using Delphi method.
2. **Cognitive Interviews**: Conduct think-aloud sessions with 10-15 target users to identify confusing questions or misinterpretations.
3. **Framework Mapping**: Formally map each question to established framework dimensions (Gartner, McKinsey) to demonstrate coverage.

### 7.2 Construct Validity

1. **Factor Analysis**: Once 200+ responses are collected, perform exploratory factor analysis to confirm dimensional structure.
2. **Convergent Validity**: Compare results with other established assessments (Microsoft AI Readiness, TDWI) on a subset of users.
3. **Discriminant Validity**: Verify that dimension scores are sufficiently independent.

### 7.3 Predictive Validity

This is the gold standard but requires longitudinal tracking:

1. **Track Outcomes**: Follow up with quiz-takers 12-18 months later on:
   - Whether they implemented AI
   - Success/failure of implementation
   - Time to value
   - Actual barriers encountered

2. **Correlate Scores**: Determine which dimensions and questions most strongly predict outcomes.

3. **Calibrate Thresholds**: Adjust band thresholds based on actual success rates.

### 7.4 Reliability

1. **Test-Retest**: Have subset retake quiz after 2 weeks; expect r > 0.8 for stable organizations.
2. **Internal Consistency**: Calculate Cronbach's alpha for each dimension; target α > 0.7.

### 7.5 Bias Mitigation

1. **Add Validation Question**: Include one question with objectively verifiable answer to detect social desirability bias.
2. **Collect Industry/Size Data**: Enable segmented analysis and appropriate benchmarking.
3. **Consider Third-Party Facilitation**: For deeper assessments, recommend external facilitation to reduce bias ([PMC, 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7014613/)).

---

## 8. Implementation Roadmap

### Phase 1: Quick Wins (1-2 weeks)
- [ ] Add dimensional breakdown visualization to results
- [ ] Revise tech-2 question to address data quality more directly
- [ ] Add industry/company size capture (optional) for future benchmarking

### Phase 2: Question Enhancement (2-4 weeks)
- [ ] Add 2 data readiness questions
- [ ] Add 1 governance/ethics question
- [ ] Revise people-2 per recommendations
- [ ] Reorder questions per recommendations
- [ ] Update scoring thresholds for expanded question set

### Phase 3: Scoring Sophistication (4-8 weeks)
- [ ] Implement dimensional weighting
- [ ] Add veto condition logic
- [ ] Consider five-stage model alignment
- [ ] Add benchmark comparisons (once data collected)

### Phase 4: Validation (Ongoing)
- [ ] Begin tracking conversion to assessment/engagement
- [ ] Implement outcome tracking for predictive validity
- [ ] Conduct formal validation study once n > 200

---

## 9. Conclusion

Tributary's AI Readiness Quiz is a solid foundation with several innovative elements, particularly the "Politics" dimension and behavioral question framing. However, to meet the standards of leading assessment frameworks, it requires:

1. **Expansion** to cover Data Readiness and Governance dimensions
2. **Refinement** of scoring methodology to include weighting and veto conditions
3. **Validation** through systematic testing and outcome tracking

The quiz's current state would score approximately 3/5 compared to comprehensive frameworks like Gartner's AI Maturity Model or Accenture's 17-capability assessment. With the recommended enhancements, it could achieve 4/5 and provide meaningfully differentiated value in the market.

The most critical gap is **Data Readiness**—this is the single dimension most consistently identified across all major frameworks as essential, yet currently underrepresented in the quiz. Addressing this should be the top priority.

---

## References

1. Gartner. (2025). "AI Maturity Model and AI Roadmap Toolkit." https://www.gartner.com/en/chief-information-officer/research/ai-maturity-model-toolkit
2. McKinsey & Company. (2024). "Insights on responsible AI from the Global AI Trust Maturity Survey." https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/insights-on-responsible-ai-from-the-global-ai-trust-maturity-survey
3. McKinsey & Company. (2024). "Rewired and running ahead: Digital and AI leaders are leaving the rest behind." https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/rewired-and-running-ahead-digital-and-ai-leaders-are-leaving-the-rest-behind
4. MIT Sloan. (2024). "What's your company's AI maturity level?" https://mitsloan.mit.edu/ideas-made-to-matter/whats-your-companys-ai-maturity-level
5. MIT Sloan. (2024). "Leading the AI-driven organization." https://mitsloan.mit.edu/ideas-made-to-matter/leading-ai-driven-organization
6. Accenture. (2024). "The Art of AI Maturity." https://www.accenture.com/us-en/insights/artificial-intelligence/ai-maturity-and-transformation
7. Deloitte. (2024). "Data governance and AI readiness." https://www.deloitte.com/mt/en/Industries/technology/perspectives/Data-governance-and-AI-readiness.html
8. Weiner, B.J. et al. (2020). "Unpacking organizational readiness for change: an updated systematic review and content analysis of assessments." BMC Health Services Research. https://pmc.ncbi.nlm.nih.gov/articles/PMC7014613/
9. Gartner. (2025). "AI-Ready Data Essentials to Capture AI Value." https://www.gartner.com/en/articles/ai-ready-data
10. Elsayed, S. et al. (2024). "Factors influencing readiness for artificial intelligence: a systematic literature review." ScienceDirect. https://www.sciencedirect.com/science/article/pii/S2666764924000511
11. OvalEdge. (2025). "What Is AI Readiness? Framework, Assessment & Steps for 2026." https://www.ovaledge.com/blog/what-is-ai-readiness

---

*This review was prepared using established academic and industry frameworks. All recommendations should be validated against Tributary's specific business context and client base.*
