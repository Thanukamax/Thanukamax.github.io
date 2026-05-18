'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

const projects = [
  {
    id: 'vn2apk',
    name: 'vn2apk',
    state: 'SHIPPED',
    statusLabel: 'Shipped',
    progress: 100,
    url: 'https://github.com/Thanukamax/vn2apk/releases',
    stack: ['Tauri v2', 'Rust', 'React', 'TypeScript'],
    desc: 'Desktop tool that converts PC visual novel and RPG game folders into signed Android APKs. Drag-and-drop UX, engine auto-detection, and a built-in toolchain manager.',
  },
  {
    id: 'vulkan-renderer',
    name: 'Vulkan Renderer',
    state: 'COMPILING',
    statusLabel: 'In progress',
    progress: 14,
    url: 'https://github.com/Thanukamax/vulkan-renderer',
    stack: ['C++', 'Vulkan', 'GLSL', 'VMA'],
    desc: 'Learning Vulkan by building a renderer from scratch — triangle to spinning cube to textured scene. Phase 1 (GLFW window + VkInstance + physical device enumeration) shipped; logical device, swap chain, render pass coming next.',
  },
  {
    id: 'wgpu-explorer',
    name: 'WGPU Shader Explorer',
    state: 'INITIALIZING',
    statusLabel: 'Starting',
    progress: 10,
    url: 'https://github.com/Thanukamax/wgpu-shader-explorer',
    stack: ['Rust', 'WGPU', 'WGSL', 'Tauri v2'],
    desc: 'Local interactive playground for writing and live-previewing WGSL compute and fragment shaders. Tauri v2 shell with native wgpu/naga validator (Phase 0 shipped); live preview, snippets library, uniforms panel landing next.',
  },
] as const

const SEGS = 22

const STACK_COLOR: Record<string, string> = {
  'Tauri v2': '#a78bfa', 'Rust': '#a78bfa', 'React': '#7dd3fc', 'TypeScript': '#7dd3fc',
  'C++': '#fb923c', 'Vulkan': '#fb923c', 'GLSL': '#fbbf24', 'VMA': '#fbbf24',
  'WGPU': '#34d399', 'WGSL': '#34d399',
}

const STATE_COLOR: Record<string, string> = {
  COMPILING:    'rgba(var(--accent-rgb),0.9)',
  INITIALIZING: 'rgba(255,170,0,0.9)',
  SHIPPED:      'rgba(0,255,160,0.9)',
}
const STATE_BORDER: Record<string, string> = {
  COMPILING:    'rgba(var(--accent-rgb),0.3)',
  INITIALIZING: 'rgba(255,170,0,0.3)',
  SHIPPED:      'rgba(0,255,160,0.3)',
}
const STATE_BG: Record<string, string> = {
  COMPILING:    'rgba(var(--accent-rgb),0.06)',
  INITIALIZING: 'rgba(255,170,0,0.06)',
  SHIPPED:      'rgba(0,255,160,0.06)',
}

function SegBar({ pct, active }: { pct: number; active: boolean }) {
  const filled = Math.round((pct / 100) * SEGS)
  return (
    <div className="flex gap-[3px] items-center">
      {Array.from({ length: SEGS }).map((_, i) => (
        <motion.div key={i} className="h-[5px] flex-1 origin-left" style={{ borderRadius: 1 }}
          initial={{ scaleX: 0 }}
          animate={active
            ? { scaleX: 1, background: i < filled ? 'var(--accent)' : 'rgba(255,255,255,0.07)' }
            : { scaleX: 0 }}
          transition={{ delay: active ? i * 0.02 : 0, duration: 0.2, ease: 'easeOut' }}
        />
      ))}
      <span className="ml-2 font-jetbrains text-[0.6rem] tracking-widest shrink-0"
            style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
        {pct}%
      </span>
    </div>
  )
}

function Card({ proj, idx }: { proj: (typeof projects)[number]; idx: number }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref, { once: false, amount: 0.1, margin: '-80px' })

  const inner = (
    <motion.div
      ref={ref}
      className="relative rounded-sm p-7 md:p-9 grid grid-cols-1 md:grid-cols-12 gap-y-5 gap-x-8 overflow-hidden active:scale-[0.995] transition-transform duration-150"
      style={{ border: '1px solid rgba(var(--accent-rgb),0.1)', background: 'var(--bg-surface)' }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: 48, filter: 'blur(4px)' }}
      animate={active ? (reduced ? { opacity: 1 } : { opacity: 1, x: 0, filter: 'blur(0px)' }) : {}}
      whileHover={proj.url ? { borderColor: 'rgba(var(--accent-rgb),0.35)', background: 'rgba(var(--accent-rgb),0.04)' } : {}}
      transition={{ duration: 0.5, ease: E, delay: idx * 0.08 }}
    >
      <div className="absolute left-0 top-7 bottom-7 w-[2px] rounded-r"
           style={{ background: STATE_COLOR[proj.state] ?? 'var(--accent)' }} />

      <div className="md:col-span-7 pl-4">
        <h3 className={`font-signal leading-none tracking-[0.03em] text-chalk${active ? ' crt-text' : ''}`}
            style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)' }}>
          {proj.name}
        </h3>
        <p className="font-systems italic text-sm text-white/65 mt-3 leading-relaxed max-w-[42ch]">{proj.desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {proj.stack.map((s) => {
            const c = STACK_COLOR[s] ?? '#ffffff'
            return (
              <span key={s} className="font-jetbrains text-[0.5rem] tracking-widest px-2 py-0.5 rounded-[2px]"
                    style={{ color: `${c}d0`, border: `1px solid ${c}33`, background: `${c}10` }}>
                {s}
              </span>
            )
          })}
        </div>
        {proj.url && (
          <p className="font-mono text-[0.58rem] tracking-widest uppercase mt-4" style={{ color: 'rgba(var(--accent-rgb),0.7)' }}>
            View ↗
          </p>
        )}
      </div>

      <div className="md:col-span-3 flex flex-col justify-center gap-2">
        <p className="font-jetbrains text-[0.5rem] tracking-[0.22em] text-white/55 uppercase mb-1">Completion</p>
        <SegBar pct={proj.progress} active={active} />
      </div>

      <div className="md:col-span-2 flex flex-col gap-2 justify-center items-start md:items-end">
        <span className="font-jetbrains text-[0.55rem] tracking-[0.18em] px-2.5 py-1 rounded-[2px] uppercase"
          style={{
            color: STATE_COLOR[proj.state],
            border: `1px solid ${STATE_BORDER[proj.state]}`,
            background: STATE_BG[proj.state],
          }}>
          {proj.statusLabel}
        </span>
      </div>
    </motion.div>
  )

  return (
    <div className="mb-4">
      {proj.url
        ? <a href={proj.url} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
        : inner}
    </div>
  )
}

export default function Pipeline() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section ref={ref} id="pipeline" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <motion.div style={{ y: bgY }}
        className="absolute -right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true">
        <span className="font-signal outlined-chalk opacity-[0.022]" style={{ fontSize: '18vw', lineHeight: 1 }}>
          BUILDING
        </span>
      </motion.div>

      {/* Header — slide from right with Jakub blur */}
      <motion.div className="mb-16"
        initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40, filter: 'blur(4px)' }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0 }}>
        <span className="section-label">Currently building</span>
        <h2 className="font-signal leading-none outlined mt-2" style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}>
          IN PROGRESS
        </h2>
      </motion.div>

      <div className="space-y-3">
        {projects.map((p, i) => <Card key={p.id} proj={p} idx={i} />)}
      </div>
    </section>
  )
}
