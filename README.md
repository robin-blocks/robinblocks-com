# Robin Blocks - Mailing List Signup

A beautiful, single-page Next.js application for collecting email subscriptions using the Loops email marketing platform.

## Features

- 🎨 Modern, responsive design with gradient backgrounds
- 📧 Email validation and subscription to Loops mailing list
- ⚡ Fast, server-side API integration with error handling
- 🔄 Loading states and success/error feedback
- 📱 Mobile-friendly responsive layout
- 🛡️ Rate limiting protection and retry logic
- 🎯 SEO optimized with meta tags

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- A Loops account with an API key

### 1. Installation

Clone this repository and install dependencies:

```bash
# Install dependencies
npm install
```

### 2. Environment Setup

1. Copy the environment variables file:
```bash
cp .env.local.example .env.local
```

2. Get your Loops API key:
   - Go to your [Loops dashboard](https://app.loops.so)
   - Navigate to **Settings → API**
   - Click **Generate key** to create a new API key
   - Give it a descriptive name like "Robin Blocks Website"

3. Update `.env.local` with your actual API key:
```env
LOOPS_API_KEY=your_actual_loops_api_key_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the signup page.

### 4. Test the Integration

1. Fill out the form with a test email address
2. Check your Loops dashboard to verify the contact was created
3. The contact should appear with the source "Robin Blocks Website"

## Project Structure

```
robin-blocks-signup/
├── components/
│   └── EmailSignup.jsx          # Main signup form component
├── hooks/
│   └── useEmailSubscription.js  # Custom hook for subscription logic
├── pages/
│   ├── api/
│   │   └── subscribe.js         # API route for Loops integration
│   ├── _app.js                  # Next.js app configuration
│   └── index.js                 # Main landing page
├── styles/
│   └── globals.css              # Global styles with Tailwind CSS
├── docs/
│   └── loops-integration.md     # Loops API integration guide
├── .env.local                   # Environment variables (add your API key here)
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # This file
```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `LOOPS_API_KEY` | Your Loops API key from Settings → API | Yes |

### Customization

#### Styling
- Edit `styles/globals.css` to modify colors and design
- Update `tailwind.config.js` to change the theme
- Modify the gradient background in the `.gradient-bg` class

#### Content
- Edit `pages/index.js` to change the main page content
- Update `components/EmailSignup.jsx` to modify the form
- Change the source name in `pages/api/subscribe.js` (currently "Robin Blocks Website")

#### Form Fields
To add more fields (like lastName), update:
1. `components/EmailSignup.jsx` - Add form inputs
2. `hooks/useEmailSubscription.js` - Include in the API call
3. `pages/api/subscribe.js` - Handle the new fields

## API Reference

### POST /api/subscribe

Subscribes an email to the Robin Blocks mailing list.

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John" // optional
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully subscribed to Robin Blocks!",
  "data": { /* Loops API response */ }
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message describing what went wrong"
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your `LOOPS_API_KEY` environment variable in Vercel's dashboard
4. Deploy!

### Other Platforms

This app works on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

Make sure to set the `LOOPS_API_KEY` environment variable in your deployment platform.

## Error Handling

The application includes comprehensive error handling:

- **Rate Limiting**: Automatic retry with exponential backoff
- **Validation**: Email format validation on both client and server
- **Network Errors**: Graceful handling of connection issues
- **API Errors**: Specific error messages for different failure types
- **User Feedback**: Clear success and error states in the UI

## Security Features

- 🔒 API key stored securely in environment variables
- 🛡️ Server-side only API calls (no client-side exposure)
- ✅ Input validation and sanitization
- 🚫 CORS protection (Loops API doesn't support CORS)
- 🔄 Rate limiting protection with retry logic

## Troubleshooting

### Common Issues

1. **"Server configuration error"**
   - Check that `LOOPS_API_KEY` is set in `.env.local`
   - Verify the API key is valid in your Loops dashboard

2. **Network errors**
   - Check your internet connection
   - Verify the Loops API is accessible

3. **Styling issues**
   - Make sure Tailwind CSS is properly configured
   - Run `npm run dev` to ensure styles are compiled

4. **API not working**
   - Check browser console for error messages
   - Verify the API route is accessible at `/api/subscribe`

### Testing API Key

You can test your API key by running:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://app.loops.so/api/v1/api-key
```

Should return: `{"success": true}`

## Support

For issues related to:
- **This application**: Check the troubleshooting section above
- **Loops API**: Visit [Loops documentation](https://loops.so/docs) or contact their support
- **Next.js**: Check the [Next.js documentation](https://nextjs.org/docs)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ for the Robin Blocks community