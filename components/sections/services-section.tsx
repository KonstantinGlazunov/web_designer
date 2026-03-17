'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { SectionHeading } from '@/components/section-heading'
import type { SiteCopy } from '@/lib/translations'

export function ServicesSection({ copy }: { copy: SiteCopy['services'] }) {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {copy.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <Card className="group h-full overflow-hidden p-0 transition duration-300 hover:-translate-y-1.5 hover:border-emerald-300/30 hover:shadow-[0_24px_120px_rgba(16,185,129,0.12)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[28px] bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4 opacity-95 transition duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
