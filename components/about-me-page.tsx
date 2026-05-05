'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Github,
  GraduationCap,
  HeartHandshake,
  Instagram,
  Languages,
  Linkedin,
  MapPin,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { CookieSettingsTrigger } from '@/components/cookie-settings-trigger'
import { LocaleToggle } from '@/components/locale-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { localizePath } from '@/lib/locale-routes'
import type { Locale } from '@/lib/translations'

const ChatFab = dynamic(
  () => import('@/components/chat/chat-fab').then((mod) => mod.ChatFab),
  { ssr: false },
)

const QuizDialog = dynamic(
  () => import('@/components/quiz-dialog').then((mod) => mod.QuizDialog),
  { ssr: false },
)

const aboutCopy: Record<
  Locale,
  {
    navHome: string
    eyebrow: string
    title: string
    intro: string
    primaryCta: string
    secondaryCta: string
    proof: string[]
    storyPoints: string[]
    problemsTitle: string
    problems: string[]
    storyTitle: string
    story: string[]
    expertiseTitle: string
    credentials: Array<{ title: string; text: string; meta: string; href: string }>
    skillsTitle: string
    skills: string[]
    workTitle: string
    workSteps: Array<{ title: string; text: string }>
    whyTitle: string
    why: string[]
    personalTitle: string
    personal: string
    socialsTitle: string
    finalTitle: string
    finalText: string
    footer: string
    blog: string
    legal: {
      agb: string
      privacy: string
      impressum: string
    }
    floatingQuiz: string
  }
