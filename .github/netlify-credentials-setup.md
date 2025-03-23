# Setting up Netlify Credentials for GitHub Actions

To set up the GitHub Action for automatic deployment to Netlify, you need to add these secrets to your GitHub repository:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following repository secrets:

## NETLIFY_AUTH_TOKEN

Use the token: `nfp_xYGy2rDJZULFQpUbjwZoLrn56bo2Z4Mbbc6`

## NETLIFY_SITE_ID

This will be available after creating the site in Netlify. You can find it in the Site settings → General → Site details → API ID.

## Mailgun Setup

Remember to also set up the Mailgun environment variables in Netlify:

- `MAILGUN_API_KEY`: Your Mailgun API key
- `MAILGUN_DOMAIN`: Your Mailgun domain
- `MAILGUN_WEBHOOK_SIGNING_KEY`: e4605f239a90d49d8f6004d7fcf7ea1e
- `MAILGUN_VERIFICATION_KEY`: pubkey-1ccd31d3b1d49282291ba5cefbe50a0e