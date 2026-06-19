export default function MedicalReport() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-[#1A1D1C]">Medical Report Reader</h1>
      <p className="text-sm text-[#6B726C]">
        Parse lab results, highlight out-of-range values, and explain what the numbers mean.
      </p>
      <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
        <p className="text-[#1A1D1C]">Upload your report or enter values to get a health summary.</p>
      </div>
    </div>
  )
}
