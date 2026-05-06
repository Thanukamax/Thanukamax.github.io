'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TICKER = [
  'GAME DEVELOPER', 'GPU ARCHITECTURE', 'SYSTEMS ENGINEER',
  'RUST', 'C++', 'UNITY', 'CLOUDFLARE WORKERS', 'RDNA',
  'TAURI V2', 'BLENDER', 'OPEN TO CONTRACTS', 'ARCH LINUX',
  'NOBARA KDE', 'GHIDRA', 'WIRESHARK', 'SRI LANKA',
]

const links = [
  { label: 'Email',    href: 'mailto:contact@thanukamax.dev' },
  { label: 'GitHub',   href: 'https://github.com/thanukamax' },
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
        borderColor: 'rgba(255,255,255,0.06)',
        background: `
          radial-gradient(ellipse 120% 55% at 50% 100%, rgba(var(--accent-rgb), 0.09) 0%, transparent 65%),
          radial-gradient(ellipse 60% 40% at 10% 80%,  rgba(var(--accent-rgb), 0.05) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 90% 90%,  rgba(var(--accent-rgb), 0.05) 0%, transparent 60%),
          #030304
        `,
        transition: 'background 0.5s ease',
      }}
    >

      {/* ── Marquee ticker ── */}
      <div className="relative overflow-hidden py-4 border-b"
           style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((word, i) => (
            <span key={i} className="inline-flex items-center gap-6 font-rdna text-[0.52rem] tracking-[0.3em] uppercase text-white/20 px-6">
              {word}
              <span className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(var(--accent-rgb),0.35)' }} />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="px-6 md:px-12 pt-16 pb-10 max-w-[1600px] mx-auto">

        {/* Giant name — hover reveals accent fill from below */}
        <div
          className="relative overflow-hidden mb-12 group"
          style={{ lineHeight: '0.88' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          data-cursor-hover
        >
          {/* Base: outlined */}
          <h2 className="font-signal block leading-none select-none"
              style={{
                fontSize: 'clamp(1.8rem, 11vw, 15rem)',
                WebkitTextStroke: '1px rgba(255,255,255,0.12)',
                WebkitTextFillColor: 'transparent',
              }}>
            THANUKA.DEV
          </h2>

          {/* lava-drive animates --lp* vars; motion.h2 just reads them via background */}
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

        {/* ── Links + meta row ── */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">

          {/* Left: links */}
          <div className="flex flex-wrap items-center gap-6">
            {links.map(({ label, href }) => (
              <a key={label} href={href}
                 target={href.startsWith('mailto') ? undefined : '_blank'}
                 rel="noopener noreferrer"
                 className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-white/38 hover:text-white/75 transition-colors duration-300 group/link">
                {label}
                <span className="inline-block ml-1 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
              </a>
            ))}
          </div>

          {/* Right: location + time */}
          <div className="text-right">
            <p className="font-jetbrains text-[0.58rem] tracking-[0.18em] text-white/25 uppercase mb-1">
              Colombo, Sri Lanka · UTC+05:30
            </p>
            <div className="flex items-center justify-end gap-2">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
              <span className="font-rdna text-[0.5rem] tracking-[0.25em] uppercase"
                    style={{ color: 'var(--accent)' }}>
                Available for contracts
              </span>
            </div>
          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-10 pt-6"
             style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="font-rdna text-[0.48rem] tracking-[0.22em] text-white/22">
            © {new Date().getFullYear()} Thanuka Sehasna Perera
          </p>
          <p className="font-mono text-[0.48rem] tracking-widest text-white/18">
            Silicon Grimoire v0.1 · Next.js · Framer Motion · Lenis
          </p>
        </div>
      </div>
    </footer>
  )
}
