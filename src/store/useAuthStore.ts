"use client";

import { create } from "zustand";
import api from "@/services/api";

interface User {
  name?: string;
  email?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  login: (data: { phone: string; password: string }) => Promise<void>;
  getUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,

  // REGISTRO
  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/auth/admin/register/", data);
      set({ user: response.data, loading: false });
      console.log("Usuário registrado:", response.data);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao registrar usuário.";
      set({ error: msg, loading: false });
      console.error("Erro no register:", msg);
    }
  },

  // LOGIN
login: async (data) => {
  set({ loading: true, error: null });
  try {
    const response = await api.post("/auth/admin/login/", data);
    const { access, refresh } = response.data;

    if (typeof window !== "undefined") {
      // Armazena no localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Armazena também nos cookies — pro middleware conseguir ler
      document.cookie = `token=${access}; path=/; max-age=86400; SameSite=Lax`;
    }

    set({
      accessToken: access,
      refreshToken: refresh,
      loading: false,
    });

    console.log("Login bem-sucedido:", response.data);
  } catch (error: any) {
    const msg =
      error.response?.data?.message || "Telefone ou senha inválidos.";
    set({ error: msg, loading: false });
    console.error("Erro no login:", msg);
  }
},


  // GET USER
  getUser: async () => {
    set({ loading: true, error: null });

    try {
      let token: string | null = null;

      if (typeof window !== "undefined") {
        token = localStorage.getItem("accessToken");
      }

      if (!token) {
        set({ loading: false });
        return;
      }

      const response = await api.get("/auth/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: response.data, loading: false });
      console.log("Usuário logado:", response.data);
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      set({ error: "Erro ao buscar informações do usuário", loading: false });
    }
  },

  // LOGOUT
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));

// Inicializa tokens no cliente
if (typeof window !== "undefined") {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useAuthStore.setState({ accessToken, refreshToken });
}
