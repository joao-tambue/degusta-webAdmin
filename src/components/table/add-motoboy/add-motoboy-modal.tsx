"use client";

import React, { useState } from "react";
import { X, RefreshCcw, User, Phone, Hash } from "lucide-react";
import api from "@/services/api";

interface ModalProps {
  onClose: () => void;
  onSuccess?: () => void; // callback pra recarregar lista após adicionar
}

export default function AddMotoboyModal({ onClose, onSuccess }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    license_plate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, phone_number, license_plate } = formData;

    if (!name || !phone_number || !license_plate) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/admin/motoboys/", formData);
      console.log("✅ Motoboy criado com sucesso:", data);
      alert("Motoboy adicionado com sucesso!");
      onClose();
      onSuccess?.();
    } catch (error: any) {
      console.error("❌ Erro ao adicionar motoboy:", error.response?.data || error.message);
      alert("Erro ao salvar motoboy. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[500px] rounded-lg shadow-lg relative animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Adicionar Novo Motoboy</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <Input
            label="Nome *"
            name="name"
            placeholder="Ex: João Pedro"
            value={formData.name}
            onChange={handleChange}
            iconRight={<User size={16} />}
          />

          <Input
            label="Telefone *"
            name="phone_number"
            placeholder="Ex: 912345678"
            value={formData.phone_number}
            onChange={handleChange}
            iconRight={<Phone size={16} />}
          />

          <Input
            label="Placa *"
            name="license_plate"
            placeholder="Ex: ANG-12-12-LD"
            value={formData.license_plate}
            onChange={handleChange}
            iconRight={<Hash size={16} />}
          />
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-sky-600 text-white rounded hover:brightness-95 disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCcw size={16} className="animate-spin" /> Salvando...
              </>
            ) : (
              "Salvar Motoboy"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  iconRight,
}: {
  label: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  iconRight?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-md px-3 py-2 text-sm pr-8 focus:ring-2 focus:ring-sky-500 outline-none"
        />
        {iconRight && <div className="absolute right-3 top-2.5 text-gray-400">{iconRight}</div>}
      </div>
    </div>
  );
}