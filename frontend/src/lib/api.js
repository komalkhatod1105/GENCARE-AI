import axios from "axios"

export const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
export const API = `${API_BASE}/api`

export const apiClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("gc_token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export function formatError(err) {
  const detail = err?.response?.data?.detail

  if (!detail) return err?.message || "Something went wrong"

  if (typeof detail === "string") return detail

  if (Array.isArray(detail)) {
    return detail.map((d) => d.msg).join(", ")
  }

  return JSON.stringify(detail)
}
