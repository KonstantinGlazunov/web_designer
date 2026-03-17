import { Cpu, Database, Orbit, Rocket, Sparkles, SwatchBook, Wind } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import type { SiteCopy } from '@/lib/translations'

const iconMap = [Cpu, Wind, Sparkles, Orbit, Database, Rocket, SwatchBook]

export function TechMarqueeSection({ copy }: { copy: SiteCopy['stack'] }) {
  const items = [...copy.items, ...copy.items]

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <div className="overflow-hidden rounded-[32px] border border-white/12 bg-white/60 py-6 shadow-glow backdrop-blur-xl dark:bg-glass-dark/70">
          <div className="marquee flex min-w-max gap-4 px-4">
            {items.map((item, index) => {
              const Icon = iconMap[index % iconMap.length]
              return (
                <div
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 dark:bg-white/10 dark:text-white"
                >
                  <Icon className="h-4 w-4 text-emerald-400" />
                  {item}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
