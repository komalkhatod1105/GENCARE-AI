import React, { useState } from "react"

export default function BPAnalyzer() {
  const [systolic, setSystolic] = useState(120)
  const [diastolic, setDiastolic] = useState(80)

  function category() {
    if (systolic < 120 && diastolic < 80) return "Normal"
    if (systolic < 130 && diastolic < 80) return "Elevated"
    if (systolic < 140 || diastolic < 90) return "Stage 1 Hypertension"
    return "Stage 2 Hypertension"
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Blood Pressure Analyzer</h1>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
        <div>
          <label className="block text-sm">Systolic</label>
          <input type="number" value={systolic} onChange={(e) => setSystolic(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Diastolic</label>
          <input type="number" value={diastolic} onChange={(e) => setDiastolic(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="mt-6 p-4 border rounded max-w-md bg-white">
        <div className="text-sm text-[#6B726C]">Category</div>
        <div className="text-xl font-semibold mt-1">{category()}</div>
      </div>
    </div>
  )
}
