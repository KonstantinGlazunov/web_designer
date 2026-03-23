'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
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
    <section className="relative min-h-[100svh] overflow-x-clip overflow-y-hidden px-4 pb-10 pt-4 sm:min-h-screen sm:px-6 sm:pb-16 sm:pt-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroScene mode="background" className="h-full" />
      </div>
      <div className="hero-aurora pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_22%,rgba(56,189,248,0.3),transparent_40%),radial-gradient(circle_at_78%_26%,rgba(139,92,246,0.32),transparent_42%),radial-gradient(circle_at_48%_72%,rgba(16,185,129,0.26),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(2,6,23,0.04)_0%,rgba(2,6,23,0.12)_55%,rgba(2,6,23,0.18)_100%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col">
        <div className="mb-6 flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-xl sm:mb-10 sm:gap-4 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            CodeVibe Studio
          </div>
          <div className="flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="max-w-4xl">
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
              className="mt-4 max-w-5xl text-balance text-[clamp(2.4rem,13vw,8rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:mt-6 sm:tracking-[-0.06em]"
            >
              {copy.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-4 max-w-2xl text-sm leading-6 text-slate-100/90 sm:mt-6 sm:text-base sm:leading-8 md:text-xl"
            >
              {copy.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4"
            >
              <Button size="lg" onClick={onOpenForm}>
                {copy.hero.ctaPrimary}
              </Button>
              <Link
                href="#portfolio"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {copy.hero.ctaSecondary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="mt-6 grid gap-2.5 md:mt-10 md:max-w-2xl md:grid-cols-3 md:gap-3">
              {copy.hero.proofPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 + index * 0.08 }}
                  className="rounded-[22px] border border-white/15 bg-white/10 px-3 py-3 text-xs text-slate-100 backdrop-blur-xl sm:rounded-[26px] sm:px-4 sm:py-4 sm:text-sm"
                >
                  {point}
                </motion.div>
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}
