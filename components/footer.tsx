'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Receipt from '@/components/receipt'

const TICKER = [
  'GAME DEVELOPER', 'GPU ARCHITECTURE', 'SYSTEMS ENGINEER',
  'RUST', 'C++', 'UNITY', 'CLOUDFLARE WORKERS', 'RDNA',
  'TAURI V2', 'BLENDER', 'OPEN TO CONTRACTS', 'ARCH LINUX',
  'NOBARA KDE', 'GHIDRA', 'WIRESHARK', 'SRI LANKA',
]

const links = [
  { label: 'Email',    href: 'mailto:contact@thanukamax.dev' },
  { label: 'GitHub',   href: 'https://github.com/Thanukamax' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/thanukamax' },
]

export default function Footer() {
  const [hovered,  setHovered]  = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const doubled = [...TICKER, ...TICKER]

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: `
          radial-gradient(ellipse 120% 55% at 50% 100%, rgba(var(--accent-rgb), 0.09) 0%, transparent 65%),
          radial-gradient(ellipse 60% 40% at 10% 80%,  rgba(var(--accent-rgb), 0.05) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 90% 90%,  rgba(var(--accent-rgb), 0.05) 0%, transparent 60%),
          #030304
        `,
        transition: 'background 0.5s ease',
      }}
    >

      {/* ── Marquee ticker (contrast lifted from /20 → /45) ── */}
      <div className="relative overflow-hidden py-4 border-b"
           style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((word, i) => (
            <span key={i} className="inline-flex items-center gap-6 font-rdna text-[0.54rem] tracking-[0.3em] uppercase text-white/45 px-6">
              {word}
              <span className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(var(--accent-rgb),0.5)' }} />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="px-6 md:px-12 pt-16 pb-10 max-w-[1600px] mx-auto">

        {/* Giant name — hover reveals lava fill from below */}
        <div
          className="relative overflow-hidden mb-12 group"
          style={{ lineHeight: '0.88' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Base: outlined */}
          <h2 className="font-signal block leading-none select-none"
              style={{
                fontSize: 'clamp(1.8rem, 11vw, 15rem)',
                WebkitTextStroke: '1px rgba(255,255,255,0.18)',
                WebkitTextFillColor: 'transparent',
              }}>
            THANUKA.DEV
          </h2>

          {/* lava-drive is now a structural wrapper; the actual animation
              source lives on <html> so hero+footer stay in phase. */}
          <div className="lava-drive absolute inset-0 pointer-events-none" aria-hidden="true">
            <motion.h2
              className="absolute inset-0 font-signal block leading-none select-none lava-text"
              animate={{ clipPath: (hovered || isMobile) ? 'inset(0% 0 0% 0)' : 'inset(100% 0 0% 0)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(1.8rem, 11vw, 15rem)' }}
              aria-hidden="true"
            >
              THANUKA.DEV
            </motion.h2>
          </div>
        </div>

        {/* ── Links + Receipt row ── */}
        <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-10">

          {/* Left column: links + availability */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-6">
              {links.map(({ label, href }) => (
                <a key={label} href={href}
                   target={href.startsWith('mailto') ? undefined : '_blank'}
                   rel="noopener noreferrer"
                   className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-white/65 hover:text-white active:scale-[0.97] transition-all duration-150 group/link inline-flex items-center">
                  {label}
                  <span className="inline-block ml-1 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
              <span className="font-rdna text-[0.52rem] tracking-[0.25em] uppercase"
                    style={{ color: 'var(--accent)' }}>
                Available for contracts
              </span>
            </div>
          </div>

          {/* Right column: the Receipt — a memento of the visit */}
          <Receipt />
        </div>

        {/* ── Copyright bar — Konami sequence as a visible hint for the curious ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-10 pt-6"
             style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-rdna text-[0.5rem] tracking-[0.22em] text-white/45">
            © {new Date().getFullYear()} Thanuka Sehasna Perera
          </p>
          <p className="font-mono text-[0.5rem] tracking-widest text-white/35 flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('built-open'))}
              className="hover:text-white active:scale-[0.97] transition-all duration-150 uppercase tracking-widest"
              aria-label="How was this built"
            >
              Silicon Grimoire v0.1 · Next.js · Framer Motion · Lenis
            </button>
            {/* Konami hint — visible on all viewports, tappable so touch devices
                without a keyboard can still reach the credits */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('konami-open'))}
              className="active:scale-[0.95] hover:text-white transition-all duration-150"
              style={{ color: 'rgba(var(--accent-rgb), 0.4)' }}
              aria-label="Open credits — Things made by hand"
            >
              ↑↑↓↓←→←→BA
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('palette-open'))}
              className="active:scale-[0.95] hover:text-white transition-all duration-150"
              style={{ color: 'rgba(var(--accent-rgb), 0.4)' }}
              aria-label="Open command palette"
            >
              ⌘K
            </button>
          </p>
        </div>
      </div>
    </footer>
  )
}
