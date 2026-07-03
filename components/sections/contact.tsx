'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion'
import { toast } from 'sonner'

const EMAIL = 'thanukasehasnaperera@gmail.com'

function copyEmail() {
  if (!navigator.clipboard) { toast.error('Clipboard unavailable'); return }
  navigator.clipboard.writeText(EMAIL)
    .then(() => toast.success('Email copied'))
    .catch(() => toast.error('Copy failed'))
}

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

export default function Contact() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  /* Jakub enter recipe baked into the variant so every fadeUp child blurs in. */
  const fadeUp: Variants = reduced
    ? {
        hidden:  { opacity: 0 },
        visible: (i: number) => ({ opacity: 1, transition: { delay: i * 0.08, duration: 0.3 } }),
      }
    : {
        hidden:  { opacity: 0, y: 28, filter: 'blur(4px)' },
        visible: (i: number) => ({
          opacity: 1, y: 0, filter: 'blur(0px)',
          transition: { delay: i * 0.12, duration: 0.8, ease: E },
        }),
      }

  return (
    <section ref={ref} id="contact" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background parallax word */}
      <motion.div style={{ y }}
        className="absolute -left-8 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true">
        <span className="font-signal text-[22vw] leading-none outlined-chalk opacity-[0.022]">
          CONTACT
        </span>
      </motion.div>

      {/* Label */}
      <motion.div className="mb-10"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={0} variants={fadeUp}>
        <span className="section-label">Contact</span>
      </motion.div>

      {/* Heading — gradient shimmer replaced with solid colour (impeccable ban on gradient text) */}
      <motion.div className="mb-10"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={1} variants={fadeUp}>
        <h2 className="font-signal leading-none tracking-[0.03em] text-chalk"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}>
          Let&apos;s build
        </h2>
        <h2 className="font-abyssal font-black leading-none"
            style={{
              fontSize: 'clamp(3rem, 8.5vw, 8.5rem)',
              color: 'var(--accent)',
              transition: 'color 0.5s ease',
            }}>
          something sharp.
        </h2>
      </motion.div>

      {/* Description — contrast lifted /55 → /70 */}
      <motion.p
        className="font-systems italic text-base leading-relaxed text-white/70 max-w-xl mb-10"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={2} variants={fadeUp}>
        Open to game dev contracts, GPU-adjacent engineering, systems research, and
        high-craft creative tech projects. If you&apos;re building something that needs
        both depth and polish — let&apos;s talk.
      </motion.p>

      {/* CTA buttons — :active scale added across the row */}
      <motion.div className="flex flex-wrap items-center gap-4 mb-6"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={3} variants={fadeUp}>
        <a href={`mailto:${EMAIL}`}
           className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-signal tracking-[0.12em] text-sm text-black hover:opacity-90 active:scale-[0.97] transition-all duration-150"
           style={{ background: 'var(--accent)' }}>
          Send Signal →
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-xs tracking-widest hover:bg-white/[0.04] active:scale-[0.97] transition-all duration-150"
          style={{ border: '1px solid rgba(var(--accent-rgb),0.3)', color: 'var(--accent)' }}>
          Copy email ⎘
        </button>
        <a href="https://github.com/Thanukamax" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-xs tracking-widest hover:bg-white/[0.04] active:scale-[0.97] transition-all duration-150"
           style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(232,232,240,0.7)' }}>
          GitHub ↗
        </a>
        <a href="https://www.linkedin.com/in/thanuka-perera-889240337" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-xs tracking-widest hover:bg-white/[0.04] active:scale-[0.97] transition-all duration-150"
           style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(232,232,240,0.7)' }}>
          LinkedIn ↗
        </a>
      </motion.div>

      {/* Hint that ⌘K does this and a lot more */}
      <motion.p
        className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-white/40 mb-24"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={4} variants={fadeUp}>
        Or hit <kbd className="px-1.5 py-0.5 mx-0.5 rounded-sm border" style={{ borderColor: 'rgba(var(--accent-rgb),0.35)', color: 'var(--accent)' }}>⌘K</kbd> for everything in one place.
      </motion.p>

    </section>
  )
}
