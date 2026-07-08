'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ── Types ──────────────────────────────────────────────────────────────────
type Section = 'overview'|'briefings'|'team'|'legal'|'jobs'|'departments'|'upload'|'newsletter'|'submissions'|'seo'|'settings'

interface Briefing { id:string; slug:string; title:string; author_name:string; scope:string; date:string; read_time:string; is_featured:boolean; cover_image:string|null }
interface TeamMember { id:string; name:string; role:string; department:string; bio:string|null; linkedin_url:string|null; image_url:string|null; sort_order:number; is_active:boolean; slug:string|null; email:string|null; expertise:string[]|null; quote:string|null }
interface Alumni { id:string; name:string; role:string; department:string; email:string|null; linkedin_url:string|null; image_url:string|null; now_at_type:string|null; now_at_company:string|null; now_at_role:string|null; now_at_url:string|null; update_token:string|null; is_active:boolean }
interface Fellow { id:string; name:string; role:string; cohort:string; department:string|null; linkedin_url:string|null; image_url:string|null; is_active:boolean; status:'active'|'completed'; sort_order:number; slug:string|null; bio:string|null; email:string|null; expertise:string[]|null; quote:string|null }
interface Intern { id:string; name:string; role:string; cohort:string; linkedin_url:string|null; image_url:string|null; is_active:boolean; sort_order:number; slug:string|null }
interface Job { id:string; title:string; department:string; type:string; location:string; complexity:string; apply_url:string; is_active:boolean }
interface LegalDoc { id:string; slug:string; title:string; intro:string; body_markdown:string; version:string; effective_date:string; last_updated:string }
interface Subscriber { id:string; email:string; name:string|null; source:string; status:string; created_at:string }
interface Campaign { id:string; subject:string; template_name:string|null; recipient_count:number; recipient_filter:string; status:string; sent_at:string|null; created_at:string; delivered_count:number|string; opened_count:number|string; clicked_count:number|string; failed_count:number|string }
interface CampaignRecipient { email:string; status:string; open_count:number; click_count:number; first_opened_at:string|null; last_opened_at:string|null; first_clicked_at:string|null; last_clicked_at:string|null }
interface Submission { id:string; name:string; email:string; phone:string|null; subject:string|null; message:string|null; category:string|null; metadata:Record<string,string>|null; is_read:boolean; created_at:string }
interface SeoRow { id:string; page_path:string; title:string|null; description:string|null; og_image:string|null; keywords:string|null; updated_at:string|null }

// ── Design tokens ──────────────────────────────────────────────────────────
const S = {
  bg: '#09090F', bg2: '#0E0E1A', bg3: '#111119', surface: '#1B1B2A',
  border: 'rgba(255,255,255,.07)', bord2: 'rgba(255,255,255,.13)',
  text: '#EBE8F6', text2: '#8985A6', text3: '#4C4868',
  pink: '#E91E8C', blue: '#2563EB', orange: '#F97316', green: '#10B981', purple: '#7C3AED',
}

// ── Shared sub-components ──────────────────────────────────────────────────

function Btn({ label, color=S.pink, onClick, small=false, outline=false }: { label:string; color?:string; onClick?:()=>void; small?:boolean; outline?:boolean }) {
  return (
    <button onClick={onClick} style={{ background:outline?'transparent':color, color:outline?color:'#fff', border:outline?`1px solid ${color}`:'none', borderRadius:8, padding:small?'5px 11px':'9px 18px', fontSize:small?11.5:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'opacity .15s', whiteSpace:'nowrap' }}
      onMouseEnter={e=>(e.currentTarget.style.opacity='.8')}
      onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
      {label}
    </button>
  )
}

function Badge({ label, color }: { label:string; color:string }) {
  return <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, letterSpacing:'.08em', textTransform:'uppercase', padding:'3px 8px', borderRadius:4, background:`${color}18`, color }}>{label}</span>
}

function Input({ label, value, onChange, type='text', placeholder='', required=false, rows=0, hint='' }: { label:string; value:string; onChange:(v:string)=>void; type?:string; placeholder?:string; required?:boolean; rows?:number; hint?:string }) {
  const base = { width:'100%', background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'9px 12px', fontSize:13, color:S.text, outline:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box' as const }
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      <label style={{ fontSize:11.5, fontWeight:600, color:S.text2 }}>{label}{required && ' *'}</label>
      {rows > 1
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...base, resize:'vertical', lineHeight:1.55 }} />
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} required={required} style={base} />}
      {hint && <div style={{ fontSize:11, color:S.text3 }}>{hint}</div>}
    </div>
  )
}

function SelectField({ label, value, onChange, options }: { label:string; value:string; onChange:(v:string)=>void; options:string[] }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      <label style={{ fontSize:11.5, fontWeight:600, color:S.text2 }}>{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{ background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'9px 12px', fontSize:13, color:S.text, outline:'none', fontFamily:'Inter,sans-serif', width:'100%' }}>
        {options.map(o=><option key={o} value={o} style={{ background:S.bg3 }}>{o}</option>)}
      </select>
    </div>
  )
}

function Toggle({ label, checked, onChange }: { label:string; checked:boolean; onChange:(v:boolean)=>void }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }} onClick={()=>onChange(!checked)}>
      <div style={{ width:36, height:20, borderRadius:10, background:checked?S.green:S.bg3, border:`1px solid ${S.border}`, position:'relative', transition:'background .2s' }}>
        <div style={{ width:14, height:14, borderRadius:'50%', background:'#fff', position:'absolute', top:2, left:checked?18:2, transition:'left .2s' }} />
      </div>
      <span style={{ fontSize:13, color:S.text2 }}>{label}</span>
    </div>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────
