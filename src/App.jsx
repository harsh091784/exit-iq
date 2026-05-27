import { useState, useEffect } from 'react';
import { 
  Home, 
  Briefcase, 
  TrendingUp, 
  Shield, 
  Target, 
  Settings,
  Sparkles,
  Users,
  Clock,
  AlertTriangle,
  Calendar,
  AlertCircle,
  Activity,
  CheckCircle2,
  Search,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Brain,
  Cpu,
  DollarSign,
  X,
  LogOut,
  Globe
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ScatterChart,
  Scatter,
  ReferenceArea,
  Cell
} from 'recharts';
import './App.css';
import conditorLogo from './assets/conditor_capital_logo.png';
import pptxgen from 'pptxgenjs';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, badge: false },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase, badge: false },
  { id: 'exit-signals', label: 'Exit Signals', icon: TrendingUp, badge: true },
  { id: 'market-intel', label: 'Market Intelligence', icon: Globe, badge: false },
  { id: 'ai-disruption', label: 'AI Disruption Risk', icon: Shield, badge: false },
  { id: 'exit-recommender', label: 'Exit Recommender', icon: Target, badge: false },
  { id: 'settings', label: 'Settings', icon: Settings, badge: false },
];

const chartData = [
  { month: 'Jan 24', irr: 18, score: 42 },
  { month: 'Mar 24', irr: 19, score: 45 },
  { month: 'May 24', irr: 21, score: 48 },
  { month: 'Jul 24', irr: 20, score: 44 },
  { month: 'Sep 24', irr: 22, score: 50 },
  { month: 'Nov 24', irr: 24, score: 55 },
  { month: 'Jan 25', irr: 23, score: 58 },
  { month: 'Mar 25', irr: 25, score: 60 },
  { month: 'May 25', irr: 26, score: 65 },
  { month: 'Jul 25', irr: 24, score: 62 },
  { month: 'Sep 25', irr: 27, score: 68 },
  { month: 'Dec 25', irr: 28, score: 72 },
];

const portfolioData = [
  { company: 'TechVentures Ltd', sector: 'Technology', entryYear: 2021, holdPeriod: '3.2 yrs', irr: '24%', exitScore: 82, aiRisk: 'High', status: 'Active' },
  { company: 'HealthBridge Group', sector: 'Healthcare', entryYear: 2020, holdPeriod: '4.8 yrs', irr: '31%', exitScore: 67, aiRisk: 'Low', status: 'Ready to Exit' },
  { company: 'RetailCore PLC', sector: 'Retail', entryYear: 2019, holdPeriod: '5.4 yrs', irr: '18%', exitScore: 45, aiRisk: 'Medium', status: 'Under Review' },
  { company: 'LogiFlow Systems', sector: 'Logistics', entryYear: 2022, holdPeriod: '2.1 yrs', irr: '14%', exitScore: 38, aiRisk: 'Low', status: 'Active' },
  { company: 'EduPrime Ltd', sector: 'Education', entryYear: 2021, holdPeriod: '3.6 yrs', irr: '22%', exitScore: 76, aiRisk: 'High', status: 'Ready to Exit' },
  { company: 'FinStack Corp', sector: 'Fintech', entryYear: 2020, holdPeriod: '4.2 yrs', irr: '28%', exitScore: 59, aiRisk: 'Medium', status: 'Active' },
  { company: 'MediCore Solutions', sector: 'Healthcare', entryYear: 2022, holdPeriod: '2.8 yrs', irr: '19%', exitScore: 41, aiRisk: 'Low', status: 'Active' },
  { company: 'CloudBridge Ltd', sector: 'Technology', entryYear: 2019, holdPeriod: '5.9 yrs', irr: '33%', exitScore: 88, aiRisk: 'High', status: 'Exit Imminent' },
  { company: 'GreenPath Energy', sector: 'Energy', entryYear: 2021, holdPeriod: '3.4 yrs', irr: '21%', exitScore: 52, aiRisk: 'Low', status: 'Active' },
  { company: 'PropTech Ventures', sector: 'Real Estate', entryYear: 2020, holdPeriod: '4.6 yrs', irr: '26%', exitScore: 63, aiRisk: 'Medium', status: 'Under Review' },
  { company: 'AutoLogic Systems', sector: 'Manufacturing', entryYear: 2018, holdPeriod: '6.8 yrs', irr: '29%', exitScore: 71, aiRisk: 'High', status: 'Ready to Exit' },
  { company: 'DataSphere Inc', sector: 'Technology', entryYear: 2022, holdPeriod: '2.4 yrs', irr: '17%', exitScore: 34, aiRisk: 'Medium', status: 'Active' },
];

const signalCardsData = [
  {
    company: 'TechVentures Ltd',
    score: 82,
    exitType: 'Strategic Sale',
    reasons: [
      'Acquirer outreach initiated by two tier-1 enterprise software incumbents.',
      'Generative AI coding assistants integrated, reducing dev cycle time by 45%.',
      'Legacy seat-based licensing contracts face renewal pricing pressure from LLM alternatives.'
    ]
  },
  {
    company: 'HealthBridge Group',
    score: 67,
    exitType: 'Strategic Sale',
    reasons: [
      'Payer integration platform scaling completed, expanding addressable patient network.',
      'EBITDA margins increased to 28% following regional administrative consolidation.',
      'New healthcare compliance laws will require database storage updates next fiscal year.'
    ]
  },
  {
    company: 'RetailCore PLC',
    score: 45,
    exitType: 'Sponsor-to-Sponsor',
    reasons: [
      'Digital storefront automation completed, offsetting 12% of retail store wage increases.',
      'Secondary buyout inquiries received from consumer-focused mid-market sponsors.',
      'Supply chain logistics costs elevated due to international shipping delays.'
    ]
  },
  {
    company: 'LogiFlow Systems',
    score: 38,
    exitType: 'Strategic Sale',
    reasons: [
      'Warehouse automation pilot completed in main distribution hub, boosting throughput.',
      'Fuel surcharge adjustments successfully passed down to major enterprise clients.',
      'High interest rates limit debt-leveraged acquisition bids from mid-tier sponsors.'
    ]
  },
  {
    company: 'EduPrime Ltd',
    score: 76,
    exitType: 'Sponsor-to-Sponsor',
    reasons: [
      'Severe retention drop in consumer subscription tier due to free LLM tutoring solutions.',
      'SG&A costs reduced by 15% via non-technical corporate hiring freeze.',
      'Consolidation discussions initiated by global educational services platform.'
    ]
  },
  {
    company: 'FinStack Corp',
    score: 59,
    exitType: 'Sponsor-to-Sponsor',
    reasons: [
      'Native agentic payments routing pilot launched, lowering processing costs.',
      'Tech valuation multiples adjusting downward in the regional growth fintech space.',
      'Anticipated interest rate cuts expected to unlock sponsor secondary buyout volume.'
    ]
  },
  {
    company: 'MediCore Solutions',
    score: 41,
    exitType: 'Strategic Sale',
    reasons: [
      'Consistent LTM cash flows de-risk operational performance during exit planning.',
      'Anticipated clinic expansions postponed due to high debt servicing costs.',
      'Stable service demand shields core margins from technological disruptors.'
    ]
  },
  {
    company: 'CloudBridge Ltd',
    score: 88,
    exitType: 'Strategic Sale',
    reasons: [
      'Strategic buyers actively bidding to acquire mature cloud infrastructure architecture.',
      'Valuation multiples shifting from historical SaaS recurring multiples to utility metrics.',
      'Engineering retention bonuses implemented to prevent AI startup departures.'
    ]
  },
  {
    company: 'GreenPath Energy',
    score: 52,
    exitType: 'Strategic Sale',
    reasons: [
      'EBITDA growth supported by long-term power purchase agreements.',
      'Infrastructure funding inquiries received from infrastructure and ESG-focused PE funds.',
      'High capital expenditures required for next phase grid connections.'
    ]
  },
  {
    company: 'PropTech Ventures',
    score: 63,
    exitType: 'Sponsor-to-Sponsor',
    reasons: [
      'AI-driven commercial property valuation engine integrated into customer portal.',
      'Secondary interest rising from real estate technology platforms.',
      'Refinancing deadlines approaching for junior debt tranches in Q1 2027.'
    ]
  },
  {
    company: 'AutoLogic Systems',
    score: 71,
    exitType: 'IPO',
    reasons: [
      'Robotic assembly automation completed, increasing production yield by 30%.',
      'Auto parts design timeline reduced by 50% using generative CAD tools.',
      'Legacy auto clients demand pricing cuts as software-defined components mature.'
    ]
  },
  {
    company: 'DataSphere Inc',
    score: 34,
    exitType: 'Strategic Sale',
    reasons: [
      'Stable recurring revenue base provides valuation cushion against tech multiple shifts.',
      'R&D expenditures increased by 20% to upgrade legacy database integrations.',
      'Bilateral discussions ongoing with industrial database consolidators.'
    ]
  }
];

const scatterData = [
  { name: 'TechVentures Ltd', exposure: 82, exitMonths: 8, risk: 'High' },
  { name: 'HealthBridge Group', exposure: 35, exitMonths: 18, risk: 'Low' },
  { name: 'RetailCore PLC', exposure: 65, exitMonths: 12, risk: 'Medium' },
  { name: 'LogiFlow Systems', exposure: 20, exitMonths: 30, risk: 'Low' },
  { name: 'EduPrime Ltd', exposure: 75, exitMonths: 6, risk: 'High' },
  { name: 'FinStack Corp', exposure: 45, exitMonths: 24, risk: 'Medium' },
  { name: 'MediCore Solutions', exposure: 28, exitMonths: 28, risk: 'Low' },
  { name: 'CloudBridge Ltd', exposure: 88, exitMonths: 4, risk: 'High' },
  { name: 'GreenPath Energy', exposure: 15, exitMonths: 32, risk: 'Low' },
  { name: 'PropTech Ventures', exposure: 52, exitMonths: 20, risk: 'Medium' },
  { name: 'AutoLogic Systems', exposure: 70, exitMonths: 10, risk: 'High' },
  { name: 'DataSphere Inc', exposure: 48, exitMonths: 26, risk: 'Medium' }
];

const getMockClaudeResponse = (company) => {
  const name = company.company || company.name;
  if (name.includes('TechVentures')) {
    return `### Exit Timing Analysis: TechVentures Ltd

**(1) Exit Readiness Score:** 38 / 100 (Critical Action Required)
**(2) Recommended Exit Type:** Strategic Sale (Acqui-hire / IP Carveout)
**(3) Optimal Exit Window:** Q3 2026 (Urgent, within 6 months)

**(4) Top 3 Risks of Delaying Exit:**
- **Product Obsolescence:** Direct competitors have integrated proprietary LLMs, cutting client workflows by 60% and threatening core renewals.
- **Talent Attrition:** Key software engineers are receiving high-comp offers from VC-funded AI orchestration startups.
- **Multiple Compression:** Valuation multiples are shifting rapidly from historical SaaS recurring multiples to pay-per-token utility metrics.

**(5) Top 3 Reasons to Exit Now:**
- **Historical EBITDA:** Last 12 months show strong legacy financials, maintaining high current valuation baseline.
- **Incumbent Interest:** Non-AI native tech incumbents are actively acquiring mature SaaS architectures to secure legacy customer codebases.
- **De-risking Capital:** Releasing liquidity now preserves LP return thresholds before margin degradation manifests in upcoming contract renewals.`;
  }

  if (name.includes('HealthBridge')) {
    return `### Exit Timing Analysis: HealthBridge Group

**(1) Exit Readiness Score:** 85 / 100 (Optimal Exit Window Open)
**(2) Recommended Exit Type:** Strategic Sale to Corporate Acquirer
**(3) Optimal Exit Window:** Q3 2026 (Immediate, within 90 days)

**(4) Top 3 Risks of Delaying Exit:**
- **Regulatory Headwinds:** Upcoming changes to healthcare data storage could increase compliance CapEx by 22% in the next fiscal year.
- **CapEx Overruns:** Next phase growth requires high database scaling investments, diluting exit IRR if done under current ownership.
- **PE Competition:** Two peer healthcare SaaS assets are preparing exits, threatening to dilute buyer interest pools.

**(5) Top 3 Reasons to Exit Now:**
- **Acquirer Inquiries:** 3 major strategic acquirers have completed pre-DD inquiries, signaling a competitive bidding process.
- **Peak Multiples:** Healthcare sector multiples are trading at 16.2x EBITDA, near historical highs.
- **Operational Outperformance:** Beat target EBITDA by 240 bps due to regional integration, establishing a pristine growth history.`;
  }

  if (name.includes('RetailCore')) {
    return `### Exit Timing Analysis: RetailCore PLC

**(1) Exit Readiness Score:** 74 / 100 (Secondary Window Open)
**(2) Recommended Exit Type:** Sponsor-to-Sponsor Secondary Buyout
**(3) Optimal Exit Window:** Q3 2026 (Next 6 months)

**(4) Top 3 Risks of Delaying Exit:**
- **Growth Saturation:** Digital channel expansion has reached maximum penetration under current mid-market playbook.
- **Consumer Squeeze:** Inflationary pressures could depress retail spending, impacting next year's forecast numbers.
- **Leverage Pressures:** Approaching refinancing deadline on junior debt tranches.

**(5) Top 3 Reasons to Exit Now:**
- **IRR Achieved:** Achieved 16% IRR ahead of initial 5-year thesis, allowing clean distribution to LPs.
- **PE Interest:** High dry powder levels in consumer-focused funds looking for stable secondary buyouts.
- **Platform Complete:** Digital infrastructure scaling is fully complete, presenting a turnkey platform for the next GP.`;
  }

  if (name.includes('Apex')) {
    return `### Exit Timing Analysis: Apex Logistics

**(1) Exit Readiness Score:** 58 / 100 (Tactical Sale Window Open)
**(2) Recommended Exit Type:** Strategic Sale (Consolidation)
**(3) Optimal Exit Window:** Q4 2026 (9-12 months)

**(4) Top 3 Risks of Delaying Exit:**
- **Consolidation Squeeze:** Regional consolidators are bidding up assets, leaving independent platforms exposed.
- **Fuel Margin Drag:** Pricing volatility threatens contract margins in the absence of EV fleet transitions.
- **Key Executive Succession:** Risk of exit advisory changes and key executive departures.

**(5) Top 3 Reasons to Exit Now:**
- **Integration Synergy:** Unified warehouse network is fully operational, maximizing buyer synergy multiples.
- **LinkedIn/Talent Signals:** Team metrics indicate alignment, making it an attractive operational package.
- **Stable Cashflows:** Pristine LTM cashflows de-risk execution during due diligence.`;
  }

  if (name.includes('EduPrime')) {
    return `### Exit Timing Analysis: EduPrime Ltd

**(1) Exit Readiness Score:** 35 / 100 (Immediate Action Required)
**(2) Recommended Exit Type:** Sponsor Carveout / Restructuring
**(3) Optimal Exit Window:** Q3 2026 (Immediate, 3-6 months)

**(4) Top 3 Risks of Delaying Exit:**
- **AI Tutoring Displacement:** Proliferation of free LLM tutors is directly eating into student subscription metrics.
- **Churn Acceleration:** LTM customer renewals have decreased by 35% due to alternative automation tool adoptions.
- **Content Redundancy:** Educational libraries are easily replaceable by customized real-time generative content.

**(5) Top 3 Reasons to Exit Now:**
- **Brand Value:** Brand equity remains respected, offering value for a larger consolidator.
- **Hiring Freeze Benefits:** Immediate SG&A cost savings from non-technical freezes support EBITDA margins.
- **Corporate Restructuring Opportunity:** Passing the asset to an operational sponsor allows private restructuring.`;
  }

  if (name.includes('FinStack') || name.includes('CloudScale') || name.includes('LogiFlow')) {
    return `### Exit Timing Analysis: ${name}

**(1) Exit Readiness Score:** 52 / 100 (Monitoring Phase)
**(2) Recommended Exit Type:** Sponsor-to-Sponsor Secondary Sale
**(3) Optimal Exit Window:** H1 2027 (12-18 months)

**(4) Top 3 Risks of Delaying Exit:**
- **AI Competitor Displacement:** Incipient fintech startups releasing native agentic products.
- **Valuation Multiple Shocks:** Tech valuations remain volatile as software multiples recalibrate.
- **Integration Delays:** Ongoing scaling of services requires higher CapEx budgets.

**(5) Top 3 Reasons to Exit Now:**
- **Consistent EBITDA:** Solid LTM performance proves resilience to early AI disruption signals.
- **Interest Rate Easing:** Anticipated rate cuts will expand sponsor bidding capacity.
- **Completed Tech Migration:** Cloud migration is finished, saving 18 months of infrastructure CapEx.`;
  }

  return `### Exit Timing Analysis: ${name}

**(1) Exit Readiness Score:** 60 / 100
**(2) Recommended Exit Type:** Strategic Sale / PE Secondary
**(3) Optimal Exit Window:** H2 2026 (6-12 months)

**(4) Top 3 Risks of Delaying Exit:**
- Technological displacement from native AI market entrants.
- Margin compression due to rising operational and labor costs.
- Reduced buyer liquidity if interest rates stay elevated.

**(5) Top 3 Reasons to Exit Now:**
- Achievement of current fund IRR hurdle rates.
- Strategic consolidator interest in regional asset footprints.
- Turnkey operations requiring minimal immediate CapEx.`;
};

