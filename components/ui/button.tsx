'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-white text-slate-950 shadow-[0_12px_60px_rgba(255,255,255,0.18)] hover:-translate-y-0.5',
        secondary:
          'border border-white/20 bg-white/10 text-white hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-white/15',
        ghost: 'text-slate-200 hover:text-white',
      },
      size: {
        default: 'h-11',
        lg: 'h-12 px-6 text-base',
        sm: 'h-9 px-4 text-xs uppercase tracking-[0.18em]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
  },
)

Button.displayName = 'Button'
