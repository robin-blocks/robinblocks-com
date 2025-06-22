// Rate limiting helper function with exponential backoff
async function makeLoopsRequest(url, options, retries = 3) {
  try {
    const response = await fetch(url, options);
    
    if (response.status === 429 && retries > 0) {
      const delay = Math.pow(2, 3 - retries) * 1000; // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      return makeLoopsRequest(url, options, retries - 1);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key is configured
  if (!process.env.LOOPS_API_KEY) {
    console.error('LOOPS_API_KEY is not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { email, firstName, lastName } = req.body;

  // Validate required fields
  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  try {
    const requestBody = {
      email: email.toLowerCase().trim(),
      source: 'Robin Blocks Website',
      subscribed: true
    };

    // Add optional fields if provided
    if (firstName && firstName.trim()) {
      requestBody.firstName = firstName.trim();
    }
    if (lastName && lastName.trim()) {
      requestBody.lastName = lastName.trim();
    }

    const response = await makeLoopsRequest('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Success - contact created or already exists
      res.status(200).json({ 
        success: true, 
        message: 'Successfully subscribed to Robin Blocks!',
        data 
      });
    } else {
      // Handle specific error cases
      if (response.status === 401) {
        console.error('Invalid Loops API key');
        res.status(500).json({ error: 'Server configuration error' });
      } else if (response.status === 400) {
        // Bad request - likely validation error from Loops
        res.status(400).json({ 
          error: data.message || 'Invalid request. Please check your information.' 
        });
      } else if (response.status === 429) {
        // Rate limit exceeded even after retries
        res.status(429).json({ 
          error: 'Too many requests. Please try again in a moment.' 
        });
      } else {
        // Other API errors
        console.error('Loops API error:', response.status, data);
        res.status(500).json({ 
          error: 'Unable to process subscription. Please try again later.' 
        });
      }
    }
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      error: 'Network error. Please check your connection and try again.' 
    });
  }
}