// app/dashboard/create/page.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function GenerateBlogPage() {
  const [keyword, setKeyword] = useState("")
  const [tone, setTone] = useState("formal")
  const [length, setLength] = useState("medium")
  const [blog, setBlog] = useState("")

  const handleGenerate = async () => {
    // Temporary mock response — replace this with API call to your backend later
    const generated = `# Blog on "${keyword}"\n\nThis is a ${tone} blog post about ${keyword} with ${length} length.`
    setBlog(generated)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Generate Blog</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="keyword">Keyword</Label>
          <Input
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., SEO for startups"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tone">Tone</Label>
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
            <Label htmlFor="length">Length</Label>
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

        <Button onClick={handleGenerate}>Generate</Button>

        {blog && (
          <div className="mt-6">
            <Label>Preview</Label>
            <Textarea value={blog} rows={10} readOnly />
          </div>
        )}
      </div>
    </div>
  )
}
