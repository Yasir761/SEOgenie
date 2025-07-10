"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Sparkles,
  Loader2,
  PenSquare,
  BrainCog,
  Layers,
  PenLine,
  BarChart3,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function GenerateBlogPage() {
  const [keyword, setKeyword] = useState("")
  const [tone, setTone] = useState("formal")
  const [length, setLength] = useState("medium")
  const [blog, setBlog] = useState("")
  const [loading, setLoading] = useState(false)
  const [phase, setPhase] = useState<"input" | "generating">("input")
  const [activeAgent, setActiveAgent] = useState<number>(-1)

  const agentSequence = [
    "Keyword Analyzer",
    "Blog Blueprint",
    "Writer Agent",
    "SEO Optimizer",
  ]

  const handleGenerate = async () => {
    setLoading(true)
    setPhase("generating")
    setBlog("")
    for (let i = 0; i < agentSequence.length; i++) {
      setActiveAgent(i)
      await new Promise((r) => setTimeout(r, 800))
    }
    const generated = `# Blog on "${keyword}"
\nThis is a ${tone} blog post about ${keyword} with ${length} length.`
    setBlog(generated)
    setLoading(false)
    setActiveAgent(-1)
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text flex justify-center items-center gap-3">
          <PenSquare className="w-8 h-8" /> Welcome to Blog Creation
        </h1>
        <p className="text-muted-foreground mt-2 text-base sm:text-lg">
          Enter your keyword and watch intelligent agents bring your blog to life 🧠✨
        </p>
      </div>

      <AnimatePresence mode="wait">
        {phase === "input" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-background/80 border border-border rounded-2xl p-8 shadow-md space-y-6"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="keyword">🔍 Keyword</Label>
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g., SEO for startups"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tone">🎯 Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="length">📏 Length</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading || !keyword}
                className="w-full flex items-center gap-2 justify-center text-lg py-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Generate Blog
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {phase === "generating" && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-muted/30 border border-border rounded-2xl p-8 shadow-inner"
          >
            <h2 className="text-xl font-semibold text-center mb-6 text-foreground">Generating Your Blog...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {agentSequence.map((agent, index) => (
                <div
                  key={agent}
                  className={`rounded-xl p-4 text-center transition-all border ${
                    activeAgent === index
                      ? "bg-background border-primary text-primary font-semibold"
                      : "bg-muted/10 border-muted text-muted-foreground"
                  }`}
                >
                  {agent}
                </div>
              ))}
            </div>

            {blog && (
              <div className="mt-8">
                <Label className="text-lg mb-2 block">📝 Preview</Label>
                <Textarea
                  value={blog}
                  rows={12}
                  readOnly
                  className="font-mono bg-muted/20 border border-border rounded-lg p-4 resize-none shadow-inner"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
