'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSitePreferences } from '@/components/providers/site-preferences'

const ChatFab = dynamic(
  () => import('@/components/chat/chat-fab').then((mod) => mod.ChatFab),
  { ssr: false },
)

export function HomePageChat() {
  const { locale } = useSitePreferences()
  const searchParams = useSearchParams()
  const [chatReady, setChatReady] = useState(false)
  const shouldRenderShellChat = locale !== 'ru' && searchParams.get('quiz') !== '1'

  useEffect(() => {
    if (!shouldRenderShellChat) {
      return
    }

    const w = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setChatReady(true), { timeout: 1800 })
      return () => w.cancelIdleCallback?.(id)
    }

    const timer = window.setTimeout(() => setChatReady(true), 900)
    return () => window.clearTimeout(timer)
  }, [shouldRenderShellChat])

  if (!shouldRenderShellChat || !chatReady) {
    return null
  }

  return <ChatFab locale="de" theme="light" />
}
