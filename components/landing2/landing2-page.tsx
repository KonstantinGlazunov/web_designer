'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  FileText,
  Globe,
  Github,
  Instagram,
  LayoutGrid,
  Linkedin,
  Map,
  MessageCircle,
  MoveRight,
  Phone,
  Rocket,
  Search,
  Shield,
  Smartphone,
} from 'lucide-react'
import { ChatFab } from '@/components/chat/chat-fab'
import { QuizDialog } from '@/components/quiz-dialog'
import { CookieSettingsTrigger } from '@/components/cookie-settings-trigger'
import { cn } from '@/lib/utils'
import { landingCopy, type LandingLocale } from '@/components/landing/landing-copy'
import { siteCopy, type SiteCopy } from '@/lib/translations'

const whatsappHref = 'https://wa.me/4915110974353'

type LandingText = (typeof landingCopy)[LandingLocale]
type PortfolioText = SiteCopy['portfolio']

const valueIcons = [LayoutGrid, Shield, Smartphone, Map]
const logicIcons = [Search, LayoutGrid, CheckCircle2, Phone]
const processIcons = [Phone, CheckCircle2, FileText, LayoutGrid, Rocket]
const beforeAfterImages = ['/images/case1.webp', '/images/case2.webp', '/images/case3.webp']
const audienceImages = [
  '/images/kfz.webp',
  '/images/baustelle.webp',
  '/images/fiseur.webp',
  '/images/reinigung.webp',
  '/images/wohnwagen.webp',
  '/images/optiker.webp',
]

export function Landing2Page() {
  const [locale, setLocale] = useState<LandingLocale>('de')
  const [quizOpen, setQuizOpen] = useState(false)
  const copy = landingCopy[locale]
  const portfolio = siteCopy[locale].portfolio
  const portfolioLinkLabel = locale === 'de' ? 'Webseite öffnen' : 'Открыть сайт'
  const requestLabel = locale === 'de' ? 'Bereit für ein Projekt?' : 'Готовы к проекту?'

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <HeroSection
        copy={copy}
        locale={locale}
        onToggleLocale={() => setLocale((prev) => (prev === 'de' ? 'ru' : 'de'))}
        onOpenForm={() => setQuizOpen(true)}
      />

      <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <ProblemSection copy={copy} />
        <ValueSection copy={copy} />
        <LogicSection copy={copy} />
        <AudienceSection copy={copy} />
        <ProcessSection copy={copy} />
        <TrustSection copy={copy} />
        <HonestySection copy={copy} />
        <BeforeAfterSection copy={copy} />
        <ExamplesSection portfolio={portfolio} linkLabel={portfolioLinkLabel} />
        <FaqSection copy={copy} />
        <FinalCtaSection copy={copy} onOpenForm={() => setQuizOpen(true)} />
        <FooterSection copy={copy} socialsLabel={siteCopy[locale].footer.socials} />
      </div>

      <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setQuizOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_12px_35px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-slate-400"
        >
          <Phone className="h-4 w-4" />
          {requestLabel}
        </button>
      </div>

      <ChatFab locale={locale} theme="light" />
      <QuizDialog open={quizOpen} onClose={() => setQuizOpen(false)} locale={locale} />
    </main>
  )
}

