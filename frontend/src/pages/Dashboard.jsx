export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[#6B726C]">Welcome back</p>
          <h1 className="text-3xl font-semibold text-[#1A1D1C]">Health Intelligence Dashboard</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <p className="text-sm text-[#6B726C]">Blood Group Predictor</p>
          <p className="mt-4 text-2xl font-semibold text-[#B91C1C]">ABO inheritance</p>
        </div>
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <p className="text-sm text-[#6B726C]">Genetic Risk</p>
          <p className="mt-4 text-2xl font-semibold text-[#B91C1C]">Family history</p>
        </div>
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <p className="text-sm text-[#6B726C]">Report Reader</p>
          <p className="mt-4 text-2xl font-semibold text-[#B91C1C]">Lab insights</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1D1C]">Next Step</h2>
          <p className="mt-2 text-sm text-[#6B726C]">
            Use the sidebar to open any risk module and view personalized guidance.
          </p>
        </div>
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1D1C]">Quick Actions</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#6B726C]">
            <li>• Check blood type compatibility</li>
            <li>• Review hereditary risk categories</li>
            <li>• Upload a medical report</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
