'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section ref={ref} id="hero" className="relative h-screen overflow-hidden">
      {/* Grid + vignette */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 140% 100% at 50% 0%, transparent 25%, #030304 100%)' }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 h-full flex flex-col justify-between py-8 px-6 md:px-12">

        {/* ── Status row ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: 'var(--accent)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: 'var(--accent)' }} />
            </span>
            <span className="font-jetbrains text-[0.62rem] tracking-[0.18em] uppercase"
                  style={{ color: 'var(--accent)' }}>
              Available for contracts
            </span>
          </div>
          <span className="font-mono text-[0.58rem] tracking-widest text-white/28 hidden sm:block">
            UTC+05:30 · COLOMBO
          </span>
        </div>

        {/* ── Giant title block ── */}
        <div className="relative -mt-4">

          {/* GAME — mask reveal from below */}
          <div className="overflow-hidden leading-[0.87]">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.25, duration: 1.35, ease: E }}
            >
              <h1 className="font-signal text-chalk text-glitch leading-[0.87] tracking-[0.03em]"
                  data-text="GAME"
                  style={{ fontSize: 'clamp(4.5rem, 19vw, 19rem)' }}>
                GAME
              </h1>
            </motion.div>
          </div>

          {/* DEVELOPER — mask reveal, slightly delayed */}
          <div className="overflow-hidden leading-[0.87] relative">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.4, duration: 1.35, ease: E }}
            >
              <h1 className="font-signal text-chalk leading-[0.87] tracking-[0.03em]"
                  style={{ fontSize: 'clamp(3.2rem, 14.5vw, 14.5rem)' }}>
                DEVELOPER
              </h1>
            </motion.div>

            {/* SYSTEMS ENGINEER — blend overlay, wipes in from left */}
            <motion.div
              className="absolute pointer-events-none select-none"
              style={{
                top: '12%', left: '0.5%',
                mixBlendMode: 'difference',
              }}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 1.05, duration: 1.5, ease: E }}
            >
              <div className="font-systems font-semibold italic"
                   style={{
                     fontSize: 'clamp(1.6rem, 5vw, 5.5rem)',
                     color: '#00e8f0',
                     lineHeight: 1.08,
                   }}>
                SYSTEMS<br />ENGINEER
              </div>
            </motion.div>
          </div>

          {/* Name — Playfair Editorial, fades in from right */}
          <motion.div
            className="mt-3 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 text-right"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 1.2, ease: E }}
          >
            <p className="font-editorial italic text-chalk/45 leading-[1.15]"
               style={{ fontSize: 'clamp(0.9rem, 1.9vw, 1.7rem)' }}>
              Thanuka Sehasna<br />
              <span className="not-italic font-light text-chalk/25 tracking-widest text-[0.75em]">
                PERERA
              </span>
            </p>
          </motion.div>
        </div>

        {/* ── Bottom row ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.0, ease: E }}
        >
          {/* Role chips with distinct fonts */}
          <div className="flex flex-wrap gap-2">
            <span className="tech-chip font-rdna"    style={{ color: 'var(--accent)', borderColor: 'rgba(var(--accent-rgb),0.25)' }}>GPU Architecture</span>
            <span className="tech-chip font-blender" style={{ color: 'rgba(232,232,240,0.6)' }}>Game Development</span>
            <span className="tech-chip font-systems" style={{ color: 'rgba(232,232,240,0.6)' }}>Systems Engineering</span>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <a href="#projects"
               className="font-signal tracking-[0.12em] text-sm px-5 py-2 rounded-sm text-black hover:opacity-85 transition-opacity"
               style={{ background: 'var(--accent)' }}>
              VIEW WORK
            </a>
            <a href="https://github.com/thanukamax" target="_blank" rel="noopener noreferrer"
               className="font-mono text-[0.65rem] tracking-widest px-5 py-2 rounded-sm border text-white/50 hover:border-white/20 transition-colors"
               style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              GITHUB ↗
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div
          className="w-px h-14 mx-auto"
          style={{ background: 'rgba(var(--accent-rgb),0.4)' }}
          animate={{ scaleY: [1, 0.2, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
