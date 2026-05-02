'use client'

import { useMemo, useState } from 'react'

type ProtectedContactLinkProps = {
  label: string
  maskedValue: string
  revealLabel: string
  hrefScheme: 'tel:' | 'mailto:'
  hrefParts: string[]
  displayParts: string[]
  className: string
}

export function ProtectedContactLink({
  label,
  maskedValue,
  revealLabel,
  hrefScheme,
  hrefParts,
  displayParts,
  className,
}: ProtectedContactLinkProps) {
  const [revealed, setRevealed] = useState(false)

  const href = useMemo(() => `${hrefScheme}${hrefParts.join('')}`, [hrefScheme, hrefParts])
  const displayValue = useMemo(() => displayParts.join(''), [displayParts])

  if (revealed) {
    return (
      <a href={href} className={className}>
        {label}: {displayValue}
      </a>
    )
  }

  return (
    <button type="button" onClick={() => setRevealed(true)} className={className}>
      <span>{label}: {maskedValue}</span>
      <span className="ml-2 text-xs font-semibold underline underline-offset-2">{revealLabel}</span>
    </button>
  )
}
