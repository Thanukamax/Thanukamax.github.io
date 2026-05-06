'use client'

import { motion, type Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

const systems = [
  {
    id: 'SYS.01',
    name: 'Core Languages',
    techs: ['TypeScript', 'JavaScript', 'C++', 'C#', 'Python', 'Java', 'Go', 'Lua'],
  },
  {
    id: 'SYS.02',
    name: 'Game Engines',
    techs: ['Unity', 'Unreal Engine 5', 'Ka3d'],
  },
  {
    id: 'SYS.03',
    name: 'Graphics & GPU',
    techs: ['RDNA Architecture', 'PhysX', 'GPU Hardware', 'HLSL', 'Shader Graph', 'Compute Shaders'],
  },
  {
    id: 'SYS.04',
    name: 'Creative Pipeline',
    techs: ['Adobe Premiere', 'After Effects', 'Illustrator', 'Lightroom', 'Audition'],
  },
  {
    id: 'SYS.05',
    name: '3D & Modeling',
    techs: ['Blender', 'Cinema 4D', '3ds Max'],
  },
  {
    id: 'SYS.06',
    name: 'Tooling & Security',
    techs: ['Ghidra', 'HxD', 'Wireshark', 'Git', 'Tauri v2', 'Cloudflare Workers'],
  },
]

export default function Systems() {
  return (
    <section id="systems" className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section label */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={0}
        variants={fadeUp}
        className="mb-12"
      >
        <span className="section-label">03. Stack</span>
        <h2
          className="font-display font-black tracking-tight text-[#f0f2f7] mt-3"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.0' }}
        >
          Technical Stack
        </h2>
      </motion.div>

      {/* Grid container with gap-px separator effect */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {systems.map((system, i) => (
            <motion.div
              key={system.id}
              custom={i + 1}
              variants={fadeUp}
              className="group p-6 md:p-7 transition-colors duration-300"
              style={{
                background: '#06070e',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.background =
                  'rgba(255, 255, 255, 0.02)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.background = '#06070e'
              }}
            >
              {/* System ID */}
              <p
                className="font-mono text-xs tracking-[0.15em] uppercase mb-2"
                style={{ color: 'var(--accent)', transition: 'color 0.4s ease' }}
              >
                {system.id}
              </p>

              {/* System name */}
              <h3 className="font-display font-bold text-base text-[#f0f2f7] mb-4">
                {system.name}
              </h3>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5">
                {system.techs.map((tech) => (
                  <span key={tech} className="tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
