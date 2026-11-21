'use client'

import { useState } from 'react'

// "How you bring them": the moments when each kind of customer needs LabelNest, grouped by who the partner knows.
// Every card can raise that product in the calculator above. Wording is about software and data only: no promise of funding or investor introductions.
export type ProductKey = 'ascent' | 'atlas' | 'orbit' | 'command'
interface Card { product: string; key: ProductKey | null; also: string; title: string; why: string; say: string }
interface Group { name: string; cards: Card[] }

const GROUPS: Group[] = [
  {
    name: 'Founders',
    cards: [
      { product: 'Ascent', key: 'ascent', also: 'Connect included', title: 'Before they raise', why: 'A founder who looks organised and ready is easier for any investor to say yes to. Ascent keeps the data room, the readiness score and the documents in one place.', say: 'Before you talk to investors, get your data room in order. It takes an afternoon.' },
      { product: 'Atlas', key: 'atlas', also: 'Source on every field', title: 'While they raise', why: 'Founders lose months on the wrong funds. Atlas shows which funds and investors are active at their stage and sector, with a source on every field.', say: 'Know which funds really invest in your stage before you send a single email.' },
      { product: 'Ascent', key: 'ascent', also: 'Connect included', title: 'After they raise', why: 'Investors expect regular updates. The same data room keeps numbers and documents current, so reporting is not a scramble.', say: 'Keep your investors updated from the room you already built.' },
      { product: 'Ascent', key: 'ascent', also: 'Shared with consent', title: 'Before a sale or due diligence', why: 'When someone asks for documents, a structured room turns weeks of searching into one link, shared only with the founder’s consent.', say: 'If anyone ever asks for diligence, you will not be digging through folders.' },
      { product: 'Ascent', key: 'ascent', also: 'Connect', title: 'When they need a mentor or an audit', why: 'Mentor and audit requests are made from inside the data room, and contact details stay hidden until the founder agrees.', say: 'You can request a mentor or a verified audit right from your room.' },
    ],
  },
  {
    name: 'Funds and investors',
    cards: [
      { product: 'Command', key: 'command', also: 'Atlas', title: 'Launching or running a fund', why: 'Deal pipeline, diligence, committee, portfolio and investor accounts in one record, instead of sheets and email.', say: 'Run the whole fund from one record, from first look to portfolio.' },
      { product: 'Ascent', key: 'ascent', also: 'For the portfolio', title: 'Equipping portfolio companies', why: 'A fund can buy Ascent for its portfolio. Each company gets a structured data room and a readiness score, so the fund sees organised, current information without chasing.', say: 'Put your portfolio companies on Ascent so their numbers and documents reach you in one format.' },
      { product: 'Atlas', key: 'atlas', also: 'Capital providers', title: 'Raising from capital providers', why: 'Managers raising a fund need to know who allocates to their strategy. Atlas maps capital providers and fund managers.', say: 'See who allocates to strategies like yours, with sources.' },
      { product: 'Command', key: 'command', also: 'Ascent rooms', title: 'Tracking portfolio companies', why: 'Founders on Ascent keep their numbers current, so a fund sees fresh data inside its own workspace.', say: 'Stop chasing portfolio updates. They arrive in the same place.' },
      { product: 'Atlas', key: 'atlas', also: 'Connect', title: 'Looking for deal flow', why: 'Funds can publish a thesis and find companies that fit, with the founder’s consent before any contact.', say: 'Put your thesis in front of founders who fit it.' },
    ],
  },
  {
    name: 'Incubators and institutions',
    cards: [
      { product: 'Orbit', key: 'orbit', also: 'Ascent', title: 'Starting a new cohort', why: 'Applications, startups, mentors, sessions and reports in one place, instead of a spreadsheet per cohort.', say: 'Run the next cohort without a spreadsheet for every programme.' },
      { product: 'Ascent', key: 'ascent', also: 'Orbit', title: 'Getting a cohort investor-ready', why: 'Each startup builds its own data room and readiness score, so the programme can see who is ready.', say: 'Every startup in your cohort gets a data room and a readiness score.' },
      { product: 'Ascent', key: 'ascent', also: 'Deal flow', title: 'Seeing your programme’s deal flow', why: 'Programme admins use Ascent’s deal flow view to see which rooms are ready and take them forward, always with the founder’s consent.', say: 'See every startup in your programme and how ready each one is, in one view.' },
      { product: 'Orbit', key: 'orbit', also: 'Terms in writing', title: 'Running a programme at an institution', why: 'Universities, innovation cells and communities get a structure for founders, mentors and outcomes. Terms are agreed in writing.', say: 'Give your founders and mentors one place to work together.' },
    ],
  },
  {
    name: 'Advisers and service providers',
    cards: [
      { product: 'Ascent', key: 'ascent', also: 'Connect', title: 'A client is preparing to raise', why: 'CA, CS, legal and fundraising advisers see this first. Ascent gives the client an organised room, and the adviser a clear checklist.', say: 'Let us get your records into one data room before you approach investors.' },
      { product: 'Atlas', key: 'atlas', also: 'Ascent', title: 'A client is exploring a deal or an exit', why: 'Atlas gives market context on the funds, buyers and companies around them. A data room makes diligence smooth.', say: 'Here is who is active in your space, and a room ready to share.' },
      { product: 'Atlas', key: 'atlas', also: 'Company research', title: 'Finding clients of your own', why: 'Atlas helps you research companies and the people behind them, so your outreach is informed.', say: 'I research my targets on Atlas before I reach out.' },
      { product: 'Exchange', key: null, also: 'Exchange', title: 'A client needs data or research', why: 'Exchange is a marketplace for datasets, research and alternative data, with verified sellers, escrowed payment and a quality score on every listing.', say: 'You can buy the dataset you need on Exchange, with the seller verified and payment held until delivery.' },
    ],
  },
]

