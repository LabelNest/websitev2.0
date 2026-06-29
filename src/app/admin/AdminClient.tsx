'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ── Types ──────────────────────────────────────────────────────────────────
type Section = 'overview'|'briefings'|'team'|'legal'|'jobs'|'departments'|'upload'|'newsletter'|'submissions'|'seo'|'settings'

interface Briefing { id:string; slug:string; title:string; author_name:string; scope:string; date:string; read_time:string; is_featured:boolean; cover_image:string|null }
interface TeamMember { id:string; name:string; role:string; department:string; bio:string|null; linkedin_url:string|null; image_url:string|null; sort_order:number; is_active:boolean }
interface Alumni { id:string; name:string; role:string; department:string; email:string|null; linkedin_url:string|null; image_url:string|null; now_at_company:string|null; now_at_role:string|null; now_at_url:string|null; update_token:string|null; is_active:boolean }
interface Fellow { id:string; name:string; role:string; cohort:string; department:string|null; linkedin_url:string|null; image_url:string|null; is_active:boolean; sort_order:number }
interface Job { id:string; title:string; department:string; type:string; location:string; complexity:string; apply_url:string; is_active:boolean }
interface LegalDoc { id:string; slug:string; title:string; intro:string; body_markdown:string; version:string; effective_date:string; last_updated:string }
interface Subscriber { id:string; email:string; name:string|null; source:string; status:string; created_at:string }
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
function TeamMembersPanel({ showToast }: { showToast:(m:string)=>void }) {
  const [rows, setRows] = useState<TeamMember[]>([])
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<TeamMember|null>(null)
  const blank = { name:'',role:'',department:'',bio:'',linkedin_url:'',image_url:'',sort_order:'99',is_active:true }
  const [form, setForm] = useState(blank)

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/team'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(m:TeamMember) { setEditing(m); setForm({ name:m.name,role:m.role,department:m.department,bio:m.bio||'',linkedin_url:m.linkedin_url||'',image_url:m.image_url||'',sort_order:String(m.sort_order),is_active:m.is_active }); setModal(true) }

  async function handleSave() {
    setSaving(true)
    const payload={...form,sort_order:Number(form.sort_order)}; const method=editing?'PUT':'POST'; const body=editing?{...payload,id:editing.id}:payload
    await fetch('/api/admin/team',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false); setModal(false); load(); showToast(`✓ Team member ${editing?'updated':'added'}`)
  }
  async function handleDelete(m:TeamMember) { await fetch('/api/admin/team',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:m.id})}); load(); showToast('✓ Removed') }

  const F=(k:keyof typeof form)=>(v:string)=>setForm(f=>({...f,[k]:v}))
  const tableRows=rows.map(m=>({ Name:m.name, Role:m.role, Department:m.department, Status:<Badge label={m.is_active?'Active':'Inactive'} color={m.is_active?S.green:S.text3} />, __raw:m }))

  return (
    <>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}><Btn label="+ Add member" onClick={openAdd} /></div>
      <Table cols={['Name','Role','Department','Status']} rows={tableRows} onEdit={openEdit} onDelete={handleDelete} />
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
          <Input label="Bio" value={form.bio} onChange={F('bio')} rows={3} placeholder="Short biography" />
          <Input label="LinkedIn URL" value={form.linkedin_url} onChange={F('linkedin_url')} placeholder="https://linkedin.com/in/..." />
          <Input label="Photo URL (R2)" value={form.image_url} onChange={F('image_url')} placeholder="https://assets.labelnest.in/team/..." />
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
  const blank = { name:'',role:'',department:'',email:'',linkedin_url:'',image_url:'',now_at_company:'',now_at_role:'',now_at_url:'',is_active:true }
  const [form, setForm] = useState(blank)

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/alumni'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd()  { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(a:Alumni) { setEditing(a); setForm({ name:a.name,role:a.role,department:a.department,email:a.email||'',linkedin_url:a.linkedin_url||'',image_url:a.image_url||'',now_at_company:a.now_at_company||'',now_at_role:a.now_at_role||'',now_at_url:a.now_at_url||'',is_active:a.is_active }); setModal(true) }
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
                    ? <Badge label={`Now at ${a.now_at_company}`} color={S.green} />
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
          <Input label="Photo URL (R2)" value={form.image_url} onChange={F('image_url')} placeholder="https://assets.labelnest.in/team/..." />
          <div style={{ borderTop:`1px solid ${S.border}`, paddingTop:12, marginTop:4 }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3, marginBottom:10 }}>Now at (current employer)</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <Input label="Company" value={form.now_at_company} onChange={F('now_at_company')} placeholder="Company name" />
              <Input label="Role" value={form.now_at_role} onChange={F('now_at_role')} placeholder="Current role" />
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
  const blank = { name:'',role:'Research Fellow',cohort:'NestLabs · Cohort 1',department:'',linkedin_url:'',image_url:'',is_active:true,sort_order:'99' }
  const [form, setForm] = useState(blank)

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/fellows'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openAdd() { setEditing(null); setForm(blank); setModal(true) }
  function openEdit(f:Fellow) { setEditing(f); setForm({ name:f.name,role:f.role,cohort:f.cohort,department:f.department||'',linkedin_url:f.linkedin_url||'',image_url:f.image_url||'',is_active:f.is_active,sort_order:String(f.sort_order) }); setModal(true) }

  async function handleSave() {
    setSaving(true); const payload={...form,sort_order:Number(form.sort_order)}; const method=editing?'PUT':'POST'; const body=editing?{...payload,id:editing.id}:payload
    await fetch('/api/admin/fellows',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false); setModal(false); load(); showToast(`✓ Fellow ${editing?'updated':'added'}`)
  }
  async function handleDelete(f:Fellow) { await fetch('/api/admin/fellows',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:f.id})}); load(); showToast('✓ Removed') }

  const F=(k:keyof typeof form)=>(v:string)=>setForm(ff=>({...ff,[k]:v}))
  const tableRows=rows.map(f=>({ Name:f.name, Role:f.role, Cohort:f.cohort, Status:<Badge label={f.is_active?'Active':'Hidden'} color={f.is_active?S.purple:S.text3} />, __raw:f }))

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
          <SelectField label="Cohort" value={form.cohort} onChange={F('cohort')} options={['NestLabs · Cohort 1','NestTech · Cohort 1']} />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <Input label="Department (optional)" value={form.department} onChange={F('department')} placeholder="e.g. Data Research" />
            <Input label="Sort order" value={form.sort_order} onChange={F('sort_order')} type="number" />
          </div>
          <Input label="LinkedIn URL" value={form.linkedin_url} onChange={F('linkedin_url')} placeholder="https://linkedin.com/in/..." />
          <Input label="Photo URL (R2)" value={form.image_url} onChange={F('image_url')} placeholder="https://assets.labelnest.in/team/..." />
          <Toggle label="Active (visible on team page)" checked={form.is_active} onChange={v=>setForm(f=>({...f,is_active:v}))} />
        </Modal>
      )}
    </>
  )
}

