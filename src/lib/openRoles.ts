import { getActiveJobs } from '@/lib/db'

export interface OpenRole { key: string; title: string; meta: string; apply_url: string }

// Built-in roles that are applied for through NestHR. A job added in Admin -> Job Openings with the same apply link replaces its
// line here, so this list can be emptied once the role is in the admin.
const BUILT_IN: OpenRole[] = [
  { key: 'vp-growth', title: 'VP – Growth, NestLens', meta: 'NestLens · Growth · Global · Part-time or full-time', apply_url: 'https://nesthr.labelnest.in/apply/job-hpi7eyp89b' },
]

// Everything open right now: active jobs from the admin first, then any built-in role not already there.
export async function getOpenRoles(): Promise<OpenRole[]> {
  let db: OpenRole[] = []
  try {
    db = (await getActiveJobs()).map((j) => ({ key: j.id, title: j.title, meta: [j.department, j.location].filter(Boolean).join(' · '), apply_url: j.apply_url }))
  } catch { /* the table may be missing; fall back to the built-in list */ }
  return [...db, ...BUILT_IN.filter((b) => !db.some((d) => d.apply_url === b.apply_url))]
}
