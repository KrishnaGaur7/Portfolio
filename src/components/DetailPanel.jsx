import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useStore } from '../store/useStore'
import { PROJECTS, SKILLS, CERTIFICATIONS, EXPERIENCE, OWNER } from '../data/portfolio'

const ZONE_CONTENT = {
  about: () => (
    <div className="space-y-4">
      <h1 className="text-4xl font-black text-white">{OWNER.name}</h1>
      <p className="text-brand text-lg tracking-wide">{OWNER.title}</p>
      <p className="text-slate-400 leading-relaxed max-w-lg">
        {OWNER.tagline}
      </p>
      <p className="text-slate-500 text-sm">📍 {OWNER.location}</p>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-green-400 text-xs tracking-widest">{OWNER.status}</span>
      </div>
    </div>
  ),
  skills: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SKILLS.map(cat => (
        <div key={cat.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-cyan-400 text-xs font-bold tracking-widest mb-3 uppercase">{cat.label}</h3>
          <div className="flex flex-wrap gap-2">
            {cat.items.map(item => (
              <span key={item} className="text-xs px-2 py-1 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  projects: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PROJECTS.map(p => (
        <div key={p.name} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all">
          <h3 className="font-bold text-white mb-1">{p.name}</h3>
          <p className="text-xs mb-2" style={{ color: p.color }}>{p.tech}</p>
          <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
          {p.github && <a href={`https://${p.github}`} target="_blank" rel="noreferrer"
            className="text-xs text-brand mt-2 inline-block hover:underline">
            GitHub →
          </a>}
        </div>
      ))}
    </div>
  ),
  certs: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CERTIFICATIONS.map(c => (
        <div key={c.name} className="bg-white/5 rounded-xl p-5 border border-white/10 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: c.color + '22', border: `1px solid ${c.color}44` }}>
            🏆
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{c.name}</h3>
            <p className="text-slate-400 text-xs mt-1">{c.issuer}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  exp: () => (
    <div className="space-y-6">
      {EXPERIENCE.map((e, i) => (
        <div key={i} className="border-l-2 border-pink-400/40 pl-5">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-white">{e.title}</h3>
            <span className="text-pink-400 text-xs">{e.period}</span>
          </div>
          <p className="text-pink-300 text-sm mb-2">{e.company}</p>
          <ul className="space-y-1">
            {e.points.map((p, j) => (
              <li key={j} className="text-slate-400 text-xs flex gap-2">
                <span className="text-pink-400 mt-0.5">▸</span>{p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ),
  contact: () => (
    <div className="space-y-4 text-center">
      <p className="text-slate-400">Let's build something legendary together.</p>
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {[
          { label: 'GitHub', val: OWNER.github, icon: '⚡' },
          { label: 'Location', val: OWNER.location, icon: '📍' },
          { label: 'Status', val: OWNER.status, icon: '🟢' },
          { label: 'Email', val: 'dbuu.cse2021@gmail.com', icon: '📧' },
        ].map(item => (
          <div key={item.label} className="bg-white/5 rounded-xl p-3 border border-white/10 text-left">
            <div className="text-lg mb-1">{item.icon}</div>
            <div className="text-white text-xs font-bold">{item.label}</div>
            <div className="text-slate-400 text-xs mt-0.5 break-all">{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export default function DetailPanel() {
  const currentZone = useStore(s => s.currentZone)
  const detailOpen  = useStore(s => s.detailOpen)
  const closeDetail = useStore(s => s.closeDetail)
  const panelRef    = useRef()

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeDetail() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!panelRef.current) return
    if (detailOpen) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
      )
    }
  }, [detailOpen])

  if (!detailOpen || !currentZone) return null
  const Content = ZONE_CONTENT[currentZone.id]

  return (
    <div ref={panelRef} className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-xl flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black tracking-widest" style={{ color: currentZone.color }}>
            [ {currentZone.label} ]
          </h2>
          <button onClick={closeDetail}
            className="text-slate-400 hover:text-white text-2xl leading-none cursor-pointer bg-transparent border-0">
            ✕
          </button>
        </div>
        {Content && <Content />}
      </div>
    </div>
  )
}
