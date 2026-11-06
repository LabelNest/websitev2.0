import { sql } from '@/lib/db'
import { PD_FIELDS } from '@/lib/productDetail'
import { PD_MORE } from '@/lib/productDetailMore'
import { ABOUT_FIELDS } from '@/lib/aboutContent'

// Every editable line of copy on the redesigned pages lives here, with its default.
// The admin "Site content" screen is generated from this list, and saved changes are stored
// in website_content. If nothing is saved (or the table does not exist yet) the defaults
// below are what the site shows. Prices are not here: they come live from NestLens (lib/plans.ts).

export interface ItemField { key: string; label: string; long?: boolean }
export type Item = Record<string, string>

interface Base { key: string; page: string; group: string; label: string; hint?: string }
export interface TextField extends Base { kind: 'text' | 'longtext'; default: string }
export interface ItemsField extends Base { kind: 'items'; itemFields: ItemField[]; default: Item[]; addLabel?: string }
export type ContentField = TextField | ItemsField
export type ContentValue = string | Item[]
export type ContentMap = Record<string, ContentValue>

const T = (page: string, group: string, key: string, label: string, def: string, hint?: string): TextField => ({ key, page, group, label, kind: 'text', default: def, hint })
const L = (page: string, group: string, key: string, label: string, def: string, hint?: string): TextField => ({ key, page, group, label, kind: 'longtext', default: def, hint })
const I = (page: string, group: string, key: string, label: string, itemFields: ItemField[], def: Item[], hint?: string, addLabel?: string): ItemsField => ({ key, page, group, label, kind: 'items', itemFields, default: def, hint, addLabel })

const P_HOME = 'Home'
const P_ECO = 'How it connects'
const P_PROD = 'Products'
const P_PRICE = 'Pricing'
const P_INC = 'For incubators'

const bullets: ItemField[] = [{ key: 'text', label: 'Point', long: true }]
const headBody: ItemField[] = [{ key: 'head', label: 'Bold line' }, { key: 'body', label: 'Sentence', long: true }]
const titleBody: ItemField[] = [{ key: 'title', label: 'Title' }, { key: 'body', label: 'Text', long: true }]

const prod = (id: string, name: string, title: string, points: string[], different: string, connects: string): ContentField[] => [
  T(P_PROD, name, `products.${id}.title`, 'Heading', title),
  I(P_PROD, name, `products.${id}.points`, 'Points', bullets, points.map((text) => ({ text })), 'One short point each.', 'Add a point'),
  L(P_PROD, name, `products.${id}.different`, 'How it is different', different),
  L(P_PROD, name, `products.${id}.connects`, 'Connects to', connects),
]

const tab = (id: string, name: string, tagline: string, lead: string, steps: Item[], syncs: string, stays: string, control: string): ContentField[] => [
  T(P_ECO, name, `eco.${id}.tagline`, 'Tab subtitle', tagline),
  L(P_ECO, name, `eco.${id}.lead`, 'Opening line', lead),
  I(P_ECO, name, `eco.${id}.steps`, 'Four steps', titleBody, steps, 'Keep to four.', 'Add a step'),
  L(P_ECO, name, `eco.${id}.syncs`, 'What syncs', syncs),
  L(P_ECO, name, `eco.${id}.stays`, 'What stays put', stays),
  L(P_ECO, name, `eco.${id}.control`, 'Who is in control', control),
]

