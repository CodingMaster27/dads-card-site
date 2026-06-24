module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, occasion, year, templates } = req.body;
  if (!messages?.length) return res.status(400).json({ error: 'messages required' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const templateList = (templates || [])
    .map(t => `- id: "${t.id}", name: "${t.name}", themes: ${t.themes.map(th => `"${th.id}" (${th.label})`).join(', ')}`)
    .join('\n');

  const system = `You are a warm, creative card design assistant helping someone make a beautiful card for their dad Darren.

Your job is to have a friendly conversation, understand what they want, and choose the best design for them.

Available templates:
${templateList}

After each user message, respond with a JSON object (and ONLY the JSON object, no markdown fences) like:
{
  "reply": "Your warm conversational reply here",
  "template": "template-id or null if not decided yet",
  "theme": "theme-id or null if not decided yet",
  "message": "The card message to write inside, or null if not ready yet"
}

Rules:
- Keep replies short, warm, and enthusiastic
- Ask one clarifying question at a time if you need more info
- Once you have enough to go on, pick a template+theme and write a heartfelt message
- The message should feel personal, from Sebastian to his dad Darren
- Occasion is "${occasion}", year is ${year}
- You can update template/theme/message on any turn as you refine the design`;

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
