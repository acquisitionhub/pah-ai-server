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
