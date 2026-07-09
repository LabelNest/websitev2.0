import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminFromCookies } from '@/lib/auth'
import { sql } from '@/lib/db'

async function guard() {
  const admin = await getAdminFromCookies()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function GET() {
  const err = await guard(); if (err) return err
  const rows = await sql`SELECT * FROM website_team_members ORDER BY sort_order ASC`
  return NextResponse.json({ rows })
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  const expertise: string[] | null = m.expertise
    ? String(m.expertise).split(',').map((s: string) => s.trim()).filter(Boolean)
    : null
  const row = await sql`
    INSERT INTO website_team_members (name,role,department,bio,linkedin_url,image_url,image_position,image_zoom,sort_order,is_active,slug,email,expertise,quote)
    VALUES (${m.name},${m.role||''},${m.department||''},${m.bio||null},${m.linkedin_url||null},${m.image_url||null},${m.image_position||'50% 0%'},${m.image_zoom||1},${m.sort_order||99},${m.is_active!==false},${m.slug||null},${m.email||null},${expertise?JSON.stringify(expertise):null}::jsonb,${m.quote||null})
    RETURNING id`
  revalidatePath('/team')
  return NextResponse.json({ id: row[0].id })
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err
  const m = await req.json()
  const expertise: string[] | null = m.expertise
    ? String(m.expertise).split(',').map((s: string) => s.trim()).filter(Boolean)
    : null
  await sql`
    UPDATE website_team_members SET
      name=${m.name},role=${m.role||''},department=${m.department||''},bio=${m.bio||null},
      linkedin_url=${m.linkedin_url||null},image_url=${m.image_url||null},
      image_position=${m.image_position||'50% 0%'},image_zoom=${m.image_zoom||1},
      sort_order=${m.sort_order||99},is_active=${m.is_active!==false},
      slug=${m.slug||null},email=${m.email||null},expertise=${expertise?JSON.stringify(expertise):null}::jsonb,quote=${m.quote||null},
      updated_at=NOW()
    WHERE id=${m.id}`
  revalidatePath('/team')
  if (m.slug) revalidatePath(`/team/${m.slug}`)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err
  const { id } = await req.json()
  await sql`DELETE FROM website_team_members WHERE id=${id}`
  revalidatePath('/team')
  return NextResponse.json({ ok: true })
}
