'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Block {
  label: string
  items: string[]
}

const BLOCKS: Block[] = [
  {
    label: 'Stack',
    items: [
      'Next.js 15 (App Router) · static export → GitHub Pages',
      'Framer Motion 12 for choreography',
      'Lenis 1.1 for smooth scroll',
      'Sonner for toast feedback',
      'Tailwind CSS · Bun runtime',
    ],
  },
  {
    label: 'Identity',
    items: [
      'Silicon Grimoire theme: 3 GPU palettes (XE / UDNA / CUDA)',
      'Time-of-day default — boots to your current Colombo hour',
      'Theme is a content router: cycle it, work re-sorts by track',
      'Lava metaball name via @property registered CSS percentages',
    ],
  },
  {
    label: 'Motion',
    items: [
      'Lenis × Framer single RAF (frame.update drives Lenis.raf)',
      'Jakub enter recipe: opacity + translateY + filter:blur(4 → 0)',
      'prefers-reduced-motion kills decorative loops globally',
      'Demos are code-split and only mount when their card dominates view',
    ],
  },
  {
    label: 'Type',
    items: [
      'Two-family system: Bebas Neue (display) + JetBrains Mono (body)',
      'All semantic font classes resolve to one of those two',
      'Was 15 fonts before the revamp — costume jewellery, not typography',
    ],
  },
  {
    label: 'Accessibility',
    items: [
      'Universal :focus-visible ring',
      'Skip-link to main content',
      'AA contrast verified across all themes incl. UDNA',
      'Single h1, semantic landmarks, aria labels on interactive elements',
      'Keyboard support: ⌘K palette, arrow nav in horizontal work strip',
    ],
  },
]

export default function BuiltWith() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const externalOpen = () => setOpen(true)
    window.addEventListener('built-open', externalOpen)
    return () => window.removeEventListener('built-open', externalOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 'var(--z-preloader)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="built-title"
            className="relative max-w-3xl w-full rounded-sm overflow-hidden"
            style={{
              background: 'rgba(3,3,4,0.97)',
              border: '1px solid rgba(var(--accent-rgb),0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(var(--accent-rgb),0.08)',
            }}
            initial={{ y: 16, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ y: 0,  scale: 1,    filter: 'blur(0px)' }}
            exit={{    y: -8, scale: 0.98, filter: 'blur(4px)' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-2">
              <div>
                <p className="font-rdna text-[0.55rem] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'var(--accent)' }}>
                  How was this built
                </p>
                <h2 id="built-title" className="font-signal leading-none" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', color: 'var(--chalk)' }}>
                  The stack behind the grimoire
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="font-mono text-xs tracking-widest text-white/55 hover:text-white active:scale-90 transition-all duration-150 px-2 py-1"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto px-6 pb-6 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {BLOCKS.map(block => (
                  <div key={block.label} className="pl-3 border-l" style={{ borderColor: 'rgba(var(--accent-rgb),0.35)' }}>
                    <p className="font-rdna text-[0.55rem] tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
                      {block.label}
                    </p>
                    <ul className="space-y-1.5">
                      {block.items.map((item, i) => (
                        <li key={i} className="font-body text-[0.78rem] leading-relaxed text-white/72">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-7 pt-5 border-t flex items-center justify-between gap-3 flex-wrap"
                   style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-white/55">
                  Source ·{' '}
                  <a href="https://github.com/Thanukamax/Thanukamax.github.io" target="_blank" rel="noopener noreferrer"
                     className="hover:text-white active:scale-[0.97] transition-all duration-150 inline-block"
                     style={{ color: 'var(--accent)' }}>
                    github.com/Thanukamax/Thanukamax.github.io ↗
                  </a>
                </p>
                <p className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-white/45">
                  ⌘K for everything else
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
