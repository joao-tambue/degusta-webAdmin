import { create } from "zustand";
import { api } from "@/services/api";

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
      console.log("✅ Usuário registrado:", response.data);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao registrar usuário.";
      set({ error: msg, loading: false });
      console.error("❌ Erro no register:", msg);
    }
  },

  // LOGIN
  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/auth/admin/login/", data);
      const { acess, refresh } = response.data;

      // Salva tokens no estado e localStorage
      set({
        accessToken: acess,
        refreshToken: refresh,
        loading: false,
      });

      localStorage.setItem("accessToken", acess);
      localStorage.setItem("refreshToken", refresh);

      console.log("✅ Login bem-sucedido:", response.data);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Telefone ou senha inválidos.";
      set({ error: msg, loading: false });
      console.error("❌ Erro no login:", msg);
    }
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));
