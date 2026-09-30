import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite dev server (localhost:5173 / localhost:3000)
app.use(cors());
app.use(express.json());

// Health Check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Portfolio Contact Email API' });
});

// Contact Form Email Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, projectType, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const receiverEmail = process.env.RECEIVER_EMAIL || gmailUser;

    if (!gmailUser || !gmailPass || gmailPass === 'YOUR_16_CHARACTER_APP_PASSWORD_HERE') {
      console.error('[SMTP Error] GMAIL_APP_PASSWORD is not set in .env file!');
      return res.status(500).json({
        error: 'Email service is not configured yet. Please add GMAIL_APP_PASSWORD in .env file.',
      });
    }

    // Configure Nodemailer Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // 1. Send Notification Email to YOU (Portfolio Owner)
    const ownerMailOptions = {
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `🚀 New Project Inquiry from ${name} [${projectType}]`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #09090b; color: #f4f4f5; padding: 32px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
          <h2 style="color: #6366f1; margin-top: 0; font-size: 22px;">New Project Inquiry</h2>
          <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #d4d4d8;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #a1a1aa; width: 140px;">Client Name:</td>
              <td style="padding: 8px 0; color: #ffffff;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #a1a1aa;">Client Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #818cf8; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #a1a1aa;">Project Type:</td>
              <td style="padding: 8px 0; color: #ffffff;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #a1a1aa;">Budget Range:</td>
              <td style="padding: 8px 0; color: #34d399; font-weight: bold;">${budget}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background-color: #18181b; border-left: 4px solid #6366f1; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-family: monospace; color: #a1a1aa; text-transform: uppercase;">Project Overview:</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #f4f4f5; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="font-size: 12px; color: #71717a; margin-top: 24px; text-align: center;">
            Sent automatically from your Portfolio Contact Form.
          </p>
        </div>
      `,
    };

    // 2. Send Receipt Confirmation Email to the Client
    const clientMailOptions = {
      from: `"Himat Singh Parihar" <${gmailUser}>`,
      to: email,
      subject: `Message Received! Project Inquiry - Himat Singh Parihar`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #09090b; color: #f4f4f5; padding: 32px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
          <h2 style="color: #ffffff; margin-top: 0; font-size: 20px;">Thank you for reaching out, ${name}!</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa;">
            I have received your project details regarding <strong style="color: #ffffff;">${projectType}</strong>. I will review your requirements and reply to <span style="color: #818cf8;">${email}</span> within 24 hours.
          </p>

          <div style="margin: 20px 0; padding: 16px; background-color: #18181b; border-radius: 8px; border: 1px solid #27272a;">
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #71717a; text-transform: uppercase; font-family: monospace;">Summary of your message:</p>
            <p style="margin: 0; font-size: 13px; color: #d4d4d8; font-style: italic;">"${message}"</p>
          </div>

          <p style="font-size: 14px; color: #f4f4f5; margin-bottom: 4px;">Best regards,</p>
          <p style="font-size: 15px; font-weight: bold; color: #818cf8; margin: 0;">Himat Singh Parihar</p>
          <p style="font-size: 12px; color: #71717a; margin: 2px 0 0 0;">Freelance Web & Software Engineer</p>
        </div>
      `,
    };

    // Execute both email dispatches concurrently
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    console.log(`[SMTP Success] Sent inquiry emails for ${name} (${email})`);
    return res.status(200).json({ success: true, message: 'Inquiry emails delivered successfully!' });
  } catch (error) {
    console.error('[SMTP Error] Failed to send email:', error);
    return res.status(500).json({ error: 'Failed to send email via SMTP server.', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Contact API server running at http://localhost:${PORT}`);
});
