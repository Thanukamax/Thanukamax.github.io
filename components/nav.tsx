'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

type Theme = '' | 'udna' | 'cuda'
const themes: { label: string; value: Theme }[] = [
  { label: 'XE',   value: '' },
  { label: 'UDNA', value: 'udna' },
  { label: 'CUDA', value: 'cuda' },
]

const links = [
  { label: 'Identity',  href: '#about' },
  { label: 'Archive',   href: '#projects' },
  { label: 'Stack',     href: '#systems' },
  { label: 'Station',   href: '#experience' },
  { label: 'Signal',    href: '#contact' },
]

export default function Nav() {
  const [themeIdx, setThemeIdx] = useState(0)
  const { scrollY, scrollYProgress } = useScroll()

  const bgOpacity   = useTransform(scrollY, [0, 90], [0, 0.92])
  const bgColor     = useMotionTemplate`rgba(3,3,4,${bgOpacity})`
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const cycleTheme = () => {
    const next = (themeIdx + 1) % themes.length
    setThemeIdx(next)
    document.documentElement.dataset.theme = themes[next].value
  }

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[1px]"
      style={{ backgroundColor: bgColor }}>
      {/* Progress bar */}
      <motion.div className="absolute top-0 left-0 h-px"
        style={{ width: progressWidth, background: 'var(--accent)', transition: 'background 0.5s ease' }} />

      <nav className="mx-auto max-w-7xl px-6 md:px-12 h-15 flex items-center justify-between" style={{ height: '3.75rem' }}>

        {/* Logo */}
        <a href="#"
           className="font-rdna text-sm font-bold tracking-[0.22em] uppercase hover:opacity-70 transition-opacity"
           style={{ color: 'var(--accent)' }}>
          TSP
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href}
                 className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-white/45 hover:text-white/80 transition-colors duration-300">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <button
          onClick={cycleTheme}
          className="font-rdna text-[0.55rem] font-semibold tracking-[0.22em] uppercase px-3 py-1.5 rounded-sm border transition-all duration-300 hover:opacity-80"
          style={{
            color: 'var(--accent)',
            borderColor: 'rgba(var(--accent-rgb),0.3)',
            background: 'rgba(var(--accent-rgb),0.05)',
          }}
          aria-label="Cycle GPU theme">
          {themes[themeIdx].label}
        </button>
      </nav>
    </motion.header>
  )
}
