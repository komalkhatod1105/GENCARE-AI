import express from "express"
import {
  registerAsDonor,
  recordDonation,
  getDonorProfile,
  searchDonors,
} from "../controllers/donationController.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.post("/register", authMiddleware, registerAsDonor)
router.post("/record", authMiddleware, recordDonation)
router.get("/profile", authMiddleware, getDonorProfile)
router.get("/search", searchDonors)

export default router
