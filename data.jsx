// Data layer for Verity Signal — Meridian Financial Group AI portfolio (April 2026)

const COMPANY = {
  name: 'Meridian Financial Group',
  industry: 'Financial Services',
  revenue: '$18.4 billion',
  employees: 42000,
  headquarters: 'New York',
  evaluationDate: '2026-04-28',
};

const CRITERION_DEFINITIONS = {
  'CI/CD Reliability': 'Pass rate of automated build and deployment pipeline runs over the last 30 days.',
  'Test Coverage': 'Percentage of codebase covered by automated tests — how much code is verified before release.',
  'Code Review Compliance': 'Percentage of pull requests that received peer review before being merged.',
  'Code Quality Visibility': 'Code quality rating from a static analysis tool such as SonarCloud.',
  'Security Vulnerability Management': 'Number of critical or high-severity vulnerabilities currently open in the codebase.',
  'Documentation and Maintainability': 'Whether inline documentation and a maintainability index are in place.',
  'Architecture Review': 'Whether an independent review of the system architecture has been completed.',
  'Non-Functional Requirements': 'Whether performance, reliability, and scalability requirements are documented and signed off.',
  'Enterprise Standards Alignment': 'Whether the architecture has been reviewed and approved against enterprise technology standards.',
  'Load Testing': 'Whether load testing has been completed at or above the target production scale.',
  'Auto-scaling Configuration': 'Whether the system is configured to scale automatically and has been tested doing so.',
  'Capacity Model': 'Whether a documented model exists showing how the system handles expected growth.',
  'Security Framework': 'Whether a formal security certification such as SOC 2 Type II is in place.',
  'Penetration Testing': 'How recently an external penetration test was completed.',
  'Secrets and Access Management': 'Whether secrets, API keys, and access controls are managed and documented.',
  'Data Quality Baseline': 'Whether a formal baseline exists for measuring data quality with ongoing monitoring.',
  'Data Lineage': 'Whether the origin and transformation of all data inputs to the AI system are documented.',
  'Bias Assessment': 'Whether the model has been tested for bias across relevant population groups.',
  'Data Governance Sign-off': 'Whether the relevant data governance authority has formally approved the data approach.',
  'Integration Build Status': 'Percentage of planned integrations with other systems that are fully built and operational.',
  'Integration Error Rate': 'Percentage of API or integration calls that result in an error.',
  'Integration Monitoring': 'Whether monitoring and alerting is in place across all active integrations.',
  'Validation Stage': 'Current stage of the model — prototype, pilot completed, or in production.',
  'Pilot Outcomes': 'Whether a pilot was completed and what outcomes were documented.',
  'User Validation': 'Whether representative end users have validated the model at scale.',
  'Observability Stack': 'Whether logs, metrics, and traces are in place to monitor the system in production.',
  'Runbooks': 'Whether documented procedures exist for common operational incidents.',
  'On-Call Coverage': 'Whether an on-call rota is defined and has been tested.',
  'BAU Team Readiness': 'Whether the team who will run the system after go-live has been identified and engaged.',
  'Debt Ratio': 'Proportion of code that represents technical debt as reported by a static analysis tool.',
  'Debt Management': 'Whether there is an active plan to reduce technical debt with named owners.',
  'Known Architectural Compromises': 'Whether shortcuts or compromises in the architecture are documented.',
  'Comparable Production Reference': 'Whether a similar use case has been solved in production at another organisation.',
  'Error Consequence Definition': 'Whether the consequence of a wrong AI prediction is defined and an escalation process exists.',
  'External Technical Review': 'Whether an independent external reviewer has assessed technical feasibility.',
  'Programme Board': 'Whether a formal programme board exists with a named C-suite chair.',
  'Named Programme Manager': 'Whether a dedicated programme manager is named and active on the programme.',
  'RACI Documentation': 'Whether a RACI matrix documenting decision rights and accountabilities exists.',
  'Governance Tier Match': 'Whether the governance structure matches the scale and risk profile of the programme.',
  'On-Time Delivery Rate': 'Percentage of milestones delivered on or before the committed date.',
  'Average Delay': 'Average number of days milestones are delivered late.',
  'Open Blockers': 'Number of tickets currently in a blocked state in Jira.',
  'Recovery Plan': 'Whether a formal recovery plan exists when milestones are delayed.',
  'Risk Register Existence': 'Whether a formal risk register exists and has been updated recently.',
  'Review Cadence': 'How frequently the risk register is reviewed and updated.',
  'High Risk Resolution': 'Number of high-rated risks currently open and unresolved.',
  'Dependency Tracking': 'Whether all external dependencies are formally tracked.',
  'Critical Dependency Resolution': 'Number of critical dependencies currently unresolved.',
  'Dependency Review Cadence': 'How frequently the dependency list is reviewed.',
  'Quality Gates Defined': 'Whether quality gates are defined for each phase of the project.',
  'Gate Bypass Rate': 'Number of quality gates bypassed without formal approval.',
  'Defect Classification': 'Whether defects are classified by severity and tracked to resolution.',
  'Change Request Process': 'Whether a formal change request process exists and is followed.',
  'Sponsor Approval Compliance': 'Percentage of changes that received sponsor approval before implementation.',
  'Change Log Currency': 'Whether a change log is maintained and kept current.',
  'Report Frequency': 'How frequently the programme reports upward to leadership.',
  'Escalation Thresholds': 'Whether formal thresholds are defined for when issues must be escalated.',
  'Multi-Level Reporting': 'Whether reporting reaches team, board, and executive levels.',
  'Rollback Procedure': 'Whether a tested rollback procedure exists for reversing a failed deployment.',
  'Phased Deployment': 'Whether deployment is planned as phased or canary rather than big-bang.',
  'Business Continuity Plan': 'Whether a BCP exists covering what happens if the AI system fails in production.',
  'Governance Attendance': "Sponsor's attendance rate at programme governance sessions over the last 60 days.",
  'Escalation Response Time': 'How quickly the sponsor responds to escalations raised by the programme team.',
  'Personal Accountability': 'Whether the sponsor has personal accountability or has delegated it to a deputy.',
  'Critical Skills Coverage': 'Whether all critical skills — ML, data engineering, domain expertise — are present.',
  'Skill Gap Plan': 'Whether gaps in team capability are documented with a plan to address them.',
  'Domain Expertise': 'Whether the team has direct experience in the business domain this AI serves.',
  'PM Experience': 'Number of comparable programmes the programme manager has previously delivered.',
  'SI / Vendor Experience': 'Number of comparable programmes the SI or delivery partner has previously delivered.',
  'Technical Lead Experience': 'Whether the technical lead has production AI or ML experience.',
  'Critical Resource Availability': "Percentage of critical team members' time dedicated to this programme.",
  'BAU Splits': 'Whether team members also carry responsibility for live operational systems.',
  'Competing Programme Conflicts': 'Whether team members are assigned to other active programmes creating conflicts.',
  'Stakeholder Mapping': 'Whether a complete map of stakeholders with influence and interest ratings exists.',
  'Alignment Status': 'Whether all materially affected parties are consulted and aligned.',
  'Resistance Management': 'Whether active resistance from any function is named and being managed.',
  'KT Plan': 'Whether a formal knowledge transfer plan exists for handing the system to the BAU team.',
  'BAU Team Identification': 'Whether the team who will run the system after go-live is identified and engaged.',
  'Overlap Period': 'Whether an overlap period is planned where delivery and BAU teams work together.',
  'Adoption Incentives': 'Whether end users have performance incentives tied to adopting the AI tool.',
  'Workload Impact': 'Whether the AI demonstrably reduces user workload rather than adding to it.',
  'User Involvement in Design': 'Whether end users were involved in requirements and design.',
  'Feedback Channel': 'Whether a channel exists for users to report errors or concerns about AI outputs.',
  'Readiness Assessment': 'Whether a formal assessment of organisational readiness has been completed.',
  'Change Management Plan': 'Whether a formal change management plan is active for this programme.',
  'User Confidence Level': "Percentage of end users who express confidence in the AI system's outputs.",
  'Formal Mandate Document': 'Whether a formal mandate document — board resolution or equivalent — exists.',
  'Named Signatories': 'Whether named C-suite signatories are on the mandate document.',
  'Link to Organisational Strategy': 'Whether the programme is explicitly linked to organisational strategic objectives.',
  'Problem Quantification': 'Whether the problem the AI solves is quantified with a financial or operational metric.',
  'Return Validation': 'Whether the projected ROI has been independently validated.',
  'Benefits Realisation Plan': 'Whether a formal plan exists to track and realise the projected benefits.',
  'AI vs Simpler Alternative Rationale': 'Whether there is a documented rationale for choosing AI over a simpler rules-based approach.',
  'Industry Research Completed': 'Whether comparable AI deployments have been researched and documented.',
  'Problem Statement Precision': 'Whether the problem is precisely and narrowly defined rather than broad and aspirational.',
  'Business Need Primary Driver': 'Whether the business need was identified before the technology, not the reverse.',
  'Named in Strategy': 'Whether this programme is explicitly referenced in OKRs, annual plan, or board materials.',
  'Executive Roadmap': 'Whether the programme appears on the executive technology roadmap.',
  'Strategic KPIs': 'Whether strategic KPIs tied to this programme are defined and being tracked.',
  'Board Approval': 'Whether the programme roadmap has been formally approved at board level.',
  'Milestone Ownership': 'Whether every milestone has a named individual accountable for delivery.',
  'Resource Basis': 'Whether the timeline is built from a bottom-up resource model, not a top-down commitment.',
  'Budget Approval': 'Whether the programme budget has been formally approved at the appropriate level.',
  'External Benchmarking': 'Whether the budget has been compared against comparable AI programmes externally.',
  'Contingency': 'Whether a contingency reserve is included in the approved budget.',
  'Legal and Regulatory Review': 'Whether legal has reviewed the use case for all applicable AI regulations.',
  'Algorithmic Impact Assessment': 'Whether an impact assessment has been completed for AI-driven decisions affecting people.',
  'Model Risk Management': 'Whether a model risk management framework is in place or formally planned.',
  'Bias Testing': 'Whether the model has been tested for bias and results approved by the relevant authority.',
  'Kill Criteria Defined': 'Whether formal criteria are defined that would trigger stopping or pausing the programme.',
  'Gateway Reviews': 'Whether formal gateway reviews are scheduled at defined programme milestones.',
  'Continuation Contingency': 'Whether a plan exists for what happens if the programme is paused or stopped.',
};

const PORTFOLIO_INTELLIGENCE = {
  client: 'Meridian Financial Group',
  evaluated: 'April 2026',
  risks: [
    {
      id: 'regulatory',
      severity: 'red',
      title: 'Regulatory exposure — eight weeks to deadline',
      body: 'RegRadar has built a DORA compliance platform for 12 months without confirming its interpretation with the Federal Reserve or OCC. The deadline is 8 weeks away. If the interpretation is wrong, there is no time to correct it.',
      programmes: [
        { id: 'P4', name: 'RegRadar', signal: 'Regulatory Engagement Quality' },
      ],
    },
    {
      id: 'sponsor',
      severity: 'red',
      title: 'Sponsor accountability — two programmes unsponsored',
      body: 'Client 360 lost its sponsor in February and has no formal replacement. Contract Intelligence has no C-suite accountability at all. Both programmes are deteriorating. Client 360 dropped 15 points in one evaluation cycle.',
      programmes: [
        { id: 'P2', name: 'Client 360', signal: 'Sponsor Commitment' },
        { id: 'P3', name: 'Contract Intelligence', signal: 'Sponsor Commitment' },
      ],
    },
    {
      id: 'roi',
      severity: 'amber',
      title: 'ROI not independently validated — four programmes',
      body: 'Four programmes carry return assumptions that came from the programme teams themselves. FraudLens projects 3.2x. None has been reviewed by an external party. This is a capital allocation decision risk.',
      programmes: [
        { id: 'P1', name: 'FraudLens AI', signal: 'Value Case Strength' },
        { id: 'P2', name: 'Client 360', signal: 'Value Case Strength' },
        { id: 'P4', name: 'RegRadar', signal: 'Value Case Strength' },
        { id: 'P5', name: 'Talent Match', signal: 'Value Case Strength' },
      ],
    },
  ],
};

