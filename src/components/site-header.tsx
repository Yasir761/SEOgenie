"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@clerk/nextjs"

export function SiteHeader() {
  const { user } = useUser()
  const firstName = user?.firstName || "Creator"

  return (
    <header className="flex h-[--header-height] items-center bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />

          <Separator orientation="vertical" className="h-6 bg-gray-300" />

          <div className="space-y-0.5">
            <h2 className="text-[1.05rem] font-semibold text-gray-800 tracking-tight">
              Welcome back, <span className="text-gray-900">{firstName}</span>
            </h2>
            <p className="text-sm text-gray-500 font-normal leading-snug">
              Let’s craft blogs that rank, convert, and inspire 🚀
            </p>
          </div>
        </div>

        {/* Optional: Right-aligned tools like search or notifications */}
      </div>
    </header>
  )
}
