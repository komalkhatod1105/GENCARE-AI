import mongoose from "mongoose"

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportType: {
      type: String,
      enum: ["bloodTest", "xray", "ultrasound", "mammography", "prescription", "other"],
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: String,
    extractedText: String,
    aiAnalysis: {
      summary: String,
      findings: [
        {
          test: String,
          value: String,
          normalRange: String,
          status: {
            type: String,
            enum: ["normal", "high", "low"],
          },
          explanation: String,
        },
      ],
      recommendations: [String],
      suggestedFoods: [String],
      doctorSpecialty: String,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    description: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Report", reportSchema)
