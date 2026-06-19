import React, { useState } from "react"

export default function ReportAnalyzer() {
  const [text, setText] = useState("")

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Medical Report Analyzer</h1>

      <div className="mt-6 max-w-2xl">
        <label className="block text-sm">Paste report text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border rounded h-40" />

        <div className="mt-4 p-4 border rounded bg-white">
          <div className="text-sm text-[#6B726C]">Analysis</div>
          <div className="mt-2 text-sm">{text ? "(Basic parser would run here)" : "Enter report to analyze."}</div>
        </div>
      </div>
    </div>
  )
}
