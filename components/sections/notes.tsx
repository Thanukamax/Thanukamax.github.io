'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const E: [number,number,number,number] = [0.16, 1, 0.3, 1]

interface Note {
  id: string
  title: string
  date: string
  preview: string
  body: string  /* markdown-lite — paragraphs separated by blank lines, code blocks by triple backticks */
  tags: string[]
}

const NOTES: Note[] = [
  {
    id: 'bun-default',
    title: 'Why Bun for everything now',
    date: '2026-05-11',
    preview: 'I stopped reaching for npm or pnpm. Bun is the default. Here is the math.',
    tags: ['bun', 'tooling', 'js'],
    body:
`I stopped reaching for npm or pnpm. Bun is the default. Here is the math.

Cold install on this portfolio repo: bun 1.4s, pnpm 6.2s, npm 11.8s. That's 8× faster than npm, 4× faster than pnpm. The numbers compound — every fresh clone, every CI run, every "delete node_modules and try again" gets that gap back.

But speed alone wouldn't have moved me. The thing that did: \`bun\` is the script runner, the package manager, the test runner, the bundler, and a node-compatible runtime. One tool. No \`ts-node\` for scripts, no \`jest\` config, no \`tsx\` shim, no \`pnpm exec\`. \`bun foo.ts\` just works.

\`\`\`bash
bun add three           # install
bun run dev             # next dev
bun test                # vitest-compatible
bun foo.ts              # run TS directly, no compile step
bun --hot server.ts     # hot reload, no nodemon
\`\`\`

The gotchas are real but small. Some packages still ship CJS-only with sketchy ESM shims that confuse Bun's resolver. Workaround: \`bun add --trust\` for postinstall scripts, and \`bun pm ls\` to see what's actually resolved.

Where I still reach for npm: publishing to npm registry (Bun publishes too but the npm cli is more battle-tested for that one flow). Where I still reach for pnpm: large monorepos with workspace protocol weirdness (Bun handles workspaces, but pnpm's resolution is more predictable for 50+ package trees).

For everything else — new project, CLI script, Next.js app, Tauri sidecar — \`bun init\` and move on.`,
  },
  {
    id: 'local-ai-4gb',
    title: 'Local AI in 4GB VRAM — what actually fits',
    date: '2026-04-28',
    preview: 'A 3050 Ti laptop should not be able to run useful AI locally. It can. Just barely.',
    tags: ['ai', 'gpu', 'rtx-3050-ti'],
    body:
`A 3050 Ti laptop should not be able to run useful AI locally. It can. Just barely.

The constraint is 4GB of usable VRAM. That rules out most things. Llama 3 70B is out. Stable Diffusion XL is out (10GB+). FLUX is out. But here's what does fit:

**Image generation:** Stable Diffusion 1.5 at 512×768, Forge UI, with \`--medvram\` and \`--xformers\`. ~3.4GB VRAM peak. Generation time per 25-step image: 14 seconds. Quality is 2022-era but the iteration loop is fast enough that you can actually compose with it. SD Turbo distillations cut that to 4 seconds per image at slight quality cost.

**Language:** Qwen2.5 7B at Q4_K_M quantization through llama.cpp. Roughly 4.1GB VRAM with a 4k context. Tokens/sec: 18-22. Good enough for coding help and structured extraction. Not good enough for long-form prose.

**Web automation:** Crawl4AI + browser-use, with Qwen2.5 7B as the decision model. The model isn't running inference for every action — it plans, then a deterministic browser driver executes. Inference happens maybe 3-5 times per session. Total stack fits in ~5GB if you don't load anything else.

\`\`\`bash
# What I keep running
forge --medvram --xformers --port 7860              # SD
llama-server -m qwen2.5-7b-q4.gguf -c 4096 --port 8080  # llm
\`\`\`

The lesson: 4GB isn't enough for the latest models, but the previous generation's models are fine. Everyone optimizing for the frontier forgets that 2-year-old models are nearly free now.`,
  },
  {
    id: 'supergfxd-trap',
    title: 'The supergfxd trap — when nvidia-smi lies',
    date: '2026-03-19',
    preview: 'Spent forty minutes debugging a dead GPU before noticing my laptop had hidden it on purpose.',
    tags: ['linux', 'nobara', 'gpu'],
    body:
`Spent forty minutes debugging a dead GPU before noticing my laptop had hidden it on purpose.

Symptoms: \`nvidia-smi\` returns "No devices were found." \`lspci | grep NVIDIA\` returns nothing. CUDA refuses to initialize. The kernel boots fine, no Xorg complaints. According to every tool, the dGPU does not exist.

What I assumed: bad driver install, kernel mismatch, BIOS battery dead, dying card. What it actually was: \`supergfxd\` running on Nobara had switched the GPU mode to \`Integrated\`, which on hybrid laptops doesn't just disable the dGPU — it removes it from the PCI bus entirely. The OS can't see hardware that's been physically gated off.

The fix is one command:

\`\`\`bash
supergfxctl --mode Hybrid    # or Vfio / AsusMuxDc / Integrated
\`\`\`

Then reboot. \`nvidia-smi\` works again. Driver was fine the whole time.

This is documented but not where you'd look. The Nobara wiki mentions supergfxd. The Arch wiki mentions it. The NVIDIA troubleshooting docs do not, because supergfxd is a Linux laptop layer they don't own. So when you Google "nvidia-smi no devices found," you get pages of driver reinstall instructions that won't help.

The rule I added to my mental checklist: before debugging "the GPU isn't there," confirm the GPU is allowed to be there. On hybrid laptops, the mux is a layer above the driver. \`supergfxctl --status\` is the first command, not the tenth.`,
  },
]

