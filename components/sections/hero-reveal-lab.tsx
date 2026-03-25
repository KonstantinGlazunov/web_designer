'use client'

import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useRef } from 'react'
import type { SiteCopy } from '@/lib/translations'

const HeroScene = dynamic(() => import('@/components/hero-scene').then((mod) => mod.HeroScene), {
  ssr: false,
})

function CinematicBlurPreview({ hero }: { hero: SiteCopy['hero'] }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const glowDelay = 0.08
  const glowDuration = 2.45
  const veilDelay = 0.12
  const veilDuration = 2.75
  const sweepDelay = 0.92
  const sweepDuration = 1.65
  const headerDelay = 5.1
  const footerDelay = 6.1
  const detailsDelay = 7.1
  const titleDelay = 8.1
  const elementDuration = 0.82

  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden rounded-[34px] border border-white/10 bg-slate-950 shadow-[0_40px_120px_rgba(3,8,15,0.36)]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroScene mode="background" className="h-full" />
      </div>
      <div className="hero-aurora pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_22%,rgba(103,232,249,0.28),transparent_40%),radial-gradient(circle_at_78%_26%,rgba(167,139,250,0.3),transparent_42%),radial-gradient(circle_at_48%_72%,rgba(124,156,255,0.24),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(2,6,23,0.05)_0%,rgba(2,6,23,0.12)_55%,rgba(2,6,23,0.18)_100%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.72),rgba(255,255,255,0.22)_28%,rgba(255,255,255,0.08)_44%,transparent_68%)] mix-blend-screen"
        initial={{ opacity: 1, scale: 1.18 }}
        animate={isInView ? { opacity: 0.12, scale: 1.01 } : { opacity: 1, scale: 1.18 }}
        transition={{ duration: glowDuration, delay: glowDelay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[6] backdrop-blur-[28px]"
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 0.02 } : { opacity: 1 }}
        transition={{ duration: veilDuration, delay: veilDelay, ease: [0.2, 1, 0.3, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(120deg,rgba(255,255,255,0.24),transparent_30%,transparent_72%,rgba(255,255,255,0.1))]"
        initial={{ opacity: 0.44, x: '-3%' }}
        animate={isInView ? { opacity: 0.07, x: '2%' } : { opacity: 0.44, x: '-3%' }}
        transition={{ duration: sweepDuration, delay: sweepDelay, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-4 text-white sm:px-7 sm:pb-7 sm:pt-5">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: elementDuration, delay: headerDelay, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[9px] uppercase tracking-[0.22em] backdrop-blur-md sm:text-[10px]"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            Vibe Studio
          </span>
          <span>{hero.badge}</span>
        </motion.div>

        <div className="mt-auto flex h-full flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: elementDuration, delay: footerDelay, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-2 sm:grid-cols-3"
          >
            {hero.proofPoints.map((point) => (
              <div
                key={point}
                className="rounded-[16px] border border-white/14 bg-white/10 px-3 py-2 text-[10px] leading-4 text-slate-100 backdrop-blur-md sm:text-[11px] sm:leading-5"
              >
                {point}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: elementDuration, delay: detailsDelay, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4"
          >
            <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md sm:text-[10px]">
              {hero.badge}
            </span>
            <p className="mt-3 max-w-[90%] text-[11px] leading-5 text-slate-100/90 sm:text-sm sm:leading-6">
              {hero.subtitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="rounded-full bg-white px-3 py-2 text-[10px] font-semibold text-slate-950 sm:px-4 sm:text-xs">
                {hero.ctaPrimary}
              </div>
              <div className="rounded-full border border-white/18 bg-white/10 px-3 py-2 text-[10px] font-semibold text-white sm:px-4 sm:text-xs">
                {hero.ctaSecondary}
              </div>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: elementDuration, delay: titleDelay, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[74%] text-[clamp(1.2rem,2.4vw,2.9rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white"
          >
            {hero.title}
          </motion.h3>
        </div>
      </div>
    </div>
  )
}

export function HeroRevealLab({ copy }: { copy: SiteCopy }) {
  return (
    <section id="reveal-lab" className="relative min-h-[100svh] scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <CinematicBlurPreview hero={copy.hero} />
        </motion.div>
      </div>
    </section>
  )
}
