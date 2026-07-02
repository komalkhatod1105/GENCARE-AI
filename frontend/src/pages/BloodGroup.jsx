import { useState } from "react"
import { apiClient } from "@/lib/api"
import { Droplet, BarChart3, AlertCircle, CheckCircle } from "lucide-react"

export default function BloodGroup() {
  const [fatherBG, setFatherBG] = useState("")
  const [motherBG, setMotherBG] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

  const handlePredict = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.post("/predictions/blood-group", {
        fatherBG,
        motherBG,
      })
      setResult(response.data.prediction)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to predict blood group")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">Blood Group Predictor</h1>
        <p className="text-sm text-[#6B726C] mt-1">
          Enter parent blood groups to estimate offspring ABO possibilities and inheritance likelihoods.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <form onSubmit={handlePredict} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1D1C] mb-2">
                Father Blood Group
              </label>
              <select
                value={fatherBG}
                onChange={(e) => setFatherBG(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                required
              >
                <option value="">Select blood group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1D1C] mb-2">
                Mother Blood Group
              </label>
              <select
                value={motherBG}
                onChange={(e) => setMotherBG(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                required
              >
                <option value="">Select blood group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !fatherBG || !motherBG}
              className="w-full px-4 py-2.5 rounded-md bg-[#B91C1C] text-white hover:bg-[#991B1B] disabled:opacity-60 transition-colors font-medium"
            >
              {loading ? "Calculating..." : "Predict Child Blood Group"}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-semibold text-[#1A1D1C]">Possible Blood Groups</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {result.results?.probability?.map((item) => (
                <div
                  key={item.bloodGroup}
                  className="p-4 bg-[#FEE2E2] rounded-lg border border-[#FECACA]"
                >
                  <div className="text-2xl font-bold text-[#B91C1C]">{item.bloodGroup}</div>
                  <div className="text-sm text-[#6B726C]">{item.percentage}% probability</div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Explanation:</strong> {result.results?.explanation}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> These predictions are based on ABO and Rh blood group inheritance patterns. Always consult with a genetic counselor for detailed information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

