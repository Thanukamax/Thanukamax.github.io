import type { Metadata } from 'next'
import { Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import SmoothScroll from '@/components/smooth-scroll'
import KonamiEgg from '@/components/konami-egg'
import CommandPalette from '@/components/command-palette'
import BuiltWith from '@/components/built-with'
import HUD from '@/components/hud'
import NvidiaGlow from '@/components/nvidia-glow'

const bebas     = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' })

const SITE = 'https://thanukamax.github.io'
const NAME = 'Thanuka Sehasna Perera'
const DESCRIPTION =
  'Game Developer, Computer Science undergraduate, and systems-focused builder working across GPU architecture, real-time rendering, and creative tooling.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: `${NAME} | Game Developer & Systems Builder`, template: `%s | ${NAME}` },
  description: DESCRIPTION,
  applicationName: NAME,
  authors: [{ name: NAME, url: SITE }],
  creator: NAME,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: NAME,
    description: DESCRIPTION,
    url: SITE,
    siteName: NAME,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${NAME} — Game Developer · GPU Architecture · Systems Builder` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: NAME,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
}

/* Person schema: ties the portfolio, GitHub and LinkedIn together as one entity,
   and covers the handle + the shorter spelling people actually search. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: NAME,
  alternateName: ['Thanuka Perera', 'Thanukamax'],
  url: SITE,
  image: `${SITE}/og.png`,
  description: DESCRIPTION,
  knowsAbout: ['Game development', 'GPU architecture', 'Real-time rendering', 'Systems programming', 'Rust'],
  sameAs: [
    'https://github.com/Thanukamax',
    'https://www.linkedin.com/in/thanuka-perera-889240337',
  ],
}

/* Inline script: set initial theme BEFORE React hydrates so visitors at
   different Colombo times don't flash through XE first. */
const themeBootScript = `
(function(){
  try {
    var saved = localStorage.getItem('tsp-theme');
    var t = saved;
    if (saved !== '' && saved !== 'udna' && saved !== 'cuda') {
      var h = new Date().getHours();
      t = (h >= 6 && h < 12) ? '' : (h >= 12 && h < 18) ? 'cuda' : 'udna';
    }
    document.documentElement.dataset.theme = t;
  } catch(e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bebas.variable} ${jetbrains.variable} font-body bg-void text-chalk antialiased overflow-x-hidden`}>
        {/* Pre-hydration theme boot — sets data-theme before React paints. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(3,3,4,0.95)',
              border: '1px solid rgba(var(--accent-rgb),0.25)',
              color: 'var(--chalk)',
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
            },
          }}
        />
        <HUD />
        <NvidiaGlow />
        <KonamiEgg />
        <CommandPalette />
        <BuiltWith />
      </body>
    </html>
  )
}
