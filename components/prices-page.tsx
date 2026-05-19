'use client'

import Link from 'next/link'
import { FormEvent, useMemo, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import { LocaleToggle } from '@/components/locale-toggle'
import { SiteFooter } from '@/components/site-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { pricesCopy } from '@/lib/prices-copy'
import { trackEvent, trackLead } from '@/lib/analytics'
import { localizePath } from '@/lib/locale-routes'
import type { Locale } from '@/lib/translations'
import { cn } from '@/lib/utils'

const whatsappHref = 'https://wa.me/4915110974353'

type PricesPageProps = {
  locale: Locale
}

export function PricesPage({ locale }: PricesPageProps) {
  const copy = pricesCopy[locale]
  const formRef = useRef<HTMLDivElement | null>(null)
  const packagesRef = useRef<HTMLDivElement | null>(null)
  const homeHref = localizePath('/', locale)
  const privacyHref = localizePath('/datenschutz', locale)
  const thankYouHref = localizePath('/danke', locale)
  const [selectedPackage, setSelectedPackage] = useState(copy.form.interestOptions[3])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)

  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: copy.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    [copy.faq.items],
  )

  const serviceJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: locale === 'de' ? 'Website erstellen lassen' : 'Создание сайтов для малого бизнеса',
      provider: {
        '@type': 'Organization',
        name: 'Vibe Studio',
        url: 'https://erstellen-websiten.de',
      },
      areaServed: 'DE',
      offers: copy.packages.map((item) => ({
        '@type': 'Offer',
        name: item.name,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: item.price.replace(/[^\d.,]/g, '').replace('.', '').replace(',', '.') || undefined,
        },
      })),
    }),
    [copy.packages, locale],
  )

  function scrollToForm(packageName?: string, placement = 'cta') {
    if (packageName) setSelectedPackage(packageName)
    trackEvent('cta_click', {
      cta_name: packageName ? 'package_request' : 'prices_form',
      package_name: packageName,
      placement,
      locale,
    })
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function scrollToPackages() {
    trackEvent('cta_click', { cta_name: 'compare_packages', placement: 'prices_hero', locale })
    packagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
          name,
          company,
          companyOrIndustry: company,
          website,
          email,
          phone,
          phoneOrWhatsapp: phone,
          selectedPackage,
          source: 'prices_page',
          page: window.location.pathname,
          message,
          consent,
        }),
      })

      if (!response.ok) {
        alert(copy.form.error)
        return
      }

      trackEvent('prices_form_submit_success', {
        locale,
        package_name: selectedPackage,
        page_path: window.location.pathname,
        has_phone: Boolean(phone.trim()),
        has_company: Boolean(company.trim()),
      })
      trackLead({
        source: 'contact_form',
        locale,
        contactMethod: phone.trim() ? 'phone_and_email' : 'email',
        pagePath: window.location.pathname,
        readyForHandoff: true,
      })
      window.location.href = thankYouHref
    } catch {
      alert(copy.form.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Link href={homeHref} className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-800">
          {copy.nav.home}
        </Link>
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white">
          <div className="grid min-h-[560px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{copy.hero.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-[3.5rem]">
                {copy.hero.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{copy.hero.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => scrollToForm(undefined, 'hero')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {copy.hero.primary}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollToPackages}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400"
                >
                  {copy.hero.secondary}
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('contact_click', { contact_kind: 'whatsapp', placement: 'prices_hero', locale })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-800 transition hover:-translate-y-0.5 hover:border-emerald-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  {copy.hero.whatsapp}
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[360px] items-end bg-slate-950 p-6 text-white sm:p-10 lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.28),transparent_32%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#164e63_100%)]" />
              <div className="relative w-full">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">{copy.packagesTitle}</p>
                <div className="mt-6 grid gap-3">
                  {copy.packages.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">{item.name}</span>
                        <span className="text-lg font-semibold">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InfoSection title={copy.startPrices.title}>
          <p>{copy.startPrices.text}</p>
          <p className="mt-3 font-medium text-slate-950">{copy.startPrices.note}</p>
        </InfoSection>

        <section ref={packagesRef} id="pakete" className="mt-6 scroll-mt-6 rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight text-slate-950">{copy.packagesTitle}</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">{copy.packagesSubtitle}</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {copy.packages.map((item) => (
              <PackageCard key={item.id} item={item} onRequest={() => scrollToForm(item.name, `package_${item.id}`)} />
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            <p>{copy.disclaimer}</p>
            <p className="mt-3">{copy.legalNote}</p>
          </div>
        </section>

        <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
          <h2 className="text-3xl font-semibold leading-tight text-slate-950">{copy.comparison.title}</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[860px] w-full border-collapse text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">{copy.comparison.functionLabel}</th>
                  {copy.packages.map((item) => (
                    <th key={item.id} className="px-4 py-3 font-semibold">{item.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.comparison.rows.map((row, index) => (
                  <tr key={row[0]} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${row[0]}-${cellIndex}`} className="border-t border-slate-200 px-4 py-3 text-slate-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <InfoSection title={copy.choose.title} className="mt-0">
            <p>{copy.choose.text}</p>
          </InfoSection>
          <div className="grid gap-3">
            {copy.choose.items.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <ListSection title={copy.extras.title} text={copy.extras.text} items={copy.extras.items} columns="lg:grid-cols-2" />
        <ListSection title={copy.excluded.title} text={copy.excluded.text} items={copy.excluded.items} columns="lg:grid-cols-3" />

        <InfoSection title={copy.valueBlock.title}>
          <p>{copy.valueBlock.text}</p>
        </InfoSection>

        <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
          <h2 className="text-3xl font-semibold leading-tight text-slate-950">{copy.process.title}</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {copy.process.steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-sky-700">{index + 1}.</p>
                <h3 className="mt-3 text-base font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
          <h2 className="text-3xl font-semibold leading-tight text-slate-950">{copy.faq.title}</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {copy.faq.items.map((item) => (
              <details key={item.question} className="group p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {item.question}
                    <span className="text-sky-700 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section ref={formRef} id="preise-form" className="mt-6 scroll-mt-6 rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-3xl font-semibold leading-tight text-slate-950">{copy.form.title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-700">{copy.form.text}</p>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="hidden"
                name="website"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label={copy.form.name} value={name} onChange={setName} required />
                <TextInput label={copy.form.email} value={email} onChange={setEmail} type="email" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label={copy.form.phone} value={phone} onChange={setPhone} type="tel" />
                <TextInput label={copy.form.company} value={company} onChange={setCompany} />
              </div>
              <label className="block text-sm font-medium text-slate-700">
                {copy.form.interest}
                <select
                  value={selectedPackage}
                  onChange={(event) => setSelectedPackage(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
                >
                  {copy.form.interestOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                {copy.form.message}
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
                />
              </label>
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onClick={(event) => setConsent(event.currentTarget.checked)}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950"
                />
                <span>
                  {copy.form.privacyBefore}{' '}
                  <Link href={privacyHref} className="underline underline-offset-2">
                    {copy.form.privacyLink}
                  </Link>{' '}
                  {copy.form.privacyAfter}
                </span>
              </label>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {loading ? '...' : copy.form.submit}
              </button>
            </form>
          </div>
        </section>

        <section className="mt-6 rounded-[30px] border border-slate-900 bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-semibold leading-tight">{copy.finalCta.title}</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">{copy.finalCta.text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToForm(undefined, 'final_cta')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                {copy.finalCta.primary}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('contact_click', { contact_kind: 'whatsapp', placement: 'prices_final_cta', locale })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" />
                {copy.finalCta.whatsapp}
              </a>
            </div>
          </div>
        </section>

        <SiteFooter className="mt-6" />
      </section>
    </main>
  )
}

function PackageCard({ item, onRequest }: { item: (typeof pricesCopy)['de']['packages'][number]; onRequest: () => void }) {
  const isRecommended = item.id === 'business'

  return (
    <article
      className={cn(
        'flex flex-col rounded-[24px] border bg-white p-5 shadow-sm',
        isRecommended ? 'border-sky-300 ring-2 ring-sky-100' : 'border-slate-200',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">{item.name}</h3>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{item.price}</p>
        </div>
        {item.badge ? (
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">{item.badge}</span>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700">{item.description}</p>
      <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{item.ideal}</p>
      <details className="group mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <summary className="cursor-pointer list-none text-sm font-semibold text-slate-950">
          <span className="inline-flex w-full items-center justify-between gap-3">
            {item.includedTitle}
            <span className="text-sky-700 transition group-open:rotate-45">+</span>
          </span>
        </summary>
        <ul className="mt-4 space-y-2">
          {item.included.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </details>
      <button
        type="button"
        onClick={onRequest}
        className={cn(
          'mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5',
          isRecommended ? 'bg-slate-950 text-white hover:bg-slate-800' : 'border border-slate-300 bg-white text-slate-900 hover:border-slate-400',
        )}
      >
        {item.cta}
      </button>
    </article>
  )
}

function InfoSection({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('mt-6 rounded-[30px] border border-slate-200 bg-white p-6 text-base leading-7 text-slate-700 sm:p-8 lg:p-10', className)}>
      <h2 className="text-3xl font-semibold leading-tight text-slate-950">{title}</h2>
      <div className="mt-4 max-w-4xl">{children}</div>
    </section>
  )
}

function ListSection({ title, text, items, columns }: { title: string; text: string; items: string[]; columns: string }) {
  return (
    <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-semibold leading-tight text-slate-950">{title}</h2>
        <p className="mt-3 text-base leading-7 text-slate-700">{text}</p>
      </div>
      <ul className={cn('mt-6 grid gap-3 sm:grid-cols-2', columns)}>
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
      />
    </label>
  )
}
