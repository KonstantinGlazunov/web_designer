'use client'

import Link from 'next/link'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { useCookieConsent } from '@/components/providers/cookie-consent'
import { Button } from '@/components/ui/button'

type Copy = {
  introTitle: string
  introText: string
  settingsTitle: string
  settingsText: string
  necessary: string
  necessaryHint: string
  analytics: string
  analyticsHint: string
  marketing: string
  marketingHint: string
  openSettings: string
  acceptAll: string
  rejectAll: string
  back: string
  save: string
  privacy: string
}

const RU: Copy = {
  introTitle: 'Выберите настройки cookie',
  introText:
    'Чтобы улучшать работу сайта Vibe Studio, мы используем cookie. Они помогают безопасно показывать контент, собирать внутреннюю статистику и улучшать удобство использования. Вы можете выбрать, какие cookie разрешить. Согласие не является условием использования сайта.',
  settingsTitle: 'Настройки cookie',
  settingsText: 'Настройте категории cookie. Необходимые cookie всегда активны.',
  necessary: 'Необходимые',
  necessaryHint: 'Всегда включены',
  analytics: 'Аналитика',
  analyticsHint: 'Google Analytics (после согласия)',
  marketing: 'Маркетинг',
  marketingHint: 'Реклама/ретаргетинг (выкл.)',
  openSettings: 'Настройки cookie',
  acceptAll: 'Принять все',
  rejectAll: 'Отклонить все',
  back: 'Назад',
  save: 'Сохранить настройки',
  privacy: 'Политика конфиденциальности',
}

const DE: Copy = {
  introTitle: 'Bitte wählen Sie Ihre Cookie-Einstellungen',
  introText:
    'Um Ihr Surferlebnis bei Vibe Studio zu optimieren, nutzen wir Cookies auf unserer Website. Die Daten helfen uns, Inhalte korrekt einzubetten und interne Statistiken zu erheben. Sie können jederzeit ändern, welche Cookies Sie zulassen möchten. Die Einwilligung ist keine Voraussetzung für die Seitennutzung.',
  settingsTitle: 'Cookie-Einstellungen',
  settingsText: 'Legen Sie fest, welche Cookie-Kategorien aktiviert werden. Notwendige Cookies bleiben immer aktiv.',
  necessary: 'Notwendig',
  necessaryHint: 'Immer aktiv',
  analytics: 'Analyse',
  analyticsHint: 'Google Analytics (nur nach Einwilligung)',
  marketing: 'Marketing',
  marketingHint: 'Werbung/Retargeting (aus)',
  openSettings: 'Cookie-Einstellungen',
  acceptAll: 'Alle akzeptieren',
  rejectAll: 'Alles ablehnen',
  back: 'Zurück',
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
  const [panel, setPanel] = useState<'intro' | 'settings'>(() => (consent ? 'settings' : 'intro'))
  const isIntro = panel === 'intro'

  return (
    <Dialog as="div" className="relative z-[60]" onClose={closeDialog} open>
          {isIntro ? null : (
            <DialogBackdrop
              as={motion.div}
              className="fixed inset-0 bg-slate-950/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          <div
            className={
              isIntro
                ? 'fixed inset-x-0 bottom-0 p-0'
                : 'fixed inset-0 overflow-y-auto p-4 sm:p-6'
            }
          >
            <div className={isIntro ? 'flex items-end justify-center' : 'flex min-h-full items-end justify-center sm:items-center'}>
              <DialogPanel
                as={motion.div}
                initial={isIntro ? { opacity: 0, y: 24 } : { opacity: 0, y: 18, scale: 0.98 }}
                animate={isIntro ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                exit={isIntro ? { opacity: 0, y: 24 } : { opacity: 0, y: 18, scale: 0.98 }}
                className={
                  isIntro
                    ? 'w-full overflow-hidden rounded-t-2xl border-x border-t p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl sm:p-5 sm:pb-6'
                    : 'w-full max-w-lg overflow-hidden rounded-[28px] border p-6 shadow-2xl sm:p-7'
                }
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
                      {panel === 'intro' ? copy.introTitle : copy.settingsTitle}
                    </h2>
                    <p
                      className="mt-2 text-sm leading-6"
                      style={{ color: '#334155', opacity: 1, WebkitTextFillColor: '#334155' }}
                    >
                      {panel === 'intro' ? copy.introText : copy.settingsText}
                    </p>
                  </div>
                </div>

                {panel === 'settings' ? (
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
                ) : null}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href="/datenschutzerklaerung"
                    className="text-sm font-semibold underline-offset-4 hover:underline"
                    style={{ color: '#0f172a', opacity: 1, WebkitTextFillColor: '#0f172a' }}
                  >
                    {copy.privacy}
                  </Link>
                  {panel === 'intro' ? (
                    <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
                        <Button
                          variant="secondary"
                          className="w-full hover:!border-emerald-400/40 hover:!bg-slate-200 sm:w-auto"
                          style={{
                            backgroundColor: '#f1f5f9',
                            borderColor: '#94a3b8',
                            color: '#0f172a',
                            opacity: 1,
                            WebkitTextFillColor: '#0f172a',
                          }}
                          onClick={() => setPanel('settings')}
                        >
                          {copy.openSettings}
                        </Button>
                        <Button
                          variant="secondary"
                          className="w-full hover:!border-emerald-400/40 hover:!bg-slate-200 sm:w-auto"
                          style={{
                            backgroundColor: '#f1f5f9',
                            borderColor: '#94a3b8',
                            color: '#0f172a',
                            opacity: 1,
                            WebkitTextFillColor: '#0f172a',
                          }}
                          onClick={acceptNecessary}
                        >
                          {copy.rejectAll}
                        </Button>
                        <Button
                          className="col-start-2 w-full sm:w-auto"
                          style={{
                            backgroundColor: '#0f172a',
                            color: '#ffffff',
                            opacity: 1,
                            WebkitTextFillColor: '#ffffff',
                          }}
                          onClick={acceptAll}
                        >
                          {copy.acceptAll}
                        </Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 sm:justify-end">
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
                          onClick={() => setPanel('intro')}
                        >
                          {copy.back}
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
                  )}
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
