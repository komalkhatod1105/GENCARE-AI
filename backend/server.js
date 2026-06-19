import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const dbStatus = {
  connected: false,
  error: null,
}

const mongoUri = process.env.MONGO_URI
if (mongoUri) {
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      dbStatus.connected = true
      console.log("MongoDB connected")
    })
    .catch((error) => {
      dbStatus.error = error.message
      console.error("MongoDB connection error:", error.message)
    })
} else {
  console.log("No MONGO_URI configured. Using in-memory auth store.")
}

app.get("/", (req, res) => {
  res.send("GeneCare AI Backend Running")
})

app.get("/api/test", (req, res) => {
  res.json({ status: "ok" })
})

app.get("/api/db-status", (req, res) => {
  res.json({
    connected: dbStatus.connected,
    error: dbStatus.error,
    mongoUriConfigured: Boolean(mongoUri),
  })
})

app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" })
  }

  const existing = users.find((user) => user.email === email.toLowerCase())
  if (existing) {
    return res.status(409).json({ message: "User already exists" })
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    token: `token-${Date.now()}`,
  }

  users.push({ ...newUser, password })
  return res.status(201).json(newUser)
})

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  const user = users.find(
    (record) => record.email === email.toLowerCase() && record.password === password,
  )

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" })
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: user.token,
  })
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})
