'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'

/* Demos are code-split AND conditionally mounted — only ONE is in the DOM
   at a time, only while its card is the dominant one in view. */
const CrowDemo    = dynamic(() => import('@/components/demos/crow'),    { ssr: false })
const DonghuaDemo = dynamic(() => import('@/components/demos/donghua'), { ssr: false })
const Vn2apkDemo  = dynamic(() => import('@/components/demos/vn2apk'),  { ssr: false })

type Track = 'systems' | 'graphics' | 'ai'

const THEME_TRACK: Record<string, Track> = {
  '':     'systems',
  'udna': 'graphics',
  'cuda': 'ai',
}

const TRACK_LABEL: Record<Track, string> = {
  systems:  'systems',
  graphics: 'graphics',
  ai:       'AI · compute',
}

/* Canny-edge outlines — ambient backdrop layer. Lower opacity now that
   the live demo sits on top as the foreground artifact. */
const OUTLINES: Record<string, { src: string; opacity: number }> = {
  '001': { src: '/outlines/crow.png',   opacity: 0.32 },
  '002': { src: '/outlines/babata.png', opacity: 0.38 },
  '003': { src: '/outlines/renpy.png',  opacity: 0.32 },
}

interface Project {
  id: string
  name: string
  description: string
  accent: string
  tracks: Track[]
  tags: string[]
  badge: string | null
  href: string
  Demo: React.ComponentType
  telemetry: string[]
}

const PROJECTS: Project[] = [
  {
    id: '001',
    name: 'CROW',
    description:
      'Unified customer interaction intelligence platform — 6-person SDGP team, two live clients, Cloudflare microservices, real-time CCTV ingest pipeline, and 3K+ commits in production.',
    accent: '#e53e3e',
    tracks: ['systems', 'ai'],
    tags: ['TypeScript', 'Cloudflare Workers', 'Computer Vision', 'Workers AI'],
    badge: 'SDGP',
    href: 'https://github.com/Thanukamax',
    Demo: CrowDemo,
    telemetry: ['4 streams', 'yolo-v8n', '23 fps', 'lat 84ms'],
  },
  {
    id: '002',
    name: 'DONGHUA-CLI',
    description:
      'Terminal streaming client for Chinese animation — search, pick, and play directly from the CLI. MPV-backed, cached, with preloading so video starts in under 15 seconds on most mirrors.',
    accent: '#d4a017',
    tracks: ['graphics', 'systems'],
    tags: ['Python', 'Scraping', 'Streaming', 'MPV'],
    badge: null,
    href: 'https://github.com/Thanukamax',
    Demo: DonghuaDemo,
    telemetry: ['mpv 0.38', 'cache 89%', '480p hevc', 'ttfb 2.1s'],
  },
  {
    id: '003',
    name: 'VN2APK',
    description:
      'Tauri v2 desktop app that packages PC visual novel and RPG game folders into signed Android APKs — drag-and-drop workflow, Rust process orchestration, React UI, one-click deploy.',
    accent: '#3b82f6',
    tracks: ['graphics', 'systems', 'ai'],
    tags: ['Rust', 'Tauri v2', 'React', 'Android SDK'],
    badge: 'v1.0.0',
    href: 'https://github.com/Thanukamax/vn2apk/releases',
    Demo: Vn2apkDemo,
    telemetry: ['build 02:14', 'apk 41mb', 'arm64-v8a', 'tauri 2.1'],
  },
]

function sortByTrack(list: Project[], track: Track): Project[] {
  return [...list].sort((a, b) => {
    const ai = a.tracks.indexOf(track); const bi = b.tracks.indexOf(track)
    const ap = ai === -1 ? 99 : ai
    const bp = bi === -1 ? 99 : bi
    return ap - bp
  })
}

