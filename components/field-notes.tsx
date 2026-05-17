'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Vendor = 'intel' | 'amd' | 'nvidia'

const THEME_VENDOR: Record<string, Vendor> = {
  '':     'intel',
  'udna': 'amd',
  'cuda': 'nvidia',
}

const VENDOR_NAME: Record<Vendor, string> = {
  intel:  'Intel · XE',
  amd:    'AMD · UDNA',
  nvidia: 'Nvidia · CUDA',
}

interface Note {
  rule: string
  body: string
}

const NOTES: Record<Vendor, Note[]> = {
  intel: [
    {
      rule: 'The Graphics Command Center lies by default',
      body: 'Drop brightness by 10, push contrast by 10. The panel looks more honest immediately — Intel ships everything biased toward "punchy at the showroom."',
    },
    {
      rule: 'VMD is a one-way trap on dual-boot',
      body: 'Windows turns Intel VMD on by default. Install Linux on top without disabling VMD first in BIOS and the friendliest outcome is a corrupted partition table. Disable it before partitioning, not after.',
    },
    {
      rule: 'Arc is shockingly good at AV1',
      body: 'The A-series hardware encoder beats consumer-tier NVENC at AV1 quality-per-bitrate. The catch: the entire stack — drivers, Quick Sync runtime, ffmpeg plugin chain — has a worse vibe than NVIDIA. Worth it for archive use, painful for live.',
    },
  ],
  amd: [
    {
      rule: 'The friendliest Linux story of the three',
      body: 'AMDGPU is in-tree. No DKMS, no proprietary blobs, no "your kernel is too new" weekend. The driver team upstreams everything. The day you install Nobara is the day your card works.',
    },
    {
      rule: 'UDNA is the bet I am watching most',
      body: 'AMD is merging RDNA (consumer) and CDNA (datacenter) into one ISA — UDNA. The bet: it should not take two different chips to run a game and a model. If they ship it well in 2026, the CUDA moat narrows from "infinite" to "wide."',
    },
    {
      rule: 'ROCm is not as bad as the memes claim',
      body: 'ROCm on a 7000-series card runs PyTorch, runs Stable Diffusion, runs llama.cpp. The 2022 reputation was earned; the 2026 reality is "use the official Docker, do not fight the system Python." That is the entire trick.',
    },
  ],
  nvidia: [
    {
      rule: 'supergfxd will hide your dGPU on purpose',
      body: 'On Linux hybrid laptops, if supergfxd is in Integrated mode, the NVIDIA card is removed from the PCI bus entirely. nvidia-smi reports no devices. Forty minutes of driver reinstalls later you remember: supergfxctl --mode Hybrid, reboot, done.',
    },
    {
      rule: 'The moat is not the silicon',
      body: 'The CUDA moat is 15 years of papers citing CUDA-only kernels. Every researcher trained on CUDA, every framework optimized for CUDA. AMD can ship better silicon and still lose. The moat is academic inertia.',
    },
    {
      rule: 'Tensor cores are wasted on FP32 work',
      body: 'If your model is FP32 end-to-end, you are using ~30% of an RTX card. Mixed precision (FP16/BF16) is not a "nice optimization" — it is the actual product you paid for. autocast + grad scaler is two lines and 2.5× free.',
    },
  ],
}

export default function FieldNotes() {
  const reduced = useReducedMotion()
  const [vendor, setVendor] = useState<Vendor>('intel')

  useEffect(() => {
    const read = () => {
      const t = document.documentElement.dataset.theme ?? ''
      setVendor(THEME_VENDOR[t] ?? 'intel')
    }
    read()
    const obs = new MutationObserver(read)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  const notes = NOTES[vendor]

  return (
    <div className="mt-10 rounded-sm overflow-hidden"
         style={{
           border: '1px solid rgba(var(--accent-rgb), 0.18)',
           background: 'linear-gradient(180deg, rgba(var(--accent-rgb), 0.04), rgba(var(--accent-rgb), 0.01))',
         }}>

      {/* Header */}
      <div className="px-5 py-3 border-b flex items-center justify-between gap-3 flex-wrap"
           style={{ borderColor: 'rgba(var(--accent-rgb), 0.15)' }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
          <span className="font-rdna text-[0.55rem] tracking-[0.3em] uppercase"
                style={{ color: 'var(--accent)' }}>
            Field Notes
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={vendor}
            initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)' }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, filter: 'blur(0)' }}
            exit={reduced    ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.25 }}
            className="font-jetbrains text-[0.6rem] tracking-[0.22em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            {VENDOR_NAME[vendor]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Notes — re-mount on vendor change so each note re-enters with Jakub blur */}
      <AnimatePresence mode="wait">
        <motion.div
          key={vendor}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(6px)' }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0)' }}
          exit={reduced    ? { opacity: 0 } : { opacity: 0, y: -4, filter: 'blur(4px)' }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="divide-y"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          {notes.map((note, i) => (
            <div key={i} className="px-5 py-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <p className="font-signal leading-snug text-chalk mb-1.5"
                 style={{ fontSize: '1rem', letterSpacing: '0.01em' }}>
                {note.rule}
              </p>
              <p className="font-body text-[0.78rem] leading-relaxed text-white/72 max-w-2xl">
                {note.body}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer hint */}
      <div className="px-5 py-2 border-t font-mono text-[0.55rem] tracking-[0.22em] uppercase text-white/35"
           style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        cycle the theme in nav · these change
      </div>
    </div>
  )
}
