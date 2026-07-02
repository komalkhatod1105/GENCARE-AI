import mongoose from "mongoose"

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    predictionType: {
      type: String,
      enum: [
        "bloodGroup",
        "geneticRisk",
        "diabetes",
        "bloodPressure",
        "breastCancer",
        "heartDisease",
      ],
      required: true,
    },
    inputs: mongoose.Schema.Types.Mixed,
    results: mongoose.Schema.Types.Mixed,
    riskScore: Number,
    confidence: Number,
    explanation: String,
    recommendations: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Prediction", predictionSchema)
