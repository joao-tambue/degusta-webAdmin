"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Plus, Phone, User, Hash, Edit3, Trash2 } from "lucide-react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { NavActions } from "@/components/nav-actions";
import { SectionCards } from "@/components/section-cards";
import AddMotoboyModal from "@/components/table/add-motoboy/add-motoboy-modal";
import EditMotoboyModal from "@/components/table/add-produto/edit-motoboy/edit-motoboy-modal";

const cardsData = [
  { title: "Total Sales", price: "$25,000", imgUrl: "/Vector-4.svg", analitics: "+22%" },
  { title: "Clientes", price: "920", imgUrl: "/Vector-5.svg", analitics: "-83%" },
  { title: "Pedidos de hoje", price: "15.5K", imgUrl: "/Vector-6.svg", analitics: "24h" },
  { title: "Total de Pedidos", price: "28%", imgUrl: "/Vector-8.svg", analitics: "30 dias" },
];

type Motoboy = {
  id: string;
  name: string;
  phone_number: string;
  license_plate: string;
};

export default function Motoboys() {
  const [title] = useState<string>("Dashboard");
  const [motoboys, setMotoboys] = useState<Motoboy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMotoboy, setSelectedMotoboy] = useState<Motoboy | null>(null)

  const fetchMotoboys = async () => {
    try {
      const response = await api.get("/admin/motoboys/");
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setMotoboys(data);
    } catch (err) {
      console.error("Erro ao buscar motoboys:", err);
      setError("Falha ao carregar lista de motoboys");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tens certeza que desejas excluir este motoboy?")) return;
    try {
      await api.delete(`/admin/delete-motoboy/${id}/`);
      setMotoboys((prev) => prev.filter((m) => m.id !== id));
      alert("Motoboy excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir motoboy:", error);
      alert("Erro ao excluir motoboy. Tente novamente.");
    }
  };

  const handleEdit = (motoboy: Motoboy) => {
    setSelectedMotoboy(motoboy);
    setShowEditModal(true);
};

  useEffect(() => {
    fetchMotoboys();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Carregando motoboys...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

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
                <BreadcrumbPage className="line-clamp-1">{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="ml-auto px-3">
          <NavActions />
        </div>
      </header>

      <div className="px-6">
        <section className="flex flex-col gap-5">
          {/* Cards do topo */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* Tabela de motoboys */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-semibold">Motoboys Cadastrados</h2>
                <p className="text-sm text-gray-500">
                  Lista dos entregadores ativos na plataforma
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-sky-600 text-white rounded px-3 py-1.5 text-sm shadow hover:brightness-95"
              >
                <Plus size={16} /> Adicionar Motoboy
              </button>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="min-w-[700px] w-full table-fixed text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 text-left border-b">
                    <th className="py-3 pl-4 w-[250px]">Nome</th>
                    <th className="py-3">Telefone</th>
                    <th className="py-3">Placa</th>
                    <th className="py-3 w-[100px] text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {motoboys.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 pl-4 flex items-center gap-2">
                        <User size={16} className="text-sky-500" />
                        <span className="font-medium text-gray-800">{m.name}</span>
                      </td>
                      <td className="py-4 flex items-center gap-2">
                        <Phone size={16} className="text-gray-500" />
                        <span>{m.phone_number}</span>
                      </td>
                      <td className="py-4 flex items-center gap-2">
                        <Hash size={16} className="text-gray-400" />
                        <span className="font-mono">{m.license_plate}</span>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleEdit(m)}
                            className="text-sky-600 hover:text-sky-800 transition"
                          >

                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(m.id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {motoboys.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        Nenhum motoboy encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {showModal && (
        <AddMotoboyModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchMotoboys}
        />
      )}
      {showEditModal && selectedMotoboy && (
        <EditMotoboyModal
          motoboy={selectedMotoboy}
          onClose={() => setShowEditModal(false)}
          onSuccess={fetchMotoboys}
        />
      )}
    </SidebarInset>
  );
}
