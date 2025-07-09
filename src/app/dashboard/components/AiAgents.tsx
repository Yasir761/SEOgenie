"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Settings2, Zap } from "lucide-react"
import clsx from "clsx"
import { motion } from "framer-motion"

const agents = [
  {
    name: "Keyword Agent",
    description: "Finds top keywords for your topic using AI.",
    active: true,
    lastRun: "Today at 9:12 AM",
    type: "automated",
  },
  {
    name: "Outline Agent",
    description: "Creates detailed outlines based on keyword and intent.",
    active: true,
    lastRun: "Yesterday at 7:43 PM",
    type: "manual",
  },
  {
    name: "SEO Agent",
    description: "Improves meta data, internal linking, and schema markup.",
    active: false,
    lastRun: null,
    type: "automated",
  },
]

export default function AIAgentsPanel() {
  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-tight">
        AI Agents
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Card
              className={clsx(
                "group relative flex flex-col justify-between rounded-2xl p-5 transition-all shadow-md hover:shadow-xl hover:scale-[1.02] backdrop-blur-md border",
                agent.active
                  ? "bg-white/80 border-indigo-200"
                  : "bg-white/50 border-gray-200"
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={clsx(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors",
                    agent.active
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    {agent.name}
                  </div>
                  <div className="text-xs mt-0.5">
                    <Badge
                      variant={agent.type === "automated" ? "outline" : "secondary"}
                      className="px-2 py-0.5 text-xs"
                    >
                      {agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {agent.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-2">
                {agent.lastRun ? (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{agent.lastRun}</span>
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 italic">
                    Not run yet
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    <Settings2 className="w-4 h-4 mr-1" />
                    Configure
                  </Button>
                  {agent.active ? (
                    <Badge variant="success" className="text-xs">Active</Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">Inactive</Badge>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
