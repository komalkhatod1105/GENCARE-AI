// Blood Group Inheritance Logic (ABO System)
export const predictBloodGroup = (fatherBG, motherBG) => {
  const bgMap = {
    "O+": { alleles: ["i", "i"], rh: "+" },
    "O-": { alleles: ["i", "i"], rh: "-" },
    "A+": { alleles: ["I_A", "i"] || ["I_A", "I_A"], rh: "+" },
    "A-": { alleles: ["I_A", "i"] || ["I_A", "I_A"], rh: "-" },
    "B+": { alleles: ["I_B", "i"] || ["I_B", "I_B"], rh: "+" },
    "B-": { alleles: ["I_B", "i"] || ["I_B", "I_B"], rh: "-" },
    "AB+": { alleles: ["I_A", "I_B"], rh: "+" },
    "AB-": { alleles: ["I_A", "I_B"], rh: "-" },
  }

  // Simplified prediction for demonstration
  const possibleGroups = []
  const possibilities = {
    "O+ × O+": ["O+"],
    "O+ × A+": ["O+", "A+"],
    "O+ × B+": ["O+", "B+"],
    "O+ × AB+": ["A+", "B+"],
    "A+ × A+": ["O+", "A+"],
    "A+ × B+": ["O+", "A+", "B+", "AB+"],
    "A+ × AB+": ["A+", "B+", "AB+"],
    "B+ × B+": ["O+", "B+"],
    "B+ × AB+": ["B+", "AB+"],
    "AB+ × AB+": ["A+", "B+", "AB+"],
  }

  const key = `${fatherBG} × ${motherBG}` || `${motherBG} × ${fatherBG}`
  const results = possibilities[key] || ["A+", "B+", "AB+", "O+"]

  return {
    possibleBloodGroups: results,
    probability: results.map((bg) => ({
      bloodGroup: bg,
      percentage: Math.round(100 / results.length),
    })),
    explanation: "Blood group inheritance follows Mendelian genetics with ABO and Rh systems",
  }
}

// Diabetes Risk Calculator
export const calculateDiabetesRisk = (inputs) => {
  const {
    glucose,
    bmi,
    age,
    insulin,
    pregnancies,
    bloodPressure,
    skinThickness,
  } = inputs

  let riskScore = 0

  // Glucose (0-200)
  if (glucose > 126) riskScore += 30
  else if (glucose > 100) riskScore += 15

  // BMI (0-67)
  if (bmi > 30) riskScore += 25
  else if (bmi > 25) riskScore += 10

  // Age
  if (age > 45) riskScore += 15
  else if (age > 35) riskScore += 5

  // Blood Pressure
  if (bloodPressure > 140) riskScore += 15
  else if (bloodPressure > 130) riskScore += 8

  // Insulin resistance (simplified)
  if (insulin > 16) riskScore += 10

  const confidence = Math.min(85, 60 + Math.abs(glucose - 100) / 2)
  const riskLevel = riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low"

  return {
    riskScore: Math.min(100, riskScore),
    riskLevel,
    confidence: Math.round(confidence),
    recommendations:
      riskLevel === "High"
        ? ["Consult endocrinologist", "Reduce sugar intake", "Exercise 30 mins daily"]
        : riskLevel === "Medium"
          ? ["Monitor glucose levels", "Maintain healthy weight", "Regular check-ups"]
          : ["Continue healthy lifestyle", "Annual check-ups"],
  }
}

// Blood Pressure Risk Calculator
export const calculateBPRisk = (inputs) => {
  const { age, weight, height, exercisePerWeek, smokingStatus, heartRate } = inputs

  let bpStage = "Normal"
  let riskScore = 0

  if (heartRate > 100) riskScore += 25
  else if (heartRate > 80) riskScore += 10

  if (age > 60) riskScore += 20
  else if (age > 45) riskScore += 10

  if (smokingStatus === "current") riskScore += 30
  else if (smokingStatus === "former") riskScore += 10

  if (exercisePerWeek < 2) riskScore += 20

  const bmi = weight / ((height / 100) * (height / 100))
  if (bmi > 30) riskScore += 25
  else if (bmi > 25) riskScore += 10

  if (riskScore >= 70) bpStage = "Stage 2 Hypertension"
  else if (riskScore >= 50) bpStage = "Stage 1 Hypertension"
  else if (riskScore >= 30) bpStage = "Elevated"

  return {
    bpStage,
    riskScore: Math.min(100, riskScore),
    confidence: Math.round(70 + Math.random() * 20),
    recommendations:
      riskScore >= 70
        ? ["See cardiologist immediately", "Reduce sodium", "Manage stress"]
        : riskScore >= 50
          ? ["Monitor BP regularly", "Reduce sodium intake", "Exercise daily"]
          : ["Maintain healthy lifestyle", "Regular monitoring"],
  }
}

// Genetic Risk Assessment
export const assessGeneticRisk = (inputs) => {
  const {
    age,
    gender,
    smokingStatus,
    alcoholConsumption,
    exercisePerWeek,
    familyHistoryDiseases,
    weight,
    height,
  } = inputs

  const bmi = weight / ((height / 100) * (height / 100))

  const risks = {
    diabetes: 25,
    heartDisease: 20,
    cancer: 15,
    stroke: 10,
    liverDisease: 8,
  }

  // Adjust based on lifestyle
  if (smokingStatus === "current") {
    risks.cancer += 25
    risks.heartDisease += 20
    risks.stroke += 15
  }

  if (bmi > 30) {
    risks.diabetes += 20
    risks.heartDisease += 15
  }

  if (alcoholConsumption === "frequent") {
    risks.liverDisease += 25
    risks.heartDisease += 10
  }

  if (exercisePerWeek < 2) {
    risks.heartDisease += 15
    risks.diabetes += 10
  }

  // Adjust for family history
  if (familyHistoryDiseases && familyHistoryDiseases.length > 0) {
    familyHistoryDiseases.forEach((disease) => {
      if (risks[disease.toLowerCase()]) {
        risks[disease.toLowerCase()] += 15
      }
    })
  }

  // Normalize scores to 0-100
  Object.keys(risks).forEach((key) => {
    risks[key] = Math.min(100, Math.max(0, risks[key]))
  })

  return {
    riskAssessment: risks,
    overallRiskLevel:
      Object.values(risks).reduce((a, b) => a + b, 0) / Object.keys(risks).length >= 50
        ? "High"
        : "Medium",
    recommendations: [
      "Regular health check-ups",
      "Maintain balanced diet",
      "Exercise 150 minutes weekly",
      "Quit smoking if applicable",
      "Limit alcohol consumption",
    ],
  }
}

// Health Score Calculator
export const calculateHealthScore = (userData) => {
  let score = 100

  // BMI calculation
  if (userData.height && userData.weight) {
    const bmi = userData.weight / ((userData.height / 100) * (userData.height / 100))
    if (bmi < 18.5 || bmi > 25) score -= 15
    if (bmi < 16 || bmi > 30) score -= 10
  }

  // Lifestyle factors
  if (userData.lifestyle?.smoking !== "none") score -= 10
  if (userData.lifestyle?.alcohol === "regular") score -= 10
  if (userData.lifestyle?.exercise === "none") score -= 15

  // Medical conditions
  if (userData.medicalHistory?.conditions?.length > 0) score -= userData.medicalHistory.conditions.length * 5

  // Age factor
  if (userData.profile?.dateOfBirth) {
    const age = new Date().getFullYear() - new Date(userData.profile.dateOfBirth).getFullYear()
    if (age > 60) score -= 10
    else if (age > 45) score -= 5
  }

  return Math.max(0, Math.min(100, score))
}
