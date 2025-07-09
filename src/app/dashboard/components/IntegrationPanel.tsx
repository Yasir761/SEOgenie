"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Link2 } from "lucide-react"
import { motion } from "framer-motion"
import clsx from "clsx"

const integrations = [
  {
    name: "WordPress",
    connected: true,
    logo: "/icons/wordpress.svg",
    lastSynced: "2 hours ago",
  },
  {
    name: "Medium",
    connected: false,
    logo: "/icons/medium.svg",
  },
  {
    name: "Google Docs",
    connected: true,
    logo: "/icons/googledocs.svg",
    lastSynced: "Yesterday",
  },
]

export default function IntegrationPanel() {
  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-tight">
        Integrations
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Card
              className={clsx(
                "group relative rounded-2xl p-5 shadow-sm transition-all border hover:shadow-lg",
                item.connected
                  ? "bg-white/80 border-green-100"
                  : "bg-white/60 border-gray-200"
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={clsx(
                  "w-10 h-10 rounded-xl border p-1.5 shadow-sm flex items-center justify-center bg-white transition-all",
                  item.connected && "group-hover:shadow-[0_0_0_4px_#d1fae5]"
                )}>
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm font-semibold">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </div>
                  {item.connected ? (
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Connected
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
                      <XCircle className="w-3.5 h-3.5" />
                      Not Connected
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                {item.connected ? (
                  <span className="text-xs text-muted-foreground">
                    Last synced: <span className="text-foreground">{item.lastSynced}</span>
                  </span>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-sm text-indigo-600 hover:bg-indigo-100"
                  >
                    <Link2 className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