export const CONTENT_FIELDS: ContentField[] = [
  // ───────────── HOME ─────────────
  T(P_HOME, 'Opening', 'home.hero.eyebrow', 'Small line above the headline', 'Private markets data · Bengaluru'),
  T(P_HOME, 'Opening', 'home.hero.title', 'Headline', 'Private market data you can trace to its source.'),
  L(P_HOME, 'Opening', 'home.hero.lead', 'Opening paragraph', 'NestLens is how we do it: reviewed records on funds, companies and people, and the software to run a fund, a programme or a raise on top of them. Every field shows its source and the date a person last checked it.'),
  T(P_HOME, 'Opening', 'home.hero.note', 'Small note under the buttons', 'Sourced from regulatory filings and primary documents. Reviewed by people, not only by software.'),
  T(P_HOME, 'Opening', 'home.hero.cta1', 'First button', 'Explore NestLens'),
  T(P_HOME, 'Opening', 'home.hero.cta2', 'Second button', 'Talk to us'),

  T(P_HOME, 'About statement', 'home.about.eyebrow', 'Label', 'About LabelNest'),
  L(P_HOME, 'About statement', 'home.about.statement', 'Statement', 'LabelNest is a private markets data company in Bengaluru. We build the reviewed record of who manages, funds and raises capital across India and other emerging markets, sourced from registers and primary documents and dated field by field. On top of it we make the software that fund managers, founders and programmes run on. We started in 2025 and we are building for the next ten years, not for an exit.', 'This is the standard description of LabelNest. It is also used on the About page.'),

  T(P_HOME, 'Connected products', 'home.connected.eyebrow', 'Label', 'Built to work together'),
  T(P_HOME, 'Connected products', 'home.connected.title', 'Heading', 'Fill it in once. It shows up everywhere it should.'),
  L(P_HOME, 'Connected products', 'home.connected.lead', 'Intro', 'Every product reads the same record. What a founder enters in Ascent reaches the fund in Command and the programme in Orbit, and Atlas stays the reviewed source underneath.'),
  I(P_HOME, 'Connected products', 'home.connected.cards', 'Three pairings', [{ key: 'eyebrow', label: 'Pairing' }, { key: 'title', label: 'Title' }, { key: 'body', label: 'Text', long: true }], [
    { eyebrow: 'Command + Ascent', title: 'Your portfolio updates itself.', body: 'Portfolio companies update their own room once. Revenue, burn, runway and valuation reach your fund. Overdue ones get a reminder in one click.' },
    { eyebrow: 'Orbit + Ascent', title: 'Selection switches on the room.', body: "Select a startup in Orbit and its room opens. No re-entry. Your admin reads every room in deal flow, an Ascent feature, and introduces ready startups with the founder's yes." },
    { eyebrow: 'Atlas + Command + Ascent', title: 'One record from sourcing to reporting.', body: 'Find a company in Atlas. Follow it in Command. When it joins Ascent, its own numbers replace the researched ones. A researcher reviews every correction before Atlas changes.' },
  ], 'Keep three.'),

  T(P_HOME, 'How a record is made', 'home.method.eyebrow', 'Label', 'How a record is made'),
  T(P_HOME, 'How a record is made', 'home.method.image', 'Photo (optional)', '', 'Upload a photo in the Upload tab, then paste its link here. Leave empty to show the three steps alone.'),
  T(P_HOME, 'How a record is made', 'home.method.title', 'Heading', 'Three steps, and a person at the last one.'),
  I(P_HOME, 'How a record is made', 'home.method.steps', 'Steps', titleBody, [
    { title: 'Source', body: 'We collect from registers, filings, disclosures and primary documents. Each fact is stored with its source.' },
    { title: 'Check', body: 'Software flags conflicts and gaps. It does not decide what is true.' },
    { title: 'Review', body: 'A researcher confirms each field against its source and records the date. A field nobody has reviewed is shown as unreviewed.' },
  ], 'Keep three.'),

  T(P_HOME, 'Products', 'home.products.eyebrow', 'Label', 'NestLens'),
  T(P_HOME, 'Products', 'home.products.title', 'Heading', 'Six products, one record.'),
  T(P_HOME, 'Products', 'home.products.lead', 'Intro', 'Use one or all six. They read the same record.'),
  I(P_HOME, 'Products', 'home.products.rows', 'Product list', [{ key: 'name', label: 'Name' }, { key: 'text', label: 'One line', long: true }, { key: 'works', label: 'Works with' }, { key: 'href', label: 'Link' }], [
    { name: 'Atlas', text: 'Reviewed data on funds, managers, companies, deals and people, each field with its source.', works: 'Feeds Command, Ascent and Orbit', href: '/nestlens/intelligence' },
    { name: 'Exchange', text: 'A marketplace to buy and sell structured datasets, with verified sellers and escrow.', works: 'Market context from Atlas', href: '/nestlens/exchange' },
    { name: 'Command', text: "The fund's workspace: pipeline, portfolio, LP capital accounts, NAV, board and investment committee.", works: 'Reads Ascent rooms, sourced from Atlas', href: '/nestlens/command' },
    { name: 'Ascent', text: "The readiness engine for founders, with a data room inside: score, fix, and present the company your way. Deal flow for programme admins. Shared only with consent.", works: 'Syncs to Command, switched on by Orbit', href: '/nestlens/capital' },
    { name: 'Orbit', text: 'Run a programme: applications, screening, cohorts, mentors, grants and reports.', works: 'Gives every startup an Ascent room', href: '/nestlens/orbit' },
    { name: 'Connect', text: 'Mentors, audit partners and fund scouting, reached from the room you already work in.', works: 'Reached from Ascent and Command', href: '/nestlens/connect' },
  ], 'Order is the order on the page.', 'Add a product'),

  I(P_HOME, 'I am a (switcher)', 'home.switch.items', 'Audiences', [{ key: 'who', label: 'Tab name' }, { key: 'line', label: 'One line', long: true }, { key: 'points', label: 'Pointers (one per line)', long: true }, { key: 'products', label: 'Products used' }, { key: 'href', label: 'Link' }, { key: 'cta', label: 'Button' }], [
    { who: 'Fund manager', line: 'Source, decide and report from one record.', points: 'Find companies and co-investors in Atlas without leaving the workspace.\nRun diligence and investment committee with every approval on file.\nPortfolio companies on Ascent update your numbers, so nobody chases a quarterly report.\nLP capital accounts, NAV and reports come from the same numbers.', products: 'Command, Atlas, Ascent', href: '/who-we-serve/gp', cta: 'For fund managers' },
    { who: 'Founder', line: 'Be ready before the first meeting, and share on your terms.', points: 'Build one data room and see exactly what is missing.\nSee a readiness score before an investor does.\nShare by link with an email gate, NDA, watermark and expiry, and see who opened it.\nFree for 30 days, with templates for every document type.', products: 'Ascent, Connect', href: '/who-we-serve/founder', cta: 'For founders' },
    { who: 'Incubator or accelerator', line: 'Run the programme, build the rooms, reach the funds.', points: 'Take applications and score them on your own rubric.\nSelect a cohort and every startup gets a data room, included in your plan.\nRead every room as deal flow and make introductions the founder has agreed to.\nReport to funders in NIDHI-SSS, DST-TBI, BIRAC and RKVY-RAFTAR formats.', products: 'Orbit, Ascent, Connect', href: '/who-we-serve/incubator', cta: 'For programmes' },
    { who: 'Limited partner', line: 'Find and compare managers on evidence.', points: 'Search managers and funds by strategy, size and region.\nCompare up to three side by side.\nSee the source and review date behind every field.\nFollow the managers you back and get alerts when a record changes.', products: 'Atlas', href: '/who-we-serve/lp', cta: 'For limited partners' },
    { who: 'Researcher', line: 'Cite a figure with its source and its date.', points: 'Size a market from registers, not estimates.\nSee how much of each register Atlas covers before you rely on it.\nExport what you filtered, within your plan.\nBuy specialist datasets on Exchange with the method shown.', products: 'Atlas, Exchange', href: '/who-we-serve/researcher', cta: 'For researchers' },
  ], 'The first tab opens by default.', 'Add an audience'),

  T(P_HOME, 'Who it is for', 'home.audiences.eyebrow', 'Label', 'Start from what you do'),
  T(P_HOME, 'Who it is for', 'home.audiences.title', 'Heading', 'Start from what you do.'),

  T(P_HOME, 'Numbers', 'home.numbers.eyebrow', 'Label', 'The record today'),
  T(P_HOME, 'Numbers', 'home.numbers.title', 'Heading', 'Counted, sourced and dated.'),
  T(P_HOME, 'Numbers', 'home.numbers.note', 'Small note', 'Figures from Atlas. Every record carries its source and the date a person last reviewed it.'),
  I(P_HOME, 'Numbers', 'home.numbers.items', 'Figures (optional override)', [{ key: 'value', label: 'Number' }, { key: 'label', label: 'What it counts' }], [], 'Leave this empty to show live figures from Atlas, which update themselves. Add rows only to override them.', 'Add a figure'),

  T(P_HOME, 'Video', 'home.video.eyebrow', 'Label', 'Watch'),
  T(P_HOME, 'Video', 'home.video.title', 'Heading', 'Atlas in ninety seconds.'),
  L(P_HOME, 'Video', 'home.video.lead', 'Text', 'Search a fund, open its record, and see every source behind every field. No sign-up.'),
  T(P_HOME, 'Video', 'home.video.cta', 'Button label', 'Watch the walkthrough'),
  T(P_HOME, 'Video', 'home.video.poster', 'Video cover image (optional)', '', 'Upload an image in the Upload tab and paste its link.'),
  T(P_HOME, 'Video', 'home.video.url', 'Video link', '', 'Paste a YouTube or Vimeo link, or a direct .mp4 link. Leave empty to hide the video block.'),

  T(P_HOME, 'Founder', 'home.founder.image', 'Portrait (optional)', '', "Leave empty to use the photo from the Team page."),
  T(P_HOME, 'Founder', 'home.founder.eyebrow', 'Label', 'From the founder'),
  L(P_HOME, 'Founder', 'home.founder.quote', 'Quote', 'I spent years watching the same problems persist before I decided the right response was to build.'),
  L(P_HOME, 'Founder', 'home.founder.body', 'Text under the quote', 'Ankit Suman worked in data for nine years across CIOReview, Microsoft, Preqin and BlackRock, in operations, quality and governance, before starting LabelNest in Bengaluru in 2025.'),
  T(P_HOME, 'Founder', 'home.founder.link', 'Link label', "Read the founder's story"),

  T(P_HOME, 'Reading', 'home.reading.eyebrow', 'Label', 'Research and writing'),
  T(P_HOME, 'Reading', 'home.reading.title', 'Heading', 'Read how we think.', 'The three most recent briefings appear here on their own.'),
  T(P_HOME, 'Reading', 'home.press.line', 'Press line', 'Covered by The Hindustan Wires, The Entrepreneur Stories, The Business Stories and Dailyhunt.'),

  T(P_HOME, 'Closing call to action', 'home.cta.title', 'Heading', 'Tell us what you are building.'),
  T(P_HOME, 'Closing call to action', 'home.cta.lead', 'Text', 'A person reads every message and replies within one business day.'),
  T(P_HOME, 'Closing call to action', 'home.cta.primary', 'First button', 'Talk to us'),
  T(P_HOME, 'Closing call to action', 'home.cta.secondary', 'Second button', 'Open NestLens'),

  // ───────────── HOW IT CONNECTS ─────────────
  T(P_ECO, 'Opening', 'eco.hero.title', 'Headline', 'One record. Every product reads it.'),
  L(P_ECO, 'Opening', 'eco.hero.lead', 'Opening paragraph', 'A founder fills in a room once. The fund, the programme and the data underneath all read it. Nothing is written back to the founder. Nothing is shared without their yes.'),
  L(P_ECO, 'Map', 'eco.map.atlas', 'Atlas note', 'Feeds Command and the investor directory. Founders can propose corrections. A researcher reviews every one.'),
  T(P_ECO, 'Map', 'eco.map.orbit', 'Orbit box', 'Applications, screening, cohorts, mentors, grants.'),
  T(P_ECO, 'Map', 'eco.map.link1', 'Arrow label, Orbit to Ascent', 'Selection gives each startup a room'),
  T(P_ECO, 'Map', 'eco.map.ascentRoom', 'Ascent: readiness engine', 'One structured room per company, scored for readiness, presented your way.'),
  T(P_ECO, 'Map', 'eco.map.ascentFlow', 'Ascent: deal flow', 'Programme admins read every room and run the introductions.'),
  T(P_ECO, 'Map', 'eco.map.link2', 'Arrow label, Ascent to Command', 'Updates sync. Nothing flows back.'),
  T(P_ECO, 'Map', 'eco.map.command', 'Command box', 'Pipeline, portfolio, LPs, NAV, committee.'),
  T(P_ECO, 'Map', 'eco.map.connect', 'Connect note', 'Opened from the room. Contact stays hidden until the founder accepts.'),
  T(P_ECO, 'Pairing: Command + Ascent', 'eco.cmd.title', 'Tab title', 'Command + Ascent'),
  ...tab('cmd', 'Pairing: Command + Ascent', 'Updates arrive. You stop chasing.', 'Portfolio companies update their own room once. Your fund\'s view follows.', [
    { title: 'Invite', body: 'The fund invites a portfolio company. The company accepts in Ascent.' },
    { title: 'Update once', body: 'The founder updates headcount, revenue, burn, runway and valuation once.' },
    { title: 'Sync', body: 'The fund sees the change. Overdue companies are flagged. One click sends a reminder.' },
    { title: 'Report', body: 'NAV, TVPI, DPI and LP reports use the same numbers.' },
  ], 'Headcount, revenue, burn, runway, valuation, readiness, what changed.', 'The room belongs to the founder. Command reads it. Nothing is written back.', 'The company accepts the invite and sees what the fund sees. A paid Command plan includes 10 Ascent rooms.'),
  T(P_ECO, 'Pairing: Orbit + Ascent', 'eco.orbit.title', 'Tab title', 'Orbit + Ascent'),
  ...tab('orbit', 'Pairing: Orbit + Ascent', 'Selection gives each startup a room.', 'Select a startup and its data room opens. Your admin can read it.', [
    { title: 'Select', body: 'Screen and score applications in Orbit, on your rubric.' },
    { title: 'Open', body: "Selection opens the startup's Ascent room. Nobody re-enters anything." },
    { title: 'Read', body: 'Deal flow, an Ascent feature, shows your admin every room: who is ready, who is quiet, what is missing.' },
    { title: 'Introduce', body: "With the founder's yes, suggested investors become introductions on a board: Suggested to Funded." },
  ], 'Readiness, completeness, gaps, changes. The investor directory comes from Atlas.', "Rooms stay the founder's. Deal flow only reads. Consent and access logs are append-only.", 'The founder approves every introduction and picks what the investor sees. Each Orbit plan includes 2 to 100 rooms.'),
  T(P_ECO, 'Pairing: Atlas + Command + Ascent', 'eco.atlas.title', 'Tab title', 'Atlas + Command + Ascent'),
  ...tab('atlas', 'Pairing: Atlas + Command + Ascent', 'One record, sourcing to reporting.', 'The company you find in Atlas is the one you follow in Command and the one that reports from Ascent.', [
    { title: 'Source', body: 'Find a company in Atlas. Every field shows its source.' },
    { title: 'Follow', body: "Add it to Command's pipeline. Nothing is re-keyed." },
    { title: 'Invite', body: "When it joins Ascent, its own numbers replace the researched ones in your view." },
    { title: 'Propose', body: 'What the founder enters can suggest a correction to Atlas. A researcher reviews it first.' },
  ], 'Company profile, pipeline stage, portfolio metrics.', 'Atlas changes only after a person reviews it. Nothing applies automatically.', 'LabelNest staff link a company to its Atlas record by hand. We never match on a name.'),
  T(P_ECO, 'What you get', 'eco.out.title', 'Heading', 'What changes in your week.'),
  I(P_ECO, 'What you get: fund manager', 'eco.out.fund', 'Pointers', headBody, [
    { head: 'Stop chasing.', body: 'Portfolio companies update their own room. Overdue ones are flagged. One click sends the reminder.' },
    { head: 'One set of numbers.', body: 'NAV, TVPI, DPI and LP reports come from the same figures. Nothing is re-typed.' },
    { head: 'Sourced deals.', body: 'Every Atlas field shows its source. Add a company to your pipeline without re-keying.' },
    { head: 'Diligence without deck chasing.', body: "The startup's room already holds its documents and a readiness score." },
    { head: 'A trail you can defend.', body: 'Votes and decisions are recorded. AI drafts the memo. Your team approves it.' },
    { head: 'Founders find you.', body: 'Publish a thesis on Connect. Review applications with a match score and the room behind it.' },
    { head: 'Rooms included.', body: 'A paid Command plan includes 10 Ascent rooms for your companies.' },
  ], undefined, 'Add a pointer'),
  I(P_ECO, 'What you get: startup', 'eco.out.startup', 'Pointers (first person)', headBody, [
    { head: '“One room. Not a folder per investor.”', body: 'Fill it in once. The readiness score shows what is missing before the meeting.' },
    { head: '“Nobody sees it unless I say so.”', body: 'Share by link with email gate, NDA, watermark and expiry. See who opened it.' },
    { head: '“I update once.”', body: 'Your fund or programme sees it. You get a reminder only when something is overdue.' },
    { head: '“The documents do the typing.”', body: 'Upload a certificate. Ascent reads it. You confirm every field.' },
    { head: '“Help is in the room.”', body: 'An assistant that works on your room. Templates for every document. A free mentor call.' },
    { head: '“Introductions need my yes.”', body: 'You choose what an investor sees. Contact stays hidden until you accept.' },
    { head: '“Free to start.”', body: 'Thirty days of full access. A fund or programme that invites you can cover the room.' },
  ], undefined, 'Add a pointer'),
  I(P_ECO, 'What you get: programme', 'eco.out.programme', 'Pointers', headBody, [
    { head: 'Selection does the next job.', body: 'Select a startup in Orbit. Its data room opens. No re-entry.' },
    { head: 'One view of the cohort.', body: 'Who is ready, who is quiet, what waits on a founder. Notes and tasks per startup.' },
    { head: 'Startups compare like for like.', body: 'Every founder builds in the same structure.' },
    { head: 'Introductions you can track.', body: 'A board from Suggested to Funded: owner, days in stage, amount, reason for a pass. Exports to a sheet.' },
    { head: 'A directory you did not build.', body: 'Investors come from Atlas. Matches show their reasons. Nothing goes out until a person approves it.' },
    { head: 'Consent you can prove.', body: "Nothing is introduced without the founder's yes. Logs are append-only." },
    { head: 'Reports for your funders.', body: 'Funnel, money raised, and grant reports for NIDHI-SSS, DST-TBI, BIRAC and RKVY-RAFTAR. Plans include 2 to 100 rooms.' },
  ], undefined, 'Add a pointer'),
  T(P_ECO, 'Closing call to action', 'eco.cta.title', 'Heading', 'Tell us which two you want to connect.'),

  // ───────────── PRODUCTS ─────────────
  T(P_PROD, 'Opening', 'products.hero.title', 'Headline', 'One record. Six products.'),
  L(P_PROD, 'Opening', 'products.hero.lead', 'Opening paragraph', 'Atlas holds the reviewed data. Command, Ascent, Orbit and Connect are the tools on top of it. Exchange is where datasets change hands. Use one or all six.'),
  ...prod('atlas', 'Atlas', 'Reviewed data on funds, companies and people.', ['Search funds, managers, companies, deals and people in one place.', 'Every field shows its source and the date a person last reviewed it.', 'Export, set alerts, and follow career moves that carry dates.'], 'Atlas shows the value and the evidence for it, field by field.', "Feeds Command's deal sourcing and the investor directory in Orbit."),
  ...prod('exchange', 'Exchange', 'Buy and sell structured data.', ['Sellers pass identity and business checks before a listing goes live.', 'Payment sits in escrow until delivery is confirmed.', 'Each dataset carries a quality score built from completeness, recency and provenance.'], 'A listing shows its method and provenance, not only a sample.', 'Buyers get market context from Atlas. Fund teams buy comparables for Command.'),
  ...prod('command', 'Command', 'The workspace a fund runs on.', ['Pipeline, screening, diligence and investment committee decisions in one record.', 'Portfolio, cap tables, board meetings and valuation, linked to each company.', 'LP capital accounts, NAV and reports produced from the same numbers.'], "Portfolio companies on Ascent update the fund's numbers themselves, so nobody chases them. AI drafts the memos; your team approves each one.", 'Reads Ascent rooms and Atlas data.'),
  ...prod('ascent', 'Ascent', 'The readiness engine with a data room inside.', ['One structured room per company, with a readiness score and a list of what is missing.', 'Documents are read and key terms pulled out; you confirm each one.', 'Share by link with an email gate, NDA, watermark and expiry, and see who opened it.', 'Deal flow, for programme admins: read every room in a cohort and turn ready ones into introductions the founder has agreed to.'], 'You decide who sees what, and every approval is recorded.', 'Switched on when an Orbit programme selects you. Read by Command and by programme deal flow.'),
  ...prod('orbit', 'Orbit', 'Run the programme in one place.', ['Applications, screening and evaluation rounds, scored on your own rubric.', 'Cohorts, mentors, meeting minutes, grants and compliance dates.', 'Grant reports in NIDHI-SSS, DST-TBI, BIRAC and RKVY-RAFTAR formats.'], 'Selecting a startup switches on its data room. Nobody re-enters the application.', 'Every Orbit plan includes Ascent data rooms for your startups.'),
  ...prod('connect', 'Connect', 'Mentors, audit partners and fund scouting.', ['Funds publish a thesis that anyone can read and apply to.', 'Founders request a mentor or an audit from inside their room.', 'Mentors and partners apply free and are vetted before they go live.'], 'Contact details stay hidden until the founder says yes.', 'Open to every user. Included with Ascent and Command.'),
  T(P_PROD, 'Connect: live thesis', 'products.connect.thesisName', 'Thesis name', 'LN partner network'),
  L(P_PROD, 'Connect: live thesis', 'products.connect.thesisText', 'Thesis text', 'Backs early-stage startups in any sector, based in India. Founders are evaluated through their data room, which is free to build on Ascent.'),
  T(P_PROD, 'Connect: live thesis', 'products.connect.thesisTags', 'Tags (comma separated)', 'Sector agnostic, India, Pre-seed to Series A, US$500K to US$3M'),
  T(P_PROD, 'Connect: live thesis', 'products.connect.thesisUrl', 'Thesis link', 'https://connect.labelnest.in/scout/ln-partner-network'),
  T(P_PROD, 'Closing call to action', 'products.cta.title', 'Heading', 'Not sure which one you need? Tell us what you do.'),

  // ───────────── PRICING ─────────────
  T(P_PRICE, 'Opening', 'pricing.hero.title', 'Headline', 'Priced by product. In rupees and dollars.'),
  L(P_PRICE, 'Opening', 'pricing.hero.lead', 'Opening paragraph', 'Pay for the products you use. Prices are per year unless stated. Every new account starts with 30 days of full access, free.'),
  L(P_PRICE, 'Atlas', 'pricing.atlas.note', 'Note under the table', 'Higher plans add alerts, faster refresh, API access and a discount on each record unlocked. Enterprise: custom seats and an SLA.'),
  L(P_PRICE, 'Exchange', 'pricing.exchange.freeNote', 'Free plan: extra terms', '25% platform fee on closed deals.'),
  L(P_PRICE, 'Exchange', 'pricing.exchange.sellerNote', 'Seller plan: extra terms', '15% platform fee on closed deals.'),
  L(P_PRICE, 'Command', 'pricing.command.note', 'Note under the table', 'Every feature. 3 seats, 1 vehicle, 50 portfolio companies, 100 LPs tracked, 20 AI memo credits a month and 2,000 Atlas credits a year. Free tier: 1 fund room and 5 portfolio companies.'),
  L(P_PRICE, 'Ascent', 'pricing.ascent.note', 'Note', 'Thirty days of full access, free. Then the room turns read-only unless you subscribe.'),
  L(P_PRICE, 'Ascent', 'pricing.ascent.includes', 'What the founder plan includes', 'Every section, investor sharing links and analytics, unlimited readiness audits, a free mentor introduction call.'),
  L(P_PRICE, 'Ascent', 'pricing.ascent.group', 'Group of startups', 'One price for a cohort, a network or a portfolio.'),
  L(P_PRICE, 'Orbit', 'pricing.orbit.note', 'Note under the table', 'Need more data rooms than your plan includes? Ask us and we will quote them. Without Orbit, a data room is priced per startup on the Ascent plan. For many startups, ask for a group quote.'),
  I(P_PRICE, 'Orbit', 'pricing.orbit.features', 'What each plan adds (optional)', [{ key: 'plan', label: 'Plan name' }, { key: 'text', label: 'Text', long: true }], [], 'Only add text you can stand behind. The price and data rooms come from NestLens.', 'Add a line'),
  L(P_PRICE, 'Connect', 'pricing.connect.founders', 'Founders and funds', 'Mentor requests and verified audits come with an active Ascent or Command plan.'),
  L(P_PRICE, 'Connect', 'pricing.connect.partners', 'Mentors and audit partners', 'Free to apply. Vetted before your dashboard goes live.'),
  T(P_PRICE, 'Closing call to action', 'pricing.cta.title', 'Heading', 'Need Enterprise, a bundle or a group price?'),
  T(P_PRICE, 'Closing call to action', 'pricing.cta.lead', 'Text', 'A person replies within one business day with a written quote.'),

  // ───────────── FOR INCUBATORS ─────────────
  T(P_INC, 'Opening', 'incubator.hero.title', 'Headline', 'Run the programme. Build the rooms. Reach the funds.'),
  L(P_INC, 'Opening', 'incubator.hero.lead', 'Opening paragraph', 'From selection to the first fund meeting, in one place. Orbit runs the programme. Each startup builds one data room in Ascent. Your admin turns ready rooms into introductions. Connect puts them in front of funds and mentors.'),
  T(P_INC, 'Flow', 'incubator.flow.title', 'Heading', 'Three products. One startup record.'),
  I(P_INC, 'Flow', 'incubator.flow.items', 'Four parts', titleBody, [
    { title: 'Orbit', body: 'Applications, screening, evaluation rounds, mentors, meeting minutes, grants and reports. Eight layers from institution to alumni.' },
    { title: 'Ascent data room', body: 'Selection switches a room on. The founder builds one structured room and sees a readiness score.' },
    { title: 'Deal flow', body: 'A feature of Ascent. Your admin reads every room, sees who is ready, and moves each startup and investor pairing along a board.' },
    { title: 'Connect', body: 'Funds find startups that opted in. Startups apply to published theses. Mentors take bookings.' },
  ], 'Keep four.'),
  T(P_INC, 'Deal flow', 'incubator.admin.title', 'Heading', 'Deal flow, without chasing anyone.'),
  L(P_INC, 'Deal flow', 'incubator.admin.lead', 'Intro', "It reads each founder's room and never writes back. The room stays the one record."),
  I(P_INC, 'Deal flow', 'incubator.admin.cols', 'Four columns', [{ key: 'title', label: 'Title' }, { key: 'points', label: 'Points (one per line)', long: true }], [
    { title: 'See', points: 'The cohort funnel: who is ready, who has gone quiet, what waits on a founder.\nReadiness and completeness for every startup, and what each room lacks.\nWhat changed at each sync, one click into any room.' },
    { title: 'Move', points: 'A board for every startup and investor pairing, with owner, days in stage and round amount.\nA log of who was introduced to whom and what came of it.\nFunnel and money-raised reports, exported to a spreadsheet.' },
    { title: 'Find', points: 'An investor directory synced from Atlas: venture funds, angels, family offices, accelerators and grants.\nSuggested matches with the reasons shown. A suggestion stays a draft until a person approves it.' },
    { title: 'Govern', points: "No introduction is recorded until the founder agrees, and the founder picks what the investor sees.\nRoles for admin, manager, mentor and funder.\nConsent and access logs that can only be added to." },
  ], 'Keep four.'),
  L(P_INC, 'Deal flow', 'incubator.board.note', 'Note under the board', "Suggested to Introduced needs the founder's yes. The founder chooses what is shared: profile, traction, deck, financials, cap table or the full room."),
  T(P_INC, 'Open now', 'incubator.network.title', 'Heading', 'The LN partner network.'),
  L(P_INC, 'Open now', 'incubator.network.lead', 'Text', 'A live thesis on Connect that backs early-stage startups in any sector, based in India. Founders are evaluated through their data room, which is free to build on Ascent. Your cohort can apply today.'),
  I(P_INC, 'Open now', 'incubator.network.facts', 'Facts', [{ key: 'label', label: 'Label' }, { key: 'value', label: 'Value' }], [
    { label: 'Sectors', value: 'Sector agnostic' }, { label: 'Geography', value: 'India' }, { label: 'Stages', value: 'Pre-seed, Seed, Series A' }, { label: 'Cheque size', value: 'US$500,000 to US$3,000,000' },
  ]),
  T(P_INC, 'Pricing', 'incubator.pricing.title', 'Heading', "If you run on Orbit, your startups' data rooms are included."),
  L(P_INC, 'Pricing', 'incubator.pricing.lead', 'Text', 'Each plan includes a number of Ascent data rooms. Every active founder in any of your cohorts uses one.'),
  I(P_INC, 'Pricing', 'incubator.pricing.suited', 'Suited to (by plan name)', [{ key: 'plan', label: 'Plan name' }, { key: 'text', label: 'Suited to' }], [
    { plan: 'Orbit Launch', text: 'A first pilot' }, { plan: 'Orbit Starter', text: 'A small cohort' }, { plan: 'Orbit Growth', text: 'One full cohort' }, { plan: 'Orbit Scale', text: 'Several cohorts' }, { plan: 'Orbit Enterprise', text: 'A large institution or network' },
  ]),
  L(P_INC, 'Pricing', 'incubator.pricing.without', 'Without Orbit', 'A data room is priced per startup on the Ascent plan.'),
  L(P_INC, 'Pricing', 'incubator.pricing.group', 'A group of startups', 'One commercial for the whole group.'),
  L(P_INC, 'Pricing', 'incubator.pricing.trial', 'Try it first', 'A set-period trial with two founder rooms. Your data stays when it ends.'),
  T(P_INC, 'Closing call to action', 'incubator.cta.title', 'Heading', 'See it on your own cohort.'),

  ...PD_FIELDS,
  ...PD_MORE,
  ...ABOUT_FIELDS,
]

