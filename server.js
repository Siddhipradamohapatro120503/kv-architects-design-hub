const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Must be before routes
app.use(cors({
  origin: ['https://kvassociate.in', 'http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

    const adminEmail = leadData.adminEmail || 'kvassociatemarketing@gmail.com';
    const forwardEmail = leadData.forwardEmail || 'kvassociateblw@gmail.com';
    
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
      to: [adminEmail, forwardEmail].filter(Boolean).join(', '),
      subject,
      html,
    };

    // Set a timeout for the email sending operation
    const emailPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email sending timed out')), 15000); // 15 second timeout
    });
    
    // Race the email sending against the timeout
    await Promise.race([emailPromise, timeoutPromise]);
    
    console.log(`Lead notification sent successfully to ${adminEmail}`);
    res.status(200).json({ success: true, message: 'Admin notification sent successfully' });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    
    // Provide more specific error messages based on the error type
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        success: false, 
        message: 'Email service unavailable', 
        error: 'Connection to mail server failed'
      });
    } else if (error.message === 'Email sending timed out') {
      return res.status(504).json({ 
        success: false, 
        message: 'Email sending timed out', 
        error: 'Operation took too long to complete'
      });
    } else if (error.responseCode >= 400) {
      return res.status(502).json({ 
        success: false, 
        message: 'Email server rejected the request', 
        error: `SMTP error: ${error.response || 'Unknown error'}`
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send admin notification', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
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

    // Set a timeout for the email sending operation
    const emailPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email sending timed out')), 15000); // 15 second timeout
    });
    
    // Race the email sending against the timeout
    await Promise.race([emailPromise, timeoutPromise]);
    
    console.log(`Lead confirmation sent successfully to ${leadData.email}`);
    res.status(200).json({ success: true, message: 'Lead confirmation sent successfully' });
  } catch (error) {
    console.error('Error sending lead confirmation:', error);
    
    // Provide more specific error messages based on the error type
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        success: false, 
        message: 'Email service unavailable', 
        error: 'Connection to mail server failed'
      });
    } else if (error.message === 'Email sending timed out') {
      return res.status(504).json({ 
        success: false, 
        message: 'Email sending timed out', 
        error: 'Operation took too long to complete'
      });
    } else if (error.responseCode >= 400) {
      return res.status(502).json({ 
        success: false, 
        message: 'Email server rejected the request', 
        error: `SMTP error: ${error.response || 'Unknown error'}`
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send lead confirmation', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ status: 'API is working', timestamp: new Date().toISOString() });
});

// Handle contact form submissions
app.post('/api/send-contact-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const subject = `New Contact Form Submission from ${name}`;
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <p>This message was sent from the contact form on KV Associates website.</p>
    `;

    const mailOptions = {
      from: 'KV Associates <kvassociatemarketing@gmail.com>',
      to: 'design@kvassociate.com, info@kvassociate.com',
      replyTo: email,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to the user
    const userMailOptions = {
      from: 'KV Associates <kvassociatemarketing@gmail.com>',
      to: email,
      subject: 'Thank you for contacting KV Associates',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to KV Associates. We have received your message and our team will get back to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <p>We'll contact you on ${phone} or reply to this email.</p>
        <p>Best regards,<br>KV Associates Team</p>
        <p><small>This is an automated message. Please do not reply to this email.</small></p>
      `
    };

    await transporter.sendMail(userMailOptions);
    
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email service active for KV Associates`);
});
