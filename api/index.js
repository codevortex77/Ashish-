export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { key, type, term } = req.query;
  
  // Check for your new API key
  if (key !== 'Saxsux') {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid API key' 
    });
  }

  if (!type || !term) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing type or term parameter' 
    });
  }

  try {
    // Fetch from original API
    const response = await fetch(
      `https://api.subhxcosmo.in/api?key=CYBERXZEXX&type=${type}&term=${term}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ProxyBot/1.0)'
        }
      }
    );

    const data = await response.json();
    
    // Modify the owner field
    if (data.owner) {
      data.owner = "@PurelyYour | Buy Instantly at the Best Price";
    }
    
    // Add proxy info
    data.proxiedBy = "Saxsux-Proxy";
    data.proxyUsed = "vercel-edge";
    
    // Send response
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch from upstream API',
      message: error.message 
    });
  }
}