// ── TEAM SECTION (3 tabs) ──────────────────────────────────────────────────
function TeamSection({ showToast }: { showToast:(m:string)=>void }) {
  const [tab, setTab] = useState('Team Members')
  return (
    <>
      <SectionHeader title="Team Management" desc="Members · Alumni · Nestling Fellows · website_team_members, website_alumni, website_fellows" />
      <SubTabs tabs={['Team Members','Alumni','Nestling Fellows']} active={tab} onSelect={setTab} />
      {tab==='Team Members' && <TeamMembersPanel showToast={showToast} />}
      {tab==='Alumni' && <AlumniPanel showToast={showToast} />}
      {tab==='Nestling Fellows' && <FellowsPanel showToast={showToast} />}
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
const HISTORY_ROWS = [
  { subject:'Got a Minute? We\'d Love Your Feedback', template:'custom-html', recipients:104, opens:'30 (34)', clicks:'5 (25)', open_rate:29, ctr:17, sent:'10/06/2026' },
  { subject:'New drop. Same obsession.', template:'custom-html', recipients:104, opens:'44 (46)', clicks:'9 (39)', open_rate:42, ctr:20, sent:'02/06/2026' },
  { subject:'Weekly Newsletter is Here!', template:'custom-html', recipients:88, opens:'27 (28)', clicks:'13 (63)', open_rate:31, ctr:48, sent:'26/05/2026' },
  { subject:'test', template:'monthly-digest', recipients:1, opens:'1 (1)', clicks:'0 (0)', open_rate:100, ctr:0, sent:'21/05/2026' },
]

function NewsletterSection({ showToast }: { showToast:(m:string)=>void }) {
  const [tab, setTab] = useState('Subscribers (104)')
  const [subs, setSubs] = useState<Subscriber[]>([])
  const [composeForm, setComposeForm] = useState({ subject:'', template:'new-briefing', recipients:'all', test_email:'ankit@labelnest.in' })

  const load = useCallback(async()=>{ try{ const r=await fetch('/api/admin/newsletter'); const d=await r.json(); setSubs(d.rows||[]) }catch{} },[])
  useEffect(()=>{ load() },[load])

  async function sendBroadcast() {
    await fetch('/api/admin/newsletter/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(composeForm)})
    showToast(`✓ Broadcast sent to ${subs.length} subscribers`)
  }
  async function sendTest() {
    await fetch('/api/admin/newsletter/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...composeForm,recipients:composeForm.test_email,test:true})})
    showToast(`✓ Test sent to ${composeForm.test_email}`)
  }

  const CF=(k:keyof typeof composeForm)=>(v:string)=>setComposeForm(f=>({...f,[k]:v}))

  return (
    <>
      <SectionHeader title="Newsletter" desc={`${subs.length} subscribers · website_newsletter_subscribers · SendGrid`} />
      <SubTabs tabs={['Subscribers (104)','Compose','History (4)']} active={tab} onSelect={setTab} />

      {tab==='Subscribers (104)' && (
        <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', borderBottom:`1px solid ${S.border}` }}>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:S.text }}>{subs.length || 104} active subscribers</div>
            <div style={{ display:'flex', gap:7 }}>
              <Btn label="Bulk import" small outline color={S.text2} />
              <Btn label="Export CSV" small outline color={S.text2} />
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
                  // fallback static list matching HTML
                  ['tusharanand.thakur@labelnest.in','trisha.c@labelnest.in','suhas.bhat@labelnest.in','rahul.kumar@labelnest.in','prajwal.pb@labelnest.in','pallavi.1@labelnest.in','nidhi.singh@labelnest.in','jeevan.prakash.k.v@labelnest.in','himani.bhatt@labelnest.in','ankit.suman@labelnest.in','srishti.shiyal@labelnest.in','sowmya.polakonda@labelnest.in','richa.sharma@labelnest.in','sumedha.pandey@labelnest.in'].map((email,i)=>(
                    <tr key={i} style={{ borderBottom:`1px solid rgba(255,255,255,.04)` }}>
                      <td style={{ padding:'11px 14px', fontSize:13 }}><a href={`mailto:${email}`} style={{ color:S.blue }}>{email}</a></td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:S.text2 }}>—</td>
                      <td style={{ padding:'11px 14px' }}><Badge label="manual" color={S.text3} /></td>
                      <td style={{ padding:'11px 14px' }}><Badge label="active" color={S.green} /></td>
                      <td style={{ padding:'11px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.text3 }}>26/05/2026</td>
                      <td style={{ padding:'11px 14px' }}><Btn label="Remove" small outline color='#EF4444' /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='Compose' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, padding:22 }}>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:15, color:S.text, marginBottom:18 }}>Compose broadcast</div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <SelectField label="Template" value={composeForm.template} onChange={CF('template')} options={['new-briefing','product-update','monthly-digest','custom-html']} />
              <Input label="Subject" value={composeForm.subject} onChange={CF('subject')} placeholder="Email subject line" />
              <SelectField label="Recipients" value={composeForm.recipients} onChange={CF('recipients')} options={[`All active (${subs.length||104})`,'Manual segment']} />
              <Input label="Test recipients (comma-separated)" value={composeForm.test_email} onChange={CF('test_email')} placeholder="email@example.com" hint="Used only by the Send test button." />
              <div style={{ display:'flex', gap:8, marginTop:4 }}>
                <Btn label="Send test" outline color={S.text2} onClick={sendTest} />
                <Btn label={`Send to ${subs.length||104}`} onClick={sendBroadcast} />
              </div>
            </div>
          </div>
          <div style={{ background:S.bg3, border:`1px solid ${S.border}`, borderRadius:14, minHeight:300, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8, color:S.text3, fontSize:13 }}>
            <div style={{ fontSize:28, opacity:.3 }}>📧</div>
            Configure the template to see preview
          </div>
        </div>
      )}

      {tab==='History (4)' && (
        <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, overflow:'hidden' }}>
          <div style={{ padding:'14px 18px', borderBottom:`1px solid ${S.border}` }}>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:S.text }}>Send history · 4 broadcasts</div>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>{['Subject','Template','Recipients','Opens','Clicks','Open rate','CTR','Sent'].map(h=><th key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:S.text3, padding:'10px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'left', whiteSpace:'nowrap' }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {HISTORY_ROWS.map((r,i)=>(
                  <tr key={i} style={{ borderBottom:`1px solid rgba(255,255,255,.04)` }}>
                    <td style={{ padding:'12px 14px', fontSize:13, color:S.text, maxWidth:240, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.subject}</td>
                    <td style={{ padding:'12px 14px' }}><Badge label={r.template} color={S.text3} /></td>
                    <td style={{ padding:'12px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11.5, color:S.text2 }}>{r.recipients}</td>
                    <td style={{ padding:'12px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11.5, color:S.text2 }}>{r.opens}</td>
                    <td style={{ padding:'12px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11.5, color:S.text2 }}>{r.clicks}</td>
                    <td style={{ padding:'12px 14px' }}><span style={{ color:r.open_rate>40?S.green:S.orange, fontFamily:'JetBrains Mono,monospace', fontSize:11.5 }}>{r.open_rate}%</span></td>
                    <td style={{ padding:'12px 14px' }}><span style={{ color:S.blue, fontFamily:'JetBrains Mono,monospace', fontSize:11.5 }}>{r.ctr}%</span></td>
                    <td style={{ padding:'12px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:11, color:S.text3 }}>{r.sent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  const [editing, setEditing] = useState<SeoRow|null>(null)
  const [form, setForm]     = useState({ title:'', description:'', og_image:'', keywords:'' })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async()=>{ const r=await fetch('/api/admin/seo'); const d=await r.json(); setRows(d.rows||[]) },[])
  useEffect(()=>{ load() },[load])

  function openEdit(r:SeoRow) { setEditing(r); setForm({ title:r.title||'', description:r.description||'', og_image:r.og_image||'', keywords:r.keywords||'' }) }
  async function save() {
    if (!editing) return
    setSaving(true)
    await fetch('/api/admin/seo',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:editing.id,...form})})
    setSaving(false); setEditing(null); load(); showToast('✓ SEO updated')
  }
  const F=(k:keyof typeof form)=>(v:string)=>setForm(f=>({...f,[k]:v}))

  const charBg = (len:number, max:number) => len===0?'transparent':len>max?'rgba(239,68,68,.12)':len>max*0.9?'rgba(249,115,22,.12)':'rgba(16,185,129,.08)'
  const charCol = (len:number, max:number) => len===0?S.text3:len>max?'#EF4444':len>max*0.9?S.orange:S.green

  return (
    <>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:20, color:S.text, marginBottom:2 }}>SEO</div>
        <div style={{ fontSize:13, color:S.text2 }}>Page-level meta · website_page_seo · {rows.length} pages</div>
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
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal title={`SEO — ${editing.page_path}`} onClose={()=>setEditing(null)} onSave={save} saving={saving}>
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
                  {['website_briefings','website_team_members','website_alumni','website_fellows','website_legal_documents','website_job_openings','website_newsletter_subscribers','website_submissions','website_page_seo'].map(t=>(
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
