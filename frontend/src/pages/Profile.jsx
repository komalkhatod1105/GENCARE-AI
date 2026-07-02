import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { apiClient } from "@/lib/api"
import { AlertCircle, CheckCircle, User, Mail, Phone, MapPin, Heart } from "lucide-react"

export default function Profile() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    bloodGroup: user?.bloodGroup || "",
    phone: user?.phone || "",
    address: user?.address || "",
    emergencyContact: user?.emergencyContact || "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response = await apiClient.put("/auth/profile", formData)
      setSuccess("Profile updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">My Profile</h1>
        <p className="text-sm text-[#6B726C] mt-1">
          Manage your personal and medical information.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1 rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#FEE2E2] flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-[#B91C1C]" />
            </div>
            <h2 className="text-xl font-semibold text-[#1A1D1C]">{user?.name}</h2>
            <p className="text-sm text-[#6B726C] mt-1">{user?.email}</p>
            
            {user?.bloodGroup && (
              <div className="mt-4 px-4 py-2 bg-red-50 rounded-lg border border-red-200 w-full">
                <p className="text-xs text-red-600 uppercase tracking-wide">Blood Group</p>
                <p className="text-2xl font-bold text-red-600">{user?.bloodGroup}</p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <div className="md:col-span-2 rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md text-[#6B726C] opacity-60 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Emergency Contact</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Emergency contact number"
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your full address"
                className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                rows="3"
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>

      {/* Medical History */}
      <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1A1D1C] mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#B91C1C]" />
          Medical History
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8]">
            <p className="text-sm text-[#6B726C] uppercase tracking-wide">Chronic Conditions</p>
            <p className="text-[#1A1D1C] mt-2 text-sm">None reported</p>
          </div>
          <div className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8]">
            <p className="text-sm text-[#6B726C] uppercase tracking-wide">Allergies</p>
            <p className="text-[#1A1D1C] mt-2 text-sm">None reported</p>
          </div>
          <div className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8]">
            <p className="text-sm text-[#6B726C] uppercase tracking-wide">Current Medications</p>
            <p className="text-[#1A1D1C] mt-2 text-sm">None reported</p>
          </div>
          <div className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8]">
            <p className="text-sm text-[#6B726C] uppercase tracking-wide">Last Checkup</p>
            <p className="text-[#1A1D1C] mt-2 text-sm">Not recorded</p>
          </div>
        </div>
      </div>
    </div>
  )
}
