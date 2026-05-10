'use client'

import { useMemo, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

type ProtectedContactLinkProps = {
  label: string
  maskedValue: string
  revealLabel: string
  hrefScheme: 'tel:' | 'mailto:'
  hrefParts: string[]
  displayParts: string[]
  className: string
  analyticsKind?: 'phone' | 'email'
  analyticsPlacement?: string
  locale?: 'de' | 'ru'
}

export function ProtectedContactLink({
  label,
  maskedValue,
  revealLabel,
  hrefScheme,
  hrefParts,
  displayParts,
  className,
  analyticsKind,
  analyticsPlacement,
  locale,
}: ProtectedContactLinkProps) {
  const [revealed, setRevealed] = useState(false)

  const href = useMemo(() => `${hrefScheme}${hrefParts.join('')}`, [hrefScheme, hrefParts])
  const displayValue = useMemo(() => displayParts.join(''), [displayParts])

  if (revealed) {
    return (
      <a
        href={href}
        className={className}
        onClick={() => {
          if (!analyticsKind) return
          trackEvent('contact_click', {
            contact_kind: analyticsKind,
            placement: analyticsPlacement,
            locale,
          })
        }}
      >
        {label}: {displayValue}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        setRevealed(true)
        if (!analyticsKind) return
        trackEvent('contact_reveal', {
          contact_kind: analyticsKind,
          placement: analyticsPlacement,
          locale,
        })
      }}
      className={className}
    >
      <span>{label}: {maskedValue}</span>
      <span className="ml-2 text-xs font-semibold underline underline-offset-2">{revealLabel}</span>
    </button>
  )
}
