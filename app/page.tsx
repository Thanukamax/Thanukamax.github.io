import Nav from '@/components/nav'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Projects from '@/components/sections/projects'
import Systems from '@/components/sections/systems'
import Experience from '@/components/sections/experience'
import Contact from '@/components/sections/contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Systems />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
