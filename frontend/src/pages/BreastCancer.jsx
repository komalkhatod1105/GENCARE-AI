import { useState } from "react"
import { apiClient } from "@/lib/api"
import { AlertCircle, CheckCircle, Zap } from "lucide-react"

export default function BreastCancer() {
  const [formData, setFormData] = useState({
    age: "",
    menarche_age: "",
    first_pregnancy_age: "",
    num_pregnancies: "",
    breast_feeding_months: "",
    num_births: "",
    family_history: false,
    menopause_status: "pre",
    hormone_therapy: false,
    alcohol_consumption: "none",
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.post("/predictions/breast-cancer", formData)
      setResult(response.data.prediction)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assess risk")
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (score) => {
    if (score >= 70) return "text-red-700"
    if (score >= 40) return "text-yellow-700"
    return "text-green-700"
  }

  const getRiskBgColor = (score) => {
    if (score >= 70) return "bg-red-50"
    if (score >= 40) return "bg-yellow-50"
    return "bg-green-50"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">Breast Cancer Risk Assessment</h1>
        <p className="text-sm text-[#6B726C] mt-1">
          Evaluate your breast cancer risk based on personal and family history factors.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g., 45"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Menopause Status</label>
                <select
                  name="menopause_status"
                  value={formData.menopause_status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                >
                  <option value="pre">Pre-menopausal</option>
                  <option value="peri">Peri-menopausal</option>
                  <option value="post">Post-menopausal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Age at Menarche</label>
                <input
                  type="number"
                  name="menarche_age"
                  value={formData.menarche_age}
                  onChange={handleChange}
                  placeholder="e.g., 12"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Age at 1st Pregnancy</label>
                <input
                  type="number"
                  name="first_pregnancy_age"
                  value={formData.first_pregnancy_age}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Number of Births</label>
                <input
                  type="number"
                  name="num_births"
                  value={formData.num_births}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Breastfeeding (months)</label>
                <input
                  type="number"
                  name="breast_feeding_months"
                  value={formData.breast_feeding_months}
                  onChange={handleChange}
                  placeholder="e.g., 12"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Alcohol Consumption</label>
              <select
                name="alcohol_consumption"
                value={formData.alcohol_consumption}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
              >
                <option value="none">Never</option>
                <option value="occasional">Occasional</option>
                <option value="moderate">Moderate</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="family_history"
                  checked={formData.family_history}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#1A1D1C]">Family history of breast cancer</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hormone_therapy"
                  checked={formData.hormone_therapy}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#1A1D1C]">Current hormone replacement therapy</span>
              </label>
            </div>

            {error && (
              <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-md bg-[#B91C1C] text-white hover:bg-[#991B1B] disabled:opacity-60 font-medium"
            >
              {loading ? "Assessing..." : "Assess Risk"}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-semibold text-[#1A1D1C]">Risk Assessment</h2>
            </div>

            <div className={`p-4 rounded-lg ${getRiskBgColor(result.riskScore || 0)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-[#1A1D1C]">Risk Score</span>
                <span className={`font-bold text-lg ${getRiskColor(result.riskScore || 0)}`}>
                  {result.riskScore || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${result.riskScore >= 70 ? "bg-red-600" : result.riskScore >= 40 ? "bg-yellow-600" : "bg-green-600"}`}
                  style={{ width: `${result.riskScore || 0}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Risk Level: {result.riskLevel || "Normal"}</p>
              <p className="text-sm text-blue-800 leading-relaxed">{result.explanation || ""}</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Recommendations:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                {result.recommendations && result.recommendations.length > 0 ? (
                  result.recommendations.map((rec, idx) => (
                    <li key={idx}>✓ {rec}</li>
                  ))
                ) : (
                  <li>Maintain regular mammography screenings</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
