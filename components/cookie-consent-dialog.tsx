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
    <div
      className="flex items-start justify-between gap-4 rounded-2xl border p-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
      style={{
        backgroundColor: '#f8fafc',
        borderColor: '#cbd5e1',
        color: '#0f172a',
        opacity: 1,
        filter: 'none',
        mixBlendMode: 'normal',
      }}
    >
      <div className="min-w-0">
        <label
          htmlFor={id}
          className="block text-sm font-semibold"
          style={{ color: '#0f172a', opacity: 1, WebkitTextFillColor: '#0f172a' }}
        >
          {label}
        </label>
        <p
          className="mt-1 text-sm"
          style={{ color: '#334155', opacity: 1, WebkitTextFillColor: '#334155' }}
        >
          {hint}
        </p>
      </div>
      <input
        id={id}
        type="checkbox"
        className="mt-1 h-5 w-5 shrink-0 rounded border-2 border-slate-500 bg-white accent-emerald-600 shadow-sm focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white"
        style={{ accentColor: '#059669' }}
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
            className="fixed inset-0 bg-slate-950/55"
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
                className="w-full max-w-lg overflow-hidden rounded-[28px] border p-6 shadow-2xl sm:p-7"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  color: '#0f172a',
                  opacity: 1,
                  filter: 'none',
                  mixBlendMode: 'normal',
                }}
              >
                <div className="flex items-start justify-between gap-4" style={{ color: '#0f172a', opacity: 1 }}>
                  <div>
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: '#0f172a', opacity: 1, WebkitTextFillColor: '#0f172a' }}
                    >
                      {copy.title}
                    </h2>
                    <p
                      className="mt-2 text-sm leading-6"
                      style={{ color: '#334155', opacity: 1, WebkitTextFillColor: '#334155' }}
                    >
                      {copy.text}
                    </p>
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
                    className="text-sm font-semibold underline-offset-4 hover:underline"
                    style={{ color: '#0f172a', opacity: 1, WebkitTextFillColor: '#0f172a' }}
                  >
                    {copy.privacy}
                  </Link>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="hover:!border-emerald-400/40 hover:!bg-slate-200"
                      style={{
                        backgroundColor: '#f1f5f9',
                        borderColor: '#94a3b8',
                        color: '#0f172a',
                        opacity: 1,
                        WebkitTextFillColor: '#0f172a',
                      }}
                      onClick={acceptNecessary}
                    >
                      {copy.acceptNecessary}
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:!border-emerald-400/40 hover:!bg-slate-200"
                      style={{
                        backgroundColor: '#f1f5f9',
                        borderColor: '#94a3b8',
                        color: '#0f172a',
                        opacity: 1,
                        WebkitTextFillColor: '#0f172a',
                      }}
                      onClick={acceptAll}
                    >
                      {copy.acceptAll}
                    </Button>
                    <Button
                      style={{
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        opacity: 1,
                        WebkitTextFillColor: '#ffffff',
                      }}
                      onClick={() => save({ analytics, marketing })}
                    >
                      {copy.save}
                    </Button>
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
