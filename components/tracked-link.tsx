'use client'

import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

interface TrackedLinkProps {
  href: string
  className?: string
  style?: CSSProperties
  children: ReactNode
  target?: string
  rel?: string
  eventName?: string
  eventParams?: Record<string, string | number | boolean | undefined>
}

export function TrackedLink({
  href,
  className,
  style,
  children,
  target,
  rel,
  eventName = 'cta_click',
  eventParams,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, { href, ...eventParams })
  }

  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return (
      <a href={href} target={target} rel={rel} className={className} style={style} onClick={handleClick}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} style={style} onClick={handleClick}>
        {children}
    </Link>
  )
}
