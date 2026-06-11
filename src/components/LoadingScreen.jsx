import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useStore } from '../store/useStore'

export default function LoadingScreen() {
  const setLoading = useStore(s => s.setLoading)
  const containerRef = useRef()
  const barRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()
    tl.to(barRef.current, { width: '100%', duration: 2.5, ease: 'power2.inOut' })
      .to(containerRef.current, { opacity: 0, duration: 0.5, delay: 0.3 })
      .call(() => setLoading(false))
  }, [])

  return (
    <div ref={containerRef}
      className="fixed inset-0 z-50 bg-dark flex flex-col items-center justify-center font-mono">
      <div className="text-6xl font-black text-brand mb-4 tracking-widest animate-pulse">KG</div>
      <div className="text-slate-400 text-sm tracking-widest mb-8">
        AI Engineer • Developer • Builder
      </div>
      <div className="w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <div ref={barRef} className="h-full bg-brand rounded-full" style={{ width: '0%' }} />
      </div>
      <div className="text-slate-600 text-xs tracking-widest mt-4">LOADING WORLD...</div>
    </div>
  )
}
