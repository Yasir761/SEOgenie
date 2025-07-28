
'use client'

import { useMounted } from "@/lib/use-mouted"

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const mounted = useMounted()
  return mounted ? <>{children}</> : null
}
