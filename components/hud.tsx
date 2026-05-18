'use client'

import { useEffect, useState } from 'react'

/* Section IDs from app/page.tsx — kept in sync with the actual <section id="…"> values. */
const SECTION_IDS = ['hero', 'projects', 'pipeline', 'systems', 'notes', 'about', 'contact'] as const
const THEME_LABEL: Record<string, string> = { '': 'XE', cuda: 'CUDA', udna: 'UDNA' }

export default function HUD() {
  const [section,   setSection]   = useState<string>('hero')
  const [theme,     setTheme]     = useState<string>('')
  const [scroll,    setScroll]    = useState<number>(0)
  /* Per-pageload session hash, mirror of the Receipt's identity hash so the HUD
     feels like part of the same system surface. */
  const [sessionId] = useState<string>(() => {
    if (typeof window === 'undefined') return '000000'
    const arr = new Uint8Array(3)
    crypto.getRandomValues(arr)
    return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('')
  })

  /* One rAF-throttled scroll listener feeds both the top-edge progress hairline
     and the active-section indicator. Center-of-viewport hit-test handles tall
     horizontal-scroll sections (like Projects) correctly — IntersectionRatio
     would have under-weighted them because they span multiple viewports. */
  useEffect(() => {
    let rafId: number | null = null
    const compute = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0)

      const center = window.innerHeight / 2
      let active: string = 'hero'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= center && r.bottom >= center) { active = id; break }
      }
      setSection(active)
      rafId = null
    }
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    compute()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  /* Theme is mutated on <html> by nav + the boot script; we mirror it for the
     THEME label without owning the source of truth. */
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme ?? '')
    const obs = new MutationObserver(() => setTheme(document.documentElement.dataset.theme ?? ''))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 60 }}
    >
      {/* Scroll-progress hairline at the very top edge */}
      <div
        className="absolute top-0 left-0 h-px"
        style={{
          width: `${scroll}%`,
          background: 'var(--accent)',
          boxShadow: '0 0 6px rgba(var(--accent-rgb), 0.45)',
          transition: 'width 80ms linear, background 250ms var(--ease-quart-out)',
        }}
      />

      {/* Corner brackets — four L-shapes anchoring the viewport edges */}
      <div className="absolute top-3 left-3 w-3 h-3">
        <span className="absolute top-0 left-0 w-3 h-px" style={{ background: 'rgba(232,232,240,0.22)' }} />
        <span className="absolute top-0 left-0 w-px h-3" style={{ background: 'rgba(232,232,240,0.22)' }} />
      </div>
      <div className="absolute top-3 right-3 w-3 h-3">
        <span className="absolute top-0 right-0 w-3 h-px" style={{ background: 'rgba(232,232,240,0.22)' }} />
        <span className="absolute top-0 right-0 w-px h-3" style={{ background: 'rgba(232,232,240,0.22)' }} />
      </div>
      <div className="absolute bottom-3 left-3 w-3 h-3">
        <span className="absolute bottom-0 left-0 w-3 h-px" style={{ background: 'rgba(232,232,240,0.22)' }} />
        <span className="absolute bottom-0 left-0 w-px h-3" style={{ background: 'rgba(232,232,240,0.22)' }} />
      </div>
      <div className="absolute bottom-3 right-3 w-3 h-3">
        <span className="absolute bottom-0 right-0 w-3 h-px" style={{ background: 'rgba(232,232,240,0.22)' }} />
        <span className="absolute bottom-0 right-0 w-px h-3" style={{ background: 'rgba(232,232,240,0.22)' }} />
      </div>

      {/* Top-left: SECTOR · {active} */}
      <div
        className="absolute top-[5.25rem] left-5 font-mono text-[8px] tracking-[0.24em] uppercase"
        style={{
          color: 'var(--accent)',
          fontVariantNumeric: 'tabular-nums',
          transition: 'color 250ms var(--ease-quart-out)',
        }}
      >
        <span style={{ opacity: 0.55 }}>SECTOR · </span>{section}
      </div>

      {/* Top-right: {THEME} · MODE */}
      <div
        className="absolute top-[5.25rem] right-5 font-mono text-[8px] tracking-[0.24em] uppercase text-right"
        style={{
          color: 'var(--accent)',
          fontVariantNumeric: 'tabular-nums',
          transition: 'color 250ms var(--ease-quart-out)',
        }}
      >
        {THEME_LABEL[theme] ?? 'XE'}<span style={{ opacity: 0.55 }}> · MODE</span>
      </div>

      {/* Bottom-left: TSP · {sessionHash} */}
      <div
        className="absolute bottom-6 left-5 font-mono text-[8px] tracking-[0.24em] uppercase"
        style={{
          color: 'rgba(232,232,240,0.42)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span style={{ opacity: 0.7 }}>TSP · </span>{sessionId}
      </div>
    </div>
  )
}
