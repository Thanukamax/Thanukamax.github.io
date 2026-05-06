'use client'

import { useState } from 'react'
import { motion }   from 'framer-motion'
import dynamic      from 'next/dynamic'

/* Critical — load immediately */
import Nav       from '@/components/nav'
import Preloader from '@/components/preloader'
import Footer    from '@/components/footer'
import Hero      from '@/components/sections/hero'
import About     from '@/components/sections/about'
import Projects  from '@/components/sections/projects'
import Systems   from '@/components/sections/systems'

/* Below fold — lazy chunks, load after hydration */
const Pipeline     = dynamic(() => import('@/components/sections/pipeline'))
const Interconnect = dynamic(() => import('@/components/sections/interconnect'))
const Experience   = dynamic(() => import('@/components/sections/experience'))
const Contact      = dynamic(() => import('@/components/sections/contact'))

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
        <main>
          <Hero />
          <About />
          <Projects />
          <Pipeline />
          <Systems />
          <Interconnect />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
