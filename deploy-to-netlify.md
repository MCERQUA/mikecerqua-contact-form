# Manual Deployment Instructions

Since we're using the Netlify MCP tool, here's how to deploy this site directly:

## Using the Netlify Dashboard

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub as the Git provider
4. Find and select the "mikecerqua-contact-form" repository
5. Configure deployment settings:
   - Owner: Your Netlify team
   - Branch to deploy: main
   - Base directory: (leave blank)
   - Build command: (leave blank)
   - Publish directory: public
6. Click "Deploy site"

## Using the Netlify CLI

With your Netlify access token (nfp_xYGy2rDJZULFQpUbjwZoLrn56bo2Z4Mbbc6), you can deploy using the command line:

```bash
# Install Netlify CLI if not already installed
npm install netlify-cli -g

# Login to Netlify
netlify login

# Initialize and deploy
cd mikecerqua-contact-form
netlify init
# Follow the prompts to connect to your Netlify account and create a new site

# Deploy
netlify deploy --prod
```

## After Deployment

Don't forget to set up the required environment variables in Netlify:

1. Go to Site settings → Environment variables
2. Add the following variables:
   - `MAILGUN_API_KEY`: Your Mailgun API key
   - `MAILGUN_DOMAIN`: Your Mailgun domain
   - `MAILGUN_WEBHOOK_SIGNING_KEY`: e4605f239a90d49d8f6004d7fcf7ea1e
   - `MAILGUN_VERIFICATION_KEY`: pubkey-1ccd31d3b1d49282291ba5cefbe50a0e
   - `RECAPTCHA_SECRET_KEY`: Your reCAPTCHA secret key

And don't forget to update the reCAPTCHA site key in public/index.html!
