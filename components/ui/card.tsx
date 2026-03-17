import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[28px] border border-white/12 bg-glass/80 backdrop-blur-xl shadow-glow dark:bg-glass-dark/70',
        className,
      )}
      {...props}
    />
  )
}
