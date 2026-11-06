import { getActiveJobs } from '@/lib/db'

export interface OpenRole { key: string; title: string; meta: string; apply_url: string }

// Roles are managed in Admin -> Job Openings. List a role here only as a fallback; one added in Admin with the same
// apply link replaces it.
const BUILT_IN: OpenRole[] = []

// Everything open right now: active jobs from the admin first, then any built-in role not already there.
export async function getOpenRoles(): Promise<OpenRole[]> {
  let db: OpenRole[] = []
  try {
    db = (await getActiveJobs()).map((j) => ({ key: j.id, title: j.title, meta: [j.department, j.location].filter(Boolean).join(' · '), apply_url: j.apply_url }))
  } catch { /* the table may be missing; fall back to the built-in list */ }
  return [...db, ...BUILT_IN.filter((b) => !db.some((d) => d.apply_url === b.apply_url))]
}
