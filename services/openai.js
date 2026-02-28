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
`
      },
      { role: 'user', content: query },
    ],
  });

  return completion.choices[0].message.content;
}
