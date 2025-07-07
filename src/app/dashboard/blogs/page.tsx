
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from "lucide-react"

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Blogs</h1>
        <Button>+ Create New</Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBlogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base line-clamp-2">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <Badge variant={blog.status === "Published" ? "default" : "outline"}>
                  {blog.status}
                </Badge>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  {blog.createdAt}
                </span>
              </div>
              <div>Word Count: <strong>{blog.wordCount}</strong></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
