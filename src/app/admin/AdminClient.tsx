'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ── Types ──────────────────────────────────────────────────────────────────
type Section = 'overview'|'briefings'|'team'|'alumni'|'jobs'|'upload'|'submissions'|'settings'

interface Briefing { id:string; slug:string; title:string; author_name:string; scope:string; date:string; read_time:string; is_featured:boolean; cover_image:string|null }
interface TeamMember { id:string; name:string; role:string; department:string; bio:string|null; linkedin_url:string|null; image_url:string|null; sort_order:number; is_active:boolean }
interface Alumni { id:string; name:string; role:string; department:string; linkedin_url:string|null; image_url:string|null; now_at_company:string|null; now_at_role:string|null; now_at_url:string|null; is_active:boolean }
interface Job { id:string; title:string; department:string; type:string; location:string; complexity:string; apply_url:string; is_active:boolean }

// ── Design tokens (inline, no Tailwind needed in admin) ────────────────────
const S = {
  bg: '#09090F', bg2: '#0E0E1A', bg3: '#111119', surface: '#1B1B2A',
  border: 'rgba(255,255,255,.07)', bord2: 'rgba(255,255,255,.13)',
  text: '#EBE8F6', text2: '#8985A6', text3: '#4C4868',
  pink: '#E91E8C', blue: '#2563EB', orange: '#F97316', green: '#10B981', purple: '#7C3AED',
}

// ── Shared sub-components ──────────────────────────────────────────────────

function Btn({ label, color=S.pink, onClick, small=false, outline=false }: { label:string; color?:string; onClick?:()=>void; small?:boolean; outline?:boolean }) {
  return (
    <button onClick={onClick} style={{
      background: outline ? 'transparent' : color, color: outline ? color : '#fff',
      border: outline ? `1px solid ${color}` : 'none', borderRadius: 8,
      padding: small ? '6px 12px' : '9px 18px', fontSize: small ? 12 : 13,
      fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'opacity .15s',
    }}
    onMouseEnter={e=>(e.currentTarget.style.opacity='.8')}
    onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
      {label}
    </button>
  )
}

function Badge({ label, color }: { label:string; color:string }) {
  return <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, letterSpacing:'.08em', textTransform:'uppercase', padding:'3px 8px', borderRadius:4, background:`${color}18`, color }}>{label}</span>
}

function Input({ label, value, onChange, type='text', placeholder='', required=false, rows=0 }: { label:string; value:string; onChange:(v:string)=>void; type?:string; placeholder?:string; required?:boolean; rows?:number }) {
  const base = { width:'100%', background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'9px 12px', fontSize:13, color:S.text, outline:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box' as const }
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      <label style={{ fontSize:12, fontWeight:600, color:S.text }}>{label}{required && ' *'}</label>
      {rows > 1
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...base, resize:'vertical' }} />
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} required={required} style={base} />}
    </div>
  )
}

function Toggle({ label, checked, onChange }: { label:string; checked:boolean; onChange:(v:boolean)=>void }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }} onClick={()=>onChange(!checked)}>
      <div style={{ width:36, height:20, borderRadius:10, background: checked ? S.green : S.bg3, border:`1px solid ${S.border}`, position:'relative', transition:'background .2s' }}>
        <div style={{ width:14, height:14, borderRadius:'50%', background:'#fff', position:'absolute', top:2, left: checked ? 18 : 2, transition:'left .2s' }} />
      </div>
      <span style={{ fontSize:13, color:S.text2 }}>{label}</span>
    </div>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────
