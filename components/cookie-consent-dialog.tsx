'use client'

import Link from 'next/link'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { useCookieConsent } from '@/components/providers/cookie-consent'
import { Button } from '@/components/ui/button'

type Copy = {
  title: string
  text: string
  necessary: string
  necessaryHint: string
  analytics: string
  analyticsHint: string
  marketing: string
  marketingHint: string
  acceptAll: string
  acceptNecessary: string
  save: string
  privacy: string
}

const RU: Copy = {
  title: 'Настройки cookie',
  text: 'Мы используем cookie. Необходимые — для работы сайта. Аналитика помогает улучшать продукт (Google Analytics).',
  necessary: 'Необходимые',
  necessaryHint: 'Всегда включены',
  analytics: 'Аналитика',
  analyticsHint: 'Google Analytics (после согласия)',
  marketing: 'Маркетинг',
  marketingHint: 'Реклама/ретаргетинг (выкл.)',
  acceptAll: 'Принять всё',
  acceptNecessary: 'Только необходимые',
  save: 'Сохранить настройки',
  privacy: 'Политика конфиденциальности',
}

const DE: Copy = {
  title: 'Cookie-Einstellungen',
  text: 'Wir verwenden Cookies. Notwendige Cookies sind für die Funktion der Website erforderlich. Analyse hilft uns, die Website zu verbessern (Google Analytics).',
  necessary: 'Notwendig',
  necessaryHint: 'Immer aktiv',
  analytics: 'Analyse',
  analyticsHint: 'Google Analytics (nur nach Einwilligung)',
  marketing: 'Marketing',
  marketingHint: 'Werbung/Retargeting (aus)',
  acceptAll: 'Alle akzeptieren',
  acceptNecessary: 'Nur notwendig',
  save: 'Auswahl speichern',
  privacy: 'Datenschutzerklärung',
}

function ToggleRow({
  id,
  label,
  hint,
  checked,
  disabled,
  onChange,
}: {
  id: string
  label: string
  hint: string
  checked: boolean
  disabled?: boolean
  onChange?: (next: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/70 p-4 backdrop-blur-xl dark:bg-white/5">
      <div className="min-w-0">
        <label htmlFor={id} className="block text-sm font-semibold text-slate-900 dark:text-white">
          {label}
        </label>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{hint}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        className="mt-1 h-5 w-5 accent-emerald-500"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
    </div>
  )
}

function CookieConsentDialogBody() {
  const { locale } = useSitePreferences()
  const copy = useMemo(() => (locale === 'de' ? DE : RU), [locale])
  const { consent, acceptAll, acceptNecessary, save, closeDialog } = useCookieConsent()

  const [analytics, setAnalytics] = useState(() => consent?.analytics ?? false)
  const [marketing, setMarketing] = useState(() => consent?.marketing ?? false)

  return (
    <Dialog as="div" className="relative z-[60]" onClose={closeDialog} open>
          <DialogBackdrop
            as={motion.div}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6">
            <div className="flex min-h-full items-end justify-center sm:items-center">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                className="w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-950/70 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{copy.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{copy.text}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <ToggleRow
                    id="cc-necessary"
                    label={copy.necessary}
                    hint={copy.necessaryHint}
                    checked
                    disabled
                  />
                  <ToggleRow
                    id="cc-analytics"
                    label={copy.analytics}
                    hint={copy.analyticsHint}
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <ToggleRow
                    id="cc-marketing"
                    label={copy.marketing}
                    hint={copy.marketingHint}
                    checked={marketing}
                    onChange={setMarketing}
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href="/datenschutzerklaerung"
                    className="text-sm font-medium text-slate-700 underline-offset-4 hover:underline dark:text-slate-200"
                  >
                    {copy.privacy}
                  </Link>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={acceptNecessary}>
                      {copy.acceptNecessary}
                    </Button>
                    <Button variant="secondary" onClick={acceptAll}>
                      {copy.acceptAll}
                    </Button>
                    <Button onClick={() => save({ analytics, marketing })}>{copy.save}</Button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
    </Dialog>
  )
}

export function CookieConsentDialog() {
  const { consent, isDialogOpen } = useCookieConsent()
  return (
    <AnimatePresence>
      {isDialogOpen ? <CookieConsentDialogBody key={consent?.updatedAt ?? 'new'} /> : null}
    </AnimatePresence>
  )
}

