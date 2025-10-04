"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Desktop", value: 830.03, color: "#FF4D4F", percent: "64.2%" },
  { name: "Mobile", value: 755.73, color: "#FF8901", percent: "48.6%" },
  { name: "Tablet", value: 550.81, color: "#00C6FF", percent: "15.3%" },
  { name: "Unknown", value: 150.84, color: "#7C3AED", percent: "3.8%" },
];

type Props = {
  absolutePosition?: boolean;
  className?: string;
};

export default function DonutChart({
  absolutePosition = false,
  className = "",
}: Props) {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const percent = Math.round((data[0].value / total) * 100);

  return (
    <div
      className={`${absolutePosition ? "absolute top-[694px] left-[192px]" : ""} ${className} w-[592px] h-[533px] rounded-[16px] bg-white shadow-md p-6 flex flex-col`}
    >
    
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-gray-700">
          Receita por dispositivo
        </h2>
        <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">
          More →
        </button>
      </div>

   
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-[260px] h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-700">
                {percent}%
              </div>
              <div className="text-xs text-gray-400">Desktop</div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-2 gap-y-4 mt-6">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between text-gray-600"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-gray-700 font-medium">
                ${item.value.toFixed(2)}
              </span>
              <span className="text-gray-400">{item.percent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
