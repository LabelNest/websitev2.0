import { NextRequest, NextResponse } from 'next/server'

const NESTHR_URL = process.env.NESTHR_SUPABASE_URL
const NESTHR_KEY = process.env.NESTHR_SUPABASE_KEY

const VALID_TRACKS = [
  'Data Research',
  'HR',
  'Marketing',
  'Sales',
  'Engineering & AI',
  'Others',
  // fellowship tracks map into the above
  'NestLabs',
  'NestTech',
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, track, message, linkedin_url, source, metadata } = body

    if (!name || !email || !track) {
      return NextResponse.json({ error: 'name, email and track are required' }, { status: 400 })
    }
    if (!VALID_TRACKS.includes(track)) {
      return NextResponse.json({ error: 'Invalid track' }, { status: 400 })
    }
    if (!NESTHR_URL || !NESTHR_KEY) {
      return NextResponse.json({ error: 'NestHR not configured' }, { status: 500 })
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      track,
      message: message?.trim() || null,
      linkedin_url: linkedin_url?.trim() || null,
      source: source || 'website',
      status: 'new',
      metadata: metadata || null,
    }

    const res = await fetch(`${NESTHR_URL}/rest/v1/applications`, {
      method: 'POST',
      headers: {
        apikey: NESTHR_KEY,
        Authorization: `Bearer ${NESTHR_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('NestHR insert failed:', res.status, err)
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('/api/apply error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
