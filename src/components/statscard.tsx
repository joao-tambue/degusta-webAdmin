"use client";

import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeColor: string;
  chart: ReactNode;
}

export default function StatsCard({ title, value, change, changeColor, chart }: StatsCardProps) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex flex-col gap-2 w-full">
      <div className="flex justify-between items-start">
        <span className="text-sm text-gray-500">{title}</span>
        <span className={`text-xs font-semibold ${changeColor}`}>{change}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="h-12">{chart}</div>
    </div>
  );
}
