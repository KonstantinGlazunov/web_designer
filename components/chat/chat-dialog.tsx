'use client'

import Image from 'next/image'
import { Dialog, DialogBackdrop } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Locale } from '@/lib/translations'
import { chatCopy } from '@/lib/translations'
import { ChatWindow } from './chat-window'

interface ChatDialogProps {
  open: boolean
  onClose: () => void
  locale: Locale
  theme: 'light' | 'dark'
}

export function ChatDialog({ open, onClose, locale, theme }: ChatDialogProps) {
  const copy = chatCopy[locale]
  const isDark = theme === 'dark'
  return (
    <AnimatePresence>
      {open ? (
        <Dialog as="div" className="relative z-[90]" open={open} onClose={onClose}>
          <DialogBackdrop
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={isDark ? 'fixed inset-0 bg-slate-950/80 backdrop-blur-md' : 'fixed inset-0 bg-slate-900/40 backdrop-blur-sm'}
          />
          <div className="fixed inset-0 overflow-hidden px-4 py-6 sm:py-8">
            <div
              className={
                isDark
                  ? 'mx-auto flex h-full max-h-[calc(100vh-3rem)] max-w-2xl flex-col overflow-hidden rounded-[24px] border border-white/12 bg-slate-950/95 shadow-[0_24px_120px_rgba(15,23,42,0.8)] backdrop-blur-2xl'
                  : 'mx-auto flex h-full max-h-[calc(100vh-3rem)] max-w-2xl flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_25px_80px_-12px_rgba(0,0,0,0.12)]'
              }
            >
              <div
                className={
                  isDark
                    ? 'flex shrink-0 flex-col items-center gap-3 border-b border-white/10 px-4 py-4'
                    : 'flex shrink-0 flex-col items-center gap-3 border-b border-slate-100 px-4 py-4'
                }
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full">
                      <Image src="/Chat_avatar.png" alt="Guidi" width={72} height={72} className="h-full w-full object-cover" />
                    </div>
                    <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-slate-800'}>
                      {copy.dialogTitle}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className={isDark ? 'rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white' : 'rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden">
                <ChatWindow locale={locale} theme={theme} autoFocus />
              </div>
            </div>
          </div>
        </Dialog>
      ) : null}
    </AnimatePresence>
  )
}
