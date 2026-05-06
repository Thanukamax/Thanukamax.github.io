'use client'

import { motion, type Variants } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: E },
  }),
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div className="mb-12"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={0} variants={fadeUp}>
        <span className="section-label">04. Station</span>
        <h2 className="font-editorial font-bold italic mt-2 text-chalk leading-none"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
          Active Station
        </h2>
      </motion.div>

      <motion.div
        className="relative rounded-sm p-7 md:p-10 overflow-hidden"
        style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)' }}
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        custom={1} variants={fadeUp}>

        {/* Left accent bar */}
        <div className="absolute left-0 top-8 bottom-8 w-[2px] rounded-r"
             style={{ background: 'var(--accent)', transition: 'background 0.5s ease' }} />

        <div className="pl-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="font-signal text-chalk tracking-[0.04em]"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
                  BitByBit
                </h3>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-rdna text-[0.5rem] tracking-[0.2em] uppercase"
                     style={{
                       color: 'var(--accent)',
                       border: '1px solid rgba(var(--accent-rgb),0.3)',
                       background: 'rgba(var(--accent-rgb),0.07)',
                     }}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                          style={{ background: 'var(--accent)' }} />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                          style={{ background: 'var(--accent)' }} />
                  </span>
                  Active
                </div>
              </div>
              <a href="https://bitbybit.dev" target="_blank" rel="noopener noreferrer"
                 className="font-mono text-[0.6rem] tracking-widest uppercase hover:opacity-60 transition-opacity"
                 style={{ color: 'rgba(var(--accent-rgb),0.55)' }}>
                bitbybit.dev ↗
              </a>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            <div className="md:col-span-4 space-y-4">
              {[
                { label: 'Role',     value: 'Game Developer (Part-time)' },
                { label: 'Type',     value: 'Contract · Remote' },
                { label: 'Duration', value: '2024 – Present' },
                { label: 'Location', value: 'Sri Lanka / Remote' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-rdna text-[0.5rem] tracking-[0.25em] uppercase text-white/30 mb-0.5">
                    {label}
                  </p>
                  <p className="font-body text-sm text-white/68">{value}</p>
                </div>
              ))}
            </div>

            <div className="md:col-span-8">
              <p className="font-systems text-sm leading-relaxed text-white/60 mb-6">
                Building game experiences and tools at BitByBit — a platform where developers
                create, share, and play custom game content. Responsibilities span gameplay
                systems engineering, tooling for content creators, and working across Unity
                and custom engine pipelines to keep the platform&apos;s creative loop fast
                and frictionless.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'Unity',          f: 'font-blender' },
                  { t: 'C#',             f: 'font-fira' },
                  { t: 'Game Systems',   f: 'font-mono' },
                  { t: 'TypeScript',     f: 'font-mono' },
                  { t: 'Platform Tools', f: 'font-mono' },
                ].map(({ t, f }) => (
                  <span key={t} className={`tech-chip ${f}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
