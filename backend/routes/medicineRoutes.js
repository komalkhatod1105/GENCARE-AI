import express from "express"
import {
  addMedicineReminder,
  getMedicineReminders,
  updateMedicineReminder,
  markMedicineTaken,
  deleteMedicineReminder,
} from "../controllers/medicineController.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.post("/", authMiddleware, addMedicineReminder)
router.get("/", authMiddleware, getMedicineReminders)
router.put("/:id", authMiddleware, updateMedicineReminder)
router.post("/:id/taken", authMiddleware, markMedicineTaken)
router.delete("/:id", authMiddleware, deleteMedicineReminder)

export default router
