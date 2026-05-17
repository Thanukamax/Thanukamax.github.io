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
          <Hero />
          <Projects />
          <Pipeline />
          <Systems />
          <Notes />
          <About />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
