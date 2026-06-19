import React, { useState } from "react"

const possibilities = {
  O: { O: ["O"], A: ["A","O"], B: ["B","O"], AB: ["A","B"] },
  A: { O: ["A","O"], A: ["A","O"], B: ["A","B","O"], AB: ["A","B"] },
  B: { O: ["B","O"], A: ["A","B","O"], B: ["B","O"], AB: ["A","B"] },
  AB: { O: ["A","B"], A: ["A","B"], B: ["A","B"], AB: ["A","B"] },
}

export default function BloodPredictor() {
  const [p1, setP1] = useState("A")
  const [p2, setP2] = useState("B")

  const result = possibilities[p1][p2] || []

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Blood Group Predictor</h1>

      <div className="mt-6 max-w-md grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Parent 1</label>
          <select value={p1} onChange={(e) => setP1(e.target.value)} className="w-full p-2 border rounded">
            <option>A</option>
            <option>B</option>
            <option>AB</option>
            <option>O</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Parent 2</label>
          <select value={p2} onChange={(e) => setP2(e.target.value)} className="w-full p-2 border rounded">
            <option>A</option>
            <option>B</option>
            <option>AB</option>
            <option>O</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 border rounded max-w-md bg-white">
        <div className="text-sm text-[#6B726C]">Possible child blood groups</div>
        <div className="text-xl font-semibold mt-1">{result.join(", ") || "Unknown"}</div>
      </div>
    </div>
  )
}
