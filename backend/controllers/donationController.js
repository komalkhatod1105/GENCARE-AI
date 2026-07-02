import BloodDonation from "../models/BloodDonation.js"

export const registerAsDonor = async (req, res) => {
  try {
    let donation = await BloodDonation.findOne({ userId: req.userId })

    if (!donation) {
      donation = await BloodDonation.create({
        userId: req.userId,
        isDonor: true,
        lastDonationDate: null,
        nextEligibleDate: new Date(),
      })
    } else {
      donation.isDonor = true
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

    const donors = await BloodDonation.find({
      isDonor: true,
      "donationHistory.bloodGroup": bloodGroup,
    }).populate("userId", "name phone profile.emergencyContact")

    res.json({
      count: donors.length,
      donors,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
