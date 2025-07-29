"use client"

import { type Icon } from "@tabler/icons-react"
import Link from "next/link"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link
                  href={item.url}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl group transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100/30 hover:to-cyan-100/30 hover:shadow-md backdrop-blur-md"
                >
                  {item.icon && (
                    <item.icon className="size-4 text-purple-500 group-hover:scale-110 group-hover:text-cyan-500 transition-transform duration-300" />
                  )}
                  <span className="text-sm font-medium text-gray-700 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 transition-all duration-300">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
