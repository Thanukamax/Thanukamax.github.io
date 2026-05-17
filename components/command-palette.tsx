'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

type Cmd = {
  id: string
  label: string
  group: 'Navigate' | 'Theme' | 'Action' | 'Open'
  hint?: string
  keywords?: string
  run: () => void
}

const THEME_KEY = 'tsp-theme'

function setTheme(v: '' | 'udna' | 'cuda') {
  document.documentElement.dataset.theme = v
  try { localStorage.setItem(THEME_KEY, v) } catch {}
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function copyText(text: string, success: string) {
  if (!navigator.clipboard) { toast.error('Clipboard unavailable'); return }
  navigator.clipboard.writeText(text)
    .then(() => toast.success(success))
    .catch(() => toast.error('Copy failed'))
}

const COMMANDS: Cmd[] = [
  { id: 'nav-projects', group: 'Navigate', label: 'Go to Work',        hint: 'projects',   keywords: 'work projects archive', run: () => scrollToId('projects') },
  { id: 'nav-pipeline', group: 'Navigate', label: 'Go to In Progress', hint: 'pipeline',   keywords: 'pipeline building progress wip', run: () => scrollToId('pipeline') },
  { id: 'nav-skills',   group: 'Navigate', label: 'Go to Skills',      hint: 'stack',      keywords: 'skills stack systems', run: () => scrollToId('systems') },
  { id: 'nav-notes',    group: 'Navigate', label: 'Go to Notes',       hint: 'essays',     keywords: 'notes essays writing', run: () => scrollToId('notes') },
  { id: 'nav-about',    group: 'Navigate', label: 'Go to About',       hint: 'identity',   keywords: 'about identity profile', run: () => scrollToId('about') },
  { id: 'nav-contact',  group: 'Navigate', label: 'Go to Contact',     hint: 'reach out',  keywords: 'contact email signal reach', run: () => scrollToId('contact') },
  { id: 'nav-top',      group: 'Navigate', label: 'Go to top',         hint: 'hero',       keywords: 'top hero home start', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },

  { id: 'theme-xe',     group: 'Theme', label: 'Switch theme: XE',   hint: 'Intel · systems',     keywords: 'xe intel systems', run: () => setTheme('') },
  { id: 'theme-udna',   group: 'Theme', label: 'Switch theme: UDNA', hint: 'AMD · graphics',       keywords: 'udna amd graphics games', run: () => setTheme('udna') },
  { id: 'theme-cuda',   group: 'Theme', label: 'Switch theme: CUDA', hint: 'Nvidia · AI · compute', keywords: 'cuda nvidia ai compute', run: () => setTheme('cuda') },

  { id: 'act-email',    group: 'Action', label: 'Copy email',        hint: 'contact@thanukamax.dev', keywords: 'copy email mail clipboard contact', run: () => copyText('contact@thanukamax.dev', 'Email copied') },
  { id: 'act-mailto',   group: 'Action', label: 'Send email',        hint: 'open mailto link',       keywords: 'send email mail compose', run: () => { window.location.href = 'mailto:contact@thanukamax.dev' } },
  { id: 'act-credits',  group: 'Action', label: 'Open credits',      hint: 'things made by hand',    keywords: 'credits konami easter egg hidden', run: () => window.dispatchEvent(new Event('konami-open')) },
  { id: 'act-built',    group: 'Action', label: 'How was this built',hint: 'stack + decisions',      keywords: 'built built-with stack tech how', run: () => window.dispatchEvent(new Event('built-open')) },

  { id: 'open-github',  group: 'Open', label: 'Open GitHub',   hint: '@Thanukamax',           keywords: 'github source code repo', run: () => window.open('https://github.com/Thanukamax', '_blank', 'noopener') },
  { id: 'open-linked',  group: 'Open', label: 'Open LinkedIn', hint: 'professional',          keywords: 'linkedin work', run: () => window.open('https://linkedin.com/in/thanukamax', '_blank', 'noopener') },
  { id: 'open-vn2apk',  group: 'Open', label: 'Open vn2apk releases', hint: 'github · vn2apk', keywords: 'vn2apk releases download apk visual novel', run: () => window.open('https://github.com/Thanukamax/vn2apk/releases', '_blank', 'noopener') },
]

function score(cmd: Cmd, q: string): number {
  if (!q) return 1
  const hay = `${cmd.label} ${cmd.hint ?? ''} ${cmd.keywords ?? ''}`.toLowerCase()
  const needle = q.toLowerCase().trim()
  if (!needle) return 1
  if (hay.includes(needle)) return 2
  /* token match */
  const tokens = needle.split(/\s+/).filter(Boolean)
  let hits = 0
  for (const t of tokens) if (hay.includes(t)) hits++
  return hits === tokens.length ? 1 : 0
}

export default function CommandPalette() {
  const [open, setOpen]     = useState(false)
  const [query, setQuery]   = useState('')
  const [active, setActive] = useState(0)
  const inputRef            = useRef<HTMLInputElement>(null)
  const listRef             = useRef<HTMLDivElement>(null)

  /* Hotkey ⌘K / Ctrl+K */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isK = e.key === 'k' || e.key === 'K'
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(prev => !prev)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    const externalOpen = () => setOpen(true)
    window.addEventListener('keydown', handler)
    window.addEventListener('palette-open', externalOpen)
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('palette-open', externalOpen)
    }
  }, [open])

  /* Focus the input + reset state when opening */
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  const results = useMemo(() => {
    return COMMANDS
      .map(c => ({ cmd: c, s: score(c, query) }))
      .filter(r => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .map(r => r.cmd)
  }, [query])

  /* Keep active in range */
  useEffect(() => {
    if (active >= results.length) setActive(Math.max(0, results.length - 1))
  }, [results.length, active])

  /* Scroll the active row into view */
  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current.querySelector<HTMLElement>(`[data-idx="${active}"]`)
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [active])

  const exec = (cmd: Cmd) => {
    setOpen(false)
    /* Tiny delay so close animation can begin before any scrollTo */
    requestAnimationFrame(() => cmd.run())
  }

  /* Group results for display */
  const grouped: { group: string; items: { cmd: Cmd; idx: number }[] }[] = []
  results.forEach((cmd, idx) => {
    const last = grouped[grouped.length - 1]
    if (last && last.group === cmd.group) last.items.push({ cmd, idx })
    else grouped.push({ group: cmd.group, items: [{ cmd, idx }] })
  })

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-start justify-center p-4 pt-[10vh]"
          style={{ zIndex: 'var(--z-preloader)', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl rounded-sm overflow-hidden"
            style={{
              background: 'rgba(8,8,10,0.96)',
              border: '1px solid rgba(var(--accent-rgb),0.28)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.7), 0 0 80px rgba(var(--accent-rgb),0.08)',
            }}
            initial={{ y: -8, scale: 0.98, filter: 'blur(6px)' }}
            animate={{ y: 0,  scale: 1,    filter: 'blur(0px)' }}
            exit={{    y: -8, scale: 0.99, filter: 'blur(4px)' }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive(a => Math.min(results.length - 1, a + 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive(a => Math.max(0, a - 1))
              } else if (e.key === 'Enter') {
                e.preventDefault()
                if (results[active]) exec(results[active])
              }
            }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b"
                 style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <span className="font-rdna text-[0.55rem] tracking-[0.3em] uppercase shrink-0"
                    style={{ color: 'var(--accent)' }}>
                ⌘K
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setActive(0) }}
                placeholder="Type to filter — nav, theme, copy email, credits…"
                className="flex-1 bg-transparent outline-none font-body text-sm text-chalk placeholder-white/35"
                aria-label="Command input"
              />
              <span className="font-mono text-[0.55rem] tracking-widest text-white/35 shrink-0">
                ESC
              </span>
            </div>

            <div
              ref={listRef}
              data-lenis-prevent
              className="max-h-[60vh] overflow-y-auto py-1 overscroll-contain"
            >
              {results.length === 0 && (
                <div className="px-4 py-6 font-mono text-xs text-white/45">No matches.</div>
              )}
              {grouped.map(grp => (
                <div key={grp.group}>
                  <div className="px-4 pt-3 pb-1 font-rdna text-[0.5rem] tracking-[0.3em] uppercase text-white/35">
                    {grp.group}
                  </div>
                  {grp.items.map(({ cmd, idx }) => {
                    const isActive = idx === active
                    return (
                      <button
                        key={cmd.id}
                        data-idx={idx}
                        type="button"
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => exec(cmd)}
                        className="w-full text-left px-4 py-2.5 flex items-center justify-between gap-4 group"
                        style={{
                          background: isActive ? 'rgba(var(--accent-rgb),0.10)' : 'transparent',
                          borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                        }}
                      >
                        <span className="font-body text-sm"
                              style={{ color: isActive ? 'var(--chalk)' : 'rgba(232,232,240,0.78)' }}>
                          {cmd.label}
                        </span>
                        {cmd.hint && (
                          <span className="font-mono text-[0.58rem] tracking-widest uppercase shrink-0"
                                style={{ color: isActive ? 'var(--accent)' : 'rgba(232,232,240,0.4)' }}>
                            {cmd.hint}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="px-4 py-2 border-t flex items-center justify-between gap-3 font-mono text-[0.55rem] tracking-widest text-white/40"
                 style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span className="uppercase">↑↓ navigate · ↵ run · esc close</span>
              <span className="uppercase">{results.length} {results.length === 1 ? 'match' : 'matches'}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