> = {
  de: {
    navHome: 'Startseite',
    eyebrow: 'Über mich',
    title: 'Ich helfe kleinen Unternehmen, verständliche Websites in echte Anfragen zu verwandeln.',
    intro:
      'Mein Fokus liegt nicht auf Technik um der Technik willen. Ich baue Websites, die Kunden schnell verstehen, Vertrauen schaffen und den nächsten Kontakt einfach machen.',
    primaryCta: 'Kostenlose Einschätzung starten',
    secondaryCta: 'LinkedIn ansehen',
    proof: ['Braunfels, Hessen', 'Russisch und Deutsch', 'Websites für lokale Unternehmen'],
    storyPoints: ['Vibe Studio', 'AIT TR', 'Produkt & Business'],
    problemsTitle: 'Welche Probleme ich löse',
    problems: [
      'Die Website wirkt veraltet und macht nicht klar, warum Kunden Kontakt aufnehmen sollen.',
      'Neue Kunden kommen fast nur über Empfehlungen, aber nicht zuverlässig über die eigene Seite.',
      'Leistungen, Kontaktwege und Vertrauen wirken online oft unklar und verstreut.',
      'Technik, Texte und Struktur kosten Zeit, obwohl das Geschäft eigentlich im Vordergrund stehen sollte.',
    ],
    storyTitle: 'Mein Weg',
    story: [
      'Ich komme aus der Praxis und denke zuerst an das Geschäft: Was soll eine Website leisten, welche Entscheidung soll sie erleichtern und wie kommt ein Besucher zur Anfrage?',
      'Meine Ausbildung zum Java-Backend-Entwickler bei AIT-TR und die Beschäftigung mit Softwareentwicklung geben mir das technische Fundament, um Websites nicht nur schön, sondern stabil und sauber umzusetzen.',
      'Erfahrung aus Produktmanagement, Management und digitalen Projekten hilft mir, Anforderungen zu sortieren, Prioritäten zu setzen und mit Kunden in verständlicher Sprache über Wirkung statt nur über Funktionen zu sprechen.',
    ],
    expertiseTitle: 'Expertise und Zertifikate',
    credentials: [
      {
        title: 'Fullstack Developer',
        text: 'AIT-TR GmbH: 960 UE Theorie und 160 Stunden Praktikum mit Java, Frontend, QA, Git, Datenbanken und Graduation Project.',
        meta: 'Berlin, 17.11.2023',
        href: '/certificates/ait-fullstack-developer-konstantin-glazunov.pdf',
      },
      {
        title: 'Product Manager',
        text: 'Produktdenken hilft, aus einer Website ein Werkzeug für Vertrauen und Anfragen zu machen.',
        meta: 'SkillFactory, 22.02.2020',
        href: '/certificates/skillfactory-product-manager-konstantin-glazunov.pdf',
      },
      {
        title: 'Bachelor Management',
        text: 'Akademischer Abschluss in Management. Business-Verständnis für Angebote, Zielgruppen, Prozesse und wirtschaftliche Prioritäten.',
        meta: 'Diplom, 10.06.2003',
        href: '/certificates/bachelor-management-konstantin-glazunov.pdf',
      },
    ],
    skillsTitle: 'Technologien und Arbeitsfelder',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Java', 'Spring Boot', 'SEO-Grundlagen', 'DSGVO-nahe Umsetzung', 'Formulare und Kontaktwege', 'KI-gestützte Workflows'],
    workTitle: 'Wie ich arbeite',
    workSteps: [
      {
        title: 'Verstehen',
        text: 'Wir klären, was Ihr Geschäft anbietet, welche Kunden Sie erreichen wollen und was die Website leisten soll.',
      },
      {
        title: 'Strukturieren',
        text: 'Ich bringe Leistungen, Texte, Kontaktwege und Vertrauen in eine klare Seitenstruktur.',
      },
      {
        title: 'Umsetzen',
        text: 'Design, Technik, mobile Darstellung und SEO-Grundlagen setze ich in einem klaren Prozess um.',
      },
      {
        title: 'Prüfen und starten',
        text: 'Vor dem Start werden Darstellung, Formulare, Rechtstexte und die wichtigsten Wege durch die Seite geprüft.',
      },
    ],
    whyTitle: 'Warum die Zusammenarbeit unkompliziert ist',
    why: [
      'Ich spreche Deutsch und Russisch und kann komplexe technische Themen einfach erklären.',
      'Ich arbeite direkt mit Ihnen, ohne Agentur-Phrasen und ohne unnötige Zwischenebenen.',
      'Der Fokus liegt auf lokalen Unternehmen, klarer Kommunikation und echten Anfragen.',
      'Ich sage auch ehrlich, wenn eine einfache Lösung reicht oder ein Schritt noch nicht sinnvoll ist.',
    ],
    personalTitle: 'Ein bisschen persönlich',
    personal:
      'Ich lebe in Braunfels in Hessen. Mich interessiert, wie kleine Unternehmen mit einfachen digitalen Werkzeugen professioneller auftreten können. Privat bin ich bodenständig: lernen, bauen, verbessern und Zeit mit Menschen verbringen, die mir wichtig sind.',
    socialsTitle: 'Soziale Medien',
    finalTitle: 'Sie sind unsicher, ob sich eine neue Website lohnt?',
    finalText:
      'Dann starten wir mit einer kurzen ehrlichen Einschätzung. In 10-15 Minuten klären wir, was Ihre Seite heute leisten sollte und welcher nächste Schritt sinnvoll ist.',
    footer: 'Vibe Studio - Websites für kleine Unternehmen',
    blog: 'Blog',
    legal: {
      agb: 'AGB',
      privacy: 'Datenschutz',
      impressum: 'Impressum',
    },
    floatingQuiz: 'Kurze Einschätzung',
  },
  ru: {
    navHome: 'На главную',
    eyebrow: 'Обо мне',
    title: 'Я помогаю малому бизнесу превращать понятные сайты в реальные заявки.',
    intro:
      'Для меня сайт - это не просто дизайн и код. Это инструмент, который должен быстро объяснять предложение, вызывать доверие и помогать клиенту связаться с вами.',
    primaryCta: 'Начать бесплатную оценку',
    secondaryCta: 'Посмотреть LinkedIn',
    proof: ['Браунфельс, Гессен', 'Русский и немецкий', 'Сайты для локального бизнеса'],
    storyPoints: ['Vibe Studio', 'AIT TR', 'Продукт и бизнес'],
    problemsTitle: 'Какие проблемы я решаю',
    problems: [
      'Сайт выглядит устаревшим и не объясняет, почему клиенту стоит обратиться именно к вам.',
      'Новые клиенты приходят в основном по рекомендациям, а сайт почти не помогает получать заявки.',
      'Услуги, контакты и доверительные элементы разбросаны, вместо понятного пути для клиента.',
      'Техника, тексты и структура забирают время, хотя вам важнее заниматься бизнесом.',
    ],
    storyTitle: 'Мой путь',
    story: [
      'Я смотрю на сайт через задачу бизнеса: что он должен делать, какое решение должен упростить и как привести посетителя к заявке.',
      'Обучение на Java-Backend-разработчика в AIT TR и работа с веб-разработкой дают техническую базу, чтобы делать сайты не только красивыми, но и аккуратными внутри.',
      'Опыт продуктового мышления, менеджмента и собственных цифровых проектов помогает мне отделять важное от лишнего и говорить с клиентом понятным языком.',
    ],
    expertiseTitle: 'Экспертиза и сертификаты',
    credentials: [
      {
        title: 'Фулстек-разработчик',
        text: 'AIT-TR GmbH: 960 UE теории и 160 часов практики, Java, Frontend, QA, Git, базы данных и выпускной проект.',
        meta: 'Берлин, 17.11.2023',
        href: '/certificates/ait-fullstack-developer-konstantin-glazunov.pdf',
      },
      {
        title: 'Продакт-менеджер',
        text: 'Продуктовый подход помогает делать сайт инструментом для доверия, контакта и заявок.',
        meta: 'SkillFactory, 22.02.2020',
        href: '/certificates/skillfactory-product-manager-konstantin-glazunov.pdf',
      },
      {
        title: 'Бакалавр менеджмента',
        text: 'Академическая степень в менеджменте. Понимание бизнеса, целевой аудитории, процессов и экономических приоритетов.',
        meta: 'Диплом, 10.06.2003',
        href: '/certificates/bachelor-management-konstantin-glazunov.pdf',
      },
    ],
    skillsTitle: 'Технологии и направления',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Java', 'Spring Boot', 'SEO-база', 'DSGVO-подход', 'Формы и контакты', 'ИИ-процессы'],
    workTitle: 'Как я работаю',
    workSteps: [
      {
        title: 'Разбираюсь в задаче',
        text: 'Сначала понимаю, что вы предлагаете, каких клиентов хотите получить и что должен делать сайт.',
      },
      {
        title: 'Собираю структуру',
        text: 'Услуги, тексты, контакты и элементы доверия складываются в понятный путь для клиента.',
      },
      {
        title: 'Реализую сайт',
        text: 'Дизайн, техника, мобильная версия и базовая SEO-структура делаются в одном процессе.',
      },
      {
        title: 'Проверяю и запускаю',
        text: 'Перед запуском проверяю отображение, формы, юридические страницы и основные сценарии пользователя.',
      },
    ],
    whyTitle: 'Почему со мной удобно',
    why: [
      'Я говорю на русском и немецком и объясняю технические вещи простым языком.',
      'Вы работаете напрямую со мной, без агентского пафоса и лишних посредников.',
      'Фокус на локальных компаниях, понятной подаче и конкретных заявках.',
      'Я честно скажу, если достаточно простой версии или какой-то шаг пока не нужен.',
    ],
    personalTitle: 'Немного личного',
    personal:
      'Я живу в Браунфельсе, земля Гессен. Мне интересно, как малый бизнес может выглядеть профессиональнее с помощью простых цифровых инструментов. В жизни ценю спокойный практичный подход: учиться, делать, улучшать и проводить время с близкими людьми.',
    socialsTitle: 'Социальные сети',
    finalTitle: 'Не уверены, нужна ли новая страница?',
    finalText:
      'Начнем с короткой оценки. За 10-15 минут можно понять, что сайт должен делать сейчас и какой следующий шаг действительно имеет смысл.',
    footer: 'Vibe Studio - сайты для малого бизнеса',
    blog: 'Блог',
    legal: {
      agb: 'AGB',
      privacy: 'Политика конфиденциальности',
      impressum: 'Выходные данные',
    },
    floatingQuiz: 'Короткая оценка',
  },
}

