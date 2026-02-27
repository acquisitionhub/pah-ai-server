import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Check if the OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing!");
  process.exit(1); // stops the server if key is not set
} else {
  console.log("✅ OPENAI_API_KEY is loaded");
}

const app = express();
app.use(express.json());

// --- SECURE CORS SETUP ---
// Replace with your actual website domain(s)
const allowedOrigins = [
  'https://www.mywebsite.com',    // your live site
  'http://localhost:5173'         // local dev/testing
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow requests
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Initialize OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { query } = req.body;

    // Make a request to OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
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
      error: error.message || "Server error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
