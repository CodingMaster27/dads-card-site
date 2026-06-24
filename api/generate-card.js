module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, occasion, year } = req.body;
  if (!messages || !messages.length) return res.status(400).json({ error: 'messages required' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const systemPrompt = `You are an expert greeting card illustrator. Generate a single, complete, beautiful SVG illustration for the FRONT COVER of a greeting card.

Rules:
- Output ONLY the raw SVG code, nothing else — no markdown, no explanation, no code fences
- viewBox="0 0 360 480" exactly
- Rich, detailed illustration using gradients, shadows, and depth
- Dark, classy, elegant aesthetic: deep navy/midnight blues, jewel tones, gold accents
- Fill the entire card with art — no white space
- Include decorative gold ornamental elements (flourishes, lines, stars)
- Text on the card front: only the occasion name in elegant serif lettering and the year
- Make it feel like a luxury premium card worth keeping forever
- This is a ${occasion} card for the year ${year}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return res.status(500).json({ error: 'Claude API error', detail: err });
    }

    const data = await response.json();
    const svg  = data.content?.[0]?.text?.trim();

    if (!svg || !svg.startsWith('<svg')) {
      return res.status(500).json({ error: 'Invalid SVG returned', raw: svg });
    }

    res.status(200).json({ svg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
