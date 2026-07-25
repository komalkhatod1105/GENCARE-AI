import express from "express"
import {
  registerAsDonor,
  recordDonation,
  getDonorProfile,
  searchDonors,
} from "../controllers/donationController.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.post("/", authMiddleware, registerAsDonor)
router.post("/register", authMiddleware, registerAsDonor)
router.post("/record", authMiddleware, recordDonation)
router.get("/", authMiddleware, searchDonors)
router.get("/profile", authMiddleware, getDonorProfile)
router.get("/search", authMiddleware, searchDonors)

export default router
