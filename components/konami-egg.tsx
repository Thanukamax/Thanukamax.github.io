'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

const credits = [
  {
    label: 'Lava metaball name',
    where: 'hero (PERERA) + footer (THANUKA.DEV)',
    detail: '@property registers 16 percentages so @keyframes can interpolate them, then background-clip: text paints the moving blobs through the letters.',
  },
  {
    label: 'Canny-edge project outlines',
    where: 'each project card',
    detail: 'OpenCV canny pass over reference art, manually cleaned, dropped in as PNGs with invert(1) + mix-blend-mode: screen so they float without a box.',
  },
  {
    label: 'Lenis × Framer single RAF',
    where: 'components/smooth-scroll.tsx',
    detail: 'Lenis runs with autoRaf: false; Framer\'s frame.update drives it. One animation loop instead of two competing ones — no desync stutter.',
  },
  {
    label: 'Golden-angle mobile word cloud',
    where: 'skills section, mobile',
    detail: 'Each skill drifts on a vector rotated by 137.5° × index. No two words drift the same direction, no rhythm to lock onto.',
  },
  {
    label: 'Time-of-day default theme',
    where: 'nav theme toggle',
    detail: 'XE in the morning, CUDA midday, UDNA at night — Colombo time. localStorage takes over once you click the toggle.',
  },
  {
    label: 'Field notes that react to the theme',
    where: 'inside About',
    detail: 'Cycling the nav theme also swaps the field-notes content — Intel pitfalls (VMD on dual-boot, the Graphics Center brightness lie), AMD wins (in-tree drivers, UDNA bet), Nvidia traps (supergfxd hides the dGPU, CUDA moat is academic).',
  },
  {
    label: '600ms preloader with memory',
    where: 'app boot',
    detail: 'sessionStorage remembers you, so the scramble only happens on your first hit. Reduced-motion skips it entirely.',
  },
]

export default function KonamiEgg() {
  const [open, setOpen] = useState(false)
  /* Keep buffer in a ref so keystrokes don't trigger re-renders —
     setOpen only fires on the rare success match. */
  const bufferRef = useRef<string[]>([])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      /* Bail on text inputs */
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const next = [...bufferRef.current, key].slice(-SEQUENCE.length)
      bufferRef.current = next
      if (next.length === SEQUENCE.length && next.every((k, i) => k === SEQUENCE[i])) {
        bufferRef.current = []
        setOpen(true)
      }
    }
    /* External trigger so touch devices (no keyboard) can still open the egg */
    const externalOpen = () => setOpen(true)
    window.addEventListener('keydown', handler)
    window.addEventListener('konami-open', externalOpen)
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('konami-open', externalOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 'var(--z-preloader)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="konami-title"
            className="relative max-w-2xl w-full rounded-sm overflow-hidden"
            style={{
              background: 'rgba(3,3,4,0.97)',
              border: '1px solid rgba(var(--accent-rgb),0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(var(--accent-rgb),0.08)',
            }}
            initial={{ y: 16, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ y: 0,  scale: 1,    filter: 'blur(0px)' }}
            exit={{    y: -8, scale: 0.98, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-2">
              <div>
                <p className="font-rdna text-[0.55rem] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'var(--accent)' }}>
                  ↑↑↓↓←→←→BA
                </p>
                <h2 id="konami-title" className="font-signal leading-none" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', color: 'var(--chalk)' }}>
                  Things made by hand
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close credits"
                className="font-mono text-xs tracking-widest text-white/55 hover:text-white active:scale-90 transition-all duration-150 px-2 py-1"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-6 pb-6 pt-2 space-y-5">
              {credits.map(c => (
                <div key={c.label} className="pl-3 border-l" style={{ borderColor: 'rgba(var(--accent-rgb),0.35)' }}>
                  <p className="font-signal text-base text-chalk" style={{ letterSpacing: '0.02em' }}>{c.label}</p>
                  <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase mt-0.5" style={{ color: 'rgba(var(--accent-rgb),0.7)' }}>
                    {c.where}
                  </p>
                  <p className="font-body text-xs leading-relaxed text-white/70 mt-1.5">{c.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