function toDisplayScore(x) {
  // In cascade scoring, scores are already on 0-100.
  // This function is kept for backward compatibility
  // but now just returns the value rounded.
  return Math.round(Number(x));
}

function trendFromAnchors(anchors) {
  const out = Array(9).fill(0);
  const sorted = [...anchors].sort((a, b) => a[0] - b[0]);
  for (let w = 0; w < 9; w++) {
    let i = 0;
    while (i < sorted.length - 1 && sorted[i + 1][0] < w) i++;
    const [w0, v0] = sorted[i];
    const [w1, v1] = sorted[Math.min(i + 1, sorted.length - 1)];
    if (w1 === w0) out[w] = v0;
    else if (w <= w0) out[w] = v0;
    else if (w >= w1) out[w] = v1;
    else {
      const t = (w - w0) / (w1 - w0);
      out[w] = v0 + t * (v1 - v0);
    }
  }
  return out.map((v) => toDisplayScore(v));
}

/** Assign stable criterion ids for scoring maps when not present. */
function attachCriterionIds(signals) {
  return (signals || []).map((sg) => ({
    ...sg,
    criteria: (sg.criteria || []).map((c, i) => ({
      ...c,
      id: c.id || `${sg.id}_c${i + 1}`,
    })),
  }));
}

const TAXONOMY_BASE = [
  {
    id: 'tech',
    name: 'Tech',
    blurb: 'Engineering, architecture, security, data, integration, maturity, ops, debt',
    signals: [
      {
        id: 'eng',
        name: 'Engineering Health',
        detail: 'CI/CD, coverage, reviews, vulnerabilities, documentation',
        criteria: [
          { name: 'Test Coverage', isCritical: false },
          { name: 'CI/CD Reliability', isCritical: true },
          { name: 'Code Review Compliance', isCritical: false },
          { name: 'Code Quality Visibility', isCritical: false },
          { name: 'Security Vulnerability Management', isCritical: true },
          { name: 'Documentation and Maintainability', isCritical: false },
        ],
      },
      {
        id: 'arch',
        name: 'Architecture Fitness',
        detail: 'Reviews, NFRs, enterprise standards',
        criteria: [
          { name: 'Architecture Review', isCritical: true },
          { name: 'Non-Functional Requirements', isCritical: false },
          { name: 'Enterprise Standards Alignment', isCritical: false },
        ],
      },
      {
        id: 'scale',
        name: 'Scalability Readiness',
        detail: 'Load testing, auto-scaling, capacity model',
        criteria: [
          { name: 'Load Testing', isCritical: true },
          { name: 'Auto-scaling Configuration', isCritical: false },
          { name: 'Capacity Model', isCritical: false },
        ],
      },
      {
        id: 'sec',
        name: 'Security Posture',
        detail: 'Framework, pen test, secrets and access',
        criteria: [
          { name: 'Security Framework', isCritical: true },
          { name: 'Penetration Testing', isCritical: true },
          { name: 'Secrets and Access Management', isCritical: false },
        ],
      },
      {
        id: 'dq',
        name: 'Data Quality and Governance',
        detail: 'Baseline, lineage, bias, sign-off',
        criteria: [
          { name: 'Data Quality Baseline', isCritical: false },
          { name: 'Data Lineage', isCritical: false },
          { name: 'Bias Assessment', isCritical: true },
          { name: 'Data Governance Sign-off', isCritical: true },
        ],
      },
      {
        id: 'int',
        name: 'Integration Health',
        detail: 'Build status, error rate, monitoring',
        criteria: [
          { name: 'Integration Build Status', isCritical: true },
          { name: 'Integration Error Rate', isCritical: true },
          { name: 'Integration Monitoring', isCritical: false },
        ],
      },
      {
        id: 'model',
        name: 'Model / Product Maturity',
        detail: 'Validation stage, pilot outcomes, user validation',
        criteria: [
          { name: 'Validation Stage', isCritical: false },
          { name: 'Pilot Outcomes', isCritical: false },
          { name: 'User Validation', isCritical: false },
        ],
      },
      {
        id: 'ops',
        name: 'Operational Readiness',
        detail: 'Observability, runbooks, on-call, BAU readiness',
        criteria: [
          { name: 'Observability Stack', isCritical: true },
          { name: 'Runbooks', isCritical: false },
          { name: 'On-Call Coverage', isCritical: true },
          { name: 'BAU Team Readiness', isCritical: true },
        ],
      },
      {
        id: 'debt',
        name: 'Technical Debt Level',
        detail: 'Debt ratio, management, known compromises',
        criteria: [
          { name: 'Debt Ratio', isCritical: false },
          { name: 'Debt Management', isCritical: false },
          { name: 'Known Architectural Compromises', isCritical: false },
        ],
      },
      {
        id: 'tfeas',
        name: 'Technical Feasibility',
        isCritical: false,
        detail: 'Production references, error consequence, external review',
        criteria: [
          { name: 'Comparable Production Reference', isCritical: false },
          { name: 'Error Consequence Definition',    isCritical: true  },
          { name: 'External Technical Review',       isCritical: false },
        ]},
    ],
  },
  {
    id: 'process',
    name: 'Process',
    blurb: 'Governance, milestones, risk, dependencies, quality gates, change control, reporting, rollback',
    signals: [
      {
        id: 'gov',
        name: 'Governance Structure',
        isCritical: true,
        detail: 'Programme board, PM, RACI, tier match',
        criteria: [
          { name: 'Programme Board', isCritical: true },
          { name: 'Named Programme Manager', isCritical: true },
          { name: 'RACI Documentation', isCritical: false },
          { name: 'Governance Tier Match', isCritical: false },
        ],
      },
      {
        id: 'mile',
        name: 'Milestone Delivery Rate',
        isCritical: true,
        detail: 'On-time rate, delay, blockers, recovery',
        criteria: [
          { name: 'On-Time Delivery Rate', isCritical: true },
          { name: 'Average Delay', isCritical: false },
          { name: 'Open Blockers', isCritical: true },
          { name: 'Recovery Plan', isCritical: false },
        ],
      },
      {
        id: 'riskm',
        name: 'Risk Management Health',
        detail: 'Risk register, cadence, high-risk resolution',
        criteria: [
          { name: 'Risk Register Existence', isCritical: true },
          { name: 'Review Cadence', isCritical: false },
          { name: 'High Risk Resolution', isCritical: true },
        ],
      },
      {
        id: 'dep',
        name: 'Dependency Health',
        detail: 'Tracking, critical resolution, review cadence',
        criteria: [
          { name: 'Dependency Tracking', isCritical: true },
          { name: 'Critical Dependency Resolution', isCritical: true },
          { name: 'Dependency Review Cadence', isCritical: false },
        ],
      },
      {
        id: 'qg',
        name: 'Quality Gate Adherence',
        detail: 'Gates defined, bypass rate, defect classification',
        criteria: [
          { name: 'Quality Gates Defined', isCritical: true },
          { name: 'Gate Bypass Rate', isCritical: true },
          { name: 'Defect Classification', isCritical: false },
        ],
      },
      {
        id: 'cc',
        name: 'Change Control Discipline',
        detail: 'CR process, sponsor approval, change log',
        criteria: [
          { name: 'Change Request Process', isCritical: true },
          { name: 'Sponsor Approval Compliance', isCritical: true },
          { name: 'Change Log Currency', isCritical: false },
        ],
      },
      {
        id: 'rep',
        name: 'Reporting Cadence',
        detail: 'Frequency, escalation thresholds, multi-level reporting',
        criteria: [
          { name: 'Report Frequency', isCritical: true },
          { name: 'Escalation Thresholds', isCritical: true },
          { name: 'Multi-Level Reporting', isCritical: false },
        ],
      },
      {
        id: 'rb',
        name: 'Rollback and Contingency',
        detail: 'Rollback procedure, phased deploy, BCP',
        criteria: [
          { name: 'Rollback Procedure', isCritical: true },
          { name: 'Phased Deployment', isCritical: true },
          { name: 'Business Continuity Plan', isCritical: false },
        ],
      },
    ],
  },
  {
    id: 'people',
    name: 'People',
    blurb: 'Sponsors, team capability, experience, availability, alignment, KT, culture',
    signals: [
      {
        id: 'spon',
        name: 'Sponsor Commitment',
        isCritical: true,
        detail: 'Governance attendance, escalation response, accountability',
        criteria: [
          { name: 'Governance Attendance', isCritical: true },
          { name: 'Escalation Response Time', isCritical: true },
          { name: 'Personal Accountability', isCritical: false },
        ],
      },
      {
        id: 'cap',
        name: 'Team Capability',
        detail: 'Skills coverage, gap plan, domain expertise',
        criteria: [
          { name: 'Critical Skills Coverage', isCritical: true },
          { name: 'Skill Gap Plan', isCritical: false },
          { name: 'Domain Expertise', isCritical: false },
        ],
      },
      {
        id: 'exp',
        name: 'Relevant Experience',
        detail: 'PM, SI/vendor, tech lead track record',
        criteria: [
          { name: 'PM Experience', isCritical: false },
          { name: 'SI / Vendor Experience', isCritical: false },
          { name: 'Technical Lead Experience', isCritical: false },
        ],
      },
      {
        id: 'avail',
        name: 'Team Availability',
        detail: 'Critical resource availability, BAU splits, conflicts',
        criteria: [
          { name: 'Critical Resource Availability', isCritical: true },
          { name: 'BAU Splits', isCritical: false },
          { name: 'Competing Programme Conflicts', isCritical: true },
        ],
      },
      {
        id: 'align',
        name: 'Stakeholder Alignment',
        detail: 'Mapping, alignment status, resistance',
        criteria: [
          { name: 'Stakeholder Mapping', isCritical: false },
          { name: 'Alignment Status', isCritical: true },
          { name: 'Resistance Management', isCritical: false },
        ],
      },
      {
        id: 'kt',
        name: 'Knowledge Transfer Readiness',
        detail: 'KT plan, BAU identification, overlap',
        criteria: [
          { name: 'KT Plan', isCritical: true },
          { name: 'BAU Team Identification', isCritical: true },
          { name: 'Overlap Period', isCritical: false },
        ],
      },
      {
        id: 'uadopt',
        name: 'User Adoption Readiness',
        isCritical: false,
        detail: 'Incentives, workload impact, user involvement, feedback channel',
        criteria: [
          { name: 'Adoption Incentives',         isCritical: false },
          { name: 'Workload Impact',             isCritical: true  },
          { name: 'User Involvement in Design',  isCritical: false },
          { name: 'Feedback Channel',            isCritical: false },
        ]},
      {
        id: 'cult',
        name: 'Organisational Change Readiness',
        detail: 'Readiness assessment, change plan, user confidence',
        criteria: [
          { name: 'Readiness Assessment', isCritical: true },
          { name: 'Change Management Plan', isCritical: true },
          { name: 'User Confidence Level', isCritical: false },
        ],
      },
    ],
  },
  {
    id: 'strategy',
    name: 'Strategy',
    blurb: 'Mandate, value case, use case validity, alignment, roadmap, investment sizing, AI risk and compliance, exit/kill criteria',
    signals: [
      {
        id: 'man',
        name: 'Mandate Clarity',
        isCritical: true,
        detail: 'Formal mandate, signatories, link to org strategy',
        criteria: [
          { name: 'Formal Mandate Document', isCritical: true },
          { name: 'Named Signatories', isCritical: true },
          { name: 'Link to Organisational Strategy', isCritical: false },
        ],
      },
      {
        id: 'val',
        name: 'Value Case Strength',
        detail: 'Problem quantification, return validation, benefits plan',
        criteria: [
          { name: 'Problem Quantification', isCritical: true },
          { name: 'Return Validation', isCritical: true },
          { name: 'Benefits Realisation Plan', isCritical: false },
        ],
      },
      { id: 'ucvalid', name: 'Use Case Validity', isCritical: false,
        detail: 'AI rationale, industry research, problem precision, business need',
        criteria: [
          { name: 'AI vs Simpler Alternative Rationale', isCritical: true  },
          { name: 'Industry Research Completed',         isCritical: false },
          { name: 'Problem Statement Precision',         isCritical: false },
          { name: 'Business Need Primary Driver',        isCritical: false },
        ]},
      {
        id: 'str',
        name: 'Strategic Alignment',
        detail: 'Named in strategy, exec roadmap, KPIs',
        criteria: [
          { name: 'Named in Strategy', isCritical: false },
          { name: 'Executive Roadmap', isCritical: false },
          { name: 'Strategic KPIs', isCritical: false },
        ],
      },
      {
        id: 'road',
        name: 'Roadmap Credibility',
        detail: 'Board approval, milestone ownership, resource basis',
        criteria: [
          { name: 'Board Approval', isCritical: true },
          { name: 'Milestone Ownership', isCritical: true },
          { name: 'Resource Basis', isCritical: true },
        ],
      },
      {
        id: 'inv',
        name: 'Investment Sizing Accuracy',
        detail: 'Budget approval, benchmarking, contingency',
        criteria: [
          { name: 'Budget Approval', isCritical: true },
          { name: 'External Benchmarking', isCritical: false },
          { name: 'Contingency', isCritical: false },
        ],
      },
      { id: 'airisk', name: 'AI Risk and Compliance', isCritical: false,
        detail: 'Legal review, algorithmic impact, model risk, bias testing',
        criteria: [
          { name: 'Legal and Regulatory Review',     isCritical: true  },
          { name: 'Algorithmic Impact Assessment',   isCritical: true  },
          { name: 'Model Risk Management',           isCritical: false },
          { name: 'Bias Testing',                    isCritical: true  },
        ]},
      {
        id: 'regeng',
        name: 'Regulatory Engagement Quality',
        isCritical: true,
        detail: 'Regulator contact, acknowledgement, cadence',
        criteria: [],
      },
      {
        id: 'dora',
        name: 'Deadline Compliance Risk',
        isCritical: true,
        detail: 'Delivery buffer vs deadline, slip risk, critical path',
        criteria: [],
      },
      {
        id: 'interp',
        name: 'Interpretation Risk',
        isCritical: true,
        detail: 'Open interpretation questions, legal sign-off, confirmation',
        criteria: [],
      },
      {
        id: 'exit',
        name: 'Exit and Kill Criteria',
        isCritical: true,
        detail: 'Kill criteria, gateway reviews, continuation contingency',
        criteria: [
          { name: 'Kill Criteria Defined', isCritical: true },
          { name: 'Gateway Reviews', isCritical: true },
          { name: 'Continuation Contingency', isCritical: false },
        ],
      },
    ],
  },
];

