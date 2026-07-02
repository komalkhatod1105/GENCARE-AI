import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import predictionRoutes from "./routes/predictionRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"
import donationRoutes from "./routes/donationRoutes.js"
import medicineRoutes from "./routes/medicineRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: "50mb", extended: true }))

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/gencare"
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✓ MongoDB connected")
  })
  .catch((error) => {
    console.error("✗ MongoDB connection error:", error.message)
  })

// Health Check
app.get("/", (req, res) => {
  res.send("GeneCare AI Backend Running")
})

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  })
})

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/predictions", predictionRoutes)
app.use("/api/reports", reportRoutes)
app.use("/api/donations", donationRoutes)
app.use("/api/medicines", medicineRoutes)
app.use("/api/chat", chatRoutes)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Internal server error", error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`)
})
