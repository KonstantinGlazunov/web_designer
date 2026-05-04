import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { AgencyStudioPage } from '@/components/agency-studio-page'

export const metadata: Metadata = {
  title: 'Landing2 | Vibe Studio',
  description:
    'Vibe Studio: агентский сайт со стеком, кейсами, процессом и интерактивным чатом.',
}

function isLocalHost(hostHeader: string): boolean {
  const host = hostHeader.split(':')[0].trim().toLowerCase()
  if (!host) return false
  if (host === 'localhost' || host === '127.0.0.1' || host === '::1') return true
  if (host.startsWith('192.168.') || host.startsWith('10.')) return true
  if (host.startsWith('172.')) {
    const second = Number.parseInt(host.split('.')[1] ?? '', 10)
    return Number.isInteger(second) && second >= 16 && second <= 31
  }
  return false
}

export default async function Landing2Route() {
  if (process.env.NODE_ENV === 'production') {
    const requestHeaders = await headers()
    const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? ''

    if (!isLocalHost(host)) {
      notFound()
    }
  }

  return <AgencyStudioPage />
}
