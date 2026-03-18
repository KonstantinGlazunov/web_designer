'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import type { Locale } from '@/lib/translations'
import { ChatDialog } from './chat-dialog'

interface ChatFabProps {
  locale: Locale
  theme: 'light' | 'dark'
}

export function ChatFab({ locale, theme }: ChatFabProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition hover:scale-105 hover:bg-emerald-400"
        aria-label={locale === 'de' ? 'Chat mit Guidi öffnen' : 'Открыть чат с Guidi'}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      <ChatDialog open={open} onClose={() => setOpen(false)} locale={locale} theme={theme} />
    </>
  )
}
