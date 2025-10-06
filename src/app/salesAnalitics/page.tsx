import { NavActions } from '@/components/nav-actions';
import { SectionCards } from '@/components/section-cards';

export default function SalesAnalyticsPage() {
    const cardsData = [
      { title: 'Total Sales', price: '$25,000', imgUrl: 'Vector-4.svg', analitics: '+22%' },
      { title: 'Clientes', price: '920', imgUrl: 'Vector-5.svg', analitics: '-83%' },
      { title: 'Pedidos de hoje', price: '15.5K', imgUrl: 'Vector-6.svg', analitics: '24h' },
      { title: 'Total de Pedidos', price: '28%', imgUrl: 'Vector-8.svg', analitics: '30 dias' },
    ]
  return (
    <div className='flex flex-col h-full py-4 px-6'>
        {/* the header of sales analytics page */}
       <header className='flex items-center justify-between '>
           <h1 className='text-2xl font-semibold text-slate-800'>Orders</h1>
            <NavActions />
       </header>
        {/* the section of  cards with analitics and charts */}
       <section>
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
       </section>
    </div>
  );
}
