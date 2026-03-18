'use client'

import { forwardRef, useRef, type FormEvent } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
  submitButton?: string
  theme?: 'light' | 'dark'
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  function ChatInput({ onSend, disabled, placeholder = 'Напишите сообщение...', submitButton = 'Отправить', theme = 'dark' }, ref) {
    const inputRef = useRef<HTMLInputElement>(null)
    const setRefs = (el: HTMLInputElement | null) => {
      ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const value = inputRef.current?.value?.trim()
      if (!value || disabled) return
      onSend(value)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      requestAnimationFrame(() => inputRef.current?.focus())
    }

    const isDark = theme === 'dark'
    return (
      <form
        onSubmit={handleSubmit}
        className={isDark ? 'flex shrink-0 gap-2 border-t border-white/10 p-3' : 'flex shrink-0 gap-2 border-t border-slate-100 bg-white p-3'}
      >
        <input
          ref={setRefs}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          className={
            isDark
              ? 'flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40 disabled:opacity-50'
              : 'flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white disabled:opacity-50'
          }
        />
        <button
          type="submit"
          disabled={disabled}
          className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {submitButton}
        </button>
      </form>
    )
  }
)
