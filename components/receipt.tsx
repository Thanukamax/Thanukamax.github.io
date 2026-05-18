'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { toast } from 'sonner'

const SECTIONS = ['hero', 'projects', 'pipeline', 'systems', 'notes', 'about', 'contact'] as const
const THEME_LABEL: Record<string, string> = { '': 'XE', 'udna': 'UDNA', 'cuda': 'CUDA' }

function makeHash(): string {
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) return 'XXXXXX'
  return Array.from(crypto.getRandomValues(new Uint8Array(3)))
    .map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60); const s = sec % 60
  return `${m}m ${String(s).padStart(2, '0')}s`
}

export default function Receipt() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [viewed, setViewed]     = useState<Set<string>>(new Set())
  const [elapsed, setElapsed]   = useState(0)
  const [theme, setTheme]       = useState('')
  const [hash, setHash]         = useState('······')
  const [visible, setVisible]   = useState(false)
  const [mem, setMem]           = useState(0)
  const t0Ref      = useRef(0)
  const elapsedRef = useRef(0)

  /* Mount-time setup: hash, t0, initial theme. */
  useEffect(() => {
    setHash(makeHash())
    t0Ref.current = performance.now()
    setTheme(document.documentElement.dataset.theme ?? '')
  }, [])

  /* Section visibility tracking — runs once, lives for component lifetime. */
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setViewed(prev => prev.has(id) ? prev : new Set([...prev, id]))
          }
        }
      }, { threshold: 0.35 })
      obs.observe(el)
      observers.push(obs)
    })
    return () => { observers.forEach(o => o.disconnect()) }
  }, [])

  /* Theme tracking — single MutationObserver. */
  useEffect(() => {
    const themeObs = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme ?? '')
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => themeObs.disconnect()
  }, [])

  /* Visibility gate for the 1Hz tick — only ticks while the Receipt is on screen.
     Always recompute elapsed on re-show so the value is accurate. */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    /* Snap elapsed forward immediately when becoming visible. */
    setElapsed(Math.floor((performance.now() - t0Ref.current) / 1000))
    const tick = window.setInterval(() => {
      const next = Math.floor((performance.now() - t0Ref.current) / 1000)
      if (next !== elapsedRef.current) {
        elapsedRef.current = next
        setElapsed(next)
      }
    }, 1000)
    return () => window.clearInterval(tick)
  }, [visible])

  /* Memory gauge — Chrome's performance.memory if available (heap %), else DOM
     node count as a proxy. Either way the displayed range is 0–100, so the bar
     reads the same. Hardware joke for an engineer audience: we are showing
     how much "system" the page is using to render itself. */
  useEffect(() => {
    if (!visible) return
    const compute = () => {
      const perf = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory
      if (perf && perf.jsHeapSizeLimit > 0) {
        setMem(Math.min(100, (perf.usedJSHeapSize / perf.jsHeapSizeLimit) * 100))
      } else {
        setMem(Math.min(100, (document.querySelectorAll('*').length / 2000) * 100))
      }
    }
    compute()
    const tick = window.setInterval(compute, 1500)
    return () => window.clearInterval(tick)
  }, [visible])

  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10)
  const timeStr = date.toTimeString().slice(0, 8)

  const copyReceipt = () => {
    const lines = [
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  RECEIPT · THANUKA.DEV',
      `  ${dateStr}  ${timeStr}  UTC+05:30`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `  sections viewed   ${String(viewed.size).padStart(2, '0')} of ${String(SECTIONS.length).padStart(2, '0')}`,
      `  time on page      ${fmtTime(elapsed)}`,
      `  theme             ${THEME_LABEL[theme] || 'XE'}`,
      `  memory            ${String(Math.round(mem)).padStart(2, '0')}%`,
      `  session           #${hash}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '  send the hash back so I know',
      '  who I am talking to.',
      '  contact@thanukamax.dev',
    ].join('\n')
    if (!navigator.clipboard) {
      toast.error('Clipboard unavailable')
      return
    }
    navigator.clipboard.writeText(lines)
      .then(() => toast.success('Receipt copied'))
      .catch(() => toast.error('Copy failed'))
  }

  return (
    <motion.div
      ref={rootRef}
      className="font-mono text-[0.62rem] leading-[1.85] tracking-[0.04em] w-full max-w-[340px]"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '2px',
        color: 'rgba(232,232,240,0.85)',
      }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="px-4 pt-3 pb-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <p className="font-rdna text-[0.55rem] tracking-[0.32em] uppercase mb-1.5" style={{ color: 'var(--accent)' }}>
          Receipt
        </p>
        <p className="text-white/65" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {dateStr}&nbsp;&nbsp;{timeStr}
        </p>
        <p className="text-white/55 mt-0.5">
          UTC+05:30 · Colombo
        </p>
      </div>

      <div className="px-4 py-3 space-y-1.5">
        <Row   label="sections viewed" value={`${String(viewed.size).padStart(2, '0')} / ${String(SECTIONS.length).padStart(2, '0')}`} />
        <Row   label="time on page"    value={fmtTime(elapsed)} />
        <Row   label="theme"           value={THEME_LABEL[theme] || 'XE'} />
        <Gauge label="memory"          pct={mem} />
        <Row   label="session"         value={`#${hash}`} />
      </div>

      <button
        onClick={copyReceipt}
        className="block w-full px-4 py-2.5 text-left uppercase tracking-[0.18em] hover:bg-white/[0.04] active:scale-[0.99] transition-all duration-150 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'var(--accent)' }}
      >
        [ COPY RECEIPT ]
      </button>
    </motion.div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/55 uppercase">{label}</span>
      <span style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  )
}

function Gauge({ label, pct }: { label: string; pct: number }) {
  const segments = 10
  const filled = Math.round((pct / 100) * segments)
  const bar = Array.from({ length: segments }, (_, i) => i < filled ? '▮' : '▯').join('')
  return (
    <div className="flex justify-between items-center gap-3">
      <span className="text-white/55 uppercase">{label}</span>
      <span className="flex items-center gap-2" style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
        <span style={{ letterSpacing: '0.05em' }}>{bar}</span>
        <span>{String(Math.round(pct)).padStart(2, '0')}%</span>
      </span>
    </div>
  )
}
