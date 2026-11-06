import type { ContentField, ItemField, Item } from '@/lib/siteContent'

// Copy for the detailed product pages (Atlas, NestHR, Sentinel). Edited in Admin -> Page content -> "Product pages".
// Rules for this copy: no other company's name, no personal contact data, no claim we cannot show.
// Tokens {{entities}} {{funds}} {{companies}} {{people}} are filled from NestLens when the page is built.

const P = 'Product pages'
const T = (group: string, key: string, label: string, def: string, hint?: string): ContentField => ({ key, page: P, group, label, kind: 'text', default: def, hint })
const L = (group: string, key: string, label: string, def: string, hint?: string): ContentField => ({ key, page: P, group, label, kind: 'longtext', default: def, hint })
const I = (group: string, key: string, label: string, itemFields: ItemField[], def: Item[], hint?: string, addLabel?: string): ContentField => ({ key, page: P, group, label, kind: 'items', itemFields, default: def, hint, addLabel })

const titleBody: ItemField[] = [{ key: 'title', label: 'Title' }, { key: 'body', label: 'Text', long: true }]
const feature: ItemField[] = [{ key: 'title', label: 'Title' }, { key: 'body', label: 'Text', long: true }, { key: 'shot', label: 'Screenshot path (blank for none)' }, { key: 'alt', label: 'Screenshot description (for search and screen readers)', long: true }]
const whoHow: ItemField[] = [{ key: 'who', label: 'Who' }, { key: 'how', label: 'How they use it', long: true }]
const qa: ItemField[] = [{ key: 'q', label: 'Question' }, { key: 'a', label: 'Answer', long: true }]

export const PRODUCT_IDS = ['atlas', 'exchange', 'command', 'ascent', 'orbit', 'connect', 'nesthr', 'sentinel'] as const
export type ProductId = (typeof PRODUCT_IDS)[number]

export const block = (id: ProductId, name: string, d: {
  eyebrow: string; title: string; lead: string; note: string
  dataTitle: string; dataLead: string; data: Item[]
  featTitle: string; features: Item[]
  moatTitle: string; moats: Item[]
  diffTitle: string; diff: Item[]
  whoTitle: string; who: Item[]
  faq: Item[]
  ctaTitle: string
  topics: string
}): ContentField[] => [
  T(`${name}: opening`, `pd.${id}.eyebrow`, 'Small line above the headline', d.eyebrow),
  T(`${name}: opening`, `pd.${id}.title`, 'Headline', d.title),
  L(`${name}: opening`, `pd.${id}.lead`, 'Opening paragraph', d.lead),
  L(`${name}: opening`, `pd.${id}.note`, 'Small note under the buttons', d.note),
  T(`${name}: what is inside`, `pd.${id}.data.title`, 'Heading', d.dataTitle),
  L(`${name}: what is inside`, `pd.${id}.data.lead`, 'Intro', d.dataLead),
  I(`${name}: what is inside`, `pd.${id}.data`, 'Items', titleBody, d.data, 'One card each.', 'Add an item'),
  T(`${name}: features`, `pd.${id}.feat.title`, 'Heading', d.featTitle),
  I(`${name}: features`, `pd.${id}.features`, 'Features', feature, d.features, 'Each feature can carry a screenshot. Upload one in Media and paste its path.', 'Add a feature'),
  T(`${name}: why it holds`, `pd.${id}.moat.title`, 'Heading', d.moatTitle),
  I(`${name}: why it holds`, `pd.${id}.moats`, 'Points', titleBody, d.moats, 'The reasons this is hard to copy.', 'Add a point'),
  T(`${name}: how it is different`, `pd.${id}.diff.title`, 'Heading', d.diffTitle),
  I(`${name}: how it is different`, `pd.${id}.diff`, 'Comparisons', titleBody, d.diff, 'Compare with a kind of product, never a named company.', 'Add a comparison'),
  T(`${name}: who can use it`, `pd.${id}.who.title`, 'Heading', d.whoTitle),
  I(`${name}: who can use it`, `pd.${id}.who`, 'Audiences', whoHow, d.who, undefined, 'Add an audience'),
  I(`${name}: questions`, `pd.${id}.faq`, 'Questions and answers', qa, d.faq, 'Shown on the page and sent to search engines as FAQ data.', 'Add a question'),
  T(`${name}: closing`, `pd.${id}.cta.title`, 'Closing heading', d.ctaTitle),
  L(`${name}: search topics`, `pd.${id}.topics`, 'Search topics (comma separated)', d.topics, 'Shown as a plain line near the foot of the page. Use the words people type into a search box.'),
]

