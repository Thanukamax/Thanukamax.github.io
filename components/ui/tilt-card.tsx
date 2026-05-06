'use client'

import { useRef, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 300, damping: 40 })
  const y = useSpring(rawY, { stiffness: 300, damping: 40 })

  const rotateX = useTransform(y, [-1, 1], [8, -8])
  const rotateY = useTransform(x, [-1, 1], [-8, 8])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Disable tilt on hover:none devices
      if (window.matchMedia('(hover: none)').matches) return

      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const halfW = rect.width / 2
      const halfH = rect.height / 2

      const nx = (e.clientX - rect.left - halfW) / halfW
      const ny = (e.clientY - rect.top - halfH) / halfH

      rawX.set(nx)
      rawY.set(ny)
    },
    [rawX, rawY]
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn('h-full', className)}
    >
      {children}
    </motion.div>
  )
}