const TAXONOMY = TAXONOMY_BASE.map((tx) => ({
  ...tx,
  signals: attachCriterionIds(tx.signals),
}));

const SIGNAL_GROUPS = {
  tech: [
    {
      id: 'build_quality',
      label: 'Build Quality and Feasibility',
      desc: 'How well the code is written, structured and maintained — and whether the approach is technically sound',
      signals: ['Engineering Health','Architecture Fitness','Technical Debt Level','Technical Feasibility'],
    },
    {
      id: 'security_data',
      label: 'Security and Data',
      desc: 'How safe and trustworthy the underlying assets are',
      signals: ['Security Posture', 'Data Quality and Governance'],
    },
    {
      id: 'scale_integration',
      label: 'Scalability and Integration',
      desc: 'Whether the system handles real-world load and connects reliably',
      signals: ['Scalability Readiness', 'Integration Health'],
    },
    {
      id: 'ops_readiness',
      label: 'Operational Readiness',
      desc: 'Whether the product is ready to go live and be operated day-to-day',
      signals: ['Model / Product Maturity', 'Operational Readiness'],
    },
  ],
  process: [
    {
      id: 'governance',
      label: 'Governance and Delivery',
      desc: 'Whether the programme is formally governed and delivering on time',
      signals: ['Governance Structure', 'Milestone Delivery Rate', 'Reporting Cadence'],
    },
    {
      id: 'risk_control',
      label: 'Risk and Change Control',
      desc: 'How well risk, change and recovery are managed',
      signals: ['Risk Management Health', 'Change Control Discipline', 'Rollback and Contingency'],
    },
    {
      id: 'dependency_quality',
      label: 'Dependencies and Quality',
      desc: 'Whether dependencies are tracked and quality gates are enforced',
      signals: ['Dependency Health', 'Quality Gate Adherence'],
    },
  ],
  people: [
    {
      id: 'leadership',
      label: 'Leadership and Commitment',
      desc: 'Whether senior leadership is personally engaged and accountable',
      signals: ['Sponsor Commitment', 'Stakeholder Alignment'],
    },
    {
      id: 'team_capability',
      label: 'Team Capability and Availability',
      desc: 'Whether the right people with the right skills are available',
      signals: ['Team Capability', 'Relevant Experience', 'Team Availability'],
    },
    {
      id: 'adoption',
      label: 'Adoption Readiness',
      desc: 'Whether the organisation is ready to absorb and operate the programme',
      signals: ['User Adoption Readiness','Knowledge Transfer Readiness','Organisational Change Readiness'],
    },
  ],
  strategy: [
    {
      id: 'mandate_value',
      label: 'Mandate and Value',
      desc: 'Whether the programme has a clear mandate and a credible value case',
      signals: ['Mandate Clarity','Value Case Strength','Use Case Validity'],
    },
    {
      id: 'alignment_roadmap',
      label: 'Alignment and Roadmap',
      desc: 'Whether the programme is aligned to strategy with a credible plan',
      signals: ['Strategic Alignment', 'Roadmap Credibility', 'Investment Sizing Accuracy'],
    },
    {
      id: 'governance_risk',
      label: 'Governance and Risk',
      desc: 'Whether the programme has clear exit criteria and AI risk is managed',
      signals: [
        'AI Risk and Compliance',
        'Exit and Kill Criteria',
        'Regulatory Engagement Quality',
        'Deadline Compliance Risk',
        'Interpretation Risk',
      ],
    },
  ],
};

const CRITERION_SCORE = { GREEN: 100, AMBER: 51, RED: 21, GREY: null };

function groupScore(project, bucketId, groupId) {
  const group = (SIGNAL_GROUPS[bucketId] || [])
    .find(g => g.id === groupId);
  if (!group) return null;

  const signals = project.current_signals || [];

  const signalScores = group.signals
    .map(name => signals.find(s => s.signal_name === name))
    .filter(Boolean)
    .map(sig => {
      const crit = (sig.criteria || [])
        .map(c => CRITERION_SCORE[c.result])
        .filter(v => v !== null && v !== undefined);
      return crit.length > 0
        ? Math.round(crit.reduce((a,b)=>a+b,0)/crit.length)
        : null;
    })
    .filter(v => v !== null && v !== undefined);

  if (signalScores.length === 0) return null;
  return Math.round(signalScores.reduce((a,b)=>a+b,0)/signalScores.length);
}

const VERDICTS = {
  accelerate: { id: 'accelerate', label: 'Accelerate', short: 'Accel', min: 68 },
  rescue: { id: 'rescue', label: 'Rescue', short: 'Resc', min: 42 },
  kill: { id: 'kill', label: 'Kill', short: 'Kill', min: 0 },
};

function verdictFor(score) {
  if (score >= 68) return 'accelerate';
  if (score >= 42) return 'rescue';
  return 'kill';
}

/** Display-only labels for numeric 0–100 scores (same bands as verdict). */
function verityLabelFromScore100(score) {
  return score >= 68 ? 'Verity Pass'
    : score >= 42 ? 'Verity Improve'
    : 'Verity Fail';
}

function verityLabelFromCriterionResult(result) {
  if (result === 'GREEN') return 'Verity Pass';
  if (result === 'AMBER') return 'Verity Improve';
  if (result === 'RED') return 'Verity Fail';
  return 'Pending';
}

const _VERITY_RAW4 = { GREEN: 4.0, AMBER: 2.5, RED: 1.0, GREY: null };

function veritySignalLabelFromCriteriaAverage(signal) {
  const CRITERION_SCORE = { GREEN: 100, AMBER: 51, RED: 21, GREY: null };
  const scored = (signal.criteria || [])
    .map((c) => CRITERION_SCORE[c.result])
    .filter((v) => v !== null && v !== undefined);
  if (scored.length === 0) return null;
  const avg = scored.reduce((a, b) => a + b, 0) / scored.length;
  return verityLabelFromScore100(Math.round(avg));
}

