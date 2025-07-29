import { ReactNode } from "react"
import { Inter, Poppins } from "next/font/google"
import { DashboardShell } from "@/components/shell"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-poppins",
})

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br from-[#f0f4ff] via-white to-[#f7f2ff] bg-fixed ${inter.variable} ${poppins.variable}`}
    >
      <DashboardShell>
        {children}
      </DashboardShell>
    </div>
  )
}
