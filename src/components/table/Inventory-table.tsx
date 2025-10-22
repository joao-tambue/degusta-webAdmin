"use client"

import React, { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Plus, Upload, Download, Edit2, Trash2, Eye } from "lucide-react"

/**
 * InventoryTable (Next 15 + React + Tailwind)
 * -------------------------------------------------
 * - Assumes you place a JSON file at: /public/data/orders.json
 *   (example JSON provided at the bottom of this file).
 * - Copy this component into `components/InventoryTable.tsx` and
 *   import it on a client page (example: app/inventory/page.tsx).
 * - Uses Tailwind classes for pixel-accurate layout similar to the screenshot.
 * - Icons from `lucide-react` (install: `npm i lucide-react`).
 */

type Product = {
  id: string
  name: string
  code: string
  description: string
  supplier: string
  category: string
  price: string
  status: "Ativo" | "Inativo"
  image?: string
}

export default function InventoryTable() {
  const [items, setItems] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const perPage = 8

  useEffect(() => {
    // fetch from public/data/orders.json
    fetch('/data/orders.json')
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch(() => {
        // fallback if fetch fails: small embedded dataset
        setItems(sampleData)
      })
  }, [])

  const totalPages = Math.max(1, Math.ceil(items.length / perPage))
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage
    return items.slice(start, start + perPage)
  }, [items, page])

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Inventário de produtos</h2>
            <p className="text-sm text-gray-500">Gerencie seus itens de estoque e níveis de inventário</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              <Upload size={16} /> Importar
            </button>
            <button className="flex items-center gap-2 border rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              <Download size={16} /> Exportar
            </button>
            <button className="flex items-center gap-2 bg-sky-600 text-white rounded px-3 py-1.5 text-sm shadow hover:brightness-95">
              <Plus size={16} /> Adicionar Produto
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="min-w-[980px] w-full table-fixed text-sm">
            <thead>
              <tr className="text-xs text-gray-500 text-left border-b">
                <th className="py-3 pl-4 w-[260px]">Produto</th>
                <th className="py-3">Quantidade</th>
                <th className="py-3 ">Descrição</th>
                <th className="py-3">Fornecedor</th>
                <th className="py-3">Categoria</th>
                <th className="py-3">Valor</th>
                <th className="py-3">Status</th>
                <th className="py-3 pr-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr key={p.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 pl-4 flex items-center gap-3 align-middle">
                    <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden">
                      {p.image ? (
                        // Next's Image can be used if images are local/static
                        <Image src={p.image} alt={p.name} width={40} height={40} className="object-cover" />
                      ) : (
                        <div className="text-orange-500 font-bold">📦</div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.category} • {p.supplier}</div>
                    </div>
                  </td>

                  <td className="py-4">{p.quantidade}</td>

                  <td className="py-4 text-gray-600 text-xs">{p.description}</td>

                  <td className="py-4">{p.supplier}</td>

                  <td className="py-4">{p.category}</td>

                  <td className="py-4">{p.price}</td>

                  <td className="py-4">
                    <StatusBadge status={p.status} />
                  </td>

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
                  <td colSpan={8} className="py-8 text-center text-gray-500">Nenhum produto encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-600">Mostrando <span className="font-medium">{(page-1)*perPage + 1}</span> - <span className="font-medium">{Math.min(page*perPage, items.length)}</span> de <span className="font-medium">{items.length}</span></div>

          <div className="flex items-center gap-2">
            <nav className="inline-flex items-center gap-1">
              <button onClick={() => setPage(1)} disabled={page===1} className="px-3 py-1 rounded border disabled:opacity-50">1</button>
              <button onClick={() => setPage((p) => Math.max(1, p-1))} className="px-3 py-1 rounded border">‹</button>
              <div className="px-3 py-1">{page}</div>
              <button onClick={() => setPage((p) => Math.min(totalPages, p+1))} className="px-3 py-1 rounded border">›</button>
              <button onClick={() => setPage(totalPages)} disabled={page===totalPages} className="px-3 py-1 rounded border disabled:opacity-50">{totalPages}</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

function IconButton({ title, Icon, danger }: { title: string; Icon: any; danger?: boolean }) {
  return (
    <button title={title} className={`w-8 h-8 rounded flex items-center justify-center border ${danger ? 'border-red-100 text-red-600 hover:bg-red-50' : 'border-gray-100 text-gray-600 hover:bg-gray-50'}`}>
      <Icon size={14} />
    </button>
  )
}

function StatusBadge({ status }: { status: Product['status'] }) {
  const isActive = status === 'Ativo'
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {status}
    </span>
  )
}

// Small fallback dataset (keeps component usable if JSON missing)
const sampleData: Product[] = [
  {
    id: '1',
    name: 'Peixe frito',
    quantidade: 'PRD-001',
    description: 'Caixa plástica...',
    supplier: 'Distribuidora Alfa',
    category: 'Eletrônicos',
    price: 'R$48,99',
    status: 'Ativo',
  },
  {
    id: '2',
    name: 'Massa com Tudo',
    quantidade: 'PRD-002',
    description: 'Smartwatch com monitor...',
    supplier: 'Distribuidora Alfa',
    category: 'Eletrônicos',
    price: 'R$149,99',
    status: 'Inativo',
  },
  {
    id: '3',
    name: 'Feijão preto',
    quantidade: 'PRD-003',
    description: 'Camera compacta...',
    supplier: 'Distribuidora Alfa',
    category: 'Eletrônicos',
    price: 'R$349,99',
    status: 'Ativo',
  },
  {
    id: '4',
    name: 'Arroz de sal',
    quantidade: 'PRD-004',
    description: 'Perfume floral 100ml',
    supplier: 'Distribuidora Alfa',
    category: 'Beleza',
    price: 'R$89,90',
    status: 'Ativo',
  },
]

/* ---------------------------------------------------------------------------
  Exemplo de arquivo JSON (coloque em: public/data/orders.json)

  [
    {
      "id": "1",
      "name": "Caixa Organizadora",
      "code": "PRD-001",
      "description": "Caixa plástica de 20L com tampa e alças laterais",
      "supplier": "Distribuidora Alfa",
      "category": "Eletrônicos",
      "price": "R$48,99",
      "status": "Ativo",
      "image": "/images/caixa.png"
    },
    {
      "id": "2",
      "name": "Smartwatch",
      "code": "PRD-002",
      "description": "Smartwatch com monitor cardíaco e notificações",
      "supplier": "Distribuidora Alfa",
      "category": "Eletrônicos",
      "price": "R$149,99",
      "status": "Inativo",
      "image": "/images/smartwatch.png"
    }
  ]

  Dicas:
  - Coloque imagens em `public/images/` e referencie-as no JSON com `/images/xxx.png`.
  - Se preferir o JSON dentro do projeto (não public), você pode importar:
      import orders from '../../data/orders.json'
    mas lembre-se que imports de JSON em Next 15 podem ser tratadas como estáticas e aumentam o bundle — por isso o `public/` approach é preferível.

  - Para a página do app (app/inventory/page.tsx):
      import InventoryTable from '@/components/InventoryTable'
      export default function Page() { return <InventoryTable /> }

  - Instale dependências: `npm i lucide-react` e configure Tailwind (se ainda não)
----------------------------------------------------------------------------*/