const RAW_PROJECTS = [
  {
    id: 'P1',
    name: 'FraudLens AI',
    owner: 'Jennifer Walsh',
    division: 'Financial Crime',
    stage: 'Live tracking',
    spend: 4.2,
    started: 'Apr 2025',
    headline:
      'FraudLens AI has crossed the Accelerate threshold following 12 months of consistent improvement.',
    description:
      'Real-time AI-powered fraud detection across card, ACH, and wire transactions. Replacing a legacy rules-based system with an ML model trained on 4 years of Meridian transaction history.',
    programme_manager: 'Jennifer Walsh',
    primary_sponsor: 'Sarah Chen',
    sponsor_role: 'CTO',
    secondary_sponsor: 'Marcus Webb',
    secondary_role: 'CRO',
    vendor: 'Accenture',
    last_evaluated: '2026-04-28',
    overall4: 3.85,
    buckets4: { tech: 3.7, process: 4.0, people: 4.0, strategy: 3.8125 },
    score: 98,
    verdict: 'accelerate',
    scores: { tech: 98, process: 100, people: 99, strategy: 96 },
    weights: { tech: 0.25, process: 0.25, people: 0.25, strategy: 0.25 },
    trendAnchors: [[0,57],[3,63],[6,65],[9,98]],
    progression: [
      { date:'Apr 2025', label:'Initial evaluation', score:57,
        decision:'RESCUE', delta:null,
        buckets:{tech:51,process:51,people:51,strategy:51},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Technical Debt Level'],green:[]},
          process:{red:['Governance Structure'],amber:['Milestone Delivery Rate'],green:[]},
          people:{red:[],amber:['Sponsor Commitment','Team Capability'],green:[]},
          strategy:{red:[],amber:['Value Case Strength','Exit and Kill Criteria'],green:[]},
        },
        progression_brain: {
          tech:     'CI/CD is running and no critical vulnerabilities are open. Test coverage at 88% and technical debt are both below threshold. Architecture has not been independently reviewed. Technology is functional but not yet confirmed production-ready.',
          process:  'No programme board is in place. Governance has not been formally structured. Milestone delivery is below threshold and reporting is informal. The process foundation needs to be built.',
          people:   'Sponsor attendance is not yet tracked via Calendar — commitment is unverified. Team capability is present but adoption readiness and change management have not been assessed. People signals are largely unconfirmed.',
          strategy: 'The mandate document exists but the ROI has not been validated and exit criteria are informal. Strategic alignment is implied rather than confirmed. The value case needs strengthening.',
        },
        changes:['Documents only. Process below minimum. Adoption Failure triggered.'],
      },
      { date:'Jul 2025', label:'Programme board formed', score:63,
        decision:'RESCUE', delta:6,
        buckets:{tech:64,process:64,people:64,strategy:51},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Technical Debt Level'],green:['Security Posture','Integration Health']},
          process:{red:[],amber:['Milestone Delivery Rate'],green:['Governance Structure']},
          people:{red:[],amber:['Team Capability'],green:['Sponsor Commitment']},
          strategy:{red:[],amber:['Value Case Strength','Exit and Kill Criteria'],green:[]},
        },
        progression_brain: {
          tech:     'Test coverage has improved but remains below the 90% threshold. Technical debt is being actively managed. Architecture is still internally reviewed only. Engineering is strengthening but not yet at the highest standard.',
          process:  null,
          people:   'Sponsor attendance is improving. Adoption readiness and knowledge transfer preparation are underway but not yet complete.',
          strategy: 'ROI remains unvalidated. Strategic alignment is strengthening. Exit criteria have been formalised this cycle.',
        },
        changes:['Programme board formed. CTO Sarah Chen confirmed as chair.','GitHub connected. CI/CD and vulnerability data live.'],
      },
      { date:'Oct 2025', label:'Connectors live', score:65,
        decision:'RESCUE', delta:2,
        buckets:{tech:72,process:79,people:79,strategy:64},
        highlights:{
          tech:{red:[],amber:['Engineering Health'],green:['Security Posture','Integration Health','Operational Readiness']},
          process:{red:[],amber:[],green:['Governance Structure','Milestone Delivery Rate']},
          people:{red:[],amber:[],green:['Sponsor Commitment','Team Capability']},
          strategy:{red:[],amber:['Value Case Strength'],green:['Mandate Clarity','Strategic Alignment']},
        },
        progression_brain: {
          tech:     'Test coverage sits at 88% — still below the 90% threshold. Technical debt is at 8% with an active management plan in place. All other technology signals are passing. The gap is narrowing.',
          process:  null,
          people:   null,
          strategy: 'ROI is the only remaining gap — the 3.2x estimate has not been independently validated. All other strategy signals are passing. Independent validation is the one action needed.',
        },
        changes:['Jira and Calendar connected. Sponsor attendance confirmed at 94%.','Score approaching Accelerate threshold.'],
      },
      { date:'Apr 2026', label:'Current evaluation', score:98,
        decision:'ACCELERATE', delta:33,
        buckets:{tech:98,process:100,people:99,strategy:96},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Technical Debt Level'],green:['Security Posture','Integration Health','Operational Readiness','Architecture Fitness']},
          process:{red:[],amber:[],green:['Governance Structure','Milestone Delivery Rate','Risk Management Health','Rollback and Contingency']},
          people:{red:[],amber:[],green:['Sponsor Commitment','Team Capability','Cultural Readiness','Knowledge Transfer Readiness']},
          strategy:{red:[],amber:['Value Case Strength'],green:['Mandate Clarity','Strategic Alignment','Roadmap Credibility','Exit and Kill Criteria']},
        },
        progression_brain: {
          tech:     'Test coverage at 88% and technical debt at 8% are the two signals below the highest threshold. Both are actively managed. All other technology signals are fully passing.',
          process:  null,
          people:   null,
          strategy: 'ROI validation is the one remaining gap. The 3.2x return estimate has not been independently reviewed. All other strategy signals are fully passing.',
        },
        changes:['All buckets above 3.0. Pen test completed December 2025.','Score crosses Accelerate threshold at 3.8.'],
      },
    ],
    snapshotDates: ['Apr 2025', 'Jul 2025', 'Oct 2025', 'Apr 2026'],
    signalEvidence: {
      eng: 'live', arch: 'document', scale: 'team', sec: 'document',
      dq: 'document', int: 'live', model: 'team', ops: 'team', debt: 'live',
      gov: 'team', mile: 'live', riskm: 'document', dep: 'live',
      qg: 'document', cc: 'team', rep: 'team', rb: 'document',
      spon: 'live', cap: 'document', exp: 'team', avail: 'team',
      align: 'document', kt: 'document', cult: 'team',
      man: 'document', val: 'team', str: 'document', road: 'document',
      inv: 'document', exit: 'document',
      tfeas: 'document', uadopt: 'team', ucvalid: 'document', airisk: 'document',
    },
    exec_summary: {
      cxo_note: 'FraudLens AI is the strongest performer in the portfolio. Recommended for capital acceleration.',
      actions: [
        { who: 'CTO Sarah Chen', what: 'Approve scope expansion plan and resource uplift.', when: 'Within 14 days' },
        { who: 'Engineering Lead', what: 'Complete external ROI validation with finance team.', when: '30 days' },
        { who: 'Jennifer Walsh (PM)', what: 'Reduce technical debt ratio from 8% toward 5%.', when: '60 days' },
      ],
    },
    flags: ['ACCELERATE', 'ROI validation pending', 'Tech debt 8% — managed', 'EU AI Act AIA update required'],
    keySignalsNote:
      'Engineering Health AMBER (CI/CD 96% GitHub, test coverage 88%); Technical Debt AMBER (8% — managed); Security GREEN (SOC 2 Type II); Governance GREEN (programme board, CTO chair); Sponsor GREEN (94% Calendar); Milestone GREEN (93% Jira); Mandate GREEN (board resolution); Value Case AMBER (ROI estimated — validation pending); Technical Feasibility GREEN (production references reviewed); User Adoption GREEN (workload reduction validated); AI Risk GREEN (legal review complete, bias testing done).',
    executive_card: {
      about: 'FraudLens AI is replacing Meridian\'s legacy rules-based fraud detection with a real-time AI system across card, ACH, and wire transactions. The business case projects a 34% reduction in fraud losses and a 60% drop in false positives. Under Verity Signal evaluation since April 2025. CTO Sarah Chen is primary sponsor. Accenture is the SI. $4.2M approved budget. Jennifer Walsh is PM.',
      happening: 'Score 93. Technology, Process and People all confirmed strong via live connectors. Engineering Health is the one amber signal — CI/CD at 96% and test coverage at 88%, just below the Verity Pass threshold of 90%. Value Case Strength remains amber — ROI estimated but not independently validated. All other signals Verity Pass.',
      matters: {
        text: 'Two signals holding back full confidence. Value Case Strength is amber — the 3.2x ROI has not been independently validated. AI Risk and Compliance has one amber criterion — the algorithmic impact assessment needs updating for EU AI Act high-risk classification.',
        signals: ['Value Case Strength', 'AI Risk and Compliance'],
      },
      must_happen: {
        text: 'Commission external ROI validation with the finance team before the next capital allocation review. Approve scope expansion and resource uplift in parallel.',
        signal: 'Value Case Strength',
      },
    },
  },
  {
    id: 'P2',
    name: 'Client 360',
    owner: 'Mark Davis',
    division: 'Retail Banking',
    stage: 'Live tracking',
    spend: 3.1,
    started: 'Apr 2025',
    headline:
      'Client 360 has deteriorated sharply following an unmanaged sponsor transition. Was approaching Accelerate in October 2025.',
    description:
      "AI-driven customer lifetime value prediction and churn risk scoring across Meridian's 2.4 million retail banking customers.",
    programme_manager: 'Mark Davis',
    primary_sponsor: 'Rachel Torres',
    sponsor_role: 'CMO',
    secondary_sponsor: 'David Kim',
    secondary_role: 'CFO',
    vendor: 'Deloitte Digital',
    last_evaluated: '2026-04-28',
    overall4: 2.44,
    buckets4: { tech: 2.4846, process: 2.4846, people: 2.3231, strategy: 2.4846 },
    score: 57,
    verdict: 'rescue',
    scores: { tech: 61, process: 54, people: 53, strategy: 60 },
    weights: { tech: 0.25, process: 0.25, people: 0.25, strategy: 0.25 },
    trendAnchors: [[0,46],[3,57],[6,65],[9,57]],
    progression: [
      { date:'Apr 2025', label:'Initial evaluation', score:46,
        decision:'RESCUE', delta:null,
        buckets:{tech:42,process:42,people:42,strategy:42},
        highlights:{
          tech:{red:['Integration Health'],amber:['Engineering Health'],green:[]},
          process:{red:['Governance Structure'],amber:['Milestone Delivery Rate','Risk Management Health'],green:[]},
          people:{red:['Sponsor Commitment'],amber:['Team Capability'],green:[]},
          strategy:{red:[],amber:['Value Case Strength','Mandate Clarity'],green:[]},
        },
        progression_brain: {
          tech:     'CI/CD is below threshold, test coverage is at 78%, and architecture has not been independently reviewed. Only basic security is in place. All technology criteria are below the required standard at first evaluation.',
          process:  'No programme board exists. No formal risk register. Milestone delivery is unreliable. The process foundation does not exist.',
          people:   'Sponsor attendance is not yet confirmed from Calendar. Team capability has gaps and stakeholder alignment is not formally mapped. People signals are largely unverified.',
          strategy: 'Mandate exists but the value case is unvalidated and exit criteria are informal. Strategic alignment is implied. The programme lacks a confirmed strategic foundation.',
        },
        changes:['Documents only. Tech and Process below minimum.'],
      },
      { date:'Jul 2025', label:'All connectors active', score:57,
        decision:'RESCUE', delta:11,
        buckets:{tech:57,process:57,people:64,strategy:51},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Integration Health'],green:['Security Posture']},
          process:{red:[],amber:['Milestone Delivery Rate'],green:['Governance Structure']},
          people:{red:[],amber:['Team Capability'],green:['Sponsor Commitment']},
          strategy:{red:[],amber:['Value Case Strength'],green:['Mandate Clarity']},
        },
        progression_brain: {
          tech:     'Connectors are now live — CI/CD, test coverage, and vulnerabilities are confirmed from GitHub. Engineering has improved but most criteria remain below threshold. The live data is revealing the true picture.',
          process:  'Programme board has formed and Mark Davis is confirmed as PM. Milestone delivery is improving. Process is establishing itself.',
          people:   'Sponsor attendance is confirmed at 91% via Calendar — strong engagement. Team capability gaps remain. Adoption readiness has not yet been assessed.',
          strategy: 'ROI remains unvalidated. Strategic alignment is strengthening. Exit criteria are being formalised.',
        },
        changes:['All connectors activated. Sponsor attendance 91% confirmed via Calendar.','Score improved significantly.'],
      },
      { date:'Oct 2025', label:'Approaching Accelerate', score:65,
        decision:'RESCUE', delta:8,
        buckets:{tech:62,process:64,people:72,strategy:57},
        highlights:{
          tech:{red:[],amber:['Engineering Health'],green:['Security Posture','Integration Health']},
          process:{red:[],amber:['Milestone Delivery Rate'],green:['Governance Structure','Risk Management Health']},
          people:{red:[],amber:[],green:['Sponsor Commitment','Team Capability']},
          strategy:{red:[],amber:['Value Case Strength'],green:['Mandate Clarity','Strategic Alignment']},
        },
        progression_brain: {
          tech:     'CI/CD is at 93% and security is improving. Most criteria are still below the highest threshold but the trajectory is positive. Technology is at its best position in the programme\'s history.',
          process:  'Milestone delivery is at 88% and the governance board is functioning well. This is the strongest process position the programme has reached.',
          people:   'Sponsor attendance is at 91% and CMO Rachel Torres is personally engaged. This is the strongest people position in the programme\'s history.',
          strategy: 'ROI remains unvalidated and strategic alignment is not fully confirmed. These are the persistent gaps even at the programme\'s peak.',
        },
        changes:['CMO Rachel Torres attending 91% of sessions.','Milestone delivery at 88%. Approaching Accelerate threshold.'],
      },
      { date:'Apr 2026', label:'Current evaluation', score:57,
        decision:'RESCUE', delta:-8,
        buckets:{tech:61,process:54,people:53,strategy:60},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Integration Health'],green:['Security Posture']},
          process:{red:[],amber:['Milestone Delivery Rate','Risk Management Health'],green:['Governance Structure']},
          people:{red:['Sponsor Commitment','Milestone Delivery Rate'],amber:['Team Capability'],green:[]},
          strategy:{red:[],amber:['Value Case Strength'],green:['Mandate Clarity']},
        },
        progression_brain: {
          tech:     'Technology signals are unchanged from October 2025 — the same engineering gaps persist. Technology is not the story this cycle.',
          process:  'Milestone delivery has collapsed to 61% with 7 open blockers in Jira. No programme board is in place to resolve blockers. Process has broken down since the sponsor change in February.',
          people:   'Google Calendar shows sponsor attendance at 48% — down from 91% in October. CMO Rachel Torres changed roles in February. Accountability has been delegated to a deputy. No replacement sponsor has been formally appointed.',
          strategy: 'ROI remains unvalidated and the algorithmic impact assessment — required for customer-facing financial recommendations — has not been initiated. Two strategy gaps that were tolerable are now urgent.',
        },
        changes:['CMO Rachel Torres changed roles February 2026. No replacement sponsor appointed.','Calendar shows attendance collapsed to 48%. Milestone delivery at 61%.','People bucket now FAIL. Score dropped 0.8 in one cycle.'],
      },
    ],
    snapshotDates: ['Apr 2025', 'Jul 2025', 'Oct 2025', 'Apr 2026'],
    signalEvidence: {
      eng: 'live', arch: 'document', scale: 'team', sec: 'document',
      dq: 'team', int: 'live', model: 'team', ops: 'team', debt: 'live',
      gov: 'team', mile: 'live', riskm: 'team', dep: 'live',
      qg: 'document', cc: 'team', rep: 'team', rb: 'team',
      spon: 'live', cap: 'document', exp: 'team', avail: 'team',
      align: 'team', kt: 'team', cult: 'team',
      man: 'document', val: 'team', str: 'document', road: 'document',
      inv: 'document', exit: 'team',
      tfeas: 'team', uadopt: 'team', ucvalid: 'team', airisk: 'team',
    },
    exec_summary: {
      cxo_note: 'CFO David Kim must formally assume primary sponsor accountability this week. Recoverable if acted on immediately.',
      actions: [
        { who: 'CFO David Kim', what: 'Formally assume primary sponsor role. Confirm in writing today.', when: 'This week' },
        { who: 'Mark Davis (PM)', what: 'Convene blocker resolution session. All 7 open blockers need owner and date.', when: 'Within 7 days' },
        { who: 'CFO David Kim', what: 'Review and personally approve milestone recovery plan.', when: '14 days' },
      ],
    },
    flags: ['People bucket FAIL', 'Sponsor attendance 48%', 'Milestones 61%', 'Sharp portfolio drop'],
    keySignalsNote:
      'Engineering Health AMBER (CI/CD 93%); Architecture AMBER (review pending); Governance GREEN (programme board in place); Milestone RED (delivery 61%, 7 open blockers); Sponsor RED (attendance 48% Calendar — CMO changed roles); Mandate AMBER (update required for sponsor change); Value Case AMBER (ROI not independently validated); User Adoption AMBER (no performance incentives for RMs); AI Risk AMBER (AIA required but not completed).',
    executive_card: {
      about: 'Client 360 is an AI-driven customer lifetime value prediction and churn risk scoring system across Meridian\'s 2.4 million retail banking customers. The business case targets a 12% reduction in avoidable churn. Under Verity Signal evaluation since April 2025. CMO Rachel Torres was primary sponsor until February 2026 when she changed roles — no replacement has been formally appointed. Deloitte Digital is the SI. $3.1M approved budget. Mark Davis is PM.',
      happening: 'Score 50. Was heading for Accelerate in October 2025 at 62. CMO Rachel Torres changed roles in February 2026. Calendar shows governance attendance collapsed to 48%. Milestone delivery at 61% with 7 open blockers. People bucket is FAIL. User Adoption Readiness is amber — no performance incentives exist for relationship managers adopting the AI recommendations.',
      matters: {
        text: 'Google Calendar shows governance attendance has collapsed to 48% — was 91% in October. Milestone delivery fell from 88% to 61%. Seven blockers are unresolved in Jira. People bucket is now FAIL. Every week without a named sponsor the trajectory worsens.',
        signals: ['Sponsor Commitment', 'Milestone Delivery Rate'],
      },
      must_happen: {
        text: 'CFO David Kim to formally assume primary sponsor accountability this week and confirm in writing to the programme team. A steering committee without a named C-suite sponsor cannot make binding decisions.',
        signal: 'Sponsor Commitment',
      },
    },
  },
  {
    id: 'P3',
    name: 'Contract Intelligence',
    owner: 'Derek Walsh',
    division: 'Legal and Operations',
    stage: 'Live tracking',
    spend: 0.89,
    started: 'Jun 2025',
    headline:
      'Contract Intelligence is recommended for Kill following 10 months of unresolved governance failure.',
    description:
      "AI-powered extraction and risk flagging from legal contracts, supplier agreements, and compliance documentation across Meridian's legal estate.",
    programme_manager: 'Derek Walsh',
    primary_sponsor: 'Patricia Moss',
    sponsor_role: 'General Counsel',
    secondary_sponsor: null,
    secondary_role: null,
    vendor: null,
    last_evaluated: '2026-04-28',
    overall4: 1.61,
    buckets4: { tech: 2.2154, process: 1.0, people: 1.3810, strategy: 1.7619 },
    score: 39,
    verdict: 'kill',
    scores: { tech: 59, process: 31, people: 29, strategy: 36 },
    weights: { tech: 0.25, process: 0.25, people: 0.25, strategy: 0.25 },
    trendAnchors: [[0,49],[2,47],[4,47],[9,39]],
    progression: [
      { date:'Jun 2025', label:'Initial evaluation', score:49,
        decision:'RESCUE', delta:null,
        buckets:{tech:51,process:21,people:29,strategy:42},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Integration Health'],green:['Security Posture']},
          process:{red:['Governance Structure','Risk Management Health','Dependency Health','Quality Gate Adherence','Change Control Discipline','Reporting Cadence','Rollback and Contingency'],amber:['Milestone Delivery Rate'],green:[]},
          people:{red:['Sponsor Commitment','Cultural Readiness'],amber:['Team Capability','Knowledge Transfer Readiness'],green:[]},
          strategy:{red:['Mandate Clarity','Exit and Kill Criteria'],amber:['Value Case Strength'],green:[]},
        },
        progression_brain: {
          tech:     'CI/CD is at 97% and zero vulnerabilities are open — the engineering team is producing excellent code. Architecture is not independently reviewed, integrations are incomplete, and operational readiness is absent.',
          process:  'No programme board, no risk register, no change control, no reporting cadence. The process does not exist. Every process signal is failing at first evaluation.',
          people:   'Sponsor attendance is at 42% and accountability is delegated. The legal team has not been involved in design. Knowledge transfer has not started. People signals are failing across the board.',
          strategy: 'No board resolution, no independently validated ROI, no exit criteria. The programme has no strategic foundation.',
        },
        changes:['Technology strong — CI/CD 97%, test coverage 92%.','No programme board, no risk register, no change control. Adoption Failure.'],
      },
      { date:'Aug 2025', label:'2nd evaluation', score:47,
        decision:'RESCUE', delta:-2,
        buckets:{tech:48,process:21,people:29,strategy:42},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Integration Health'],green:['Security Posture']},
          process:{red:['Governance Structure','Risk Management Health','Dependency Health','Quality Gate Adherence','Change Control Discipline','Reporting Cadence','Rollback and Contingency'],amber:['Milestone Delivery Rate'],green:[]},
          people:{red:['Sponsor Commitment','Cultural Readiness'],amber:['Team Capability'],green:[]},
          strategy:{red:['Mandate Clarity','Exit and Kill Criteria'],amber:['Value Case Strength'],green:[]},
        },
        progression_brain: {
          tech:     'Technology is broadly unchanged from June 2025. Engineering remains strong. Operational gaps persist. No meaningful technology improvement in two months.',
          process:  'A business case has been submitted and strategy has improved slightly. But governance remains absent. This is the second consecutive Rescue flag with no intervention from leadership.',
          people:   'No change in sponsor commitment or team situation. The people signals that were failing in June are still failing.',
          strategy: 'The business case has improved the value case marginally. All other strategy signals remain failing. No exit criteria, no mandate document.',
        },
        changes:['Business case submitted. Strategy improves slightly.','Governance unchanged. Second Rescue flag raised.'],
      },
      { date:'Oct 2025', label:'3rd evaluation', score:47,
        decision:'RESCUE', delta:0,
        buckets:{tech:48,process:21,people:29,strategy:42},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Integration Health'],green:['Security Posture']},
          process:{red:['Governance Structure','Risk Management Health','Dependency Health','Change Control Discipline','Reporting Cadence','Rollback and Contingency'],amber:['Milestone Delivery Rate','Quality Gate Adherence'],green:[]},
          people:{red:['Sponsor Commitment','Cultural Readiness'],amber:['Team Capability'],green:[]},
          strategy:{red:['Mandate Clarity','Exit and Kill Criteria'],amber:['Value Case Strength'],green:[]},
        },
        progression_brain: {
          tech:     'Technology is unchanged for four months. The engineering team continues to produce strong code while everything around them deteriorates.',
          process:  'This is the third consecutive Rescue flag. No governance intervention has been made. Risk management, change control, quality gates, and reporting are all absent. Nothing has changed.',
          people:   'All people signals are unchanged and failing. The legal team has still not been consulted. No sponsor engagement improvement.',
          strategy: 'Unchanged from August 2025. No strategic progress across three evaluation cycles.',
        },
        changes:['Third consecutive Rescue flag. No governance intervention made.','Score unchanged. Risk growing.'],
      },
      { date:'Apr 2026', label:'Current evaluation', score:39,
        decision:'KILL', delta:-8,
        buckets:{tech:59,process:31,people:29,strategy:36},
        highlights:{
          tech:{red:['Integration Health'],amber:['Engineering Health'],green:['Security Posture']},
          process:{red:['Governance Structure','Milestone Delivery Rate','Risk Management Health','Dependency Health','Quality Gate Adherence','Change Control Discipline','Reporting Cadence','Rollback and Contingency'],amber:[],green:[]},
          people:{red:['Sponsor Commitment','Cultural Readiness','Knowledge Transfer Readiness','Team Availability'],amber:['Team Capability'],green:[]},
          strategy:{red:['Mandate Clarity','Exit and Kill Criteria','Innovation Classification'],amber:['Value Case Strength'],green:[]},
        },
        progression_brain: {
          tech:     'CI/CD is still at 97% — the engineering team continues to deliver quality code. But integrations are at 60% complete and technical debt has reached 18%. The technical foundation is eroding.',
          process:  'All eight process signals are failing. Four evaluation cycles with no governance, no risk management, no change control. The process failure is total.',
          people:   'All people signals are failing. The legal team has been built a system without being involved. No knowledge transfer, no BAU team, no organisational change readiness.',
          strategy: 'No board resolution, no validated ROI, no exit criteria. AI Risk and Compliance is fully failing — no legal review, no AIA, no MRM, no bias testing.',
        },
        changes:['Overall score below 2.0. Decision moves to Kill.','Four rescue flags over 10 months. No action taken.'],
      },
    ],
    snapshotDates: ['Jun 2025', 'Aug 2025', 'Oct 2025', 'Apr 2026'],
    signalEvidence: {
      eng: 'live', arch: 'document', scale: 'team', sec: 'document',
      dq: 'team', int: 'live', model: 'team', ops: 'team', debt: 'live',
      gov: 'team', mile: 'live', riskm: 'team', dep: 'live',
      qg: 'team', cc: 'team', rep: 'team', rb: 'team',
      spon: 'team', cap: 'document', exp: 'team', avail: 'team',
      align: 'team', kt: 'team', cult: 'team',
      man: 'document', val: 'team', str: 'document', road: 'document',
      inv: 'document', exit: 'team',
      tfeas: 'team', uadopt: 'team', ucvalid: 'team', airisk: 'team',
    },
    exec_summary: {
      cxo_note: 'Recommended for controlled wind-down. Preserve the engineering team and codebase for a properly governed successor programme.',
      actions: [
        { who: 'General Counsel Patricia Moss', what: 'Approve controlled wind-down and communicate to programme team.', when: 'Within 14 days' },
        { who: 'Engineering Lead', what: 'Preserve codebase and document architecture for successor programme.', when: '30 days' },
        { who: 'Derek Walsh (PM)', what: 'Produce handover pack — what was built, what works, what does not.', when: '30 days' },
        { who: 'CFO Office', what: 'Recover committed but unspent capital from the $890K budget.', when: '45 days' },
      ],
    },
    flags: ['KILL', 'Adoption Failure (Process)', 'No programme board', 'No kill criteria'],
    keySignalsNote:
      'Engineering Health AMBER (CI/CD 97% GitHub — best in portfolio); Integration RED (65% complete); Governance RED (no programme board, no RACI); Milestone RED (delivery collapsing); Sponsor RED (attendance 42%, fully delegated); Risk Management RED (no register); Change Control RED (no process); Mandate RED (no board resolution); Exit and Kill RED (no criteria defined); Technical Feasibility RED (no external review); User Adoption RED (legal team not involved in design); AI Risk RED (no legal review, no AIA, no bias testing).',
    executive_card: {
      about: 'Contract Intelligence is automating extraction and risk flagging from legal contracts, supplier agreements, and compliance documents across Meridian\'s legal and operations functions. Under Verity Signal evaluation since June 2025. General Counsel Patricia Moss is primary sponsor. Internal delivery — no SI. $890K approved budget. Derek Walsh is PM.',
      happening: 'Score 33. Engineering is the strongest signal in the portfolio — CI/CD 97% confirmed via GitHub. Every process signal is Red. No programme board, no risk register, no change control, no rollback plan. User Adoption is Red — the legal team was not involved in design and is actively resistant. AI Risk and Compliance is Red — no legal review, no algorithmic impact assessment, no bias testing has been initiated.',
      matters: {
        text: 'The governance failures are complete — four consecutive Rescue flags with no intervention. What is new in this evaluation: AI Risk and Compliance is Red. No legal review, no algorithmic impact assessment, no bias testing has been initiated in twelve months. This is not a minor gap for a system that will analyse legal contracts.',
        signals: ['Governance Structure', 'AI Risk and Compliance'],
      },
      must_happen: {
        text: 'Approve a controlled wind-down. The engineering team and codebase must be preserved for a properly governed successor programme. Recover committed but unspent capital from the $890K budget. Do not let the engineering work be lost.',
        signal: 'Governance Structure',
      },
    },
  },
  {
    id: 'P4',
    name: 'RegRadar',
    owner: 'Lisa Thompson',
    division: 'Compliance',
    stage: 'Live tracking',
    spend: 2.8,
    started: 'Apr 2025',
    headline:
      'RegRadar shows an overall score of 3.3 which masks three critical Red signals in Strategy. DORA deadline is 8 weeks away and no regulatory contact has been made.',
    description:
      'Automated AI-powered DORA compliance monitoring and reporting. Replacing manual quarterly reporting with continuous automated assessment. Regulatory deadline: June 2026.',
    programme_manager: 'Lisa Thompson',
    primary_sponsor: 'Marcus Webb',
    sponsor_role: 'CRO',
    secondary_sponsor: 'Thomas Reeves',
    secondary_role: 'COO',
    vendor: 'KPMG Regulatory Technology',
    last_evaluated: '2026-04-28',
    overall4: 3.34,
    buckets4: { tech: 3.2385, process: 3.8125, people: 3.8125, strategy: 2.6462 },
    score: 88,
    verdict: 'accelerate',
    scores: { tech: 88, process: 96, people: 96, strategy: 74 },
    weights: { tech: 0.25, process: 0.25, people: 0.25, strategy: 0.25 },
    trendAnchors: [[0,46],[3,57],[6,59],[9,88]],
    progression: [
      { date:'Apr 2025', label:'Initial evaluation', score:46,
        decision:'RESCUE', delta:null,
        buckets:{tech:42,process:51,people:51,strategy:42},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Integration Health','Model / Product Maturity'],green:[]},
          process:{red:[],amber:['Governance Structure','Milestone Delivery Rate'],green:[]},
          people:{red:[],amber:['Sponsor Commitment','Team Capability'],green:[]},
          strategy:{red:['Regulatory Engagement Quality','Deadline Compliance Risk'],amber:['Value Case Strength'],green:['Mandate Clarity']},
        },
        progression_brain: {
          tech:     'No connectors are active — all technology data is from documents only. Engineering health is below threshold and operational readiness has not been assessed. The true technology picture is not yet visible.',
          process:  'Programme board is not yet formalised and milestone delivery is below threshold. Process foundations are being established.',
          people:   'Sponsor attendance is not yet confirmed from Calendar. Team capability is present but not confirmed with live data.',
          strategy: 'Three regulatory signals are Red — Regulatory Engagement, Deadline Compliance, and Interpretation Risk. No formal regulator contact has been made. The DORA deadline is 14 months away.',
        },
        changes:['Documents only. Tech and Process below minimum.'],
      },
      { date:'Jul 2025', label:'Connectors active', score:57,
        decision:'RESCUE', delta:11,
        buckets:{tech:49,process:53,people:59,strategy:49},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Integration Health'],green:['Security Posture']},
          process:{red:[],amber:['Milestone Delivery Rate'],green:['Governance Structure']},
          people:{red:[],amber:['Team Capability'],green:['Sponsor Commitment']},
          strategy:{red:['Regulatory Engagement Quality','Deadline Compliance Risk','Interpretation Risk'],amber:['Value Case Strength'],green:['Mandate Clarity']},
        },
        progression_brain: {
          tech:     'GitHub and Jira are now connected — CI/CD, test coverage, and milestone data are confirmed live. Technology has improved significantly. Integration gaps are now visible.',
          process:  'Governance board has formed with CRO Marcus Webb as chair. Milestone delivery is improving. Process is establishing strongly.',
          people:   'Sponsor attendance is confirmed at 93% via Calendar. KPMG regulatory technology specialists are in place.',
          strategy: 'Three regulatory signals remain Red. No regulator contact has been made despite these signals being flagged at first evaluation. The DORA deadline is now 11 months away.',
        },
        changes:['All connectors activated. Regulatory engagement signals answered — no regulator contact confirmed.','Strategy at minimum threshold.'],
      },
      { date:'Oct 2025', label:'Steady state', score:59,
        decision:'RESCUE', delta:2,
        buckets:{tech:55,process:57,people:59,strategy:49},
        highlights:{
          tech:{red:[],amber:['Engineering Health'],green:['Security Posture','Integration Health']},
          process:{red:[],amber:['Milestone Delivery Rate'],green:['Governance Structure','Risk Management Health']},
          people:{red:[],amber:[],green:['Sponsor Commitment','Team Capability']},
          strategy:{red:['Regulatory Engagement Quality','Deadline Compliance Risk','Interpretation Risk'],amber:['Value Case Strength'],green:['Mandate Clarity']},
        },
        progression_brain: {
          tech:     'Technology continues to improve with all connectors active. Integration gaps persist. Engineering health is at its strongest position.',
          process:  null,
          people:   'Knowledge transfer is amber — the BAU team is identified but no overlap period is planned. All other people signals are passing.',
          strategy: 'Three regulatory signals are still Red. This is the third evaluation cycle with no regulatory engagement initiated. The DORA deadline is now 9 months away.',
        },
        changes:['Tech and Process improving. Strategy unchanged.','Regulatory risk growing. DORA deadline now 9 months away.','No regulator engagement initiated.'],
      },
      { date:'Apr 2026', label:'Current evaluation', score:88,
        decision:'RESCUE', delta:29,
        buckets:{tech:88,process:96,people:96,strategy:74},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Integration Health','Model / Product Maturity'],green:['Security Posture','Operational Readiness']},
          process:{red:[],amber:[],green:['Governance Structure','Milestone Delivery Rate','Risk Management Health','Reporting Cadence']},
          people:{red:[],amber:[],green:['Sponsor Commitment','Team Capability','Team Availability']},
          strategy:{red:['Regulatory Engagement Quality','Deadline Compliance Risk','Interpretation Risk'],amber:['Value Case Strength'],green:['Mandate Clarity','Strategic Alignment']},
        },
        progression_brain: {
          tech:     'One critical vulnerability is open. Integration monitoring has a gap. BAU team is identified but not trained. Technology is strong but not fully passing.',
          process:  null,
          people:   'Knowledge transfer remains amber — BAU team identified but no overlap period is planned. All other people signals are fully passing.',
          strategy: 'Three regulatory signals are Red and the AI Risk signal is also Red — the legal review cannot be completed without confirmed regulatory interpretation. The DORA deadline is 8 weeks away. This is the fourth evaluation cycle with no regulatory engagement.',
        },
        changes:['Score of 3.3 masks 3 critical Red signals in Strategy.','No regulator contact made in 12 months. DORA deadline 8 weeks away.','Programme tracking 2 weeks late. 3 open ICT questions. No legal counsel engaged.'],
      },
    ],
    snapshotDates: ['Apr 2025', 'Jul 2025', 'Oct 2025', 'Apr 2026'],
    signalEvidence: {
      eng: 'live', arch: 'document', scale: 'team', sec: 'document',
      dq: 'document', int: 'live', model: 'team', ops: 'team', debt: 'live',
      gov: 'team', mile: 'live', riskm: 'document', dep: 'live',
      qg: 'document', cc: 'team', rep: 'team', rb: 'document',
      spon: 'live', cap: 'document', exp: 'team', avail: 'team',
      align: 'document', kt: 'document', cult: 'team',
      man: 'document', val: 'team', str: 'document', road: 'document',
      inv: 'document', exit: 'team',
      tfeas: 'document', uadopt: 'team', ucvalid: 'document', airisk: 'team',
    },
    exec_summary: {
      cxo_note: 'CRO Marcus Webb and General Counsel must initiate formal regulator contact this week. Score of 3.3 does not reflect the severity of regulatory exposure at signal level.',
      actions: [
        { who: 'CRO Marcus Webb', what: 'Initiate formal engagement with Federal Reserve and OCC. Confirm DORA interpretation.', when: 'This week' },
        { who: 'General Counsel', what: 'Engage legal counsel on the 3 open ICT framework interpretation questions.', when: 'Within 7 days' },
        { who: 'Lisa Thompson (PM)', what: 'Produce revised delivery plan recovering the 2-week delay before DORA deadline.', when: 'Within 7 days' },
        { who: 'KPMG Regulatory Technology', what: 'Provide written confirmation of DORA interpretation for regulatory submission.', when: '14 days' },
      ],
    },
    flags: ['Strategy bucket FAIL', 'No Fed/OCC contact 12mo', 'DORA 8wk — 2wk late trajectory'],
    keySignalsNote:
      'Engineering Health AMBER (CI/CD 94% GitHub); Architecture GREEN; Security GREEN (pen test Jan 2026); Governance GREEN (CRO chairs board); Milestone AMBER (tracking 2 weeks late); Sponsor GREEN (93% Calendar); Mandate GREEN (board resolution); Regulatory Engagement RED (no regulator contact in 12 months — team input); Deadline Compliance RED (DORA deadline 8 weeks, 2 weeks late — team input); Interpretation Risk RED (3 open ICT questions, no legal counsel — team input); AI Risk RED (legal review blocked by regulatory interpretation gap).',
    executive_card: {
      about: 'RegRadar is automating Meridian\'s DORA compliance monitoring and reporting ahead of the June 2026 regulatory deadline. It replaces a manual quarterly process that consumed three weeks of the regulatory team each cycle. Under Verity Signal evaluation since April 2025. CRO Marcus Webb is primary sponsor. KPMG Regulatory Technology is the SI. $2.8M approved budget. Lisa Thompson is PM.',
      happening: 'Score 88. Technology, Process and People are all confirmed strong via live connectors — Tech 88, Process 96, People 96. Three buckets performing at or near Accelerate level. The problem is in Strategy where Governance and Risk scores 40 — the lowest group score in the portfolio. Three regulatory signals are Red.',
      matters: {
        text: 'AI Risk and Compliance is now Red alongside the three regulatory signals. The legal review cannot be completed because the regulatory interpretation is unconfirmed. DORA deadline is eight weeks away. The programme has built to an interpretation no regulator has approved.',
        signals: ['Regulatory Engagement Quality', 'AI Risk and Compliance'],
      },
      must_happen: {
        text: 'This Accelerate verdict is conditional. CRO Marcus Webb and General Counsel must initiate formal regulator contact with the Federal Reserve and OCC this week. Without it, the next evaluation will move this programme from Accelerate to Rescue.',
        signal: 'Regulatory Engagement Quality',
      },
    },
  },
  {
    id: 'P5',
    name: 'Talent Match AI',
    owner: 'Ryan Cooper',
    division: 'Human Resources',
    stage: 'Live tracking',
    spend: 1.6,
    started: 'Apr 2025',
    headline:
      'Talent Match AI has completed a full recovery from Kill to Accelerate in 12 months.',
    description:
      "AI-powered talent matching and retention risk prediction across Meridian's 42,000 employees. Surfaces flight risk signals to HR business partners 6-8 weeks before a resignation.",
    programme_manager: 'Ryan Cooper',
    primary_sponsor: 'Linda Park',
    sponsor_role: 'CHRO',
    secondary_sponsor: 'Thomas Reeves',
    secondary_role: 'COO',
    vendor: 'Workday Professional Services',
    last_evaluated: '2026-04-28',
    overall4: 3.67,
    buckets4: { tech: 3.2385, process: 4.0, people: 3.8125, strategy: 3.6250 },
    score: 96,
    verdict: 'accelerate',
    scores: { tech: 91, process: 100, people: 98, strategy: 95 },
    weights: { tech: 0.25, process: 0.25, people: 0.25, strategy: 0.25 },
    trendAnchors: [[0,34],[3,51],[6,61],[9,96]],
    progression: [
      { date:'Apr 2025', label:'Initial evaluation', score:34,
        decision:'KILL', delta:null,
        buckets:{tech:34,process:34,people:34,strategy:34},
        highlights:{
          tech:{red:['Integration Health','Operational Readiness'],amber:['Engineering Health','Model / Product Maturity'],green:[]},
          process:{red:['Governance Structure','Milestone Delivery Rate','Risk Management Health'],amber:['Reporting Cadence'],green:[]},
          people:{red:['Sponsor Commitment','Cultural Readiness','Knowledge Transfer Readiness'],amber:['Team Capability'],green:[]},
          strategy:{red:['Mandate Clarity','Exit and Kill Criteria'],amber:['Value Case Strength'],green:[]},
        },
        progression_brain: {
          tech:     'No connectors are active — all technology data is from documents only. Integration health is Red, operational readiness is not in place, and most criteria are below threshold.',
          process:  'No programme board exists. No milestone delivery tracking. Risk management is absent. Process has broken down following the departure of the original sponsor.',
          people:   'The original sponsor has left with no replacement appointed. Attendance is not being tracked. Knowledge transfer, adoption readiness, and change readiness are all failing. The programme has no people governance.',
          strategy: 'Mandate exists but the ROI is unvalidated, exit criteria are absent, and strategic alignment is not confirmed. The strategic foundation has deteriorated with the governance.',
        },
        changes:['Kill flag. Original sponsor left. No governance. Adoption Failure triggered.','No programme board. No connectors. Documents only.'],
      },
      { date:'Jul 2025', label:'CHRO takes ownership', score:51,
        decision:'RESCUE', delta:17,
        buckets:{tech:42,process:42,people:51,strategy:42},
        highlights:{
          tech:{red:['Integration Health'],amber:['Engineering Health','Model / Product Maturity'],green:['Security Posture']},
          process:{red:['Milestone Delivery Rate'],amber:['Governance Structure','Risk Management Health'],green:[]},
          people:{red:['Cultural Readiness'],amber:['Team Capability','Knowledge Transfer Readiness'],green:['Sponsor Commitment']},
          strategy:{red:['Exit and Kill Criteria'],amber:['Value Case Strength','Mandate Clarity'],green:[]},
        },
        progression_brain: {
          tech:     'GitHub is now connected — CI/CD and vulnerability data are live. Technology is improving with real data visible. Integration gaps and operational readiness gaps remain.',
          process:  'Governance is beginning to form. Milestone delivery is still below threshold. CHRO Linda Park\'s intervention has not yet reached process maturity.',
          people:   'CHRO Linda Park has taken personal sponsorship — attendance is improving and accountability is confirmed personal. People signals are beginning to recover. Adoption Failure is still active.',
          strategy: 'Strategy signals are improving with CHRO engagement. Exit criteria are being formalised. ROI remains unvalidated.',
        },
        changes:['CHRO Linda Park assumed sponsorship. GitHub connected.','People bucket recovering. Adoption Failure still active.'],
      },
      { date:'Oct 2025', label:'Full recovery underway', score:61,
        decision:'RESCUE', delta:10,
        buckets:{tech:51,process:64,people:72,strategy:51},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Integration Health','Model / Product Maturity'],green:['Security Posture','Operational Readiness']},
          process:{red:[],amber:['Milestone Delivery Rate'],green:['Governance Structure','Risk Management Health']},
          people:{red:[],amber:['Cultural Readiness','Knowledge Transfer Readiness'],green:['Sponsor Commitment','Team Capability']},
          strategy:{red:[],amber:['Value Case Strength','Exit and Kill Criteria'],green:['Mandate Clarity']},
        },
        progression_brain: {
          tech:     'All connectors are active and technology is improving significantly. Operational readiness and technical debt remain amber. Everything else is passing.',
          process:  null,
          people:   'Google Calendar confirms 100% attendance since July 2025. Adoption Failure is resolved. Knowledge transfer and adoption readiness are the two remaining amber signals.',
          strategy: 'ROI remains unvalidated and exit criteria are being formalised. All other strategy signals are passing.',
        },
        changes:['Programme board formed. Ryan Cooper appointed as PM.','All connectors active. Calendar confirms Linda Park attending 100% of sessions.','Adoption Failure resolved.'],
      },
      { date:'Apr 2026', label:'Current evaluation', score:96,
        decision:'ACCELERATE', delta:35,
        buckets:{tech:91,process:100,people:98,strategy:95},
        highlights:{
          tech:{red:[],amber:['Engineering Health','Technical Debt Level','Integration Health'],green:['Security Posture','Operational Readiness','Architecture Fitness']},
          process:{red:[],amber:[],green:['Governance Structure','Milestone Delivery Rate','Risk Management Health','Rollback and Contingency']},
          people:{red:[],amber:['Knowledge Transfer Readiness'],green:['Sponsor Commitment','Team Capability','Cultural Readiness','Team Availability']},
          strategy:{red:[],amber:['Value Case Strength'],green:['Mandate Clarity','Strategic Alignment','Roadmap Credibility','Exit and Kill Criteria']},
        },
        progression_brain: {
          tech:     'Engineering health and technical debt remain amber — CI/CD at 93% and debt at 10%. All other technology signals are fully passing.',
          process:  null,
          people:   'Knowledge transfer is the one amber signal — BAU team is identified but training has not started. All other people signals are fully passing, including 100% Calendar attendance.',
          strategy: 'Value Case Strength and Investment Sizing remain amber — ROI is not independently validated and no external budget benchmarking has been completed. All other strategy signals are passing.',
        },
        changes:['Kill to Accelerate in 12 months.','CHRO Linda Park 100% attendance confirmed via Calendar every session since July 2025.','All 4 buckets above 3.0. Score crosses Accelerate at 3.6.'],
      },
    ],
    snapshotDates: ['Apr 2025', 'Jul 2025', 'Oct 2025', 'Apr 2026'],
    signalEvidence: {
      eng: 'live', arch: 'document', scale: 'team', sec: 'document',
      dq: 'document', int: 'live', model: 'team', ops: 'team', debt: 'live',
      gov: 'team', mile: 'live', riskm: 'document', dep: 'live',
      qg: 'document', cc: 'team', rep: 'team', rb: 'document',
      spon: 'live', cap: 'document', exp: 'team', avail: 'team',
      align: 'document', kt: 'document', cult: 'team',
      man: 'document', val: 'team', str: 'document', road: 'document',
      inv: 'document', exit: 'document',
      tfeas: 'document', uadopt: 'team', ucvalid: 'document', airisk: 'document',
    },
    exec_summary: {
      cxo_note: 'Kill to Accelerate in 12 months through CHRO personal ownership. A model for the portfolio.',
      actions: [
        { who: 'Ryan Cooper (PM)', what: 'Start BAU team training programme immediately. Cannot slip past go-live.', when: 'Within 14 days' },
        { who: 'Engineering Lead', what: 'Execute technical debt reduction plan. Target below 8% within 60 days.', when: '60 days' },
        { who: 'CHRO Linda Park', what: 'Confirm go-live date and communicate to HR business partners.', when: '30 days' },
      ],
    },
    flags: ['ACCELERATE', 'BAU training not started — must precede go-live', 'Tech debt 10% — active reduction plan'],
    keySignalsNote:
      'Engineering Health AMBER (CI/CD 93%); Integration AMBER; Architecture GREEN; Governance GREEN (programme board, CHRO chairs); Milestone GREEN (91% Jira); Sponsor GREEN (100% Calendar — every session since July 2025); Mandate GREEN (board resolution); Value Case AMBER (ROI estimated); Knowledge Transfer AMBER (BAU identified, training not started); User Adoption GREEN (HRBP incentives formal, workload reduction validated in pilot); AI Risk GREEN (full legal review, AIA complete, bias testing approved by CHRO).',
    executive_card: {
      about: 'Talent Match AI is bringing AI-powered talent matching and retention risk prediction across Meridian\'s 42,000 employees. Under Verity Signal evaluation since April 2025 — the programme received a Kill flag at first evaluation. CHRO Linda Park assumed personal sponsorship in July 2025 and reversed the trajectory. Workday Professional Services is the SI. $1.6M approved budget. Ryan Cooper is PM.',
      happening: 'Score 83. Kill to Accelerate in twelve months through CHRO personal ownership. Google Calendar confirms 100% sponsor attendance since July 2025. All Process signals are Verity Pass. User Adoption Readiness is Green — HRBPs have formal performance incentives tied to talent match rates and workload reduction has been validated in a pilot with three business units. One remaining gap: BAU team training has not started.',
      matters: {
        text: 'One remaining gap before go-live. The BAU team has been identified but training has not started. This cannot slip past the go-live date. All other signals are Verity Pass including AI Risk — full legal review, AIA, and bias testing are all complete and approved.',
        signals: ['Knowledge Transfer Readiness'],
      },
      must_happen: {
        text: 'Start BAU team training immediately — this cannot slip past the go-live date. CHRO Linda Park to confirm the go-live date and communicate to all HR business partners this month.',
        signal: 'Knowledge Transfer Readiness',
      },
    },
  },
  {
    id: 'P6',
    name: 'Claims Automation AI',
    owner: 'Sarah Mitchell',
    division: 'Insurance Operations',
    stage: 'Intake',
    spend: 2.4,
    started: 'Apr 2026',
    headline:
      'Claims Automation AI · First evaluation complete · 90 of 100 criteria scored from GitHub, Jira, and 3 uploaded documents.',
    description:
      "AI-powered automation of insurance claims triage, document extraction, and initial assessment across Meridian's property and casualty portfolio.",
    programme_manager: 'Sarah Mitchell',
    primary_sponsor: 'Thomas Reeves',
    sponsor_role: 'COO',
    secondary_sponsor: 'David Kim',
    secondary_role: 'CFO',
    vendor: 'IBM Consulting',
    last_evaluated: '2026-04-28',
    is_demo: true,
    overall4: 2.18,
    score_after_questions4: 59,
    coverage_pct: 90,
    pending_count: 10,
    active_connectors: ['GitHub', 'GitHub Actions', 'GitHub Security', 'Jira'],
    pending_connectors: ['Google Calendar', 'SonarCloud'],
    uploaded_documents: [
      'Claims_Business_Case_v1.pdf',
      'Claims_Team_Profile.pdf',
      'Claims_Data_Assessment.pdf',
    ],
    progression_note: 'First evaluation — April 2026',
    buckets4: { tech: 2.0538, process: 2.0538, people: 2.0538, strategy: 2.0538 },
    score: 48,
    verdict: 'rescue',
    scores: { tech: 43, process: 51, people: 54, strategy: 45 },
    weights: { tech: 0.25, process: 0.25, people: 0.25, strategy: 0.25 },
    trendAnchors: [[0,48]],
    snapshotDates: ['Apr 2026'],
    progression: [
      { date:'Apr 2026', label:'Current evaluation', score:48,
        decision:'RESCUE', delta:null,
        buckets:{tech:43,process:51,people:54,strategy:45},
        changes:['First evaluation.'],
      },
    ],
    signalEvidence: {
      eng: 'live', arch: 'document', scale: 'document', sec: 'pending',
      dq: 'document', int: 'live', model: 'document', ops: 'document',
      debt: 'live', gov: 'pending', mile: 'live', riskm: 'pending',
      dep: 'live', qg: 'document', cc: 'document', rep: 'document',
      rb: 'document', spon: 'pending', cap: 'document', exp: 'document',
      avail: 'document', align: 'document', kt: 'document', cult: 'document',
      man: 'pending', val: 'document', str: 'document', road: 'document',
      inv: 'document', exit: 'document',
      tfeas: 'document', uadopt: 'pending', ucvalid: 'document', airisk: 'pending',
    },
    exec_summary: {
      cxo_note: 'Answer 5 critical questions to reach score 2.9. Connect Google Calendar and SonarCloud for continuous scoring.',
      actions: [
        { who: 'Thomas Reeves (COO)', what: 'Confirm programme board and chair role. Answer the pending question on the platform.', when: 'This week' },
        { who: 'Sarah Mitchell (PM)', what: 'Upload formal mandate document and confirm signatories.', when: 'This week' },
        { who: 'IBM Consulting', what: 'Confirm SOC 2 Type II certification and upload evidence.', when: 'Within 7 days' },
        { who: 'Sarah Mitchell (PM)', what: 'Connect Google Calendar and SonarCloud for continuous scoring.', when: '14 days' },
      ],
    },
    flags: ['90% coverage', '10 pending criteria', 'Connect Calendar & SonarCloud'],
    keySignalsNote:
      'Engineering Health AMBER; Technical Debt GREEN; Security GREY (pending — SOC 2 question unanswered); Governance GREY (programme board pending — critical question); Milestone AMBER (88% Jira); Sponsor GREY (attendance pending — Google Calendar not connected); Mandate GREY (board resolution pending — critical question); Exit and Kill RED (no criteria defined); User Adoption RED (no incentives, no feedback channel); AI Risk RED (AIA required for customer claims decisions — not initiated).',
    executive_card: {
      about: 'Claims Automation AI is automating triage, document extraction, and initial assessment across Meridian\'s property and casualty insurance claims portfolio. This is the programme\'s first Verity Signal evaluation — April 2026, four months into delivery. COO Thomas Reeves is primary sponsor. IBM Consulting is the SI. $2.4M approved budget. Sarah Mitchell is PM.',
      happening: 'Score 43. First evaluation. 90 of 100 criteria scored from GitHub, Jira and three uploaded documents. Four connectors active. Security, Governance, Sponsor and Mandate are all Pending — critical questions unanswered. User Adoption Readiness is Red — no adoption incentives defined and no feedback channel exists. AI Risk and Compliance is Red — an algorithmic impact assessment is required for automated claims decisions but has not been initiated.',
      matters: {
        text: 'Programme board formation, the mandate document, and sponsor attendance are not yet confirmed — these are the three highest-priority gaps. Answering the five critical questions on this screen now moves the score from 44 to 59 and significantly improves the confidence level.',
        signals: ['Governance Structure', 'Mandate Clarity'],
      },
      must_happen: {
        text: 'Answer the five critical questions on this screen now. Connect Google Calendar to score sponsor attendance automatically going forward. Connect SonarCloud for continuous code quality scoring.',
        signal: 'Governance Structure',
      },
    },
    pending_questions: [
      {
        id: 'pq1',
        criterion: 'P6_pr01c1',
        bucket: 'Process',
        signal: 'Governance Structure',
        is_critical: true,
        question: 'Is there a formal programme board with a named C-suite executive as chair?',
        demo_answer: 'Yes - C-suite chair, meets fortnightly',
        impact: 'Governance Structure moves to Green. Process bucket improves.',
      },
      {
        id: 'pq2',
        criterion: 'P6_pr01c2',
        bucket: 'Process',
        signal: 'Governance Structure',
        is_critical: true,
        question: 'Who is the named programme manager and what % of time dedicated?',
        demo_answer: 'Sarah Mitchell, 100% dedicated',
        impact: 'Named Programme Manager confirmed.',
      },
      {
        id: 'pq3',
        criterion: 'P6_st01c1',
        bucket: 'Strategy',
        signal: 'Mandate Clarity',
        is_critical: true,
        question: 'Is there a formal mandate document with named C-suite signatories?',
        demo_answer: 'Yes - board resolution with C-suite signatories',
        impact: 'Mandate Clarity moves to Green. Strategy bucket improves.',
      },
      {
        id: 'pq4',
        criterion: 'P6_pl01c1',
        bucket: 'People',
        signal: 'Sponsor Commitment',
        is_critical: true,
        question: 'What % of governance sessions has COO Thomas Reeves attended?',
        demo_answer: '92',
        impact: 'Sponsor Commitment moves to Green. People bucket improves.',
      },
      {
        id: 'pq5',
        criterion: 'P6_t04c1',
        bucket: 'Tech',
        signal: 'Security Posture',
        is_critical: true,
        question: 'What security framework does this programme operate under?',
        demo_answer: 'SOC 2 Type II certified',
        impact: 'Security Posture moves to Green. Tech bucket improves.',
      },
      {
        id: 'pq6',
        criterion: 'P6_pr03c1',
        bucket: 'Process',
        signal: 'Risk Management Health',
        is_critical: false,
        question: 'Is there a formal risk register with ratings and named owners?',
        demo_answer: 'Yes - formal register with all ratings and owners',
        impact: 'Risk Management Health strengthened.',
      },
      {
        id: 'pq7',
        criterion: 'P6_pl01c2',
        bucket: 'People',
        signal: 'Sponsor Commitment',
        is_critical: false,
        question: 'Average hours for COO Thomas Reeves to respond to escalations?',
        demo_answer: '24 hours',
        impact: 'Escalation response documented.',
      },
      {
        id: 'pq8',
        criterion: 'P6_pl05c2',
        bucket: 'People',
        signal: 'Stakeholder Alignment',
        is_critical: false,
        question: 'Are all key stakeholders formally aligned to the programme?',
        demo_answer: 'Aligned - majority',
        impact: 'Stakeholder alignment recorded.',
      },
      {
        id: 'pq9',
        criterion: 'P6_pl06c1',
        bucket: 'People',
        signal: 'Knowledge Transfer Readiness',
        is_critical: false,
        question: 'Is there a formal knowledge transfer plan for the IBM handover?',
        demo_answer: 'Yes - draft plan',
        impact: 'KT plan on file.',
      },
      {
        id: 'pq10',
        criterion: 'P6_st06c1',
        bucket: 'Strategy',
        signal: 'Exit and Kill Criteria',
        is_critical: false,
        question: 'Are formal kill criteria defined for this programme?',
        demo_answer: 'Yes - informal criteria',
        impact: 'Kill criteria partially satisfied.',
      },
    ],
  },
];

