'use client'

import Link from 'next/link'
import { CookieSettingsTrigger } from '@/components/cookie-settings-trigger'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { localizePath } from '@/lib/locale-routes'
import { cn } from '@/lib/utils'
import { landingCopyDe } from '@/components/landing/landing-copy-de'
import { landingCopyRu } from '@/components/landing/landing-copy-ru'

export function SiteFooter({ className }: { className?: string }) {
  const { locale } = useSitePreferences()
  const footerCopy = locale === 'ru' ? landingCopyRu.footer : landingCopyDe.footer
  const aboutHref = localizePath('/ueber-mich', locale)
  const portfolioHref = localizePath('/portfolio', locale)
  const blogHref = localizePath('/blog', locale)
  const pricesHref = localizePath('/preise', locale)
  const privacyHref = localizePath('/datenschutzerklaerung', locale)
  const agbHref = localizePath('/agb', locale)
  const impressumHref = localizePath('/impressum', locale)
  const contactHref = localizePath('/kontakt', locale)
  const agbLabel = locale === 'ru' ? 'Условия' : 'AGB'

  return (
    <footer id="kontakt" className={cn('rounded-[30px] border border-slate-200 bg-white px-6 py-8 sm:px-8', className)}>
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{footerCopy.title}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{footerCopy.description}</p>
        </div>

        <div className="text-sm text-slate-700">
          <div className="grid grid-cols-2 justify-items-start gap-x-8 gap-y-2 md:justify-items-end md:text-right">
            <Link href={aboutHref} className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {footerCopy.about}
            </Link>
            <Link href={portfolioHref} className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {locale === 'ru' ? 'Портфолио' : 'Portfolio'}
            </Link>
            <Link href={blogHref} className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {footerCopy.blog}
            </Link>
            <Link href={pricesHref} className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {footerCopy.prices}
            </Link>
            <Link href={privacyHref} className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {footerCopy.legal.privacy}
            </Link>
            <Link href={agbHref} className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {agbLabel}
            </Link>
            <Link href={impressumHref} className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {footerCopy.legal.impressum}
            </Link>
            <CookieSettingsTrigger className="block w-full text-left transition hover:text-slate-950 md:text-right" />
            <Link href={contactHref} className="col-span-2 block w-full text-left font-semibold text-slate-900 transition hover:text-slate-950 md:text-right">
              {footerCopy.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
