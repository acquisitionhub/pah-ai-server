import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

const YOUR_PHONE = process.env.YOUR_PHONE;
const TWILIO_PHONE = process.env.TWILIO_PHONE;

function formatUKNumber(phone) {
  if (phone.startsWith('+')) return phone;
  return `+44${phone.replace(/^0/, '')}`;
}

export async function sendLeadNotifications(lead) {
  const formattedPhone = formatUKNumber(lead.phone);

  // SMS to YOU
  await client.messages.create({
    body: `🔥 New Dental Practice Lead: ${lead.name} – ${lead.city} – ${formattedPhone}`,
    from: TWILIO_PHONE,
    to: YOUR_PHONE,
  });

  // SMS to THEM
  await client.messages.create({
    body: "Thanks for your interest — we’ll contact you shortly.",
    from: TWILIO_PHONE,
    to: formattedPhone,
  });
}
