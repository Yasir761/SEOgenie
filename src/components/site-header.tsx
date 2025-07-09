"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export function SiteHeader() {
  return (
    <header className="flex h-[--header-height] items-center border-b border-white/20 bg-white/60 backdrop-blur-md shadow-sm transition-all">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 bg-muted" />
          <div className="space-y-0.5">
            <h2 className="text-lg font-semibold tracking-tight text-gray-800">
              Welcome back, Yasir
            </h2>
            <p className="text-sm text-muted-foreground">
              Let’s create blogs that actually perform 🚀
            </p>
          </div>
        </div>

        {/* Optionally, you can add actions here later (search, notifications, etc.) */}
        {/* <div className="hidden md:flex items-center gap-2"> ... </div> */}
      </div>
    </header>
  )
}
