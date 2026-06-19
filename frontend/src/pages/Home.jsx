import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen p-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">Welcome to GeneCare.AI</h1>
        <p className="text-sm text-[#6B726C] mt-2">Choose a module to get started.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/blood-group" className="p-4 rounded-md bg-white border border-[#E5E1D8]">
            Blood Group Predictor
          </Link>
          <Link to="/genetic-risk" className="p-4 rounded-md bg-white border border-[#E5E1D8]">
            Genetic Risk
          </Link>
          <Link to="/diabetes-bp" className="p-4 rounded-md bg-white border border-[#E5E1D8]">
            Diabetes & BP
          </Link>
          <Link to="/medical-report" className="p-4 rounded-md bg-white border border-[#E5E1D8]">
            Medical Report Reader
          </Link>
        </div>
      </div>
    </div>
  )
}
