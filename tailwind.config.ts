import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void:     '#030304',
        chalk:    '#e8e8f0',
        signal:   '#b4ff00',
        abyssal:  '#9b30ff',
        muted:    'rgba(232,232,240,0.45)',
      },
      fontFamily: {
        /* Base */
        display:    ['var(--font-syne)',       'system-ui', 'sans-serif'],
        body:       ['var(--font-manrope)',    'system-ui', 'sans-serif'],
        mono:       ['var(--font-mono)',       'monospace'],
        /* Typography map */
        signal:     ['var(--font-bebas)',      'sans-serif'],
        editorial:  ['var(--font-playfair)',   'Georgia', 'serif'],
        systems:    ['var(--font-ibm-serif)',  'Georgia', 'serif'],
        jetbrains:  ['var(--font-jetbrains)', 'monospace'],
        fira:       ['var(--font-fira)',       'monospace'],
        rdna:       ['var(--font-orbitron)',   'sans-serif'],
        craft:      ['var(--font-audiowide)',  'sans-serif'],
        abyssal:    ['var(--font-fraunces)',   'Georgia', 'serif'],
        rust:       ['var(--font-courier)',    'monospace'],
        ghidra:     ['var(--font-vt323)',      'monospace'],
        blender:    ['var(--font-space)',      'system-ui', 'sans-serif'],
        physics:    ['var(--font-bodoni)',     'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
