import type { ReactNode } from 'react'
import { SitePreferencesProvider } from '@/components/providers/site-preferences'

export default function RuLayout({ children }: { children: ReactNode }) {
  return <SitePreferencesProvider routeLocale="ru">{children}</SitePreferencesProvider>
}
