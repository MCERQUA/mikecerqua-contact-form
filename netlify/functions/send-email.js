const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  try {
    const params = JSON.parse(event.body);
    const { name, email, subject, message, 'g-recaptcha-response': recaptchaResponse } = params;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Please provide all required fields' 
        })
      };
    }

    // Verify reCAPTCHA
    if (process.env.RECAPTCHA_SECRET_KEY) {
      const recaptchaVerification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`
      });

      const recaptchaData = await recaptchaVerification.json();
      if (!recaptchaData.success) {
        return {
          statusCode: 400,
          body: JSON.stringify({ 
            success: false, 
            message: 'reCAPTCHA verification failed' 
          })
        };
      }
    }

    // Create form data for Mailgun
    const form = new FormData();
    form.append('from', `Contact Form <mailgun@${process.env.MAILGUN_DOMAIN}>`);
    form.append('to', 'mikecerqua@gmail.com');
    form.append('subject', `Contact Form: ${subject}`);
    form.append('text', `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `);
    form.append('h:Reply-To', email);

    // Send email via Mailgun
    const response = await fetch(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')
      },
      body: form
    });

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          message: 'Your message has been sent successfully!' 
        })
      };
    } else {
      const errorData = await response.text();
      console.error('Mailgun API error:', errorData);
      
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to send email. Please try again later.' 
        })
      };
    }
  } catch (error) {
    console.error('Server error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Server error. Please try again later.' 
      })
    };
  }
};