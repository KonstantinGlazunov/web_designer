import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle: string
  className?: string
}

export function SectionHeading({ eyebrow, title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn('mx-auto mb-12 max-w-3xl text-center lg:mb-16', className)}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{eyebrow}</p>
      <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">{subtitle}</p>
    </div>
  )
}
