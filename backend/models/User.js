import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    profile: {
      avatar: String,
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      phone: String,
      bloodGroup: {
        type: String,
        enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-", ""],
      },
      height: Number,
      weight: Number,
      emergencyContact: String,
      emergencyPhone: String,
    },
    medicalHistory: {
      conditions: [String],
      allergies: [String],
      medications: [String],
      surgeries: [String],
    },
    lifestyle: {
      smoking: {
        type: String,
        enum: ["none", "occasional", "regular"],
        default: "none",
      },
      alcohol: {
        type: String,
        enum: ["none", "occasional", "regular"],
        default: "none",
      },
      exercise: {
        type: String,
        enum: ["none", "occasional", "regular", "daily"],
        default: "occasional",
      },
    },
    healthScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    familyHistory: [
      {
        relation: String,
        condition: String,
      },
    ],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
