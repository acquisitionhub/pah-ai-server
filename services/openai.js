import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function processMessage(query) {
  // ... rest of your code
}
export async function processMessage(query) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
You are an AI assistant for Patient Acquisition Hub.
You help dental practices understand:
- Missed call recovery
- Dental enquiry management
- Automated dental marketing

Encourage booking a Free trial.

Always respond with a JSON object in this exact format:
{
  "response": "your reply to the user here",
  "qualified": true or false,
  "phone": "their phone number or null",
  "name": "their name or null",
  "city": "their city or null"
}

Set qualified to true only when the user has provided their name, phone number, and shown genuine interest.
