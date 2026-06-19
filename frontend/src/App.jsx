import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import AppLayout from "@/components/AppLayout"
import Landing from "@/pages/Landing"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Dashboard from "@/pages/Dashboard"
import BloodGroup from "@/pages/BloodGroup"
import GeneticRisk from "@/pages/GeneticRisk"
import DiabetesBP from "@/pages/DiabetesBP"
import BreastCancer from "@/pages/BreastCancer"
import MedicalReport from "@/pages/MedicalReport"
import BloodDonation from "@/pages/BloodDonation"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blood-group"
          element={
            <ProtectedRoute>
              <AppLayout>
                <BloodGroup />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/genetic-risk"
          element={
            <ProtectedRoute>
              <AppLayout>
                <GeneticRisk />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/diabetes-bp"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DiabetesBP />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/breast-cancer"
          element={
            <ProtectedRoute>
              <AppLayout>
                <BreastCancer />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/medical-report"
          element={
            <ProtectedRoute>
              <AppLayout>
                <MedicalReport />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blood-donation"
          element={
            <ProtectedRoute>
              <AppLayout>
                <BloodDonation />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
