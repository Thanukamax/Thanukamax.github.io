'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

/* Beats — each animation only starts once `loaded` flips true so the reveal
   isn't half-obscured by the page's opacity fade-in. Slowed so the curtains
   actually have time to read. */
const T = {
  game:    { delay: 0.20, duration: 1.40 },
  dev:     { delay: 0.40, duration: 1.40 },
  systems: { delay: 0.90, duration: 1.50 },
  name:    { delay: 1.15, duration: 1.10 },
  bottom:  { delay: 1.35, duration: 0.95 },
} as const

export default function Hero({ loaded }: { loaded: boolean }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 0.6, 0])

  /* Variants — animate state flips when `loaded` becomes true.
     With sessionStorage-skipped preloader, loaded is true within a tick of
     mount; with the preloader running, loaded flips at handoff. Either way
     the reveal starts when the page is actually visible. */
  const state = loaded ? 'visible' : 'hidden'

  const maskTitle = reduced
    ? { hidden: { opacity: 0 }, visible: (b: typeof T.game) => ({ opacity: 1, transition: { delay: b.delay, duration: 0.3 } }) }
    : { hidden: { y: '110%' },  visible: (b: typeof T.game) => ({ y: '0%',  transition: { delay: b.delay, duration: b.duration, ease: E } }) }

  const wipeReveal = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: T.systems.delay, duration: 0.3 } } }
    : { hidden: { clipPath: 'inset(0 100% 0 0)' }, visible: { clipPath: 'inset(0 0% 0 0)', transition: { delay: T.systems.delay, duration: T.systems.duration, ease: E } } }

  const nameSlide = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: T.name.delay, duration: 0.3 } } }
    : { hidden: { opacity: 0, x: 24, filter: 'blur(4px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { delay: T.name.delay, duration: T.name.duration, ease: E } } }

  const bottomRise = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: T.bottom.delay, duration: 0.3 } } }
    : { hidden: { opacity: 0, y: 16, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: T.bottom.delay, duration: T.bottom.duration, ease: E } } }

  return (
    <section ref={ref} id="hero" className="relative h-screen overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 140% 100% at 50% 0%, transparent 25%, #030304 100%)' }}
      />

      <motion.div style={{ y, opacity }} className="relative h-full flex flex-col justify-between py-8 px-6 md:px-12" >

        {/* ── Status row ── time chip dropped; location lives in footer + Receipt */}
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

          {/* Single h1 wrapping GAME + DEVELOPER as spans */}
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
                custom={T.game}
                variants={maskTitle}
                initial="hidden"
                animate={state}
              >
                GAME
              </motion.span>
            </span>

            {/* DEVELOPER — mask reveal with SYSTEMS ENGINEER overlay (desktop only) */}
            <span className="block overflow-hidden relative" style={{ lineHeight: '0.87' }}>
              <motion.span
                className="block"
                style={{ fontSize: 'clamp(3.2rem, 14.5vw, 14.5rem)' }}
                custom={T.dev}
                variants={maskTitle}
                initial="hidden"
                animate={state}
              >
                DEVELOPER
              </motion.span>

              {/* SYSTEMS ENGINEER — clip-path wipe overlay, desktop only */}
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
                variants={wipeReveal}
                initial="hidden"
                animate={state}
              >
                SYSTEMS<br />ENGINEER
              </motion.span>
            </span>
          </h1>

          {/* Mobile-only: SYSTEMS ENGINEER as readable scan-in below DEVELOPER */}
          <motion.div
            aria-hidden="true"
            className="sm:hidden mt-2"
            variants={wipeReveal}
            initial="hidden"
            animate={state}
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
              color: 'rgba(232,232,240,0.6)',
            }}
            variants={nameSlide}
            initial="hidden"
            animate={state}
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
          variants={bottomRise}
          initial="hidden"
          animate={state}
        >
          {/* Role chips */}
          <div className="flex flex-wrap gap-2">
            <span className="tech-chip" style={{ color: '#7dd3fc', borderColor: 'rgba(125,211,252,0.3)', background: 'rgba(125,211,252,0.08)' }}>GPU Architecture</span>
            <span className="tech-chip" style={{ color: '#fb7185', borderColor: 'rgba(251,113,133,0.3)', background: 'rgba(251,113,133,0.08)' }}>Game Development</span>
            <span className="tech-chip" style={{ color: '#34d399', borderColor: 'rgba(52,211,153,0.3)',  background: 'rgba(52,211,153,0.08)'  }}>Systems Engineering</span>
          </div>

          {/* CTAs */}
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
