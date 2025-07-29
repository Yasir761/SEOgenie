"use client"

import { motion } from "framer-motion"
import { CalendarIcon, PlusIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const mockBlogs = [
  {
    id: "1",
    title: "Top 10 SEO Tools for Startups",
    status: "Published",
    wordCount: 1320,
    createdAt: "2025-07-01",
  },
  {
    id: "2",
    title: "How to Write a Blog with SEOgenie",
    status: "Draft",
    wordCount: 820,
    createdAt: "2025-07-06",
  },
  {
    id: "3",
    title: "AI vs Human Writers: The Future of Content",
    status: "Published",
    wordCount: 2100,
    createdAt: "2025-06-29",
  },
]

export default function BlogsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Your Blogs
        </h1>
        <Button className="gap-1">
          <PlusIcon className="size-4" />
          Create New
        </Button>
      </div>

      <Separator className="bg-gradient-to-r from-purple-500/40 to-cyan-500/40" />

      {/* Blog Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="group transition-all hover:shadow-xl hover:ring-1 hover:ring-purple-500/40 hover:border-transparent hover:bg-gradient-to-br from-white/60 to-white/90 dark:from-gray-900/60 dark:to-gray-900/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-base line-clamp-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                  {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={blog.status === "Published" ? "default" : "outline"}
                    className="text-xs px-2 py-0.5 rounded-full"
                  >
                    {blog.status}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs">
                    <CalendarIcon className="w-4 h-4 opacity-70" />
                    {blog.createdAt}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Word Count: </span>
                  <strong className="text-gray-800 dark:text-gray-100">
                    {blog.wordCount}
                  </strong>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
