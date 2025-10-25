"use client";

import React, { useState, useRef } from "react";
import { X, Upload, RefreshCcw } from "lucide-react";
import { api } from "@/services/api";

interface ModalProps {
  onClose: () => void;
}

export default function AddProductModal({ onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.image) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/products/", {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image,
      });

      console.log("✅ Produto criado com sucesso:", data);
      alert("Produto adicionado com sucesso!");
      onClose();
    } catch (error: any) {
      console.error("❌ Erro ao adicionar produto:", error.response?.data || error.message);
      alert("Erro ao salvar produto. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[820px] max-h-[95vh] overflow-y-auto rounded-lg shadow-lg relative animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Adicionar Novo Produto</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Imagem do Produto</label>

            <div
              onClick={handleImageClick}
              className="border-2 border-dashed border-gray-300 rounded-md h-32 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50"
            >
              <Upload size={20} className="mr-2 text-orange-500" />
              Enviar uma imagem ou arraste e solte
            </div>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF até 5MB</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {formData.image && (
              <div className="mt-3">
                <img
                  src={formData.image}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Linha 2 */}
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Preço de Venda *"
              prefix="R$"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <Input
              label="Quantidade *"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
            />
            
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nome do Produto *"
              name="name"
              placeholder="Ex: Notebook Dell Inspiron 15"
              value={formData.name}
              onChange={handleChange}
            />
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className="w-full border rounded-md px-3 py-2 text-sm">
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descrição *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
              rows={2}
              placeholder="Descreva detalhes sobre o produto"
            ></textarea>
          </div>
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
            className="px-4 py-2 bg-sky-600 text-white rounded hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "..." : "Salvar produto"}
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
  prefix,
  iconRight,
  type = "text",
}: {
  label: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  prefix?: string;
  iconRight?: React.ReactNode;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">{prefix}</span>
        )}
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={`w-full border rounded-md px-3 py-2 text-sm ${
            prefix ? "pl-8" : ""
          }`}
        />
        {iconRight && <div className="absolute right-3 top-2.5 text-gray-400">{iconRight}</div>}
      </div>
    </div>
  );
}
