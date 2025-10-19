// components/CustomerList.tsx
import { FC } from "react";
import { MoreHorizontal } from "lucide-react";

interface Customer {
  name: string;
  qty: string;
  date: string;
  receita: string;
  lucro: string;
  status: "Pending" | "Shipping" | "Refund" | "Completed";
}

const data: Customer[] = [
  { name: "Ana Júlia", qty: "x2", date: "Feb 5, 2020", receita: "$253.82", lucro: "$60.76", status: "Pending" },
  { name: "Bernardo Montiel", qty: "x3", date: "Sep 8, 2020", receita: "$552.24", lucro: "$66.41", status: "Shipping" },
  { name: "Afonso João", qty: "x3", date: "Dec 21, 2020", receita: "$115.26", lucro: "$95.66", status: "Refund" },
  { name: "Daniel Shieta", qty: "x2", date: "Aug 13, 2020", receita: "$675.51", lucro: "$84.80", status: "Completed" },
  { name: "Armindo João", qty: "x2", date: "May 8, 2020", receita: "$901.71", lucro: "$46.52", status: "Shipping" },
  { name: "Martins Montiel", qty: "x4", date: "Nov 15, 2020", receita: "$897.90", lucro: "$81.54", status: "Completed" },
  { name: "Rodrigo Gonsalve", qty: "x4", date: "Sep 14, 2020", receita: "$563.43", lucro: "$17.46", status: "Pending" },
  { name: "Maycke Brito", qty: "x3", date: "May 15, 2020", receita: "$883.98", lucro: "$43.08", status: "Refund" },
  { name: "Edgar Andre", qty: "x2", date: "Sep 12, 2020", receita: "$162.15", lucro: "$86.65", status: "Completed" },
  { name: "Maravilha Mara", qty: "x4", date: "Sep 20, 2020", receita: "$378.34", lucro: "$49.08", status: "Completed" },
];

const statusColors: Record<Customer["status"], string> = {
  Pending: "text-red-500",
  Shipping: "text-blue-500",
  Refund: "text-yellow-500",
  Completed: "text-green-500",
};

const CustomerList: FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full h-[830px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Lista de clientes</h2>
        <button className="text-sm text-gray-500 hover:text-gray-700">More</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4">QTY</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Receita</th>
              <th className="py-3 px-4">Lucro líquido</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <span>{item.name}</span>
                </td>
                <td className="py-3 px-4">{item.qty}</td>
                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4">{item.receita}</td>
                <td className="py-3 px-4">{item.lucro}</td>
                <td className={`py-3 px-4 font-medium ${statusColors[item.status]}`}>
                  {item.status}
                </td>
                <td className="py-3 px-4">
                  <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
