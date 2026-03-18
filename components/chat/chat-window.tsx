'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import type { Locale } from '@/lib/translations'
import { chatCopy } from '@/lib/translations'
import { isClosingMessage } from '@/lib/chat-utils'
import { MessageList } from './message-list'
import { ChatInput } from './chat-input'
import type { ChatMessage } from './message-list'

const SESSION_KEY = 'chat_session_id'

function getInitialGreeting(locale: Locale): ChatMessage {
  const copy = chatCopy[locale]
  return {
    role: 'assistant',
    content: copy.initialGreeting,
    options: copy.initialOptions,
  }
}

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

interface ChatWindowProps {
  locale: Locale
  theme: 'light' | 'dark'
  autoFocus?: boolean
}

export function ChatWindow({ locale, theme, autoFocus }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(null)
  const [sessionLoaded, setSessionLoaded] = useState(false)
  const [sessionId] = useState(() => getOrCreateSessionId())
  const [quickRepliesDismissed, setQuickRepliesDismissed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatCopyLocale = useMemo(() => chatCopy[locale], [locale])

  useEffect(() => {
    if (messages.length === 0 && sessionLoaded) setTypingMessageIndex(0)
  }, [messages.length, sessionLoaded])

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => inputRef.current?.focus(), 200)
      return () => clearTimeout(timer)
    }
  }, [autoFocus])

  useEffect(() => {
    fetch(`/api/session?sessionId=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.messages?.length) setMessages(data.messages)
      })
      .catch(() => {})
      .finally(() => setSessionLoaded(true))
  }, [sessionId])

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessage = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text, locale }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.details || 'Ошибка отправки')
      }

      const reply = data.reply as string
      const options = data.options as string[] | undefined
      const assistantMsg: ChatMessage = { role: 'assistant', content: reply, options }
      setMessages((prev) => {
        const next = [...prev, assistantMsg]
        queueMicrotask(() => setTypingMessageIndex(next.length - 1))
        return next
      })
      setQuickRepliesDismissed(false)
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : (locale === 'de' ? 'Nachricht konnte nicht gesendet werden' : 'Не удалось отправить сообщение')
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: (locale === 'de' ? 'Fehler: ' : 'Ошибка: ') + errMsg + (locale === 'de' ? ' Bitte versuchen Sie es später.' : '. Попробуйте позже.') },
      ])
      setTimeout(() => inputRef.current?.focus(), 0)
    } finally {
      setIsTyping(false)
    }
  }, [sessionId, locale])

  const displayMessages = messages.length === 0 ? [getInitialGreeting(locale)] : messages
  const lastMsg = displayMessages[displayMessages.length - 1]
  const quickReplies =
    !isTyping &&
    lastMsg?.role === 'assistant' &&
    lastMsg.options?.length &&
    !quickRepliesDismissed &&
    !isClosingMessage(lastMsg.content)
      ? lastMsg.options
      : undefined

  const handleTypingComplete = useCallback(() => {
    setTypingMessageIndex(null)
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [])

  const handleQuickReply = useCallback(
    (text: string) => {
      if (text === '__OTHER__') {
        setQuickRepliesDismissed(true)
        inputRef.current?.focus()
      } else {
        sendMessage(text)
      }
    },
    [sendMessage]
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <MessageList
        messages={displayMessages}
        isTyping={isTyping}
        quickReplies={quickReplies}
        onQuickReply={handleQuickReply}
        otherLabel={chatCopyLocale.other}
        theme={theme}
        typingMessageIndex={typingMessageIndex}
        onTypingComplete={handleTypingComplete}
      />
      <ChatInput ref={inputRef} onSend={sendMessage} disabled={isTyping} placeholder={chatCopyLocale.placeholder} submitButton={chatCopyLocale.submitButton} theme={theme} />
    </div>
  )
}
