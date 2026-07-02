import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ message: "User already exists" })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" })

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password")

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" })

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bloodGroup: user.profile?.bloodGroup,
        healthScore: user.healthScore,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { profile, medicalHistory, lifestyle } = req.body

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        profile: { ...profile },
        medicalHistory: { ...medicalHistory },
        lifestyle: { ...lifestyle },
      },
      { new: true }
    )

    res.json({
      message: "Profile updated successfully",
      user,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
