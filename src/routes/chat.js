import express from 'express';
import { processMessage } from '../services/openai.js';
import { sendLeadNotifications } from '../services/sms.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { query } = req.body;

    const aiContent = await processMessage(query);

    let parsed;

    try {
      parsed = JSON.parse(aiContent);
    } catch {
      return res.json({ response: aiContent });
    }

    if (parsed.qualified && parsed.phone) {
      await sendLeadNotifications(parsed);
    }

    res.json({ response: parsed.response });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || 'Server error',
    });
  }
});

export default router;
