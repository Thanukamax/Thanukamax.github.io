'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Nav        from '@/components/nav'
import Preloader  from '@/components/preloader'
import Footer     from '@/components/footer'
import Hero       from '@/components/sections/hero'
import About      from '@/components/sections/about'
import Projects   from '@/components/sections/projects'
import Systems    from '@/components/sections/systems'
import Experience from '@/components/sections/experience'
import Contact    from '@/components/sections/contact'

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
          <Systems />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
