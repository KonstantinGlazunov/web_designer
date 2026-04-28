'use client'

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { CheckCircle2, Mail, MessageCircle, Phone } from 'lucide-react'
import { LocaleToggle } from '@/components/locale-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useSitePreferences } from '@/components/providers/site-preferences'
import type { Locale } from '@/lib/translations'

type ContactCopy = {
  eyebrow: string
  title: string
  subtitle: string
  formTitle: string
  salutation: string
  salutationOptions: string[]
  name: string
  company: string
  email: string
  phone: string
  message: string
  privacyLabel: string
  privacyLink: string
  submit: string
  success: string
  directTitle: string
  whatsapp: string
  call: string
  mail: string
}

const whatsappHref = 'https://wa.me/4915110974353'

const contactCopy: Record<Locale, ContactCopy> = {
  de: {
    eyebrow: 'Kontakt',
    title: 'Kontakt aufnehmen',
    subtitle: 'Schreiben Sie kurz, worum es geht. Ich melde mich mit einer klaren Einschätzung zurück.',
    formTitle: 'Kontaktformular',
    salutation: 'Anrede',
    salutationOptions: ['Bitte wählen', 'Herr', 'Frau', 'Divers'],
    name: 'Vor- und Nachname',
    company: 'Unternehmen (optional)',
    email: 'E-Mail',
    phone: 'Telefon / WhatsApp (optional)',
    message: 'Nachricht',
    privacyLabel: 'Ich stimme der Verarbeitung meiner Angaben gemäß Datenschutzerklärung zu.',
    privacyLink: 'Datenschutzerklärung',
    submit: 'Nachricht senden',
    success: 'Vielen Dank. Ihre Nachricht wurde gesendet.',
    directTitle: 'Direkter Kontakt',
    whatsapp: 'WhatsApp schreiben',
    call: 'Telefon',
    mail: 'E-Mail',
  },
  ru: {
    eyebrow: 'Контакты',
    title: 'Связаться со мной',
    subtitle: 'Коротко опишите задачу. Я вернусь с понятной оценкой следующих шагов.',
    formTitle: 'Форма обратной связи',
    salutation: 'Обращение',
    salutationOptions: ['Выберите', 'Herr', 'Frau', 'Divers'],
    name: 'Имя и фамилия',
    company: 'Компания (необязательно)',
    email: 'E-Mail',
    phone: 'Телефон / WhatsApp (необязательно)',
    message: 'Сообщение',
    privacyLabel: 'Я согласен(на) на обработку данных согласно политике конфиденциальности.',
    privacyLink: 'Политика конфиденциальности',
    submit: 'Отправить сообщение',
    success: 'Спасибо. Ваше сообщение отправлено.',
    directTitle: 'Прямые контакты',
    whatsapp: 'Написать в WhatsApp',
    call: 'Телефон',
    mail: 'E-Mail',
  },
}

export function ContactPage() {
  const { locale } = useSitePreferences()
  const copy = useMemo(() => contactCopy[locale], [locale])

  const [salutation, setSalutation] = useState(copy.salutationOptions[0])
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const resetSuccess = () => setSent(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!consent) return

    setLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          salutation: salutation === copy.salutationOptions[0] ? '' : salutation,
          name,
          company,
          email,
          phone,
          message,
          consent,
        }),
      })

      if (!response.ok) {
        alert(locale === 'de' ? 'Senden fehlgeschlagen. Bitte später erneut versuchen.' : 'Не удалось отправить. Попробуйте позже.')
        return
      }

      setSent(true)
      setName('')
      setCompany('')
      setEmail('')
      setPhone('')
      setMessage('')
      setConsent(false)
      setSalutation(copy.salutationOptions[0])
    } catch {
      alert(locale === 'de' ? 'Senden fehlgeschlagen. Bitte später erneut versuchen.' : 'Не удалось отправить. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-800">
          Vibe Studio
        </Link>
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{copy.eyebrow}</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{copy.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">{copy.subtitle}</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">{copy.formTitle}</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                {copy.salutation}
                <select
                  value={salutation}
                  onChange={(e) => {
                    resetSuccess()
                    setSalutation(e.target.value)
                  }}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                >
                  {copy.salutationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                {copy.name}
                <input
                  required
                  value={name}
                  onChange={(e) => {
                    resetSuccess()
                    setName(e.target.value)
                  }}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                {copy.company}
                <input
                  value={company}
                  onChange={(e) => {
                    resetSuccess()
                    setCompany(e.target.value)
                  }}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  {copy.email}
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => {
                      resetSuccess()
                      setEmail(e.target.value)
                    }}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  {copy.phone}
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      resetSuccess()
                      setPhone(e.target.value)
                    }}
                    placeholder="+49 170 1234567"
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                {copy.message}
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    resetSuccess()
                    setMessage(e.target.value)
                  }}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
                />
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => {
                    resetSuccess()
                    setConsent(e.target.checked)
                  }}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900"
                />
                <span>
                  {copy.privacyLabel}{' '}
                  <Link href="/datenschutzerklaerung" className="underline underline-offset-2">
                    {copy.privacyLink}
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? '...' : copy.submit}
              </button>
            </form>

            {sent ? (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                {copy.success}
              </p>
            ) : null}
          </section>

          <section className="rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">{copy.directTitle}</h2>
            <div className="mt-6 space-y-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-300"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                {copy.whatsapp}
              </a>
              <a
                href="tel:+4915110974353"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-300"
              >
                <Phone className="h-4 w-4 text-sky-700" />
                {copy.call}: +49 1511 0974353
              </a>
              <a
                href="mailto:kontakt@erstellen-websiten.de"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-300"
              >
                <Mail className="h-4 w-4 text-sky-700" />
                {copy.mail}: kontakt@erstellen-websiten.de
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
