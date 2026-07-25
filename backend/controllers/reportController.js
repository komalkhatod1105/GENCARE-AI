import fs from "fs"
import path from "path"
import multer from "multer"
import Report from "../models/Report.js"

const uploadDir = path.resolve(process.cwd(), "uploads")
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`
    cb(null, uniqueName)
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
})

export const uploadReport = async (req, res) => {
  try {
    const { reportType, description, extractedText } = req.body
    const fileUrl = req.file?.path || req.body.fileUrl

    if (!fileUrl) {
      return res.status(400).json({ message: "File is required" })
    }

    const report = await Report.create({
      userId: req.userId,
      reportType,
      fileUrl,
      fileName: req.file?.originalname,
      description,
      extractedText,
      aiAnalysis: {
        summary: "Report received. AI analysis pending.",
        findings: [],
        recommendations: ["Consult with your healthcare provider"],
      },
    })

    res.status(201).json({
      message: "Report uploaded successfully",
      report,
      extractedText: extractedText || "No text extracted",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.userId }).sort({
      uploadDate: -1,
    })

    res.json({
      count: reports.length,
      reports,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)

    if (!report || report.userId.toString() !== req.userId) {
      return res.status(404).json({ message: "Report not found" })
    }

    res.json(report)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateReportAnalysis = async (req, res) => {
  try {
    const { aiAnalysis } = req.body

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { aiAnalysis },
      { new: true }
    )

    res.json({
      message: "Report analysis updated",
      report,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id)

    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }

    res.json({ message: "Report deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
