import { useAuth } from "@/contexts/AuthContext"

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return children
  }

  return children
}
