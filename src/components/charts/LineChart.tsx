"use client"

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { day: 16, visits: 800 },
  { day: 18, visits: 600 },
  { day: 20, visits: 1200 },
  { day: 22, visits: 1800 },
  { day: 24, visits: 2500 },
  { day: 26, visits: 1600 },
  { day: 28, visits: 2000 },
  { day: 30, visits: 2200 },
]

export default function TrafficChart() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-semibold text-gray-700">Tráfego</h2>
        <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">
          More →
        </button>
      </div>

      
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-800">1520</div>
        <p className="text-xs text-gray-500">
          Visitantes{" "}
          <span className="ml-1 px-2 py-0.5 text-orange-600 bg-orange-50 rounded-md font-medium">
            últimos 30 dias
          </span>
        </p>
      </div>

      <div className="h-48">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #eee",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#FF8901"
              strokeWidth={3}
              dot={{ r: 4, fill: "#FF8901" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
