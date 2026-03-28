'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
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
const UI_REVEAL_DELAY_MS = 180
const FALLBACK_VIDEO_MS = 9000

export function HeroSection({ copy, onOpenForm }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoStartedRef = useRef(false)
  const fallbackTimeoutRef = useRef<number | null>(null)
  const crossfadeTimeoutRef = useRef<number | null>(null)
  const uiRevealTimeoutRef = useRef<number | null>(null)
  const [crossfadeStarted, setCrossfadeStarted] = useState(false)
  const [videoFinished, setVideoFinished] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [uiReady, setUiReady] = useState(false)

  const clearPendingTimers = useCallback(() => {
    if (fallbackTimeoutRef.current !== null) {
      window.clearTimeout(fallbackTimeoutRef.current)
      fallbackTimeoutRef.current = null
    }

    if (crossfadeTimeoutRef.current !== null) {
      window.clearTimeout(crossfadeTimeoutRef.current)
      crossfadeTimeoutRef.current = null
    }

    if (uiRevealTimeoutRef.current !== null) {
      window.clearTimeout(uiRevealTimeoutRef.current)
      uiRevealTimeoutRef.current = null
    }
  }, [])

  const finishIntroImmediately = useCallback(() => {
    if (uiReady) return

    clearPendingTimers()
    setCrossfadeStarted(true)
    setVideoFinished(true)
    setUiReady(true)

    const video = videoRef.current
    if (video) {
      video.pause()
    }
  }, [clearPendingTimers, uiReady])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.load()

    fallbackTimeoutRef.current = window.setTimeout(() => {
      if (videoStartedRef.current) return
      setCrossfadeStarted(true)
      crossfadeTimeoutRef.current = window.setTimeout(() => {
        setVideoFinished(true)
        uiRevealTimeoutRef.current = window.setTimeout(() => setUiReady(true), UI_REVEAL_DELAY_MS)
      }, VIDEO_CROSSFADE_MS)
    }, FALLBACK_VIDEO_MS)

    const handleSkipIntro = () => {
      if (window.scrollY > 0) {
        finishIntroImmediately()
      }
    }

    window.addEventListener('wheel', handleSkipIntro, { passive: true })
    window.addEventListener('touchmove', handleSkipIntro, { passive: true })
    window.addEventListener('scroll', handleSkipIntro, { passive: true })

    return () => {
      clearPendingTimers()
      window.removeEventListener('wheel', handleSkipIntro)
      window.removeEventListener('touchmove', handleSkipIntro)
      window.removeEventListener('scroll', handleSkipIntro)
    }
  }, [finishIntroImmediately, uiReady, clearPendingTimers])

  const startCrossfade = () => {
    if (crossfadeStarted) return
    setCrossfadeStarted(true)
    crossfadeTimeoutRef.current = window.setTimeout(() => {
      setVideoFinished(true)
      uiRevealTimeoutRef.current = window.setTimeout(() => setUiReady(true), UI_REVEAL_DELAY_MS)
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
      <div className="hero-aurora pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_16%_18%,rgba(251,191,36,0.18),transparent_32%),radial-gradient(circle_at_78%_22%,rgba(96,165,250,0.24),transparent_38%),radial-gradient(circle_at_54%_70%,rgba(16,185,129,0.16),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(135deg,rgba(7,10,20,0.2)_0%,rgba(7,10,20,0.34)_42%,rgba(7,10,20,0.68)_100%)]" />
      <div className="hero-grid pointer-events-none absolute inset-0 z-[3] opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-48 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_68%)]" />
      <motion.div
        animate={{
          opacity: videoFinished ? 0 : crossfadeStarted ? 0 : 1,
          scale: crossfadeStarted ? 1.012 : 1,
          filter: crossfadeStarted ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ duration: 2.05, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-[4] overflow-hidden"
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          animate={{ opacity: videoReady ? 0 : 1 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 z-[1] bg-black"
        />
        <motion.div
          initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          animate={
            videoReady
              ? { opacity: 0, scale: 1.08, filter: 'blur(24px)' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 1.15, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 z-[2] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4 text-white/78">
            <div className="relative h-28 w-28">
              <div className="hero-spiral-glow absolute inset-[-18%] rounded-full" />
              <div className="hero-spiral hero-loader absolute inset-0" />
              <div className="hero-spiral-core absolute inset-[34%] rounded-full" />
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/62">
              Loading intro
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={videoReady ? { opacity: 0.95, scale: 1.45 } : { opacity: 0, scale: 0.82 }}
          transition={{ duration: 1.05, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 z-[2] flex items-center justify-center"
        >
          <div className="hero-loader-bloom h-40 w-40 rounded-full" />
        </motion.div>
        <video
          ref={videoRef}
          className="absolute inset-0 z-[3] h-full w-full bg-black object-cover"
          muted
          playsInline
          preload="auto"
          autoPlay
          onPlay={() => {
            videoStartedRef.current = true
          }}
          onLoadedData={() => {
            setVideoReady(true)
          }}
          onCanPlay={async () => {
            setVideoReady(true)

            try {
              await videoRef.current?.play()
            } catch {
              // Browser autoplay handling may already be in progress.
            }
          }}
          onTimeUpdate={handleTimeUpdate}
          onEnded={startCrossfade}
          style={{
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 1150ms cubic-bezier(0.19, 1, 0.22, 1)',
          }}
        >
          <source src="/hero-intro.mp4" type="video/mp4" />
        </video>
        <motion.div
          animate={{ opacity: crossfadeStarted ? 0.14 : 0.32 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-[4] bg-[linear-gradient(180deg,rgba(2,6,23,0.06)_0%,rgba(2,6,23,0.2)_100%)]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center justify-between gap-3 rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.07))] px-3 py-2.5 shadow-[0_18px_80px_rgba(5,10,20,0.24)] backdrop-blur-2xl sm:mb-10 sm:gap-4 sm:px-5 sm:py-3"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-amber-300" />
            Vibe Studio
          </div>
          <div className="hidden items-center gap-5 text-sm text-white/72 lg:flex">
            <Link href="#services" className="transition hover:text-white">
              {copy.nav.services}
            </Link>
            <Link href="#portfolio" className="transition hover:text-white">
              {copy.nav.portfolio}
            </Link>
            <Link href="#process" className="transition hover:text-white">
              {copy.nav.process}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </motion.div>

        <div className="grid min-h-[calc(100svh-8rem)] items-end gap-10 pb-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.78fr)] lg:gap-12 lg:pb-10">
          <div className="max-w-4xl self-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center rounded-full border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/88 backdrop-blur-xl"
            >
              {copy.hero.badge}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-5xl text-balance text-[clamp(2.7rem,13vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white sm:mt-6 sm:tracking-[-0.065em]"
            >
              {copy.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.82, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-2xl text-sm leading-6 text-slate-100/88 sm:mt-6 sm:text-base sm:leading-8 md:text-[1.18rem]"
            >
              {copy.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.82, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4"
            >
              <Button
                size="lg"
                onClick={onOpenForm}
                className="bg-[#f8f6f1] text-slate-950 shadow-[0_20px_90px_rgba(248,246,241,0.22)] hover:bg-white"
              >
                {copy.hero.ctaPrimary}
              </Button>
              <Link
                href="#portfolio"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] px-6 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-200/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {copy.hero.ctaSecondary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/78 md:mt-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.72, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-full border border-white/14 bg-black/16 px-4 py-2 backdrop-blur-xl"
              >
                {copy.hero.floatingCardTitle}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.72, delay: 0.66, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-full border border-white/14 bg-black/16 px-4 py-2 backdrop-blur-xl"
              >
                Premium 3D intro
              </motion.div>
            </div>

            <div className="mt-6 grid gap-2.5 md:mt-8 md:max-w-2xl md:grid-cols-3 md:gap-3">
              {copy.hero.proofPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 20 }}
                  animate={uiReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.72, delay: 0.62 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[24px] border border-white/14 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] px-3 py-3 text-xs text-slate-100 shadow-[0_20px_80px_rgba(5,10,20,0.16)] backdrop-blur-2xl sm:rounded-[28px] sm:px-4 sm:py-4 sm:text-sm"
                >
                  {point}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
