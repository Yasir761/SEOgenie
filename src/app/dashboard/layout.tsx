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
//     <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
// <body className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">

//     <div className="min-h-screen w-full bg-transparent"> 
//       <DashboardShell>{children}</DashboardShell>
//     </div>
//   </body>
// </html>

    <div className="min-h-screen w-full bg-transparent">
    <DashboardShell>{children}</DashboardShell>
    </div>
  )
}
