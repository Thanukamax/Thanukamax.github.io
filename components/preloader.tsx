'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TARGET   = 'THANUKA.DEV'
const CHARSET  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*·∆∑Ω≈§'
const DURATION = 600                 /* was 1500 — preloader is theatre, not a real load */
const STORAGE_KEY = 'tsp-seen'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion()
  const [chars,    setChars]    = useState<string[]>(Array(TARGET.length).fill('·'))
  const [locked,   setLocked]   = useState<boolean[]>(Array(TARGET.length).fill(false))
  const [progress, setProgress] = useState(0)
  const [exiting,  setExiting]  = useState(false)
  const [enabled,  setEnabled]  = useState<boolean | null>(null)
  const rafRef = useRef<number>(0)
  const t0     = useRef(0)

  /* Decide on mount: skip if reduced-motion OR returning visitor. */
  useEffect(() => {
    const seen = typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === '1'
    if (reduced || seen) {
      setEnabled(false)
      onComplete()
      return
    }
    setEnabled(true)
  }, [reduced, onComplete])

  useEffect(() => {
    if (enabled !== true) return

    t0.current = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - t0.current) / DURATION, 1)
      setProgress(Math.round(t * 100))

      setChars(TARGET.split('').map((ch, i) => {
        const lockAt = (i + 1) / TARGET.length
        if (t >= lockAt)        return ch
        if (t >= lockAt - 0.18) return CHARSET[Math.floor(Math.random() * CHARSET.length)]
        return '·'
      }))

      setLocked(TARGET.split('').map((_, i) => t >= (i + 1) / TARGET.length))

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setChars(TARGET.split(''))
        setLocked(Array(TARGET.length).fill(true))
        try { sessionStorage.setItem(STORAGE_KEY, '1') } catch {}
        /* Reveal content immediately, then slide the overlay away */
        onComplete()
        setTimeout(() => setExiting(true), 120)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [enabled, onComplete])

  if (enabled !== true) return null

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="pl"
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#030304', zIndex: 'var(--z-preloader)' }}
          exit={{ y: '-100vh', transition: { duration: 0.4, ease: [0.87, 0, 0.13, 1] } }}
        >
          {/* Scramble text — the one identity beat that stays */}
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

          {/* Hairline progress bar */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[min(280px,55vw)]">
            <div className="h-px w-full bg-white/[0.08] relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0"
                style={{ width: `${progress}%`, background: 'var(--accent)', transition: 'width 80ms linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