function Modal({ title, onClose, onSave, saving, children, wide=false }: { title:string; onClose:()=>void; onSave:()=>void; saving:boolean; children:React.ReactNode; wide?:boolean }) {
  return (
    <div onClick={e=>{ if(e.target===e.currentTarget) onClose() }} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.72)', backdropFilter:'blur(6px)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ background:S.surface, border:`1px solid ${S.bord2}`, borderRadius:18, padding:32, width:'100%', maxWidth:wide?860:560, position:'relative', maxHeight:'88vh', overflowY:'auto' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${S.pink},${S.blue})`, borderRadius:'18px 18px 0 0' }} />
        <button onClick={onClose} style={{ position:'absolute', top:14, right:14, width:28, height:28, borderRadius:7, border:`1px solid ${S.border}`, background:'rgba(255,255,255,.05)', color:S.text2, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:18, color:S.text, marginBottom:20 }}>{title}</div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>{children}</div>
        <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:20 }}>
          <Btn label="Cancel" color={S.text3} outline onClick={onClose} />
          <Btn label={saving?'Saving…':'Save'} onClick={onSave} />
        </div>
      </div>
    </div>
  )
}

// ── Sub-tabs ───────────────────────────────────────────────────────────────
function SubTabs({ tabs, active, onSelect }: { tabs:string[]; active:string; onSelect:(t:string)=>void }) {
  return (
    <div style={{ display:'flex', gap:4, background:S.bg3, padding:4, borderRadius:9, marginBottom:20 }}>
      {tabs.map(t => (
        <div key={t} onClick={()=>onSelect(t)} style={{ padding:'7px 16px', borderRadius:6, cursor:'pointer', fontSize:12.5, fontWeight:500, color:active===t?S.text:S.text2, background:active===t?S.surface:'transparent', boxShadow:active===t?'0 1px 3px rgba(0,0,0,.3)':'none', transition:'all .15s' }}>{t}</div>
      ))}
    </div>
  )
}

// ── Data Table ─────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableRow = { __raw?: any } & { [key:string]: any }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table({ cols, rows, onEdit, onDelete }: { cols:string[]; rows:TableRow[]; onEdit:(r:any)=>void; onDelete:(r:any)=>void }) {
  const gridCols = `repeat(${cols.length},1fr) 100px`
  return (
    <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:12, overflow:'hidden' }}>
      <div style={{ display:'grid', gridTemplateColumns:gridCols, padding:'10px 16px', borderBottom:`1px solid ${S.border}`, background:'rgba(255,255,255,.02)' }}>
        {cols.map(c=><div key={c} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3 }}>{c}</div>)}
        <div />
      </div>
      {rows.length===0 && <div style={{ padding:'32px 16px', textAlign:'center', color:S.text3, fontSize:13 }}>No records yet.</div>}
      {rows.map((row,i)=>(
        <div key={i} style={{ display:'grid', gridTemplateColumns:gridCols, padding:'12px 16px', borderBottom:`1px solid ${S.border}`, alignItems:'center' }}
          onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,.02)')}
          onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
          {cols.map(c=>(
            <div key={c} style={{ fontSize:13, color:S.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:12 }}>
              {row[c.toLowerCase().replace(/ /g,'_')]??row[c]??''}
            </div>
          ))}
          <div style={{ display:'flex', gap:5 }}>
            <Btn label="Edit" small color={S.blue} onClick={()=>onEdit(row.__raw)} />
            <Btn label="Del" small color='#EF4444' outline onClick={()=>{ if(confirm('Delete?')) onDelete(row.__raw) }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SectionHeader({ title, desc, onAdd }: { title:string; desc:string; onAdd?:()=>void }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
      <div>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text, letterSpacing:'-.02em' }}>{title}</div>
        <div style={{ fontSize:13, color:S.text2, marginTop:3 }}>{desc}</div>
      </div>
      {onAdd && <Btn label={`+ Add ${title.replace(/s$/,'')}`} onClick={onAdd} />}
    </div>
  )
}

// ── BRIEFINGS ──────────────────────────────────────────────────────────────
function BriefingsSection({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows] = useState<Briefing[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Briefing|null>(null)
  const [form, setForm] = useState({ slug:'',title:'',summary:'',content:'',scope:'',date:'',read_time:'',author_name:'',author_role:'',author_department:'',cover_image:'',hero_image:'',tags:'',cta_label:'',cta_url:'',is_featured:false })

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/briefings'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm({ slug:'',title:'',summary:'',content:'',scope:'',date:'',read_time:'',author_name:'',author_role:'',author_department:'',cover_image:'',hero_image:'',tags:'',cta_label:'',cta_url:'',is_featured:false }); setModal(true) }
  function openEdit(b:Briefing) { setEditing(b); setForm({ slug:b.slug,title:b.title,summary:'',content:'',scope:b.scope,date:b.date,read_time:b.read_time,author_name:b.author_name,author_role:'',author_department:'',cover_image:b.cover_image||'',hero_image:'',tags:'',cta_label:'',cta_url:'',is_featured:b.is_featured }); setModal(true) }

  async function handleSave() {
    setSaving(true)
    const method=editing?'PUT':'POST'; const body=editing?{...form,id:editing.id}:form
    await fetch('/api/admin/briefings',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false); setModal(false); load(); showToast(`✓ Briefing ${editing?'updated':'created'}`)
  }
  async function handleDelete(b:Briefing) { await fetch('/api/admin/briefings',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:b.id})}); load(); showToast('✓ Briefing deleted') }

  const F=(k:keyof typeof form)=>(v:string|boolean)=>setForm(f=>({...f,[k]:v}))
  const tableRows=rows.map(b=>({ Title:b.title.slice(0,52)+(b.title.length>52?'…':''), Author:b.author_name, Date:b.date, Status:<Badge label={b.is_featured?'Featured':'Published'} color={b.is_featured?S.orange:S.text3} />, __raw:b }))

  return (
    <>
      <SectionHeader title="Briefings" desc={`${rows.length} briefings · website_briefings`} onAdd={openAdd} />
      <Table cols={['Title','Author','Date','Status']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
      {modal && (
        <Modal title={editing?'Edit briefing':'New briefing'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving} wide>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Title" value={form.title} onChange={F('title')} required placeholder="Article title" />
            <Input label="Slug" value={form.slug} onChange={F('slug')} required placeholder="url-friendly-slug" />
          </div>
          <Input label="Summary (listing card)" value={form.summary} onChange={F('summary')} rows={2} placeholder="Short summary shown on listing" />
          <Input label="Content (Markdown — ## headings, blank lines = paragraphs)" value={form.content} onChange={F('content')} rows={8} placeholder="## Section&#10;&#10;Paragraph..." />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
            <Input label="Scope" value={form.scope} onChange={F('scope')} placeholder="e.g. Intelligence" />
            <Input label="Date" value={form.date} onChange={F('date')} placeholder="e.g. Jun 27, 2026" />
            <Input label="Read time" value={form.read_time} onChange={F('read_time')} placeholder="e.g. 5 min" />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Author name" value={form.author_name} onChange={F('author_name')} placeholder="e.g. Ankit Suman" />
            <Input label="Author role" value={form.author_role} onChange={F('author_role')} placeholder="e.g. Founder and Director" />
          </div>
          <Input label="Author department" value={form.author_department} onChange={F('author_department')} placeholder="e.g. Leadership and Strategy" />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Cover image URL (R2)" value={form.cover_image} onChange={F('cover_image')} placeholder="https://assets.labelnest.in/briefings/..." />
            <Input label="Hero image URL (R2)" value={form.hero_image} onChange={F('hero_image')} placeholder="https://assets.labelnest.in/briefings/hero-..." />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Tags (comma-separated)" value={form.tags} onChange={F('tags')} placeholder="intelligence, private markets" />
            <Input label="CTA label" value={form.cta_label} onChange={F('cta_label')} placeholder="e.g. Talk to the team" />
          </div>
          <Input label="CTA URL" value={form.cta_url} onChange={F('cta_url')} placeholder="/contact or https://..." />
          <Toggle label="Featured briefing" checked={form.is_featured} onChange={v=>setForm(f=>({...f,is_featured:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── TEAM MEMBERS PANEL ─────────────────────────────────────────────────────
function PhotoUpload({ name, folder, value, onChange, showToast }: { name:string; folder:string; value:string; onChange:(v:string)=>void; showToast:(m:string)=>void }) {
  const [uploading, setUploading] = useState(false)
  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const fd = new FormData(); fd.append('file', file); fd.append('folder', folder); fd.append('name', name)
    const r = await fetch('/api/admin/upload-photo', { method:'POST', body:fd })
    const d = await r.json()
    setUploading(false)
    if (d.url) { onChange(d.url); showToast('✓ Photo uploaded') }
    else showToast('Upload failed')
  }
  return (
    <div>
      <label style={{ fontSize:11.5, fontWeight:600, color:S.text2, display:'block', marginBottom:6 }}>Photo</label>
      <div style={{ display:'flex', gap:8, alignItems:'center' }}>
        {value && (
          <div style={{ width:40, height:40, borderRadius:8, overflow:'hidden', border:`1px solid ${S.border}`, flexShrink:0, position:'relative', background:S.bg3 }}>
            <img src={value} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
          </div>
        )}
        <div style={{ flex:1, minWidth:0 }}>
          <label style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, cursor:'pointer', fontSize:12.5, color:S.text2 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            {uploading ? 'Uploading…' : value ? 'Change photo' : 'Upload photo'}
            <input type="file" accept="image/*" style={{ display:'none' }} onChange={pick} disabled={uploading} />
          </label>
        </div>
        {value && <input value={value} onChange={e=>onChange(e.target.value)} placeholder="or paste URL" style={{ flex:1, background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'8px 10px', fontSize:11.5, color:S.text2, outline:'none', minWidth:0 }} />}
      </div>
      {!value && <input value={value} onChange={e=>onChange(e.target.value)} placeholder="or paste R2 URL" style={{ width:'100%', marginTop:6, background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'8px 12px', fontSize:12.5, color:S.text, outline:'none', boxSizing:'border-box' }} />}
    </div>
  )
}

function TeamMembersPanel({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows] = useState<TeamMember[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<TeamMember|null>(null)
  const blank = { name:'',role:'',department:'',bio:'',linkedin_url:'',image_url:'',sort_order:'99',is_active:true,slug:'',email:'',expertise:'',quote:'' }
  const [form, setForm] = useState(blank)

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/team'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(m:TeamMember) { setEditing(m); setForm({ name:m.name,role:m.role,department:m.department,bio:m.bio||'',linkedin_url:m.linkedin_url||'',image_url:m.image_url||'',sort_order:String(m.sort_order),is_active:m.is_active,slug:m.slug||'',email:m.email||'',expertise:(m.expertise||[]).join(', '),quote:m.quote||'' }); setModal(true) }

  async function handleSave() {
    setSaving(true)
    const payload={...form,sort_order:Number(form.sort_order)}; const method=editing?'PUT':'POST'; const body=editing?{...payload,id:editing.id}:payload
    await fetch('/api/admin/team',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false); setModal(false); load(); showToast(`✓ Team member ${editing?'updated':'added'}`)
  }
  async function handleDelete(m:TeamMember) { await fetch('/api/admin/team',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:m.id})}); load(); showToast('✓ Removed') }

  const F=(k:keyof typeof form)=>(v:string)=>setForm(f=>({...f,[k]:v}))

  return (
    <>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}><Btn label="+ Add member" onClick={openAdd} /></div>
      {/* Photo grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:10, marginBottom:20 }}>
        {rows.map(m=>(
          <div key={m.id} onClick={()=>openEdit(m)} style={{ cursor:'pointer', background:S.bg2, border:`1px solid ${S.border}`, borderRadius:12, padding:10, textAlign:'center', transition:'border-color .15s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=S.bord2}
            onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
            <div style={{ width:52, height:52, borderRadius:'50%', overflow:'hidden', margin:'0 auto 8px', background:S.bg3, position:'relative' }}>
              {m.image_url
                ? <img src={m.image_url} alt={m.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:800, color:S.pink }}>{m.name[0]}</div>}
            </div>
            <div style={{ fontSize:11.5, fontWeight:600, color:S.text, lineHeight:1.3 }}>{m.name.split(' ')[0]}</div>
            <div style={{ fontSize:10, color:S.text3, marginTop:2 }}>{m.role.split(' ').slice(0,2).join(' ')}</div>
            {!m.is_active && <div style={{ fontSize:9, color:S.text3, marginTop:2, fontStyle:'italic' }}>hidden</div>}
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={editing?'Edit member':'Add team member'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Name" value={form.name} onChange={F('name')} required />
            <Input label="Role" value={form.role} onChange={F('role')} required placeholder="e.g. Data Analyst" />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Department" value={form.department} onChange={F('department')} placeholder="e.g. Data and AI Systems" />
            <Input label="Sort order" value={form.sort_order} onChange={F('sort_order')} type="number" />
          </div>
          <Input label="Bio" value={form.bio} onChange={F('bio')} rows={3} placeholder="2-3 sentence bio for their profile page" />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Slug" value={form.slug} onChange={F('slug')} placeholder="url-friendly-slug, e.g. sowmya-polakonda" />
            <Input label="Email (for Contact button)" value={form.email} onChange={F('email')} placeholder="firstname@labelnest.in" />
          </div>
          <Input label="LinkedIn URL" value={form.linkedin_url} onChange={F('linkedin_url')} placeholder="https://linkedin.com/in/..." />
          <Input label="Expertise tags (comma-separated)" value={form.expertise} onChange={F('expertise')} placeholder="e.g. Private markets, Data pipelines, SQL" />
          <Input label="Quote (optional)" value={form.quote} onChange={F('quote')} rows={2} placeholder="A single quote or what they're working on" />
          <PhotoUpload name={form.name || 'member'} folder="team" value={form.image_url} onChange={F('image_url')} showToast={showToast} />
          <Toggle label="Active (visible on team page)" checked={form.is_active} onChange={v=>setForm(f=>({...f,is_active:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── ALUMNI PANEL ───────────────────────────────────────────────────────────
function AlumniPanel({ showToast }: { showToast:(m:string)=>void }) {
  const [tab, setTab]       = useState<'directory'|'outreach'>('directory')
  const [rows, setRows]     = useState<Alumni[]>([])
  const [modal, setModal]   = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Alumni|null>(null)
  const [emailModal, setEmailModal] = useState<Alumni|null>(null)
  const blank = { name:'',role:'',department:'',email:'',linkedin_url:'',image_url:'',now_at_type:'working',now_at_company:'',now_at_role:'',now_at_url:'',is_active:true }
  const [form, setForm] = useState(blank)

  const NOW_AT_TYPES = [
    { value:'working',    label:'Working at'    },
    { value:'studying',   label:'Studying at'   },
    { value:'founding',   label:'Founded'       },
    { value:'consulting', label:'Consulting at' },
    { value:'freelance',  label:'Freelancing'   },
  ]

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/alumni'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd()  { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(a:Alumni) { setEditing(a); setForm({ name:a.name,role:a.role,department:a.department,email:a.email||'',linkedin_url:a.linkedin_url||'',image_url:a.image_url||'',now_at_type:a.now_at_type||'working',now_at_company:a.now_at_company||'',now_at_role:a.now_at_role||'',now_at_url:a.now_at_url||'',is_active:a.is_active }); setModal(true) }
  async function handleSave() {
    setSaving(true); const method=editing?'PUT':'POST'; const body=editing?{...form,id:editing.id}:form
    await fetch('/api/admin/alumni',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false); setModal(false); load(); showToast(`✓ Alumni ${editing?'updated':'added'}`)
  }
  async function handleDelete(a:Alumni) { await fetch('/api/admin/alumni',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:a.id})}); load(); showToast('✓ Alumni removed') }

  const F=(k:keyof typeof form)=>(v:string)=>setForm(f=>({...f,[k]:v}))
  const tableRows=rows.map(a=>({ Name:a.name, Role:a.role, Email:a.email?<span style={{color:S.text2,fontFamily:'JetBrains Mono,monospace',fontSize:11}}>{a.email}</span>:<span style={{color:S.text3,fontStyle:'italic',fontSize:11}}>—</span>, 'Now at':a.now_at_company?<span style={{color:S.green}}>{a.now_at_company}</span>:<span style={{color:S.text3,fontStyle:'italic'}}>Not set</span>, Status:<Badge label={a.is_active?'Visible':'Hidden'} color={a.is_active?S.blue:S.text3} />, __raw:a }))

  function copyLink(a:Alumni) {
    const link = `https://labelnest.in/alumni/update?token=${a.update_token}`
    navigator.clipboard.writeText(link).then(()=>showToast('✓ Link copied'))
  }

  function buildEmailTemplate(a:Alumni) {
    const link = `https://labelnest.in/alumni/update?token=${a.update_token}`
    const firstName = a.name.split(' ')[0]
    return {
      to: a.email || '(add email first)',
      subject: `Your LabelNest alumni card — update where you are now`,
      body: `Hi ${firstName},

Hope you're doing well. We've rebuilt the LabelNest team page and every alumni has a card on the wall.

If you'd like, you can update your card to show where you're working now — just takes a minute:

${link}

It'll show "Now at [Company]" on your card at labelnest.in/team.

No rush, and no obligation. The link is yours to use anytime.

— The LabelNest team
contact@labelnest.in`
    }
  }

  return (
    <>
      {/* Tab switcher */}
      <div style={{ display:'flex', gap:6, marginBottom:20 }}>
        {(['directory','outreach'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{ padding:'6px 16px', borderRadius:8, border:`1px solid ${tab===t?S.pink:S.border}`, background:tab===t?`${S.pink}18`:'transparent', color:tab===t?S.pink:S.text2, fontSize:12.5, fontWeight:600, cursor:'pointer', textTransform:'capitalize' }}>
            {t === 'directory' ? 'Directory' : 'Outreach'}
          </button>
        ))}
      </div>

      {tab === 'directory' && (
        <>
          <div style={{ marginBottom:10, fontSize:12.5, color:S.text3 }}>All alumni are permanent — never deleted, only hidden.</div>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}><Btn label="+ Add alumni" onClick={openAdd} /></div>
          <Table cols={['Name','Role','Email','Now at','Status']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
        </>
      )}

      {tab === 'outreach' && (
        <>
          <div style={{ marginBottom:16, padding:'12px 16px', background:`${S.blue}10`, border:`1px solid ${S.blue}30`, borderRadius:10, fontSize:12.5, color:S.text2, lineHeight:1.65 }}>
            Each alumni has a personal link. Share it and they can update their "Now at" card themselves. Email service will be wired in — for now copy the link or draft the email.
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {rows.map(a=>(
              <div key={a.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:S.bg2, border:`1px solid ${S.border}`, borderRadius:10 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:S.text }}>{a.name}</div>
                  <div style={{ fontSize:11, color:S.text3 }}>{a.role}{a.email ? ` · ${a.email}` : ''}</div>
                </div>
                <div style={{ flexShrink:0 }}>
                  {a.now_at_company
                    ? <Badge label={`${NOW_AT_TYPES.find(t=>t.value===a.now_at_type)?.label??'Now at'} ${a.now_at_company}`} color={S.green} />
                    : <Badge label="Not updated" color={S.text3} />}
                </div>
                {a.update_token ? (
                  <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                    <button onClick={()=>copyLink(a)}
                      style={{ padding:'5px 12px', borderRadius:7, border:`1px solid ${S.bord2}`, background:'transparent', color:S.text2, fontSize:11.5, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>
                      Copy link
                    </button>
                    <button onClick={()=>setEmailModal(a)}
                      style={{ padding:'5px 12px', borderRadius:7, border:`1px solid ${S.blue}50`, background:`${S.blue}10`, color:S.blue, fontSize:11.5, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>
                      Email draft
                    </button>
                  </div>
                ) : (
                  <span style={{ fontSize:11, color:S.text3, fontStyle:'italic' }}>No token</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit/Add modal */}
      {modal && (
        <Modal title={editing?'Edit alumni':'Add alumni'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Name" value={form.name} onChange={F('name')} required />
            <Input label="Role at LabelNest" value={form.role} onChange={F('role')} required />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Department" value={form.department} onChange={F('department')} placeholder="e.g. Data and AI Systems" />
            <Input label="Email" value={form.email} onChange={F('email')} placeholder="name@example.com" type="email" />
          </div>
          <Input label="LinkedIn URL" value={form.linkedin_url} onChange={F('linkedin_url')} placeholder="https://linkedin.com/in/..." />
          <PhotoUpload name={form.name || 'alumni'} folder="team" value={form.image_url} onChange={F('image_url')} showToast={showToast} />
          <div style={{ borderTop:`1px solid ${S.border}`, paddingTop:12, marginTop:4 }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3, marginBottom:10 }}>Now at</div>
            <div style={{ marginBottom:10 }}>
              <label style={{ fontSize:11.5, fontWeight:600, color:S.text2, display:'block', marginBottom:5 }}>Status</label>
              <select value={form.now_at_type} onChange={e=>setForm(f=>({...f,now_at_type:e.target.value}))} style={{ width:'100%', background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'8px 12px', fontSize:12.5, color:S.text, outline:'none' }}>
                {NOW_AT_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <Input label={form.now_at_type==='studying'?'Institution':'Company'} value={form.now_at_company} onChange={F('now_at_company')} placeholder={form.now_at_type==='studying'?'e.g. IIM Bangalore':'Company name'} />
              <Input label="Role / Course" value={form.now_at_role} onChange={F('now_at_role')} placeholder="Current role or course" />
            </div>
            <Input label="Profile URL" value={form.now_at_url} onChange={F('now_at_url')} placeholder="https://..." />
          </div>
          <Toggle label="Visible on alumni wall" checked={form.is_active} onChange={v=>setForm(f=>({...f,is_active:v}))} />
        </Modal>
      )}

      {/* Email draft modal */}
      {emailModal && (() => {
        const tpl = buildEmailTemplate(emailModal)
        const full = `To: ${tpl.to}\nSubject: ${tpl.subject}\n\n${tpl.body}`
        return (
          <div onClick={e=>{ if(e.target===e.currentTarget) setEmailModal(null) }} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.72)', backdropFilter:'blur(6px)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
            <div style={{ background:S.surface, border:`1px solid ${S.bord2}`, borderRadius:18, padding:32, width:'100%', maxWidth:580, position:'relative', maxHeight:'88vh', overflowY:'auto' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${S.blue},${S.pink})`, borderRadius:'18px 18px 0 0' }} />
              <button onClick={()=>setEmailModal(null)} style={{ position:'absolute', top:14, right:14, width:28, height:28, borderRadius:7, border:`1px solid ${S.border}`, background:'rgba(255,255,255,.05)', color:S.text2, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:18, color:S.text, marginBottom:4 }}>Email draft — {emailModal.name}</div>
              <div style={{ fontSize:12, color:S.text3, marginBottom:20 }}>Email service will be wired later. Copy this and send manually for now.</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <span style={{ fontSize:11.5, fontWeight:600, color:S.text2, width:60, flexShrink:0 }}>To:</span>
                  <span style={{ fontSize:13, color:!emailModal.email?S.orange:S.text, fontFamily:'JetBrains Mono,monospace' }}>{tpl.to}</span>
                </div>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <span style={{ fontSize:11.5, fontWeight:600, color:S.text2, width:60, flexShrink:0 }}>Subject:</span>
                  <span style={{ fontSize:13, color:S.text }}>{tpl.subject}</span>
                </div>
              </div>
              <pre style={{ background:S.bg2, border:`1px solid ${S.border}`, borderRadius:10, padding:16, fontSize:13, color:S.text2, whiteSpace:'pre-wrap', wordBreak:'break-word', lineHeight:1.7, margin:0, marginBottom:16, fontFamily:'Inter,sans-serif' }}>{tpl.body}</pre>
              <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
                <button onClick={()=>{ navigator.clipboard.writeText(full); showToast('✓ Email copied') }}
                  style={{ padding:'9px 18px', borderRadius:8, border:`1px solid ${S.blue}50`, background:`${S.blue}10`, color:S.blue, fontSize:13, fontWeight:600, cursor:'pointer' }}>
                  Copy full email
                </button>
                <button onClick={()=>setEmailModal(null)}
                  style={{ padding:'9px 18px', borderRadius:8, border:`1px solid ${S.border}`, background:'transparent', color:S.text2, fontSize:13, fontWeight:600, cursor:'pointer' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </>
  )
}

// ── FELLOWS PANEL ──────────────────────────────────────────────────────────
function FellowsPanel({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows] = useState<Fellow[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Fellow|null>(null)
  const blank = { name:'',role:'Research Fellow',cohort:'',department:'',linkedin_url:'',image_url:'',is_active:true,status:'active',sort_order:'99',slug:'',bio:'',email:'',expertise:'',quote:'' }
  const [form, setForm] = useState(blank)

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/fellows'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(f:Fellow) { setEditing(f); setForm({ name:f.name,role:f.role,cohort:f.cohort,department:f.department||'',linkedin_url:f.linkedin_url||'',image_url:f.image_url||'',is_active:f.is_active,status:f.status||'active',sort_order:String(f.sort_order),slug:f.slug||'',bio:f.bio||'',email:f.email||'',expertise:(f.expertise||[]).join(', '),quote:f.quote||'' }); setModal(true) }

  async function handleSave() {
    setSaving(true); const payload={...form,sort_order:Number(form.sort_order)}; const method=editing?'PUT':'POST'; const body=editing?{...payload,id:editing.id}:payload
    await fetch('/api/admin/fellows',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false); setModal(false); load(); showToast(`✓ Fellow ${editing?'updated':'added'}`)
  }
  async function handleDelete(f:Fellow) { await fetch('/api/admin/fellows',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:f.id})}); load(); showToast('✓ Removed') }

  const F=(k:keyof typeof form)=>(v:string)=>setForm(ff=>({...ff,[k]:v}))
  const statusBadge=(f:Fellow)=> !f.is_active
    ? <Badge label="Hidden" color={S.text3} />
    : f.status==='completed'
      ? <Badge label="Completed" color={S.orange} />
      : <Badge label="Active" color={S.purple} />
  const tableRows=rows.map(f=>({ Name:f.name, Role:f.role, Cohort:f.cohort, Status:statusBadge(f), __raw:f }))

  return (
    <>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}><Btn label="+ Add fellow" color={S.purple} onClick={openAdd} /></div>
      <Table cols={['Name','Role','Cohort','Status']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
      {modal && (
        <Modal title={editing?'Edit fellow':'Add fellow'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Name" value={form.name} onChange={F('name')} required />
            <Input label="Role" value={form.role} onChange={F('role')} placeholder="Research Fellow" />
          </div>
          <Input label="Cohort" value={form.cohort} onChange={F('cohort')} required placeholder="e.g. NestLabs · Cohort 2 · Data Research" hint="Shown verbatim as the /team section header for this group. New cohorts don't need a code change — just type the label here." />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Department (optional)" value={form.department} onChange={F('department')} placeholder="e.g. Data Research" />
            <Input label="Sort order" value={form.sort_order} onChange={F('sort_order')} type="number" />
          </div>
          <Input label="LinkedIn URL" value={form.linkedin_url} onChange={F('linkedin_url')} placeholder="https://linkedin.com/in/..." />
          <PhotoUpload name={form.name || 'fellow'} folder="fellows" value={form.image_url} onChange={F('image_url')} showToast={showToast} />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Slug" value={form.slug} onChange={F('slug')} placeholder="url-friendly-slug" />
            <Input label="Email (for Contact button)" value={form.email} onChange={F('email')} placeholder="firstname@labelnest.in" />
          </div>
          <Input label="Bio" value={form.bio} onChange={F('bio')} rows={3} placeholder="2-3 sentence bio for their profile page" />
          <Input label="Expertise tags (comma-separated)" value={form.expertise} onChange={F('expertise')} placeholder="e.g. Data research, Private markets" />
          <Input label="Quote (optional)" value={form.quote} onChange={F('quote')} rows={2} placeholder="A single quote or what they're working on" />
          <SelectField label="Cohort status" value={form.status} onChange={F('status')} options={['active','completed']} />
          <div style={{ fontSize:11, color:S.text3, marginTop:-6, marginBottom:12 }}>
            &quot;Completed&quot; keeps them visible on /team under their cohort (permanent, like alumni) but flags they&apos;ve moved on — use this once a cohort ends instead of hiding the fellow.
          </div>
          <Toggle label="Active (visible on team page)" checked={form.is_active} onChange={v=>setForm(f=>({...f,is_active:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── INTERNS PANEL ────────────────────────────────────────────────────────────
function InternsPanel({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows] = useState<Intern[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Intern|null>(null)
  const blank = { name:'',role:'Intern',cohort:'',linkedin_url:'',image_url:'',is_active:true,sort_order:'99',slug:'' }
  const [form, setForm] = useState(blank)

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/interns'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(i:Intern) { setEditing(i); setForm({ name:i.name,role:i.role,cohort:i.cohort,linkedin_url:i.linkedin_url||'',image_url:i.image_url||'',is_active:i.is_active,sort_order:String(i.sort_order),slug:i.slug||'' }); setModal(true) }

  async function handleSave() {
    setSaving(true); const payload={...form,sort_order:Number(form.sort_order)}; const method=editing?'PUT':'POST'; const body=editing?{...payload,id:editing.id}:payload
    await fetch('/api/admin/interns',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false); setModal(false); load(); showToast(`✓ Intern ${editing?'updated':'added'}`)
  }
  async function handleDelete(i:Intern) { await fetch('/api/admin/interns',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:i.id})}); load(); showToast('✓ Removed') }

  const F=(k:keyof typeof form)=>(v:string)=>setForm(ff=>({...ff,[k]:v}))
  const tableRows=rows.map(i=>({ Name:i.name, Role:i.role, Cohort:i.cohort, Status:<Badge label={i.is_active?'Active':'Hidden'} color={i.is_active?S.purple:S.text3} />, __raw:i }))

  return (
    <>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}><Btn label="+ Add intern" color={S.orange} onClick={openAdd} /></div>
      <Table cols={['Name','Role','Cohort','Status']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
      {modal && (
        <Modal title={editing?'Edit intern':'Add intern'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Name" value={form.name} onChange={F('name')} required />
            <Input label="Role" value={form.role} onChange={F('role')} placeholder="Intern" />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Cohort" value={form.cohort} onChange={F('cohort')} placeholder="e.g. Summer 2026" />
            <Input label="Sort order" value={form.sort_order} onChange={F('sort_order')} type="number" />
          </div>
          <Input label="Slug" value={form.slug} onChange={F('slug')} placeholder="url-friendly-slug" />
          <Input label="LinkedIn URL" value={form.linkedin_url} onChange={F('linkedin_url')} placeholder="https://linkedin.com/in/..." />
          <PhotoUpload name={form.name || 'intern'} folder="team" value={form.image_url} onChange={F('image_url')} showToast={showToast} />
          <Toggle label="Active (visible on team page)" checked={form.is_active} onChange={v=>setForm(f=>({...f,is_active:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── TEAM SECTION (4 tabs) ──────────────────────────────────────────────────
function TeamSection({ showToast }: { showToast:(m:string)=>void }) {
  const [tab, setTab] = useState('Team Members')
  return (
    <>
      <SectionHeader title="Team Management" desc="Members · Alumni · Nestling Fellows · Interns · website_team_members, website_alumni, website_fellows, website_interns" />
      <SubTabs tabs={['Team Members','Alumni','Nestling Fellows','Interns']} active={tab} onSelect={setTab} />
      {tab==='Team Members' && <TeamMembersPanel showToast={showToast} />}
      {tab==='Alumni' && <AlumniPanel showToast={showToast} />}
      {tab==='Nestling Fellows' && <FellowsPanel showToast={showToast} />}
      {tab==='Interns' && <InternsPanel showToast={showToast} />}
    </>
  )
}

// ── LEGAL SECTION ──────────────────────────────────────────────────────────
function LegalSection({ showToast }: { showToast:(m:string)=>void }) {
  const [tab, setTab] = useState('Documents')
  const [rows, setRows] = useState<LegalDoc[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<LegalDoc|null>(null)
  const blank = { slug:'',title:'',intro:'',body_markdown:'',version:'v1.0',effective_date:'',last_updated:'' }
  const [form, setForm] = useState(blank)
  const [master, setMaster] = useState({ company_name:'LabelNest India Private Limited', address:'No. 33, 4th Floor,\n1st Main, CBI Main Rd,\nHMT Layout, Ganganagar,\nBengaluru, Karnataka, India', general_email:'contact@labelnest.in', privacy_email:'privacy@labelnest.in', ops_email:'ops@labelnest.in', nestlens_email:'nestlens@labelnest.in', nesthr_email:'nesthr@labelnest.in', governing_law:'Laws of Karnataka, India', jurisdiction:'Courts of Bengaluru, Karnataka, India' })

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/legal'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(d:LegalDoc) { setEditing(d); setForm({ slug:d.slug,title:d.title,intro:d.intro,body_markdown:d.body_markdown,version:d.version,effective_date:d.effective_date,last_updated:d.last_updated }); setModal(true) }

  async function handleSave() {
    setSaving(true); const method=editing?'PUT':'POST'; const body=editing?{...form,id:editing.id}:form
    await fetch('/api/admin/legal',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false); setModal(false); load(); showToast(`✓ Legal doc ${editing?'updated':'saved'}`)
  }
  async function handleDelete(d:LegalDoc) { await fetch('/api/admin/legal',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:d.id})}); load(); showToast('✓ Deleted') }
  async function saveMaster() { await fetch('/api/admin/legal/master',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(master)}); showToast('✓ Master Reference saved') }

  const F=(k:keyof typeof form)=>(v:string)=>setForm(f=>({...f,[k]:v}))
  const tableRows=rows.map(d=>({ Title:d.title, Slug:d.slug, Version:d.version, Updated:d.last_updated, __raw:d }))

  return (
    <>
      <SectionHeader title="Legal Hub" desc="Policies, terms, and legal commitments · website_legal_documents" />
      <SubTabs tabs={['Documents','Master Reference']} active={tab} onSelect={setTab} />

      {tab==='Documents' && (
        <>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}><Btn label="+ Add document" onClick={openAdd} /></div>
          <Table cols={['Title','Slug','Version','Updated']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
          {modal && (
            <Modal title={editing?'Edit legal document':'Add legal document'} onClose={()=>setModal(false)} onSave={handleSave} saving={saving} wide>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
                <Input label="Slug" value={form.slug} onChange={F('slug')} required placeholder="privacy" />
                <Input label="Title" value={form.title} onChange={F('title')} required placeholder="Privacy Policy" />
                <Input label="Version" value={form.version} onChange={F('version')} placeholder="v1.0" />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <Input label="Effective date" value={form.effective_date} onChange={F('effective_date')} placeholder="May 31, 2026" />
                <Input label="Last updated" value={form.last_updated} onChange={F('last_updated')} placeholder="May 31, 2026" />
              </div>
              <Input label="Intro (shown as callout)" value={form.intro} onChange={F('intro')} rows={3} placeholder="Short intro paragraph..." />
              <Input label="Body (HTML — rendered directly on /legal/[slug])" value={form.body_markdown} onChange={F('body_markdown')} rows={14} placeholder="<h2 id='section-1'>Section 1</h2>&#10;<p>Content...</p>" hint="Use <h2 id=...> for TOC anchor detection. Store as HTML — dangerouslySetInnerHTML renders it." />
            </Modal>
          )}
        </>
      )}

      {tab==='Master Reference' && (
        <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, padding:24 }}>
          <div style={{ background:`rgba(249,115,22,.06)`, border:`1px solid rgba(249,115,22,.15)`, borderRadius:8, padding:'10px 14px', fontSize:12.5, color:S.text2, marginBottom:20 }}>
            These values are referenced by all legal documents via tokens like <code style={{color:S.orange}}>{'{{company_name}}'}</code>. Update once, applied everywhere.
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ gridColumn:'span 2' }}><Input label="Company name" value={master.company_name} onChange={v=>setMaster(m=>({...m,company_name:v}))} /></div>
            <div style={{ gridColumn:'span 2' }}><Input label="Registered address" value={master.address} onChange={v=>setMaster(m=>({...m,address:v}))} rows={4} /></div>
            <Input label="General support email" value={master.general_email} onChange={v=>setMaster(m=>({...m,general_email:v}))} />
            <Input label="Privacy email" value={master.privacy_email} onChange={v=>setMaster(m=>({...m,privacy_email:v}))} />
            <Input label="Operations email" value={master.ops_email} onChange={v=>setMaster(m=>({...m,ops_email:v}))} />
            <Input label="NestLens support email" value={master.nestlens_email} onChange={v=>setMaster(m=>({...m,nestlens_email:v}))} />
            <Input label="NestHR support email" value={master.nesthr_email} onChange={v=>setMaster(m=>({...m,nesthr_email:v}))} />
            <Input label="Governing law" value={master.governing_law} onChange={v=>setMaster(m=>({...m,governing_law:v}))} />
            <div style={{ gridColumn:'span 2' }}><Input label="Jurisdiction" value={master.jurisdiction} onChange={v=>setMaster(m=>({...m,jurisdiction:v}))} /></div>
          </div>
          <div style={{ marginTop:16 }}><Btn label="Save Master Reference" onClick={saveMaster} /></div>
        </div>
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
  const blank = { title:'',department:'',type:'Remote',location:'',complexity:'High',apply_url:'',is_active:true }
  const [form, setForm] = useState(blank)

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/jobs'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(j:Job) { setEditing(j); setForm({ title:j.title,department:j.department,type:j.type,location:j.location,complexity:j.complexity,apply_url:j.apply_url,is_active:j.is_active }); setModal(true) }

  async function handleSave() {
    setSaving(true); const method=editing?'PUT':'POST'; const body=editing?{...form,id:editing.id}:form
    await fetch('/api/admin/jobs',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false); setModal(false); load(); showToast(`✓ Job ${editing?'updated':'added'}`)
  }
  async function handleDelete(j:Job) { await fetch('/api/admin/jobs',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:j.id})}); load(); showToast('✓ Job removed') }

  const F=(k:keyof typeof form)=>(v:string)=>setForm(f=>({...f,[k]:v}))
  const tableRows=rows.map(j=>({ Title:j.title, Department:j.department, Type:j.type, Status:<Badge label={j.is_active?'Active':'Paused'} color={j.is_active?S.green:S.text3} />, __raw:j }))

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
          <Toggle label="Active (visible on careers page)" checked={form.is_active} onChange={v=>setForm(f=>({...f,is_active:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── DEPARTMENTS SECTION ─────────────────────────────────────────────────────
const DEFAULT_DEPTS = ['Leadership & Strategy','Data & AI Systems','People & Culture','Domain Intelligence','Delivery & Programs','TAPMI Internship April\'26']

function DepartmentsSection({ showToast }: { showToast:(m:string)=>void }) {
  const [depts, setDepts] = useState<string[]>(DEFAULT_DEPTS)
  const [newDept, setNewDept] = useState('')
  function addDept() { if (!newDept.trim()) return; setDepts(d=>[...d,newDept.trim()]); setNewDept(''); showToast('✓ Department added') }
  function removeDept(i:number) { if (!confirm('Remove department?')) return; setDepts(d=>d.filter((_,idx)=>idx!==i)) }
  function moveUp(i:number) { if(i===0) return; setDepts(d=>{const a=[...d]; [a[i-1],a[i]]=[a[i],a[i-1]]; return a}) }
  function moveDown(i:number) { if(i===depts.length-1) return; setDepts(d=>{const a=[...d]; [a[i],a[i+1]]=[a[i+1],a[i]]; return a}) }
  return (
    <>
      <SectionHeader title="Departments" desc="Team section headers displayed on the public Team page" />
      <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, overflow:'hidden', marginBottom:16 }}>
        <div style={{ padding:'14px 18px', borderBottom:`1px solid ${S.border}` }}>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:S.text, marginBottom:10 }}>Add department</div>
          <div style={{ display:'flex', gap:8 }}>
            <input value={newDept} onChange={e=>setNewDept(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addDept()} placeholder="e.g. Research & Intelligence" style={{ flex:1, background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'9px 12px', fontSize:13, color:S.text, outline:'none', fontFamily:'Inter,sans-serif' }} />
            <Btn label="Add" onClick={addDept} />
          </div>
        </div>
        {depts.map((d,i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 18px', borderBottom:`1px solid ${S.border}` }}>
            <span style={{ fontSize:13.5, color:S.text }}>{d}</span>
            <div style={{ display:'flex', gap:5 }}>
              <Btn label="↑" small outline color={S.text2} onClick={()=>moveUp(i)} />
              <Btn label="↓" small outline color={S.text2} onClick={()=>moveDown(i)} />
              <Btn label="Delete" small outline color='#EF4444' onClick={()=>removeDept(i)} />
            </div>
          </div>
        ))}
      </div>
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
    const file=e.target.files?.[0]; if(!file) return
    setUploading(true); setFilename(file.name); setPct(0); setLastUrl('')
    const res=await fetch('/api/admin/upload',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({filename:file.name,contentType:file.type,folder}) })
    if(!res.ok){ setUploading(false); showToast('❌ Upload failed — check R2 credentials'); return }
    const {uploadUrl,publicUrl}=await res.json()
    const xhr=new XMLHttpRequest()
    xhr.upload.onprogress=ev=>setPct(Math.round(ev.loaded/ev.total*100))
    xhr.onload=()=>{ setUploading(false); setPct(100); setLastUrl(publicUrl); navigator.clipboard.writeText(publicUrl).catch(()=>{}); showToast(`✓ ${file.name} uploaded · URL copied`) }
    xhr.onerror=()=>{ setUploading(false); showToast('❌ Upload error') }
    xhr.open('PUT',uploadUrl); xhr.setRequestHeader('Content-Type',file.type); xhr.send(file)
  }

  return (
    <>
      <SectionHeader title="Upload to R2" desc="Cloudflare R2 · labelnest-assets bucket · serves from assets.labelnest.in" />
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
          {['team','founders','briefings','products','videos','misc'].map(f=>(
            <div key={f} onClick={()=>setFolder(f)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 10px', background:folder===f?'rgba(233,30,140,.08)':'rgba(255,255,255,.03)', border:`1px solid ${folder===f?'rgba(233,30,140,.3)':S.border}`, borderRadius:7, cursor:'pointer', marginBottom:5, transition:'all .15s' }}>
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
          <div style={{ fontSize:11, color:S.green, marginBottom:6, fontFamily:'JetBrains Mono,monospace', letterSpacing:'.06em', textTransform:'uppercase' }}>Uploaded · URL auto-copied</div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11.5, color:S.text2, wordBreak:'break-all' }}>{lastUrl}</div>
          <button onClick={()=>{ navigator.clipboard.writeText(lastUrl); showToast('✓ URL copied') }} style={{ marginTop:10, background:S.green, color:'#fff', border:'none', borderRadius:6, padding:'6px 14px', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>Copy URL again</button>
        </div>
      )}
    </>
  )
}

// ── NEWSLETTER SECTION ─────────────────────────────────────────────────────
function NewsletterSection({ showToast }: { showToast:(m:string)=>void }) {
  const [tab, setTab] = useState('Subscribers')
  const [subs, setSubs] = useState<Subscriber[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [sending, setSending] = useState(false)
  const [composeForm, setComposeForm] = useState({ subject:'', template:'new-briefing', recipients:'all', test_email:'ankit@labelnest.in', html_content:'' })

  // Add-one form
  const [addEmail, setAddEmail] = useState('')
  const [addName, setAddName]   = useState('')
  const [addSource, setAddSource] = useState('manual')
  const [addBusy, setAddBusy]   = useState(false)

  // Bulk import
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState('')
  const [importBusy, setImportBusy] = useState(false)

  const load = useCallback(async()=>{ try{ const r=await fetch('/api/admin/newsletter'); const d=await r.json(); setSubs(d.rows||[]) }catch{} },[])
  const loadCampaigns = useCallback(async()=>{ try{ const r=await fetch('/api/admin/newsletter?tab=campaigns'); const d=await r.json(); setCampaigns(d.rows||[]) }catch{} },[])
  useEffect(()=>{ load(); loadCampaigns() },[load, loadCampaigns])

  // "Who opened this" drill-down
  const [ctrCampaign, setCtrCampaign] = useState<Campaign|null>(null)
  const [ctrRecipients, setCtrRecipients] = useState<CampaignRecipient[]>([])
  const [ctrLoading, setCtrLoading] = useState(false)
  async function openCtrDrilldown(c: Campaign) {
    setCtrCampaign(c); setCtrLoading(true)
    try {
      const r = await fetch(`/api/admin/newsletter?tab=campaign-recipients&campaign_id=${c.id}`)
      const d = await r.json()
      setCtrRecipients(d.rows || [])
    } catch { setCtrRecipients([]) }
    setCtrLoading(false)
  }

  function exportCSV() {
    const header = 'email,name,source,status,subscribed_at'
    const lines = subs.map(s => [s.email, s.name||'', s.source, s.status, s.created_at?.slice(0,10)||''].map(v=>`"${v}"`).join(','))
    const blob = new Blob([header + '\n' + lines.join('\n')], { type:'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download='subscribers.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  function parseImportText(text: string): { email:string; name:string; source:string }[] {
    const lines = text.trim().split('\n').filter(Boolean)
    // detect CSV (has comma) vs one-email-per-line
    return lines.flatMap(line => {
      const parts = line.split(',').map(p=>p.trim().replace(/^"|"$/g,''))
      const email = parts[0]; const name = parts[1]||''; const source = parts[2]||'import'
      if (!email || !email.includes('@')) return []
      return [{ email, name, source }]
    })
  }

  async function handleImport() {
    const rows = parseImportText(importText)
    if (rows.length === 0) { showToast('✗ No valid emails found'); return }
    setImportBusy(true)
    try {
      const r = await fetch('/api/admin/newsletter/import',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows})})
      const d = await r.json()
      if (r.ok) { showToast(`✓ ${d.inserted} inserted, ${d.skipped} skipped`); setShowImport(false); setImportText(''); load() }
      else showToast(`✗ ${d.error||'Import failed'}`)
    } catch { showToast('✗ Import failed — network error') }
    setImportBusy(false)
  }

  function onCSVFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setImportText((ev.target?.result as string) || '')
    reader.readAsText(file)
    e.target.value = ''
  }

  async function addOne() {
    if (!addEmail.trim() || !addEmail.includes('@')) { showToast('✗ Valid email required'); return }
    setAddBusy(true)
    try {
      const rows = [{ email: addEmail.trim(), name: addName.trim()||undefined, source: addSource }]
      const r = await fetch('/api/admin/newsletter/import',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows})})
      const d = await r.json()
      if (r.ok && d.inserted > 0) { showToast(`✓ ${addEmail} added`); setAddEmail(''); setAddName(''); load() }
      else if (r.ok && d.skipped > 0) showToast('✗ Already subscribed')
      else showToast(`✗ ${d.error||'Add failed'}`)
    } catch { showToast('✗ Add failed — network error') }
    setAddBusy(false)
  }

  async function sendBroadcast() {
    if (!composeForm.subject.trim() || !composeForm.html_content.trim()) { showToast('✗ Subject and content are required'); return }
    setSending(true)
    try {
      const r = await fetch('/api/admin/newsletter/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(composeForm)})
      const d = await r.json()
      if (r.ok) { showToast(`✓ Broadcast sent to ${d.sent} subscribers`); loadCampaigns() }
      else showToast(`✗ ${d.error || 'Send failed'}${d.detail ? `: ${d.detail}` : ''}`)
    } catch { showToast('✗ Send failed — network error') }
    setSending(false)
  }
  async function sendTest() {
    if (!composeForm.subject.trim() || !composeForm.html_content.trim()) { showToast('✗ Subject and content are required'); return }
    setSending(true)
    try {
      const r = await fetch('/api/admin/newsletter/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...composeForm,recipients:composeForm.test_email,test:true})})
      const d = await r.json()
      if (r.ok) { showToast(`✓ Test sent to ${composeForm.test_email} — tracked in History`); loadCampaigns() }
      else showToast(`✗ ${d.error || 'Test send failed'}${d.detail ? `: ${d.detail}` : ''}`)
    } catch { showToast('✗ Test send failed — network error') }
    setSending(false)
  }

  const CF=(k:keyof typeof composeForm)=>(v:string)=>setComposeForm(f=>({...f,[k]:v}))
  const NL_TABS = [`Subscribers (${subs.length})`,'Compose',`History (${campaigns.length})`]

  return (
    <>
      <SectionHeader title="Newsletter" desc={`${subs.length} subscribers · website_newsletter_subscribers · Brevo`} />
      <SubTabs tabs={NL_TABS} active={NL_TABS.find(t=>t.startsWith(tab)) ?? NL_TABS[0]} onSelect={(t)=>setTab(t.split(' (')[0])} />

      {tab==='Subscribers' && (
        <>
          {/* Add one */}
          <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, padding:'14px 18px', marginBottom:12 }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3, marginBottom:10 }}>Add subscriber</div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'flex-end' }}>
              <div style={{ flex:2, minWidth:180 }}>
                <input value={addEmail} onChange={e=>setAddEmail(e.target.value)} placeholder="email@example.com" type="email"
                  style={{ width:'100%', background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'8px 11px', fontSize:13, color:S.text, outline:'none', boxSizing:'border-box' as const }} />
              </div>
              <div style={{ flex:1.5, minWidth:140 }}>
                <input value={addName} onChange={e=>setAddName(e.target.value)} placeholder="Name (optional)"
                  style={{ width:'100%', background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'8px 11px', fontSize:13, color:S.text, outline:'none', boxSizing:'border-box' as const }} />
              </div>
              <div style={{ flex:1, minWidth:110 }}>
                <select value={addSource} onChange={e=>setAddSource(e.target.value)}
                  style={{ width:'100%', background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'8px 11px', fontSize:13, color:S.text, outline:'none' }}>
                  {['manual','website','brevo','import','referral'].map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <Btn label={addBusy ? 'Adding…' : 'Add'} small onClick={addOne} />
            </div>
          </div>

          {/* Bulk import modal */}
          {showImport && (
            <div style={{ background:S.surface, border:`1px solid ${S.bord2}`, borderRadius:14, padding:18, marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3 }}>Bulk import — CSV or one email per line</div>
                <button onClick={()=>{ setShowImport(false); setImportText('') }} style={{ background:'none', border:'none', color:S.text3, cursor:'pointer', fontSize:16 }}>✕</button>
              </div>
              <div style={{ fontSize:11.5, color:S.text3, marginBottom:8 }}>Columns: <code style={{ background:'rgba(255,255,255,.06)', padding:'1px 5px', borderRadius:4 }}>email, name, source</code> — only email is required. Or upload a .csv file.</div>
              <div style={{ display:'flex', gap:8, marginBottom:8 }}>
                <label style={{ background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'7px 12px', fontSize:12, color:S.text2, cursor:'pointer' }}>
                  Upload CSV <input type="file" accept=".csv,text/csv" onChange={onCSVFile} style={{ display:'none' }} />
                </label>
              </div>
              <textarea value={importText} onChange={e=>setImportText(e.target.value)} rows={8} placeholder={"email,name,source\njohn@example.com,John Smith,brevo\njane@example.com"}
                style={{ width:'100%', background:S.bg2, border:`1px solid ${S.bord2}`, borderRadius:8, padding:'9px 12px', fontSize:12.5, color:S.text, outline:'none', fontFamily:'JetBrains Mono,monospace', resize:'vertical', boxSizing:'border-box' as const }} />
              <div style={{ display:'flex', gap:8, marginTop:10, alignItems:'center' }}>
                <Btn label={importBusy ? 'Importing…' : `Import ${parseImportText(importText).length} rows`} onClick={handleImport} />
                <span style={{ fontSize:11.5, color:S.text3 }}>Duplicates are skipped automatically</span>
              </div>
            </div>
          )}

          <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', borderBottom:`1px solid ${S.border}` }}>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:S.text }}>{subs.length} active subscribers</div>
              <div style={{ display:'flex', gap:7 }}>
                <Btn label="Bulk import" small outline color={S.text2} onClick={()=>setShowImport(v=>!v)} />
                <Btn label="Export CSV" small outline color={S.text2} onClick={exportCSV} />
              </div>
            </div>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr>{['Email','Name','Source','Status','Subscribed',''].map(h=><th key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3, padding:'10px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'left', whiteSpace:'nowrap' }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {subs.length > 0 ? subs.map((s,i)=>(
                    <tr key={i} style={{ borderBottom:`1px solid rgba(255,255,255,.04)` }}>
                      <td style={{ padding:'11px 14px', fontSize:13, color:S.blue }}><a href={`mailto:${s.email}`} style={{ color:S.blue }}>{s.email}</a></td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:S.text2 }}>{s.name||'—'}</td>
                      <td style={{ padding:'11px 14px' }}><Badge label={s.source} color={S.text3} /></td>
                      <td style={{ padding:'11px 14px' }}><Badge label={s.status} color={S.green} /></td>
                      <td style={{ padding:'11px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.text3 }}>{s.created_at?.slice(0,10)}</td>
                      <td style={{ padding:'11px 14px' }}><Btn label="Remove" small outline color='#EF4444' onClick={()=>{ fetch('/api/admin/newsletter',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:s.id})}); load(); showToast('✓ Removed') }} /></td>
                    </tr>
                  )) : (
                    <tr><td colSpan={6} style={{ padding:'32px 14px', textAlign:'center', color:S.text3, fontSize:13 }}>No subscribers yet — add one above or bulk import your Brevo list</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab==='Compose' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, padding:22 }}>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:15, color:S.text, marginBottom:18 }}>Compose broadcast</div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <SelectField label="Template" value={composeForm.template} onChange={CF('template')} options={['new-briefing','product-update','monthly-digest','custom-html']} />
              <Input label="Subject" value={composeForm.subject} onChange={CF('subject')} placeholder="Email subject line" />
              <SelectField label="Recipients" value={composeForm.recipients} onChange={CF('recipients')} options={[`All active (${subs.length||104})`,'Manual segment']} />
              <div>
                <label style={{ fontSize:12, fontWeight:600, color:S.text, display:'block', marginBottom:5 }}>Email content (HTML)</label>
                <textarea
                  value={composeForm.html_content}
                  onChange={(e)=>CF('html_content')(e.target.value)}
                  placeholder="<h1>Hello subscribers</h1><p>...</p>"
                  rows={10}
                  style={{ width:'100%', background:S.bg2, border:`1px solid ${S.border}`, borderRadius:9, padding:'11px 14px', fontSize:13, color:S.text, outline:'none', fontFamily:'JetBrains Mono,monospace', resize:'vertical' }}
                />
              </div>
              <Input label="Test recipients (comma-separated)" value={composeForm.test_email} onChange={CF('test_email')} placeholder="email@example.com" hint="Used only by the Send test button." />
              <div style={{ display:'flex', gap:8, marginTop:4 }}>
                <Btn label={sending ? 'Sending…' : 'Send test'} outline color={S.text2} onClick={sendTest} />
                <Btn label={sending ? 'Sending…' : `Send to ${subs.length||0}`} onClick={sendBroadcast} />
              </div>
            </div>
          </div>
          <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:14, minHeight:300, padding:16, overflow:'auto' }}>
            {composeForm.html_content ? (
              <div style={{ background:'#fff', borderRadius:8, padding:16, color:'#111' }} dangerouslySetInnerHTML={{ __html: composeForm.html_content }} />
            ) : (
              <div style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8, color:S.text3, fontSize:13 }}>
                <div style={{ fontSize:28, opacity:.3 }}>📧</div>
                Type HTML content to see a live preview
              </div>
            )}
          </div>
        </div>
      )}

      {tab==='History' && (
        <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, overflow:'hidden' }}>
          <div style={{ padding:'14px 18px', borderBottom:`1px solid ${S.border}` }}>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:S.text }}>Send history · {campaigns.length} broadcasts</div>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>{['Subject','Template','Recipients','Status','Opens','Clicks','Sent'].map(h=><th key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3, padding:'10px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'left', whiteSpace:'nowrap' }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {campaigns.length === 0 && (
                  <tr><td colSpan={7} style={{ padding:'24px 14px', textAlign:'center', color:S.text3, fontSize:13 }}>No campaigns sent yet.</td></tr>
                )}
                {campaigns.map((r)=>{
                  const delivered = Number(r.delivered_count)||0
                  const opened = Number(r.opened_count)||0
                  const clicked = Number(r.clicked_count)||0
                  const openRate = delivered ? Math.round((opened/delivered)*100) : 0
                  const ctr = delivered ? Math.round((clicked/delivered)*100) : 0
                  return (
                  <tr key={r.id} onClick={()=>r.status==='sent' && openCtrDrilldown(r)} style={{ borderBottom:`1px solid rgba(255,255,255,.04)`, cursor:r.status==='sent'?'pointer':'default' }}>
                    <td style={{ padding:'12px 14px', fontSize:13, color:S.text, maxWidth:240, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {r.subject}
                      {r.recipient_filter==='test' && <span style={{ marginLeft:8 }}><Badge label="Test" color={S.blue} /></span>}
                    </td>
                    <td style={{ padding:'12px 14px' }}><Badge label={r.template_name || '—'} color={S.text3} /></td>
                    <td style={{ padding:'12px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11.5, color:S.text2 }}>{r.recipient_count}</td>
                    <td style={{ padding:'12px 14px' }}><Badge label={r.status} color={r.status==='sent'?S.green:r.status==='failed'?'#EF4444':S.text3} /></td>
                    <td style={{ padding:'12px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11.5, color:S.text2 }}>{r.status==='sent' ? `${opened} (${openRate}%)` : '—'}</td>
                    <td style={{ padding:'12px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11.5, color:S.text2 }}>{r.status==='sent' ? `${clicked} (${ctr}%)` : '—'}</td>
                    <td style={{ padding:'12px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.text3 }}>{r.sent_at ? r.sent_at.slice(0,10) : '—'}</td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {ctrCampaign && (
        <div onClick={e=>{ if(e.target===e.currentTarget) setCtrCampaign(null) }} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.72)', backdropFilter:'blur(6px)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <div style={{ background:S.surface, border:`1px solid ${S.bord2}`, borderRadius:18, padding:32, width:'100%', maxWidth:760, position:'relative', maxHeight:'88vh', overflowY:'auto' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${S.pink},${S.blue})`, borderRadius:'18px 18px 0 0' }} />
            <button onClick={()=>setCtrCampaign(null)} style={{ position:'absolute', top:14, right:14, width:28, height:28, borderRadius:7, border:`1px solid ${S.border}`, background:'rgba(255,255,255,.05)', color:S.text2, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:18, color:S.text, marginBottom:4 }}>{ctrCampaign.subject}</div>
            <div style={{ fontSize:12, color:S.text3, marginBottom:20 }}>Who opened / clicked · {ctrRecipients.length} recipients</div>
            {ctrLoading ? (
              <div style={{ padding:'24px 0', textAlign:'center', color:S.text3, fontSize:13 }}>Loading…</div>
            ) : (
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead>
                    <tr>{['Email','Status','Opens','Last opened','Clicks','Last clicked'].map(h=><th key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3, padding:'8px 12px', borderBottom:`1px solid ${S.border}`, textAlign:'left', whiteSpace:'nowrap' }}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {ctrRecipients.map(rec=>(
                      <tr key={rec.email} style={{ borderBottom:`1px solid rgba(255,255,255,.04)` }}>
                        <td style={{ padding:'10px 12px', fontSize:12.5, color:S.text }}>{rec.email}</td>
                        <td style={{ padding:'10px 12px' }}><Badge label={rec.status} color={rec.status==='clicked'?S.blue:rec.status==='opened'?S.green:rec.status==='bounced'||rec.status==='blocked'||rec.status==='invalid'?'#EF4444':S.text3} /></td>
                        <td style={{ padding:'10px 12px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.text2 }}>{rec.open_count}</td>
                        <td style={{ padding:'10px 12px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.text3 }}>{rec.last_opened_at ? new Date(rec.last_opened_at).toLocaleString() : '—'}</td>
                        <td style={{ padding:'10px 12px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.text2 }}>{rec.click_count}</td>
                        <td style={{ padding:'10px 12px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.text3 }}>{rec.last_clicked_at ? new Date(rec.last_clicked_at).toLocaleString() : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// ── NAV ────────────────────────────────────────────────────────────────────
const NAV = [
  { id:'overview',     icon:'🏠', label:'Overview',     group:'Content'  },
  { id:'briefings',    icon:'📝', label:'Briefings',    group:'Content'  },
  { id:'team',         icon:'👤', label:'Team',          group:'Content'  },
  { id:'legal',        icon:'⚖️', label:'Legal Hub',    group:'Content'  },
  { id:'jobs',         icon:'💼', label:'Job Openings', group:'Content'  },
  { id:'departments',  icon:'🏢', label:'Departments',  group:'Content'  },
  { id:'upload',       icon:'⬆️', label:'Upload to R2', group:'Media'    },
  { id:'newsletter',   icon:'📬', label:'Newsletter',   group:'Outreach' },
  { id:'submissions',  icon:'📩', label:'Submissions',  group:'System'   },
  { id:'seo',          icon:'🔍', label:'SEO',           group:'System'   },
  { id:'settings',     icon:'⚙️', label:'Settings',     group:'System'   },
]

// ── SUBMISSIONS SECTION ────────────────────────────────────────────────────
const CAT_COLOR: Record<string,string> = { career:S.green, contact:S.blue, fellowship:S.purple, newsletter:S.orange, 'fellowship-cohort-3':S.purple }

function SubmissionsSection({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows]       = useState<Submission[]>([])
  const [expanded, setExpanded] = useState<string|null>(null)
  const [filter, setFilter]   = useState<string>('all')

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/submissions'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  async function toggleRead(s:Submission) {
    await fetch('/api/admin/submissions',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:s.id,is_read:!s.is_read})})
    setRows(prev=>prev.map(r=>r.id===s.id?{...r,is_read:!s.is_read}:r))
  }
  async function del(s:Submission) {
    await fetch('/api/admin/submissions',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:s.id})})
    setRows(prev=>prev.filter(r=>r.id!==s.id)); showToast('✓ Deleted')
  }

  const categories = ['all', ...Array.from(new Set(rows.map(r=>r.category||'contact')))]
  const filtered = filter==='all' ? rows : rows.filter(r=>(r.category||'contact')===filter)
  const unread = rows.filter(r=>!r.is_read).length

  return (
    <>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text, marginBottom:2 }}>Submissions</div>
          <div style={{ fontSize:13, color:S.text2 }}>{rows.length} total · {unread} unread · website_submissions</div>
        </div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {categories.map(c=>(
            <button key={c} onClick={()=>setFilter(c)}
              style={{ padding:'5px 12px', borderRadius:7, border:`1px solid ${filter===c?(CAT_COLOR[c]||S.pink):S.border}`, background:filter===c?`${CAT_COLOR[c]||S.pink}15`:'transparent', color:filter===c?(CAT_COLOR[c]||S.pink):S.text2, fontSize:11.5, fontWeight:600, cursor:'pointer', textTransform:'capitalize' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        {filtered.length===0 && <div style={{ padding:40, textAlign:'center', color:S.text3, fontSize:13 }}>No submissions.</div>}
        {filtered.map(s=>(
          <div key={s.id} style={{ background:s.is_read?S.bg2:S.bg3, border:`1px solid ${s.is_read?S.border:S.bord2}`, borderRadius:10, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', cursor:'pointer' }} onClick={()=>setExpanded(expanded===s.id?null:s.id)}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:s.is_read?'transparent':S.pink, border:`1px solid ${s.is_read?S.border:S.pink}`, flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
                  <span style={{ fontSize:13.5, fontWeight:600, color:S.text }}>{s.name}</span>
                  <Badge label={s.category||'contact'} color={CAT_COLOR[s.category||'contact']||S.blue} />
                </div>
                <div style={{ fontSize:11.5, color:S.text3 }}>{s.email}{s.phone?` · ${s.phone}`:''}</div>
              </div>
              {s.subject && <div style={{ fontSize:12, color:S.text2, maxWidth:220, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flexShrink:0 }}>{s.subject}</div>}
              <div style={{ fontSize:11, color:S.text3, flexShrink:0 }}>{new Date(s.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'2-digit'})}</div>
              <span style={{ fontSize:12, color:S.text3 }}>{expanded===s.id?'▲':'▼'}</span>
            </div>
            {expanded===s.id && (
              <div style={{ borderTop:`1px solid ${S.border}`, padding:'14px 16px', background:'rgba(255,255,255,.02)' }}>
                {s.message && <pre style={{ fontFamily:'Inter,sans-serif', fontSize:13.5, color:S.text2, whiteSpace:'pre-wrap', wordBreak:'break-word', lineHeight:1.7, margin:0, marginBottom:14 }}>{s.message}</pre>}
                {s.metadata && Object.keys(s.metadata).length>0 && (
                  <div style={{ marginBottom:14 }}>
                    {Object.entries(s.metadata).map(([k,v])=>(
                      <div key={k} style={{ fontSize:11.5, color:S.text3 }}><strong style={{color:S.text2}}>{k}:</strong> {String(v)}</div>
                    ))}
                  </div>
                )}
                <div style={{ display:'flex', gap:8 }}>
                  <button onClick={()=>toggleRead(s)} style={{ padding:'5px 12px', borderRadius:7, border:`1px solid ${S.bord2}`, background:'transparent', color:S.text2, fontSize:11.5, fontWeight:600, cursor:'pointer' }}>
                    Mark {s.is_read?'unread':'read'}
                  </button>
                  <a href={`mailto:${s.email}`} style={{ padding:'5px 12px', borderRadius:7, border:`1px solid ${S.blue}40`, background:`${S.blue}10`, color:S.blue, fontSize:11.5, fontWeight:600, textDecoration:'none' }}>
                    Reply
                  </a>
                  <button onClick={()=>del(s)} style={{ padding:'5px 12px', borderRadius:7, border:`1px solid rgba(239,68,68,.3)`, background:'rgba(239,68,68,.08)', color:'#EF4444', fontSize:11.5, fontWeight:600, cursor:'pointer', marginLeft:'auto' }}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

// ── SEO SECTION ────────────────────────────────────────────────────────────
function SeoSection({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows]     = useState<SeoRow[]>([])
  const [editing, setEditing] = useState<SeoRow|'new'|null>(null)
  const [form, setForm]     = useState({ page_path:'', title:'', description:'', og_image:'', keywords:'' })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/seo'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openEdit(r:SeoRow) { setEditing(r); setForm({ page_path:r.page_path, title:r.title||'', description:r.description||'', og_image:r.og_image||'', keywords:r.keywords||'' }) }
  function openNew() { setEditing('new'); setForm({ page_path:'', title:'', description:'', og_image:'', keywords:'' }) }
  async function save() {
    if (!editing) return
    if (editing === 'new') {
      if (!form.page_path.trim()) return
      setSaving(true)
      await fetch('/api/admin/seo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      setSaving(false); setEditing(null); load(); showToast('✓ SEO page added')
      return
    }
    setSaving(true)
    await fetch('/api/admin/seo',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:editing.id,...form})})
    setSaving(false); setEditing(null); load(); showToast('✓ SEO updated')
  }
  async function remove(r:SeoRow) {
    if (!confirm(`Delete SEO entry for ${r.page_path}?`)) return
    await fetch('/api/admin/seo',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:r.id})})
    load(); showToast('✓ SEO entry deleted')
  }
  const F=(k:keyof typeof form)=>(v:string)=>setForm(f=>({...f,[k]:v}))

  const charBg = (len:number, max:number) => len===0?'transparent':len>max?'rgba(239,68,68,.12)':len>max*0.9?'rgba(249,115,22,.12)':'rgba(16,185,129,.08)'
  const charCol = (len:number, max:number) => len===0?S.text3:len>max?'#EF4444':len>max*0.9?S.orange:S.green

  return (
    <>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text, marginBottom:2 }}>SEO</div>
          <div style={{ fontSize:13, color:S.text2 }}>Page-level meta · website_page_seo · {rows.length} pages</div>
        </div>
        <Btn label="+ Add page" onClick={openNew} />
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
        {rows.map(r=>(
          <div key={r.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', background:S.bg2, border:`1px solid ${S.border}`, borderRadius:9 }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:S.text2, width:200, flexShrink:0 }}>{r.page_path}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, color:r.title?S.text:S.text3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.title||<em>No title</em>}</div>
              <div style={{ fontSize:11.5, color:S.text3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginTop:1 }}>{r.description||'No description'}</div>
            </div>
            <div style={{ display:'flex', gap:4, flexShrink:0, alignItems:'center' }}>
              {r.title && <span style={{ ...{ fontSize:10, padding:'2px 7px', borderRadius:4, background:'rgba(16,185,129,.1)', color:S.green, fontFamily:'JetBrains Mono,monospace' } }}>{r.title.length}t</span>}
              {r.description && <span style={{ ...{ fontSize:10, padding:'2px 7px', borderRadius:4, background:'rgba(37,99,235,.1)', color:S.blue, fontFamily:'JetBrains Mono,monospace' } }}>{r.description.length}d</span>}
              <Btn label="Edit" small onClick={()=>openEdit(r)} />
              <button onClick={()=>remove(r)} title="Delete" style={{ fontSize:12, color:S.text3, background:'none', border:'none', cursor:'pointer', padding:'4px 6px' }}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal title={editing === 'new' ? 'Add SEO page' : `SEO — ${editing.page_path}`} onClose={()=>setEditing(null)} onSave={save} saving={saving}>
          {editing === 'new' && (
            <Input label="Page path" value={form.page_path} onChange={F('page_path')} placeholder="/nestlens/intelligence" />
          )}
          <Input label="Title" value={form.title} onChange={F('title')} placeholder="e.g. LabelNest | Data Intelligence Platform"
            hint={`${form.title.length} / 60 chars recommended`} />
          <div style={{ fontSize:10, fontFamily:'JetBrains Mono,monospace', padding:'4px 8px', borderRadius:5, background:charBg(form.title.length,60), color:charCol(form.title.length,60), display:'inline-block', marginTop:-8 }}>
            {form.title.length === 0 ? 'no title' : form.title.length > 60 ? 'too long' : 'good length'}
          </div>
          <Input label="Description" value={form.description} onChange={F('description')} rows={3}
            placeholder="150–160 chars. What this page is about." hint={`${form.description.length} / 160 chars recommended`} />
          <div style={{ fontSize:10, fontFamily:'JetBrains Mono,monospace', padding:'4px 8px', borderRadius:5, background:charBg(form.description.length,160), color:charCol(form.description.length,160), display:'inline-block', marginTop:-8 }}>
            {form.description.length === 0 ? 'no description' : form.description.length > 160 ? 'too long' : 'good length'}
          </div>
          <Input label="OG Image URL" value={form.og_image} onChange={F('og_image')} placeholder="https://assets.labelnest.in/og/..." />
          <Input label="Keywords" value={form.keywords} onChange={F('keywords')} placeholder="comma separated — data intelligence, private markets, ..." />
        </Modal>
      )}
    </>
  )
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function AdminClient() {
  const [section, setSection] = useState<Section>('overview')
  const [toast, setToast] = useState('')
  const router = useRouter()

  function showToast(msg:string) { setToast(msg); setTimeout(()=>setToast(''),3200) }
  async function handleLogout() { await fetch('/api/admin/logout',{method:'POST'}); router.push('/admin/login') }

  const groups = [...new Set(NAV.map(n=>n.group))]

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:S.bg, color:S.text, fontFamily:'Inter,sans-serif' }}>

      {/* Topbar */}
      <div style={{ height:52, background:S.surface, borderBottom:`1px solid ${S.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', flexShrink:0, gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:15, letterSpacing:'-.02em' }}>Label<em style={{ fontStyle:'normal', color:S.pink }}>Nest</em></span>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', padding:'2px 7px', borderRadius:4, background:'rgba(233,30,140,.12)', color:S.pink }}>Admin</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.08em', textTransform:'uppercase', color:S.green }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:S.green }} />Neon connected
          </div>
          <a href="/" target="_blank" style={{ fontSize:12, color:S.text2, textDecoration:'none' }}>View site ↗</a>
          <button onClick={handleLogout} style={{ fontSize:12, color:S.text3, background:'none', border:'none', cursor:'pointer' }}>Sign out</button>
        </div>
      </div>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

        {/* Sidebar */}
        <div style={{ width:192, background:'#111119', borderRight:`1px solid ${S.border}`, flexShrink:0, overflowY:'auto', padding:'10px 0' }}>
          {groups.map(g=>(
            <div key={g}>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:8.5, letterSpacing:'.14em', textTransform:'uppercase', color:S.text3, padding:'10px 16px 4px' }}>{g}</div>
              {NAV.filter(n=>n.group===g).map(n=>(
                <div key={n.id} onClick={()=>setSection(n.id as Section)}
                  style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 16px', fontSize:12.5, cursor:'pointer', color:section===n.id?S.text:S.text2, background:section===n.id?'rgba(255,255,255,.05)':'transparent', borderLeft:`2px solid ${section===n.id?S.pink:'transparent'}`, transition:'all .12s' }}
                  onMouseEnter={e=>{ if(section!==n.id)(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.03)' }}
                  onMouseLeave={e=>{ if(section!==n.id)(e.currentTarget as HTMLElement).style.background='transparent' }}>
                  <span style={{ width:16, fontSize:14, flexShrink:0 }}>{n.icon}</span>
                  {n.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ flex:1, overflowY:'auto', padding:24 }}>

          {section==='overview' && (
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text, marginBottom:4 }}>Overview</div>
              <div style={{ fontSize:13, color:S.text2, marginBottom:20 }}>LabelNest website · Neon DB connected</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:16 }}>
                {[['Briefings','14',S.pink],['Team members','13',S.blue],['Newsletter','104',S.green],['Alumni','39',S.orange]].map(([l,n,c])=>(
                  <div key={l as string} style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:12, padding:'14px 16px' }}>
                    <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:26, color:c as string, letterSpacing:'-.04em', lineHeight:1, marginBottom:4 }}>{n}</div>
                    <div style={{ fontSize:11.5, color:S.text2 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:12, padding:18 }}>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.12em', textTransform:'uppercase', color:S.text3, marginBottom:14 }}>Quick actions</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                    {[['📝','Add a new briefing','briefings'],['👤','Add or update team','team'],['📬','Manage newsletter','newsletter'],['⚖️','Manage legal docs','legal'],['⬆️','Upload to R2','upload']].map(([icon,label,sec])=>(
                      <button key={label as string} onClick={()=>setSection(sec as Section)}
                        style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 14px', background:'rgba(255,255,255,.04)', border:`1px solid ${S.border}`, borderRadius:8, fontSize:13, color:S.text2, cursor:'pointer', fontFamily:'Inter,sans-serif', textAlign:'left', width:'100%', transition:'color .15s' }}
                        onMouseEnter={e=>(e.currentTarget.style.color=S.text)}
                        onMouseLeave={e=>(e.currentTarget.style.color=S.text2)}>
                        {icon}&nbsp; {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:12, padding:18 }}>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.12em', textTransform:'uppercase', color:S.text3, marginBottom:14 }}>DB tables</div>
                  {['website_briefings','website_team_members','website_alumni','website_fellows','website_interns','website_legal_documents','website_job_openings','website_newsletter_subscribers','website_submissions','website_page_seo'].map(t=>(
                    <div key={t} style={{ display:'flex', justifyContent:'space-between', padding:'5px 8px', borderRadius:5, marginBottom:4, background:'rgba(255,255,255,.02)' }}>
                      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.text2 }}>{t}</span>
                      <span style={{ color:S.green, fontSize:10 }}>✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section==='briefings' && <BriefingsSection showToast={showToast} />}
          {section==='team' && <TeamSection showToast={showToast} />}
          {section==='legal' && <LegalSection showToast={showToast} />}
          {section==='jobs' && <JobsSection showToast={showToast} />}
          {section==='departments' && <DepartmentsSection showToast={showToast} />}
          {section==='upload' && <UploadSection showToast={showToast} />}
          {section==='newsletter' && <NewsletterSection showToast={showToast} />}

          {section==='submissions' && <SubmissionsSection showToast={showToast} />}
          {section==='seo' && <SeoSection showToast={showToast} />}

          {section==='settings' && (
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text, marginBottom:4 }}>Settings</div>
              <div style={{ fontSize:13, color:S.text2, marginBottom:20 }}>Environment config · set via Vercel dashboard</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8, maxWidth:520 }}>
                {[['NEON_DATABASE_URL','Neon connection string',S.green],['JWT_SECRET','32-char secret',S.green],['R2_ACCOUNT_ID','Cloudflare account ID',S.orange],['R2_ACCESS_KEY_ID','R2 API key',S.orange],['R2_SECRET_ACCESS_KEY','R2 secret key',S.orange],['R2_PUBLIC_URL','https://assets.labelnest.in',S.orange]].map(([k,v,c])=>(
                  <div key={k as string} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'rgba(255,255,255,.03)', border:`1px solid ${S.border}`, borderRadius:8 }}>
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11.5, color:S.text2 }}>{k}</span>
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, letterSpacing:'.06em', textTransform:'uppercase', padding:'3px 7px', borderRadius:4, background:`${c as string}18`, color:c as string }}>
                      {(k as string).includes('SECRET')||(k as string).includes('KEY')?'●●●●●●●●':v as string}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop:6, fontSize:12, color:S.text3 }}>Set all vars in Vercel dashboard → Settings → Environment Variables</div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', bottom:24, right:24, background:S.surface, border:`1px solid ${S.bord2}`, borderRadius:12, padding:'13px 18px', fontSize:13.5, color:S.text, zIndex:1000, boxShadow:'0 8px 32px rgba(0,0,0,.5)', animation:'slideUp .3s ease' }}>
          {toast}
        </div>
      )}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}
