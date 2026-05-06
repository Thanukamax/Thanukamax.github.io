'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'

interface Project {
  id: string
  name: string
  description: string
  accent: string
  tags: { text: string; font: string }[]
  badge: string | null
  href: string
  visual: string
}

const projects: Project[] = [
  {
    id: '001',
    name: 'CROW',
    description:
      'Unified customer interaction intelligence platform — 6-person SDGP team, two live clients, Cloudflare microservices, real-time CCTV ingest pipeline, and 3K+ commits in production.',
    accent: '#a78bfa',
    tags: [
      { text: 'TypeScript', font: 'font-mono' },
      { text: 'Cloudflare Workers', font: 'font-mono' },
      { text: 'Computer Vision', font: 'font-mono' },
      { text: 'Workers AI', font: 'font-mono' },
    ],
    badge: 'SDGP',
    href: 'https://github.com/thanukamax',
    visual: 'radial-gradient(ellipse 55% 55% at 65% 45%, rgba(167,139,250,0.18) 0%, transparent 70%), linear-gradient(135deg, rgba(167,139,250,0.06) 0%, transparent 60%)',
  },
  {
    id: '002',
    name: 'DONGHUA-CLI',
    description:
      'Terminal streaming client for Chinese animation — search, pick, and play directly from the CLI. MPV-backed, cached, with preloading so video starts in under 15 seconds on most mirrors.',
    accent: '#ffaa44',
    tags: [
      { text: 'Python', font: 'font-rust' },
      { text: 'Scraping', font: 'font-mono' },
      { text: 'Streaming', font: 'font-mono' },
      { text: 'MPV', font: 'font-mono' },
    ],
    badge: null,
    href: 'https://github.com/thanukamax',
    visual: 'radial-gradient(ellipse 55% 55% at 65% 45%, rgba(255,170,68,0.16) 0%, transparent 70%), linear-gradient(135deg, rgba(255,170,68,0.05) 0%, transparent 60%)',
  },
  {
    id: '003',
    name: 'VN2APK',
    description:
      'Tauri v2 desktop app that packages PC visual novel and RPG game folders into signed Android APKs — drag-and-drop workflow, Rust process orchestration, React UI, one-click deploy.',
    accent: '#34d399',
    tags: [
      { text: 'Rust', font: 'font-rust' },
      { text: 'Tauri v2', font: 'font-mono' },
      { text: 'React', font: 'font-mono' },
      { text: 'Android SDK', font: 'font-mono' },
    ],
    badge: 'WIP',
    href: 'https://github.com/thanukamax',
    visual: 'radial-gradient(ellipse 55% 55% at 65% 45%, rgba(52,211,153,0.15) 0%, transparent 70%), linear-gradient(135deg, rgba(52,211,153,0.05) 0%, transparent 60%)',
  },
]

const N = projects.length

function ProjectSlide({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative w-screen h-screen flex-shrink-0 overflow-hidden flex items-end">
      {/* Background visual */}
      <div className="absolute inset-0" style={{ background: '#030304' }}>
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: index * 1.5 }}
          style={{ background: project.visual }}
        />
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
        className="absolute right-0 bottom-[-0.1em] font-signal leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(18rem, 35vw, 38rem)',
          color: project.accent,
          opacity: 0.04,
        }}
        aria-hidden="true"
      >
        {index + 1}
      </span>

      {/* Vertical accent rule */}
      <div className="absolute top-0 bottom-0 left-0 w-px"
           style={{ background: `linear-gradient(to bottom, transparent, ${project.accent}40, transparent)` }} />

      {/* Content */}
      <div className="relative z-10 pb-12 md:pb-20 px-5 sm:px-10 md:px-20 max-w-4xl">
        {/* Module ID + badge */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-rdna text-[0.55rem] tracking-[0.32em] uppercase"
                style={{ color: project.accent }}>
            MODULE {project.id}
          </span>
          {project.badge && (
            <span className="font-rdna text-[0.5rem] tracking-widest uppercase px-2 py-0.5 rounded-sm border"
                  style={{ color: project.accent, borderColor: `${project.accent}40`, background: `${project.accent}0f` }}>
              {project.badge}
            </span>
          )}
        </div>

        {/* Project name */}
        <div className="overflow-hidden mb-5">
          <h2 className="font-signal leading-none tracking-[0.04em]"
              style={{ fontSize: 'clamp(4rem, 9vw, 10rem)', color: project.accent }}>
            {project.name}
          </h2>
        </div>

        {/* Description */}
        <p className="font-body text-white/55 leading-relaxed mb-7 max-w-2xl"
           style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(tag => (
            <span key={tag.text}
                  className={`tech-chip ${tag.font}`}
                  style={{ borderColor: `${project.accent}22`, color: `${project.accent}90` }}>
              {tag.text}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a href={project.href} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.18em] uppercase group"
           style={{ color: project.accent }}>
          View Project
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
        </a>
      </div>

      {/* Slide counter — top right */}
      <div className="absolute top-8 right-10 font-mono text-[0.58rem] tracking-widest text-white/20">
        {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
      </div>
    </div>
  )
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `${-(N - 1) * 100}vw`])

  const labelVariants: Variants = {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section ref={containerRef} id="projects" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section label */}
        <motion.div
          className="absolute top-8 left-6 md:left-12 z-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={labelVariants}
        >
          <span className="section-label">02. Build Archive</span>
        </motion.div>

        {/* Horizontal strip */}
        <motion.div
          className="h-scroll-track"
          style={{ x, width: `${N * 100}vw` }}
        >
          {projects.map((p, i) => (
            <ProjectSlide key={p.id} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