const getMockFollowUpResponse = (company, question, history = []) => {
  const q = question.toLowerCase().trim();
  const name = company.company || company.name || 'this portfolio company';
  const sector = company.sector || 'Technology';
  const risk = company.aiRisk || company.risk || 'Medium';
  const irr = company.irr || '20%';
  const hold = company.holdPeriod || '4.0 yrs';

  const assistantMsgCount = history.filter(m => m.role === 'assistant').length;

  // 1. "Why face this problem?" / "Why are they facing this?" / Rationale
  if (q.includes('why') || q.includes('cause') || q.includes('reason') || q.includes('happen') || q.includes('source') || q.includes('problem')) {
    if (risk.toUpperCase() === 'HIGH') {
      return `For ${name}, the core vulnerability is driven by rapid LLM-based competitors and customer workflow automation. In the ${sector} sector, entry barriers are dropping, which threatens ${name}'s seat-based pricing model. This is why immediate exit planning is recommended before multiple contraction occurs.`;
    } else if (risk.toUpperCase() === 'MEDIUM') {
      return `For ${name}, technological exposure is moderate but accelerating. Competitors are actively integrating AI capabilities into their core platforms, which forces ${name} to increase R&D expenditures to maintain pricing power. This eats into operating margins and dampens the exit multiple.`;
    } else {
      return `While ${name} is relatively insulated from direct AI substitution, market valuations in the ${sector} sector are shifting. Acquirers are demanding proof of digital efficiency, which requires minor product enhancements. The threat is low, but multiple defense remains important.`;
    }
  }

  // 2. "What should they do?" / "action" / "mitigate" / "how" / "steps"
  if (q.includes('should they do') || q.includes('action') || q.includes('mitigate') || q.includes('what to do') || q.includes('strategy') || q.includes('steps') || q.includes('what should we do') || q.includes('do now')) {
    if (risk.toUpperCase() === 'HIGH') {
      return `We recommend three immediate actions for ${name}:
1. **Carve out non-core units** to present a lean, tech-enabled enterprise to potential strategic buyers.
2. **Initiate confidential buyer outreach** targeting the top 3 strategic consolidators who value the proprietary datasets.
3. **Transition pricing** from seat-based to usage/consumption metrics to defend short-term customer retention.`;
    } else {
      return `To maximize exit value for ${name}, the GP should:
1. **Optimize operating margins** through selective offshore vendor automation.
2. **Prepare a clear transition narrative** highlighting how a strategic buyer can leverage AI integrations.
3. **Run a targeted bilateral process** rather than a wide auction to preserve valuation leverage.`;
    }
  }

  // 3. "Apart from this" / "what else" / "other" / "additional" / "besides"
  if (q.includes('apart from this') || q.includes('what else') || q.includes('other') || q.includes('additional') || q.includes('besides') || q.includes('further')) {
    if (assistantMsgCount === 1) {
      return `Additionally, we must monitor the macroeconomic backdrop. With the current interest rate environment, leverage capacity for traditional sponsor buyers is constrained. Therefore, a trade sale to a corporate buyer (who can fund from balance sheet cash) is highly preferred over a secondary buyout.`;
    } else if (assistantMsgCount === 2) {
      return `Another key factor is talent retention. During the exit transition, key data scientists and product managers in the ${sector} division must be locked in with retention bonuses. A churn in the engineering leadership team during due diligence could cause a 15-20% valuation write-down.`;
    } else {
      return `Finally, we should consider a partial secondary sale or a dividend recapitalization. If a full trade sale is delayed by regulatory reviews, recapitalizing the debt structure at ${name} would allow the fund to return partial capital to LPs while retaining upside.`;
    }
  }

  // 4. "Buyer" / "acquirer"
  if (q.includes('buyer') || q.includes('acquirer') || q.includes('who') || q.includes('purchas')) {
    return `For ${name}, the primary acquirer profiles consist of:
1. **Strategic Corporate Acquirers:** Industry consolidators seeking to absorb ${name}'s customer base and eliminate redundant administrative costs.
2. **Growth PE Sponsors:** Secondary buyouts funds with dedicated digital transformation teams that can finance a 3-year replatforming effort.
3. **Sovereign/Pension Funds:** Yield-focused long-term capital looking for stable, recurring cash flows in ${sector}.`;
  }
  
  // 5. "IRR" / "multiple" / "valuation" / "financial"
  if (q.includes('irr') || q.includes('multiple') || q.includes('valuation') || q.includes('financial') || q.includes('ebitda')) {
    return `Regarding ${name}'s financials:
- Current IRR is tracking at ${irr}.
- Hold period of ${hold} is approaching the fund's optimal liquidation horizon.
- Multiple expansion is unlikely under current market sentiment; thus, exit timing should prioritize velocity over waiting for peak multiples.`;
  }

  // 6. "Risk" / "threat" / "danger" / "vulner"
  if (q.includes('risk') || q.includes('threat') || q.includes('danger') || q.includes('vulner') || q.includes('expos')) {
    return `The chief risk factor for ${name} is that its core revenue model is exposed to technological displacement. The ${risk} AI risk assessment indicates that clients are starting to pilot low-cost automated alternatives. Strategic sale execution within the next 6-12 months is the recommended risk mitigation.`;
  }

  // 7. General follow-up / Default responses to rotate context
  if (assistantMsgCount === 0) {
    return `Regarding exit positioning for ${name}: We recommend proceeding with the preparation of marketing materials for a targeted auction. Delaying past the optimal exit window risks valuation degradation. Would you like me to detail the proposed buyer outreach list or the operational risks?`;
  } else if (assistantMsgCount === 1) {
    return `In addition to the timing recommendation, we advise running a pre-due diligence technology audit. This will identify any undocumented software dependencies and reassure potential acquirers of ${name}'s intellectual property robustness.`;
  } else {
    return `To support the divestment committee review, we can prepare a comprehensive memo detailing the trade buyer outreach strategy and comparable transaction multiples. Let me know if you would like to run another scenario.`;
  }
};

const getBuyerUniverseData = (companyName) => {
  const name = companyName || '';
  
  if (name.includes('TechVentures')) {
    return [
      {
        type: 'Strategic Acquirer',
        name: 'Microsoft / Google',
        score: 87,
        rationale: 'AI capability acquisition play',
        appetite: '$500M–$2B'
      },
      {
        type: 'Financial Sponsor',
        name: 'KKR / Apax Partners',
        score: 71,
        rationale: 'Platform add-on strategy',
        appetite: '$200M–$800M'
      },
      {
        type: 'IPO',
        name: 'Public Markets (LSE/NYSE)',
        score: 45,
        rationale: 'Sector multiples compressed',
        appetite: 'Not recommended now'
      }
    ];
  }

  if (name.includes('HealthBridge')) {
    return [
      {
        type: 'Strategic Acquirer',
        name: 'UnitedHealth / HCA',
        score: 93,
        rationale: 'Regional clinic footprint expansion',
        appetite: '$800M–$2.5B'
      },
      {
        type: 'Financial Sponsor',
        name: 'Blackstone / Carlyle',
        score: 78,
        rationale: 'Sponsor carve-out opportunity',
        appetite: '$500M–$1.2B'
      },
      {
        type: 'IPO',
        name: 'Public Markets (Nasdaq)',
        score: 62,
        rationale: 'Healthcare sentiment positive',
        appetite: '$1.0B+ Float'
      }
    ];
  }

  if (name.includes('RetailCore')) {
    return [
      {
        type: 'Financial Sponsor',
        name: 'Sycamore / Roark Capital',
        score: 89,
        rationale: 'Operational efficiency restructuring',
        appetite: '$300M–$900M'
      },
      {
        type: 'Strategic Acquirer',
        name: 'Tesco / Walmart',
        score: 68,
        rationale: 'Digital supply chain absorption',
        appetite: '$400M–$1.5B'
      },
      {
        type: 'IPO',
        name: 'Public Markets (LSE)',
        score: 35,
        rationale: 'Retail multiples severely depressed',
        appetite: 'Not recommended now'
      }
    ];
  }

  if (name.includes('BioPharma')) {
    return [
      {
        type: 'IPO',
        name: 'Public Markets (Nasdaq)',
        score: 94,
        rationale: 'Hot sector clinical trial valuation premium',
        appetite: '$1.2B–$3.0B'
      },
      {
        type: 'Strategic Acquirer',
        name: 'Pfizer / Novartis',
        score: 82,
        rationale: 'Pipeline capability absorption play',
        appetite: '$1.5B–$4.0B'
      },
      {
        type: 'Financial Sponsor',
        name: 'Advent / EQT',
        score: 55,
        rationale: 'Late stage growth equity buy-in',
        appetite: '$400M–$1.0B'
      }
    ];
  }

  if (name.includes('Apex') || name.includes('LogiFlow') || name.includes('Logistics')) {
    return [
      {
        type: 'Strategic Acquirer',
        name: 'FedEx / DHL Group',
        score: 91,
        rationale: 'Cold-chain shipping network merger',
        appetite: '$600M–$1.8B'
      },
      {
        type: 'Financial Sponsor',
        name: 'Stonepeak / Brookfield',
        score: 80,
        rationale: 'Long-term infrastructure consolidator',
        appetite: '$400M–$1.2B'
      },
      {
        type: 'IPO',
        name: 'Public Markets',
        score: 50,
        rationale: 'Logistics multiples normalized',
        appetite: '$800M+ Float'
      }
    ];
  }

  if (name.includes('EduPrime')) {
    return [
      {
        type: 'Strategic Acquirer',
        name: 'Pearson / Wiley',
        score: 85,
        rationale: 'Digital content transition capability',
        appetite: '$200M–$600M'
      },
      {
        type: 'Financial Sponsor',
        name: 'Silver Lake / Thoma Bravo',
        score: 72,
        rationale: 'Edtech platform consolidation play',
        appetite: '$150M–$500M'
      },
      {
        type: 'IPO',
        name: 'Public Markets',
        score: 30,
        rationale: 'High AI disruption risk discount',
        appetite: 'Not recommended'
      }
    ];
  }

  // General Fallback
  return [
    {
      type: 'Strategic Acquirer',
      name: 'Trade Corporate Buyer',
      score: 82,
      rationale: 'Core operational synergy realization',
      appetite: 'Market Premium Multiple'
    },
    {
      type: 'Financial Sponsor',
      name: 'Mid-Market PE GP',
      score: 75,
      rationale: 'Secondary buyout platform strategy',
      appetite: '$150M–$500M Equity'
    },
    {
      type: 'IPO',
      name: 'Public Market listing',
      score: 55,
      rationale: 'Institutional investor capitalization',
      appetite: 'Scale dependent'
    }
  ];
};

const getMockExitRecommendation = (inputs) => {
  const name = inputs.companyName || 'Portfolio Company';
  const sector = inputs.sector || 'Technology';
  
  // Calculate recommended exit type based on inputs
  let exitType = 'Strategic Sale';
  let exitTypeRationale = '';
  let timingWindow = 'Immediate (3-6 months)';
  let timingRationale = '';
  let buyers = [];
  let riskIrr = inputs.targetIrr - 2;

  // AI risks checked
  const riskCount = (inputs.aiCompetitor ? 1 : 0) + 
                    (inputs.aiWorkforce ? 1 : 0) + 
                    (inputs.aiRevenue ? 1 : 0) + 
                    (inputs.aiManagement ? 1 : 0);

  // Determine exit type & rationale
  if (riskCount >= 3) {
    exitType = 'Strategic Sale';
    exitTypeRationale = `Due to severe AI disruption risks (${riskCount} signals active), securing immediate enterprise value through a strategic acquirer who can leverage legacy workflows is critical.`;
    timingWindow = 'Immediate (3-6 months)';
    timingRationale = `Accelerated exit timeline is highly advised before customer churn starts impacting baseline EBITDA numbers.`;
    riskIrr = (inputs.targetIrr * 0.75).toFixed(1);
  } else if (inputs.maActivity >= 70 && inputs.marketSentiment >= 70) {
    if (inputs.ebitda >= 40) {
      exitType = 'IPO';
      exitTypeRationale = `Strong EBITDA of £${inputs.ebitda}M combined with highly supportive market sentiment (${inputs.marketSentiment}/100) opens a viable window for an IPO listing.`;
      timingWindow = 'Q4 2026 (12 months)';
      timingRationale = `Allows preparation of IPO prospectus and stabilization of LTM run-rate revenue.`;
      riskIrr = (inputs.targetIrr * 1.05).toFixed(1);
    } else {
      exitType = 'Strategic Sale';
      exitTypeRationale = `Elevated M&A activity (${inputs.maActivity}/100) indicates an active consolidator universe willing to pay premium strategic multiples.`;
      timingWindow = 'Q3 2026 (Next 6 months)';
      timingRationale = `Optimal alignment of market liquidity and sector multiple valuations.`;
      riskIrr = (inputs.targetIrr * 0.95).toFixed(1);
    }
  } else if (inputs.interestRate === 'High') {
    exitType = 'Sponsor Carveout / Restructuring';
    exitTypeRationale = `High interest rate environment reduces traditional LBO leverage capacity. A corporate carveout or secondary restructuring is advised to optimize capital structures.`;
    timingWindow = 'H1 2027 (12-18 months)';
    timingRationale = `Defer exit until interest rates stabilize and debt capital markets improve bidding capacity.`;
    riskIrr = (inputs.targetIrr * 0.8).toFixed(1);
  } else {
    exitType = 'Sponsor-to-Sponsor';
    exitTypeRationale = `Stable market conditions and low-to-medium interest rates support traditional private equity leveraged buyouts from tier-1 secondary GPs.`;
    timingWindow = 'H2 2026 (6-12 months)';
    timingRationale = `Alignment with typical GP fundraising cycles and secondary buyout interest.`;
    riskIrr = (inputs.targetIrr * 0.9).toFixed(1);
  }

  // Set buyer list based on sector & exit type
  if (exitType === 'Strategic Sale') {
    buyers = [
      `Corporate buyers in the ${sector} industry looking for horizontal scaling.`,
      `Technology incumbents seeking to absorb core customer relationships.`,
      `Regional roll-up platforms financed by sovereign wealth funds.`
    ];
  } else if (exitType === 'IPO') {
    buyers = [
      `Institutional public market investors (mutual funds, pensions).`,
      `Anchor retail platforms via structured public listings.`,
      `Cross-border equity growth funds.`
    ];
  } else {
    buyers = [
      `Tier-1 mid-market private equity funds looking for secondary platforms.`,
      `Secondary growth buyout GPs with digital transformation capability.`,
      `Sovereign wealth co-investment structures.`
    ];
  }

  return `### Exit Recommender Diagnostics: ${name}

**(1) Recommended Exit Type:** ${exitType}
${exitTypeRationale}

**(2) Optimal Exit Window:** ${timingWindow}
${timingRationale}

**(3) Suggested Buyer Universe:**
- ${buyers[0]}
- ${buyers[1]}
- ${buyers[2]}

**(4) Risk-Adjusted IRR Projection:** ${riskIrr}%
Target IRR of ${inputs.targetIrr}% has been adjusted to ${riskIrr}% to reflect the drag of ${riskCount} active AI disruption risk factors and ${inputs.interestRate} interest rates.`;
};

const parseRecommendationText = (text) => {
  let exitType = '';
  let exitRationale = '';
  let exitWindow = '';
  let windowRationale = '';
  let buyers = [];
  let riskIrr = '';
  let irrRationale = '';

  if (!text) return { exitType, exitRationale, exitWindow, windowRationale, buyers, riskIrr, irrRationale };

  const lines = text.split('\n');
  let currentSection = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.includes('(1) Recommended Exit Type') || line.includes('Recommended Exit Type:')) {
      currentSection = 1;
      const clean = line.replace(/^\*+/, '').replace(/\*+$/, '').trim();
      exitType = clean.substring(clean.indexOf(':') + 1).trim();
      continue;
    } else if (line.includes('(2) Optimal Exit Window') || line.includes('Optimal Exit Window:')) {
      currentSection = 2;
      const clean = line.replace(/^\*+/, '').replace(/\*+$/, '').trim();
      exitWindow = clean.substring(clean.indexOf(':') + 1).trim();
      continue;
    } else if (line.includes('(3) Suggested Buyer Universe') || line.includes('Suggested Buyer Universe:') || line.includes('Buyer Universe:')) {
      currentSection = 3;
      continue;
    } else if (line.includes('(4) Risk-Adjusted IRR Projection') || line.includes('Risk-Adjusted IRR Projection:')) {
      currentSection = 4;
      const clean = line.replace(/^\*+/, '').replace(/\*+$/, '').trim();
      riskIrr = clean.substring(clean.indexOf(':') + 1).trim();
      continue;
    }

    if (currentSection === 1) {
      exitRationale += (exitRationale ? ' ' : '') + line;
    } else if (currentSection === 2) {
      windowRationale += (windowRationale ? ' ' : '') + line;
    } else if (currentSection === 3) {
      if (line.startsWith('-') || line.startsWith('*') || /^\d+\./.test(line)) {
        buyers.push(line.replace(/^[-*•\s\d+\.]\s*/, '').trim());
      } else {
        buyers.push(line);
      }
    } else if (currentSection === 4) {
      irrRationale += (irrRationale ? ' ' : '') + line;
    }
  }

  // Fallbacks if parsing fails
  if (!exitType) {
    const typeMatch = text.match(/(?:Recommended Exit Type:?\s*\*?)([^\n*]+)/i);
    exitType = typeMatch ? typeMatch[1].trim() : 'Strategic Sale';
  }
  if (!exitWindow) {
    const windowMatch = text.match(/(?:Optimal Exit Window:?\s*\*?)([^\n*]+)/i);
    exitWindow = windowMatch ? windowMatch[1].trim() : 'Q3 2026';
  }
  if (!riskIrr) {
    const irrMatch = text.match(/(?:Risk-Adjusted IRR Projection:?\s*\*?)([^\n*%]+)/i);
    riskIrr = irrMatch ? irrMatch[1].trim() : '18';
  }
  if (buyers.length === 0) {
    buyers = [
      'Strategic corporate acquirers in target industry',
      'Private equity consolidators seeking growth platforms',
      'Secondary buyout sponsors looking for digital assets'
    ];
  }

  return { exitType, exitRationale, exitWindow, windowRationale, buyers, riskIrr, irrRationale };
};

