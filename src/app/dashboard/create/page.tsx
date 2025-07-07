// app/dashboard/create/page.tsx
"use client"

import { useState } from "react"
import { KeywordAgentUI } from "@/components/agents/KeywordAgentsUI"
// import { OutlineAgentUI } from "@/components/agents/OutlineAgentUI"

export default function CreateBlogPage() {
  const [step, setStep] = useState<"keyword" | "outline" | "generate">("keyword")
  const [keyword, setKeyword] = useState("")
  const [blogData, setBlogData] = useState<any>(null)

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Create a Blog</h1>

      {step === "keyword" && (
        <KeywordAgentUI
          onComplete={(data:any) => {
            setBlogData(data)
            setStep("outline")
          }}
          onChangeKeyword={setKeyword}
          keyword={keyword}
        />
      )}

      {/* {step === "outline" && blogData && (
        <OutlineAgentUI
          blogStrategy={blogData}
          onComplete={() => setStep("generate")}
        />
      )} */}

      {step === "generate" && <div>Blog generation UI here</div>}
    </div>
  )
}
