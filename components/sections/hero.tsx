'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen flex flex-col justify-between pt-20 pb-10 px-6 md:px-10 overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% 0%, transparent 40%, #06070e 100%)',
        }}
        aria-hidden="true"
      />

      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span
            className="font-mono text-xs tracking-[0.12em] uppercase"
            style={{ color: 'rgba(var(--accent-rgb, 34, 211, 238), 0.8)' }}
          >
            Available for new projects
          </span>
        </div>
        <span className="font-mono text-xs text-[rgba(240,242,247,0.35)] tracking-widest hidden sm:block">
          UTC +05:30 · Sri Lanka
        </span>
      </div>

      {/* Center hero text — parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-start leading-none select-none"
      >
        <h1
          className="font-display font-black tracking-tighter"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 12rem)', lineHeight: '0.92' }}
        >
          <span className="block text-[#f0f2f7]">THANUKA</span>
          <span
            className="block outlined"
            style={{
              WebkitTextStroke: '1px var(--accent)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SEHASNA
          </span>
          <span className="block text-[#f0f2f7]">PERERA</span>
        </h1>
      </motion.div>

      {/* Bottom row */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Role tags */}
        <div className="flex flex-wrap gap-2">
          {['Game Developer', 'GPU Architecture', 'Systems Builder'].map((tag) => (
            <span key={tag} className="tech-chip">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#010508] transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--accent)',
              fontFamily: 'var(--font-manrope)',
            }}
          >
            View Work ↓
          </a>
          <a
            href="https://github.com/thanukamax"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/5"
            style={{
              border: '1px solid rgba(var(--accent-rgb, 34, 211, 238), 0.3)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-manrope)',
            }}
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <motion.div
          className="w-px h-16"
          style={{ backgroundColor: 'rgba(var(--accent-rgb, 34, 211, 238), 0.4)' }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