function HeroSection({
  copy,
  locale,
  onToggleLocale,
  onOpenForm,
}: {
  copy: LandingText
  locale: LandingLocale
  onToggleLocale: () => void
  onOpenForm: () => void
}) {
  const handleExamplesClick = () => {
    window.history.pushState(null, '', '#beispiele')
    window.setTimeout(() => {
      const target = document.getElementById('beispiele')
      if (!target) return

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 12,
        behavior: 'auto',
      })
    }, 0)
  }

  return (
    <section className="relative mb-8 min-h-[calc(100svh-1rem)] overflow-hidden border-b border-slate-200 bg-[#e8ded2] sm:bg-slate-100 lg:snap-start">
      <Image
        src="/images/hero2.webp"
        alt="Modernes Website-Mockup für kleine Unternehmen"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-[26%_center] blur-0 sm:block sm:object-center"
      />
      <Image
        src="/images/hero-mobile.webp"
        alt="Smartphone mit Website-Mockup für kleine Unternehmen"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center sm:hidden"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.34)_0%,rgba(248,250,252,0.1)_42%,rgba(248,250,252,0.26)_100%)] sm:bg-[linear-gradient(98deg,rgba(248,250,252,0.96)_0%,rgba(248,250,252,0.9)_34%,rgba(248,250,252,0.45)_56%,rgba(248,250,252,0.15)_72%,rgba(248,250,252,0.08)_100%)]" />

      <header className="absolute inset-x-0 top-[clamp(2.15rem,5.2svh,2.75rem)] z-20 sm:top-0">
        <div className="mx-auto flex w-[min(86vw,322px)] items-center justify-between gap-3 px-3 py-4 sm:w-full sm:max-w-6xl sm:px-6 lg:px-8">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sky-800 sm:text-xs">{copy.nav.studio}</p>
            <p className="hidden text-xs text-slate-700 sm:block sm:text-sm">{copy.nav.region}</p>
          </div>

          <button
            type="button"
            onClick={onToggleLocale}
            aria-label={locale === 'de' ? 'Switch to Russian' : 'Switch to German'}
            className="inline-flex flex-none items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-400 hover:bg-white sm:text-xs"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{copy.lang.current}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">{copy.lang.switchTo}</span>
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-1rem)] w-full items-start justify-center px-3 pb-[clamp(5rem,11svh,6.4rem)] pt-[clamp(0.85rem,2.4svh,1.2rem)] sm:max-w-6xl sm:items-center sm:justify-start sm:px-6 sm:pb-10 sm:pt-28 lg:px-8">
        <div className="relative h-[min(calc(100svh-6.4rem),760px)] w-[min(88vw,342px)] rounded-[clamp(2.35rem,12vw,3rem)] border-[clamp(5px,1.8vw,7px)] border-slate-950 bg-slate-950 p-[clamp(4px,1.25vw,5px)] shadow-[0_24px_60px_rgba(15,23,42,0.32),inset_0_0_0_1px_rgba(255,255,255,0.2)] sm:hidden">
          <div className="pointer-events-none absolute left-1/2 top-[clamp(0.4rem,1.45svh,0.52rem)] z-20 h-[clamp(1.15rem,3.9svh,1.5rem)] w-[clamp(4.6rem,24vw,6rem)] -translate-x-1/2 rounded-full bg-slate-950 shadow-[0_1px_0_rgba(255,255,255,0.22)] sm:hidden" />
          <div className="h-full max-w-none overflow-hidden rounded-[clamp(1.95rem,10vw,2.35rem)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,252,244,0.9)_50%,rgba(255,244,220,0.84)_100%)] px-[clamp(0.85rem,4.1vw,1rem)] pb-[clamp(0.85rem,3.5svh,1.25rem)] pt-[clamp(4.55rem,12.8svh,5.25rem)] shadow-[inset_0_0_38px_rgba(255,255,255,0.9)]">
            <h1 className="text-[clamp(1.36rem,7vw,1.72rem)] font-semibold leading-[1.04] text-slate-950 sm:text-5xl sm:leading-tight lg:text-[3.3rem] lg:leading-[1.08]">
              {copy.hero.title}
            </h1>

            <p className="mt-[clamp(0.55rem,1.75svh,0.75rem)] max-w-2xl text-[clamp(0.74rem,3.45vw,0.84rem)] leading-[1.45] text-slate-700 sm:mt-5 sm:text-lg sm:leading-7">{copy.hero.subtitle}</p>

            <div className="mt-[clamp(0.75rem,2.2svh,1rem)] flex flex-col gap-[clamp(0.45rem,1.55svh,0.625rem)] sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
              <button
                type="button"
                onClick={onOpenForm}
                className="inline-flex h-[clamp(2.45rem,6.9svh,2.75rem)] items-center justify-center gap-2 rounded-full bg-slate-900 px-5 text-[clamp(0.78rem,3.35vw,0.875rem)] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 sm:h-auto sm:px-6 sm:py-3 sm:text-sm"
              >
                {copy.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#beispiele"
                onClick={handleExamplesClick}
                className="inline-flex h-[clamp(2.45rem,6.9svh,2.75rem)] items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/92 px-5 text-[clamp(0.78rem,3.35vw,0.875rem)] font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900 sm:h-auto sm:px-6 sm:py-3 sm:text-sm"
              >
                {copy.hero.ctaSecondary}
                <MoveRight className="h-4 w-4" />
              </a>
            </div>

            <ul className="mt-[clamp(0.7rem,2.1svh,1rem)] grid gap-[clamp(0.28rem,1svh,0.375rem)] text-[clamp(0.62rem,2.9vw,0.7rem)] leading-tight text-slate-800 [&>li:nth-last-child(-n+2)]:hidden [@media(max-height:740px)]:[&>li:nth-last-child(-n+3)]:hidden sm:mt-7 sm:grid-cols-2 sm:gap-2 sm:text-sm sm:leading-normal sm:[&>li:nth-last-child(-n+3)]:flex sm:[&>li:nth-last-child(-n+2)]:flex">
              {copy.hero.benefits.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-2xl border border-slate-300 bg-white/82 px-3 py-[clamp(0.32rem,1.2svh,0.375rem)] sm:bg-white/88 sm:py-2">
                  <Check className="mt-0.5 h-[clamp(0.85rem,3.4vw,1rem)] w-[clamp(0.85rem,3.4vw,1rem)] flex-none text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 hidden rounded-full border border-slate-300 bg-white/86 px-4 py-2 text-xs font-medium text-slate-700 sm:mt-5 sm:inline-flex sm:bg-white/90 sm:text-sm">
              {copy.hero.hint}
            </p>
          </div>
        </div>

        <div className="hidden max-w-3xl sm:block">
          <h1 className="text-5xl font-semibold leading-tight text-slate-950 lg:text-[3.3rem] lg:leading-[1.08]">
            {copy.hero.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-7 text-slate-700">{copy.hero.subtitle}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenForm}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {copy.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#beispiele"
              onClick={handleExamplesClick}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/92 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900"
            >
              {copy.hero.ctaSecondary}
              <MoveRight className="h-4 w-4" />
            </a>
          </div>

          <ul className="mt-7 grid gap-2 text-sm leading-normal text-slate-800 sm:grid-cols-2">
            {copy.hero.benefits.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-2xl border border-slate-300 bg-white/88 px-3 py-2">
                <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 inline-flex rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700">
            {copy.hero.hint}
          </p>
        </div>
      </div>
    </section>
  )
}

function ProblemSection({ copy }: { copy: LandingText }) {
  return (
    <ContentSection>
      <SectionTitle>{copy.problem.title}</SectionTitle>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {copy.problem.cards.map((item) => (
          <article key={item} className="rounded-[26px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300">
            <p className="text-base leading-7 text-slate-700">{item}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 rounded-2xl bg-slate-900 px-5 py-4 text-sm leading-7 text-slate-100 sm:text-base">{copy.problem.summary}</p>
    </ContentSection>
  )
}

function ValueSection({ copy }: { copy: LandingText }) {
  return (
    <ContentSection className="relative overflow-hidden">
      <Image
        src="/images/versprechen.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover object-[62%_center] opacity-100 blur-[1.8px] scale-105 sm:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(251,252,255,0.7)_0%,rgba(251,252,255,0.52)_35%,rgba(251,252,255,0.36)_100%)]" />

      <div className="relative z-10">
        <SectionTitle>{copy.value.title}</SectionTitle>
        <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600 sm:text-lg">{copy.value.intro}</p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {copy.value.cards.map((card, index) => {
            const Icon = valueIcons[index] ?? LayoutGrid
            return (
              <article
                key={card.title}
                className="rounded-[26px] border border-slate-200 bg-white/92 p-6 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{card.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </ContentSection>
  )
}

function LogicSection({ copy }: { copy: LandingText }) {
  return (
    <ContentSection>
      <SectionTitle>{copy.logic.title}</SectionTitle>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {copy.logic.steps.map((step, index) => {
          const Icon = logicIcons[index] ?? CheckCircle2

          return (
            <article key={step} className="relative rounded-[26px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{String(index + 1).padStart(2, '0')}</p>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-3 text-base leading-7 text-slate-700">{step}</p>
            </article>
          )
        })}
      </div>
      <p className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900 sm:text-base">
        <CircleAlert className="mt-1 h-5 w-5 flex-none" />
        <span>{copy.logic.note}</span>
      </p>
    </ContentSection>
  )
}

function AudienceSection({ copy }: { copy: LandingText }) {
  return (
    <ContentSection>
      <SectionTitle>{copy.audience.title}</SectionTitle>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.audience.cards.map((card, index) => {
          const imageSrc = audienceImages[index] ?? audienceImages[0]

          return (
            <article key={card} className="overflow-hidden rounded-[26px] border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-300">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100 bg-slate-100">
                <Image src={imageSrc} alt={card} fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover" />
              </div>
              <p className="p-5 text-base font-medium text-slate-800">{card}</p>
            </article>
          )
        })}
      </div>

      <p className="mt-6 text-base leading-7 text-slate-600">{copy.audience.note}</p>
    </ContentSection>
  )
}

function ProcessSection({ copy }: { copy: LandingText }) {
  return (
    <ContentSection>
      <SectionTitle>{copy.process.title}</SectionTitle>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {copy.process.steps.map((step, index) => {
          const Icon = processIcons[index] ?? CheckCircle2

          return (
            <article key={step.title} className="rounded-[26px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300">
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
      <Link
        href="/ueber-mich"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950"
      >
        {copy.footer.about}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </ContentSection>
  )
}

function TrustSection({ copy }: { copy: LandingText }) {
  return (
    <ContentSection>
      <SectionTitle>{copy.trust.title}</SectionTitle>
      <div className="mt-7 grid items-stretch gap-4 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="flex h-full flex-col">
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.trust.points.map((point) => (
              <article key={point} className="flex items-start gap-3 rounded-[26px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300">
                <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-base leading-7 text-slate-700">{point}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-[28px] border border-sky-200 bg-sky-50 px-6 py-6 sm:px-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">{copy.trust.humanTitle}</p>
            <p className="mt-3 text-lg leading-8 text-slate-800">{copy.trust.humanText}</p>
          </div>
        </div>

        <figure className="h-full overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3">
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src="/images/working-photo.webp"
              alt="Lokaler Unternehmer in seinem Geschäft"
              fill
              sizes="(max-width: 1024px) 100vw, 36vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </ContentSection>
  )
}

function HonestySection({ copy }: { copy: LandingText }) {
  return (
    <ContentSection>
      <div className="rounded-[30px] border border-slate-300 bg-white p-7 sm:p-10">
        <SectionTitle>{copy.honesty.title}</SectionTitle>
        <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg">{copy.honesty.main}</p>
        <p className="mt-4 text-base leading-7 text-slate-600">{copy.honesty.extra}</p>
      </div>
    </ContentSection>
  )
}

function BeforeAfterSection({ copy }: { copy: LandingText }) {
  return (
    <ContentSection id="vorher-nachher">
      <SectionTitle>{copy.beforeAfter.title}</SectionTitle>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {copy.beforeAfter.cards.map((card, index) => (
          <article key={card.before} className="rounded-[26px] border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.beforeAfter.caseLabel} {index + 1}
            </p>

            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <Image
                src={beforeAfterImages[index] ?? beforeAfterImages[0]}
                alt={`Case ${index + 1} Ergebnis`}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">{copy.beforeAfter.beforeLabel}</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-rose-900">{card.before}</p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{copy.beforeAfter.afterLabel}</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-emerald-900">{card.after}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ContentSection>
  )
}

function ExamplesSection({ portfolio, linkLabel }: { portfolio: PortfolioText; linkLabel: string }) {
  return (
    <ContentSection id="beispiele">
      <SectionTitle>{portfolio.title}</SectionTitle>
      <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600 sm:text-lg">{portfolio.subtitle}</p>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {portfolio.items.map((item) => {
          const imageSrc = item.title === 'Speicher Balkonkraftwerk' ? '/images/solaranlageseite.webp' : item.image
          const card = (
            <div className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100">
                <Image
                  src={imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className={cn(
                    'object-cover transition duration-500 group-hover:scale-[1.03]',
                    item.title === 'BewerbungProfi' || item.title === 'Beauty Studio Lesya' || item.title === 'Psycholog UA/RU' ? 'object-top' : 'object-center',
                  )}
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>

                <div className="mt-3 mb-5 flex flex-wrap gap-2">
                  {item.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="mt-auto inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition group-hover:border-slate-400 group-hover:text-slate-900">
                  {linkLabel}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          )

          return (
            <article key={item.title} className="h-full">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {card}
                </a>
              ) : (
                card
              )}
            </article>
          )
        })}
      </div>
    </ContentSection>
  )
}

function FaqSection({ copy }: { copy: LandingText }) {
  return (
    <ContentSection>
      <SectionTitle>{copy.faq.title}</SectionTitle>
      <div className="mt-7 space-y-3">
        {copy.faq.items.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:border-slate-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900">
              <span>{item.question}</span>
              <ChevronDown className="h-5 w-5 flex-none text-slate-500 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</p>
          </details>
        ))}
      </div>
    </ContentSection>
  )
}

function FinalCtaSection({ copy, onOpenForm }: { copy: LandingText; onOpenForm: () => void }) {
  return (
    <ContentSection>
      <div className="rounded-[32px] border border-slate-900 bg-slate-900 px-6 py-10 text-slate-100 sm:px-10 sm:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle className="text-white">{copy.finalCta.title}</SectionTitle>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{copy.finalCta.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenForm}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                {copy.finalCta.primary}
                <ArrowRight className="h-4 w-4" />
              </button>
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
                src="/images/hero.webp"
                alt="Beispiel einer modernen Unternehmenswebsite"
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  )
}

function FooterSection({ copy, socialsLabel }: { copy: LandingText; socialsLabel: string }) {
  return (
    <footer id="kontakt" className="mt-6 rounded-[30px] border border-slate-200 bg-white px-6 py-8 sm:px-8 lg:snap-start">
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{copy.footer.title}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{copy.footer.description}</p>
          <div className="mt-5 flex items-center gap-3 text-slate-700">
            <a href="https://github.com/KonstantinGlazunov" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/konstantin-glazunov/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/konstantin_podarambolskiy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="text-sm text-slate-700">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:text-right">
            <Link href="/ueber-mich" className="transition hover:text-slate-950">
              {copy.footer.about}
            </Link>
            <Link href="/agb" className="transition hover:text-slate-950">
              AGB
            </Link>
            <Link href="/datenschutzerklaerung" className="transition hover:text-slate-950">
              {copy.footer.legal.privacy}
            </Link>
            <Link href="/impressum" className="transition hover:text-slate-950">
              {copy.footer.legal.impressum}
            </Link>
            <CookieSettingsTrigger />
            <a className="font-semibold text-slate-900 transition hover:text-slate-950" href="mailto:kontakt@erstellen-websiten.de">
              {copy.footer.contact}
            </a>
          </div>
          <div className="mt-4 space-y-2 md:text-right">
            <p>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="transition hover:text-slate-950">
                {copy.floating.whatsapp}
              </a>
            </p>
            <p>
              <a className="transition hover:text-slate-950" href="mailto:kontakt@erstellen-websiten.de">
                {copy.footer.email}
              </a>
            </p>
          </div>
          {socialsLabel ? <p className="pt-1 text-slate-500">{socialsLabel}</p> : null}
        </div>
      </div>
    </footer>
  )
}

function ContentSection({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section
      id={id}
      className={cn('mt-6 rounded-[30px] border border-slate-200/80 bg-[#fbfcff] p-6 sm:mt-7 sm:p-8 lg:snap-start lg:p-10', className)}
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
