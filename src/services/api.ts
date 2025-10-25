import axios from "axios";

export const api = axios.create({
  baseURL: "https://degusta.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
