import Prediction from "../models/Prediction.js"
import User from "../models/User.js"
import {
  predictBloodGroup,
  calculateDiabetesRisk,
  calculateBPRisk,
  assessGeneticRisk,
  calculateBreastCancerRisk,
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

    const user = await User.findById(req.userId)
    if (user) {
      user.healthScore = calculateHealthScore({
        ...user.toObject(),
        height: user.profile?.height,
        weight: user.profile?.weight,
      })
      await user.save()
    }

    res.status(201).json({
      message: "Diabetes risk prediction successful",
      prediction: {
        ...prediction.toObject(),
        results: result,
      },
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

    const user = await User.findById(req.userId)
    if (user) {
      user.healthScore = calculateHealthScore({
        ...user.toObject(),
        height: user.profile?.height,
        weight: user.profile?.weight,
      })
      await user.save()
    }

    res.status(201).json({
      message: "Blood pressure risk prediction successful",
      prediction: {
        ...prediction.toObject(),
        results: result,
      },
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

    const user = await User.findById(req.userId)
    if (user) {
      user.healthScore = calculateHealthScore({
        ...user.toObject(),
        height: user.profile?.height,
        weight: user.profile?.weight,
      })
      user.familyHistory = (inputs.familyHistoryDiseases || []).map((condition) => ({
        relation: "self",
        condition,
      }))
      await user.save()
    }

    res.status(201).json({
      message: "Genetic risk assessment completed",
      prediction: {
        ...prediction.toObject(),
        results: {
          ...result,
          riskAssessment: result.riskAssessment,
          overallRiskLevel: result.overallRiskLevel,
          recommendations: result.recommendations,
        },
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const predictBreastCancer = async (req, res) => {
  try {
    const inputs = req.body

    if (!inputs.age) {
      return res.status(400).json({ message: "Age is required" })
    }

    const result = calculateBreastCancerRisk(inputs)

    const prediction = await Prediction.create({
      userId: req.userId,
      predictionType: "breastCancer",
      inputs,
      results: result,
      riskScore: result.riskScore,
      riskLevel: result.riskLevel,
      explanation: result.explanation,
      recommendations: result.recommendations,
    })

    res.status(201).json({
      message: "Breast cancer risk assessment completed",
      prediction: {
        ...prediction.toObject(),
        results: result,
      },
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
