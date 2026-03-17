'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { SectionHeading } from '@/components/section-heading'
import type { SiteCopy } from '@/lib/translations'

export function PortfolioSection({ copy }: { copy: SiteCopy['portfolio'] }) {
  return (
    <section id="portfolio" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {copy.items.map((item, index) => {
            const card = (
              <Card className="group overflow-hidden p-0 transition hover:border-emerald-300/30">
                <div className={`relative overflow-hidden ${item.size === 'lg' ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-[26px] border border-white/12 bg-slate-950/75 p-4 backdrop-blur-xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                        Tech stack
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              </Card>
            )
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="mb-6 break-inside-avoid"
              >
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
