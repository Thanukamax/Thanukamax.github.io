'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

type Tier = 'core' | 'bridge' | 'peripheral'

const NODES: {
  id: string; label: string; sub: string; tier: Tier
  x: number; y: number; r: number; font: string
  fd: number; fa: number; delay: number
}[] = [
  { id: 'cpp',     label: 'C++',         sub: 'CORE LANG',  tier: 'core',       x: 450, y: 220, r: 30, font: 'var(--font-fira)',      fd: 4.2, fa: 5,  delay: 0    },
  { id: 'rdna',    label: 'RDNA',        sub: 'MICROARCH',  tier: 'core',       x: 192, y: 108, r: 25, font: 'var(--font-orbitron)',  fd: 5.8, fa: 7,  delay: 0.3  },
  { id: 'gpu',     label: 'GPU HW',      sub: 'SILICON',    tier: 'core',       x: 710, y: 108, r: 25, font: 'var(--font-orbitron)',  fd: 6.5, fa: 6,  delay: 0.6  },
  { id: 'physx',   label: 'PhysX',       sub: '',           tier: 'bridge',     x: 136, y: 342, r: 19, font: 'var(--font-space)',     fd: 7.2, fa: 9,  delay: 0.2  },
  { id: 'ghidra',  label: 'Ghidra',      sub: '',           tier: 'bridge',     x: 346, y: 388, r: 19, font: 'var(--font-vt323)',     fd: 5.5, fa: 8,  delay: 0.5  },
  { id: 'unity',   label: 'Unity',       sub: '',           tier: 'bridge',     x: 566, y: 365, r: 19, font: 'var(--font-space)',     fd: 6.8, fa: 7,  delay: 0.8  },
  { id: 'ue5',     label: 'UE5',         sub: '',           tier: 'bridge',     x: 806, y: 246, r: 19, font: 'var(--font-audiowide)', fd: 7.9, fa: 6,  delay: 1.1  },
  { id: 'react',   label: 'React',       sub: '',           tier: 'peripheral', x: 54,  y: 216, r: 13, font: 'var(--font-jetbrains)', fd: 8.5, fa: 11, delay: 0.4  },
  { id: 'ts',      label: 'TypeScript',  sub: '',           tier: 'peripheral', x: 244, y: 468, r: 13, font: 'var(--font-jetbrains)', fd: 7.1, fa: 10, delay: 0.7  },
  { id: 'blender', label: 'Blender',     sub: '',           tier: 'peripheral', x: 822, y: 452, r: 13, font: 'var(--font-space)',     fd: 9.2, fa: 9,  delay: 1.0  },
]

const EDGES: { id: string; from: string; to: string }[] = [
  { id: 'rdna-gpu',      from: 'rdna',   to: 'gpu'     },
  { id: 'rdna-cpp',      from: 'rdna',   to: 'cpp'     },
  { id: 'gpu-cpp',       from: 'gpu',    to: 'cpp'     },
  { id: 'gpu-ue5',       from: 'gpu',    to: 'ue5'     },
  { id: 'cpp-physx',     from: 'cpp',    to: 'physx'   },
  { id: 'cpp-ghidra',    from: 'cpp',    to: 'ghidra'  },
  { id: 'cpp-unity',     from: 'cpp',    to: 'unity'   },
  { id: 'cpp-ue5',       from: 'cpp',    to: 'ue5'     },
  { id: 'rdna-ghidra',   from: 'rdna',   to: 'ghidra'  },
  { id: 'physx-ue5',     from: 'physx',  to: 'ue5'     },
  { id: 'unity-ts',      from: 'unity',  to: 'ts'      },
  { id: 'react-ts',      from: 'react',  to: 'ts'      },
  { id: 'unity-blender', from: 'unity',  to: 'blender' },
]

const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]))

/* Portrait coordinates for mobile SVG (viewBox 380 × 450) */
const MOBILE_COORDS: Record<string, { x: number; y: number }> = {
  cpp:     { x: 190, y: 148 },
  rdna:    { x: 80,  y: 72  },
  gpu:     { x: 298, y: 72  },
  physx:   { x: 52,  y: 255 },
  ghidra:  { x: 145, y: 288 },
  unity:   { x: 242, y: 268 },
  ue5:     { x: 334, y: 200 },
  react:   { x: 52,  y: 385 },
  ts:      { x: 175, y: 418 },
  blender: { x: 320, y: 388 },
}

const TIER_COLOR: Record<Tier, string> = {
  core:       '#7dd3fc',  // sky   — hardware / silicon
  bridge:     '#fbbf24',  // amber — engines / tools
  peripheral: '#a78bfa',  // violet — web / creative
}

