"use client";

import { useState } from "react";
import { NavActions } from "@/components/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import StatsCard from "@/components/statscard";
import { LineChart, Line, ResponsiveContainer } from "recharts";


import SalesOverview from "@/components/ui/Overview";
import CartInfo from "@/components/ui/CartInfo";

import DonutChart from "@/components/charts/DountChart"; 
import TrafficChart from "@/components/charts/LineChart";
import CustomerList from "@/components/customerList";



const stats = [
  {
    title: "Total de vendas",
    value: "$7,825",
    change: "+22%",
    color: "text-orange-500",
    chartData: [
      { value: 400 },
      { value: 600 },
      { value: 300 },
      { value: 800 },
      { value: 500 },
    ],
    chartColor: "#fb923c",
  },
  {
    title: "Clientes",
    value: "920",
    change: "-25%",
    color: "text-red-500",
    chartData: [
      { value: 800 },
      { value: 600 },
      { value: 700 },
      { value: 400 },
      { value: 300 },
    ],
    chartColor: "#f87171",
  },
  {
    title: "Pedidos de hoje",
    value: "15.5K",
    change: "24h",
    color: "text-green-500",
    chartData: [
      { value: 200 },
      { value: 300 },
      { value: 400 },
      { value: 500 },
      { value: 450 },
    ],
    chartColor: "#34d399",
  },
  {
    title: "Total de pedidos",
    value: "28%",
    change: "30 dias",
    color: "text-orange-500",
    chartData: [
      { value: 100 },
      { value: 200 },
      { value: 150 },
      { value: 300 },
      { value: 250 },
    ],
    chartColor: "#fb923c",
  },
];

export default function Page() {
  const [title] = useState<string>("Dashboard");

  return (
      
      <SidebarInset>
     
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>


        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        
          <div className="flex gap-6 px-6 overflow-x-auto">
            {stats.map((stat, idx) => (
              <StatsCard
                key={idx}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeColor={stat.color}
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stat.chartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={stat.chartColor}
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                }
              />
            ))}
          </div>

      
          <div className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <SalesOverview />
              </div>
              <CartInfo />
            </div>

          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <DonutChart />
              <TrafficChart />
          <CustomerList/>
            </div>
          </div>
        </div>
      </SidebarInset>
    
  )
}