const credentialIcons = [Wrench, BriefcaseBusiness, GraduationCap]
const workIcons = [MessageCircle, Sparkles, Rocket, ShieldCheck]

export function AboutMePage() {
  const { locale } = useSitePreferences()
  const copy = aboutCopy[locale]
  const homeHref = localizePath('/', locale)
  const blogHref = localizePath('/blog', locale)
  const agbHref = localizePath('/agb', locale)
  const privacyHref = localizePath('/datenschutzerklaerung', locale)
  const impressumHref = localizePath('/impressum', locale)
  const [quizOpen, setQuizOpen] = useState(false)
  const [chatReady, setChatReady] = useState(false)

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setChatReady(true), { timeout: 1800 })
      return () => w.cancelIdleCallback?.(id)
    }

    const timer = window.setTimeout(() => setChatReady(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      {quizOpen ? <QuizDialog open={quizOpen} onClose={() => setQuizOpen(false)} locale={locale} /> : null}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Link href={homeHref} className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-800">
          Vibe Studio
        </Link>
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </header>

      <section className="relative overflow-hidden border-y border-slate-200 bg-white">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.98fr_0.82fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.04] text-slate-950 sm:text-5xl lg:text-[4.3rem]">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">{copy.intro}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setQuizOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="https://www.linkedin.com/in/konstantin-glazunov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950"
              >
                {copy.secondaryCta}
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-2 text-sm text-slate-700">
              {copy.proof.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-[0_22px_70px_rgba(15,23,42,0.16)]">
              <Image
                src="/images/ubermich.webp"
                alt="Arbeitsgespräch über eine Website"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Section>
          <SectionHeader title={copy.problemsTitle} />
          <div className="grid gap-3 md:grid-cols-2">
            {copy.problems.map((item) => (
              <p key={item} className="rounded-[22px] border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-700 sm:text-base">
                {item}
              </p>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeader title={copy.storyTitle} />
          <div className="grid gap-5 lg:grid-cols-[0.74fr_1fr]">
            <div className="space-y-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
              {copy.storyPoints.map((point, index) => {
                const icons = [MapPin, Sparkles, Wrench, BriefcaseBusiness]
                const Icon = icons[index] ?? MapPin
                return (
                  <p key={point} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" /> {point}
                  </p>
                )
              })}
            </div>
            <div className="space-y-4 text-base leading-8 text-slate-700">
              {copy.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeader title={copy.expertiseTitle} />
          <div className="grid gap-4 md:grid-cols-3">
            {copy.credentials.map((item, index) => {
              const Icon = credentialIcons[index] ?? GraduationCap

              return (
                <article key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <Icon className="h-6 w-6 text-sky-700" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.meta}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                  >
                    PDF öffnen
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </article>
              )
            })}
          </div>
          <div className="mt-7">
            <h3 className="text-lg font-semibold text-slate-950">{copy.skillsTitle}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeader title={copy.workTitle} />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.workSteps.map((step, index) => {
              const Icon = workIcons[index] ?? CheckCircle2

              return (
                <article key={step.title} className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                </article>
              )
            })}
          </div>
        </Section>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.78fr]">
          <Section className="mt-0">
            <SectionHeader title={copy.whyTitle} />
            <div className="space-y-3">
              {copy.why.map((item) => (
                <p key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                  <Languages className="mt-1 h-5 w-5 flex-none text-sky-700" />
                  {item}
                </p>
              ))}
            </div>
          </Section>

          <Section className="mt-0">
            <SectionHeader title={copy.personalTitle} />
            <p className="text-base leading-8 text-slate-700">{copy.personal}</p>
            <div className="mt-6">
              <h3 className="text-base font-semibold text-slate-950">{copy.socialsTitle}</h3>
              <div className="mt-3 flex items-center gap-3 text-slate-700">
                <a
                  href="https://github.com/KonstantinGlazunov"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-slate-300 hover:text-slate-950"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/konstantin-glazunov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-slate-300 hover:text-slate-950"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/konstantin_podarambolskiy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-slate-300 hover:text-slate-950"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Section>
        </div>

        <section className="mt-6 rounded-[30px] bg-slate-950 px-6 py-8 text-white sm:px-8 lg:px-10">
          <HeartHandshake className="h-7 w-7 text-emerald-300" />
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl">{copy.finalTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{copy.finalText}</p>
          <button
            onClick={() => setQuizOpen(true)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
          >
            {copy.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        <footer className="mt-6 flex flex-col gap-3 rounded-[26px] border border-slate-200 bg-white px-6 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.footer}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={homeHref} className="transition hover:text-slate-950">
              {copy.navHome}
            </Link>
            <Link href={blogHref} className="transition hover:text-slate-950">
              {copy.blog}
            </Link>
            <Link href={agbHref} className="transition hover:text-slate-950">
              {copy.legal.agb}
            </Link>
            <Link href={privacyHref} className="transition hover:text-slate-950">
              {copy.legal.privacy}
            </Link>
            <Link href={impressumHref} className="transition hover:text-slate-950">
              {copy.legal.impressum}
            </Link>
            <CookieSettingsTrigger />
          </div>
        </footer>
      </div>
      <div className="fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setQuizOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_12px_35px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-slate-400"
        >
          <MessageCircle className="h-4 w-4" />
          {copy.floatingQuiz}
        </button>
      </div>
      {chatReady ? <ChatFab locale={locale} theme="light" /> : null}
    </main>
  )
}

function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`mt-6 rounded-[30px] border border-slate-200/80 bg-[#fbfcff] p-6 sm:p-8 lg:p-10 ${className}`}>
      {children}
    </section>
  )
}

function SectionHeader({ title }: { title: string }) {
  return <h2 className="mb-6 max-w-3xl text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">{title}</h2>
}
