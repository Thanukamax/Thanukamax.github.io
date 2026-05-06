'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const FAST   = { stiffness: 850, damping: 45 }
const SLOW_R = { stiffness: 260, damping: 30 }
const SLOW_B = { stiffness: 190, damping: 26 }

export default function Cursor() {
  const [isTouch,    setIsTouch]    = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const dotX = useSpring(mx, FAST)
  const dotY = useSpring(my, FAST)
  const rx    = useSpring(mx, SLOW_R)
  const ry    = useSpring(my, SLOW_R)
  const bx    = useSpring(mx, SLOW_B)
  const by    = useSpring(my, SLOW_B)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) { setIsTouch(true); return }

    const onMove = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY) }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setIsHovering(!!t.closest('a, button, [data-cursor-hover]'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [mx, my])

  if (isTouch) return null

  const ring = isHovering ? 54 : 36
  const dot  = isHovering ? 4  : 6

  return (
    <>
      {/* Red channel — lags, offset right */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9996] rounded-full"
        style={{
          x: rx, y: ry,
          translateX: 'calc(-50% + 4px)',
          translateY: 'calc(-50% - 2px)',
          width: 7, height: 7,
          background: 'rgba(255,35,35,0.5)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Blue channel — lags more, offset left */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9996] rounded-full"
        style={{
          x: bx, y: by,
          translateX: 'calc(-50% - 4px)',
          translateY: 'calc(-50% + 2px)',
          width: 7, height: 7,
          background: 'rgba(35,35,255,0.5)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          width: ring, height: ring,
          border: '1px solid rgba(var(--accent-rgb),0.4)',
          transition: 'width 0.22s var(--ease-expo), height 0.22s var(--ease-expo)',
        }}
      />

      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          width: dot, height: dot,
          background: 'var(--accent)',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.5s ease',
        }}
      />
    </>
  )
}
