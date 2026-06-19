import React, { useState } from "react"

export default function DiseasePredictor() {
  const [familyHx, setFamilyHx] = useState(false)
  const [age, setAge] = useState(40)

  function risk() {
    let r = 5
    if (familyHx) r += 20
    if (age > 60) r += 10
    return r
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Disease Predictor (basic)</h1>

      <div className="mt-6 max-w-md">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={familyHx} onChange={(e) => setFamilyHx(e.target.checked)} />
          Family history of disease
        </label>

        <label className="block text-sm mt-4">Age</label>
        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border rounded" />

        <div className="mt-6 p-4 border rounded bg-white">
          <div className="text-sm text-[#6B726C]">Estimated risk (%)</div>
          <div className="text-xl font-semibold mt-1">{risk()}%</div>
        </div>
      </div>
    </div>
  )
}
