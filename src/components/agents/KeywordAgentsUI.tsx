
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function KeywordAgentUI({ keyword, onChangeKeyword, onComplete }) {
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    setLoading(true)
    const res = await fetch("/api/agents/keyword", {
      method: "POST",
      body: JSON.stringify({ keyword }),
    })
    const data = await res.json()
    setLoading(false)
    onComplete(data)
  }

  return (
    <div>
      <input
        value={keyword}
        onChange={(e) => onChangeKeyword(e.target.value)}
        className="border px-4 py-2 rounded w-full"
        placeholder="Enter keyword..."
      />
      <Button onClick={handleStart} disabled={loading} className="mt-4">
        {loading ? "Analyzing..." : "Start with Keyword"}
      </Button>
    </div>
  )
}
