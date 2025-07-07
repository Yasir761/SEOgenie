'use client'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Pen,
  Settings,
  Plug,
  LogOut,
  Menu,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const links = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/create", icon: Pen, label: "Create Blog" },
  { href: "/dashboard/integrations", icon: Plug, label: "Integrations" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SidebarNav pathname={pathname} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen w-64 border-r bg-white p-4">
        <SidebarNav pathname={pathname} />
      </div>
    </>
  )
}

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full">
      <div className="text-xl font-bold mb-6">SEOgenie</div>

      {/* Link Section */}
      <nav className="flex flex-col gap-4 text-sm flex-1">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 hover:text-primary transition-colors ${
              pathname === href ? "text-primary font-semibold" : "text-gray-700"
            }`}
          >
            <Icon size={18} /> {label}
          </Link>
        ))}
      </nav>

      {/* Logout Button at Bottom */}
      <div className="mt-auto pt-6">
        <button className="flex items-center gap-2 text-red-600">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  )
}
