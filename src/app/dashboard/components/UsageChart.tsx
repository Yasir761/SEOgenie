"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { Skeleton } from "@/components/ui/skeleton"

const mockData = [
  { date: "Jul 1", blogs: 2 },
  { date: "Jul 2", blogs: 3 },
  { date: "Jul 3", blogs: 5 },
  { date: "Jul 4", blogs: 1 },
  { date: "Jul 5", blogs: 4 },
  { date: "Jul 6", blogs: 6 },
  { date: "Jul 7", blogs: 2 },
]

export default function BlogUsageChart() {
  const [range, setRange] = React.useState("7d")
  const [loading, setLoading] = React.useState(false)
  const [data] = React.useState(mockData)

  React.useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [range])

  const filteredData = data.slice(
    range === "30d" ? -30 : range === "7d" ? -7 : undefined
  )

  const isEmpty = filteredData.length === 0

  return (
    <Card className="w-full mt-10 rounded-2xl border border-white/30 bg-white/70 backdrop-blur-md shadow-md transition-all">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
        <div>
          <CardTitle className="text-xl font-semibold tracking-tight text-gray-800">
            Blog Growth
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Created in the last{" "}
            {range === "7d" ? "7 days" : range === "30d" ? "30 days" : "all time"}
          </CardDescription>
        </div>
        <CardAction>
          <ToggleGroup
            type="single"
            value={range}
            onValueChange={(val) => val && setRange(val)}
            variant="outline"
            className="flex gap-2 bg-white/60 border border-white/30 backdrop-blur-sm rounded-lg p-1"
          >
            <ToggleGroupItem value="7d" className="text-sm">
              7 Days
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="text-sm">
              30 Days
            </ToggleGroupItem>
            <ToggleGroupItem value="all" className="text-sm">
              All Time
            </ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>

      <CardContent className="pt-2">
        {loading ? (
          <Skeleton className="w-full h-[280px] rounded-xl bg-gray-100/40 animate-pulse" />
        ) : isEmpty ? (
          <div className="flex items-center justify-center h-[280px] text-gray-500 text-sm">
            No blog data available for this range.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorBlogs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} strokeOpacity={0.08} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                className="text-sm fill-gray-500"
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  background: '#fff',
                  fontSize: 14,
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
                }}
                labelStyle={{ fontWeight: 600, color: '#4b5563' }}
                formatter={(value: number) => [`${value} blogs`, ""]}
              />
              <Area
                type="monotone"
                dataKey="blogs"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorBlogs)"
                dot={{
                  stroke: "#6366f1",
                  strokeWidth: 2,
                  fill: "#fff",
                  r: 3,
                }}
                activeDot={{
                  r: 6,
                  stroke: "#4f46e5",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
