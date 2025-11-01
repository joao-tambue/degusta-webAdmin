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
import { SectionCards } from "@/components/section-cards";
import ChartRadialText from "@/components/charts/chart-radial-text";
import ChartPieDonutText from "@/components/charts/chart-pie-donut-text";
import ChartLineDots from "@/components/charts/chart-line-dots";


import SalesOverview from "@/components/ui/Overview";
import { DataTable } from "@/components/table/data-table";
import data from "./data.json";

const cardsData = [
      { title: 'Total Sales', price: '$25,000', imgUrl: '/Vector-4.svg', analitics: '+22%' },
      { title: 'Clientes', price: '920', imgUrl: '/Vector-5.svg', analitics: '-83%' },
      { title: 'Pedidos de hoje', price: '15.5K', imgUrl: '/Vector-6.svg', analitics: '24h' },
      { title: 'Total de Pedidos', price: '28%', imgUrl: '/Vector-8.svg', analitics: '30 dias' },
    ];

export default function Page() {
  const [title] = useState<string>("Dashboard");

  return (

    <SidebarInset className="bg-[#F8F8F8]">
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

      <div className='px-6'>
        <section className='flex flex-col gap-5'>
          <div className=' mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {cardsData.map((c, i) => (
              <SectionCards  
                key={i}
                title={c.title}
                price={c.price}
                imgUrl={c.imgUrl}
                analitics={c.analitics}
              />  
            ))}
          </div>
          <div className="flex flex-col gap-[32px]">
            <div className="flex gap-[32px]">
              <SalesOverview />
              <ChartRadialText />
            </div>
            <div className="flex gap-[32px]">
              <ChartPieDonutText />
              <ChartLineDots />
            </div>
            <div className="">
              <DataTable data={data} />
            </div>
          </div>
        </section>
      </div>
    </SidebarInset>
    
  )
}