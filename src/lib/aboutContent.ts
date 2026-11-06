import type { ContentField, ItemField, Item } from '@/lib/siteContent'

// Copy for the About page. Edited in Admin -> Page content -> About. Tokens {{entities}} etc. are filled live.
const P = 'About'
const T = (group: string, key: string, label: string, def: string): ContentField => ({ key, page: P, group, label, kind: 'text', default: def })
const L = (group: string, key: string, label: string, def: string, hint?: string): ContentField => ({ key, page: P, group, label, kind: 'longtext', default: def, hint })
const I = (group: string, key: string, label: string, itemFields: ItemField[], def: Item[], addLabel?: string): ContentField => ({ key, page: P, group, label, kind: 'items', itemFields, default: def, addLabel })
const titleBody: ItemField[] = [{ key: 'title', label: 'Title' }, { key: 'body', label: 'Text', long: true }]

export const ABOUT_FIELDS: ContentField[] = [
  T('Opening', 'about.hero.eyebrow', 'Small line above the headline', 'About LabelNest'),
  T('Opening', 'about.hero.title', 'Headline', 'The data layer for the private markets that global platforms overlook.'),
  L('Opening', 'about.hero.lead', 'Opening paragraph', 'LabelNest is a private markets data company in Bengaluru. We make reviewed data, and the software to use it, for the managers, founders and institutions that global platforms treat as an afterthought. We started in 2025 and we are building for the next ten years, not for an exit.'),

  T('What we do', 'about.what.title', 'Heading', 'One reviewed record. Six products on top of it.'),
  L('What we do', 'about.what.body1', 'First paragraph', 'Private markets in India and other emerging markets run on registers, filings, spreadsheets and relationships. The record of who manages what, who funds whom and who is raising is scattered, out of date, and rarely shows where a number came from.'),
  L('What we do', 'about.what.body2', 'Second paragraph', 'We build that record from regulatory registers and primary documents, review it with people, and date it field by field. Atlas is the data. Command, Ascent, Orbit and Connect are the software that fund managers, founders and programmes run on top of it. Exchange is where datasets change hands.'),
  L('What we do', 'about.what.body3', 'Third paragraph', 'Because every product reads the same record, a fix made once reaches all of them, and the work a founder or a fund does in one product improves the data everyone else sees, after review.'),

  T('Standard', 'about.standard.title', 'Heading', 'The standard we hold ourselves to.'),
  I('Standard', 'about.standard.items', 'Commitments', titleBody, [
    { title: 'Every field has a source', body: 'A value carries where it came from, who set it and when. If a value has no citable source we say so, and we do not invent one.' },
    { title: 'A different person checks the work', body: 'Whoever, or whatever, writes a value never marks it reviewed. A separate review confirms it against the source, and anything unreviewed is shown as pending.' },
    { title: 'Nothing is deleted to fix a duplicate', body: 'Before we create a record we check for an existing one. When two records are one, we merge them and keep every fact either held.' },
    { title: 'A named person is accountable', body: 'Every change is logged against a real person or our review process. There is always someone who answers for a wrong number.' },
    { title: 'Customer data stays customer data', body: 'A founder decides who sees a data room. A fund decides who sees its workspace. Contact details are shared only with consent.' },
    { title: 'Prices are published', body: 'Plans and prices are on the website in rupees and dollars, read from the same catalogue the product uses.' },
  ], 'Add a commitment'),

  T('Numbers', 'about.numbers.title', 'Heading', 'Where we are today.'),
  I('Numbers', 'about.numbers.items', 'Figures', [{ key: 'value', label: 'Figure' }, { key: 'label', label: 'What it is' }], [
    { value: '{{entities}}', label: 'entities on Atlas, counted live' },
    { value: '{{funds}}', label: 'funds on Atlas' },
    { value: '8', label: 'products on one record' },
    { value: '2025', label: 'founded, in Bengaluru' },
  ], 'Add a figure'),

  T('Principles', 'about.principles.title', 'Heading', 'Five principles behind every decision.'),
  I('Principles', 'about.principles.items', 'Principles', titleBody, [
    { title: 'Data that can be explained', body: 'Every dataset is built to be understood, not only consumed. It should hold up in front of an auditor, a regulator or an LP, and it should be safe to train a model on.' },
    { title: 'Owned, not rented', body: 'No black-box vendors, no opaque pricing and no lock-in. Data belongs to the people who generate it and the teams who use it, and you can take it with you.' },
    { title: 'Emerging first', body: 'Managers, founders and markets that global platforms treat as an afterthought are our first customers, not our second priority.' },
    { title: 'Human accountability at every layer', body: 'Automation speeds up what people have already worked out. Every workflow has a human review, because accountability cannot be delegated to an algorithm.' },
    { title: 'Built to last', body: 'Institutions that rely on our data need to know we will be here in ten years. That shapes every product decision, every partnership and every line of code.' },
  ], 'Add a principle'),

  T('Who we serve', 'about.serve.title', 'Heading', 'Who we build for.'),
  I('Who we serve', 'about.serve.items', 'Audiences', [{ key: 'title', label: 'Title' }, { key: 'body', label: 'Text', long: true }, { key: 'href', label: 'Link' }], [
    { title: 'Fund managers', body: 'Emerging and established venture, private equity and credit managers, from sourcing to LP reporting.', href: '/who-we-serve/gp' },
    { title: 'Limited partners', body: 'Family offices, institutions and funds of funds that need to find and compare managers.', href: '/who-we-serve/lp' },
    { title: 'Founders', body: 'Companies raising capital that need to be ready, and be found, on their own terms.', href: '/who-we-serve/founder' },
    { title: 'Incubators and accelerators', body: 'Programmes that select, support and introduce startups to funds.', href: '/who-we-serve/incubator' },
    { title: 'Researchers and advisers', body: 'People who need a cited, dated figure rather than a guess.', href: '/who-we-serve/researcher' },
  ], 'Add an audience'),

  T('Company', 'about.company.title', 'Heading', 'Company details.'),
  I('Company', 'about.company.items', 'Details', [{ key: 'label', label: 'Label' }, { key: 'value', label: 'Value', long: true }], [
    { label: 'Legal entity', value: 'LabelNest India Private Limited' },
    { label: 'CIN', value: 'U63111KA2025PTC211812' },
    { label: 'Registered office', value: 'No. 33, 4th Floor, 1st Main, CBI Main Rd, HMT Layout, Ganganagar, Bengaluru 560032' },
    { label: 'Founded', value: '2025' },
    { label: 'Policies', value: 'Privacy, terms, cookies and security are published under Legal.' },
  ], 'Add a detail'),

  T('Closing', 'about.cta.title', 'Closing heading', 'Talk to the team that builds it.'),
]
