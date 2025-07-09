// src/components/layout/shell.tsx
import { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem", // 64px * 4
          "--header-height": "3rem", // 48px
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
     <main className="flex-1 p-6 bg-transparent">{children}</main>


      </SidebarInset>
    </SidebarProvider>
  )
}