const formatResponseText = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, idx) => {
    if (line.startsWith('###')) {
      return <h4 key={idx} className="text-base font-bold text-[#111111] mt-4 mb-2">{line.replace('###', '').trim()}</h4>;
    }
    if (line.startsWith('**')) {
      const parts = line.split('**');
      return (
        <p key={idx} className="text-xs text-[#A0A0A0] leading-relaxed mb-2">
          <strong className="text-[#111111] font-semibold">{parts[1]}</strong>
          {parts.slice(2).join('')}
        </p>
      );
    }
    if (line.startsWith('- **')) {
      const parts = line.replace('-', '').split('**');
      return (
        <div key={idx} className="flex items-start gap-2 text-xs text-[#A0A0A0] leading-relaxed mb-2 pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 flex-shrink-0" />
          <span>
            <strong className="text-[#111111] font-semibold">{parts[1]}</strong>
            {parts.slice(2).join('')}
          </span>
        </div>
      );
    }
    if (line.startsWith('-')) {
      return (
        <div key={idx} className="flex items-start gap-2 text-xs text-[#A0A0A0] leading-relaxed mb-2 pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 flex-shrink-0" />
          <span>{line.replace('-', '').trim()}</span>
        </div>
      );
    }
    return <p key={idx} className="text-xs text-[#A0A0A0] leading-relaxed mb-2">{line}</p>;
  });
};

const getTourStepTitle = (step) => {
  switch(step) {
    case 1: return 'Sidebar Navigation';
    case 2: return 'Portfolio Database';
    case 3: return 'Exit Signals Diagnostic';
    case 4: return 'AI Disruption Risk Mapping';
    case 5: return 'Structured Exit Recommender';
    case 6: return 'AI Analysis Trigger';
    default: return '';
  }
};

const getTourStepDescription = (step) => {
  switch(step) {
    case 1: return 'Navigate between your portfolio dashboard, sortable database, live exit triggers, AI vulnerability matrix, and the structured exit recommender.';
    case 2: return 'View and search your full PE portfolio with custom AI risk tags, hold periods, and color-coded exit readiness indicators.';
    case 3: return 'Review detailed exit readiness percentages, recommended transaction types, and strategic M&A trigger bullet points for each asset.';
    case 4: return 'Visualize portfolio risk on a two-axis matrix comparing time-to-exit against AI exposure, identifying assets needing urgent divestment.';
    case 5: return 'Input company profiles, market dynamics, and operational AI signals to generate tailored, Claude-powered exit timing advice.';
    case 6: return 'Instantly run a real-time portfolio exit timing assessment across all assets using Anthropic\'s Claude Sonnet model.';
    default: return '';
  }
};

const getTourCardStyle = (step) => {
  switch(step) {
    case 1:
      return { left: '260px', top: '150px' };
    case 2:
      return { right: '40px', top: '180px' };
    case 3:
      return { right: '40px', top: '180px' };
    case 4:
      return { right: '40px', top: '180px' };
    case 5:
      return { right: '40px', top: '180px' };
    case 6:
      return { right: '40px', top: '80px' };
    default:
      return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
  }
};

// Custom Tooltip for IRR Trend Line Chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black text-white p-3 rounded-[6px] border-0 shadow-lg text-[12px] font-sans">
        <p className="font-bold text-neutral-400 mb-1.5 uppercase tracking-wider text-[10px]">
          Month: <span className="text-white font-semibold normal-case text-[12px] ml-1">{data.month}</span>
        </p>
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-neutral-400">IRR%:</span>
            <span className="font-bold text-white">{data.irr}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-accent-gold">Exit Score:</span>
            <span className="font-bold text-[#C9A84C]">{data.score}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Scatter Chart
const CustomScatterTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black text-white p-3 rounded-[6px] border-0 shadow-lg text-[12px] font-sans text-left">
        <p className="font-bold mb-1 text-white">{data.name}</p>
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">AI Exposure:</span>
            <span className="font-bold text-white">{data.exposure}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Time to Exit:</span>
            <span className="font-bold text-white">{data.exitMonths} months</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Risk Level:</span>
            <span className={`font-bold ${data.risk === 'High' ? 'text-red-500' : data.risk === 'Medium' ? 'text-accent-gold' : 'text-green-500'}`}>
              {data.risk}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};


