# Loops API Integration Guide

This guide covers integrating Loops email marketing platform with our NextJS application for user email collection and mailing list management.

## Overview

Loops provides a REST API for managing contacts, sending events, and handling transactional emails. This documentation focuses on the features needed for our one-page NextJS app that collects user emails and adds them to mailing lists.

## Authentication

### API Key Setup

1. Go to **Settings → API** in your Loops dashboard
2. Click **Generate key** to create a new API key
3. Assign it a human-readable name (e.g., "NextJS App Production")
4. Store the API key securely in your environment variables

### API Key Usage

All API requests require authentication using a Bearer token in the Authorization header:

```javascript
const headers = {
  'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
  'Content-Type': 'application/json'
};
```

### Testing Your API Key

You can verify your API key is working by making a GET request to:
```
https://app.loops.so/api/v1/api-key
```

Successful response:
```json
{
  "success": true
}
```

## Rate Limiting

- **Baseline limit**: 10 requests per second per team
- Rate limit headers are included in every response:
  - `x-ratelimit-limit`: Maximum requests per second
  - `x-ratelimit-remaining`: Remaining requests in current window

### Handling Rate Limits

When you exceed the limit, you'll receive a `429 Too Many Requests` response. Implement exponential backoff retry logic:

```javascript
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
```

## Core API Endpoints

### Base URL
```
https://app.loops.so/api
```

## Contact Management

### Create Contact

**Endpoint**: `POST /v1/contacts/create`

Creates a new contact with an email address and optional properties.

**Request Body**:
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "source": "Website signup",
  "subscribed": true
}
```

**NextJS Implementation**:
```javascript
// pages/api/subscribe.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName, lastName } = req.body;

  try {
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        source: 'Website signup',
        subscribed: true
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      res.status(200).json({ success: true, data });
    } else {
      res.status(response.status).json({ error: data.message || 'Failed to subscribe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### Update Contact

**Endpoint**: `PUT /v1/contacts/update`

Updates an existing contact's properties.

**Request Body**:
```json
{
  "email": "user@example.com",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

### Find Contact

**Endpoint**: `GET /v1/contacts/find?email={email}`

Retrieves a contact by email address.

### Delete Contact

**Endpoint**: `DELETE /v1/contacts/delete`

Removes a contact from your audience.

## Contact Properties

### List Contact Properties

**Endpoint**: `GET /v1/contacts/properties`

Returns all custom contact properties for your account.

### Create Contact Property

**Endpoint**: `POST /v1/contacts/properties`

Creates a new custom contact property.

## Mailing Lists

### List Mailing Lists

**Endpoint**: `GET /v1/lists`

Returns all mailing lists in your account.

## Events

### Send Event

**Endpoint**: `POST /v1/events/send`

Sends an event to trigger automated email sequences in Loops.

**Request Body**:
```json
{
  "email": "user@example.com",
  "eventName": "User Signed Up",
  "eventProperties": {
    "signupSource": "landing-page",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## Environment Variables

Create a `.env.local` file in your NextJS project root:

```env
LOOPS_API_KEY=your_api_key_here
```

## Frontend Implementation Example

### React Hook for Email Subscription

```javascript
// hooks/useEmailSubscription.js
import { useState } from 'react';

export const useEmailSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const subscribe = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to subscribe');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, success, error };
};
```

### Email Signup Component

```jsx
// components/EmailSignup.jsx
import { useState } from 'react';
import { useEmailSubscription } from '../hooks/useEmailSubscription';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const { subscribe, loading, success, error } = useEmailSubscription();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      await subscribe(email);
    }
  };

  if (success) {
    return (
      <div className="text-center p-4 bg-green-100 rounded-lg">
        <h3 className="text-green-800 font-semibold">Successfully subscribed!</h3>
        <p className="text-green-600">Thank you for joining our mailing list.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}
```

## Error Handling

### Common Error Responses

- **401 Unauthorized**: Invalid API key
- **400 Bad Request**: Invalid request format or missing required fields
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server-side issue

### Best Practices

1. **Validate input**: Always validate email addresses before sending to API
2. **Handle duplicates**: Loops will handle duplicate emails gracefully
3. **Implement retries**: Use exponential backoff for rate-limited requests
4. **Secure API keys**: Never expose API keys in client-side code
5. **User feedback**: Provide clear success/error messages to users

## Security Considerations

1. **Server-side only**: Make all Loops API calls from your NextJS API routes, never from client-side code
2. **Environment variables**: Store API keys in environment variables
3. **CORS**: Loops API doesn't support CORS, reinforcing server-side usage
4. **Input validation**: Sanitize and validate all user inputs
5. **Rate limiting**: Implement client-side rate limiting to prevent abuse

## SDKs and Tools

### Official SDKs
- **JavaScript/TypeScript**: Official SDK available
- **Nuxt**: Official Nuxt module
- **PHP**: Official PHP SDK
- **Ruby**: Official Ruby SDK

### Development Tools
- **OpenAPI specs**: Available at `app.loops.so/openapi.yaml` and `app.loops.so/openapi.json`
- **Postman/Insomnia**: Import OpenAPI specs for testing

## Additional Resources

- [Loops Documentation](https://loops.so/docs/api-reference/intro)
- [API Reference](https://loops.so/docs/api-reference)
- [JavaScript SDK Documentation](https://loops.so/docs/sdks/javascript)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure API calls are made server-side only
2. **Invalid API Key**: Verify key is correctly set in environment variables
3. **Rate Limiting**: Implement proper retry logic with exponential backoff
4. **Validation Errors**: Check that email addresses are properly formatted

### Contact Support

If you encounter issues not covered in this guide, contact the Loops team for assistance through their support channels. 