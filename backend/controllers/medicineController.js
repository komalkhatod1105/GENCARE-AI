import MedicineReminder from "../models/MedicineReminder.js"

export const addMedicineReminder = async (req, res) => {
  try {
    const { medicineName, dosage, frequency, startDate, endDate, doctorName, reason } =
      req.body

    const reminder = await MedicineReminder.create({
      userId: req.userId,
      medicineName,
      dosage,
      frequency,
      startDate,
      endDate,
      doctorName,
      reason,
      isActive: true,
    })

    res.status(201).json({
      message: "Medicine reminder added",
      reminder,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMedicineReminders = async (req, res) => {
  try {
    const reminders = await MedicineReminder.find({
      userId: req.userId,
      isActive: true,
    })

    res.json({
      count: reminders.length,
      reminders,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateMedicineReminder = async (req, res) => {
  try {
    const reminder = await MedicineReminder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.json({
      message: "Reminder updated",
      reminder,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const markMedicineTaken = async (req, res) => {
  try {
    const reminder = await MedicineReminder.findById(req.params.id)

    reminder.doseHistory.push({
      date: new Date(),
      taken: true,
      time: new Date().toLocaleTimeString(),
    })

    await reminder.save()

    res.json({
      message: "Dose marked as taken",
      reminder,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteMedicineReminder = async (req, res) => {
  try {
    await MedicineReminder.findByIdAndDelete(req.params.id)

    res.json({ message: "Reminder deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
