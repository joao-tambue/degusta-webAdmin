"use client"

import { MoreHorizontal, Edit, Trash } from "lucide-react"
import clsx from "clsx"
import orders from "@/data/orders.json"

const statusColors: Record<string, string> = {
  Pending: "text-orange-500 bg-orange-50",
  Shipping: "text-blue-500 bg-blue-50",
  Completed: "text-green-500 bg-green-50",
  Refund: "text-red-500 bg-red-50",
}

export default function OrdersTable() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-800 font-semibold text-lg">Últimos pedidos</h2>
        <button className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1">
          Mais →
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 text-left border-b border-gray-100">
            <th className="py-3 font-medium">Order ID</th>
            <th className="py-3 font-medium">Products</th>
            <th className="py-3 font-medium">Date</th>
            <th className="py-3 font-medium">Customer</th>
            <th className="py-3 font-medium">Revenue</th>
            <th className="py-3 font-medium">Net Profit</th>
            <th className="py-3 font-medium">Status</th>
            <th className="py-3 font-medium text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 text-gray-700 font-medium">{order.id}</td>
              <td className="py-3 flex items-center gap-1">
                {order.products.slice(0, 5).map((p, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-lg"
                  >
                    {p}
                  </div>
                ))}
                {order.products.length > 5 && (
                  <span className="text-gray-400 text-xs ml-1">
                    +{order.products.length - 5}
                  </span>
                )}
              </td>
              <td className="py-3 text-gray-500">{order.date}</td>
              <td className="py-3 text-gray-700">{order.customer}</td>
              <td className="py-3 font-medium text-gray-800">
                ${order.revenue.toFixed(2)}
              </td>
              <td className="py-3 text-gray-700">${order.netProfit.toFixed(2)}</td>
              <td className="py-3">
                <span
                  className={clsx(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    statusColors[order.status]
                  )}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-3 text-center flex items-center justify-center gap-2">
                <Edit className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <Trash className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
