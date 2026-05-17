'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  /* Scroll cue auto-disposes once the visitor has clearly scrolled. */
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 0.6, 0])

  /* Jakub enter recipe: opacity + y + blur, materialising rather than just fading. */
  const enterFrom = reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)' }
  const enterTo   = reduced ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }

  return (
    <section ref={ref} id="hero" className="relative h-screen overflow-hidden">
      {/* Grid + vignette */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 140% 100% at 50% 0%, transparent 25%, #030304 100%)' }}
      />

      <motion.div style={{ y, opacity }} className="relative h-full flex flex-col justify-between py-8 px-6 md:px-12" >

        {/* ── Status row ── time chip dropped; location is repeated in footer + Receipt */}
        <div className="flex items-center">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: 'var(--accent)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: 'var(--accent)' }} />
            </span>
            <span className="font-jetbrains text-[0.66rem] tracking-[0.18em] uppercase"
                  style={{ color: 'var(--accent)' }}>
              Available for contracts
            </span>
          </div>
        </div>

        {/* ── Giant title block ── */}
        <div className="relative -mt-4">

          {/* Single h1 wrapping GAME + DEVELOPER as spans — was two competing h1s */}
          <h1
            className="font-signal text-chalk leading-[0.87] tracking-[0.03em]"
            aria-label="Game Developer & Systems Engineer"
          >
            {/* GAME — mask reveal from below */}
            <span className="block overflow-hidden" style={{ lineHeight: '0.87' }}>
              <motion.span
                className="block text-glitch"
                data-text="GAME"
                style={{ fontSize: 'clamp(4.5rem, 19vw, 19rem)' }}
                initial={reduced ? { opacity: 0 } : { y: '110%' }}
                animate={reduced ? { opacity: 1 } : { y: '0%' }}
                transition={{ delay: 0.15, duration: reduced ? 0.2 : 0.95, ease: E }}
              >
                GAME
              </motion.span>
            </span>

            {/* DEVELOPER — mask reveal with SYSTEMS ENGINEER overlay (desktop only) */}
            <span className="block overflow-hidden relative" style={{ lineHeight: '0.87' }}>
              <motion.span
                className="block"
                style={{ fontSize: 'clamp(3.2rem, 14.5vw, 14.5rem)' }}
                initial={reduced ? { opacity: 0 } : { y: '110%' }}
                animate={reduced ? { opacity: 1 } : { y: '0%' }}
                transition={{ delay: 0.28, duration: reduced ? 0.2 : 0.95, ease: E }}
              >
                DEVELOPER
              </motion.span>

              {/* SYSTEMS ENGINEER — blend overlay, wipes in from left (desktop) */}
              <motion.span
                aria-hidden="true"
                className="absolute pointer-events-none select-none hidden sm:block font-systems"
                style={{
                  top: '12%', left: '0.5%',
                  fontSize: 'clamp(1.6rem, 5vw, 5.5rem)',
                  color: '#00e8f0',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  lineHeight: 1.08,
                  mixBlendMode: 'difference',
                }}
                initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
                animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
                transition={{ delay: 0.75, duration: reduced ? 0.2 : 1.05, ease: E }}
              >
                SYSTEMS<br />ENGINEER
              </motion.span>
            </span>
          </h1>

          {/* Mobile-only: SYSTEMS ENGINEER as readable scan-in below DEVELOPER */}
          <motion.div
            aria-hidden="true"
            className="sm:hidden mt-2"
            initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
            transition={{ delay: 0.75, duration: reduced ? 0.2 : 0.9, ease: E }}
          >
            <span
              className="font-systems font-semibold italic"
              style={{ fontSize: 'clamp(1.3rem, 6vw, 2rem)', color: '#00e8f0', lineHeight: 1.1 }}
            >
              Systems Engineer
            </span>
          </motion.div>

          {/* Name — fades in from right, surname picks up the lava signature */}
          <motion.p
            className="mt-3 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 text-right font-editorial italic leading-[1.15]"
            style={{
              fontSize: 'clamp(0.9rem, 1.9vw, 1.7rem)',
              color: 'rgba(232,232,240,0.6)', /* lifted from 0.45 */
            }}
            initial={{ ...enterFrom, x: reduced ? 0 : 24 }}
            animate={{ ...enterTo,   x: 0 }}
            transition={{ delay: 0.95, duration: 0.85, ease: E }}
          >
            Thanuka Sehasna<br />
            <span
              className="not-italic font-light tracking-widest text-[0.75em] lava-text-sm"
              style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
            >
              PERERA
            </span>
          </motion.p>
        </div>

        {/* ── Bottom row ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0,  filter: 'blur(0px)' }}
          transition={{ delay: 1.1, duration: 0.7, ease: E }}
        >
          {/* Role chips */}
          <div className="flex flex-wrap gap-2">
            <span className="tech-chip" style={{ color: '#7dd3fc', borderColor: 'rgba(125,211,252,0.3)', background: 'rgba(125,211,252,0.08)' }}>GPU Architecture</span>
            <span className="tech-chip" style={{ color: '#fb7185', borderColor: 'rgba(251,113,133,0.3)', background: 'rgba(251,113,133,0.08)' }}>Game Development</span>
            <span className="tech-chip" style={{ color: '#34d399', borderColor: 'rgba(52,211,153,0.3)',  background: 'rgba(52,211,153,0.08)'  }}>Systems Engineering</span>
          </div>

          {/* CTAs — :active scale, focus rings inherit from base */}
          <div className="flex items-center gap-3">
            <a href="#projects"
               className="font-signal tracking-[0.12em] text-sm px-5 py-2 rounded-sm text-black hover:opacity-90 active:scale-[0.97] transition-all duration-150"
               style={{ background: 'var(--accent)' }}>
              VIEW WORK
            </a>
            <a href="https://github.com/Thanukamax" target="_blank" rel="noopener noreferrer"
               className="font-mono text-[0.7rem] tracking-widest px-5 py-2 rounded-sm border text-white/70 hover:text-white hover:border-white/30 active:scale-[0.97] transition-all duration-150"
               style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              GITHUB ↗
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — auto-disposes via cueOpacity once visitor scrolls */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: cueOpacity }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-14 mx-auto"
          style={{ background: 'rgba(var(--accent-rgb),0.5)' }}
          animate={reduced ? {} : { scaleY: [1, 0.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
