'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Kind = 'prompt' | 'success' | 'item' | 'accent' | 'warn' | 'blank' | 'progress'
type Line = { kind: Kind; text?: string }

const SCRIPT: Line[] = [
  { kind: 'prompt',  text: '$ donghua "swallowed star"' },
  { kind: 'blank' },
  { kind: 'success', text: '⏵ Found 3 series' },
  { kind: 'item',    text: '  001 · Swallowed Star · S4 · 88 eps' },
  { kind: 'item',    text: '  002 · Swallowed Star · S3 · 96 eps' },
  { kind: 'item',    text: '  003 · Swallowed Star Movie · 1 ep' },
  { kind: 'blank' },
  { kind: 'accent',  text: '⏵ Selected: 001' },
  { kind: 'warn',    text: '⏵ Playing E01 — Babata Awakens' },
  { kind: 'progress' },
]

const COLOR: Record<Kind, string> = {
  prompt:   'rgba(232,232,240,0.85)',
  success:  '#34d399',
  item:     'rgba(232,232,240,0.65)',
  accent:   'var(--accent)',
  warn:     '#fbbf24',
  blank:    '',
  progress: '',
}

export default function DonghuaDemo() {
  const reduced = useReducedMotion()
  const [step, setStep]         = useState(0)
  const [progress, setProgress] = useState(0)
  const [cycle, setCycle]       = useState(0)

  useEffect(() => {
    if (reduced) { setStep(SCRIPT.length); setProgress(100); return }

    if (step < SCRIPT.length) {
      const t = window.setTimeout(() => setStep(s => s + 1), 420)
      return () => window.clearTimeout(t)
    }
    if (progress < 100) {
      const t = window.setTimeout(() => setProgress(p => Math.min(100, p + 5)), 180)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => {
      setStep(0); setProgress(0); setCycle(c => c + 1)
    }, 2200)
    return () => window.clearTimeout(t)
  }, [step, progress, reduced])

  return (
    <div className="relative w-full h-full overflow-hidden font-mono text-[11px] leading-relaxed p-4"
         style={{ background: '#0a0a0a' }}>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2 h-2 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#28c840' }} />
        <span className="ml-3 text-[8px] tracking-[0.3em] uppercase text-white/35">donghua-cli</span>
      </div>

      <div key={cycle}>
        {SCRIPT.slice(0, step).map((line, i) => {
          if (line.kind === 'blank') return <div key={i} className="h-3" />
          if (line.kind === 'progress') {
            const filled = Math.floor(progress / 5)
            const bar = Array.from({ length: 20 }).map((_, j) => j < filled ? '█' : '░').join('')
            return (
              <motion.div key={i} className="mt-1"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}>
                <span style={{ color: 'rgba(232,232,240,0.7)', fontVariantNumeric: 'tabular-nums' }}>
                  [{bar}] <span style={{ color: 'var(--accent)' }}>{progress}%</span>
                </span>
              </motion.div>
            )
          }
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ color: COLOR[line.kind] }}
            >
              {line.text}
            </motion.div>
          )
        })}
        {step < SCRIPT.length && !reduced && (
          <motion.span
            className="inline-block w-1.5 h-3 align-middle ml-0.5"
            style={{ background: 'var(--accent)' }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>
    </div>
  )
}
