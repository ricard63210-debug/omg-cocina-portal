export default async function handler(req, res) {
  // Handle CORS options request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Read the Anthropic API key from the server environment
    const apiKey = process.env.VITE_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY environment variable is not defined.');
      return res.status(500).json({ error: 'Chat API configuration error' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    if (response.status !== 200) {
      const errBody = await response.json().catch(() => ({}));
      console.error('Anthropic API Error:', response.status, errBody);
      
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      return res.status(response.status).json({
        error: {
          status: response.status,
          type: errBody.error?.type || 'api_error',
          message: errBody.error?.message || JSON.stringify(errBody) || 'Unknown API error'
        }
      });
    }

    const data = await response.json();
    
    // Set headers for response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Chatbot proxy error:', error);
    return res.status(500).json({ error: `Failed to communicate with Claude API: ${error.message}` });
  }
}
