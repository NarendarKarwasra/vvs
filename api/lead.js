// Vercel Serverless Function: /api/lead
// Optional WhatsApp Cloud API notification endpoint.
// Configure these Vercel environment variables before using:
// WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_NOTIFY_TO

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const message = body.whatsappMessage || [
      'New website enquiry',
      `Name: ${body.fullName || ''}`,
      `Phone: ${body.phone || ''}`,
      `Email: ${body.email || ''}`,
      `Service: ${body.enquiryType || ''}`,
      `Message: ${body.message || ''}`
    ].join('\n');

    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const notifyTo = process.env.WHATSAPP_NOTIFY_TO;

    if (!token || !phoneNumberId || !notifyTo) {
      return res.status(200).json({ ok: true, saved: false, whatsapp: 'not_configured', message: 'Lead received by browser. Configure WhatsApp env vars for server notification.' });
    }

    const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
    const waResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: notifyTo,
        type: 'text',
        text: { preview_url: false, body: message }
      })
    });

    const result = await waResponse.json();
    if (!waResponse.ok) {
      return res.status(200).json({ ok: true, whatsapp: 'failed', details: result });
    }

    return res.status(200).json({ ok: true, whatsapp: 'sent', details: result });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};
