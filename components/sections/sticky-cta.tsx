'use client'

import { motion } from 'framer-motion'
import { MessageCircleMore } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SiteCopy } from '@/lib/translations'

interface StickyCtaProps {
  copy: SiteCopy['stickyCta']
  onOpenForm: () => void
}

export function StickyCta({ copy, onOpenForm }: StickyCtaProps) {
  return (
    <motion.div
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, delay: 0.35 }}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl"
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
