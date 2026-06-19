import { createContext, useContext, useEffect, useState } from "react"
import { apiClient } from "@/lib/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gc_user"))
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("gc_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("gc_user")
    }
  }, [user])

  const login = async (email, password) => {
    const response = await apiClient.post("/auth/login", { email, password })
    const payload = response.data
    localStorage.setItem("gc_token", payload.token)
    setUser(payload)
    return payload
  }

  const register = async (name, email, password) => {
    const response = await apiClient.post("/auth/register", { name, email, password })
    const payload = response.data
    localStorage.setItem("gc_token", payload.token)
    setUser(payload)
    return payload
  }

  const logout = () => {
    localStorage.removeItem("gc_token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}
