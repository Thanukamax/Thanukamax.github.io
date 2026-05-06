'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

const projects = [
  {
    id: 'VK_PT_001',
    name: 'Vulkan Path Tracer',
    state: 'COMPILING',
    priority: 'P0',
    sector: 'R&D',
    mode: 'Experimental',
    progress: 65,
    stack: ['C++', 'Vulkan', 'GLSL', 'Compute'],
    desc: 'Real-time path tracer on Vulkan compute pipelines. BVH traversal, importance sampling, and a denoising pass — currently mid-build.',
  },
  {
    id: 'RDNA3_PROF_002',
    name: 'RDNA3 Micro-arch Profiler',
    state: 'INITIALIZING',
    priority: 'P1',
    sector: 'PERF',
    mode: 'Initializing',
    progress: 20,
    stack: ['C++', 'Ghidra', 'RDNA ISA', 'LLVM'],
    desc: 'Low-level profiler targeting RDNA3 wave scheduling, occupancy metrics, and L1/L2 cache telemetry at the ISA level.',
  },
  {
    id: 'UE5_PHYS_003',
    name: 'UE5 Physics Solver',
    state: 'OPTIMIZING',
    priority: 'P0',
    sector: 'SIMULATION',
    mode: 'Optimization',
    progress: 85,
    stack: ['C++', 'UE5', 'Chaos', 'SIMD'],
    desc: 'Custom constraint-based solver replacing Chaos defaults. Targeting deterministic simulation with reduced per-tick overhead.',
  },
] as const

const SEGS = 22

const STATE_COLOR: Record<string, string> = {
  COMPILING:   'rgba(var(--accent-rgb), 0.9)',
  INITIALIZING:'rgba(255, 170, 0, 0.88)',
  OPTIMIZING:  'rgba(0, 255, 160, 0.88)',
}
const STATE_BORDER: Record<string, string> = {
  COMPILING:   'rgba(var(--accent-rgb), 0.28)',
  INITIALIZING:'rgba(255, 170, 0, 0.28)',
  OPTIMIZING:  'rgba(0, 255, 160, 0.28)',
}
const STATE_BG: Record<string, string> = {
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
            {proj.stack.map((s) => (
              <span
                key={s}
                className="font-jetbrains text-[0.46rem] tracking-widest px-2 py-0.5 rounded-[2px]"
                style={{
                  color: 'rgba(var(--accent-rgb),0.6)',
                  border: '1px solid rgba(var(--accent-rgb),0.15)',
                  background: 'rgba(var(--accent-rgb),0.04)',
                }}
              >
                {s}
              </span>
            ))}
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
