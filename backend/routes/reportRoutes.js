import express from "express"
import {
  uploadReport,
  getReports,
  getReportById,
  updateReportAnalysis,
  deleteReport,
} from "../controllers/reportController.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.post("/upload", authMiddleware, uploadReport)
router.get("/", authMiddleware, getReports)
router.get("/:id", authMiddleware, getReportById)
router.put("/:id/analysis", authMiddleware, updateReportAnalysis)
router.delete("/:id", authMiddleware, deleteReport)

export default router