function ProjectSlide({
  project, index, total, sectionInView, reduced, currentTrack,
}: {
  project: Project
  index: number
  total: number
  sectionInView: boolean
  reduced: boolean | null
  currentTrack: Track
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  /* Tight amount so demo only mounts when card dominates the viewport.
     Prevents 2 demos running simultaneously while transitioning between slides. */
  const cardCenter = useInView(cardRef, { amount: 0.55 })
  const demoMounted = sectionInView && cardCenter

  const isPrimaryMatch = project.tracks[0] === currentTrack
  const isAnyMatch     = project.tracks.includes(currentTrack)
  const outline        = OUTLINES[project.id]
  const Demo           = project.Demo

  return (
    <div ref={cardRef} className="relative w-screen h-screen flex-shrink-0 overflow-hidden">
      {/* Background visual */}
      <div className="absolute inset-0" style={{ background: '#030304' }}>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 55% 55% at 65% 45%, ${project.accent}33 0%, transparent 70%), linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 60%)`
        }} />
        {/* Accent grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${project.accent}60 1px, transparent 1px), linear-gradient(90deg, ${project.accent}60 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Big watermark number */}
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-[-0.1em] font-signal leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(18rem, 35vw, 38rem)',
          color: project.accent,
          opacity: 0.05,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {index + 1}
      </span>

      {/* Canny-edge outline — ambient backdrop, lives behind the demo. */}
      {outline && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={outline.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-[85vh] w-auto max-w-[85%] object-contain"
            style={{
              filter: 'invert(1)',
              mixBlendMode: 'screen',
              opacity: outline.opacity,
            }}
          />
        </div>
      )}

      {/* Live demo — foreground panel, conditionally mounted.
          Only exists in the DOM while this card dominates the viewport. */}
      <div
        className="absolute pointer-events-none select-none
                   top-[7%] left-[5%] right-[5%] h-[34%]
                   md:top-1/2 md:right-[5%] md:left-auto md:-translate-y-1/2
                   md:w-[42%] md:h-[54%]"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          {demoMounted && (
            <motion.div
              key="demo"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1,    filter: 'blur(0px)' }}
              exit={reduced    ? { opacity: 0 } : { opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col gap-1.5"
            >
              <div
                className="relative flex-1 min-h-0 rounded-sm overflow-hidden"
                style={{
                  border: `1px solid ${project.accent}33`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 80px ${project.accent}1a`,
                }}
              >
                <Demo />
              </div>
              {/* Telemetry strip — project-specific runtime metadata */}
              <div
                className="flex items-center gap-2.5 px-1 font-mono text-[8px] tracking-[0.22em] uppercase whitespace-nowrap overflow-hidden"
                style={{ color: `${project.accent}b3` }}
              >
                {project.telemetry.map((item, i) => (
                  <span key={item} className="flex items-center gap-2.5">
                    {i > 0 && <span style={{ opacity: 0.32 }}>·</span>}
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vertical accent rule */}
      <div className="absolute top-0 bottom-0 left-0 w-px"
           style={{ background: `linear-gradient(to bottom, transparent, ${project.accent}40, transparent)` }} />

      {/* Content — slides in from right when section enters view */}
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 left-0 pb-12 md:pb-20 px-5 sm:px-10 md:px-20 max-w-2xl block group active:scale-[0.99] transition-transform duration-150"
        initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40, filter: 'blur(4px)' }}
        animate={sectionInView
          ? (reduced ? { opacity: 1 } : { opacity: 1, x: 0, filter: 'blur(0px)' })
          : {}}
        transition={{ type: 'spring', duration: 0.55, bounce: 0, delay: index * 0.12 + 0.15 }}
      >
        {/* Project id + badge + match indicator */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span className="font-rdna text-[0.6rem] tracking-[0.32em] uppercase"
                style={{ color: project.accent }}>
            Project {project.id}
          </span>
          {project.badge && (
            <span className="font-rdna text-[0.55rem] tracking-widest uppercase px-2 py-0.5 rounded-sm border"
                  style={{ color: project.accent, borderColor: `${project.accent}55`, background: `${project.accent}14` }}>
              {project.badge}
            </span>
          )}
          <AnimatePresence>
            {isAnyMatch && (
              <motion.span
                key={`match-${currentTrack}`}
                initial={{ opacity: 0, y: -2, filter: 'blur(2px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0)' }}
                exit={{    opacity: 0, y: 2,  filter: 'blur(2px)' }}
                transition={{ duration: 0.25 }}
                className="font-jetbrains text-[0.55rem] tracking-[0.22em] uppercase px-2 py-0.5 rounded-sm"
                style={{
                  color: 'var(--accent)',
                  border: '1px solid rgba(var(--accent-rgb),0.4)',
                  background: 'rgba(var(--accent-rgb),0.08)',
                }}
              >
                {isPrimaryMatch ? '★ ' : '· '}{TRACK_LABEL[currentTrack]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="overflow-hidden mb-5">
          <h2 className="font-signal leading-none tracking-[0.04em]"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', color: project.accent }}>
            {project.name}
          </h2>
        </div>

        <p className="font-body text-white/72 leading-relaxed mb-7 max-w-xl"
           style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-7">
          {project.tags.map(tag => (
            <span key={tag}
                  className="tech-chip"
                  style={{ borderColor: `${project.accent}33`, color: `${project.accent}cc` }}>
              {tag}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase"
              style={{ color: project.accent }}>
          View project
          <span className="transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
        </span>
      </motion.a>

      <div className="absolute top-8 right-10 font-mono text-[0.62rem] tracking-widest text-white/45"
           style={{ fontVariantNumeric: 'tabular-nums' }}>
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  )
}

export default function Projects() {
  const reduced       = useReducedMotion()
  const containerRef  = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(containerRef, { once: false, amount: 0.05 })

  const [theme, setTheme] = useState<string>('')
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme ?? '')
    const obs = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme ?? '')
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  const currentTrack = THEME_TRACK[theme] ?? 'systems'
  const sortedProjects = useMemo(
    () => sortByTrack(PROJECTS, currentTrack),
    [currentTrack]
  )
  const N = sortedProjects.length

  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `${-(N - 1) * 100}vw`])

  /* Arrow-key navigation between slides while the section is in view */
  useEffect(() => {
    if (!sectionInView) return
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      if (!containerRef.current) return
      e.preventDefault()
      const containerTop = containerRef.current.offsetTop
      const slideH = window.innerHeight
      const current = Math.round((window.scrollY - containerTop) / slideH)
      const dir = e.key === 'ArrowRight' ? 1 : -1
      const next = Math.max(0, Math.min(N - 1, current + dir))
      window.scrollTo({ top: containerTop + next * slideH, behavior: 'smooth' })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [sectionInView, N])

  return (
    <section ref={containerRef} id="projects" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute top-8 left-6 md:left-12 z-20"
          initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 100% 0 0)', filter: 'blur(4px)' }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Work · sorted by {TRACK_LABEL[currentTrack]}</span>
        </motion.div>

        {/* Arrow-key hint — only visible when section is the active one */}
        <AnimatePresence>
          {sectionInView && (
            <motion.div
              className="absolute bottom-6 right-8 z-20 hidden md:flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.22em] uppercase text-white/45 pointer-events-none"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: 4 }}
              transition={{ duration: 0.3 }}
            >
              <kbd className="px-1.5 py-0.5 rounded-sm border" style={{ borderColor: 'rgba(var(--accent-rgb),0.35)' }}>←</kbd>
              <kbd className="px-1.5 py-0.5 rounded-sm border" style={{ borderColor: 'rgba(var(--accent-rgb),0.35)' }}>→</kbd>
              <span>navigate</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="h-scroll-track"
          style={{ x, width: `${N * 100}vw` }}
        >
          {sortedProjects.map((p, i) => (
            <ProjectSlide
              key={p.id}
              project={p}
              index={i}
              total={N}
              sectionInView={sectionInView}
              reduced={reduced}
              currentTrack={currentTrack}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
