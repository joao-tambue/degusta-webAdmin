"use client"

import { useState } from "react"
import api from "@/services/api"

type EditMotoboyModalProps = {
  motoboy: {
    id: number | string;
    name: string;
    phone_number: string;
    license_plate: string;
  };
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditMotoboyModal({ motoboy, onClose, onSuccess }: EditMotoboyModalProps) {
  const [name, setName] = useState(motoboy.name)
  const [phone, setPhone] = useState(motoboy.phone_number)
  const [plate, setPlate] = useState(motoboy.license_plate)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.put(`/admin/update-motoboy/${motoboy.id}`, {
        name,
        phone_number: phone,
        license_plate: plate,
      })
      onSuccess()
      onClose()
    } catch (err) {
      console.error("Erro ao atualizar motoboy:", err)
      alert("Erro ao atualizar motoboy")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Editar Motoboy</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Placa"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-sky-600 text-white rounded hover:brightness-95 disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
