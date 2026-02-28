import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRoute from './routes/chat.js';

dotenv.config();

// ✅ Validate required environment variables at startup
const requiredEnvVars = [
  'OPENAI_API_KEY',
  'TWILIO_SID',
  'TWILIO_AUTH',
  'TWILIO_PHONE',
  'YOUR_PHONE'
];

for (const variable of requiredEnvVars) {
  if (!process.env[variable]) {
    console.error(`❌ Missing required environment variable: ${variable}`);
    process.exit(1);
  }
}

console.log('✅ Environment variables loaded');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// Health check route (good for Railway)
app.get('/', (req, res) => {
  res.send('🚀 PAH AI Server Running');
});

// Main Chat Route
app.use('/api/chat', chatRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
