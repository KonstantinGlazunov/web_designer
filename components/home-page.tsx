import Image from 'next/image'
import Link from 'next/link'
import { Suspense, type CSSProperties, type ReactNode } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  FileText,
  LayoutGrid,
  Map,
  MessageCircle,
  MoveRight,
  Phone,
  Rocket,
  Search,
  Shield,
} from 'lucide-react'
import { CookieSettingsTrigger } from '@/components/cookie-settings-trigger'
import { TrackedLink } from '@/components/tracked-link'
import { landingCopyDe } from '@/components/landing/landing-copy-de'
import { portfolioCopy } from '@/components/landing/portfolio-copy'
import { HomePageBridge } from '@/components/home-page-bridge'
import { HomePageChat } from '@/components/home-page-chat'
import { HomePageReveal } from '@/components/home-page-reveal'
import { HomeShellLocaleToggle } from '@/components/home-shell-locale-toggle'
import { cn } from '@/lib/utils'

const whatsappHref = 'https://wa.me/4915110974353'
const valueIcons = [LayoutGrid, Shield, Map, Rocket]
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

function revealStyle(delay: number, duration = 620): CSSProperties {
  return {
    '--delay': `${delay}ms`,
    '--duration': `${duration}ms`,
  } as CSSProperties
}

export function HomePage() {
  const copy = landingCopyDe
  const portfolio = portfolioCopy.de

  return (
    <>
      <main id="home-static-shell" className="min-h-screen bg-[#f6f8fb] text-slate-900">
        <HeroSection copy={copy} />

        <div className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          <ProblemSection copy={copy} />
          <ValueSection copy={copy} />
          <LogicSection copy={copy} />
          <AudienceSection copy={copy} />
          <ProcessSection copy={copy} />
          <TrustSection copy={copy} />
          <HonestySection copy={copy} />
          <BeforeAfterSection copy={copy} />
          <ExamplesSection portfolio={portfolio} />
          <FaqSection copy={copy} />
          <FinalCtaSection copy={copy} />
          <FooterSection copy={copy} />
        </div>

        <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
          <TrackedLink
            href="/?quiz=1&quizSource=home_shell_fixed_cta"
            eventParams={{ cta_name: 'project_ready', placement: 'fixed_cta', locale: 'de' }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_12px_35px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-slate-400"
          >
            <Phone className="h-4 w-4" />
            Bereit für ein Projekt?
          </TrackedLink>
        </div>
      </main>
      <Suspense fallback={null}>
        <HomePageReveal />
        <HomePageChat />
        <HomePageBridge />
      </Suspense>
    </>
  )
}

function HeroSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <section className="relative mb-8 min-h-[calc(100svh-1rem)] overflow-hidden border-b border-slate-200 bg-[#e8ded2] sm:bg-slate-100 lg:snap-start">
      <picture className="absolute inset-0">
        <source media="(max-width: 639px)" srcSet="/images/hero-mobile.webp" />
        <img
          src="/images/hero2.webp"
          alt="Modernes Website-Mockup für kleine Unternehmen"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.34)_0%,rgba(248,250,252,0.1)_42%,rgba(248,250,252,0.26)_100%)] sm:bg-[linear-gradient(98deg,rgba(248,250,252,0.96)_0%,rgba(248,250,252,0.9)_34%,rgba(248,250,252,0.45)_56%,rgba(248,250,252,0.15)_72%,rgba(248,250,252,0.08)_100%)]" />

      <header className="absolute inset-x-0 top-[clamp(2.15rem,5.2svh,2.75rem)] z-20 sm:top-0">
        <div className="mx-auto flex w-[min(86vw,322px)] items-center justify-between gap-3 px-3 py-4 sm:w-full sm:max-w-6xl sm:px-6 lg:px-8">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sky-800 sm:text-xs">{copy.nav.studio}</p>
            <p className="hidden text-xs text-slate-700 sm:block sm:text-sm">{copy.nav.region}</p>
          </div>
          <HomeShellLocaleToggle />
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-1rem)] w-full items-start justify-center px-3 pb-[clamp(5rem,11svh,6.4rem)] pt-[clamp(0.85rem,2.4svh,1.2rem)] sm:max-w-6xl sm:items-center sm:justify-start sm:px-6 sm:pb-10 sm:pt-28 lg:px-8">
        <div className="relative h-[min(calc(100svh-6.4rem),760px)] w-[min(88vw,342px)] rounded-[clamp(2.35rem,12vw,3rem)] border-[clamp(5px,1.8vw,7px)] border-slate-950 bg-slate-950 p-[clamp(4px,1.25vw,5px)] shadow-[0_24px_60px_rgba(15,23,42,0.32),inset_0_0_0_1px_rgba(255,255,255,0.2)] sm:hidden">
          <div className="pointer-events-none absolute left-1/2 top-[clamp(0.4rem,1.45svh,0.52rem)] z-20 h-[clamp(1.15rem,3.9svh,1.5rem)] w-[clamp(4.6rem,24vw,6rem)] -translate-x-1/2 rounded-full bg-slate-950 shadow-[0_1px_0_rgba(255,255,255,0.22)] sm:hidden" />
          <div className="h-full max-w-none overflow-hidden rounded-[clamp(1.95rem,10vw,2.35rem)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,252,244,0.9)_50%,rgba(255,244,220,0.84)_100%)] px-[clamp(0.85rem,4.1vw,1rem)] pb-[clamp(0.85rem,3.5svh,1.25rem)] pt-[clamp(4.55rem,12.8svh,5.25rem)] shadow-[inset_0_0_38px_rgba(255,255,255,0.9)]">
            <h1 className="text-[clamp(1.36rem,7vw,1.72rem)] font-semibold leading-[1.04] text-slate-950 sm:text-5xl sm:leading-tight lg:text-[3.3rem] lg:leading-[1.08]">
              {copy.hero.title}
            </h1>
            <p className="mt-[clamp(0.55rem,1.75svh,0.75rem)] max-w-2xl text-[clamp(0.74rem,3.45vw,0.84rem)] leading-[1.45] text-slate-700 sm:mt-5 sm:text-lg sm:leading-7">
              {copy.hero.subtitle}
            </p>
            <div className="mt-[clamp(0.75rem,2.2svh,1rem)] flex flex-col gap-[clamp(0.45rem,1.55svh,0.625rem)] sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
              <TrackedLink href="/?quiz=1&quizSource=home_shell_hero_mobile" eventParams={{ cta_name: 'hero_primary', placement: 'hero_mobile', locale: 'de' }} className="inline-flex h-[clamp(2.45rem,6.9svh,2.75rem)] items-center justify-center gap-2 rounded-full bg-slate-900 px-5 text-[clamp(0.78rem,3.35vw,0.875rem)] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 sm:h-auto sm:px-6 sm:py-3 sm:text-sm">
                {copy.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink href="#beispiele" eventParams={{ cta_name: 'hero_examples', placement: 'hero_mobile', locale: 'de' }} className="inline-flex h-[clamp(2.45rem,6.9svh,2.75rem)] items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/92 px-5 text-[clamp(0.78rem,3.35vw,0.875rem)] font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900 sm:h-auto sm:px-6 sm:py-3 sm:text-sm">
                {copy.hero.ctaSecondary}
                <MoveRight className="h-4 w-4" />
              </TrackedLink>
            </div>
            <ul className="mt-[clamp(0.7rem,2.1svh,1rem)] grid gap-[clamp(0.28rem,1svh,0.375rem)] text-[clamp(0.62rem,2.9vw,0.7rem)] leading-tight text-slate-800 [&>li:nth-last-child(-n+2)]:hidden [@media(max-height:740px)]:[&>li:nth-last-child(-n+3)]:hidden sm:mt-7 sm:grid-cols-2 sm:gap-2 sm:text-sm sm:leading-normal sm:[&>li:nth-last-child(-n+3)]:flex sm:[&>li:nth-last-child(-n+2)]:flex">
              {copy.hero.benefits.map((item, index) => (
                <li
                  key={item}
                  className="reveal-stagger flex items-start gap-2 rounded-2xl border border-slate-300 bg-white/82 px-3 py-[clamp(0.32rem,1.2svh,0.375rem)] sm:bg-white/88 sm:py-2"
                  style={revealStyle(280 + index * 55, 620)}
                >
                  <Check className="mt-0.5 h-[clamp(0.85rem,3.4vw,1rem)] w-[clamp(0.85rem,3.4vw,1rem)] flex-none text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p
              className="reveal-stagger mt-3 hidden rounded-full border border-slate-300 bg-white/86 px-4 py-2 text-xs font-medium text-slate-700 sm:mt-5 sm:inline-flex sm:bg-white/90 sm:text-sm"
              style={revealStyle(360, 620)}
            >
              {copy.hero.hint}
            </p>
          </div>
        </div>

        <div className="hidden max-w-3xl sm:block">
          <p
            role="heading"
            aria-level={1}
            className="text-5xl font-semibold leading-tight text-slate-950 lg:text-[3.3rem] lg:leading-[1.08]"
          >
            {copy.hero.title}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-slate-700">{copy.hero.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <TrackedLink href="/?quiz=1&quizSource=home_shell_hero_desktop" eventParams={{ cta_name: 'hero_primary', placement: 'hero_desktop', locale: 'de' }} className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">
              {copy.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink href="#beispiele" eventParams={{ cta_name: 'hero_examples', placement: 'hero_desktop', locale: 'de' }} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/92 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900">
              {copy.hero.ctaSecondary}
              <MoveRight className="h-4 w-4" />
            </TrackedLink>
          </div>
          <ul className="mt-7 grid gap-2 text-sm leading-normal text-slate-800 sm:grid-cols-2">
            {copy.hero.benefits.map((item, index) => (
              <li key={item} className="reveal-stagger flex items-start gap-2 rounded-2xl border border-slate-300 bg-white/88 px-3 py-2" style={revealStyle(310 + index * 55, 650)}>
                <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="reveal-stagger mt-5 inline-flex rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700" style={revealStyle(390, 650)}>
            {copy.hero.hint}
          </p>
        </div>
      </div>
    </section>
  )
}

function ProblemSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection>
      <SectionTitle className="reveal-stagger" style={revealStyle(40)}>
        {copy.problem.title}
      </SectionTitle>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {copy.problem.cards.map((item, index) => (
          <article key={item} className="reveal-stagger rounded-[26px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300" style={revealStyle(120 + index * 70)}>
            <p className="text-base leading-7 text-slate-700">{item}</p>
          </article>
        ))}
      </div>
      <p className="reveal-stagger mt-6 rounded-2xl bg-slate-900 px-5 py-4 text-sm leading-7 text-slate-100 sm:text-base" style={revealStyle(240)}>
        {copy.problem.summary}
      </p>
    </ContentSection>
  )
}

function ValueSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection className="relative overflow-hidden">
      <Image src="/images/versprechen.webp" alt="" aria-hidden fill sizes="100vw" quality={55} className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.92)_36%,rgba(255,255,255,0.56)_58%,rgba(255,255,255,0.18)_100%)]" />
      <div className="relative z-10">
        <div className="max-w-4xl rounded-[30px] border border-white/60 bg-white/56 px-6 py-6 shadow-[0_20px_45px_rgba(15,23,42,0.07)] backdrop-blur-[2px] sm:px-7">
          <SectionTitle className="reveal-stagger" style={revealStyle(40)}>
            {copy.value.title}
          </SectionTitle>
          <p className="reveal-stagger mt-4 max-w-3xl text-base leading-7 text-slate-800 sm:text-lg" style={revealStyle(110)}>
            {copy.value.intro}
          </p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {copy.value.cards.map((card, index) => {
            const Icon = valueIcons[index] ?? LayoutGrid
            return (
              <article
                key={card.title}
                className="reveal-stagger rounded-[26px] border border-white/70 bg-white/88 p-6 shadow-[0_18px_35px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]"
                style={revealStyle(180 + index * 70)}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{card.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </ContentSection>
  )
}

function LogicSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection>
      <SectionTitle className="reveal-stagger" style={revealStyle(40)}>
        {copy.logic.title}
      </SectionTitle>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {copy.logic.steps.map((step, index) => {
          const Icon = logicIcons[index] ?? CheckCircle2
          return (
            <article key={step} className="reveal-stagger relative rounded-[26px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300" style={revealStyle(110 + index * 70)}>
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
      <p className="reveal-stagger mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900 sm:text-base" style={revealStyle(290)}>
        <CircleAlert className="mt-1 h-5 w-5 flex-none" />
        <span>{copy.logic.note}</span>
      </p>
    </ContentSection>
  )
}

function AudienceSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection>
      <SectionTitle className="reveal-stagger" style={revealStyle(40)}>
        {copy.audience.title}
      </SectionTitle>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.audience.cards.map((card, index) => {
          const imageSrc = audienceImages[index] ?? audienceImages[0]
          return (
            <article key={card} className="reveal-stagger overflow-hidden rounded-[26px] border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-300" style={revealStyle(120 + index * 60)}>
              <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100 bg-slate-100">
                <Image src={imageSrc} alt={card} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 323px" quality={55} className="object-cover" />
              </div>
              <p className="p-5 text-base font-medium text-slate-800">{card}</p>
            </article>
          )
        })}
      </div>
      <p className="reveal-stagger mt-6 text-base leading-7 text-slate-600" style={revealStyle(280)}>
        {copy.audience.note}
      </p>
    </ContentSection>
  )
}

function ProcessSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection>
      <SectionTitle className="reveal-stagger" style={revealStyle(40)}>
        {copy.process.title}
      </SectionTitle>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {copy.process.steps.map((step, index) => {
          const Icon = processIcons[index] ?? CheckCircle2
          return (
            <article key={step.title} className="reveal-stagger rounded-[26px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300" style={revealStyle(110 + index * 70)}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.process.stepLabel} {index + 1}</p>
              <span className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
            </article>
          )
        })}
      </div>
      <p className="reveal-stagger mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700 sm:text-base" style={revealStyle(310)}>
        {copy.process.note}
      </p>
      <Link href="/ueber-mich" className="reveal-stagger mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950" style={revealStyle(370)}>
        {copy.footer.about}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </ContentSection>
  )
}

function TrustSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection>
      <SectionTitle className="reveal-stagger" style={revealStyle(40)}>
        {copy.trust.title}
      </SectionTitle>
      <div className="mt-7 grid items-stretch gap-4 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="flex h-full flex-col">
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.trust.points.map((point, index) => (
              <article key={point} className="reveal-stagger flex items-start gap-3 rounded-[26px] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300" style={revealStyle(110 + index * 70)}>
                <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-base leading-7 text-slate-700">{point}</p>
              </article>
            ))}
          </div>
          <div className="reveal-stagger mt-6 rounded-[28px] border border-sky-200 bg-sky-50 px-6 py-6 sm:px-7" style={revealStyle(280)}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">{copy.trust.humanTitle}</p>
            <p className="mt-3 text-lg leading-8 text-slate-800">{copy.trust.humanText}</p>
          </div>
        </div>
        <figure className="reveal-stagger h-full overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3" style={revealStyle(340)}>
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl bg-slate-100">
            <Image src="/images/working-photo.webp" alt="Lokaler Unternehmer in seinem Geschäft" fill sizes="(max-width: 1024px) 100vw, 36vw" className="object-cover" />
          </div>
        </figure>
      </div>
    </ContentSection>
  )
}

function HonestySection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection>
      <div className="reveal-stagger rounded-[30px] border border-slate-300 bg-white p-7 sm:p-10" style={revealStyle(60)}>
        <SectionTitle className="reveal-stagger" style={revealStyle(100)}>
          {copy.honesty.title}
        </SectionTitle>
        <p className="reveal-stagger mt-5 text-base leading-7 text-slate-700 sm:text-lg" style={revealStyle(170)}>
          {copy.honesty.main}
        </p>
        <p className="reveal-stagger mt-4 text-base leading-7 text-slate-600" style={revealStyle(240)}>
          {copy.honesty.extra}
        </p>
      </div>
    </ContentSection>
  )
}

function BeforeAfterSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection id="vorher-nachher">
      <SectionTitle className="reveal-stagger" style={revealStyle(40)}>
        {copy.beforeAfter.title}
      </SectionTitle>
      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {copy.beforeAfter.cards.map((card, index) => (
          <article key={card.before} className="reveal-stagger rounded-[26px] border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300" style={revealStyle(120 + index * 70)}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.beforeAfter.caseLabel} {index + 1}</p>
            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <Image src={beforeAfterImages[index] ?? beforeAfterImages[0]} alt={`Case ${index + 1} Ergebnis`} fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover" />
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

function ExamplesSection({ portfolio }: { portfolio: (typeof portfolioCopy)['de'] }) {
  return (
    <ContentSection id="beispiele">
      <SectionTitle className="reveal-stagger" style={revealStyle(40)}>
        {portfolio.title}
      </SectionTitle>
      <p className="reveal-stagger mt-4 max-w-4xl text-base leading-7 text-slate-600 sm:text-lg" style={revealStyle(110)}>
        {portfolio.subtitle}
      </p>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {portfolio.items.map((item, index) => {
          const imageSrc = item.title === 'Speicher Balkonkraftwerk' ? '/images/solaranlageseite.webp' : item.image
          return (
            <article key={item.title} className="reveal-stagger h-full" style={revealStyle(170 + index * 70)}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]">
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
                    <div className="mb-5 mt-3 flex flex-wrap gap-2">
                      {item.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition group-hover:border-slate-400 group-hover:text-slate-900">
                      Webseite öffnen
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </article>
          )
        })}
      </div>
    </ContentSection>
  )
}

function FaqSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection>
      <SectionTitle className="reveal-stagger" style={revealStyle(40)}>
        {copy.faq.title}
      </SectionTitle>
      <div className="mt-7 space-y-3">
        {copy.faq.items.map((item, index) => (
          <details key={item.question} className="reveal-stagger group rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:border-slate-300" style={revealStyle(120 + index * 60)}>
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

function FinalCtaSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <ContentSection>
      <div className="reveal-stagger rounded-[32px] border border-slate-900 bg-slate-900 px-6 py-10 text-slate-100 sm:px-10 sm:py-12" style={revealStyle(50)}>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle className="reveal-stagger text-white" style={revealStyle(90)}>
              {copy.finalCta.title}
            </SectionTitle>
            <p className="reveal-stagger mt-4 max-w-3xl text-base leading-7 text-slate-300" style={revealStyle(150)}>
              {copy.finalCta.subtitle}
            </p>
            <div className="reveal-stagger mt-7 flex flex-wrap gap-3" style={revealStyle(220)}>
              <TrackedLink href="/?quiz=1&quizSource=home_shell_final_cta" eventParams={{ cta_name: 'final_primary', placement: 'final_cta', locale: 'de' }} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100">
                {copy.finalCta.primary}
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink href={whatsappHref} target="_blank" rel="noopener noreferrer" eventName="contact_click" eventParams={{ contact_kind: 'whatsapp', placement: 'final_cta', locale: 'de' }} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                {copy.finalCta.secondary}
                <MessageCircle className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
          <div className="reveal-stagger hidden rounded-3xl border border-white/15 bg-white/10 p-3 lg:block" style={revealStyle(260)}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/20">
              <Image src="/images/hero.webp" alt="Beispiel einer modernen Unternehmenswebsite" fill sizes="30vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  )
}

function FooterSection({ copy }: { copy: typeof landingCopyDe }) {
  return (
    <footer id="kontakt" className="mt-6 rounded-[30px] border border-slate-200 bg-white px-6 py-8 sm:px-8 lg:snap-start">
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div className="reveal-stagger" style={revealStyle(60)}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{copy.footer.title}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{copy.footer.description}</p>
        </div>
        <div className="reveal-stagger text-sm text-slate-700" style={revealStyle(140)}>
          <div className="grid grid-cols-2 justify-items-start gap-x-8 gap-y-2 md:justify-items-end md:text-right">
            <Link href="/ueber-mich" className="block w-full text-left transition hover:text-slate-950 md:text-right">{copy.footer.about}</Link>
            <Link href="/blog" className="block w-full text-left transition hover:text-slate-950 md:text-right">{copy.footer.blog}</Link>
            <Link href="/datenschutzerklaerung" className="block w-full text-left transition hover:text-slate-950 md:text-right">{copy.footer.legal.privacy}</Link>
            <Link href="/agb" className="block w-full text-left transition hover:text-slate-950 md:text-right">AGB</Link>
            <Link href="/impressum" className="block w-full text-left transition hover:text-slate-950 md:text-right">{copy.footer.legal.impressum}</Link>
            <CookieSettingsTrigger className="block w-full text-left transition hover:text-slate-950 md:text-right" />
            <Link href="/kontakt" className="col-span-2 block w-full text-left font-semibold text-slate-900 transition hover:text-slate-950 md:text-right">{copy.footer.contact}</Link>
          </div>
          <nav className="sr-only" aria-label="Russian alternate links" aria-hidden="true">
            <Link href="/ru">Главная</Link>
            <Link href="/ru/ueber-mich">Обо мне</Link>
            <Link href="/ru/blog">Блог</Link>
            <Link href="/ru/kontakt">Контакты</Link>
            <Link href="/ru/impressum">Выходные данные</Link>
            <Link href="/ru/datenschutzerklaerung">Конфиденциальность</Link>
            <Link href="/ru/agb">Условия</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

function ContentSection({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={cn('mt-6 rounded-[30px] border border-slate-200/80 bg-[#fbfcff] p-6 sm:mt-7 sm:p-8 lg:snap-start lg:p-10', className)}>
      {children}
    </section>
  )
}

function SectionTitle({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <h2 className={cn('text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl lg:text-[2.05rem] lg:leading-tight', className)} style={style}>{children}</h2>
}
