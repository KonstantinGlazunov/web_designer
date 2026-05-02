'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { CookieSettingsTrigger } from '@/components/cookie-settings-trigger'
import {
  ArrowRight,
  Briefcase,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  FileText,
  Globe,
  Hammer,
  Laptop,
  LayoutGrid,
  Map,
  MessageCircle,
  MoveRight,
  Phone,
  Rocket,
  Scissors,
  Search,
  Shield,
  Smartphone,
  Store,
  Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { landingCopy, type LandingLocale } from '@/components/landing/landing-copy'

const whatsappHref = 'https://wa.me/4915110974353'

type LandingText = (typeof landingCopy)[LandingLocale]

const valueIcons = [LayoutGrid, Shield, Smartphone, Map]
const logicIcons = [Search, Laptop, CheckCircle2, Phone]
const audienceIcons = [Car, Hammer, Scissors, Wrench, Store, Briefcase]
const processIcons = [Phone, CheckCircle2, FileText, LayoutGrid, Rocket]
const beforeImages = [
  '/images/landing-pexels-laptop-26689753.webp',
  '/images/landing-pexels-laptop-6372827.webp',
  '/images/landing-mockupworld-mobile-2025.webp',
]
const afterImages = [
  '/images/landing-hero-responsive-device.webp',
  '/images/landing-mockupworld-screen-2022.webp',
  '/images/landing-hero-responsive-device.webp',
]

export function LandingPage() {
  const [locale, setLocale] = useState<LandingLocale>('de')
  const copy = landingCopy[locale]

  return (
    <main className="relative isolate min-h-screen bg-[#f5f7fb] text-slate-900">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 10% -10%, rgba(37,99,235,0.12), transparent 38%), radial-gradient(circle at 82% 8%, rgba(14,165,233,0.12), transparent 34%)',
        }}
      />

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/92 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700">{copy.nav.studio}</p>
            <p className="text-sm text-slate-600">{copy.nav.region}</p>
          </div>
          <button
            type="button"
            onClick={() => setLocale((prev) => (prev === 'de' ? 'ru' : 'de'))}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            aria-label={locale === 'de' ? 'Switch to Russian' : 'Switch to German'}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{copy.lang.current}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">{copy.lang.switchTo}</span>
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <HeroSection copy={copy} />
        <ProblemSection copy={copy} />
        <ValueSection copy={copy} />
        <LogicSection copy={copy} />
        <AudienceSection copy={copy} />
        <ProcessSection copy={copy} />
        <TrustSection copy={copy} />
        <HonestySection copy={copy} />
        <BeforeAfterSection copy={copy} />
        <FaqSection copy={copy} />
        <FinalCtaSection copy={copy} />
        <FooterSection copy={copy} />
      </div>

      <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(16,185,129,0.35)] transition hover:-translate-y-0.5 hover:bg-emerald-600"
        >
          <MessageCircle className="h-4 w-4" />
          {copy.floating.whatsapp}
        </a>
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_10px_35px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
        >
          <Phone className="h-4 w-4" />
          {copy.floating.contact}
        </a>
      </div>
    </main>
  )
}

function HeroSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell className="overflow-hidden bg-white" id="top">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.94fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            {copy.nav.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>

          <h1 className="mt-6 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-[2.9rem] lg:leading-tight">
            {copy.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{copy.hero.subtitle}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {copy.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#beispiele"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950"
            >
              {copy.hero.ctaSecondary}
              <MoveRight className="h-4 w-4" />
            </a>
          </div>

          <ul className="mt-7 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {copy.hero.benefits.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 sm:text-sm">
            {copy.hero.hint}
          </p>
        </div>

        <div className="relative">
          <div className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.14)] sm:p-6">
            <div className="rounded-[24px] border border-slate-200 bg-slate-900 p-3 sm:p-4">
              <div className="rounded-2xl bg-white p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{copy.hero.mockupTitle}</p>
                    <p className="text-xs text-slate-500">{copy.hero.mockupSubtitle}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <Image
                    src="/images/landing-hero-responsive-device.webp"
                    alt="Laptop und Smartphone Website Mockup"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-2 w-36 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl sm:-left-5 sm:w-40">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Smartphone className="h-4 w-4 text-sky-600" />
              {copy.hero.mobileLabel}
            </div>
            <div className="relative aspect-[9/18] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <Image
                src="/images/landing-pexels-phone-27413499.webp"
                alt="Smartphone Mockup"
                fill
                sizes="160px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function ProblemSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell>
      <SectionTitle>{copy.problem.title}</SectionTitle>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {copy.problem.cards.map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-slate-200 bg-white p-5 text-base leading-7 text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
      <p className="mt-6 rounded-2xl bg-slate-900 px-5 py-4 text-sm leading-7 text-slate-100 sm:text-base">{copy.problem.summary}</p>
    </SectionShell>
  )
}

function ValueSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell>
      <SectionTitle>{copy.value.title}</SectionTitle>
      <p className="mt-5 max-w-4xl text-base leading-7 text-slate-600 sm:text-lg">{copy.value.intro}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {copy.value.cards.map((card, index) => {
          const Icon = valueIcons[index] ?? LayoutGrid
          return (
          <article
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_32px_rgba(15,23,42,0.08)]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{card.description}</p>
          </article>
          )
        })}
      </div>
    </SectionShell>
  )
}

function LogicSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell>
      <SectionTitle>{copy.logic.title}</SectionTitle>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {copy.logic.steps.map((step, index) => {
          const Icon = logicIcons[index] ?? CheckCircle2
          const isLast = index === copy.logic.steps.length - 1
          return (
          <article
            key={step}
            className="relative rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300"
          >
            {!isLast && <MoveRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-300 xl:block" />}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{String(index + 1).padStart(2, '0')}</p>
            <span className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-base leading-7 text-slate-700">{step}</p>
          </article>
          )
        })}
      </div>
      <p className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900 sm:text-base">
        <CircleAlert className="mt-1 h-5 w-5 flex-none" />
        <span>{copy.logic.note}</span>
      </p>
    </SectionShell>
  )
}

function AudienceSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell>
      <SectionTitle>{copy.audience.title}</SectionTitle>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.audience.cards.map((card, index) => {
          const Icon = audienceIcons[index] ?? Briefcase
          return (
          <article
            key={card}
            className="rounded-3xl border border-slate-200 bg-white p-5 text-base font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300"
          >
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
              <Icon className="h-5 w-5" />
            </span>
            <p>{card}</p>
          </article>
          )
        })}
      </div>
      <p className="mt-6 text-base leading-7 text-slate-600">{copy.audience.note}</p>
    </SectionShell>
  )
}

function ProcessSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell>
      <SectionTitle>{copy.process.title}</SectionTitle>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {copy.process.steps.map((step, index) => {
          const Icon = processIcons[index] ?? CheckCircle2
          return (
          <article
            key={step.title}
            className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.process.stepLabel} {index + 1}
            </p>
            <span className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
          </article>
          )
        })}
      </div>
      <p className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700 sm:text-base">{copy.process.note}</p>
    </SectionShell>
  )
}

function TrustSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell>
      <SectionTitle>{copy.trust.title}</SectionTitle>
      <div className="mt-7 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {copy.trust.points.map((point) => (
            <article
              key={point}
              className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white p-5 text-base leading-7 text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300"
            >
              <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check className="h-4 w-4" />
              </span>
              <span>{point}</span>
            </article>
          ))}
        </div>
        <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src="/images/landing-pexels-owner-36753978.webp"
              alt="Porträt eines lokalen Unternehmer"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>

      <div className="mt-6 rounded-3xl border border-sky-200 bg-sky-50 px-6 py-6 sm:px-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">{copy.trust.humanTitle}</p>
        <p className="mt-3 text-lg leading-8 text-slate-800">{copy.trust.humanText}</p>
      </div>
    </SectionShell>
  )
}

function HonestySection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell>
      <div className="rounded-[30px] border border-slate-300 bg-white p-7 sm:p-10">
        <SectionTitle>{copy.honesty.title}</SectionTitle>
        <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg">{copy.honesty.main}</p>
        <p className="mt-4 text-base leading-7 text-slate-600">{copy.honesty.extra}</p>
      </div>
    </SectionShell>
  )
}

function BeforeAfterSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell id="beispiele">
      <SectionTitle>{copy.beforeAfter.title}</SectionTitle>
      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {copy.beforeAfter.cards.map((card, index) => (
          <article
            key={card.before}
            className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.beforeAfter.caseLabel} {index + 1}
            </p>
            <div className="mt-4 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                    {copy.beforeAfter.beforeLabel}
                  </p>
                  <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-xl border border-rose-100 bg-white">
                    <Image
                      src={beforeImages[index] ?? '/images/landing-pexels-laptop-26689753.webp'}
                      alt="Vorher Website Zustand"
                      fill
                      sizes="(max-width: 1024px) 50vw, 12vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                    {copy.beforeAfter.afterLabel}
                  </p>
                  <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-xl border border-emerald-300 bg-white">
                    <Image
                      src={afterImages[index] ?? '/images/landing-hero-responsive-device.webp'}
                      alt="Nachher Website Ergebnis"
                      fill
                      sizes="(max-width: 1024px) 50vw, 12vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-7 text-rose-800">{card.before}</p>
                <p className="mt-2 border-t border-slate-200 pt-2 text-sm leading-7 text-emerald-950">{card.after}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

function FaqSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell>
      <SectionTitle>{copy.faq.title}</SectionTitle>
      <div className="mt-7 space-y-3">
        {copy.faq.items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:border-slate-300"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900">
              <span>{item.question}</span>
              <ChevronDown className="h-5 w-5 flex-none text-slate-500 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  )
}

function FinalCtaSection({ copy }: { copy: LandingText }) {
  return (
    <SectionShell>
      <div className="rounded-[32px] border border-slate-900 bg-slate-900 px-6 py-10 text-slate-100 sm:px-10 sm:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle className="text-white">{copy.finalCta.title}</SectionTitle>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{copy.finalCta.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                {copy.finalCta.primary}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                {copy.finalCta.secondary}
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="hidden rounded-3xl border border-white/15 bg-white/10 p-3 lg:block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/20">
              <Image
                src="/images/landing-mockupworld-screen-2022.webp"
                alt="Website Mockup als CTA Visual"
                fill
                sizes="30vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function FooterSection({ copy }: { copy: LandingText }) {
  return (
    <footer id="kontakt" className="mt-6 rounded-[30px] border border-slate-200 bg-white px-6 py-8 sm:px-8">
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{copy.footer.title}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{copy.footer.description}</p>
        </div>

        <div className="text-sm text-slate-700">
          <div className="grid grid-cols-2 justify-items-start gap-x-8 gap-y-2 md:justify-items-end md:text-right">
            <Link href="/ueber-mich" className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {copy.footer.about}
            </Link>
            <Link href="/blog" className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {copy.footer.blog}
            </Link>
            <Link href="/datenschutzerklaerung" className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {copy.footer.legal.privacy}
            </Link>
            <Link href="/agb" className="block w-full text-left transition hover:text-slate-950 md:text-right">
              AGB
            </Link>
            <Link href="/impressum" className="block w-full text-left transition hover:text-slate-950 md:text-right">
              {copy.footer.legal.impressum}
            </Link>
            <CookieSettingsTrigger className="block w-full text-left transition hover:text-slate-950 md:text-right" />
            <Link href="/kontakt" className="col-span-2 block w-full text-left font-semibold text-slate-900 transition hover:text-slate-950 md:text-right">
              {copy.footer.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SectionShell({
  children,
  id,
  className,
}: {
  children: ReactNode
  id?: string
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn('mt-6 rounded-[30px] border border-slate-200/80 bg-[#f8fbff] p-6 sm:mt-7 sm:p-8 lg:p-10', className)}
    >
      {children}
    </section>
  )
}

function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn('text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl lg:text-[2.05rem] lg:leading-tight', className)}>
      {children}
    </h2>
  )
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
      <Search className="h-3.5 w-3.5 text-sky-700" />
      {children}
    </span>
  )
}
