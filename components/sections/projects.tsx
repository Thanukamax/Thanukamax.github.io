'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'

/* ─── Decorative SVG outline graphics ─── */

function CrowGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 520 380" fill="none" xmlns="http://www.w3.org/2000/svg"
         className="w-full h-full" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <ellipse cx="345" cy="112" rx="48" ry="44" strokeWidth="2"/>
      {/* Beak */}
      <path d="M 388 95 L 455 85 L 450 108 L 388 112 Z" strokeWidth="2"/>
      {/* Eye */}
      <circle cx="358" cy="100" r="9" strokeWidth="2"/>
      <circle cx="361" cy="97" r="3" strokeWidth="1.5"/>
      {/* Neck to body */}
      <path d="M 308 148 C 295 165 280 182 275 200" strokeWidth="2"/>
      {/* Body */}
      <path d="M 175 210 C 200 192 245 184 285 188 C 318 192 345 206 352 225
               C 358 242 345 262 318 270 C 288 280 250 276 220 264
               C 188 251 168 232 175 210 Z" strokeWidth="2"/>
      {/* Left wing — upper sweep */}
      <path d="M 198 205 C 158 188 105 174 55 170 C 22 168 2 176 10 190
               C 48 182 95 187 138 202" strokeWidth="1.8"/>
      {/* Left wing — lower sweep */}
      <path d="M 188 228 C 142 238 88 248 40 250 C 8 252 -2 263 12 268
               C 55 258 105 252 148 254" strokeWidth="1.8"/>
      {/* Right wing — upper sweep */}
      <path d="M 335 200 C 372 185 415 176 455 178 C 478 180 482 192 466 198
               C 430 191 385 196 348 212" strokeWidth="1.8"/>
      {/* Right wing — lower sweep */}
      <path d="M 340 232 C 378 222 420 218 458 222 C 478 225 480 236 464 240
               C 426 234 382 234 348 244" strokeWidth="1.8"/>
      {/* Tail feathers */}
      <path d="M 182 258 C 160 278 150 302 156 322" strokeWidth="1.6"/>
      <path d="M 198 268 C 182 290 176 316 184 336" strokeWidth="1.6"/>
      <path d="M 216 274 C 204 298 202 325 212 344" strokeWidth="1.6"/>
      <path d="M 235 274 C 228 300 228 328 240 346" strokeWidth="1.6"/>
    </svg>
  )
}

function DragonGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 420 540" fill="none" xmlns="http://www.w3.org/2000/svg"
         className="w-full h-full" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Dragon head - main form */}
      <path d="M 105 220 C 85 195 78 165 85 138 C 92 110 112 90 138 82
               C 168 72 202 80 225 102 C 248 124 255 155 248 184
               C 241 212 220 232 194 240 C 166 248 130 240 105 220 Z" strokeWidth="2.2"/>
      {/* Snout extension */}
      <path d="M 225 102 C 258 90 295 88 325 98 C 350 106 365 124 362 146
               C 358 168 338 182 312 186 C 285 190 258 178 242 158 C 228 140 228 118 238 105" strokeWidth="2.2"/>
      {/* Upper horn - left */}
      <path d="M 138 82 C 122 58 116 28 128 8 C 140 30 148 62 152 88" strokeWidth="2"/>
      {/* Upper horn - right */}
      <path d="M 185 75 C 172 48 172 18 185 0 C 195 20 198 52 200 80" strokeWidth="2"/>
      {/* Eye */}
      <ellipse cx="190" cy="148" rx="22" ry="18" strokeWidth="2"/>
      <ellipse cx="193" cy="145" rx="10" ry="10" strokeWidth="1.5"/>
      {/* Nostril */}
      <path d="M 310 118 C 318 110 330 112 332 122 C 330 130 320 132 314 126" strokeWidth="1.8"/>
      {/* Whiskers — flowing out left */}
      <path d="M 325 148 C 355 140 385 128 408 110" strokeWidth="1.8"/>
      <path d="M 322 162 C 352 162 380 158 402 148" strokeWidth="1.8"/>
      <path d="M 315 178 C 342 185 368 190 388 184" strokeWidth="1.6"/>
      {/* Lower jaw */}
      <path d="M 105 220 C 118 248 148 268 182 275 C 215 282 250 275 272 256
               C 295 237 302 208 295 182" strokeWidth="2"/>
      {/* Chin whiskers / beard */}
      <path d="M 195 275 C 182 302 178 330 186 355" strokeWidth="1.8"/>
      <path d="M 218 278 C 215 308 218 338 228 362" strokeWidth="1.8"/>
      <path d="M 240 272 C 248 300 255 330 258 358" strokeWidth="1.6"/>
      {/* Neck with scales */}
      <path d="M 95 232 C 78 260 72 292 80 322 C 88 352 108 375 135 388" strokeWidth="2"/>
      <path d="M 110 252 C 102 272 106 295 120 310" strokeWidth="1.5"/>
      <path d="M 128 265 C 122 282 126 302 140 316" strokeWidth="1.5"/>
      {/* Scale hints along neck */}
      <path d="M 86 268 C 96 262 108 265 112 275" strokeWidth="1.4"/>
      <path d="M 82 292 C 94 285 108 288 112 300" strokeWidth="1.4"/>
      <path d="M 84 316 C 97 310 112 314 115 326" strokeWidth="1.4"/>
    </svg>
  )
}

function RenpyGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 380 440" fill="none" xmlns="http://www.w3.org/2000/svg"
         className="w-full h-full" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Face outline */}
      <ellipse cx="190" cy="218" rx="118" ry="130" strokeWidth="2.2"/>
      {/* Left cat ear */}
      <path d="M 78 155 C 62 118 66 82 82 60 C 95 88 100 122 102 155" strokeWidth="2"/>
      {/* Right cat ear */}
      <path d="M 302 155 C 318 118 314 82 298 60 C 285 88 280 122 278 155" strokeWidth="2"/>
      {/* Inner left ear */}
      <path d="M 84 148 C 74 122 78 96 88 76 C 96 96 99 122 100 148" strokeWidth="1.4"/>
      {/* Inner right ear */}
      <path d="M 296 148 C 306 122 302 96 292 76 C 284 96 281 122 280 148" strokeWidth="1.4"/>
      {/* Hair top sweep */}
      <path d="M 84 150 C 80 110 90 75 115 55 C 140 36 168 26 190 24
               C 212 22 240 30 262 48 C 285 66 298 95 298 128" strokeWidth="2"/>
      {/* Hair strands */}
      <path d="M 115 55 C 108 38 112 20 120 8" strokeWidth="1.6"/>
      <path d="M 148 38 C 145 20 150 6 158 -2" strokeWidth="1.6"/>
      <path d="M 232 32 C 238 15 245 4 252 -2" strokeWidth="1.6"/>
      {/* Left eye - large anime style */}
      <ellipse cx="148" cy="215" rx="30" ry="26" strokeWidth="2"/>
      <ellipse cx="148" cy="217" rx="16" ry="16" strokeWidth="1.8"/>
      <circle cx="158" cy="208" r="5" strokeWidth="1.2"/>
      {/* Right eye */}
      <ellipse cx="232" cy="215" rx="30" ry="26" strokeWidth="2"/>
      <ellipse cx="232" cy="217" rx="16" ry="16" strokeWidth="1.8"/>
      <circle cx="242" cy="208" r="5" strokeWidth="1.2"/>
      {/* Nose */}
      <path d="M 183 254 C 188 260 198 260 203 254" strokeWidth="1.8"/>
      {/* Mouth — small smile */}
      <path d="M 165 278 C 178 290 202 290 215 278" strokeWidth="2"/>
      {/* Blush marks */}
      <path d="M 105 244 C 112 248 124 248 130 244" strokeWidth="2.5"/>
      <path d="M 250 244 C 256 248 268 248 275 244" strokeWidth="2.5"/>
      {/* Scroll / book — held at bottom */}
      <rect x="130" y="340" width="120" height="76" rx="5" strokeWidth="2"/>
      {/* Scroll rollers */}
      <path d="M 142 340 C 136 326 136 312 142 300 C 154 296 166 302 168 312 L 168 340" strokeWidth="1.8"/>
      <path d="M 238 340 C 244 326 244 312 238 300 C 226 296 214 302 212 312 L 212 340" strokeWidth="1.8"/>
      {/* Text lines on scroll */}
      <line x1="148" y1="358" x2="232" y2="358" strokeWidth="1.4"/>
      <line x1="148" y1="370" x2="232" y2="370" strokeWidth="1.4"/>
      <line x1="148" y1="382" x2="208" y2="382" strokeWidth="1.4"/>
      {/* Arms holding scroll */}
      <path d="M 110 318 C 120 340 128 350 132 360" strokeWidth="1.8"/>
      <path d="M 270 318 C 260 340 252 350 248 360" strokeWidth="1.8"/>
    </svg>
  )
}

const GRAPHICS: Record<string, (color: string) => React.ReactElement> = {
  '001': (color) => <CrowGraphic color={color} />,
  '002': (color) => <DragonGraphic color={color} />,
  '003': (color) => <RenpyGraphic color={color} />,
}

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
    href: 'https://github.com/Thanukamax',
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
    href: 'https://github.com/Thanukamax',
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
    badge: 'v1.0.0',
    href: 'https://github.com/Thanukamax/vn2apk/releases',
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

      {/* Decorative SVG outline graphic */}
      {GRAPHICS[project.id] && (
        <div
          className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 pointer-events-none select-none"
          style={{ opacity: 0.07 }}
          aria-hidden="true"
        >
          {GRAPHICS[project.id](project.accent)}
        </div>
      )}

      {/* Vertical accent rule */}
      <div className="absolute top-0 bottom-0 left-0 w-px"
           style={{ background: `linear-gradient(to bottom, transparent, ${project.accent}40, transparent)` }} />

      {/* Content */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 pb-12 md:pb-20 px-5 sm:px-10 md:px-20 max-w-4xl block group"
      >
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
        <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.18em] uppercase"
              style={{ color: project.accent }}>
          View Project
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
        </span>
      </a>

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
