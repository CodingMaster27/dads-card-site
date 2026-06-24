module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, occasion, year, templates, bgPalettes, accentPalettes } = req.body;
  if (!messages?.length) return res.status(400).json({ error: 'messages required' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const tmplList = (templates || []).map(t =>
    `- id: "${t.id}", name: "${t.name}", defaultBg: "${t.defaultBg1}" → "${t.defaultBg2}", accent: "${t.defaultAccent}"`
  ).join('\n');

  const bgList = (bgPalettes || []).map((p,i) =>
    `${i}: "${p.label}" (${p.bg1} → ${p.bg2})`
  ).join('\n');

  const acList = (accentPalettes || []).map((p,i) =>
    `${i}: "${p.label}" (${p.color})`
  ).join('\n');

  const system = `You are a warm, creative card design assistant helping someone make a beautiful card for their dad Darren.
Occasion: "${occasion}", year: ${year}.

Available templates:\n${tmplList}

Background palettes (use bg1/bg2 hex values exactly):\n${bgList}

Accent palettes (use color hex exactly):\n${acList}

After each user message, respond with ONLY a JSON object (no markdown, no fences):
{
  "reply": "Short warm reply, 1-2 sentences",
  "template": "template-id or null",
  "bg": { "bg1": "#hex", "bg2": "#hex" } or null,
  "accent": "#hex or null",
  "message": "Heartfelt card message from Sebastian to Darren, or null",
  "tagline": "Short front-of-card tagline (max 6 words) or null"
}

Rules: Keep replies warm and short. Pick designs that match the user's vibe. The message should feel personal.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1024, system, messages }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Claude API error', detail: err });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text?.trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: 'Bad response from Claude', raw: text });
    }

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
