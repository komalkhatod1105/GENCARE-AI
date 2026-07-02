import { useState } from "react"
import { apiClient } from "@/lib/api"
import { Activity, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"

export default function DiabetesBP() {
  const [activeTab, setActiveTab] = useState("diabetes")
  const [diabetesData, setDiabetesData] = useState({
    glucose: "",
    bmi: "",
    age: "",
    insulin: "",
    pregnancies: "",
    bloodPressure: "",
    skinThickness: "",
  })
  const [bpData, setBpData] = useState({
    age: "",
    weight: "",
    height: "",
    exercisePerWeek: "",
    smokingStatus: "none",
    heartRate: "",
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDiabetesChange = (e) => {
    const { name, value } = e.target
    setDiabetesData({ ...diabetesData, [name]: value })
  }

  const handleBpChange = (e) => {
    const { name, value } = e.target
    setBpData({ ...bpData, [name]: value })
  }

  const handleDiabetesSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.post("/predictions/diabetes", diabetesData)
      setResult({ type: "diabetes", data: response.data.prediction })
    } catch (err) {
      setError(err.response?.data?.message || "Failed to calculate diabetes risk")
    } finally {
      setLoading(false)
    }
  }

  const handleBpSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.post("/predictions/blood-pressure", bpData)
      setResult({ type: "bp", data: response.data.prediction })
    } catch (err) {
      setError(err.response?.data?.message || "Failed to calculate blood pressure risk")
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (riskLevel) => {
    if (!riskLevel) return "bg-gray-50"
    if (riskLevel === "High") return "bg-red-50"
    if (riskLevel === "Medium") return "bg-yellow-50"
    return "bg-green-50"
  }

  const getRiskTextColor = (riskLevel) => {
    if (!riskLevel) return "text-gray-700"
    if (riskLevel === "High") return "text-red-700"
    if (riskLevel === "Medium") return "text-yellow-700"
    return "text-green-700"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">Diabetes & Blood Pressure Risk</h1>
        <p className="text-sm text-[#6B726C] mt-1">
          Calculate your risk levels for diabetes and high blood pressure based on your health metrics.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E5E1D8]">
        <button
          onClick={() => setActiveTab("diabetes")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "diabetes"
              ? "border-[#B91C1C] text-[#B91C1C]"
              : "border-transparent text-[#6B726C] hover:text-[#1A1D1C]"
          }`}
        >
          Diabetes Risk
        </button>
        <button
          onClick={() => setActiveTab("bp")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "bp"
              ? "border-[#B91C1C] text-[#B91C1C]"
              : "border-transparent text-[#6B726C] hover:text-[#1A1D1C]"
          }`}
        >
          Blood Pressure Risk
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Diabetes Tab */}
        {activeTab === "diabetes" && (
          <>
            <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
              <form onSubmit={handleDiabetesSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1D1C] mb-2">
                    Glucose Level (mg/dL)
                  </label>
                  <input
                    type="number"
                    name="glucose"
                    value={diabetesData.glucose}
                    onChange={handleDiabetesChange}
                    placeholder="e.g., 120"
                    className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">BMI</label>
                    <input
                      type="number"
                      name="bmi"
                      value={diabetesData.bmi}
                      onChange={handleDiabetesChange}
                      placeholder="e.g., 25"
                      step="0.1"
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={diabetesData.age}
                      onChange={handleDiabetesChange}
                      placeholder="e.g., 35"
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Insulin</label>
                    <input
                      type="number"
                      name="insulin"
                      value={diabetesData.insulin}
                      onChange={handleDiabetesChange}
                      placeholder="e.g., 15"
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Blood Pressure</label>
                    <input
                      type="number"
                      name="bloodPressure"
                      value={diabetesData.bloodPressure}
                      onChange={handleDiabetesChange}
                      placeholder="e.g., 120"
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                    />
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
                  {loading ? "Calculating..." : "Calculate Risk"}
                </button>
              </form>
            </div>

            {result?.type === "diabetes" && (
              <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#1A1D1C]">Risk Assessment</h2>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>

                <div className={`p-4 rounded-lg ${getRiskColor(result.data.results.riskLevel)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Risk Level</span>
                    <span className={`text-2xl font-bold ${getRiskTextColor(result.data.results.riskLevel)}`}>
                      {result.data.results.riskLevel}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#B91C1C] h-2 rounded-full"
                      style={{ width: `${result.data.results.riskScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{result.data.results.riskScore}% Risk Score</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs font-medium text-blue-900 mb-2">Recommendations:</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    {result.data.results.recommendations?.map((rec, idx) => (
                      <li key={idx}>• {rec}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-700">
                    <strong>Confidence:</strong> {result.data.confidence}%
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Blood Pressure Tab */}
        {activeTab === "bp" && (
          <>
            <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
              <form onSubmit={handleBpSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={bpData.age}
                      onChange={handleBpChange}
                      placeholder="e.g., 40"
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={bpData.weight}
                      onChange={handleBpChange}
                      placeholder="e.g., 75"
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={bpData.height}
                      onChange={handleBpChange}
                      placeholder="e.g., 175"
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Heart Rate (bpm)</label>
                    <input
                      type="number"
                      name="heartRate"
                      value={bpData.heartRate}
                      onChange={handleBpChange}
                      placeholder="e.g., 72"
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Exercise (days/week)</label>
                    <input
                      type="number"
                      name="exercisePerWeek"
                      value={bpData.exercisePerWeek}
                      onChange={handleBpChange}
                      placeholder="e.g., 3"
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Smoking Status</label>
                    <select
                      name="smokingStatus"
                      value={bpData.smokingStatus}
                      onChange={handleBpChange}
                      className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                    >
                      <option value="none">Never</option>
                      <option value="former">Former</option>
                      <option value="current">Current</option>
                    </select>
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
                  {loading ? "Calculating..." : "Calculate Risk"}
                </button>
              </form>
            </div>

            {result?.type === "bp" && (
              <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#1A1D1C]">BP Risk Assessment</h2>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>

                <div className={`p-4 rounded-lg ${getRiskColor(result.data.results.bpStage)}`}>
                  <div className="text-sm font-medium mb-2">Blood Pressure Stage</div>
                  <div className={`text-xl font-bold ${getRiskTextColor(result.data.results.bpStage)}`}>
                    {result.data.results.bpStage}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-[#B91C1C] h-2 rounded-full"
                      style={{ width: `${result.data.results.riskScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{result.data.results.riskScore}% Risk Score</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs font-medium text-blue-900 mb-2">Recommendations:</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    {result.data.results.recommendations?.map((rec, idx) => (
                      <li key={idx}>• {rec}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-700">
                    <strong>Confidence:</strong> {result.data.confidence}%
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
