'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]
const SPRING = { type: 'spring' as const, duration: 0.5, bounce: 0 }

const stats = [
  { value: '3+',  label: 'Years building',  color: '#a78bfa' },
  { value: '3K+', label: 'Commits shipped', color: '#7dd3fc' },
  { value: '2',   label: 'Active clients',  color: '#34d399' },
  { value: '6',   label: 'Team @ CROW',     color: '#fbbf24' },
]

const profile = [
  { label: 'FOCUS',   value: 'GPU / Game Dev / Systems', color: '#7dd3fc' },
  { label: 'ENGINES', value: 'Unity · UE5 · Ka3d',       color: '#fb7185' },
  { label: 'STATION', value: 'BitByBit (Part-time)',      color: '#fbbf24' },
  { label: 'STATUS',  value: 'Open — new contracts',     color: '#34d399' },
]

export default function About() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section ref={ref} id="about" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-signal text-[22vw] leading-none outlined-chalk opacity-[0.025]">
          IDENTITY
        </span>
      </motion.div>

      {/* Label — clip-path wipe from left */}
      <motion.div className="mb-12"
        initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: false, amount: 0.1, margin: '-80px' }}
        transition={{ duration: 0.75, ease: E }}>
        <span className="section-label">01. Identity</span>
        <h2 className="font-editorial font-bold italic mt-2 text-chalk leading-none"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
          Core Identity
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

        {/* Profile card — slide from left */}
        <motion.div className="md:col-span-4"
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: -36 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1, margin: '-60px' }}
          transition={{ ...SPRING, delay: 0.1 }}>
          <div className="rounded-sm p-6 h-full"
               style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
            <div className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-rdna text-[0.55rem] tracking-[0.28em] uppercase mb-2"
                 style={{ color: 'var(--accent)' }}>Profile</p>
              <p className="font-editorial font-semibold text-lg text-chalk">
                Thanuka Sehasna Perera
              </p>
              <p className="font-systems italic text-sm text-white/45 mt-1">
                Game Developer · GPU Architecture · Systems Builder
              </p>
            </div>
            <div className="space-y-3">
              {profile.map(({ label, value, color }) => (
                <div key={label} className="pl-3 border-l" style={{ borderColor: `${color}55` }}>
                  <p className="font-rdna text-[0.48rem] tracking-[0.25em] uppercase mb-0.5"
                     style={{ color: `${color}99` }}>
                    {label}
                  </p>
                  <p className="font-body text-sm" style={{ color: `${color}dd` }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="md:col-span-8 flex flex-col gap-8">
          {/* Body text — materialise up */}
          <motion.div className="space-y-5"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1, margin: '-60px' }}
            transition={{ ...SPRING, delay: 0.18 }}>
            <p className="font-systems text-base leading-relaxed text-white/65">
              I build at the intersection of game development, GPU architecture, and systems
              engineering. Whether it&apos;s shipping a Unity game, reverse-engineering NVR
              firmware with Wireshark, or orchestrating Cloudflare microservices for a live
              client platform — I care about the full stack from silicon to screen.
            </p>
            <p className="font-systems text-base leading-relaxed text-white/65">
              Currently embedded at BitByBit and driving CROW — a unified customer interaction
              intelligence platform built by a 6-person team for two live clients. I write
              TypeScript, C++, Python, and enough Rust to be dangerous.
            </p>
          </motion.div>

          {/* Stats — slide from right */}
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 32 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1, margin: '-60px' }}
            transition={{ ...SPRING, delay: 0.28 }}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-sm p-4"
                   style={{ border: `1px solid ${s.color}22`, background: `${s.color}08` }}>
                <p className="font-signal leading-none" style={{ fontSize: '2.2rem', color: s.color }}>
                  {s.value}
                </p>
                <p className="font-mono text-[0.6rem] text-white/40 mt-1.5 leading-snug tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
