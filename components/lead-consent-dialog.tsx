'use client'

import Link from 'next/link'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { useLeadConsent } from '@/components/providers/lead-consent'
import { Button } from '@/components/ui/button'

type Copy = {
  title: string
  text: string
  checkbox: string
  confirm: string
  privacy: string
  close: string
}

const RU: Copy = {
  title: 'Согласие на обработку данных',
  text: 'Чтобы отправить данные в чат-боте и квизе, нужно ваше согласие на обработку персональных данных.',
  checkbox: 'Я согласен(на) на обработку моих данных для обратной связи.',
  confirm: 'Продолжить',
  privacy: 'Политика конфиденциальности',
  close: 'Закрыть',
}

const DE: Copy = {
  title: 'Einwilligung zur Datenverarbeitung',
  text: 'Damit Sie Daten im Chatbot und Quiz senden können, benötigen wir Ihre Einwilligung zur Verarbeitung Ihrer personenbezogenen Daten.',
  checkbox: 'Ich stimme der Verarbeitung meiner Daten zur Kontaktaufnahme zu.',
  confirm: 'Weiter',
  privacy: 'Datenschutzerklärung',
  close: 'Schließen',
}

function LeadConsentDialogBody() {
  const { locale } = useSitePreferences()
  const copy = useMemo(() => (locale === 'de' ? DE : RU), [locale])
  const { accept, closeDialog } = useLeadConsent()
  const [checked, setChecked] = useState(false)

  return (
    <Dialog as="div" className="relative z-[120]" onClose={closeDialog} open>
      <DialogBackdrop
        as={motion.div}
        className="fixed inset-0 bg-slate-950/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <div className="fixed inset-x-0 bottom-0 p-4 sm:inset-0 sm:flex sm:items-end sm:justify-center sm:p-6">
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{copy.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy.text}</p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label={copy.close}
              title={copy.close}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-emerald-600"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span>{copy.checkbox}</span>
          </label>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/datenschutzerklaerung"
              className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
            >
              {copy.privacy}
            </Link>
            <Button disabled={!checked} onClick={accept}>
              {copy.confirm}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export function LeadConsentDialog() {
  const { consent, isDialogOpen } = useLeadConsent()
  return (
    <AnimatePresence>
      {isDialogOpen ? <LeadConsentDialogBody key={consent?.updatedAt ?? 'new'} /> : null}
    </AnimatePresence>
  )
}
