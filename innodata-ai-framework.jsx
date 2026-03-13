import React, { useState } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA MODEL — Full offerings, segment mapping, and recommendation logic
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const segments = {
  deploy: {
    id: "deploy",
    innodataName: "DEPLOY — Activate",
    subtitle: "First-movers entering Enterprise AI",
    description:
      "Organizations with budget for Enterprise AI. Mix of functional leaders (more) and technical teams (less). They need guidance, quick wins, and foundational agent capabilities to prove value.",
    buyerProfile: "Functional leaders (COO, CFO, CHRO, CMO) with IT support",
    maturity: "Low–Medium AI maturity",
    budgetFocus: "Proof-of-value → first production agents",
    keyNeed: "Structured guidance + rapid first deployments",
    color: "#111",
  },
  reshape: {
    id: "reshape",
    innodataName: "RESHAPE — Optimize",
    subtitle: "Upgrading existing AI processes with expert guidance",
    description:
      "Organizations already running AI/automation but need to modernize, optimize, and scale. Technical teams are involved but need external expertise to reengineer workflows and improve agent quality.",
    buyerProfile: "Technical leads (CTO, VP Engineering) with business sponsors",
    maturity: "Medium–High AI maturity",
    budgetFocus: "Workflow reengineering → production optimization",
    keyNeed: "Technical depth + process transformation",
    color: "#333",
  },
  invent: {
    id: "invent",
    innodataName: "INVENT — Advance",
    subtitle: "Mature orgs pushing the frontier",
    description:
      "AI-mature organizations with established infrastructure. They already have agents in production but want Innodata to help push boundaries — new architectures, advanced ops, frontier capabilities.",
    buyerProfile: "Chief AI Officer, Head of AI Platform, VP Data Science",
    maturity: "High AI maturity",
    budgetFocus: "Advanced capabilities → competitive differentiation",
    keyNeed: "Frontier expertise + managed assurance at scale",
    color: "#000",
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OFFERING CATALOG — Every sub-item mapped to segments with logic
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const servicePillars = [
  {
    id: "build",
    name: "Build AI Agents",
    icon: "⚙",
    description: "Architecture, development & integration of AI agent systems",
    offerings: [
      {
        id: "B1",
        name: "Agent architecture design",
        detail: "Single-agent → multi-agent, tool-using workflows",
        segments: {
          deploy: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "Deploy clients lack existing architecture. Need Innodata to design from scratch — starting with single-agent patterns, defining tool-use boundaries, and creating a scalable foundation. Heavy hand-holding required on architecture decisions.",
            deliverable:
              "Architecture blueprint + single-agent starter template",
          },
          reshape: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Reshape clients have working architecture. Tearing it down to rebuild is expensive and risky. Optimize within the existing architecture (via E2, E4, E10, A6) — only redesign if there's a fundamental scaling wall.",
            deliverable: "Architecture review (only if scaling wall identified)",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients typically have architecture in place. Innodata contributes frontier patterns — advanced orchestration, dynamic agent spawning, or novel multi-agent topologies they haven't explored.",
            deliverable:
              "Advanced orchestration patterns + architecture review",
          },
        },
      },
      {
        id: "B2",
        name: "Domain-specific agent development",
        detail: "Trust & Safety, Ops, Support, Ads, Finance, HR",
        segments: {
          deploy: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "Deploy clients need agents built for their specific domain from scratch. Innodata's domain expertise is the primary value — translating business processes into agent logic. Usually starts with 1-2 domains (Support, Ops).",
            deliverable: "1-2 domain agents (MVP) + domain knowledge model",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Reshape clients already have domain agents — building more isn't the priority. Focus should be on improving existing agents' quality and coverage before expanding to new domains.",
            deliverable:
              "Domain agent quality audit + expansion roadmap (Phase 2)",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients likely have domain agents. Innodata adds value on niche/complex domains (Trust & Safety, Finance compliance) where specialized knowledge is hard to build in-house.",
            deliverable: "Specialized domain agents for complex use cases",
          },
        },
      },
      {
        id: "B3",
        name: "Action & tool integration",
        detail: "APIs, workflows, enterprise systems",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "SIGNIFICANT",
            logic:
              "Deploy clients have legacy systems with limited API readiness. Integration is complex and requires mapping enterprise systems. Often the biggest technical bottleneck for first deployments.",
            deliverable:
              "Integration assessment + API connector kit for top 3 systems",
          },
          reshape: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "Reshape clients need to deepen integrations — connecting agents to more enterprise systems, automating end-to-end workflows across multiple tools. This is core to the reshape value prop.",
            deliverable:
              "End-to-end workflow automation + enterprise connector library",
          },
          invent: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Invent clients typically have mature integration layers. Innodata's value is limited here unless there are novel integration patterns (real-time bidirectional, event-driven).",
            deliverable: "Advanced integration patterns (event-driven, bi-directional)",
          },
        },
      },
      {
        id: "B4",
        name: "RAG + reasoning agents",
        detail: "Task decomposition, decision trees, escalation logic",
        segments: {
          deploy: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "RAG is often the first high-value capability Deploy clients need. They have unstructured knowledge (docs, SOPs) that agents must reason over. Innodata builds the initial RAG pipeline and basic reasoning chains.",
            deliverable: "RAG pipeline setup + basic reasoning chain templates",
          },
          reshape: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "Reshape clients have basic RAG but suffer from accuracy/hallucination issues. Need advanced retrieval strategies, better chunking, re-ranking, and more sophisticated reasoning (decision trees, escalation).",
            deliverable:
              "RAG optimization + advanced reasoning framework",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients have production RAG systems. Innodata adds marginal value on frontier techniques (multi-hop reasoning, dynamic decomposition) but these clients often have internal research teams exploring the same territory.",
            deliverable:
              "Multi-hop reasoning patterns + decomposition benchmarks",
          },
        },
      },
      {
        id: "B5",
        name: "Custom model selection & tuning",
        detail: "Cost vs reasoning trade-offs",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Deploy clients often default to GPT-4 for everything. Innodata helps them select right-sized models per task — balancing cost, latency, and quality. Prevents budget overruns early.",
            deliverable: "Model selection matrix + cost-performance benchmarks",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Reshape clients may benefit from model optimization, but this is a cost-saving play, not the core transformation. Prioritize workflow and data quality improvements first — model tuning amplifies those gains later.",
            deliverable:
              "Model cost-performance audit + optimization roadmap",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients have model expertise but may want Innodata's fine-tuning data services or evaluation of emerging models they haven't tested. Niche value.",
            deliverable: "Emerging model evaluation + specialized fine-tuning data",
          },
        },
      },
      {
        id: "B6",
        name: "Secure-by-design agent guardrails",
        detail: "Permissions, scope, fail-safes",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Guardrails matter but Deploy clients' first bottleneck is getting agents to work at all, not securing them. Bake in basic guardrails as part of B1 (architecture) — a standalone guardrails engagement is premature.",
            deliverable:
              "Basic guardrail templates (bundled with architecture work)",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Reshape clients likely have basic guardrails but gaps emerge as agents get more autonomous. Need scope expansion controls, better fail-safes, and audit trails.",
            deliverable:
              "Guardrail audit + expanded scope controls",
          },
          invent: {
            relevance: "HIGH",
            customization: "LOW",
            logic:
              "As Invent clients push agents toward greater autonomy, security becomes critical again. Advanced guardrails — dynamic permissions, real-time policy enforcement, adversarial robustness.",
            deliverable: "Advanced dynamic guardrails + adversarial testing",
          },
        },
      },
    ],
  },
  {
    id: "enable",
    name: "Enable AI Agent Adoption",
    icon: "🔧",
    description:
      "Context engineering, data preparation, testing, and organizational change",
    offerings: [
      {
        id: "E1",
        name: "Agentic Context engineering",
        detail:
          "Policies, SOPs, business rules, tacit knowledge through Generator → Reflector → Curator Agents",
        segments: {
          deploy: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "THE critical differentiator for Deploy clients. Their organizational knowledge is trapped in documents, people's heads, and tribal processes. Innodata's data expertise converts this into machine-consumable context — the foundation everything else depends on.",
            deliverable:
              "Knowledge extraction pipeline + contextualized knowledge base",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Reshape clients have context pipelines in place — they're functional but may be stale or incomplete. Context re-engineering is valuable but not the primary bottleneck; agent quality and evaluation are more pressing.",
            deliverable:
              "Context pipeline audit + freshness automation (Phase 2)",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients typically have strong context engineering. Innodata adds value on tacit knowledge capture (expert interviews → structured knowledge) and advanced curation patterns.",
            deliverable:
              "Tacit knowledge extraction + advanced curation agents",
          },
        },
      },
      {
        id: "E2",
        name: "Agentic RAG design & optimization",
        detail: "Precision-focused retrieval, signal prioritization",
        segments: {
          deploy: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "Deploy clients need RAG designed correctly from the start — chunking strategy, embedding model selection, retrieval pipeline. Getting this wrong early creates compounding problems.",
            deliverable:
              "RAG architecture + chunking strategy + embedding selection",
          },
          reshape: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "Reshape clients' existing RAG likely has precision issues. Innodata optimizes — re-ranking models, hybrid search, signal prioritization, citation grounding. Measurable accuracy improvement.",
            deliverable:
              "RAG precision audit + re-ranking pipeline + hybrid search",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients have mature RAG. Innodata contributes advanced techniques — graph RAG, multi-modal retrieval, dynamic index strategies.",
            deliverable: "Graph RAG + multi-modal retrieval capabilities",
          },
        },
      },
      {
        id: "E3",
        name: "Prompt design & data enrichment",
        detail: "Synthetic data creation",
        segments: {
          deploy: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "Deploy clients lack prompt engineering discipline and training data. Innodata creates prompt libraries, establishes prompt governance, and generates synthetic data to bootstrap agents where real data is scarce.",
            deliverable:
              "Prompt library + synthetic data pipeline + prompt governance",
          },
          reshape: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Reshape clients already have prompt libraries and data pipelines. Incremental prompt optimization delivers diminishing returns — focus on systemic improvements (RAG, eval, regression) instead.",
            deliverable:
              "Prompt audit report (optional add-on, not a priority engagement)",
          },
          invent: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Invent clients generally have mature prompt engineering. Innodata's value is in specialized synthetic data for novel agent behaviors they're developing.",
            deliverable: "Specialized synthetic data for frontier agent tasks",
          },
        },
      },
      {
        id: "E4",
        name: "Gold data creation for agent tasks",
        detail: "Edge cases, gray areas, long-tail scenarios",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Deploy clients need basic gold data for evaluation and testing, but comprehensive edge-case coverage is premature. Start with core happy-path gold data first.",
            deliverable: "Core evaluation dataset + basic edge-case coverage",
          },
          reshape: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "THIS IS A RESHAPE SWEET SPOT. These clients have agents in production hitting real edge cases. Innodata's human-in-the-loop data expertise creates gold data for the gray areas and long-tail scenarios that are degrading agent performance.",
            deliverable:
              "Comprehensive edge-case dataset + gray-area annotation guidelines",
          },
          invent: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "Invent clients pushing into novel tasks need gold data for capabilities that don't have existing benchmarks. Innodata creates custom evaluation datasets for frontier agent behaviors.",
            deliverable: "Custom benchmark datasets for novel agent tasks",
          },
        },
      },
      {
        id: "E5",
        name: "Prompt & workflow standardization",
        detail: "Versioning, reuse, governance",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Deploy clients need lightweight governance from the start — version control for prompts, basic reuse patterns. Prevents chaos as they scale. But don't over-engineer early.",
            deliverable: "Prompt versioning system + basic governance playbook",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Standardization is important process hygiene but rarely the burning issue. Reshape clients benefit more from fixing agent quality (E2, E4, E8) first — standardization follows naturally once the right patterns emerge.",
            deliverable:
              "Prompt catalog + governance template (implement after quality fixes)",
          },
          invent: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Invent clients typically have prompt governance. Only useful if they're expanding rapidly into new agent types and need to extend their existing framework.",
            deliverable: "Framework extension for new agent categories",
          },
        },
      },
      {
        id: "E6",
        name: "Human-in-the-loop frameworks",
        detail: "Review, override, learning loops",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "SIGNIFICANT",
            logic:
              "HITL is essential but for Deploy clients it's a component of agent deployment (B1, B2), not a standalone engagement. Include HITL design within the agent build — don't sell it separately to a client who doesn't have agents yet.",
            deliverable:
              "HITL workflow (bundled within agent build engagements)",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "HITL optimization is valuable but secondary — fix what agents get wrong (via E2, E4, E8) before optimizing the human review layer. Reducing HITL without improving agent quality just creates risk.",
            deliverable:
              "HITL efficiency audit + confidence-based routing plan (Phase 2)",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients are moving toward minimal HITL. Innodata helps design the narrow, high-stakes review points and the learning loops that allow agents to continuously improve from human feedback.",
            deliverable: "Minimal HITL design + continuous learning pipeline",
          },
        },
      },
      {
        id: "E7",
        name: "Change management & rollout playbooks",
        detail: "Pilot → scale → expand",
        segments: {
          deploy: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "HIGHEST IMPACT FOR DEPLOY. BCG's 10-20-70 principle applies — 70% of success is people & process. Deploy clients need structured playbooks: stakeholder alignment, pilot design, success metrics, scale criteria. This is where Innodata channels BCG's strategic approach.",
            deliverable:
              "Rollout playbook + pilot design + success metrics framework",
          },
          reshape: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Reshape clients have organizational muscle for deployments. Selling change management to a team that's already running AI in production is tone-deaf — focus on technical optimization instead.",
            deliverable:
              "Not recommended as standalone (embed in delivery if needed)",
          },
          invent: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Invent clients have mature rollout processes. Minimal Innodata involvement unless entering entirely new business units or geographies.",
            deliverable: "New territory expansion playbook (if needed)",
          },
        },
      },
      {
        id: "E8",
        name: "Agent QA & evaluation frameworks",
        detail: "Task accuracy, correctness, consistency",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Deploy clients need basic evaluation — can the agent complete core tasks correctly? Innodata establishes baseline metrics and a simple evaluation harness.",
            deliverable: "Evaluation harness + baseline accuracy benchmarks",
          },
          reshape: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "Reshape clients need comprehensive QA — multi-dimensional evaluation (accuracy, consistency, latency, cost), regression testing, and continuous quality monitoring.",
            deliverable:
              "Multi-dimensional QA framework + regression test suite",
          },
          invent: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "Invent clients need evaluation for novel capabilities — custom benchmarks, adversarial evaluation, evaluation of complex multi-step reasoning. Frontier eval is hard and Innodata can specialize here.",
            deliverable:
              "Custom benchmarks + adversarial evaluation + multi-step eval",
          },
        },
      },
      {
        id: "E9",
        name: "Safety, compliance & red-teaming",
        detail: "Policy adherence, adversarial testing",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Deploy clients need baseline safety — policy adherence checks, basic content filtering. Full red-teaming is premature until agents are more capable.",
            deliverable: "Safety baseline + policy compliance checklist",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Red-teaming is important but not the priority for Reshape clients who are still fixing agent accuracy. Focus on evaluation (E8) and gold data (E4) first — red-team once agents are performant enough to warrant adversarial testing.",
            deliverable: "Scoped red-team assessment (after quality stabilization)",
          },
          invent: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "Invent clients with highly autonomous agents need rigorous adversarial testing. This is critical and specialized — Innodata's data and evaluation expertise directly applies to frontier red-teaming.",
            deliverable:
              "Comprehensive red-team program + adversarial dataset creation",
          },
        },
      },
      {
        id: "E10",
        name: "Prompt, model & agent regression testing",
        detail: "Ensuring updates don't break existing behavior",
        segments: {
          deploy: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Deploy clients have few agents in production — regression risk is low. Establish basic test harness but don't over-invest.",
            deliverable: "Basic regression test harness",
          },
          reshape: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "CORE RESHAPE NEED. As clients modify prompts, swap models, and update workflows, regression is a constant risk. Automated regression testing prevents costly breakages.",
            deliverable:
              "Automated regression pipeline + model migration test suite",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Invent clients typically have regression infrastructure. Innodata can enhance it with behavioral diff tracking but this is a tooling improvement, not a transformation play.",
            deliverable:
              "Behavioral diff tracking layer (integrate with existing pipeline)",
          },
        },
      },
      {
        id: "E11",
        name: "New feature testing at scale",
        detail: "QA Agents & LLM as judge",
        segments: {
          deploy: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Deploy clients are still establishing base capabilities. Feature testing at scale is premature.",
            deliverable: "Basic LLM-as-judge evaluation for core features",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Reshape clients adding new agent capabilities benefit from LLM-as-judge for rapid evaluation at scale, but may not need full QA agent infrastructure yet.",
            deliverable:
              "LLM-as-judge pipeline + automated feature test framework",
          },
          invent: {
            relevance: "HIGH",
            customization: "SIGNIFICANT",
            logic:
              "INVENT SWEET SPOT. Mature clients shipping frequent updates need automated QA agents evaluating new features at scale. Innodata builds and operates the QA agent infrastructure.",
            deliverable:
              "QA Agent fleet + LLM-as-judge at scale + automated eval pipeline",
          },
        },
      },
    ],
  },
  {
    id: "assure",
    name: "Assure AI Agent Ops",
    icon: "🛡",
    description:
      "Production monitoring, compliance, and continuous optimization",
    offerings: [
      {
        id: "A1",
        name: "Ongoing AgentOps / GenAI production support",
        detail: "24×7 reliability",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Deploy clients moving to production need basic monitoring but usually start with business-hours support. 24×7 comes as they scale. Innodata provides the foundation.",
            deliverable: "Basic monitoring setup + business-hours support SLA",
          },
          reshape: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "Reshape clients with multiple agents in production need robust ops. Innodata provides managed support — monitoring, alerting, incident response. This is a recurring revenue anchor.",
            deliverable: "Managed AgentOps + 24×7 SLA + incident response",
          },
          invent: {
            relevance: "HIGH",
            customization: "LOW",
            logic:
              "Invent clients either build ops internally or want a premium managed service partner. Innodata offers white-glove ops for their most critical agents.",
            deliverable: "Premium managed ops + proactive optimization",
          },
        },
      },
      {
        id: "A2",
        name: "Log analysis for broken and incomplete agent response",
        detail: "Root-cause analysis for agent failures",
        segments: {
          deploy: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Deploy clients have limited log volume. Basic logging and occasional manual review is sufficient initially.",
            deliverable: "Logging setup + periodic manual review",
          },
          reshape: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "Reshape clients have enough log data to find patterns in failures. Innodata's systematic analysis identifies root causes — bad prompts, missing context, model limitations — and drives targeted fixes.",
            deliverable:
              "Systematic failure analysis + root cause taxonomy + fix prioritization",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients often have internal tooling for log analysis. Innodata's value is supplementary — automated anomaly detection as a managed service layer, not a core engagement.",
            deliverable:
              "Anomaly detection layer (bundle with A1 managed ops)",
          },
        },
      },
      {
        id: "A3",
        name: "Context & data drift monitoring",
        detail: "Detecting when underlying data/context changes",
        segments: {
          deploy: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Drift is less of a concern for newly deployed agents. Establish baseline monitoring but don't over-invest.",
            deliverable: "Baseline drift detection alerts",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Drift monitoring matters but Reshape clients should fix known quality issues (E2, E4, E10) before investing in drift detection. Drift monitoring delivers most value once agents are stable and performing well.",
            deliverable:
              "Drift baseline + monitoring setup (activate after stabilization)",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients likely have drift monitoring infrastructure. Innodata adds incremental value on cross-agent correlation but this is not a primary engagement driver.",
            deliverable: "Cross-agent drift correlation dashboard",
          },
        },
      },
      {
        id: "A4",
        name: "Security & Compliance",
        detail: "SOC2, GDPR etc.",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Deploy clients in regulated industries need compliance from day 1. Others can start lighter but should establish foundations. Industry-dependent prioritization.",
            deliverable:
              "Compliance baseline assessment + regulatory requirement mapping",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Compliance is table stakes, not a transformation driver. Reshape clients need to maintain existing compliance posture as they expand — but this shouldn't consume the optimization budget. Keep as a hygiene item, not a project centerpiece.",
            deliverable: "Compliance gap assessment + incremental coverage plan",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients have compliance infrastructure. Continuous monitoring is useful but not a differentiating engagement — it's a managed-service add-on, not a standalone sell.",
            deliverable: "Continuous compliance monitoring (bundle with A1 ops)",
          },
        },
      },
      {
        id: "A5",
        name: "Agent observability",
        detail: "Decisions, actions, failures, confidence scores",
        segments: {
          deploy: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Deploy clients need basic observability to understand what their agents are doing. Start with decision logging and action tracking.",
            deliverable: "Basic observability dashboard + decision logging",
          },
          reshape: {
            relevance: "MEDIUM",
            customization: "MODERATE",
            logic:
              "Observability infrastructure helps but it's a diagnostic tool, not a fix. Reshape clients should invest in fixing agent quality (E2, E4, E8) before building elaborate observability — you need to know what to observe first.",
            deliverable:
              "Observability requirements + dashboard setup (alongside quality work)",
          },
          invent: {
            relevance: "HIGH",
            customization: "LOW",
            logic:
              "Invent clients need advanced observability — real-time reasoning traces, multi-agent coordination visibility, and predictive quality scoring.",
            deliverable:
              "Real-time reasoning traces + multi-agent observability",
          },
        },
      },
      {
        id: "A6",
        name: "Performance & cost optimization",
        detail: "Latency, token usage, SLA management",
        segments: {
          deploy: {
            relevance: "LOW",
            customization: "LOW",
            logic:
              "Deploy clients are focused on getting agents working correctly first. Cost optimization is secondary. Basic token tracking is sufficient.",
            deliverable: "Token usage tracking + cost baseline",
          },
          reshape: {
            relevance: "HIGH",
            customization: "MODERATE",
            logic:
              "RESHAPE SWEET SPOT. Clients hitting cost ceilings or latency issues as they scale. Innodata optimizes — model routing, caching, prompt compression, SLA tuning. Direct cost impact.",
            deliverable:
              "Cost optimization audit + model routing + caching strategy",
          },
          invent: {
            relevance: "MEDIUM",
            customization: "LOW",
            logic:
              "Invent clients have optimization in place but want frontier efficiency — advanced inference optimization, speculative decoding, or custom serving infrastructure.",
            deliverable: "Advanced inference optimization + custom serving",
          },
        },
      },
    ],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const relevanceColors = {
  HIGH: { bg: "#000", text: "#fff", border: "#000" },
  MEDIUM: { bg: "#f5f5f5", text: "#333", border: "#999" },
  LOW: { bg: "#fff", text: "#999", border: "#ddd" },
};

