import { useState } from "react"
import { apiClient } from "@/lib/api"
import { Dna, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"

export default function GeneticRisk() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    smokingStatus: "none",
    alcoholConsumption: "none",
    exercisePerWeek: "",
    familyHistoryDiseases: [],
    existingDiseases: [],
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const diseases = [
    "Diabetes",
    "Heart Disease",
    "Cancer",
    "Stroke",
    "Hypertension",
    "Kidney Disease",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (disease, field) => {
    const current = formData[field]
    if (current.includes(disease)) {
      setFormData({
        ...formData,
        [field]: current.filter((d) => d !== disease),
      })
    } else {
      setFormData({
        ...formData,
        [field]: [...current, disease],
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.post("/predictions/genetic-risk", formData)
      setResult(response.data.prediction)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assess genetic risk")
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (score) => {
    if (score >= 70) return "text-red-700"
    if (score >= 50) return "text-yellow-700"
    return "text-green-700"
  }

  const getRiskBgColor = (score) => {
    if (score >= 70) return "bg-red-50"
    if (score >= 50) return "bg-yellow-50"
    return "bg-green-50"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">Genetic Risk Assessment</h1>
        <p className="text-sm text-[#6B726C] mt-1">
          Comprehensive assessment of your hereditary disease risk based on lifestyle and family history.
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
                  placeholder="e.g., 35"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g., 175"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 75"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Smoking</label>
                <select
                  name="smokingStatus"
                  value={formData.smokingStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                >
                  <option value="none">Never</option>
                  <option value="former">Former</option>
                  <option value="occasional">Occasional</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Alcohol</label>
                <select
                  name="alcoholConsumption"
                  value={formData.alcoholConsumption}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                >
                  <option value="none">Never</option>
                  <option value="occasional">Occasional</option>
                  <option value="frequent">Frequent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Exercise (days/week)</label>
              <input
                type="number"
                name="exercisePerWeek"
                value={formData.exercisePerWeek}
                onChange={handleChange}
                placeholder="e.g., 3"
                className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Family History</label>
              <div className="space-y-2">
                {diseases.map((disease) => (
                  <label key={disease} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.familyHistoryDiseases.includes(disease)}
                      onChange={() => handleCheckboxChange(disease, "familyHistoryDiseases")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-[#1A1D1C]">{disease}</span>
                  </label>
                ))}
              </div>
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
              {loading ? "Analyzing..." : "Assess Genetic Risk"}
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

            <div className="space-y-3">
              {result.results?.riskAssessment &&
                Object.entries(result.results.riskAssessment).map(([disease, score]) => (
                  <div key={disease} className={`p-4 rounded-lg ${getRiskBgColor(score)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize text-[#1A1D1C]">{disease.replace(/([A-Z])/g, " $1")}</span>
                      <span className={`font-bold text-lg ${getRiskColor(score)}`}>{Math.round(score)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${score >= 70 ? "bg-red-600" : score >= 50 ? "bg-yellow-600" : "bg-green-600"}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Recommendations:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                {result.results?.recommendations?.map((rec, idx) => (
                  <li key={idx}>✓ {rec}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                <strong>Overall Risk Level:</strong> {result.results?.overallRiskLevel}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
