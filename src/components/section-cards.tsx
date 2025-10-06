import Image from "next/image"
type SectionCardsProps = {
    title: string;
    price: string;
    imgUrl: string;
    analitics: string;
    clients?: string;
}

 function getAnaliticsColor (title: string) {
    if (title === 'Clientes') {
        return '#E53935';
    } else if (title === 'Total Sales') {
        return '#FF8901';
    } else if (title === 'Total de Pedidos') {
        return '#FF8901';
    } else {
        return '#43A047';
    }

 }
export function SectionCards({title, price, imgUrl, analitics, clients}: SectionCardsProps) {
    const analiticsColor = getAnaliticsColor(title);
    return (
        <div className="bg-white max-w-2xs w-full max-h-28 h-full flex gap-2 
        justify-between items-center p-4 rounded-lg">
            <div className="flex flex-col gap-1">
                <h2 className="text-[14px] text-gray-500 font-medium">{title}</h2>
                <p className="text-2xl font-semibold text-slate-800">{price}</p>
                {clients &&<p className="text-2xl font-semibold text-slate-800">{clients}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <p style={{ color: analiticsColor }} 
                className="text-[14px] flex  justify-end"> 
                {analitics}
                </p>
                <Image src={imgUrl} alt={title} width={100} height={100} className="w-[75px] h-[30px]" />
            </div>
        </div>
    )
}
