import React from "react"

export default function RiskChart({ predictions = [] }) {
  const safePredictions = Array.isArray(predictions) ? predictions : []

  const chartData = safePredictions.slice(0, 6).map((item) => {
    const score = Number(item?.riskScore ?? item?.results?.riskScore ?? 0)
    const label = item?.predictionType || "Assessment"

    return {
      label: label.replace(/([A-Z])/g, " $1").trim(),
      score: Number.isFinite(score) ? score : 0,
    }
  })

  const maxScore = Math.max(100, ...chartData.map((item) => item.score), 0)

  return (
    <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1A1D1C]">Risk Trend</h2>
          <p className="text-sm text-[#6B726C]">Recent health risk scores</p>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="rounded-lg bg-[#FAF9F6] p-4 text-sm text-[#6B726C]">
          No risk predictions yet. Complete a health assessment to see your progress.
        </div>
      ) : (
        <div className="space-y-4">
          {chartData.map((item) => (
            <div key={`${item.label}-${item.score}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#1A1D1C]">{item.label}</span>
                <span className="text-sm text-[#6B726C]">{item.score}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#F3EDE7]">
                <div
                  className={`h-2.5 rounded-full ${
                    item.score >= 70 ? "bg-red-600" : item.score >= 40 ? "bg-yellow-500" : "bg-green-600"
                  }`}
                  style={{ width: `${(item.score / maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
