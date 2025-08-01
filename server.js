const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');

// Simple in-memory cache to prevent duplicate emails
const emailCache = {
  sentEmails: new Map(),
  isRecentlySent: function(email, type, data) {
    const key = `${email}-${type}-${JSON.stringify(data)}`;
    const now = Date.now();
    const lastSent = this.sentEmails.get(key);
    
    if (lastSent && now - lastSent < 10000) { // 10 seconds threshold
      return true;
    }
    
    this.sentEmails.set(key, now);
    return false;
  },
  // Clean old entries every 5 minutes
  cleanup: function() {
    const now = Date.now();
    for (const [key, timestamp] of this.sentEmails.entries()) {
      if (now - timestamp > 300000) { // 5 minutes
        this.sentEmails.delete(key);
      }
    }
  }
};

// Run cleanup every 5 minutes
setInterval(() => emailCache.cleanup(), 300000);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kvassociatemarketing@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Helper functions to format data
function formatProjectType(type) {
  switch (type) {
    case "residential": return "Residential Design";
    case "commercial": return "Commercial Design";
    case "interior": return "Interior Design";
    case "renovation": return "Renovation";
    case "other": return "Other Project";
    default: return type || "Not specified";
  }
}

function formatBudget(budget) {
  switch (budget) {
    case "below-5L": return "Below ₹5 Lakhs";
    case "5L-10L": return "₹5 Lakhs - ₹10 Lakhs";
    case "10L-25L": return "₹10 Lakhs - ₹25 Lakhs";
    case "25L-50L": return "₹25 Lakhs - ₹50 Lakhs";
    case "above-50L": return "Above ₹50 Lakhs";
    default: return budget || "Not specified";
  }
}

function formatTimeframe(timeframe) {
  switch (timeframe) {
    case "immediately": return "Immediately";
    case "1-3-months": return "1-3 Months";
    case "3-6-months": return "3-6 Months";
    case "6-12-months": return "6-12 Months";
    case "planning": return "Just Planning";
    default: return timeframe || "Not specified";
  }
}

// API endpoint to send lead notification email
app.post('/api/send-lead-notification', async (req, res) => {
  try {
    const leadData = req.body;
    
    if (!leadData || !leadData.name || !leadData.email || !leadData.phone) {
      return res.status(400).json({ success: false, message: 'Missing required lead data' });
    }

    const adminEmail = 'kvassociatemarketing@gmail.com'; // Can be changed to any admin email
    
    // Check if this email was recently sent to prevent duplicates
    if (emailCache.isRecentlySent(adminEmail, 'notification', leadData)) {
      console.log('Duplicate admin notification prevented');
      return res.status(200).json({ success: true, message: 'Admin notification already sent' });
    }
    
    const subject = `New Lead: ${leadData.name} - ${formatProjectType(leadData.projectType)}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #1e3a8a; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Lead Captured</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 30%;">Name:</td>
            <td style="padding: 8px 0;">${leadData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${leadData.email}" style="color: #2563eb;">${leadData.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;"><a href="tel:${leadData.phone}" style="color: #2563eb;">${leadData.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Project Type:</td>
            <td style="padding: 8px 0;">${formatProjectType(leadData.projectType)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Budget:</td>
            <td style="padding: 8px 0;">${formatBudget(leadData.budget)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Timeframe:</td>
            <td style="padding: 8px 0;">${formatTimeframe(leadData.timeframe)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Date Submitted:</td>
            <td style="padding: 8px 0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            This lead has been automatically added to your Lead Management dashboard.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: 'KV Associates <kvassociatemarketing@gmail.com>',
      to: adminEmail,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Admin notification sent successfully' });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send admin notification' });
  }
});

// API endpoint to send lead confirmation email
app.post('/api/send-lead-confirmation', async (req, res) => {
  try {
    const leadData = req.body;
    
    if (!leadData || !leadData.name || !leadData.email) {
      return res.status(400).json({ success: false, message: 'Missing required lead data' });
    }
    
    // Check if this email was recently sent to prevent duplicates
    if (emailCache.isRecentlySent(leadData.email, 'confirmation', leadData)) {
      console.log('Duplicate lead confirmation prevented');
      return res.status(200).json({ success: true, message: 'Lead confirmation already sent' });
    }

    const subject = 'Thank You for Contacting KV Associates';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://kvassociates.netlify.app/logo.png" alt="KV Associates Logo" style="max-width: 150px;">
        </div>
        
        <h2 style="color: #1e3a8a; text-align: center;">Thank You for Contacting Us!</h2>
        
        <p>Dear ${leadData.name},</p>
        
        <p>Thank you for your interest in KV Associates. We have received your inquiry regarding ${formatProjectType(leadData.projectType).toLowerCase()} services.</p>
        
        <p>Our team will contact you within 24 hours to schedule your free consultation and discuss your project requirements in detail.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e3a8a;">Your Project Details:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 8px;"><strong>Project Type:</strong> ${formatProjectType(leadData.projectType)}</li>
            <li style="margin-bottom: 8px;"><strong>Budget Range:</strong> ${formatBudget(leadData.budget)}</li>
            <li style="margin-bottom: 8px;"><strong>Timeframe:</strong> ${formatTimeframe(leadData.timeframe)}</li>
          </ul>
        </div>
        
        <p>If you have any immediate questions, feel free to reply to this email or call us at <a href="tel:+919336030312" style="color: #2563eb;">+91 93360 30312</a>.</p>
        
        <p>We look forward to working with you!</p>
        
        <p>Best regards,<br>
        <strong>KV Associates Team</strong></p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            KV Associates | Architectural & Interior Design Studio<br>
            Varanasi, Uttar Pradesh, India
          </p>
          <div style="margin-top: 10px;">
            <a href="https://www.facebook.com/share/1NZ6mGkavg/" style="text-decoration: none; margin: 0 5px;">
              <img src="https://kvassociates.netlify.app/images/social/facebook.png" alt="Facebook" style="width: 24px; height: 24px;">
            </a>
            <a href="https://www.instagram.com/k.v.associate?utm_source=qr&igsh=MTJnaGJ5cW9vNnl4dA==" style="text-decoration: none; margin: 0 5px;">
              <img src="https://kvassociates.netlify.app/images/social/instagram.png" alt="Instagram" style="width: 24px; height: 24px;">
            </a>
            <a href="https://www.linkedin.com/in/rahul-kumar-66611b26b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" style="text-decoration: none; margin: 0 5px;">
              <img src="https://kvassociates.netlify.app/images/social/linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px;">
            </a>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: 'KV Associates <kvassociatemarketing@gmail.com>',
      to: leadData.email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Lead confirmation sent successfully' });
  } catch (error) {
    console.error('Error sending lead confirmation:', error);
    res.status(500).json({ success: false, message: 'Failed to send lead confirmation' });
  }
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email service active for KV Associates`);
});