function tierFill(tier: Tier, active: boolean) {
  const base = { core: 0.1, bridge: 0.065, peripheral: 0.04 }[tier]
  return active ? base * 3.5 : base
}
function tierStroke(tier: Tier, active: boolean) {
  const base = { core: 0.8, bridge: 0.5, peripheral: 0.28 }[tier]
  return active ? 1 : base
}
function tierStrokeW(tier: Tier, active: boolean) {
  const base = { core: 1.6, bridge: 1.2, peripheral: 0.9 }[tier]
  return active ? base * 1.6 : base
}
function labelSize(tier: Tier) {
  return { core: 11, bridge: 9.5, peripheral: 8 }[tier]
}

function PulseDot({ x1, y1, x2, y2, d }: { x1: number; y1: number; x2: number; y2: number; d: number }) {
  return (
    <motion.circle
      cx={x1} cy={y1} r={2.5}
      fill="var(--accent)"
      filter="url(#ic-glow)"
      animate={{ x: [0, x2 - x1], y: [0, y2 - y1] }}
      transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut', delay: d }}
    />
  )
}

export default function Interconnect() {
  const [hovered, setHovered] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      ref={sectionRef}
      id="interconnect"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Ghost word */}
      <motion.div
        style={{ y: bgY }}
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-signal outlined-chalk opacity-[0.018]"
          style={{ fontSize: '22vw', lineHeight: 1 }}
        >
          GRAPH
        </span>
      </motion.div>

      {/* Label */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: E }}
      >
        <span className="section-label">03.5 Subsystem Map</span>
        <h2
          className="font-signal leading-none outlined mt-2"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}
        >
          INTERCONNECT
        </h2>
        <p className="font-jetbrains text-[0.5rem] tracking-[0.22em] text-white/25 uppercase mt-2">
          ▸ Hover a node to trace signal paths
        </p>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mb-8">
        {(['core', 'bridge', 'peripheral'] as Tier[]).map(tier => (
          <div key={tier} className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: TIER_COLOR[tier],
                boxShadow: `0 0 6px ${TIER_COLOR[tier]}88`,
              }}
            />
            <span className="font-jetbrains text-[0.46rem] tracking-[0.2em] uppercase"
              style={{ color: `${TIER_COLOR[tier]}88` }}>
              {tier}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile: animated portrait graph — auto-playing, tap to highlight */}
      <motion.div
        className="md:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.1, ease: E }}
      >
        <p className="font-jetbrains text-[0.42rem] tracking-[0.22em] text-white/25 uppercase mb-4">
          ▸ Tap a node to trace signal paths
        </p>
        <svg
          viewBox="0 0 380 450"
          className="w-full select-none"
          style={{ overflow: 'visible' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="ic-glow-m" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {EDGES.map(edge => {
            const a  = MOBILE_COORDS[edge.from]
            const b  = MOBILE_COORDS[edge.to]
            const nf = NODE_MAP[edge.from]
            const active = hovered === edge.from || hovered === edge.to
            return (
              <g key={edge.id + '-m'}>
                {active && (
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    style={{ stroke: 'var(--accent)', strokeOpacity: 0.13, strokeWidth: 5 }}
                    vectorEffect="non-scaling-stroke" />
                )}
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  style={{
                    stroke: 'var(--accent)',
                    strokeOpacity: active ? 0.6 : 0.11,
                    strokeWidth:   active ? 1.5  : 0.7,
                    transition: 'stroke-opacity 0.25s, stroke-width 0.25s',
                  }}
                  vectorEffect="non-scaling-stroke" />
                {/* Always-on pulse for mobile — one dot per edge */}
                <PulseDot x1={a.x} y1={a.y} x2={b.x} y2={b.y} d={nf.delay} />
              </g>
            )
          })}

          {/* Nodes */}
          {NODES.map(node => {
            const mn  = MOBILE_COORDS[node.id]
            const active = hovered === node.id
            const connected =
              hovered !== null &&
              EDGES.some(e => (e.from === hovered && e.to === node.id) || (e.to === hovered && e.from === node.id))
            return (
              <motion.g
                key={node.id + '-m'}
                animate={{ y: [0, -node.fa * 0.65, node.fa * 0.3, -node.fa * 0.45, 0] }}
                transition={{ duration: node.fd, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
                style={{ cursor: 'pointer' }}
                onTouchStart={() => setHovered(node.id)}
                onTouchEnd={() => setTimeout(() => setHovered(null), 1400)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {(active || connected) && (
                  <motion.circle
                    cx={mn.x} cy={mn.y} r={node.r + 10}
                    fill={TIER_COLOR[node.tier]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.07, 0.2, 0.07] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
                <circle
                  cx={mn.x} cy={mn.y} r={node.r}
                  style={{
                    fill: TIER_COLOR[node.tier],
                    stroke: TIER_COLOR[node.tier],
                    fillOpacity:   tierFill(node.tier, active),
                    strokeOpacity: tierStroke(node.tier, active),
                    strokeWidth:   tierStrokeW(node.tier, active),
                    filter: active ? 'url(#ic-glow-m)' : undefined,
                    transition: 'fill-opacity 0.25s, stroke-opacity 0.25s, stroke-width 0.25s',
                  }}
                />
                <text
                  x={mn.x} y={mn.y + 4}
                  textAnchor="middle"
                  fontSize={labelSize(node.tier)}
                  fontFamily={node.font}
                  fill={active ? TIER_COLOR[node.tier] : `${TIER_COLOR[node.tier]}88`}
                  letterSpacing="0.08em"
                  style={{ userSelect: 'none', transition: 'fill 0.2s' }}
                >
                  {node.label}
                </text>
                {node.tier === 'core' && (
                  <text
                    x={mn.x} y={mn.y + node.r + 13}
                    textAnchor="middle"
                    fontSize={6}
                    fontFamily="var(--font-orbitron)"
                    fill={`${TIER_COLOR[node.tier]}44`}
                    letterSpacing="0.18em"
                    style={{ userSelect: 'none' }}
                  >
                    {node.sub}
                  </text>
                )}
              </motion.g>
            )
          })}
        </svg>
      </motion.div>

      {/* SVG graph — desktop only */}
      <motion.div
        className="hidden md:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: E }}
      >
        <svg
          viewBox="0 0 900 510"
          className="w-full select-none"
          style={{ maxHeight: 520, overflow: 'visible' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="ic-glow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ic-edge-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Edges ── */}
          {EDGES.map(edge => {
            const a = NODE_MAP[edge.from]
            const b = NODE_MAP[edge.to]
            const active = hovered === edge.from || hovered === edge.to
            return (
              <g key={edge.id}>
                {active && (
                  <line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    style={{
                      stroke: 'var(--accent)',
                      strokeOpacity: 0.14,
                      strokeWidth: 5,
                      filter: 'url(#ic-edge-glow)',
                    }}
                    vectorEffect="non-scaling-stroke"
                  />
                )}
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  style={{
                    stroke: 'var(--accent)',
                    strokeOpacity: active ? 0.65 : 0.1,
                    strokeWidth: active ? 1.5 : 0.8,
                    transition: 'stroke-opacity 0.25s, stroke-width 0.25s',
                  }}
                  vectorEffect="non-scaling-stroke"
                />
                {active && <PulseDot x1={a.x} y1={a.y} x2={b.x} y2={b.y} d={0} />}
                {active && <PulseDot x1={b.x} y1={b.y} x2={a.x} y2={a.y} d={0.55} />}
              </g>
            )
          })}

          {/* ── Nodes ── */}
          {NODES.map(node => {
            const active = hovered === node.id
            const connected =
              hovered !== null &&
              EDGES.some(e => (e.from === hovered && e.to === node.id) || (e.to === hovered && e.from === node.id))

            return (
              <motion.g
                key={node.id}
                animate={{ y: [0, -node.fa, node.fa * 0.4, -node.fa * 0.6, 0] }}
                transition={{ duration: node.fd, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
                style={{ cursor: 'crosshair' }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Outer glow ring */}
                {(active || connected) && (
                  <motion.circle
                    cx={node.x} cy={node.y} r={node.r + 12}
                    fill={TIER_COLOR[node.tier]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.07, 0.18, 0.07] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
                {/* Main circle */}
                <circle
                  cx={node.x} cy={node.y} r={node.r}
                  style={{
                    fill: TIER_COLOR[node.tier],
                    stroke: TIER_COLOR[node.tier],
                    fillOpacity: tierFill(node.tier, active),
                    strokeOpacity: tierStroke(node.tier, active),
                    strokeWidth: tierStrokeW(node.tier, active),
                    filter: active ? 'url(#ic-glow)' : undefined,
                    transition: 'fill-opacity 0.25s, stroke-opacity 0.25s, stroke-width 0.25s',
                  }}
                />
                {/* Label */}
                <text
                  x={node.x} y={node.y + 4}
                  textAnchor="middle"
                  fontSize={labelSize(node.tier)}
                  fontFamily={node.font}
                  fill={active ? TIER_COLOR[node.tier] : `${TIER_COLOR[node.tier]}88`}
                  letterSpacing="0.08em"
                  style={{ userSelect: 'none', transition: 'fill 0.2s' }}
                >
                  {node.label}
                </text>
                {/* Sub-label for core nodes */}
                {node.tier === 'core' && (
                  <text
                    x={node.x} y={node.y + node.r + 16}
                    textAnchor="middle"
                    fontSize={6.5}
                    fontFamily="var(--font-orbitron)"
                    fill={`${TIER_COLOR[node.tier]}44`}
                    letterSpacing="0.18em"
                    style={{ userSelect: 'none' }}
                  >
                    {node.sub}
                  </text>
                )}
              </motion.g>
            )
          })}
        </svg>
      </motion.div>
    </section>
  )
}
