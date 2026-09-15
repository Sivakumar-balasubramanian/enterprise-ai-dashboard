import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ReactNode } from 'react'

import { cn } from '../../lib/utils'

export const Tabs = TabsPrimitive.Root

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex rounded-full border border-white/10 bg-white/6 p-1 backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </TabsPrimitive.List>
  )
}

export function TabsTrigger({
  children,
  className,
  value,
}: {
  children: ReactNode
  className?: string
  value: string
}) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg',
        className,
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

export const TabsContent = TabsPrimitive.Content
