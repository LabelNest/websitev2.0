import { NextRequest, NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { email, path } = await req.json()
    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const url = process.env.DATANEST_API_URL
    const key = process.env.DIY_LEADS_API_KEY
    if (!url || !key) {
      console.warn('[diy-access] DATANEST_API_URL/DIY_LEADS_API_KEY not configured — lead not captured')
      return NextResponse.json({ ok: true })
    }

    try {
      const res = await fetch(`${url}/api/public/diy-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': key },
        body: JSON.stringify({
          email: email.toLowerCase(),
          source: 'website',
          path: path || req.headers.get('referer') || null,
          userAgent: req.headers.get('user-agent') || null,
        }),
      })
      if (!res.ok) console.error('[diy-access] DataNest capture failed:', await res.text())
    } catch (err) {
      // A DataNest hiccup shouldn't block a real visitor from unlocking the page.
      console.error('[diy-access] DataNest capture error:', err)
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
