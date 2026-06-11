import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { gsap } from 'gsap'
import { ZONES } from '../data/portfolio'

function Minimap() {
  const canvasRef = useRef()
  const avatarPos = useStore(s => s.avatarPosition)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 110, S = W / 64

    ctx.fillStyle = '#020C1A'
    ctx.fillRect(0, 0, W, W)

    ZONES.forEach(z => {
      const mx = (z.position[0] + 32) * S
      const mz = (z.position[2] + 32) * S
      ctx.beginPath()
      ctx.arc(mx, mz, 5, 0, Math.PI * 2)
      ctx.fillStyle = z.color
      ctx.fill()
    })

    const px = (avatarPos.x + 32) * S
    const pz = (avatarPos.z + 32) * S
    ctx.beginPath()
    ctx.arc(px, pz, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#38BDF8'
    ctx.strokeStyle = '#0EA5E9'
    ctx.lineWidth = 1.5
    ctx.fill()
    ctx.stroke()
  }, [avatarPos])

  return <canvas ref={canvasRef} width={110} height={110} style={{ width: '110px', height: '110px' }} />
}

export default function HUD() {
  const currentZone = useStore(s => s.currentZone)
  const openDetail  = useStore(s => s.openDetail)
  const panelRef    = useRef()

  useEffect(() => {
    if (!panelRef.current) return
    if (currentZone) {
      gsap.fromTo(panelRef.current, { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.to(panelRef.current, { x: 300, opacity: 0, duration: 0.3 })
    }
  }, [currentZone])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 font-mono">
      {/* Top Left */}
      <div className="absolute top-4 left-4 text-xs tracking-widest text-slate-400">
        <div className="text-brand font-bold text-sm mb-1">KG.DEV</div>
        <div>ZONE: {currentZone?.label || 'WORLD'}</div>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 text-right text-xs tracking-widest">
        <div className="text-brand font-bold text-sm mb-1">PORTFOLIO v2.0</div>
        <div className="text-slate-600">WALK TO EXPLORE</div>
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-40">
        <div className="absolute top-1/2 left-0 w-full h-px bg-brand" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-brand" />
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-600 text-xs tracking-widest uppercase">
        WASD — Move &nbsp;|&nbsp; E — Interact &nbsp;|&nbsp; ESC — Close
      </div>

      {/* Minimap */}
      <div className="absolute bottom-4 right-4 border border-slate-700 rounded-lg overflow-hidden opacity-80">
        <Minimap />
      </div>

      {/* Zone proximity panel */}
      <div ref={panelRef} className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-auto"
        style={{ opacity: 0, transform: 'translateX(300px)' }}>
        {currentZone && (
          <div className="bg-dark/85 backdrop-blur-md rounded-xl p-4 w-52 border-l-4"
            style={{ borderColor: currentZone.color }}>
            <h3 className="font-bold text-sm tracking-widest mb-2" style={{ color: currentZone.color }}>
              {currentZone.label}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              Walk into the zone to explore this section.
            </p>
            <button onClick={openDetail}
              className="text-xs tracking-widest uppercase px-3 py-1.5 rounded border pointer-events-auto cursor-pointer transition-all hover:opacity-80"
              style={{ borderColor: currentZone.color, color: currentZone.color, background: 'transparent' }}>
              EXPLORE →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
