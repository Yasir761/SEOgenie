"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { date: "Jul 1", blogs: 2 },
  { date: "Jul 2", blogs: 3 },
  { date: "Jul 3", blogs: 5 },
  { date: "Jul 4", blogs: 1 },
]

export default function UsageChart() {
  return (
    <div className="mt-6 w-full bg-white rounded-xl shadow px-4 py-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Blogs Generated Over Time
      </h3>
      <div className="w-full h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="blogs"
              stroke="#6366f1"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