function buildScores(b4) {
  return {
    tech: toDisplayScore(b4.tech),
    process: toDisplayScore(b4.process),
    people: toDisplayScore(b4.people),
    strategy: toDisplayScore(b4.strategy),
  };
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Per-criterion 0–100 scores; means roll up to each signal, signals sit in the bucket band. */
function buildCriterionDisplayScores(projectId, bucketScores) {
  const out = {};
  TAXONOMY.forEach((tx) => {
    const b = bucketScores[tx.id];
    if (!Number.isFinite(b)) return;
    const bucketDisplay = toDisplayScore(b);
    (tx.signals || []).forEach((sg) => {
      const crits = sg.criteria || [];
      if (!crits.length) return;
      const n = crits.length;
      const sigJ = ((hashStr(`${projectId}|${sg.id}`) % 9) - 4) * 2; // -8..8
      const signalTarget = Math.max(5, Math.min(98, bucketDisplay + sigJ));
      const spreads = crits.map((c) => ((hashStr(`${projectId}|${c.id}`) % 11) - 5) * 2); // -10..10
      let displays = spreads.map((s) => signalTarget + s);
      displays = displays.map((d) => Math.max(5, Math.min(98, Math.round(d))));
      const avg = displays.reduce((a, b) => a + b, 0) / n;
      const adj = Math.round(signalTarget - avg);
      displays = displays.map((d, i) => (i === 0 ? Math.max(5, Math.min(98, d + adj)) : d));
      crits.forEach((c, i) => {
        out[c.id] = displays[i];
      });
    });
  });
  return out;
}

function signalRollupFromCriteria(project, txId, sg) {
  const ids = (sg.criteria || []).map((c) => c.id);
  if (!ids.length || !project.criterionScores) return project.scores[txId];
  const vals = ids.map((id) => project.criterionScores[id]).filter((v) => Number.isFinite(v));
  if (!vals.length) return project.scores[txId];
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function criterionDisplayScore(project, critId) {
  if (!project.criterionScores) return null;
  const v = project.criterionScores[critId];
  return Number.isFinite(v) ? v : null;
}

const PROJECTS = RAW_PROJECTS.map((raw) => {
  const scores = raw.scores || buildScores(raw.buckets4);
  const trend = trendFromAnchors(raw.trendAnchors);
  const criterionScores = buildCriterionDisplayScores(raw.id, scores);
  const {
    overall4,
    buckets4,
    trendAnchors,
    snapshotDates,
    programme_manager,
    primary_sponsor,
    sponsor_role,
    secondary_sponsor,
    secondary_role,
    description,
    vendor,
    last_evaluated,
    is_demo,
    score_after_questions4,
    pending_questions,
    coverage_pct,
    pending_count,
    active_connectors,
    pending_connectors,
    uploaded_documents,
    progression_note,
    keySignalsNote,
    exec_summary,
    signalEvidence,
    ...rest
  } = raw;
  return {
    ...rest,
    scores,
    trend,
    overall4: raw.overall4,
    buckets4: raw.buckets4,
    trendAnchors: trendAnchors || [],
    snapshotDates: snapshotDates || [],
    score: raw.score ?? toDisplayScore(raw.overall4),
    verdict: raw.verdict ?? verdictFor(toDisplayScore(raw.overall4)),
    company: COMPANY.name,
    programme_manager,
    primary_sponsor,
    sponsor_role,
    secondary_sponsor,
    secondary_role,
    description,
    vendor,
    last_evaluated,
    overall4,
    buckets4,
    is_demo: !!is_demo,
    score_after_questions4: score_after_questions4 ?? null,
    score_after_questions: score_after_questions4 != null ? toDisplayScore(score_after_questions4) : null,
    pending_questions: pending_questions || [],
    coverage_pct: coverage_pct ?? null,
    pending_count: pending_count ?? null,
    active_connectors: active_connectors || [],
    pending_connectors: pending_connectors || [],
    uploaded_documents: uploaded_documents || [],
    progression_note: progression_note || null,
    progression: raw.progression || [],
    keySignalsNote: keySignalsNote || '',
    exec_summary: exec_summary || null,
    executive_card: raw.executive_card || null,
    signalEvidence: signalEvidence || {},
    criterionScores,
    current_signals: ((typeof PROJECT_SIGNALS !== 'undefined'
      ? PROJECT_SIGNALS[raw.id]
      : []) || []).map((s) => ({
      ...s,
      result_label:
        veritySignalLabelFromCriteriaAverage(s)
        ?? verityLabelFromCriterionResult(s.result),
    })),
    buckets: raw.current?.buckets || {},
  };
});

function topDragSignals(projects) {
  const list = projects || PROJECTS;
  const at_risk = list.filter((p) => p.verdict !== 'accelerate');
  if (at_risk.length === 0) {
    return TAXONOMY.map((tx) => ({ id: tx.id, name: tx.name, avg: 0, count: 0 }));
  }
  return TAXONOMY.map((tx) => {
    const avg = at_risk.reduce((s, p) => s + p.scores[tx.id], 0) / at_risk.length;
    const count = at_risk.filter((p) => p.scores[tx.id] < 50).length;
    return { id: tx.id, name: tx.name, avg: Math.round(avg), count };
  }).sort((a, b) => a.avg - b.avg);
}

function trendOverTime(projects) {
  const list = projects || PROJECTS;
  const weeks = 9;
  return Array.from({ length: weeks }, (_, w) => {
    const tally = { accelerate: 0, rescue: 0, kill: 0 };
    list.forEach((p) => {
      const v = verdictFor(p.trend[w]);
      tally[v]++;
    });
    return { week: w, ...tally };
  });
}

window.VS = {
  COMPANY,
  CRITERION_DEFINITIONS,
  PORTFOLIO_INTELLIGENCE,
  TAXONOMY,
  VERDICTS,
  PROJECTS,
  toDisplayScore,
  verdictFor,
  verityLabelFromScore100,
  verityLabelFromCriterionResult,
  topDragSignals,
  trendOverTime,
  signalRollupFromCriteria,
  criterionDisplayScore,
};

window.VS.SIGNAL_GROUPS = SIGNAL_GROUPS;
window.VS.groupScore = groupScore;
