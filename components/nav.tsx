'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

type Theme = '' | 'udna' | 'cuda'
const themes: { label: string; value: Theme }[] = [
  { label: 'XE', value: '' },
  { label: 'UDNA', value: 'udna' },
  { label: 'CUDA', value: 'cuda' },
]

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Systems', href: '#systems' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [themeIndex, setThemeIndex] = useState(0)
  const { scrollY, scrollYProgress } = useScroll()

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.94])
  const bgColor = useMotionTemplate`rgba(6, 7, 14, ${bgOpacity})`

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const cycleTheme = () => {
    const next = (themeIndex + 1) % themes.length
    setThemeIndex(next)
    document.documentElement.dataset.theme = themes[next].value
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: bgColor }}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-px bg-accent"
        style={{ width: progressWidth, backgroundColor: 'var(--accent)', transition: 'background-color 0.4s ease' }}
      />

      <nav className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-orbitron text-sm font-bold tracking-[0.2em] uppercase"
          style={{ color: 'var(--accent)', transition: 'color 0.4s ease' }}
        >
          TSP
        </a>

        {/* Nav Links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm text-[rgba(240,242,247,0.6)] hover:text-[#f0f2f7] transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* GPU Theme Toggle */}
        <button
          onClick={cycleTheme}
          className="font-orbitron text-[0.6rem] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-md border transition-all duration-300"
          style={{
            color: 'var(--accent)',
            borderColor: 'rgba(var(--accent-rgb, 34, 211, 238), 0.3)',
            background: 'rgba(var(--accent-rgb, 34, 211, 238), 0.05)',
          }}
          aria-label="Cycle GPU theme"
        >
          {themes[themeIndex].label}
        </button>
      </nav>
    </motion.header>
  )
}
