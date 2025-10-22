'use client'

import { useState } from 'react';
import { NavActions } from '@/components/nav-actions';
import { SectionCards } from '@/components/section-cards';
import { ChartItem } from './components/chart';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { DataTable } from "@/components/table/data-table";
import data from "../data.json";

export default function ClientPage() {
    const cardsData = [
      { title: 'Total Sales', price: '$25,000', imgUrl: '/Vector-4.svg', analitics: '+22%' },
      { title: 'Clientes', price: '920', imgUrl: '/Vector-5.svg', analitics: '-83%' },
      { title: 'Pedidos de hoje', price: '15.5K', imgUrl: '/Vector-6.svg', analitics: '24h' },
      { title: 'Total de Pedidos', price: '28%', imgUrl: '/Vector-8.svg', analitics: '30 dias' },
    ]

    const [title] = useState<string>("Orders");

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
        {/* the section of  cards with analitics and charts */}
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
          <div>
            <ChartItem />
          </div>
          <div className="">
            <DataTable data={data} />
          </div>
       </section>
    </div>
    </SidebarInset>
  );
}
