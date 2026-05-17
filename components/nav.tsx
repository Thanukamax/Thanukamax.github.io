'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion'

type Theme = '' | 'udna' | 'cuda'
const themes: { label: string; value: Theme }[] = [
  { label: 'XE',   value: '' },
  { label: 'UDNA', value: 'udna' },
  { label: 'CUDA', value: 'cuda' },
]
const STORAGE_KEY = 'tsp-theme'

/* Plain-English nav (was Identity / Archive / Stack / Station / Signal —
   private vocabulary blocked recruiters per impeccable critique).
   Experience section was merged into About; Interconnect graph dropped. */
const links = [
  { label: 'Work',    href: '#projects' },
  { label: 'Skills',  href: '#systems' },
  { label: 'Notes',   href: '#notes' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [themeIdx, setThemeIdx] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const { scrollY, scrollYProgress } = useScroll()

  const bgOpacity     = useTransform(scrollY, [0, 90], [0, 0.92])
  const bgColor       = useMotionTemplate`rgba(3,3,4,${bgOpacity})`
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  /* Sync React state with whatever the boot script wrote to the html dataset. */
  useEffect(() => {
    const current = (document.documentElement.dataset.theme ?? '') as Theme
    const idx = themes.findIndex(t => t.value === current)
    if (idx >= 0) setThemeIdx(idx)
  }, [])

  /* Active section indicator — highest-ratio section wins. */
  useEffect(() => {
    const ids = links.map(l => l.href.replace('#', ''))
    const els = ids
      .map(id => ({ id, el: document.getElementById(id) }))
      .filter((s): s is { id: string; el: HTMLElement } => !!s.el)
    if (els.length === 0) return

    const ratios: Record<string, number> = {}
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) ratios[e.target.id] = e.intersectionRatio
      let bestId = ''
      let bestRatio = 0
      for (const [id, ratio] of Object.entries(ratios)) {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id }
      }
      if (bestRatio > 0.18) setActiveId(bestId)
    }, { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] })

    els.forEach(s => obs.observe(s.el))
    return () => obs.disconnect()
  }, [])

  const cycleTheme = () => {
    const next = (themeIdx + 1) % themes.length
    setThemeIdx(next)
    const value = themes[next].value
    document.documentElement.dataset.theme = value
    try { localStorage.setItem(STORAGE_KEY, value) } catch {}
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 backdrop-blur-[1px]"
      style={{ backgroundColor: bgColor, zIndex: 'var(--z-nav)' }}
    >
      {/* Scroll progress hairline */}
      <motion.div className="absolute top-0 left-0 h-px"
        style={{ width: progressWidth, background: 'var(--accent)', transition: 'background 0.5s ease' }} />

      <nav className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between" style={{ height: '3.75rem' }}>

        {/* Logo */}
        <a href="#"
           aria-label="Thanuka Sehasna Perera — home"
           className="font-rdna text-sm font-bold tracking-[0.22em] uppercase hover:opacity-70 active:scale-[0.97] transition-all duration-150"
           style={{ color: 'var(--accent)' }}>
          TSP
        </a>

        {/* Desktop links — lifted from /45 to /65, active section highlighted */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(({ label, href }) => {
            const isActive = href === `#${activeId}`
            return (
              <li key={href}>
                <a href={href}
                   aria-current={isActive ? 'true' : undefined}
                   className="font-mono text-[0.66rem] tracking-[0.12em] uppercase transition-colors duration-150 inline-flex items-center gap-2"
                   style={{ color: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.65)' }}>
                  <motion.span
                    className="block w-1 h-1 rounded-full"
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ background: 'var(--accent)', boxShadow: isActive ? '0 0 6px var(--accent)' : 'none' }}
                  />
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            className="font-rdna text-[0.55rem] font-semibold tracking-[0.22em] uppercase px-3 py-1.5 rounded-sm border hover:opacity-80 active:scale-[0.97] transition-all duration-150"
            style={{
              color: 'var(--accent)',
              borderColor: 'rgba(var(--accent-rgb),0.3)',
              background: 'rgba(var(--accent-rgb),0.05)',
            }}
            aria-label={`GPU theme: ${themes[themeIdx].label}. Click to cycle.`}>
            {themes[themeIdx].label}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] active:scale-[0.92] transition-transform duration-150"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-5 h-px rounded-full"
              style={{ background: 'var(--accent)' }}
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="block w-5 h-px rounded-full"
              style={{ background: 'var(--accent)' }}
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="block w-5 h-px rounded-full"
              style={{ background: 'var(--accent)' }}
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.22 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown — origin-aware reveal from hamburger (top right) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, scaleY: 0.92, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scaleY: 1,    filter: 'blur(0px)' }}
            exit={{   opacity: 0, scaleY: 0.96, filter: 'blur(4px)' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden border-t"
            style={{
              transformOrigin: 'top right',
              borderColor: 'rgba(255,255,255,0.05)',
              background: 'rgba(3,3,4,0.97)',
            }}
          >
            <ul className="px-6 py-5 flex flex-col gap-4">
              {links.map(({ label, href }) => {
                const isActive = href === `#${activeId}`
                return (
                  <li key={href}>
                    <a
                      href={href}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => setMenuOpen(false)}
                      className="font-mono text-[0.68rem] tracking-[0.18em] uppercase transition-colors duration-150 inline-flex items-center gap-2"
                      style={{ color: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.7)' }}
                    >
                      <motion.span
                        className="block w-1 h-1 rounded-full"
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ background: 'var(--accent)', boxShadow: isActive ? '0 0 6px var(--accent)' : 'none' }}
                      />
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