// Custom Dot for Exit Score Line Chart (latest point pulses)
const CustomExitScoreDot = (props) => {
  const { cx, cy, index } = props;
  if (cx === null || cy === null || cx === undefined || cy === undefined) return null;

  const isLatest = index === chartData.length - 1;

  if (isLatest) {
    return (
      <g key={`exit-score-dot-${index}`}>
        {/* Pulsing glow ring using SMIL animation */}
        <circle cx={cx} cy={cy} fill="#C9A84C">
          <animate
            attributeName="r"
            values="4;15;4"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Outer glowing border */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={5.5} 
          fill="none" 
          stroke="#C9A84C" 
          strokeWidth={2}
          style={{ filter: 'drop-shadow(0 0 4px rgba(201, 168, 76, 0.6))' }}
        />
        {/* Inner solid white dot */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={3} 
          fill="#FFFFFF" 
          stroke="#C9A84C"
          strokeWidth={1}
        />
      </g>
    );
  }

  return (
    <circle 
      key={`exit-score-dot-${index}`}
      cx={cx} 
      cy={cy} 
      r={4} 
      stroke="#C9A84C" 
      strokeWidth={1.5} 
      fill="#FFFFFF" 
    />
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sortColumn, setSortColumn] = useState('company');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAccordion, setExpandedAccordion] = useState('workforce');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);


  // Auth & Onboarding States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(1);

  // Settings States
  const [settingsFirmName, setSettingsFirmName] = useState('Conditor Capital');
  const [settingsHeadquarters, setSettingsHeadquarters] = useState('London, UK');
  const [settingsFundStage, setSettingsFundStage] = useState('Buyout');
  const [settingsAum, setSettingsAum] = useState('2.4');

  const [settingsTargetIrr, setSettingsTargetIrr] = useState(28);
  const [settingsMaxHoldPeriod, setSettingsMaxHoldPeriod] = useState(5);
  const [settingsPrefStrategic, setSettingsPrefStrategic] = useState(true);
  const [settingsPrefIpo, setSettingsPrefIpo] = useState(true);
  const [settingsPrefSponsor, setSettingsPrefSponsor] = useState(true);
  const [settingsPrimaryMarket, setSettingsPrimaryMarket] = useState('Global');

  const [settingsEnableClaude, setSettingsEnableClaude] = useState(true);
  const [settingsLiveNews, setSettingsLiveNews] = useState(true);
  const [settingsEmailAlerts, setSettingsEmailAlerts] = useState(false);
  const [settingsSensitivity, setSettingsSensitivity] = useState('Medium');
  const [settingsNotifEmail, setSettingsNotifEmail] = useState('admin@conditorcapital.com');

  // Market Intelligence States
  const [marketIntelNews, setMarketIntelNews] = useState([]);
  const [isMarketIntelLoading, setIsMarketIntelLoading] = useState(false);
  const [marketIntelError, setMarketIntelError] = useState('');

  const fetchMarketIntelNews = async () => {
    setIsMarketIntelLoading(true);
    setMarketIntelError('');
    
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    const fallbackNews = [
      {
        headline: "European Tech Valuations Recover as Interest Rates Stabilize",
        summary: "Mid-market tech buyout multiples in Europe rose to 14.5x EBITDA this week as the Bank of England held rates steady. Cross-border acquisitions by US strategics reached a 12-month high.",
        relevance: "Favorable environment for tech asset exits; strategic exit windows are widening.",
        sentiment: "Bullish",
        source: "M&A Journal",
        timestamp: "2 hours ago"
      },
      {
        headline: "LBO Activity Stalls in Retail Sector Amid Inflation Pressures",
        summary: "Secondary sponsor-to-sponsor buyouts in consumer retail fell 18% quarter-on-quarter. Consumer demand headwinds have caused several GPs to extend hold periods for retail assets.",
        relevance: "Postpone retail asset sales; secondary buyer appetite is highly compressed.",
        sentiment: "Bearish",
        source: "PE Hub Europe",
        timestamp: "1 day ago"
      },
      {
        headline: "IPO Pipeline Warms Up with Two Major London Listings",
        summary: "Two London-based fintech platforms announced draft prospectuses for late Q3 floatings. Positive anchor commitments suggest institutional investor appetite for growth tech is returning.",
        relevance: "Keep IPO preparation tracks active for late 2026/early 2027 exits.",
        sentiment: "Neutral",
        source: "Financial Times",
        timestamp: "2 days ago"
      },
      {
        headline: "Strategic Acquirers Focus on Cash-Flow Resilient Logistics Assets",
        summary: "Industrial conglomerates are bidding aggressively for regional cold-chain logistics platforms. Cash flow stability and scale-based efficiencies are driving premiums of 20% over 2025 averages.",
        relevance: "Highly attractive window to run target strategic auction processes for logistics assets.",
        sentiment: "Bullish",
        source: "Dealreporter",
        timestamp: "4 days ago"
      },
      {
        headline: "Healthcare Multiple Compression Threatens Over-leveraged Assets",
        summary: "Rising refinancing costs on legacy junior debt are dragging mid-market healthcare PE returns. GP exits are increasingly shifting toward partial sponsor sales or corporate carve-outs.",
        relevance: "Prioritize strategic buyouts over IPO listings to avoid discount multiples.",
        sentiment: "Bearish",
        source: "Real Deals",
        timestamp: "5 days ago"
      }
    ];

    if (!apiKey || apiKey.includes('your_anthropic_api_key_here') || apiKey === '') {
      setTimeout(() => {
        setMarketIntelNews(fallbackNews);
        setIsMarketIntelLoading(false);
      }, 1500);
      return;
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          system: "You are a private equity market analyst. Search for and summarize the 5 most important PE/M&A/exit market developments from the last 7 days. For each, provide: headline (max 10 words), 2-sentence summary, relevance to PE exit timing (1 sentence), and sentiment tag (Bullish / Bearish / Neutral). Return as JSON array with fields: headline, summary, relevance, sentiment.",
          messages: [
            { role: 'user', content: 'Search and output the PE market pulse developments' }
          ],
          tools: [{ "type": "web_search_20250305", "name": "web_search" }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const contentText = responseData.content?.[0]?.text || '';
      
      const jsonStart = contentText.indexOf('[');
      const jsonEnd = contentText.lastIndexOf(']');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const parsed = JSON.parse(contentText.slice(jsonStart, jsonEnd + 1));
        const formatted = parsed.map((item, idx) => ({
          ...item,
          source: item.source || ["FT", "PE Hub", "Dealreporter", "Reuters", "Bloomberg"][idx % 5],
          timestamp: item.timestamp || `${idx + 1} day${idx > 0 ? 's' : ''} ago`
        }));
        setMarketIntelNews(formatted);
      } else {
        setMarketIntelNews(fallbackNews);
      }
    } catch (err) {
      console.error("Claude call failed, using mock developments:", err);
      setMarketIntelNews(fallbackNews);
    } finally {
      setIsMarketIntelLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'market-intel' && marketIntelNews.length === 0) {
      fetchMarketIntelNews();
    }
  }, [activeTab]);

  // Handle tab routing when the onboarding tour is active
  useEffect(() => {
    if (isTourActive) {
      if (tourStep === 1) setActiveTab('dashboard');
      else if (tourStep === 2) setActiveTab('portfolio');
      else if (tourStep === 3) setActiveTab('exit-signals');
      else if (tourStep === 4) setActiveTab('ai-disruption');
      else if (tourStep === 5) setActiveTab('exit-recommender');
      else if (tourStep === 6) setActiveTab('dashboard');
    }
  }, [isTourActive, tourStep]);

  const handleAccessDashboard = (e) => {
    if (e) e.preventDefault();
    setIsLoggedIn(true);
    setIsFadingOut(true);
    setTimeout(() => {
      setShowLogin(false);
      setShowProblemModal(true);
    }, 600);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(true);
    setIsFadingOut(false);
    setLoginName('');
    setLoginEmail('');
    setShowProblemModal(false);
    setIsTourActive(false);
    setTourStep(1);
    setActiveTab('dashboard');
    setRecommenderStep(1);
    setRecommenderForm({
      companyName: '',
      sector: 'Technology',
      entryYear: 2021,
      ebitda: 15,
      targetIrr: 20,
      maActivity: 50,
      marketSentiment: 50,
      interestRate: 'Medium',
      aiCompetitor: false,
      aiWorkforce: false,
      aiRevenue: false,
      aiManagement: false
    });
    setRecommenderResult('');
    setRecommenderWarning('');
    setIsRecommenderLoading(false);
    setIsPanelOpen(false);
    setAnalyzedCompany(null);
    setIsLoading(false);
    setAiResponse('');
    setChatHistory([]);
    setChatInput('');
    setIsChatLoading(false);
    setApiWarning('');
  };

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [analyzedCompany, setAnalyzedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [apiWarning, setApiWarning] = useState('');

  // Recommender States
  const [recommenderStep, setRecommenderStep] = useState(1);
  const [recommenderForm, setRecommenderForm] = useState({
    companyName: '',
    sector: 'Technology',
    entryYear: 2021,
    ebitda: 15,
    targetIrr: 20,
    maActivity: 50,
    marketSentiment: 50,
    interestRate: 'Medium',
    aiCompetitor: false,
    aiWorkforce: false,
    aiRevenue: false,
    aiManagement: false
  });
  const [recommenderResult, setRecommenderResult] = useState('');
  const [recommenderWarning, setRecommenderWarning] = useState('');
  const [isRecommenderLoading, setIsRecommenderLoading] = useState(false);

  const activeItem = navigationItems.find(item => item.id === activeTab) || navigationItems[0];
  const ActiveIcon = activeItem.icon;

  const handleStartAnalysis = async (company) => {
    setAnalyzedCompany(company);
    setIsPanelOpen(true);
    setIsLoading(true);
    setAiResponse('');
    setChatHistory([]);
    setApiWarning('');

    const name = company.company || company.name || 'Portfolio Company';
    const sector = company.sector || 'Technology';
    
    // Clean hold period to a number (e.g. 5.5 from '5.5 yrs')
    let holdVal = '4.0';
    if (company.holdPeriod) {
      holdVal = company.holdPeriod.replace(/[^\d.]/g, '');
    } else if (company.exitMonths !== undefined) {
      holdVal = ((36 - company.exitMonths) / 12).toFixed(1);
    }
    
    // Clean IRR (e.g. 24 from '24%')
    let irrVal = '20';
    if (company.irr) {
      irrVal = company.irr.replace(/[^\d.]/g, '');
    }
    
    // Normalize AI Disruption Risk to Capitalized (e.g. High, Medium, Low)
    let aiRiskVal = 'Medium';
    const rawRisk = company.aiRisk || company.risk;
    if (rawRisk) {
      aiRiskVal = rawRisk.charAt(0).toUpperCase() + rawRisk.slice(1).toLowerCase();
    }
    
    // Normalize Exit Score
    let exitScoreVal = 'N/A';
    if (company.exitScore !== undefined) {
      exitScoreVal = company.exitScore;
    } else if (company.score !== undefined) {
      exitScoreVal = company.score;
    }

    const systemPrompt = `You are ExitIQ, an AI assistant for private equity exit timing decisions. You analyze portfolio companies and provide structured exit recommendations. Always respond with: (1) Exit Readiness Score out of 100, (2) Recommended exit type, (3) Optimal exit window, (4) Top 3 risks if they delay exit, (5) Top 3 reasons to exit now. Be specific, use PE industry language, keep it under 300 words.`;

    const userMessage = `Analyze exit timing for ${name}. Sector: ${sector}. Hold period: ${holdVal} years. Current IRR: ${irrVal}%. AI Disruption Risk: ${aiRiskVal}. Exit Score: ${exitScoreVal}/100.`;

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    if (!apiKey || apiKey.includes('your_anthropic_api_key_here') || apiKey === '') {
      setTimeout(() => {
        const mockResponse = getMockClaudeResponse(company);
        setAiResponse(mockResponse);
        setApiWarning('Demo Mode: Using pre-analyzed exit timing models.');
        setIsLoading(false);
      }, 1200);
      return;
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAiResponse(data.content[0].text);
      setIsLoading(false);
    } catch (error) {
      console.error('Claude API call failed, falling back to mock response:', error);
      const mockResponse = getMockClaudeResponse(company);
      setAiResponse(mockResponse);
      setApiWarning('API connection failed (possibly CORS or network). Showing local model prediction.');
      setIsLoading(false);
    }
  };

  const handleSendFollowUp = async () => {
    if (!chatInput.trim() || !analyzedCompany) return;

    const userMsgText = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', content: userMsgText }]);
    setChatInput('');
    setIsChatLoading(true);
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    if (!apiKey || apiKey.includes('your_anthropic_api_key_here') || apiKey === '') {
      setTimeout(() => {
        setChatHistory(prev => {
          const mockFollowUp = getMockFollowUpResponse(analyzedCompany, userMsgText, prev);
          return [...prev, { role: 'assistant', content: mockFollowUp }];
        });
        setIsChatLoading(false);
      }, 1200);
      return;
    }

    try {
      const name = analyzedCompany.company || analyzedCompany.name || 'Portfolio Company';
      const sector = analyzedCompany.sector || 'Technology';
      
      // Clean hold period to a number
      let holdVal = '4.0';
      if (analyzedCompany.holdPeriod) {
        holdVal = analyzedCompany.holdPeriod.replace(/[^\d.]/g, '');
      } else if (analyzedCompany.exitMonths !== undefined) {
        holdVal = ((36 - analyzedCompany.exitMonths) / 12).toFixed(1);
      }
      
      // Clean IRR
      let irrVal = '20';
      if (analyzedCompany.irr) {
        irrVal = analyzedCompany.irr.replace(/[^\d.]/g, '');
      }
      
      // Normalize AI Disruption Risk
      let aiRiskVal = 'Medium';
      const rawRisk = analyzedCompany.aiRisk || analyzedCompany.risk;
      if (rawRisk) {
        aiRiskVal = rawRisk.charAt(0).toUpperCase() + rawRisk.slice(1).toLowerCase();
      }
      
      // Normalize Exit Score
      let exitScoreVal = 'N/A';
      if (analyzedCompany.exitScore !== undefined) {
        exitScoreVal = analyzedCompany.exitScore;
      } else if (analyzedCompany.score !== undefined) {
        exitScoreVal = analyzedCompany.score;
      }

      const systemPrompt = `You are ExitIQ, an AI assistant for private equity exit timing decisions. You are answering follow-up questions from an investment committee regarding the exit timing of ${name}. Be brief, professional, and use PE industry language. Keep it under 150 words.`;
      
      const userMessage = `Analyze exit timing for ${name}. Sector: ${sector}. Hold period: ${holdVal} years. Current IRR: ${irrVal}%. AI Disruption Risk: ${aiRiskVal}. Exit Score: ${exitScoreVal}/100.`;

      const messages = [
        { role: 'user', content: userMessage },
        { role: 'assistant', content: aiResponse },
        ...chatHistory,
        { role: 'user', content: userMsgText }
      ];

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt,
          messages: messages.filter(m => m.role === 'user' || m.role === 'assistant')
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.content[0].text }]);
      setIsChatLoading(false);
    } catch (error) {
      console.error('Claude Chat API call failed, falling back to mock response:', error);
      setChatHistory(prev => {
        const mockFollowUp = getMockFollowUpResponse(analyzedCompany, userMsgText, prev);
        return [...prev, { role: 'assistant', content: mockFollowUp }];
      });
      setIsChatLoading(false);
    }
  };

  const handleGenerateRecommendation = async () => {
    setIsRecommenderLoading(true);
    setRecommenderResult('');
    setRecommenderWarning('');

    const systemPrompt = `You are ExitIQ, an AI assistant for private equity exit timing decisions. You analyze company profiles, market conditions, and AI risk inputs to generate structured exit recommendations. Always respond with: (1) Recommended Exit Type (Strategic Sale, IPO, Sponsor-to-Sponsor, or Carveout/Restructuring) with 1 sentence rationale, (2) Optimal Exit Window (e.g. Q3 2026) with 1 sentence rationale, (3) Buyer Universe (3 specific acquirer categories as bullet points), (4) Risk-Adjusted IRR Projection (e.g. 18.5%) explaining the drag from the AI risk factors checked. Be specific, use PE industry language, keep it under 300 words.`;

    const userMessage = `Company Profile:
- Company Name: ${recommenderForm.companyName || 'Portfolio Company'}
- Sector: ${recommenderForm.sector}
- Entry Year: ${recommenderForm.entryYear}
- Current EBITDA: £${recommenderForm.ebitda}M
- Target IRR: ${recommenderForm.targetIrr}%

Market Conditions:
- Sector M&A Activity Score: ${recommenderForm.maActivity}/100
- Public Market Sentiment Score: ${recommenderForm.marketSentiment}/100
- Interest Rate Environment: ${recommenderForm.interestRate}

AI Risk Signals Checked:
- Competitor AI investment: ${recommenderForm.aiCompetitor ? 'Yes' : 'No'}
- Workforce automation risk: ${recommenderForm.aiWorkforce ? 'Yes' : 'No'}
- Revenue model shift: ${recommenderForm.aiRevenue ? 'Yes' : 'No'}
- Management team instability: ${recommenderForm.aiManagement ? 'Yes' : 'No'}

Generate a structured exit timing and channel recommendation.`;

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    if (!apiKey || apiKey.includes('your_anthropic_api_key_here') || apiKey === '') {
      setTimeout(() => {
        const mockResponse = getMockExitRecommendation(recommenderForm);
        setRecommenderResult(mockResponse);
        setRecommenderWarning('Demo Mode: Using pre-analyzed exit timing models.');
        setIsRecommenderLoading(false);
      }, 1500);
      return;
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecommenderResult(data.content[0].text);
      setIsRecommenderLoading(false);
    } catch (error) {
      console.error('Claude Exit Recommendation call failed:', error);
      const mockResponse = getMockExitRecommendation(recommenderForm);
      setRecommenderResult(mockResponse);
      setRecommenderWarning('API connection failed (possibly CORS or network). Showing local model prediction.');
      setIsRecommenderLoading(false);
    }
  };

  const handleDownloadPPTX = () => {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';

    const COLOR_BG_DARK = '0A0A0A';
    const COLOR_TEXT_LIGHT = 'FFFFFF';
    const COLOR_TEXT_DARK = '111111';
    const COLOR_TEXT_MUTED = '767676';
    const COLOR_GOLD = 'C9A84C';
    const COLOR_BORDER = 'E5E5E5';
    const COLOR_RED = 'EF4444';
    const COLOR_GREEN = '10B981';

    const parsed = parseRecommendationText(recommenderResult);
    const name = recommenderForm.companyName || 'Portfolio Company';
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Helper function to add slide headers to content slides
    const addContentHeader = (slide, title) => {
      // Soft gold divider line
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.8,
        y: 0.95,
        w: 11.73,
        h: 0.02,
        fill: { color: COLOR_GOLD }
      });
      // Header Title
      slide.addText(title, {
        x: 0.8,
        y: 0.4,
        fontSize: 20,
        color: COLOR_GOLD,
        bold: true,
        fontFace: 'Arial'
      });
      // Small Watermark label in header
      slide.addText('ExitIQ PE Timing Diagnostic', {
        x: 10.0,
        y: 0.5,
        w: 2.5,
        fontSize: 10,
        color: COLOR_TEXT_MUTED,
        bold: true,
        fontFace: 'Arial',
        align: 'right'
      });
      // Footer Confidential text
      slide.addText('CONFIDENTIAL - FOR CONDITOR CAPITAL ONLY', {
        x: 0.8,
        y: 6.7,
        w: 6.0,
        fontSize: 8,
        color: 'A0A0A0',
        bold: true,
        fontFace: 'Arial'
      });
      // Slide reference / Author Footer watermark
      slide.addText('ExitIQ Analyst Platform', {
        x: 9.5,
        y: 6.7,
        w: 3.0,
        fontSize: 8,
        color: 'A0A0A0',
        bold: true,
        fontFace: 'Arial',
        align: 'right'
      });
    };

    // SLIDE 1: Title Slide (Dark Mode)
    const slide1 = pptx.addSlide();
    slide1.background = { fill: COLOR_BG_DARK };

    // Left gold strip
    slide1.addShape(pptx.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 0.35,
      h: 7.2,
      fill: { color: COLOR_GOLD }
    });

    slide1.addText('ExitIQ', {
      x: 0.8,
      y: 0.6,
      fontSize: 24,
      color: COLOR_GOLD,
      bold: true,
      fontFace: 'Arial'
    });

    slide1.addText('STRATEGIC DIVESTMENT & TIMING ANALYSIS', {
      x: 0.8,
      y: 2.1,
      fontSize: 11,
      color: COLOR_GOLD,
      bold: true,
      fontFace: 'Arial',
      charSpacing: 2
    });

    slide1.addText(`Exit Strategy Report:\n${name}`, {
      x: 0.8,
      y: 2.5,
      w: 11.5,
      h: 1.8,
      fontSize: 38,
      color: COLOR_TEXT_LIGHT,
      bold: true,
      fontFace: 'Arial'
    });

    slide1.addText('PE portfolio diagnostics, deal metrics evaluation, and operational AI disruption risks assessment.', {
      x: 0.8,
      y: 4.5,
      w: 11.5,
      fontSize: 13,
      color: 'A0A0A0',
      fontFace: 'Arial'
    });

    slide1.addText(`Prepared for: Conditor Capital Admin\nDate: ${dateStr}\nPowered by Claude AI • ExitIQ Platform`, {
      x: 0.8,
      y: 5.6,
      w: 8,
      h: 1.2,
      fontSize: 10,
      color: '808080',
      fontFace: 'Arial',
      lineSpacing: 18
    });


    // SLIDE 2: Deal Profile & Market Environment
    const slide2 = pptx.addSlide();
    slide2.background = { fill: 'F9F9F9' };
    addContentHeader(slide2, 'Deal Profile & Market Environment');

    // Left card
    slide2.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8,
      y: 1.4,
      w: 5.6,
      h: 4.8,
      fill: { color: 'FFFFFF' },
      line: { color: COLOR_BORDER, width: 1 }
    });
    slide2.addText('PORTFOLIO COMPANY PROFILE', {
      x: 1.1,
      y: 1.7,
      fontSize: 11,
      bold: true,
      color: COLOR_GOLD,
      fontFace: 'Arial'
    });

    const profileTableData = [
      [{ text: 'Company Name:', options: { bold: true, fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }, { text: name, options: { fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }],
      [{ text: 'Target Sector:', options: { bold: true, fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }, { text: recommenderForm.sector, options: { fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }],
      [{ text: 'Fund Entry Year:', options: { bold: true, fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }, { text: recommenderForm.entryYear.toString(), options: { fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }],
      [{ text: 'Current EBITDA:', options: { bold: true, fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }, { text: `£${recommenderForm.ebitda}M`, options: { fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }],
      [{ text: 'Target Deal IRR:', options: { bold: true, fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }, { text: `${recommenderForm.targetIrr}%`, options: { fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }]
    ];
    slide2.addTable(profileTableData, {
      x: 1.1,
      y: 2.1,
      w: 5.0,
      h: 3.4,
      colW: [2.0, 3.0],
      margin: 8,
      border: { type: 'solid', pt: 0.5, color: 'E5E5E5' }
    });

    // Right card
    slide2.addShape(pptx.shapes.RECTANGLE, {
      x: 6.8,
      y: 1.4,
      w: 5.6,
      h: 4.8,
      fill: { color: 'FFFFFF' },
      line: { color: COLOR_BORDER, width: 1 }
    });
    slide2.addText('MARKET ENVIRONMENT BACKDROP', {
      x: 7.1,
      y: 1.7,
      fontSize: 11,
      bold: true,
      color: COLOR_GOLD,
      fontFace: 'Arial'
    });

    const marketTableData = [
      [{ text: 'M&A Deal Activity:', options: { bold: true, fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }, { text: `${recommenderForm.maActivity}/100`, options: { fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }],
      [{ text: 'Public Sentiment:', options: { bold: true, fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }, { text: `${recommenderForm.marketSentiment}/100`, options: { fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }],
      [{ text: 'Interest Rate Regime:', options: { bold: true, fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }, { text: recommenderForm.interestRate, options: { fontSize: 11, fontFace: 'Arial', color: COLOR_TEXT_DARK } }]
    ];
    slide2.addTable(marketTableData, {
      x: 7.1,
      y: 2.1,
      w: 5.0,
      h: 2.1,
      colW: [2.2, 2.8],
      margin: 8,
      border: { type: 'solid', pt: 0.5, color: 'E5E5E5' }
    });

    let sentimentMsg = 'Market multiples are stable to expansionary.';
    if (recommenderForm.maActivity < 40 || recommenderForm.marketSentiment < 40) {
      sentimentMsg = 'Depressed deal volume suggests strategic channels are key.';
    } else if (recommenderForm.maActivity >= 70 && recommenderForm.marketSentiment >= 70) {
      sentimentMsg = 'Highly supportive deal environment opens multiples premium options.';
    }
    if (recommenderForm.interestRate === 'High') {
      sentimentMsg += ' High interest rates constraint debt financing and traditional LBO bidders.';
    }
    slide2.addText(`Deal Environment Commentary:\n${sentimentMsg}`, {
      x: 7.1,
      y: 4.5,
      w: 5.0,
      h: 1.4,
      fontSize: 11,
      color: COLOR_TEXT_MUTED,
      fontFace: 'Arial',
      italic: true,
      lineSpacing: 16
    });


    // SLIDE 3: Operational AI Disruption Diagnostics
    const slide3 = pptx.addSlide();
    slide3.background = { fill: 'F9F9F9' };
    addContentHeader(slide3, 'Operational AI Disruption Diagnostics');

    slide3.addText('Operational checkpoints evaluated to assess technological risk to exit valuations:', {
      x: 0.8,
      y: 1.25,
      fontSize: 12,
      color: COLOR_TEXT_DARK,
      bold: true,
      fontFace: 'Arial'
    });

    const checkRisk = (val) => val ? { text: 'ACTIVE THREAT', color: COLOR_RED } : { text: 'STABLE / DE-RISKED', color: COLOR_GREEN };

    const risksData = [
      { name: 'Competitor AI investment', desc: 'Peers leveraging LLMs/automation to drop pricing margins.', status: checkRisk(recommenderForm.aiCompetitor) },
      { name: 'Workforce automation risk', desc: 'Legacy labor density susceptible to efficiency replacements.', status: checkRisk(recommenderForm.aiWorkforce) },
      { name: 'Revenue model shift', desc: 'Industry moving from seat-based licenses to usage/outcomes.', status: checkRisk(recommenderForm.aiRevenue) },
      { name: 'Management instability', desc: 'Talent gaps or churn driven by technological displacement.', status: checkRisk(recommenderForm.aiManagement) }
    ];

    risksData.forEach((risk, index) => {
      const rx = 0.8 + (index % 2) * 6.0;
      const ry = 1.7 + Math.floor(index / 2) * 2.5;

      // Color border indicator strip on the left
      slide3.addShape(pptx.shapes.RECTANGLE, {
        x: rx,
        y: ry,
        w: 0.15,
        h: 2.2,
        fill: { color: risk.status.color }
      });

      // Card box background
      slide3.addShape(pptx.shapes.RECTANGLE, {
        x: rx + 0.15,
        y: ry,
        w: 5.45,
        h: 2.2,
        fill: { color: 'FFFFFF' },
        line: { color: COLOR_BORDER, width: 1 }
      });

      slide3.addText(risk.name.toUpperCase(), {
        x: rx + 0.4,
        y: ry + 0.25,
        fontSize: 12,
        bold: true,
        color: COLOR_TEXT_DARK,
        fontFace: 'Arial'
      });

      slide3.addText(risk.status.text, {
        x: rx + 3.4,
        y: ry + 0.25,
        w: 1.9,
        fontSize: 9,
        bold: true,
        color: risk.status.color,
        fontFace: 'Arial',
        align: 'right'
      });

      slide3.addText(risk.desc, {
        x: rx + 0.4,
        y: ry + 0.75,
        w: 4.9,
        h: 1.2,
        fontSize: 11,
        color: COLOR_TEXT_MUTED,
        fontFace: 'Arial',
        lineSpacing: 16
      });
    });


    // SLIDE 4: Strategic Recommendation & Timeline
    const slide4 = pptx.addSlide();
    slide4.background = { fill: 'F9F9F9' };
    addContentHeader(slide4, 'Strategic Recommendation & Timeline');

    // Left Box
    slide4.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8,
      y: 1.4,
      w: 5.6,
      h: 4.8,
      fill: { color: 'FFFFFF' },
      line: { color: COLOR_BORDER, width: 1 }
    });
    // Top border line
    slide4.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8,
      y: 1.4,
      w: 5.6,
      h: 0.15,
      fill: { color: COLOR_GOLD }
    });

    slide4.addText('RECOMMENDED TRANSACTION CHANNEL', {
      x: 1.1,
      y: 1.8,
      fontSize: 10,
      bold: true,
      color: '767676',
      fontFace: 'Arial'
    });

    slide4.addText(parsed.exitType || 'Strategic Sale', {
      x: 1.1,
      y: 2.1,
      w: 5.0,
      h: 0.7,
      fontSize: 24,
      bold: true,
      color: COLOR_GOLD,
      fontFace: 'Arial'
    });

    slide4.addText(parsed.exitRationale || 'Securing divestment is advised to optimize returns.', {
      x: 1.1,
      y: 2.9,
      w: 5.0,
      h: 3.0,
      fontSize: 12.5,
      color: COLOR_TEXT_DARK,
      fontFace: 'Arial',
      lineSpacing: 18
    });

    // Right Box
    slide4.addShape(pptx.shapes.RECTANGLE, {
      x: 6.8,
      y: 1.4,
      w: 5.6,
      h: 4.8,
      fill: { color: 'FFFFFF' },
      line: { color: COLOR_BORDER, width: 1 }
    });
    // Top border line
    slide4.addShape(pptx.shapes.RECTANGLE, {
      x: 6.8,
      y: 1.4,
      w: 5.6,
      h: 0.15,
      fill: { color: COLOR_GOLD }
    });

    slide4.addText('OPTIMAL EXIT WINDOW', {
      x: 7.1,
      y: 1.8,
      fontSize: 10,
      bold: true,
      color: '767676',
      fontFace: 'Arial'
    });

    slide4.addText(parsed.exitWindow || 'Immediate (3-6 months)', {
      x: 7.1,
      y: 2.1,
      w: 5.0,
      h: 0.7,
      fontSize: 24,
      bold: true,
      color: COLOR_GOLD,
      fontFace: 'Arial'
    });

    slide4.addText(parsed.windowRationale || 'Strategic windows dictate rapid divestment.', {
      x: 7.1,
      y: 2.9,
      w: 5.0,
      h: 3.0,
      fontSize: 12.5,
      color: COLOR_TEXT_DARK,
      fontFace: 'Arial',
      lineSpacing: 18
    });


    // SLIDE 5: Target Acquirer & Buyer Universe
    const slide5 = pptx.addSlide();
    slide5.background = { fill: 'F9F9F9' };
    addContentHeader(slide5, 'Target Acquirer & Buyer Universe');

    slide5.addText('Identified strategic acquirer categories representing maximum enterprise value realization:', {
      x: 0.8,
      y: 1.25,
      fontSize: 12,
      color: COLOR_TEXT_DARK,
      bold: true,
      fontFace: 'Arial'
    });

    const buyerColors = [COLOR_GOLD, '6B7280', '9B7B2B'];

    (parsed.buyers || []).forEach((buyer, index) => {
      const by = 1.7 + index * 1.5;

      // Color marker bar
      slide5.addShape(pptx.shapes.RECTANGLE, {
        x: 0.8,
        y: by,
        w: 0.15,
        h: 1.3,
        fill: { color: buyerColors[index] || COLOR_GOLD }
      });

      // Card box background
      slide5.addShape(pptx.shapes.RECTANGLE, {
        x: 0.95,
        y: by,
        w: 11.45,
        h: 1.3,
        fill: { color: 'FFFFFF' },
        line: { color: COLOR_BORDER, width: 1 }
      });

      slide5.addText(`BUYER TARGET CATEGORY 0${index + 1}`, {
        x: 1.2,
        y: by + 0.2,
        fontSize: 9.5,
        bold: true,
        color: buyerColors[index] || COLOR_GOLD,
        fontFace: 'Arial'
      });

      slide5.addText(buyer, {
        x: 1.2,
        y: by + 0.55,
        w: 10.8,
        h: 0.6,
        fontSize: 13,
        bold: true,
        color: COLOR_TEXT_DARK,
        fontFace: 'Arial'
      });
    });


    // SLIDE 6: Return Analytics & IRR Adjustments
    const slide6 = pptx.addSlide();
    slide6.background = { fill: 'F9F9F9' };
    addContentHeader(slide6, 'Risk-Adjusted IRR Projections');

    // Unadjusted Card
    slide6.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8,
      y: 1.4,
      w: 0.15,
      h: 2.2,
      fill: { color: '767676' }
    });
    slide6.addShape(pptx.shapes.RECTANGLE, {
      x: 0.95,
      y: 1.4,
      w: 5.45,
      h: 2.2,
      fill: { color: 'FFFFFF' },
      line: { color: COLOR_BORDER, width: 1 }
    });
    slide6.addText('TARGET DEAL IRR (UNADJUSTED)', {
      x: 1.2,
      y: 1.6,
      fontSize: 10,
      color: '767676',
      bold: true,
      fontFace: 'Arial'
    });
    slide6.addText(`${recommenderForm.targetIrr}%`, {
      x: 1.2,
      y: 1.9,
      fontSize: 32,
      color: COLOR_TEXT_DARK,
      bold: true,
      fontFace: 'Arial'
    });

    // Adjusted Card
    slide6.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8,
      y: 4.0,
      w: 0.15,
      h: 2.2,
      fill: { color: COLOR_GOLD }
    });
    slide6.addShape(pptx.shapes.RECTANGLE, {
      x: 0.95,
      y: 4.0,
      w: 5.45,
      h: 2.2,
      fill: { color: 'FFFFFF' },
      line: { color: COLOR_GOLD, width: 1.5 }
    });
    slide6.addText('RISK-ADJUSTED REALIZABLE IRR', {
      x: 1.2,
      y: 4.2,
      fontSize: 10,
      color: COLOR_GOLD,
      bold: true,
      fontFace: 'Arial'
    });
    slide6.addText(`${parsed.riskIrr || recommenderForm.targetIrr}%`, {
      x: 1.2,
      y: 4.5,
      fontSize: 32,
      color: COLOR_GOLD,
      bold: true,
      fontFace: 'Arial'
    });

    // Right card details
    slide6.addShape(pptx.shapes.RECTANGLE, {
      x: 6.8,
      y: 1.4,
      w: 5.6,
      h: 4.8,
      fill: { color: COLOR_BG_DARK },
      line: { color: COLOR_GOLD, width: 1 }
    });

    slide6.addText('VALUATION DRAG RATIONALE & ANATOMY', {
      x: 7.1,
      y: 1.7,
      fontSize: 10,
      color: COLOR_GOLD,
      bold: true,
      fontFace: 'Arial'
    });

    slide6.addText(parsed.irrRationale || 'Returns adjusted for industry specific risk signals.', {
      x: 7.1,
      y: 2.2,
      w: 5.0,
      h: 3.7,
      fontSize: 12,
      color: COLOR_TEXT_LIGHT,
      fontFace: 'Arial',
      lineSpacing: 18
    });

    pptx.writeFile({ fileName: `ExitIQ_Strategic_Report_${name.replace(/\s+/g, '_')}.pptx` });
  };

  const handleViewFullAnalysis = (card) => {
    const fullCompany = portfolioData.find(c => c.company === card.company) || {
      company: card.company,
      sector: 'Unknown',
      holdPeriod: 'N/A',
      irr: 'N/A',
      aiRisk: 'N/A',
      exitScore: card.score
    };
    handleStartAnalysis(fullCompany);
  };

  const handleRunAnalysis = () => {
    handleStartAnalysis(portfolioData[0]);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    let filtered = portfolioData.filter(item => 
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sector.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!sortColumn) return filtered;

    return [...filtered].sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (sortColumn === 'holdPeriod') {
        valA = parseFloat(a.holdPeriod);
        valB = parseFloat(b.holdPeriod);
      } else if (sortColumn === 'irr') {
        valA = parseFloat(a.irr);
        valB = parseFloat(b.irr);
      } else if (sortColumn === 'aiRisk') {
        const riskOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        valA = riskOrder[a.aiRisk];
        valB = riskOrder[b.aiRisk];
      } else if (typeof valA === 'string') {
        return sortDirection === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="relative min-h-screen">
      {showLogin && (
        <div 
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-white px-4 py-8 font-sans antialiased ${
            isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backgroundColor: '#FFFFFF',
            transition: 'opacity 0.6s ease-in-out'
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-center max-w-xl w-full text-center gap-6">
            <div className="text-[#111111] text-center font-bold tracking-tight animate-fadeIn" style={{ fontSize: '48px', fontWeight: 700 }}>
              ExitIQ
            </div>
            <div className="w-[120px] h-[2px] bg-accent-gold mx-auto"></div>
            <p className="text-[#444444] text-center" style={{ fontSize: '16px', fontWeight: 300, maxWidth: '600px', lineHeight: '1.8', opacity: 0.85 }}>
              AI-powered exit intelligence that tells private equity investors exactly when to exit, who to sell to, and which portfolio companies are at risk of AI disruption destroying their value before they can.
            </p>
            <p className="text-[#C9A84C] text-center" style={{ fontSize: '12px', letterSpacing: '2px', marginTop: '32px', textTransform: 'uppercase' }}>
              Conditor Capital — Confidential
            </p>
            
            <form onSubmit={handleAccessDashboard} className="w-full max-w-[320px] flex flex-col gap-3 mt-4">
              <input
                type="email"
                placeholder="Enter your firm email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-[#111111] border border-[#E5E5E5] rounded-[8px] px-4 py-2.5 text-xs text-center placeholder-[#A0A0A0] focus:outline-none focus:border-[#C9A84C] transition-colors"
                style={{
                  backgroundColor: '#FAFAFA',
                  color: '#111111',
                  borderRadius: '8px'
                }}
              />
              <button
                type="submit"
                className="w-full py-2.5 font-bold text-xs text-black transition-colors cursor-pointer text-center hover:bg-[#B8973B]"
                style={{
                  backgroundColor: '#C9A84C',
                  color: '#000000',
                  borderRadius: '8px'
                }}
              >
                Access Dashboard
              </button>
            </form>
          </div>
          
          <div className="text-[#A0A0A0] text-center" style={{ fontSize: '11px' }}>
            Powered by Claude AI
          </div>
        </div>
      )}

      {/* Main App Content */}
      {isLoggedIn && (
        <div className="flex min-h-screen bg-white text-text-dark font-sans antialiased">
      {/* Fixed Left Sidebar (240px wide) */}
      <aside className="w-[240px] bg-sidebar-bg flex flex-col justify-between fixed top-0 bottom-0 left-0 z-20 border-r border-[#E5E5E5]/10">
        
        {/* Top of Sidebar */}
        <div className="px-6 pt-8">
          <div className="flex items-center gap-3 mb-8">
            {/* Small Gold Square Icon */}
            <div className="w-4 h-4 bg-accent-gold flex-shrink-0" />
            <span className="text-white text-xl font-bold tracking-tight">ExitIQ</span>
          </div>

          {/* Navigation Items */}
          <nav className={`flex flex-col gap-1.5 transition-all duration-300 ${
            isTourActive && tourStep === 1 
              ? 'ring-2 ring-accent-gold ring-offset-2 ring-offset-sidebar-bg rounded-lg shadow-[0_0_15px_rgba(201,168,76,0.6)] animate-pulse' 
              : ''
          }`}>
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`sidebar-nav-btn flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'active text-[#C9A84C] font-semibold' 
                      : 'text-[#A0A0A0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent 
                      size={18} 
                      className="transition-colors" 
                    />
                    <span className="text-sm transition-colors">{item.label}</span>
                  </div>
                  
                  {/* Gold Dot Badge for Exit Signals */}
                  {item.badge && (
                    <div className="w-2 h-2 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Centered Thin Gold Line Divider */}
          <div className="w-full flex justify-center mt-6">
            <div className="h-[1px] w-[60%] bg-[#C9A84C]/40" />
          </div>
        </div>

        {/* Bottom of Sidebar */}
        <div className="px-6 pb-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 overflow-hidden">
              {/* User Avatar Placeholder (Conditor Capital Logo) */}
              <div className="w-8 h-8 rounded-md bg-white overflow-hidden flex items-center justify-center border border-white/20 p-0.5 flex-shrink-0">
                <img 
                  src={conditorLogo} 
                  alt="Conditor Capital Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col overflow-hidden max-w-[110px]">
                <span className="text-white text-xs font-semibold truncate">{loginName || 'Conditor Capital'}</span>
                <span className="text-[#A0A0A0] text-[10px] truncate">{loginEmail || 'Administrator'}</span>
              </div>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title="Logout"
              className="text-[#A0A0A0] hover:text-white transition-colors cursor-pointer p-1.5 rounded hover:bg-white/5 flex-shrink-0"
            >
              <LogOut size={16} />
            </button>
          </div>
          <div className="text-[10px] text-[#A0A0A0]/60 text-center select-none font-medium">
            Powered by Claude AI
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-[240px] min-h-screen bg-white">
        
        {/* Top Bar (64px tall) */}
        <header className="h-16 border-b border-border-color bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="page-title text-xl font-bold text-[#111111] tracking-tight">
            {activeItem.label}
          </h1>
          
          {/* Right side controls */}
          <div className="flex items-center gap-6">
            {/* Live Clock */}
            <div className="text-xs text-[#A0A0A0] font-medium flex items-center gap-2 select-none">
              <Clock size={14} className="text-[#A0A0A0]" />
              <span>
                {currentTime.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>

            {/* Pulsing Gold Dot next to Run AI Analysis */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-gold pulse-slow" title="Live data connection active" />
              
              {/* Run AI Analysis Button */}
              <button
                onClick={handleRunAnalysis}
                className={`flex items-center gap-2 px-5 py-2 bg-sidebar-bg hover:bg-accent-gold text-white hover:text-black font-semibold text-sm rounded-full border border-accent-gold hover:border-black transition-all duration-300 shadow-sm cursor-pointer ${
                  isTourActive && tourStep === 6 
                    ? 'ring-2 ring-accent-gold ring-offset-2 shadow-[0_0_15px_rgba(201,168,76,0.6)] animate-pulse' 
                    : ''
                }`}
              >
                <Sparkles size={14} />
                <span>Run AI Analysis</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main key={activeTab} className="px-10 py-8 bg-white min-h-[calc(100vh-64px)] overflow-y-auto animate-fadeIn">
          {activeTab === 'ai-disruption' ? (
            <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-fadeIn">
              
              {/* Header */}
              <div className="flex flex-col gap-1">
                <span className="section-label">Disruption Diagnostics</span>
                <h2 className="section-heading">AI Disruption Risk Assessment</h2>
                <p className="text-sm text-[#A0A0A0] max-w-2xl leading-relaxed">
                  How vulnerable are your portfolio companies to AI disruption before exit? Peak risk aggregates short exit windows and high automation exposure.
                </p>
              </div>

              {/* Chart Card */}
              <div className={`chart-card-container transition-all duration-300 ${
                isTourActive && tourStep === 4 
                  ? 'ring-2 ring-accent-gold ring-offset-4 rounded-xl shadow-[0_0_15px_rgba(201,168,76,0.5)] animate-pulse' 
                  : ''
              }`}>
                <div className="flex flex-col gap-1 mb-6">
                  <span className="section-label">Vulnerability Matrix</span>
                  <h3 className="section-heading">AI Exposure vs Time to Exit</h3>
                </div>
                <div className="w-full h-[360px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                      <XAxis 
                        type="number" 
                        dataKey="exposure" 
                        name="AI Exposure" 
                        domain={[0, 100]} 
                        reversed 
                        stroke="#A0A0A0"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        label={{ value: 'AI Disruption Exposure (High ➔ Low)', position: 'insideBottom', offset: -10, fill: '#111111', fontSize: 11, fontWeight: 'semibold' }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="exitMonths" 
                        name="Time to Exit" 
                        domain={[0, 36]} 
                        reversed 
                        stroke="#A0A0A0"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        label={{ value: 'Time to Exit (months)', angle: -90, position: 'insideLeft', offset: -5, fill: '#111111', fontSize: 11, fontWeight: 'semibold' }}
                      />
                      
                      {/* Danger Zone: High Exposure (50 to 100) + Short Exit (0 to 12 months) */}
                      {/* Note: since reversed, visually this displays at the top-left */}
                      <ReferenceArea 
                        x1={50} 
                        x2={100} 
                        y1={0} 
                        y2={12} 
                        fill="#EF4444" 
                        fillOpacity={0.06}
                        stroke="#EF4444"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        label={{ 
                          value: 'DANGER ZONE: EXIT URGENTLY', 
                          position: 'insideTopLeft', 
                          fill: '#EF4444', 
                          fontSize: 10, 
                          fontWeight: 'bold',
                          offset: 12
                        }}
                      />
                      
                      <Tooltip content={<CustomScatterTooltip />} />
                      
                      <Scatter 
                        name="Companies" 
                        data={scatterData} 
                        shape={(props) => {
                          const { cx, cy, payload } = props;
                          if (!cx || !cy) return null;
                          
                          let color = '#22C55E';
                          let size = 8;
                          if (payload.risk === 'High') {
                            color = '#EF4444';
                            size = 13;
                          } else if (payload.risk === 'Medium') {
                            color = '#C9A84C';
                            size = 10;
                          }
                          
                          return (
                            <g 
                              className="cursor-pointer"
                              onClick={() => {
                                const fullComp = portfolioData.find(c => c.company === payload.name) || {
                                  company: payload.name,
                                  sector: 'Unknown',
                                  holdPeriod: `${(36 - payload.exitMonths) / 12} yrs`,
                                  irr: '20%',
                                  aiRisk: payload.risk,
                                  exitScore: payload.exposure
                                };
                                handleStartAnalysis(fullComp);
                              }}
                            >
                              <circle 
                                cx={cx} 
                                cy={cy} 
                                r={size} 
                                fill={color} 
                                stroke="#FFFFFF" 
                                strokeWidth={2}
                                className="transition-all duration-300"
                                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))' }}
                              />
                              <text 
                                x={cx + size + 6} 
                                y={cy + 4} 
                                fontSize={10} 
                                fill="#111111" 
                                fontWeight="semibold"
                                className="pointer-events-none select-none font-sans"
                              >
                                {payload.name}
                              </text>
                            </g>
                          );
                        }}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-8 mt-6 pt-4 border-t border-[#E5E5E5]/60 text-xs font-semibold text-[#111111]">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444] border-2 border-white shadow-sm" />
                    <span>High AI Risk (Urgent Action Required)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#C9A84C] border-2 border-white shadow-sm" />
                    <span>Medium AI Risk (Monitor closely)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-white shadow-sm" />
                    <span>Low AI Risk (Stable Outlook)</span>
                  </div>
                </div>
              </div>

              {/* Accordion List */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="section-label">Signal Breakdown</span>
                  <h3 className="section-heading">Disruption Signal Breakdown</h3>
                </div>
                
                {/* Accordion 1: Workforce Automation Risk */}
                <div className="white-card-no-padding overflow-hidden">
                  <button 
                    onClick={() => setExpandedAccordion(expandedAccordion === 'workforce' ? null : 'workforce')}
                    className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-[#F9F9F9]/50 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#F9F9F9] rounded-lg text-accent-gold border border-border-color">
                        <Users size={18} />
                      </div>
                      <span className="text-sm font-bold text-[#111111]">Workforce Automation Risk</span>
                    </div>
                    {expandedAccordion === 'workforce' ? <ChevronUp size={18} className="text-[#A0A0A0]" /> : <ChevronDown size={18} className="text-[#A0A0A0]" />}
                  </button>
                  
                  {expandedAccordion === 'workforce' && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#E5E5E5]/40 grid grid-cols-3 gap-6 animate-slideDown">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">Automatable Roles</span>
                        <span className="text-2xl font-bold text-red-600">64%</span>
                        <div className="w-full bg-[#F9F9F9] h-1.5 rounded-full overflow-hidden border border-border-color/60">
                          <div className="bg-red-500 h-full rounded-full" style={{ width: '64%' }} />
                        </div>
                        <p className="text-[11px] text-[#A0A0A0] leading-normal">
                          Administrative, operational and customer support workflows face high immediate automation vulnerability.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">Hiring Freeze Signals</span>
                        <span className="text-sm font-bold text-[#111111] mt-1">Active Freeze (Non-Tech)</span>
                        <p className="text-[11px] text-[#A0A0A0] leading-relaxed">
                          Hiring freeze implemented across support departments in TechVentures Ltd and EduPrime Ltd. Replaced by pilot agentic tools.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">Glassdoor Sentiment</span>
                        <span className="text-sm font-bold text-[#111111] mt-1">-1.2★ Rating Decrease</span>
                        <p className="text-[11px] text-[#A0A0A0] leading-relaxed font-sans">
                          Internal worker satisfaction scores dipped significantly citing anxiety over redundant manual workflows and tech transition.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Competitive AI Adoption */}
                <div className="white-card-no-padding overflow-hidden">
                  <button 
                    onClick={() => setExpandedAccordion(expandedAccordion === 'competitive' ? null : 'competitive')}
                    className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-[#F9F9F9]/50 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#F9F9F9] rounded-lg text-accent-gold border border-border-color">
                        <Brain size={18} />
                      </div>
                      <span className="text-sm font-bold text-[#111111]">Competitive AI Adoption</span>
                    </div>
                    {expandedAccordion === 'competitive' ? <ChevronUp size={18} className="text-[#A0A0A0]" /> : <ChevronDown size={18} className="text-[#A0A0A0]" />}
                  </button>
                  
                  {expandedAccordion === 'competitive' && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#E5E5E5]/40 grid grid-cols-3 gap-6 animate-slideDown">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">Peer R&D CapEx</span>
                        <span className="text-2xl font-bold text-accent-gold">+140% YoY</span>
                        <div className="w-full bg-[#F9F9F9] h-1.5 rounded-full overflow-hidden border border-border-color/60">
                          <div className="bg-accent-gold h-full rounded-full" style={{ width: '80%' }} />
                        </div>
                        <p className="text-[11px] text-[#A0A0A0] leading-normal">
                          Direct market competitors have significantly expanded software budgets to deploy generative interfaces.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">Patent Filings</span>
                        <span className="text-sm font-bold text-[#111111] mt-1">12 New Orchestration Patents</span>
                        <p className="text-[11px] text-[#A0A0A0] leading-relaxed">
                          Peers filed proprietary patents for LLM-based logistics coordination, creating entry barriers for Apex Logistics.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">Market Share Displacement</span>
                        <span className="text-sm font-bold text-red-600 mt-1">High Risk</span>
                        <p className="text-[11px] text-[#A0A0A0] leading-relaxed">
                          Low-complexity service contracts are increasingly bid at 30% discount by competitors utilizing AI-heavy workflows.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Revenue Model Vulnerability */}
                <div className="white-card-no-padding overflow-hidden">
                  <button 
                    onClick={() => setExpandedAccordion(expandedAccordion === 'revenue' ? null : 'revenue')}
                    className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-[#F9F9F9]/50 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#F9F9F9] rounded-lg text-accent-gold border border-border-color">
                        <DollarSign size={18} />
                      </div>
                      <span className="text-sm font-bold text-[#111111]">Revenue Model Vulnerability</span>
                    </div>
                    {expandedAccordion === 'revenue' ? <ChevronUp size={18} className="text-[#A0A0A0]" /> : <ChevronDown size={18} className="text-[#A0A0A0]" />}
                  </button>
                  
                  {expandedAccordion === 'revenue' && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#E5E5E5]/40 grid grid-cols-3 gap-6 animate-slideDown">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">AI-Replaceable Revenue</span>
                        <span className="text-2xl font-bold text-red-600">45%</span>
                        <div className="w-full bg-[#F9F9F9] h-1.5 rounded-full overflow-hidden border border-border-color/60">
                          <div className="bg-red-500 h-full rounded-full" style={{ width: '45%' }} />
                        </div>
                        <p className="text-[11px] text-[#A0A0A0] leading-normal">
                          Contract value linked to billing-by-hour operational tasks, easily displaceable by software agents.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">Customer Churn Indicators</span>
                        <span className="text-sm font-bold text-[#111111] mt-1">3 Client Cancellations</span>
                        <p className="text-[11px] text-[#A0A0A0] leading-relaxed">
                          Clients migrated services in-house citing the development of customized open-source AI processing platforms.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">Pricing Pressure</span>
                        <span className="text-sm font-bold text-red-600 mt-1">15% - 20% Renewals Drop</span>
                        <p className="text-[11px] text-[#A0A0A0] leading-relaxed">
                          Upcoming subscription renewals face severe margin contraction pressure as buyers demand productivity discounts.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          ) : activeTab === 'portfolio' ? (
            <div className="max-w-6xl mx-auto flex flex-col gap-8 section-container-vertical animate-fadeIn">
              
              {/* Header with section label and section heading */}
              <div className="flex flex-col gap-1">
                <span className="section-label">Managed Assets</span>
                <h2 className="section-heading">Portfolio Company Registry</h2>
              </div>

              {/* Search Bar Above Table */}
              <div className="flex items-center justify-between">
                <div className="relative w-full max-w-md">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#A0A0A0]">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by company or sector..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border-color rounded-lg bg-white text-[#111111] placeholder-[#A0A0A0] text-sm focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all"
                  />
                </div>
                <div className="text-xs text-[#A0A0A0] font-medium">
                  Showing {sortedData.length} of {portfolioData.length} companies
                </div>
              </div>

              {/* Sortable Table */}
              <div className={`white-card-no-padding overflow-hidden transition-all duration-300 ${
                isTourActive && tourStep === 2 
                  ? 'ring-2 ring-accent-gold ring-offset-4 rounded-xl shadow-[0_0_15px_rgba(201,168,76,0.5)] animate-pulse' 
                  : ''
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-color bg-[#F9F9F9]">
                        {[
                          { key: 'company', label: 'Company' },
                          { key: 'sector', label: 'Sector' },
                          { key: 'entryYear', label: 'Entry Year' },
                          { key: 'holdPeriod', label: 'Hold Period' },
                          { key: 'irr', label: 'Current IRR' },
                          { key: 'exitScore', label: 'Exit Score' },
                          { key: 'aiRisk', label: 'AI Risk' },
                          { key: 'status', label: 'Status' }
                        ].map((col) => {
                          const isActive = sortColumn === col.key;
                          return (
                            <th 
                              key={col.key}
                              onClick={() => handleSort(col.key)}
                              className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#111111] cursor-pointer hover:bg-white/50 select-none transition-colors"
                            >
                              <div className="flex items-center gap-1.5">
                                <span>{col.label}</span>
                                <ArrowUpDown 
                                  size={12} 
                                  className={`transition-colors ${isActive ? 'text-accent-gold' : 'text-[#A0A0A0]/60'}`} 
                                />
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color">
                      {sortedData.map((row, index) => {
                        // Exit Score Pill styling
                        let exitScoreClass = '';
                        if (row.exitScore > 65) {
                          exitScoreClass = 'bg-green-50 text-green-700 border-green-200';
                        } else if (row.exitScore >= 40) {
                          exitScoreClass = 'bg-amber-50 text-amber-700 border-amber-200';
                        } else {
                          exitScoreClass = 'bg-red-50 text-red-700 border-red-200';
                        }

                        // AI Risk Badge styling
                        let aiRiskClass = '';
                        let dotColor = '';
                        if (row.aiRisk === 'High') {
                          aiRiskClass = 'bg-red-50 text-red-700 border-red-100';
                          dotColor = 'bg-red-500';
                        } else if (row.aiRisk === 'Medium') {
                          aiRiskClass = 'bg-amber-50 text-amber-700 border-amber-100';
                          dotColor = 'bg-amber-500';
                        } else {
                          aiRiskClass = 'bg-green-50 text-green-700 border-green-100';
                          dotColor = 'bg-green-500';
                        }

                        // Status Badge styling
                        let statusClass = 'text-[#111111] bg-[#F9F9F9] border-border-color';
                        if (row.status === 'Exit Prep') {
                          statusClass = 'text-accent-gold bg-[#C9A84C]/5 border-[#C9A84C]/25';
                        } else if (row.status === 'Under Intent') {
                          statusClass = 'text-blue-600 bg-blue-50 border-blue-100';
                        }

                        return (
                          <tr key={index} className="hover:bg-[#F9F9F9]/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-[#111111]">
                              {row.company}
                            </td>
                            <td className="px-6 py-4 text-sm text-[#A0A0A0]">
                              {row.sector}
                            </td>
                            <td className="px-6 py-4 text-sm text-[#111111]">
                              {row.entryYear}
                            </td>
                            <td className="px-6 py-4 text-sm text-[#A0A0A0]">
                              {row.holdPeriod}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-black">
                              {row.irr}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${exitScoreClass}`}>
                                {row.exitScore}/100
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border ${aiRiskClass}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                                {row.aiRisk}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded border text-[11px] font-bold uppercase tracking-wider ${statusClass}`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {sortedData.length === 0 && (
                        <tr>
                          <td colSpan={8} className="px-6 py-16">
                            <div className="flex flex-col items-center justify-center text-center text-[#A0A0A0] text-sm gap-2">
                              <AlertCircle className="w-8 h-8 text-[#A0A0A0] mb-1" />
                              <span className="font-medium text-[#444444]">No signals detected</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          ) : activeTab === 'exit-signals' ? (
            <div className="max-w-6xl mx-auto flex flex-col gap-8 section-container-vertical animate-fadeIn">
              
              {/* Header with section label and section heading */}
              <div className="flex flex-col gap-1">
                <span className="section-label">Exit Recommendations</span>
                <h2 className="section-heading">Divestment Preparedness Scores</h2>
              </div>

              {/* Grid 3-Column Responsive for Exit Signals */}
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
                isTourActive && tourStep === 3 
                  ? 'ring-2 ring-accent-gold ring-offset-4 rounded-xl shadow-[0_0_15px_rgba(201,168,76,0.5)] animate-pulse' 
                  : ''
              }`}>
                {signalCardsData.map((card, idx) => {
                  
                  // Radial SVG config
                  const radius = 18;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (card.score / 100) * circumference;

                  return (
                    <div 
                      key={idx}
                      className="white-card flex flex-col justify-between gap-6"
                    >
                      {/* Top Row: Company & Radial Score */}
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1.5 animate-fadeIn">
                          <h3 className="text-xl font-bold text-[#111111] tracking-tight">
                            {card.company}
                          </h3>
                          {/* Recommended Exit Badge */}
                          <div className="px-2.5 py-1 rounded bg-[#F9F9F9] border border-border-color text-[11px] font-bold tracking-wide text-[#111111] uppercase w-fit">
                            Recommended Exit: <span className="text-accent-gold font-bold">{card.exitType}</span>
                          </div>
                        </div>

                        {/* Radial Progress SVG */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="relative flex items-center justify-center w-14 h-14 bg-[#F9F9F9] rounded-full border border-border-color/40">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle
                                cx="28"
                                cy="28"
                                r={radius}
                                className="stroke-[#E5E5E5]"
                                strokeWidth="3"
                                fill="transparent"
                              />
                              <circle
                                cx="28"
                                cy="28"
                                r={radius}
                                className="stroke-accent-gold"
                                strokeWidth="3"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute text-[11px] font-bold text-[#111111]">
                              {card.score}%
                            </span>
                          </div>
                          <span className="text-[9px] text-[#A0A0A0] uppercase font-bold tracking-wider">
                            Exit Score
                          </span>
                        </div>
                      </div>

                      {/* Middle: Bullet points */}
                      <div className="flex flex-col gap-2.5 border-t border-[#E5E5E5]/60 pt-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A0A0A0]">
                          Trigger Signals
                        </span>
                        <ul className="flex flex-col gap-2 list-none">
                          {card.reasons.map((reason, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2.5 text-xs text-[#A0A0A0] leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom: Action button */}
                      <div className="flex justify-end mt-2">
                        <button 
                          onClick={() => handleViewFullAnalysis(card)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-sidebar-bg hover:bg-accent-gold text-white hover:text-black font-bold text-xs rounded-full border border-[#C9A84C]/25 hover:border-black transition-all duration-300 shadow-sm cursor-pointer"
                        >
                          <span>View Full Analysis</span>
                          <Sparkles size={11} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ) : activeTab === 'dashboard' ? (
            <div className="max-w-6xl mx-auto flex flex-col gap-8 section-container-vertical animate-fadeIn">
              
              {/* Header with section label and section heading */}
              <div className="flex flex-col gap-1">
                <span className="section-label">Portfolio Overview</span>
                <h2 className="section-heading">Key Exit Metrics</h2>
              </div>

              {/* 4 Metric Cards in 2x2 Grid */}
              <div className="grid grid-cols-2 gap-6">
                
                {/* Metric Card 1: Portfolio Companies */}
                <div className="white-card metric-card flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-wider">
                      Portfolio Companies
                    </span>
                    <span className="metric-number text-3xl font-bold text-[#111111] tracking-tight">12</span>
                    <span className="text-[10px] text-green-500 font-semibold mt-1">
                      +2 in active pipeline
                    </span>
                  </div>
                  <div className="p-3 bg-[#F9F9F9] rounded-xl text-[#111111] border border-border-color">
                    <Briefcase size={22} />
                  </div>
                </div>

                {/* Metric Card 2: Avg. Hold Period */}
                <div className="white-card metric-card flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-wider">
                      Avg. Hold Period
                    </span>
                    <span className="metric-number text-3xl font-bold text-[#111111] tracking-tight">4.2 yrs</span>
                    <span className="text-[10px] text-[#A0A0A0] font-semibold mt-1">
                      -0.4 yrs vs industry avg
                    </span>
                  </div>
                  <div className="p-3 bg-[#F9F9F9] rounded-xl text-[#111111] border border-border-color">
                    <Clock size={22} />
                  </div>
                </div>

                {/* Metric Card 3: At-Risk Exits */}
                <div className="white-card metric-card flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-wider">
                      At-Risk Exits
                    </span>
                    <span className="metric-number text-3xl font-bold text-red-600 tracking-tight">5</span>
                    <span className="text-[10px] text-red-500 font-semibold mt-1">
                      Requires immediate attention
                    </span>
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl text-red-600 border border-red-100">
                    <AlertTriangle size={22} />
                  </div>
                </div>

                {/* Metric Card 4: Optimal Exit Window */}
                <div className="white-card metric-card flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-wider">
                      Optimal Exit Window
                    </span>
                    <span className="metric-number text-3xl font-bold text-accent-gold tracking-tight">Q3 2026</span>
                    <span className="text-[10px] text-accent-gold/80 font-semibold mt-1">
                      Based on AI disruption scoring
                    </span>
                  </div>
                  <div className="p-3 bg-[#C9A84C]/10 rounded-xl text-accent-gold border border-[#C9A84C]/20">
                    <Calendar size={22} />
                  </div>
                </div>

              </div>

              {/* Line Chart: Portfolio IRR Trend vs Exit Window Score */}
              <div className="chart-card-container">
                <div className="flex flex-col gap-1 mb-6">
                  <span className="section-label">Return Analytics</span>
                  <h3 className="section-heading">Portfolio IRR Trend vs Exit Window Score</h3>
                </div>
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#A0A0A0" 
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis 
                        stroke="#A0A0A0" 
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        verticalAlign="top" 
                        height={36} 
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '12px', paddingBottom: '16px' }}
                      />
                      <Line 
                        type="monotone" 
                        name="IRR %" 
                        dataKey="irr" 
                        stroke="#000000" 
                        strokeWidth={2}
                        dot={{ r: 4, stroke: '#000000', strokeWidth: 1.5, fill: '#FFFFFF' }}
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#000000' }}
                        isAnimationActive={true}
                        animationDuration={1200}
                        animationEasing="ease-in-out"
                      />
                      <Line 
                        type="monotone" 
                        name="Exit Score" 
                        dataKey="score" 
                        stroke="#C9A84C" 
                        strokeWidth={2}
                        dot={<CustomExitScoreDot />}
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#C9A84C' }}
                        isAnimationActive={true}
                        animationDuration={1200}
                        animationEasing="ease-in-out"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Alert Feed Section */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 mb-2">
                  <span className="section-label">Live Signals</span>
                  <h3 className="section-heading">Active Exit Risks & Alerts</h3>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  
                  {/* Card 1: TechVentures Ltd */}
                  <div className="white-card alert-card-red border-l-4 border-l-red-500 flex flex-col justify-between hover:border-l-red-500">
                    <div>
                      <div className="flex items-center gap-2 text-red-500 mb-3">
                        <AlertCircle size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">High Risk Alert</span>
                      </div>
                      <h4 className="text-[#111111] font-bold text-base mb-2">TechVentures Ltd</h4>
                      <p className="text-xs text-[#A0A0A0] leading-relaxed">
                        AI disruption risk <span className="text-red-500 font-semibold">HIGH</span>. Recommend exit within 90 days.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: HealthBridge Group */}
                  <div className="white-card alert-card-gold border-l-4 border-l-accent-gold flex flex-col justify-between hover:border-l-accent-gold">
                    <div>
                      <div className="flex items-center gap-2 text-accent-gold mb-3">
                        <Activity size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Buyer Interest</span>
                      </div>
                      <h4 className="text-[#111111] font-bold text-base mb-2">HealthBridge Group</h4>
                      <p className="text-xs text-[#A0A0A0] leading-relaxed">
                        Optimal buyer window open. <span className="text-accent-gold font-semibold">3 strategic acquirers</span> identified.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: RetailCore PLC */}
                  <div className="white-card alert-card-green border-l-4 border-l-green-500 flex flex-col justify-between hover:border-l-green-500">
                    <div>
                      <div className="flex items-center gap-2 text-green-500 mb-3">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Target Reached</span>
                      </div>
                      <h4 className="text-[#111111] font-bold text-base mb-2">RetailCore PLC</h4>
                      <p className="text-xs text-[#A0A0A0] leading-relaxed">
                        IRR target achieved. Exit Score: <span className="text-green-500 font-semibold">74/100</span>.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ) : activeTab === 'exit-recommender' ? (
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
              
              {/* Header */}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-xl font-bold text-[#111111] tracking-tight">
                  Structured Exit Recommender
                </h2>
                <p className="text-[#A0A0A0] text-sm max-w-2xl leading-relaxed">
                  Evaluate company characteristics, market conditions, and AI exposure signals to generate strategic divestment recommendations.
                </p>
              </div>

              {/* Step-by-Step Form Wrapper Card */}
              <div className={`bg-white border border-border-color rounded-[12px] p-6 shadow-sm hover:border-[#A0A0A0] transition-all duration-300 flex flex-col gap-6 ${
                isTourActive && tourStep === 5 
                  ? 'ring-2 ring-accent-gold ring-offset-4 rounded-xl shadow-[0_0_15px_rgba(201,168,76,0.5)] animate-pulse' 
                  : ''
              }`}>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between max-w-lg mx-auto relative">
                    {/* Connector Line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#E5E5E5] z-0" />
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent-gold transition-all duration-300 z-0"
                      style={{ width: `${((recommenderStep - 1) / 2) * 100}%` }}
                    />
                    
                    {/* Step 1 Circle */}
                    <div className="z-10 flex flex-col items-center gap-2">
                      <button 
                        onClick={() => setRecommenderStep(1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                          recommenderStep >= 1 
                            ? 'bg-[#0A0A0A] text-white border border-accent-gold shadow-[0_0_8px_rgba(201,168,76,0.3)]' 
                            : 'bg-[#F9F9F9] text-[#A0A0A0] border border-border-color'
                        }`}
                      >
                        1
                      </button>
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${recommenderStep >= 1 ? 'text-[#111111]' : 'text-[#A0A0A0]'}`}>Profile</span>
                    </div>

                    {/* Step 2 Circle */}
                    <div className="z-10 flex flex-col items-center gap-2">
                      <button 
                        onClick={() => recommenderForm.companyName.trim() && setRecommenderStep(2)}
                        disabled={!recommenderForm.companyName.trim()}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                          recommenderStep >= 2 
                            ? 'bg-[#0A0A0A] text-white border border-accent-gold shadow-[0_0_8px_rgba(201,168,76,0.3)]' 
                            : 'bg-[#F9F9F9] text-[#A0A0A0] border border-border-color disabled:opacity-50'
                        }`}
                      >
                        2
                      </button>
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${recommenderStep >= 2 ? 'text-[#111111]' : 'text-[#A0A0A0]'}`}>Markets</span>
                    </div>

                    {/* Step 3 Circle */}
                    <div className="z-10 flex flex-col items-center gap-2">
                      <button 
                        onClick={() => recommenderForm.companyName.trim() && setRecommenderStep(3)}
                        disabled={!recommenderForm.companyName.trim()}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                          recommenderStep >= 3 
                            ? 'bg-[#0A0A0A] text-white border border-accent-gold shadow-[0_0_8px_rgba(201,168,76,0.3)]' 
                            : 'bg-[#F9F9F9] text-[#A0A0A0] border border-border-color disabled:opacity-50'
                        }`}
                      >
                        3
                      </button>
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${recommenderStep >= 3 ? 'text-[#111111]' : 'text-[#A0A0A0]'}`}>AI Risks</span>
                    </div>
                  </div>
                </div>

                {/* Form Step Content */}
                {recommenderStep === 1 && (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-2">Step 1: Company Profile</h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5 col-span-2">
                        <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">Company Name</label>
                        <input 
                          type="text" 
                          value={recommenderForm.companyName}
                          onChange={(e) => setRecommenderForm(prev => ({ ...prev, companyName: e.target.value }))}
                          placeholder="e.g. HealthBridge Group"
                          className="w-full border border-border-color rounded-lg px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">Sector</label>
                        <select 
                          value={recommenderForm.sector}
                          onChange={(e) => setRecommenderForm(prev => ({ ...prev, sector: e.target.value }))}
                          className="w-full border border-border-color rounded-lg px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all cursor-pointer"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Retail">Retail</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Consumer">Consumer</option>
                          <option value="FinTech">FinTech</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">Entry Year</label>
                        <input 
                          type="number" 
                          value={recommenderForm.entryYear}
                          onChange={(e) => setRecommenderForm(prev => ({ ...prev, entryYear: parseInt(e.target.value) || 2021 }))}
                          placeholder="e.g. 2021"
                          className="w-full border border-border-color rounded-lg px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">Current EBITDA (£M)</label>
                        <input 
                          type="number" 
                          value={recommenderForm.ebitda}
                          onChange={(e) => setRecommenderForm(prev => ({ ...prev, ebitda: parseFloat(e.target.value) || 0 }))}
                          placeholder="e.g. 15.0"
                          className="w-full border border-border-color rounded-lg px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">Target IRR %</label>
                        <input 
                          type="number" 
                          value={recommenderForm.targetIrr}
                          onChange={(e) => setRecommenderForm(prev => ({ ...prev, targetIrr: parseFloat(e.target.value) || 0 }))}
                          placeholder="e.g. 20.0"
                          className="w-full border border-border-color rounded-lg px-4 py-2.5 text-sm bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button 
                        onClick={() => recommenderForm.companyName.trim() ? setRecommenderStep(2) : alert('Please enter a Company Name')}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#0A0A0A] hover:bg-accent-gold border border-transparent hover:border-black text-white hover:text-black font-bold text-sm rounded-lg transition-all cursor-pointer shadow-sm animate-pulse-subtle"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}

                {recommenderStep === 2 && (
                  <div className="flex flex-col gap-6 animate-fadeIn">
                    <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-2">Step 2: Market Conditions</h3>
                    
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">Sector M&A Activity</label>
                          <span className="text-xs font-bold text-[#111111] bg-primary-surface border border-border-color px-2.5 py-1 rounded">{recommenderForm.maActivity}/100</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100"
                          value={recommenderForm.maActivity}
                          onChange={(e) => setRecommenderForm(prev => ({ ...prev, maActivity: parseInt(e.target.value) }))}
                          className="w-full h-1.5 bg-[#F0F0F0] rounded-lg appearance-none cursor-pointer accent-accent-gold"
                        />
                        <div className="flex justify-between text-[10px] text-[#A0A0A0]">
                          <span>Low Activity</span>
                          <span>Neutral</span>
                          <span>Peak Activity</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">Public Market Sentiment</label>
                          <span className="text-xs font-bold text-[#111111] bg-primary-surface border border-border-color px-2.5 py-1 rounded">{recommenderForm.marketSentiment}/100</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100"
                          value={recommenderForm.marketSentiment}
                          onChange={(e) => setRecommenderForm(prev => ({ ...prev, marketSentiment: parseInt(e.target.value) }))}
                          className="w-full h-1.5 bg-[#F0F0F0] rounded-lg appearance-none cursor-pointer accent-accent-gold"
                        />
                        <div className="flex justify-between text-[10px] text-[#A0A0A0]">
                          <span>Bear Market</span>
                          <span>Neutral</span>
                          <span>Bull Market IPO Window</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">Interest Rate Environment</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['Low', 'Medium', 'High'].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => setRecommenderForm(prev => ({ ...prev, interestRate: rate }))}
                              className={`py-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                recommenderForm.interestRate === rate
                                  ? 'bg-[#0A0A0A] border-accent-gold text-white shadow-[0_0_8px_rgba(201,168,76,0.2)]'
                                  : 'bg-white border-border-color text-[#111111] hover:bg-primary-surface'
                              }`}
                            >
                              {rate}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <button 
                        onClick={() => setRecommenderStep(1)}
                        className="px-6 py-2.5 border border-border-color hover:bg-primary-surface text-[#111111] font-bold text-sm rounded-lg transition-all cursor-pointer shadow-sm"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setRecommenderStep(3)}
                        className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-accent-gold border border-transparent hover:border-black text-white hover:text-black font-bold text-sm rounded-lg transition-all cursor-pointer shadow-sm"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}

                {recommenderStep === 3 && (
                  <div className="flex flex-col gap-6 animate-fadeIn">
                    <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-2">Step 3: AI Risk Inputs</h3>
                    <p className="text-xs text-[#A0A0A0] leading-relaxed -mt-3">
                      Identify disruption threats currently facing the asset's sector or operational model. These factors adjust optimal exit timing scores.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Risk Checkbox Cards */}
                      {[
                        { key: 'aiCompetitor', label: 'Competitor AI investment', desc: 'Direct competitors deploy proprietary models or automate services.' },
                        { key: 'aiWorkforce', label: 'Workforce automation risk', desc: 'High percentage of customer service/ops roles exposed to agent workflows.' },
                        { key: 'aiRevenue', label: 'Revenue model shift', desc: 'Vulnerability to shift from recurring SaaS licenses to API utility tokens.' },
                        { key: 'aiManagement', label: 'Management team instability', desc: 'Exit timeline misalignment or key leadership vacancies.' }
                      ].map((risk) => (
                        <div 
                          key={risk.key}
                          onClick={() => setRecommenderForm(prev => ({ ...prev, [risk.key]: !prev[risk.key] }))}
                          className={`border rounded-xl p-4 flex gap-3 transition-all cursor-pointer select-none text-left ${
                            recommenderForm[risk.key]
                              ? 'bg-[#C9A84C]/5 border-accent-gold shadow-[0_0_8px_rgba(201,168,76,0.15)]'
                              : 'bg-white border-border-color hover:border-[#B5B5B5]'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={recommenderForm[risk.key]}
                            onChange={() => {}} // Controlled by outer div click
                            className="mt-0.5 w-4 h-4 rounded text-accent-gold focus:ring-accent-gold border-border-color accent-accent-gold cursor-pointer"
                          />
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-[#111111] leading-none">{risk.label}</span>
                            <span className="text-[10px] text-[#A0A0A0] leading-normal">{risk.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between mt-4">
                      <button 
                        onClick={() => setRecommenderStep(2)}
                        className="px-6 py-2.5 border border-border-color hover:bg-primary-surface text-[#111111] font-bold text-sm rounded-lg transition-all cursor-pointer shadow-sm"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleGenerateRecommendation}
                        disabled={isRecommenderLoading}
                        className="flex items-center gap-2 px-8 py-3 bg-[#0A0A0A] hover:bg-accent-gold border border-accent-gold hover:border-black text-white hover:text-black font-bold text-sm rounded-lg transition-all cursor-pointer shadow-md disabled:opacity-50"
                      >
                        {isRecommenderLoading ? 'Analyzing...' : 'Generate Exit Recommendation'}
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Recommendation Loader */}
              {isRecommenderLoading && (
                <div className="bg-white border border-border-color rounded-[12px] p-6 shadow-sm flex flex-col items-center justify-center gap-4 min-h-[200px] hover:border-[#A0A0A0] transition-all duration-300">
                  <div className="w-8 h-8 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-semibold text-[#111111] animate-pulse">Analyzing company profile & market conditions with Claude AI...</span>
                </div>
              )}

              {/* Recommendation Results */}
              {!isRecommenderLoading && recommenderResult && (
                <div className="bg-white border border-border-color rounded-[12px] p-6 shadow-sm hover:border-[#A0A0A0] transition-all duration-300 flex flex-col gap-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#E5E5E5]/60 pb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-accent-gold" />
                      <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">AI Exit Timing Recommendation</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      {recommenderWarning && (
                        <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/25 text-accent-gold text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
                          <span>{recommenderWarning}</span>
                        </div>
                      )}
                      <button
                        onClick={handleDownloadPPTX}
                        className="flex items-center gap-1.5 px-4.5 py-2 bg-[#0A0A0A] hover:bg-accent-gold text-white hover:text-black font-bold text-xs rounded-full border border-accent-gold hover:border-black transition-all duration-300 cursor-pointer shadow-sm"
                      >
                        Download Presentation (PPTX)
                      </button>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none text-[#A0A0A0] flex flex-col gap-2">
                    {formatResponseText(recommenderResult)}
                  </div>
                </div>
              )}

            </div>
          ) : activeTab === 'market-intel' ? (
            <div className="max-w-6xl mx-auto flex flex-col gap-8 section-container-vertical text-left animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col gap-1 border-b border-[#E5E5E5]/60 pb-5">
                <span className="section-label">PE Macro Data</span>
                <h2 className="section-heading text-xl font-bold text-[#111111] tracking-tight">
                  Market Intelligence
                </h2>
                <p className="text-[#A0A0A0] text-sm max-w-2xl leading-relaxed">
                  Real-time private equity macro signals, live M&A transaction feed, and sector exit attractiveness heatmap.
                </p>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                
                {/* LEFT COLUMN: News Feed (60% width -> col-span-6) */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  <div className="white-card relative flex flex-col gap-6">
                    
                    {/* Header of feed */}
                    <div className="flex justify-between items-center border-b border-[#E5E5E5]/60 pb-4">
                      <div className="flex flex-col gap-1">
                        <span className="section-label">Market Pulse</span>
                        <h3 className="section-heading">PE Market Activity & Live Insights</h3>
                      </div>
                      <button 
                        onClick={fetchMarketIntelNews}
                        disabled={isMarketIntelLoading}
                        className="px-3 py-1.5 bg-transparent border border-accent-gold text-[#111111] hover:bg-accent-gold/10 font-bold text-[10px] rounded-lg transition-all cursor-pointer shadow-sm disabled:opacity-50"
                      >
                        {isMarketIntelLoading ? 'Refreshing...' : 'Refresh Feed'}
                      </button>
                    </div>

                    {/* Loading/Skeleton State */}
                    {isMarketIntelLoading ? (
                      <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((n) => (
                          <div key={n} className="border border-[#E5E5E5] rounded-xl p-5 flex flex-col gap-3 animate-pulse">
                            <div className="flex justify-between items-center">
                              <div className="w-16 h-4 bg-gray-200 rounded-full" />
                              <div className="w-20 h-3 bg-gray-200 rounded" />
                            </div>
                            <div className="w-3/4 h-5 bg-gray-200 rounded" />
                            <div className="space-y-2">
                              <div className="w-full h-3 bg-gray-200 rounded" />
                              <div className="w-5/6 h-3 bg-gray-200 rounded" />
                            </div>
                            <div className="w-2/3 h-3 bg-gray-200 rounded" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {marketIntelNews.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-16 text-[#A0A0A0] text-sm gap-2">
                            <AlertCircle className="w-8 h-8 text-[#A0A0A0] mb-1" />
                            <span className="font-medium text-[#444444]">No signals detected</span>
                          </div>
                        ) : (
                          marketIntelNews.map((news, idx) => {
                            const isBullish = news.sentiment === 'Bullish';
                            const isBearish = news.sentiment === 'Bearish';
                            
                            let badgeBg = 'bg-neutral-100 text-neutral-600 border border-neutral-200';
                            if (isBullish) badgeBg = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
                            if (isBearish) badgeBg = 'bg-rose-50 text-rose-700 border border-rose-200';
                            
                            return (
                              <div 
                                key={idx} 
                                className="white-card flex flex-col gap-2.5 bg-[#FFFFFF]"
                              >
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px] ${badgeBg}`}>
                                    {news.sentiment}
                                  </span>
                                  <div className="text-[#A0A0A0] font-semibold flex items-center gap-1.5">
                                    <span>{news.source}</span>
                                    <span>•</span>
                                    <span>{news.timestamp}</span>
                                  </div>
                                </div>
                                
                                <h4 className="text-[#111111] font-bold text-sm leading-snug">
                                  {news.headline}
                                </h4>
                                
                                <p className="text-xs text-[#A0A0A0] leading-relaxed">
                                  {news.summary}
                                </p>
                                
                                <p className="text-xs text-accent-gold italic font-medium pt-1 border-t border-[#F1F1F1]">
                                  <span className="font-bold not-italic mr-1">Exit Relevance:</span>
                                  {news.relevance}
                                </p>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN: Market Snapshot & Heatmap (40% width -> col-span-4) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  
                  {/* Market Snapshot Panel */}
                  <div className="white-card flex flex-col gap-5">
                    <div className="flex flex-col gap-1 border-b border-[#E5E5E5]/60 pb-3">
                      <span className="section-label">Macro Indicators</span>
                      <h3 className="section-heading">Market Snapshot</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Metric 1: FTSE 100 */}
                      <div className="border border-border-color rounded-xl p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">FTSE 100</span>
                        <span className="text-lg font-bold text-[#111111]">8,245.50</span>
                        <span className="text-[10px] text-emerald-600 font-bold">+0.42%</span>
                      </div>

                      {/* Metric 2: PE Deal Volume */}
                      <div className="border border-border-color rounded-xl p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">PE Deal Vol (EU)</span>
                        <span className="text-lg font-bold text-[#111111]">€14.8B</span>
                        <span className="text-[10px] text-[#A0A0A0] font-semibold">Weekly aggregate</span>
                      </div>

                      {/* Metric 3: M&A Sentiment Index */}
                      <div className="border border-border-color rounded-xl p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">M&A Sentiment</span>
                        <span className="text-lg font-bold text-[#111111]">72 / 100</span>
                        <span className="text-[10px] text-emerald-600 font-bold">Strong Buyer Demand</span>
                      </div>

                      {/* Metric 4: Interest Rate */}
                      <div className="border border-border-color rounded-xl p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider">Interest Rate (BoE)</span>
                        <span className="text-lg font-bold text-[#111111]">5.25%</span>
                        <span className="text-[10px] text-[#A0A0A0] font-semibold">Held steady</span>
                      </div>
                    </div>
                  </div>

                  {/* Sector Heatmap Panel */}
                  <div className="white-card flex flex-col gap-5">
                    <div className="flex flex-col gap-1 border-b border-[#E5E5E5]/60 pb-3">
                      <span className="section-label">Attractiveness Grid</span>
                      <h3 className="section-heading">Sector Heatmap</h3>
                      <p className="text-[10px] text-[#A0A0A0]">Exit attractiveness score out of 10 based on multiple indicators.</p>
                    </div>

                    {/* 3x3 Heatmap Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Tech: 8.5 (Green) */}
                      <div className="aspect-square bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Tech</span>
                        <span className="text-lg font-extrabold text-emerald-700 tracking-tight">8.5</span>
                      </div>

                      {/* Healthcare: 9.0 (Green) */}
                      <div className="aspect-square bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Health</span>
                        <span className="text-lg font-extrabold text-emerald-700 tracking-tight">9.0</span>
                      </div>

                      {/* Retail: 4.2 (Red) */}
                      <div className="aspect-square bg-rose-50 border border-rose-200 rounded-lg p-2.5 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                        <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">Retail</span>
                        <span className="text-lg font-extrabold text-rose-700 tracking-tight">4.2</span>
                      </div>

                      {/* Fintech: 7.8 (Green) */}
                      <div className="aspect-square bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Fintech</span>
                        <span className="text-lg font-extrabold text-emerald-700 tracking-tight">7.8</span>
                      </div>

                      {/* Logistics: 8.2 (Green) */}
                      <div className="aspect-square bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Logi</span>
                        <span className="text-lg font-extrabold text-emerald-700 tracking-tight">8.2</span>
                      </div>

                      {/* Energy: 6.5 (Amber) */}
                      <div className="aspect-square bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Energy</span>
                        <span className="text-lg font-extrabold text-amber-700 tracking-tight">6.5</span>
                      </div>

                      {/* Education: 5.8 (Amber) */}
                      <div className="aspect-square bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Edu</span>
                        <span className="text-lg font-extrabold text-amber-700 tracking-tight">5.8</span>
                      </div>

                      {/* Real Estate: 3.5 (Red) */}
                      <div className="aspect-square bg-rose-50 border border-rose-200 rounded-lg p-2.5 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                        <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">Reals</span>
                        <span className="text-lg font-extrabold text-rose-700 tracking-tight">3.5</span>
                      </div>

                      {/* Manufacturing: 6.2 (Amber) */}
                      <div className="aspect-square bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Manuf</span>
                        <span className="text-lg font-extrabold text-amber-700 tracking-tight">6.2</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            <div className="max-w-4xl mx-auto flex flex-col gap-8 section-container-vertical animate-fadeIn text-left">
              {/* Header */}
              <div className="flex flex-col gap-1 border-b border-[#E5E5E5]/60 pb-5">
                <span className="section-label">Configuration</span>
                <h2 className="section-heading text-xl font-bold text-[#111111] tracking-tight">
                  Platform Settings
                </h2>
                <p className="text-[#A0A0A0] text-sm max-w-2xl leading-relaxed">
                  Configure firm credentials, fund operational thresholds, automation policies, and AI sensitivity alerts.
                </p>
              </div>

              {/* SECTION 1 — Firm Profile */}
              <div className="white-card flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="section-label">Section 1</span>
                  <h3 className="section-heading">Firm Profile</h3>
                  <p className="text-xs text-[#A0A0A0]">Identify institutional and fund parameters for tailoring exit intelligence models.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Firm Name</label>
                    <input 
                      type="text" 
                      value={settingsFirmName} 
                      onChange={(e) => setSettingsFirmName(e.target.value)} 
                      className="w-full border border-border-color rounded-lg px-4 py-2.5 text-xs bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Headquarters</label>
                    <input 
                      type="text" 
                      value={settingsHeadquarters} 
                      onChange={(e) => setSettingsHeadquarters(e.target.value)} 
                      className="w-full border border-border-color rounded-lg px-4 py-2.5 text-xs bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Fund Stage</label>
                    <select 
                      value={settingsFundStage} 
                      onChange={(e) => setSettingsFundStage(e.target.value)} 
                      className="w-full border border-border-color rounded-lg px-4 py-2.5 text-xs bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all cursor-pointer"
                    >
                      <option value="Early">Early Stage</option>
                      <option value="Growth">Growth Equity</option>
                      <option value="Buyout">Buyout / LBO</option>
                      <option value="Multi-stage">Multi-stage</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">AUM (£ Billion)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={settingsAum} 
                      onChange={(e) => setSettingsAum(e.target.value)} 
                      className="w-full border border-border-color rounded-lg px-4 py-2.5 text-xs bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={() => alert('Firm profile changes saved successfully.')}
                    className="px-5 py-2.5 bg-transparent border border-accent-gold text-[#111111] hover:bg-accent-gold/10 font-bold text-xs rounded-lg transition-all cursor-pointer shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* SECTION 2 — Exit Preferences */}
              <div className="white-card flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="section-label">Section 2</span>
                  <h3 className="section-heading">Exit Preferences</h3>
                  <p className="text-xs text-[#A0A0A0]">Specify targets for exit modeling and trigger alerts.</p>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Target IRR Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Target IRR %</label>
                      <span className="text-xs font-bold text-accent-gold">{settingsTargetIrr}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="15" 
                      max="40" 
                      value={settingsTargetIrr} 
                      onChange={(e) => setSettingsTargetIrr(parseInt(e.target.value))} 
                      className="w-full h-1 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                    />
                  </div>

                  {/* Max Hold Period Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Max Hold Period (Years)</label>
                      <span className="text-xs font-bold text-[#111111]">{settingsMaxHoldPeriod} Years</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="10" 
                      value={settingsMaxHoldPeriod} 
                      onChange={(e) => setSettingsMaxHoldPeriod(parseInt(e.target.value))} 
                      className="w-full h-1 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                    />
                  </div>

                  {/* Toggle switches for preferred exit types */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Preferred Exit Types</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Strategic Sale */}
                      <label className="flex items-center justify-between p-3 border border-border-color rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition-colors">
                        <span className="text-xs font-medium text-[#111111]">Strategic Sale</span>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={settingsPrefStrategic} 
                            onChange={(e) => setSettingsPrefStrategic(e.target.checked)} 
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-[#E5E5E5] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A84C]" />
                        </div>
                      </label>

                      {/* IPO */}
                      <label className="flex items-center justify-between p-3 border border-border-color rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition-colors">
                        <span className="text-xs font-medium text-[#111111]">IPO</span>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={settingsPrefIpo} 
                            onChange={(e) => setSettingsPrefIpo(e.target.checked)} 
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-[#E5E5E5] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A84C]" />
                        </div>
                      </label>

                      {/* Sponsor-to-Sponsor */}
                      <label className="flex items-center justify-between p-3 border border-border-color rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition-colors">
                        <span className="text-xs font-medium text-[#111111]">Sponsor-to-Sponsor</span>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={settingsPrefSponsor} 
                            onChange={(e) => setSettingsPrefSponsor(e.target.checked)} 
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-[#E5E5E5] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A84C]" />
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Primary exit market dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Primary Exit Market</label>
                    <select 
                      value={settingsPrimaryMarket} 
                      onChange={(e) => setSettingsPrimaryMarket(e.target.value)} 
                      className="w-full border border-border-color rounded-lg px-4 py-2.5 text-xs bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all cursor-pointer"
                    >
                      <option value="UK">United Kingdom</option>
                      <option value="Europe">Continental Europe</option>
                      <option value="US">United States</option>
                      <option value="Global">Global Markets</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3 — AI & Alerts */}
              <div className="white-card flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="section-label">Section 3</span>
                  <h3 className="section-heading">AI & Alerts</h3>
                  <p className="text-xs text-[#A0A0A0]">Manage automated analysis parameters and risk notification frequencies.</p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Enable Claude Toggle */}
                  <label className="flex items-center justify-between p-4 border border-border-color rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-[#111111]">Enable Claude AI Analysis</span>
                      <span className="text-[10px] text-[#A0A0A0]">Runs semantic risk modeling and text generators on exits.</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={settingsEnableClaude} 
                        onChange={(e) => setSettingsEnableClaude(e.target.checked)} 
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#E5E5E5] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A84C]" />
                    </div>
                  </label>

                  {/* Live Market News Toggle */}
                  <label className="flex items-center justify-between p-4 border border-border-color rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-[#111111]">Live Market News Feed</span>
                      <span className="text-[10px] text-[#A0A0A0]">Updates signals according to active PE transactions globally.</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={settingsLiveNews} 
                        onChange={(e) => setSettingsLiveNews(e.target.checked)} 
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#E5E5E5] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A84C]" />
                    </div>
                  </label>

                  {/* Email alerts toggle */}
                  <label className="flex items-center justify-between p-4 border border-border-color rounded-lg cursor-pointer hover:bg-[#F9F9F9] transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-[#111111]">Email alerts for At-Risk exits</span>
                      <span className="text-[10px] text-[#A0A0A0]">Receive real-time alerts if a company slips to High Risk.</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={settingsEmailAlerts} 
                        onChange={(e) => setSettingsEmailAlerts(e.target.checked)} 
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#E5E5E5] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A84C]" />
                    </div>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    {/* Alert sensitivity */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Alert Sensitivity</label>
                      <select 
                        value={settingsSensitivity} 
                        onChange={(e) => setSettingsSensitivity(e.target.value)} 
                        className="w-full border border-border-color rounded-lg px-4 py-2.5 text-xs bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all cursor-pointer"
                      >
                        <option value="Low">Low Sensitivity</option>
                        <option value="Medium">Medium Sensitivity</option>
                        <option value="High">High Sensitivity</option>
                      </select>
                    </div>

                    {/* Notification email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">Notification Email</label>
                      <input 
                        type="email" 
                        value={settingsNotifEmail} 
                        onChange={(e) => setSettingsNotifEmail(e.target.value)} 
                        className="w-full border border-border-color rounded-lg px-4 py-2.5 text-xs bg-white text-[#111111] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4 — About ExitIQ */}
              <div className="bg-[#0A0A0A] rounded-[12px] p-8 flex flex-col gap-6 text-white border border-[#C9A84C]/20 shadow-xl">
                <div className="flex flex-col gap-1">
                  <span className="section-label" style={{ color: '#C9A84C' }}>Section 4</span>
                  <h3 className="section-heading" style={{ color: '#FFFFFF' }}>ExitIQ v1.0</h3>
                  <p className="text-white/80 text-xs font-light">AI-powered exit intelligence for private equity investors</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-white/10 rounded-full text-white text-[10px] font-semibold tracking-wider uppercase border border-white/5">
                    5 AI Models
                  </span>
                  <span className="px-3 py-1.5 bg-white/10 rounded-full text-white text-[10px] font-semibold tracking-wider uppercase border border-white/5">
                    Real-time Signals
                  </span>
                  <span className="px-3 py-1.5 bg-accent-gold/10 rounded-full text-accent-gold text-[10px] font-semibold tracking-wider uppercase border border-[#C9A84C]/20">
                    Claude Powered
                  </span>
                </div>

                <p className="text-white/40 text-[10px] border-t border-white/10 pt-4 select-none leading-relaxed">
                  Built for Conditor Capital. Powered by Anthropic Claude AI.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => alert('Opening ExitIQ Documentation...')}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer border border-white/10"
                  >
                    Documentation
                  </button>
                  <button 
                    onClick={() => alert('Initiating contact with support...')}
                    className="px-4 py-2 bg-accent-gold hover:bg-[#B8973E] text-black font-bold text-xs rounded-lg transition-colors cursor-pointer border border-transparent"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Placeholder for Other Tabs */
            <div className="bg-white border border-border-color rounded-[12px] p-6 min-h-[calc(100vh-160px)] flex flex-col items-center justify-center">
              <div className="text-center max-w-md mx-auto">
                <div className="inline-flex p-4 rounded-full bg-[#F9F9F9] border border-border-color text-[#A0A0A0] mb-4">
                  <ActiveIcon size={32} />
                </div>
                <h2 className="text-[#111111] font-bold text-xl mb-2">
                  {activeItem.label}
                </h2>
                <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">
                  This is a placeholder for the {activeItem.label} interface. The platform dashboard layout and routing have been configured according to the PE Exit Intelligence design system.
                </p>
                <div className="inline-flex gap-2">
                  <span className="px-3 py-1 bg-primary-surface text-[#111111] text-xs font-semibold rounded border border-border-color">
                    Ready
                  </span>
                  <span className="px-3 py-1 bg-primary-surface text-accent-gold text-xs font-semibold rounded border border-border-color">
                    Premium Theme
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Slide-out Claude AI Panel */}
      <div 
        className={`fixed top-0 bottom-0 right-0 w-[400px] bg-white border-l border-border-color shadow-2xl z-30 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="h-16 bg-[#0A0A0A] text-white flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent-gold" />
            <span className="font-bold text-sm tracking-tight">
              {analyzedCompany ? `${analyzedCompany.company || analyzedCompany.name} — AI Analysis` : 'ExitIQ AI Analyst'}
            </span>
          </div>
          <button 
            onClick={() => setIsPanelOpen(false)}
            className="text-white hover:text-accent-gold transition-colors cursor-pointer text-xl font-bold p-1 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Panel Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 bg-white">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
              <div className="w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
              <div className="text-center">
                <p className="text-sm font-semibold text-[#111111] animate-pulse">Analyzing with Claude AI...</p>
                <p className="text-xs text-[#A0A0A0] mt-1 font-sans">Generating Private Equity exit timing diagnostics</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              
              {/* Alert Warning if Mocking */}
              {apiWarning && (
                <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/25 text-accent-gold text-[10px] font-semibold px-3 py-2 rounded-lg flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
                  <span>{apiWarning}</span>
                </div>
              )}

              {/* Main Analysis Response */}
              <div className="prose prose-sm max-w-none text-[#A0A0A0] flex flex-col gap-2">
                {formatResponseText(aiResponse)}
              </div>

              {/* Buyer Universe Section */}
              {analyzedCompany && (
                <div className="mt-4 pt-4 border-t border-[#E5E5E5]/60 flex flex-col gap-3 animate-fadeIn">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#111111] text-left">
                    Buyer Universe Profile
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {getBuyerUniverseData(analyzedCompany.company || analyzedCompany.name).map((buyer, bIdx) => (
                      <div 
                        key={bIdx}
                        className={`bg-white border rounded-lg p-2.5 flex flex-col justify-between min-h-[160px] text-left transition-all hover:border-[#A0A0A0] ${
                          bIdx === 0 ? 'border-accent-gold border-l-4' : 'border-border-color'
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-[#A0A0A0] block truncate">
                            {buyer.type === 'Strategic Acquirer' ? 'Strategic' : buyer.type === 'Financial Sponsor' ? 'Sponsor' : 'IPO'}
                          </span>
                          <span className="text-[9.5px] font-bold text-[#111111] leading-tight block h-7 overflow-hidden line-clamp-2">
                            {buyer.name}
                          </span>
                        </div>
                        
                        {/* Fit Score Progress Bar */}
                        <div className="my-1.5 flex flex-col gap-0.5">
                          <div className="flex justify-between items-center text-[7.5px] font-bold text-accent-gold uppercase">
                            <span>Fit Score</span>
                            <span>{buyer.score}%</span>
                          </div>
                          <div className="w-full h-1 bg-[#F9F9F9] rounded-full overflow-hidden border border-[#E5E5E5]/60">
                            <div className="h-full bg-accent-gold rounded-full" style={{ width: `${buyer.score}%` }} />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 text-[8px] leading-tight text-[#555555]">
                          <div>
                            <span className="font-bold text-[#111111] block uppercase text-[7px] tracking-wide text-[#A0A0A0]">Why they'd buy</span>
                            <span className="block italic line-clamp-2 h-5 overflow-hidden">{buyer.rationale}</span>
                          </div>
                          <div className="mt-0.5">
                            <span className="font-bold text-[#111111] block uppercase text-[7px] tracking-wide text-[#A0A0A0]">Deal size appetite</span>
                            <span className="block font-semibold text-[#111111] truncate">{buyer.appetite}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat History */}
              {chatHistory.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#E5E5E5]/60 flex flex-col gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A0A0A0]">
                    Committee Discussion Q&A
                  </span>
                  <div className="flex flex-col gap-3">
                    {chatHistory.map((msg, mIdx) => (
                      <div 
                        key={mIdx} 
                        className={`flex flex-col gap-1 max-w-[85%] ${
                          msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
                        }`}
                      >
                        <div 
                          className={`px-3 py-2 rounded-xl text-xs leading-relaxed ${
                            msg.role === 'user' 
                              ? 'bg-[#0A0A0A] text-white rounded-tr-none' 
                              : 'bg-[#F9F9F9] text-[#111111] border border-border-color rounded-tl-none'
                          }`}
                        >
                          {msg.content}
                        </div>
                        <span className="text-[9px] text-[#A0A0A0]">
                          {msg.role === 'user' ? 'You' : 'Claude Assistant'}
                        </span>
                      </div>
                    ))}

                    {/* Chat Loading State */}
                    {isChatLoading && (
                      <div className="self-start flex items-center gap-2 text-xs text-[#A0A0A0] py-1">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-[10px] italic">Claude is thinking...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Panel Footer: Follow-up Chat Input */}
        <div className="p-4 border-t border-border-color bg-white flex-shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendFollowUp();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask Claude follow-up questions..."
              value={chatInput}
              disabled={isLoading || isChatLoading}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 border border-border-color rounded-lg px-3 py-2 text-xs placeholder-[#A0A0A0] focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all bg-white text-[#111111]"
            />
            <button
              type="submit"
              disabled={isLoading || isChatLoading || !chatInput.trim()}
              className="px-4 py-2 bg-[#0A0A0A] hover:bg-accent-gold text-white hover:text-black font-bold text-xs rounded-lg border border-transparent hover:border-black transition-all cursor-pointer disabled:opacity-50 disabled:hover:bg-[#0A0A0A] disabled:hover:text-white disabled:hover:border-transparent"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Core Portfolio Risk Alert Modal */}
      {showProblemModal && (
        <div className="fixed inset-0 bg-[#0A0A0A]/40 backdrop-blur-sm z-50 flex items-center justify-center px-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-red-500 border-b border-[#E5E5E5]/60 pb-3">
              <AlertTriangle size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Critical Portfolio Risk</span>
            </div>
            <p className="text-sm font-semibold text-[#111111] leading-relaxed text-left">
              ExitIQ has identified that 5 of your portfolio companies face high AI disruption risk and require immediate exit planning.
            </p>
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => {
                  setShowProblemModal(false);
                  setIsTourActive(true);
                  setTourStep(1);
                }}
                className="px-5 py-2.5 bg-[#0A0A0A] hover:bg-accent-gold border border-accent-gold hover:border-black text-white hover:text-black font-bold text-xs rounded-full transition-all cursor-pointer shadow-sm"
              >
                Acknowledge & Start Platform Tour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Tour Tooltips */}
      {isTourActive && (
        <div 
          className="fixed z-40 bg-white border border-accent-gold rounded-[12px] p-5 shadow-2xl max-w-sm flex flex-col gap-3 animate-fadeIn text-left"
          style={getTourCardStyle(tourStep)}
        >
          <div className="flex items-center justify-between border-b border-[#E5E5E5]/60 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gold">
              Platform Guide • Step {tourStep} of 6
            </span>
            <button 
              onClick={() => setIsTourActive(false)}
              className="text-[#A0A0A0] hover:text-[#111111] transition-colors cursor-pointer text-[10px] font-bold uppercase tracking-wider"
            >
              Skip Tour
            </button>
          </div>

          <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
            {getTourStepTitle(tourStep)}
          </h4>
          <p className="text-xs text-[#A0A0A0] leading-relaxed">
            {getTourStepDescription(tourStep)}
          </p>

          <div className="flex justify-between items-center mt-2 border-t border-[#E5E5E5]/60 pt-3">
            <button
              disabled={tourStep === 1}
              onClick={() => setTourStep(prev => prev - 1)}
              className="px-3 py-1.5 border border-border-color hover:bg-primary-surface text-[#111111] font-bold text-[10px] rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (tourStep === 6) {
                  setIsTourActive(false);
                } else {
                  setTourStep(prev => prev + 1);
                }
              }}
              className="px-4 py-1.5 bg-[#0A0A0A] hover:bg-accent-gold border border-accent-gold hover:border-black text-white hover:text-black font-bold text-[10px] rounded-lg transition-all cursor-pointer"
            >
              {tourStep === 6 ? 'Finish Tour' : 'Next Step'}
            </button>
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
}

export default App;
