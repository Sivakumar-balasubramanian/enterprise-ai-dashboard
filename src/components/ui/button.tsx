import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-cyan-400/30 bg-cyan-400/15 text-cyan-50 shadow-[0_12px_40px_rgba(13,148,196,0.18)] hover:bg-cyan-400/25',
        secondary:
          'border-white/10 bg-white/6 text-slate-100 hover:bg-white/10',
        ghost: 'border-transparent bg-transparent text-slate-200 hover:bg-white/6',
        destructive:
          'border-rose-500/30 bg-rose-500/12 text-rose-100 hover:bg-rose-500/20',
      },
      size: {
        default: 'h-11 px-4',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-5',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({ className, size, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