const customColors = {
  SIGNIFICANT: { label: "Heavy customization", icon: "◆◆◆" },
  MODERATE: { label: "Moderate customization", icon: "◆◆○" },
  LOW: { label: "Minimal customization", icon: "◆○○" },
};

export default function InnodataFramework() {
  const [activeView, setActiveView] = useState("framework");
  const [activeSegment, setActiveSegment] = useState("deploy");
  const [expandedOffering, setExpandedOffering] = useState(null);
  const [activePillar, setActivePillar] = useState("all");
  const [openSection, setOpenSection] = useState(null);

  const segObj = segments[activeSegment];

  const getFilteredPillars = () => {
    if (activePillar === "all") return servicePillars;
    return servicePillars.filter((p) => p.id === activePillar);
  };

  const getSegmentStats = (segId) => {
    let high = 0,
      medium = 0,
      low = 0;
    servicePillars.forEach((p) =>
      p.offerings.forEach((o) => {
        const r = o.segments[segId].relevance;
        if (r === "HIGH") high++;
        else if (r === "MEDIUM") medium++;
        else low++;
      })
    );
    return { high, medium, low, total: high + medium + low };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        fontFamily:
          '"Instrument Sans", "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          borderBottom: "3px solid #000",
          padding: "28px 32px 20px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#999",
                fontWeight: 600,
              }}
            >
              Innodata
            </span>
            <span style={{ color: "#ddd" }}>|</span>
            <span
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#999",
                fontWeight: 600,
              }}
            >
              Enterprise AI Transformation Partner
            </span>
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              margin: "0 0 4px 0",
              letterSpacing: -0.5,
            }}
          >
            Agentic AI Offering Guidance Framework
          </h1>
          <p style={{ fontSize: 13, color: "#666", margin: 0 }}>
            Curated to build, adopt, and assure at scale — mapped to client
            maturity
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {/* ── View Switcher ── */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid #e0e0e0",
            marginBottom: 28,
            paddingTop: 16,
          }}
        >
          {[
            { id: "framework", label: "Strategy Framework" },
            { id: "matrix", label: "Offering × Segment Matrix" },
            { id: "detail", label: "Recommendation Deep-Dive" },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id)}
              style={{
                padding: "10px 22px",
                border: "none",
                borderBottom:
                  activeView === v.id ? "2px solid #000" : "2px solid transparent",
                background: "none",
                color: activeView === v.id ? "#000" : "#999",
                fontSize: 12,
                fontWeight: activeView === v.id ? 700 : 500,
                cursor: "pointer",
                letterSpacing: 0.3,
                textTransform: "uppercase",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* ━━━━━━━━━━━━━━━━━ VIEW 1: STRATEGY FRAMEWORK ━━━━━━━━━━━━━━━━━ */}
        {activeView === "framework" && (
          <div>
            {/* ═══ COLLAPSIBLE: How to Use ═══ */}
            <div style={{ marginBottom: 12 }}>
              <button
                onClick={() => setOpenSection(openSection === "howto" ? null : "howto")}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 18px", border: "2px solid #000", background: openSection === "howto" ? "#000" : "#fff",
                  color: openSection === "howto" ? "#fff" : "#000", cursor: "pointer", fontSize: 14, fontWeight: 800,
                  letterSpacing: 0.3, textAlign: "left",
                }}
              >
                <span>How to Use This Framework — 5 Steps</span>
                <span style={{ fontSize: 18, fontWeight: 400, transform: openSection === "howto" ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openSection === "howto" && (
                <div style={{ border: "2px solid #000", borderTop: "none", padding: "20px" }}>

              {/* 5-Step Process */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  {
                    step: "1",
                    title: "Classify the Client",
                    who: "Account Lead / Sales",
                    time: "During or after discovery call",
                    instruction: "Ask 3 qualifying questions to place the client into DEPLOY, RESHAPE, or INVENT:",
                    questions: [
                      { q: "Do you have AI agents in production today?", logic: "No → DEPLOY. Yes → next question." },
                      { q: "Are you scaling existing agents or building new capabilities?", logic: "Scaling/optimizing → RESHAPE. New frontier capabilities → INVENT." },
                      { q: "Who is sponsoring this initiative?", logic: "Functional leader (COO, CFO) → likely DEPLOY. Technical leader (CTO, CAIO) → likely RESHAPE or INVENT." },
                    ],
                    output: "Client segment classification → determines which column of the matrix to read",
                  },
                  {
                    step: "2",
                    title: "Identify Their #1 Bottleneck",
                    who: "Solution Architect / Pre-sales",
                    time: "Technical discovery",
                    instruction: "Map the client's stated pain to a service pillar:",
                    questions: [
                      { q: '"We don\'t know where to start / need agents built"', logic: "→ BUILD pillar (B1–B6)" },
                      { q: '"We have agents but they\'re not accurate / adopted / governed"', logic: "→ ENABLE pillar (E1–E11)" },
                      { q: '"Our agents are live but breaking / drifting / costing too much"', logic: "→ ASSURE pillar (A1–A6)" },
                    ],
                    output: "Primary pillar → narrows from 23 offerings to 6–11 relevant ones",
                  },
                  {
                    step: "3",
                    title: "Score Offerings Using the 4 Principles",
                    who: "Solution Architect",
                    time: "Proposal preparation",
                    instruction: "For each candidate offering, run through the 4 principles in order:",
                    questions: [
                      { q: "P1 Maturity-Fit: Can they absorb this?", logic: "If NO → skip or flag as Phase 2. If YES → proceed." },
                      { q: "P2 Value/Dollar: Is this their bottleneck?", logic: "If YES → mark HIGH priority. If nice-to-have → mark MEDIUM." },
                      { q: "P3 Func ↔ Tech: Does the packaging match their team?", logic: "Adjust deliverable language and scope to match buyer profile." },
                      { q: "P4 Revenue Alignment: Does this build stickiness?", logic: "Ensure the mix includes at least one recurring-revenue offering." },
                    ],
                    output: "Shortlist of 3–5 HIGH offerings + 2–3 MEDIUM add-ons → forms the proposal backbone",
                  },
                  {
                    step: "4",
                    title: "Build the Proposal Package",
                    who: "Account Lead + Solution Architect",
                    time: "Proposal writing",
                    instruction: "Compose the offering bundle using this structure:",
                    questions: [
                      { q: "Lead offering (1)", logic: "The single highest-impact offering from Step 3. This is the headline." },
                      { q: "Supporting offerings (2–3)", logic: "HIGH-relevance offerings that reinforce the lead. Create a logical sequence." },
                      { q: "Seed offering (1)", logic: "One Assure-pillar offering included at low/no cost to create future managed-service opportunity." },
                    ],
                    output: "Proposal with clear 'why this, why now, why us' for each offering — linked to the 4 principles",
                  },
                  {
                    step: "5",
                    title: "Plan the Client Journey",
                    who: "Delivery Lead",
                    time: "Post-sale / kickoff",
                    instruction: "Map the client's evolution across segments over 12–18 months:",
                    questions: [
                      { q: "Months 1–6: Deliver the current-segment offerings", logic: "Execute the proposal. Measure outcomes against the success metrics." },
                      { q: "Month 6 checkpoint: Has the client matured?", logic: "If Deploy client now has agents in production → they're becoming a Reshape client." },
                      { q: "Months 6–18: Upsell into next-segment offerings", logic: "Re-score using the matrix. Introduce offerings that were previously LOW but are now HIGH." },
                    ],
                    output: "12–18 month account growth plan → Deploy clients become Reshape clients become Invent clients",
                  },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 0 }}>
                    {/* Step number column */}
                    <div style={{
                      width: 48, minWidth: 48,
                      display: "flex", flexDirection: "column", alignItems: "center",
                      position: "relative",
                    }}>
                      <div style={{
                        width: 32, height: 32,
                        background: "#000", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 800,
                        zIndex: 1,
                        flexShrink: 0,
                      }}>{s.step}</div>
                      {i < 4 && (
                        <div style={{
                          width: 2, flex: 1,
                          background: "#e0e0e0",
                        }} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{
                      flex: 1,
                      padding: "4px 0 28px 16px",
                      borderBottom: i < 4 ? "none" : "none",
                    }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 2, flexWrap: "wrap" }}>
                        <h4 style={{ fontSize: 14, fontWeight: 800, margin: 0 }}>{s.title}</h4>
                        <span style={{
                          fontSize: 9, padding: "2px 8px",
                          background: "#f5f5f5", border: "1px solid #e0e0e0",
                          color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5,
                        }}>{s.who}</span>
                        <span style={{
                          fontSize: 9, color: "#bbb",
                        }}>{s.time}</span>
                      </div>

                      <p style={{ fontSize: 12, color: "#666", margin: "6px 0 10px 0" }}>
                        {s.instruction}
                      </p>

                      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
                        {s.questions.map((qItem, qi) => (
                          <div key={qi} style={{
                            display: "flex", gap: 8,
                            fontSize: 11.5, lineHeight: 1.55,
                            padding: "6px 10px",
                            background: qi % 2 === 0 ? "#fafafa" : "#fff",
                            border: "1px solid #f0f0f0",
                          }}>
                            <div style={{ flex: "1 1 45%", color: "#333", fontWeight: 500 }}>
                              {qItem.q}
                            </div>
                            <div style={{ flex: "1 1 55%", color: "#888" }}>
                              {qItem.logic}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{
                        fontSize: 11, color: "#000", fontWeight: 600,
                        padding: "6px 10px",
                        background: "#f0f0f0",
                        borderLeft: "3px solid #000",
                      }}>
                        Output: {s.output}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
              )}
            </div>
            <div style={{ marginBottom: 12 }}>
              <button
                onClick={() => setOpenSection(openSection === "segments" ? null : "segments")}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 18px", border: "2px solid #000", background: openSection === "segments" ? "#000" : "#fff",
                  color: openSection === "segments" ? "#fff" : "#000", cursor: "pointer", fontSize: 14, fontWeight: 800,
                  letterSpacing: 0.3, textAlign: "left",
                }}
              >
                <span>Target Client Segments — DEPLOY / RESHAPE / INVENT</span>
                <span style={{ fontSize: 18, fontWeight: 400, transform: openSection === "segments" ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openSection === "segments" && (
                <div style={{ border: "2px solid #000", borderTop: "none", padding: "20px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 16,
                    }}
                  >
              {Object.values(segments).map((seg) => {
                const stats = getSegmentStats(seg.id);
                return (
                  <div
                    key={seg.id}
                    style={{
                      border: "2px solid #000",
                      borderRadius: 0,
                      padding: "22px 20px",
                      background: seg.id === "invent" ? "#000" : "#fff",
                      color: seg.id === "invent" ? "#fff" : "#000",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: 2.5,
                        textTransform: "uppercase",
                        color: seg.id === "invent" ? "#888" : "#999",
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      Client Segment
                    </div>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 800,
                        margin: "0 0 4px 0",
                      }}
                    >
                      {seg.innodataName}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: seg.id === "invent" ? "#aaa" : "#666",
                        margin: "0 0 14px 0",
                        lineHeight: 1.5,
                      }}
                    >
                      {seg.subtitle}
                    </p>
                    <div
                      style={{
                        fontSize: 11,
                        lineHeight: 1.7,
                        color: seg.id === "invent" ? "#ccc" : "#555",
                      }}
                    >
                      <div>
                        <strong>Buyer:</strong> {seg.buyerProfile}
                      </div>
                      <div>
                        <strong>Maturity:</strong> {seg.maturity}
                      </div>
                      <div>
                        <strong>Focus:</strong> {seg.budgetFocus}
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 14,
                        paddingTop: 14,
                        borderTop: `1px solid ${seg.id === "invent" ? "#333" : "#e0e0e0"}`,
                        display: "flex",
                        gap: 12,
                        fontSize: 11,
                      }}
                    >
                      <span>
                        <strong>{stats.high}</strong> High-fit
                      </span>
                      <span style={{ color: seg.id === "invent" ? "#888" : "#999" }}>
                        <strong>{stats.medium}</strong> Medium
                      </span>
                      <span style={{ color: seg.id === "invent" ? "#666" : "#ccc" }}>
                        <strong>{stats.low}</strong> Low
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
                </div>
              )}
            </div>

            {/* ═══ COLLAPSIBLE SECTION: 4 Mapping Principles ═══ */}
            <div style={{ marginBottom: 12 }}>
              <button
                onClick={() => setOpenSection(openSection === "principles" ? null : "principles")}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 18px", border: "2px solid #000", background: openSection === "principles" ? "#000" : "#fff",
                  color: openSection === "principles" ? "#fff" : "#000", cursor: "pointer", fontSize: 14, fontWeight: 800,
                  letterSpacing: 0.3, textAlign: "left",
                }}
              >
                <span>4 Mapping Principles — Offering Selection Engine</span>
                <span style={{ fontSize: 18, fontWeight: 400, transform: openSection === "principles" ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openSection === "principles" && (
                <div style={{ border: "2px solid #000", borderTop: "none", padding: "24px" }}>

                  <p style={{ fontSize: 12, color: "#666", margin: "0 0 20px 0", lineHeight: 1.6 }}>
                    Before recommending any offering to a client, run it through these 4 simple questions — in order. Think of it like a checklist: if any answer is "No," either skip the offering or adjust it.
                  </p>

                  {/* 4 Simple Cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                    {[
                      {
                        num: "1", title: "Are they ready for this?",
                        principle: "Maturity-Fit",
                        yes: "They have the prerequisites (data, infrastructure, team) to use this offering today.",
                        no: "They'd need to build something else first. → Skip this, or sell the prerequisite instead.",
                        example: "Don't sell 'Cost Optimization' (A6) to a client who hasn't deployed any agents yet. Sell them 'Architecture Design' (B1) first.",
                      },
                      {
                        num: "2", title: "Is this their biggest pain point?",
                        principle: "Value-per-Dollar",
                        yes: "This directly solves their #1 problem or unblocks something critical.",
                        no: "Nice-to-have, but not the thing keeping them up at night. → Mark as Phase 2.",
                        example: "For a Reshape client whose agents hallucinate: 'RAG Optimization' (E2) and 'Gold Data' (E4) are HIGH. 'Prompt Standardization' (E5) is nice but not the fire to put out.",
                      },
                      {
                        num: "3", title: "Are we speaking their language?",
                        principle: "Functional ↔ Technical",
                        yes: "The way we describe and deliver this matches who's buying.",
                        no: "We're pitching deep tech to a CFO, or a playbook to a CTO. → Repackage it.",
                        example: "Same offering 'RAG agents' (B4): for a Deploy COO say 'make your documents answer questions.' For an Invent CAIO say 'multi-hop reasoning with dynamic decomposition.'",
                      },
                      {
                        num: "4", title: "Does this build a long-term relationship?",
                        principle: "Revenue Alignment",
                        yes: "The offering mix includes at least one recurring/retainer element (usually from Assure pillar).",
                        no: "We're only doing one-off projects with no stickiness. → Bundle an Assure offering as a seed.",
                        example: "For every Deploy proposal, include basic monitoring (A1) at low/no cost. In 6 months when they have agents running, that becomes a paid managed-service retainer.",
                      },
                    ].map((card, i) => (
                      <div key={i} style={{ border: "1px solid #e0e0e0", padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                          <div style={{
                            width: 32, height: 32, background: "#000", color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 15, fontWeight: 800, flexShrink: 0,
                          }}>{card.num}</div>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 800 }}>{card.title}</div>
                            <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>{card.principle}</div>
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                          <div style={{ padding: "10px 12px", background: "#f0fff0", border: "1px solid #c0e0c0" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#2a7a2a", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>✓ Yes → Recommend</div>
                            <div style={{ fontSize: 12, color: "#333", lineHeight: 1.5 }}>{card.yes}</div>
                          </div>
                          <div style={{ padding: "10px 12px", background: "#fff5f5", border: "1px solid #e0c0c0" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#a03030", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>✗ No → Adjust</div>
                            <div style={{ fontSize: 12, color: "#333", lineHeight: 1.5 }}>{card.no}</div>
                          </div>
                        </div>

                        <div style={{ padding: "8px 12px", background: "#f9f9f9", borderLeft: "3px solid #000", fontSize: 12, color: "#555", lineHeight: 1.5 }}>
                          <strong style={{ color: "#000" }}>Real example: </strong>{card.example}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Cheat Sheet */}
                  <div style={{ background: "#000", color: "#fff", padding: "16px 20px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
                      Quick Cheat Sheet — What to Lead With
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                        <thead>
                          <tr>
                            <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "1px solid #444", color: "#888", fontSize: 10, textTransform: "uppercase" }}></th>
                            <th style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #444", color: "#888", fontSize: 10, textTransform: "uppercase" }}>Lead pillar</th>
                            <th style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #444", color: "#888", fontSize: 10, textTransform: "uppercase" }}>Sell as</th>
                            <th style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #444", color: "#888", fontSize: 10, textTransform: "uppercase" }}>Pitch to</th>
                            <th style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #444", color: "#888", fontSize: 10, textTransform: "uppercase" }}>Seed with</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { seg: "DEPLOY", pillar: "Build + Enable", sell: "Project (fixed scope)", pitch: "COO / CFO", seed: "Free A1 monitoring" },
                            { seg: "RESHAPE", pillar: "Enable + Assure", sell: "Retainer (ongoing)", pitch: "CTO / VP Eng", seed: "A6 cost savings ROI" },
                            { seg: "INVENT", pillar: "Assure + Build", sell: "Managed service", pitch: "Chief AI Officer", seed: "E11 QA agent fleet" },
                          ].map((row, i) => (
                            <tr key={i}>
                              <td style={{ padding: "8px 10px", fontWeight: 700, borderBottom: "1px solid #222" }}>{row.seg}</td>
                              <td style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #222", color: "#ccc" }}>{row.pillar}</td>
                              <td style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #222", color: "#ccc" }}>{row.sell}</td>
                              <td style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #222", color: "#ccc" }}>{row.pitch}</td>
                              <td style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #222", color: "#ccc" }}>{row.seed}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* ═══ COLLAPSIBLE SECTION: Service Pillars ═══ */}
            <div style={{ marginBottom: 12 }}>
              <button
                onClick={() => setOpenSection(openSection === "pillars" ? null : "pillars")}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 18px", border: "2px solid #000", background: openSection === "pillars" ? "#000" : "#fff",
                  color: openSection === "pillars" ? "#fff" : "#000", cursor: "pointer", fontSize: 14, fontWeight: 800,
                  letterSpacing: 0.3, textAlign: "left",
                }}
              >
                <span>Three Service Pillars — Build / Enable / Assure (23 offerings)</span>
                <span style={{ fontSize: 18, fontWeight: 400, transform: openSection === "pillars" ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openSection === "pillars" && (
                <div style={{ border: "2px solid #000", borderTop: "none", padding: "20px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {servicePillars.map((pillar) => (
                <div
                  key={pillar.id}
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "18px 22px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{pillar.icon}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>
                      {pillar.name}
                    </h3>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#999",
                        marginLeft: 8,
                      }}
                    >
                      {pillar.offerings.length} offerings
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#666",
                      margin: "0 0 12px 0",
                    }}
                  >
                    {pillar.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                    }}
                  >
                    {pillar.offerings.map((o) => (
                      <span
                        key={o.id}
                        style={{
                          fontSize: 10.5,
                          padding: "4px 10px",
                          background: "#f5f5f5",
                          border: "1px solid #e0e0e0",
                          fontWeight: 500,
                        }}
                      >
                        {o.id} {o.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

                </div>
              )}
            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━ VIEW 2: MATRIX ━━━━━━━━━━━━━━━━━ */}
        {activeView === "matrix" && (
          <div>
            <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>
              Each cell shows relevance (HIGH / MEDIUM / LOW) and customization effort.
              Click any cell for the full recommendation logic.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 12,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "10px 12px",
                        textAlign: "left",
                        borderBottom: "2px solid #000",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 700,
                        minWidth: 200,
                        position: "sticky",
                        left: 0,
                        background: "#fff",
                        zIndex: 2,
                      }}
                    >
                      Offering
                    </th>
                    {Object.values(segments).map((seg) => (
                      <th
                        key={seg.id}
                        style={{
                          padding: "10px 14px",
                          textAlign: "center",
                          borderBottom: "2px solid #000",
                          fontSize: 10,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          fontWeight: 700,
                          minWidth: 160,
                        }}
                      >
                        {seg.innodataName.split("—")[0].trim()}
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 400,
                            color: "#999",
                            marginTop: 2,
                          }}
                        >
                          {seg.subtitle}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                  {servicePillars.map((pillar) => (
                    <tbody key={pillar.id}>
                      <tr>
                        <td
                          colSpan={4}
                          style={{
                            padding: "12px 12px 6px",
                            fontWeight: 800,
                            fontSize: 12,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            background: "#f5f5f5",
                            borderTop: "1px solid #e0e0e0",
                            position: "sticky",
                            left: 0,
                          }}
                        >
                          {pillar.icon} {pillar.name}
                        </td>
                      </tr>
                      {pillar.offerings.map((o) => (
                        <tr key={o.id}>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderBottom: "1px solid #f0f0f0",
                              fontWeight: 600,
                              fontSize: 11.5,
                              position: "sticky",
                              left: 0,
                              background: "#fff",
                              zIndex: 1,
                            }}
                          >
                            <span style={{ color: "#999", marginRight: 6 }}>
                              {o.id}
                            </span>
                            {o.name}
                          </td>
                          {Object.keys(segments).map((segId) => {
                            const rec = o.segments[segId];
                            const rc = relevanceColors[rec.relevance];
                            const cc = customColors[rec.customization];
                            const isExpanded =
                              expandedOffering === `${o.id}-${segId}`;
                            return (
                              <td
                                key={segId}
                                onClick={() =>
                                  setExpandedOffering(
                                    isExpanded ? null : `${o.id}-${segId}`
                                  )
                                }
                                style={{
                                  padding: "8px 12px",
                                  borderBottom: "1px solid #f0f0f0",
                                  textAlign: "center",
                                  cursor: "pointer",
                                  verticalAlign: "top",
                                  transition: "background 0.15s",
                                  background: isExpanded ? "#fafafa" : "#fff",
                                }}
                              >
                                <div
                                  style={{
                                    display: "inline-block",
                                    padding: "3px 10px",
                                    background: rc.bg,
                                    color: rc.text,
                                    border: `1px solid ${rc.border}`,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: 0.5,
                                    marginBottom: 4,
                                  }}
                                >
                                  {rec.relevance}
                                </div>
                                <div
                                  style={{
                                    fontSize: 10,
                                    color: "#999",
                                    marginTop: 2,
                                  }}
                                >
                                  {cc.icon} {rec.customization}
                                </div>
                                {isExpanded && (
                                  <div
                                    style={{
                                      marginTop: 8,
                                      padding: "10px",
                                      background: "#f9f9f9",
                                      border: "1px solid #e0e0e0",
                                      textAlign: "left",
                                      fontSize: 11,
                                      lineHeight: 1.6,
                                      color: "#444",
                                    }}
                                  >
                                    <div style={{ marginBottom: 6 }}>
                                      <strong>Logic:</strong> {rec.logic}
                                    </div>
                                    <div style={{ color: "#000", fontWeight: 600 }}>
                                      → {rec.deliverable}
                                    </div>
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  ))}
              </table>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━ VIEW 3: DETAIL ━━━━━━━━━━━━━━━━━ */}
        {activeView === "detail" && (
          <div>
            {/* Segment Selector */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 24,
              }}
            >
              {Object.values(segments).map((seg) => (
                <button
                  key={seg.id}
                  onClick={() => {
                    setActiveSegment(seg.id);
                    setExpandedOffering(null);
                  }}
                  style={{
                    padding: "10px 20px",
                    border: "2px solid",
                    borderColor: activeSegment === seg.id ? "#000" : "#e0e0e0",
                    background: activeSegment === seg.id ? "#000" : "#fff",
                    color: activeSegment === seg.id ? "#fff" : "#666",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: 0.3,
                  }}
                >
                  {seg.innodataName}
                </button>
              ))}
            </div>

            {/* Segment Info */}
            <div
              style={{
                border: "2px solid #000",
                padding: "20px 24px",
                marginBottom: 24,
                background:
                  activeSegment === "invent" ? "#000" : "#fff",
                color: activeSegment === "invent" ? "#fff" : "#000",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  margin: "0 0 10px 0",
                  color: activeSegment === "invent" ? "#ccc" : "#555",
                }}
              >
                {segObj.description}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 12,
                  fontSize: 11,
                  color: activeSegment === "invent" ? "#aaa" : "#666",
                }}
              >
                <div>
                  <strong
                    style={{
                      color: activeSegment === "invent" ? "#fff" : "#000",
                    }}
                  >
                    Key Need:
                  </strong>{" "}
                  {segObj.keyNeed}
                </div>
                <div>
                  <strong
                    style={{
                      color: activeSegment === "invent" ? "#fff" : "#000",
                    }}
                  >
                    Budget Focus:
                  </strong>{" "}
                  {segObj.budgetFocus}
                </div>
              </div>
            </div>

            {/* Pillar Filter */}
            <div
              style={{
                display: "flex",
                gap: 6,
                marginBottom: 20,
              }}
            >
              {[
                { id: "all", label: "All Offerings" },
                ...servicePillars.map((p) => ({
                  id: p.id,
                  label: `${p.icon} ${p.name}`,
                })),
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActivePillar(f.id)}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid",
                    borderColor: activePillar === f.id ? "#000" : "#e0e0e0",
                    background: activePillar === f.id ? "#f5f5f5" : "#fff",
                    color: activePillar === f.id ? "#000" : "#999",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Offering Cards — sorted by relevance */}
            {getFilteredPillars().map((pillar) => {
              const sorted = [...pillar.offerings].sort((a, b) => {
                const order = { HIGH: 0, MEDIUM: 1, LOW: 2 };
                return (
                  order[a.segments[activeSegment].relevance] -
                  order[b.segments[activeSegment].relevance]
                );
              });
              return (
                <div key={pillar.id} style={{ marginBottom: 28 }}>
                  <h3
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                      borderBottom: "1px solid #e0e0e0",
                      paddingBottom: 6,
                      marginBottom: 12,
                    }}
                  >
                    {pillar.icon} {pillar.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {sorted.map((o) => {
                      const rec = o.segments[activeSegment];
                      const rc = relevanceColors[rec.relevance];
                      const cc = customColors[rec.customization];
                      const isOpen = expandedOffering === o.id;
                      return (
                        <div
                          key={o.id}
                          onClick={() =>
                            setExpandedOffering(isOpen ? null : o.id)
                          }
                          style={{
                            border: `1px solid ${isOpen ? "#000" : "#e0e0e0"}`,
                            padding: "14px 18px",
                            cursor: "pointer",
                            transition: "border-color 0.15s",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              gap: 8,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "3px 10px",
                                  background: rc.bg,
                                  color: rc.text,
                                  border: `1px solid ${rc.border}`,
                                  fontSize: 9,
                                  fontWeight: 700,
                                  letterSpacing: 0.5,
                                  minWidth: 52,
                                  textAlign: "center",
                                }}
                              >
                                {rec.relevance}
                              </span>
                              <div>
                                <div
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                  }}
                                >
                                  <span style={{ color: "#bbb", marginRight: 6 }}>
                                    {o.id}
                                  </span>
                                  {o.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: "#999",
                                    marginTop: 1,
                                  }}
                                >
                                  {o.detail}
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: 10,
                                color: "#999",
                              }}
                            >
                              {cc.icon}{" "}
                              <span style={{ marginLeft: 4 }}>
                                {cc.label}
                              </span>
                            </div>
                          </div>

                          {isOpen && (
                            <div
                              style={{
                                marginTop: 14,
                                paddingTop: 14,
                                borderTop: "1px solid #e0e0e0",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 12,
                                  lineHeight: 1.75,
                                  color: "#444",
                                  marginBottom: 12,
                                }}
                              >
                                <strong
                                  style={{
                                    color: "#000",
                                    textTransform: "uppercase",
                                    fontSize: 10,
                                    letterSpacing: 1,
                                  }}
                                >
                                  Recommendation Logic:
                                </strong>
                                <br />
                                {rec.logic}
                              </div>
                              <div
                                style={{
                                  padding: "10px 14px",
                                  background: "#f5f5f5",
                                  border: "1px solid #e0e0e0",
                                  fontSize: 12,
                                  fontWeight: 600,
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 10,
                                    color: "#999",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                  }}
                                >
                                  Recommended Deliverable:
                                </span>
                                <br />
                                {rec.deliverable}
                              </div>

                              {/* Cross-segment comparison */}
                              <div
                                style={{
                                  marginTop: 12,
                                  fontSize: 11,
                                  color: "#888",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 9,
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    fontWeight: 600,
                                    color: "#bbb",
                                  }}
                                >
                                  Across segments:
                                </span>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 16,
                                    marginTop: 4,
                                  }}
                                >
                                  {Object.entries(o.segments).map(
                                    ([sId, sRec]) => (
                                      <span
                                        key={sId}
                                        style={{
                                          fontWeight:
                                            sId === activeSegment ? 700 : 400,
                                          color:
                                            sId === activeSegment
                                              ? "#000"
                                              : "#bbb",
                                        }}
                                      >
                                        {segments[sId].innodataName.split("—")[0].trim()}
                                        :{" "}
                                        <span
                                          style={{
                                            padding: "1px 6px",
                                            background:
                                              relevanceColors[sRec.relevance].bg,
                                            color:
                                              relevanceColors[sRec.relevance].text,
                                            border: `1px solid ${relevanceColors[sRec.relevance].border}`,
                                            fontSize: 9,
                                            fontWeight: 700,
                                          }}
                                        >
                                          {sRec.relevance}
                                        </span>
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Footer ── */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: "2px solid #000",
            paddingBottom: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 11, color: "#999", lineHeight: 1.7 }}>
            <strong style={{ color: "#000" }}>Innodata</strong> — Enterprise AI
            Transformation Partner
            <br />
            Framework inspired by BCG's Deploy/Reshape/Invent strategy, adapted
            with McKinsey's product-depth approach and Capgemini Invent's
            human-centered methodology.
          </div>
          <div style={{ fontSize: 10, color: "#ccc", textAlign: "right" }}>
            ◆◆◆ = Significant customization &nbsp; ◆◆○ = Moderate &nbsp; ◆○○ =
            Minimal
            <br />
            HIGH = Core recommendation &nbsp; MEDIUM = Conditional &nbsp; LOW =
            Selective
          </div>
        </div>
      </div>
    </div>
  );
}
