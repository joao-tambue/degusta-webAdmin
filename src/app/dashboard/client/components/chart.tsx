'use client'
import { ArrowRight } from "lucide-react"
import { LineChart ,
     CartesianGrid,
     Line,
      XAxis,
    YAxis } from "recharts"
import { ChartConfig
     , ChartContainer,
      ChartTooltip,
       ChartTooltipContent } from "@/components/ui/chart"
const chartConfig: ChartConfig = {
    dinheiro:{
        label:'K'
    }
    

    } satisfies ChartConfig
   const data = [
  { month: 'Jan', value: 130_000 },       
  { month: 'Feb', value: 2_300_000 },      
  { month: 'Mar', value: 527_000_90 },          
  { month: 'Apr', value: 925_000 },        
  { month: 'May', value: 35_000 },          
  { month: 'Jun', value: 245_30_000 },          
  { month: 'Jul', value: 410_000 },         
  { month: 'Aug', value: 10_895_000 },       
  { month: 'Sep', value: 50_000 },          
  { month: 'Oct', value: 4_545_000 },         
  { month: 'Nov', value: 160_000_000 },      
  { month: 'Dec', value: 1_000_000 },   
]
export function ChartItem(){

 function formatNumber(value: number): string {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B"
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M"
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "K"
  return value.toString()
}

    return (
     <div className="bg-white w-full p-4 max-h-[510px] h-full rounded-lg flex 
      flex-col gap-5 justify-between mt-3.5">
     <div className=" flex justify-between items-center">
        <div className="flex items-center gap-2 font-normal">
            <span className="w-2 h-2 bg-[#FF8901] rounded-full"></span>
        <h1>Atualizações de pedidos</h1>
     </div>
        <div className="flex items-center gap-1 text-sm text-slate-800 font-semibold">
            <p>View details</p>
            <ArrowRight size={16}/>
        </div>
     </div>
     <section className="h-[310px] w-full">
        <ChartContainer config={chartConfig.dinheiro} className="h-full w-full">
        <LineChart data={data}
        accessibilityLayer
        margin={{ left: 10, right: 0, top:0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}  />
          <XAxis dataKey="month" 
          tickLine= {false} 
          axisLine= {false} 
          tickMargin={15}
          tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis 
          tickLine={false}
          axisLine={false}
          tickMargin={20}
        tickFormatter={(value) => formatNumber(value)}

          />
          <ChartTooltip 
          cursor={false}
           content={<ChartTooltipContent hideLabel />} 
           formatter={(v : number) => formatNumber(v) }
           />
          <Line 
          type="basis"
           dataKey="value" 
           stroke="#FF8901"
          strokeWidth={2}
          dot= {false} />
        </LineChart>
     </ChartContainer>
     </section>
     </div>
    )
}