"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Eye, Trash } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/orders/");
        const sorted = res.data.sort(
          (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setOrders(sorted);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-gray-500 text-sm p-6">Carregando pedidos...</div>;

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Lista de Pedidos</h2>
            <p className="text-sm text-gray-500">
              Visualize todos os pedidos realizados no sistema
            </p>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="min-w-[980px] w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 text-left border-b">
                <th className="py-3 pl-4 w-[160px]">Cliente</th>
                <th className="py-3">Email</th>
                <th className="py-3">Telefone</th>
                <th className="py-3">Status</th>
                <th className="py-3">Total</th>
                <th className="py-3">Endereço</th>
                <th className="py-3">Data</th>
                <th className="py-3 pr-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 pl-4 font-medium text-gray-800">
                    {order.customer?.name}
                  </td>
                  <td className="py-4">{order.customer?.email}</td>
                  <td className="py-4">{order.customer?.phone}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4">Kz {order.total}</td>
                  <td className="py-4 text-gray-600">{order.delivery_address}</td>
                  <td className="py-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <button
                      title="apagar"
                      className="p-2 rounded hover:bg-gray-100 text-gray-600"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
