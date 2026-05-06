'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

const projects = [
  {
    id: 'VN2APK_001',
    name: 'vn2apk',
    state: 'PLANNING',
    priority: 'P0',
    sector: 'TOOLING',
    mode: 'Architecture',
    progress: 8,
    stack: ['Tauri v2', 'Rust', 'React', 'TypeScript'],
    desc: 'Desktop tool that converts PC visual novel and RPG game folders into signed Android APKs. Drag-and-drop UX, engine auto-detection, and a built-in toolchain manager. Architecture fully specced.',
  },
  {
    id: 'VK_RENDERER_002',
    name: 'Vulkan Renderer',
    state: 'COMPILING',
    priority: 'P1',
    sector: 'GRAPHICS',
    mode: 'Learning',
    progress: 32,
    stack: ['C++', 'Vulkan', 'GLSL', 'VMA'],
    desc: 'Learning Vulkan by building a renderer from scratch — triangle to spinning cube to textured scene. Swap chain, render pass, descriptor sets, and a basic lighting model so far.',
  },
  {
    id: 'WGPU_EXPLORER_003',
    name: 'WGPU Shader Explorer',
    state: 'INITIALIZING',
    priority: 'P1',
    sector: 'R&D',
    mode: 'Initializing',
    progress: 14,
    stack: ['Rust', 'WGPU', 'WGSL', 'Tauri v2'],
    desc: 'Local interactive playground for writing and live-previewing WGSL compute and fragment shaders. Tauri shell, real-time error feedback, and exportable shader snapshots.',
  },
] as const

const SEGS = 22

const STACK_COLOR: Record<string, string> = {
  'Tauri v2':     '#a78bfa',
  'Rust':         '#a78bfa',
  'React':        '#7dd3fc',
  'TypeScript':   '#7dd3fc',
  'C++':          '#fb923c',
  'Vulkan':       '#fb923c',
  'GLSL':         '#fbbf24',
  'VMA':          '#fbbf24',
  'WGPU':         '#34d399',
  'WGSL':         '#34d399',
  'Compute':      '#7dd3fc',
  'LLVM':         '#e879f9',
  'Android SDK':  '#bef264',
}

const STATE_COLOR: Record<string, string> = {
  PLANNING:    'rgba(255, 210, 80, 0.9)',
  COMPILING:   'rgba(var(--accent-rgb), 0.9)',
  INITIALIZING:'rgba(255, 170, 0, 0.88)',
  OPTIMIZING:  'rgba(0, 255, 160, 0.88)',
}
const STATE_BORDER: Record<string, string> = {
  PLANNING:    'rgba(255, 210, 80, 0.28)',
  COMPILING:   'rgba(var(--accent-rgb), 0.28)',
  INITIALIZING:'rgba(255, 170, 0, 0.28)',
  OPTIMIZING:  'rgba(0, 255, 160, 0.28)',
}
const STATE_BG: Record<string, string> = {
  PLANNING:    'rgba(255, 210, 80, 0.05)',
  COMPILING:   'rgba(var(--accent-rgb), 0.05)',
  INITIALIZING:'rgba(255, 170, 0, 0.05)',
  OPTIMIZING:  'rgba(0, 255, 160, 0.05)',
}

function SegBar({ pct, active }: { pct: number; active: boolean }) {
  const filled = Math.round((pct / 100) * SEGS)
  return (
    <div className="flex gap-[3px] items-center">
      {Array.from({ length: SEGS }).map((_, i) => (
        <motion.div
          key={i}
          className="h-[5px] flex-1 origin-left"
          style={{ borderRadius: 1 }}
          initial={{ scaleX: 0 }}
          animate={
            active
              ? { scaleX: 1, background: i < filled ? 'var(--accent)' : 'rgba(255,255,255,0.07)' }
              : { scaleX: 0 }
          }
          transition={{ delay: active ? i * 0.02 : 0, duration: 0.22, ease: 'easeOut' }}
        />
      ))}
      <span
        className="ml-2 font-jetbrains text-[0.52rem] tracking-widest shrink-0"
        style={{ color: 'var(--accent)' }}
      >
        {pct}%
      </span>
    </div>
  )
}

