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
        /* Two-family system. All semantic class names resolve to one of these. */
        display:    ['var(--font-bebas)',     'system-ui', 'sans-serif'],
        body:       ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        mono:       ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],

        /* Legacy semantic aliases — preserved so JSX classnames keep working. */
        signal:     ['var(--font-bebas)',     'system-ui', 'sans-serif'],
        editorial:  ['var(--font-bebas)',     'system-ui', 'sans-serif'],
        craft:      ['var(--font-bebas)',     'system-ui', 'sans-serif'],
        systems:    ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        jetbrains:  ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        fira:       ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        rdna:       ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        abyssal:    ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        rust:       ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        ghidra:     ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        blender:    ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        physics:    ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
