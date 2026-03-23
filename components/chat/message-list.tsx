'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { MessageItem } from './message-item'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  options?: string[]
}

interface MessageListProps {
  messages: ChatMessage[]
  isTyping?: boolean
  quickReplies?: string[]
  onQuickReply?: (text: string) => void
  emptyHint?: string
  theme?: 'light' | 'dark'
  typingMessageIndex?: number | null
  onTypingComplete?: () => void
}

export function MessageList({ messages, isTyping, quickReplies, onQuickReply, theme = 'dark', typingMessageIndex = null, onTypingComplete }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
      aria-busy={isTyping}
      className={
        theme === 'dark'
          ? 'flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-2 py-4'
          : 'flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain bg-slate-50/50 px-2 py-4'
      }
    >
      {messages.length > 0 && (
        <>
          {messages.map((msg, i) => (
            <MessageItem
              key={i}
              role={msg.role}
              content={msg.content}
              theme={theme}
              animateIn={typingMessageIndex === i}
              onTypingComplete={typingMessageIndex === i ? onTypingComplete : undefined}
            />
          ))}
          {isTyping && (
            <div className="flex w-full justify-start gap-2">
              <div className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/Chat_avatar.png"
                  alt="Guidi"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-cover"
                />
              </div>
              <div className={theme === 'dark' ? 'rounded-2xl bg-white/10 px-4 py-3' : 'rounded-2xl bg-slate-100 px-4 py-3'}>
                <span className="inline-flex gap-1" aria-label="Typing">
                  <span className={`h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s] ${theme === 'dark' ? 'bg-slate-400' : 'bg-slate-500'}`} />
                  <span className={`h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s] ${theme === 'dark' ? 'bg-slate-400' : 'bg-slate-500'}`} />
                  <span className={`h-2 w-2 animate-bounce rounded-full ${theme === 'dark' ? 'bg-slate-400' : 'bg-slate-500'}`} />
                </span>
              </div>
            </div>
          )}
        </>
      )}
      {quickReplies && quickReplies.length > 0 && onQuickReply && (
        <div className="flex flex-wrap gap-2 px-2 pb-2">
          {quickReplies.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onQuickReply(opt)}
              aria-label={opt}
              className={
                theme === 'dark'
                  ? 'rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition hover:border-emerald-300/40 hover:bg-emerald-500/20'
                  : 'rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50'
              }
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
