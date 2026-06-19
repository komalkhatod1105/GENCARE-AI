import React from "react"
import { Navigate } from "react-router-dom"

export default function Signup() {
  // Signup page redirects to /register which contains the form
  return <Navigate to="/register" replace />
}
