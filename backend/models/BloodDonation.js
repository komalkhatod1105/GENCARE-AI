import mongoose from "mongoose"

const bloodDonationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDonor: {
      type: Boolean,
      default: false,
    },
    donationHistory: [
      {
        date: Date,
        hospital: String,
        bloodGroup: String,
        quantity: String,
        location: String,
      },
    ],
    lastDonationDate: Date,
    nextEligibleDate: Date,
    totalDonations: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export default mongoose.model("BloodDonation", bloodDonationSchema)
