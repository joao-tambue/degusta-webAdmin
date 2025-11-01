"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Plus, Upload, Download, Edit2, Trash2, Eye } from "lucide-react"
import AddProductModal from "./add-produto/add-product-modal"
import api from "@/services/api"

type Product = {
  id: number
  name: string
  slug: string
  description: string
  price: string
  stock: string
  image: string
}

export default function InventoryTable() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const perPage = 8
  const totalPages = Math.ceil(items.length / perPage)
  const paginated = items.slice((page - 1) * perPage, page * perPage)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/get-products/")
        setItems(response.data)
      } catch (err: any) {
        console.error("Erro ao buscar produtos:", err)
        setError("Falha ao carregar produtos 😢")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="p-6 text-gray-600">Carregando produtos...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Inventário de produtos</h2>
            <p className="text-sm text-gray-500">
              Gerencie seus itens de estoque e níveis de inventário
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              <Upload size={16} /> Importar
            </button>
            <button className="flex items-center gap-2 border rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              <Download size={16} /> Exportar
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-sky-600 text-white rounded px-3 py-1.5 text-sm shadow hover:brightness-95"
            >
              <Plus size={16} /> Adicionar Produto
            </button>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="min-w-[980px] w-full table-fixed text-sm">
            <thead>
              <tr className="text-xs text-gray-500 text-left border-b">
                <th className="py-3 pl-4 w-[260px]">Produto</th>
                <th className="py-3">Estoque</th>
                <th className="py-3">Descrição</th>
                <th className="py-3">Valor</th>
                <th className="py-3 pr-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-4 pl-4 flex items-center gap-3 align-middle">
                    <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-orange-500 font-bold">📦</div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.slug}</div>
                    </div>
                  </td>
                  <td className="py-4">{p.stock}</td>
                  <td className="py-4 text-gray-600 text-xs">
                    {p.description}
                  </td>
                  <td className="py-4">{p.price}</td>
                  <td className="py-4 pr-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <IconButton title="Ver" Icon={Eye} />
                      <IconButton title="Editar" Icon={Edit2} />
                      <IconButton title="Remover" Icon={Trash2} danger />
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 text-center text-gray-500"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-600">
            Mostrando{" "}
            <span className="font-medium">{(page - 1) * perPage + 1}</span> -{" "}
            <span className="font-medium">
              {Math.min(page * perPage, items.length)}
            </span>{" "}
            de <span className="font-medium">{items.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded border"
            >
              ‹
            </button>
            <div className="px-3 py-1">{page}</div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded border"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

// Componente de botão
function IconButton({ title, Icon, danger }: { title: string; Icon: any; danger?: boolean }) {
  return (
    <button
      title={title}
      className={`w-8 h-8 rounded flex items-center justify-center border ${
        danger
          ? "border-red-100 text-red-600 hover:bg-red-50"
          : "border-gray-100 text-gray-600 hover:bg-gray-50"
      }`}
    >
      <Icon size={14} />
    </button>
  )
}
