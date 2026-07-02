import { useState } from "react"
import { apiClient } from "@/lib/api"
import { FileText, Upload, AlertCircle, CheckCircle, Download, Loader } from "lucide-react"

export default function MedicalReport() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [previewText, setPreviewText] = useState("")

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setError("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await apiClient.post("/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setResult(response.data.report)
      setPreviewText(response.data.extractedText || "Text extraction not available")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze report")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#1A1D1C]">Medical Report Reader</h1>
        <p className="text-sm text-[#6B726C] mt-1">
          Upload lab reports, prescriptions, or medical documents. Our AI will extract and analyze key findings.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <div className="border-2 border-dashed border-[#E5E1D8] rounded-lg p-8 text-center hover:border-[#B91C1C] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-[#6B726C] mx-auto mb-2" />
                <p className="font-medium text-[#1A1D1C] mb-1">
                  {fileName || "Click to upload a file"}
                </p>
                <p className="text-xs text-[#6B726C]">PDF, JPG, or PNG (Max 10MB)</p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </div>
            </label>

            {error && (
              <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full px-4 py-2.5 rounded-md bg-[#B91C1C] text-white hover:bg-[#991B1B] disabled:opacity-60 font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Report"
              )}
            </button>
          </form>

          {/* Sample Reports */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-2">Supported Documents:</p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>✓ Blood test reports (CBC, Lipid panel, etc.)</li>
              <li>✓ X-rays and scan reports</li>
              <li>✓ Prescriptions and medication lists</li>
              <li>✓ Doctor's notes and discharge summaries</li>
            </ul>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="rounded-3xl border border-[#E5E1D8] bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-semibold text-[#1A1D1C]">Analysis Results</h2>
            </div>

            {/* Extracted Text Preview */}
            {previewText && (
              <div className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E5E1D8] max-h-48 overflow-y-auto">
                <p className="text-xs font-medium text-[#6B726C] mb-2">EXTRACTED TEXT:</p>
                <p className="text-sm text-[#1A1D1C] leading-relaxed whitespace-pre-wrap">
                  {previewText.substring(0, 500)}...
                </p>
              </div>
            )}

            {/* Key Findings */}
            <div className="space-y-2">
              <p className="font-medium text-[#1A1D1C]">Key Findings:</p>
              {result.findings && result.findings.length > 0 ? (
                <ul className="space-y-2">
                  {result.findings.map((finding, idx) => (
                    <li key={idx} className="flex gap-2 p-2 bg-[#FEE2E2] rounded border border-red-200">
                      <span className="text-sm font-medium text-red-700 flex-shrink-0">•</span>
                      <span className="text-sm text-red-700">{finding}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#6B726C] italic">No critical findings detected</p>
              )}
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Recommendations:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                {result.recommendations && result.recommendations.length > 0 ? (
                  result.recommendations.map((rec, idx) => (
                    <li key={idx}>✓ {rec}</li>
                  ))
                ) : (
                  <li>Continue regular health checkups</li>
                )}
              </ul>
            </div>

            {/* Download Summary */}
            <button className="w-full px-4 py-2 rounded-md border border-[#E5E1D8] text-[#1A1D1C] hover:bg-[#FAF9F6] font-medium flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Summary
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

