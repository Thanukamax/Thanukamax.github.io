'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Box = { id: number; quad: number; x: number; y: number; w: number; h: number; conf: number }

let nextId = 0

/* Conditionally mounted by parent — when this component exists, the user is
   looking at the card. Effects run; on unmount they clean up. */
export default function CrowDemo() {
  const reduced = useReducedMotion()
  const [boxes, setBoxes] = useState<Box[]>([])
  const [count, setCount] = useState(1247)
  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    if (reduced) return

    const interval = window.setInterval(() => {
      const box: Box = {
        id: nextId++,
        quad: Math.floor(Math.random() * 4),
        x: 8 + Math.random() * 55,
        y: 10 + Math.random() * 50,
        w: 18 + Math.random() * 18,
        h: 22 + Math.random() * 18,
        conf: 0.82 + Math.random() * 0.17,
      }
      setBoxes(prev => [...prev, box].slice(-5))
      setCount(c => c + 1)
      const t = window.setTimeout(() => {
        setBoxes(prev => prev.filter(b => b.id !== box.id))
      }, 2400 + Math.random() * 1400)
      timeoutsRef.current.push(t)
    }, 1100)

    return () => {
      window.clearInterval(interval)
      timeoutsRef.current.forEach(t => window.clearTimeout(t))
      timeoutsRef.current = []
    }
  }, [reduced])

  return (
    <div className="relative w-full h-full overflow-hidden font-mono"
         style={{ background: '#0a0a0a' }}>
      {/* 2×2 camera grid */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2"
           style={{ gap: '1px', background: 'rgba(var(--accent-rgb), 0.18)' }}>
        {[0, 1, 2, 3].map(q => (
          <div key={q} className="relative overflow-hidden" style={{ background: '#0a0a0a' }}>
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(var(--accent-rgb), 0.05), transparent 70%)',
            }} />
            <span className="absolute top-1.5 left-2 text-[8px] tracking-widest text-white/35 uppercase">
              CAM-0{q + 1}
            </span>
            <span className="absolute bottom-1.5 right-2 text-[8px] tracking-widest text-white/45 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
              REC
            </span>

            <AnimatePresence>
              {boxes.filter(b => b.quad === q).map(b => (
                <motion.div
                  key={b.id}
                  className="absolute pointer-events-none"
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{    opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    left:   `${b.x}%`,
                    top:    `${b.y}%`,
                    width:  `${b.w}%`,
                    height: `${b.h}%`,
                  }}
                >
                  <span className="absolute top-0 left-0 w-2 h-2"
                        style={{ borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)' }} />
                  <span className="absolute top-0 right-0 w-2 h-2"
                        style={{ borderTop: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' }} />
                  <span className="absolute bottom-0 left-0 w-2 h-2"
                        style={{ borderBottom: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)' }} />
                  <span className="absolute bottom-0 right-0 w-2 h-2"
                        style={{ borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' }} />
                  <span className="absolute -top-3.5 left-0 text-[8px] tracking-widest"
                        style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
                    {Math.round(b.conf * 100)}%
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="absolute top-3 right-3 flex flex-col items-end gap-0.5">
        <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase">Ingested</span>
        <span className="text-[12px] tracking-widest"
              style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
          {count.toLocaleString()}
        </span>
      </div>
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
        <span className="text-[8px] tracking-[0.22em] uppercase" style={{ color: 'var(--accent)' }}>
          LIVE · 4 STREAMS
        </span>
      </div>
    </div>
  )
}
