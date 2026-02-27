// Import dependencies
import express from 'express';
import { OpenAI } from 'openai';  // Make sure the OpenAI package is properly installed
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Check if the OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing!");
  process.exit(1);  // Stops the server if the key is not set
} else {
  console.log("✅ OPENAI_API_KEY is loaded"); // Just confirms it's there
}

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());  // To parse incoming JSON requests
app.use(cors({ origin: '*' }));  // Allow all origins for testing, modify as needed

// Initialize OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use your OpenAI API key from environment variables
});

// Define the /api/chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { query } = req.body;  // Extract the query from the request body

    // Make a request to the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-5.2',  // Use the correct model name (change as per the available model)
      messages: [
        {
          role: 'system',
          content: `
          You are an AI assistant for Patient Acquisition Hub.
          You help dental practices understand:
          - Missed call recovery
          - Dental enquiry management
          - Automated dental marketing
          Encourage booking a strategy call.
          `,
        },
        { role: 'user', content: query },  // User's input
      ],
    });

    // Send back the response from OpenAI
    res.json({
      response: completion.choices[0].message.content,  // Return the generated response
    });

  } catch (error) {
    console.error(error);  // Log error if any occurs
    res.status(500).json({
      error: error.message || 'Server error',  // Return error message
    });
  }
});

// Define the port the server will run on
const PORT = process.env.PORT || 3000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
