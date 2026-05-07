import type { Metadata } from 'next'
import {
  Syne, Manrope, Fragment_Mono, Orbitron, Fraunces,
  IBM_Plex_Serif, JetBrains_Mono, Fira_Code,
  Space_Grotesk, Bodoni_Moda, VT323,
  Courier_Prime, Bebas_Neue, Playfair_Display, Audiowide,
} from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/smooth-scroll'

/* ── Display / Editorial — critical, preloaded ── */
const bebas       = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas', display: 'swap' })
const playfair    = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--font-playfair', display: 'swap' })
const orbitron    = Orbitron({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-orbitron', display: 'swap' })
const jetbrains   = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' })
const ibmSerif    = IBM_Plex_Serif({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'], variable: '--font-ibm-serif', display: 'swap' })

/* ── Below-fold fonts — deferred ── */
const syne        = Syne({ subsets: ['latin'], weight: ['700'], variable: '--font-syne', display: 'swap', preload: false })
const bodoni      = Bodoni_Moda({ subsets: ['latin'], weight: ['400'], style: ['italic'], variable: '--font-bodoni', display: 'swap', preload: false })
const manrope     = Manrope({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-manrope', display: 'swap', preload: false })
const spaceG      = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-space', display: 'swap', preload: false })
const fragmentMono = Fragment_Mono({ subsets: ['latin'], weight: '400', variable: '--font-mono', display: 'swap', preload: false })
const firaCode    = Fira_Code({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-fira', display: 'swap', preload: false })
const courier     = Courier_Prime({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--font-courier', display: 'swap', preload: false })
const vt323       = VT323({ subsets: ['latin'], weight: '400', variable: '--font-vt323', display: 'swap', preload: false })
const fraunces    = Fraunces({ subsets: ['latin'], weight: ['400'], style: ['italic'], variable: '--font-fraunces', display: 'swap', preload: false })
const audiowide   = Audiowide({ subsets: ['latin'], weight: '400', variable: '--font-audiowide', display: 'swap', preload: false })

export const metadata: Metadata = {
  title: 'Thanuka Sehasna Perera',
  description: 'Game Developer · GPU Architecture · Systems Builder',
  openGraph: {
    title: 'Thanuka Sehasna Perera',
    description: 'Game Developer · GPU Architecture · Systems Builder',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const vars = [
    syne.variable, playfair.variable, bebas.variable, bodoni.variable,
    manrope.variable, ibmSerif.variable, spaceG.variable,
    fragmentMono.variable, jetbrains.variable, firaCode.variable, courier.variable, vt323.variable,
    orbitron.variable, fraunces.variable, audiowide.variable,
  ].join(' ')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${vars} font-body bg-void text-chalk antialiased overflow-x-hidden`}>
        {/* Visible before JS — removed in Preloader useEffect */}
        <div id="css-boot">
          <div id="css-boot-label">THANUKA.DEV</div>
          <div id="css-boot-track">
            <div id="css-boot-fill" />
          </div>
        </div>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
