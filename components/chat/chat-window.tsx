'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import type { Locale } from '@/lib/translations'
import { chatCopy } from '@/lib/translations'
import { isClosingMessage } from '@/lib/chat-utils'
import { MessageList } from './message-list'
import { ChatInput } from './chat-input'
import type { ChatMessage } from './message-list'

const SESSION_KEY = 'chat_session_id'

function getTimeGreeting(locale: Locale, date = new Date()): string {
  const hour = date.getHours()

  if (locale === 'de') {
    if (hour >= 5 && hour < 12) return 'Guten Morgen!'
    if (hour >= 12 && hour < 18) return 'Guten Tag!'
    if (hour >= 18 && hour < 23) return 'Guten Abend!'
    return 'Gute Nacht!'
  }

  if (hour >= 5 && hour < 12) return 'Доброе утро!'
  if (hour >= 12 && hour < 18) return 'Добрый день!'
  if (hour >= 18 && hour < 23) return 'Добрый вечер!'
  return 'Доброй ночи!'
}

function getInitialGreeting(locale: Locale): ChatMessage {
  const copy = chatCopy[locale]
  const greeting = getTimeGreeting(locale)
  const body =
    locale === 'de'
      ? 'Ich bin Max Webberater und helfe kleinen Unternehmen in Deutschland, Kunden über Webseiten zu gewinnen.\n\nWie darf ich Sie ansprechen?'
      : 'Меня зовут Max Webberater, я помогаю малому бизнесу в Германии получать клиентов через сайты.\n\nПодскажите, пожалуйста, как я могу к вам обращаться?'

  return {
    role: 'assistant',
    content: `${greeting}\n${body}`,
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
  onInputFocusChange?: (focused: boolean) => void
}

export function ChatWindow({ locale, theme, autoFocus, onInputFocusChange }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(null)
  const [sessionLoaded, setSessionLoaded] = useState(false)
  const [sessionId] = useState(() => getOrCreateSessionId())
  const [quickRepliesDismissed, setQuickRepliesDismissed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatCopyLocale = useMemo(() => chatCopy[locale], [locale])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const check = () => {
      setIsMobile(window.innerWidth < 640)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (messages.length === 0 && sessionLoaded) setTypingMessageIndex(0)
  }, [messages.length, sessionLoaded])

  useEffect(() => {
    if (autoFocus && !isMobile) {
      const timer = setTimeout(() => inputRef.current?.focus(), 200)
      return () => clearTimeout(timer)
    }
  }, [autoFocus, isMobile])

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/session?sessionId=${encodeURIComponent(sessionId)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        if (data.messages?.length) setMessages(data.messages)
      })
      .catch((error: unknown) => {
        if ((error as { name?: string })?.name !== 'AbortError') {
          console.error('[Chat] Session restore failed', error)
        }
      })
      .finally(() => setSessionLoaded(true))

    return () => controller.abort()
  }, [sessionId])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: ChatMessage = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: trimmed, locale }),
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
      if (!isMobile) {
        setTimeout(() => inputRef.current?.focus(), 0)
      }
    } finally {
      setIsTyping(false)
    }
  }, [sessionId, locale, isMobile])

  const displayMessages = messages.length === 0 ? [getInitialGreeting(locale)] : messages
  const lastMsg = displayMessages[displayMessages.length - 1]
  const quickReplies =
    !isTyping &&
    lastMsg?.role === 'assistant' &&
    lastMsg.options?.length &&
    !quickRepliesDismissed &&
    !isClosingMessage(lastMsg.content)
      ? [...lastMsg.options, '__OTHER__']
      : undefined

  const handleTypingComplete = useCallback(() => {
    setTypingMessageIndex(null)
    if (!isMobile) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isMobile])

  const handleInputFocusChange = useCallback(
    (focused: boolean) => {
      onInputFocusChange?.(focused)
    },
    [onInputFocusChange]
  )

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
      <ChatInput
        ref={inputRef}
        onSend={sendMessage}
        disabled={isTyping}
        placeholder={chatCopyLocale.placeholder}
        submitButton={chatCopyLocale.submitButton}
        theme={theme}
        onFocusChange={handleInputFocusChange}
      />
    </div>
  )
}
