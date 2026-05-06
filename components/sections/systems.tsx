'use client'

import { motion, type Variants } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.75, ease: E },
  }),
}

/* Each tech entry carries its own font class so the typography map shows */
const systems = [
  {
    id: 'SYS.01', name: 'Core Languages',
    techs: [
      { t: 'TypeScript',  f: 'font-mono' },
      { t: 'C++',         f: 'font-fira' },
      { t: 'C#',          f: 'font-mono' },
      { t: 'Python',      f: 'font-rust' },
      { t: 'Rust',        f: 'font-rust' },
      { t: 'Lua',         f: 'font-mono' },
    ],
  },
  {
    id: 'SYS.02', name: 'Game Engines',
    techs: [
      { t: 'Unity',          f: 'font-blender' },
      { t: 'Unreal Engine 5',f: 'font-blender' },
      { t: 'Ka3d',           f: 'font-blender' },
    ],
  },
  {
    id: 'SYS.03', name: 'Graphics & GPU',
    techs: [
      { t: 'RDNA Architecture', f: 'font-rdna' },
      { t: 'HLSL',              f: 'font-fira' },
      { t: 'Compute Shaders',   f: 'font-fira' },
      { t: 'PhysX',             f: 'font-physics' },
      { t: 'GPU Hardware',      f: 'font-rdna' },
    ],
  },
  {
    id: 'SYS.04', name: 'Creative Pipeline',
    techs: [
      { t: 'Blender',       f: 'font-blender' },
      { t: 'After Effects', f: 'font-craft' },
      { t: 'Premiere',      f: 'font-craft' },
      { t: 'Cinema 4D',     f: 'font-blender' },
    ],
  },
  {
    id: 'SYS.05', name: 'Tooling & Security',
    techs: [
      { t: 'Ghidra',            f: 'font-ghidra' },
      { t: 'Wireshark',         f: 'font-mono' },
      { t: 'HxD',               f: 'font-mono' },
      { t: 'Cloudflare Workers',f: 'font-mono' },
      { t: 'Tauri v2',          f: 'font-mono' },
    ],
  },
  {
    id: 'SYS.06', name: 'Infrastructure',
    techs: [
      { t: 'Cloudflare', f: 'font-mono' },
      { t: 'Git',        f: 'font-jetbrains' },
      { t: 'Docker',     f: 'font-jetbrains' },
      { t: 'GitHub CI',  f: 'font-jetbrains' },
    ],
  },
]

export default function Systems() {
  return (
    <section id="systems" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div className="mb-12"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        custom={0} variants={fadeUp}>
        <span className="section-label">03. Stack</span>
        <h2 className="font-signal mt-2 text-chalk leading-none tracking-[0.04em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          Technical Stack
        </h2>
      </motion.div>

      <motion.div
        className="rounded-sm overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
             style={{ background: 'rgba(255,255,255,0.05)' }}>
          {systems.map((sys, i) => (
            <motion.div key={sys.id} custom={i + 1} variants={fadeUp}
              className="group p-6 md:p-7 transition-colors duration-300 hover:bg-white/[0.02]"
              style={{ background: 'var(--bg)' }}>
              <p className="font-rdna text-[0.5rem] tracking-[0.3em] uppercase mb-2"
                 style={{ color: 'var(--accent)' }}>
                {sys.id}
              </p>
              <h3 className="font-systems font-semibold text-sm text-chalk mb-4">
                {sys.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {sys.techs.map(({ t, f }) => (
                  <span key={t} className={`tech-chip ${f}`}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