function NoteCard({ note, expanded, onToggle }: { note: Note; expanded: boolean; onToggle: () => void }) {
  const reduced = useReducedMotion()
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
      <button
        onClick={onToggle}
        className="w-full text-left py-7 group"
        aria-expanded={expanded}
        aria-controls={`note-${note.id}`}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-white/45"
                    style={{ fontVariantNumeric: 'tabular-nums' }}>
                {note.date}
              </span>
              {note.tags.map(t => (
                <span key={t} className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-white/35">
                  · {t}
                </span>
              ))}
            </div>
            <h3 className="font-signal leading-[0.95] tracking-[0.02em] text-chalk group-hover:text-white transition-colors duration-150"
                style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)' }}>
              {note.title}
            </h3>
            <p className="font-systems italic text-sm text-white/65 mt-2 leading-relaxed max-w-2xl">
              {note.preview}
            </p>
          </div>
          <motion.span
            aria-hidden="true"
            className="font-mono text-xs tracking-widest mt-2 shrink-0"
            style={{ color: 'var(--accent)' }}
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`note-${note.id}`}
            key="body"
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reduced    ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pt-2 max-w-2xl">
              {note.body.split('\n\n').map((para, i) => {
                if (para.startsWith('```')) {
                  const code = para.replace(/^```\w*\n?/, '').replace(/```$/, '').trim()
                  return (
                    <pre key={i}
                         className="my-4 p-4 rounded-sm overflow-x-auto font-mono text-[0.72rem] leading-relaxed"
                         style={{
                           background: 'rgba(255,255,255,0.025)',
                           border: '1px solid rgba(255,255,255,0.06)',
                           color: 'rgba(232,232,240,0.85)',
                         }}>
                      <code>{code}</code>
                    </pre>
                  )
                }
                return (
                  <p key={i}
                     className="font-body text-[0.92rem] leading-relaxed text-white/78 mb-4"
                     dangerouslySetInnerHTML={{
                       __html: para
                         .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.06);padding:0.05em 0.35em;border-radius:2px;font-size:0.92em;color:rgba(232,232,240,0.9);">$1</code>')
                         .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
                     }}
                  />
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Notes() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const [expandedId, setExpandedId] = useState<string | null>(NOTES[0].id)

  return (
    <section ref={ref} id="notes" className="relative py-28 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
      <motion.div style={{ y: bgY }}
        className="absolute -left-8 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true">
        <span className="font-signal outlined-chalk opacity-[0.022]" style={{ fontSize: '22vw', lineHeight: 1 }}>
          NOTES
        </span>
      </motion.div>

      {/* Header */}
      <motion.div className="mb-12"
        initial={reduced ? { opacity: 0 } : { opacity: 0, x: -32, filter: 'blur(4px)' }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.75, ease: E }}>
        <span className="section-label">Notes</span>
        <h2 className="font-signal mt-2 text-chalk leading-none tracking-[0.04em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          Short opinions
        </h2>
        <p className="font-systems italic text-base text-white/70 mt-4 max-w-2xl leading-relaxed">
          Things I have an opinion on after building with them. Mostly short. Sometimes wrong. Drafts get updated rather than republished.
        </p>
      </motion.div>

      <div>
        {NOTES.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            expanded={expandedId === note.id}
            onToggle={() => setExpandedId(prev => prev === note.id ? null : note.id)}
          />
        ))}
      </div>
    </section>
  )
}
