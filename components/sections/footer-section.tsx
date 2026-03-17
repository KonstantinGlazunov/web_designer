import Link from 'next/link'
import { Github, Instagram, Linkedin } from 'lucide-react'
import { LocaleToggle } from '@/components/locale-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import type { SiteCopy } from '@/lib/translations'

export function FooterSection({ copy }: { copy: SiteCopy['footer'] }) {
  return (
    <footer id="contact" className="px-4 pb-28 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[32px] border border-white/12 bg-white/70 p-8 shadow-glow backdrop-blur-xl dark:bg-glass-dark/75 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-400">CodeVibe Studio</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {copy.description}
          </p>
          <div className="mt-6 flex items-center gap-3 text-slate-700 dark:text-slate-200">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <div className="flex items-center gap-3">
            <LocaleToggle />
            <ThemeToggle />
          </div>
          <div className="flex flex-col items-start gap-2 text-sm lg:items-end">
            <Link href="/agb" className="text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
              {copy.legal.agb}
            </Link>
            <Link
              href="/datenschutzerklaerung"
              className="text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              {copy.legal.privacy}
            </Link>
            <Link
              href="/impressum"
              className="text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              {copy.legal.impressum}
            </Link>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{copy.socials}</p>
        </div>
      </div>
    </footer>
  )
}
