export type TimeRange = '7d' | '30d' | '90d'

export type DashboardDataset = {
  overall: {
    score: number
    delta: number
    benchmark: number
    label: string
    summary: string
  }
  metrics: Array<{
    title: string
    value: string
    impact: string
    trend: 'up' | 'down' | 'stable'
    delta: string
    status: 'healthy' | 'watch' | 'risk'
    sparkline: number[]
  }>
  flow: Array<{
    label: string
    value: string
    impact: string
    description: string
  }>
  severity: Array<{
    label: string
    value: number
    color: string
  }>
  findings: Array<{
    title: string
    severity: 'High' | 'Medium' | 'Low'
    count: number
    gain: string
    owner: string
    eta: string
    recommendation: string
  }>
  recommendations: Array<{
    title: string
    summary: string
    impact: string
    timeframe: string
  }>
  comparison: Array<{
    name: string
    current: number
    previous: number
  }>
  compliance: Array<{
    title: string
    status: string
    detail: string
  }>
  collaborators: Array<{
    name: string
    role: string
  }>
}

export const dashboardData: Record<TimeRange, DashboardDataset> = {
  '7d': {
    overall: {
      score: 86,
      delta: 8,
      benchmark: 79,
      label: 'Enterprise-ready',
      summary: 'Prompt rigor and remediation speed improved after rolling out shared audit playbooks.',
    },
    metrics: [
      {
        title: 'Prompt quality',
        value: '84',
        impact: '30% impact',
        trend: 'up',
        delta: '+6',
        status: 'healthy',
        sparkline: [62, 68, 71, 74, 78, 82, 84],
      },
      {
        title: 'Audit coverage',
        value: '22',
        impact: '25% impact',
        trend: 'up',
        delta: '+4',
        status: 'healthy',
        sparkline: [12, 13, 15, 17, 18, 20, 22],
      },
      {
        title: 'Session quality',
        value: '91%',
        impact: '20% impact',
        trend: 'stable',
        delta: '+1',
        status: 'healthy',
        sparkline: [86, 88, 87, 89, 90, 91, 91],
      },
      {
        title: 'Prompt throughput',
        value: '376',
        impact: '25% impact',
        trend: 'down',
        delta: '-3%',
        status: 'watch',
        sparkline: [420, 412, 408, 401, 394, 382, 376],
      },
    ],
    flow: [
      {
        label: 'Audits',
        value: '22',
        impact: 'Coverage +25%',
        description: 'Merged PR reviews and design reviews tracked this week.',
      },
      {
        label: 'Sessions',
        value: '30',
        impact: 'Context +20%',
        description: 'Team copilots aligned to shared prompt templates.',
      },
      {
        label: 'Prompts',
        value: '376',
        impact: 'Signal +25%',
        description: 'Prompt library expansion raised analysis confidence.',
      },
      {
        label: 'Quality score',
        value: '86',
        impact: 'Primary KPI',
        description: 'Weighted model across clarity, governance, and shipping quality.',
      },
    ],
    severity: [
      { label: 'High', value: 14, color: '#f97316' },
      { label: 'Medium', value: 21, color: '#facc15' },
      { label: 'Low', value: 29, color: '#10b981' },
    ],
    findings: [
      {
        title: 'Low-context prompts in security audits',
        severity: 'High',
        count: 8,
        gain: '+4 score',
        owner: 'Platform Security',
        eta: '2 days',
        recommendation: 'Preload audit prompts with repo risk profile and threat model excerpts.',
      },
      {
        title: 'Inconsistent rollback planning',
        severity: 'High',
        count: 6,
        gain: '+3 score',
        owner: 'Release Engineering',
        eta: '3 days',
        recommendation: 'Require rollback notes in all deployment-related session templates.',
      },
      {
        title: 'Sparse acceptance criteria in refactor sessions',
        severity: 'Medium',
        count: 12,
        gain: '+2 score',
        owner: 'Developer Experience',
        eta: '1 day',
        recommendation: 'Ship a quick-win checklist for success metrics before coding starts.',
      },
    ],
    recommendations: [
      {
        title: 'Launch prompt rubric autofill',
        summary: 'Auto-populate clarity, data source, and rollback sections when starting enterprise audits.',
        impact: 'Fastest path to +4 points',
        timeframe: 'This sprint',
      },
      {
        title: 'Compare failing audits to top performers',
        summary: 'Use previous audit benchmarks to spotlight regressions before they hit compliance review.',
        impact: 'Cuts rework by 18%',
        timeframe: '2 weeks',
      },
      {
        title: 'Share high-severity watchlist',
        summary: 'Route critical anti-patterns into Slack/Teams channels with owners and due dates.',
        impact: 'Improves remediation SLA',
        timeframe: 'Today',
      },
    ],
    comparison: [
      { name: 'Quality score', current: 86, previous: 78 },
      { name: 'Prompt quality', current: 84, previous: 76 },
      { name: 'Remediation speed', current: 72, previous: 61 },
      { name: 'Governance coverage', current: 89, previous: 85 },
    ],
    compliance: [
      {
        title: 'SOC 2 control mapping',
        status: '98% mapped',
        detail: 'Only one new prompt template is pending evidence linkage.',
      },
      {
        title: 'PII handling policy',
        status: 'Compliant',
        detail: 'No prompt leakage or insecure context forwarding detected.',
      },
      {
        title: 'Model governance review',
        status: 'Due tomorrow',
        detail: 'Comparison pack is ready for reviewers to approve.',
      },
    ],
    collaborators: [
      { name: 'SK', role: 'Lead auditor' },
      { name: 'AR', role: 'Prompt engineer' },
      { name: 'MJ', role: 'Compliance' },
    ],
  },
  '30d': {
    overall: {
      score: 81,
      delta: 5,
      benchmark: 77,
      label: 'Improving steadily',
      summary: 'Four-week trend shows healthier review loops with a small throughput dip on complex audits.',
    },
    metrics: [
      {
        title: 'Prompt quality',
        value: '79',
        impact: '30% impact',
        trend: 'up',
        delta: '+9',
        status: 'healthy',
        sparkline: [58, 61, 66, 69, 72, 76, 79],
      },
      {
        title: 'Audit coverage',
        value: '74',
        impact: '25% impact',
        trend: 'up',
        delta: '+11%',
        status: 'healthy',
        sparkline: [51, 56, 59, 63, 66, 70, 74],
      },
      {
        title: 'Session quality',
        value: '88%',
        impact: '20% impact',
        trend: 'up',
        delta: '+5',
        status: 'healthy',
        sparkline: [76, 78, 81, 82, 84, 86, 88],
      },
      {
        title: 'Prompt throughput',
        value: '1.2k',
        impact: '25% impact',
        trend: 'stable',
        delta: '+1%',
        status: 'watch',
        sparkline: [860, 930, 980, 1040, 1110, 1160, 1200],
      },
    ],
    flow: [
      {
        label: 'Audits',
        value: '74',
        impact: 'Coverage +25%',
        description: 'Portfolio-wide AI reviews across product, infra, and security teams.',
      },
      {
        label: 'Sessions',
        value: '132',
        impact: 'Context +20%',
        description: 'Shared session briefs improved downstream answer quality.',
      },
      {
        label: 'Prompts',
        value: '1.2k',
        impact: 'Signal +25%',
        description: 'Usage is healthy, but still clustered around fewer critical workflows.',
      },
      {
        label: 'Quality score',
        value: '81',
        impact: 'Primary KPI',
        description: 'Balanced gains in prompt hygiene and governance maturity.',
      },
    ],
    severity: [
      { label: 'High', value: 22, color: '#f97316' },
      { label: 'Medium', value: 31, color: '#facc15' },
      { label: 'Low', value: 40, color: '#10b981' },
    ],
    findings: [
      {
        title: 'Governance metadata omitted in architecture reviews',
        severity: 'High',
        count: 10,
        gain: '+3 score',
        owner: 'Architecture Council',
        eta: '4 days',
        recommendation: 'Inject compliance labels into design review prompts by default.',
      },
      {
        title: 'Weak escalation language in incident prompts',
        severity: 'Medium',
        count: 14,
        gain: '+2 score',
        owner: 'SRE',
        eta: '2 days',
        recommendation: 'Add clear severity-based responders and action windows in prompt kits.',
      },
      {
        title: 'Prompt duplication across teams',
        severity: 'Low',
        count: 18,
        gain: '+1 score',
        owner: 'Enablement',
        eta: '1 week',
        recommendation: 'Consolidate similar templates into a governed enterprise library.',
      },
    ],
    recommendations: [
      {
        title: 'Promote benchmark prompts to default templates',
        summary: 'Surface top-performing prompts directly in audit entry flows.',
        impact: 'Speeds adoption of best practices',
        timeframe: 'This sprint',
      },
      {
        title: 'Add review reminders for compliance owners',
        summary: 'Nudge reviewers when high-severity findings stay open beyond SLA.',
        impact: 'Tighter governance response times',
        timeframe: 'This week',
      },
      {
        title: 'Expand comparison mode to team slices',
        summary: 'Let leaders contrast platform, app, and security audits without leaving the overview.',
        impact: 'Better leadership reporting',
        timeframe: 'Next sprint',
      },
    ],
    comparison: [
      { name: 'Quality score', current: 81, previous: 76 },
      { name: 'Prompt quality', current: 79, previous: 70 },
      { name: 'Remediation speed', current: 68, previous: 60 },
      { name: 'Governance coverage', current: 84, previous: 80 },
    ],
    compliance: [
      {
        title: 'ISO 27001 evidence coverage',
        status: 'Healthy',
        detail: 'All critical prompt workflows have linked evidence trails.',
      },
      {
        title: 'Human-in-the-loop approvals',
        status: '91% complete',
        detail: 'Remaining gap is confined to lower-risk experimentation sessions.',
      },
      {
        title: 'Third-party model review',
        status: 'In progress',
        detail: 'Comparison snapshots prepared for governance board review.',
      },
    ],
    collaborators: [
      { name: 'SK', role: 'Lead auditor' },
      { name: 'LT', role: 'SRE' },
      { name: 'CP', role: 'Risk analyst' },
    ],
  },
  '90d': {
    overall: {
      score: 76,
      delta: 3,
      benchmark: 74,
      label: 'Foundation established',
      summary: 'Quarter-long view shows strong governance gains with remaining room in prompt standardization.',
    },
    metrics: [
      {
        title: 'Prompt quality',
        value: '73',
        impact: '30% impact',
        trend: 'up',
        delta: '+12',
        status: 'watch',
        sparkline: [48, 52, 58, 61, 66, 70, 73],
      },
      {
        title: 'Audit coverage',
        value: '183',
        impact: '25% impact',
        trend: 'up',
        delta: '+28%',
        status: 'healthy',
        sparkline: [96, 108, 120, 138, 152, 170, 183],
      },
      {
        title: 'Session quality',
        value: '83%',
        impact: '20% impact',
        trend: 'up',
        delta: '+8',
        status: 'healthy',
        sparkline: [64, 67, 71, 74, 77, 80, 83],
      },
      {
        title: 'Prompt throughput',
        value: '3.9k',
        impact: '25% impact',
        trend: 'up',
        delta: '+16%',
        status: 'healthy',
        sparkline: [2100, 2300, 2550, 2890, 3210, 3560, 3900],
      },
    ],
    flow: [
      {
        label: 'Audits',
        value: '183',
        impact: 'Coverage +25%',
        description: 'Enterprise onboarding expanded the audit footprint quarter over quarter.',
      },
      {
        label: 'Sessions',
        value: '488',
        impact: 'Context +20%',
        description: 'Collaboration patterns are becoming more standardized.',
      },
      {
        label: 'Prompts',
        value: '3.9k',
        impact: 'Signal +25%',
        description: 'Prompt library usage now supports richer benchmark comparisons.',
      },
      {
        label: 'Quality score',
        value: '76',
        impact: 'Primary KPI',
        description: 'Healthy trajectory with the biggest opportunity in prompt standardization.',
      },
    ],
    severity: [
      { label: 'High', value: 37, color: '#f97316' },
      { label: 'Medium', value: 52, color: '#facc15' },
      { label: 'Low', value: 66, color: '#10b981' },
    ],
    findings: [
      {
        title: 'Legacy prompt templates missing governance clauses',
        severity: 'High',
        count: 16,
        gain: '+5 score',
        owner: 'AI Enablement',
        eta: '2 weeks',
        recommendation: 'Retire outdated prompts and force migration to governed templates.',
      },
      {
        title: 'Cross-team terminology drift',
        severity: 'Medium',
        count: 19,
        gain: '+2 score',
        owner: 'PMO',
        eta: '1 week',
        recommendation: 'Publish a shared language pack for review goals and exit criteria.',
      },
      {
        title: 'Manual export requests slowing governance reviews',
        severity: 'Low',
        count: 24,
        gain: '+1 score',
        owner: 'Operations',
        eta: '3 days',
        recommendation: 'Make audit packets self-serve from the export workflow.',
      },
    ],
    recommendations: [
      {
        title: 'Mandate governed starter prompts',
        summary: 'Replace ad hoc prompt beginnings with curated enterprise defaults.',
        impact: 'Largest quality gain this quarter',
        timeframe: 'This month',
      },
      {
        title: 'Scale team scorecards',
        summary: 'Publish score breakdowns for each function with high-severity backlog highlights.',
        impact: 'Improves executive reporting',
        timeframe: 'Next month',
      },
      {
        title: 'Automate governance export bundles',
        summary: 'Create repeatable packets for compliance and customer assurance reviews.',
        impact: 'Saves analyst time weekly',
        timeframe: '2 weeks',
      },
    ],
    comparison: [
      { name: 'Quality score', current: 76, previous: 73 },
      { name: 'Prompt quality', current: 73, previous: 61 },
      { name: 'Remediation speed', current: 64, previous: 57 },
      { name: 'Governance coverage', current: 82, previous: 74 },
    ],
    compliance: [
      {
        title: 'Audit evidence retention',
        status: 'On track',
        detail: 'Retention coverage meets the governance baseline for all tracked audits.',
      },
      {
        title: 'Restricted data controls',
        status: 'Reviewed weekly',
        detail: 'Security teams confirmed prompt guardrails for sensitive repositories.',
      },
      {
        title: 'Executive governance brief',
        status: 'Scheduled',
        detail: 'Quarterly comparison mode is ready for leadership readout.',
      },
    ],
    collaborators: [
      { name: 'SK', role: 'Lead auditor' },
      { name: 'NM', role: 'Program manager' },
      { name: 'QA', role: 'Governance' },
    ],
  },
}
