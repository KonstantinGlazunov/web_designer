'use client'

import { useMemo, useState } from 'react'
import { ChatFab } from '@/components/chat/chat-fab'
import { ContactDialog } from '@/components/contact-dialog'
import { QuizDialog } from '@/components/quiz-dialog'
import { useSitePreferences } from '@/components/providers/site-preferences'
import { AboutSection } from '@/components/sections/about-section'
import { FooterSection } from '@/components/sections/footer-section'
import { HeroSection } from '@/components/sections/hero-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { ProcessSection } from '@/components/sections/process-section'
import { ServicesSection } from '@/components/sections/services-section'
import { StickyCta } from '@/components/sections/sticky-cta'
import { TechMarqueeSection } from '@/components/sections/tech-marquee-section'
import { siteCopy } from '@/lib/translations'

export function AgencyStudioPage() {
  const { locale, theme } = useSitePreferences()
  const [open, setOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)

  const copy = useMemo(() => siteCopy[locale], [locale])

  return (
    <>
      <HeroSection copy={copy} onOpenForm={() => setQuizOpen(true)} />
      <main className="relative -mt-10 rounded-t-[42px] bg-page-light pb-16 pt-4 dark:bg-page-dark">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.12),_transparent_60%)]" />
        <AboutSection copy={copy.about} />
        <ServicesSection copy={copy.services} />
        <PortfolioSection copy={copy.portfolio} />
        <ProcessSection copy={copy.process} />
        <TechMarqueeSection copy={copy.stack} />
        <FooterSection copy={copy.footer} />
      </main>
      <StickyCta copy={copy.stickyCta} onOpenForm={() => setQuizOpen(true)} />
      <QuizDialog open={quizOpen} onClose={() => setQuizOpen(false)} locale={locale} />
      <ContactDialog copy={copy.form} open={open} onClose={() => setOpen(false)} />
      <ChatFab locale={locale} theme={theme} />
    </>
  )
}
