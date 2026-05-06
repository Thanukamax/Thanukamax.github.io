'use client'

import { motion, type Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section label */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={0}
        variants={fadeUp}
        className="mb-12"
      >
        <span className="section-label">04. Station</span>
        <h2
          className="font-display font-black tracking-tight text-[#f0f2f7] mt-3"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.0' }}
        >
          Active Station
        </h2>
      </motion.div>

      {/* BitByBit card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={1}
        variants={fadeUp}
        className="relative rounded-2xl p-6 md:p-10 overflow-hidden"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.025)',
        }}
      >
        {/* 3px left accent bar */}
        <div
          className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full"
          style={{ background: 'var(--accent)', transition: 'background-color 0.4s ease' }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between mb-8 pl-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-display font-black text-2xl md:text-3xl text-[#f0f2f7]">
                BitByBit
              </h3>
              {/* Active badge with pulsing dot */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-mono tracking-widest uppercase"
                style={{
                  color: 'var(--accent)',
                  border: '1px solid rgba(var(--accent-rgb, 34, 211, 238), 0.3)',
                  background: 'rgba(var(--accent-rgb, 34, 211, 238), 0.08)',
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: 'var(--accent)' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ background: 'var(--accent)' }}
                  />
                </span>
                Active
              </div>
            </div>
            <a
              href="https://bitbybit.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{ color: 'rgba(var(--accent-rgb, 34, 211, 238), 0.6)' }}
            >
              bitbybit.dev ↗
            </a>
          </div>
        </div>

        {/* 12-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 pl-4">
          {/* Left — metadata */}
          <div className="md:col-span-4 space-y-4">
            {[
              { label: 'Role', value: 'Game Developer (Part-time)' },
              { label: 'Type', value: 'Contract · Remote' },
              { label: 'Duration', value: '2024 – Present' },
              { label: 'Location', value: 'Sri Lanka / Remote' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(240,242,247,0.35)] mb-0.5">
                  {item.label}
                </p>
                <p className="font-body text-sm text-[rgba(240,242,247,0.75)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Right — description + chips */}
          <div className="md:col-span-8">
            <p className="font-body text-sm leading-relaxed text-[rgba(240,242,247,0.65)] mb-6">
              Building game experiences and tools at BitByBit — a platform where developers
              create, share, and play custom game content. Responsibilities span gameplay
              systems engineering, tooling for content creators, and working across
              Unity and custom engine pipelines to keep the platform&apos;s creative loop
              fast and frictionless.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Unity', 'C#', 'Game Systems', 'TypeScript', 'Platform Tools'].map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
