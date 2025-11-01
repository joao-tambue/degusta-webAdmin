import axios from "axios";

const api = axios.create({
  baseURL: "https://degusta.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;