import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded-md border text-xs font-medium tracking-wide w-fit whitespace-nowrap shrink-0 transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-transparent shadow-sm hover:brightness-105",
        secondary:
          "bg-muted text-muted-foreground border border-gray-200 hover:bg-gray-100",
        destructive:
          "bg-red-500 text-white border-transparent hover:bg-red-600",
        outline:
          "bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
