import dotenv from "dotenv";
dotenv.config(); // This must come first to load environment variables

// Check if the API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing!");
  process.exit(1); // Stop the server if the key is missing
} else {
  console.log("✅ OPENAI_API_KEY is loaded");
}

import express from "express";
import { OpenAI } from "openai";
import cors from "cors";

// Initialize Express app
const app = express();
app.use(express.json());

// Allow all origins for testing (CORS)
app.use(cors({ origin: '*' }));

// Initialize OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the /api/chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { query } = req.body;

    // Request completion from OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",  // Use the correct model
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
          `,
        },
        { role: "user", content: query },
      ],
    });

    // Send the response back to the client
    res.json({
      response: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || "Server error",  // Improved error reporting
    });
  }
});

// Set the port (either from environment or default to 3000)
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
