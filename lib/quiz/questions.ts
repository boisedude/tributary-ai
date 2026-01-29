import type { QuizQuestion } from "./types";

export const QUESTIONS: QuizQuestion[] = [
  // 1. People - Leadership understanding (engaging opener)
  {
    id: "people-1",
    dimension: "people",
    question: "How would you describe your leadership team's understanding of AI capabilities and limitations?",
    explanation: "AI initiatives fail when leadership has unrealistic expectations. Leaders who understand what AI can and can't do make better investment decisions and set achievable goals for their teams.",
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
    explanation: "AI is most valuable when it frees up skilled employees from repetitive tasks. Organizations where talent is already focused on strategic work have less low-hanging fruit but are ready for more advanced AI applications.",
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
    explanation: "AI can only automate what's understood and documented. Tribal knowledge trapped in people's heads can't be systematized. Process documentation is a prerequisite for meaningful automation.",
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
    explanation: "High coordination overhead signals process complexity. AI works best when handoffs are clean and predictable. Messy processes need simplification before automation.",
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
    explanation: "You can't improve what you can't see. Organizations with process visibility can target AI investments at real bottlenecks rather than guessing. Visibility also helps measure AI impact.",
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
    questionBusiness: "How well do your business systems work together?",
    questionTechnical: "How would you describe your company's software architecture and integration?",
    explanation: "AI needs to connect with existing systems to be useful. Disconnected tools mean AI solutions become another silo. Integrated systems enable AI to access the data it needs and take action across your business.",
    learnMoreUrl: "/blog/build-vs-buy-ai-decision-guide",
    options: [
      {
        text: "A patchwork of disconnected tools - nothing talks to anything else",
        textBusiness: "Disconnected tools - people re-enter data constantly",
        textTechnical: "Siloed applications with no APIs or integration layer",
        score: 1,
      },
      {
        text: "We have many tools with some manual workarounds to connect them",
        textBusiness: "We use spreadsheets and manual exports to connect systems",
        textTechnical: "Point-to-point integrations with manual workarounds",
        score: 2,
      },
      {
        text: "Core systems are integrated, but we still have data silos",
        textBusiness: "Main systems are connected, but some data still lives in spreadsheets",
        textTechnical: "Core systems integrated, but data silos remain across departments",
        score: 3,
      },
      {
        text: "Well-integrated stack with APIs connecting critical systems",
        textBusiness: "Systems share data automatically - minimal manual data entry",
        textTechnical: "API-first architecture with event-driven integrations",
        score: 4,
      },
    ],
  },
  // 7. Data - AI training readiness
  {
    id: "data-1",
    dimension: "data",
    question: "If your organization wanted to train an AI model on your historical data tomorrow, what would happen?",
    questionBusiness: "If you wanted to use AI to analyze your business data tomorrow, what would happen?",
    questionTechnical: "If your organization wanted to train an AI model on your historical data tomorrow, what would happen?",
    explanation: "AI is only as good as its training data. Organizations that can quickly access clean, organized historical data can move faster with AI. Data preparation often takes 60-80% of AI project time.",
    learnMoreUrl: "/blog/why-ai-projects-fail-data-architecture",
    options: [
      {
        text: "We'd spend months just locating and cleaning the data",
        textBusiness: "We'd spend months just finding and organizing the data",
        score: 1,
      },
      {
        text: "We could find the data but would face significant quality and format issues",
        textBusiness: "We could find it, but the data quality would be a problem",
        score: 2,
      },
      {
        text: "Most core data is accessible and reasonably clean, with some preparation needed",
        textBusiness: "Most of our important data is accessible and fairly reliable",
        score: 3,
      },
      {
        text: "Our data is well-organized, documented, and ready for advanced analytics",
        textBusiness: "Our data is well-organized and trusted for decision-making",
        score: 4,
      },
    ],
  },
  // 8. Data - Data-driven decisions
  {
    id: "data-2",
    dimension: "data",
    question: "How does your organization currently use data in decision-making?",
    explanation: "Organizations already using data for decisions have the cultural foundation for AI. If data is ignored today, AI recommendations will be ignored too. Data-driven culture precedes AI-driven operations.",
    learnMoreUrl: "/blog/data-quality-for-ai-quick-wins",
    options: [
      { text: "Decisions are mostly intuition-based; data is rarely consulted", score: 1 },
      { text: "We look at data occasionally, but it's often outdated or incomplete", score: 2 },
      { text: "Key decisions involve data analysis, though it's often manual", score: 3 },
      { text: "Data-driven decision-making is standard, with dashboards and analytics widely used", score: 4 },
    ],
  },
  // 9. Data - Single source of truth
  {
    id: "data-3",
    dimension: "data",
    question: "How would you rate your organization's data quality and governance?",
    explanation: "Garbage in, garbage out applies doubly to AI. Poor data quality leads to poor AI outputs that erode trust. Well-governed data with clear ownership enables confident AI deployment.",
    learnMoreUrl: "/blog/why-ai-projects-fail-data-architecture",
    options: [
      { text: "Data is scattered, inconsistent, and no one trusts it", score: 1 },
      { text: "We have data, but quality issues and access limitations are common", score: 2 },
      { text: "Core data is reasonably clean and accessible, with some governance", score: 3 },
      { text: "High-quality, well-governed data with clear ownership and documented lineage", score: 4 },
    ],
  },
  // 10. Data - Data lineage and traceability
  {
    id: "data-4",
    dimension: "data",
    question: "Can you trace where your critical business data comes from and how it's transformed?",
    explanation: "When AI makes a recommendation, you need to understand what data drove it. Data lineage helps you debug AI issues, meet compliance requirements, and build trust in AI outputs.",
    learnMoreUrl: "/blog/why-ai-projects-fail-data-architecture",
    options: [
      { text: "No idea - data appears in reports but we don't know its origin", score: 1 },
      { text: "We have a general sense, but couldn't document the full chain", score: 2 },
      { text: "Key data flows are understood by certain people, but not formally documented", score: 3 },
      { text: "We have documented data lineage with clear transformation logic and audit trails", score: 4 },
    ],
  },
  // 11. Technology - Infrastructure
  {
    id: "tech-2",
    dimension: "technology",
    question: "If someone asked 'How many active customers do we have?', what would happen?",
    explanation: "This tests whether you have a single source of truth. AI needs authoritative data to make decisions. Conflicting data sources lead to AI that contradicts itself or makes inconsistent recommendations.",
    learnMoreUrl: "/blog/ai-strategy-outcomes-not-technology",
    options: [
      { text: "Different systems would give different answers - it's anyone's guess", score: 1 },
      { text: "Someone would spend hours pulling data from multiple sources", score: 2 },
      { text: "We could get an answer fairly quickly, but might need to reconcile sources", score: 3 },
      { text: "We'd have a single source of truth that provides instant, reliable answers", score: 4 },
    ],
  },
  // 12. Technology - MLOps maturity
  {
    id: "tech-3",
    dimension: "technology",
    question: "Has your organization successfully deployed and maintained an AI or ML model in production?",
    questionBusiness: "Has your company successfully used AI tools to improve operations or customer experience?",
    questionTechnical: "Has your organization deployed ML models to production with monitoring and versioning?",
    explanation: "Past AI success predicts future AI success. Organizations that have deployed AI learn crucial lessons about maintenance, monitoring, and change management that make subsequent projects easier.",
    learnMoreUrl: "/blog/why-ai-pilots-fail-to-scale",
    options: [
      {
        text: "No - we haven't attempted AI/ML deployment",
        textBusiness: "No - we haven't really used AI tools yet",
        textTechnical: "No - we haven't attempted ML deployment",
        score: 1,
      },
      {
        text: "We've tried pilots but they never made it to production",
        textBusiness: "We've experimented with AI tools but nothing stuck",
        textTechnical: "We've tried pilots but they never made it to production",
        score: 2,
      },
      {
        text: "We have one or two models in production, but maintenance is challenging",
        textBusiness: "We use some AI tools successfully, but scaling is difficult",
        textTechnical: "We have models in production, but maintenance and updates are challenging",
        score: 3,
      },
      {
        text: "We have established MLOps practices with versioning, monitoring, and regular updates",
        textBusiness: "AI is embedded in our operations with clear ownership and regular improvements",
        textTechnical: "We have established MLOps practices with versioning, monitoring, and CI/CD",
        score: 4,
      },
    ],
  },
  // 13. Governance - AI ethics
  {
    id: "governance-1",
    dimension: "governance",
    question: "How prepared is your organization to ensure AI is used responsibly and ethically?",
    explanation: "AI governance isn't just about compliance—it's about sustainable adoption. Organizations without guardrails often face backlash that derails AI programs. Proactive governance builds trust with employees and customers.",
    learnMoreUrl: "/blog/ai-governance-framework-mid-market",
    options: [
      { text: "We haven't thought about AI ethics or governance yet", score: 1 },
      { text: "We're aware of the issues but have no formal policies or oversight", score: 2 },
      { text: "We have some guidelines, but they're informal or inconsistently applied", score: 3 },
      { text: "We have formal AI governance policies, clear accountability, and review processes", score: 4 },
    ],
  },
  // 14. People - Decision authority
  {
    id: "people-3",
    dimension: "people",
    question: "When critical decisions need to be made about technology investments or process changes, how does your organization proceed?",
    explanation: "AI projects require many decisions: what to build, how to deploy, when to iterate. Organizations with clear decision authority move faster and avoid the analysis paralysis that kills AI initiatives.",
    learnMoreUrl: "/blog/ai-talent-strategy-hire-train-partner",
    options: [
      { text: "Decisions stall or get reversed frequently—there's no clear authority", score: 1 },
      { text: "One executive decides everything, but often lacks key information", score: 2 },
      { text: "Defined decision-makers exist, but cross-functional input is inconsistent", score: 3 },
      { text: "Structured process with clear authority, defined criteria, and stakeholder input", score: 4 },
    ],
  },
  // 15. Politics - Executive alignment
  {
    id: "politics-1",
    dimension: "politics",
    question: "How aligned is your executive team on technology and AI priorities?",
    explanation: "AI initiatives that lack unified executive support get defunded, deprioritized, or sabotaged. Alignment doesn't mean unanimous enthusiasm—it means agreement on priorities and commitment to see them through.",
    learnMoreUrl: "/blog/why-ai-pilots-fail-to-scale",
    options: [
      { text: "Openly conflicting - different leaders push different agendas", score: 1 },
      { text: "Surface agreement but hidden disagreements emerge during execution", score: 2 },
      { text: "Generally aligned but some leaders are more bought-in than others", score: 3 },
      { text: "Unified vision with clear sponsorship and accountability", score: 4 },
    ],
  },
  // 16. Politics - Cross-functional collaboration
  {
    id: "politics-3",
    dimension: "politics",
    question: "When initiatives require collaboration across departments, how smoothly does it work?",
    explanation: "AI projects almost always cross departmental lines—they need data from one team, process knowledge from another, and IT support from a third. Siloed organizations struggle to execute cross-functional AI initiatives.",
    learnMoreUrl: "/blog/ai-implementation-mistakes-avoid",
    options: [
      { text: "Departments actively protect their turf - cross-functional work is a battle", score: 1 },
      { text: "Collaboration happens but requires constant negotiation and escalation", score: 2 },
      { text: "Most departments cooperate, though some friction exists", score: 3 },
      { text: "Cross-functional collaboration is the norm with shared goals and mutual support", score: 4 },
    ],
  },
  // 17. Governance - Strategy
  {
    id: "governance-2",
    dimension: "governance",
    question: "Does your organization have a documented AI strategy connected to business objectives?",
    explanation: "Without a strategy, AI becomes random acts of innovation—disconnected pilots that don't compound into business value. A strategy ensures AI investments ladder up to what actually matters to the business.",
    learnMoreUrl: "/blog/ai-maturity-roadmap-18-months",
    options: [
      { text: "No—AI is not on our strategic agenda", score: 1 },
      { text: "There's interest but no formal strategy or roadmap", score: 2 },
      { text: "We have an emerging AI strategy, though it's still being developed", score: 3 },
      { text: "Clear AI strategy aligned with business goals, with defined priorities and metrics", score: 4 },
    ],
  },
  // 18. Politics - Past initiative outcomes
  {
    id: "politics-2",
    dimension: "politics",
    question: "What happened with your last major technology or process initiative?",
    explanation: "Past performance predicts future performance. Organizations with a track record of failed initiatives carry baggage that makes AI adoption harder. Success builds the trust and confidence needed to try new things.",
    learnMoreUrl: "/blog/ai-implementation-mistakes-avoid",
    options: [
      { text: "It failed badly and left organizational scars - people are wary of new projects", score: 1 },
      { text: "It was partially implemented but never fully adopted", score: 2 },
      { text: "It succeeded eventually, but took longer and cost more than expected", score: 3 },
      { text: "It succeeded and built confidence for future initiatives", score: 4 },
    ],
  },
];
