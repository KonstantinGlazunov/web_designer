import type { Metadata } from 'next'
import { AgencyStudioPage } from '@/components/agency-studio-page'

export const metadata: Metadata = {
  title: 'Landing2 | Vibe Studio',
  description:
    'Vibe Studio: агентский сайт со стеком, кейсами, процессом и интерактивным чатом.',
}

export default function Landing2Route() {
  return <AgencyStudioPage />
}
