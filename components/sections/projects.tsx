'use client'

import { motion, type Variants } from 'framer-motion'
import TiltCard from '@/components/ui/tilt-card'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

const projects = [
  {
    id: '01',
    name: 'donghua-cli',
    description:
      'Terminal streaming client for Chinese animation — search, pick, and play directly from the CLI. MPV-backed, cached, with preloading so video starts in under 15 seconds on most mirrors.',
    accent: '#ffaa44',
    tags: ['Python', 'Scraping', 'Streaming', 'MPV'],
    badge: null,
    href: 'https://github.com/thanukamax',
    span: 'col-span-12 md:col-span-7',
    minH: 320,
  },
  {
    id: '02',
    name: 'CROW',
    description:
      'Unified customer interaction intelligence platform — 6-person SDGP team, two live clients, Cloudflare microservices, real-time CCTV ingest pipeline, and 3K+ commits in production.',
    accent: '#a78bfa',
    tags: ['TypeScript', 'Cloudflare Workers', 'Computer Vision', 'Workers AI'],
    badge: 'SDGP',
    href: 'https://github.com/thanukamax',
    span: 'col-span-12 md:col-span-5',
    minH: 320,
  },
  {
    id: '03',
    name: 'vn2apk',
    description:
      'Tauri v2 desktop app that packages PC visual novel / RPG game folders into signed Android APKs — drag-and-drop workflow, Rust process orchestration, React UI, one-click deploy.',
    accent: '#34d399',
    tags: ['Rust', 'Tauri v2', 'React', 'Android SDK'],
    badge: 'WIP',
    href: 'https://github.com/thanukamax',
    span: 'col-span-12',
    minH: 240,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section label */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={0}
        variants={fadeUp}
        className="mb-12"
      >
        <span className="section-label">02. Deployed</span>
        <h2
          className="font-display font-black tracking-tight text-[#f0f2f7] mt-3"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.0' }}
        >
          Deployed Modules
        </h2>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className={project.span}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={i + 1}
            variants={fadeUp}
            style={{ minHeight: project.minH }}
          >
            <TiltCard>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col h-full rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(255, 255, 255, 0.025)',
                  minHeight: project.minH,
                }}
              >
                {/* Hover radial glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${project.accent}18 0%, transparent 70%)`,
                  }}
                />

                {/* Hover bg lighten */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-white/[0.02]" />

                {/* Header row */}
                <div className="relative z-10 flex items-start justify-between mb-auto">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs tracking-[0.15em] uppercase"
                      style={{ color: project.accent }}
                    >
                      {project.id}
                    </span>
                    {project.badge && (
                      <span
                        className="font-mono text-[0.6rem] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                        style={{
                          color: project.accent,
                          borderColor: `${project.accent}40`,
                          background: `${project.accent}10`,
                        }}
                      >
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Arrow — moves on hover */}
                  <span
                    className="font-body text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: `${project.accent}80` }}
                  >
                    ↗
                  </span>
                </div>

                {/* Project name */}
                <div className="relative z-10 mt-8 mb-4">
                  <h3
                    className="font-display font-black leading-none tracking-tight"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      color: project.accent,
                    }}
                  >
                    {project.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="relative z-10 font-body text-sm leading-relaxed text-[rgba(240,242,247,0.6)] mb-6 max-w-lg">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tech-chip"
                      style={{
                        borderColor: `${project.accent}25`,
                        color: `${project.accent}99`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
