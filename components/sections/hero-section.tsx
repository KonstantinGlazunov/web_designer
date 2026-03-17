'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LocaleToggle } from '@/components/locale-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import type { SiteCopy } from '@/lib/translations'

const HeroScene = dynamic(() => import('@/components/hero-scene').then((mod) => mod.HeroScene), {
  ssr: false,
})

interface HeroSectionProps {
  copy: SiteCopy
  onOpenForm: () => void
}

export function HeroSection({ copy, onOpenForm }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-organic-gradient opacity-90" />
      <div className="pointer-events-none absolute -left-10 top-12 h-56 w-56 rounded-full bg-sky-400/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-1/3 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col">
        <div className="mb-10 flex items-center justify-between gap-4 rounded-full border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            CodeVibe Studio
          </div>
          <div className="flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-xl"
            >
              {copy.hero.badge}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="mt-6 max-w-5xl text-balance text-[clamp(4rem,10vw,8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white"
            >
              {copy.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-6 max-w-2xl text-base leading-8 text-slate-100/90 md:text-xl"
            >
              {copy.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button size="lg" onClick={onOpenForm}>
                {copy.hero.ctaPrimary}
              </Button>
              <a href="#portfolio">
                <Button variant="secondary" size="lg" className="gap-2">
                  {copy.hero.ctaSecondary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            <div className="mt-10 grid gap-3 md:max-w-2xl md:grid-cols-3">
              {copy.hero.proofPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 + index * 0.08 }}
                  className="rounded-[26px] border border-white/15 bg-white/10 px-4 py-4 text-sm text-slate-100 backdrop-blur-xl"
                >
                  {point}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative"
          >
            <HeroScene />
            <div className="absolute -bottom-6 -left-2 max-w-[14rem] rounded-[28px] border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                {copy.hero.floatingCardTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/90">{copy.hero.floatingCardText}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
