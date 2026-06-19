import React, { useState } from "react"

export default function DiabetesCalculator() {
  const [age, setAge] = useState(40)
  const [bmi, setBmi] = useState(25)

  function score() {
    let s = 0
    if (age > 45) s += 2
    if (bmi > 30) s += 2
    return s
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Diabetes Risk Calculator (simple)</h1>

      <div className="mt-6 max-w-md">
        <label className="block text-sm">Age</label>
        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border rounded" />

        <label className="block text-sm mt-4">BMI</label>
        <input type="number" value={bmi} onChange={(e) => setBmi(Number(e.target.value))} className="w-full p-2 border rounded" />

        <div className="mt-6 p-4 border rounded bg-white">
          <div className="text-sm text-[#6B726C]">Simple score</div>
          <div className="text-xl font-semibold mt-1">{score()}</div>
        </div>
      </div>
    </div>
  )
}
