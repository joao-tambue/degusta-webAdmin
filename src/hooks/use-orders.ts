// src/hooks/useOrders.ts
"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Customer {
  id: number;
  email: string;
  name: string;
  phone: string;
  is_active: boolean;
}

interface Invoice {
  id: number;
  invoice_number: string;
  issued_at: string;
  due_date: string | null;
  total: string;
  billing_name: string;
  billing_address: string;
  billing_email: string;
  billing_cpf_cnpj: string;
  pdf_url: string;
  order: number;
  created_at?: string;
}

interface OrderItem {
  id: number;
  product: number;
  qty: number;
  price: string;
}

export interface Order {
  id: number;
  customer: Customer;
  status: string;
  total: string;
  delivery_address: string;
  invoice: Invoice;
  created_at: string;
  items: OrderItem[];
}

export function useOrders(limit?: number) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get("/admin/orders/");
        let data: Order[] = response.data;

        // ordenar por data mais recente
        data = data.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        // limitar se necessário (para dashboard)
        if (limit) data = data.slice(0, limit);

        setOrders(data);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [limit]);

  return { orders, loading };
}