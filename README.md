
// server.js - LIVE App & Website (Encrypted Messaging Service)
// Patent Ownership: Theodore G. Young Jr

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import sgMail from '@sendgrid/mail';
import twilio from 'twilio';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 443;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// SendGrid Setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Twilio Setup
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Message handler with sub-company labeling
app.post('/api/send-message', async (req, res) => {
  const { message, email, phone, method, companyName } = req.body;
  const label = companyName ? `Message from ${companyName}` : 'Message from LIVE';

  try {
    const results = [];

    if ((method === 'email' || method === 'both') && email) {
      const emailMsg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: label,
        text: message,
      };
      await sgMail.send(emailMsg);
      results.push('Email sent');
    }

    if ((method === 'sms' || method === 'both') && phone) {
      await twilioClient.messages.create({
        body: `${label}: ${message}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
      results.push('SMS sent');
    }

    res.json({ message: results.join(' & ') });
  } catch (err) {
    console.error('Secure error:', err); // Limit error exposure
    res.status(500).json({ error: 'Secure communication failure' });
  }
});

// SSL encryption - hidden key, not exposed to logs
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
};

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`LIVE encrypted server active`);
});

/* PATENT NOTE:
This system, titled "LIVE - Instant Messaging with Brand-Specific Labeling & Encryption," is under intellectual protection by Theodore G. Young Jr. Unauthorized use or duplication is prohibited.
*/

/* Website index.html located in /public:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LIVE | Secure Business Messaging</title>
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#4f46e5" />
  <link rel="icon" href="/icons/icon-192.png">
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: #f4f4f9; color: #333; }
    header { background: #4f46e5; color: white; padding: 2rem 1rem; text-align: center; }
    header h1 { margin: 0; font-size: 2.5rem; }
    header p { font-size: 1.2rem; margin-top: 0.5rem; }
    .cta { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: white; color: #4f46e5; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.3s ease; }
    .cta:hover { background: #e0e0f5; }
    main { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    section { margin-bottom: 2rem; }
    h2 { color: #4f46e5; margin-bottom: 0.5rem; }
    footer { text-align: center; padding: 2rem 1rem; background: #f0f0f0; font-size: 0.9rem; }
  </style>
</head>
<body>
  <header>
    <h1>LIVE</h1>
    <p>Encrypted SMS and Email Messaging for Businesses</p>
    <a href="/dashboard" class="cta">Launch Dashboard</a>
  </header>
  <main>
    <section>
      <h2>Empower Your Brand</h2>
      <p>LIVE allows messages to include your company name, enabling white-label communications for agents, brands, and franchises.</p>
    </section>
    <section>
      <h2>Security by Design</h2>
      <ul>
        <li>✅ HTTPS encrypted endpoints</li>
        <li>✅ Hidden encryption key files</li>
        <li>✅ No logging of sensitive payloads</li>
        <li>✅ Patent holder: Theodore G. Young Jr</li>
      </ul>
    </section>
    <section>
      <h2>Try LIVE Free</h2>
      <p>Test real-time messaging now from a browser or install LIVE as an app.</p>
      <a href="/dashboard" class="cta">Get Started</a>
    </section>
  </main>
  <footer>
    &copy; 2025 LIVE. All rights reserved.<br>
    U.S. Patent Pending – Theodore G. Young Jr
  </footer>
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  </script>
</body>
</html>
*/
