import mongoose from "mongoose"

const medicineReminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicineName: {
      type: String,
      required: true,
    },
    dosage: String,
    frequency: {
      type: String,
      enum: ["morning", "afternoon", "night", "custom"],
    },
    customTimes: [String],
    startDate: Date,
    endDate: Date,
    reason: String,
    doctorName: String,
    doctorPhone: String,
    reminderDays: [Number],
    isActive: {
      type: Boolean,
      default: true,
    },
    doseHistory: [
      {
        date: Date,
        taken: Boolean,
        time: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export default mongoose.model("MedicineReminder", medicineReminderSchema)
