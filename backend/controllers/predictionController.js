import Prediction from "../models/Prediction.js"
import User from "../models/User.js"
import {
  predictBloodGroup,
  calculateDiabetesRisk,
  calculateBPRisk,
  assessGeneticRisk,
  calculateHealthScore,
} from "../utils/predictions.js"

export const predictBloodGroupController = async (req, res) => {
  try {
    const { fatherBG, motherBG } = req.body

    if (!fatherBG || !motherBG) {
      return res.status(400).json({ message: "Both parent blood groups are required" })
    }

    const result = predictBloodGroup(fatherBG, motherBG)

    const prediction = await Prediction.create({
      userId: req.userId,
      predictionType: "bloodGroup",
      inputs: { fatherBG, motherBG },
      results: result,
      confidence: 95,
    })

    res.status(201).json({
      message: "Blood group prediction successful",
      prediction,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const predictDiabetes = async (req, res) => {
  try {
    const inputs = req.body

    if (!inputs.glucose || !inputs.bmi || !inputs.age) {
      return res.status(400).json({ message: "Required fields missing" })
    }

    const result = calculateDiabetesRisk(inputs)

    const prediction = await Prediction.create({
      userId: req.userId,
      predictionType: "diabetes",
      inputs,
      results: result,
      riskScore: result.riskScore,
      confidence: result.confidence,
    })

    // Update user health score
    const user = await User.findById(req.userId)
    user.healthScore = calculateHealthScore(user)
    await user.save()

    res.status(201).json({
      message: "Diabetes risk prediction successful",
      prediction,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const predictBP = async (req, res) => {
  try {
    const inputs = req.body

    if (!inputs.age || !inputs.weight || !inputs.height) {
      return res.status(400).json({ message: "Required fields missing" })
    }

    const result = calculateBPRisk(inputs)

    const prediction = await Prediction.create({
      userId: req.userId,
      predictionType: "bloodPressure",
      inputs,
      results: result,
      riskScore: result.riskScore,
      confidence: result.confidence,
    })

    // Update user health score
    const user = await User.findById(req.userId)
    user.healthScore = calculateHealthScore(user)
    await user.save()

    res.status(201).json({
      message: "Blood pressure risk prediction successful",
      prediction,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const assessGeneticRiskController = async (req, res) => {
  try {
    const inputs = req.body

    const result = assessGeneticRisk(inputs)

    const prediction = await Prediction.create({
      userId: req.userId,
      predictionType: "geneticRisk",
      inputs,
      results: result,
      explanation: JSON.stringify(result.riskAssessment),
    })

    // Update user health score
    const user = await User.findById(req.userId)
    user.healthScore = calculateHealthScore(user)
    user.familyHistory = inputs.familyHistoryDiseases || []
    await user.save()

    res.status(201).json({
      message: "Genetic risk assessment completed",
      prediction,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.userId }).sort({
      createdAt: -1,
    })

    res.json({
      count: predictions.length,
      predictions,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPredictionById = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id)

    if (!prediction || prediction.userId.toString() !== req.userId) {
      return res.status(404).json({ message: "Prediction not found" })
    }

    res.json(prediction)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
