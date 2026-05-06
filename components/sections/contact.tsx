'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: E },
  }),
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={ref} id="contact" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background parallax word */}
      <motion.div style={{ y }}
        className="absolute -left-8 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true">
        <span className="font-signal text-[22vw] leading-none outlined-chalk opacity-[0.022]">
          SIGNAL
        </span>
      </motion.div>

      {/* Label */}
      <motion.div className="mb-10"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={0} variants={fadeUp}>
        <span className="section-label">05. Signal</span>
      </motion.div>

      {/* Heading */}
      <motion.div className="mb-10"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={1} variants={fadeUp}>
        <h2 className="font-signal leading-none tracking-[0.03em] text-chalk"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}>
          Let&apos;s build
        </h2>
        <h2 className="font-abyssal font-black text-shimmer leading-none"
            style={{ fontSize: 'clamp(3rem, 8.5vw, 8.5rem)' }}>
          something sharp.
        </h2>
      </motion.div>

      {/* Description */}
      <motion.p
        className="font-systems italic text-base leading-relaxed text-white/55 max-w-xl mb-10"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={2} variants={fadeUp}>
        Open to game dev contracts, GPU-adjacent engineering, systems research, and
        high-craft creative tech projects. If you&apos;re building something that needs
        both depth and polish — let&apos;s talk.
      </motion.p>

      {/* CTA buttons */}
      <motion.div className="flex flex-wrap items-center gap-4 mb-24"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={3} variants={fadeUp}>
        <a href="mailto:contact@thanukamax.dev"
           className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-signal tracking-[0.12em] text-sm text-black hover:opacity-85 transition-opacity"
           style={{ background: 'var(--accent)' }}>
          Send Signal →
        </a>
        <a href="https://github.com/thanukamax" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-xs tracking-widest hover:bg-white/[0.03] transition-colors"
           style={{ border: '1px solid rgba(var(--accent-rgb),0.25)', color: 'var(--accent)' }}>
          GitHub ↗
        </a>
        <a href="https://linkedin.com/in/thanukamax" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-xs tracking-widest hover:bg-white/[0.03] transition-colors"
           style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(232,232,240,0.5)' }}>
          LinkedIn ↗
        </a>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={4} variants={fadeUp}>
        <p className="font-rdna text-[0.5rem] tracking-[0.22em] text-white/28">
          © {new Date().getFullYear()} Thanuka Sehasna Perera
        </p>
        <p className="font-mono text-[0.5rem] tracking-widest text-white/20">
          Next.js · Framer Motion · Lenis
        </p>
      </motion.div>
    </section>
  )
}
