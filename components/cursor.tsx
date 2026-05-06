'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isTouch, setIsTouch] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Dot — tracks exactly
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 42 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 42 })

  // Ring — lags behind
  const ringX = useSpring(mouseX, { stiffness: 160, damping: 26 })
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 26 })

  useEffect(() => {
    // Detect touch devices
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      navigator.maxTouchPoints > 0

    setIsTouch(isTouchDevice)

    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (isTouch) return null

  return (
    <>
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full mix-blend-exclusion"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          border: '1px solid rgba(var(--accent-rgb, 34, 211, 238), 0.5)',
          transition: 'width 0.2s cubic-bezier(0.16,1,0.3,1), height 0.2s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10001] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          backgroundColor: 'var(--accent)',
          transition: 'background-color 0.4s ease',
        }}
      />
    </>
  )
}
