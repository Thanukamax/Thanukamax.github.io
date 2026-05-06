'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET  = 'THANUKA.DEV'
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*·∆∑Ω≈§'
const PHASES  = ['INIT SEQUENCE_', 'LOAD: GPU_ASSETS_', 'COMPILING GRIMOIRE_', 'READY_']

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [chars,    setChars]    = useState<string[]>(Array(TARGET.length).fill('·'))
  const [locked,   setLocked]   = useState<boolean[]>(Array(TARGET.length).fill(false))
  const [progress, setProgress] = useState(0)
  const [phase,    setPhase]    = useState(0)
  const [exiting,  setExiting]  = useState(false)
  const rafRef = useRef<number>(0)
  const t0     = useRef(0)
  const DURATION = 1500

  useEffect(() => {
    document.getElementById('css-boot')?.remove()
    t0.current = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - t0.current) / DURATION, 1)
      setProgress(Math.round(t * 100))
      setPhase(Math.min(Math.floor(t * PHASES.length), PHASES.length - 1))

      setChars(TARGET.split('').map((ch, i) => {
        const lockAt = (i + 1) / TARGET.length
        if (t >= lockAt)           return ch
        if (t >= lockAt - 0.18)    return CHARSET[Math.floor(Math.random() * CHARSET.length)]
        return '·'
      }))

      setLocked(TARGET.split('').map((_, i) => t >= (i + 1) / TARGET.length))

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setChars(TARGET.split(''))
        setLocked(Array(TARGET.length).fill(true))
        // signal parent so content renders beneath, then slide away
        setTimeout(() => { onComplete(); setExiting(true) }, 420)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="pl"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#030304' }}
          exit={{ y: '-100vh', transition: { duration: 0.5, ease: [0.87, 0, 0.13, 1] } }}
        >
          <div className="scanlines" aria-hidden="true" />

          {/* Top-left: phase text */}
          <div className="absolute top-7 left-8">
            <p className="font-jetbrains text-[0.6rem] tracking-[0.3em] uppercase"
               style={{ color: 'rgba(var(--accent-rgb),0.5)' }}>
              {PHASES[phase]}
            </p>
          </div>

          {/* Top-right: build id */}
          <div className="absolute top-7 right-8">
            <p className="font-rdna text-[0.5rem] tracking-[0.3em] uppercase text-white/20">
              SILICON GRIMOIRE v0.1
            </p>
          </div>

          {/* Main scramble text */}
          <div className="select-none">
            <div className="font-signal leading-none tracking-[0.12em]"
                 style={{ fontSize: 'min(12vw,7.5rem)' }}>
              {chars.map((c, i) => (
                <span
                  key={i}
                  className="transition-colors duration-75"
                  style={{ color: locked[i] ? 'var(--accent)' : 'rgba(232,232,240,0.25)' }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Subline */}
          <p className="mt-6 font-systems italic text-[0.7rem] tracking-[0.2em] text-white/30 uppercase">
            Systems Engineer · Game Developer
          </p>

          {/* Progress bar */}
          <div className="absolute bottom-14 left-8 right-8">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-jetbrains text-[0.55rem] tracking-widest text-white/30 uppercase">
                Loading assets
              </span>
              <span className="font-jetbrains text-[0.55rem] tracking-widest"
                    style={{ color: 'var(--accent)' }}>
                {String(progress).padStart(3, '0')}%
              </span>
            </div>
            <div className="h-px w-full bg-white/[0.06] relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
                style={{ width: `${progress}%`, background: 'var(--accent)' }}
              />
            </div>
          </div>

          {/* Corner dots */}
          <div className="absolute top-7  left-8  h-1 w-1 rounded-full bg-accent opacity-60" />
          <div className="absolute top-7  right-8 h-1 w-1 rounded-full bg-white/20" />
          <div className="absolute bottom-7 left-8  h-1 w-1 rounded-full bg-white/20" />
          <div className="absolute bottom-7 right-8 h-1 w-1 rounded-full bg-accent opacity-40" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
