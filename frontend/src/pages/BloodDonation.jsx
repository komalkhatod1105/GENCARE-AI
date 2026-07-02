import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { apiClient } from "@/lib/api"
import { Droplet, AlertCircle, CheckCircle, Heart, MapPin, Calendar } from "lucide-react"

export default function BloodDonation() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("register")
  const [formData, setFormData] = useState({
    bloodGroup: user?.bloodGroup || "",
    weight: "",
    hasMedicalConditions: false,
    medicalConditions: "",
    previousDonationDate: "",
  })
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("")

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]
  const eligibilityAge = 18
  const eligibilityWeight = 50
  const daysBetweenDonations = 56

  useEffect(() => {
    if (activeTab === "find") {
      fetchDonors()
    }
  }, [activeTab, selectedBloodGroup])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const fetchDonors = async () => {
    try {
      setLoading(true)
      const url = selectedBloodGroup
        ? `/donations?bloodGroup=${selectedBloodGroup}`
        : "/donations"
      const response = await apiClient.get(url)
      setDonors(response.data.donors || [])
    } catch (err) {
      setError("Failed to fetch donor list")
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterDonor = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.bloodGroup || !formData.weight) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      const response = await apiClient.post("/donations", formData)
      setSuccess("Registration successful! Thank you for your willingness to donate.")
      setFormData({
        bloodGroup: user?.bloodGroup || "",
        weight: "",
        hasMedicalConditions: false,
        medicalConditions: "",
        previousDonationDate: "",
      })
      setTimeout(() => setSuccess(""), 5000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register")
    } finally {
      setLoading(false)
    }
  }

  const getEligibilityStatus = (donor) => {
    if (donor.previousDonationDate) {
      const lastDonation = new Date(donor.previousDonationDate)
      const nextEligible = new Date(lastDonation.getTime() + daysBetweenDonations * 24 * 60 * 60 * 1000)
      const today = new Date()
      if (today < nextEligible) {
        const daysLeft = Math.ceil((nextEligible - today) / (24 * 60 * 60 * 1000))
        return { eligible: false, message: `Eligible in ${daysLeft} days`, color: "yellow" }
      }
    }
    return { eligible: true, message: "Eligible to donate", color: "green" }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">Blood Donation Program</h1>
        <p className="text-sm text-[#6B726C] mt-1">
          Register as a donor or find compatible donors. Every drop saves a life.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E5E1D8]">
        <button
          onClick={() => setActiveTab("register")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "register"
              ? "border-[#B91C1C] text-[#B91C1C]"
              : "border-transparent text-[#6B726C] hover:text-[#1A1D1C]"
          }`}
        >
          <Heart className="w-5 h-5 inline mr-2" />
          Register as Donor
        </button>
        <button
          onClick={() => setActiveTab("find")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "find"
              ? "border-[#B91C1C] text-[#B91C1C]"
              : "border-transparent text-[#6B726C] hover:text-[#1A1D1C]"
          }`}
        >
          <MapPin className="w-5 h-5 inline mr-2" />
          Find Donors
        </button>
      </div>

      {/* Register Tab */}
      {activeTab === "register" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1A1D1C] mb-4">Donor Registration</h2>
            <form onSubmit={handleRegisterDonor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
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
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Minimum 50 kg required"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                  required
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hasMedicalConditions"
                  checked={formData.hasMedicalConditions}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#1A1D1C]">I have medical conditions</span>
              </label>

              {formData.hasMedicalConditions && (
                <div>
                  <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Please specify</label>
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    placeholder="List any medical conditions..."
                    className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                    rows="3"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">
                  Last Donation Date (optional)
                </label>
                <input
                  type="date"
                  name="previousDonationDate"
                  value={formData.previousDonationDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                />
              </div>

              {error && (
                <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="flex gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-md bg-[#B91C1C] text-white hover:bg-[#991B1B] disabled:opacity-60 font-medium"
              >
                {loading ? "Registering..." : "Register as Donor"}
              </button>
            </form>
          </div>

          {/* Eligibility Info */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-[#E5E1D8] bg-blue-50 border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Eligibility Criteria</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Age 18-65 years</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Weight minimum 50 kg</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Good general health</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>No serious medical conditions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Wait 56 days between donations</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#E5E1D8] bg-red-50 border-red-200 p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Donation Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">1</p>
                  <p className="text-xs text-red-700 mt-1">Donation Can Save 3 Lives</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">450</p>
                  <p className="text-xs text-red-700 mt-1">ml Blood per Donation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Find Tab */}
      {activeTab === "find" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {bloodGroups.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBloodGroup(bg === selectedBloodGroup ? "" : bg)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedBloodGroup === bg
                    ? "bg-[#B91C1C] text-white"
                    : "bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1D1C] hover:border-[#B91C1C]"
                }`}
              >
                {bg}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-[#6B726C]">Finding donors...</p>
            </div>
          ) : donors.length > 0 ? (
            <div className="grid gap-4">
              {donors.map((donor) => {
                const status = getEligibilityStatus(donor)
                return (
                  <div key={donor._id} className="rounded-lg border border-[#E5E1D8] bg-white p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplet className="w-5 h-5 text-[#B91C1C]" />
                          <p className="font-semibold text-[#1A1D1C]">{donor.bloodGroup}</p>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            status.color === 'green'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {status.message}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B726C]">Weight: {donor.weight} kg</p>
                        {donor.previousDonationDate && (
                          <p className="text-sm text-[#6B726C] flex items-center gap-1 mt-1">
                            <Calendar className="w-4 h-4" />
                            Last donated: {new Date(donor.previousDonationDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <button className="px-4 py-2 rounded-md bg-[#B91C1C] text-white text-sm hover:bg-[#991B1B] font-medium">
                        Contact
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-[#E5E1D8] bg-[#FAF9F6] p-8 text-center">
              <Droplet className="w-12 h-12 text-[#6B726C] mx-auto mb-3 opacity-50" />
              <p className="text-[#6B726C]">
                {selectedBloodGroup
                  ? `No donors found for ${selectedBloodGroup}`
                  : "Select a blood group to find donors"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

