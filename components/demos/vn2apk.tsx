'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const STAGES = ['SCAN', 'PACK', 'SIGN', 'APK']

export default function Vn2apkDemo() {
  const reduced = useReducedMotion()
  const [stage, setStage] = useState<number>(-1) /* -1 = idle */

  useEffect(() => {
    if (reduced) { setStage(STAGES.length - 1); return }

    let cancelled = false
    const cycle = async () => {
      while (!cancelled) {
        await new Promise(r => setTimeout(r, 1100))
        for (let i = 0; i < STAGES.length; i++) {
          if (cancelled) return
          setStage(i)
          await new Promise(r => setTimeout(r, 850))
        }
        await new Promise(r => setTimeout(r, 1400))
        if (cancelled) return
        setStage(-1)
        await new Promise(r => setTimeout(r, 800))
      }
    }
    cycle()
    return () => { cancelled = true }
  }, [reduced])

  const dropActive = stage >= 0

  return (
    <div className="relative w-full h-full p-6 flex flex-col items-center justify-center overflow-hidden font-mono"
         style={{ background: '#0a0a0a' }}>

      <motion.div
        className="relative rounded-sm flex items-center justify-center w-full max-w-md mb-7"
        style={{
          aspectRatio: '2.6 / 1',
          border: '1px dashed rgba(255,255,255,0.22)',
          background: 'rgba(255,255,255,0.02)',
        }}
        animate={dropActive ? {
          borderColor: 'rgba(var(--accent-rgb), 0.55)',
          background:  'rgba(var(--accent-rgb), 0.06)',
        } : {
          borderColor: 'rgba(255,255,255,0.22)',
          background:  'rgba(255,255,255,0.02)',
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {!dropActive ? (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-[10px] tracking-[0.22em] uppercase text-white/45"
            >
              Drop game folder
            </motion.span>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-[14px]">📦</span>
              <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
                game-folder · processing
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex items-end justify-between w-full max-w-md gap-2">
        {STAGES.map((label, i) => {
          const isActive = stage === i
          const isDone   = stage > i
          return (
            <div key={label} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full"
                   style={{ background: 'rgba(255,255,255,0.07)' }}>
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left rounded-full"
                  style={{ background: 'var(--accent)' }}
                  animate={{
                    scaleX: isActive ? [0, 1] : isDone ? 1 : 0,
                  }}
                  transition={isActive
                    ? { duration: 0.8, ease: 'easeOut' }
                    : { duration: 0.25 }
                  }
                />
              </div>
              <span className="text-[8px] tracking-[0.22em] uppercase"
                    style={{
                      color: isActive || isDone ? 'var(--accent)' : 'rgba(255,255,255,0.35)',
                      transition: 'color 0.25s ease',
                    }}>
                {label}
              </span>
            </div>
          )
        })}
      </div>

      <motion.div
        className="mt-5 h-4 text-[9px] tracking-[0.22em] uppercase"
        animate={{ opacity: stage === STAGES.length - 1 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ color: '#34d399' }}
      >
        ✓ Signed APK ready · 47 MB
      </motion.div>
    </div>
  )
}
