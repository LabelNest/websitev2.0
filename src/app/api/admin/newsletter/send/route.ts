import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'
import { sql } from '@/lib/db'

const BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email'
const SENDER = { name: 'LabelNest', email: 'newsletter@labelnest.in' }
const BATCH_SIZE = 50

interface SendBody {
  subject?: string
  template?: string
  html_content?: string
  recipients?: string
  test_email?: string
  test?: boolean
}

interface Recipient {
  id: string | null
  email: string
}

// Brevo messageId per recipient (via messageVersions, one recipient per
// version) is what open/click webhook events key off of. Every send — test
// or broadcast — is now tracked as a real campaign; there's no untracked
// path anymore. (Previously test sends were tagged 'test' and explicitly
// skipped by the webhook receiver, which is why a test send never showed
// opens/clicks — that also meant there was no way to send a real, trackable
// email to just one or two addresses without blasting the full list.)
async function sendBatch(apiKey: string, subject: string, htmlContent: string, batch: Recipient[], campaignId: string) {
  const res = await fetch(BREVO_SEND_URL, {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: SENDER,
      subject,
      htmlContent,
      tags: [campaignId],
      messageVersions: batch.map((r) => ({ to: [{ email: r.email }] })),
    }),
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(errText)
  }
  const data = await res.json().catch(() => ({}))
  const messageIds: string[] = Array.isArray(data.messageIds) ? data.messageIds : []
  return messageIds
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookies()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'BREVO_API_KEY is not configured' }, { status: 500 })
  }

  const body: SendBody = await req.json()
  const { subject, template, html_content, test_email, test } = body

  if (!subject || !html_content) {
    return NextResponse.json({ error: 'subject and html_content are required' }, { status: 400 })
  }

  let recipients: Recipient[]
  let recipientFilter: string

  if (test) {
    const toEmails = String(test_email || '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
    if (!toEmails.length) {
      return NextResponse.json({ error: 'No test recipients provided' }, { status: 400 })
    }
    // Match against real subscribers where possible so a test send to a
    // subscriber's own address links to their subscriber_id like a normal
    // send would; addresses that aren't subscribers still send and track
    // fine, just with subscriber_id left null.
    const matched = await sql`
      SELECT id, email FROM website_newsletter_subscribers WHERE email = ANY(${toEmails})
    ` as Recipient[]
    const matchedEmails = new Set(matched.map((m) => m.email))
    recipients = [...matched, ...toEmails.filter((e) => !matchedEmails.has(e)).map((email) => ({ id: null, email }))]
    recipientFilter = 'test'
  } else {
    recipients = await sql`
      SELECT id, email FROM website_newsletter_subscribers WHERE status = 'active'
    ` as Recipient[]
    if (!recipients.length) {
      return NextResponse.json({ error: 'No active subscribers to send to' }, { status: 400 })
    }
    recipientFilter = 'all'
  }

  const [campaign] = await sql`
    INSERT INTO website_newsletter_campaigns
      (subject, template_name, html_content, recipient_count, recipient_filter, status, sent_by, sent_at)
    VALUES (${subject}, ${template ?? null}, ${html_content}, ${recipients.length}, ${recipientFilter}, 'sending', ${admin.email}, NOW())
    RETURNING id
  `
  const campaignId = campaign.id as string

  let sentCount = 0
  let failedBatch: string | null = null

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE)
    let messageIds: string[]
    try {
      messageIds = await sendBatch(apiKey, subject, html_content, batch, campaignId)
    } catch (e) {
      failedBatch = e instanceof Error ? e.message : 'Network error calling Brevo'
      break
    }

    // messageIds is positional — same order as the messageVersions we sent.
    for (let j = 0; j < batch.length; j++) {
      const rec = batch[j]
      const messageId = messageIds[j] ?? null
      await sql`
        INSERT INTO website_newsletter_recipients (campaign_id, subscriber_id, email, message_id, status)
        VALUES (${campaignId}, ${rec.id}, ${rec.email}, ${messageId}, 'sent')
        ON CONFLICT (campaign_id, email) DO UPDATE SET message_id = EXCLUDED.message_id
      `
    }
    sentCount += batch.length
  }

  await sql`
    UPDATE website_newsletter_campaigns
    SET status = ${failedBatch ? 'failed' : 'sent'},
        recipient_count = ${sentCount},
        error_message = ${failedBatch},
        updated_at = NOW()
    WHERE id = ${campaignId}
  `

  if (failedBatch) {
    return NextResponse.json({ error: 'Brevo send failed', detail: failedBatch, sent: sentCount }, { status: 502 })
  }
  return NextResponse.json({ ok: true, sent: sentCount, campaign_id: campaignId, test: !!test })
}
