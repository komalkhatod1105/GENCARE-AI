import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { apiClient } from "@/lib/api"
import {
  Droplet,
  Dna,
  Activity,
  Heart,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()
  const [userData, setUserData] = useState(null)
  const [predictions, setPredictions] = useState([])
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [profileRes, predictionsRes, reportsRes] = await Promise.all([
          apiClient.get("/auth/profile"),
          apiClient.get("/predictions"),
          apiClient.get("/reports"),
        ])

        setUserData(profileRes.data)
        setPredictions(predictionsRes.data.predictions || [])
        setReports(reportsRes.data.reports || [])
      } catch (err) {
        setError("Failed to load dashboard data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getHealthScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-50"
    if (score >= 60) return "bg-yellow-50"
    return "bg-red-50"
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-[#E5E1D8] rounded-3xl"></div>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-[#E5E1D8] rounded-3xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <p className="text-sm text-[#6B726C]">Welcome back</p>
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">
          {user?.name ? `${user.name}'s Health Dashboard` : "Health Intelligence Dashboard"}
        </h1>
      </div>

      {error && (
        <div className="flex gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Health Score Card */}
      {userData && (
        <div className={`rounded-3xl border border-[#E5E1D8] p-6 ${getHealthScoreBgColor(userData.healthScore || 0)}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B726C] mb-1">Overall Health Score</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-bold ${getHealthScoreColor(userData.healthScore || 0)}`}>
                  {Math.round(userData.healthScore || 0)}
                </span>
                <span className="text-2xl text-[#6B726C]">/100</span>
              </div>
            </div>
            <Heart className={`w-16 h-16 ${getHealthScoreColor(userData.healthScore || 0)} opacity-20`} />
          </div>
          <div className="mt-4 w-full bg-gray-300 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                userData.healthScore >= 80
                  ? "bg-green-600"
                  : userData.healthScore >= 60
                    ? "bg-yellow-600"
                    : "bg-red-600"
              }`}
              style={{ width: `${userData.healthScore || 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border border-[#E5E1D8] bg-white p-4">
          <p className="text-xs text-[#6B726C] uppercase tracking-wide">Blood Group</p>
          <p className="text-2xl font-bold text-[#B91C1C] mt-2">{userData?.profile?.bloodGroup || "—"}</p>
        </div>
        <div className="rounded-lg border border-[#E5E1D8] bg-white p-4">
          <p className="text-xs text-[#6B726C] uppercase tracking-wide">BMI</p>
          <p className="text-2xl font-bold text-[#1A1D1C] mt-2">
            {userData?.profile?.height && userData?.profile?.weight
              ? (
                  userData.profile.weight / ((userData.profile.height / 100) * (userData.profile.height / 100))
                ).toFixed(1)
              : "—"}
          </p>
        </div>
        <div className="rounded-lg border border-[#E5E1D8] bg-white p-4">
          <p className="text-xs text-[#6B726C] uppercase tracking-wide">Predictions</p>
          <p className="text-2xl font-bold text-[#1A1D1C] mt-2">{predictions.length}</p>
        </div>
        <div className="rounded-lg border border-[#E5E1D8] bg-white p-4">
          <p className="text-xs text-[#6B726C] uppercase tracking-wide">Reports</p>
          <p className="text-2xl font-bold text-[#1A1D1C] mt-2">{reports.length}</p>
        </div>
      </div>

      {/* Recent Predictions */}
      {predictions.length > 0 && (
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1D1C] mb-4">Recent Risk Assessments</h2>
          <div className="space-y-3">
            {predictions.slice(0, 3).map((pred) => (
              <div key={pred._id} className="flex items-center justify-between p-3 bg-[#FAF9F6] rounded-lg">
                <div className="flex items-center gap-3">
                  {pred.predictionType === "bloodGroup" && <Droplet className="w-5 h-5 text-[#B91C1C]" />}
                  {pred.predictionType === "diabetes" && <Activity className="w-5 h-5 text-[#B91C1C]" />}
                  {pred.predictionType === "bloodPressure" && <Heart className="w-5 h-5 text-[#B91C1C]" />}
                  {pred.predictionType === "geneticRisk" && <Dna className="w-5 h-5 text-[#B91C1C]" />}
                  <div>
                    <p className="font-medium text-[#1A1D1C] capitalize">
                      {pred.predictionType.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-xs text-[#6B726C]">{formatDate(pred.createdAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  {pred.riskScore && (
                    <p className={`font-bold ${pred.riskScore >= 70 ? "text-red-600" : pred.riskScore >= 40 ? "text-yellow-600" : "text-green-600"}`}>
                      {pred.riskScore}%
                    </p>
                  )}
                  {pred.confidence && <p className="text-xs text-[#6B726C]">{pred.confidence}% confidence</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1A1D1C] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            to="/blood-group"
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-[#E5E1D8] hover:bg-[#FEE2E2] transition-colors"
          >
            <Droplet className="w-6 h-6 text-[#B91C1C] mb-2" />
            <span className="text-xs font-medium text-center">Blood Group</span>
          </Link>
          <Link
            to="/genetic-risk"
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-[#E5E1D8] hover:bg-[#FEE2E2] transition-colors"
          >
            <Dna className="w-6 h-6 text-[#B91C1C] mb-2" />
            <span className="text-xs font-medium text-center">Genetic Risk</span>
          </Link>
          <Link
            to="/diabetes-bp"
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-[#E5E1D8] hover:bg-[#FEE2E2] transition-colors"
          >
            <Activity className="w-6 h-6 text-[#B91C1C] mb-2" />
            <span className="text-xs font-medium text-center">Risk Check</span>
          </Link>
          <Link
            to="/medical-report"
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-[#E5E1D8] hover:bg-[#FEE2E2] transition-colors"
          >
            <FileText className="w-6 h-6 text-[#B91C1C] mb-2" />
            <span className="text-xs font-medium text-center">Upload Report</span>
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-3xl border border-[#E5E1D8] bg-blue-50 border-blue-200 p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Health Tips
        </h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>✓ Stay hydrated - drink at least 8 glasses of water daily</li>
          <li>✓ Exercise for 30 minutes daily to maintain cardiovascular health</li>
          <li>✓ Get 7-8 hours of quality sleep every night</li>
          <li>✓ Eat a balanced diet rich in vegetables and whole grains</li>
        </ul>
      </div>
    </div>
  )
}

