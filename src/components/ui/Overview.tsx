"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "20", sales: 4000 },
  { day: "22", sales: 8500 },
  { day: "24", sales: 6000 },
  { day: "26", sales: 7000 },
  { day: "28", sales: 4500 },
  { day: "30", sales: 5000 },
  { day: "02", sales: 8700 },
  { day: "04", sales: 4000, highlighted: true }, 
  { day: "06", sales: 3500 },
  { day: "08", sales: 7500 },
  { day: "10", sales: 5000 },
  { day: "12", sales: 4000 },
  { day: "14", sales: 4600 },
  { day: "16", sales: 4300 },
];


const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  const isHighlighted = payload.highlighted;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={4}
      ry={4}
      fill={isHighlighted ? "#f43f5e" : "#f97316"} 
    />
  );
};

export default function SalesOverview() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-semibold text-lg">Overview de vendas</h2>
        <a href="#" className="text-sm text-gray-400 hover:text-blue-500">
          Advanced Report →
        </a>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="30%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="sales"
              shape={<CustomBar />}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
