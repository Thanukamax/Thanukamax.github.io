'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

/* ── Cloud layout: (x%, y%, font-class, size, depth 0-3, opacity) ── */
interface Skill { text: string; font: string; size: string; depth: number; x: number; y: number; op: number; color: string }

const CLOUD: Skill[] = [
  /* Layer 0 — closest, moves most */
  { text: 'C++',          font: 'font-fira',      size: '2.8rem', depth: 0, x: 14,  y: 24, op: 0.90, color: '#fb923c' },
  { text: 'RDNA',         font: 'font-rdna',       size: '2rem',   depth: 0, x: 70,  y: 14, op: 0.85, color: '#7dd3fc' },
  { text: 'Ghidra',       font: 'font-ghidra',     size: '3.2rem', depth: 0, x: 46,  y: 52, op: 0.80, color: '#fbbf24' },
  { text: 'Arch Linux',   font: 'font-rdna',       size: '1.6rem', depth: 0, x: 82,  y: 68, op: 0.85, color: '#fb7185' },

  /* Layer 1 */
  { text: 'Unity',        font: 'font-blender',    size: '1.9rem', depth: 1, x: 30,  y: 12, op: 0.72, color: '#fb7185' },
  { text: 'TypeScript',   font: 'font-jetbrains',  size: '1.4rem', depth: 1, x: 61,  y: 32, op: 0.68, color: '#7dd3fc' },
  { text: 'Python',       font: 'font-rust',       size: '1.7rem', depth: 1, x: 6,   y: 58, op: 0.70, color: '#fbbf24' },
  { text: 'Rust',         font: 'font-rust',       size: '2.2rem', depth: 1, x: 79,  y: 44, op: 0.72, color: '#a78bfa' },
  { text: 'Nobara KDE',   font: 'font-systems',    size: '1.1rem', depth: 1, x: 5,   y: 35, op: 0.60, color: '#34d399' },

  /* Layer 2 */
  { text: 'Blender',      font: 'font-blender',    size: '1.3rem', depth: 2, x: 52,  y: 72, op: 0.55, color: '#e879f9' },
  { text: 'HLSL',         font: 'font-fira',       size: '1.1rem', depth: 2, x: 22,  y: 43, op: 0.52, color: '#7dd3fc' },
  { text: 'Cloudflare',   font: 'font-mono',       size: '0.95rem',depth: 2, x: 38,  y: 22, op: 0.50, color: '#fb923c' },
  { text: 'Tauri v2',     font: 'font-mono',       size: '1.05rem',depth: 2, x: 87,  y: 32, op: 0.52, color: '#a78bfa' },
  { text: 'Ubuntu',       font: 'font-mono',       size: '0.9rem', depth: 2, x: 28,  y: 68, op: 0.48, color: '#34d399' },
  { text: 'PhysX',        font: 'font-physics',    size: '1.2rem', depth: 2, x: 57,  y: 88, op: 0.50, color: '#7dd3fc' },

  /* Layer 3 — furthest, barely moves */
  { text: 'UE5',          font: 'font-blender',    size: '0.9rem', depth: 3, x: 18,  y: 80, op: 0.38, color: '#fb7185' },
  { text: 'Wireshark',    font: 'font-mono',       size: '0.8rem', depth: 3, x: 73,  y: 82, op: 0.35, color: '#fbbf24' },
  { text: 'After FX',     font: 'font-craft',      size: '0.82rem',depth: 3, x: 44,  y: 8,  op: 0.32, color: '#e879f9' },
  { text: 'Garuda',       font: 'font-rdna',       size: '0.78rem',depth: 3, x: 90,  y: 56, op: 0.30, color: '#fb923c' },
  { text: 'Compute Shaders',font:'font-fira',      size: '0.72rem',depth: 3, x: 3,   y: 15, op: 0.28, color: '#7dd3fc' },
]

const STRENGTH = [60, 36, 16, 6] // px of travel per layer at max deflection

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.75, ease: E } }),
}

export default function Systems() {
  const sectionRef = useRef<HTMLElement>(null)
  const cloudRef   = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-10%' })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 70, damping: 18 })
  const sy = useSpring(my, { stiffness: 70, damping: 18 })

  const layers = STRENGTH.map(s => ({
    x: useTransform(sx, v => v * s),
    y: useTransform(sy, v => v * s),
  }))

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cloudRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left)  / r.width  - 0.5)
    my.set((e.clientY - r.top)   / r.height - 0.5)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <section ref={sectionRef} id="systems" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background ghost text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden="true">
        <span className="font-signal outlined-chalk opacity-[0.018]" style={{ fontSize: '30vw' }}>STACK</span>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div className="mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          custom={0} variants={fadeUp}>
          <span className="section-label">03. Subsystem Map</span>
          <h2 className="font-signal mt-2 text-chalk leading-none tracking-[0.04em]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Technical Stack
          </h2>
          <p className="font-systems italic text-white/40 text-sm mt-2 hidden md:block">
            Move your cursor through the field ↓
          </p>
        </motion.div>

        {/* ─── Desktop: floating cloud ─── */}
        <div
          ref={cloudRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative w-full hidden md:block select-none"
          style={{ height: '62vh' }}
        >
          {CLOUD.map((skill, i) => {
            const { x, y } = layers[skill.depth]
            return (
              <motion.div
                key={skill.text}
                className={`absolute ${skill.font} leading-none whitespace-nowrap cursor-default`}
                style={{ x, y, left: `${skill.x}%`, top: `${skill.y}%`, fontSize: skill.size, color: skill.color }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: skill.op } : { opacity: 0 }}
                whileHover={{ opacity: 1, scale: 1.06 }}
                transition={{ delay: i * 0.04 + 0.1, duration: 0.7, ease: E }}
              >
                {skill.text}
              </motion.div>
            )
          })}

          {/* Crosshair hint */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{ opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <div className="w-px h-10 bg-accent/30 mx-auto" />
            <div className="w-10 h-px bg-accent/30 -mt-5" />
          </motion.div>
        </div>

        {/* ─── Mobile: autonomous floating word cloud ─── */}
        {/* Same word data as desktop; golden-angle drift replaces cursor parallax */}
        <div
          className="relative md:hidden select-none"
          style={{ height: '85vw', minHeight: '300px' }}
        >
          {CLOUD.map((skill, i) => {
            const goldenAngle = i * 137.507 * (Math.PI / 180)
            const driftAmp = ([18, 11, 6, 3] as number[])[skill.depth]
            const driftX = driftAmp * Math.cos(goldenAngle)
            const driftY = driftAmp * Math.sin(goldenAngle)
            const mobileRem = Math.min(parseFloat(skill.size) * 0.7, 2)
            return (
              <motion.div
                key={skill.text}
                className={`absolute ${skill.font} leading-none whitespace-nowrap cursor-default`}
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  fontSize: `${mobileRem}rem`,
                  color: skill.color,
                }}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={inView ? {
                  opacity: skill.op,
                  x: [0, driftX, driftX * 0.3, -driftX * 0.7, 0],
                  y: [0, -driftY * 0.4, driftY, driftY * 0.2, 0],
                } : { opacity: 0 }}
                whileTap={{ opacity: 1, scale: 1.1 }}
                transition={{
                  opacity: { delay: i * 0.05 + 0.1, duration: 0.8, ease: E },
                  x: { duration: 5 + skill.depth * 1.8 + (i % 3) * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
                  y: { duration: 6 + skill.depth * 1.8 + (i % 4) * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 + 1.4 },
                }}
              >
                {skill.text}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
