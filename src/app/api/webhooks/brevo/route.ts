import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// Brevo has no HMAC signing for transactional webhooks — the only available
// verification is the bearer token configured when the webhook was created
// (see scripts/register-brevo-webhook.mjs, auth: {type: 'bearer', token}).
function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.BREVO_WEBHOOK_SECRET
  if (!expected) return false
  const header = req.headers.get('authorization') || ''
  return header === `Bearer ${expected}`
}

interface BrevoEvent {
  event: string
  email?: string
  'message-id'?: string
  tags?: string[]
  link?: string
  user_agent?: string
  subject?: string
  ts_epoch?: number
}

const OPEN_EVENTS = new Set(['opened', 'uniqueOpened'])
const NEGATIVE_EVENTS: Record<string, string> = {
  hardBounce: 'bounced',
  softBounce: 'bounced',
  blocked: 'blocked',
  invalid: 'invalid',
  spam: 'spam',
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body: BrevoEvent = await req.json().catch(() => ({}) as BrevoEvent)
  const { event, email, tags, link, user_agent } = body
  const messageId = body['message-id']
  // We set tags: [campaignId] at send time (see send/route.ts) — every send,
  // test or broadcast, gets a real campaign row now, so this is always a
  // real UUID.
  const campaignId = tags?.[0]

  if (!event || !email || !campaignId) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  try {
    if (event === 'delivered') {
      await sql`
        UPDATE website_newsletter_recipients
        SET status = CASE WHEN status = 'sent' THEN 'delivered' ELSE status END,
            message_id = COALESCE(message_id, ${messageId ?? null}),
            updated_at = NOW()
        WHERE campaign_id = ${campaignId}::uuid AND email = ${email}
      `
    } else if (OPEN_EVENTS.has(event)) {
      const [recipient] = await sql`
        UPDATE website_newsletter_recipients
        SET status = CASE WHEN status IN ('sent', 'delivered') THEN 'opened' ELSE status END,
            open_count = open_count + 1,
            first_opened_at = COALESCE(first_opened_at, NOW()),
            last_opened_at = NOW(),
            updated_at = NOW()
        WHERE campaign_id = ${campaignId}::uuid AND email = ${email}
        RETURNING subscriber_id
      `
      // uniqueOpened is Brevo's already-deduped signal — only log one audit
      // row per recipient from that event to avoid double-counting against
      // the raw 'opened' event Brevo also sends for the first open.
      if (event === 'uniqueOpened' || event === 'opened') {
        await sql`
          INSERT INTO website_newsletter_opens (campaign_id, subscriber_id, email, message_id, user_agent, opened_at)
          VALUES (${campaignId}::uuid, ${recipient?.subscriber_id ?? null}, ${email}, ${messageId ?? null}, ${user_agent ?? null}, NOW())
        `
      }
    } else if (event === 'click') {
      const [recipient] = await sql`
        UPDATE website_newsletter_recipients
        SET status = 'clicked',
            click_count = click_count + 1,
            first_clicked_at = COALESCE(first_clicked_at, NOW()),
            last_clicked_at = NOW(),
            updated_at = NOW()
        WHERE campaign_id = ${campaignId}::uuid AND email = ${email}
        RETURNING subscriber_id
      `
      await sql`
        INSERT INTO website_newsletter_clicks (campaign_id, subscriber_id, email, message_id, url, user_agent, clicked_at)
        VALUES (${campaignId}::uuid, ${recipient?.subscriber_id ?? null}, ${email}, ${messageId ?? null}, ${link ?? null}, ${user_agent ?? null}, NOW())
      `
    } else if (event === 'unsubscribed') {
      await sql`
        UPDATE website_newsletter_recipients SET status = 'unsubscribed', updated_at = NOW()
        WHERE campaign_id = ${campaignId}::uuid AND email = ${email}
      `
    } else if (NEGATIVE_EVENTS[event]) {
      await sql`
        UPDATE website_newsletter_recipients
        SET status = CASE WHEN status NOT IN ('opened', 'clicked') THEN ${NEGATIVE_EVENTS[event]} ELSE status END,
            updated_at = NOW()
        WHERE campaign_id = ${campaignId}::uuid AND email = ${email}
      `
    }
    // Other event types (sent, deferred) carry no new information we track.
  } catch (err) {
    console.error('[brevo webhook]', err instanceof Error ? err.message : err)
    // Always 200 — Brevo retries on non-2xx, and a DB hiccup shouldn't cause
    // a retry storm for an event we may have already partially processed.
  }

  return NextResponse.json({ ok: true })
}