export const PD_FIELDS: ContentField[] = [
  ...block('atlas', 'Atlas', {
    eyebrow: 'Atlas · Private markets data',
    title: 'Reviewed data on funds, managers, companies and people.',
    lead: 'Atlas is the LabelNest data product. {{entities}} entities, drawn from regulatory registers and primary documents, checked by people and dated field by field. Search it, slice it by register, stage, sector or state, follow it, export it.',
    note: 'India first, with GIFT City and global registers alongside. Counts update from the live database.',
    dataTitle: 'What the data covers.',
    dataLead: 'Seven entity types in one connected graph, so a manager, its funds, its portfolio and its people are one click apart rather than four exports.',
    data: [
      { title: 'Fund managers (GP)', body: 'Venture capital, private equity, credit, real estate and infrastructure managers. Registration, strategy, sectors, geography, team, funds raised and portfolio.' },
      { title: 'Funds', body: 'Alternative investment funds, portfolio managers and venture capital funds by register and category, with size, vintage, status and the manager behind each.' },
      { title: 'Capital providers (LP)', body: 'Pension funds, sovereign funds, endowments, family offices, insurers, banks and fund of funds, with mandate, allocation and the managers they back.' },
      { title: 'Companies', body: 'Startups and private companies with sector, stage, location, founders, funding history and the investors on the cap table.' },
      { title: 'People', body: 'Partners, founders, executives and board members with roles, tenure and firm history. Moves are dated, so you can see who joined and who left.' },
      { title: 'Ecosystem partners and builders', body: 'Law firms, fund administrators, bankers, incubators, accelerators and venture studios that sit around a deal.' },
      { title: 'Events and signals', body: 'Fundraises, investments, exits, hires and departures, each reviewed before it is counted, and early signals kept apart until they are confirmed.' },
    ],
    featTitle: 'The features that do the work.',
    features: [
      { title: 'Ask in plain language', body: 'Type a firm, a fund or a person, or ask a question: “healthcare companies on the platform”, “India-based capital managers”, “companies that raised a round this quarter”. Ask Kai answers from the record, not from the open web. Fit Finder matches you to the right managers, funds or companies when you do not know where to start.', shot: '/shots/atlas-explore.jpg', alt: 'Atlas Explore screen with a single search box that takes a firm, fund or person or a plain question, with ready-made questions beneath it' },
      { title: 'Markets and registers, side by side', body: 'Every register Atlas covers in one view, with how much of each register is on Atlas, and where coverage is deep or thin. Slice by regulator, stage, sector or state, switch to thin coverage only, then open the matching profiles with the filter already applied.', shot: '/shots/atlas-markets.jpg', alt: 'Atlas Markets and Registers page showing coverage of regulator registers with headline coverage figures and a regulator and slice selector' },
      { title: 'See how complete each register is', body: 'For each register: funds on Atlas against funds on the register, the managers, portfolio companies and people behind them, and a mix of the funds by sector. You know what the data covers before you rely on it.', shot: '/shots/atlas-register-coverage.jpg', alt: 'Atlas register coverage table with a coverage bar per register and a side panel listing the funds, managers, portfolio companies and people it opens' },
      { title: 'Market Pulse', body: 'Everything that changed, in one place: reviewed events and early signals, fundraises, news and changes, movers, sector trends and deals. Reviewed events and unconfirmed signals are counted separately and never mixed.', shot: '/shots/atlas-market-pulse.jpg', alt: 'Atlas Market Pulse page with tabs for feed, fundraises, news, movers, sectors and deals and summary cards for reviewed events, emerging signals and capital in view' },
      { title: 'Lists, alerts and side-by-side compare', body: 'Keep your own lists of firms, funds and people, get an alert when a record changes, and compare up to three entities side by side.', shot: '', alt: '' },
      { title: 'Field Notes', body: 'If you know something we do not, add it in about a minute. Every approved note earns credits, and every change passes the same review as our own.', shot: '', alt: '' },
      { title: 'Exports and credits', body: 'Export what you filtered, within your plan. Credits cover the premium reads, and your balance is always on screen.', shot: '', alt: '' },
    ],
    moatTitle: 'Why Atlas is hard to copy.',
    moats: [
      { title: 'Every field has a source and a date', body: 'A value is never just a value. It carries where it came from, who set it, when it changed and when a person last confirmed it. Open any field and read its history.' },
      { title: 'The writer never marks their own work reviewed', body: 'A script or an extraction can write a value. Only a separate check, by a person or by a review pass that re-reads the source, makes it reviewed. Anything unreviewed is shown as pending.' },
      { title: 'Registers first, not scraping first', body: 'The spine is the regulatory registers, then filings and primary documents. That is why coverage can be measured, register by register, instead of claimed.' },
      { title: 'One record, many products', body: 'The same record feeds Command, Ascent, Orbit and Connect. A fix made once reaches every product, and data created in them can flow back after review.' },
      { title: 'Duplicates are merged, not deleted', body: 'Before anything is created we check for an existing match by name, registration number and website. When two records are one, they are merged and nothing known is lost.' },
      { title: 'Built where the gap is', body: 'Managers, founders and institutions in India and emerging markets that global platforms treat as an afterthought. Local registers, local names, local currency, local sectors.' },
    ],
    diffTitle: 'How Atlas is different.',
    diff: [
      { title: 'From a general data platform', body: 'General platforms lean on self-reported and scraped profiles and sell breadth. Atlas leans on registers and primary documents and shows how much of each is covered.' },
      { title: 'From a spreadsheet or a list you built', body: 'A spreadsheet is stale on the day you save it. Atlas is dated per field, deduplicated, and refreshed by a review pipeline.' },
      { title: 'From a crawler or a database of scraped contacts', body: 'We do not sell guessed emails. A contact is shown with its role, firm, tenure and source, and a move is dated when the source dates it.' },
      { title: 'From a data vendor with an annual contract', body: 'Start with a seat and credits. Scale when it earns its place. Prices are published and read live from the plan catalogue.' },
    ],
    whoTitle: 'Who uses Atlas, and how.',
    who: [
      { who: 'Fund managers and venture capital firms', how: 'Source companies, map co-investors, check who else is in a round, and keep a live view of a sector or a geography.' },
      { who: 'Limited partners and family offices', how: 'Find managers by strategy, size and region, compare them side by side, and track the ones you follow.' },
      { who: 'Fundraising founders', how: 'Find investors whose mandate fits, see their recent activity and who to approach, before you send anything.' },
      { who: 'Placement agents and advisers', how: 'Build target lists of capital providers and managers by mandate, and keep them current.' },
      { who: 'Banks, fund administrators and service providers', how: 'Understand the managers and funds you serve or want to serve, and watch for new registrations.' },
      { who: 'Researchers, analysts and journalists', how: 'Size a market, check a claim against a register, and cite a field with its source and date.' },
      { who: 'Regulators and ecosystem bodies', how: 'See coverage and gaps by register, state and sector, and where a market is thin.' },
    ],
    faq: [
      { q: 'What is Atlas?', a: 'Atlas is the private markets data product from LabelNest. It holds reviewed records on fund managers, funds, capital providers, companies, people and ecosystem partners, with the source and review date of each field.' },
      { q: 'What data does Atlas cover?', a: 'Fund managers, alternative investment funds and portfolio managers from regulatory registers in India, GIFT City and global registers, capital providers, companies, people, ecosystem partners and reviewed market events. A coverage view shows how much of each register is on Atlas.' },
      { q: 'How current is the data?', a: 'Records are refreshed continuously and every field carries the date it was last changed and last confirmed by a person. The Markets page shows the as-of date for coverage counts.' },
      { q: 'Can I export the data?', a: 'Yes, within your plan. Each plan includes a number of exported rows a month, and enterprise plans are custom.' },
      { q: 'How is data reviewed?', a: 'A value written by a script or an extraction stays pending until a person, or a review pass that re-reads the source, confirms it. The writer never marks their own work as reviewed.' },
      { q: 'Does Atlas include contact details?', a: 'Atlas shows professional roles, firms and tenure for people, and verified business contacts where the source supports it. It is not a list of guessed emails.' },
      { q: 'How much does Atlas cost?', a: 'Four published tiers billed annually plus an enterprise plan. Prices are on this page and on the pricing page, read live from the NestLens plan catalogue.' },
      { q: 'Can I add or correct data?', a: 'Yes. Field Notes lets any user propose an addition or a correction. Approved notes earn credits and go through the same review as our own data.' },
    ],
    ctaTitle: 'Open Atlas and look something up.',
    topics: 'private markets data India, alternative investment fund database, AIF register India, SEBI AIF data, venture capital database India, fund manager database, limited partner database, family office data, startup funding data India, GIFT City funds, portfolio manager PMS data, private equity data, investor database for founders, fund discovery, private market intelligence',
  }),

  ...block('nesthr', 'NestHR', {
    eyebrow: 'NestHR · HR and placement',
    title: 'People operations for startups, and placements for colleges.',
    lead: 'NestHR runs the whole cycle in one place: employee records, hiring, reviews, expenses and learning for a growing team, and campus recruitment from job description to offer letter for an institution. Flat annual price. Every module included.',
    note: 'Priced in rupees. A free trial with every module from day one.',
    dataTitle: 'Seven modules, one record of your people.',
    dataLead: 'Each module reads the same employee record, so nobody re-enters a name, a role or a date.',
    data: [
      { title: 'People OS', body: 'Employee profiles, org chart, roles, departments, onboarding workflows and documents.' },
      { title: 'Talent OS and PlacementOS', body: 'Job descriptions, candidate pipelines, interview scheduling, structured feedback, offers, and season-level placement analytics. It learns from every selection and rejection to sharpen the next shortlist.' },
      { title: 'Performance OS', body: 'Review cycles, goals, continuous feedback and ratings, without the spreadsheet.' },
      { title: 'Expense OS', body: 'Claims, manager approvals, reimbursement tracking and monthly reporting, without email chains.' },
      { title: 'Learning OS', body: 'Internal courses, assignments, completion tracking and progress dashboards for onboarding and growth.' },
      { title: 'Analytics', body: 'Headcount trends, attrition signals, placement rates, expense summaries and learning completion across modules.' },
      { title: 'Admin', body: 'Organisation set-up, roles, permissions and module configuration.' },
    ],
    featTitle: 'The features that matter most.',
    features: [
      { title: 'A hiring pipeline that learns', body: 'Publish a job description, move candidates across a pipeline from application to offer, and log every decision. PlacementOS treats each selection and rejection as a signal and uses it to improve the next shortlist.', shot: '', alt: '' },
      { title: 'Campus placement, end to end', body: 'Job descriptions, company participation, student pipelines, interviews, offers and a season dashboard of placement rate, average package and time to hire. A company-side portal is on the way.', shot: '', alt: '' },
      { title: 'Reviews and goals people actually finish', body: 'Structured cycles, goal setting and continuous feedback, with ratings that roll up into analytics.', shot: '', alt: '' },
      { title: 'Expenses without chasing', body: 'Submit, approve, reimburse and report in one flow, with a monthly summary for finance.', shot: '', alt: '' },
    ],
    moatTitle: 'Why teams stay on it.',
    moats: [
      { title: 'Placement is built in, not bolted on', body: 'Most people software treats hiring as an applicant list. NestHR treats a placement season as a cycle with a memory.' },
      { title: 'One flat price', body: 'Every module in every plan. No per-employee metering and no module upsells.' },
      { title: 'Priced in rupees', body: 'No currency conversion on the invoice and no forex surprise.' },
      { title: 'Part of the same family', body: 'Built by LabelNest and run on the same approach: one record, many tools, every change logged.' },
    ],
    diffTitle: 'How NestHR is different.',
    diff: [
      { title: 'From an enterprise HR suite', body: 'No implementation project and no specialist to run it. A founder or an operations lead can set it up.' },
      { title: 'From a standalone applicant tracker', body: 'Hiring sits beside people, performance and expenses in one record, and it learns across cycles.' },
      { title: 'From a spreadsheet', body: 'Roles, permissions, approvals and history are built in, and nothing depends on one person’s file.' },
    ],
    whoTitle: 'Who uses NestHR, and how.',
    who: [
      { who: 'Startups with 5 to 200 people', how: 'Run onboarding, reviews, expenses and hiring without a dedicated HR team.' },
      { who: 'Colleges and institutions', how: 'Run the full placement season from job description to offer letter, and report the season to the management.' },
      { who: 'Founders and operations leads', how: 'See headcount, attrition and spend across the company in one dashboard.' },
      { who: 'Placement officers', how: 'Track every student and every company across every round.' },
    ],
    faq: [
      { q: 'What is NestHR?', a: 'NestHR is an HR and workforce operations system with seven modules: People OS, Talent OS with PlacementOS, Performance OS, Expense OS, Learning OS, Analytics and Admin. It is built for startups and colleges.' },
      { q: 'What is PlacementOS?', a: 'PlacementOS is the NestHR module for campus recruitment and talent pipelines. It learns from every selection and rejection, so shortlisting improves each cycle.' },
      { q: 'How much does NestHR cost?', a: 'A flat annual fee by team size, with every module included: Starter at ₹40,000 a year for up to 20 people, Growth at ₹60,000 for up to 50, Scale at ₹1,00,000 for up to 100. Enterprise, for larger teams and colleges, is custom.' },
      { q: 'Are all modules included in every plan?', a: 'Yes. Every plan includes all seven modules, PlacementOS included.' },
      { q: 'Is there a free trial?', a: 'Yes, with every module available from the first day.' },
      { q: 'Is NestHR the same as NestLens?', a: 'No. NestHR is the HR and placement product. NestLens is the private markets platform, with its own products and prices.' },
    ],
    ctaTitle: 'Run your next hiring cycle on it.',
    topics: 'HR software for startups India, campus placement software, placement management system, applicant tracking system India, employee management software, performance review software, expense management for startups, learning management for employees, HRMS India, college placement portal',
  }),

  ...block('sentinel', 'Sentinel', {
    eyebrow: 'Sentinel · Early access',
    title: 'See the risk before it reaches the portfolio.',
    lead: 'Sentinel is two products on one platform. Sentinel Risk watches a private markets portfolio for concentration, valuation, exit and operating risk. Sentinel AI scores the AI systems an organisation has deployed for hallucination, dependency, compliance and cost.',
    note: 'In early access. Join the waitlist and we will set up your workspace.',
    dataTitle: 'What Sentinel watches.',
    dataLead: 'Two products, one waitlist. Each reads the record it needs, and flags what changed between reviews.',
    data: [
      { title: 'Sentinel Risk: concentration', body: 'Exposure by manager, sector, geography, vintage, currency and counterparty, across the whole portfolio.' },
      { title: 'Sentinel Risk: valuation integrity', body: 'Marks that drift from comparable evidence, stale valuations and gaps between reported and observed value.' },
      { title: 'Sentinel Risk: exit and liquidity', body: 'Holding periods, exit routes, distribution timing and the funds that are slow to return capital.' },
      { title: 'Sentinel Risk: stress tests', body: 'What happens to the portfolio under a rate move, a currency move or a sector drawdown.' },
      { title: 'Sentinel AI: hallucination and wrong-use risk', body: 'How likely a deployed model is to state something false, and where it is being used outside its brief.' },
      { title: 'Sentinel AI: dependency and cost', body: 'Reliance on one model or vendor, spend that is climbing faster than use, and the people a system depends on.' },
      { title: 'Sentinel AI: compliance and data security', body: 'Regulatory exposure and where sensitive data flows through a system.' },
    ],
    featTitle: 'How it works.',
    features: [
      { title: 'Continuous, not quarterly', body: 'Risk is scored as records change. You see what moved between reviews, not only at the next one.', shot: '', alt: '' },
      { title: 'Grounded in the Atlas record', body: 'Sentinel Risk reads the same reviewed record as Atlas, so a manager, a fund and a company are the same entity in the portfolio view and in the risk view.', shot: '', alt: '' },
      { title: 'A score you can open', body: 'Every score lists the inputs behind it and their sources, so a reviewer can disagree with a number and say why.', shot: '', alt: '' },
    ],
    moatTitle: 'Why it holds.',
    moats: [
      { title: 'Built on reviewed data', body: 'A risk score is only as good as the record under it. Sentinel reads the dated, sourced record that Atlas maintains.' },
      { title: 'Explainable by design', body: 'Scores show their inputs. Nothing is a black box that a committee has to take on trust.' },
      { title: 'Private markets and AI in one place', body: 'The same discipline of source, date and review applies to a portfolio and to the AI systems an institution now runs.' },
    ],
    diffTitle: 'How Sentinel is different.',
    diff: [
      { title: 'From a quarterly risk report', body: 'Sentinel is continuous, so a change is flagged when it happens.' },
      { title: 'From a general monitoring dashboard', body: 'It is built for private markets and for deployed AI, not for liquid securities or generic uptime.' },
    ],
    whoTitle: 'Who uses Sentinel, and how.',
    who: [
      { who: 'Fund managers', how: 'Watch concentration and valuation across your funds and your portfolio companies.' },
      { who: 'Limited partners and family offices', how: 'See hidden concentration across the managers you back.' },
      { who: 'Risk and compliance teams', how: 'Keep an audit trail of what was scored, from what, and when.' },
      { who: 'Teams deploying AI', how: 'Score each AI system for hallucination, dependency, compliance and cost.' },
    ],
    faq: [
      { q: 'What is Sentinel?', a: 'Sentinel is a risk platform from LabelNest with two products. Sentinel Risk monitors private markets portfolios. Sentinel AI scores deployed AI systems.' },
      { q: 'Is Sentinel available now?', a: 'It is in early access. You can join the waitlist and we will set up your workspace.' },
      { q: 'What does Sentinel Risk monitor?', a: 'Concentration, valuation integrity, exit and liquidity risk, stress scenarios and operating signals across a private markets portfolio.' },
      { q: 'What does Sentinel AI score?', a: 'Hallucination risk, model dependency, regulatory compliance, cost, data security, talent concentration and wrong-use risk across the AI systems you run.' },
      { q: 'Does it use the Atlas data?', a: 'Sentinel Risk reads the same reviewed record as Atlas, so managers, funds and companies are the same entities in both.' },
    ],
    ctaTitle: 'Join the waitlist.',
    topics: 'private markets risk management, portfolio concentration risk, valuation risk private equity, LP portfolio monitoring, AI risk management, AI governance tool, LLM hallucination risk, model risk management, private equity portfolio monitoring software',
  }),
]
