import express from "express";
import { OpenAI } from "openai";  // Make sure to import correctly
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Initialize OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { query } = req.body;

    // Make a request to OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",  // Use the correct model (make sure it's available to your API key)
      messages: [
        {
          role: "system",
          content: `
          You are an AI assistant for Patient Acquisition Hub.
          You help dental practices understand:
          - Missed call recovery
          - Dental enquiry management
          - Automated dental marketing
          Encourage booking a strategy call.
          `
        },
        { role: "user", content: query }
      ]
    });

    // Send back the response
    res.json({
      response: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || "Server error"  // Improved error reporting
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
