'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const TYPING_SPEED_MS = 28

interface MessageItemProps {
  role: 'user' | 'assistant'
  content: string
  theme?: 'light' | 'dark'
  animateIn?: boolean
  onTypingComplete?: () => void
}

export function MessageItem({ role, content, theme = 'dark', animateIn, onTypingComplete }: MessageItemProps) {
  const isUser = role === 'user'
  const isDark = theme === 'dark'
  const [displayedContent, setDisplayedContent] = useState(animateIn ? '' : content)

  useEffect(() => {
    if (!animateIn) {
      setDisplayedContent(content)
      return
    }
    setDisplayedContent('')
    let i = 0
    const timer = setInterval(() => {
      if (i < content.length) {
        setDisplayedContent(content.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        onTypingComplete?.()
      }
    }, TYPING_SPEED_MS)
    return () => clearInterval(timer)
  }, [content, animateIn, onTypingComplete])

  return (
    <div
      className={cn(
        'flex w-full gap-2',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <Image
            src="/Chat_avatar.png"
            alt="Guidi"
            width={36}
            height={36}
            className="h-9 w-9 object-cover"
          />
        </div>
      )}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? isDark
              ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/20'
              : 'bg-emerald-500/90 text-white'
            : isDark
              ? 'bg-white/10 text-slate-100 border border-white/10'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
        )}
      >
        <p className="whitespace-pre-wrap">
          {displayedContent}
          {animateIn && displayedContent.length < content.length && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current align-middle" aria-hidden />
          )}
        </p>
      </div>
    </div>
  )
}
