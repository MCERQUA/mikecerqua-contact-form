# Deployment Guide

## Deploy to Netlify

1. Log into [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select the "mikecerqua-contact-form" repository
4. Configure build settings:
   - Build command: (leave blank)
   - Publish directory: `public`
5. Click "Deploy site"

## Configure Environment Variables

After deployment, set up the necessary environment variables in Netlify:

1. Go to Site settings → Environment variables
2. Add the following variables:
   - `MAILGUN_API_KEY`: Your Mailgun API key
   - `MAILGUN_DOMAIN`: Your Mailgun domain
   - `MAILGUN_WEBHOOK_SIGNING_KEY`: e4605f239a90d49d8f6004d7fcf7ea1e
   - `MAILGUN_VERIFICATION_KEY`: pubkey-1ccd31d3b1d49282291ba5cefbe50a0e
   - `RECAPTCHA_SECRET_KEY`: Your reCAPTCHA secret key

## Set Up reCAPTCHA

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register a new site with the following settings:
   - Label: Contact Form
   - reCAPTCHA type: reCAPTCHA v2 (Checkbox)
   - Domains: Your Netlify domain (e.g., your-site-name.netlify.app)
3. Get the Site Key and Secret Key
4. Update the Site Key in `public/index.html` by replacing `YOUR_RECAPTCHA_SITE_KEY`
5. Add the Secret Key to Netlify environment variables as `RECAPTCHA_SECRET_KEY`

## Verify Setup

1. Visit your Netlify site URL
2. Fill out the contact form
3. Submit the form
4. Check that emails are being sent to mikecerqua@gmail.com

## Troubleshooting

If emails aren't being sent:

1. Check Netlify Function logs in the Netlify dashboard
2. Verify all environment variables are set correctly 
3. Make sure your Mailgun domain is properly configured
4. Confirm reCAPTCHA is working correctly
