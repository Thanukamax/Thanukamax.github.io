import type { Metadata } from 'next'
import { Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import SmoothScroll from '@/components/smooth-scroll'
import KonamiEgg from '@/components/konami-egg'
import CommandPalette from '@/components/command-palette'
import BuiltWith from '@/components/built-with'

const bebas     = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  title: 'Thanuka Sehasna Perera',
  description: 'Game Developer · GPU Architecture · Systems Builder',
  openGraph: {
    title: 'Thanuka Sehasna Perera',
    description: 'Game Developer · GPU Architecture · Systems Builder',
    type: 'website',
  },
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
        <KonamiEgg />
        <CommandPalette />
        <BuiltWith />
      </body>
    </html>
  )
}