export const CONTENT_PAGES = Array.from(new Set(CONTENT_FIELDS.map((f) => f.page)))
const BY_KEY: Record<string, ContentField> = Object.fromEntries(CONTENT_FIELDS.map((f) => [f.key, f]))
export const fieldFor = (key: string): ContentField | undefined => BY_KEY[key]

export function defaultsMap(): ContentMap {
  return Object.fromEntries(CONTENT_FIELDS.map((f) => [f.key, f.default]))
}

/** Defaults overlaid with whatever the admin has saved. Never throws: a missing table or a database error just means defaults. */
export async function getContent(): Promise<ContentMap> {
  const map = defaultsMap()
  try {
    const rows = (await sql`SELECT key, value FROM website_content`) as { key: string; value: unknown }[]
    for (const r of rows) {
      const f = BY_KEY[r.key]
      if (!f) continue
      if (f.kind === 'items') {
        if (Array.isArray(r.value)) map[r.key] = r.value as Item[]
      } else if (typeof r.value === 'string') {
        map[r.key] = r.value
      }
    }
  } catch {
    /* table not created yet, or the database is unreachable: show the defaults */
  }
  return map
}

export const text = (m: ContentMap, key: string): string => {
  const v = m[key]
  return typeof v === 'string' ? v : ''
}
export const items = (m: ContentMap, key: string): Item[] => {
  const v = m[key]
  return Array.isArray(v) ? v : []
}
