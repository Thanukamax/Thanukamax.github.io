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

const stats = [
  { value: '3+', label: 'Years building' },
  { value: '3K+', label: 'Commits shipped' },
  { value: '2', label: 'Active clients' },
  { value: '6', label: 'Team members @ CROW' },
]

const profileStats = [
  { label: 'Focus', value: 'GPU / Game Dev / Systems' },
  { label: 'Engines', value: 'Unity · UE5 · Ka3d' },
  { label: 'Current', value: 'BitByBit (Part-time)' },
  { label: 'Open', value: 'Yes — new contracts' },
]

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section label */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={0}
        variants={fadeUp}
        className="mb-12"
      >
        <span className="section-label">01. Identity</span>
        <h2
          className="font-display font-black tracking-tight text-[#f0f2f7] mt-3"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.0' }}
        >
          Core Identity
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left — profile card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          custom={1}
          variants={fadeUp}
          className="md:col-span-4"
        >
          <div
            className="rounded-2xl p-6 h-full"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg-surface)',
            }}
          >
            {/* Name block */}
            <div className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-1"
                style={{ color: 'var(--accent)' }}>
                PROFILE
              </p>
              <p className="font-display font-bold text-xl text-[#f0f2f7]">
                Thanuka Sehasna Perera
              </p>
              <p className="font-body text-sm text-[rgba(240,242,247,0.5)] mt-0.5">
                Game Developer · GPU Architecture · Systems Builder
              </p>
            </div>

            {/* Stat rows */}
            <div className="space-y-4">
              {profileStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(240,242,247,0.35)]">
                    {stat.label}
                  </span>
                  <span className="font-body text-sm text-[rgba(240,242,247,0.8)]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — text + stats */}
        <div className="md:col-span-8 flex flex-col gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={2}
            variants={fadeUp}
            className="space-y-5"
          >
            <p className="font-body text-base leading-relaxed text-[rgba(240,242,247,0.72)]">
              I build at the intersection of game development, GPU architecture, and systems engineering.
              Whether it&apos;s shipping a Unity game, reverse-engineering NVR firmware with Wireshark,
              or orchestrating Cloudflare microservices for a SDGP client platform — I&apos;m interested
              in the full stack from silicon to screen.
            </p>
            <p className="font-body text-base leading-relaxed text-[rgba(240,242,247,0.72)]">
              Currently embedded at BitByBit and driving CROW — a unified customer interaction intelligence
              platform built by a 6-person team for two live clients. I write TypeScript, C++, Python, and
              enough Rust to be dangerous. I care deeply about UX performance, clean error surfaces,
              and shipping things that feel done.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={3}
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--bg-surface)',
                }}
              >
                <p
                  className="font-display font-black text-3xl"
                  style={{ color: 'var(--accent)' }}
                >
                  {stat.value}
                </p>
                <p className="font-body text-xs text-[rgba(240,242,247,0.5)] mt-1 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
