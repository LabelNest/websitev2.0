'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ContentField, ContentValue, Item } from '@/lib/siteContent'

// "Page content": change the words on the redesigned pages. Everything is generated from the field list in
// src/lib/siteContent.ts, so a new field appears here with no extra work. Prices are not edited here.

type Values = Record<string, ContentValue>
interface Payload { fields: ContentField[]; values: Values; saved: Record<string, { updated_at: string; updated_by: string | null }>; storage: boolean }

const PAGE_PATH: Record<string, string> = {
  Home: '/', 'How it connects': '/ecosystem', Products: '/nestlens', Pricing: '/nestlens/pricing', 'For incubators': '/who-we-serve/incubator',
}

const C = {
  ink: 'var(--text)', text2: 'var(--text2)', text3: 'var(--text3)', line: 'var(--border)', line2: 'var(--bord2)',
  paper: 'var(--bg)', panel: 'var(--bg2)', white: 'var(--surface)', brass: 'var(--pink)', green: 'var(--green)',
}

const inputBase: React.CSSProperties = { width: '100%', background: C.white, border: `1px solid ${C.line2}`, borderRadius: 4, padding: '10px 12px', fontSize: 14, color: C.ink, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.5 }
const sameValue = (a: ContentValue | undefined, b: ContentValue | undefined) => JSON.stringify(a) === JSON.stringify(b)
const isImageField = (f: ContentField) => f.kind !== 'items' && /photo|portrait|cover image|image \(/i.test(f.label)

function Btn({ children, onClick, kind = 'solid', disabled, small }: { children: React.ReactNode; onClick?: () => void; kind?: 'solid' | 'line' | 'text'; disabled?: boolean; small?: boolean }) {
  const base: React.CSSProperties = { cursor: disabled ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: small ? 12.5 : 14, padding: small ? '6px 12px' : '10px 20px', borderRadius: 3, opacity: disabled ? 0.5 : 1, whiteSpace: 'nowrap' }
  const style: React.CSSProperties = kind === 'solid' ? { ...base, background: C.ink, color: 'var(--bg)', border: `1px solid ${C.ink}` }
    : kind === 'line' ? { ...base, background: 'transparent', color: C.ink, border: `1px solid ${C.ink}` }
    : { ...base, background: 'none', color: C.brass, border: 'none', padding: small ? '4px 6px' : '6px 8px' }
  return <button onClick={onClick} disabled={disabled} style={style}>{children}</button>
}

function ImageUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  async function pick(file: File) {
    setBusy(true); setErr('')
    try {
      const r = await fetch('/api/admin/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: file.name, contentType: file.type, folder: 'site' }) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Upload failed')
      const put = await fetch(d.uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file })
      if (!put.ok) throw new Error('Upload failed')
      onChange(d.publicUrl)
    } catch (e) { setErr(e instanceof Error ? e.message : 'Upload failed') } finally { setBusy(false) }
  }
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
      {value && /* eslint-disable-next-line @next/next/no-img-element */ <img src={value} alt="" style={{ width: 96, height: 64, objectFit: 'cover', border: `1px solid ${C.line2}` }} />}
      <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) void pick(f) }} />
      <Btn kind="line" small onClick={() => ref.current?.click()} disabled={busy}>{busy ? 'Uploading…' : value ? 'Replace photo' : 'Upload a photo'}</Btn>
      {value && <Btn kind="text" small onClick={() => onChange('')}>Remove</Btn>}
      {err && <span style={{ fontSize: 12.5, color: '#9B2C2C' }}>{err}</span>}
    </div>
  )
}

function ItemsEditor({ field, value, onChange }: { field: Extract<ContentField, { kind: 'items' }>; value: Item[]; onChange: (v: Item[]) => void }) {
  const upd = (i: number, k: string, v: string) => onChange(value.map((row, idx) => (idx === i ? { ...row, [k]: v } : row)))
  const move = (i: number, d: -1 | 1) => { const j = i + d; if (j < 0 || j >= value.length) return; const next = [...value]; [next[i], next[j]] = [next[j], next[i]]; onChange(next) }
  const add = () => onChange([...value, Object.fromEntries(field.itemFields.map((f) => [f.key, '']))])
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {value.length === 0 && <p style={{ margin: 0, fontSize: 13.5, color: C.text3 }}>Nothing here yet.</p>}
      {value.map((row, i) => (
        <div key={i} style={{ border: `1px solid ${C.line2}`, background: C.white, padding: 14, display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: C.text3, fontWeight: 600 }}>{i + 1}</span>
            <span style={{ display: 'flex', gap: 2 }}>
              <Btn kind="text" small onClick={() => move(i, -1)} disabled={i === 0}>Up</Btn>
              <Btn kind="text" small onClick={() => move(i, 1)} disabled={i === value.length - 1}>Down</Btn>
              <Btn kind="text" small onClick={() => onChange(value.filter((_, idx) => idx !== i))}>Remove</Btn>
            </span>
          </div>
          {field.itemFields.map((f) => (
            <label key={f.key} style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.text2 }}>{f.label}</span>
              {f.long
                ? <textarea value={row[f.key] ?? ''} onChange={(e) => upd(i, f.key, e.target.value)} rows={Math.min(6, Math.max(2, Math.ceil((row[f.key] ?? '').length / 90)))} style={{ ...inputBase, resize: 'vertical' }} />
                : <input value={row[f.key] ?? ''} onChange={(e) => upd(i, f.key, e.target.value)} style={inputBase} />}
            </label>
          ))}
        </div>
      ))}
      <div><Btn kind="line" small onClick={add}>{field.addLabel ?? 'Add'}</Btn></div>
    </div>
  )
}

