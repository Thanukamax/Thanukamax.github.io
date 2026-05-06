import type { Metadata } from 'next'
import { Syne, Manrope, Fragment_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/smooth-scroll'
import Cursor from '@/components/cursor'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-fragment-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Thanuka Sehasna Perera',
  description: 'Game Developer · GPU Architecture · Systems Builder',
  openGraph: {
    title: 'Thanuka Sehasna Perera',
    description: 'Game Developer · GPU Architecture · Systems Builder',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${manrope.variable} ${fragmentMono.variable} font-body bg-[#06070e] text-[#f0f2f7] overflow-x-hidden`}
      >
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
