'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: E } }),
}

const entries = [
  {
    year:     '2024',
    present:  true,
    company:  'BitByBit',
    role:     'Platform Engineer & Marketing',
    type:     'Contract · Part-time · Remote',
    url:      'https://bbyb.dev',
    period:   '2024 – Present',
    location: 'Sri Lanka / Remote',
    summary:  'Working across engineering and marketing at BitByBit — a platform where developers create, share, and play custom game content. Built and maintained CLI tooling for the platform, contributed to a CCTV ingest and processing pipeline, and handled marketing operations to drive platform growth and creator engagement.',
    tags: [
      { t: 'TypeScript',    f: 'font-jetbrains', color: '#7dd3fc' },
      { t: 'CLI Tooling',   f: 'font-fira',       color: '#a78bfa' },
      { t: 'CCTV Pipeline', f: 'font-rdna',       color: '#fb923c' },
      { t: 'Node.js',       f: 'font-blender',    color: '#34d399' },
      { t: 'Marketing',     f: 'font-mono',       color: '#fbbf24' },
    ],
  },
]

function Entry({
  entry, index,
}: { entry: typeof entries[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.35'] })
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* ── Year column ── */}
      <motion.div custom={0} variants={fadeUp}
        className="md:col-span-4 relative flex items-start md:items-center justify-start md:justify-end pr-0 md:pr-14 pt-2">
        {/* Scroll-driven vertical line (desktop) */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.06] hidden md:block">
          <motion.div className="w-full bg-accent absolute top-0"
            style={{ height: lineH, transition: 'background 0.5s ease' }} />
        </div>
        {/* Timeline dot */}
        <div className="absolute right-[-4.5px] top-6 hidden md:block">
          <div className="w-[9px] h-[9px] rounded-full border-2 z-10 relative"
               style={{ borderColor: 'var(--accent)', background: 'var(--bg)', boxShadow: 'var(--accent-glow)' }} />
        </div>

        {/* Big year */}
        <div>
          <span className="font-signal leading-none block outlined"
                style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}>
            {entry.year}
          </span>
          {entry.present && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: 'var(--accent)' }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                      style={{ background: 'var(--accent)' }} />
              </span>
              <span className="font-rdna text-[0.48rem] tracking-[0.28em] uppercase"
                    style={{ color: 'var(--accent)' }}>Present</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Entry card ── */}
      <motion.div custom={1} variants={fadeUp}
        className="md:col-span-8 pl-0 md:pl-14 pb-12">
        <a href={entry.url} target="_blank" rel="noopener noreferrer" className="block group">
        <motion.div className="rounded-sm p-7 md:p-9 relative overflow-hidden"
             style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)' }}
             whileHover={{ borderColor: 'rgba(var(--accent-rgb),0.4)', background: 'rgba(var(--accent-rgb),0.04)' }}
             transition={{ duration: 0.25 }}>
          {/* Accent left bar */}
          <div className="absolute left-0 top-7 bottom-7 w-[2px] rounded-r"
               style={{ background: 'var(--accent)', transition: 'background 0.5s ease' }} />

          <div className="pl-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-signal tracking-[0.04em] text-chalk"
                      style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                    {entry.company}
                  </h3>
                  <span className="font-rdna text-[0.48rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm"
                        style={{
                          color: 'var(--accent)',
                          border: '1px solid rgba(var(--accent-rgb),0.3)',
                          background: 'rgba(var(--accent-rgb),0.07)',
                        }}>
                    Active
                  </span>
                </div>
                <p className="font-systems italic text-sm text-white/45">
                  {entry.role} — {entry.type}
                </p>
                <a href={entry.url} target="_blank" rel="noopener noreferrer"
                   className="font-mono text-[0.58rem] tracking-widest uppercase mt-1 inline-block hover:opacity-60 transition-opacity"
                   style={{ color: 'rgba(var(--accent-rgb),0.5)' }}>
                  {entry.url.replace('https://', '')} ↗
                </a>
              </div>
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6"
                 style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { label: 'DURATION', value: entry.period },
                { label: 'LOCATION', value: entry.location },
                { label: 'ROLE',     value: entry.role },
                { label: 'TYPE',     value: entry.type },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-rdna text-[0.46rem] tracking-[0.24em] uppercase text-white/28 mb-0.5">{label}</p>
                  <p className="font-body text-xs text-white/65">{value}</p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <p className="font-systems text-sm leading-relaxed text-white/58 mb-5">
              {entry.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {entry.tags.map(({ t, f, color }) => (
                <span key={t} className={`tech-chip ${f}`}
                  style={{ color: `${color}cc`, borderColor: `${color}28`, background: `${color}08` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        </a>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} id="experience" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Parallax background year ghost */}
      <motion.div style={{ y: bgY }}
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true">
        <span className="font-signal outlined-chalk opacity-[0.022]"
              style={{ fontSize: '28vw', lineHeight: 1 }}>
          2024
        </span>
      </motion.div>

      {/* Label */}
      <motion.div className="mb-16"
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        custom={0} variants={fadeUp}>
        <span className="section-label">04. Deployment Log</span>
        <h2 className="font-editorial font-bold italic mt-2 text-chalk leading-none"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
          Active Station
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {entries.map((e, i) => <Entry key={e.company} entry={e} index={i} />)}
      </div>
    </section>
  )
}