function Modal({ title, onClose, onSave, saving, children }: { title:string; onClose:()=>void; onSave:()=>void; saving:boolean; children:React.ReactNode }) {
  return (
    <div onClick={e=>{ if(e.target===e.currentTarget) onClose() }} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.7)', backdropFilter:'blur(6px)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:S.surface, border:`1px solid ${S.bord2}`, borderRadius:18, padding:32, width:'100%', maxWidth:560, position:'relative', maxHeight:'85vh', overflowY:'auto' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${S.pink},${S.blue})`, borderRadius:'18px 18px 0 0' }} />
        <button onClick={onClose} style={{ position:'absolute', top:14, right:14, width:28, height:28, borderRadius:7, border:`1px solid ${S.border}`, background:'rgba(255,255,255,.05)', color:S.text2, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:18, color:S.text, marginBottom:20 }}>{title}</div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>{children}</div>
        <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:20 }}>
          <Btn label="Cancel" color={S.text3} outline onClick={onClose} />
          <Btn label={saving ? 'Saving...' : 'Save'} onClick={onSave} />
        </div>
      </div>
    </div>
  )
}

// ── Data Table ─────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableRow = { __raw?: any } & { [key:string]: any }
function Table({ cols, rows, onEdit, onDelete }: { cols:string[]; rows:TableRow[]; onEdit:(r:any)=>void; onDelete:(r:any)=>void }) {
  const gridCols = `repeat(${cols.length},1fr) 100px`
  return (
    <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:12, overflow:'hidden' }}>
      <div style={{ display:'grid', gridTemplateColumns:gridCols, padding:'10px 16px', borderBottom:`1px solid ${S.border}`, background:'rgba(255,255,255,.02)' }}>
        {cols.map(c => <div key={c} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3 }}>{c}</div>)}
        <div />
      </div>
      {rows.length === 0 && (
        <div style={{ padding:'32px 16px', textAlign:'center', color:S.text3, fontSize:13 }}>No records yet. Add one above.</div>
      )}
      {rows.map((row, i) => (
        <div key={i} style={{ display:'grid', gridTemplateColumns:gridCols, padding:'12px 16px', borderBottom:`1px solid ${S.border}`, alignItems:'center' }}
          onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,.02)')}
          onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
          {cols.map(c => (
            <div key={c} style={{ fontSize:13, color:S.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:12 }}>
              {row[c.toLowerCase().replace(/ /g,'_')] ?? row[c] ?? ''}
            </div>
          ))}
          <div style={{ display:'flex', gap:6 }}>
            <Btn label="Edit" small color={S.blue} onClick={()=>onEdit(row.__raw)} />
            <Btn label="Del" small color='#EF4444' outline onClick={()=>{ if(confirm('Delete this record?')) onDelete(row.__raw) }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Section header ─────────────────────────────────────────────────────────
function SectionHeader({ title, desc, onAdd }: { title:string; desc:string; onAdd:()=>void }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
      <div>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text, letterSpacing:'-.02em' }}>{title}</div>
        <div style={{ fontSize:13, color:S.text2, marginTop:3 }}>{desc}</div>
      </div>
      <Btn label={`+ Add ${title.replace(/s$/,'')}`} onClick={onAdd} />
    </div>
  )
}

// ── BRIEFINGS SECTION ──────────────────────────────────────────────────────
function BriefingsSection({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows] = useState<Briefing[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Briefing|null>(null)
  const [form, setForm] = useState({ slug:'',title:'',summary:'',scope:'',date:'',read_time:'',author_name:'',cover_image:'',is_featured:false })

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/briefings'); const d = await r.json(); setRows(d.rows||[])
  }, [])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm({ slug:'',title:'',summary:'',scope:'',date:'',read_time:'',author_name:'',cover_image:'',is_featured:false }); setModal(true) }
  function openEdit(b: Briefing) { setEditing(b); setForm({ slug:b.slug,title:b.title,summary:'',scope:b.scope,date:b.date,read_time:b.read_time,author_name:b.author_name,cover_image:b.cover_image||'',is_featured:b.is_featured }); setModal(true) }

  async function handleSave() {
    setSaving(true)
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { ...form, id:editing.id } : form
    await fetch('/api/admin/briefings', { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
    setSaving(false); setModal(false); load(); showToast(`✓ Briefing ${editing?'updated':'created'}`)
  }

  async function handleDelete(b: Briefing) {
    await fetch('/api/admin/briefings', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id:b.id}) })
    load(); showToast('✓ Briefing deleted')
  }

  const F = (k:keyof typeof form) => (v:string|boolean) => setForm(f=>({...f,[k]:v}))
  const tableRows = rows.map(b=>({ Title:b.title.slice(0,52)+(b.title.length>52?'...':''), Author:b.author_name, Date:b.date, Status:<Badge label={b.is_featured?'Featured':'Published'} color={b.is_featured?S.orange:S.text3} />, __raw:b }))

  return (
    <>
      <SectionHeader title="Briefings" desc={`${rows.length} briefings · website_briefings`} onAdd={openAdd} />
      <Table cols={['Title','Author','Date','Status']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
      {modal && (
        <Modal title={editing?'Edit briefing':'New briefing'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Title" value={form.title} onChange={F('title')} required placeholder="Article title" />
            <Input label="Slug" value={form.slug} onChange={F('slug')} required placeholder="url-friendly-slug" />
          </div>
          <Input label="Summary" value={form.summary} onChange={F('summary')} rows={2} placeholder="Short summary for listing page" />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
            <Input label="Scope" value={form.scope} onChange={F('scope')} placeholder="e.g. Intelligence" />
            <Input label="Date" value={form.date} onChange={F('date')} placeholder="e.g. Jun 27, 2026" />
            <Input label="Read time" value={form.read_time} onChange={F('read_time')} placeholder="e.g. 5 min" />
          </div>
          <Input label="Author name" value={form.author_name} onChange={F('author_name')} placeholder="e.g. Ankit Suman" />
          <Input label="Cover image URL (R2)" value={form.cover_image} onChange={F('cover_image')} placeholder="https://assets.labelnest.in/briefings/..." />
          <Toggle label="Featured briefing" checked={form.is_featured} onChange={v=>setForm(f=>({...f,is_featured:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── TEAM SECTION ───────────────────────────────────────────────────────────
function TeamSection({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows] = useState<TeamMember[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<TeamMember|null>(null)
  const blank: { name:string;role:string;department:string;bio:string;linkedin_url:string;image_url:string;sort_order:string;is_active:boolean } = { name:'',role:'',department:'',bio:'',linkedin_url:'',image_url:'',sort_order:'99',is_active:true }
  const [form, setForm] = useState(blank)

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/team'); const d = await r.json(); setRows(d.rows||[])
  }, [])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(m: TeamMember) {
    setEditing(m)
    setForm({ name:m.name,role:m.role,department:m.department,bio:m.bio||'',linkedin_url:m.linkedin_url||'',image_url:m.image_url||'',sort_order:String(m.sort_order),is_active:m.is_active })
    setModal(true)
  }

  async function handleSave() {
    setSaving(true)
    const payload = { ...form, sort_order:Number(form.sort_order) }
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { ...payload, id:editing.id } : payload
    await fetch('/api/admin/team', { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
    setSaving(false); setModal(false); load(); showToast(`✓ Team member ${editing?'updated':'added'}`)
  }

  async function handleDelete(m: TeamMember) {
    await fetch('/api/admin/team', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id:m.id}) })
    load(); showToast('✓ Team member removed')
  }

  const F = (k:keyof typeof form) => (v:string) => setForm(f=>({...f,[k]:v}))
  const tableRows = rows.map(m=>({ Name:m.name, Role:m.role, Department:m.department, Status:<Badge label={m.is_active?'Active':'Inactive'} color={m.is_active?S.green:S.text3} />, __raw:m }))

  return (
    <>
      <SectionHeader title="Team Members" desc={`${rows.length} members · website_team_members`} onAdd={openAdd} />
      <Table cols={['Name','Role','Department','Status']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
      {modal && (
        <Modal title={editing?'Edit team member':'Add team member'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Name" value={form.name} onChange={F('name')} required />
            <Input label="Role" value={form.role} onChange={F('role')} required placeholder="e.g. Data Analyst" />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Department" value={form.department} onChange={F('department')} placeholder="e.g. Data and AI Systems" />
            <Input label="Sort order" value={form.sort_order} onChange={F('sort_order')} type="number" placeholder="99" />
          </div>
          <Input label="Bio" value={form.bio} onChange={F('bio')} rows={3} placeholder="Short biography" />
          <Input label="LinkedIn URL" value={form.linkedin_url} onChange={F('linkedin_url')} placeholder="https://linkedin.com/in/..." />
          <Input label="Photo URL (R2 or Supabase CDN)" value={form.image_url} onChange={F('image_url')} placeholder="https://assets.labelnest.in/team/..." />
          <Toggle label="Active (visible on team page)" checked={form.is_active as boolean} onChange={v=>setForm(f=>({...f,is_active:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── ALUMNI SECTION ─────────────────────────────────────────────────────────
function AlumniSection({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows] = useState<Alumni[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Alumni|null>(null)
  const blank: { name:string;role:string;department:string;linkedin_url:string;image_url:string;now_at_company:string;now_at_role:string;now_at_url:string;is_active:boolean } = { name:'',role:'',department:'',linkedin_url:'',image_url:'',now_at_company:'',now_at_role:'',now_at_url:'',is_active:true }
  const [form, setForm] = useState(blank)

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/alumni'); const d = await r.json(); setRows(d.rows||[])
  }, [])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(a: Alumni) {
    setEditing(a)
    setForm({ name:a.name,role:a.role,department:a.department,linkedin_url:a.linkedin_url||'',image_url:a.image_url||'',now_at_company:a.now_at_company||'',now_at_role:a.now_at_role||'',now_at_url:a.now_at_url||'',is_active:a.is_active })
    setModal(true)
  }

  async function handleSave() {
    setSaving(true)
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { ...form, id:editing.id } : form
    await fetch('/api/admin/alumni', { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
    setSaving(false); setModal(false); load(); showToast(`✓ Alumni ${editing?'updated':'added'}`)
  }

  async function handleDelete(a: Alumni) {
    await fetch('/api/admin/alumni', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id:a.id}) })
    load(); showToast('✓ Alumni removed')
  }

  const F = (k:keyof typeof form) => (v:string) => setForm(f=>({...f,[k]:v}))
  const tableRows = rows.map(a=>({ Name:a.name, Role:a.role, 'Now at': a.now_at_company ? <span style={{color:S.green}}>{a.now_at_company}</span> : <span style={{color:S.text3,fontStyle:'italic'}}>Not set</span>, Status:<Badge label={a.is_active?'Active':'Hidden'} color={a.is_active?S.blue:S.text3} />, __raw:a }))

  return (
    <>
      <SectionHeader title="Alumni" desc={`${rows.length} alumni · website_alumni · All are permanent`} onAdd={openAdd} />
      <Table cols={['Name','Role','Now at','Status']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
      {modal && (
        <Modal title={editing?'Edit alumni':'Add alumni'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Name" value={form.name} onChange={F('name')} required />
            <Input label="Role at LabelNest" value={form.role} onChange={F('role')} required />
          </div>
          <Input label="Department" value={form.department} onChange={F('department')} placeholder="e.g. Data and AI Systems" />
          <Input label="LinkedIn URL" value={form.linkedin_url} onChange={F('linkedin_url')} placeholder="https://linkedin.com/in/..." />
          <Input label="Photo URL (R2)" value={form.image_url} onChange={F('image_url')} placeholder="https://assets.labelnest.in/team/..." />
          <div style={{borderTop:`1px solid ${S.border}`,paddingTop:12,marginTop:4}}>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:9.5,letterSpacing:'.1em',textTransform:'uppercase',color:S.text3,marginBottom:10}}>Now at (current employer)</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <Input label="Company" value={form.now_at_company} onChange={F('now_at_company')} placeholder="Company name" />
              <Input label="Role" value={form.now_at_role} onChange={F('now_at_role')} placeholder="Current role" />
            </div>
            <Input label="Profile URL" value={form.now_at_url} onChange={F('now_at_url')} placeholder="https://..." />
          </div>
          <Toggle label="Visible on team page" checked={form.is_active as boolean} onChange={v=>setForm(f=>({...f,is_active:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── JOBS SECTION ───────────────────────────────────────────────────────────
function JobsSection({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows] = useState<Job[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Job|null>(null)
  const blank: { title:string;department:string;type:string;location:string;complexity:string;apply_url:string;is_active:boolean } = { title:'',department:'',type:'Remote',location:'',complexity:'High',apply_url:'',is_active:true }
  const [form, setForm] = useState(blank)

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/jobs'); const d = await r.json(); setRows(d.rows||[])
  }, [])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(j: Job) {
    setEditing(j)
    setForm({ title:j.title,department:j.department,type:j.type,location:j.location,complexity:j.complexity,apply_url:j.apply_url,is_active:j.is_active })
    setModal(true)
  }

  async function handleSave() {
    setSaving(true)
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { ...form, id:editing.id } : form
    await fetch('/api/admin/jobs', { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
    setSaving(false); setModal(false); load(); showToast(`✓ Job ${editing?'updated':'added'}`)
  }

  async function handleDelete(j: Job) {
    await fetch('/api/admin/jobs', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id:j.id}) })
    load(); showToast('✓ Job removed')
  }

  const F = (k:keyof typeof form) => (v:string) => setForm(f=>({...f,[k]:v}))
  const tableRows = rows.map(j=>({ Title:j.title, Department:j.department, Type:j.type, Status:<Badge label={j.is_active?'Active':'Paused'} color={j.is_active?S.green:S.text3} />, __raw:j }))

  return (
    <>
      <SectionHeader title="Job Openings" desc={`${rows.length} roles · website_job_openings`} onAdd={openAdd} />
      <Table cols={['Title','Department','Type','Status']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
      {modal && (
        <Modal title={editing?'Edit job opening':'Add job opening'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving}>
          <Input label="Role title" value={form.title} onChange={F('title')} required placeholder="e.g. Strategic BD Partner, Data and Intelligence" />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Department" value={form.department} onChange={F('department')} placeholder="e.g. NestSales" />
            <Input label="Type" value={form.type} onChange={F('type')} placeholder="Remote / Bangalore / Hybrid" />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Location" value={form.location} onChange={F('location')} placeholder="e.g. Global" />
            <Input label="Complexity" value={form.complexity} onChange={F('complexity')} placeholder="High / Medium / Low" />
          </div>
          <Input label="Apply URL (NestHR)" value={form.apply_url} onChange={F('apply_url')} placeholder="https://nesthr.labelnest.in/apply/..." />
          <Toggle label="Active (visible on careers page)" checked={form.is_active as boolean} onChange={v=>setForm(f=>({...f,is_active:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── UPLOAD SECTION ─────────────────────────────────────────────────────────
function UploadSection({ showToast }: { showToast:(m:string)=>void }) {
  const [uploading, setUploading] = useState(false)
  const [pct, setPct] = useState(0)
  const [filename, setFilename] = useState('')
  const [folder, setFolder] = useState('team')
  const [lastUrl, setLastUrl] = useState('')

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true); setFilename(file.name); setPct(0); setLastUrl('')
    const res = await fetch('/api/admin/upload', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ filename:file.name, contentType:file.type, folder }),
    })
    if (!res.ok) { setUploading(false); showToast('❌ Upload failed — check R2 credentials in settings'); return }
    const { uploadUrl, publicUrl } = await res.json()
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = ev => setPct(Math.round(ev.loaded/ev.total*100))
    xhr.onload = () => {
      setUploading(false); setPct(100); setLastUrl(publicUrl)
      navigator.clipboard.writeText(publicUrl).catch(()=>{})
      showToast(`✓ Uploaded · URL copied to clipboard`)
    }
    xhr.onerror = () => { setUploading(false); showToast('❌ Upload error') }
    xhr.open('PUT', uploadUrl)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.send(file)
  }

  return (
    <>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text }}>Upload to R2</div>
        <div style={{ fontSize:13, color:S.text2, marginTop:3 }}>Cloudflare R2 · bucket: labelnest-assets · serves from assets.labelnest.in</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 220px', gap:16 }}>
        <label style={{ display:'block', background:S.bg3, border:`2px dashed rgba(255,255,255,.1)`, borderRadius:14, padding:40, textAlign:'center', cursor:'pointer', transition:'border-color .2s' }}
          onMouseEnter={e=>((e.currentTarget as HTMLElement).style.borderColor=S.pink)}
          onMouseLeave={e=>((e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.1)')}>
          <div style={{ fontSize:36, marginBottom:12, opacity:.4 }}>⬆️</div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:16, color:S.text, marginBottom:6 }}>Drop or click to upload</div>
          <div style={{ fontSize:13, color:S.text2, marginBottom:16 }}>JPG, PNG, WebP, SVG, MP4 · Max 50MB</div>
          <input type="file" accept="image/*,video/*" onChange={handleUpload} style={{ display:'none' }} />
          <div style={{ display:'inline-block', background:S.pink, color:'#fff', borderRadius:8, padding:'9px 18px', fontSize:13, fontWeight:600 }}>Choose file</div>
        </label>
        <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:14, padding:18 }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.12em', textTransform:'uppercase', color:S.text3, marginBottom:12 }}>Upload folder</div>
          {['team','founders','briefings','products','videos','misc'].map(f => (
            <div key={f} onClick={()=>setFolder(f)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 10px', background: folder===f ? 'rgba(233,30,140,.08)' : 'rgba(255,255,255,.03)', border:`1px solid ${folder===f ? 'rgba(233,30,140,.3)' : S.border}`, borderRadius:7, cursor:'pointer', marginBottom:5, transition:'all .15s' }}>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:S.text2 }}>📁 {f}/</span>
              {folder===f && <span style={{ fontSize:10, color:S.pink }}>Selected</span>}
            </div>
          ))}
        </div>
      </div>

      {uploading && (
        <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:10, padding:14, marginTop:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
            <span style={{ fontSize:13, color:S.text }}>{filename}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.green }}>{pct}%</span>
          </div>
          <div style={{ background:'#0E0E1A', borderRadius:4, height:4, overflow:'hidden' }}>
            <div style={{ height:'100%', background:S.green, width:`${pct}%`, transition:'width .3s' }} />
          </div>
        </div>
      )}

      {lastUrl && (
        <div style={{ marginTop:14, background:'rgba(16,185,129,.08)', border:'1px solid rgba(16,185,129,.2)', borderRadius:10, padding:14 }}>
          <div style={{ fontSize:12, color:S.green, marginBottom:6, fontFamily:'JetBrains Mono,monospace', letterSpacing:'.06em', textTransform:'uppercase' }}>Uploaded · URL auto-copied</div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:S.text2, wordBreak:'break-all' }}>{lastUrl}</div>
          <button onClick={()=>{ navigator.clipboard.writeText(lastUrl); showToast('✓ URL copied') }}
            style={{ marginTop:10, background:S.green, color:'#fff', border:'none', borderRadius:6, padding:'6px 14px', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
            Copy URL again
          </button>
        </div>
      )}
    </>
  )
}

// ── NAV ────────────────────────────────────────────────────────────────────
const NAV = [
  { id:'overview',   icon:'🏠', label:'Overview',    group:'Content' },
  { id:'briefings',  icon:'📝', label:'Briefings',   group:'Content' },
  { id:'team',       icon:'👤', label:'Team',         group:'Content' },
  { id:'alumni',     icon:'🎓', label:'Alumni',       group:'Content' },
  { id:'jobs',       icon:'💼', label:'Job Openings', group:'Content' },
  { id:'upload',     icon:'⬆️', label:'Upload to R2', group:'Media'   },
  { id:'submissions',icon:'📩', label:'Submissions',  group:'System'  },
  { id:'settings',   icon:'⚙️', label:'Settings',     group:'System'  },
]

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function AdminClient() {
  const [section, setSection] = useState<Section>('overview')
  const [toast, setToast] = useState('')
  const router = useRouter()

  function showToast(msg: string) { setToast(msg); setTimeout(()=>setToast(''), 3000) }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method:'POST' })
    router.push('/admin/login')
  }

  const groups = [...new Set(NAV.map(n=>n.group))]

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:S.bg, color:S.text, fontFamily:'Inter,sans-serif' }}>

      {/* Topbar */}
      <div style={{ height:56, background:S.surface, borderBottom:`1px solid ${S.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:15, letterSpacing:'-.02em' }}>
            Label<em style={{ fontStyle:'normal', color:S.pink }}>Nest</em>
          </span>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', padding:'3px 8px', borderRadius:4, background:'rgba(233,30,140,.12)', color:S.pink }}>Admin</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.08em', textTransform:'uppercase', color:S.green }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:S.green }} />
            Neon connected
          </div>
          <a href="/" target="_blank" style={{ fontSize:12, color:S.text2, textDecoration:'none' }}>View site ↗</a>
          <button onClick={handleLogout} style={{ fontSize:12, color:S.text3, background:'none', border:'none', cursor:'pointer' }}>Sign out</button>
        </div>
      </div>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

        {/* Sidebar */}
        <div style={{ width:200, background:'#111119', borderRight:`1px solid ${S.border}`, flexShrink:0, overflowY:'auto', padding:'12px 0' }}>
          {groups.map(g => (
            <div key={g}>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:S.text3, padding:'10px 18px 5px' }}>{g}</div>
              {NAV.filter(n=>n.group===g).map(n => (
                <div key={n.id} onClick={()=>setSection(n.id as Section)}
                  style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 18px', fontSize:13, cursor:'pointer', color:section===n.id ? S.text : S.text2, background:section===n.id ? 'rgba(255,255,255,.05)' : 'transparent', borderLeft:`2px solid ${section===n.id ? S.pink : 'transparent'}`, transition:'all .15s' }}
                  onMouseEnter={e=>{ if(section!==n.id)(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.02)' }}
                  onMouseLeave={e=>{ if(section!==n.id)(e.currentTarget as HTMLElement).style.background='transparent' }}>
                  <span style={{ width:18, fontSize:15 }}>{n.icon}</span>
                  {n.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ flex:1, overflowY:'auto', padding:28 }}>

          {section === 'overview' && (
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text, marginBottom:4 }}>Overview</div>
              <div style={{ fontSize:13, color:S.text2, marginBottom:20 }}>LabelNest website · Neon DB connected</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
                {[['Briefings','14',S.pink],['Team members','13',S.blue],['Newsletter','104',S.green],['Alumni','39',S.orange]].map(([l,n,c])=>(
                  <div key={l as string} style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:12, padding:18 }}>
                    <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:28, color:c as string, letterSpacing:'-.04em', lineHeight:1, marginBottom:4 }}>{n}</div>
                    <div style={{ fontSize:12, color:S.text2 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:12, padding:20 }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.12em', textTransform:'uppercase', color:S.text3, marginBottom:14 }}>Quick actions</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {[['📝','Manage briefings','briefings'],['👤','Manage team','team'],['🎓','Update alumni','alumni'],['💼','Job openings','jobs'],['⬆️','Upload to R2','upload']].map(([icon,label,sec])=>(
                    <button key={label as string} onClick={()=>setSection(sec as Section)}
                      style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 16px', background:'rgba(255,255,255,.04)', border:`1px solid ${S.border}`, borderRadius:8, fontSize:13, color:S.text2, cursor:'pointer', fontFamily:'Inter,sans-serif' }}
                      onMouseEnter={e=>(e.currentTarget.style.color=S.text)}
                      onMouseLeave={e=>(e.currentTarget.style.color=S.text2)}>
                      {icon} {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === 'briefings' && <BriefingsSection showToast={showToast} />}
          {section === 'team' && <TeamSection showToast={showToast} />}
          {section === 'alumni' && <AlumniSection showToast={showToast} />}
          {section === 'jobs' && <JobsSection showToast={showToast} />}
          {section === 'upload' && <UploadSection showToast={showToast} />}

          {(section === 'submissions' || section === 'settings') && (
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text, marginBottom:4 }}>
                {section === 'submissions' ? 'Submissions' : 'Settings'}
              </div>
              <div style={{ fontSize:13, color:S.text2, marginBottom:20 }}>
                {section === 'submissions' ? 'Contact and career form submissions · website_submissions' : 'Environment config · set via Vercel dashboard'}
              </div>
              <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:12, padding:40, textAlign:'center', color:S.text3, fontSize:13 }}>
                {section === 'submissions'
                  ? 'Submissions table — query and display wiring coming next.'
                  : (
                    <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:480, margin:'0 auto' }}>
                      {[['NEON_DATABASE_URL','Neon connection string',S.green],['JWT_SECRET','32-char secret for admin auth',S.green],['R2_ACCOUNT_ID','Cloudflare account ID',S.orange],['R2_ACCESS_KEY_ID','R2 API key',S.orange],['R2_SECRET_ACCESS_KEY','R2 secret key',S.orange],['R2_PUBLIC_URL','https://assets.labelnest.in',S.orange]].map(([k,v,c])=>(
                        <div key={k as string} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'rgba(255,255,255,.03)', border:`1px solid ${S.border}`, borderRadius:8 }}>
                          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11.5, color:S.text2 }}>{k}</span>
                          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, letterSpacing:'.06em', textTransform:'uppercase', padding:'3px 7px', borderRadius:4, background:`${c as string}18`, color:c as string }}>
                            {k.includes('SECRET')||k.includes('KEY') ? '●●●●●●●●' : v}
                          </span>
                        </div>
                      ))}
                      <div style={{ marginTop:8, fontSize:12, color:S.text3 }}>Set all vars in Vercel dashboard → Settings → Environment Variables</div>
                    </div>
                  )
                }
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', bottom:24, right:24, background:S.surface, border:`1px solid ${S.bord2}`, borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', gap:10, fontSize:13.5, color:S.text, zIndex:1000, boxShadow:'0 8px 32px rgba(0,0,0,.5)', animation:'slideUp .3s ease' }}>
          {toast}
        </div>
      )}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}
