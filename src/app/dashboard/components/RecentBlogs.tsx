"use client"

import * as React from "react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const allBlogs = [
  { id: "1", title: "Top SEO Tips", date: "Jul 6", exported: true, integration: "WordPress" },
  { id: "2", title: "How to Rank #1", date: "Jul 5", exported: false, integration: "-" },
  { id: "3", title: "Content Strategies", date: "Jul 4", exported: true, integration: "Medium" },
  { id: "4", title: "Keyword Guide", date: "Jul 3", exported: false, integration: "-" },
  { id: "5", title: "Backlink Basics", date: "Jul 2", exported: true, integration: "WordPress" },
  { id: "6", title: "SERP Optimization", date: "Jul 1", exported: false, integration: "-" },
  { id: "7", title: "Schema SEO", date: "Jun 30", exported: true, integration: "Medium" },
]

const ITEMS_PER_PAGE = 5

export default function RecentBlogs() {
  const [page, setPage] = React.useState(0)

  const paginatedBlogs = allBlogs.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil(allBlogs.length / ITEMS_PER_PAGE)

  return (
    <Card className="w-full mt-10 border border-white/30 bg-white/70 backdrop-blur-md shadow-md rounded-2xl">
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight text-gray-800">
          Recent Blogs
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 pt-0 overflow-x-auto">
        <div className="relative">
          <div className="overflow-auto max-h-[320px]">
            <Table className="min-w-[700px]">
              <TableHeader className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-white/20">
                <TableRow>
                  {["Title", "Date", "Exported", "Integration"].map((col, i) => (
                    <TableHead
                      key={i}
                      className="text-xs uppercase font-semibold text-gray-500 tracking-wider"
                    >
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedBlogs.map((blog, i) => (
                  <motion.tr
                    key={blog.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() =>
                      window.location.assign(`/dashboard/blogs/${blog.id}`)
                    }
                    className="cursor-pointer group transition-all duration-200 hover:bg-gradient-to-r from-white/60 via-purple-50/30 to-cyan-50/30 backdrop-blur hover:shadow-sm"
                  >
                    <TableCell className="font-medium text-gray-800 group-hover:underline">
                      {blog.title}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {blog.date}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={blog.exported ? "default" : "secondary"}
                        className="text-xs font-medium"
                      >
                        {blog.exported ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {blog.integration !== "-" ? (
                        <Badge variant="outline" className="text-xs font-medium">
                          {blog.integration}
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end gap-2 px-4 py-4 border-t border-white/20 bg-white/60 backdrop-blur">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="transition-colors"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="transition-colors"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