export default function HowYouBringThem({ onAdd }: { onAdd: (k: ProductKey) => void }) {
  const [tab, setTab] = useState(0)
  const [added, setAdded] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const g = GROUPS[tab]
  return (
    <section className="pb-10" aria-labelledby="bring-h">
      {/* closed by default: it is a helper, not something everyone needs to read */}
      <details onToggle={(e) => setOpen(e.currentTarget.open)} className="rounded-[16px]" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5" style={{ listStyle: 'none' }}>
        <span>
          <h2 id="bring-h" className="font-display font-bold text-[22px]" style={{ color: 'var(--text)' }}>How you bring them</h2>
          <span className="block text-[14px] mt-1" style={{ color: 'var(--text3)' }}>The moments when founders, funds, incubators and advisers need LabelNest, and what to say.</span>
        </span>
        <span className="flex-none text-[14px] font-semibold" style={{ color: 'var(--pink)' }}>{open ? 'Hide' : 'Show'} <span aria-hidden>{open ? '▴' : '▾'}</span></span>
      </summary>
      <div className="px-6 pb-6">
      <p className="text-[15px] leading-[1.65] mb-5 max-w-[680px]" style={{ color: 'var(--text2)' }}>People do not buy software in the abstract. They buy at a moment. Pick who you know, see the moments to look for, and add the customer to your estimate.</p>
      <div role="tablist" aria-label="Who do you know" className="flex flex-wrap gap-2.5 mb-5">
        {GROUPS.map((x, i) => (
          <button key={x.name} type="button" role="tab" aria-selected={i === tab} onClick={() => setTab(i)} className="px-5 py-2.5 rounded-full text-[14px] font-semibold" style={{ background: i === tab ? 'var(--pink)' : 'transparent', color: i === tab ? '#fff' : 'var(--text)', border: '1px solid ' + (i === tab ? 'var(--pink)' : 'var(--border)') }}>{x.name}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {g.cards.map((c) => {
          const id = g.name + c.title
          return (
            <div key={id} className="rounded-[14px] p-5 flex flex-col gap-2.5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--bg2)', color: 'var(--text)' }}>{c.product}</span>
                <span className="text-[12px]" style={{ color: 'var(--text3)' }}>{c.also}</span>
              </div>
              <h3 className="font-display font-bold text-[18.5px] leading-[1.25]" style={{ color: 'var(--text)' }}>{c.title}</h3>
              <p className="text-[14px] leading-[1.6]" style={{ color: 'var(--text2)' }}>{c.why}</p>
              <p className="text-[13.5px] leading-[1.55] rounded-[10px] px-3 py-2.5" style={{ background: 'var(--bg2)', color: 'var(--text)' }}><b>You could say:</b> “{c.say}”</p>
              {c.key && (
                <button type="button" onClick={() => { onAdd(c.key as ProductKey); setAdded(id); setTimeout(() => setAdded(null), 1400) }} className="mt-auto self-start text-[13.5px] font-semibold px-4 py-2 rounded-[10px]" style={{ border: '1px solid var(--pink)', color: added === id ? '#fff' : 'var(--pink)', background: added === id ? 'var(--pink)' : 'transparent' }}>
                  {added === id ? 'Added to your estimate' : `+ Add ${/^[AEIOU]/i.test(c.product) ? 'an' : 'a'} ${c.product} customer to my estimate`}
                </button>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-[13px] leading-[1.65] mt-5 pt-4" style={{ color: 'var(--text3)', borderTop: '1px solid var(--border)' }}>Two things to keep in mind: you cannot refer yourself, and never promise funding or investor introductions. We sell software and data, nothing else.</p>
      </div>
      </details>
    </section>
  )
}
