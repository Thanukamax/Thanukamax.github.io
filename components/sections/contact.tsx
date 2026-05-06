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

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section label */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={0}
        variants={fadeUp}
        className="mb-10"
      >
        <span className="section-label">05. Signal</span>
      </motion.div>

      {/* Large CTA heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={1}
        variants={fadeUp}
        className="mb-10"
      >
        <h2
          className="font-display font-black tracking-tight leading-none"
          style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
        >
          <span className="block text-[#f0f2f7]">Let&apos;s build</span>
          <span
            className="block"
            style={{
              WebkitTextStroke: '1px var(--accent)',
              WebkitTextFillColor: 'transparent',
              transition: 'color 0.4s ease',
            }}
          >
            something sharp.
          </span>
        </h2>
      </motion.div>

      {/* Description */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={2}
        variants={fadeUp}
        className="font-body text-base leading-relaxed text-[rgba(240,242,247,0.6)] max-w-xl mb-10"
      >
        Open to game dev contracts, GPU-adjacent engineering, systems research,
        and high-craft creative tech projects. If you&apos;re building something that
        needs both depth and polish — let&apos;s talk.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={3}
        variants={fadeUp}
        className="flex flex-wrap items-center gap-4 mb-24"
      >
        <a
          href="mailto:contact@thanukamax.dev"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-[#010508] transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: 'var(--accent)',
            fontFamily: 'var(--font-manrope)',
            transition: 'background-color 0.4s ease, transform 0.2s ease',
          }}
        >
          Send Signal →
        </a>
        <a
          href="https://github.com/thanukamax"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/5"
          style={{
            border: '1px solid rgba(var(--accent-rgb, 34, 211, 238), 0.3)',
            color: 'var(--accent)',
            fontFamily: 'var(--font-manrope)',
          }}
        >
          GitHub ↗
        </a>
        <a
          href="https://linkedin.com/in/thanukamax"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/5"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'rgba(240, 242, 247, 0.6)',
            fontFamily: 'var(--font-manrope)',
          }}
        >
          LinkedIn ↗
        </a>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={4}
        variants={fadeUp}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6"
        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
      >
        <p className="font-mono text-xs tracking-wide text-[rgba(240,242,247,0.3)]">
          © {new Date().getFullYear()} Thanuka Sehasna Perera
        </p>
        <p className="font-mono text-xs tracking-wide text-[rgba(240,242,247,0.25)]">
          Built with Next.js · Framer Motion
        </p>
      </motion.div>
    </section>
  )
}
