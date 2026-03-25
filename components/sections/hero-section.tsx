'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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

const VIDEO_CROSSFADE_MS = 2200
const UI_REVEAL_DELAY_MS = 620
const FALLBACK_VIDEO_MS = 5200

export function HeroSection({ copy, onOpenForm }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [crossfadeStarted, setCrossfadeStarted] = useState(false)
  const [videoFinished, setVideoFinished] = useState(false)
  const [uiReady, setUiReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const fallbackId = window.setTimeout(() => {
      setCrossfadeStarted(true)
      window.setTimeout(() => {
        setVideoFinished(true)
        window.setTimeout(() => setUiReady(true), UI_REVEAL_DELAY_MS)
      }, VIDEO_CROSSFADE_MS)
    }, FALLBACK_VIDEO_MS)

    const startPlayback = async () => {
      try {
        await video.play()
      } catch {
        // Fallback timeout above will continue the sequence if autoplay is blocked.
      }
    }

    startPlayback()

    return () => {
      window.clearTimeout(fallbackId)
    }
  }, [])

  const startCrossfade = () => {
    if (crossfadeStarted) return
    setCrossfadeStarted(true)
    window.setTimeout(() => {
      setVideoFinished(true)
      window.setTimeout(() => setUiReady(true), UI_REVEAL_DELAY_MS)
    }, VIDEO_CROSSFADE_MS)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || crossfadeStarted || !Number.isFinite(video.duration) || video.duration <= 0) return

    const remaining = video.duration - video.currentTime
    if (remaining <= 1.85) {
      startCrossfade()
    }
  }

  return (
    <section className="relative min-h-[100svh] overflow-x-clip overflow-y-hidden px-4 pb-10 pt-4 sm:min-h-screen sm:px-6 sm:pb-16 sm:pt-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0.34, scale: 1.018, filter: 'blur(8px)' }}
          animate={{
            opacity: crossfadeStarted ? 1 : 0.34,
            scale: crossfadeStarted ? 1 : 1.018,
            filter: crossfadeStarted ? 'blur(0px)' : 'blur(10px)',
          }}
          transition={{ duration: 1.95, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          <HeroScene mode="background" className="h-full" />
        </motion.div>
      </div>
      <div className="hero-aurora pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_22%,rgba(103,232,249,0.28),transparent_40%),radial-gradient(circle_at_78%_26%,rgba(167,139,250,0.3),transparent_42%),radial-gradient(circle_at_48%_72%,rgba(124,156,255,0.24),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(2,6,23,0.04)_0%,rgba(2,6,23,0.12)_55%,rgba(2,6,23,0.18)_100%)]" />
      {!videoFinished ? (
        <motion.div
          animate={{
            opacity: crossfadeStarted ? 0 : 1,
            scale: crossfadeStarted ? 1.012 : 1,
            filter: crossfadeStarted ? 'blur(8px)' : 'blur(0px)',
          }}
          transition={{ duration: 2.05, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-[4] overflow-hidden"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/kling_20260325_作品_A_cinemati_6067_0.mp4"
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={startCrossfade}
          />
          <motion.div
            animate={{ opacity: crossfadeStarted ? 0.14 : 0.32 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06)_0%,rgba(2,6,23,0.2)_100%)]"
          />
        </motion.div>
      ) : null}

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-xl sm:mb-10 sm:gap-4 sm:px-4 sm:py-3"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            Vibe Studio
          </div>
          <div className="flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </motion.div>

        <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-xl"
            >
              {copy.hero.badge}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-5xl text-balance text-[clamp(2.4rem,13vw,8rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:mt-6 sm:tracking-[-0.06em]"
            >
              {copy.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.82, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-2xl text-sm leading-6 text-slate-100/90 sm:mt-6 sm:text-base sm:leading-8 md:text-xl"
            >
              {copy.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.82, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
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
                  animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.72, delay: 0.62 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
