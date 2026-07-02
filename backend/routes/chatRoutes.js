import express from "express"
import { chat, getChatHistory, clearChatHistory } from "../controllers/chatController.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.post("/", authMiddleware, chat)
router.get("/history", authMiddleware, getChatHistory)
router.delete("/history", authMiddleware, clearChatHistory)

export default router
