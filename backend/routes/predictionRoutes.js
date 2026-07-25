import express from "express"
import {
  predictBloodGroupController,
  predictDiabetes,
  predictBP,
  assessGeneticRiskController,
  predictBreastCancer,
  getPredictions,
  getPredictionById,
} from "../controllers/predictionController.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.post("/blood-group", authMiddleware, predictBloodGroupController)
router.post("/diabetes", authMiddleware, predictDiabetes)
router.post("/blood-pressure", authMiddleware, predictBP)
router.post("/genetic-risk", authMiddleware, assessGeneticRiskController)
router.post("/breast-cancer", authMiddleware, predictBreastCancer)
router.get("/", authMiddleware, getPredictions)
router.get("/:id", authMiddleware, getPredictionById)

export default router
