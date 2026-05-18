'use client'

import { useEffect, useRef, useState } from 'react'

/* CUDA-only cursor-tracking radial glow. Reads "ambient lighting from a path-traced
   scene" — a small accent-tinted spot follows the pointer, blended via mix-blend-mode:
   screen so bright text/cards keep their luminance while dark backgrounds light up
   with NVIDIA green.

   Gates:
     - data-theme === 'cuda'         (only the NVIDIA mode earns the effect)
     - hover: hover + pointer: fine  (desktop only — touch devices skip entirely)
     - prefers-reduced-motion: no    (respect the global a11y signal)

   When any gate fails the component returns null (no listener, no DOM cost). */
export default function NvidiaGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const mqHover  = window.matchMedia('(hover: hover) and (pointer: fine)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const check = () => {
      setActive(
        document.documentElement.dataset.theme === 'cuda'
        && mqHover.matches
        && !mqReduce.matches
      )
    }
    check()
    const themeObs = new MutationObserver(check)
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    mqHover.addEventListener('change', check)
    mqReduce.addEventListener('change', check)
    return () => {
      themeObs.disconnect()
      mqHover.removeEventListener('change', check)
      mqReduce.removeEventListener('change', check)
    }
  }, [])

  useEffect(() => {
    if (!active) return
    let rafId: number | null = null
    let nextX = 50, nextY = 50
    const apply = () => {
      const el = ref.current
      if (el) {
        el.style.setProperty('--mx', `${nextX}%`)
        el.style.setProperty('--my', `${nextY}%`)
      }
      rafId = null
    }
    const onMove = (e: PointerEvent) => {
      nextX = (e.clientX / window.innerWidth)  * 100
      nextY = (e.clientY / window.innerHeight) * 100
      if (rafId !== null) return
      rafId = requestAnimationFrame(apply)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [active])

  if (!active) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 30,
        mixBlendMode: 'screen',
        background:
          'radial-gradient(circle 26vw at var(--mx, 50%) var(--my, 50%), rgba(var(--accent-rgb), 0.18), transparent 65%)',
      }}
    />
  )
}
