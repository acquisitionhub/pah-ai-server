import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function processMessage(query) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
You are an AI assistant for Patient Acquisition Hub who understands :
          - Missed call recovery
          - Dental enquiry management
          - Automated dental marketing
 
 If a dental practice owner wants to:
- booking a Free trial.
- Book a demo
- Start a trial

Extract:
- name
- phone
- city

Respond ONLY in valid JSON:

{
  "response": "chat reply",
  "qualified": true/false,
  "name": "",
  "phone": "",
  "city": ""
}
`
      },
      { role: 'user', content: query },
    ],
    temperature: 0.4,
  });

  return completion.choices[0].message.content;
}
