'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: E },
  }),
}

const stats = [
  { value: '3+',  label: 'Years building' },
  { value: '3K+', label: 'Commits shipped' },
  { value: '2',   label: 'Active clients' },
  { value: '6',   label: 'Team @ CROW' },
]

const profile = [
  { label: 'FOCUS',   value: 'GPU / Game Dev / Systems' },
  { label: 'ENGINES', value: 'Unity · UE5 · Ka3d' },
  { label: 'STATION', value: 'BitByBit (Part-time)' },
  { label: 'STATUS',  value: 'Open — new contracts' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section ref={ref} id="about" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Parallax accent text in background */}
      <motion.div
        style={{ y }}
        className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-signal text-[22vw] leading-none outlined-chalk opacity-[0.025]">
          IDENTITY
        </span>
      </motion.div>

      {/* Label */}
      <motion.div className="mb-12"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={0} variants={fadeUp}>
        <span className="section-label">01. Identity</span>
        <h2 className="font-editorial font-bold italic mt-2 text-chalk leading-none"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
          Core Identity
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

        {/* Profile card */}
        <motion.div className="md:col-span-4"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          custom={1} variants={fadeUp}>
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
            <div className="space-y-4">
              {profile.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-rdna text-[0.5rem] tracking-[0.25em] uppercase text-white/30 mb-0.5">
                    {label}
                  </p>
                  <p className="font-body text-sm text-white/70">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="md:col-span-8 flex flex-col gap-8">
          <motion.div className="space-y-5"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            custom={2} variants={fadeUp}>
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

          {/* Stats */}
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            custom={3} variants={fadeUp}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-sm p-4"
                   style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
                <p className="font-signal leading-none" style={{ fontSize: '2.2rem', color: 'var(--accent)' }}>
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
