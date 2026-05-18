'use client'

import { useState } from 'react'
import { motion }   from 'framer-motion'
import dynamic      from 'next/dynamic'

/* Critical — load immediately */
import Nav       from '@/components/nav'
import Preloader from '@/components/preloader'
import Footer    from '@/components/footer'
import Hero      from '@/components/sections/hero'
import Projects  from '@/components/sections/projects'

/* Below fold — lazy chunks, load after hydration */
const Pipeline = dynamic(() => import('@/components/sections/pipeline'))
const Systems  = dynamic(() => import('@/components/sections/systems'))
const Notes    = dynamic(() => import('@/components/sections/notes'))
const About    = dynamic(() => import('@/components/sections/about'))
const Contact  = dynamic(() => import('@/components/sections/contact'))

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      <motion.div
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Nav />
        <main id="main">
          <Hero loaded={loaded} />
          {/* Opaque vault past the hero — covers body::before so theme atmosphere
              (CUDA scanlines, UDNA radials) lives only behind the hero, never
              bleeds through Pipeline / Systems / Notes / About / Contact cards. */}
          <div className="relative" style={{ background: 'var(--bg)' }}>
            <Projects />
            <Pipeline />
            <Systems />
            <Notes />
            <About />
            <Contact />
          </div>
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
