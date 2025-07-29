"use client"

import { useEffect, useState } from "react"
import Loader from "@/app/dashboard/components/loader"
import BlogEditor from "@/components/blog/blogEditor"
import { motion } from "framer-motion"
import { Sparkles, Tag } from "lucide-react"

interface BlogData {
  keyword: string
  intent?: string
  tone?: string
  voice?: string
  outline?: any
  tags?: string[]
  seo?: {
    optimized_title?: string
    meta_description?: string
    slug?: string
    final_hashtags?: string[]
  }
  blog?: string
}

export default function BlogGenerator() {
  const [keyword, setKeyword] = useState("")
  const [tone, setTone] = useState("Informative")
  const [isLoading, setIsLoading] = useState(false)
  const [blogData, setBlogData] = useState<BlogData | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const generateBlog = async () => {
    if (!keyword) return
    setIsLoading(true)
    try {
      const res = await fetch("/api/agents/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, tone }),
      })
      const data = await res.json()
      setBlogData(data.blog)
    } catch (error) {
      console.error("Error generating blog:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto py-20 px-4 space-y-10">
        {isLoading && <Loader />}

        {!isLoading && !blogData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-8 text-center"
          >
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                Generate SEO Blogs
                <span className="block bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Instantly
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Transform your keywords into high-converting, SEO-optimized blog posts with our advanced AI technology
              </p>
            </div>

            <div className="w-full max-w-2xl">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative flex rounded-xl bg-gray-50 border border-gray-200 overflow-hidden shadow-lg">
                  <input
                    type="text"
                    placeholder="Enter your keyword or topic..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-grow px-6 py-4 text-lg bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && generateBlog()}
                  />
                  <button
                    onClick={generateBlog}
                    disabled={!keyword.trim()}
                    className="relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="relative z-10">Generate</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  SEO Optimized
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  AI Generated
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  Ready to Publish
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Output remains unchanged */}

        {!isLoading && blogData && (
          <motion.div
            className="space-y-8 animate-in fade-in duration-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* ... rest remains unchanged ... */}
          </motion.div>
        )}
      </div>
    </div>
  )
}