function Row({ proj, idx }: { proj: (typeof projects)[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      {idx > 0 && (
        <div
          className="h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.15) 20%, rgba(var(--accent-rgb),0.15) 80%, transparent)',
          }}
        />
      )}
      <motion.div
        ref={ref}
        className="py-9 grid grid-cols-1 md:grid-cols-12 gap-y-5 gap-x-8"
        initial={{ opacity: 0, y: 18 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: E }}
      >
        {/* ── ID + name + desc ── */}
        <div className="md:col-span-5">
          <p className="font-jetbrains text-[0.44rem] tracking-[0.22em] text-white/22 mb-2 uppercase">
            ▸ buffer_{String(idx + 1).padStart(2, '0')} · {proj.id}
          </p>
          <h3
            className={`font-signal leading-none tracking-[0.03em] text-chalk${active ? ' crt-text' : ''}`}
            style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)' }}
          >
            {proj.name}
          </h3>
          <p className="font-systems italic text-sm text-white/42 mt-2 leading-relaxed max-w-[28ch]">
            {proj.desc}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {proj.stack.map((s) => {
              const c = STACK_COLOR[s] ?? '#ffffff'
              return (
                <span
                  key={s}
                  className="font-jetbrains text-[0.46rem] tracking-widest px-2 py-0.5 rounded-[2px]"
                  style={{ color: `${c}bb`, border: `1px solid ${c}22`, background: `${c}08` }}
                >
                  {s}
                </span>
              )
            })}
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="md:col-span-4 flex flex-col justify-center gap-2">
          <p className="font-jetbrains text-[0.44rem] tracking-[0.22em] text-white/28 uppercase mb-1">
            Completion index
          </p>
          <SegBar pct={proj.progress} active={active} />
        </div>

        {/* ── Status codes ── */}
        <div className="md:col-span-3 flex flex-col gap-1.5 justify-center items-start md:items-end">
          <span
            className="font-jetbrains text-[0.44rem] tracking-[0.18em] px-2 py-1 rounded-[2px]"
            style={{
              color: STATE_COLOR[proj.state],
              border: `1px solid ${STATE_BORDER[proj.state]}`,
              background: STATE_BG[proj.state],
            }}
          >
            [STATE: {proj.state}]
          </span>
          {([
            `PRIORITY: ${proj.priority}`,
            `SECTOR: ${proj.sector}`,
            `MODE: ${proj.mode.toUpperCase()}`,
          ] as const).map((tag) => (
            <span
              key={tag}
              className="font-jetbrains text-[0.44rem] tracking-[0.18em] px-2 py-1 rounded-[2px] text-white/30"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            >
              [{tag}]
            </span>
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default function Pipeline() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      ref={ref}
      id="pipeline"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Ghost word */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-signal outlined-chalk opacity-[0.022]"
          style={{ fontSize: '18vw', lineHeight: 1 }}
        >
          PIPELINE
        </span>
      </motion.div>

      {/* Header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: E }}
      >
        <span className="section-label">06. Pipeline</span>
        <h2
          className="font-signal leading-none outlined mt-2"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          NEXT_OPS
        </h2>
        <p className="font-jetbrains text-[0.52rem] tracking-[0.25em] text-white/25 uppercase mt-3">
          ▸ Active build queue · {projects.length} buffers · Status: LIVE
        </p>
      </motion.div>

      {/* Rows */}
      <div>
        {projects.map((p, i) => (
          <Row key={p.id} proj={p} idx={i} />
        ))}
      </div>

      {/* Footer bar */}
      <div
        className="mt-10 pt-5 flex items-center gap-4"
        style={{ borderTop: '1px solid rgba(var(--accent-rgb),0.1)' }}
      >
        <span className="font-jetbrains text-[0.44rem] tracking-[0.22em] text-white/20 uppercase">
          END OF BUFFER ◼ {projects.length}/{projects.length} records
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(var(--accent-rgb),0.07)' }} />
        <span
          className="font-rdna text-[0.42rem] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(var(--accent-rgb),0.28)' }}
        >
          ✦ More incoming
        </span>
      </div>
    </section>
  )
}