function FieldRow({ f, value, onChange, edited, onReset, savedBy }: {
  f: ContentField; value: ContentValue; onChange: (v: ContentValue) => void; edited: boolean; onReset: () => void; savedBy?: string
}) {
  return (
    <div style={{ padding: '20px 0', borderTop: `1px solid ${C.line}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{f.label}{edited && <span style={{ marginLeft: 10, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: C.brass }}>Changed</span>}</span>
        <span style={{ fontSize: 12, color: C.text3 }}>{savedBy ? `Saved by ${savedBy}` : ''}{edited && <Btn kind="text" small onClick={onReset}>Back to original</Btn>}</span>
      </div>
      {f.kind === 'items'
        ? <ItemsEditor field={f} value={Array.isArray(value) ? value : []} onChange={onChange} />
        : isImageField(f)
          ? <ImageUpload value={typeof value === 'string' ? value : ''} onChange={onChange} />
          : f.kind === 'longtext'
            ? <textarea value={typeof value === 'string' ? value : ''} onChange={(e) => onChange(e.target.value)} rows={Math.min(8, Math.max(3, Math.ceil((typeof value === 'string' ? value.length : 0) / 95)))} style={{ ...inputBase, resize: 'vertical' }} />
            : <input value={typeof value === 'string' ? value : ''} onChange={(e) => onChange(e.target.value)} style={inputBase} />}
      {f.hint && <p style={{ margin: '8px 0 0', fontSize: 12.5, color: C.text3 }}>{f.hint}</p>}
    </div>
  )
}

export default function ContentEditor({ showToast }: { showToast: (m: string) => void }) {
  const [data, setData] = useState<Payload | null>(null)
  const [draft, setDraft] = useState<Values>({})
  const [page, setPage] = useState('')
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState(false)
  const [loadErr, setLoadErr] = useState('')

  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/admin/content')
      if (!r.ok) throw new Error()
      const d: Payload = await r.json()
      setData(d); setDraft({})
      setPage((p) => p || d.fields[0]?.page || '')
    } catch { setLoadErr('Could not load the page content. Reload and try again.') }
  }, [])
  useEffect(() => { void load() }, [load])

  const pages = useMemo(() => Array.from(new Set((data?.fields ?? []).map((f) => f.page))), [data])
  const defaults = useMemo(() => Object.fromEntries((data?.fields ?? []).map((f) => [f.key, f.default])) as Values, [data])
  const current = (k: string): ContentValue => (k in draft ? draft[k] : data?.values[k] ?? '')
  const changedKeys = Object.keys(draft).filter((k) => !sameValue(draft[k], data?.values[k]))
  const pageFields = (data?.fields ?? []).filter((f) => f.page === page)
  const groups = Array.from(new Set(pageFields.map((f) => f.group)))

  function set(k: string, v: ContentValue) {
    setDraft((d) => {
      const next = { ...d, [k]: v }
      if (sameValue(v, data?.values[k])) delete next[k]
      return next
    })
  }

  async function save() {
    if (!changedKeys.length) return
    setSaving(true)
    try {
      const changes = Object.fromEntries(changedKeys.map((k) => [k, draft[k]]))
      const r = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ changes }) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Could not save')
      showToast(`Saved ${d.saved} change${d.saved === 1 ? '' : 's'}. The site is updated.`)
      await load()
    } catch (e) { showToast(e instanceof Error ? e.message : 'Could not save') } finally { setSaving(false) }
  }

  async function reset(k: string) {
    setSaving(true)
    try {
      const r = await fetch('/api/admin/content', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: k }) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Could not reset')
      showToast('Back to the original wording.')
      await load()
    } catch (e) { showToast(e instanceof Error ? e.message : 'Could not reset') } finally { setSaving(false) }
  }

  if (loadErr) return <p style={{ color: '#9B2C2C' }}>{loadErr}</p>
  if (!data) return <p style={{ color: C.text3 }}>Loading…</p>

  const unsavedOnPage = pageFields.filter((f) => changedKeys.includes(f.key)).length

  return (
    <div style={{ maxWidth: 880, paddingBottom: 96 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-serif),Georgia,serif', fontSize: 28, color: C.ink, letterSpacing: '-.01em' }}>Page content</div>
        <p style={{ fontSize: 14, color: C.text2, margin: '6px 0 0', maxWidth: '44em' }}>Change the words on the main pages. Pick a page, open a section, edit, then press Save. The live site updates straight away. Prices and the headline numbers are not edited here: they come from NestLens, so change them there.</p>
      </div>

      {!data.storage && (
        <div style={{ border: `1px solid ${C.brass}`, background: C.white, padding: '14px 18px', marginBottom: 20, fontSize: 14, color: C.ink }}>
          <b>Saving is not switched on yet.</b> Run <code style={{ background: C.panel, padding: '2px 6px' }}>npm run migrate</code> once on the website, then reload this page. Until then the site shows its original wording.
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        {pages.map((p) => {
          const n = (data.fields.filter((f) => f.page === p && changedKeys.includes(f.key))).length
          return (
            <button key={p} onClick={() => setPage(p)} style={{ cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, padding: '9px 16px', borderRadius: 3, border: `1px solid ${page === p ? C.ink : C.line2}`, background: page === p ? C.ink : C.white, color: page === p ? 'var(--bg)' : C.ink }}>
              {p}{n > 0 && <span style={{ marginLeft: 8, fontSize: 11 }}>● {n}</span>}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontSize: 13, color: C.text3 }}>{pageFields.length} editable items on this page</span>
        {PAGE_PATH[page] && <a href={PAGE_PATH[page]} target="_blank" rel="noreferrer" style={{ fontSize: 13.5, color: C.brass, fontWeight: 600 }}>Open this page ↗</a>}
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {groups.map((g) => {
          const fs = pageFields.filter((f) => f.group === g)
          const isOpen = open[`${page}/${g}`] ?? false
          const changed = fs.filter((f) => changedKeys.includes(f.key)).length
          const savedCount = fs.filter((f) => data.saved[f.key]).length
          return (
            <div key={g} style={{ border: `1px solid ${C.line2}`, background: C.white }}>
              <button onClick={() => setOpen((o) => ({ ...o, [`${page}/${g}`]: !isOpen }))} aria-expanded={isOpen} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: 0, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' }}>
                <span style={{ fontFamily: 'var(--font-serif),Georgia,serif', fontSize: 20, color: C.ink }}>{g}</span>
                <span style={{ fontSize: 12.5, color: C.text3, display: 'flex', gap: 14, alignItems: 'center' }}>
                  {changed > 0 && <span style={{ color: C.brass, fontWeight: 600 }}>{changed} unsaved</span>}
                  {savedCount > 0 && <span>{savedCount} changed from original</span>}
                  <span>{fs.length} item{fs.length === 1 ? '' : 's'}</span>
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: '0 18px 8px' }}>
                  {fs.map((f) => (
                    <FieldRow key={f.key} f={f} value={current(f.key)} onChange={(v) => set(f.key, v)}
                      edited={!sameValue(current(f.key), defaults[f.key])}
                      onReset={() => (data.saved[f.key] ? void reset(f.key) : set(f.key, defaults[f.key]))}
                      savedBy={data.saved[f.key]?.updated_by ?? undefined} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ position: 'fixed', left: 192, right: 0, bottom: 0, background: C.white, borderTop: `1px solid ${C.line2}`, padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, zIndex: 20 }}>
        <span style={{ fontSize: 14, color: changedKeys.length ? C.ink : C.text3 }}>
          {changedKeys.length ? `${changedKeys.length} unsaved change${changedKeys.length === 1 ? '' : 's'}${unsavedOnPage !== changedKeys.length ? ` (${unsavedOnPage} on this page)` : ''}` : 'No unsaved changes'}
        </span>
        <span style={{ display: 'flex', gap: 10 }}>
          <Btn kind="line" onClick={() => setDraft({})} disabled={!changedKeys.length || saving}>Discard</Btn>
          <Btn onClick={save} disabled={!changedKeys.length || saving}>{saving ? 'Saving…' : 'Save changes'}</Btn>
        </span>
      </div>
    </div>
  )
}
