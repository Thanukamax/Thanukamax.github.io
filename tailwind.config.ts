import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        body: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-fragment-mono)', 'monospace'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
