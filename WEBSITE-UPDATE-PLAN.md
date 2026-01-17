# Website Update Plan - Tributary AI

Based on the content analysis from `/mnt/d/Projects/Prompts/`, this plan outlines updates to enhance the website with additional details, new positioning, and expanded content.

---

## Executive Summary

The Prompts folder contains strategic positioning documents, a detailed professional profile, and a comprehensive AI-Ready Operating Model framework. These provide opportunities to:

1. Enrich the About page with detailed career history
2. Add the Agentic SaaS Talks podcast feature
3. Introduce new service positioning around "Active Architecture" / IT Rationalization
4. Add the AI-Ready Operating Model as a downloadable framework/resource
5. Update messaging with "Intelligence Paradox" and "Intake-to-Action" concepts

---

## Phase 1: About Page Enhancement (HIGH PRIORITY)

### Current State
The About page has a general overview but lacks specific achievements, metrics, and detailed career timeline.

### Updates from `michael_cooper_ai_profile.json`

**Add Detailed Career Timeline:**

| Company | Role | Years | Key Achievements |
|---------|------|-------|------------------|
| Omnistrate | Head of GTM | 2024-Present | $0 to ~$3M ARR, AWS/Azure listings, $1M+ cloud partner commitments |
| Ikigai Labs | VP, Partnerships | 2023-2024 | AWS, Azure, GCP, Salesforce marketplace listings |
| Astronomer | VP, Global Partnerships | 2022-2023 | Cloud partnerships and marketplace strategy |
| Confluent | Sr. Director, Cloud Partnerships | 2020-2022 | Microsoft partnership $0 to ~$40M ARR, Multiple Partner of the Year awards |
| Citrix | Sr. Director, Microsoft Partnership | 2018-2020 | Major cloud partnership agreement, Azure Virtual Desktop launch |
| Microsoft | Multiple roles | 2005-2018 | $1.1B revenue responsibility, Circle of Excellence (FY2016), WW Azure GTM Lead |
| Citrix | Director, Partner Integration | 2013-2015 | Early Windows desktops on AWS/Azure, GPU VDI deployments |
| J.R. Simplot | Global Architect | 2001-2005 | AD migration, 30+ domain consolidation, Featured Microsoft TechEd |
| Micron | Multiple roles | 1995-1998 | Tech support to Global WAN/LAN Admin |

**Add Education & Certifications:**
- George Fox University - BS, Management & Business Information Systems
- College of Eastern Utah - CEDA Debate National Championship (1994)
- Historical certifications: MCT, MCSE, CISSP, Citrix/Cisco Certified Instructor

**Add Specific Metrics:**
- $1.1B revenue responsibility at Microsoft
- $40M ARR Microsoft partnership built at Confluent
- 12% YoY growth in Enterprise Cloud Infrastructure

### Files to Modify
- `app/about/page.tsx` - Expand career timeline with specific metrics
- `data/career.ts` (NEW) - Create structured career data file

---

## Phase 2: Podcast Integration (HIGH PRIORITY)

### From Profile
```json
"podcast": {
  "name": "Agentic SaaS Talks",
  "focus": ["SaaS", "Cloud platforms", "Agentic system architectures"],
  "partner": "AWS",
  "url": "https://www.agentic-saas-talks.com/"
}
```

### Updates
1. Add podcast card to About page credentials section
2. Add podcast link to footer
3. Consider adding podcast episodes to Resources page
4. Add to navigation or hero as a feature

### Files to Modify
- `app/about/page.tsx` - Add podcast credential card
- `components/layout/footer.tsx` - Add podcast link
- `lib/constants.ts` - Add podcast URL to EXTERNAL_LINKS

---

## Phase 3: AI-Ready Operating Model Framework (MEDIUM PRIORITY)

### Source
`ai_ready_operating_model_framework.md` - Comprehensive framework with:
- Core thesis: "Cognition is no longer scarce"
- Four functional layers of work
- 5 transformation phases (Phase 0-4)
- 5-level maturity model

### Options

**Option A: New Resource/Guide Download**
- Add as downloadable PDF in Resources page
- Require email for lead generation

**Option B: New Service Page**
- Create `/services/operating-model-assessment`
- Position as diagnostic service offering

**Option C: Blog Post Series**
- Break into 3-5 blog posts explaining the framework
- Link to assessment/contact

### Recommended Approach
Implement as both:
1. Summary service page with maturity model assessment teaser
2. Full framework as downloadable resource

### New Files
- `app/services/ai-readiness/page.tsx` (NEW) - New service page
- `content/guides/ai-ready-operating-model.mdx` (NEW) - Full framework as guide
- `components/sections/maturity-model.tsx` (NEW) - Interactive maturity visualization

---

## Phase 4: Messaging & Positioning Updates (MEDIUM PRIORITY)

### Key Concepts from Documents

**The Intelligence Paradox:**
> "Intelligence is a commodity. In 2026, the cost of generating analysis has dropped toward zero. Yet operational costs remain high because the cost of moving information through an organization is at an all-time high."

