import {ChevronDown , Ellipsis} from 'lucide-react'
import { NavActions } from '@/components/nav-actions';
export default function SalesAnalyticsPage() {
  return (
    <div>
        {/* the header of sales analytics page */}
       <header className='flex items-center justify-between py-4 px-6'>
           <h1 className='text-2xl font-semibold text-slate-800'>Orders</h1>
            <NavActions />
       </header>
    </div>
  );
}
