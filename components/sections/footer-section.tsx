import Link from 'next/link'
import { LocaleToggle } from '@/components/locale-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { CookieSettingsTrigger } from '@/components/cookie-settings-trigger'
import type { SiteCopy } from '@/lib/translations'

export function FooterSection({ copy }: { copy: SiteCopy['footer'] }) {
  return (
    <footer id="contact" className="px-4 pb-28 pt-16 sm:px-6 lg:snap-start lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[32px] border border-white/12 bg-white/70 p-8 shadow-glow backdrop-blur-xl dark:bg-glass-dark/75 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-400">Vibe Studio</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {copy.description}
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <div className="flex items-center gap-3">
            <LocaleToggle />
            <ThemeToggle />
          </div>
          <div className="grid w-full grid-cols-2 justify-items-start gap-x-8 gap-y-2 text-sm lg:justify-items-end lg:text-right">
            <Link href="/ueber-mich" className="block w-full text-left text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white lg:text-right">
              {copy.about}
            </Link>
            <Link href="/landing" className="block w-full text-left text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white lg:text-right">
              Landing
            </Link>
            <Link href="/agb" className="block w-full text-left text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white lg:text-right">
              {copy.legal.agb}
            </Link>
            <Link
              href="/datenschutzerklaerung"
              className="block w-full text-left text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white lg:text-right"
            >
              {copy.legal.privacy}
            </Link>
            <Link
              href="/impressum"
              className="block w-full text-left text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white lg:text-right"
            >
              {copy.legal.impressum}
            </Link>
            <CookieSettingsTrigger className="block w-full text-left text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white lg:text-right" />
            <Link href="/kontakt" className="col-span-2 block w-full text-left font-semibold text-slate-900 transition hover:text-slate-950 dark:text-white dark:hover:text-emerald-200 lg:text-right">
              Kontakt
            </Link>
          </div>
          {copy.socials ? <p className="text-sm text-slate-500 dark:text-slate-400">{copy.socials}</p> : null}
        </div>
      </div>
    </footer>
  )
}
