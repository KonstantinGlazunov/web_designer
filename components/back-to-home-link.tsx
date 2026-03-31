'use client'

import { useRouter } from 'next/navigation'

export function BackToHomeLink() {
  const router = useRouter()

  function handleClick() {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push('/')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-10 inline-flex text-sm font-semibold text-emerald-500 hover:text-emerald-400"
    >
      Zurück zur Startseite
    </button>
  )
}
