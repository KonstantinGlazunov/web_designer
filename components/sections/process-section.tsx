'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import type { SiteCopy } from '@/lib/translations'

export function ProcessSection({ copy }: { copy: SiteCopy['process'] }) {
  return (
    <section id="process" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 lg:block">
        <svg viewBox="0 0 1200 300" className="h-[280px] w-full opacity-25" fill="none">
          <path
            d="M40 160C210 40 338 260 515 160C706 52 816 252 997 160C1062 126 1108 104 1160 128"
            stroke="url(#curve)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10 14"
          />
          <defs>
            <linearGradient id="curve" x1="40" y1="150" x2="1160" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22D3EE" />
              <stop offset="0.5" stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <div className="grid gap-6 lg:grid-cols-3">
          {copy.steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative rounded-[30px] border border-white/12 bg-white/60 p-6 shadow-glow backdrop-blur-xl dark:bg-glass-dark/60"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-base font-semibold text-emerald-300">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
              {index < copy.steps.length - 1 ? (
                <ArrowRight className="mt-6 hidden h-5 w-5 text-slate-400 lg:block" />
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
