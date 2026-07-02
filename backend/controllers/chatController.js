import ChatHistory from "../models/ChatHistory.js"

export const chat = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ message: "Message is required" })
    }

    // Simple AI response (placeholder - integrate with Gemini/OpenAI)
    const aiResponse = generateAIResponse(message)

    let chatHistory = await ChatHistory.findOne({ userId: req.userId })

    if (!chatHistory) {
      chatHistory = await ChatHistory.create({
        userId: req.userId,
        conversations: [],
      })
    }

    chatHistory.conversations.push({
      userMessage: message,
      aiResponse,
      timestamp: new Date(),
    })

    await chatHistory.save()

    res.json({
      userMessage: message,
      aiResponse,
      timestamp: new Date(),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({ userId: req.userId })

    if (!chatHistory) {
      return res.json({ conversations: [] })
    }

    res.json(chatHistory.conversations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const clearChatHistory = async (req, res) => {
  try {
    await ChatHistory.findOneAndDelete({ userId: req.userId })

    res.json({ message: "Chat history cleared" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Placeholder AI response generator
function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("diabetes")) {
    return (
      "Diabetes is a chronic condition that affects how your body processes glucose. " +
      "Risk factors include obesity, sedentary lifestyle, and family history. " +
      "I recommend consulting with an endocrinologist for proper evaluation."
    )
  }

  if (lowerMessage.includes("blood")) {
    return (
      "Blood health is crucial for overall wellness. " +
      "Regular blood tests help monitor your health status. " +
      "Would you like me to explain any specific blood test results?"
    )
  }

  if (lowerMessage.includes("diet") || lowerMessage.includes("food")) {
    return (
      "A balanced diet rich in fruits, vegetables, and whole grains is essential. " +
      "Limit processed foods and sugar intake. " +
      "Consult a nutritionist for personalized recommendations."
    )
  }

  if (lowerMessage.includes("exercise") || lowerMessage.includes("workout")) {
    return (
      "Exercise is vital for health. Aim for at least 150 minutes of moderate activity weekly. " +
      "This includes cardio, strength training, and flexibility work. " +
      "Start gradually and consult your doctor before beginning new activities."
    )
  }

  return (
    "I'm here to help with health-related questions. " +
    "Please ask me about specific health conditions, diet, exercise, or medical concepts. " +
    "For emergency medical advice, please consult a healthcare professional."
  )
}
