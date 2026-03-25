'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Locale } from '@/lib/translations'

const HeroScene = dynamic(() => import('@/components/hero-scene').then((mod) => mod.HeroScene), {
  ssr: false,
})

const copyByLocale: Record<
  Locale,
  {
    label: string
    title: string
    subtitle: string
    primary: string
    secondary: string
    cards: Array<{ title: string; text: string }>
    footer: string[]
  }
> = {
  ru: {
    label: 'Экспериментальный главный экран',
    title: 'Еще один вариант первого экрана с более спокойной и понятной подачей',
    subtitle:
      'Здесь акцент не на технологиях, а на том, что человек получает сразу: красивый сайт, удобство на телефоне и быстрый способ связаться с вами.',
    primary: 'Попробовать этот вариант',
    secondary: 'Посмотреть работы',
    cards: [
      {
        title: 'Понятно с первого взгляда',
        text: 'Клиент быстро понимает, чем вы занимаетесь и как с вами связаться.',
      },
      {
        title: 'Удобно на мобильном телефоне',
        text: 'Блоки, текст и кнопки остаются удобными даже на маленьком экране.',
      },
      {
        title: 'Связка с вашим способом связи',
        text: 'Можно подключить мессенджер, почту, форму заявки или CRM.',
      },
    ],
    footer: ['Спокойная подача', 'Чистый первый экран', 'Фокус на пользе'],
  },
  de: {
    label: 'Experimenteller First Screen',
    title: 'Eine weitere Hero-Variante mit ruhigerem und klarerem Einstieg',
    subtitle:
      'Hier geht es nicht um Technik, sondern um den ersten Eindruck: eine schoene Website, gute Nutzung auf dem Handy und ein schneller Kontaktweg fuer Ihre Kunden.',
    primary: 'Diese Variante testen',
    secondary: 'Referenzen ansehen',
    cards: [
      {
        title: 'Auf den ersten Blick klar',
        text: 'Der Kunde versteht sofort, was Sie anbieten und wie er Sie erreicht.',
      },
      {
        title: 'Einfach auf dem Handy',
        text: 'Texte, Buttons und Bloecke bleiben auch auf kleinen Bildschirmen angenehm nutzbar.',
      },
      {
        title: 'Mit Ihrem Kontaktweg verbunden',
        text: 'Messenger, E-Mail, Anfrageformular oder CRM lassen sich sauber anbinden.',
      },
    ],
    footer: ['Ruhiger Einstieg', 'Klarer First Screen', 'Nutzen im Mittelpunkt'],
  },
}

export function ExperimentalHeroSection({
  locale,
  onOpenForm,
}: {
  locale: Locale
  onOpenForm: () => void
}) {
  const copy = copyByLocale[locale]

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroScene mode="background" className="h-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_20%,rgba(103,232,249,0.2),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(167,139,250,0.22),transparent_36%),linear-gradient(180deg,rgba(2,6,23,0.14)_0%,rgba(2,6,23,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(2,6,23,0.48)_0%,rgba(2,6,23,0.18)_42%,rgba(2,6,23,0.56)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="flex max-w-2xl flex-col justify-center"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              {copy.label}
            </div>

            <h2 className="mt-5 max-w-4xl text-balance text-[clamp(2.1rem,6vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">
              {copy.title}
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-100/90 sm:text-base sm:leading-8 md:text-lg">
              {copy.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" onClick={onOpenForm}>
                {copy.primary}
              </Button>
              <Link
                href="#portfolio"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {copy.secondary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {copy.footer.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
                  className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur-xl"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid content-center gap-4 lg:pl-8">
            {copy.cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: 0.08 + index * 0.12 }}
                className="rounded-[28px] border border-white/14 bg-white/10 p-5 shadow-[0_24px_100px_rgba(2,6,23,0.24)] backdrop-blur-2xl sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-300/90">
                      0{index + 1}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{card.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-100/82 sm:text-[15px]">
                      {card.text}
                    </p>
                  </div>
                  <div className="mt-1 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(110,231,183,0.9)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
