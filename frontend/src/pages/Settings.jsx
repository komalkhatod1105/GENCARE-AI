import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiClient } from "@/lib/api"
import { AlertCircle, CheckCircle, Moon, Bell, Lock, Trash2, LogOut } from "lucide-react"

export default function Settings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("appearance")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem("darkMode") === "true",
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    appointmentReminders: true,
    newPasswordVisible: false,
    confirmPasswordVisible: false,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSettingChange = (key) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm({ ...passwordForm, [name]: value })
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      await apiClient.post("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      setSuccess("Password updated successfully!")
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("gc_token")
    navigate("/login")
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      await apiClient.delete("/auth/profile")
      localStorage.removeItem("gc_token")
      navigate("/")
    } catch (err) {
      setError("Failed to delete account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">Settings</h1>
        <p className="text-sm text-[#6B726C] mt-1">
          Customize your preferences and account security.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E5E1D8] overflow-x-auto">
        <button
          onClick={() => setActiveTab("appearance")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "appearance"
              ? "border-[#B91C1C] text-[#B91C1C]"
              : "border-transparent text-[#6B726C] hover:text-[#1A1D1C]"
          }`}
        >
          <Moon className="w-5 h-5 inline mr-2" />
          Appearance
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "notifications"
              ? "border-[#B91C1C] text-[#B91C1C]"
              : "border-transparent text-[#6B726C] hover:text-[#1A1D1C]"
          }`}
        >
          <Bell className="w-5 h-5 inline mr-2" />
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "security"
              ? "border-[#B91C1C] text-[#B91C1C]"
              : "border-transparent text-[#6B726C] hover:text-[#1A1D1C]"
          }`}
        >
          <Lock className="w-5 h-5 inline mr-2" />
          Security
        </button>
      </div>

      {/* Appearance Tab */}
      {activeTab === "appearance" && (
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1D1C] mb-4">Appearance</h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8]">
              <div>
                <p className="font-medium text-[#1A1D1C]">Dark Mode</p>
                <p className="text-sm text-[#6B726C] mt-1">Use dark theme for the application</p>
              </div>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={() => handleSettingChange("darkMode")}
                className="w-6 h-6"
              />
            </label>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                💡 Dark mode theme will be applied application-wide. Requires page reload to take effect.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1D1C] mb-4">Notification Preferences</h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8]">
              <div>
                <p className="font-medium text-[#1A1D1C]">Email Notifications</p>
                <p className="text-sm text-[#6B726C] mt-1">Receive updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleSettingChange("emailNotifications")}
                className="w-6 h-6"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8]">
              <div>
                <p className="font-medium text-[#1A1D1C]">Push Notifications</p>
                <p className="text-sm text-[#6B726C] mt-1">Browser notifications for alerts</p>
              </div>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleSettingChange("pushNotifications")}
                className="w-6 h-6"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8]">
              <div>
                <p className="font-medium text-[#1A1D1C]">Weekly Health Reports</p>
                <p className="text-sm text-[#6B726C] mt-1">Get weekly health summary</p>
              </div>
              <input
                type="checkbox"
                checked={settings.weeklyReports}
                onChange={() => handleSettingChange("weeklyReports")}
                className="w-6 h-6"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8]">
              <div>
                <p className="font-medium text-[#1A1D1C]">Appointment Reminders</p>
                <p className="text-sm text-[#6B726C] mt-1">Reminders before appointments</p>
              </div>
              <input
                type="checkbox"
                checked={settings.appointmentReminders}
                onChange={() => handleSettingChange("appointmentReminders")}
                className="w-6 h-6"
              />
            </label>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Password */}
          <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1A1D1C] mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#B91C1C]" />
              Change Password
            </h2>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">New Password</label>
                <input
                  type={settings.newPasswordVisible ? "text" : "password"}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1D1C] mb-2">Confirm Password</label>
                <input
                  type={settings.confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FECACA]/30"
                  required
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
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>

          {/* Logout */}
          <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1A1D1C] mb-4 flex items-center gap-2">
              <LogOut className="w-5 h-5 text-[#B91C1C]" />
              Session
            </h2>
            <p className="text-sm text-[#6B726C] mb-4">Sign out from your account</p>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2.5 rounded-md border-2 border-[#B91C1C] text-[#B91C1C] hover:bg-[#FEE2E2] font-medium"
            >
              Logout
            </button>
          </div>

          {/* Delete Account */}
          <div className="rounded-3xl border border-red-300 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              Delete Account
            </h2>
            <p className="text-sm text-red-700 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 font-medium"
            >
              {loading ? "Deleting..." : "Delete My Account"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