**Intake-to-Action Loop:**
> "Competitive advantage is found in automating the distance between a customer's intent (emails, transcripts, forms) and the company's fulfillment (re-ordering, scheduling, updating records)."

**Active Architecture:**
> "Instead of massive, multi-year projects, focus on pragmatic, high-impact changes: Prune the Stack, Bridge the Gaps, Re-Allocate Investment."

### Where to Apply

1. **Homepage Hero** - Consider A/B testing new tagline incorporating "Intelligence Paradox"
2. **Agentic Advisory Service** - Enhance with "Intake-to-Action" positioning
3. **New Blog Posts** - Write thought leadership on these concepts
4. **Resources Page** - Add "2-Week Friction Audit" or similar diagnostic entry point

### Files to Modify
- `components/sections/hero.tsx` - Optional tagline updates
- `app/services/agentic-advisory/page.tsx` - Enhance with new concepts
- `content/blog/` - New blog posts

---

## Phase 5: New Service - IT Rationalization (LOWER PRIORITY)

### From Business Design Document
Target: Mid-market organizations ($100M-$1B)
Core Value Prop: Eliminating "Manual Tax" and "IT Drag" to drive EBITDA

### Service Components
- **Prune the Stack**: Identify and kill "zombie" systems
- **Bridge the Gaps**: Replace manual information movement with automated flows
- **Re-Allocate Investment**: Shift from back-office to customer-facing

### Consideration
This could be:
1. A fourth service offering
2. A sub-offering under Agentic Advisory
3. A separate consulting practice for future expansion

### Recommendation
Hold for now - the current three services are well-defined. Consider adding as blog content first to test market interest.

---

## Phase 6: Competitor Positioning (CONTENT STRATEGY)

### From Competitor Landscape Document
Winning strategies in the market:
1. **"Special Ops" Identity** - Position as embedded partner, not consultant
2. **"Diagnostic First" Entry Point** - Lead with fixed-fee, short-term audits
3. **"Intake-to-Action" Case Studies** - Show specific automation wins

### Content Opportunities
1. Add case studies section (when available)
2. Add "Friction Audit" as entry-point offering in Contact page
3. Update service descriptions to emphasize "embedded partner" positioning

---

## Implementation Priorities

### Immediate (This Sprint)
1. [ ] Enhance About page with full career history and metrics
2. [ ] Add Agentic SaaS Talks podcast to site
3. [ ] Update constants with podcast URL

### Near-Term (Next 2 Weeks)
4. [ ] Create AI-Ready Operating Model resource page
5. [ ] Add maturity model visualization component
6. [ ] Write 2-3 blog posts on Intelligence Paradox / Intake-to-Action

### Future (Backlog)
7. [ ] Consider IT Rationalization as fourth service
8. [ ] Add case studies section when testimonials available
9. [ ] Add "Friction Audit" diagnostic entry point

---

## File Changes Summary

### New Files to Create
| File | Purpose |
|------|---------|
| `data/career.ts` | Structured career history data |
| `app/assessment/ai-readiness/page.tsx` | AI Readiness assessment page |
| `components/sections/maturity-model.tsx` | Interactive maturity visualization |
| `content/blog/intelligence-paradox.mdx` | Blog post on core thesis |
| `content/blog/intake-to-action.mdx` | Blog post on automation concept |

### Files to Modify
| File | Changes |
|------|---------|
| `app/about/page.tsx` | Expand with detailed career, metrics, podcast |
| `components/layout/footer.tsx` | Add podcast link |
| `lib/constants.ts` | Add PODCAST_URL, career-related constants |
| `app/services/agentic-advisory/page.tsx` | Enhance positioning with framework concepts |
| `app/resources/page.tsx` | Add AI-Ready Operating Model guide |

---

## Content to Extract

### From `michael_cooper_ai_profile.json`
- Full career history with dates
- Specific achievement metrics
- Technical skills inventory
- Education and certifications
- Podcast information

### From `ai_ready_operating_model_framework.md`
- 5-level maturity model
- 5 transformation phases
- Core thesis statements
- Client-facing diagnostic framework

### From `Business Design & Positioning Strat.txt`
- "Manual Tax" terminology
- "Active Architecture" framework
- Target market definition ($100M-$1B)

### From `Messaging Thoughts.txt`
- Intelligence Paradox concept
- Job impact prediction rule
- "Why Now" urgency messaging

---

## Questions for Consideration

1. **Podcast Integration Depth**: Should podcast episodes be embedded or just linked?
2. **Maturity Assessment**: Should there be an interactive self-assessment tool?
3. **Fourth Service**: Is IT Rationalization a separate offering or part of Agentic Advisory?
4. **Entry Point**: Should a "Friction Audit" be added as a diagnostic entry point?
5. **Case Studies**: Are there client results that can be shared (anonymized if needed)?

---

*Plan created: January 16, 2026*
