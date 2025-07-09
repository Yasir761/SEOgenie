"use client"

import {
  IconLayoutDashboard,
  IconBulb,
  IconSettings,
  IconChartArcs,
  IconPlug,
  IconFileText,
  IconBook,
  IconHelp,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Link from "next/link"

const sidebarConfig = {
  user: {
    name: "Yasir",
    email: "founder@seogenie.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Generate Blog",
      url: "/dashboard/create",
      icon: IconFileText,
    },
    {
      title: "Strategy AI",
      url: "/dashboard/strategy",
      icon: IconBulb,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconChartArcs,
    },
    {
      title: "Your Blogs",
      url: "/dashboard/blogs",
      icon: IconBook,
    },
    {
      title: "Integrations",
      url: "/dashboard/integrations",
      icon: IconPlug,
    },
  ],
  navFooter: [
    {
      title: "Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-white/60 backdrop-blur-lg border-r border-white/20 shadow-md"
      {...props}
    >
      {/* Brand Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="!p-1.5 hover:bg-white/40 rounded-md transition"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-800 tracking-tight">
                  SEOgenie
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <NavMain items={sidebarConfig.navMain} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t pt-3 mt-4">
        <SidebarMenu>
          {sidebarConfig.navFooter.map((item, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  <item.icon className="size-4" />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-3">
          <NavUser user={sidebarConfig.user} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
