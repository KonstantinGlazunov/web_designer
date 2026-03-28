'use client'

import { motion } from 'framer-motion'
import { MessageCircleMore } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SiteCopy } from '@/lib/translations'

interface StickyCtaProps {
  copy: SiteCopy['stickyCta']
  onOpenForm: () => void
  mode?: 'fixed-desktop' | 'inline-mobile'
}

export function StickyCta({ copy, onOpenForm, mode = 'fixed-desktop' }: StickyCtaProps) {
  if (mode === 'inline-mobile') {
    return (
      <section className="px-4 pb-6 pt-10 sm:hidden">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-white/12 bg-white/70 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:bg-slate-900/60">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-100">
              <MessageCircleMore className="h-4 w-4 text-emerald-400" />
              <span>{copy.text}</span>
            </div>
            <Button size="lg" onClick={onOpenForm} className="w-full">
              {copy.button}
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <motion.div
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.82, delay: 9.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 mx-auto hidden max-w-4xl sm:block"
    >
      <div className="flex items-center justify-between gap-4 rounded-full border border-white/15 bg-slate-950/80 px-5 py-3 shadow-[0_24px_100px_rgba(2,6,23,0.45)] backdrop-blur-2xl dark:bg-slate-950/80">
        <div className="flex items-center gap-3 text-sm text-white md:text-base">
          <MessageCircleMore className="h-4 w-4 text-emerald-300" />
          <span>{copy.text}</span>
        </div>
        <Button size="sm" onClick={onOpenForm}>
          {copy.button}
        </Button>
      </div>
    </motion.div>
  )
}
