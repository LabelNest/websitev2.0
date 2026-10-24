import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// Forms and lists a signup may claim. Anything else is rejected, so the admin view can
// trust these values.
// observatory_* are sent server-to-server by NestLens when a reader unlocks or joins the waitlist of a report on atlas.labelnest.in.
const FORMS = ['website_footer', 'signal_page', 'reports_page', 'observatory_unlock', 'observatory_waitlist'] as const
const LISTS = ['general', 'signal-waitlist', 'report-series'] as const

const clip = (v: unknown, n: number): string | null =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, n) : null

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = clip(body.email, 254)?.toLowerCase()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    const formId = FORMS.find(f => f === body.form_id)
    const listKey = LISTS.find(l => l === body.list_key)
    if (!formId || !listKey) {
      return NextResponse.json({ error: 'Unknown form or list' }, { status: 400 })
    }

    // One subscriber row per email (source = the first form they used); the list is added
    // to `lists`. Status is left alone, so an unsubscribed address is not silently re-enabled.
    const [sub] = await sql`
      INSERT INTO website_newsletter_subscribers (email, source, subscribed_at, lists)
      VALUES (${email}, ${formId}, NOW(), ARRAY[${listKey}]::text[])
      ON CONFLICT (email) DO UPDATE
        SET lists = CASE WHEN ${listKey} = ANY(website_newsletter_subscribers.lists)
                         THEN website_newsletter_subscribers.lists
                         ELSE array_append(website_newsletter_subscribers.lists, ${listKey}) END,
            updated_at = NOW()
      RETURNING id, (xmax = 0) AS is_new`

    // Every submission is kept with its own origin.
    await sql`
      INSERT INTO website_newsletter_signups
        (subscriber_id, email, list_key, form_id, page_path, referrer,
         utm_source, utm_medium, utm_campaign, utm_term, utm_content, user_agent, is_new)
      VALUES (${sub.id}, ${email}, ${listKey}, ${formId}, ${clip(body.page_path, 300)}, ${clip(body.referrer, 500)},
              ${clip(body.utm_source, 200)}, ${clip(body.utm_medium, 200)}, ${clip(body.utm_campaign, 200)},
              ${clip(body.utm_term, 200)}, ${clip(body.utm_content, 200)},
              ${clip(body.user_agent, 300) ?? clip(req.headers.get('user-agent'), 300)}, ${sub.is_new})`
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
