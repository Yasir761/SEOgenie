"use client"

import { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "3rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main
          className={cn(
            "flex-1 relative p-6 min-h-screen",
            "bg-white/80 backdrop-blur-xl",
            "transition-all duration-300 ease-out"
          )}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
