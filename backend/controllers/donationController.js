import BloodDonation from "../models/BloodDonation.js"

export const registerAsDonor = async (req, res) => {
  try {
    const { bloodGroup, weight, hasMedicalConditions, medicalConditions, previousDonationDate } = req.body

    const normalizedWeight = Number(weight)

    if (!bloodGroup || !normalizedWeight) {
      return res.status(400).json({ message: "Blood group and weight are required" })
    }

    if (normalizedWeight < 50) {
      return res.status(400).json({ message: "Minimum weight required is 50 kg" })
    }

    let donation = await BloodDonation.findOne({ userId: req.userId })

    const donorData = {
      userId: req.userId,
      isDonor: true,
      bloodGroup,
      weight: normalizedWeight,
      hasMedicalConditions: Boolean(hasMedicalConditions),
      medicalConditions: medicalConditions || "",
      previousDonationDate: previousDonationDate ? new Date(previousDonationDate) : null,
      lastDonationDate: previousDonationDate ? new Date(previousDonationDate) : null,
      nextEligibleDate: previousDonationDate
        ? new Date(new Date(previousDonationDate).getTime() + 56 * 24 * 60 * 60 * 1000)
        : new Date(),
    }

    if (!donation) {
      donation = await BloodDonation.create(donorData)
    } else {
      Object.assign(donation, donorData)
      await donation.save()
    }

    res.status(201).json({
      message: "Successfully registered as donor",
      donation,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const recordDonation = async (req, res) => {
  try {
    const { hospital, bloodGroup, quantity, location } = req.body

    let donation = await BloodDonation.findOne({ userId: req.userId })

    if (!donation) {
      donation = await BloodDonation.create({
        userId: req.userId,
        isDonor: true,
      })
    }

    // Add donation record
    donation.donationHistory.push({
      date: new Date(),
      hospital,
      bloodGroup,
      quantity,
      location,
    })

    donation.lastDonationDate = new Date()
    donation.totalDonations += 1

    // Next eligible date is 56 days after last donation
    const nextEligible = new Date()
    nextEligible.setDate(nextEligible.getDate() + 56)
    donation.nextEligibleDate = nextEligible

    await donation.save()

    res.json({
      message: "Donation recorded successfully",
      donation,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getDonorProfile = async (req, res) => {
  try {
    let donation = await BloodDonation.findOne({ userId: req.userId })

    if (!donation) {
      donation = await BloodDonation.create({
        userId: req.userId,
        isDonor: false,
      })
    }

    res.json(donation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query

    const query = { isDonor: true }

    if (bloodGroup) {
      query.bloodGroup = bloodGroup
    }

    if (city) {
      query.location = city
    }

    const donors = await BloodDonation.find(query).populate("userId", "name phone profile.emergencyContact")

    res.json({
      count: donors.length,
      donors,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
